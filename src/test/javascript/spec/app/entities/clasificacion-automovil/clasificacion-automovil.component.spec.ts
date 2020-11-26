/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ClasificacionAutomovilComponent from '@/entities/clasificacion-automovil/clasificacion-automovil.vue';
import ClasificacionAutomovilClass from '@/entities/clasificacion-automovil/clasificacion-automovil.component';
import ClasificacionAutomovilService from '@/entities/clasificacion-automovil/clasificacion-automovil.service';

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
  describe('ClasificacionAutomovil Management Component', () => {
    let wrapper: Wrapper<ClasificacionAutomovilClass>;
    let comp: ClasificacionAutomovilClass;
    let clasificacionAutomovilServiceStub: SinonStubbedInstance<ClasificacionAutomovilService>;

    beforeEach(() => {
      clasificacionAutomovilServiceStub = sinon.createStubInstance<ClasificacionAutomovilService>(ClasificacionAutomovilService);
      clasificacionAutomovilServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ClasificacionAutomovilClass>(ClasificacionAutomovilComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          clasificacionAutomovilService: () => clasificacionAutomovilServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      clasificacionAutomovilServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllClasificacionAutomovils();
      await comp.$nextTick();

      // THEN
      expect(clasificacionAutomovilServiceStub.retrieve.called).toBeTruthy();
      expect(comp.clasificacionAutomovils[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      clasificacionAutomovilServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeClasificacionAutomovil();
      await comp.$nextTick();

      // THEN
      expect(clasificacionAutomovilServiceStub.delete.called).toBeTruthy();
      expect(clasificacionAutomovilServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
