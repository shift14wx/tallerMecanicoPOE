import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AutomovilService from '../automovil/automovil.service';
import { IAutomovil } from '@/shared/model/automovil.model';

import AlertService from '@/shared/alert/alert.service';
import { ICliente, Cliente } from '@/shared/model/cliente.model';
import ClienteService from './cliente.service';

const validations: any = {
  cliente: {
    nombre: {},
    telefono: {},
    email: {},
    dui: {},
  },
};

@Component({
  validations,
})
export default class ClienteUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('clienteService') private clienteService: () => ClienteService;
  public cliente: ICliente = new Cliente();

  @Inject('automovilService') private automovilService: () => AutomovilService;

  public automovils: IAutomovil[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clienteId) {
        vm.retrieveCliente(to.params.clienteId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.cliente.id) {
      this.clienteService()
        .update(this.cliente)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.cliente.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.clienteService()
        .create(this.cliente)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.cliente.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCliente(clienteId): void {
    this.clienteService()
      .find(clienteId)
      .then(res => {
        this.cliente = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.automovilService()
      .retrieve()
      .then(res => {
        this.automovils = res.data;
      });
  }
}
