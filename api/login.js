
// 身份验证
export const login = (ajax,data) => {
	return ajax.request({
		method: 'post',
		url: '/api/users/login',
		data
	})
}

export const register = (ajax, data) => {
	return ajax.request({
		method: 'post',
		url: '/api/users',
		data
	})
}

export const getUser = (ajax) => {
	return ajax.request({
		method: 'get',
		url: '/api/user'
	})
}
export const updateUser = (ajax, data) => {
	return ajax.request({
		method: 'put',
		url: '/api/user',
		data
	})
}
