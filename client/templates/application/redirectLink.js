Template.redirectLink.rendered = function() {
  var url = this.data,
      redirectLink = url && url.longUrl;
  if ( redirectLink ) {
    function redirect() {
      location = url.longUrl;
    }
    Meteor.setInterval(redirect, 2000);
  } else {
    Router.go('/notfound');
  }
};