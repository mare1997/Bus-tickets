<template>
  <div>
    <div class="m-4 h2"><h2>Popularne destinacije</h2></div>
    <div class="destinations">
      <Destination v-for="destination in destinations" :key="destination * Math.random()" />
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
      destinations: [1, 2, 3]
    }
  }
}
</script>

<style scoped>
.destinations {
  margin: 50px 100px 50px  100px;
  display: flex;
  flex-wrap: wrap;
}
.h2 {
  text-align: center;
}
</style>