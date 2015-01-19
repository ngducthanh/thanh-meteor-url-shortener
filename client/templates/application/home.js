Template.home.events({
  'submit form': function(e) {
    e.preventDefault();
    var longUrl = $(e.target).find('#long-url-input').val();

    Meteor.call('urlInsert', longUrl, function(error, result) {
      if (error) {
        return alert(error.reason);
      } else  {
        $('#long-url-input').val('');
      }
    });
  }
});