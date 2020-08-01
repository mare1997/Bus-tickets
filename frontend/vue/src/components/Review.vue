<template>
  <div>
    <div class="h2"><h2>Recenzije</h2></div>
    <div class="parent-raiting">
      <div class="carrier-raiting">
        <div class="avg-raiting">
          <div class="line">
            <p>Ocene koristnika ({{reviews.length}})</p>
            <p>({{average}})</p>
            <vue-stars
              name="Avg"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#44AA44'"
              :max="5"
              :value="Math.ceil(average)"
              :readonly="true"
              :char="'★'"
            />
          </div>
        </div>
        <div class="all-raiting">
          <div class="line">
            <p>Vozni park</p>
            <p>({{avgRollingStock}})</p>
            <div class="stars">
              <vue-stars
              name="RollingStock"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="Math.ceil(avgRollingStock)"
              :readonly="true"
              :char="'★'"
            />
            </div>
            
          </div>
          <div class="line">
            <p>Osoblje</p>
            <p>({{avgStaff}})</p>
            <vue-stars
              name="Staff"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="Math.ceil(avgStaff)"
              :readonly="true"
              :char="'★'"
            />
          </div>
          <div class="line">
            <p>Tačnost</p>
            <p>({{avgAccuaracy}})</p>
            <vue-stars
              name="Accuaracy"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="Math.ceil(avgAccuaracy)"
              :readonly="true"
              :char="'★'"
            />
          </div>
          <div class="line">
            <p>Higijena u vozilima</p>
            <p>({{avgHygiene}})</p>
            <vue-stars
              name="Hygiene"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="Math.ceil(avgHygiene)"
              :readonly="true"
              :char="'★'"
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
              name="RollingStockMake"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :readonly="false"
              :char="'★'"
              :value="rollingStock"
              v-model="rollingStock"
              />
          </div>
          <div class="line">
            <p>Osoblje</p>
            <vue-stars
              name="StaffMake"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="staff"
              :readonly="false"
              :char="'★'"
              v-model="staff"
            />
          </div>
          <div class="line">
            <p>Tačnost</p>
            <vue-stars
              name="AccuaracyMake"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="accuracy"
              :readonly="false"
              :char="'★'"
              v-model="accuracy"
            />
          </div>
          <div class="line">
            <p>Higijena u vozilima</p>
            <vue-stars
              name="HygieneMake"
              :active-color="'#f5120a'"
              :inactive-color="'#0a0505'"
              :shadow-color="'#66CC66'"
              :hover-color="'#f5120a'"
              :max="5"
              :value="hygiene"
              :readonly="false"
              :char="'★'"
              v-model="hygiene"
            />
          </div>
          <button @click="createReview" class="button">Dodaj recenziju</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueStars } from 'vue-stars'
import { mapGetters } from 'vuex'
export default {
  name: 'Review',
  compoents: {
    'vue-stars': VueStars
  },
  data () {
    return {
      reviews: [],
      rollingStock: 0,
      staff: 0,
      accuracy: 0,
      hygiene: 0
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      getUser: 'user/getUser'
    }),
    getUserId () {
      if (this.isLoggedIn) {
        return this.getUser.id
      } else {
        return 0
      }
    },
    avgRollingStock () {
      let array = []
      this.reviews.forEach(review => {
        array.push(parseInt(review.rollingStock))
      })
      return this.calculate(array)
    },
    avgStaff () {
      let array = []
      this.reviews.forEach(review => {
        array.push(parseInt(review.staff))
      })
      return this.calculate(array)
    },
    avgAccuaracy () {
      let array = []
      this.reviews.forEach(review => {
        array.push(parseInt(review.accuracy))
      })
      return this.calculate(array)
    },
    avgHygiene () {
      let array = []
      this.reviews.forEach(review => {
        array.push(parseInt(review.hygiene))
      })
      return this.calculate(array)
    },
    average () {
      let array = []
      this.reviews.forEach(review => {
        array.push(parseInt(review.rollingStock))
        array.push(parseInt(review.staff))
        array.push(parseInt(review.accuracy))
        array.push(parseInt(review.hygiene))
      })
      return this.calculate(array)
    }
  },
  async mounted () {
    await this.getReviews()
  },
  methods: {
    async getReviews () {
      this.reviews = await this.$store.dispatch('review/search', { id: this.$route.params.id }, { root: true })
    },
    async createReview () {
      debugger
      let review = await this.$store.dispatch('review/create',
        {
          rollingStock: this.rollingStock,
          staff: this.staff,
          accuracy: this.accuracy,
          hygiene: this.hygiene,
          carrierId: this.$route.params.id,
          userId: this.getUserId }, { root: true })

      this.reviews.push(review)
      this.rollingStock = 0
      this.staff = 0
      this.accuracy = 0
      this.hygiene = 0
    },
    calculate (array) {
      let i = 0
      let sum = 0
      let len = array.length

      while (i < len) {
        sum = sum + array[i++]
      }
      return sum / len
    }
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
.parent-raiting {
  display: flex;
  flex-wrap: wrap;
}
.carrier-raiting {
  width: 50%;
  padding: 2% 2% 2% 0;
}
.make-carrier-raiting {
  width: 50%;
  padding: 2% 0 2% 2%;
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
.button {
  background-color: Transparent;
  background-repeat:no-repeat;
  border: none;
  cursor:pointer;
  overflow: hidden;
  outline:none;
  color: red;
  padding: 5px;
  margin: 5px;
  float: right;
  border: 1px solid rgb(51, 51, 51);
  border-radius: 10%;
}
.button:hover {
  background-color: red;
  color: black;
}
</style>