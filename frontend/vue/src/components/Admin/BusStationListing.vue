<template>
  <div>
    <table>
      <tr>
        <th>Station</th>
        <th>Location</th>
        <th>Street</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Work time</th>
      </tr>
      <tr v-for="station in stations" :key="station.id">
        <td>{{station.name}}</td>
        <td>{{station.location ? station.location.name : ''}}</td>
        <td>{{station.street}}</td>
        <td>{{station.phone}}</td>
        <td>{{station.email}}</td>
        <td>{{station.worktime}}</td>
        <td><i class="fa fa-edit" @click="edit(station)"></i></td>
        <td><b-button v-b-modal.modal-1 id="show-btn" @click="showModal(station.id) " ref="btnShow"><i class="fa fa-remove"></i></b-button></td>
      </tr>
    </table>
    <b-modal id="modal-1" title="Brisanje" hide-footer>
      <div class="d-block">Are you sure you want to remove station?</div>
      <b-button @click="hideModal" class="mt-2" variant="outline-warning" block>Close</b-button>
      <b-button @click="remove" class="mt-3" variant="outline-danger" block>Remove</b-button>
    </b-modal>
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
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      stations: 'busstation/getBusStations'
    })
  },
  mounted () {
    this.$store.dispatch('busstation/stations')
  },
  methods: {
    showModal (value) {
      this.id = value
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    remove () {
      this.$store.dispatch('busstation/delete', { id: this.id })
      this.hideModal()
    },
    edit (busStation) {
      this.$emit('edit-busstation', busStation)
    }
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