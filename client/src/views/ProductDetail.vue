<template>
    <div>
        <a href="#" id="blur" @click.prevent="backToProducts">
        </a>
        <div id="detail" class="shadow bg-white fixed z-20 rounded">
            <div class="w-10/12 mx-auto my-12 flex">
                <div class="w-6/12">
                    <div class="product overflow-hidden shadow-lg">
                        <img class="w-full" src="https://cdn-images-1.medium.com/max/1200/1*yeAO-nwsAqnzr7k-zoDkoQ.png" alt="Sunset in the mountains">
                    </div>
                </div>
                <div class="w-1/12"></div>
                <div class="w-5/12">
                    {{ product }}
                    harusnya muncul
                    <h1 class="h-20 text-5xl font-bold">Board Short</h1>
                    <div class="qty w-full rounded py-2 mt-2 flex justify-between border">
                        <button @click.prevent="minus" class="focus:outline-none"><i class="fas fa-minus px-3"></i></button>
                        <div>{{ amount }}</div>
                        <button @click.prevent="add" class="focus:outline-none"><i class="fas fa-plus px-3"></i></button>
                    </div>
                    <button @click.prevent="addToCart" class="w-full rounded py-2 mt-2 add-to-cart focus:outline-none">Add to cart</button>
                    <div class="flex mt-8">
                        <p class="w-3/12 ">Price</p>
                        <p class="w-1/12">:</p>
                        <p class="w-8/12">$120</p>
                    </div>
                    <div class="flex">
                        <p class="w-3/12">Description</p>
                        <p class="w-1/12">:</p>
                        <p class="w-8/12">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productdetail',
  props: ['product'],
  data () {
    return {
      amount: 1
    }
  },
  methods: {
    add () {
      this.amount += 1
    },
    minus () {
      if (this.amount > 0) this.amount -= 1
    },
    backToProducts () {
      this.$router.push('/products')
    },
    addToCart () {
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>

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
