Router.configure 
  layoutTemplate: 'layout'
  loadingTemplate: 'loading'
  notFoundTemplate: 'notFound'

Router.route '/',
  name: 'home'

Router.route '/url/private',
  name: 'private'

Router.route '/url/notfound',
  name: 'notFound'
      
Router.route '/url/edit/:shortUrl',
  name: 'urlEdit'
  
Router.route '/redirect/:shortUrl', 
  name: 'redirectLink'
      
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