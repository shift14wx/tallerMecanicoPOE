<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.bitacoraAveria.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.home.createOrEditLabel')">Create or edit a BitacoraAveria</h2>
                <div>
                    <div class="form-group" v-if="bitacoraAveria.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="bitacoraAveria.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.descripcion')" for="bitacora-averia-descripcion">Descripcion</label>
                        <input type="text" class="form-control" name="descripcion" id="bitacora-averia-descripcion"
                            :class="{'valid': !$v.bitacoraAveria.descripcion.$invalid, 'invalid': $v.bitacoraAveria.descripcion.$invalid }" v-model="$v.bitacoraAveria.descripcion.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.fechaBitacora')" for="bitacora-averia-fechaBitacora">Fecha Bitacora</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="bitacora-averia-fechaBitacora"
                                    v-model="$v.bitacoraAveria.fechaBitacora.$model"
                                    name="fechaBitacora"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="bitacora-averia-fechaBitacora" type="text" class="form-control" name="fechaBitacora"  :class="{'valid': !$v.bitacoraAveria.fechaBitacora.$invalid, 'invalid': $v.bitacoraAveria.fechaBitacora.$invalid }"
                            v-model="$v.bitacoraAveria.fechaBitacora.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.averia')" for="bitacora-averia-averia">Averia</label>
                        <select class="form-control" id="bitacora-averia-averia" name="averia" v-model="bitacoraAveria.averia">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="bitacoraAveria.averia && averiaOption.id === bitacoraAveria.averia.id ? bitacoraAveria.averia : averiaOption" v-for="averiaOption in averias" :key="averiaOption.id">{{averiaOption.id}}  -) {{averiaOption.descripcion}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.bitacoraAveria.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./bitacora-averia-update.component.ts">
</script>
