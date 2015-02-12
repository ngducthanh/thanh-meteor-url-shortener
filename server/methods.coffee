Meteor.methods 
  urlInsert: (urlInput) ->
    isPrivate = urlInput.isPrivate
    customUrl = urlInput.customUrl
    author = Meteor.userId()
    shortUrlExists = (newShortUrl)->
      result = UrlList.find
          shortUrl: newShortUrl
        .fetch().length
      !!result

    makeUniqueShortUrl = ->
      randomShortUrl = Random.id 5
      while shortUrlExists randomShortUrl
        randomShortUrl = Random.id 5
      randomShortUrl
    
    check urlInput, 
      longUrl: String
      customUrl: String
      isPrivate: Boolean

    if not Helpers.validateLongUrl urlInput.longUrl
      throw new Meteor.Error 'invalidUrl', 'Your URL is invalid ' + 
        'Please enter another one!'
    
    if author
      status = 'private'
    else
      status = 'public'
  
    if not customUrl
      shortUrl = makeUniqueShortUrl()
    else if Helpers.validateShortUrl customUrl
      throw new Meteor.Error 'invalidCustomUrl', 'Your custom URL ' +  
        'contains invalid character (e.g: !@#$%^&*).'
    else if shortUrlExists customUrl
      throw new Meteor.Error 'shortUrlExists', 'Your custom link ' + 
        'has already existed! Please try another one.'
    else
      shortUrl = customUrl

    urlItem = 
      longUrl: urlInput.longUrl
      shortUrl: shortUrl
      author: author
      status: status
      accessedUrlCount: 0
    
    if urlInput.longUrl
      UrlList.insert urlItem
  
  urlUpdate: (editedUrl)->
    originalUrl = UrlList.findOne
                      _id: editedUrl._id
    shortUrlExists = (_id, newShortUrl) ->
      result = UrlList.find
                  _id: {$ne: _id}
                  shortUrl: newShortUrl
                .fetch().length
      !!result
    
    check editedUrl, 
      longUrl: String
      shortUrl: String
      _id: String
      status: String
      
    if not Helpers.validateLongUrl editedUrl.longUrl
      throw new Meteor.Error 'invalid', 'Your URL contains ' + 
        'invalid character. Please enter another one!'

    if Helpers.validateShortUrl editedUrl.shortUrl
      throw new Meteor.Error 'invalidCustomUrl', 'Your short URL ' + 
        'contains invalid character (e.g: !@#$%^&*).'
    
    if not editedUrl.shortUrl
      throw new Meteor.Error 'emptyShortUrl', 'Short link must not be empty!'

    if shortUrlExists editedUrl._id, editedUrl.shortUrl
      throw new Meteor.Error 'shortUrlExists', 'Your short link ' +  
        'has existed. Please choose another one.'
    
    if editedUrl.status is 'private'
      author = @userId
    else
      author = null
    
    if originalUrl
      isOwnerOfUrl = ->
        ((originalUrl.author is @userId) and 
          (originalUrl.status is 'private')) or 
        ((originalUrl.author is null) and 
          (originalUrl.status is 'public'))
    
    if isOwnerOfUrl 
      UrlList.update {_id: editedUrl._id},
        {$set: 
          status: editedUrl.status
          author: author
          shortUrl: editedUrl.shortUrl
          longUrl: editedUrl.longUrl
          }
  countAccessedUrl: (_id)->
    check _id, String
    UrlList.update {_id: _id},
      {$inc: 
        accessedUrlCount: 1
      }

   