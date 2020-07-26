<template>
  <div>
    <MainSearchNavBar :activeNav="'activeRV'" />
  </div>
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'

export default {
  name: 'Home',
  components: {
    MainSearchNavBar
  }
}
</script>