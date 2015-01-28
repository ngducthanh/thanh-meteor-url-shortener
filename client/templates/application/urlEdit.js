Template.urlEdit.helpers({
  checkboxStatus: function() {
    if ( UrlList.findOne() ) {
      if ( UrlList.findOne().status === 'private') {
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
    if ( UrlList.findOne() ) {
      var newStatus;
      if ( $('#private').is(':checked') ) {
        newStatus = 'private';
      } else {
        newStatus = 'public'
      }
      var editedUrl = {
        shortUrl: UrlList.findOne().shortUrl,
        status: newStatus
      };
      Meteor.call('urlUpdate', editedUrl);
    }
  }
});
