<template>
  <div v-if="article" class="article-view">
    <div class="main-content">
      <h2>{{article.title}}</h2>
      <p>作者：{{article.author.name}} 创建于：{{article.create_at}}</p>
      <hr />
      <article v-html="article.content"></article>
    </div>
    <hr />
    <ul class="reply-list">
      <li class="reply-item" v-for="(reply, i) in article.replies" :key="reply.id">
        <p class="reply-info">
          <a :href="'#/author/'+reply.author.id">
            <em>{{reply.author.name}}</em>
          </a>
          <em>{{reply.create_at}}</em>
          <button @click="changeOrder(i, true)">Up</button>
          <button @click="changeOrder(i, false)">Down</button>
          <span style="float:right;">
            <i
              class="fa"
              :class="{'fa-thumbs-up': reply.is_uped, 'fa-thumbs-o-up': !reply.is_uped}"
              aria-hidden="true"
              @click="thumb(i, !reply.is_uped)"
            ></i>
            <b>{{reply.ups.length}}</b>
          </span>
        </p>
        <p>{{reply.content}}</p>
      </li>
      <li class="reply">
        <br>
          <p>{{reply.author.name}}</p>
          <label>
            <textarea v-model="reply.content" rows="10"></textarea>
          </label>
          <p class="submit">
            <button @click="addreply">发表</button>
          </p>
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
      user: null,
      reply: {
        author: {},
        content: ''
      }
    }
  },
  created () {
    this.$http
      .get('/article/' + this.articleId)
      .then(res => {
        this.article = res
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
    this.$http.get('/user/1').then(res => {
      this.user = res
      this.reply.author = res
    })
    window.vm = this
  },
  methods: {
    thumb (index, isUped) {
      this.article.replies[index].is_uped = isUped
      if (isUped) {
        this.article.replies[index].ups.push(this.user.id)
      } else {
        this.article.replies[index].ups = this.article.replies[index].ups.filter(item => { return item !== this.user.id })
      }
    },
    changeOrder (i, order) {
      if (order && i > 0) {
        let temp = this.article.replies[i - 1]
        this.article.replies[i - 1] = this.article.replies[i]
        this.article.replies[i] = temp
      } else if (!order && i < this.article.replies.length - 1) {
        let temp = this.article.replies[i + 1]
        this.article.replies[i + 1] = this.article.replies[i]
        this.article.replies[i] = temp
      }
    },
    addreply () {
      this.article.replies.push({...this.reply, create_at: new Date(), ups: [], is_uped: false})
      this.reply = {
        author: this.user,
        content: ''
      }
    }
  }
}
</script>

<style scoped>
.article-view {
  padding: 20px 10%;
}
.reply-list {
  list-style: none;
}
.reply textarea{
  display: block;
  width: 100%;
}
.reply p.submit{
  text-align: right;
  margin-bottom: 20px;
}
</style>
