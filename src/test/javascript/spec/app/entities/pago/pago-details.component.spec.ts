/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import PagoDetailComponent from '@/entities/pago/pago-details.vue';
import PagoClass from '@/entities/pago/pago-details.component';
import PagoService from '@/entities/pago/pago.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Pago Management Detail Component', () => {
    let wrapper: Wrapper<PagoClass>;
    let comp: PagoClass;
    let pagoServiceStub: SinonStubbedInstance<PagoService>;

    beforeEach(() => {
      pagoServiceStub = sinon.createStubInstance<PagoService>(PagoService);

      wrapper = shallowMount<PagoClass>(PagoDetailComponent, { store, i18n, localVue, provide: { pagoService: () => pagoServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPago = { id: 123 };
        pagoServiceStub.find.resolves(foundPago);

        // WHEN
        comp.retrievePago(123);
        await comp.$nextTick();

        // THEN
        expect(comp.pago).toBe(foundPago);
      });
    });
  });
});
