/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ClienteDetailComponent from '@/entities/cliente/cliente-details.vue';
import ClienteClass from '@/entities/cliente/cliente-details.component';
import ClienteService from '@/entities/cliente/cliente.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Cliente Management Detail Component', () => {
    let wrapper: Wrapper<ClienteClass>;
    let comp: ClienteClass;
    let clienteServiceStub: SinonStubbedInstance<ClienteService>;

    beforeEach(() => {
      clienteServiceStub = sinon.createStubInstance<ClienteService>(ClienteService);

      wrapper = shallowMount<ClienteClass>(ClienteDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { clienteService: () => clienteServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCliente = { id: 123 };
        clienteServiceStub.find.resolves(foundCliente);

        // WHEN
        comp.retrieveCliente(123);
        await comp.$nextTick();

        // THEN
        expect(comp.cliente).toBe(foundCliente);
      });
    });
  });
});
