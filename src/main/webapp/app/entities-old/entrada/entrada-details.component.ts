import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEntrada } from '@/shared/model/entrada.model';
import EntradaService from './entrada.service';

@Component
export default class EntradaDetails extends Vue {
  @Inject('entradaService') private entradaService: () => EntradaService;
  public entrada: IEntrada = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.entradaId) {
        vm.retrieveEntrada(to.params.entradaId);
      }
    });
  }

  public retrieveEntrada(entradaId) {
    this.entradaService()
      .find(entradaId)
      .then(res => {
        this.entrada = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
