import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPago } from '@/shared/model/pago.model';
import PagoService from './pago.service';

@Component
export default class PagoDetails extends Vue {
  @Inject('pagoService') private pagoService: () => PagoService;
  public pago: IPago = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.pagoId) {
        vm.retrievePago(to.params.pagoId);
      }
    });
  }

  public retrievePago(pagoId) {
    this.pagoService()
      .find(pagoId)
      .then(res => {
        this.pago = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
