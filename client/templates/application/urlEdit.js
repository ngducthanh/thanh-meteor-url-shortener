Template.urlEdit.helpers({
  checkboxStatus: function() {
    if ( this ) {
      if ( this.status === 'private') {
        return true;
      } else {
        return false;
      }
    } 
  },
  hostname: function() {
    return Meteor.absoluteUrl();
  }
});
Template.urlEdit.events({
  'click #save': function() {
    var newStatus,
        editedUrl;

    if ( $('#private').is(':checked') ) {
      newStatus = 'private';
    } else {
      newStatus = 'public'
    }
    
    editedUrl = {
      longUrl: $('#longUrl').val(),
      shortUrl: $('#shortUrl').val(),
      status: newStatus,
      _id: this._id
    };

    Meteor.call('urlUpdate', editedUrl, function(error, result) {
      if ( error ) {
        return alert(error.reason);
      } else {
        alert('Congratulation !');
        Router.go('/');
      }
    });
  }
});
