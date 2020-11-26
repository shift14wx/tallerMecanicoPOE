/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TipoCombustibleUpdateComponent from '@/entities/tipo-combustible/tipo-combustible-update.vue';
import TipoCombustibleClass from '@/entities/tipo-combustible/tipo-combustible-update.component';
import TipoCombustibleService from '@/entities/tipo-combustible/tipo-combustible.service';

import AutomovilService from '@/entities/automovil/automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('TipoCombustible Management Update Component', () => {
    let wrapper: Wrapper<TipoCombustibleClass>;
    let comp: TipoCombustibleClass;
    let tipoCombustibleServiceStub: SinonStubbedInstance<TipoCombustibleService>;

    beforeEach(() => {
      tipoCombustibleServiceStub = sinon.createStubInstance<TipoCombustibleService>(TipoCombustibleService);

      wrapper = shallowMount<TipoCombustibleClass>(TipoCombustibleUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          tipoCombustibleService: () => tipoCombustibleServiceStub,

          automovilService: () => new AutomovilService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.tipoCombustible = entity;
        tipoCombustibleServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(tipoCombustibleServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.tipoCombustible = entity;
        tipoCombustibleServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(tipoCombustibleServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
