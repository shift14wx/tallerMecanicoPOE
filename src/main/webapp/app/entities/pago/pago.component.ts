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

  public idAveria: number = 0;

  public isFetching = false;

  // fetching averiaId for get all de payments of this averiaId

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.averiaId) {
        vm.retrieveAllPagos(to.params.averiaId);
        vm.setAveriaId(to.params.averiaId);
      } else {
        vm.retrieveAllPagos();
      }
    });
  }

  public setAveriaId(averiaId = null) {
    if (averiaId) {
      this.idAveria = averiaId;
    }
  }

  public mounted(): void {
    //this.retrieveAllPagos();
  }

  public clear(): void {
    this.retrieveAllPagos();
  }

  public retrieveAllPagos(averiaId = null): void {
    this.isFetching = true;

    if (averiaId) {
      this.pagoService()
        .findPagosAveria(averiaId)
        .then(
          res => {
            this.pagos = res.data;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
    } else {
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
        this.retrieveAllPagos(this.idAveria > 0 ? this.idAveria : null);
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
