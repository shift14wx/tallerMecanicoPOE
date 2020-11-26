import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEstadoAveria } from '@/shared/model/estado-averia.model';
import EstadoAveriaService from './estado-averia.service';

@Component
export default class EstadoAveriaDetails extends Vue {
  @Inject('estadoAveriaService') private estadoAveriaService: () => EstadoAveriaService;
  public estadoAveria: IEstadoAveria = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.estadoAveriaId) {
        vm.retrieveEstadoAveria(to.params.estadoAveriaId);
      }
    });
  }

  public retrieveEstadoAveria(estadoAveriaId) {
    this.estadoAveriaService()
      .find(estadoAveriaId)
      .then(res => {
        this.estadoAveria = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
