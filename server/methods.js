Meteor.methods({
  urlInsert: function(urlInput) {
    var shortUrl,
        urlItem,
        customUrl = urlInput.customUrl,
        errorUrlExists = 'Your custom link has already existed! ' +
                         'Please try another one.';
    
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
      shortUrl: shortUrl 
    };

    if ( urlInput.longUrl ) {
      UrlList.insert(urlItem);
    }
  }
});