<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.home.title')" id="bitacora-averia-heading">Bitacora Averias</span>
            <router-link :to="{name: 'BitacoraAveriaCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-bitacora-averia">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.home.createLabel')">
                    Create a new Bitacora Averia
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
        <div class="alert alert-warning" v-if="!isFetching && bitacoraAverias && bitacoraAverias.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.home.notFound')">No bitacoraAverias found</span>
        </div>
        <div class="table-responsive" v-if="bitacoraAverias && bitacoraAverias.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.descripcion')">Descripcion</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.fechaBitacora')">Fecha Bitacora</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.averia')">Averia</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="bitacoraAveria in bitacoraAverias"
                    :key="bitacoraAveria.id">
                    <td>
                        <router-link :to="{name: 'BitacoraAveriaView', params: {bitacoraAveriaId: bitacoraAveria.id}}">{{bitacoraAveria.id}}</router-link>
                    </td>
                    <td>{{bitacoraAveria.descripcion}}</td>
                    <td>{{bitacoraAveria.fechaBitacora}}</td>
                    <td>
                        <div v-if="bitacoraAveria.averia">
                            <router-link :to="{name: 'AveriaView', params: {averiaId: bitacoraAveria.averia.id}}">{{bitacoraAveria.averia.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BitacoraAveriaView', params: {bitacoraAveriaId: bitacoraAveria.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BitacoraAveriaEdit', params: {bitacoraAveriaId: bitacoraAveria.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(bitacoraAveria)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.bitacoraAveria.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-bitacoraAveria-heading" v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.delete.question', {'id': removeId})">Are you sure you want to delete this Bitacora Averia?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-bitacoraAveria" v-text="$t('entity.action.delete')" v-on:click="removeBitacoraAveria()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./bitacora-averia.component.ts">
</script>
