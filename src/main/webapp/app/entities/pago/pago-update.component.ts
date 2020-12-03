import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue, decimal } from 'vuelidate/lib/validators';

import AveriaService from '../averia/averia.service';
import { IAveria } from '@/shared/model/averia.model';

import AlertService from '@/shared/alert/alert.service';
import { IPago, Pago } from '@/shared/model/pago.model';
import PagoService from './pago.service';

const validations: any = {
  pago: {
    fechaPago: {
      required,
    },
    total: {
      required,
      decimal,
    },
    averia: {
      required,
    },
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
  public averiaId: number = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.pagoId) {
        vm.retrievePago(to.params.pagoId);
      }
      if (to.params.averiaId) {
        vm.setIdAveria(to.params.averiaId);
      }
      vm.initRelationships();
    });
  }

  public setIdAveria(idAveria: number = 0) {
    console.log('id averia encontrada ' + idAveria.toString());
    if (idAveria > 0) {
      this.averiaId = idAveria;
    }
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
          // @ts-ignore
          this.$router.push({ name: 'Pago', params: { averiaId: this.averiaId > 0 ? this.averiaId : null } });
          const message = this.$t('tallerMecanicoPoeApp.pago.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        })
        .catch(err => {
          this.isSaving = false;
          this.$swal({
            icon: 'error',
            title: err.response.data.title,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      this.pagoService()
        .create(this.pago)
        .then(param => {
          this.isSaving = false;
          // @ts-ignore
          this.$router.push({ name: 'Pago', params: { averiaId: this.averiaId > 0 ? this.averiaId : null } });
          const message = this.$t('tallerMecanicoPoeApp.pago.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        })
        .catch(err => {
          this.isSaving = false;
          this.$swal({
            icon: 'error',
            title: 'Error',
            text: err.response.data.title,
            showConfirmButton: true,
          });
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
    // @ts-ignore
    this.$router.push({ name: 'Pago', params: { averiaId: this.averiaId > 0 ? this.averiaId : null } });
  }

  public initRelationships(): void {
    this.averiaService()
      .retrieve()
      .then(res => {
        this.averias = res.data;
        this.setAveriaFound();
      });
  }

  public setAveriaFound() {
    if (this.averiaId > 0) {
      this.pago.averia = this.averias.find(averia => (averia.id = this.averiaId));
    }
  }
}
