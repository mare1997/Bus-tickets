<template>
   <div>
      <MainSearchNavBar :activeNav="'activeP'" />
      <h2 class="m-4 h2">Prevoznici</h2>
      <div class="carrier">
        <Carrier v-for="carrier in carriers" :key="carrier * Math.random()" />
      </div>
      
    </div> 
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Carrier from '../components/Block/Carrier.vue'
export default {
  name: 'CarrierPage',
  components: {
    MainSearchNavBar,
    Carrier
  },
  data () {
    return {
      carriers: [1, 2, 3, 4, 5, 6, 7]
    }
  }
}
</script>
<style scoped>
.carrier {
  display: inline-flex;
}
.h2 {
  justify-content: center;
}
</style>