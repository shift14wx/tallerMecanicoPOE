import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AutomovilService from '../automovil/automovil.service';
import { IAutomovil } from '@/shared/model/automovil.model';

import AlertService from '@/shared/alert/alert.service';
import { ITipoAutomovil, TipoAutomovil } from '@/shared/model/tipo-automovil.model';
import TipoAutomovilService from './tipo-automovil.service';

const validations: any = {
  tipoAutomovil: {
    tipo: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TipoAutomovilUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('tipoAutomovilService') private tipoAutomovilService: () => TipoAutomovilService;
  public tipoAutomovil: ITipoAutomovil = new TipoAutomovil();

  @Inject('automovilService') private automovilService: () => AutomovilService;

  public automovils: IAutomovil[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tipoAutomovilId) {
        vm.retrieveTipoAutomovil(to.params.tipoAutomovilId);
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
    if (this.tipoAutomovil.id) {
      this.tipoAutomovilService()
        .update(this.tipoAutomovil)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.tipoAutomovil.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.tipoAutomovilService()
        .create(this.tipoAutomovil)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.tipoAutomovil.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTipoAutomovil(tipoAutomovilId): void {
    this.tipoAutomovilService()
      .find(tipoAutomovilId)
      .then(res => {
        this.tipoAutomovil = res;
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
