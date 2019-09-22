<template>
    <div>
        <div @click.prevent="getDetail(product)" class="max-w-xs rounded ">
            <div class="product overflow-hidden shadow-lg h-64 w-64 rounded-lg">
                <img 
                    class="w-full" 
                    :src="product.image">
            </div>
            <div class="px-6 py-4">
                <a 
                    class=" mb-2">{{ product.name }}
                </a>
                <div 
                    class="text-base mb-2 text-red-600 font-semibold">
                    USD ${{ product.price }}
                </div>
            </div>
        </div>
        <router-view
            :productDetail="productDetail"
            @addToCart="addToCart"
            @backToProducts="backToProducts"/>
    </div>
</template>

<script>
export default {
  name: 'product',
  props: ['product'],
  data() {
      return {
          path: `/products/${this.product._id}`,
          productDetail: null
      }
  },
  methods: {
      getDetail(product) {
          this.productDetail = product
          this.$router.push(`/products/${product._id}`)
      },
      backToProducts() {
          this.productDetail = null
      },
      addToCart(amount, selectedProduct) {
          this.$emit('addToCart', amount, selectedProduct)
      }
  }
}
</script>

<style>

.product {
    background-color: #efeded;
}

</style>
