import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AveriaService from '../averia/averia.service';
import { IAveria } from '@/shared/model/averia.model';

import AlertService from '@/shared/alert/alert.service';
import { IPago, Pago } from '@/shared/model/pago.model';
import PagoService from './pago.service';

const validations: any = {
  pago: {
    fechaPago: {},
    total: {},
  },
};

@Component({
  validations,
})
export default class PagoUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('pagoService') private pagoService: () => PagoService;
  public pago: IPago = new Pago();

  @Inject('averiaService') private averiaService: () => AveriaService;

  public averias: IAveria[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.pagoId) {
        vm.retrievePago(to.params.pagoId);
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
    if (this.pago.id) {
      this.pagoService()
        .update(this.pago)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.pago.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.pagoService()
        .create(this.pago)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.pago.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePago(pagoId): void {
    this.pagoService()
      .find(pagoId)
      .then(res => {
        this.pago = res;
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
