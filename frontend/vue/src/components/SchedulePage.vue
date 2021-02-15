<template>
  <div>
    <MainSearchNavBar :activeNav="'activeRV'" />
    <div class="parent">
      <div class="h2"><h2>Schedule</h2></div>
      <div class="sort-filter">
        <FilterByCarrier class="filter" :options="getOptions" @change-value="filterSchedule" />
        <Sort class="sort" :listItems="sortListItems" :activeItem="sortActive" @sort="sortSchedule" />
      </div>
      <div v-if="schedules.length !== 0">
        <Schedule v-for="schedule in schedules.slice(0,count)" :key="schedule + Math.random()" :schedule="schedule" />
        <div class="load-mode-btn" v-if="schedules.length > count"><b-button variant="outline-primary" @click="changeCount">Load more</b-button></div>
      </div>
      <div class="h2" v-else>
        <h4>There is no drive for these parameters :</h4>
        <h4>Arrival: {{this.$route.query.start}}</h4>
        <h4>Departure: {{this.$route.query.finish}}</h4>
        <h4>Time: {{this.date}}</h4>
      </div>
    </div>
  </div>
  
</template>

<script>
import Schedule from '@/components/Block/Schedule.vue'
import MainSearchNavBar from '@/components/MainSearchNavBar'
import Sort from '@/components/Block/Sort.vue'
import FilterByCarrier from '@/components/Block/FilterByCarrier.vue'

export default {
  name: 'SchedulePage',
  components: {
    Schedule,
    MainSearchNavBar,
    Sort,
    FilterByCarrier
  },
  data () {
    const sortby = this.$route.query.sortby || ''
    return {
      schedules: [],
      allSchedules: [],
      sortActive: sortby,
      sortListItems: ['Date'],
      count: 4
    }
  },
  mounted () {
    this.search(this.getQ)
    this.sortSchedule(this.sortActive)
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
    },
    getOptions () {
      const carriers = this.allSchedules.map(s => {
        return s.carrier.name
      })
      const unique = new Set(carriers)
      let filters = []
      for (const filter of unique) {
        const newFilter = {
          name: filter,
          code: filter.toLowerCase()
        }
        filters.push(newFilter)
      }
      return filters
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
      this.allSchedules = this.schedules
    },
    sortSchedule (value) {
      this.setSort(value)
      if (value === 'Date') {
        this.schedules = this.schedules.sort((a, b) => (+a.date < +b.date) ? 1 : -1)
      }
    },
    setSort (value) {
      let locationQuery = { query: {} }
      if (this.$route.query.date) {
        locationQuery.query.date = this.$route.query.date
      }
      if (this.$route.query.start) {
        locationQuery.query.start = this.$route.query.start
      }
      if (this.$route.query.finish) {
        locationQuery.query.finish = this.$route.query.finish
      }
      this.sortActive = value
      locationQuery.query.sortby = value
      this.$router.replace(locationQuery).catch(e => {})
    },
    async filterSchedule (value) {
      await this.search(this.getQ)
      if (value.length > 0) {
        const carriers = value.map(v => { return v.name })
        this.schedules = this.schedules.filter(s => carriers.includes(s.carrier.name))
      }
    },
    changeCount () {
      this.count = this.count + 4
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
.sort-filter {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.load-mode-btn {
  display: flex;
  justify-content: center;
}
</style>