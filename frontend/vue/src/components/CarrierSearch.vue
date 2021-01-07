<template>
  <div class="parent">
    <ValidationObserver novalidate ref="form" v-slot="{ }" class="search">
      <b-input-group>
        <ValidationProvider name="Carrier" rules="required" v-slot="{ errors }" style="margin-right: 15px">
          <b-form-input placeholder="Carrier" list="list-carrier" v-model="carrier"></b-form-input>
          <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
        </ValidationProvider>
        <b-input-group-append>
          <b-button variant="success" @click="search">Search</b-button>
        </b-input-group-append>
      </b-input-group>
    </ValidationObserver>
    <datalist id="list-carrier">
      <option v-for="carrier in getCarriers" :key="carrier.id * Math.random()">{{ carrier.name }}</option>
    </datalist>
  </div>  
</template>

<script>
import { BInputGroup, BInputGroupPrepend, BFormInput, BInputGroupAppend } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CarrierSearch',
  components: {
    'b-input-group': BInputGroup,
    'b-form-input': BFormInput,
    'b-input-group-prepend': BInputGroupPrepend,
    'b-input-group-append': BInputGroupAppend
  },
  data () {
    return {
      carrier: null
    }
  },
  computed: {
    ...mapGetters({
      getCarriers: 'carrier/getCarriers'
    })
  },
  methods: {
    search () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        this.$router.push({ name: 'CarriersPage', query: { q: this.carrier } }).catch(() => {})
      })
    }
  }
}
</script>

<style scoped>
.parent {
  margin: 14% 10% 10% 10%;
}
</style>