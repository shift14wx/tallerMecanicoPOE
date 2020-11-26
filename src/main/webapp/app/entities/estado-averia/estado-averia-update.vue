<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.estadoAveria.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.estadoAveria.home.createOrEditLabel')">Create or edit a EstadoAveria</h2>
                <div>
                    <div class="form-group" v-if="estadoAveria.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="estadoAveria.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.estadoAveria.estado')" for="estado-averia-estado">Estado</label>
                        <input type="text" class="form-control" name="estado" id="estado-averia-estado"
                            :class="{'valid': !$v.estadoAveria.estado.$invalid, 'invalid': $v.estadoAveria.estado.$invalid }" v-model="$v.estadoAveria.estado.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.estadoAveria.descripcion')" for="estado-averia-descripcion">Descripcion</label>
                        <input type="text" class="form-control" name="descripcion" id="estado-averia-descripcion"
                            :class="{'valid': !$v.estadoAveria.descripcion.$invalid, 'invalid': $v.estadoAveria.descripcion.$invalid }" v-model="$v.estadoAveria.descripcion.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.estadoAveria.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./estado-averia-update.component.ts">
</script>
