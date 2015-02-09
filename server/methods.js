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

    check(urlInput, {
      longUrl: String,
      customUrl: String
    });

    if ( !Helpers.validateLongUrl(urlInput.longUrl) ) {
      throw new Meteor.Error(
        'invalidUrl', 
        'Your URL is invalid.\nPlease enter another one!');
    }

    if ( author ) {
      status = 'private';
    } else {
      status = 'public';
    }

    if ( !customUrl ) {
      shortUrl = makeUniqueShortUrl();
    } else if ( Helpers.validateShortUrl(customUrl) ) {
      throw new Meteor.Error('invalidCustomUrl',
        'Your custom URL contains invalid character (e.g: !@#$%^&*).');
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
      status: status,
      accessedUrlCount: 0 
    };

    if ( urlInput.longUrl ) {
      UrlList.insert(urlItem);
    }
  },
  urlUpdate: function(editedUrl) {
    var originalUrl = UrlList.findOne({_id: editedUrl._id}),
        isOwnerOfUrl,
        author;
    function shortUrlExists(_id, newShortUrl) {
      var result = UrlList.find({
          _id: {$ne: _id},
          shortUrl: newShortUrl
        }).fetch().length;
      return !!result;
    }
    
    check(editedUrl, {
      longUrl: String,
      shortUrl: String,
      _id: String,
      status: String
    });

    if ( !Helpers.validateLongUrl(editedUrl.longUrl) ) {
      throw new Meteor.Error(
        'invalidUrl', 
        'Your URL contains invalid character.\nPlease enter another one!');
    }
    if ( Helpers.validateShortUrl(editedUrl.shortUrl) ) {
      throw new Meteor.Error('invalidCustomUrl',
        'Your short URL contains invalid character (e.g: !@#$%^&*).');
    }
    if ( !editedUrl.shortUrl ) {
      throw new Meteor.Error('emptyShortUrl',
          'Short link must not be empty!');
    }
   
    if ( shortUrlExists( editedUrl._id, editedUrl.shortUrl ) ) {
      throw new Meteor.Error(
          'shortUrlExists',
          'Your short link has existed. Please choose another one.'
        );
    }
    
    if ( editedUrl.status === 'private') {
      author = this.userId;
    } else {
      author = null;
    }

    if ( originalUrl ) {
      isOwnerOfUrl = (( originalUrl.author === this.userId ) && 
                      ( originalUrl.status === 'private')) || 
                        (( originalUrl.author === null ) && 
                          ( originalUrl.status === 'public'));
    }
    if ( isOwnerOfUrl ) {
      UrlList.update({_id: editedUrl._id}, 
                      {$set: {
                        status: editedUrl.status, 
                        author: author,
                        shortUrl: editedUrl.shortUrl,
                        longUrl: editedUrl.longUrl
                      }});
    }
  },
  countAccessedUrl: function(_id) {
    check(_id, String);
    UrlList.update({_id: _id},{
      $inc: {accessedUrlCount: 1}
    });
  }
});