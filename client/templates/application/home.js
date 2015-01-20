Template.home.events({
  'submit form': function(e) {
    e.preventDefault();
    var longUrl = $(e.target).find('#long-url-input').val(),
        customUrl = $(e.target).find('#custom-url-input').val(),
        urlInput = {
          longUrl: longUrl,
          customUrl: customUrl
        };

    Meteor.call('urlInsert', urlInput, function(error, result) {
      if (error) {
        return alert(error.reason);
      } else  {
        $('#long-url-input').val('');
        $('#custom-url-input').val('');
      }
    });
  }
});