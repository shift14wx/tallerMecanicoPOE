import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBitacoraAveria } from '@/shared/model/bitacora-averia.model';
import BitacoraAveriaService from './bitacora-averia.service';

@Component
export default class BitacoraAveriaDetails extends Vue {
  @Inject('bitacoraAveriaService') private bitacoraAveriaService: () => BitacoraAveriaService;
  public bitacoraAveria: IBitacoraAveria = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bitacoraAveriaId) {
        vm.retrieveBitacoraAveria(to.params.bitacoraAveriaId);
      }
    });
  }

  public retrieveBitacoraAveria(bitacoraAveriaId) {
    this.bitacoraAveriaService()
      .find(bitacoraAveriaId)
      .then(res => {
        this.bitacoraAveria = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
