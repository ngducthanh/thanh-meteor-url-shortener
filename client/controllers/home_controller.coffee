@HomeController = RouteController.extend
  waitOn: ->
    Meteor.subscribe 'publicUrlList'
  data: ->
    urlList: ->
      UrlList.find()