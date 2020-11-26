<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="tallerMecanicoPoeApp.pago.home.createOrEditLabel" v-text="$t('tallerMecanicoPoeApp.pago.home.createOrEditLabel')">Create or edit a Pago</h2>
                <div>
                    <div class="form-group" v-if="pago.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="pago.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.pago.fechaPago')" for="pago-fechaPago">Fecha Pago</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="pago-fechaPago"
                                    v-model="$v.pago.fechaPago.$model"
                                    name="fechaPago"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="pago-fechaPago" type="text" class="form-control" name="fechaPago"  :class="{'valid': !$v.pago.fechaPago.$invalid, 'invalid': $v.pago.fechaPago.$invalid }"
                            v-model="$v.pago.fechaPago.$model"  />
                        </b-input-group>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.pago.total')" for="pago-total">Total</label>
                        <input type="number" class="form-control" name="total" id="pago-total"
                            :class="{'valid': !$v.pago.total.$invalid, 'invalid': $v.pago.total.$invalid }" v-model.number="$v.pago.total.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('tallerMecanicoPoeApp.pago.averia')" for="pago-averia">Averia</label>
                        <select class="form-control" id="pago-averia" name="averia" v-model="pago.averia">
                            <option v-if="!averiaId" v-bind:value="null"></option>
                            <option v-if="!averiaId" v-bind:value="pago.averia && averiaOption.id === pago.averia.id ? pago.averia : averiaOption" v-for="averiaOption in averias" :key="averiaOption.id">{{averiaOption.id}}</option>
                            <option v-if="averiaId>0" v-bind:value="pago.averia" > {{averiaId}}  </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.pago.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./pago-update.component.ts">
</script>
