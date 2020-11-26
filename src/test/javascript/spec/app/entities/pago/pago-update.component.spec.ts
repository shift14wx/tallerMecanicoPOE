/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PagoUpdateComponent from '@/entities/pago/pago-update.vue';
import PagoClass from '@/entities/pago/pago-update.component';
import PagoService from '@/entities/pago/pago.service';

import AveriaService from '@/entities/averia/averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Pago Management Update Component', () => {
    let wrapper: Wrapper<PagoClass>;
    let comp: PagoClass;
    let pagoServiceStub: SinonStubbedInstance<PagoService>;

    beforeEach(() => {
      pagoServiceStub = sinon.createStubInstance<PagoService>(PagoService);

      wrapper = shallowMount<PagoClass>(PagoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          pagoService: () => pagoServiceStub,

          averiaService: () => new AveriaService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.pago = entity;
        pagoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(pagoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.pago = entity;
        pagoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(pagoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
