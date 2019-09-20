<template>
    <div>
        <banner/>
        <div class="w-10/12 mx-auto my-12 flex flex-wrap">
            <div 
                v-for="(product,index) in products" 
                :key="index" 
                class="w-3/12">
                <product 
                    :product="product"
                    class="m-3"></product>
            </div>
        </div>
        <router-view
            @addToCart="addToCart"/>
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
        addToCart () {
        this.$toast.open('Success add product to cart')
        alert('masuk products')
        this.$emit('addToCart')
        this.$router.push('/products')
        }
    }
}
</script>

<style>

</style>
