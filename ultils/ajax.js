import axios from 'axios'
// axios.defaults.withCredentials = true;
const ajax = axios.create({
	baseURL: 'https://conduit.productionready.io'
})

ajax.interceptors.request.use(
	function (request) {
		console.log(request)
		return request
	}
)

ajax.interceptors.response.use(
	function (response) {
		return response.data
	},
	function (err) {
		if(err.response){
			return Promise.reject(err.response.data)
		}
		return Promise.reject(err)
	}
)

export default ajax;
