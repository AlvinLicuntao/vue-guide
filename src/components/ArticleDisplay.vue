<template>
  <div>
    <h2>{{article.title}}</h2>
    <p>作者：{{article.author.name}} 创建于：{{article.create_at}}</p>
    <hr/>
    <article v-html="article.content"></article>
    <hr>

  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default () {
        return {
          title: '',
          content: '',
          replies: [],
          author: {}
        }
      }
    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
