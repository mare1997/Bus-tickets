<template>
   <div>
      <MainSearchNavBar :activeNav="'activeAS'" />
      <h2 class="m-4 h2">Autobuske stanice</h2>
      <div class="station">
        <Station v-for="station in stations" :key="station * Math.random()" />
      </div>
      
    </div> 
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Station from '../components/Block/Station.vue'
export default {
  name: 'BusStationsPage',
  components: {
    MainSearchNavBar,
    Station
  },
  data () {
    return {
      stations: [1, 2, 3, 4, 5]
    }
  }
}
</script>
<style scoped>
.station {
  display: inline-flex;
}
.h2 {
  justify-content: center;
}
</style>