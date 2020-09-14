<template>
  <div>
    <table>
      <tr>
        <th>Stanica</th>
        <th>Lokacija</th>
        <th>Ulica</th>
        <th>Telefon</th>
        <th>Email</th>
        <th>Radno vreme</th>
      </tr>
      <tr v-for="station in stations" :key="station.id">
        <td>{{station.name}}</td>
        <td>{{station.location.name}}</td>
        <td>{{station.street}}</td>
        <td>{{station.phone}}</td>
        <td>{{station.email}}</td>
        <td>{{station.worktime}}</td>
        <td><i class="fa fa-edit"></i></td>
        <td><i class="fa fa-remove"></i></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BusStationListing',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      stations: 'busstation/getBusStations'
    })
  },
  mounted () {
    this.$store.dispatch('busstation/stations')
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