<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="marca">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.marca.detail.title')">Marca</span> {{marca.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.marca.marca')">Marca</span>
                    </dt>
                    <dd>
                        <span>{{marca.marca}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="marca.id" :to="{name: 'MarcaEdit', params: {marcaId: marca.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./marca-details.component.ts">
</script>
