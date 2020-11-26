import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAutomovil } from '@/shared/model/automovil.model';
import AutomovilService from './automovil.service';

@Component
export default class AutomovilDetails extends Vue {
  @Inject('automovilService') private automovilService: () => AutomovilService;
  public automovil: IAutomovil = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.automovilId) {
        vm.retrieveAutomovil(to.params.automovilId);
      }
    });
  }

  public retrieveAutomovil(automovilId) {
    this.automovilService()
      .find(automovilId)
      .then(res => {
        this.automovil = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
