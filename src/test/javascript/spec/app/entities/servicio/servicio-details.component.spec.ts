/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ServicioDetailComponent from '@/entities/servicio/servicio-details.vue';
import ServicioClass from '@/entities/servicio/servicio-details.component';
import ServicioService from '@/entities/servicio/servicio.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Servicio Management Detail Component', () => {
    let wrapper: Wrapper<ServicioClass>;
    let comp: ServicioClass;
    let servicioServiceStub: SinonStubbedInstance<ServicioService>;

    beforeEach(() => {
      servicioServiceStub = sinon.createStubInstance<ServicioService>(ServicioService);

      wrapper = shallowMount<ServicioClass>(ServicioDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { servicioService: () => servicioServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundServicio = { id: 123 };
        servicioServiceStub.find.resolves(foundServicio);

        // WHEN
        comp.retrieveServicio(123);
        await comp.$nextTick();

        // THEN
        expect(comp.servicio).toBe(foundServicio);
      });
    });
  });
});
