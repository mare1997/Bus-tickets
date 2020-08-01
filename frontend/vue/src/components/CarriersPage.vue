<template>
   <div>
      <MainSearchNavBar :activeNav="'activeP'" />
      <div class="m-4 h2"><h2>Prevoznici</h2></div>
      <div class="carrier" v-if="carriers.length !== 0">
        <Carrier v-for="carrier in carriers" :key="carrier.id * Math.random()" :carrier="carrier" />
      </div>
      <div class="carrier" v-else>
        <h2>Ne postoji prevoznik za ponudjenu vrednost: {{this.$route.query.q}}</h2>
      </div>
      
    </div> 
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Carrier from '../components/Block/Carrier.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CarriersPage',
  components: {
    MainSearchNavBar,
    Carrier
  },
  data () {
    return {
      carriers: []
    }
  },
  mounted () {
    this.getQ ? this.search(this.getQ) : this.carriers = this.getCarriers
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
      this.carriers = await this.$store.dispatch('carrier/search', { value }, { root: true })
    }
  }
}
</script>
<style scoped>
.carrier {
  margin: 50px 100px 50px  100px;
  display: flex;
  flex-wrap: wrap;
}
.h2 {
  text-align: center;
}

 
</style>