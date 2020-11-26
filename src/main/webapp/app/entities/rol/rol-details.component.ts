import { Component, Vue, Inject } from 'vue-property-decorator';

import { IRol } from '@/shared/model/rol.model';
import RolService from './rol.service';

@Component
export default class RolDetails extends Vue {
  @Inject('rolService') private rolService: () => RolService;
  public rol: IRol = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.rolId) {
        vm.retrieveRol(to.params.rolId);
      }
    });
  }

  public retrieveRol(rolId) {
    this.rolService()
      .find(rolId)
      .then(res => {
        this.rol = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
