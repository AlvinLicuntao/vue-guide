import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '@/components/ArticleList.vue'
import ArticleView from '@/components/ArticleView.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    }, {
      path: '/article/:id',
      name: 'ArticleView',
      component: ArticleView,
      props: (route) => ({ articleId: route.params.id })
    }, {
      path: '**',
      redirect: '/'
    }
  ]
})
