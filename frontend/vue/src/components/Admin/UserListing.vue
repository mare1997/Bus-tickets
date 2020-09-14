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
        <td>{{user.location.name}}</td>
        <td><i class="fa fa-edit"></i></td>
        <td><i class="fa fa-remove"></i></td>
      </tr>
    </table>
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
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/getUsers'
    })
  },
  mounted () {
    this.$store.dispatch('user/users')
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