<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="servicio">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.servicio.detail.title')">Servicio</span> {{servicio.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.servicio.servicio')">Servicio</span>
                    </dt>
                    <dd>
                        <span>{{servicio.servicio}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="servicio.id" :to="{name: 'ServicioEdit', params: {servicioId: servicio.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./servicio-details.component.ts">
</script>
