<template>
  <div>
    <b-input-group class="my-8">
      <b-input-group-prepend class="bg-white">Polazak</b-input-group-prepend>
      <b-form-input list="list-station" v-model="start"></b-form-input>
      <b-input-group-prepend class="bg-white">Odrediste</b-input-group-prepend>
      <b-form-input list="list-station" v-model="stop"></b-form-input>
      <b-input-group-prepend class="bg-white">Datum i vreme</b-input-group-prepend>
      <date-picker v-model="datetime" type="datetime" placeholder="Select datetime" format="DD-MM-YYYY"></date-picker>
      <b-input-group-append>
        <b-button variant="success">Pretrazi</b-button>
      </b-input-group-append>
    </b-input-group>

    <datalist id="list-station">
      <option v-for="size in sizes" :key="size.length * Math.random()">{{ size }}</option>
    </datalist>
  </div>  
</template>

<script>
import { BInputGroup, BInputGroupPrepend, BFormInput, BInputGroupAppend } from 'bootstrap-vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  name: 'ScheduleSearch',
  components: {
    'b-input-group': BInputGroup,
    'b-form-input': BFormInput,
    'b-input-group-prepend': BInputGroupPrepend,
    'b-input-group-append': BInputGroupAppend,
    'date-picker': DatePicker
  },
  data () {
    return {
      sizes: ['Beograd', 'Smederevo', 'Novi Sad'],
      datetime: null,
      start: '',
      stop: ''
    }
  }
}
</script>