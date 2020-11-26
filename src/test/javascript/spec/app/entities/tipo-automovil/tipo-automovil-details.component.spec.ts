/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TipoAutomovilDetailComponent from '@/entities/tipo-automovil/tipo-automovil-details.vue';
import TipoAutomovilClass from '@/entities/tipo-automovil/tipo-automovil-details.component';
import TipoAutomovilService from '@/entities/tipo-automovil/tipo-automovil.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('TipoAutomovil Management Detail Component', () => {
    let wrapper: Wrapper<TipoAutomovilClass>;
    let comp: TipoAutomovilClass;
    let tipoAutomovilServiceStub: SinonStubbedInstance<TipoAutomovilService>;

    beforeEach(() => {
      tipoAutomovilServiceStub = sinon.createStubInstance<TipoAutomovilService>(TipoAutomovilService);

      wrapper = shallowMount<TipoAutomovilClass>(TipoAutomovilDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { tipoAutomovilService: () => tipoAutomovilServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTipoAutomovil = { id: 123 };
        tipoAutomovilServiceStub.find.resolves(foundTipoAutomovil);

        // WHEN
        comp.retrieveTipoAutomovil(123);
        await comp.$nextTick();

        // THEN
        expect(comp.tipoAutomovil).toBe(foundTipoAutomovil);
      });
    });
  });
});
