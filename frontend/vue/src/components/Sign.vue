<template>
  <div>
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <div class="form">
          <ValidationObserver novalidate ref="form1" v-slot="{}">
            <h1>Create Account</h1>
            <ValidationProvider
              name="Firstname"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                type="text"
                v-model="firstname"
                placeholder="Firstname *"
              />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="Lastname"
              rules="required"
              v-slot="{ errors }"
            >
              <input type="text" v-model="lastname" placeholder="Lastname *" />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="Phone"
              rules="required"
              v-slot="{ errors }"
            >
              <input type="text" v-model="lastname" placeholder="Phone *" />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="Age"
              rules="required|min:0, Age must be a positive number."
              v-slot="{ errors }"
            >
              <input type="number" v-model="age" placeholder="Age *" />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <input type="email" v-model="email" placeholder="Email *" />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>

            <ValidationProvider
              name="Password"
              rules="required|password:6,Password must have at least 6 letters"
              v-slot="{ errors }"
            >
              <input
                type="password"
                v-model="password"
                placeholder="Password *"
              />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              name="Location"
              rules="required|min:0, You must select a location."
              v-slot="{ errors }"
            >
              <select v-model="locationId" placeholder="Lokacija" required>
                <option value="-1" disabled selected>Location *</option>
                <option
                  v-for="location in locations"
                  :key="location.id"
                  :value="location.id"
                  >{{ location.name }}</option
                >
              </select>
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </ValidationObserver>
          <button @click="register">Sign Up</button>
        </div>
      </div>
      <div class="form-container sign-in-container">
        <div class="form">
          <ValidationObserver ref="form2" v-slot="{}">
            <h1>Sign in</h1>
            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <input type="email" v-model="email" placeholder="Email" />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>

            <ValidationProvider
              name="Password"
              rules="required|password:6,Password must have at least 6 letters"
              v-slot="{ errors }"
            >
              <input
                type="password"
                v-model="password"
                placeholder="Password"
              />
              <span :style="{ color: '#dc3545', float: 'left' }">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </ValidationObserver>
          <button @click="login">Sign In</button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button class="ghost" id="signIn" @click="moveToLogin">
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" id="signUp" @click="moveToRegister">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sign',
  data () {
    return {
      firstname: '',
      lastname: '',
      phone: '',
      age: '',
      email: '',
      password: '',
      locationId: '-1'
    }
  },
  computed: {
    ...mapGetters({
      locations: 'location/getLocations'
    })
  },
  mounted () {
    const path = this.$route.path
    this.$store.dispatch('location/locations')
    if (path === '/register') {
      this.moveToRegister()
    }
  },
  methods: {
    moveToLogin () {
      const container = document.getElementById('container')
      container.classList.remove('right-panel-active')
    },
    moveToRegister () {
      const container = document.getElementById('container')
      container.classList.add('right-panel-active')
    },
    login () {
      this.$refs.form2.validate().then(success => {
        if (!success) {
          return
        }
        this.$store.dispatch('user/login', {
          userName: this.email,
          password: this.password
        })
      })
    },
    register () {
      this.$refs.form1.validate().then(success => {
        if (!success) {
          return
        }
        this.$store.dispatch('user/register', {
          userName: this.email,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
          age: this.age,
          locationId: this.locationId,
          isRegisterPage: true
        })
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

.form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}
select {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}
.container {
  background-color: #fff;
  border-radius: 0px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 820px;
  max-width: 100%;
  min-height: 650px;
  margin-top: 30px;
  margin-bottom: 30px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
