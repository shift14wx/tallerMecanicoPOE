import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IClasificacionAutomovil } from '@/shared/model/clasificacion-automovil.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ClasificacionAutomovilService from './clasificacion-automovil.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ClasificacionAutomovil extends mixins(AlertMixin) {
  @Inject('clasificacionAutomovilService') private clasificacionAutomovilService: () => ClasificacionAutomovilService;
  private removeId: number = null;

  public clasificacionAutomovils: IClasificacionAutomovil[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClasificacionAutomovils();
  }

  public clear(): void {
    this.retrieveAllClasificacionAutomovils();
  }

  public retrieveAllClasificacionAutomovils(): void {
    this.isFetching = true;

    this.clasificacionAutomovilService()
      .retrieve()
      .then(
        res => {
          this.clasificacionAutomovils = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IClasificacionAutomovil): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeClasificacionAutomovil(): void {
    this.clasificacionAutomovilService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.clasificacionAutomovil.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllClasificacionAutomovils();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
