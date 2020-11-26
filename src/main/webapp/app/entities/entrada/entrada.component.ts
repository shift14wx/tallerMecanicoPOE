import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEntrada } from '@/shared/model/entrada.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import EntradaService from './entrada.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Entrada extends mixins(AlertMixin) {
  @Inject('entradaService') private entradaService: () => EntradaService;
  private removeId: number = null;

  public entradas: IEntrada[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEntradas();
  }

  public clear(): void {
    this.retrieveAllEntradas();
  }

  public retrieveAllEntradas(): void {
    this.isFetching = true;

    this.entradaService()
      .retrieve()
      .then(
        res => {
          this.entradas = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IEntrada): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEntrada(): void {
    this.entradaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.entrada.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllEntradas();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
