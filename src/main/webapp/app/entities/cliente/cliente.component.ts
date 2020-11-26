import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICliente } from '@/shared/model/cliente.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ClienteService from './cliente.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Cliente extends mixins(AlertMixin) {
  @Inject('clienteService') private clienteService: () => ClienteService;
  private removeId: number = null;

  public clientes: ICliente[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllClientes();
  }

  public clear(): void {
    this.retrieveAllClientes();
  }

  public retrieveAllClientes(): void {
    this.isFetching = true;

    this.clienteService()
      .retrieve()
      .then(
        res => {
          this.clientes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICliente): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCliente(): void {
    this.clienteService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.cliente.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllClientes();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
