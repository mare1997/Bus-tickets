<template>
  <div class="container">
    <div id="contact">
      <ValidationObserver novalidate ref="form" v-slot="{ }">
        <h3 v-if="!schedule">Add new schedule</h3>
        <h3 v-else>Edit schedule</h3>
        <ValidationProvider name="Ticket price" rules="required" v-slot="{ errors }">
          <fieldset>
            <input
              v-model="value.price"
              placeholder="Ticket price *"
              type="text"
              tabindex="1"
              required
            />
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>

        <ValidationProvider v-if="currentUser.role === 'ADMIN'" name="Carrier" rules="required|min:0, You must select a carrier." v-slot="{ errors }">
          <fieldset>
            <select
              v-model="carrierId"
              tabindex="2"
              required
            >
              <option value="-1" disabled selected>Carrier *</option>
              <option
                v-for="carrier in carriers"
                :key="carrier.id"
                :value="carrier.id"
                >{{ carrier.name }}
              </option>
            </select>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>

        <ValidationProvider v-if="carrierId > 0" name="Vehicle" rules="required|min:0, You must select a vehicle." v-slot="{ errors }">
          <fieldset>
            <select
              v-model="value.vehicleId"
              tabindex="3"
              required
            >
              <option value="-1" disabled selected>Vehicle *</option>
              <option
                v-for="vehicle in vehicles"
                :key="vehicle.id"
                :value="vehicle.id"
                >{{ vehicle.registration_number }}
              </option>
            </select>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>

        <fieldset>
          <input type="checkbox" id="pd" name="popularDestination" v-model="value.isPopularDestination">
          <label for="pd"> Popular destination</label><br>
        </fieldset>

        <ValidationProvider name="Date and time" rules="required" v-slot="{ errors }">
          <fieldset>
            <date-picker v-model="value.date" type="datetime" placeholder="Date and time *" format="DD-MM-YYYY HH:mm" style="width: 100%"></date-picker>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>

        <ValidationProvider name="Departure station" rules="required" v-slot="{ errors }">
          <fieldset>
            <h6 class="h6-station">Departure station</h6>
            <select
              v-model="departureStation"
              tabindex="4"
              required
            >
              <option
                v-for="station in busStations"
                :key="station.id"
                :value="station"
                >{{ station.name }}
              </option>
            </select>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>

        <fieldset>
          <h6 class="h6-station">Stations</h6>
            <div id="stations">
              <div class="station-listing">
                <div id="busstation">
                  <select
                    v-model="busStation"
                    tabindex="3"
                    required
                  >
                    <option value="-1" disabled selected>Bus station *</option>
                    <option
                      v-for="station in busStations"
                      :key="station.id"
                      :value="station"
                      >{{ station.name }}
                    </option>
                  </select>
                </div>
                <div class="time">
                  <date-picker v-model="time" type="time" placeholder="Time *" format="HH:mm" style="width: 100%"></date-picker>
                </div>
              </div>
            </div>
          <button
            class="btn-add-station"
            name="addStation"
            @click="addStation()"
          >
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </fieldset>

        <ValidationProvider name="Arrival state" rules="required" v-slot="{ errors }">
          <fieldset>
            <h6 class="h6-station">Arrival station</h6>
            <select
              v-model="arrivalStation"
              tabindex="3"
              required
            >
              <option
                v-for="station in busStations"
                :key="station.id"
                :value="station"
                >{{ station.name }}
              </option>
            </select>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
        
        <ValidationProvider name="Arrival date" rules="required" v-slot="{ errors }">
          <fieldset>
            <date-picker v-model="arrivalDate" type="datetime" placeholder="Arrival date and time *" format="DD-MM-YYYY HH:mm" style="width: 100%"></date-picker>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
        
        <fieldset v-if="departureStation && departureStation !== '-1' && value.date">
          <span>Depature:  {{departureStation.name}}  {{getTime({ time: value.date })}}h</span>
        </fieldset>

        <fieldset v-if="stations">
          <div v-for="(station) of stations" :key="station.id">
            <span>{{station.busStation.name}}  {{getTime(station)}}h</span>
          </div>
        </fieldset>

        <fieldset v-if="arrivalDate && arrivalStation && arrivalStation !== '-1'">
          <span>Arrival: {{arrivalStation.name}}  {{getTime({ time: arrivalDate })}}h</span>
        </fieldset>
      </ValidationObserver>
      <fieldset>
        <button
          name="submit"
          type="submit"
          id="contact-submit"
          @click="submit()"
        >
          Submit
        </button>
      </fieldset>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  name: 'schedule',
  components: {
    'date-picker': DatePicker
  },
  props: {
    schedule: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      value: {
        id: this.schedule ? this.schedule.id : '',
        vehicleId: this.schedule && this.schedule.vehicleId ? this.schedule.vehicleId : '-1',
        price: this.schedule && this.schedule.price ? this.schedule.price : '',
        date: this.schedule && this.schedule.date ? this.schedule.date : '',
        isPopularDestination: this.schedule && this.schedule.isPopularDestination ? this.schedule.isPopularDestination : false,
        stations: this.schedule && this.schedule.stations ? this.schedule.stations : []
      },
      time: '',
      busStation: '-1',
      stationName: '',
      carrierId: null,
      departureStation: null,
      arrivalStation: null,
      arrivalDate: null,
      stations: []
    }
  },
  computed: {
    ...mapGetters({
      allVehicles: 'vehicle/getVehicles',
      busStations: 'busstation/getBusStations',
      currentUser: 'user/getUser',
      carriers: 'carrier/getCarriers'
    }),
    vehicles () {
      const vehicles = []
      this.allVehicles.map(vehicle => {
        if (vehicle && vehicle.carrier && vehicle.carrier.id === this.carrierId) {
          vehicles.push(vehicle)
        }
      })
      return vehicles
    }
  },
  async mounted () {
    await this.$store.dispatch('busstation/stations')
    await this.$store.dispatch('vehicle/vehicles')
    await this.$store.dispatch('carrier/carriers')
    this.carrierId = this.currentUser && this.currentUser.carrier ? this.currentUser.carrier.id : -1
  },
  methods: {
    submit () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        // const deparuteDate = new Date(this.date)
        // const arrivalDate = new Date(this.arrivalDate)
        // debugger
        // const is = +arrivalDate < +deparuteDate
        // if (is) {
        //   alert('Arrive date must be bigger than departure date!')
        //   return
        // }
        // debugger
        this.prepareStation()
        if (this.schedule) {
          this.$store.dispatch('schedule/update', this.value)
          this.$emit('reload', {
            listing: 'schedules',
            dropdownCategory: 'schedules'
          })
        } else {
          this.$store.dispatch('schedule/create', this.value)
          this.$emit('reload', {
            listing: 'schedules',
            dropdownCategory: 'schedules'
          })
        }
      })
    },
    addStation () {
      if (!this.busStation || this.busStation === '-1' || !this.time) {
        alert('You must select bus station and time before you add station!')
        return
      }
      this.stations.push({
        time: this.time,
        busStationId: this.busStation.id,
        busStation: this.busStation
      })
      this.busStation = '-1'
      this.time = ''
    },
    prepareStation () {
      const depature = {
        time: this.value.date,
        busStationId: this.departureStation.id,
        busStation: this.departureStation
      }
      const arrival = {
        time: this.arrivalDate,
        busStationId: this.arrivalStation.id,
        busStation: this.arrivalStation
      }
      this.value.stations.push(depature)
      for (const station of this.stations) {
        this.value.stations.push(station)
      }
      this.value.stations.push(arrival)
    },
    getTime (station) {
      const time = new Date(station.time)
      const hour = time ? time.getHours() : ''
      const minute = time ? time.getMinutes() : ''
      const formattedHour = ('0' + hour).slice(-2)
      const formattedMinute = ('0' + minute).slice(-2)
      return formattedHour + ':' + formattedMinute
    }
  }
}
</script>

