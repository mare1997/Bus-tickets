<template>
  <div>
    <table>
      <tr>
        <th>Vozilo / Reg Broj</th>
        <th>Vozac</th>
        <th>Prevoznik</th>
      </tr>
      <tr v-for="vehicle in vehicles" :key="vehicle.id">
        <td>{{vehicle.registration_number}}</td>
        <td>{{vehicle.driver}}</td>
        <td>{{vehicle.carrier.name}}</td>
        <td><i class="fa fa-edit" @click="edit(vehicle)"></i></td>
        <td><b-button id="show-btn" @click="showModal(vehicle.id) " ref="btnShow"><i class="fa fa-remove"></i></b-button></td>
      </tr>
    </table>
    <b-modal id="modal-1" title="Brisanje" hide-footer>
      <div class="d-block">Da li ste sigruni da zelite obrisati?</div>
      <b-button @click="hideModal" class="mt-2" variant="outline-warning" block>Zatvori</b-button>
      <b-button @click="remove" class="mt-3" variant="outline-danger" block>Obrisi</b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VehicleListing',
  components: {
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      vehicles: 'vehicle/getVehicles'
    })
  },
  mounted () {
    this.$store.dispatch('vehicle/vehicles')
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
      this.$store.dispatch('vehicle/delete', { id: this.id })
      this.hideModal()
    },
    edit (vehicle) {
      this.$emit('edit-vehicle', vehicle)
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