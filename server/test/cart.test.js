
require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const mongoose = require('mongoose')
const fs = require('fs')

const expect = chai.expect

chai.use(chaiHttp);

let token, productId
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDdmNjVlNTE4ZmE0NTBkNjIwY2FmYjciLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1N'

describe('Product', function () {
    before(function () {
        describe('#login()', function () {
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
                        token = res.body.token
                        done()
                    })
            })
        })

        describe('create a product', function () {
            it('Should return an object with status code 201', function (done) {
                chai.request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        productName: 'Test product',
                        price: 10000,
                        category: 'Test sategory',
                        stock: 10,
                    })
                    .attach('image', fs.readFileSync('hactiv8.jpg'), 'hactiv8.jpg')
                    .end(res => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        productId = res.body._id
                        done()
                    })
            })
        })
    })

    describe('GET /carts', function () {
        describe("success get user's cart", function () {
            it('should return an object', function (done) {
                chai.request(app)
                    .get('/carts')
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })
    })

    describe('POST /carts', function () {
        describe('success create a cart', function () {
            it('should return an object', function (done) {
                chai.request(app)
                    .post('/carts')
                    .set('token', token)
                    .end(res => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })
    })

    describe('POST /product/:id', function () {
        describe('success add a product to cart', function () {
            it('should return an object of product', function (done) {
                chai.request(app)
                    .get(`/carts/${productId}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })
    })

    describe('DELETE /product/:id', function () {
        describe('success delete a product from cart', function () {
            it('should return an object of product', function (done) {
                chai.request(app)
                    .patch(`/carts/${productId}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })
    })
})