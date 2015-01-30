Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});
Router.route( '/', {
  name:'home',
  subscriptions: function() {
    return Meteor.subscribe('urlList');
  }
});
Router.route('/notfound', {name: 'notFound'});
Router.route('/:shortUrl', {
  name: 'redirectLink',
  data: function() {
    var shortUrl = this.params.shortUrl;
    return UrlList.findOne({shortUrl: shortUrl});
  }
});
var requireLogin = function() {
  if ( !Meteor.user() ) {
    this.render('accessDenied');
  } else {
    this.next();
  }
};
Router.route('/urlEdit/:shortUrl', {
  name: 'urlEdit',
  waitOn: function() {
    Meteor.subscribe('urlList', this.params.shortUrl);
  },
  data: function() {
    return UrlList.findOne({shortUrl: this.params.shortUrl});
  }
});
Router.onBeforeAction(requireLogin, {only: 'urlEdit'});
