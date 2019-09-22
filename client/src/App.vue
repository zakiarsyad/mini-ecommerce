<template>
    <div>
        <div id="app">
            <navbar
                :isLogin="isLogin"
                :isAdmin="isAdmin"
                :user="user"
                @logout="logout"
                @getProducts="getProducts"
                @toLoginPage="toLoginPage"
                class="z-20"/>
            <div class="h-16"></div>
            <loader v-if="loading"></loader>
            <router-view
                :isLogin="isLogin"
                :user="user"
                :products="products"
                :cart="cart"
                :totalPrice="totalPrice"
                :allCart="allCart"
                :adminCart="adminCart"
                @login="login"
                @register="register"
                @addToCart="addToCart"
                @getCart="getCart"
                @deleteFromCart="deleteFromCart"
                @checkout="checkout"
                @getAllCart="getAllCart"
                @deleteCart="deleteCart"
                @getAdminCart="getAdminCart"
                @processOrder="processOrder"
                @payCart="payCart"/>
        </div>
        <pageFooter 
            id="pageFooter"/>
    </div>
</template>

<script>
import axios from 'axios'
import navbar from '@/components/Navbar.vue'
import pageFooter from '@/components/PageFooter.vue'
import loader from '@/components/Loader.vue'

export default {
    name: 'App',
    components: {
        navbar,
        pageFooter,
        loader
    },
    data () {
    return {
        server: `http://localhost:3000`,
        isLogin: false,
        isAdmin: false, 
        user: {
            email: '',
            password: '',
            role: ''
        },
        loading: false,
        alert: {
            status: '',
            msgs: []
        },
        products: [],
        cart: null,
        totalPrice: 0,
        allCart: [],
        adminCart: []
    }
    },
    methods: {
        login (user) {
            this.loading = true
            let token

            axios({
                method: `post`,
                url: `${this.server}/users/login`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(({ data }) => {
                    token = data.token
                    
                    if( data.role === 'admin' ) {
                        this.isAdmin = true
                        this.loading = false
                        this.isLogin = true
                        localStorage.setItem('token', token)
                        this.$router.push('/admin')
                    } else {
                        return axios({
                            method: `post`,
                            url: `${this.server}/carts`,
                            headers: {
                                token: data.token
                            }
                        })
                    }
                })
                .then(({ data }) => {
                    this.loading = false
                    this.isLogin = true
                    this.$toast.open('Login success')
                    this.$router.push('/')
                    localStorage.setItem('token', token)
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data.errors)
                })
        },
        register (user) {
            this.loading = true
            let token

            axios({
                method: `post`,
                url: `${this.server}/users/register`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(({ data }) => {
                    token = data.token

                    return axios({
                        method: `post`,
                        url: `${this.server}/carts`,
                        headers: {
                            token: data.token
                        }
                    })
                })
                .then(({ data }) => {
                    localStorage.setItem('token', token)
                    this.loading = false
                    this.isLogin = true
                    this.$router.push('/')
                    this.$toast.open('Registration success')
                })
                .catch(err => {
                    this.loading = false
                    for (let i = 0; i < err.response.data.errors.length; i++) {
                        this.$toast.error(err.response.data.errors[i])
                    }
                })
        },
        logout () {
            this.user.email = ''
            this.user.password = ''
            this.user.role = ''
            this.isLogin = false
            this.isAdmin = false
            localStorage.removeItem('token')
            this.$router.push('/login')
            this.$toast.open('Byee. . .')
        },
        getProducts() {
            this.loading = true
            
            axios({
                method: `get`,
                url: `${this.server}/products`
            })
                .then(({ data }) => {
                    this.loading = false
                    this.products = data

                    this.$router.push('/products')
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        addToCart(amount, selectedProduct) {
            this.loading = true

            axios({
                method: `post`,
                url: `${this.server}/carts/product/${selectedProduct._id}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    qty: amount
                }
            })
                .then(({ data }) => {
                    this.loading = false
                    this.$toast.open(`Added ${amount} of ${selectedProduct.name} to your cart`)
                    this.$router.push('/products')
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        getCart() {
            this.loading = true

            axios({
                method: `get`,
                url: `${this.server}/carts/unpaid`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.loading = false

                    this.totalPrice = this.getTotalPrice(data.items)
                    this.cart = data
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        getTotalPrice(items) {
            let totalPrice = 0

            items.forEach(item => {
                totalPrice += (item.productId.price * item.qty)
            })

            return totalPrice
        },
        deleteFromCart(id) {
            this.loading = true

            axios({
                method: `delete`,
                url: `${this.server}/carts/product/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then(({ data }) => {
                    this.$toast.open(`Success delete ${data.deletedProduct} from your cart`)
                    this.loading = false
                    this.$nextTick(() => {
                        this.getCart()
                    })
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        toLoginPage() {
            this.$router.push('/login')
        },
        checkToken() {
            const token = localStorage.getItem('token')

            axios({
                method: `post`,
                url: `${this.server}/users/checkToken`,
                headers: {
                    token: token
                }
            })
                .then(({ data }) => {
                    if (data.isAdmin === true) {
                        this.isLogin = true
                        this.isAdmin = true
                        this.$router.push('/admin')
                    } else {
                        this.isLogin = true
                        this.$router.push('/')
                    }
                })
                .catch(err => {
                    localStorage.removeItem('token')
                    this.$router.push('/login')
                })
        },
        checkout(id) {
            this.loading = true
            const token = localStorage.getItem('token')
            
            axios({
                method: `patch`,
                url: `${this.server}/carts/${id}`,
                headers: {
                    token: token
                },
                data: {
                    status: 'confirmed'
                }
            })
                .then(({ data }) => {
                    return axios({
                        method: `post`,
                        url: `${this.server}/carts`,
                        headers: {
                            token: token
                        }
                    })
                })
                .then(() => {
                    this.loading = false
                    this.$router.push('/cart/checkout')
                })
                .catch(err => {
                    this.loading = false
                    this.$router.push('/cart')
                })
        },
        payCart(id) {
            this.loading = true
            const token = localStorage.getItem('token')
            
            axios({
                method: `patch`,
                url: `${this.server}/carts/${id}`,
                headers: {
                    token: token
                },
                data: {
                    status: 'paid'
                }
            })
                .then(() => {
                    this.loading = false
                    this.$toast.open('payment success')
                    this.$nextTick(() => {
                        this.getAllCart()
                    })
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        reduceStock(productId, qty) {
            const newStock = productId.stock - qty
            const token = localStorage.getItem('token')
            axios({
                method: `patch`,
                url: `${this.server}/products/${productId}/stock`,
                headers: {
                    token: token
                },
                data: {
                    stock: newStock
                }
            })

        },
        getAllCart() {
            const token = localStorage.getItem('token')
            this.loading = true

            axios({
                method: `get`,
                url: `${this.server}/carts/user`,
                headers: {
                    token: token
                },
            })
                .then(({ data }) => {
                    this.loading = false
                    this.allCart = data
                })
                .catch(err => {
                    this.loading = false
                    this.$router.push('/cart')
                })
        },
        deleteCart(id) {
            const token = localStorage.getItem('token')
            this.loading = true

            axios({
                method: `delete`,
                url: `${this.server}/carts/${id}`,
                headers: {
                    token: token
                },
            })
                .then(({ data }) => {
                    this.loading = false
                    this.$nextTick(() => {
                        this.getAllCart()
                    })
                })
                .catch(err => {
                    this.loading = false
                    this.$router.push('/cart')
                })
        },
        getAdminCart() {
            const token = localStorage.getItem('token')
            this.loading = true

            axios({
                method: `get`,
                url: `${this.server}/carts`,
                headers: {
                    token: token
                },
            })
                .then(({ data }) => {
                    this.loading = false
                    this.adminCart = data
                })
                .catch(err => {
                    this.loading = false
                })
        },
        processOrder(id) {
            this.loading = true
            const token = localStorage.getItem('token')
            
            axios({
                method: `patch`,
                url: `${this.server}/carts/${id}`,
                headers: {
                    token: token
                },
                data: {
                    status: 'shipped'
                }
            })
                .then(({ data }) => {
                    this.loading = false
                    this.$nextTick(() => {
                        this.getAdminCart()
                    })
                })
                .catch(err => {
                    this.loading = false
                    this.$router.push('/cart')
                })
        }
    },
    created: function () {
        if (localStorage.getItem('token')) {
            this.checkToken()
        } else {
            this.$router.push('/login')
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

* {
    font-family: Roboto;
}

#app {
    min-height: calc(100vh - 50px);
}

#pageFooter {
    height: 50px;
}

</style>
