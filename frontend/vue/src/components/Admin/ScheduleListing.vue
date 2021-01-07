<template>
  <div>
    <table>
      <tr>
        <th>Voznja ID</th>
        <th>Vozac</th>
        <th>Vozilo</th>
        <th>Datum polaska</th>
      </tr>
      <tr v-for="schedule in schedules" :key="schedule.id">
        <td>{{ schedule.id }}</td>
        <td>{{ schedule.vehicle.driver }}</td>
        <td>{{ schedule.vehicle.registration_number }}</td>
        <td>{{ getDate(schedule) }}</td>
        <!-- <td><i class="fa fa-edit" @click="edit(station)"></i></td> -->
        <td>
          <b-button
            v-b-modal.modal-1
            id="show-btn"
            @click="showModal(schedule.id)"
            ref="btnShow"
            ><i class="fa fa-remove"></i
          ></b-button>
        </td>
      </tr>
    </table>
    <b-modal id="modal-1" title="Brisanje" hide-footer>
      <div class="d-block">Da li ste sigruni da zelite obrisati?</div>
      <b-button @click="hideModal" class="mt-2" variant="outline-warning" block
        >Zatvori</b-button
      >
      <b-button @click="remove" class="mt-3" variant="outline-danger" block
        >Obrisi</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../../main'

export default {
  name: 'ScheduleListing',
  components: {},
  data () {
    return {
      id: '',
      schedules: []
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getUser'
    })
  },
  mounted () {
    this.get()
  },
  beforeMount () {
    bus.$on('reload-schedules', this.get)
  },
  beforeDestroy () {
    bus.$off('reload-schedules')
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
      this.$store.dispatch('schedule/delete', { id: this.id })
      this.hideModal()
    },
    getDate (schedule) {
      const time = new Date(schedule.date)
      const day = time ? time.getDate() : ''
      const month = time ? time.getMonth() + 1 : ''
      const year = time ? time.getFullYear() : ''
      const hour = time ? time.getHours() : ''
      const minute = time ? time.getMinutes() : ''
      const formattedHour = ('0' + hour).slice(-2)
      const formattedMinute = ('0' + minute).slice(-2)
      return day + '/' + month + '/' + year + '  ' + formattedHour + ':' + formattedMinute
    },
    async getCarriersByCarrierId () {
      this.schedules = await this.$store.dispatch('schedule/schedulesByCarrierId', { id: this.currentUser.carrier.id }, { root: true })
    },
    async getCarriers () {
      this.schedules = await this.$store.dispatch('schedule/schedules')
    },
    get () {
      if (this.currentUser.role === 'CARRIER') {
        this.getCarriersByCarrierId()
      } else {
        this.getCarriers()
      }
    }
    // edit (busStation) {
    //   this.$emit('edit-busstation', busStation)
    // }
  }
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);

table,
td,
th {
  border-right: 1px solid teal;
  border-top: 1px solid teal;
  border-bottom: 1px solid teal;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 15px;
}
</style>