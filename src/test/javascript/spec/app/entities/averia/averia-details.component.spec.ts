/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AveriaDetailComponent from '@/entities/averia/averia-details.vue';
import AveriaClass from '@/entities/averia/averia-details.component';
import AveriaService from '@/entities/averia/averia.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Averia Management Detail Component', () => {
    let wrapper: Wrapper<AveriaClass>;
    let comp: AveriaClass;
    let averiaServiceStub: SinonStubbedInstance<AveriaService>;

    beforeEach(() => {
      averiaServiceStub = sinon.createStubInstance<AveriaService>(AveriaService);

      wrapper = shallowMount<AveriaClass>(AveriaDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { averiaService: () => averiaServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAveria = { id: 123 };
        averiaServiceStub.find.resolves(foundAveria);

        // WHEN
        comp.retrieveAveria(123);
        await comp.$nextTick();

        // THEN
        expect(comp.averia).toBe(foundAveria);
      });
    });
  });
});
