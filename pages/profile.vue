<template>
  <layout>

    <div class="profile-page">

      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">

              <img class="user-img" :src="user.image">
              <h4 class="ng-binding">{{user.username}}</h4>
              <p class="ng-binding">{{user.bio}}</p>
              <!--<div class="ng-isolate-scope ng-hide">
                <button class="btn btn-sm action-btn ng-binding btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp;
                  Follow tim2
                </button>
              </div>-->

              <nuxt-link to="/settings" class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-gear-a"></i> Edit Profile Settings
              </nuxt-link>

            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link :class="{active: $route.name === 'profile'}" class="nav-link" exact to="/profile">
                    My Articles
                  </nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link :class="{active: $route.name === 'profileFavorite'}"  class="nav-link" to="/profile/favorite">
                    Favorited Articles
                  </nuxt-link>
                </li>

              </ul>
            </div>

            <div class="article-preview" v-for="article in articles" :key="article.slug">
              <div class="article-meta">
                <nuxt-link to="/profile">
                  <img :src="article.author.image"/>
                </nuxt-link>
                <div class="info">
                  <nuxt-link class="author" to="/profile">
                    {{article.author.username}}
                  </nuxt-link>
                  <span class="date">{{article.createdAt}}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right"
                        @click="favorite(article.slug,article.favorited)">
                  <i class="ion-heart"></i> {{article.favoritesCount}}'
                </button>
              </div>
              <nuxt-link :to="{
                  path: '/article/' + article.slug
              }" class="preview-link">
                <h1>{{article.title}}</h1>
                <p>{{article.description}}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>

            <template v-if="articlesCount">
              <pagination :page-count="articlesCount" :page-size="pageSize" :current-page="page"></pagination>
            </template>
          </div>

        </div>
      </div>


    </div>
  </layout>
</template>

<script>
	import {mapState} from 'vuex'
	import {getArticles} from "../api/articles";
	import pagination from "../components/pagination";

	export default {
		async asyncData({$axios, query, store, route}) {
			query = JSON.parse(JSON.stringify(query))
			query.limit = query.limit || 2;
			query.offset = query.page ? query.limit * (parseInt(query.page) - 1) : 0
      if(route.name === 'profile'){
				query.author = store.state.user.username
      }else {
      	query.favorited = store.state.user.username
      }
			const articles = await getArticles($axios, query)
			return {
				articles: articles.data.articles,
				articlesCount: articles.data.articlesCount,
				pageSize: query.limit,
				page: query.page ? parseInt(query.page) : 1
			}
		},
		watchQuery: ['page'],
		components: {
			pagination
		},
		name: "profile",
		computed: {
			...mapState(['user'])
		}
	}
</script>

<style scoped>

</style>
