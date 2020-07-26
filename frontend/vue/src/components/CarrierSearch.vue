<template>
  <div>
    <b-input-group>
      <b-input-group-prepend class="bg-white">Prevoznici</b-input-group-prepend>
      <b-form-input list="list-carrier" v-model="carrier"></b-form-input>
      <b-input-group-append>
        <b-button variant="success">Pretrazi</b-button>
      </b-input-group-append>
    </b-input-group>

    <datalist id="list-carrier">
      <option v-for="carrier in carriers" :key="carrier.length * Math.random()">{{ carrier }}</option>
    </datalist>
  </div>  
</template>

<script>
import { BInputGroup, BInputGroupPrepend, BFormInput, BInputGroupAppend } from 'bootstrap-vue'

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
      carriers: ['Lasta', 'BecejPrevoz', 'JugopRevoz'],
      carrier: null
    }
  }
}
</script>