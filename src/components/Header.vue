<template>
  <div class="pb-5">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-nav>
        <b-nav-item>
          <nuxt-link to="/">
            Home
          </nuxt-link>
        </b-nav-item>
      </b-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderComponent',
  setup () {}
})
</script>

<style lang="scss" scoped>
.nuxt-link-active, .nav-link a {
  color: #FFF;
}
</style>
