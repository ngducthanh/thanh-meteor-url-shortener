@PrivateController = RouteController.extend
  template: 'home'
  waitOn: ->
    Meteor.subscribe 'privateUrlList'
  data: ->
    urlList: ->
      UrlList.find()