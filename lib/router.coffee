Router.configure 
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  notFoundTemplate: 'notFound'

Router.route '/',
  name: 'home'
  subscriptions: ->
    Meteor.subscribe 'urlList'
    
Router.route '/url/notFound',
  name: 'notFound'
      
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
  
Router.route '/redirect/:shortUrl', 
  name: 'redirectLink'
  waitOn: ->
    Meteor.subscribe 'urlRedirect', @params.shortUrl
  data: ->
    UrlList.findOne
      shortUrl: @params.shortUrl
      
serverSideRoutingFunction = ->
  redirectUrl= UrlList.findOne 
    shortUrl: @params.shortUrl

  if !redirectUrl
    location = Router.path 'notFound'
  else if redirectUrl.status is 'private'
    location = Router.path 'redirectLink', shortUrl: redirectUrl.shortUrl
  else
    UrlList.update shortUrl: redirectUrl.shortUrl,
      $inc:
        accessedUrlCount: 1
        
    location = redirectUrl.longUrl
    
  @response.writeHead 302, 'Location': location
  @response.end()  
      
Router.route '/:shortUrl', serverSideRoutingFunction, where: 'server' 


# Router.path 'route-name-here', dataContextObject

        
