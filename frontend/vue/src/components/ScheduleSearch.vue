<template>
  <div class="parent">
    <ValidationObserver novalidate ref="form" v-slot="{ }" class="search">
      <b-input-group>
        <ValidationProvider name="Start" rules="required" v-slot="{ errors }" style="margin-right: 15px">
          <b-form-input placeholder="Start *" list="list-station" v-model="start"></b-form-input>
          <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider name="Finish" rules="required" v-slot="{ errors }" style="margin-right: 15px">
          <b-form-input placeholder="Finish *" list="list-station" v-model="finish"></b-form-input>
          <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider name="Date and time" rules="required" v-slot="{ errors }" style="margin-right: 15px">
          <div :style="{display: 'inline-grid'}">
            <date-picker v-model="datetime" type="datetime" placeholder="Date and time *" format="DD-MM-YYYY HH:mm"></date-picker>
            <span :style="{color: '#dc3545'}">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <b-input-group-append>
          <b-button variant="success" @click="search">Search</b-button>
        </b-input-group-append>
      </b-input-group>
    </ValidationObserver>
    <datalist id="list-station">
      <option v-for="size in cities" :key="size.id * Math.random()">{{ size.name }}</option>
    </datalist>
  </div>  
</template>

<script>
import { BInputGroup, BInputGroupPrepend, BFormInput, BInputGroupAppend } from 'bootstrap-vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { mapGetters } from 'vuex'

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
      cities: [],
      datetime: null,
      start: '',
      finish: ''
    }
  },
  methods: {
    search () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.$router.push({ name: 'SchedulePage', query: { date: this.datetime.toString(), start: this.start, finish: this.finish } })
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