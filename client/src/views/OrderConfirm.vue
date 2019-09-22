<template>
    <div class="w-10/12 mx-auto my-12">
        <h1 class="h-20 text-5xl font-bold text-center mb-24">CHECKOUT HISTORY</h1>
        <hr>
        <div class="flex">
            <div class="w-5/12 flex justify-center my-3 font-bold text-xl">Order id</div>
            <div class="w-5/12 flex justify-center my-3 font-bold text-xl">Customer</div>
            <div class="w-5/12 flex justify-center my-3 font-bold text-xl">Status</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl"></div>
        </div>
        <hr>
        <div>
            <div v-for="cart in adminCart" :key="cart._id">
                <div class="flex items-center">
                    <div class="w-5/12 flex justify-center my-2"> {{ cart._id }} </div>
                    <div class="w-5/12 flex justify-center my-2"> {{ cart.userId.email }} </div>
                    <div class="w-5/12 flex justify-center my-2"> {{ cart.status }} </div>
                    <div class="w-2/12 flex justify-center items-center my-2 pr-12">
                        <button
                            v-if="cart.status === 'paid'"
                            @click.prevent="processOrder(cart._id)"
                            class="flex justify-center mt-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white p-2 border border-green-500 hover:border-transparent rounded">
                            PROCESS
                        </button>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <router-view />
    </div>
</template>

<script>
export default {
    name: 'orderconfirm',
    props: ['adminCart'],
    methods: {
        getAdminCart() {
            this.$emit('getAdminCart')
        },
        processOrder(id) {
            this.$emit('processOrder', id)
        }
    },
    mounted: function() {
        this.$nextTick(() => {
            this.getAdminCart()
        })
    }
}
</script>

<style>

</style>