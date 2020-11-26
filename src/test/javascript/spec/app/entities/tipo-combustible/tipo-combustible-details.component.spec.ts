/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TipoCombustibleDetailComponent from '@/entities/tipo-combustible/tipo-combustible-details.vue';
import TipoCombustibleClass from '@/entities/tipo-combustible/tipo-combustible-details.component';
import TipoCombustibleService from '@/entities/tipo-combustible/tipo-combustible.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TipoCombustible Management Detail Component', () => {
    let wrapper: Wrapper<TipoCombustibleClass>;
    let comp: TipoCombustibleClass;
    let tipoCombustibleServiceStub: SinonStubbedInstance<TipoCombustibleService>;

    beforeEach(() => {
      tipoCombustibleServiceStub = sinon.createStubInstance<TipoCombustibleService>(TipoCombustibleService);

      wrapper = shallowMount<TipoCombustibleClass>(TipoCombustibleDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { tipoCombustibleService: () => tipoCombustibleServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTipoCombustible = { id: 123 };
        tipoCombustibleServiceStub.find.resolves(foundTipoCombustible);

        // WHEN
        comp.retrieveTipoCombustible(123);
        await comp.$nextTick();

        // THEN
        expect(comp.tipoCombustible).toBe(foundTipoCombustible);
      });
    });
  });
});
