<template>
  <div class="container">  
    <div id="contact">
      <ValidationObserver ref="form" v-slot="{ }">
        <h3 v-if="!location">Add new location</h3>
        <h3 v-else>Edit location</h3>
        <ValidationProvider name="Name of location" rules="required" v-slot="{ errors }">
          <fieldset>
            <input
              v-model="place.name"
              placeholder="Name of location *"
              type="text"
              tabindex="1"
              required
              autofocus
            />
            <span :style="{color: '#dc3545', float: 'left'}">{{ errors[0] }}</span>
          </fieldset>
        </ValidationProvider>
        <ValidationProvider name="Zip code" rules="required" v-slot="{ errors }">
          <fieldset>
            <input
              v-model="place.zip_code"
              placeholder="Zip code *"
              type="text"
              tabindex="2"
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

export default {
  name: 'Location',
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      place: {
        id: this.location ? this.location.id : '',
        name: this.location ? this.location.name : '',
        zip_code: this.location ? this.location.zip_code : ''
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return
        }
        if (this.location) {
          this.$store.dispatch('location/update', this.place)
          this.$router.push({ name: 'AdminPage', query: { listing: 'locations', dropdownCategory: 'locations' } })
          this.$emit('reload', { listing: 'locations', dropdownCategory: 'locations' })
        } else {
          this.$store.dispatch('location/create', this.place)
          this.$router.push({ name: 'AdminPage', query: { listing: 'locations', dropdownCategory: 'locations' } })
          this.$emit('reload', { listing: 'locations', dropdownCategory: 'locations' })
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
#contact textarea,
#contact button[type="submit"] {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

#contact {
  background: #F9F9F9;
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
#contact textarea {
  width: 100%;
  border: 1px solid #ccc;
  background: #FFF;
  margin: 0 0 5px;
  padding: 10px;
}

#contact input[type="text"]:hover,
#contact input[type="email"]:hover,
#contact input[type="tel"]:hover,
#contact input[type="url"]:hover,
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
  background: #4CAF50;
  color: #FFF;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

#contact button[type="submit"]:hover {
  background: #43A047;
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