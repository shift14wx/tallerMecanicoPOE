import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import TipoCombustibleService from '../tipo-combustible/tipo-combustible.service';
import { ITipoCombustible } from '@/shared/model/tipo-combustible.model';

import ClasificacionAutomovilService from '../clasificacion-automovil/clasificacion-automovil.service';
import { IClasificacionAutomovil } from '@/shared/model/clasificacion-automovil.model';

import ClienteService from '../cliente/cliente.service';
import { ICliente } from '@/shared/model/cliente.model';

import MarcaService from '../marca/marca.service';
import { IMarca } from '@/shared/model/marca.model';

import TipoAutomovilService from '../tipo-automovil/tipo-automovil.service';
import { ITipoAutomovil } from '@/shared/model/tipo-automovil.model';

import AlertService from '@/shared/alert/alert.service';
import { IAutomovil, Automovil } from '@/shared/model/automovil.model';
import AutomovilService from './automovil.service';

const validations: any = {
  automovil: {
    placa: {},
    modelo: {},
    color: {},
    year: {},
    nasientos: {},
    estadogeneralautomovil: {},
    numeromotor: {},
    numerochasisgrabado: {},
  },
};

@Component({
  validations,
})
export default class AutomovilUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('automovilService') private automovilService: () => AutomovilService;
  public automovil: IAutomovil = new Automovil();

  @Inject('tipoCombustibleService') private tipoCombustibleService: () => TipoCombustibleService;

  public tipoCombustibles: ITipoCombustible[] = [];

  @Inject('clasificacionAutomovilService') private clasificacionAutomovilService: () => ClasificacionAutomovilService;

  public clasificacionAutomovils: IClasificacionAutomovil[] = [];

  @Inject('clienteService') private clienteService: () => ClienteService;

  public clientes: ICliente[] = [];

  @Inject('marcaService') private marcaService: () => MarcaService;

  public marcas: IMarca[] = [];

  @Inject('tipoAutomovilService') private tipoAutomovilService: () => TipoAutomovilService;

  public tipoAutomovils: ITipoAutomovil[] = [];
  public isSaving = false;
  public currentLanguage = '';
  private idCliente: number = 0;
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.automovilId) {
        vm.retrieveAutomovil(to.params.automovilId);
      }
      if (to.params.clienteId) {
        vm.setIdCliente(to.params.clienteId);
      }
      vm.initRelationships();
    });
  }

  setIdCliente(clienteId: number = 0) {
    if (clienteId && clienteId > 0) {
      this.idCliente = clienteId;
    }
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
    if (this.automovil.id) {
      this.automovilService()
        .update(this.automovil)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.automovil.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.automovilService()
        .create(this.automovil)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.automovil.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAutomovil(automovilId): void {
    this.automovilService()
      .find(automovilId)
      .then(res => {
        this.automovil = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.tipoCombustibleService()
      .retrieve()
      .then(res => {
        this.tipoCombustibles = res.data;
      });
    this.clasificacionAutomovilService()
      .retrieve()
      .then(res => {
        this.clasificacionAutomovils = res.data;
      });
    this.clienteService()
      .retrieve()
      .then(res => {
        this.clientes = res.data;
        if (this.idCliente > 0) {
          this.automovil.cliente = this.clientes.find(client => client.id == this.idCliente);
        }
      });
    this.marcaService()
      .retrieve()
      .then(res => {
        this.marcas = res.data;
      });
    this.tipoAutomovilService()
      .retrieve()
      .then(res => {
        this.tipoAutomovils = res.data;
      });
  }
}
