<template>
  <div id="app">
    <main>
      <Header />
      <router-view></router-view>
      <Footer />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import '@/assets/styles/tailwind.css'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
body {
  margin: 0;
}
/* html {
	background-color: #bb4945;
	background-image: linear-gradient(to bottom right, #180cac, #bb4945);
	color: #fff;
	font-family: "Newsreader", sans-serif;
	font-size: 16px;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	line-height: 1.5;
	min-height: 100vh;
	min-width: 300px;
	overflow-x: hidden;
	text-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
} */
#app {
  background-color: #F8F8FF;
	background-image: linear-gradient(to bottom right, #F8F8FF, #F8F8FF);
	color: black;
	font-family: "Newsreader", sans-serif;
	font-size: 16px;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	line-height: 1.5;
	min-height: 100vh;
	min-width: 300px;
	overflow-x: hidden;
	text-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}


</style>
