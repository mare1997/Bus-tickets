<template>
   <div>
      <MainSearchNavBar :activeNav="'activeP'" />
      <div class="m-4 h2"><h2>Prevoznici</h2></div>
      <div class="carrier">
        <Carrier v-for="carrier in carriers" :key="carrier * Math.random()" />
      </div>
      
    </div> 
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Carrier from '../components/Block/Carrier.vue'
export default {
  name: 'CarriersPage',
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
  margin: 50px 100px 50px  100px;
  display: flex;
  flex-wrap: wrap;
}
.h2 {
  text-align: center;
}

 
</style>