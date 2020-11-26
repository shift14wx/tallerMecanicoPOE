<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="averia">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.averia.detail.title')">Averia</span> {{averia.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.averia.fechaAveria')">Fecha Averia</span>
                    </dt>
                    <dd>
                        <span>{{averia.fechaAveria}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.averia.descripcion')">Descripcion</span>
                    </dt>
                    <dd>
                        <span>{{averia.descripcion}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.averia.servicio')">Servicio</span>
                    </dt>
                    <dd>
                        <div v-if="averia.servicio">
                            <router-link :to="{name: 'ServicioView', params: {servicioId: averia.servicio.id}}">{{averia.servicio.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.averia.estadoAveria')">Estado Averia</span>
                    </dt>
                    <dd>
                        <div v-if="averia.estadoAveria">
                            <router-link :to="{name: 'EstadoAveriaView', params: {estadoAveriaId: averia.estadoAveria.id}}">{{averia.estadoAveria.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="averia.id" :to="{name: 'AveriaEdit', params: {averiaId: averia.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./averia-details.component.ts">
</script>
