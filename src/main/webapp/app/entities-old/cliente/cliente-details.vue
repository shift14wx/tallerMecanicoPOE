<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="cliente">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.cliente.detail.title')">Cliente</span> {{cliente.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.cliente.nombre')">Nombre</span>
                    </dt>
                    <dd>
                        <span>{{cliente.nombre}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.cliente.telefono')">Telefono</span>
                    </dt>
                    <dd>
                        <span>{{cliente.telefono}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.cliente.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{cliente.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.cliente.dui')">Dui</span>
                    </dt>
                    <dd>
                        <span>{{cliente.dui}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="cliente.id" :to="{name: 'ClienteEdit', params: {clienteId: cliente.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./cliente-details.component.ts">
</script>
