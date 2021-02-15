<template>
  <div>
    <div class="m-4 h2"><h2>Popularne destinacije</h2></div>
    <div class="destinations">
      <Destination v-for="destination in destinations" :destination="destination" :key="destination * Math.random()" />
    </div>
  </div>
</template>

<script>
import Destination from '../components/Block/Destination.vue'
export default {
  name: 'PopularDestination',
  components: {
    Destination
  },
  data () {
    return {
      destinations: []
    }
  },
  computed: {
    getDestinations () {
      return this.destinations.slice(0, 8)
    }
  },
  mounted () {
    this.getPopularDestinations()
  },
  methods: {
    async getPopularDestinations () {
      this.destinations = await this.$store.dispatch('schedule/schedulesPopular', {}, { root: true })
    }
  }
}
</script>

<style scoped>
.destinations {
  margin: 5% 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.h2 {
  text-align: center;
}
</style>