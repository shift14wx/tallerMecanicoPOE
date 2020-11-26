import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITipoCombustible } from '@/shared/model/tipo-combustible.model';
import TipoCombustibleService from './tipo-combustible.service';

@Component
export default class TipoCombustibleDetails extends Vue {
  @Inject('tipoCombustibleService') private tipoCombustibleService: () => TipoCombustibleService;
  public tipoCombustible: ITipoCombustible = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tipoCombustibleId) {
        vm.retrieveTipoCombustible(to.params.tipoCombustibleId);
      }
    });
  }

  public retrieveTipoCombustible(tipoCombustibleId) {
    this.tipoCombustibleService()
      .find(tipoCombustibleId)
      .then(res => {
        this.tipoCombustible = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
