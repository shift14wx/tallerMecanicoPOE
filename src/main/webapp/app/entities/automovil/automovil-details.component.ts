import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAutomovil } from '@/shared/model/automovil.model';
import AutomovilService from './automovil.service';

@Component
export default class AutomovilDetails extends Vue {
  @Inject('automovilService') private automovilService: () => AutomovilService;
  public automovil: IAutomovil = {};

  private idCliente: number = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.automovilId) {
        vm.retrieveAutomovil(to.params.automovilId);
      }
      if (to.params.clienteId) {
        vm.setIdCliente(to.params.clienteId);
      }
    });
  }

  public setIdCliente(clienteId: number = 0) {
    if (clienteId && clienteId > 0) {
      this.idCliente = clienteId;
    }
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
