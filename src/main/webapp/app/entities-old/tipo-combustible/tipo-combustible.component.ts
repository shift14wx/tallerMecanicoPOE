import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITipoCombustible } from '@/shared/model/tipo-combustible.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TipoCombustibleService from './tipo-combustible.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TipoCombustible extends mixins(AlertMixin) {
  @Inject('tipoCombustibleService') private tipoCombustibleService: () => TipoCombustibleService;
  private removeId: number = null;

  public tipoCombustibles: ITipoCombustible[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTipoCombustibles();
  }

  public clear(): void {
    this.retrieveAllTipoCombustibles();
  }

  public retrieveAllTipoCombustibles(): void {
    this.isFetching = true;

    this.tipoCombustibleService()
      .retrieve()
      .then(
        res => {
          this.tipoCombustibles = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITipoCombustible): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTipoCombustible(): void {
    this.tipoCombustibleService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.tipoCombustible.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTipoCombustibles();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
