/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ClasificacionAutomovilDetailComponent from '@/entities/clasificacion-automovil/clasificacion-automovil-details.vue';
import ClasificacionAutomovilClass from '@/entities/clasificacion-automovil/clasificacion-automovil-details.component';
import ClasificacionAutomovilService from '@/entities/clasificacion-automovil/clasificacion-automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ClasificacionAutomovil Management Detail Component', () => {
    let wrapper: Wrapper<ClasificacionAutomovilClass>;
    let comp: ClasificacionAutomovilClass;
    let clasificacionAutomovilServiceStub: SinonStubbedInstance<ClasificacionAutomovilService>;

    beforeEach(() => {
      clasificacionAutomovilServiceStub = sinon.createStubInstance<ClasificacionAutomovilService>(ClasificacionAutomovilService);

      wrapper = shallowMount<ClasificacionAutomovilClass>(ClasificacionAutomovilDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { clasificacionAutomovilService: () => clasificacionAutomovilServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundClasificacionAutomovil = { id: 123 };
        clasificacionAutomovilServiceStub.find.resolves(foundClasificacionAutomovil);

        // WHEN
        comp.retrieveClasificacionAutomovil(123);
        await comp.$nextTick();

        // THEN
        expect(comp.clasificacionAutomovil).toBe(foundClasificacionAutomovil);
      });
    });
  });
});
