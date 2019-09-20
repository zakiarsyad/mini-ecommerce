<template>
    <div class="w-10/12 mx-auto my-12">
        <h1 class="h-20 text-5xl font-bold text-center">Shopping Cart</h1>
        <hr>
        <div class="flex">
            <div class="w-6/12 flex justify-center my-3 font-bold text-xl">Items</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Amount</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Price</div>
            <div class="w-2/12 flex justify-center my-3 font-bold text-xl">Total</div>
        </div>
        <hr>
        <div class="flex">
            <div class="w-6/12 flex justify-center my-2">Board Short</div>
            <div class="w-2/12 flex justify-center my-2">2</div>
            <div class="w-2/12 flex justify-end my-2 pr-12">$ 25.000</div>
            <div class="w-2/12 flex justify-end my-2 pr-12">$ 50.000</div>
        </div>
        <hr>
        <div class="flex">
            <div class="w-6/12 flex justify-center my-2">Board Short</div>
            <div class="w-2/12 flex justify-center my-2">2</div>
            <div class="w-2/12 flex justify-end my-2 pr-12">$ 5.000</div>
            <div class="w-2/12 flex justify-end my-2 pr-12">$ 50.000</div>
        </div>
        <hr>
        <div class="flex">
            <div class="w-8/12 flex justify-center my-2"></div>
            <div class="w-2/12 flex justify-center my-2 font-bold text-lg">Total</div>
            <div class="w-2/12 flex justify-end my-2 pr-12 font-bold text-lg">$ 100.000</div>
        </div>
        <div class="flex">
          <div class="w-8/12"></div>
          <div class="w-4/12">
              <button @click.prevent="checkout" class="checkout w-full rounded py-2 mt-2 add-to-cart focus:outline-none mt-4">Checkout Now</button>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>

.checkout {
    background-color: #41B882;
    color: #efeded;
}

</style>
