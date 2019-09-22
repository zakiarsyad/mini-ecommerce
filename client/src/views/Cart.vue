<template>
    <div class="w-10/12 mx-auto my-12">
        <h1 class="h-20 text-5xl font-bold text-center mb-24">SHOPPING CART</h1>
        <hr>
        <div class="flex">
            <div class="w-4/12 flex justify-center my-3 font-bold text-xl">Items</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Amount</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Price (USD $)</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Total (USD $)</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl"></div>
        </div>
        <hr>
        <div v-for="item in cart.items" :key="item._id">
            <div class="flex">
                <div class="w-4/12 flex justify-center my-2">{{ item.productId.name }}</div>
                <div class="w-2/12 flex justify-center my-2">{{ item.qty }}</div>
                <div class="w-2/12 flex justify-center my-2">{{ item.productId.price }}</div>
                <div class="w-2/12 flex justify-center my-2">{{ item.qty * item.productId.price}}</div>
                <div class="w-2/12 flex justify-center my-2 pr-12">
                    <button 
                        @click.prevent="deleteFromCart(item._id)"
                        class="flex justify-center mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-2 border border-red-500 hover:border-transparent rounded">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <hr>
        </div>
        <hr>
        <div class="flex">
            <div class="w-6/12 flex justify-center my-2"></div>
            <div class="w-2/12 flex justify-center my-2 font-bold text-lg">Total (USD $)</div>
            <div class="w-2/12 flex justify-center my-2 font-bold text-lg">{{ totalPrice }}</div>
            <div class="w-2/12 flex justify-center my-2 font-bold text-lg"></div>
        </div>
        <div class="flex">
          <div class="w-6/12"></div>
          <div class="w-4/12">
              <button 
                @click.prevent="checkout" 
                class="checkout w-full mt-2 w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                CHECKOUT NOW</button>
          </div>
          <div class="w-2/12"></div>
        </div>

        <router-view
            :cart="cart"
            :totalPrice="totalPrice"/>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'cart',
    props: ['cart', 'totalPrice'],
    data () {
        return {

        }
    },
    methods: {
        getCart() {
            this.$emit('getCart')
        },
        deleteFromCart(id) {
            this.$emit('deleteFromCart', id)
        },
        checkout() {
            this.$router.push('/cart/checkout')
        }
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getCart()
        })
    }
}
</script>

<style scoped>

</style>
