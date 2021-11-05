<template>

  <layout>
    <div class="auth-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">{{$route.name === 'register'? 'Sign up': 'Sign In'}}</h1>
            <p class="text-xs-center" v-if="$route.name === 'register'">
              <nuxt-link to="/login">Have an account?</nuxt-link>
            </p>

            <ul class="error-messages">
              <li v-for="(errs, name) in errors" :key="name">
                <div v-for="err in errs" :key="err">{{name}} {{err}}</div>
              </li>
            </ul>

            <form ref="form" onsubmit="return false">
              <fieldset class="form-group" v-if="$route.name === 'register'">
                <input required v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <input required  v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
              </fieldset>
              <fieldset class="form-group">
                <input required  min="6" v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click="submit">
                Sign up
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </layout>
</template>

<script>
  import { login , register } from '../api/login'
  import { mapMutations} from 'vuex'
  const cookie = process.client? require('js-cookie'): undefined
	export default {
		name: "login",
    data() {
			return {
				user: {
					username: '',
          email: '',
					password: ''
        },
        errors: {}
			}
    },
    methods:{
			...mapMutations(['updateUser', 'updateToken']),
			async submit() {
				if(!this.$refs.form.checkValidity()){
					return;
        }
        if(this.$route.name === 'register'){
					try {
						const { data } = await register(this.$axios, {user: this.user})
            cookie.set('jwtToken', data.user.token)
            this.updateToken(data.user.token)
            this.updateUser(data.user)
            this.$router.push('/')
					} catch (err) {
						this.errors = err.errors
					}

        }
				if(this.$route.name === 'login'){
					try {
						const { data } = await login(this.$axios, {user: this.user})
						cookie.set('jwtToken', data.user.token)
						this.updateToken(data.user.token)
						this.updateUser(data.user)
						this.$router.push('/')
					} catch (err) {
						this.errors = err.errors
					}
				}
      }
    }
	}
</script>

<style scoped>

</style>
