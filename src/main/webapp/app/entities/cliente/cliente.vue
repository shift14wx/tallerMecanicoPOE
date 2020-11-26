<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.cliente.home.title')" id="cliente-heading">Clientes</span>
            <router-link :to="{name: 'ClienteCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-cliente">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.cliente.home.createLabel')">
                    Create a new Cliente
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
        <div class="alert alert-warning" v-if="!isFetching && clientes && clientes.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.cliente.home.notFound')">No clientes found</span>
        </div>
        <div class="table-responsive" v-if="clientes && clientes.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.cliente.nombre')">Nombre</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.cliente.telefono')">Telefono</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.cliente.email')">Email</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.cliente.dui')">Dui</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="cliente in clientes"
                    :key="cliente.id">
                    <td>
                        <router-link :to="{name: 'ClienteView', params: {clienteId: cliente.id}}">{{cliente.id}}</router-link>
                    </td>
                    <td>{{cliente.nombre}}</td>
                    <td>{{cliente.telefono}}</td>
                    <td>{{cliente.email}}</td>
                    <td>{{cliente.dui}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ClienteView', params: {clienteId: cliente.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ClienteEdit', params: {clienteId: cliente.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(cliente)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.cliente.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-cliente-heading" v-text="$t('tallerMecanicoPoeApp.cliente.delete.question', {'id': removeId})">Are you sure you want to delete this Cliente?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-cliente" v-text="$t('entity.action.delete')" v-on:click="removeCliente()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./cliente.component.ts">
</script>
