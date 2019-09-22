<template>
    <div>
        <!-- <banner/> -->
        <div class="w-10/12 mx-auto my-12 flex flex-wrap">
            <div 
                v-for="(product,index) in products" 
                :key="index" 
                class="w-3/12 cursor-pointer">
                <product 
                    :product="product"
                    @addToCart="addToCart"
                    class="m-3"></product>
            </div>
        </div>
    </div>
</template>

<script>
import banner from '@/components/Banner.vue'
import product from '@/components/Product.vue'

export default {
    name: 'products',
    components: {
        banner,
        product
    },
    props: [
        'products'
    ],
    methods: {
        addToCart (amount, selectedProduct) {
            this.$emit('addToCart', amount, selectedProduct)
        }
    }
}
</script>

<style>

</style>
