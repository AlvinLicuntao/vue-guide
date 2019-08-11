# vue-guide

> A Vue.js project for study

## 数据显示
#### Article List Display
- ArticleItem
  - title 引入数据动态绑定概念，模板的作用，通过console修改实力属性查看效果。在介绍响应式原理时回顾此处动态绑定
  - author 通过对已声明和未声明的属性、变量的动态绑定效果引入响应式原理，介绍getter/setter 以及Vue.set
  - tags 通过演示v-for :key作用,Vue的组件就地复用
  - good 引入v-if,讲述v-if判定前后对dom的处理，引申$el的作用以及操作。提升到mounted, created等生命周期
  - top 引入v-show，比较与v-if之间的差异，引申实现方式，提出:class :style绑定
  - content 引入v-html，讲解该指令的使用方法以及脚本注入的风险
  - 组件整合，抽取data属性内容到props, 并讲解 type, default, validate
- ArticleList
  - 使用抽出props属性的Article组件渲染列表
  - 衍生出selected, collapse，介绍$emit v-on/@
  - 回顾v-for :key :class :style等

#### Article Edit
- ArticleEdit
  - v-model
