Template.home.events({
  'submit form': function(e) {
    e.preventDefault();
    var urlInput = {
          _id: Random.id(24),
          longUrl: $(e.target).find('#long-url-input').val(),
          shortUrl: $(e.target).find('#custom-url-input').val(),
          isPrivate: $('#private').is(':checked') ? true : false
        };

    Helpers.validateLongUrl(urlInput.longUrl);
    if ( urlInput.shortUrl ) {
      Helpers.validateCustomUrl(urlInput.shortUrl);
    }

    Meteor.call('urlUpsert', urlInput, function(error) {
      if (error) {
        Errors.insert({message: error.reason});
      } else  {
        $('#long-url-input').val('');
        $('#custom-url-input').val('');
        $('#private').prop('checked', false);
      }
    });
  }
});

Template.home.helpers({
  loggedIn: function() {
    return Meteor.userId();
  },
  activeIfRouteIs: function(route) {
    var currentRoute = Iron.Location.get().path;
    return currentRoute && 
      route == currentRoute ? 'active' : '';
  }
});