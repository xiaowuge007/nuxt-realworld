export const getArticles = (ajax, params) => {
	return ajax.request({
		method: 'get',
		url: '/api/articles',
		params
	})
}

export const addArticles = (ajax, data) => {
	return ajax.request({
		method: 'post',
		url: '/api/articles',
		data
	})
}
export const getArticle = (ajax, slug) => {
	return ajax.request({
		method: 'get',
		url: '/api/articles/' + slug
	})
}

export const favoriteArticle = (ajax, slug) => {
	return ajax.request({
		method: 'post',
		url: '/api/articles/'+slug+'/favorite'
	})
}

export const cancelArticle = (ajax, slug) => {
	return ajax.request({
		method: 'delete',
		url: '/api/articles/'+slug+'/favorite'
	})
}
export const getFeedArticle = (ajax, params) => {
	return ajax.request({
		method: 'get',
		url: '/api/articles/feed',
		params
	})
}

