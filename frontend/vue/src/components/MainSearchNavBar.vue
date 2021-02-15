<template>
  <div class="bg-img">
    <b-nav tabs fill align="center" class="navbar-border">
      <b-nav-item :active="activeRV" @click="changeNav('activeRV')">Schedule</b-nav-item>
      <b-nav-item :active="activeP" @click="changeNav('activeP')">Carriers</b-nav-item>
      <b-nav-item :active="activeAS" @click="changeNav('activeAS')">Bus station</b-nav-item>
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
  background-image: url('~@/assets/bbgg.jpg');
  min-height: 580px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* Needed to position the navbar */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.navbar-border {
  background-color: black;
  opacity: 0.4;
  width: 60%;
  margin: 0 20% 0 20%;
  color: white;
}
a {
  color: yellow;
  font-size: 24px;
}
</style>