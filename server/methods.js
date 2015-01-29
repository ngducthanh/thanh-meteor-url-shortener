Meteor.methods({
  urlInsert: function(urlInput) {
    var shortUrl,
        urlItem,
        customUrl = urlInput.customUrl,
        author = Meteor.userId(),
        status,
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
    if ( author ) {
      status = 'private';
    } else {
      status = 'public';
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
  },
  urlUpdate: function(editedUrl) {
    var originalUrl = UrlList.findOne({shortUrl: editedUrl.shortUrl}),
        isOwnerOfUrl,
        author;
    if ( originalUrl ) {
      isOwnerOfUrl = (( originalUrl.author === this.userId ) && 
                      ( originalUrl.status === 'private')) || 
                        (( originalUrl.author === null ) && 
                          ( originalUrl.status === 'public'));
    }
    if ( editedUrl.status === 'private') {
      author = this.userId;
    } else {
      author = null;
    }
    if ( isOwnerOfUrl ) {
      UrlList.update({shortUrl: editedUrl.shortUrl}, 
                      {$set: {
                        status: editedUrl.status, 
                        author: author}});
    }
  }
});