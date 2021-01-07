<template>
  <div class="main" :key="key">
    <div class="dropdowns">
        <div class="dropdownCategory" @click="setCategory('stations')" v-show="currentUser.role !== 'CARRIER'">
            <p class="categoryName">
                Stations
            </p>
            <div :class="dropdownCategory === 'stations' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'stations'">
            <div class="dropdownCategoryItem" @click="setListing('stations_add')" >
                Add
            </div>
            <div class="dropdownCategoryItem" @click="setListing('stations')">
                List
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('my_carrier'), setListing('my_carrier'), getCarrier()" v-show="currentUser.role === 'CARRIER'">
            <p class="categoryName">
                My Carrier
            </p>
        </div>
        <div class="dropdownCategory" @click="setCategory('carriers')" v-show="currentUser.role !== 'CARRIER'">
            <p class="categoryName">
                Carriers
            </p>
            <div :class="dropdownCategory === 'carriers' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'carriers'">
            <div class="dropdownCategoryItem" @click="setListing('carriers_add')">
                Add
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('carriers')">
                List
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('locations')">
            <p class="categoryName">
                Locations
            </p>
            <div :class="dropdownCategory === 'locations' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'locations'">
            <div class="dropdownCategoryItem" @click="setListing('locations_add')">
                Add
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('locations')">
                List
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('schedules')">
            <p class="categoryName">
                Schedule
            </p>
            <div :class="dropdownCategory === 'schedules' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'schedules'">
            <div class="dropdownCategoryItem" @click="setListing('schedules_add')">
                Add
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('schedules')">
                List
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('users')" v-show="currentUser.role !== 'CARRIER'">
            <p class="categoryName">
                Users
            </p>
            <div :class="dropdownCategory === 'users' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'users'">
            <div class="dropdownCategoryItem" @click="setListing('users_add')">
                Add
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('users')">
                List
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('vehicles')">
            <p class="categoryName">
                Vehicles
            </p>
            <div :class="dropdownCategory === 'vehicles' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'vehicles'">
            <div class="dropdownCategoryItem" @click="setListing('vehicles_add')">
                Add
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('vehicles')">
                List
            </div>
        </div>
    </div>
    <div class="forms">
      <BusStationListing v-if="listing === 'stations'" @edit-busstation="editBusStation" />
      <CarrierListing v-else-if="listing === 'carriers'" @edit-carrier="editCarrier" />
      <UserListing v-else-if="listing === 'users'" @edit-user="editUser" />
      <VehicleListing v-else-if="listing === 'vehicles'" @edit-vehicle="editVehicle" />
      <DriveScheduleListing v-else-if="listing === 'voznje'" />
      <LocationListing v-else-if="listing === 'locations'" @edit-location="editLocation" />
      <ScheduleListing v-else-if="listing === 'schedules'" @edit-schedule="editSchedule" />
      <Location v-else-if="listing === 'locations_add'" @reload="reload" />
      <Location v-else-if="listing === 'locations_edit'" @reload="reload" :location="location" />
      <Vehicle v-else-if="listing === 'vehicles_add'" @reload="reload" />
      <Vehicle v-else-if="listing === 'vehicles_edit'" @reload="reload" :vehicle="vehicle" />
      <BusStation v-else-if="listing === 'stations_add'" @reload="reload" />
      <BusStation v-else-if="listing === 'stations_edit'" @reload="reload" :busStation="busStation" />
      <Carrier v-else-if="listing === 'carriers_add'" @reload="reload" />
      <Carrier v-else-if="listing === 'carriers_edit'" @reload="reload" :carrier="carrier" />
      <Carrier v-else-if="listing === 'my_carrier'" @reload="reload" :carrier="carrier" />
      <User v-else-if="listing === 'users_add'" @reload="reload" />
      <User v-else-if="listing === 'users_edit'" @reload="reload" :user="user" />
      <Schedule v-else-if="listing === 'schedules_add'" @reload="reload" />
      <Schedule v-else-if="listing === 'schedules_edit'" @reload="reload" :schedule="schedule" />
    </div>
  </div>
</template>

<script>

import BusStationListing from '@/components/Admin/BusStationListing.vue'
import CarrierListing from '@/components/Admin/CarrierListing.vue'
import LocationListing from '@/components/Admin/LocationListing.vue'
import UserListing from '@/components/Admin/UserListing.vue'
import VehicleListing from '@/components/Admin/VehicleListing.vue'
import ScheduleListing from '@/components/Admin/ScheduleListing.vue'
import Location from '@/components/Admin/Location.vue'
import Vehicle from '@/components/Admin/Vehicle.vue'
import BusStation from '@/components/Admin/BusStation.vue'
import Carrier from '@/components/Admin/Carrier.vue'
import User from '@/components/Admin/User.vue'
import Schedule from '@/components/Admin/Schedule.vue'
import { mapGetters } from 'vuex'
import { bus } from '../main'

