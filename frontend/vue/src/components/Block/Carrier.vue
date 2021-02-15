<template>
  <router-link
    :to="{ name: 'CarrierPage', params: { carrier: carrier, id: carrier.id } }"
  >
    <div class="center">
      <div class="property-card">
        <div class="property-image">
          <div class="property-image-title">
            <h5>{{ carrier.name }}</h5>
          </div>
        </div>
        <div class="property-description">
          <p v-if="carrier.name">Carrier: {{ carrier.name }}</p>
          <p v-if="carrier.phone">Phone: {{ carrier.phone }}</p>
          <p v-if="carrier.email">Email: {{ carrier.email }}</p>
          <p v-if="carrier.site">Web: {{ carrier.site }}</p>
          <p v-if="carrier.street">Street: {{ carrier.street }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Carrier',
  props: {
    carrier: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>
h5 {
  margin: 0px;
  font-size: 1.4em;
  font-weight: 700;
}

p {
  font-size: 12px;
}

.center {
  height: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* End Non-Essential  */

.property-card {
  height: 18em;
  width: 16em;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  -webkit-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-radius: 16px;
  overflow: hidden;
  -webkit-box-shadow: 15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
  box-shadow: 15px 15px 27px #e1e1e3, -15px -15px 27px #ffffff;
  justify-content: center;
}
/* ^-- The margin bottom is necessary for the drop shadow otherwise it gets clipped in certain cases. */

/* Top Half of card, image. */

.property-image {
  height: 18em;
  width: 100%;
  padding: 1em 2em;
  position: Absolute;
  top: 0px;
  -webkit-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-image: url('~@/assets/background.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
}

/* Bottom Card Section */

.property-description {
  background-color: #fafafc;
  height: 0em;
  width: 14em;
  position: absolute;
  bottom: 0em;
  -webkit-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  -o-transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 0 1em;
  text-align: left;
}

/* Property Cards Hover States */

.property-card:hover .property-description {
  height: 12em;
  padding: 0px 1em;
}
.property-card:hover .property-image {
  height: 6em;
}

.property-card:hover .property-social-icons {
  background-color: white;
}

.property-card:hover .property-social-icons:hover {
  background-color: blue;
  cursor: pointer;
}

.property-image-title {
  text-align: center;
  position: Relative;
  top: 30%;
  transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s;
  color: red;
  font-size: 1.2em;
}

.property-card:hover .property-image-title {
  opacity: 1;
}
</style>
