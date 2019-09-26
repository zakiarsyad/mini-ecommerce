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
import Checkout from './views/Checkout.vue'
import AdminPage from './views/AdminPage.vue'
import AddProduct from './views/AddProduct.vue'
import EditProduct from './views/EditProduct.vue'
import History from './views/History.vue'
import OrderConfirm from './views/OrderConfirm.vue'

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
      path: '/admin',
      name: 'adminpage',
      component: AdminPage,
      children: [{
        path: 'addproduct',
        name: 'addproduct',
        component: AddProduct
      }, {
        path: 'editproduct',
        name: 'editproduct',
        component: EditProduct
      }
      ]
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      children: [{
        path: ':id',
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
      component: Cart,
      children: [{
        path: 'checkout',
        name: 'checkout',
        component: Checkout
      }]
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
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/orderconfirm',
      name: 'orderconfirm',
      component: OrderConfirm
    }
  ]
})
