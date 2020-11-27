import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import BitacoraAveriaService from '../bitacora-averia/bitacora-averia.service';
import { IBitacoraAveria } from '@/shared/model/bitacora-averia.model';

import EntradaService from '../entrada/entrada.service';
import { IEntrada } from '@/shared/model/entrada.model';

import PagoService from '../pago/pago.service';
import { IPago } from '@/shared/model/pago.model';

import AutomovilService from '../automovil/automovil.service';
import { IAutomovil } from '@/shared/model/automovil.model';

import EstadoAveriaService from '../estado-averia/estado-averia.service';
import { IEstadoAveria } from '@/shared/model/estado-averia.model';

import AlertService from '@/shared/alert/alert.service';
import { IAveria, Averia } from '@/shared/model/averia.model';
import AveriaService from './averia.service';

const validations: any = {
  averia: {
    fechaAveria: {},
    descripcion: {},
    pagado: {},
  },
};

@Component({
  validations,
})
export default class AveriaUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('averiaService') private averiaService: () => AveriaService;
  public averia: IAveria = new Averia();

  @Inject('bitacoraAveriaService') private bitacoraAveriaService: () => BitacoraAveriaService;

  public bitacoraAverias: IBitacoraAveria[] = [];

  @Inject('entradaService') private entradaService: () => EntradaService;

  public entradas: IEntrada[] = [];

  @Inject('pagoService') private pagoService: () => PagoService;

  public pagos: IPago[] = [];

  @Inject('automovilService') private automovilService: () => AutomovilService;

  public automovils: IAutomovil[] = [];

  @Inject('estadoAveriaService') private estadoAveriaService: () => EstadoAveriaService;

  public estadoAverias: IEstadoAveria[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.averiaId) {
        vm.retrieveAveria(to.params.averiaId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.averia.id) {
      this.averiaService()
        .update(this.averia)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.averia.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.averiaService()
        .create(this.averia)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.averia.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAveria(averiaId): void {
    this.averiaService()
      .find(averiaId)
      .then(res => {
        this.averia = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.bitacoraAveriaService()
      .retrieve()
      .then(res => {
        this.bitacoraAverias = res.data;
      });
    this.entradaService()
      .retrieve()
      .then(res => {
        this.entradas = res.data;
      });
    this.pagoService()
      .retrieve()
      .then(res => {
        this.pagos = res.data;
      });
    this.automovilService()
      .retrieve()
      .then(res => {
        this.automovils = res.data;
      });
    this.estadoAveriaService()
      .retrieve()
      .then(res => {
        this.estadoAverias = res.data;
      });
  }
}
