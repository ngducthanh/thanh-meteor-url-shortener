Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate:'notFound'
});
Router.route('/', {name:'home'});
Router.route('/notfound', {name: 'notFound'});
Router.route('/:shortUrl', {
  name: 'redirectLink',
  onAfterAction: function() {
    var shortUrl = this.params.shortUrl;
        url = UrlList.findOne({ shortUrl:shortUrl }),
        redirectUrl = url && url.longUrl;
        
    if ( !redirectUrl ) {
      this.render('notFound');
    } else if ( Session.get('redirectLinkStatus') ) {
      location = url.longUrl;
    }
  }
});
