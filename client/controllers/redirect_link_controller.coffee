@RedirectLinkController = RouteController.extend
  waitOn: ->
    Meteor.subscribe 'privateUrlList', @params.shortUrl
  data: ->
    UrlList.findOne
      shortUrl: @params.shortUrl