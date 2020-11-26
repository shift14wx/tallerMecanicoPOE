import { Component, Vue, Inject } from 'vue-property-decorator';

import { IEmpleado } from '@/shared/model/empleado.model';
import EmpleadoService from './empleado.service';

@Component
export default class EmpleadoDetails extends Vue {
  @Inject('empleadoService') private empleadoService: () => EmpleadoService;
  public empleado: IEmpleado = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.empleadoId) {
        vm.retrieveEmpleado(to.params.empleadoId);
      }
    });
  }

  public retrieveEmpleado(empleadoId) {
    this.empleadoService()
      .find(empleadoId)
      .then(res => {
        this.empleado = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
