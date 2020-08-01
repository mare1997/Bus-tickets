<template>
  <div class="parent">
    <b-input-group class="search">
      <b-form-input placeholder="Polazak" list="list-station" v-model="start" style="margin-right: 15px"></b-form-input>
      <b-form-input placeholder="Odrediste" list="list-station" v-model="finish" style="margin-right: 15px"></b-form-input>
      <date-picker v-model="datetime" type="datetime" placeholder="Datum i vreme" format="DD-MM-YYYY" style="margin-right: 15px"></date-picker>
      <b-input-group-append>
        <b-button variant="success" @click="search">Pretrazi</b-button>
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
      sizes: ['Beograd', 'Smederevo', 'Novi Sad', 'Kragujevac'],
      datetime: null,
      start: '',
      finish: ''
    }
  },
  methods: {
    search () {
      this.$router.push({ name: 'SchedulePage', query: { date: this.datetime.toString(), start: this.start, finish: this.finish } })
    }
  }
}
</script>
<style scoped>
.parent {
  margin: 14% 10% 10% 10%;
}

</style>