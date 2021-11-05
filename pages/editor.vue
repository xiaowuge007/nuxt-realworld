<template>
  <layout>

    <div class="editor-page">
      <div class="container page">
        <div class="row">

          <div class="col-md-10 offset-md-1 col-xs-12">
            <form ref="form">
              <fieldset>
                <fieldset class="form-group">
                  <input required v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
                </fieldset>
                <fieldset class="form-group">
                  <input required v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
                </fieldset>
                <fieldset required class="form-group">
                            <textarea v-model="article.body" class="form-control" rows="8"
                                      placeholder="Write your article (in markdown)"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input required v-model="tags" type="text" class="form-control" placeholder="Enter tags">
                  <div class="tag-list"></div>
                </fieldset>
                <button @click="publish" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
  </layout>
</template>

<script>
  import { addArticles, getArticle } from "../api/articles";

	export default {
		async asyncData({params, $axios}) {
      if(params.slug){
        const article = await getArticle($axios, params.slug)
        const tags = article.data.article.tagList.join(' ');
        return {
					article: article.data.article,
					tags
        }
      }
    },
		name: "editor",
    data() {
      return {
				tags: '',
				"article": {
					"title": "",
					"description": "",
					"body": "",
					"tagList": []
				}
      }
    },
    methods: {
			async publish() {
        if(!this.$refs.form.checkValidity()){
        	return
        }
        if(this.tags){
        	this.article.tagList = this.tags.split(' ').filter(item => !!item.trim())
        }
        const {title, description, body, tagList} = this.article
        const res = await addArticles(this.$axios, {
					article: {title, description, body, tagList}
        })
        if(res.data.article){
        	this.$router.push({
            path: '/article/' + res.data.article.slug
          })
        }
      }
    }
	}
</script>

<style scoped>

</style>
