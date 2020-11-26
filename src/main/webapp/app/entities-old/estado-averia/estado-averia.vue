<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.estadoAveria.home.title')" id="estado-averia-heading">Estado Averias</span>
            <router-link :to="{name: 'EstadoAveriaCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-estado-averia">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.estadoAveria.home.createLabel')">
                    Create a new Estado Averia
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
        <div class="alert alert-warning" v-if="!isFetching && estadoAverias && estadoAverias.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.estadoAveria.home.notFound')">No estadoAverias found</span>
        </div>
        <div class="table-responsive" v-if="estadoAverias && estadoAverias.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.estadoAveria.estado')">Estado</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.estadoAveria.descripcion')">Descripcion</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="estadoAveria in estadoAverias"
                    :key="estadoAveria.id">
                    <td>
                        <router-link :to="{name: 'EstadoAveriaView', params: {estadoAveriaId: estadoAveria.id}}">{{estadoAveria.id}}</router-link>
                    </td>
                    <td>{{estadoAveria.estado}}</td>
                    <td>{{estadoAveria.descripcion}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EstadoAveriaView', params: {estadoAveriaId: estadoAveria.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EstadoAveriaEdit', params: {estadoAveriaId: estadoAveria.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(estadoAveria)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.estadoAveria.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-estadoAveria-heading" v-text="$t('tallerMecanicoPoeApp.estadoAveria.delete.question', {'id': removeId})">Are you sure you want to delete this Estado Averia?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-estadoAveria" v-text="$t('entity.action.delete')" v-on:click="removeEstadoAveria()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./estado-averia.component.ts">
</script>
