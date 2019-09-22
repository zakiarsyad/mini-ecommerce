<template>
    <div class="w-10/12 mx-auto my-12">
        <h1 class="h-20 text-5xl font-bold text-center mb-24">CHECKOUT HISTORY</h1>
        <hr>
        <div class="flex">
            <div class="w-5/12 flex justify-center my-3 font-bold text-xl">Order id</div>
            <div class="w-5/12 flex justify-center my-3 font-bold text-xl">Status</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl"></div>
        </div>
        <hr>
        <div>
            <div v-for="cart in allCart" :key="cart._id">
                <div class="flex items-center">
                    <div class="w-5/12 flex justify-center my-2"> {{ cart._id }} </div>
                    <div class="w-5/12 flex justify-center my-2"> {{ cart.status }} </div>
                    <div class="w-2/12 flex justify-center items-center my-2 pr-12">
                        <button 
                            v-if="cart.status === 'confirmed'"
                            @click.prevent="payCart(cart._id)"
                            class="flex justify-center mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-1 px-4 mr-2 border border-green-500 hover:border-transparent rounded">
                            PAY
                        </button>
                        <button 
                            v-if="cart.status === 'confirmed'"
                            @click.prevent="deleteCart(cart._id)"
                            class="flex justify-center mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-2 border border-red-500 hover:border-transparent rounded">
                            <i class="fas fa-times"></i>
                        </button>
                        <div 
                            v-if="cart.status === 'paid'"
                            class="text-green-700 text-center">
                            we're processing your order
                        </div>
                        <button 
                            v-if="cart.status === 'shipped'"
                            @click.prevent="receiveProduct(cart._id)"
                            class="flex justify-center mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-2 border border-green-500 hover:border-transparent rounded">
                            RECEIVED
                        </button>
                    </div>
                </div>

                <div v-if="cart">
                    <div class="flex">
                        <div class="w-4/12 text-xs flex justify-center my-3 font-bold">Items</div>
                        <div class="w-2/12 text-xs flex justify-center my-3 font-bold">Amount</div>
                        <div class="w-2/12 text-xs flex justify-center my-3 font-bold">Price (USD $)</div>
                        <div class="w-2/12 text-xs flex justify-center my-3 font-bold">Total (USD $)</div>
                        <div class="w-2/12 text-xs flex justify-center my-3 font-bold"></div>
                    </div>
                    <hr>
                    <div 
                        v-for="item in cart.items" 
                        :key="item._id">
                        <div class="flex">
                            <div class="w-4/12 text-xs flex justify-center my-2">{{ item.productId.name }}</div>
                            <div class="w-2/12 text-xs flex justify-center my-2">{{ item.qty }}</div>
                            <div class="w-2/12 text-xs flex justify-center my-2">{{ item.productId.price }}</div>
                            <div class="w-2/12 text-xs flex justify-center my-2">{{ item.qty * item.productId.price}}</div>
                            <div class="w-2/12 flex justify-center my-2 pr-12">
                            </div>
                        </div>
                        <hr>
                        <hr>
                        <hr>
                    </div>
                </div>  
                <hr>
            </div>
        </div>

        <router-view />
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'history',
    props: ['allCart'],
    data () {
        return {

        }
    },
    methods: {
        getAllCart() {
            this.$emit('getAllCart')
        },
        deleteCart(id) {
            this.$emit('deleteCart', id)
        },
        payCart(id) {
            this.$emit('payCart', id)
        },
        receiveProduct(id) {
            this.$emit('receiveProduct', id)
        }
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getAllCart()
        })
    }
}
</script>

<style scoped>

</style>
