/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TipoCombustibleComponent from '@/entities/tipo-combustible/tipo-combustible.vue';
import TipoCombustibleClass from '@/entities/tipo-combustible/tipo-combustible.component';
import TipoCombustibleService from '@/entities/tipo-combustible/tipo-combustible.service';

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
  describe('TipoCombustible Management Component', () => {
    let wrapper: Wrapper<TipoCombustibleClass>;
    let comp: TipoCombustibleClass;
    let tipoCombustibleServiceStub: SinonStubbedInstance<TipoCombustibleService>;

    beforeEach(() => {
      tipoCombustibleServiceStub = sinon.createStubInstance<TipoCombustibleService>(TipoCombustibleService);
      tipoCombustibleServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TipoCombustibleClass>(TipoCombustibleComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          tipoCombustibleService: () => tipoCombustibleServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      tipoCombustibleServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTipoCombustibles();
      await comp.$nextTick();

      // THEN
      expect(tipoCombustibleServiceStub.retrieve.called).toBeTruthy();
      expect(comp.tipoCombustibles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      tipoCombustibleServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTipoCombustible();
      await comp.$nextTick();

      // THEN
      expect(tipoCombustibleServiceStub.delete.called).toBeTruthy();
      expect(tipoCombustibleServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
