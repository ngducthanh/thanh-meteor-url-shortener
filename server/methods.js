Meteor.methods({
  urlInsert: function(urlInput) {
    var shortUrl,
        urlItem,
        status,
        author = Meteor.userId(),
        customUrl = urlInput.customUrl,
        errorUrlExists = 'Your custom link has already existed! ' +
                         'Please try another one.';
    if ( author ) {
      status = 'private';
    } else {
      status = 'public'
    }
    
    function shortUrlExists(newShortUrl) {
      var result = UrlList.find({
          shortUrl: newShortUrl
        }).fetch().length;
      return !!result;
    }
    function makeUniqueShortUrl() {
      var randomShortUrl = Random.id(5);
      while ( shortUrlExists(randomShortUrl) ) {
        randomShortUrl = Random.id(5);
      }
      return randomShortUrl;
    }

    if ( !customUrl ) {
      shortUrl = makeUniqueShortUrl();
    } else if ( shortUrlExists(customUrl) ) {
      throw new Meteor.Error(
          'shortUrlExists',
          errorUrlExists
        );
    } else {
      shortUrl = customUrl;
    }

    urlItem = {
      longUrl: urlInput.longUrl,
      shortUrl: shortUrl,
      author: author,
      status: status
    };

    if ( urlInput.longUrl ) {
      UrlList.insert(urlItem);
    }
  }
});