Meteor.publish('urlList', function(shortUrl) {
  if ( this.userId ) {
    if ( shortUrl ) {
      check(shortUrl, String);
      return UrlList.find({
        $or: [{author: this.userId}, {author: null}],
        shortUrl: shortUrl
      });
    } else {
      return UrlList.find({
        $or: [{author: this.userId}, {author: null}]
      });
    }
  } else {
    return UrlList.find({status: 'public'});
  }
});
Meteor.publish('urlRedirect', function(shortUrl) {
  check(shortUrl, String);
  return UrlList.find({shortUrl: shortUrl});
});