Router.configure({
  layoutTemplate: 'layout'
});
Router.route( '/', { name:'home' } );
Router.route('/urlEdit/:shortUrl', {
  name: 'urlEdit',
  data: function() {
    var shortUrl = this.params.shortUrl;
    return UrlList.findOne({shortUrl: shortUrl});
  }
});
