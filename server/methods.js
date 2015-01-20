Meteor.methods({
  urlInsert: function(urlInput) {
    var shortUrl,
        urlItem;

    if (urlInput.customUrl) {
      var a = urlInput.customUrl;
      if (!UrlList.find({
          shortUrl: a
        }).fetch().length) {
        shortUrl = a;
      } else {
        console.log('Please create another custom link!');
        return;
      }
    } else {
      shortUrl = Random.id(5);
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