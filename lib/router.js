Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate:'notFound'
});
Router.route('/', {name:'home'});
Router.route('/notfound', {name: 'notFound'});
Router.route('/:shortUrl', {
  name: 'redirectLink',
  data: function() {
    var shortUrl = this.params.shortUrl;
    return UrlList.findOne({shortUrl: shortUrl});
  }
});
