import { Component, Vue, Inject } from 'vue-property-decorator';

import { IPago } from '@/shared/model/pago.model';
import PagoService from './pago.service';

@Component
export default class PagoDetails extends Vue {
  @Inject('pagoService') private pagoService: () => PagoService;
  public pago: IPago = {};
  public averiaId: number = 0;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.pagoId) {
        vm.retrievePago(to.params.pagoId);
      }

      if (to.params.averiaId) {
        vm.setIdAveria(to.params.averiaId);
      }
    });
  }

  public setIdAveria(idAveria: number = 0) {
    console.log('id averia encontrada ' + idAveria.toString());
    if (idAveria > 0) {
      this.averiaId = idAveria;
    }
  }

  public retrievePago(pagoId) {
    this.pagoService()
      .find(pagoId)
      .then(res => {
        this.pago = res;
      });
  }

  public previousState() {
    // @ts-ignore
    this.$router.push({ name: 'Pago', params: { averiaId: this.averiaId > 0 ? this.averiaId : null } });
  }
}
