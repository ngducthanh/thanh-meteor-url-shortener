Template.urlEdit.helpers 
  checkboxStatus: ->
    @isPrivate is true
  hostname: ->
    Meteor.absoluteUrl()

Template.urlEdit.events
  'click #save': ->
    urlInput = 
      _id: @_id
      longUrl: $('#longUrl').val()
      shortUrl: $('#shortUrl').val()
      isPrivate: $('#private').is(':checked') is true

    Meteor.call 'urlUpsert', urlInput, (error)->
      if error
        Errors.insert 
          message: error.reason
      else
        Router.go("/url/edit/#{urlInput.shortUrl}")
