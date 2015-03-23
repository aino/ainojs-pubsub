var mocha = require('mocha')
var chai = require('chai')
var PubSub = require('../index')

var assert = chai.assert
var expect = chai.expect
var should = chai.should()

beforeEach(function() {
  PubSub.clear()
})

describe('PubSub.on', function() {
  it('Should call handlers in the same order', function() {
    var n = []
    PubSub.on('x', function() {
      n.push(1)
    })
    PubSub.on('x', function() {
      n.push(2)
    })
    PubSub.trigger('x')
    expect(n).to.eql([1,2])
  })
})

describe('PubSub.off', function() {
  it('Should remove handlers from memory', function() {
    PubSub.on('x', function() { return 0 })
    var middle = PubSub.on('x', function() { return 1 })
    PubSub.on('x', function() { return 2 })
    PubSub.off(middle)
    expect(PubSub.getTopics().x.map(function(topic) {
      return topic.func()
    })).to.eql([0,2])
  })
})