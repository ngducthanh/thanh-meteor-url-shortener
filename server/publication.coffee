Meteor.publish 'urlList', (shortUrl)->
  if @userId
    if shortUrl
      check shortUrl, String
      UrlList.find
        $or: [
          {author: @userId}
          {author: null}
        ]
        shortUrl: shortUrl
    else
      UrlList.find
        $or: [
          {author: @userId}
          {author: null}
        ]
  else
    UrlList.find
      status: 'public'
      
Meteor.publish 'urlRedirect', (shortUrl)->
  check shortUrl, String
  UrlList.find
    shortUrl: shortUrl
