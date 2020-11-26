<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="estadoAveria">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.estadoAveria.detail.title')">EstadoAveria</span> {{estadoAveria.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.estadoAveria.estado')">Estado</span>
                    </dt>
                    <dd>
                        <span>{{estadoAveria.estado}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.estadoAveria.descripcion')">Descripcion</span>
                    </dt>
                    <dd>
                        <span>{{estadoAveria.descripcion}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="estadoAveria.id" :to="{name: 'EstadoAveriaEdit', params: {estadoAveriaId: estadoAveria.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./estado-averia-details.component.ts">
</script>
