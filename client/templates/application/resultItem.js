Template.resultItem.helpers({
  hostname: function() {
    return Meteor.absoluteUrl();
  },
  status: function() {
    return this.isPrivate ? 'private' : 'public';
  },
  canBeEditted: function() {
    return (this.author && this.author === Meteor.userId()) ? 'active' : 'disabled'
  }
});