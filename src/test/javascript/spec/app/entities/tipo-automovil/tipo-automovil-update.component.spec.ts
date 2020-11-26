/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TipoAutomovilUpdateComponent from '@/entities/tipo-automovil/tipo-automovil-update.vue';
import TipoAutomovilClass from '@/entities/tipo-automovil/tipo-automovil-update.component';
import TipoAutomovilService from '@/entities/tipo-automovil/tipo-automovil.service';

import AutomovilService from '@/entities/automovil/automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('TipoAutomovil Management Update Component', () => {
    let wrapper: Wrapper<TipoAutomovilClass>;
    let comp: TipoAutomovilClass;
    let tipoAutomovilServiceStub: SinonStubbedInstance<TipoAutomovilService>;

    beforeEach(() => {
      tipoAutomovilServiceStub = sinon.createStubInstance<TipoAutomovilService>(TipoAutomovilService);

      wrapper = shallowMount<TipoAutomovilClass>(TipoAutomovilUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          tipoAutomovilService: () => tipoAutomovilServiceStub,

          automovilService: () => new AutomovilService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.tipoAutomovil = entity;
        tipoAutomovilServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(tipoAutomovilServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.tipoAutomovil = entity;
        tipoAutomovilServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(tipoAutomovilServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
