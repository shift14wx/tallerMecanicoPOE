/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import MarcaComponent from '@/entities/marca/marca.vue';
import MarcaClass from '@/entities/marca/marca.component';
import MarcaService from '@/entities/marca/marca.service';

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
  describe('Marca Management Component', () => {
    let wrapper: Wrapper<MarcaClass>;
    let comp: MarcaClass;
    let marcaServiceStub: SinonStubbedInstance<MarcaService>;

    beforeEach(() => {
      marcaServiceStub = sinon.createStubInstance<MarcaService>(MarcaService);
      marcaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<MarcaClass>(MarcaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          marcaService: () => marcaServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      marcaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllMarcas();
      await comp.$nextTick();

      // THEN
      expect(marcaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.marcas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      marcaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeMarca();
      await comp.$nextTick();

      // THEN
      expect(marcaServiceStub.delete.called).toBeTruthy();
      expect(marcaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
