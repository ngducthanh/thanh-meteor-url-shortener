Template.home.events({
  'submit form': function(e) {
    var randomString,
      defaultUrl,
      shortUrl,
      longUrl,
      urlItem;
    e.preventDefault();
    function checkUnique() {
      function makeRandomString() {
        return Math.random().toString(36).substring(2,7);
      }
      var a = makeRandomString();
      while ( UrlList.find({_id:a}).fetch().length ) {
        a = makeRandomString();
      }
      return a;
    }
    randomString = checkUnique();
    defaultUrl = 'http://localhost:3000/';
    shortUrl = defaultUrl + randomString;
    longUrl = $(e.target).find('#long-url-input').val();
    urlItem = {
      _id: randomString,
      longUrl: longUrl,
      shortUrl: shortUrl
    };
    if ( longUrl ) {
      UrlList.insert( urlItem );
      $('#long-url-input').val('');
    }
  }
});