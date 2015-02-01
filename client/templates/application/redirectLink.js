Template.redirectLink.rendered = function() {
  function redirectUrlExists(_id) {
    var result = UrlList.find({
        _id: _id
      }).fetch().length;
    return !!result;
  }
  
  if ( this.data && redirectUrlExists(this.data._id) ) {
    var redirectUrl = this.data.longUrl;
    Meteor.call('countAccessedUrl', this.data._id);
    Meteor.setInterval(function() {
        location = redirectUrl;
      }, 2000);
  } else {
    Router.go('/notfound');
  }
}
