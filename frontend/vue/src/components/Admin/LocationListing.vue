<template>
  <div>
    <table>
      <tr>
        <th>Lokacija</th>
        <th>Postarski broj</th>
      </tr>
      <tr v-for="location in locations" :key="location.id">
        <td>{{location.name}}</td>
        <td>{{location.zip_code}}</td>
        <td><i class="fa fa-edit" @click="edit(location)"></i></td>
        <td><b-button id="show-btn" @click="showModal(location.id)" ref="btnShow"><i class="fa fa-remove"></i></b-button></td>
      </tr>
    </table>
    <b-modal ref="modal-1" title="Brisanje" hide-footer>
      <div class="d-block">Da li ste sigruni da zelite obrisati?</div>
      <b-button @click="hideModal" class="mt-2" variant="outline-warning" block>Zatvori</b-button>
      <b-button @click="deleteLocation" class="mt-3" variant="outline-danger" block>Obrisi</b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BModal, BButton } from 'bootstrap-vue'

export default {
  name: 'LocationListing',
  components: {
    'b-modal': BModal,
    'b-button': BButton
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations'
    })
  },
  mounted () {
    this.$store.dispatch('location/locations')
  },
  methods: {
    showModal (value) {
      this.id = value
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal () {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    deleteLocation () {
      this.$store.dispatch('location/delete', { id: this.id })
      this.hideModal()
    },
    edit (location) {
      this.$emit('edit-location', location)
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