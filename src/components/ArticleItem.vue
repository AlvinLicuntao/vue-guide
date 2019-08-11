<template>
  <li class="article-item" :class="{'color-hot': article.top}" @click="select">
      <span class="tag top" v-if="article.top">置顶</span>
      <span class="tag"  :class="article.tab" v-else>{{article.tab|tab}}</span>
      <a :href="'#/article/'+article.id" :title="article.title" class="title">{{article.title}}</a>
      <span class="author-name">作者：<a :href="'#/user/'+article.author.id">{{article.author.name}}</a></span>
      <span class="visit-count"><span class="reply" title="回复数" :style="replyStyle">{{article.reply_count}}</span>/<span class="visited" title="访问数">{{article.visit_count}}</span></span>
    </li>
</template>
<script>
export default {
  name: 'article-item',
  props: {
    article: {
      type: Object,
      default () {
        return {
          title: '',
          content: '',
          author: {},
          good: false,
          top: false
        }
      },
      validator (obj) {
        return obj.title && obj.content
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    replyStyle () {
      return {
        'font-size': this.article.reply_count >= 500 ? '16px' : (this.article.reply_count >= 100 ? '14px' : ''),
        'color': 'rgb(' + Math.floor(this.article.reply_count / 1000 * 255) + ', 99,99)'
      }
    }
  },
  filters: {
    tab: function (input) {
      return {'share': '分享', 'job': '招聘', 'ask': '问答', 'good': '精选'}[input]
    }
  },
  methods: {
    select (e) {
      this.$emit('selected', this.article, e)
    }
  }
}
</script>

<style scoped>

</style>
