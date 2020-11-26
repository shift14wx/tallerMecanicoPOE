import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPago } from '@/shared/model/pago.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PagoService from './pago.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Pago extends mixins(AlertMixin) {
  @Inject('pagoService') private pagoService: () => PagoService;
  private removeId: number = null;

  public pagos: IPago[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPagos();
  }

  public clear(): void {
    this.retrieveAllPagos();
  }

  public retrieveAllPagos(): void {
    this.isFetching = true;

    this.pagoService()
      .retrieve()
      .then(
        res => {
          this.pagos = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPago): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removePago(): void {
    this.pagoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.pago.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllPagos();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
