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
                    @click.prevent="login"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Login
                </button>
            </div>
            <br>
            <p class="text-gray-500">
                don't have an account?
                <a @click.prevent="toRegisterPage" href="#" class="font-extrabold text-gray-700">register</a>
                here
            </p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'login',
    props: ['isLogin', 'user'],
    methods: {
        toRegisterPage () {
            this.$router.push('/register')
        },
        login () {
           this.$emit('login')
        }
    }
}

</script>

<style>

</style>
