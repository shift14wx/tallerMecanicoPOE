<template>
    <b-navbar toggleable="md" type="dark" class="bg-primary">
        <b-navbar-brand class="logo" b-link to="/">
            <span class="logo-img"></span>
            <span v-text="$t('global.title')" class="navbar-title">TallerMecanicoPOE</span> <span class="navbar-version">{{version}}</span>
        </b-navbar-brand>
        <b-navbar-toggle
        right
        class="jh-navbar-toggler d-lg-none"
        href="javascript:void(0);"
        data-toggle="collapse"
        target="header-tabs"
        aria-expanded="false"
        aria-label="Toggle navigation">
            <font-awesome-icon icon="bars" />
        </b-navbar-toggle>

        <b-collapse is-nav id="header-tabs">
            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/" exact>
                    <span>
                        <font-awesome-icon icon="home" />
                        <span v-text="$t('global.menu.home')">Home</span>
                    </span>
                </b-nav-item>
                <b-nav-item-dropdown
                    right
                    id="entity-menu"
                    v-if="authenticated"
                    active-class="active" class="pointer">
                    <span slot="button-content" class="navbar-dropdown-menu">
                        <font-awesome-icon icon="th-list" />
                        <span v-text="$t('global.menu.entities.main')">Entities</span>
                    </span>
                    <b-dropdown-item to="/automovil">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.automovil')">Automovil</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/tipo-combustible">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.tipoCombustible')">TipoCombustible</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/clasificacion-automovil">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.clasificacionAutomovil')">ClasificacionAutomovil</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/cliente">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.cliente')">Cliente</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/marca">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.marca')">Marca</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/tipo-automovil">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.tipoAutomovil')">TipoAutomovil</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/averia">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.averia')">Averia</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/estado-averia">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.estadoAveria')">EstadoAveria</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/servicio">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.servicio')">Servicio</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/bitacora-averia">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.bitacoraAveria')">BitacoraAveria</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/entrada">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.entrada')">Entrada</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/empleado">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.empleado')">Empleado</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/rol">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.rol')">Rol</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/pago">
                        <font-awesome-icon icon="asterisk" />
                        <span v-text="$t('global.menu.entities.pago')">Pago</span>
                    </b-dropdown-item>
                    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    right
                    id="admin-menu"
                    v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated"
                    :class="{'router-link-active': subIsActive('/admin')}"
                    active-class="active"
                    class="pointer">
                    <span slot="button-content" class="navbar-dropdown-menu">
                        <font-awesome-icon icon="cogs" />
                        <span v-text="$t('global.menu.admin.main')">Documentación</span>
                    </span>
                    <b-dropdown-item  to="/admin/audits" active-class="active">
                        <font-awesome-icon icon="bell" />
                        <span v-text="$t('global.menu.admin.audits')">Audits</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="swaggerEnabled"  to="/admin/docs" active-class="active">
                        <font-awesome-icon icon="book" />
                        <span v-text="$t('global.menu.admin.apidocs')">API</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="!inProduction"  href='./h2-console' target="_tab">
                        <font-awesome-icon icon="hdd" />
                        <span v-text="$t('global.menu.admin.database')">Database</span>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown id="languagesnavBarDropdown" right v-if="languages && Object.keys(languages).length > 1">
                    <span slot="button-content">
                        <font-awesome-icon icon="flag" />
                        <span v-text="$t('global.menu.language')">Language</span>
                    </span>
                    <b-dropdown-item v-for="(value, key) in languages" :key="`lang-${key}`" v-on:click="changeLanguage(key);"
                        :class="{ active: isActiveLanguage(key)}">
                        {{value.name}}
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown
                    right
                    href="javascript:void(0);"
                    id="account-menu"
                    :class="{'router-link-active': subIsActive('/account')}"
                    active-class="active"
                    class="pointer">
                    <span slot="button-content" class="navbar-dropdown-menu">
                        <font-awesome-icon icon="user" />
                        <span v-text="$t('global.menu.account.main')">
                            Account
                        </span>
                    </span>
                    <b-dropdown-item to="/account/settings" tag="b-dropdown-item" v-if="authenticated" active-class="active">
                        <font-awesome-icon icon="wrench" />
                        <span v-text="$t('global.menu.account.settings')">Settings</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/account/password" tag="b-dropdown-item" v-if="authenticated" active-class="active">
                        <font-awesome-icon icon="lock" />
                        <span v-text="$t('global.menu.account.password')">Password</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="authenticated"  v-on:click="logout()" id="logout" active-class="active">
                        <font-awesome-icon icon="sign-out-alt" />
                        <span v-text="$t('global.menu.account.logout')">Sign out</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="!authenticated"  v-on:click="openLogin()" id="login" active-class="active">
                        <font-awesome-icon icon="sign-in-alt" />
                        <span v-text="$t('global.menu.account.login')">Sign in</span>
                    </b-dropdown-item>
                    <b-dropdown-item to="/register" tag="b-dropdown-item" id="register" v-if="!authenticated" active-class="active">
                        <font-awesome-icon icon="user-plus" />
                        <span v-text="$t('global.menu.account.register')">Register</span>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts" src="./jhi-navbar.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ==========================================================================
    Navbar
    ========================================================================== */
.navbar-version {
  font-size: 10px;
}


@media screen and (min-width: 768px) {
  .jh-navbar-toggler {
    display: none;
  }
}

@media screen and (min-width: 768px) and (max-width: 1150px) {
  span span{
    display:none;
  }
}

.navbar-title {
  display: inline-block;
  vertical-align: middle;
}

/* ==========================================================================
    Logo styles
    ========================================================================== */
.navbar-brand.logo {
  padding: 5px 15px;
}

.logo .logo-img {
  height: 45px;
  display: inline-block;
  vertical-align: middle;
  width: 70px;
}

.logo-img {
  height: 100%;
  background: url("../../../content/images/logo-jhipster.png") no-repeat center
    center;
  background-size: contain;
  width: 100%;
  filter: drop-shadow(0 0 0.05rem white);
}
</style>
