import { Component, Vue, Inject } from 'vue-property-decorator';

import { IMarca } from '@/shared/model/marca.model';
import MarcaService from './marca.service';

@Component
export default class MarcaDetails extends Vue {
  @Inject('marcaService') private marcaService: () => MarcaService;
  public marca: IMarca = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.marcaId) {
        vm.retrieveMarca(to.params.marcaId);
      }
    });
  }

  public retrieveMarca(marcaId) {
    this.marcaService()
      .find(marcaId)
      .then(res => {
        this.marca = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
