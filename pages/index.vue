<template>
  <layout>

    <div class="home-page">

      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">

          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item" v-if="token">
                  <nuxt-link :class="{active: $route.query.type === 'your'}" class="nav-link" exact :to="{
                    path: '/',
                    query: {type: 'your'}
                  }">Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link :class="{active: !$route.query.type && !tag }" class="nav-link" exact :to="{
                    path: '/'
                  }">Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link :class="{active: !!tag}" class="nav-link" exact :to="{
                    path: '/',
                    query: {tag: tag }
                  }">{{tag}}</nuxt-link>
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
                <button class="btn btn-outline-primary btn-sm pull-xs-right" @click="favorite(article.slug,article.favorited)">
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

          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <nuxt-link
                        v-for="tag in tags" :key="tag"
                        class="tag-pill tag-default"
                        :to="{
                          path: '/',
                          query: {tag: tag}
                        }"
                >{{tag}}</nuxt-link>
              </div>
            </div>
          </div>

        </div>
        <div class="article-preview" v-show="!articlesCount">
          No articles are here... yet.
        </div>
        <template v-if="articlesCount">
          <pagination :page-count="articlesCount" :page-size="pageSize" :current-page="page"></pagination>
        </template>
      </div>

    </div>
  </layout>
</template>

<script>
  import { mapState } from 'vuex'
  import { getArticles, favoriteArticle, cancelArticle, getFeedArticle } from '../api/articles'
  import { getTags } from "../api/tags";
  import  pagination  from "../components/pagination";

	export default {
  	async asyncData({ $axios, query }) {
  		let articleFn;
			query = JSON.parse(JSON.stringify(query))
			query.limit = query.limit || 2;
			query.offset = query.page? query.limit * (parseInt(query.page)-1) : 0
      console.log(query)
  		if(query.type){
				articleFn = getFeedArticle($axios, query)
      }else {
				articleFn = getArticles($axios, query)
      }
  		const [articles, tags] = await Promise.all([
				articleFn,
				getTags($axios)
      ])
      console.log(articles.data.articlesCount)
			return {
				articles: articles.data.articles,
				tags: tags.data.tags,
        tag: query.tag || '',
				articlesCount: articles.data.articlesCount,
        pageSize: query.limit,
        page: query.page ? parseInt(query.page) : 1
      }
    },
		watchQuery: ['type', 'tag','page'],
		name: "index",
    components: {
			pagination
    },
    data() {
  		return {
  			type: 'global',
				pageSize: 2
      }
    },
    computed:{
			...mapState(['user','name','token'])
    },
    mounted() {
      //console.log(this.user)
		},
    methods:{
			async favorite(slug, favorited) {
				if(favorited){
					await cancelArticle(this.$axios, slug)
        }else {
					await favoriteArticle(this.$axios, slug)
        }
        const articles = await getArticles(this.$axios)
        this.articles = articles.data.articles
      }
    }
	}
</script>

<style scoped>

</style>

