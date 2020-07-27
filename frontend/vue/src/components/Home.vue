<template>
  <div>
    <MainSearchNavBar :activeNav="'activeRV'" />
    <PopularDestination />
  </div>
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import PopularDestination from '@/components/PopularDestination.vue'

export default {
  name: 'Home',
  components: {
    MainSearchNavBar,
    PopularDestination
  }
}
</script>