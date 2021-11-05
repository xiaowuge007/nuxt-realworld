<template>
  <ul class="pagination">

    <li class="page-item">
      <a :disabled="currentPage <= 1" @click="change(currentPage-1)" class="page-link ng-binding" href="javascript:void(0)"><</a>
    </li>
    <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
    <li class="page-item"
        :class="{active: currentPage === index+1 }"
        v-for="(page, index) in pages" :key="index"
         >

      <a @click="change(index + 1)" class="page-link" href="javascript:void(0)">{{index+1}}</a>

    </li><!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
    <li class="page-item">
      <a :disabled="currentPage >= pages.length" @click="change(currentPage + 1)" class="page-link" href="javascript:void(0)">></a>
    </li>
  </ul>
</template>

<script>
	export default {
		name: "pagination",
    props:{
			pageCount: {
				type: Number,
        default: 0
      },
      currentPage:  {
				type: Number,
				default: 1
      },
      pageSize: {
				type: Number,
				default: 2
      }
    },
    computed: {
			pages() {
				const num = Math.ceil(this.pageCount/this.pageSize)
        return new Array(num)
      }
    },
    methods:{
			change(num) {
				if(num < 1 || num > this.pages.length){
					return
        }
				let {query, path } = this.$route
				query = JSON.parse(JSON.stringify(query))
        query.page = num;
        this.$router.push({
          path: path,
					query
        })
      }
    }
	}
</script>

<style >
  .page-item .page-link[disabled] {
    cursor: not-allowed;
  }
</style>
