<template>
  <div>
    <b-dropdown
      id="dropdown-1"
      text="Sort by"
      class="m-md-2"
    >
      <b-dropdown-item
        v-for="item of listItems"
        :key="item * Math.random()" 
        :active="activeItem === item" 
        @click="sort(item)">{{
        item
      }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    listItems: {
      type: Array,
      required: true
    },
    activeItem: {
      type: String
    }
  },
  methods: {
    sort (value) {
      this.$emit('sort', value)
    }
  }
}
</script>
