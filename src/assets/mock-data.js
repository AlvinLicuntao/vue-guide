let Mock = require('mockjs')
Mock.Random.extend({
  between: function (date1, date2, format) {
    var min = new Date(date1)
    var max = new Date(date2)
    format = format || 'HH:mm:ss'
    var date = new Date(Math.random() * (max.getTime() - min.getTime()) + min.getTime())
    return this._formatDate(date, format)
  },
  replace: function (input) {
    return input.toString().replace(' ', '_')
  }
})
Mock.setup({
  timeout: 200
})
const users = Mock.mock({
  'data|20': [{
    'id|+1': 1,
    'name': '@name',
    'loginname': '@replace(@name)',
    'avatar_url': '@image(200x200, @loginname)',
    'email': '@lower(@loginname)@google.com'
  }]
}).data

let ids = users.map(item => item.id)

const articles = Mock.mock({
  'data|20': [{
    'id|+1': 1,
    'tab|1': ['share', 'job', 'ask', 'good'],
    'content': '@paragraph(10,50)',
    'title': '@title(10,50)',
    'good|3-1': false,
    'top|4-1': false,
    'reply_count|0-1000': 1,
    'visit_count': '@natural(@reply_count, 2000)',
    'create_at': '@datetime',
    'last_reply_at': '@between(@create_at, @now, yyyy-MM-dd HH:mm:ss)',
    'author|1': users,
    'replies|0-20': [{
      'author|1': users,
      'content': '@paragraph(5,20)',
      'create_at': '@datetime',
      'reply_id': null,
      'is_uped|3-1': false,
      'ups': function () {
        if (this.is_uped) {
          return Mock.Random.shuffle(ids).slice(0, Mock.Random.natural(1, 100))
        } else { return [] }
      }
    }]
  }]
}).data
Mock.mock('/articles', {
  'data': articles
})
Mock.mock('/users', {
  'data': users
})
Mock.mock(/^\/article\/\d+/, function (option) {
  return {data: articles.find(function (item) { return item.id === Number((option.url.match(/\d+/) || 0).toString()) })}
})
Mock.mock(/^\/user\/\d+/, function (option) {
  return {data: users.find(function (item) { return item.id === Number((option.url.match(/\d+/) || 0).toString()) })}
})
export default {
  users: users
}
