Meteor.methods({
  urlInsert: function(longUrl) {
    var shortUrl = Random.id(5),
        urlItem = {
          longUrl: longUrl,
          shortUrl: shortUrl 
        };

    if (longUrl) {
      UrlList.insert(urlItem);
    }
  }
});