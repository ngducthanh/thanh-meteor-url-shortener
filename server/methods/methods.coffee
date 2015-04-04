Meteor.methods
  urlUpsert: (urlInput)->
    check urlInput,
      _id: String
      longUrl: String
      shortUrl: Match.Optional(String)
      isPrivate: Boolean

    shortUrlExists = (_id, newShortUrl)->
      !!UrlList.find
                  _id: $ne: _id
                  shortUrl: newShortUrl
                .fetch().length

    makeUniqueShortUrl = ->
      randomShortUrl = Random.id 5
      while shortUrlExists urlInput._id, randomShortUrl
        randomShortUrl = Random.id 5
      randomShortUrl

    Helpers.validateLongUrl urlInput.longUrl

    if urlInput.shortUrl
      Helpers.validateCustomUrl urlInput.shortUrl
      if shortUrlExists urlInput._id, urlInput.shortUrl
        throw new Meteor.Error 'shortUrlExists', 'Your short link has existed!'
    else
      urlInput.shortUrl = makeUniqueShortUrl()

    originalUrl = UrlList.findOne _id: urlInput._id

    if originalUrl and (@userId is null or @userId isnt originalUrl.author)
      throw new Meteor.Error 'rightAuthor', 'You are not the author of this URL!'

    UrlList.upsert _id: urlInput._id,
      $set: 
        longUrl: urlInput.longUrl
        shortUrl: urlInput.shortUrl
        isPrivate: urlInput.isPrivate
      $setOnInsert:
        author: @userId
        accessedUrlCount: 0

   