import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEntrada } from '@/shared/model/entrada.model';
import EntradaService from './entrada.service';

@Component
export default class EntradaDetails extends Vue {
  @Inject('entradaService') private entradaService: () => EntradaService;
  public entrada: IEntrada = {};
  public idAveria: number = 0;
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entradaId) {
        vm.retrieveEntrada(to.params.entradaId);
      }
      if (to.params.averiaId) {
        vm.setIdAveria(to.params.averiaId, to.params.entradaId);
      }
    });
  }
  public setIdAveria(averiaId: number = null, entradaId: number = null) {
    if (averiaId) {
      this.idAveria = averiaId;
    }
  }

  public retrieveEntrada(entradaId) {
    this.entradaService()
      .find(entradaId)
      .then(res => {
        this.entrada = res;
      });
  }

  public previousState() {
    this.$router.push({
      name: this.idAveria > 0 ? 'EntradasAveria' : 'Entrada',
      // @ts-ignore
      params: { averiaId: this.idAveria > 0 ? this.idAveria : null },
    });
  }
}
