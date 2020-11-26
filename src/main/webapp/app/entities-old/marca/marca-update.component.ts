import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AutomovilService from '../automovil/automovil.service';
import { IAutomovil } from '@/shared/model/automovil.model';

import AlertService from '@/shared/alert/alert.service';
import { IMarca, Marca } from '@/shared/model/marca.model';
import MarcaService from './marca.service';

const validations: any = {
  marca: {
    marca: {},
  },
};

@Component({
  validations,
})
export default class MarcaUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('marcaService') private marcaService: () => MarcaService;
  public marca: IMarca = new Marca();

  @Inject('automovilService') private automovilService: () => AutomovilService;

  public automovils: IAutomovil[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.marcaId) {
        vm.retrieveMarca(to.params.marcaId);
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
    if (this.marca.id) {
      this.marcaService()
        .update(this.marca)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.marca.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.marcaService()
        .create(this.marca)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.marca.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveMarca(marcaId): void {
    this.marcaService()
      .find(marcaId)
      .then(res => {
        this.marca = res;
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
