import { Component, Vue, Inject } from 'vue-property-decorator';

import { IServicio } from '@/shared/model/servicio.model';
import ServicioService from './servicio.service';

@Component
export default class ServicioDetails extends Vue {
  @Inject('servicioService') private servicioService: () => ServicioService;
  public servicio: IServicio = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.servicioId) {
        vm.retrieveServicio(to.params.servicioId);
      }
    });
  }

  public retrieveServicio(servicioId) {
    this.servicioService()
      .find(servicioId)
      .then(res => {
        this.servicio = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
