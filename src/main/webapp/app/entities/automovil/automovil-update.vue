<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.automovil.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.automovil.home.createOrEditLabel')">Create or edit a Automovil</h2>
                <div>
                    <div class="form-group" v-if="automovil.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="automovil.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.placa')" for="automovil-placa">Placa</label>
                        <input type="text" class="form-control" name="placa" id="automovil-placa"
                            :class="{'valid': !$v.automovil.placa.$invalid, 'invalid': $v.automovil.placa.$invalid }" v-model="$v.automovil.placa.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.modelo')" for="automovil-modelo">Modelo</label>
                        <input type="text" class="form-control" name="modelo" id="automovil-modelo"
                            :class="{'valid': !$v.automovil.modelo.$invalid, 'invalid': $v.automovil.modelo.$invalid }" v-model="$v.automovil.modelo.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.color')" for="automovil-color">Color</label>
                        <input type="text" class="form-control" name="color" id="automovil-color"
                            :class="{'valid': !$v.automovil.color.$invalid, 'invalid': $v.automovil.color.$invalid }" v-model="$v.automovil.color.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.year')" for="automovil-year">Year</label>
                        <input type="number" class="form-control" name="year" id="automovil-year"
                            :class="{'valid': !$v.automovil.year.$invalid, 'invalid': $v.automovil.year.$invalid }" v-model.number="$v.automovil.year.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.nasientos')" for="automovil-nasientos">Nasientos</label>
                        <input type="number" class="form-control" name="nasientos" id="automovil-nasientos"
                            :class="{'valid': !$v.automovil.nasientos.$invalid, 'invalid': $v.automovil.nasientos.$invalid }" v-model.number="$v.automovil.nasientos.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.estadogeneralautomovil')" for="automovil-estadogeneralautomovil">Estadogeneralautomovil</label>
                        <input type="text" class="form-control" name="estadogeneralautomovil" id="automovil-estadogeneralautomovil"
                            :class="{'valid': !$v.automovil.estadogeneralautomovil.$invalid, 'invalid': $v.automovil.estadogeneralautomovil.$invalid }" v-model="$v.automovil.estadogeneralautomovil.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.numeromotor')" for="automovil-numeromotor">Numeromotor</label>
                        <input type="text" class="form-control" name="numeromotor" id="automovil-numeromotor"
                            :class="{'valid': !$v.automovil.numeromotor.$invalid, 'invalid': $v.automovil.numeromotor.$invalid }" v-model="$v.automovil.numeromotor.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.numerochasisgrabado')" for="automovil-numerochasisgrabado">Numerochasisgrabado</label>
                        <input type="text" class="form-control" name="numerochasisgrabado" id="automovil-numerochasisgrabado"
                            :class="{'valid': !$v.automovil.numerochasisgrabado.$invalid, 'invalid': $v.automovil.numerochasisgrabado.$invalid }" v-model="$v.automovil.numerochasisgrabado.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.tipoCombustible')" for="automovil-tipoCombustible">Tipo Combustible</label>
                        <select class="form-control" id="automovil-tipoCombustible" name="tipoCombustible" v-model="automovil.tipoCombustible">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="automovil.tipoCombustible && tipoCombustibleOption.id === automovil.tipoCombustible.id ? automovil.tipoCombustible : tipoCombustibleOption" v-for="tipoCombustibleOption in tipoCombustibles" :key="tipoCombustibleOption.id">{{tipoCombustibleOption.combustible}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.clasificacionAutomovil')" for="automovil-clasificacionAutomovil">Clasificacion Automovil</label>
                        <select class="form-control" id="automovil-clasificacionAutomovil" name="clasificacionAutomovil" v-model="automovil.clasificacionAutomovil">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="automovil.clasificacionAutomovil && clasificacionAutomovilOption.id === automovil.clasificacionAutomovil.id ? automovil.clasificacionAutomovil : clasificacionAutomovilOption" v-for="clasificacionAutomovilOption in clasificacionAutomovils" :key="clasificacionAutomovilOption.id">{{clasificacionAutomovilOption.clasificacion}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.cliente')" for="automovil-cliente">Cliente</label>
                        <select class="form-control" id="automovil-cliente" name="cliente" v-model="automovil.cliente">
                            <option v-if="idCliente == 0" v-bind:value="null"></option>
                            <option v-if="idCliente == 0" v-bind:value="automovil.cliente && clienteOption.id === automovil.cliente.id ? automovil.cliente : clienteOption" v-for="clienteOption in clientes" :key="clienteOption.id">{{clienteOption.nombre}}</option>
                            <option v-for="clienteOption in clientes" v-if="idCliente > 0 && clienteOption.id == idCliente" v-bind:value="clienteOption" :key="clienteOption.id">{{clienteOption.nombre}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.marca')" for="automovil-marca">Marca</label>
                        <select class="form-control" id="automovil-marca" name="marca" v-model="automovil.marca">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="automovil.marca && marcaOption.id === automovil.marca.id ? automovil.marca : marcaOption" v-for="marcaOption in marcas" :key="marcaOption.id">{{marcaOption.marca}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.automovil.tipoAutomovil')" for="automovil-tipoAutomovil">Tipo Automovil</label>
                        <select class="form-control" id="automovil-tipoAutomovil" name="tipoAutomovil" v-model="automovil.tipoAutomovil">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="automovil.tipoAutomovil && tipoAutomovilOption.id === automovil.tipoAutomovil.id ? automovil.tipoAutomovil : tipoAutomovilOption" v-for="tipoAutomovilOption in tipoAutomovils" :key="tipoAutomovilOption.id">{{tipoAutomovilOption.tipo}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.automovil.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./automovil-update.component.ts">
</script>
