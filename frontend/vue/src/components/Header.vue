<template>
  <div>
    <b-navbar class="navbar-border">
      <div class="navbar-left logo"> 
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 291 385.3" style="enable-background:new 0 0 291 385.3;" xml:space="preserve">
          <polygon class="st0" points="82.1,12 7.4,138.7 38.7,237.3 "/>
          <polygon class="st0" points="92.7,5.3 199.4,8.7 223.4,82.7 "/>
          <polygon class="st0" points="89.4,8.7 223.4,86.7 42.1,237.3 "/>
          <polygon class="st0" points="206.1,15.3 262.7,66 228.1,82.7 "/>
          <polygon class="st0" points="262.7,70 228.1,86 266.4,175.3 "/>
          <polygon class="st0" points="228.1,92.7 262.7,179.3 173.4,328 "/>
          <polygon class="st0" points="223.4,92.7 44.7,240 167.7,336 "/>
          <polygon class="st0" points="252.1,210.3 184.4,380.3 170.7,339.7 "/>
          <polygon class="st0" points="60.1,260.3 167.4,341 180.4,380.3 "/>
        </svg>
      </div>
      <router-link :to="{ name: 'Home' }"><h1 class="brand brand-name navbar-left bus-tickets-text">Bus Tickets</h1></router-link>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="isLoggedIn && isAdmin"><router-link :to="{ name: 'AdminPage' }">Admin panel</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'CarriersPage' }">Prevoznici</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'BusStationsPage' }">Autobuske Statnice</router-link></b-nav-item>
          <b-nav-item-dropdown right v-if="isLoggedIn">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Moj nalog</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Moj nalog</em>
            </template>
            <b-dropdown-item><router-link :to="{ path: 'login' }">Sign In</router-link></b-dropdown-item>
            <b-dropdown-item><router-link :to="{ path: 'register' }">Register</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { BNavbar, BNavbarNav, BNavItemDropdown, BDropdownItem, BCollapse } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  components: {
    'b-navbar': BNavbar,
    'b-navbar-nav': BNavbarNav,
    'b-nav-item-dropdown': BNavItemDropdown,
    'b-dropdown-item': BDropdownItem,
    'b-collapse': BCollapse
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      getToken: 'user/getToken',
      getUser: 'user/getUser',
      getCarriers: 'carrier/getCarriers',
      getBusStations: 'busstation/getBusStations',
      isAdmin: 'user/isAdmin'
    })
  },
  // mounted () {
  //   this.getUsers()
  // },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    },
    async getUsers () {
      await this.$store.dispatch('user/users', {}, {root: true})
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Averia+Serif+Libre|Bubblegum+Sans|Caveat+Brush|Chewy|Lobster+Two');

.navbar-border {
  border-bottom: 2px solid rgb(51, 51, 51);
  background-color: rgb(240, 240, 240);
}


.logo {
    height: auto;
    width: 52px;
    padding-top: 5px;
    margin-right: 15px;
}
.bus-tickets-text{
    letter-spacing: 1px;
    color: black !important;
    font-family: 'Lobster Two', cursive;
}


</style>