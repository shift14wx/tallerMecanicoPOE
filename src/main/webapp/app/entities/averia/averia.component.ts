import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IAveria } from '@/shared/model/averia.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import AveriaService from './averia.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Averia extends mixins(AlertMixin) {
  @Inject('averiaService') private averiaService: () => AveriaService;
  private removeId: number = null;

  public averias: IAveria[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllAverias();
  }

  public clear(): void {
    this.retrieveAllAverias();
  }

  public retrieveAllAverias(): void {
    this.isFetching = true;

    this.averiaService()
      .retrieve()
      .then(
        res => {
          this.averias = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IAveria): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeAveria(): void {
    this.averiaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.averia.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllAverias();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
