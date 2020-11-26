/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EstadoAveriaComponent from '@/entities/estado-averia/estado-averia.vue';
import EstadoAveriaClass from '@/entities/estado-averia/estado-averia.component';
import EstadoAveriaService from '@/entities/estado-averia/estado-averia.service';

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
  describe('EstadoAveria Management Component', () => {
    let wrapper: Wrapper<EstadoAveriaClass>;
    let comp: EstadoAveriaClass;
    let estadoAveriaServiceStub: SinonStubbedInstance<EstadoAveriaService>;

    beforeEach(() => {
      estadoAveriaServiceStub = sinon.createStubInstance<EstadoAveriaService>(EstadoAveriaService);
      estadoAveriaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EstadoAveriaClass>(EstadoAveriaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          estadoAveriaService: () => estadoAveriaServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      estadoAveriaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEstadoAverias();
      await comp.$nextTick();

      // THEN
      expect(estadoAveriaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.estadoAverias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      estadoAveriaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEstadoAveria();
      await comp.$nextTick();

      // THEN
      expect(estadoAveriaServiceStub.delete.called).toBeTruthy();
      expect(estadoAveriaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
