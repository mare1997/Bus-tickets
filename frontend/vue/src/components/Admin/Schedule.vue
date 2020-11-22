<template>
  <div class="container">
    <div id="contact">
      <h3 v-if="!schedule">Dodaj novi red voznje</h3>
      <h3 v-else>Izmeni red voznje</h3>
      <fieldset>
        <input
          v-model="value.price"
          placeholder="Cena karte"
          type="text"
          tabindex="1"
          required
          autofocus
        />
      </fieldset>
      <fieldset>
        <select
          v-model="value.vehicleId"
          tabindex="2"
          required
        >
          <option value="" disabled selected>Vozilo</option>
          <option
            v-for="vehicle in vehicles"
            :key="vehicle.id"
            :value="vehicle.id"
            >{{ vehicle.registration_number }}</option
          >
        </select>
      </fieldset>
      <fieldset>
        <date-picker v-model="value.date" type="datetime" placeholder="Datum i vreme polaska" format="DD-MM-YYYY hh:mm" style="width: 100%"></date-picker>
      </fieldset>
      <fieldset>
        <h6 class="h6-station">Stations</h6>
        <div id="stations">
          <div class="station-listing">
            <div id="busstation">
              <select
                v-model="busStationId"
                tabindex="3"
                required
              >
                <option value="" disabled selected>Stanica</option>
                <option
                  v-for="station in busStations"
                  :key="station.id"
                  :value="station.id"
                  >{{ station.name }}</option
                >
              </select>
            </div>
            <div class="time">
              <date-picker v-model="time" type="time" placeholder="Vreme" format="hh:mm" style="width: 100%"></date-picker>
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
      <fieldset v-if="value.stations">
        <div v-for="(station, i) of value.stations" :key="station.id">
          <span>{{i+1}}. {{getStation(station.busStationId)}}  {{getTime(station)}}h</span>
        </div>
      </fieldset>
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
        vehicleId: this.schedule && this.schedule.vehicleId ? this.schedule.vehicleId : '',
        price: this.schedule && this.schedule.price ? this.schedule.price : '',
        date: this.schedule && this.schedule.date ? this.schedule.date : '',
        stations: this.schedule && this.schedule.stations ? this.schedule.stations : []
      },
      time: '',
      busStationId: 0,
      stationName: ''
    }
  },
  computed: {
    ...mapGetters({
      vehicles: 'vehicle/getVehicles',
      busStations: 'busstation/getBusStations'
    })
  },
  methods: {
    submit () {
      if (this.schedule) {
        this.$store.dispatch('schedule/update', this.value)
        this.$emit('reload', {
          listing: 'red_voznje',
          dropdownCategory: 'red_voznje'
        })
      } else {
        this.$store.dispatch('schedule/create', this.value)
        this.$emit('reload', {
          listing: 'red_voznje',
          dropdownCategory: 'red_voznje'
        })
      }
    },
    addStation () {
      this.value.stations.push({
        time: this.time,
        busStationId: this.busStationId
      })
    },
    async getStation (id) {
      const station = await this.$store.dispatch('busstation/station', { id }, { root: true })
      return station.name
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

<style type="css">
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
@import url(
  https://fonts.googleapis.com/css?family=Roboto:400,
  300,
  600,
  400italic
);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 12px;
  line-height: 30px;
  color: #777;
  background: #4caf50;
}

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
  margin: 150px 0;
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
