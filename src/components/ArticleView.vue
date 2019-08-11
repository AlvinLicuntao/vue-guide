<template>
  <div v-if="article" class="article-view">
    <div class="main-content">
      <h2>{{article.title}}</h2>
      <p>作者：{{article.author.name}} 创建于：{{article.create_at}}</p>
      <hr/>
      <article v-html="article.content"></article>
    </div>
    <hr>
    <ul class="reply-list">
      <li class="reply-item" v-for="reply in article.replies" :key="reply.id">
        <p class="reply-info">
          <a :href="'#/author/'+reply.author.id"><em>{{reply.author.name}}</em></a>
          <em>{{reply.create_at}}</em>
          <span style="float:right;">
            <i class="fa" :class="{'fa-thumbs-up': reply.is_uped, 'fa-thumbs-o-up': !reply.is_uped}" aria-hidden="true"></i>
            <b>{{reply.ups.length}}</b>
          </span>
        </p>
        {{reply.content}}
      </li>
    </ul>
  </div>
</template>

<script>
import ArticleDisplay from '@/components/ArticleDisplay.vue'
export default {
  components: {
    ArticleDisplay
  },
  props: {
    articleId: String
  },
  data () {
    return {
      article: null,
      user: null
    }
  },
  created () {
    this.$http.get('/article/' + this.articleId).then(res => {
      this.article = res
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
    this.$http.get('/user/1').then(res => {
      this.user = res
    })
  }
}
</script>

<style scoped>
.article-view{
  padding: 20px 10%;
}
.reply-list{
  list-style: none;
}
</style>
