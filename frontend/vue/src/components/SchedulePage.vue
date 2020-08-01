<template>
  <div>
    <MainSearchNavBar :activeNav="'activeRV'" />
    <div class="parent">
      <div class="h2"><h2>Red voznje</h2></div>
      <div v-if="schedules.length !== 0">
        <Schedule v-for="schedule in schedules" :key="schedule + Math.random()" :schedule="schedule" />
      </div>
      <div class="h2" v-else>
        <h4>Ne postoji red voznje za ponudjene vrednosti :</h4>
        <h4>Polazak: {{this.$route.query.start}}</h4>
        <h4>Odrediste: {{this.$route.query.finish}}</h4>
        <h4>Vreme: {{this.date}}</h4>
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
      schedules: []
    }
  },
  mounted () {
    this.search(this.getQ)
  },
  computed: {
    getQ () {
      let payload = {
        date: this.$route.query.date,
        start: this.$route.query.start,
        finish: this.$route.query.finish
      }
      return payload
    },
    date () {
      let date = new Date(this.$route.query.date)
      return date.toLocaleDateString('en-US')
    }
  },
  watch: {
    getQ: function (value) {
      this.search(value)
    }
  },
  methods: {
    async search (value) {
      this.schedules = await this.$store.dispatch('schedule/search', { date: value.date, start: value.start, finish: value.finish }, { root: true })
    }
  }
}
</script>

<style>
.parent {
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10%;
}
.h2 {
  margin-top: 2%;
  text-align: center;
}
</style>