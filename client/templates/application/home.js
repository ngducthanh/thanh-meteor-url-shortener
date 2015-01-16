Template.home.events({
  'submit form': function(e) {
    e.preventDefault();
    var longUrl = $(e.target).find('#long-url-input').val();
    var hostName = location.protocol + '//' + window.location.hostname;
    var urlAttribute = {
      hostName: hostName,
      longUrl: longUrl
    };
    Meteor.call( 'urlInsert', urlAttribute, function(error, result) {
      if ( error ) {
        return alert( error.reason );
      }
    });
    if ( longUrl ) {
      $('#long-url-input').val('');
    }
  }
});