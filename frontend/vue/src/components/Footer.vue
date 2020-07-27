<template>
  <div class="footer-border">
    <footer class="footer">
      <div class="text-center py-3">© 2020 Copyright:
          <router-link :to="{ name: 'Home'}"> BusTickets.com</router-link>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>

<style>
.footer {
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(240, 240, 240);
  color: black;
  text-align: center;
  border-top: 2px solid rgb(51, 51, 51);
}
</style>