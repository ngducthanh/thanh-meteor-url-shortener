Meteor.publish 'publicUrlList', ->
  UrlList.find
    isPrivate: false

Meteor.publish 'privateUrlList', (shortUrl)->
  check shortUrl, Match.Optional(String)
  if @userId
    UrlList.find
        author: @userId
  else
    UrlList.find shortUrl: shortUrl,
      fields:
        author: 0
        longUrl: 0
        isPrivate: 0
        accessedUrlCount: 0