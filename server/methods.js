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