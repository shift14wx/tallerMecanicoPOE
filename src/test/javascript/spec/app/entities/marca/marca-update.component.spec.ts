/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MarcaUpdateComponent from '@/entities/marca/marca-update.vue';
import MarcaClass from '@/entities/marca/marca-update.component';
import MarcaService from '@/entities/marca/marca.service';

import AutomovilService from '@/entities/automovil/automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Marca Management Update Component', () => {
    let wrapper: Wrapper<MarcaClass>;
    let comp: MarcaClass;
    let marcaServiceStub: SinonStubbedInstance<MarcaService>;

    beforeEach(() => {
      marcaServiceStub = sinon.createStubInstance<MarcaService>(MarcaService);

      wrapper = shallowMount<MarcaClass>(MarcaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          marcaService: () => marcaServiceStub,

          automovilService: () => new AutomovilService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.marca = entity;
        marcaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(marcaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.marca = entity;
        marcaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(marcaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
