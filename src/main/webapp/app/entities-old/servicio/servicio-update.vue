<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.servicio.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.servicio.home.createOrEditLabel')">Create or edit a Servicio</h2>
                <div>
                    <div class="form-group" v-if="servicio.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="servicio.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.servicio.servicio')" for="servicio-servicio">Servicio</label>
                        <input type="text" class="form-control" name="servicio" id="servicio-servicio"
                            :class="{'valid': !$v.servicio.servicio.$invalid, 'invalid': $v.servicio.servicio.$invalid }" v-model="$v.servicio.servicio.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.servicio.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./servicio-update.component.ts">
</script>