<style type="css" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
.container {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact input[type="number"],
#contact textarea,
#contact select,
#contact button[type="submit"] {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

#contact {
  background: #f9f9f9;
  padding: 25px;
  margin: 50px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

#contact h3 {
  display: block;
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
}

#contact h4 {
  margin: 5px 0 15px;
  display: block;
  font-size: 13px;
  font-weight: 400;
}

fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact input[type="number"],
#contact select,
#contact textarea {
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  margin: 0 0 5px;
  padding: 10px;
}

#contact input[type="text"]:hover,
#contact input[type="email"]:hover,
#contact input[type="tel"]:hover,
#contact input[type="url"]:hover,
#contact input[type="number"]:hover,
#contact select:hover,
#contact textarea:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

#contact textarea {
  height: 100px;
  max-width: 100%;
  resize: none;
}

#contact button[type="submit"] {
  cursor: pointer;
  width: 100%;
  border: none;
  background: #4caf50;
  color: #fff;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

#contact button[type="submit"]:hover {
  background: #43a047;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
}

#contact button[type="submit"]:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

#contact input:focus,
#contact textarea:focus {
  outline: 0;
  border: 1px solid #aaa;
}

::-webkit-input-placeholder {
  color: #888;
}

:-moz-placeholder {
  color: #888;
}

::-moz-placeholder {
  color: #888;
}

:-ms-input-placeholder {
  color: #888;
}
.btn-add-station {
  width: 100%;
}
.h6-station {
  text-align: center;
}
.station-listing {
  display: inline-flex;
}
#busstation {
  margin-right: 2%;
}
.time {
  margin-left: 2%;
}
</style>
