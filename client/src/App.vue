<template>
    <div>
        <navbar
            :isLogin="isLogin"
            :user="user"
            @logout="logout"
            @getProducts="getProducts"/>
        <div class="h-16"></div>
        <loader v-if="loading"></loader>
        <router-view
            :isLogin="isLogin"
            :user="user"
            :products="products"
            @login="login"
            @register="register"/>
        <pageFooter v-if="isLogin" />
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
          isLogin: true,
          user: {
              email: '',
              password: ''
          },
          loading: false,
          alert: {
              status: '',
              msgs: []
          },
          products: []
      }
    },
    methods: {
        login (user) {
            this.loading = true

            axios({
                method: `post`,
                url: `${this.server}/users/login`,
                data: {
                   email: this.user.email,
                    password: this.user.password
                }
            })
                .then(({ data }) => {
                    this.loading = false
                    this.isLogin = true
                    this.$toast.open('Login success')
                    this.$router.push('/')
                    localStorage.setItem('token', data.token)
                })
                .catch(err => {
                    this.loading = false
                    this.$toast.error(err.response.data)
                })
        },
        register (user) {
            this.loading = true

            axios({
                method: `post`,
                url: `${this.server}/users/register`,
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(({ data }) => {
                    this.loading = false
                    localStorage.setItem('token', data.token)
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
          this.isLogin = false
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
      }
  },
  created: function () {
      if (localStorage.getItem('token')) {
          // this.$router.push('/')
          this.isLogin = true
          // this.getProducts()
      }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

* {
  font-family: Roboto;
}

</style>
