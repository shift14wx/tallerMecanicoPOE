import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IAveria } from '@/shared/model/averia.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import AveriaService from './averia.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Averia extends mixins(AlertMixin) {
  @Inject('averiaService') private averiaService: () => AveriaService;
  private removeId: number = null;

  public averias: IAveria[] = [];

  public isFetching = false;

  public IdAutomovil: number = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.automovilId) {
        vm.setVehiculoId(to.params.automovilId);
      }

      vm.retrieveAllAverias();
    });
  }

  public setVehiculoId(automovilId) {
    this.IdAutomovil = automovilId ? automovilId : 0;
  }

  public mounted(): void {}

  public clear(): void {
    this.retrieveAllAverias();
  }

  public retrieveAllAverias(): void {
    this.isFetching = true;
    console.log('id automovil: ' + this.IdAutomovil);
    if (this.IdAutomovil == 0) {
      console.log('done retriving all averias without vehicule id');
      this.averiaService()
        .retrieve()
        .then(
          res => {
            this.averias = res.data;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
    } else {
      this.averiaService()
        .findAutomovilAverias(this.IdAutomovil)
        .then(
          res => {
            this.averias = res.data;
            this.isFetching = false;
          },
          err => {
            this.isFetching = false;
          }
        );
    }
  }

  public prepareRemove(instance: IAveria): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeAveria(): void {
    this.averiaService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('tallerMecanicoPoeApp.averia.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllAverias();
        this.closeDialog();
      })
      .catch(err => {
        if (err) {
          const message = this.$t('tallerMecanicoPoeApp.averia.deletedfalied', { param: this.removeId });
          this.alertService().showAlert(message, 'danger');
          this.getAlertFromStore();
          this.removeId = null;
          this.retrieveAllAverias();
          this.closeDialog();
        }
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
