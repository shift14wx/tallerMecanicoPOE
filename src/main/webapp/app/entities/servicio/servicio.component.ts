import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IServicio } from '@/shared/model/servicio.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ServicioService from './servicio.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Servicio extends mixins(AlertMixin) {
  @Inject('servicioService') private servicioService: () => ServicioService;
  private removeId: number = null;

  public servicios: IServicio[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllServicios();
  }

  public clear(): void {
    this.retrieveAllServicios();
  }

  public retrieveAllServicios(): void {
    this.isFetching = true;

    this.servicioService()
      .retrieve()
      .then(
        res => {
          this.servicios = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IServicio): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeServicio(): void {
    this.servicioService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.servicio.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllServicios();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
