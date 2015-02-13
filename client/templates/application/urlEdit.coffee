Template.urlEdit.helpers 
  checkboxStatus: ->
    @isPrivate is true
  hostname: ->
    Meteor.absoluteUrl()

Template.urlEdit.events
  'click #save': ->
    urlInput = 
      longUrl: $('#longUrl').val()
      customUrl: $('#shortUrl').val()
      isPrivate: $('#private').is(':checked') is true
      author: @author
      _id: @_id

    Meteor.call 'urlInsert', urlInput, (error, reason)->
      if error
        alert error.reason
      else
        alert 'Congratualation'
        Router.go('/private')
