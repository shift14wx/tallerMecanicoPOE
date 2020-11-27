import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ServicioService from '../servicio/servicio.service';
import { IServicio } from '@/shared/model/servicio.model';

import AveriaService from '../averia/averia.service';
import { IAveria } from '@/shared/model/averia.model';

import EmpleadoService from '../empleado/empleado.service';
import { IEmpleado } from '@/shared/model/empleado.model';

import AlertService from '@/shared/alert/alert.service';
import { IEntrada, Entrada } from '@/shared/model/entrada.model';
import EntradaService from './entrada.service';

const validations: any = {
  entrada: {
    descripcion: {},
    activa: {},
    precio: {},
  },
};

@Component({
  validations,
})
export default class EntradaUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('entradaService') private entradaService: () => EntradaService;
  public entrada: IEntrada = new Entrada();

  @Inject('servicioService') private servicioService: () => ServicioService;

  public servicios: IServicio[] = [];

  @Inject('averiaService') private averiaService: () => AveriaService;

  public averias: IAveria[] = [];

  @Inject('empleadoService') private empleadoService: () => EmpleadoService;

  public empleados: IEmpleado[] = [];
  public isSaving = false;
  public currentLanguage = '';
  public idEntrada: number = 0;
  public idAveria: number = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entradaId) {
        vm.setIdEntrada(to.params.entradaId);
        vm.retrieveEntrada(to.params.entradaId);
      }
      if (to.params.averiaId) {
        vm.setIdAveria(to.params.averiaId);
      }
      vm.initRelationships();
    });
  }

  public setIdAveria(averiaId: number = null) {
    if (averiaId) {
      this.idAveria = averiaId;
    }
  }
  public setIdEntrada(entradaId: number = null) {
    this.idEntrada = entradaId ? entradaId : 0;
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
    if (this.entrada.id) {
      this.entradaService()
        .update(this.entrada)
        .then(param => {
          this.isSaving = false;
          // @ts-ignore
          this.$router.push({ name: 'Entrada', params: { averiaId: this.idAveria > 0 ? this.idAveria : null } });
          const message = this.$t('tallerMecanicoPoeApp.entrada.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.entradaService()
        .create(this.entrada)
        .then(param => {
          this.isSaving = false;
          // @ts-ignore
          this.$router.push({ name: 'Entrada', params: { averiaId: this.idAveria > 0 ? this.idAveria : null } });
          const message = this.$t('tallerMecanicoPoeApp.entrada.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEntrada(entradaId): void {
    this.entradaService()
      .find(entradaId)
      .then(res => {
        this.entrada = res;
      });
  }

  public previousState(): void {
    // @ts-ignore
    this.$router.push({ name: 'Entrada', params: { averiaId: this.idAveria > 0 ? this.idAveria : null } });
  }

  public initRelationships(): void {
    this.servicioService()
      .retrieve()
      .then(res => {
        this.servicios = res.data;
      });
    this.averiaService()
      .retrieve()
      .then(res => {
        this.averias = res.data;
        this.setAveria();
      });
    this.empleadoService()
      .retrieve()
      .then(res => {
        this.empleados = res.data;
      });
  }

  public setAveria() {
    if (this.idEntrada == 0 && this.idAveria > 0) {
      this.entrada.averia = this.averias.find(averia => averia.id == this.idAveria);
    }
  }
}
