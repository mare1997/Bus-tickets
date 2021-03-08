<template>
  <div>
    <MainSearchNavBar :activeNav="'activeP'" />
    <div class="m-4 h2"><h2>Carriers</h2></div>
    <Sort
      class="sort"
      :listItems="sortListItems"
      :activeItem="sortActive"
      @sort="sortCarriers"
    />
    <div class="carrier" v-if="carriers.length !== 0">
      <Carrier
        v-for="carrier in carriers"
        :key="carrier.id * Math.random()"
        :carrier="carrier"
      />
    </div>
    <div class="h2" v-else>
      <h4>
        Ne postoji prevoznik za ponudjenu vrednost: {{ this.$route.query.q }}
      </h4>
    </div>
  </div>
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Carrier from '../components/Block/Carrier.vue'
import { mapGetters } from 'vuex'
import Sort from '@/components/Block/Sort.vue'

export default {
  name: 'CarriersPage',
  components: {
    MainSearchNavBar,
    Carrier,
    Sort
  },
  data () {
    const sortby = this.$route.query.sortby || ''
    return {
      carriers: [],
      sortActive: sortby,
      sortListItems: ['Name', 'Review average', 'Review vehicle', 'Review accuracy', 'Review hygiene', 'Review staff']
    }
  },
  async mounted () {
    if (this.getQ) {
      await this.search(this.getQ)
    } else {
      await this.getC()
    }
    this.sortCarriers(this.sortActive)
  },
  computed: {
    ...mapGetters({
      getCarriers: 'carrier/getCarriers'
    }),
    getQ () {
      return this.$route.query.q
    }
  },
  watch: {
    getQ: function (value) {
      this.search(value)
    }
  },
  methods: {
    async search (value) {
      this.carriers = await this.$store.dispatch(
        'carrier/search',
        { value },
        { root: true }
      )
    },
    async getC (value) {
      this.carriers = await this.$store.dispatch(
        'carrier/carriers',
        { value },
        { root: true }
      )
    },
    sortCarriers (value) {
      this.setSort(value)
      if (value === 'Name') {
        this.carriers = this.carriers.sort((a, b) => (a.name > b.name ? 1 : -1))
      }
      if (value === 'Review average') {
        this.carriers = this.carriers.sort((a, b) => (a.average < b.average ? 1 : -1))
      }
      if (value === 'Review vehicle') {
        this.carriers = this.carriers.sort((a, b) => (a.rollingStock < b.rollingStock ? 1 : -1))
      }
      if (value === 'Review accuracy') {
        this.carriers = this.carriers.sort((a, b) => (a.accuracy < b.accuracy ? 1 : -1))
      }
      if (value === 'Review staff') {
        this.carriers = this.carriers.sort((a, b) => (a.staff < b.staff ? 1 : -1))
      }
      if (value === 'Review hygiene') {
        this.carriers = this.carriers.sort((a, b) => (a.hygiene < b.hygiene ? 1 : -1))
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
.carrier {
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
