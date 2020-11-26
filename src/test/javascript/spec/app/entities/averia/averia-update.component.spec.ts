/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import AveriaUpdateComponent from '@/entities/averia/averia-update.vue';
import AveriaClass from '@/entities/averia/averia-update.component';
import AveriaService from '@/entities/averia/averia.service';

import BitacoraAveriaService from '@/entities/bitacora-averia/bitacora-averia.service';

import EntradaService from '@/entities/entrada/entrada.service';

import PagoService from '@/entities/pago/pago.service';

import AutomovilService from '@/entities/automovil/automovil.service';

import EstadoAveriaService from '@/entities/estado-averia/estado-averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Averia Management Update Component', () => {
    let wrapper: Wrapper<AveriaClass>;
    let comp: AveriaClass;
    let averiaServiceStub: SinonStubbedInstance<AveriaService>;

    beforeEach(() => {
      averiaServiceStub = sinon.createStubInstance<AveriaService>(AveriaService);

      wrapper = shallowMount<AveriaClass>(AveriaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          averiaService: () => averiaServiceStub,

          bitacoraAveriaService: () => new BitacoraAveriaService(),

          entradaService: () => new EntradaService(),

          pagoService: () => new PagoService(),

          automovilService: () => new AutomovilService(),

          estadoAveriaService: () => new EstadoAveriaService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.averia = entity;
        averiaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(averiaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.averia = entity;
        averiaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(averiaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
