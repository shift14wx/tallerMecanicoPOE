import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRol } from '@/shared/model/rol.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import RolService from './rol.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Rol extends mixins(AlertMixin) {
  @Inject('rolService') private rolService: () => RolService;
  private removeId: number = null;

  public rols: IRol[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllRols();
  }

  public clear(): void {
    this.retrieveAllRols();
  }

  public retrieveAllRols(): void {
    this.isFetching = true;

    this.rolService()
      .retrieve()
      .then(
        res => {
          this.rols = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IRol): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeRol(): void {
    this.rolService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.rol.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllRols();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
