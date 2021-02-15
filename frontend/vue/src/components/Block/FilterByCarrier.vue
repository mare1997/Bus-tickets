<template>
  <div class="filter">
    <multiselect
      v-model="value"
      placeholder="Filter by carrier"
      label="name"
      track-by="code"
      :options="options"
      :multiple="true"
      :taggable="true"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'FilterByCarrier',
  components: {
    Multiselect
  },
  data () {
    return {
      value: []
    }
  },
  props: {
    options: {
      typo: Array,
      required: true
    }
  },
  methods: {
    set () {
      debugger
    }
  },
  watch: {
    value: function (value) {
      this.$emit('change-value', value)
    }
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>