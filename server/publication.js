Meteor.publish('urlList', function() {
  return UrlList.find();
});