<template>
   <div>
      <MainSearchNavBar :activeNav="'activeAS'" />
      <div class="m-4 h2"><h2>Autobuske stanice</h2></div>
      <div class="stations" v-if="stations.length !== 0">
        <Station v-for="station in stations" :key="station.id * Math.random()" :station="station" />
      </div>
      <div class="h2" v-else>
        <h4>Ne postoji stanica za ponudjenu vrednost: {{this.$route.query.q}}</h4>
      </div>
      
    </div> 
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Station from '../components/Block/Station.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'BusStationsPage',
  components: {
    MainSearchNavBar,
    Station
  },
  data () {
    return {
      stations: []
    }
  },
  computed: {
    ...mapGetters({
      getBusStations: 'busstation/getBusStations'
    }),
    getQ () {
      return this.$route.query.q
    }
  },
  mounted () {
    this.getQ ? this.search(this.getQ) : this.stations = this.getBusStations
  },
  watch: {
    getQ: function (value) {
      this.search(value)
    }
  },
  methods: {
    async search (value) {
      this.stations = await this.$store.dispatch('busstation/search', { value }, { root: true })
    }
  }
}
</script>
<style scoped>
.stations {
  margin: 50px 100px 50px  100px;
  display: flex;
  flex-wrap: wrap;
}
.h2 {
  text-align: center;
}
</style>