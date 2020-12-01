import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IAutomovil } from '@/shared/model/automovil.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import AutomovilService from './automovil.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Automovil extends mixins(AlertMixin) {
  @Inject('automovilService') private automovilService: () => AutomovilService;
  private removeId: number = null;

  private idCliente: number = 0;

  public automovils: IAutomovil[] = [];

  public isFetching = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clienteId) {
        vm.retrieveAllAutomovils(to.params.clienteId);
      } else {
        vm.retrieveAllAutomovils();
      }
    });
  }

  public clear(): void {
    this.retrieveAllAutomovils();
  }
  public retrieveAllAutomovils(clienteId: number = 0): void {
    this.idCliente = clienteId ? clienteId : 0;
    this.isFetching = true;

    if (this.idCliente > 0) {
      console.log('get vehicles of client id: ' + this.idCliente);
      this.automovilService()
        .retrieveVehiculeCliente(this.idCliente)
        .then(
          res => {
            this.automovils = res.data;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
    } else {
      console.log('get all vehicles');
      this.automovilService()
        .retrieve()
        .then(
          res => {
            this.automovils = res.data;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
    }
  }

  public prepareRemove(instance: IAutomovil): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeAutomovil(): void {
    this.automovilService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.automovil.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllAutomovils();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
