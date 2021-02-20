<template>
  <div>
    <div class="m-4 h2"><h2>Popular destination</h2></div>
    <carousel
      class="m-4"
      :draggable="false"
      :autoplay="true"
      :perPageCustom="[
        [768, 3],
        [1024, 4]
      ]"
      :navigationEnabled="true"
      :mouse-drag="false"
    >
      <slide
        v-for="destination in destinations"
        :key="destination * Math.random()"
      >
        <Destination :destination="destination" />
      </slide>
    </carousel>
  </div>
</template>

<script>
import Destination from '../components/Block/Destination.vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'PopularDestination',
  components: {
    Destination,
    Carousel,
    Slide
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
      this.destinations = await this.$store.dispatch(
        'schedule/schedulesPopular',
        {},
        { root: true }
      )
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
