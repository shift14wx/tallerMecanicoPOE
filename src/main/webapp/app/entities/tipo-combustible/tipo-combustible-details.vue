<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="tipoCombustible">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.tipoCombustible.detail.title')">TipoCombustible</span> {{tipoCombustible.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.tipoCombustible.combustible')">Combustible</span>
                    </dt>
                    <dd>
                        <span>{{tipoCombustible.combustible}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="tipoCombustible.id" :to="{name: 'TipoCombustibleEdit', params: {tipoCombustibleId: tipoCombustible.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./tipo-combustible-details.component.ts">
</script>
