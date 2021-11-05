<template>
<layout>

  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>

        <div class="article-meta">
          <nuxt-link to="/profile">
            <img :src="article.author.image"/>
          </nuxt-link>
          <div class="info">
            <nuxt-link class="author" to="/profile">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt}}</span>
          </div>
          <span class="ng-scope">
              <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{
                path: '/editor/'+ article.slug
              }">
                <i class="ion-edit"></i> Edit Article
              </nuxt-link>

              <button class="btn btn-outline-danger btn-sm">
                <i class="ion-trash-a"></i> Delete Article
              </button>
            </span>
        </div>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
        </div>
      </div>

      <hr/>

      <div class="article-actions">
        <div class="article-meta">
          <nuxt-link to="/profile">
            <img :src="article.author.image"/>
          </nuxt-link>
          <div class="info">
            <nuxt-link class="author" to="/profile">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt}}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow Eric Simons
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
              <i class="ion-edit"></i>
              <i class="ion-trash-a"></i>
            </span>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</layout>
</template>

<script>
  import { getArticle } from "../api/articles";

	export default {
		async asyncData({params, $axios}) {
      console.log(params)
      const res = await getArticle($axios, params.slug)
      return {
      	article: res.data.article
      }
    },
		middleware: 'auth',
		name: "articlePage"
	}
</script>

<style scoped>

</style>
