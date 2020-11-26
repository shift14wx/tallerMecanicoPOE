/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import AutomovilComponent from '@/entities/automovil/automovil.vue';
import AutomovilClass from '@/entities/automovil/automovil.component';
import AutomovilService from '@/entities/automovil/automovil.service';

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
  describe('Automovil Management Component', () => {
    let wrapper: Wrapper<AutomovilClass>;
    let comp: AutomovilClass;
    let automovilServiceStub: SinonStubbedInstance<AutomovilService>;

    beforeEach(() => {
      automovilServiceStub = sinon.createStubInstance<AutomovilService>(AutomovilService);
      automovilServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<AutomovilClass>(AutomovilComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          automovilService: () => automovilServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      automovilServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllAutomovils();
      await comp.$nextTick();

      // THEN
      expect(automovilServiceStub.retrieve.called).toBeTruthy();
      expect(comp.automovils[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      automovilServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeAutomovil();
      await comp.$nextTick();

      // THEN
      expect(automovilServiceStub.delete.called).toBeTruthy();
      expect(automovilServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
