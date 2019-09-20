<template>
    <nav class="p-4 flex items-center fixed w-full h-16 shadow">
        <router-link
            to="/"
            class="px-2 no-underline">
            <i class="fab fa-vuejs fa-2x"></i>
        </router-link>
        <button
            to="/products"
            class="px-2 text-xl font-bold no-underline focus:outline-none"
            :products="products"
            @click.prevent="getProducts"
            >PRODUCT</button>
        <input
            v-if="isLogin"
            class="w-full rounded mx-4 focus:outline-none"
            type="text">
        <i v-if="isLogin" class="fas fa-search"></i>
        <router-link
            v-if="isLogin"
            to="/cart"
            class="px-2">
            <i class="fas fa-shopping-cart fa-1.5x"></i>
        </router-link>
        <router-link
            v-if="isLogin"
            to="/profile"
            class="px-2">
            <i class="far fa-user-circle"></i>
        </router-link>
        <button
            v-if="isLogin"
            class="px-2"
            @click.prevent="logout">Logout</button>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: [
        'isLogin', 
        'user', 
        'products'
    ],
    methods: {
        logout () {
            this.$emit('logout')
        },
        addToCart () {
            alert('addToCart')
        },
        getProducts() {
            this.$emit('getProducts')
        }
    }
}
</script>

<style scoped>

nav {
  background-color: #efeded;
}

</style>
