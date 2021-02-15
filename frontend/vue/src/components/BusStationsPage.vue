<template>
   <div>
      <MainSearchNavBar :activeNav="'activeAS'" />
      <div class="m-4 h2"><h2>Bus stations</h2></div>
      <Sort class="sort" :listItems="sortListItems" :activeItem="sortActive" @sort="sortStations" />
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
import Sort from '@/components/Block/Sort.vue'

export default {
  name: 'BusStationsPage',
  components: {
    MainSearchNavBar,
    Station,
    Sort
  },
  data () {
    const sortby = this.$route.query.sortby || ''
    return {
      stations: [],
      sortActive: sortby,
      sortListItems: ['Name']
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
    if (this.getQ) {
      this.search(this.getQ)
    } else {
      this.stations = this.getBusStations.length !== 0 ? this.getBusStations : this.getBS()
    }
    this.sortStations(this.sortActive)
  },
  watch: {
    getQ: function (value) {
      this.search(value)
    }
  },
  methods: {
    async search (value) {
      this.stations = await this.$store.dispatch('busstation/search', { value }, { root: true })
    },
    async getBS () {
      this.stations = await this.$store.dispatch('busstation/stations', {}, { root: true })
    },
    sortStations (value) {
      this.setSort(value)
      if (value === 'Name') {
        this.stations = this.stations.sort((a, b) => (a.name > b.name) ? 1 : -1)
      }
    },
    setSort (value) {
      let locationQuery = { query: {} }
      this.sortActive = value
      locationQuery.query.sortby = value
      this.$router.replace(locationQuery).catch(e => {})
    }
  }
}
</script>
<style scoped>
.stations {
  margin: 25px 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.h2 {
  text-align: center;
}
.sort {
  margin: 0 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
</style>