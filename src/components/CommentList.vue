<template>
  <ul class="comment-list">
    <slot v-for="comment in comments" :key="comment.id" v-bind:comment="comment">
      <comment-item :comment="comment"></comment-item>
    </slot>
  </ul>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'
export default {
  components: {
    CommentItem
  }
}
</script>

<style scoped>

</style>
