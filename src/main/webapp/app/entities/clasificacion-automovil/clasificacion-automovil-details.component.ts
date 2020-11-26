import { Component, Vue, Inject } from 'vue-property-decorator';

import { IClasificacionAutomovil } from '@/shared/model/clasificacion-automovil.model';
import ClasificacionAutomovilService from './clasificacion-automovil.service';

@Component
export default class ClasificacionAutomovilDetails extends Vue {
  @Inject('clasificacionAutomovilService') private clasificacionAutomovilService: () => ClasificacionAutomovilService;
  public clasificacionAutomovil: IClasificacionAutomovil = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clasificacionAutomovilId) {
        vm.retrieveClasificacionAutomovil(to.params.clasificacionAutomovilId);
      }
    });
  }

  public retrieveClasificacionAutomovil(clasificacionAutomovilId) {
    this.clasificacionAutomovilService()
      .find(clasificacionAutomovilId)
      .then(res => {
        this.clasificacionAutomovil = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
