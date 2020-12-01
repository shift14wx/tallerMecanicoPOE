import { Component, Vue, Inject } from 'vue-property-decorator';

import { IAveria } from '@/shared/model/averia.model';
import AveriaService from './averia.service';
import { ICliente } from '@/shared/model/cliente.model';

@Component
export default class AveriaDetails extends Vue {
  @Inject('averiaService') private averiaService: () => AveriaService;
  public averia: IAveria = {};

  public cliente: ICliente = {};

  public IdAutomovil: number = 0;

  public reactives: number = 0;

  public setVehiculoId(automovilId) {
    this.IdAutomovil = automovilId ? automovilId : 0;
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.averiaId) {
        vm.retrieveAveria(to.params.averiaId);
      }
      if (to.params.automovilId) {
        vm.setVehiculoId(to.params.automovilId);
      }
    });
  }

  public retriveCliente() {
    this.averiaService()
      .findClienteAutomovilAverias(this.averia.automovil.id)
      .then(res => {
        this.cliente = res;
      });
  }

  public showClient() {
    return this.cliente.hasOwnProperty('nombre');
  }

  public retrieveAveria(averiaId) {
    this.averiaService()
      .find(averiaId)
      .then(res => {
        this.averia = res;
        this.retriveCliente();
      });
  }

  public previousState() {
    // @ts-ignore
    this.$router.push({ name: 'Averia', params: { automovilId: this.IdAutomovil > 0 ? this.IdAutomovil : null } });
  }
}
