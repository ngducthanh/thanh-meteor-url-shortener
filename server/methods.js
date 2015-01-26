Meteor.methods({
  urlInsert: function(longUrl) {
    var shortUrl = Random.id(5),
        urlItem,
        status,
        author = Meteor.userId();
    if ( author ) {
      status = 'private';
    } else {
      status = 'public'
    }

    urlItem = {
      longUrl: longUrl,
      shortUrl: shortUrl,
      author: author,
      status: status
    };

    if ( longUrl ) {
      UrlList.insert(urlItem);
    }
  }
});