<template>
  <div>
    <MainSearchNavBar :activeNav="'activeRV'" />
    <div class="parent">
      <div class="h2"><h2>Red voznje</h2></div>
      <div v-for="schedule in schedules" :key="schedule + Math.random()">
        <Schedule />
      </div>
    </div>
  </div>
  
</template>

<script>
import Schedule from '@/components/Block/Schedule.vue'
import MainSearchNavBar from '@/components/MainSearchNavBar'
export default {
  name: 'SchedulePage',
  components: {
    Schedule,
    MainSearchNavBar
  },
  data () {
    return {
      schedules: [0, 1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style>
.parent {
  margin-left: 10%;
  margin-right: 10%;
}
.h2 {
  margin-top: 2%;
  text-align: center;
}
</style>