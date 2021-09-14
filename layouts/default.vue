<template>
  <div id="wrapper" class="d-flex flex-column">
    <header class="header-global">
      <BullshitHeader />
    </header>
    <main class="flex-fill position-relative">
      <nuxt />
    </main>
    <footer class="footer">
      <BullshitFooter />
    </footer>
  </div>
</template>

<script>
import BullshitHeader from '~/components/BullshitHeader'
import BullshitFooter from '~/components/BullshitFooter'

export default {
  components: {
    BullshitHeader,
    BullshitFooter
  }
}
</script>

<style>
body, #wrapper {
   min-height:100vh;
}
</style>
