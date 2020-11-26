/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import AveriaComponent from '@/entities/averia/averia.vue';
import AveriaClass from '@/entities/averia/averia.component';
import AveriaService from '@/entities/averia/averia.service';

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
  describe('Averia Management Component', () => {
    let wrapper: Wrapper<AveriaClass>;
    let comp: AveriaClass;
    let averiaServiceStub: SinonStubbedInstance<AveriaService>;

    beforeEach(() => {
      averiaServiceStub = sinon.createStubInstance<AveriaService>(AveriaService);
      averiaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<AveriaClass>(AveriaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          averiaService: () => averiaServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      averiaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllAverias();
      await comp.$nextTick();

      // THEN
      expect(averiaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.averias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      averiaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeAveria();
      await comp.$nextTick();

      // THEN
      expect(averiaServiceStub.delete.called).toBeTruthy();
      expect(averiaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
