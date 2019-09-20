<template>
    <div>
        <div class="max-w-xs rounded ">
            <div class="product overflow-hidden shadow-lg">
                <img 
                    class="w-full" 
                    src="https://cdn-images-1.medium.com/max/1200/1*yeAO-nwsAqnzr7k-zoDkoQ.png">
            </div>
            <div href="#" class="px-6 py-4">
                <router-link 
                    :to="path"
                    class=" mb-2">{{ product.productName }}
                </router-link>
                <div 
                    class="text-base mb-2 text-red-600 font-semibold">
                    USD ${{ product.price }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'product',
  props: ['product'],
  data() {
      return {
          path: `/products/${this.product._id}`
      }
  }
}
</script>

<style>

.product {
    background-color: #efeded;
}

</style>
