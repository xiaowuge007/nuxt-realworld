export const getTags = (ajax) => {
	return ajax.request({
		method: 'get',
		url: '/api/tags'
	})
}
