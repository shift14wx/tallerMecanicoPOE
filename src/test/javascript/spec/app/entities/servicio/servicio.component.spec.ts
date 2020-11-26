/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ServicioComponent from '@/entities/servicio/servicio.vue';
import ServicioClass from '@/entities/servicio/servicio.component';
import ServicioService from '@/entities/servicio/servicio.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Servicio Management Component', () => {
    let wrapper: Wrapper<ServicioClass>;
    let comp: ServicioClass;
    let servicioServiceStub: SinonStubbedInstance<ServicioService>;

    beforeEach(() => {
      servicioServiceStub = sinon.createStubInstance<ServicioService>(ServicioService);
      servicioServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ServicioClass>(ServicioComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          servicioService: () => servicioServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      servicioServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllServicios();
      await comp.$nextTick();

      // THEN
      expect(servicioServiceStub.retrieve.called).toBeTruthy();
      expect(comp.servicios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      servicioServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeServicio();
      await comp.$nextTick();

      // THEN
      expect(servicioServiceStub.delete.called).toBeTruthy();
      expect(servicioServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
