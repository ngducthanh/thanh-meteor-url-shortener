Meteor.publish 'publicUrlList', ->
  UrlList.find
    isPrivate: false

Meteor.publish 'privateUrlList', (shortUrl)->
  check shortUrl, Match.Optional(String)
  if @userId
    if shortUrl
      UrlList.find
        author: @userId
        shortUrl: shortUrl
    else
      UrlList.find
        author: @userId