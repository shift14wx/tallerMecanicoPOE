<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="pago">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.pago.detail.title')">Pago</span> {{pago.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.pago.fechaPago')">Fecha Pago</span>
                    </dt>
                    <dd>
                        <span>{{pago.fechaPago}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.pago.total')">Total</span>
                    </dt>
                    <dd>
                        <span>{{pago.total}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.pago.averia')">Averia</span>
                    </dt>
                    <dd>
                        <div v-if="pago.averia">
                            <router-link :to="{name: 'AveriaView', params: {averiaId: pago.averia.id}}">{{pago.averia.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="pago.id" :to="{name: 'PagoEdit', params: {pagoId: pago.id, averiaId : averiaId}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>

                <a v-bind:href="'/api/averia/pago/invoice?averiaId='+pago.averia.id+'&pagoId='+pago.id" target="_blank" class="btn btn-warning">
                    <font-awesome-icon icon="eye"></font-awesome-icon>&nbsp;<span> Imprimir ticket</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./pago-details.component.ts">
</script>
