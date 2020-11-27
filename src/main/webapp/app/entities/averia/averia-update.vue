<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.averia.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.averia.home.createOrEditLabel')">Create or edit a Averia</h2>
                <div>
                    <div class="form-group" v-if="averia.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="averia.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.averia.fechaAveria')" for="averia-fechaAveria">Fecha Averia</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="averia-fechaAveria"
                                    v-model="$v.averia.fechaAveria.$model"
                                    name="fechaAveria"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="averia-fechaAveria" type="text" class="form-control" name="fechaAveria"  :class="{'valid': !$v.averia.fechaAveria.$invalid, 'invalid': $v.averia.fechaAveria.$invalid }"
                                          v-model="$v.averia.fechaAveria.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.averia.descripcion')" for="averia-descripcion">Descripcion</label>
                        <input type="text" class="form-control" name="descripcion" id="averia-descripcion"
                               :class="{'valid': !$v.averia.descripcion.$invalid, 'invalid': $v.averia.descripcion.$invalid }" v-model="$v.averia.descripcion.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.averia.automovil')" for="averia-automovil">Automovil</label>
                        <select class="form-control" id="averia-automovil" name="automovil" v-model="averia.automovil">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="averia.automovil && automovilOption.id === averia.automovil.id ? averia.automovil : automovilOption" v-for="automovilOption in automovils" :key="automovilOption.id">{{automovilOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.averia.estadoAveria')" for="averia-estadoAveria">Estado Averia</label>
                        <select class="form-control" id="averia-estadoAveria" name="estadoAveria" v-model="averia.estadoAveria">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="averia.estadoAveria && estadoAveriaOption.id === averia.estadoAveria.id ? averia.estadoAveria : estadoAveriaOption" v-for="estadoAveriaOption in estadoAverias" :key="estadoAveriaOption.id">{{estadoAveriaOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.averia.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./averia-update.component.ts">
</script>
