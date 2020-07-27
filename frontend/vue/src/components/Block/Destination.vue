<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="h4"><h4>Ime grada</h4></div>
        <img src="~@/assets/city.jpg" alt="Avatar" style="width:100%;height:180px;">
        
      </div>
      <div class="flip-card-back">
        <p>Prevoznik: Lasta</p>
        <p>Polazak: Beograd</p>
        <p>Odrediste: Novi Sad</p>
        <p>Cena: 1000</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Destionation'
}
</script>

<style scoped>
.h4 {
  margin-bottom: 0px;
  height:25px;
  text-align: center;
  background-color: white;
}
.flip-card {
  padding-left: 5%;
  padding-right: 5%;
  background-color: transparent;
  width: 33%;
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
.flip-card-front, .flip-card-back {
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
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>