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
    if ( this ) {
      var newStatus;
      if ( $('#private').is(':checked') ) {
        newStatus = 'private';
      } else {
        newStatus = 'public'
      }
      var editedUrl = {
        shortUrl: this.shortUrl,
        status: newStatus
      };
      Meteor.call('urlUpdate', editedUrl);
    }
  }
});
