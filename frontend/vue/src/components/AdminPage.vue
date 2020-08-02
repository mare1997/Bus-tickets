<template>
  <div class="main">
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
            <div class="dropdownCategoryItem" @click="listing = 'stanice'">
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
            <div class="dropdownCategoryItem"  @click="listing = 'prevoznici'">
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
            <div class="dropdownCategoryItem">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="listing = 'lokacije'">
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
            <div class="dropdownCategoryItem"  @click="listing = 'voznje'">
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
            <div class="dropdownCategoryItem"  @click="listing = 'korisnici'">
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
            <div class="dropdownCategoryItem">
                Dodaj
            </div>
            <div class="dropdownCategoryItem"  @click="listing = 'vozila'">
                Izlistaj
            </div>
        </div>
    </div>
    <div class="forms">
      <BusStationListing v-if="listing === 'stanice'" />
      <CarrierListing v-else-if="listing === 'prevoznici'" />
      <UserListing v-else-if="listing === 'korisnici'" />
      <VehicleListing v-else-if="listing === 'vozila'" />
      <DriveScheduleListing v-else-if="listing === 'voznje'" />
      <LocationListing v-else-if="listing === 'lokacije'" />
    </div>
  </div>
</template>

<script>

import BusStationListing from '@/components/AdminListings/BusStationListing.vue'
import CarrierListing from '@/components/AdminListings/CarrierListing.vue'
import DriveScheduleListing from '@/components/AdminListings/DriveScheduleListing.vue'
import LocationListing from '@/components/AdminListings/LocationListing.vue'
import UserListing from '@/components/AdminListings/UserListing.vue'
import VehicleListing from '@/components/AdminListings/VehicleListing.vue'

export default {
  name: 'AdminPage',
  components: {
    BusStationListing,
    CarrierListing,
    DriveScheduleListing,
    LocationListing,
    UserListing,
    VehicleListing
  },
  data () {
    return {
      dropdownCategory: '',
      listing: 'stanice'
    }
  },
  methods: {
    setCategory (category) {
      if (this.dropdownCategory === category) {
        this.dropdownCategory = ''
        return
      }
      this.dropdownCategory = category
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