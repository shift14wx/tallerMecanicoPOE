<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.entrada.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.entrada.home.createOrEditLabel')">Create or edit a Entrada</h2>
                <div>
                    <div class="form-group" v-if="entrada.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="entrada.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.entrada.descripcion')" for="entrada-descripcion">Descripcion</label>
                        <input type="text" class="form-control" name="descripcion" id="entrada-descripcion"
                            :class="{'valid': !$v.entrada.descripcion.$invalid, 'invalid': $v.entrada.descripcion.$invalid }" v-model="$v.entrada.descripcion.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.entrada.activa')" for="entrada-activa">Activa</label>
                        <input type="checkbox" class="form-check" name="activa" id="entrada-activa"
                            :class="{'valid': !$v.entrada.activa.$invalid, 'invalid': $v.entrada.activa.$invalid }" v-model="$v.entrada.activa.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.entrada.precio')" for="entrada-precio">Precio</label>
                        <input type="number" class="form-control" name="precio" id="entrada-precio"
                            :class="{'valid': !$v.entrada.precio.$invalid, 'invalid': $v.entrada.precio.$invalid }" v-model.number="$v.entrada.precio.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.entrada.servicio')" for="entrada-servicio">Servicio</label>
                        <select class="form-control" id="entrada-servicio" name="servicio" v-model="entrada.servicio">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="entrada.servicio && servicioOption.id === entrada.servicio.id ? entrada.servicio : servicioOption" v-for="servicioOption in servicios" :key="servicioOption.id">{{servicioOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.entrada.averia')" for="entrada-averia">Averia</label>
                        <select class="form-control" id="entrada-averia" name="averia" v-model="entrada.averia">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="entrada.averia && averiaOption.id === entrada.averia.id ? entrada.averia : averiaOption" v-for="averiaOption in averias" :key="averiaOption.id">{{averiaOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.entrada.empleado')" for="entrada-empleado">Empleado</label>
                        <select class="form-control" id="entrada-empleado" name="empleado" v-model="entrada.empleado">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="entrada.empleado && empleadoOption.id === entrada.empleado.id ? entrada.empleado : empleadoOption" v-for="empleadoOption in empleados" :key="empleadoOption.id">{{empleadoOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.entrada.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./entrada-update.component.ts">
</script>
