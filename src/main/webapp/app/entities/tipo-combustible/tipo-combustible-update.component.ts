import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AutomovilService from '../automovil/automovil.service';
import { IAutomovil } from '@/shared/model/automovil.model';

import AlertService from '@/shared/alert/alert.service';
import { ITipoCombustible, TipoCombustible } from '@/shared/model/tipo-combustible.model';
import TipoCombustibleService from './tipo-combustible.service';

const validations: any = {
  tipoCombustible: {
    combustible: {
      required,
      minLength: minLength(1),
    },
  },
};

@Component({
  validations,
})
export default class TipoCombustibleUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('tipoCombustibleService') private tipoCombustibleService: () => TipoCombustibleService;
  public tipoCombustible: ITipoCombustible = new TipoCombustible();

  @Inject('automovilService') private automovilService: () => AutomovilService;

  public automovils: IAutomovil[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tipoCombustibleId) {
        vm.retrieveTipoCombustible(to.params.tipoCombustibleId);
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
    if (this.tipoCombustible.id) {
      this.tipoCombustibleService()
        .update(this.tipoCombustible)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.tipoCombustible.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.tipoCombustibleService()
        .create(this.tipoCombustible)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.tipoCombustible.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTipoCombustible(tipoCombustibleId): void {
    this.tipoCombustibleService()
      .find(tipoCombustibleId)
      .then(res => {
        this.tipoCombustible = res;
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
