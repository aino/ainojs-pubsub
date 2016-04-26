var mocha = require('mocha')
var chai = require('chai')
var PubSub = require('../index')

var assert = chai.assert
var expect = chai.expect
var should = chai.should()

beforeEach(function() {
  PubSub.clear()
})

describe('PubSub.trigger', function() {
  it('Should trigger methods in the same order they where added', function() {
    var n = []
    PubSub.on('foo', function() {
      n.push(1)
    })
    PubSub.on('foo', function() {
      n.push(2)
    })
    PubSub.trigger('foo')
    expect(n).to.eql([1,2])
  })
  it('Should trigger methods with arguments', function(done) {
    PubSub.on('foo', function(args) {
      expect(args).to.eql({foo:'bar'})
      done()
    })
    PubSub.trigger('foo', { foo: 'bar' })
  })
})

describe('PubSub.off', function() {
  it('Should remove handlers from memory', function() {
    PubSub.on('x', function() { return 0 })
    var middle = PubSub.on('x', function() { return 1 })
    PubSub.on('x', function() { return 2 })
    PubSub.off(middle)
    expect(PubSub.allTopics.x.map(function(topic) {
      return topic.func()
    })).to.eql([0,2])
  })
})