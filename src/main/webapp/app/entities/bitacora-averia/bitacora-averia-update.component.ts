import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AveriaService from '../averia/averia.service';
import { IAveria } from '@/shared/model/averia.model';

import AlertService from '@/shared/alert/alert.service';
import { IBitacoraAveria, BitacoraAveria } from '@/shared/model/bitacora-averia.model';
import BitacoraAveriaService from './bitacora-averia.service';

const validations: any = {
  bitacoraAveria: {
    descripcion: {},
    fechaBitacora: {},
  },
};

@Component({
  validations,
})
export default class BitacoraAveriaUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bitacoraAveriaService') private bitacoraAveriaService: () => BitacoraAveriaService;
  public bitacoraAveria: IBitacoraAveria = new BitacoraAveria();

  @Inject('averiaService') private averiaService: () => AveriaService;

  public averias: IAveria[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bitacoraAveriaId) {
        vm.retrieveBitacoraAveria(to.params.bitacoraAveriaId);
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
    if (this.bitacoraAveria.id) {
      this.bitacoraAveriaService()
        .update(this.bitacoraAveria)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.bitacoraAveria.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.bitacoraAveriaService()
        .create(this.bitacoraAveria)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('tallerMecanicoPoeApp.bitacoraAveria.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBitacoraAveria(bitacoraAveriaId): void {
    this.bitacoraAveriaService()
      .find(bitacoraAveriaId)
      .then(res => {
        this.bitacoraAveria = res;
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
