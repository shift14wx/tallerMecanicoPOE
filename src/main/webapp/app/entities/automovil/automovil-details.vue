<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="automovil">
                <h2 class="jh-entity-heading"><span v-text="$t('tallerMecanicoPoeApp.automovil.detail.title')">Automovil</span> {{automovil.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.placa')">Placa</span>
                    </dt>
                    <dd>
                        <span>{{automovil.placa}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.modelo')">Modelo</span>
                    </dt>
                    <dd>
                        <span>{{automovil.modelo}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.color')">Color</span>
                    </dt>
                    <dd>
                        <span>{{automovil.color}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.year')">Year</span>
                    </dt>
                    <dd>
                        <span>{{automovil.year}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.nasientos')">Nasientos</span>
                    </dt>
                    <dd>
                        <span>{{automovil.nasientos}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.estadogeneralautomovil')">Estadogeneralautomovil</span>
                    </dt>
                    <dd>
                        <span>{{automovil.estadogeneralautomovil}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.numeromotor')">Numeromotor</span>
                    </dt>
                    <dd>
                        <span>{{automovil.numeromotor}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.numerochasisgrabado')">Numerochasisgrabado</span>
                    </dt>
                    <dd>
                        <span>{{automovil.numerochasisgrabado}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.tipoCombustible')">Tipo Combustible</span>
                    </dt>
                    <dd>
                        <div v-if="automovil.tipoCombustible">
                            <router-link :to="{name: 'TipoCombustibleView', params: {tipoCombustibleId: automovil.tipoCombustible.id}}">{{automovil.tipoCombustible.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.clasificacionAutomovil')">Clasificacion Automovil</span>
                    </dt>
                    <dd>
                        <div v-if="automovil.clasificacionAutomovil">
                            <router-link :to="{name: 'ClasificacionAutomovilView', params: {clasificacionAutomovilId: automovil.clasificacionAutomovil.id}}">{{automovil.clasificacionAutomovil.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.cliente')">Cliente</span>
                    </dt>
                    <dd>
                        <div v-if="automovil.cliente">
                            <router-link :to="{name: 'ClienteView', params: {clienteId: automovil.cliente.id}}">{{automovil.cliente.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.marca')">Marca</span>
                    </dt>
                    <dd>
                        <div v-if="automovil.marca">
                            <router-link :to="{name: 'MarcaView', params: {marcaId: automovil.marca.id}}">{{automovil.marca.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('tallerMecanicoPoeApp.automovil.tipoAutomovil')">Tipo Automovil</span>
                    </dt>
                    <dd>
                        <div v-if="automovil.tipoAutomovil">
                            <router-link :to="{name: 'TipoAutomovilView', params: {tipoAutomovilId: automovil.tipoAutomovil.id}}">{{automovil.tipoAutomovil.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="automovil.id" :to="{name: 'AutomovilEdit', params: {automovilId: automovil.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./automovil-details.component.ts">
</script>
