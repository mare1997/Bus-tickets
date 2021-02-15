<template>
  <div>
    <table>
      <tr>
        <th>Carrier</th>
        <th>Street</th>
        <th>PIB</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Site</th>
      </tr>
      <tr v-for="carrier in carriers" :key="carrier.id">
        <td>{{carrier.name}}</td>
        <td>{{carrier.street}}</td>
        <td>{{carrier.pib}}</td>
        <td>{{carrier.phone}}</td>
        <td>{{carrier.email}}</td>
        <td>{{carrier.site}}</td>
        <td><i class="fa fa-edit" @click="edit(carrier)"></i></td>
        <td><b-button v-b-modal.modal-1 id="show-btn" @click="showModal(carrier.id)" ref="btnShow"><i class="fa fa-remove"></i></b-button></td>
      </tr>
    </table>
    <b-modal id="modal-1" title="Brisanje" hide-footer>
      <div class="d-block">Are you sure you want to remove carrier?</div>
      <b-button @click="hideModal" class="mt-2" variant="outline-warning" block>Close</b-button>
      <b-button @click="remove" class="mt-3" variant="outline-danger" block>Remove</b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BModal, BButton } from 'bootstrap-vue'

export default {
  name: 'CarrierListing',
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
      carriers: 'carrier/getCarriers'
    })
  },
  mounted () {
    this.$store.dispatch('carrier/carriers')
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
      this.$store.dispatch('carrier/delete', { id: this.id })
      this.hideModal()
    },
    edit (carrier) {
      this.$emit('edit-carrier', carrier)
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