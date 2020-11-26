/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import BitacoraAveriaUpdateComponent from '@/entities/bitacora-averia/bitacora-averia-update.vue';
import BitacoraAveriaClass from '@/entities/bitacora-averia/bitacora-averia-update.component';
import BitacoraAveriaService from '@/entities/bitacora-averia/bitacora-averia.service';

import AveriaService from '@/entities/averia/averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('BitacoraAveria Management Update Component', () => {
    let wrapper: Wrapper<BitacoraAveriaClass>;
    let comp: BitacoraAveriaClass;
    let bitacoraAveriaServiceStub: SinonStubbedInstance<BitacoraAveriaService>;

    beforeEach(() => {
      bitacoraAveriaServiceStub = sinon.createStubInstance<BitacoraAveriaService>(BitacoraAveriaService);

      wrapper = shallowMount<BitacoraAveriaClass>(BitacoraAveriaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          bitacoraAveriaService: () => bitacoraAveriaServiceStub,

          averiaService: () => new AveriaService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.bitacoraAveria = entity;
        bitacoraAveriaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bitacoraAveriaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.bitacoraAveria = entity;
        bitacoraAveriaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bitacoraAveriaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
