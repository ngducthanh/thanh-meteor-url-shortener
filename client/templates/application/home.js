Template.home.events({
  'submit form': function(e) {
    e.preventDefault();
    var objectID = new Mongo.ObjectID(),
        urlInput = {
          _id: objectID.toHexString(),
          longUrl: $(e.target).find('#long-url-input').val(),
          shortUrl: $(e.target).find('#custom-url-input').val(),
          isPrivate: $('#private').is(':checked') ? true : false
        };

    Helpers.validateLongUrl(longUrl);
    if ( customUrl ) {
      Helpers.validateCustomUrl(customUrl);
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
  loginOrNot: function() {
    return Meteor.userId();
  },
  activeIfRouteIs: function(route) {
    var currentRoute = Iron.Location.get().path;
    return currentRoute && 
      route == currentRoute ? 'active' : '';
  }
});