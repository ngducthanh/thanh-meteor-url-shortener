@requireLogin = ->
  if not Meteor.userId()
    @render 'accessDenied'
  else
    @next()
    
Router.onBeforeAction requireLogin, 
  only: ['private', 'urlEdit', 'redirectLink']