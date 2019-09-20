<template>
    <div class="flex justify-center items-center mt-24">
        <form class="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 flex items-center flex-col">
            <div class="mb-4">
                <input
                    v-model="user.email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="email">
            </div>
            <div class="mb-6">
                <input
                    v-model="user.password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="password">
            </div>
            <div class="flex items-center justify-between">
                <button
                    @click.prevent="register"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Register
                </button>
            </div>
            <br>
            <p class="text-gray-500">
                already have an account?
                <a @click.prevent="goToLoginPage" href="#" class="font-extrabold text-gray-700">login</a>
                here
            </p>
        </form>
    </div>
</template>

<script>
export default {
  name: 'register',
  props: ['isLogin', 'user'],
  methods: {
    goToLoginPage () {
      this.$router.push('/login')
    },
    register () {
      this.$emit('register')
    }
  }
}

</script>

<style>

</style>
