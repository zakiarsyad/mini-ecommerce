<template>
    <div>
        <a href="#" id="blur" @click.prevent="backToCart">
        </a>
        <div id="detail" class="shadow bg-white fixed z-20 rounded">
            <div class="w-10/12 mx-auto my-12 ">
                <div class="flex justify-center relative">
                    <h1 class="h-20 text-5xl font-bold mb-12">CHECKOUT</h1>
                    <button
                        @click.prevent="backToCart"
                        class="absolute top-0 right-0 rounded-lg flex justify-center focus:outline ou bg-transparent border border-black p-2 mt-6 focus:outline-none hover:bg-black hover:text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex">
                    <div class="w-4/12 flex justify-center my-3 font-bold text-xl">Items</div>
                    <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Amount</div>
                    <div class="w-3/12 flex justify-center my-3 font-bold text-xl">Price (USD $)</div>
                    <div class="w-3/12 flex justify-center my-3 font-bold text-xl">Total (USD $)</div>
                </div>
                <hr>
                <div v-for="item in cart.items" :key="item._id">
                    <div class="flex">
                        <div class="w-4/12 flex justify-center my-2">{{ item.productId.name }}</div>
                        <div class="w-2/12 flex justify-center my-2">{{ item.qty }}</div>
                        <div class="w-3/12 flex justify-center my-2">{{ item.productId.price }}</div>
                        <div class="w-3/12 flex justify-center my-2">{{ item.qty * item.productId.price}}</div>
                    </div>
                    <hr>
                </div>
                <hr>
                <div class="flex">
                    <div class="w-6/12 flex justify-center my-2"></div>
                    <div class="w-3/12 flex justify-center my-2 font-bold text-lg">Total (USD $)</div>
                    <div class="w-3/12 flex justify-center my-2 font-bold text-lg">{{ totalPrice }}</div>
                </div>
                <div class="flex mt-6">
                    <div class="w-6/12"></div>
                    <div class="w-6/12">
                        <button 
                            @click.prevent="confirmPayment" 
                            class="checkout w-full mt-2 w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                            CONFIRM PAYMENT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'checkout',
  props: ['cart', 'totalPrice'],
  data () {
    return {

    }
  },
  methods: {
    backToCart () {
        this.$router.push('/cart')
    },
    addToCart () {
        this.selectedProduct = this.productDetail
        this.$emit('addToCart', this.amount, this.selectedProduct)
    },
    confirmPayment() {
        this.$swal("Please seat back!", "We are processing your order", "success")
        this.$emit('confirmPayment')
    }
  }
}
</script>

<style scoped>

.product {
    height: 450px;
    widows: 450px;
}

#detail {
    top: 10%;
    left: 10%;
    width: 80vw;
    height: 80vh;
}

#blur {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: black;
    opacity: 0.5;
    cursor: default;
}

</style>
