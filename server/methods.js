Meteor.methods({
  urlInsert: function(urlInput) {
    var shortUrl,
        urlItem,
        customUrl = urlInput.customUrl,
        shortUrlExisted,
        errorUrlExisted = 'Your custom link ' +
                      'has already existed! ' +
                      'Please try another one.'
    
    function findShortUrl(newShortUrl) {
      var result = UrlList.find({
          shortUrl: newShortUrl
        }).fetch().length;
      return !!result;
    }
    function makeUniqueShortUrl() {
      var randomShortUrl = Random.id(5);
      while ( findShortUrl(randomShortUrl) ) {
        randomShortUrl = Random.id(5);
      }
      return randomShortUrl;
    }

    shortUrlExisted = findShortUrl(customUrl);

    if ( !customUrl ) {
      shortUrl = makeUniqueShortUrl();
    } else if ( shortUrlExisted ) {
      throw new Meteor.Error(
          'shortUrlExisted',
          errorUrlExisted
        );
    } else {
      shortUrl = customUrl;
    }

    urlItem = {
      longUrl: urlInput.longUrl,
      shortUrl: shortUrl 
    };

    if (urlInput.longUrl) {
      UrlList.insert(urlItem);
    }
  }
});