<template>
  <div class="parent">
    <b-input-group>
      <b-form-input placeholder="Stanica" list="list-station" v-model="station" style="margin-right: 15px"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="search">Pretrazi</b-button>
      </b-input-group-append>
    </b-input-group>

    <datalist id="list-station">
      <option v-for="station in cities" :key="station.length * Math.random()">{{ station }}</option>
    </datalist>
  </div> 
</template>

<script>
import { BInputGroup, BInputGroupPrepend, BFormInput, BInputGroupAppend } from 'bootstrap-vue'

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
      cities: ['Beograd', 'Smederevo', 'Novi Sad'],
      station: null
    }
  },
  methods: {
    search () {
      this.$router.push({ name: 'BusStationsPage', query: { q: this.station } }).catch(() => {})
    }
  }
}
</script>
<style scoped>
.parent {
  margin: 14% 10% 10% 10%;
}
</style>