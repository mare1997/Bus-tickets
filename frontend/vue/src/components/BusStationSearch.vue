<template>
  <div>
    <b-input-group>
      <b-input-group-prepend class="bg-white">Grad</b-input-group-prepend>
      <b-form-input list="list-city" v-model="city"></b-form-input>
      <b-input-group-prepend class="bg-white">Stanica</b-input-group-prepend>
      <b-form-input list="list-station" v-model="station"></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Pretrazi</b-button>
      </b-input-group-append>
    </b-input-group>

    <datalist id="list-city">
      <option v-for="city in cities" :key="city.length * Math.random()">{{ city }}</option>
    </datalist>
    <datalist id="list-station">
      <option v-for="station in stations" :key="station.length * Math.random()">{{ station }}</option>
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
      stations: ['BUS', 'SAS', 'MAS'],
      station: null,
      city: null
    }
  }
}
</script>