/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import BitacoraAveriaComponent from '@/entities/bitacora-averia/bitacora-averia.vue';
import BitacoraAveriaClass from '@/entities/bitacora-averia/bitacora-averia.component';
import BitacoraAveriaService from '@/entities/bitacora-averia/bitacora-averia.service';

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
  describe('BitacoraAveria Management Component', () => {
    let wrapper: Wrapper<BitacoraAveriaClass>;
    let comp: BitacoraAveriaClass;
    let bitacoraAveriaServiceStub: SinonStubbedInstance<BitacoraAveriaService>;

    beforeEach(() => {
      bitacoraAveriaServiceStub = sinon.createStubInstance<BitacoraAveriaService>(BitacoraAveriaService);
      bitacoraAveriaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<BitacoraAveriaClass>(BitacoraAveriaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          bitacoraAveriaService: () => bitacoraAveriaServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      bitacoraAveriaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllBitacoraAverias();
      await comp.$nextTick();

      // THEN
      expect(bitacoraAveriaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.bitacoraAverias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      bitacoraAveriaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeBitacoraAveria();
      await comp.$nextTick();

      // THEN
      expect(bitacoraAveriaServiceStub.delete.called).toBeTruthy();
      expect(bitacoraAveriaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
