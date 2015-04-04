Template.redirectLink.rendered = ->
  redirectUrlExists = (_id)->
    !!UrlList.find
                _id: _id
              .fetch().length
  
  if @data and redirectUrlExists @data._id
    redirectLink = @data.longUrl
    Meteor.setInterval ->
      self = this
      self.location = redirectLink
    , 2000
  else
    Router.go '/notfound'
