import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAveria } from '@/shared/model/averia.model';
import AveriaService from './averia.service';

@Component
export default class AveriaDetails extends Vue {
  @Inject('averiaService') private averiaService: () => AveriaService;
  public averia: IAveria = {};

  public IdAutomovil: number = 0;

  public setVehiculoId(automovilId) {
    this.IdAutomovil = automovilId ? automovilId : 0;
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.averiaId) {
        vm.retrieveAveria(to.params.averiaId);
      }
      if (to.params.automovilId) {
        vm.setVehiculoId(to.params.automovilId);
      }
    });
  }

  public retrieveAveria(averiaId) {
    this.averiaService()
      .find(averiaId)
      .then(res => {
        this.averia = res;
      });
  }

  public previousState() {
    // @ts-ignore
    this.$router.push({ name: 'Averia', params: { automovilId: this.IdAutomovil > 0 ? this.IdAutomovil : null } });
  }
}
