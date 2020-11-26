<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="entrada">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.entrada.detail.title')">Entrada</span> {{entrada.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.entrada.descripcion')">Descripcion</span>
                    </dt>
                    <dd>
                        <span>{{entrada.descripcion}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.entrada.activa')">Activa</span>
                    </dt>
                    <dd>
                        <span>{{entrada.activa}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.entrada.precio')">Precio</span>
                    </dt>
                    <dd>
                        <span>{{entrada.precio}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.entrada.servicio')">Servicio</span>
                    </dt>
                    <dd>
                        <div v-if="entrada.servicio">
                            <router-link :to="{name: 'ServicioView', params: {servicioId: entrada.servicio.id}}">{{entrada.servicio.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.entrada.averia')">Averia</span>
                    </dt>
                    <dd>
                        <div v-if="entrada.averia">
                            <router-link :to="{name: 'AveriaView', params: {averiaId: entrada.averia.id}}">{{entrada.averia.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.entrada.empleado')">Empleado</span>
                    </dt>
                    <dd>
                        <div v-if="entrada.empleado">
                            <router-link :to="{name: 'EmpleadoView', params: {empleadoId: entrada.empleado.id}}">{{entrada.empleado.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="entrada.id" :to="{name: 'EntradaEdit', params: {entradaId: entrada.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./entrada-details.component.ts">
</script>
