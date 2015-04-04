Meteor.publish 'publicUrlList', ->
  UrlList.find
    isPrivate: false