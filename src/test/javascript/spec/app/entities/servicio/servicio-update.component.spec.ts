/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ServicioUpdateComponent from '@/entities/servicio/servicio-update.vue';
import ServicioClass from '@/entities/servicio/servicio-update.component';
import ServicioService from '@/entities/servicio/servicio.service';

import EntradaService from '@/entities/entrada/entrada.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Servicio Management Update Component', () => {
    let wrapper: Wrapper<ServicioClass>;
    let comp: ServicioClass;
    let servicioServiceStub: SinonStubbedInstance<ServicioService>;

    beforeEach(() => {
      servicioServiceStub = sinon.createStubInstance<ServicioService>(ServicioService);

      wrapper = shallowMount<ServicioClass>(ServicioUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          servicioService: () => servicioServiceStub,

          entradaService: () => new EntradaService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.servicio = entity;
        servicioServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(servicioServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.servicio = entity;
        servicioServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(servicioServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
