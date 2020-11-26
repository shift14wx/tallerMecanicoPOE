/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import RolDetailComponent from '@/entities/rol/rol-details.vue';
import RolClass from '@/entities/rol/rol-details.component';
import RolService from '@/entities/rol/rol.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Rol Management Detail Component', () => {
    let wrapper: Wrapper<RolClass>;
    let comp: RolClass;
    let rolServiceStub: SinonStubbedInstance<RolService>;

    beforeEach(() => {
      rolServiceStub = sinon.createStubInstance<RolService>(RolService);

      wrapper = shallowMount<RolClass>(RolDetailComponent, { store, i18n, localVue, provide: { rolService: () => rolServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundRol = { id: 123 };
        rolServiceStub.find.resolves(foundRol);

        // WHEN
        comp.retrieveRol(123);
        await comp.$nextTick();

        // THEN
        expect(comp.rol).toBe(foundRol);
      });
    });
  });
});
