<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.home.title')" id="tipo-automovil-heading">Tipo Automovils</span>
            <router-link :to="{name: 'TipoAutomovilCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-tipo-automovil">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.home.createLabel')">
                    Create a new Tipo Automovil
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
        <div class="alert alert-warning" v-if="!isFetching && tipoAutomovils && tipoAutomovils.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.home.notFound')">No tipoAutomovils found</span>
        </div>
        <div class="table-responsive" v-if="tipoAutomovils && tipoAutomovils.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.tipo')">Tipo</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tipoAutomovil in tipoAutomovils"
                    :key="tipoAutomovil.id">
                    <td>
                        <router-link :to="{name: 'TipoAutomovilView', params: {tipoAutomovilId: tipoAutomovil.id}}">{{tipoAutomovil.id}}</router-link>
                    </td>
                    <td>{{tipoAutomovil.tipo}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TipoAutomovilView', params: {tipoAutomovilId: tipoAutomovil.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TipoAutomovilEdit', params: {tipoAutomovilId: tipoAutomovil.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(tipoAutomovil)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.tipoAutomovil.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-tipoAutomovil-heading" v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.delete.question', {'id': removeId})">Are you sure you want to delete this Tipo Automovil?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-tipoAutomovil" v-text="$t('entity.action.delete')" v-on:click="removeTipoAutomovil()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./tipo-automovil.component.ts">
</script>
