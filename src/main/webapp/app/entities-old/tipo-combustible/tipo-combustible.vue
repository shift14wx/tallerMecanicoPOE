<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.tipoCombustible.home.title')" id="tipo-combustible-heading">Tipo Combustibles</span>
            <router-link :to="{name: 'TipoCombustibleCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-tipo-combustible">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.tipoCombustible.home.createLabel')">
                    Create a new Tipo Combustible
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
        <div class="alert alert-warning" v-if="!isFetching && tipoCombustibles && tipoCombustibles.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.tipoCombustible.home.notFound')">No tipoCombustibles found</span>
        </div>
        <div class="table-responsive" v-if="tipoCombustibles && tipoCombustibles.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.tipoCombustible.combustible')">Combustible</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tipoCombustible in tipoCombustibles"
                    :key="tipoCombustible.id">
                    <td>
                        <router-link :to="{name: 'TipoCombustibleView', params: {tipoCombustibleId: tipoCombustible.id}}">{{tipoCombustible.id}}</router-link>
                    </td>
                    <td>{{tipoCombustible.combustible}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TipoCombustibleView', params: {tipoCombustibleId: tipoCombustible.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TipoCombustibleEdit', params: {tipoCombustibleId: tipoCombustible.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(tipoCombustible)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.tipoCombustible.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-tipoCombustible-heading" v-text="$t('tallerMecanicoPoeApp.tipoCombustible.delete.question', {'id': removeId})">Are you sure you want to delete this Tipo Combustible?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-tipoCombustible" v-text="$t('entity.action.delete')" v-on:click="removeTipoCombustible()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./tipo-combustible.component.ts">
</script>
