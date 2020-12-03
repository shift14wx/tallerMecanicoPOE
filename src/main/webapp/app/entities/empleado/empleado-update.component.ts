import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EntradaService from '../entrada/entrada.service';
import { IEntrada } from '@/shared/model/entrada.model';

import RolService from '../rol/rol.service';
import { IRol } from '@/shared/model/rol.model';

import AlertService from '@/shared/alert/alert.service';
import { IEmpleado, Empleado } from '@/shared/model/empleado.model';
import EmpleadoService from './empleado.service';

const validations: any = {
  empleado: {
    nombre: {
      required,
    },
    edad: {
      required,
      numeric,
    },
    dui: {
      required,
      minLength: minLength(8),
    },
    telefono: {
      required,
      minLength: minLength(8),
    },
    rol: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class EmpleadoUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('empleadoService') private empleadoService: () => EmpleadoService;
  public empleado: IEmpleado = new Empleado();

  @Inject('entradaService') private entradaService: () => EntradaService;

  public entradas: IEntrada[] = [];

  @Inject('rolService') private rolService: () => RolService;

  public rols: IRol[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.empleadoId) {
        vm.retrieveEmpleado(to.params.empleadoId);
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
    if (this.empleado.id) {
      this.empleadoService()
        .update(this.empleado)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.empleado.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.empleadoService()
        .create(this.empleado)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.empleado.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEmpleado(empleadoId): void {
    this.empleadoService()
      .find(empleadoId)
      .then(res => {
        this.empleado = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.entradaService()
      .retrieve()
      .then(res => {
        this.entradas = res.data;
      });
    this.rolService()
      .retrieve()
      .then(res => {
        this.rols = res.data;
      });
  }
}
