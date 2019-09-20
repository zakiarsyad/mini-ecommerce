<template>
    <div class="home">
      <banner></banner>
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
