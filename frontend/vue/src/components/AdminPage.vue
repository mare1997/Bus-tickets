<template>
  <div class="main" :key="key">
    <div class="dropdowns">
        <div class="dropdownCategory" @click="setCategory('stanice')">
            <p class="categoryName">
                Autobuske stanice
            </p>
            <div :class="dropdownCategory === 'stanice' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'stanice'">
            <div class="dropdownCategoryItem">
                Dodaj
            </div>
            <div class="dropdownCategoryItem" @click="setListing('stanice')">
                Izlistaj
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('prevoznici')">
            <p class="categoryName">
                Prevoznici
            </p>
            <div :class="dropdownCategory === 'prevoznici' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'prevoznici'">
            <div class="dropdownCategoryItem">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('prevoznici')">
                Izlistaj
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('lokacije')">
            <p class="categoryName">
                Lokacije
            </p>
            <div :class="dropdownCategory === 'lokacije' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'lokacije'">
            <div class="dropdownCategoryItem" @click="setListing('lokacije_dodaj')">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('lokacije')">
                Izlistaj
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('voznje')">
            <p class="categoryName">
                Red voznje
            </p>
            <div :class="dropdownCategory === 'voznje' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'voznje'">
            <div class="dropdownCategoryItem">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('voznje')">
                Izlistaj
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('korisnici')">
            <p class="categoryName">
                Korisnici
            </p>
            <div :class="dropdownCategory === 'korisnici' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'korisnici'">
            <div class="dropdownCategoryItem">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('korisnici')">
                Izlistaj
            </div>
        </div>
        <div class="dropdownCategory" @click="setCategory('vozila')">
            <p class="categoryName">
                Vozila
            </p>
            <div :class="dropdownCategory === 'vozila' ? 'arrow-up' : 'arrow-down'"></div>
        </div>
        <div class="dropdownItems" v-if="dropdownCategory === 'vozila'">
            <div class="dropdownCategoryItem" @click="setListing('vozila_dodaj')">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="setListing('vozila')">
                Izlistaj
            </div>
        </div>
    </div>
    <div class="forms">
      <BusStationListing v-if="listing === 'stanice'" />
      <CarrierListing v-else-if="listing === 'prevoznici'" />
      <UserListing v-else-if="listing === 'korisnici'" />
      <VehicleListing v-else-if="listing === 'vozila'" @edit-vehicle="editVehicle" />
      <DriveScheduleListing v-else-if="listing === 'voznje'" />
      <LocationListing v-else-if="listing === 'lokacije'" @edit-location="editLocation" />
      <Location v-else-if="listing === 'lokacije_dodaj'" @reload="reload" />
      <Location v-else-if="listing === 'lokacije_izmeni'" @reload="reload" :location="location" />
      <Vehicle v-else-if="listing === 'vozila_dodaj'" @reload="reload" />
      <Vehicle v-else-if="listing === 'vozila_izmeni'" @reload="reload" :vehicle="vehicle" />
    </div>
  </div>
</template>

<script>

import BusStationListing from '@/components/Admin/BusStationListing.vue'
import CarrierListing from '@/components/Admin/CarrierListing.vue'
import DriveScheduleListing from '@/components/Admin/DriveScheduleListing.vue'
import LocationListing from '@/components/Admin/LocationListing.vue'
import UserListing from '@/components/Admin/UserListing.vue'
import VehicleListing from '@/components/Admin/VehicleListing.vue'
import Location from '@/components/Admin/Location.vue'
import Vehicle from '@/components/Admin/Vehicle.vue'

export default {
  name: 'AdminPage',
  components: {
    BusStationListing,
    CarrierListing,
    DriveScheduleListing,
    LocationListing,
    UserListing,
    VehicleListing,
    Location,
    Vehicle
  },
  data () {
    const dropdownCategory = this.$route.query.dropdownCategory || ''
    const listing = this.$route.query.listing || ''
    return {
      dropdownCategory: dropdownCategory,
      listing: listing,
      key: 0,
      location: null,
      vehicle: null
    }
  },
  methods: {
    setCategory (category) {
      let locationQuery = { query: {} }
      if (this.dropdownCategory === category) {
        this.dropdownCategory = ''
        return
      }
      this.dropdownCategory = category
      if (this.$route.query.listing) {
        locationQuery.query.listing = this.$route.query.listing
      }
      locationQuery.query.dropdownCategory = category
      this.$router.replace(locationQuery).catch(e => {})
    },
    setListing (listing) {
      let locationQuery = { query: {} }
      if (this.listing === listing) {
        this.listing = ''
        return
      }
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
      this.setListing('lokacije_izmeni')
    },
    editVehicle (vehicle) {
      this.vehicle = vehicle
      this.setListing('vozila_izmeni')
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