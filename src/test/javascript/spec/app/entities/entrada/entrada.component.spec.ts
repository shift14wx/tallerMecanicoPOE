/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import EntradaComponent from '@/entities/entrada/entrada.vue';
import EntradaClass from '@/entities/entrada/entrada.component';
import EntradaService from '@/entities/entrada/entrada.service';

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
  describe('Entrada Management Component', () => {
    let wrapper: Wrapper<EntradaClass>;
    let comp: EntradaClass;
    let entradaServiceStub: SinonStubbedInstance<EntradaService>;

    beforeEach(() => {
      entradaServiceStub = sinon.createStubInstance<EntradaService>(EntradaService);
      entradaServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<EntradaClass>(EntradaComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          entradaService: () => entradaServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      entradaServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllEntradas();
      await comp.$nextTick();

      // THEN
      expect(entradaServiceStub.retrieve.called).toBeTruthy();
      expect(comp.entradas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      entradaServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeEntrada();
      await comp.$nextTick();

      // THEN
      expect(entradaServiceStub.delete.called).toBeTruthy();
      expect(entradaServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