export default {
  name: 'AdminPage',
  components: {
    BusStationListing,
    CarrierListing,
    ScheduleListing,
    LocationListing,
    UserListing,
    VehicleListing,
    Location,
    Vehicle,
    BusStation,
    Carrier,
    User,
    Schedule
  },
  data () {
    const dropdownCategory = this.$route.query.dropdownCategory || ''
    const listing = this.$route.query.listing || ''
    return {
      dropdownCategory: dropdownCategory,
      listing: listing,
      key: 0,
      location: null,
      vehicle: null,
      busStation: null,
      carrier: null,
      user: null,
      schedule: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/getUser',
      activeId: 'activeId'
    })
  },
  mounted () {
    if (this.listing.includes('edit') || this.listing.includes('my_carrier')) {
      this.getObject(this.listing)
    }
  },
  methods: {
    setCategory (category) {
      let locationQuery = { query: {} }
      this.dropdownCategory = category
      if (this.$route.query.listing) {
        locationQuery.query.listing = this.$route.query.listing
      }
      locationQuery.query.dropdownCategory = category
      this.$router.replace(locationQuery).catch(e => {})
    },
    setListing (listing) {
      if (!(listing.includes('add') || listing.includes('edit'))) {
        bus.$emit(`reload-${listing}`)
      }
      let locationQuery = { query: {} }
      this.listing = listing
      if (this.$route.query.dropdownCategory) {
        locationQuery.query.dropdownCategory = this.$route.query.dropdownCategory
      }
      locationQuery.query.listing = listing
      this.$router.replace(locationQuery).catch(e => {})
    },
    reload (query) {
      this.setListing(query.listing)
      this.setCategory(query.dropdownCategory)
      this.$router.replace({ query }).catch(e => {})
    },
    editLocation (location) {
      this.location = location
      this.setListing('locations_edit')
      this.$store.dispatch('setActiveObjectForEdit', { id: location.id })
    },
    editVehicle (vehicle) {
      this.vehicle = vehicle
      this.setListing('vehicles_edit')
      this.$store.dispatch('setActiveObjectForEdit', { id: vehicle.id })
    },
    editBusStation (busStation) {
      this.busStation = busStation
      this.setListing('stations_edit')
      this.$store.dispatch('setActiveObjectForEdit', { id: busStation.id })
    },
    editCarrier (carrier) {
      this.carrier = carrier
      this.setListing('carriers_edit')
      this.$store.dispatch('setActiveObjectForEdit', { id: carrier.id })
    },
    editUser (user) {
      this.user = user
      this.setListing('users_edit')
      this.$store.dispatch('setActiveObjectForEdit', { id: user.id })
    },
    editSchedule (schedule) {
      this.schedule = schedule
      this.setListing('schedules_edit')
      this.$store.dispatch('setActiveObjectForEdit', { id: schedule.id })
    },
    getObject (listing) {
      if (listing.includes('carrier') && !this.carrier) {
        this.getCarrier()
      }
      if (listing.includes('location') && !this.location) {
        this.getLocation()
      }
      if (listing.includes('user') && !this.user) {
        this.getUser()
      }
      if (listing.includes('station') && !this.station) {
        this.getBusStation()
      }
      if (listing.includes('vehicle') && !this.vehicle) {
        this.getVehicle()
      }
      if (listing.includes('schedule') && !this.schedule) {
        this.getSchedule()
      }
    },
    async getCarrier () {
      this.carrier = await this.$store.dispatch('carrier/carrier', { id: this.currentUser.carrier.id }, { root: true })
    },
    async getLocation () {
      this.location = await this.$store.dispatch('location/location', { id: this.activeId }, { root: true })
    },
    async getUser () {
      this.user = await this.$store.dispatch('user/user', { id: this.activeId }, { root: true })
    },
    async getBusStation () {
      this.busStation = await this.$store.dispatch('busStation/station', { id: this.activeId }, { root: true })
    },
    async getVehicle () {
      this.vehicle = await this.$store.dispatch('vehicle/vehicleById', { id: this.activeId }, { root: true })
      this.key++
    },
    async getSchedule () {
      this.schedule = await this.$store.dispatch('schedule/schedule', { id: this.activeId }, { root: true })
    }
  }

}
</script>

<style scoped>
.main {
    display: flex;
    position: relative;
    min-height: 100vh;
}
.dropdowns {
    width: 20%;
    border-right: 2px solid black;
    background-color: teal;
}
.forms {
    width: 80%;
    background-color: beige;
}
.dropdownCategory {
    display: flex;
    padding: 5px 5px 0 35px;
    cursor: pointer;
    border-bottom: 2px solid black;
    background-color: teal;
    color: beige;
    align-items: center;
}
.arrow-down {
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid beige;
  position: absolute;
  right: 81%;
}
.arrow-up {
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid beige;
  position: absolute;
  right: 81%;
}
.dropdownCategoryItem {
    padding: 5px 5px 5px 50px;
    background-color: beige;
    font-size: 16px;
    font-weight: 550;
    color: teal;
    cursor: pointer;
}
.categoryName {
    font-size: 18px;
    margin-bottom: 0;
    font-weight: 600;
}
</style>