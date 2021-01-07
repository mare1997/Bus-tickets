<template>
  <div class="container">
    <div class="ride" @click="clicked = !clicked">
      <div class="quarter">
        <p style='width: 15%;'>{{schedule.station[0].time}}</p>
        <i class="fa fa-bus" aria-hidden="true"></i>
        <p>{{schedule.station[0].bus_station.name}}</p>
        <p style="margin-left: 10%">{{schedule.date}}</p>
        <p class="price">{{schedule.price}} RSD</p>
      </div>
      <div class="half">
        <div class="line"></div>
        <p class="duration">Trajanje voznje: 2 sata</p>
        <img class="driveCompanyLogo" v-if="schedule.carrier.image" :src="'~@/assets/' + schedule.carrier.image" />
        <p class="price" v-else>{{schedule.carrier.name}}</p>
      </div>
      <div class="quarter">
        <p style='width: 15%;'>{{getDate(schedule.station[schedule.station.length - 1].time)}}</p>
        <i class="fa fa-map-marker" aria-hidden="true"></i>
        <p>{{schedule.station[schedule.station.length - 1].bus_station.name}}</p>
        <button class="checkoutButton">Buy ticket</button>
      </div>
    </div>
    <div class="stationList" v-if="clicked">
      <div class="stationHeader">
        <div class="stationIconHeader"></div>
        <p class="stationItem">Stations</p>
        <p class="stationItem">Dolazak</p>
        <p class="stationItem">Odlazak</p>
      </div>
      <div class="station" v-for="station in schedule.station" :key="station.id + Math.random()">
        <div class="stationIcon">
          <div class="dot"></div>
        </div>
        <p class="stationItem">{{station.bus_station.name}}</p>
        <p class="stationItem">{{getDate(station.time)}}</p>
        <p class="stationItem">{{getDate(station.time)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Schedule',
  props: {
    schedule: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      clicked: false
    }
  },
  methods: {
    getDate (date) {
      const d = new Date(date)
      const time = d.toLocaleDateString('en-US')
      const day = time ? time.getDate() : ''
      const month = time ? time.getMonth() + 1 : ''
      const year = time ? time.getFullYear() : ''
      const hour = time ? time.getHours() : ''
      const minute = time ? time.getMinutes() : ''
      const formattedHour = ('0' + hour).slice(-2)
      const formattedMinute = ('0' + minute).slice(-2)
      return day + '/' + month + '/' + year + '  ' + formattedHour + ':' + formattedMinute
    }
  }
}
</script>

<style>
.ride {
  height: 150px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #F5F5DC;
  border-radius: 5px;
}

.ride:hover {
  background-color: rgb(180, 180, 159);
  padding-left: 10px;
  padding-right: 10px;
}

.quarter {
  padding-left: 10px;
  display: flex;
  height: 25%;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
}

.half {
  padding-left: 10px;
  display: flex;
  height: 50%;
  flex-direction: row;
  background-color: transparent;
  align-items: center;
  padding: 5px;
}

p {
  font-size: 16px;
  margin-right: 5px;
}

p:first-of-type {
  font-size: 16px;
  margin-right: -5px;
}

i {
  margin-right: 10px;
  margin-left: -5px;
}

.line {
  border-right: 2px solid black;
  width: 15%;
  height: 100%;
}


.duration {
  padding-left: 20px;
}

.price {
  font-size: 24px;
  font-weight: 500;
  float: right;
  margin-left: auto;
}

.checkoutButton {
  color: white;
  background-color: teal;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
  border: 1px solid lightgrey;
  padding: 6px;
  border-radius: 5px;
  cursor: pointer;
}

.checkoutButton:hover {
  background-color: lightgreen;
  color: black
}

.driveCompanyLogo {
  margin-left: auto;
  height: 100%;
  width: 75px;
}

.stationList {
  background-color: rgb(180, 180, 159);
  border-radius: 5px;
}

.stationHeader {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  border-bottom: 1px solid white;
  align-items: center;
}

.station {
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  align-items: center;
}

.stationItem {
  width: 30%;
}

.stationIconHeader {
  width: 10%;
  height: 50px;
}

.stationIcon {
  width: 10%;
  height: 50px;
  align-items: center;
  text-align: center;
  background: linear-gradient(to right,
      transparent 0%,
      transparent calc(50% - 1.21px),
      black calc(50% - 1.2px),
      black calc(50% + 1.2px),
      transparent calc(50% + 1.21px),
      transparent 100%);
}

.dot {
  display: inline-block;
  height: 12px;
  width: 12px;
  background-color: black;
  border-radius: 50%;
  margin-top: 20%;
}

.stationHeader .stationItem {
  font-weight: 600;
}
</style>