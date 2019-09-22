<template>
    <nav class="p-4 flex items-center fixed w-full h-16 shadow">
        <router-link
            to="/"
            class="px-2 no-underline mr-12">
            <i class="fab fa-vuejs fa-2x"></i>
        </router-link>
        <button
            to="/products"
            class="px-2 text-lg font-bold no-underline focus:outline-none"
            @click.prevent="getProducts"
            >BOARDS</button>
        <input
            v-model="keyword"
            class="w-full rounded mx-4 px-4 py-1 focus:outline-none"
            type="text">
        <button
            @click.prevent="searchProduct"
            class="focus:outline-none">
            <i class="fas fa-search"></i>
        </button>
        <router-link
            to="/admin"
            class="px-2">
            <i v-if="isAdmin" class="<i fas fa-user-cog fa-1.5x"></i>
        </router-link>
        <router-link
            to="/cart"
            class="px-2">
            <i v-if="isLogin && !isAdmin" class="fas fa-shopping-cart fa-1.5x"></i>
        </router-link>
        <router-link
            to="/profile"
            class="px-2">
            <i v-if="isLogin && !isAdmin" class="far fa-user-circle"></i>
        </router-link>
        <button
            v-if="!isLogin"
            class="rounded-lg flex justify-center focus:outline ou bg-transparent border border-black px-2 focus:outline-none hover:bg-black hover:text-white"
            @click.prevent="toLoginPage">Login</button>
        <button
            v-if="isLogin"
            class="rounded-lg flex justify-center focus:outline ou bg-transparent border border-black px-2 focus:outline-none hover:bg-black hover:text-white"
            @click.prevent="logout">Logout</button>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: [
        'isLogin', 
        'isAdmin',
        'user', 
        'products'
    ],
    data () {
        return {
            keyword: ''
        }
    },
    methods: {
        logout () {
            this.$emit('logout')
        },
        addToCart () {
            alert('addToCart')
        },
        getProducts() {
            this.$emit('getProducts')
        },
        toLoginPage() {
            this.$emit('toLoginPage')
        },
        searchProduct() {
            this.keyword = ''
        }
    }
}
</script>

<style scoped>

nav {
  background-color: #efeded;
}

</style>
