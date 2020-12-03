import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import EmpleadoService from '../empleado/empleado.service';
import { IEmpleado } from '@/shared/model/empleado.model';

import AlertService from '@/shared/alert/alert.service';
import { IRol, Rol } from '@/shared/model/rol.model';
import RolService from './rol.service';

const validations: any = {
  rol: {
    rol: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class RolUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('rolService') private rolService: () => RolService;
  public rol: IRol = new Rol();

  @Inject('empleadoService') private empleadoService: () => EmpleadoService;

  public empleados: IEmpleado[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.rolId) {
        vm.retrieveRol(to.params.rolId);
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
    if (this.rol.id) {
      this.rolService()
        .update(this.rol)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.rol.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.rolService()
        .create(this.rol)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.rol.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveRol(rolId): void {
    this.rolService()
      .find(rolId)
      .then(res => {
        this.rol = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.empleadoService()
      .retrieve()
      .then(res => {
        this.empleados = res.data;
      });
  }
}
