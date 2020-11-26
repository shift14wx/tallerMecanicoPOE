/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EstadoAveriaDetailComponent from '@/entities/estado-averia/estado-averia-details.vue';
import EstadoAveriaClass from '@/entities/estado-averia/estado-averia-details.component';
import EstadoAveriaService from '@/entities/estado-averia/estado-averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('EstadoAveria Management Detail Component', () => {
    let wrapper: Wrapper<EstadoAveriaClass>;
    let comp: EstadoAveriaClass;
    let estadoAveriaServiceStub: SinonStubbedInstance<EstadoAveriaService>;

    beforeEach(() => {
      estadoAveriaServiceStub = sinon.createStubInstance<EstadoAveriaService>(EstadoAveriaService);

      wrapper = shallowMount<EstadoAveriaClass>(EstadoAveriaDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { estadoAveriaService: () => estadoAveriaServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEstadoAveria = { id: 123 };
        estadoAveriaServiceStub.find.resolves(foundEstadoAveria);

        // WHEN
        comp.retrieveEstadoAveria(123);
        await comp.$nextTick();

        // THEN
        expect(comp.estadoAveria).toBe(foundEstadoAveria);
      });
    });
  });
});
