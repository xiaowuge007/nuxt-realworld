/*
* 注册ajax
* */
import Vue from 'vue'
import axios from 'axios'

const createAjax = (store) => {
	const ajax = axios.create({
		baseURL: 'https://api.realworld.io'
	})

	ajax.interceptors.request.use(

		function (request) {
			if(store.state.token){
				request.headers.Authorization = `Token ${store.state.token}`
			}
			return request
		}
	)
	ajax.interceptors.response.use(
		function (response) {
			return response
		},
		function (err) {
			if(err.response){
				return Promise.reject(err.response.data)
			}
			return Promise.reject(err)
		}
	)

	return ajax
}

export default (context, inject) => {
	const { store } =  context
	const ajax = createAjax(store)
	context.$axios = ajax
	Vue.prototype.$axios = ajax
}

