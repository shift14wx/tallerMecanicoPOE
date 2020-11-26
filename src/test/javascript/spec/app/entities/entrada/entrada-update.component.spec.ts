/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EntradaUpdateComponent from '@/entities/entrada/entrada-update.vue';
import EntradaClass from '@/entities/entrada/entrada-update.component';
import EntradaService from '@/entities/entrada/entrada.service';

import ServicioService from '@/entities/servicio/servicio.service';

import AveriaService from '@/entities/averia/averia.service';

import EmpleadoService from '@/entities/empleado/empleado.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Entrada Management Update Component', () => {
    let wrapper: Wrapper<EntradaClass>;
    let comp: EntradaClass;
    let entradaServiceStub: SinonStubbedInstance<EntradaService>;

    beforeEach(() => {
      entradaServiceStub = sinon.createStubInstance<EntradaService>(EntradaService);

      wrapper = shallowMount<EntradaClass>(EntradaUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          entradaService: () => entradaServiceStub,

          servicioService: () => new ServicioService(),

          averiaService: () => new AveriaService(),

          empleadoService: () => new EmpleadoService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.entrada = entity;
        entradaServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entradaServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.entrada = entity;
        entradaServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(entradaServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
