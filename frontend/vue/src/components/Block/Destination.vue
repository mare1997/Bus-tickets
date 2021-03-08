<template>
  <router-link :to="{ name: 'Checkout', query: { id: destination.id } }">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <h4 class="h4">{{ getArrivalDestination }}</h4>
          <img
            src="~@/assets/bg.jpg"
            alt="Avatar"
            style="width:100%;height:180px;"
          />
        </div>
        <div class="flip-card-back">
          <p>Carrier: {{ destination.carrier.name }}</p>
          <p>Departure: {{ getDepartureDestination }}</p>
          <p>Date: {{ getDate(destination.date) }}</p>
          <p>Number of avaiable tickets: {{ destination.ticket.length }}</p>
          <p>Price: {{ destination.price }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Destionation',
  props: {
    destination: {
      type: Object,
      required: true
    }
  },
  computed: {
    getDepartureDestination () {
      return this.destination.station[0]
        .bus_station.location.name
    },
    getArrivalDestination () {
      return this.destination.station[this.destination.station.length - 1]
        .bus_station.location.name
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.h4 {
  margin-bottom: 0px;
  height: 25px;
  text-align: center;
  background-color: white;
}

p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.flip-card {
  padding-left: 5%;
  padding-right: 5%;
  background-color: transparent;
  width: 80%;
  height: 200px;
  perspective: 1000px;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
  border: 1px solid lightblue;
  border-radius: 15px;
}

/* Style the back side */
.flip-card-back {
  background-color: gray;
  color: white;
  transform: rotateY(180deg);
}
</style>
