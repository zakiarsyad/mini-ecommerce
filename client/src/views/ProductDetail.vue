<template>
    <div>
        <a href="#" id="blur" @click.prevent="backToProducts">
        </a>
        <div id="detail" class="shadow bg-white fixed z-20 rounded">
            <div class="w-10/12 mx-auto my-12 flex">
                <div class="w-6/12">
                    <div class="product overflow-hidden shadow-lg rounded">
                        <img class="w-full" :src="productDetail.image" >
                    </div>
                </div>
                <div class="w-1/12"></div>
                <div class="w-5/12">
                    <div class="flex justify-center relative">
                        <h1 class="h-20 text-5xl font-bold mb-12">{{ productDetail.name }}</h1>
                        <button
                            @click.prevent="backToProducts"
                            class="absolute top-0 right-0 rounded-lg flex justify-center focus:outline ou bg-transparent border border-black p-2 mt-6 focus:outline-none hover:bg-black hover:text-white">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="qty w-full rounded py-2 mt-2 flex justify-between border">
                        <button 
                            @click.prevent="minus" 
                            class="focus:outline-none">
                            <i class="fas fa-minus px-3"></i></button>
                        <div>{{ amount }}</div>
                        <button 
                            @click.prevent="add" 
                            class="focus:outline-none">
                            <i class="fas fa-plus px-3"></i></button>
                    </div>
                    <button 
                        @click="addToCart" 
                        class="mt-2 w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                        ADD TO CART</button>
                    <div class="flex mt-8">
                        <p class="w-3/12 ">Price</p>
                        <p class="w-1/12">:</p>
                        <p class="w-8/12">USD ${{ productDetail.price }}</p>
                    </div>
                    <div class="flex">
                        <p class="w-3/12">Description</p>
                        <p class="w-1/12">:</p>
                        <p class="w-8/12">{{ productDetail.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productdetail',
  props: ['productDetail'],
  data () {
    return {
      amount: 1,
      selectedProduct: null
    }
  },
  methods: {
    add () {
      this.amount += 1
    },
    minus () {
      if (this.amount > 1) this.amount -= 1
    },
    backToProducts () {
      this.$emit('backToProducts')
      this.$router.push('/products')
    },
    addToCart () {
      this.selectedProduct = this.productDetail
      this.$emit('addToCart', this.amount, this.selectedProduct)
    }
  }
}
</script>

<style scoped>

.product {
    height: 450px;
    widows: 450px;
}

.add-to-cart {
    background-color: #41B882;
    color: #efeded;
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
