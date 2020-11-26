/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EstadoAveriaUpdateComponent from '@/entities/estado-averia/estado-averia-update.vue';
import EstadoAveriaClass from '@/entities/estado-averia/estado-averia-update.component';
import EstadoAveriaService from '@/entities/estado-averia/estado-averia.service';

import AveriaService from '@/entities/averia/averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('EstadoAveria Management Update Component', () => {
    let wrapper: Wrapper<EstadoAveriaClass>;
    let comp: EstadoAveriaClass;
    let estadoAveriaServiceStub: SinonStubbedInstance<EstadoAveriaService>;

    beforeEach(() => {
      estadoAveriaServiceStub = sinon.createStubInstance<EstadoAveriaService>(EstadoAveriaService);

      wrapper = shallowMount<EstadoAveriaClass>(EstadoAveriaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          estadoAveriaService: () => estadoAveriaServiceStub,

          averiaService: () => new AveriaService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.estadoAveria = entity;
        estadoAveriaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(estadoAveriaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.estadoAveria = entity;
        estadoAveriaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(estadoAveriaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
