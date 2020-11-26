import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEstadoAveria } from '@/shared/model/estado-averia.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import EstadoAveriaService from './estado-averia.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class EstadoAveria extends mixins(AlertMixin) {
  @Inject('estadoAveriaService') private estadoAveriaService: () => EstadoAveriaService;
  private removeId: number = null;

  public estadoAverias: IEstadoAveria[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEstadoAverias();
  }

  public clear(): void {
    this.retrieveAllEstadoAverias();
  }

  public retrieveAllEstadoAverias(): void {
    this.isFetching = true;

    this.estadoAveriaService()
      .retrieve()
      .then(
        res => {
          this.estadoAverias = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IEstadoAveria): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEstadoAveria(): void {
    this.estadoAveriaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.estadoAveria.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllEstadoAverias();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
