'use strict'

class PubSub {
  constructor() {
    this.topics = {}
    this.subUid = -1
  }
  on(topic, func) {
    if (!this.topics.hasOwnProperty(topic))
      this.topics[topic] = []
    var token = (++this.subUid).toString()
    this.topics[topic].push({
      token: token,
      func: func
    })
    return token
  }
  trigger(topic, args) {
    var subscribers = this.topics[topic]
    if (!subscribers)
      return false
    var len = subscribers.length || 0
    var i = 0
    for(; i<len; i++)
      subscribers[i] && typeof subscribers[i].func == 'function' && subscribers[i].func(args)
    return true
  }
  off(token) {
    for (var m in this.topics) {
      if (this.topics[m]) {
        for (var i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1)
            return token
          }
        }
      }
    }
  }
  clear() {
    this.topics = {}
  }
  get allTopics() {
    return this.topics
  }
}

module.exports = new PubSub()
