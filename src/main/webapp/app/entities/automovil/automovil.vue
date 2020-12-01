<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.automovil.home.title')" id="automovil-heading">Automovils</span>
            <router-link :to="{name: 'AutomovilCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-automovil">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.automovil.home.createLabel')">
                    Create a new Automovil
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && automovils && automovils.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.automovil.home.notFound')">No automovils found</span>
        </div>
        <div class="table-responsive" v-if="automovils && automovils.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.placa')">Placa</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.modelo')">Modelo</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.color')">Color</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.year')">Year</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.nasientos')">Nasientos</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.estadogeneralautomovil')">Estadogeneralautomovil</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.numeromotor')">Numeromotor</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.numerochasisgrabado')">Numerochasisgrabado</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.tipoCombustible')">Tipo Combustible</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.clasificacionAutomovil')">Clasificacion Automovil</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.cliente')">Cliente</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.marca')">Marca</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.tipoAutomovil')">Tipo Automovil</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.automovil.averias')" >Averias</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="automovil in automovils"
                    :key="automovil.id">
                    <td>
                        <router-link :to="{name: 'AutomovilView', params: {automovilId: automovil.id}}">{{automovil.id}}</router-link>
                    </td>
                    <td>{{automovil.placa}}</td>
                    <td>{{automovil.modelo}}</td>
                    <td>{{automovil.color}}</td>
                    <td>{{automovil.year}}</td>
                    <td>{{automovil.nasientos}}</td>
                    <td>{{automovil.estadogeneralautomovil}}</td>
                    <td>{{automovil.numeromotor}}</td>
                    <td>{{automovil.numerochasisgrabado}}</td>
                    <td>
                        <div v-if="automovil.tipoCombustible">
                            <router-link :to="{name: 'TipoCombustibleView', params: {tipoCombustibleId: automovil.tipoCombustible.id}}">{{ automovil.tipoCombustible.id}}-){{automovil.tipoCombustible.combustible}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="automovil.clasificacionAutomovil">
                            <router-link :to="{name: 'ClasificacionAutomovilView', params: {clasificacionAutomovilId: automovil.clasificacionAutomovil.id}}">{{automovil.clasificacionAutomovil.id}}-){{automovil.clasificacionAutomovil.clasificacion}} </router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="automovil.cliente">
                            <router-link :to="{name: 'ClienteView', params: {clienteId: automovil.cliente.id}}">{{automovil.cliente.id}}-){{automovil.cliente.nombre}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="automovil.marca">
                            <router-link :to="{name: 'MarcaView', params: {marcaId: automovil.marca.id}}">{{automovil.marca.id}}-){{automovil.marca.marca}}</router-link>
                        </div>
                    </td>
                    <td>

                        <div v-if="automovil.tipoAutomovil">
                            <router-link :to="{name: 'TipoAutomovilView', params: {tipoAutomovilId: automovil.tipoAutomovil.id}}">{{automovil.tipoAutomovil.id}}-){{automovil.tipoAutomovil.tipo}}</router-link>
                        </div>
                    </td>
                    <td>
                    <router-link :to="{name: 'AveriaVehicule', params: {automovilId: automovil.id}}" tag="button" class="btn btn-info btn-sm">
                        <font-awesome-icon icon="eye"></font-awesome-icon>
                        <span class="d-none d-md-inline" v-text="$t('entity.action.view')">Averias</span>
                    </router-link>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AutomovilView', params: {automovilId: automovil.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'AutomovilEdit', params: {automovilId: automovil.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(automovil)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.automovil.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-automovil-heading" v-text="$t('tallerMecanicoPoeApp.automovil.delete.question', {'id': removeId})">Are you sure you want to delete this Automovil?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-automovil" v-text="$t('entity.action.delete')" v-on:click="removeAutomovil()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./automovil.component.ts">
</script>
