<template>
  <ul class="article-list">
    <article-item v-for="article in articles" :key="article.id" :article="article" @selected="handlerSelected" :class="{selected: selected&&selected.id===article.id}"></article-item>
  </ul>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      selected: null
    }
  },
  methods: {
    handlerSelected (article) {
      this.selected = article
    }
  },
  created () {
    this.$http.get('/articles').then(res => {
      this.articles = res
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>

</style>
