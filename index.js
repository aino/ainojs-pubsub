
var topics = {}
var subUid = -1

module.exports.on = function(topic, func) {
  if (!topics[topic]) {
    topics[topic] = []
  }
  var token = (++subUid).toString()
  topics[topic].push({
    token: token,
    func: func
  })
  return token
}

module.exports.trigger = function(topic, args) {
  if (!topics[topic])
    return false
  var subscribers = topics[topic]
  var len = subscribers ? subscribers.length : 0
  var i = 0
  for(; i<len; i++)
    subscribers[i].func(args)
  return true
}

module.exports.off = function(token) {
  for (var m in topics) {
    if (topics[m]) {
      for (var i = 0, j = topics[m].length; i < j; i++) {
        if (topics[m][i].token === token) {
          topics[m].splice(i, 1)
          return token
        }
      }
    }
  }
  return false
}

module.exports.clear = function() {
  topics = {}
}

module.exports.getTopics = function() {
  return topics
}