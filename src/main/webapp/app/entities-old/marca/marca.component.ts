import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IMarca } from '@/shared/model/marca.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import MarcaService from './marca.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Marca extends mixins(AlertMixin) {
  @Inject('marcaService') private marcaService: () => MarcaService;
  private removeId: number = null;

  public marcas: IMarca[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllMarcas();
  }

  public clear(): void {
    this.retrieveAllMarcas();
  }

  public retrieveAllMarcas(): void {
    this.isFetching = true;

    this.marcaService()
      .retrieve()
      .then(
        res => {
          this.marcas = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IMarca): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeMarca(): void {
    this.marcaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.marca.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllMarcas();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
