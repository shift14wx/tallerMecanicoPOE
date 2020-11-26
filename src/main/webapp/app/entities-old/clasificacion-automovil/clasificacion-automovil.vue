<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.clasificacionAutomovil.home.title')" id="clasificacion-automovil-heading">Clasificacion Automovils</span>
            <router-link :to="{name: 'ClasificacionAutomovilCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-clasificacion-automovil">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.clasificacionAutomovil.home.createLabel')">
                    Create a new Clasificacion Automovil
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
        <div class="alert alert-warning" v-if="!isFetching && clasificacionAutomovils && clasificacionAutomovils.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.clasificacionAutomovil.home.notFound')">No clasificacionAutomovils found</span>
        </div>
        <div class="table-responsive" v-if="clasificacionAutomovils && clasificacionAutomovils.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.clasificacionAutomovil.clasificacion')">Clasificacion</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="clasificacionAutomovil in clasificacionAutomovils"
                    :key="clasificacionAutomovil.id">
                    <td>
                        <router-link :to="{name: 'ClasificacionAutomovilView', params: {clasificacionAutomovilId: clasificacionAutomovil.id}}">{{clasificacionAutomovil.id}}</router-link>
                    </td>
                    <td>{{clasificacionAutomovil.clasificacion}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ClasificacionAutomovilView', params: {clasificacionAutomovilId: clasificacionAutomovil.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ClasificacionAutomovilEdit', params: {clasificacionAutomovilId: clasificacionAutomovil.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(clasificacionAutomovil)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.clasificacionAutomovil.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-clasificacionAutomovil-heading" v-text="$t('tallerMecanicoPoeApp.clasificacionAutomovil.delete.question', {'id': removeId})">Are you sure you want to delete this Clasificacion Automovil?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-clasificacionAutomovil" v-text="$t('entity.action.delete')" v-on:click="removeClasificacionAutomovil()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./clasificacion-automovil.component.ts">
</script>
