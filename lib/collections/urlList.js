UrlList = new Mongo.Collection('urlList');
Meteor.methods({
  urlInsert: function ( urlAttribute ) {
    var randomString,
     shortUrl;
    function checkUnique() {
      function makeRandomString() {
        return Math.random().toString(36).substring(2,7);
      }
      var a = makeRandomString();
      while ( UrlList.find({_id:a}).fetch().length ) {
        a = makeRandomString();
      }
      return a;
    }
    randomString = checkUnique();
    shortUrl = urlAttribute.hostName + '/' + randomString;
    urlItem = {
      _id: randomString,
      longUrl: urlAttribute.longUrl,
      shortUrl: shortUrl
    };
    if ( urlAttribute.longUrl ) {
      UrlList.insert( urlItem );
    }
  }
});