Meteor.publish('urlList', function(shortUrl) {
  if ( this.userId ) {
    if ( shortUrl ) {
      return UrlList.find({
        $or: [{author: this.userId}, {author: null}],
        shortUrl: shortUrl
      });
    } else {
      return UrlList.find({
        $or: [{author: this.userId}, {author: null}]
      });
    }
  } else if ( shortUrl ) {
    return UrlList.find({shortUrl: shortUrl});
  } else {
    return UrlList.find({status: 'public'});
  }
});