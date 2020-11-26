/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EmpleadoDetailComponent from '@/entities/empleado/empleado-details.vue';
import EmpleadoClass from '@/entities/empleado/empleado-details.component';
import EmpleadoService from '@/entities/empleado/empleado.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Empleado Management Detail Component', () => {
    let wrapper: Wrapper<EmpleadoClass>;
    let comp: EmpleadoClass;
    let empleadoServiceStub: SinonStubbedInstance<EmpleadoService>;

    beforeEach(() => {
      empleadoServiceStub = sinon.createStubInstance<EmpleadoService>(EmpleadoService);

      wrapper = shallowMount<EmpleadoClass>(EmpleadoDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { empleadoService: () => empleadoServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEmpleado = { id: 123 };
        empleadoServiceStub.find.resolves(foundEmpleado);

        // WHEN
        comp.retrieveEmpleado(123);
        await comp.$nextTick();

        // THEN
        expect(comp.empleado).toBe(foundEmpleado);
      });
    });
  });
});
