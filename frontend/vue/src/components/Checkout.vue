<template>
  <div class="parent">
    <div class="row">
      <div class="col-100">
        <div class="container">
          <form action="">
            <div class="row">
              <div class="col-33">
                <h3>Cart</h3>
                <div class="cart">
                  <div>
                    <p>
                      <b>{{
                        schedule ? schedule.station[0].bus_station.name : ''
                      }}</b>
                    </p>
                  </div>
                  <span><b>&#8594;</b></span>
                  <div>
                    <p>
                      <b>{{
                        schedule
                          ? schedule.station[schedule.station.length - 1]
                              .bus_station.name
                          : ''
                      }}</b>
                    </p>
                  </div>
                </div>
                <p>Date: {{ schedule ? getDate(schedule.date) : '' }}</p>
                <p>
                  Arrival:
                  {{ schedule ? getTime(schedule.station[0].time) : '' }}
                </p>
                <p>
                  Departure:
                  {{
                    schedule
                      ? getTime(
                          schedule.station[schedule.station.length - 1].time
                        )
                      : ''
                  }}
                </p>
                <p>Carrier: {{ schedule ? schedule.carrier.name : '' }}</p>
              </div>

              <div class="col-33">
                <ValidationObserver novalidate ref="form" v-slot="{}">
                  <h3>Address</h3>
                  <label for="fname"
                    ><i class="fa fa-user"></i> First Name</label
                  >
                  <ValidationProvider
                    name="Firstname"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <fieldset>
                      <input
                        v-model="order.firstName"
                        placeholder="Petar"
                        type="text"
                        tabindex="1"
                        id="fname"
                        required
                      />
                      <span :style="{ color: '#dc3545', float: 'left' }">{{
                        errors[0]
                      }}</span>
                    </fieldset>
                  </ValidationProvider>
                  <label for="lname"
                    ><i class="fa fa-user"></i> Last Name</label
                  >
                  <ValidationProvider
                    name="Lastname"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <fieldset>
                      <input
                        v-model="order.lastName"
                        placeholder="Petrovic"
                        type="text"
                        tabindex="2"
                        id="lname"
                        required
                      />
                      <span :style="{ color: '#dc3545', float: 'left' }">{{
                        errors[0]
                      }}</span>
                    </fieldset>
                  </ValidationProvider>
                  <label for="email"
                    ><i class="fa fa-envelope"></i> Email</label
                  >
                  <ValidationProvider
                    name="Email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <fieldset>
                      <input
                        v-model="order.email"
                        placeholder="petarpetrovic@gmail.com"
                        type="text"
                        tabindex="3"
                        id="email"
                        required
                      />
                      <span :style="{ color: '#dc3545', float: 'left' }">{{
                        errors[0]
                      }}</span>
                    </fieldset>
                  </ValidationProvider>
                  <label for="tel"><i class="fa fa-phone"></i> Phone</label>
                  <ValidationProvider
                    name="Phone"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <fieldset>
                      <input
                        v-model="order.phone"
                        placeholder="0655555555"
                        type="text"
                        tabindex="4"
                        id="tel"
                        required
                      />
                      <span :style="{ color: '#dc3545', float: 'left' }">{{
                        errors[0]
                      }}</span>
                    </fieldset>
                  </ValidationProvider>
                </ValidationObserver>
              </div>

              <div class="col-33">
                <h3>Payment</h3>
                <label for="fname">Accepted Cards</label>
                <div class="icon-container">
                  <i class="fa fa-cc-visa" style="color:navy;"></i>
                  <i class="fa fa-cc-amex" style="color:blue;"></i>
                  <i class="fa fa-cc-mastercard" style="color:red;"></i>
                  <i class="fa fa-cc-discover" style="color:orange;"></i>
                </div>
                <b-form-group label="Nacini placanja" @click="submit()">
                  <b-form-radio v-model="selected" name="paypal" value="Paypal"
                    >Paypal</b-form-radio
                  >
                  <b-form-radio v-model="selected" name="card" value="PK"
                    >Pay by cards</b-form-radio
                  >
                </b-form-group>
                <div>
                  <div v-if="selected === 'PK' && isValidate">
                    <stripe-element-card
                      ref="elementRef"
                      :pk="pulishableKey"
                      :elementStyle="stripeOptions"
                      @token="tokenCreated"
                    />
                  </div>

                  <div v-else-if="selected === 'Paypal' && isValidate">
                    <PayPal
                      :amount="(schedule.price / 97.4).toFixed(2)"
                      currency="USD"
                      :client="credentials"
                      :experience="experienceOptions"
                      :button-style="myStyle"
                      @payment-completed="createOrder"
                      env="sandbox"
                    >
                    </PayPal>
                  </div>
                  <div v-else>
                    <p>
                      All fileds must be filled! If you still do not see
                      payments after filling out the form. Change payment and
                      return to the one you want.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BFormGroup, BFormRadio } from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import PayPal from 'vue-paypal-checkout'
import { StripeElementCard } from '@vue-stripe/vue-stripe'

