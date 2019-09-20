import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import Cart from './views/Cart.vue'
import Profile from './views/Profile.vue'
import ProductDetail from './views/ProductDetail.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import AddToCart from './views/AddToCart.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      children: [{
        path: '/products/:id',
        name: 'productdetail',
        component: ProductDetail
      }]
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/addtocart',
      name: 'addtocart',
      component: AddToCart
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
