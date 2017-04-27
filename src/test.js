const api = require('./api')
const mocha = require('mocha')
var expect = require('expect.js')


var event = {
  requestContext: {
    resourcePath: '/',
    httpMethod: 'POST'
  },
  body: {
    "text": "George",
    "context": "",
  }
}


describe('Micro.analyze', function () {

  it('should return basic analysis without context', function (done) {
    const callback = function (err, data) {
      try {
        data = JSON.parse(data.body)
        expect(data.textLength).to.eql(6)
        done()
      } catch (err) {
        console.log(err)
        console.log(data)
        done(err)
      }
    }
    api.proxyRouter(event, {
    done: callback}
    )
  })

  it('should return full analysis with context', function (done) {
    const callback = function (err, data) {
      try {
        data = JSON.parse(data.body)
        expect(data.indexStart).to.eql(5)
        done()
      } catch (err) {
        console.log(err)
        console.log(data)
        done(err)
      }
    }
    event.body.context = "King George II",
    api.proxyRouter(event, {
    done: callback}
    )
  })
  it('should return empty body when given empty body', function (done) {
    const callback = function (err, data) {
      try {
        data = JSON.parse(data.body)
        expect(typeof data).to.eql('object')
        expect(typeof data.textLength).to.eql('undefined')
        done()
      } catch (err) {
        console.log(err)
        console.log(data)
        done(err)
      }
    }
    delete event.body
    api.proxyRouter(event, {
    done: callback}
    )
  })
});