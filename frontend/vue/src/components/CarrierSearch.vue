<template>
  <div class="parent">
    <b-input-group>
      <b-form-input placeholder="Prevznici" list="list-carrier" v-model="carrier" style="margin-right: 15px"></b-form-input>
      <b-input-group-append>
        <b-button variant="success" @click="search">Pretrazi</b-button>
      </b-input-group-append>
    </b-input-group>

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
      this.$router.push({ name: 'CarriersPage', query: { q: this.carrier } }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.parent {
  margin: 14% 10% 10% 10%;
}
</style>