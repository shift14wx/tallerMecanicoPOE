import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AutomovilService from '../automovil/automovil.service';
import { IAutomovil } from '@/shared/model/automovil.model';

import AlertService from '@/shared/alert/alert.service';
import { IClasificacionAutomovil, ClasificacionAutomovil } from '@/shared/model/clasificacion-automovil.model';
import ClasificacionAutomovilService from './clasificacion-automovil.service';

const validations: any = {
  clasificacionAutomovil: {
    clasificacion: {},
  },
};

@Component({
  validations,
})
export default class ClasificacionAutomovilUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('clasificacionAutomovilService') private clasificacionAutomovilService: () => ClasificacionAutomovilService;
  public clasificacionAutomovil: IClasificacionAutomovil = new ClasificacionAutomovil();

  @Inject('automovilService') private automovilService: () => AutomovilService;

  public automovils: IAutomovil[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clasificacionAutomovilId) {
        vm.retrieveClasificacionAutomovil(to.params.clasificacionAutomovilId);
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
    if (this.clasificacionAutomovil.id) {
      this.clasificacionAutomovilService()
        .update(this.clasificacionAutomovil)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.clasificacionAutomovil.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.clasificacionAutomovilService()
        .create(this.clasificacionAutomovil)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.clasificacionAutomovil.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveClasificacionAutomovil(clasificacionAutomovilId): void {
    this.clasificacionAutomovilService()
      .find(clasificacionAutomovilId)
      .then(res => {
        this.clasificacionAutomovil = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.automovilService()
      .retrieve()
      .then(res => {
        this.automovils = res.data;
      });
  }
}
