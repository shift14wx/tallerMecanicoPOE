import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBitacoraAveria } from '@/shared/model/bitacora-averia.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import BitacoraAveriaService from './bitacora-averia.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BitacoraAveria extends mixins(AlertMixin) {
  @Inject('bitacoraAveriaService') private bitacoraAveriaService: () => BitacoraAveriaService;
  private removeId: number = null;

  public bitacoraAverias: IBitacoraAveria[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBitacoraAverias();
  }

  public clear(): void {
    this.retrieveAllBitacoraAverias();
  }

  public retrieveAllBitacoraAverias(): void {
    this.isFetching = true;

    this.bitacoraAveriaService()
      .retrieve()
      .then(
        res => {
          this.bitacoraAverias = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBitacoraAveria): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBitacoraAveria(): void {
    this.bitacoraAveriaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.bitacoraAveria.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllBitacoraAverias();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
