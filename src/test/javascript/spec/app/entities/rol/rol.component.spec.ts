/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import RolComponent from '@/entities/rol/rol.vue';
import RolClass from '@/entities/rol/rol.component';
import RolService from '@/entities/rol/rol.service';

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
  describe('Rol Management Component', () => {
    let wrapper: Wrapper<RolClass>;
    let comp: RolClass;
    let rolServiceStub: SinonStubbedInstance<RolService>;

    beforeEach(() => {
      rolServiceStub = sinon.createStubInstance<RolService>(RolService);
      rolServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<RolClass>(RolComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          rolService: () => rolServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      rolServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllRols();
      await comp.$nextTick();

      // THEN
      expect(rolServiceStub.retrieve.called).toBeTruthy();
      expect(comp.rols[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      rolServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeRol();
      await comp.$nextTick();

      // THEN
      expect(rolServiceStub.delete.called).toBeTruthy();
      expect(rolServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
