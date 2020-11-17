<template>
  <div class="container">
    <div id="contact">
      <h3 v-if="!user">Dodaj novog korisnika</h3>
      <h3 v-else>Izmeni korisnika</h3>
      <fieldset>
        <input
          v-model="value.userName"
          placeholder="Korisnicko ime"
          type="text"
          tabindex="1"
          required
          autofocus
          :disabled="!!user"
        />
      </fieldset>
      <fieldset>
        <input
          v-model="value.password"
          placeholder="Sifra"
          type="text"
          tabindex="2"
          required
        />
      </fieldset>
      <fieldset>
        <input
          v-model="value.firstName"
          placeholder="Ime"
          type="text"
          tabindex="3"
          required
        />
      </fieldset>
      <fieldset>
        <input
          v-model="value.lastName"
          placeholder="Prezime"
          type="email"
          tabindex="4"
          required
        />
      </fieldset>
      <fieldset>
        <input
          v-model="value.age"
          placeholder="Godine"
          type="text"
          tabindex="5"
          required
        />
      </fieldset>
      <fieldset>
        <select
          v-model="value.role"
          placeholder="Uloga"
          tabindex="6"
          required
        >
          <option
            v-for="role in roles"
            :key="role"
            :value="role"
            >{{ role }}</option
          >
        </select>
      </fieldset>
      <fieldset>
        <select
          v-model="value.locationId"
          placeholder="Lokacija"
          tabindex="7"
          required
        >
          <option
            v-for="location in locations"
            :key="location.id"
            :value="location.id"
            >{{ location.name }}</option
          >
        </select>
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
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      value: {
        id: this.user ? this.user.id : '',
        userName: this.user ? this.user.userName : '',
        password: '',
        firstName: this.user ? this.user.firstName : '',
        lastName: this.user ? this.user.lastName : '',
        age: this.user ? this.user.age : '',
        role: this.user ? this.user.role : '',
        locationId: this.user && this.user.location ? this.user.location.id : ''
      },
      roles: ['ADMIN', 'USER']
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations'
    })
  },
  methods: {
    submit () {
      if (this.user) {
        this.$store.dispatch('user/update', this.value)
        this.$emit('reload', {
          listing: 'korisnici',
          dropdownCategory: 'korisnici'
        })
      } else {
        this.$store.dispatch('user/create', this.value)
        this.$emit('reload', {
          listing: 'korisnici',
          dropdownCategory: 'korisnici'
        })
      }
    }
  }
}
</script>

<style type="css">
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
</style>