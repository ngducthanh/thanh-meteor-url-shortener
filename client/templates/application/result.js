Template.publicResult.helpers({
  publicResultList: function() {
    var status = 'public';
    return UrlList.find({ status: status });
  }
});

Template.privateResult.helpers({
  privateResultList: function() {
    var author = Meteor.userId();
    if ( author ) {
      return UrlList.find({
          author: author,
          status: 'private'
        });
    }
  }
});