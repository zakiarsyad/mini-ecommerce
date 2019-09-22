<template>
    <div class="home text-center">
      <banner></banner>
      <h1 class="p-12 text-3xl font-extrabold">INI HOME TJOY</h1>
    </div>
</template>

<script>
// @ is an alias to /src
import banner from '@/components/Banner.vue'

export default {
  name: 'home',
  components: {
    banner
  }
}
</script>
