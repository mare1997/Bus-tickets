<template>
  <div>
    <section class="container">
      <div class="product-quantity">
        <h3>Quantity</h3>
        <div class="quantity-selectors">
          <button @click="decrement" type="button" class="decrement-quantity" aria-label="Subtract one" data-direction="-1" :disabled="disabled"><span>&#8722;</span></button>
        <input data-min="1" data-max="0" type="text" name="quantity" v-model="number" @input="input">
        <button @click="increment" type="button" class="increment-quantity" aria-label="Add one" data-direction="1"><span>&#43;</span></button>
        </div>
        
        <!-- <div class="quantity-selectors-container">
          <div class="quantity-selectors">
            <button @click="increment" type="button" class="increment-quantity" aria-label="Add one" data-direction="1"><span>&#43;</span></button>
            <button @click="decrement" type="button" class="decrement-quantity" aria-label="Subtract one" data-direction="-1" :disabled="disabled"><span>&#8722;</span></button>
          </div>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'QtyButton',
  data () {
    return {
      number: 1,
      disabled: true
    }
  },
  methods: {
    increment () {
      this.number++
      if (this.number <= 0) {
        this.number = 1
      }
      if (this.number > 1) {
        this.disabled = false
      }
      if (this.number === 1) {
        this.disabled = false
      }
      this.$emit('change', this.number)
    },
    decrement () {
      this.number--
      if (this.number <= 0) {
        this.number = 1
      }
      if (this.number > 1) {
        this.disabled = false
      }
      if (this.number === 1) {
        this.disabled = false
      }
      this.$emit('change', this.number)
    },
    input () {
      if (this.number <= 0) {
        this.number = 1
      }
      if (this.number > 1) {
        this.disabled = false
      }
      if (this.number === 1) {
        this.disabled = false
      }
      this.$emit('change', this.number)
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: auto;
  display: flex;
  align-items: center;
}

h3 {
  display: block;
  font-size: 0.6rem;
  font-family: sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-bottom: 0.25rem;
  color: #333;
}

.product-quantity {
  width: 10rem;
  display: block;
}

input {
  max-width: 2rem;
  margin: 0;
  padding: 0.75rem 0;
  text-align: center;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  border-bottom: 1px solid grey;
  border-right: 0;
}


.quantity-selectors button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  border-radius: 0;
  border: 1px solid grey;
  background-color: #fff;
  color: grey;
}

.quantity-selectors button:first-child {
  border-bottom: 0;
}

.quantity-selectors button:hover {
  cursor: pointer;
}

.quantity-selectors button[disabled="disabled"] {
  cursor: not-allowed;
}

.quantity-selectors button[disabled="disabled"] span {
  opacity: 0.5;
}
</style>
