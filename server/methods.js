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
    
    if ( editedUrl.status === 'private') {
      author = this.userId;
    } else {
      author = null;
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
  }
});