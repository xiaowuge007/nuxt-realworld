<template>
  <layout>
    <div class="ng-scope">
      <div class="profile-page ng-scope">

        <!-- User's basic info & action buttons -->
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

        <!-- Container where User's posts & favs are list w/ toggle tabs -->
        <div class="container">
          <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">

              <!-- Tabs for switching between author articles & favorites -->
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">

                  <li class="nav-item">
                    <a class="nav-link active" href="#/@tim2">
                      My Articles
                    </a>
                  </li>

                  <li class="nav-item">
                    <a class="nav-link" href="#/@tim2/favorites">
                      Favorited Articles
                    </a>
                  </li>

                </ul>
              </div>

              <!-- View where profile-articles renders to -->
              <!-- uiView:  -->


            </div>

            <!-- End row & container divs -->
          </div>
        </div>

      </div>
    </div>
  </layout>
</template>

<script>
  import {mapState} from 'vuex'
	export default {
		name: "mine",
    computed:{
			...mapState(['user'])
    }
	}
</script>

<style scoped>

</style>
