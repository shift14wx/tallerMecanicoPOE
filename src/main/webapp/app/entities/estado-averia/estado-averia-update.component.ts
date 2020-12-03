import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AveriaService from '../averia/averia.service';
import { IAveria } from '@/shared/model/averia.model';

import AlertService from '@/shared/alert/alert.service';
import { IEstadoAveria, EstadoAveria } from '@/shared/model/estado-averia.model';
import EstadoAveriaService from './estado-averia.service';

const validations: any = {
  estadoAveria: {
    estado: {
      required,
    },
    descripcion: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class EstadoAveriaUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('estadoAveriaService') private estadoAveriaService: () => EstadoAveriaService;
  public estadoAveria: IEstadoAveria = new EstadoAveria();

  @Inject('averiaService') private averiaService: () => AveriaService;

  public averias: IAveria[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.estadoAveriaId) {
        vm.retrieveEstadoAveria(to.params.estadoAveriaId);
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
    if (this.estadoAveria.id) {
      this.estadoAveriaService()
        .update(this.estadoAveria)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.estadoAveria.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.estadoAveriaService()
        .create(this.estadoAveria)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.estadoAveria.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveEstadoAveria(estadoAveriaId): void {
    this.estadoAveriaService()
      .find(estadoAveriaId)
      .then(res => {
        this.estadoAveria = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.averiaService()
      .retrieve()
      .then(res => {
        this.averias = res.data;
      });
  }
}
