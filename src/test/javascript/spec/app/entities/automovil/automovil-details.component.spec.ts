/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AutomovilDetailComponent from '@/entities/automovil/automovil-details.vue';
import AutomovilClass from '@/entities/automovil/automovil-details.component';
import AutomovilService from '@/entities/automovil/automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Automovil Management Detail Component', () => {
    let wrapper: Wrapper<AutomovilClass>;
    let comp: AutomovilClass;
    let automovilServiceStub: SinonStubbedInstance<AutomovilService>;

    beforeEach(() => {
      automovilServiceStub = sinon.createStubInstance<AutomovilService>(AutomovilService);

      wrapper = shallowMount<AutomovilClass>(AutomovilDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { automovilService: () => automovilServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAutomovil = { id: 123 };
        automovilServiceStub.find.resolves(foundAutomovil);

        // WHEN
        comp.retrieveAutomovil(123);
        await comp.$nextTick();

        // THEN
        expect(comp.automovil).toBe(foundAutomovil);
      });
    });
  });
});
