UrlList = new Mongo.Collection('urlList');
UrlList.allow({
  insert: function() {
    return true;
  }
});