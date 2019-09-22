<template>
    <div>
        <a href="#" id="blur" @click.prevent="backToAdminPage">
        </a>
        <div id="detail" class="shadow bg-white fixed z-20 rounded">
            <div class="w-10/12 mx-auto h-full">
                <div class="flex justify-center relative">
                    <h1 class="h-8 text-5xl font-bold mb-12">EDIT A PRODUCT</h1>
                    <button
                        @click.prevent="backToAdminPage"
                        class="absolute top-0 right-0 rounded-lg flex justify-center focus:outline ou bg-transparent border border-black p-2 mt-4 focus:outline-none hover:bg-black hover:text-white">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex">
                    <div class="w-4/12 mt-4 pr-4">
                        <img :src="selectedProduct.image">
                    </div>
                    <div class="w-8/12">
                        <form 
                            @submit.prevent="editProduct"
                            enctype="multipart/form-data" 
                            class="w-full">
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        Product Name
                                    </label>
                                    <input 
                                        v-model="editedProduct.name"
                                        :placeholder="selectedProduct.name"
                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        Description
                                    </label>
                                    <input 
                                    :placeholder="selectedProduct.description"
                                    v-model="editedProduct.description"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                </div>
                            </div>
                            <!-- <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        Category
                                    </label>
                                    <div class="relative">
                                        <select 
                                            @change="selectCategory($event)"
                                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option>-</option>
                                            <option>Short Boards</option>
                                            <option>Versatile</option>
                                            <option>Long Boards</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        Price
                                    </label>
                                    <input 
                                    :placeholder="selectedProduct.price"
                                    v-model="editedProduct.price"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        Stock
                                    </label>
                                    <input 
                                    :placeholder="selectedProduct.stock"
                                    v-model="editedProduct.stock"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                                        Photo
                                    </label>
                                    <div class="relative">
                                        <input
                                            type="file"
                                            ref="image"
                                            accept="image/*"
                                            v-on:change="handleimage">
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex mt-6">
                                <div class="w-6/12"></div>
                                <div class="w-6/12">
                                    <button 
                                        class="checkout w-full mt-2 w-full bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                                        ADD</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addproduct',
    props: ['selectedProduct'],
    data () {
        return {
            editedProduct: {
                name: '',
                description: '',
                stock: '',
                category: '',
                price: '',
                image: ''
            }
        }
    },
    methods: {
        backToAdminPage() {
            this.$router.push('/admin')
        },
        handleimage() {
            let reader = new FileReader()
            reader.readAsDataURL(this.$refs.image.files[0])
            this.editedProduct.image = this.$refs.image.files[0]
        },
        editProduct() {
            console.log(this.editedProduct);
            let formData = new FormData()
            if (this.editedProduct.name) formData.append("name", this.editedProduct.name)
            if (this.editedProduct.description) formData.append("description", this.editedProduct.description)
            if (this.editedProduct.stock) formData.append("stock", this.editedProduct.stock)
            if (this.editedProduct.price) formData.append("price", this.editedProduct.price)
            if (this.editedProduct.category) formData.append("category", this.editedProduct.category)
            if (this.editedProduct.image) formData.append("image", this.editedProduct.image)

            this.$emit('editProduct', formData, this.selectedProduct._id)
        },
        selectCategory($event) {
            this.newProduct.category = event.target.value
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
    left: 20%;
    width: 60vw;
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
