/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import MarcaDetailComponent from '@/entities/marca/marca-details.vue';
import MarcaClass from '@/entities/marca/marca-details.component';
import MarcaService from '@/entities/marca/marca.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Marca Management Detail Component', () => {
    let wrapper: Wrapper<MarcaClass>;
    let comp: MarcaClass;
    let marcaServiceStub: SinonStubbedInstance<MarcaService>;

    beforeEach(() => {
      marcaServiceStub = sinon.createStubInstance<MarcaService>(MarcaService);

      wrapper = shallowMount<MarcaClass>(MarcaDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { marcaService: () => marcaServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundMarca = { id: 123 };
        marcaServiceStub.find.resolves(foundMarca);

        // WHEN
        comp.retrieveMarca(123);
        await comp.$nextTick();

        // THEN
        expect(comp.marca).toBe(foundMarca);
      });
    });
  });
});
