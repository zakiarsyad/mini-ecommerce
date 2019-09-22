<template>
    <div>
        <loader v-if="loading"></loader>
        <div class="w-10/12 mx-auto mx-12 mb-12">
            <div class="flex justify-center relative">
                <h1 class="h-20 text-5xl font-bold mb-2">Hi, Admin</h1>
                <button
                    @click.prevent="newProductForm"
                    class="absolute top-0 right-0 mt-4 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded focus:outline-none">
                    ADD NEW PRODUCT
                </button>
            </div>
            <div class="flex content">
                <div class="w-6/12 text-center overflow-auto rounded-lg border border-green-500">
                    <h1>List of Product</h1>
                    <div v-for="product in adminProduct" :key="product._id">
                        <div class="rounded shadow-lg m-4 p-4 bg-white flex">
                            <div class="w-4/12 w-32 h-32 overflow-hidden">
                                <img class="shadow" :src="product.image">
                            </div>
                            <div class="w-8/12 text-left px-4 flex">
                                <div class="w-6/12">
                                    <p>name </p>
                                    <p>description </p>
                                    <p>category </p>
                                    <p>price </p>
                                    <p>stock </p>
                                </div>
                                <div class="w-6/12">
                                    <p>: {{ product.name }}</p>
                                    <p>: {{ product.description }}</p>
                                    <p>: {{ product.category }}</p>
                                    <p>: {{ product.price }}</p>
                                    <p>: {{ product.stock }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-6/12">

                </div>
            </div>
        </div>
        <router-view 
            @addNewProduct="addNewProduct"/>
    </div>
</template>

<script>
import axios from 'axios'
import loader from '@/components/Loader.vue'

export default {
    name: 'adminpage',
    components:{
        loader
    },
    data() {
        return {
            server: `http://localhost:3000`,
            adminProduct: [],
            loading: false
        }
    },
    methods: {
        getAdminProducts() {
            axios({
                method: `get`,
                url: `${this.server}/products`
            })
                .then(({ data }) => {
                    this.adminProduct = data
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        newProductForm() {
            this.$router.push('/admin/addproduct')
        },
        addNewProduct(newProduct) {
            this.$router.push('/admin')
            this.loading = true
            
            axios({
                method: `post`,
                url: `${this.server}/products`,
                data: newProduct,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.loading = false
                    this.$nextTick(() => {
                        this.getAdminProducts()
                    })
                    alert('sukses')
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        }
    },
    mounted: function () {
        this.$nextTick(() => {
            this.getAdminProducts()
        })
    }
}
</script>

<style scoped>
.content {
    height: 500px;
}
</style>