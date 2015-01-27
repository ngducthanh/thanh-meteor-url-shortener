Template.urlEdit.rendered = function() {
  var urlStatus = this.data;
  function showStatus() {
    if ( urlStatus == 'private' ) {
      $('#private').prop('checked',true);
    } else {
      $('#public').prop('checked',true);
   }
  }
  if ( urlStatus && urlStatus.status ) {
    showStatus();
  }
}
Template.urlEdit.events({
  'click #save': function() {

  }
});