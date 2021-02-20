<template>
  <div class="parent">
    <ValidationObserver novalidate ref="form" v-slot="{ }" class="search">
      <b-input-group>
        <ValidationProvider name="Station" rules="required" v-slot="{ errors }" style="margin-right: 15px">
          <b-form-input placeholder="Station" list="list-station" v-model="station"></b-form-input>
          <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
        </ValidationProvider>
        <b-input-group-append>
          <b-button variant="success" @click="search">Search</b-button>
        </b-input-group-append>
      </b-input-group>
    </ValidationObserver>
    <datalist id="list-station">
      <option v-for="station in cities" :key="station.id">{{ station.name }}</option>
    </datalist>
  </div> 
</template>

<script>
import { BInputGroup, BInputGroupPrepend, BFormInput, BInputGroupAppend } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'BusStationSearch',
  components: {
    'b-input-group': BInputGroup,
    'b-form-input': BFormInput,
    'b-input-group-prepend': BInputGroupPrepend,
    'b-input-group-append': BInputGroupAppend
  },
  data () {
    return {
      cities: [],
      station: null
    }
  },
  methods: {
    search () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.$router.push({ name: 'BusStationsPage', query: { q: this.station } }).catch(() => {})
      })
    },
    async getL () {
      this.cities = await this.$store.dispatch('location/locations', {}, {root: true})
    }
  },
  computed: {
    ...mapGetters({
      getLocations: 'location/getLocations'
    })
  },
  mounted () {
    this.getLocations.length !== 0 ? this.cities = this.getLocations : this.getL()
  }
}
</script>
<style scoped>
.parent {
  margin: 14% 10% 10% 10%;
}
</style>