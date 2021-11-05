const path = require('path')
module.exports = {
	server: {
		port: 4000 // default: 3000
	},
	router: {
		linkActiveClass: 'active',
		extendRoutes(routes, resolve) {
			routes.splice(0,routes.length);
			routes.push(
				{
					name: 'Home',
					path: '/',
					component: resolve(__dirname, 'pages/index.vue')
				},
				{
					name: 'register',
					path: '/register',
					component: resolve(__dirname, 'pages/login.vue')
				},
				{
					name: 'login',
					path: '/login',
					component: resolve(__dirname, 'pages/login.vue')
				},
				{
					name: 'editor',
					path: '/editor/:slug?',
					component: resolve(__dirname, 'pages/editor.vue')
				},
				{
					name: 'settings',
					path: '/settings',
					component: resolve(__dirname, 'pages/settings.vue')
				},
				{
					name: 'article',
					path: '/article/:slug',
					component: resolve(__dirname, 'pages/article.vue')
				},
				{
					name: 'profile',
					path: '/profile',
					component: resolve(__dirname, 'pages/profile.vue')
				},
				{
					name: 'profileFavorite',
					path: '/profile/favorite',
					component: resolve(__dirname, 'pages/profile.vue')
				},
				{
					name: 'flex',
					path: '/flex',
					component: resolve(__dirname, 'pages/flex.vue')
				},
				{
					name: 'mine',
					path: '/mine/:name',
					component: resolve(__dirname, 'pages/mine.vue')
				}
			)
		}
	},
	plugins:[
		'~/plugins/layout.js',
		'~/plugins/ajax.js'
	]
}
