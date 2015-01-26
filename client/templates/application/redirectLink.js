Template.redirectLink.rendered = function() {
  Session.set('redirectLinkStatus', false);
  function makeRedirectLinkReady() {
    Session.set('redirectLinkStatus', true);
  }
  Meteor.setInterval(makeRedirectLinkReady, 2000);
};