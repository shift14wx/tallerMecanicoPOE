<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.entrada.home.title')" id="entrada-heading">Entrada{{ idAveria == 0 ? 's' : '' }}</span>
            <span> {{ idAveria > 0 ? 'de la averia con id: '+idAveria : '' }} </span>
            <router-link :to="{name: 'EntradaCreate', params:{ 'averiaId': idAveria }}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-entrada">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.entrada.home.createLabel')">
                    Create a new Entrada
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
        <div class="alert alert-warning" v-if="!isFetching && entradas && entradas.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.entrada.home.notFound')">No entradas found</span>
        </div>
        <div class="table-responsive" v-if="entradas && entradas.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.entrada.descripcion')">Descripcion</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.entrada.activa')">Activa</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.entrada.precio')">Precio</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.entrada.servicio')">Servicio</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.entrada.averia')">Averia</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.entrada.empleado')">Empleado</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="entrada in entradas"
                    :key="entrada.id">
                    <td>
                        <router-link :to="{name: 'EntradaView', params: {entradaId: entrada.id}}">{{entrada.id}}</router-link>
                    </td>
                    <td>{{entrada.descripcion}}</td>
                    <td>{{entrada.activa}}</td>
                    <td>{{entrada.precio}}</td>
                    <td>
                        <div v-if="entrada.servicio">
                            <router-link :to="{name: 'ServicioView', params: {servicioId: entrada.servicio.id}}">{{entrada.servicio.servicio}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="entrada.averia">
                            <router-link :to="{name: 'AveriaView', params: {averiaId: entrada.averia.id}}">{{entrada.averia.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="entrada.empleado">
                            <router-link :to="{name: 'EmpleadoView', params: {empleadoId: entrada.empleado.id}}">{{entrada.empleado.nombre}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EntradaView', params: {entradaId: entrada.id, averiaId: idAveria}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EntradaEdit', params: {entradaId: entrada.id, 'averiaId': idAveria}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(entrada)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.entrada.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-entrada-heading" v-text="$t('tallerMecanicoPoeApp.entrada.delete.question', {'id': removeId})">Are you sure you want to delete this Entrada?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-entrada" v-text="$t('entity.action.delete')" v-on:click="removeEntrada()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./entrada.component.ts">
</script>
