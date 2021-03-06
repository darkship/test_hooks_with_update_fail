item = new Mongo.Collection("items")
item2 = new Mongo.Collection("items2")
var value = item2.insert({
  title: "title1"
})


item.attachSchema(new SimpleSchema({
  title: {
    type: String
  }
}))

item.before.insert(function(userId, doc) {
  console.log('function before insert')
  item2.update(value, {
    $set: {
      title: "titlevalue"
    }
  }, function(err) {
    if (err)
      console.error(err)
  })
})
item.after.insert(function(userId, doc) {
  console.log('function after insert')
})
item.before.remove(function(userId, doc) {
  console.log('function before remove')
  item2.update(value, {
    $set: {
      title: "titlevalue"
    }
  }, function(err) {
    if (err)
      console.error(err)
  })
})
item.after.remove(function(userId, doc) {
  console.log('function after remove')
})

item.before.update(function(userId, doc, fieldNames, modifier, options) {
  console.log('function before update')
  item2.update(value, {
    $set: {
      title: "titlevalue"
    }
  }, function(err) {
    if (err)
      console.error(err)
  })
})

item.after.update(function(userId, doc, fieldNames, modifier, options) {
  console.log('function after update')
})

if (Meteor.isClient) {
  Meteor.subscribe("item")
  var id = item.insert({
    title: "title"
  })

  item.update({
    _id: id
  }, {
    $set: {
      title: "new title"
    }
  })
  item.remove(id)
}

if (Meteor.isServer) {
  Meteor.publish("item", function() {
    item.find({})
  })

  item.allow({
    insert: function() {
      return true
    },
    update: function() {
      return true
    },
    remove: function() {
      return true
    }
  })
  item2.allow({
    insert: function() {
      return true
    },
    update: function() {
      return true
    },
    remove: function() {
      return true
    }
  })
}
