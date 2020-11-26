import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITipoAutomovil } from '@/shared/model/tipo-automovil.model';
import TipoAutomovilService from './tipo-automovil.service';

@Component
export default class TipoAutomovilDetails extends Vue {
  @Inject('tipoAutomovilService') private tipoAutomovilService: () => TipoAutomovilService;
  public tipoAutomovil: ITipoAutomovil = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tipoAutomovilId) {
        vm.retrieveTipoAutomovil(to.params.tipoAutomovilId);
      }
    });
  }

  public retrieveTipoAutomovil(tipoAutomovilId) {
    this.tipoAutomovilService()
      .find(tipoAutomovilId)
      .then(res => {
        this.tipoAutomovil = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
