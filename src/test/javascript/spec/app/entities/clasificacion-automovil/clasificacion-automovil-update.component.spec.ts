/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ClasificacionAutomovilUpdateComponent from '@/entities/clasificacion-automovil/clasificacion-automovil-update.vue';
import ClasificacionAutomovilClass from '@/entities/clasificacion-automovil/clasificacion-automovil-update.component';
import ClasificacionAutomovilService from '@/entities/clasificacion-automovil/clasificacion-automovil.service';

import AutomovilService from '@/entities/automovil/automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('ClasificacionAutomovil Management Update Component', () => {
    let wrapper: Wrapper<ClasificacionAutomovilClass>;
    let comp: ClasificacionAutomovilClass;
    let clasificacionAutomovilServiceStub: SinonStubbedInstance<ClasificacionAutomovilService>;

    beforeEach(() => {
      clasificacionAutomovilServiceStub = sinon.createStubInstance<ClasificacionAutomovilService>(ClasificacionAutomovilService);

      wrapper = shallowMount<ClasificacionAutomovilClass>(ClasificacionAutomovilUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          clasificacionAutomovilService: () => clasificacionAutomovilServiceStub,

          automovilService: () => new AutomovilService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.clasificacionAutomovil = entity;
        clasificacionAutomovilServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clasificacionAutomovilServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.clasificacionAutomovil = entity;
        clasificacionAutomovilServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(clasificacionAutomovilServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
