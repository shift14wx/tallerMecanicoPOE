<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="bitacoraAveria">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.detail.title')">BitacoraAveria</span> {{bitacoraAveria.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.descripcion')">Descripcion</span>
                    </dt>
                    <dd>
                        <span>{{bitacoraAveria.descripcion}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.fechaBitacora')">Fecha Bitacora</span>
                    </dt>
                    <dd>
                        <span>{{bitacoraAveria.fechaBitacora}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.bitacoraAveria.averia')">Averia</span>
                    </dt>
                    <dd>
                        <div v-if="bitacoraAveria.averia">
                            <router-link :to="{name: 'AveriaView', params: {averiaId: bitacoraAveria.averia.id}}">{{bitacoraAveria.averia.id}} -) {{bitacoraAveria.averia.descripcion}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="bitacoraAveria.id" :to="{name: 'BitacoraAveriaEdit', params: {bitacoraAveriaId: bitacoraAveria.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./bitacora-averia-details.component.ts">
</script>
