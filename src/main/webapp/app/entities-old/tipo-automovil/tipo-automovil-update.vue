<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.tipoAutomovil.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.home.createOrEditLabel')">Create or edit a TipoAutomovil</h2>
                <div>
                    <div class="form-group" v-if="tipoAutomovil.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="tipoAutomovil.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.tipoAutomovil.tipo')" for="tipo-automovil-tipo">Tipo</label>
                        <input type="text" class="form-control" name="tipo" id="tipo-automovil-tipo"
                            :class="{'valid': !$v.tipoAutomovil.tipo.$invalid, 'invalid': $v.tipoAutomovil.tipo.$invalid }" v-model="$v.tipoAutomovil.tipo.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.tipoAutomovil.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./tipo-automovil-update.component.ts">
</script>
