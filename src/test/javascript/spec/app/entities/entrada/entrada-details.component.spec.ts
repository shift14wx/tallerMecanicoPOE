/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import EntradaDetailComponent from '@/entities/entrada/entrada-details.vue';
import EntradaClass from '@/entities/entrada/entrada-details.component';
import EntradaService from '@/entities/entrada/entrada.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Entrada Management Detail Component', () => {
    let wrapper: Wrapper<EntradaClass>;
    let comp: EntradaClass;
    let entradaServiceStub: SinonStubbedInstance<EntradaService>;

    beforeEach(() => {
      entradaServiceStub = sinon.createStubInstance<EntradaService>(EntradaService);

      wrapper = shallowMount<EntradaClass>(EntradaDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { entradaService: () => entradaServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundEntrada = { id: 123 };
        entradaServiceStub.find.resolves(foundEntrada);

        // WHEN
        comp.retrieveEntrada(123);
        await comp.$nextTick();

        // THEN
        expect(comp.entrada).toBe(foundEntrada);
      });
    });
  });
});
