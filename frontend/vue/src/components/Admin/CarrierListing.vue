<template>
  <div>
    <table>
      <tr>
        <th>Prevoznik</th>
        <th>Ulica</th>
        <th>PIB</th>
        <th>Telefon</th>
        <th>Email</th>
        <th>Sajt</th>
      </tr>
      <tr v-for="carrier in carriers" :key="carrier.id">
        <td>{{carrier.name}}</td>
        <td>{{carrier.street}}</td>
        <td>{{carrier.pib}}</td>
        <td>{{carrier.phone}}</td>
        <td>{{carrier.email}}</td>
        <td>{{carrier.site}}</td>
        <td><i class="fa fa-edit"></i></td>
        <td><i class="fa fa-remove"></i></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CarrierListing',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      carriers: 'carrier/getCarriers'
    })
  },
  mounted () {
    this.$store.dispatch('carrier/carriers')
  }

}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);

table, td, th {  
  border-right: 1px solid teal;
  border-top: 1px solid teal;
  border-bottom: 1px solid teal;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 15px;
}
</style>