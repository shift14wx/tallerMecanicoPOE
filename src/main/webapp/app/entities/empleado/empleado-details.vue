<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="empleado">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.empleado.detail.title')">Empleado</span> {{empleado.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.empleado.nombre')">Nombre</span>
                    </dt>
                    <dd>
                        <span>{{empleado.nombre}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.empleado.edad')">Edad</span>
                    </dt>
                    <dd>
                        <span>{{empleado.edad}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.empleado.dui')">Dui</span>
                    </dt>
                    <dd>
                        <span>{{empleado.dui}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.empleado.telefono')">Telefono</span>
                    </dt>
                    <dd>
                        <span>{{empleado.telefono}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.empleado.rol')">Rol</span>
                    </dt>
                    <dd>
                        <div v-if="empleado.rol">
                            <router-link :to="{name: 'RolView', params: {rolId: empleado.rol.id}}">{{empleado.rol.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="empleado.id" :to="{name: 'EmpleadoEdit', params: {empleadoId: empleado.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./empleado-details.component.ts">
</script>
