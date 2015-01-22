Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/', {name:'home'});
Router.route('/:shortUrl', {
  name: 'redirectLink',
  onAfterAction: function() {
    var shortUrl = this.params.shortUrl;
    var redirectUrl = UrlList.findOne({
        shortUrl: shortUrl
      }).longUrl;
    location = redirectUrl;
  }
});
