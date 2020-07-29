<template>
  <div>
    <div class="h2"><h2>Recenzije</h2></div>
    <div class="parent">
      <div class="carrier-raiting">
        <div class="avg-raiting">
          <div class="line">
            <p>Ocene koristnika</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="true"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
        </div>
        <div class="all-raiting">
          <div class="line">
            <p>Vozni park</p>
            <div class="stars">
              <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="true"
              :char="'✔'"
              :inactive-char="'-'"
            />
            </div>
            
          </div>
          <div class="line">
            <p>Osoblje</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="true"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
          <div class="line">
            <p>Tačnost</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="true"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
          <div class="line">
            <p>Higijena u vozilima</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="true"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
        </div>
      </div>
      <div class="make-carrier-raiting">
        <div class="make-raiting">
          <p>Oceni prevoznika ...</p>
        </div>
        <div class="make-all-raiting">
          <div class="line">
            <p>Vozni park</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="false"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
          <div class="line">
            <p>Osoblje</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="false"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
          <div class="line">
            <p>Tačnost</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="false"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
          <div class="line">
            <p>Higijena u vozilima</p>
            <vue-stars
              name="demo"
              :active-color="'#339933'"
              :inactive-color="'#DDDDDD'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="3"
              :readonly="false"
              :char="'✔'"
              :inactive-char="'-'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueStars } from 'vue-stars'
export default {
  name: 'Raiting',
  compoents: {
    'vue-stars': VueStars
  }
}
</script>

<style scoped>
p:first-of-type {
  margin-bottom: 0;
  padding: 5px;
  width: 75%;
}
.h2 {
  text-align: center;
}
.line {
  display: flex;
  flex-wrap: nowrap;
}
.parent {
  display: flex;
  flex-wrap: wrap;
  margin-left: 5%;
  margin-right: 10%;
}
.carrier-raiting {
  width: 50%;
  padding: 2%;
}
.make-carrier-raiting {
  width: 50%;
  padding: 2%;
}
.avg-raiting {
  color: white;
  background-color: teal;
}
.make-raiting {
  color: white;
  background-color: teal;
}
.all-raiting {
  background-color: beige;
}
.make-all-raiting {
  background-color: beige;
}
.stars {
  float: right;
}
</style>