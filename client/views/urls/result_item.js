Template.resultItem.helpers({
  hostname: function() {
    return Meteor.absoluteUrl();
  },
  status: function() {
    return this.isPrivate ? 'private' : 'public';
  },
  canBeEditted: function() {
    return (this.author && this.author === Meteor.userId()) ? false : true;
  }
});

UI.registerHelper("visibility", function () {
  var currentRoute = Iron.Location.get().path;
  if (currentRoute && currentRoute === '/') {
    return 'hidden';
  } else {
    return 'visible';
  }
});