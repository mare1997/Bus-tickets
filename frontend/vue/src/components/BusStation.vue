<template>
  <div>
    <MainSearchNavBar :activeNav="'activeP'" />
    <div  class="parent">
      <div class="h2"><h2>Autobska Stanica Ime</h2></div>
      <section id="info">
        <div class="row">
          <div class="card">
            <h2>Station: 818181818</h2>
            <p>Telefon: 818181818</p>
            <p>Email: gadga@gdaga.rs</p>
            <p>Web: www.some.vs</p>
          </div>
        </div>
      </section>
      <div class="h2"><h2>Polasci</h2></div>
      <table style="width:100%">
        <thead class="thead">
          <tr>
            <th>Prevoznik</th>
            <th>Odrediste</th>
            <th>Polazak</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr>
            <td>Lasta</td>
            <td>Smedervo</td>
            <td>16:10</td>
          </tr>
          <tr>
            <td>Jugoprevoz</td>
            <td>Nis</td>
            <td>15:30</td>
          </tr>
        </tbody>
      </table>
      <div class="h2"><h2>Mapa</h2></div>
      <div>
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          
          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>
          <vl-feature>
            <vl-geom-point :coordinates="center"></vl-geom-point>
          </vl-feature>
        </vl-map>
      </div>
    </div>
  </div>
</template>

<script>
import MainSearchNavBar from '@/components/MainSearchNavBar.vue'
export default {
  name: 'BusStation',
  components: {
    MainSearchNavBar
  },
  data () {
    return {
      center: [20.92898276982583, 44.6666816016907],
      zoom: 17,
      rotation: 0
    }
  }
}
</script>

<style scoped>

.parent {
  display: block;
  margin-left: 20%;
  margin-right: 20%;
  margin-bottom: 10%;
}
.h2 {
  margin-top: 2%;
  text-align: center;
  margin-bottom: 20px;
}
.thead {
  border: 1px solid rgb(51, 51, 51);
  background-color: teal;
}
.tbody {
  border: 1px solid rgb(51, 51, 51);
  background-color: beige;
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
	padding: 1.5rem;
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

.card:nth-of-type(1) {
	margin-right: 9%;
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