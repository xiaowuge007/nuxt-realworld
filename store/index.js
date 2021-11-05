const cookie = process.server? require('cookie'): undefined

export const state = () => ({
	user: {
	},
	token: ''
})

export const mutations = {
	updateUser(state, user) {
		state.user = user
	},
	updateToken(state, token){
		state.token = token
	}
}

export const getters = {
	getUser(state) {
		return state.user
	}
}

export const actions = {
	async nuxtServerInit({ commit, dispatch, state }, { req, $axios }) {
		const cookies = cookie.parse(req.headers.cookie);
		if (cookies.jwtToken) {
			//更新token
			commit('updateToken', cookies.jwtToken)
			const data = await $axios.request({
				method: 'get',
				url: '/api/user'
			})
			const user = JSON.parse(JSON.stringify(data.data.user))
			commit('updateUser', user)
		}
	}
}
