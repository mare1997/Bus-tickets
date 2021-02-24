<template>
  <div class="container">
    <div id="contact">
      <ValidationObserver novalidate ref="form" v-slot="{ }">
        <h3 v-if="!vehicle">Add new vehicle</h3>
        <h3 v-else>Edit vehicle</h3>
        <ValidationProvider name="Registration number" rules="required" v-slot="{ errors }">
          <fieldset>
            <input
              v-model="value.registration_number"
              placeholder="Registration number *"
              type="text"
              tabindex="1"
              required
              autofocus
            />
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
        <ValidationProvider name="Driver" rules="required" v-slot="{ errors }">
          <fieldset>
            <input
              v-model="value.driver"
              placeholder="Driver *"
              type="text"
              tabindex="2"
              required
            />
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
        <ValidationProvider name="Carrier" rules="required|min:0, You must select a carrier." v-slot="{ errors }">
          <fieldset>
            <select
              v-if="currentUser.role === 'ADMIN'"
              v-model="value.carrierId"
              placeholder="Carrier *"
              tabindex="3"
              required
            >
              <option value="-1" disabled selected>Carrier *</option>
              <option
                v-for="carrier in carriers"
                :key="carrier.id"
                :value="carrier.id"
              >{{carrier.name}}</option>
            </select>
            <select
              v-else
              v-model="value.carrierId"
              placeholder="Carrier *"
              tabindex="3"
              required
            >
              <option value="-1" disabled selected>Carrier *</option>
              <option :value="currentUser.carrier.id">{{currentUser.carrier.name}}</option>
            </select>
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
        <ValidationProvider name="Number of seats" rules="required|min:5, The minimum number of seats is 5." v-slot="{ errors }" v-if="!vehicle">
          <fieldset>
            <input
              v-model="value.numberSeats"
              placeholder="Number of seats in vehicle *"
              type="number"
              tabindex="4"
              required
            />
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
      </ValidationObserver>
      <fieldset>
        <button name="submit" type="submit" id="contact-submit" @click="submit()">Submit</button>
      </fieldset>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Vehicle',
  props: {
    vehicle: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      value: {
        id: this.vehicle ? this.vehicle.id : '',
        registration_number: this.vehicle ? this.vehicle.registration_number : '',
        driver: this.vehicle ? this.vehicle.driver : '',
        carrierId: this.vehicle ? this.vehicle.carrier.id : '-1',
        numberSeats: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      carriers: 'carrier/getCarriers',
      currentUser: 'user/getUser'
    })
  },
  methods: {
    submit () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        if (this.vehicle) {
          this.$store.dispatch('vehicle/update', this.value)
          this.$emit('reload', { listing: 'vehicles', dropdownCategory: 'vehicles' })
        } else {
          this.$store.dispatch('vehicle/create', this.value)
          this.$emit('reload', { listing: 'vehicles', dropdownCategory: 'vehicles' })
        }
      })
    }
  }
}
</script>

<style type="css" scoped>
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
</style>