
require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const mongoose = require('mongoose')

const expect = chai.expect

chai.use(chaiHttp);

describe('User', function () {
    describe('POST /users/register', function () {
        before(function (done) {
            mongoose.connect(`mongodb://localhost:27017/ecommerce-test`, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
                mongoose.connection.dropCollection('users')
                done()
            })
        })

        it('should create a new user when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    email: 'zaki@mail.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(201) 
                    expect(res.body).to.have.own.property('token')
                    done()
                })
        })

        it('should return error message when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    email: '',
                    password: ''
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.errors[0]).to.equal('Email is required!')
                    expect(res.body.errors[1]).to.equal('Password is required!')
                    done()
                })
        })

        it('should return validation error when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    email: 'zaki.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.errors[0]).to.equal('Email format is invalid!')
                    done()
                })
        })

        it('should return validation error when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/register')
                .send({
                    email: 'zaki@mail.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.errors[0]).to.equal('Email is already registered!')
                    done()
                })
        })
    })

    describe('POST /users/login', function () {
        it('should return a token when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'zaki@mail.com',
                    password: '123'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.own.property('token')
                    done()
                })
        })

        it('should return error message when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: 'zaki@mail.com',
                    password: '321'
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    expect(res.body.errors[0]).to.equal('Invalid username / password!')
                    done()
                })
        })

        it('should return error message when calling the POST method', function (done) {
            chai.request(app)
                .post('/users/login')
                .send({
                    email: '',
                    password: ''
                })
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(403)
                    expect(res.body.errors[0]).to.equal('Invalid username / password!')
                    done()
                })
        })
    })
})