Router.configure 
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  notFoundTemplate: 'notFound'
Router.route '/',
  name: 'home'
  subscriptions: ->
    Meteor.subscribe 'urlList'
Router.route '/notfound',
  name: 'notFound'
Router.route '/:shortUrl', 
  name: 'redirectLink'
  waitOn: ->
    Meteor.subscribe 'urlRedirect', @params.shortUrl
  data: ->
    UrlList.findOne
      shortUrl: @params.shortUrl
requireLogin = ->
  if not Meteor.user()
    @render 'accessDenied'
  else
    @next()
Router.route '/urlEdit/:shortUrl',
  name: 'urlEdit'
  waitOn: ->
    Meteor.subscribe 'urlList', @params.shortUrl
  data: ->
    UrlList.findOne
      shortUrl: @params.shortUrl
Router.onBeforeAction requireLogin, 
  only: 'urlEdit'
