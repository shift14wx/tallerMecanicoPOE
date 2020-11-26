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

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entradaId) {
        vm.retrieveEntrada(to.params.entradaId);
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
    if (this.entrada.id) {
      this.entradaService()
        .update(this.entrada)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.entrada.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.entradaService()
        .create(this.entrada)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
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
    this.$router.go(-1);
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
      });
    this.empleadoService()
      .retrieve()
      .then(res => {
        this.empleados = res.data;
      });
  }
}
