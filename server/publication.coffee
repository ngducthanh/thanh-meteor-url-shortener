Meteor.publish 'publicUrlList', ->
  UrlList.find
    isPrivate: false

Meteor.publish 'privateUrlList', (shortUrl)->
  check shortUrl, Match.Optional(String)
  if @userId
    UrlList.find
        author: @userId
  else
    @ready()