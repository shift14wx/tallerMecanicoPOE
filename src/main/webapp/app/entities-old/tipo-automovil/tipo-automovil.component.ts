import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITipoAutomovil } from '@/shared/model/tipo-automovil.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import TipoAutomovilService from './tipo-automovil.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class TipoAutomovil extends mixins(AlertMixin) {
  @Inject('tipoAutomovilService') private tipoAutomovilService: () => TipoAutomovilService;
  private removeId: number = null;

  public tipoAutomovils: ITipoAutomovil[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllTipoAutomovils();
  }

  public clear(): void {
    this.retrieveAllTipoAutomovils();
  }

  public retrieveAllTipoAutomovils(): void {
    this.isFetching = true;

    this.tipoAutomovilService()
      .retrieve()
      .then(
        res => {
          this.tipoAutomovils = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITipoAutomovil): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeTipoAutomovil(): void {
    this.tipoAutomovilService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.tipoAutomovil.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllTipoAutomovils();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
