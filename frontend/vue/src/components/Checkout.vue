<template>
  <div class="parent">
    <div class="row">
      <div class="col-100">
        <div class="container">
          <form action="">
            <div class="row">
              <div class="col-33">
                <h3>Korpa</h3>
                
              </div>

              <div class="col-33">
                <h3>Adresa</h3>
                <label for="fname"><i class="fa fa-user"></i> First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Petar">
                <label for="lname"><i class="fa fa-user"></i> Last Name</label>
                <input type="text" id="lname" name="firstname" placeholder="Petrovic">
                <label for="email"><i class="fa fa-envelope"></i> Email</label>
                <input type="text" id="email" name="email" placeholder="john@example.com">
                <label for="tel"><i class="fa fa-phone"></i> Telefon</label>
                <input type="text" id="tel" name="telefon" placeholder="06555555555">
              </div>

              <div class="col-33">
                <h3>Placanje</h3>
                <label for="fname">Accepted Cards</label>
                <div class="icon-container">
                  <i class="fa fa-cc-visa" style="color:navy;"></i>
                  <i class="fa fa-cc-amex" style="color:blue;"></i>
                  <i class="fa fa-cc-mastercard" style="color:red;"></i>
                  <i class="fa fa-cc-discover" style="color:orange;"></i>
                </div>
                <b-form-group label="Nacini placanja">
                  <b-form-radio v-model="selected" name="paypal" value="Paypal">Paypal</b-form-radio>
                  <b-form-radio v-model="selected" name="card" value="PK">Placnje karticom</b-form-radio>
                </b-form-group>
                <div v-if="selected === 'PK'">
                  <label for="cname">Name on Card</label>
                  <input type="text" id="cname" name="cardname" placeholder="John More Doe">
                  <label for="ccnum">Credit card number</label>
                  <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
                  <div class="row">
                    <div class="col-50">
                      <label for="expyear">Exp Date</label>
                      <input type="text" id="expyear" name="expyear" placeholder="03/2018">
                    </div>
                    <div class="col-50">
                      <label for="cvv">CVV</label>
                      <input type="text" id="cvv" name="cvv" placeholder="352">
                    </div>
                  </div>
                </div>
                
                <div v-else-if="selected === 'Paypal'">
                  <p>kurcina</p>
                </div>
              </div>
              
            </div>
            <input type="submit" value="Continue to checkout" class="btn">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {BFormGroup, BFormRadio} from 'bootstrap-vue'
export default {
  name: 'Checkout',
  components: {
    'b-form-group': BFormGroup,
    'b-form-radio': BFormRadio
  },
  data () {
    return {
      selected: 'Paypal'
    }
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
.parent {
  margin: 25px;
}
body {
  font-family: Arial;
  font-size: 17px;
}
h2{
text-align:left;
}

* {
  box-sizing: border-box;
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

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: #4CAF50;
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
  color: #2196F3;
}

hr {
  border: 1px solid lightgrey;
}

span.price {
  float: right;
  color: grey;
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