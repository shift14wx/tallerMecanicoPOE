<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('tallerMecanicoPoeApp.averia.home.title')" id="averia-heading">Averias</span>
            <router-link :to="{name: 'AveriaCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-averia">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('tallerMecanicoPoeApp.averia.home.createLabel')">
                    Create a new Averia
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
        <div class="alert alert-warning" v-if="!isFetching && averias && averias.length === 0">
            <span v-text="$t('tallerMecanicoPoeApp.averia.home.notFound')">No averias found</span>
        </div>
        <div class="table-responsive" v-if="averias && averias.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.averia.fechaAveria')">Fecha Averia</span></th>
                    <th><span >Descripcion</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.averia.automovil')">Automovil</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.averia.estado')">Estado averia</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.averia.RealEstado')" >Estado de pagos</span></th>
                    <th><span v-text="$t('tallerMecanicoPoeApp.averia.IrPagos')">Ver Pagos</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="averia in averias"
                    :key="averia.id">
                    <td>
                        <router-link :to="{name: 'AveriaView', params: {averiaId: averia.id}}">{{averia.id}}</router-link>
                    </td>
                    <td>{{averia.fechaAveria}}</td>
                    <td>{{averia.descripcion}}</td>
                    <td>
                        <div v-if="averia.automovil">
                            <router-link :to="{name: 'AutomovilView', params: {automovilId: averia.automovil.id}}">{{averia.automovil.id}} -) {{ averia.automovil.marca }} {{ averia.automovil.modelo }}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="averia.estadoAveria">
                            <router-link :to="{name: 'EstadoAveriaView', params: {estadoAveriaId: averia.estadoAveria.id}}">{{averia.estadoAveria.estado}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div :class="{'alert alert-warning':!averia.pagado,'alert alert-success': averia.pagado}">{{ !averia.pagado ? 'Pendiente' : 'Solventada'}}</div>
                    </td>
                    <td>
                        <router-link :to="{name: 'Pago', params: {averiaId: averia.id}}" tag="button" class="btn btn-info btn-sm details">
                            <font-awesome-icon icon="eye"></font-awesome-icon>
                            <span class="d-none d-md-inline" >Ver Pagos</span>
                        </router-link>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AveriaView', params: {averiaId: averia.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'AveriaEdit', params: {averiaId: averia.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(averia)"
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
            <span slot="modal-title"><span id="tallerMecanicoPoeApp.averia.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-averia-heading" v-text="$t('tallerMecanicoPoeApp.averia.delete.question', {'id': removeId})">Are you sure you want to delete this Averia?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-averia" v-text="$t('entity.action.delete')" v-on:click="removeAveria()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./averia.component.ts">
</script>
