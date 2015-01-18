Meteor.methods({
  urlInsert: function(longUrl) {
    var randomString,
        shortUrl,
        checkUnique = function() {
          function makeRandomString() {
           return Math.random().toString(36).substring(2,7);
          }
          var a = makeRandomString();
          while (UrlList.find({
              urlId: a
            }).fetch().length) {
           a = makeRandomString();
          }
          return a;
         };

    randomString = checkUnique();
    shortUrl = Meteor.absoluteUrl() + randomString;

    urlItem = {
      urlId: randomString,
      longUrl: longUrl,
      shortUrl: shortUrl 
    };

    if (longUrl) {
      UrlList.insert(urlItem);
  }
});