/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BitacoraAveriaDetailComponent from '@/entities/bitacora-averia/bitacora-averia-details.vue';
import BitacoraAveriaClass from '@/entities/bitacora-averia/bitacora-averia-details.component';
import BitacoraAveriaService from '@/entities/bitacora-averia/bitacora-averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('BitacoraAveria Management Detail Component', () => {
    let wrapper: Wrapper<BitacoraAveriaClass>;
    let comp: BitacoraAveriaClass;
    let bitacoraAveriaServiceStub: SinonStubbedInstance<BitacoraAveriaService>;

    beforeEach(() => {
      bitacoraAveriaServiceStub = sinon.createStubInstance<BitacoraAveriaService>(BitacoraAveriaService);

      wrapper = shallowMount<BitacoraAveriaClass>(BitacoraAveriaDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { bitacoraAveriaService: () => bitacoraAveriaServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBitacoraAveria = { id: 123 };
        bitacoraAveriaServiceStub.find.resolves(foundBitacoraAveria);

        // WHEN
        comp.retrieveBitacoraAveria(123);
        await comp.$nextTick();

        // THEN
        expect(comp.bitacoraAveria).toBe(foundBitacoraAveria);
      });
    });
  });
});
