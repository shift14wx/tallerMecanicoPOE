import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AveriaService from '../averia/averia.service';
import { IAveria } from '@/shared/model/averia.model';

import AlertService from '@/shared/alert/alert.service';
import { IServicio, Servicio } from '@/shared/model/servicio.model';
import ServicioService from './servicio.service';

const validations: any = {
  servicio: {
    servicio: {},
  },
};

@Component({
  validations,
})
export default class ServicioUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('servicioService') private servicioService: () => ServicioService;
  public servicio: IServicio = new Servicio();

  @Inject('averiaService') private averiaService: () => AveriaService;

  public averias: IAveria[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.servicioId) {
        vm.retrieveServicio(to.params.servicioId);
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
    if (this.servicio.id) {
      this.servicioService()
        .update(this.servicio)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.servicio.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.servicioService()
        .create(this.servicio)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.servicio.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveServicio(servicioId): void {
    this.servicioService()
      .find(servicioId)
      .then(res => {
        this.servicio = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.averiaService()
      .retrieve()
      .then(res => {
        this.averias = res.data;
      });
  }
}
