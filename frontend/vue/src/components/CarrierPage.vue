<template>
  <div>
    <MainSearchNavBar :activeNav="'activeP'" />
    <div  class="parent">
      <div class="h2"><h2>{{carrier.name}}</h2></div>
      <section id="info">
        <div class="row">
          <div class="card">
            <h2 v-if="carrier.name">Prevoznik: {{carrier.name}}</h2>
            <p v-if="carrier.phone">Telefon: {{carrier.phone}}</p>
            <p v-if="carrier.email">Email: {{carrier.email}}</p>
            <p v-if="carrier.site">Web: {{carrier.site}}</p>
            <p v-if="carrier.street">Ulica: {{carrier.street}}</p>
          </div>
        </div>
      </section>
      <div class="h2"><h2>Vozila</h2></div>
      <table style="width:100%">
        <thead class="thead">
          <tr>
            <th>Registracijski broj</th>
            <th>Vozac</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="vehicle in vehicles" :key="vehicle.id + Math.random()">
            <td>{{vehicle.registration_number}}</td>
            <td>{{vehicle.driver}}</td>
          </tr>
        </tbody>
      </table>
      <Review />
      <Comment />
    </div>
  </div>
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
import Review from '@/components/Review.vue'
import Comment from '@/components/Block/Comment.vue'
export default {
  name: 'CarrierPage',
  components: {
    MainSearchNavBar,
    Review,
    Comment
  },
  data () {
    return {
      carrier: {},
      vehicles: []
    }
  },
  mounted () {
    this.$route.params.carrier ? this.carrier = this.$route.params.carrier : this.getCarrierData()
    this.getVehicles()
  },
  methods: {
    async getCarrierData () {
      this.carrier = await this.$store.dispatch('carrier/carrier', { id: this.$route.params.id }, { root: true })
    },
    async getVehicles () {
      this.vehicles = await this.$store.dispatch('vehicle/vehicle', { id: this.$route.params.id }, { root: true })
    }

  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);
.parent {
  display: block;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10%;
}
.h2 {
  margin-top: 2%;
  text-align: center;
}
.thead {
  padding: 2px;
  border: 1px solid rgb(51, 51, 51);
  background-color: teal;
}
.tbody {
  padding: 2px;
  border: 1px solid rgb(51, 51, 51);
  background-color: beige;
}
table {
  margin: 15 px 0 25px 15px;
}

@import url("https://fonts.googleapis.com/css?family=Marvel:400,700");

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Marvel', sans-serif;
}

#info {
	padding: 3rem 0;
}

.row {
	width: 100%;
	max-width: 45rem;
	margin: 0 auto;
}

.card {
	display: inline-block;
	width: 100%;
	padding: 4rem 1rem 7rem 1rem;
	background-color: teal;
	position: relative;
}

.card:after {
	content: "";
	display: block;
	width: 0px;
	height: 0px;
	background-color: skyblue;
	top: 0px;
	right: 0px;
	border-bottom: 20px solid #006667;
	border-left: 20px solid #006667;
	border-right: 20px solid beige;
	border-top: 20px solid beige;
	position: absolute;
	filter: drop-shadow(-5px 5px 3px rgba(0, 0, 0, 0.5));
}

.card:before {
	content: "";
	display: block;
	width: 0px;
	height: 0px;
	border-top: 40px solid #006667;
	border-right: 40px solid #006667;
	border-left: 40px solid beige;
	border-bottom: 40px solid beige;
	bottom: 0px;
	left: 0px;
	position: absolute;
	filter: drop-shadow(7px -7px 5px rgba(0, 0, 0, 0.5));
}


.card h2 {
	color: snow;
	margin-bottom: 1rem;
	font-weight: 400;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.card p {
	color: snow;
	font-size: 1.1rem;
	line-height: 140%;
}
</style>