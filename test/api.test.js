'use-strict'

process.env.NODE_ENV = 'test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../api/server')
var should = chai.should()

chai.use(chaiHttp)

describe('API', function () {
  beforeEach(function (done) { // Before each test we empty the database
    done()
  })

  describe('/GET /', function () {
    it('it should GET for home page', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.text.should.be.a('string').contain('<!DOCTYPE html>')
          done()
        })
    })
  })

  describe('/POST /', function () {
    it('it should POST for json fields', (done) => {
      chai.request(server)
        .post('/')
        .end((err, res) => {
          var json = JSON.parse(res.text)
          json.should.be.a('object')
          done()
        })
    })
  })

  describe('/POST /', function () {
    it('it should POST for json fields have content', (done) => {
      chai.request(server)
        .post('/')
        .end((err, res) => {
          var json = JSON.parse(res.text)
          json.should.have.property('_embedded')
          json._embedded.should.have.property('request_fields')
          json._embedded.should.have.property('user_fields')
          done()
        })
    })
  })

  describe('/POST /', function () {
    it('it should POST for submit url', (done) => {
      chai.request(server)
        .post('/post')
        .end((err, res) => {
            res.text.should.be.a('string').equal('Submited!')
          done()
        })
    })
  })

  describe('/POST /', function () {
    it('it assert javascript in assets/index.js url', (done) => {
      chai.request(server)
        .get('/assets/index.js')
        .end((err, res) => {
            res.text.should.be.a('string').contain('app')
            res.text.should.be.a('string').contain('app.render')
            res.text.should.be.a('string').contain('app.renderForm')
            res.text.should.be.a('string').contain('app.render')
          done()
        })
    })
  })

  describe('/POST /', function () {
    it('it assert css in assets/index.css url', (done) => {
      chai.request(server)
        .get('/assets/index.css')
        .end((err, res) => {
            res.text.should.be.a('string').contain('header__content')
            res.text.should.be.a('string').contain('container__top')
          done()
        })
    })
  })

})
