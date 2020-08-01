<template>
  <div class="bg-img">
    <b-nav tabs fill align="center" class="navbar-border">
      <b-nav-item :active="activeRV" @click="changeNav('activeRV')">Red Voznje</b-nav-item>
      <b-nav-item :active="activeP" @click="changeNav('activeP')">Prevoznici</b-nav-item>
      <b-nav-item :active="activeAS" @click="changeNav('activeAS')">Autobuske stanice</b-nav-item>
    </b-nav>
    <ScheduleSearch v-if="activeRV" />
    <CarrierSearch v-if="activeP" />
    <BusStationSearch v-if="activeAS" />
</div> 
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'
import ScheduleSearch from '@/components/ScheduleSearch'
import CarrierSearch from '@/components/CarrierSearch'
import BusStationSearch from '@/components/BusStationSearch'

export default {
  name: 'MainSearchNavBar',
  components: {
    'b-nav': BNav,
    'b-nva-item': BNavItem,
    ScheduleSearch,
    CarrierSearch,
    BusStationSearch
  },
  data () {
    return {
      activeRV: true,
      activeP: false,
      activeAS: false
    }
  },
  props: {
    activeNav: {
      type: String,
      default: 'activeRV'
    }
  },
  mounted () {
    this.changeNav(this.activeNav)
  },
  methods: {
    changeNav (value) {
      switch (value) {
        case 'activeRV': {
          this.activeRV = true
          this.activeP = false
          this.activeAS = false
          break
        }
        case 'activeP': {
          this.activeRV = false
          this.activeP = true
          this.activeAS = false
          break
        }
        case 'activeAS': {
          this.activeRV = false
          this.activeP = false
          this.activeAS = true
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.bg-img {
  /* The image used */
  background-image: url('~@/assets/city.jpg');

  min-height: 580px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* Needed to position the navbar */
  position: relative;
}
.navbar-border {
  background-color: lightblue;
  width: 60%;
  margin: 0 20% 0 20%;
  color: black;
  border-radius: 10px;
  border: 2px solid rgb(20, 19, 19);
}

</style>