<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.servicio.home.title')" id="servicio-heading">Servicios</span>
            <router-link :to="{name: 'ServicioCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-servicio">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.servicio.home.createLabel')">
                    Create a new Servicio
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
        <div class="alert alert-warning" v-if="!isFetching && servicios && servicios.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.servicio.home.notFound')">No servicios found</span>
        </div>
        <div class="table-responsive" v-if="servicios && servicios.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.servicio.servicio')">Servicio</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="servicio in servicios"
                    :key="servicio.id">
                    <td>
                        <router-link :to="{name: 'ServicioView', params: {servicioId: servicio.id}}">{{servicio.id}}</router-link>
                    </td>
                    <td>{{servicio.servicio}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ServicioView', params: {servicioId: servicio.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ServicioEdit', params: {servicioId: servicio.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(servicio)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.servicio.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-servicio-heading" v-text="$t('tallerMecanicoPoeApp.servicio.delete.question', {'id': removeId})">Are you sure you want to delete this Servicio?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-servicio" v-text="$t('entity.action.delete')" v-on:click="removeServicio()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./servicio.component.ts">
</script>
