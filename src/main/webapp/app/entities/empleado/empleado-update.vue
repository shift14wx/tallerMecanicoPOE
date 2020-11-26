<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.empleado.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.empleado.home.createOrEditLabel')">Create or edit a Empleado</h2>
                <div>
                    <div class="form-group" v-if="empleado.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="empleado.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.empleado.nombre')" for="empleado-nombre">Nombre</label>
                        <input type="text" class="form-control" name="nombre" id="empleado-nombre"
                            :class="{'valid': !$v.empleado.nombre.$invalid, 'invalid': $v.empleado.nombre.$invalid }" v-model="$v.empleado.nombre.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.empleado.edad')" for="empleado-edad">Edad</label>
                        <input type="number" class="form-control" name="edad" id="empleado-edad"
                            :class="{'valid': !$v.empleado.edad.$invalid, 'invalid': $v.empleado.edad.$invalid }" v-model.number="$v.empleado.edad.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.empleado.dui')" for="empleado-dui">Dui</label>
                        <input type="text" class="form-control" name="dui" id="empleado-dui"
                            :class="{'valid': !$v.empleado.dui.$invalid, 'invalid': $v.empleado.dui.$invalid }" v-model="$v.empleado.dui.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.empleado.telefono')" for="empleado-telefono">Telefono</label>
                        <input type="text" class="form-control" name="telefono" id="empleado-telefono"
                            :class="{'valid': !$v.empleado.telefono.$invalid, 'invalid': $v.empleado.telefono.$invalid }" v-model="$v.empleado.telefono.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.empleado.rol')" for="empleado-rol">Rol</label>
                        <select class="form-control" id="empleado-rol" name="rol" v-model="empleado.rol">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="empleado.rol && rolOption.id === empleado.rol.id ? empleado.rol : rolOption" v-for="rolOption in rols" :key="rolOption.id">{{rolOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.empleado.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./empleado-update.component.ts">
</script>
