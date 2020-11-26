import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAveria } from '@/shared/model/averia.model';
import AveriaService from './averia.service';

@Component
export default class AveriaDetails extends Vue {
  @Inject('averiaService') private averiaService: () => AveriaService;
  public averia: IAveria = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.averiaId) {
        vm.retrieveAveria(to.params.averiaId);
      }
    });
  }

  public retrieveAveria(averiaId) {
    this.averiaService()
      .find(averiaId)
      .then(res => {
        this.averia = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
