<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.cliente.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.cliente.home.createOrEditLabel')">Create or edit a Cliente</h2>
                <div>
                    <div class="form-group" v-if="cliente.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="cliente.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.cliente.nombre')" for="cliente-nombre">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="cliente-nombre"
                            :class="{'valid': !$v.cliente.nombre.$invalid, 'invalid': $v.cliente.nombre.$invalid }" v-model="$v.cliente.nombre.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.cliente.telefono')" for="cliente-telefono">Telefono</label>
                        <input type="text" class="form-control" name="telefono" id="cliente-telefono"
                            :class="{'valid': !$v.cliente.telefono.$invalid, 'invalid': $v.cliente.telefono.$invalid }" v-model="$v.cliente.telefono.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.cliente.email')" for="cliente-email">Email</label>
                        <input type="text" class="form-control" name="email" id="cliente-email"
                            :class="{'valid': !$v.cliente.email.$invalid, 'invalid': $v.cliente.email.$invalid }" v-model="$v.cliente.email.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.cliente.dui')" for="cliente-dui">Dui</label>
                        <input type="text" class="form-control" name="dui" id="cliente-dui"
                            :class="{'valid': !$v.cliente.dui.$invalid, 'invalid': $v.cliente.dui.$invalid }" v-model="$v.cliente.dui.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.cliente.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./cliente-update.component.ts">
</script>
