Router.configure 
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  notFoundTemplate: 'notFound'

Router.route '/',
  name: 'home'
  waitOn: ->
    Meteor.subscribe 'publicUrlList'
  data: ->
    urlList: ->
      UrlList.find()

Router.route '/url/private',
  name: 'private'
  template: 'home'
  waitOn: ->
    Meteor.subscribe 'privateUrlList'
  data: ->
    urlList: ->
      UrlList.find()

Router.route '/url/notfound',
  name: 'notFound'
      
requireLogin = ->
  if not Meteor.userId()
    @render 'accessDenied'
  else
    @next()
    
Router.route '/url/edit/:shortUrl',
  name: 'urlEdit'
  waitOn: ->
    Meteor.subscribe 'privateUrlList', @params.shortUrl
  data: ->
    UrlList.findOne
      shortUrl: @params.shortUrl
      
Router.onBeforeAction requireLogin, 
  only: ['private', 'urlEdit', 'redirectLink']
  
Router.route '/redirect/:shortUrl', 
  name: 'redirectLink'
  waitOn: ->
    Meteor.subscribe 'privateUrlList', @params.shortUrl
  data: ->
    UrlList.findOne
      shortUrl: @params.shortUrl
      
serverSideRoutingFunction = ->
  redirectUrl= UrlList.findOne 
    shortUrl: @params.shortUrl

  if !redirectUrl
    location = Router.path 'notFound'
  else if redirectUrl.isPrivate is true
    UrlList.update shortUrl: redirectUrl.shortUrl,
      $inc:
        accessedUrlCount: 1
    location = Router.path 'redirectLink', shortUrl: redirectUrl.shortUrl
  else
    UrlList.update shortUrl: redirectUrl.shortUrl,
      $inc:
        accessedUrlCount: 1 
    location = redirectUrl.longUrl
    
  @response.writeHead 302, 'Location': location
  @response.end()  
      
Router.route '/:shortUrl', serverSideRoutingFunction, where: 'server' 