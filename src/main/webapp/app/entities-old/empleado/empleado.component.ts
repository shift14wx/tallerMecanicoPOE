import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IEmpleado } from '@/shared/model/empleado.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import EmpleadoService from './empleado.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Empleado extends mixins(AlertMixin) {
  @Inject('empleadoService') private empleadoService: () => EmpleadoService;
  private removeId: number = null;

  public empleados: IEmpleado[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllEmpleados();
  }

  public clear(): void {
    this.retrieveAllEmpleados();
  }

  public retrieveAllEmpleados(): void {
    this.isFetching = true;

    this.empleadoService()
      .retrieve()
      .then(
        res => {
          this.empleados = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IEmpleado): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeEmpleado(): void {
    this.empleadoService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.empleado.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllEmpleados();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