export default {
  name: 'Checkout',
  components: {
    'b-form-group': BFormGroup,
    'b-form-radio': BFormRadio,
    PayPal,
    StripeElementCard
  },
  data () {
    return {
      selected: 'PK',
      schedule: null,
      isValidate: false,
      response: null,
      order: {
        firstName: this.user ? this.user.firstName : '',
        lastName: this.user ? this.user.lastName : '',
        email: this.user ? this.user.userName : '',
        phone: this.user ? this.user.phone : '',
        qty: 1,
        travelingId: null,
        userId: this.user ? this.user.id : null,
        additionalData: {}
      },
      credentials: {
        sandbox:
          'AcjDjYdG9NrIBo_mOQCSq5LnYf1mJin1vy0xP3RK7uQBjz5toNp9hXp0VJWjfPb-S-gpiT4BJG2jzNLX',
        production: '<production client id>'
      },
      experienceOptions: {
        input_fields: {
          no_shipping: 1
        }
      },
      myStyle: {
        label: 'checkout',
        size: 'responsive',
        shape: 'pill',
        color: 'gold'
      },
      pulishableKey:
        'pk_test_51HToNlBJ6JLvaHzMugrOicSO0yXvhMuR6Tbwa9FbHSOSlVfHilAYrTT8NiysdvwtjW6rE3urglzg4QKlau1iL9D500xOZZGZo5',
      token: '',
      stripeOptions: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    }
  },
  updated () {
    if (this.selected === 'PK') {
      this.$nextTick(() => {
        this.$refs.elementRef.$refs.submitButtonRef.innerHTML = 'Pay'
      })
    }
  },
  computed: {
    getScheduleID () {
      return this.$route.query.id
    },
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  mounted () {
    this.search()
    this.order.firstName = this.user ? this.user.firstName : ''
    this.order.lastName = this.user ? this.user.lastName : ''
    this.order.email = this.user ? this.user.userName : ''
    this.order.phone = this.user ? this.user.phone : ''
    this.order.userId = this.user ? this.user.id : null
    if (
      this.order &&
      this.order.firstName &&
      this.order.lastName &&
      this.order.email &&
      this.order.phone &&
      this.order.userId
    ) {
      this.isValidate = true
    }
    this.$nextTick(() => {
      this.$refs.elementRef.$refs.submitButtonRef.innerHTML = 'Pay'
    })
  },
  methods: {
    async search (value) {
      this.schedule = await this.$store.dispatch(
        'schedule/schedule',
        { id: this.getScheduleID },
        { root: true }
      )
      this.order.travelingId = this.schedule.id
    },
    getDate (date) {
      const time = new Date(date)
      const day = time ? time.getDate() : ''
      const month = time ? time.getMonth() + 1 : ''
      const year = time ? time.getFullYear() : ''
      const hour = time ? time.getHours() : ''
      const minute = time ? time.getMinutes() : ''
      const formattedHour = ('0' + hour).slice(-2)
      const formattedMinute = ('0' + minute).slice(-2)
      return (
        day +
        '/' +
        month +
        '/' +
        year +
        '  ' +
        formattedHour +
        ':' +
        formattedMinute
      )
    },
    getTime (timee) {
      const time = new Date(timee)
      const hour = time ? time.getHours() : ''
      const minute = time ? time.getMinutes() : ''
      const formattedHour = ('0' + hour).slice(-2)
      const formattedMinute = ('0' + minute).slice(-2)
      return formattedHour + ':' + formattedMinute
    },
    async createOrder (response) {
      console.error(response)
      this.order.additionalData = {
        paymentMethod: 'paypal',
        token: response.id,
        amount: response.transactions[0].amount.total,
        currency: response.transactions[0].amount.currency
      }
      this.response = await this.$store.dispatch('order/create', this.order, {
        root: true
      })
      if (this.response.status === 201) {
        alert(
          'Your order has been successfully placed. Tickets will be sent to you by e-mail.'
        )
        this.$router.push('/')
      }
    },
    async tokenCreated (token) {
      this.order.additionalData = {
        paymentMethod: 'stripe',
        token: token.id,
        amount: (this.schedule.price * 100).toString(),
        currency: 'RSD'
      }
      this.response = await this.$store.dispatch('order/create', this.order, {
        root: true
      })
      console.error(this.response)
      if (this.response.status === 201) {
        alert(
          'Your order has been successfully placed. Tickets will be sent to you by e-mail.'
        )
        this.$router.push('/')
      }
    },
    submit () {
      this.$refs.form.validate().then(success => {
        this.isValidate = success
      })
    }
  },
  watch: {
    selected: function (val) {
      this.submit()
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300, 400);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
.parent {
  margin: 25px;
}
h2 {
  text-align: left;
}
.row {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -10px;
}

.col-25 {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
}

.col-33 {
  -ms-flex: 33%; /* IE10 */
  flex: 33%;
}
.col-50 {
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
}
.col-100 {
  -ms-flex: 100%; /* IE10 */
  flex: 100%;
  height: 676px;
}

.col-33 {
  padding: 16px 16px;
}

.col-50 {
  padding: 16px 16px;
}
.container {
  background-color: #cfcccc85;
  padding: 3px 18px 13px 18px;
  border: 1px solid lightgrey;
  border-radius: 3px;
}

input[type='text'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4caf50;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: #45a049;
}

a {
  color: #2196f3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
}
.cart {
  display: flex;
}
.hide {
  visibility: visible !important;
  content: 'Pay ' !important;
  width: 100%;
  height: auto;
  margin-top: 20px;
}
/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other (also change the direction - make the "cart" column go on top) */
@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
</style>
