import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Automovil = () => import('@/entities/automovil/automovil.vue');
// prettier-ignore
const AutomovilUpdate = () => import('@/entities/automovil/automovil-update.vue');
// prettier-ignore
const AutomovilDetails = () => import('@/entities/automovil/automovil-details.vue');
// prettier-ignore
const TipoCombustible = () => import('@/entities/tipo-combustible/tipo-combustible.vue');
// prettier-ignore
const TipoCombustibleUpdate = () => import('@/entities/tipo-combustible/tipo-combustible-update.vue');
// prettier-ignore
const TipoCombustibleDetails = () => import('@/entities/tipo-combustible/tipo-combustible-details.vue');
// prettier-ignore
const ClasificacionAutomovil = () => import('@/entities/clasificacion-automovil/clasificacion-automovil.vue');
// prettier-ignore
const ClasificacionAutomovilUpdate = () => import('@/entities/clasificacion-automovil/clasificacion-automovil-update.vue');
// prettier-ignore
const ClasificacionAutomovilDetails = () => import('@/entities/clasificacion-automovil/clasificacion-automovil-details.vue');
// prettier-ignore
const Cliente = () => import('@/entities/cliente/cliente.vue');
// prettier-ignore
const ClienteUpdate = () => import('@/entities/cliente/cliente-update.vue');
// prettier-ignore
const ClienteDetails = () => import('@/entities/cliente/cliente-details.vue');
// prettier-ignore
const Marca = () => import('@/entities/marca/marca.vue');
// prettier-ignore
const MarcaUpdate = () => import('@/entities/marca/marca-update.vue');
// prettier-ignore
const MarcaDetails = () => import('@/entities/marca/marca-details.vue');
// prettier-ignore
const TipoAutomovil = () => import('@/entities/tipo-automovil/tipo-automovil.vue');
// prettier-ignore
const TipoAutomovilUpdate = () => import('@/entities/tipo-automovil/tipo-automovil-update.vue');
// prettier-ignore
const TipoAutomovilDetails = () => import('@/entities/tipo-automovil/tipo-automovil-details.vue');
// prettier-ignore
const Averia = () => import('@/entities/averia/averia.vue');
// prettier-ignore
const AveriaUpdate = () => import('@/entities/averia/averia-update.vue');
// prettier-ignore
const AveriaDetails = () => import('@/entities/averia/averia-details.vue');
// prettier-ignore
const EstadoAveria = () => import('@/entities/estado-averia/estado-averia.vue');
// prettier-ignore
const EstadoAveriaUpdate = () => import('@/entities/estado-averia/estado-averia-update.vue');
// prettier-ignore
const EstadoAveriaDetails = () => import('@/entities/estado-averia/estado-averia-details.vue');
// prettier-ignore
const Servicio = () => import('@/entities/servicio/servicio.vue');
// prettier-ignore
const ServicioUpdate = () => import('@/entities/servicio/servicio-update.vue');
// prettier-ignore
const ServicioDetails = () => import('@/entities/servicio/servicio-details.vue');
// prettier-ignore
const BitacoraAveria = () => import('@/entities/bitacora-averia/bitacora-averia.vue');
// prettier-ignore
const BitacoraAveriaUpdate = () => import('@/entities/bitacora-averia/bitacora-averia-update.vue');
// prettier-ignore
const BitacoraAveriaDetails = () => import('@/entities/bitacora-averia/bitacora-averia-details.vue');
// prettier-ignore
const Entrada = () => import('@/entities/entrada/entrada.vue');
// prettier-ignore
const EntradaUpdate = () => import('@/entities/entrada/entrada-update.vue');
// prettier-ignore
const EntradaDetails = () => import('@/entities/entrada/entrada-details.vue');
// prettier-ignore
const Empleado = () => import('@/entities/empleado/empleado.vue');
// prettier-ignore
const EmpleadoUpdate = () => import('@/entities/empleado/empleado-update.vue');
// prettier-ignore
const EmpleadoDetails = () => import('@/entities/empleado/empleado-details.vue');
// prettier-ignore
const Rol = () => import('@/entities/rol/rol.vue');
// prettier-ignore
const RolUpdate = () => import('@/entities/rol/rol-update.vue');
// prettier-ignore
const RolDetails = () => import('@/entities/rol/rol-details.vue');
// prettier-ignore
const Pago = () => import('@/entities/pago/pago.vue');
// prettier-ignore
const PagoUpdate = () => import('@/entities/pago/pago-update.vue');
// prettier-ignore
const PagoDetails = () => import('@/entities/pago/pago-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/automovil',
    name: 'Automovil',
    component: Automovil,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/automovil/new',
    name: 'AutomovilCreate',
    component: AutomovilUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/automovil/:automovilId/edit',
    name: 'AutomovilEdit',
    component: AutomovilUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/automovil/:automovilId/view',
    name: 'AutomovilView',
    component: AutomovilDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-combustible',
    name: 'TipoCombustible',
    component: TipoCombustible,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-combustible/new',
    name: 'TipoCombustibleCreate',
    component: TipoCombustibleUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-combustible/:tipoCombustibleId/edit',
    name: 'TipoCombustibleEdit',
    component: TipoCombustibleUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-combustible/:tipoCombustibleId/view',
    name: 'TipoCombustibleView',
    component: TipoCombustibleDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/clasificacion-automovil',
    name: 'ClasificacionAutomovil',
    component: ClasificacionAutomovil,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/clasificacion-automovil/new',
    name: 'ClasificacionAutomovilCreate',
    component: ClasificacionAutomovilUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/clasificacion-automovil/:clasificacionAutomovilId/edit',
    name: 'ClasificacionAutomovilEdit',
    component: ClasificacionAutomovilUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/clasificacion-automovil/:clasificacionAutomovilId/view',
    name: 'ClasificacionAutomovilView',
    component: ClasificacionAutomovilDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: Cliente,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente/new',
    name: 'ClienteCreate',
    component: ClienteUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente/:clienteId/edit',
    name: 'ClienteEdit',
    component: ClienteUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/cliente/:clienteId/view',
    name: 'ClienteView',
    component: ClienteDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/marca',
    name: 'Marca',
    component: Marca,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/marca/new',
    name: 'MarcaCreate',
    component: MarcaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/marca/:marcaId/edit',
    name: 'MarcaEdit',
    component: MarcaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/marca/:marcaId/view',
    name: 'MarcaView',
    component: MarcaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-automovil',
    name: 'TipoAutomovil',
    component: TipoAutomovil,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-automovil/new',
    name: 'TipoAutomovilCreate',
    component: TipoAutomovilUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-automovil/:tipoAutomovilId/edit',
    name: 'TipoAutomovilEdit',
    component: TipoAutomovilUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tipo-automovil/:tipoAutomovilId/view',
    name: 'TipoAutomovilView',
    component: TipoAutomovilDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/averia',
    name: 'Averia',
    component: Averia,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/averia/automovil/:automovilId',
    name: 'AveriaVehicule',
    component: Averia,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/averia/new',
    name: 'AveriaCreate',
    component: AveriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/averia/:averiaId/edit/automovil/:automovilId',
    name: 'AveriaEdit',
    component: AveriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/averia/:averiaId/view',
    name: 'AveriaView',
    component: AveriaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/estado-averia',
    name: 'EstadoAveria',
    component: EstadoAveria,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/estado-averia/new',
    name: 'EstadoAveriaCreate',
    component: EstadoAveriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/estado-averia/:estadoAveriaId/edit',
    name: 'EstadoAveriaEdit',
    component: EstadoAveriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/estado-averia/:estadoAveriaId/view',
    name: 'EstadoAveriaView',
    component: EstadoAveriaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/servicio',
    name: 'Servicio',
    component: Servicio,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/servicio/new',
    name: 'ServicioCreate',
    component: ServicioUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/servicio/:servicioId/edit',
    name: 'ServicioEdit',
    component: ServicioUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/servicio/:servicioId/view',
    name: 'ServicioView',
    component: ServicioDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bitacora-averia',
    name: 'BitacoraAveria',
    component: BitacoraAveria,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bitacora-averia/new',
    name: 'BitacoraAveriaCreate',
    component: BitacoraAveriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bitacora-averia/:bitacoraAveriaId/edit',
    name: 'BitacoraAveriaEdit',
    component: BitacoraAveriaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bitacora-averia/:bitacoraAveriaId/view',
    name: 'BitacoraAveriaView',
    component: BitacoraAveriaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entrada',
    name: 'Entrada',
    component: Entrada,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entradas/averia/:averiaId',
    name: 'EntradasAveria',
    component: Entrada,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entrada/new/averia/:averiaId',
    name: 'EntradaCreate',
    component: EntradaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entrada/:entradaId/averia/:averiaId/edit/',
    name: 'EntradaEdit',
    component: EntradaUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entrada/:entradaId/view',
    name: 'EntradaView',
    component: EntradaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/entrada/:entradaId/view/averia/:averiaId',
    name: 'EntradaViewAveria',
    component: EntradaDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleado',
    name: 'Empleado',
    component: Empleado,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleado/new',
    name: 'EmpleadoCreate',
    component: EmpleadoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleado/:empleadoId/edit',
    name: 'EmpleadoEdit',
    component: EmpleadoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/empleado/:empleadoId/view',
    name: 'EmpleadoView',
    component: EmpleadoDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/rol',
    name: 'Rol',
    component: Rol,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/rol/new',
    name: 'RolCreate',
    component: RolUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/rol/:rolId/edit',
    name: 'RolEdit',
    component: RolUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/rol/:rolId/view',
    name: 'RolView',
    component: RolDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/pago/automovil/:averiaId',
    name: 'Pago',
    component: Pago,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/pago/averia/:averiaId',
    name: 'PagosAveria',
    component: Pago,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/pago/averia/:averiaId/new',
    name: 'PagoCreate',
    component: PagoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/pago/:pagoId/averia/:averiaId/edit',
    name: 'PagoEdit',
    component: PagoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/pago/:pagoId/averia/:averiaId/view',
    name: 'PagoView',
    component: PagoDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
