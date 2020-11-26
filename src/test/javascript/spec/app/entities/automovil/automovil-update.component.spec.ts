/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import AutomovilUpdateComponent from '@/entities/automovil/automovil-update.vue';
import AutomovilClass from '@/entities/automovil/automovil-update.component';
import AutomovilService from '@/entities/automovil/automovil.service';

import AveriaService from '@/entities/averia/averia.service';

import TipoCombustibleService from '@/entities/tipo-combustible/tipo-combustible.service';

import ClasificacionAutomovilService from '@/entities/clasificacion-automovil/clasificacion-automovil.service';

import ClienteService from '@/entities/cliente/cliente.service';

import MarcaService from '@/entities/marca/marca.service';

import TipoAutomovilService from '@/entities/tipo-automovil/tipo-automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Automovil Management Update Component', () => {
    let wrapper: Wrapper<AutomovilClass>;
    let comp: AutomovilClass;
    let automovilServiceStub: SinonStubbedInstance<AutomovilService>;

    beforeEach(() => {
      automovilServiceStub = sinon.createStubInstance<AutomovilService>(AutomovilService);

      wrapper = shallowMount<AutomovilClass>(AutomovilUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          automovilService: () => automovilServiceStub,

          averiaService: () => new AveriaService(),

          tipoCombustibleService: () => new TipoCombustibleService(),

          clasificacionAutomovilService: () => new ClasificacionAutomovilService(),

          clienteService: () => new ClienteService(),

          marcaService: () => new MarcaService(),

          tipoAutomovilService: () => new TipoAutomovilService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.automovil = entity;
        automovilServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(automovilServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.automovil = entity;
        automovilServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(automovilServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
