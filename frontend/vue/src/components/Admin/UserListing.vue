<template>
  <div>
    <table>
      <tr>
        <th>Korisnicko ime</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Godine</th>
        <th>Uloga</th>
        <th>Lokacija</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{user.userName}}</td>
        <td>{{user.firstName}}</td>
        <td>{{user.lastName}}</td>
        <td>{{user.age}}</td>
        <td>{{user.role}}</td>
        <td>{{user.location ? user.location.name : ''}}</td>
        <td><i class="fa fa-edit" @click="edit(user)"></i></td>
        <td><b-button class="fa fa-remove" id="show-btn" @click="showModal(user.id) " ref="btnShow"></b-button></td>
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
  name: 'UserListing',
  components: {
  },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    })
  },
  mounted () {
    this.$store.dispatch('user/users')
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
      this.$store.dispatch('user/delete', { id: this.id })
      this.hideModal()
    },
    edit (user) {
      this.$emit('edit-user', user)
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