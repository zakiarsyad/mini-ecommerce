
require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const mongoose = require('mongoose')
const fs = require('fs')

const expect = chai.expect

chai.use(chaiHttp);

let token, product
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDdmNjVlNTE4ZmE0NTBkNjIwY2FmYjciLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1N'

describe('Login a user', function () {
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

describe('Product', function () {
    before(function (done) {
        mongoose.connect(`mongodb://localhost:27017/ecommerce-test`, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
            mongoose.connection.dropCollection('products')
            done()
        })
    })

    describe('GET /products', function () {
        describe('success get all products', function () {
            it('should return an array with status code 200', function (done) {
                chai.request(app)
                    .get('/products')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        done()
                    })
            })
        })
    })

    describe('POST /products', function () {
        describe('success add a product', function () {
            it('Should return an object with status code 201', function (done) {
                chai.request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        name: 'Test product',
                        price: 10000,
                        category: 'Test sategory',
                        stock: 10
                    })
                    // .attach('image', fs.readFileSync('./hactiv8.jpg'), 'hactiv8.jpg')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res).to.have.an('object')
                        product = res.body
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .post('/products')
                    .send({
                        name: 'Test product',
                        price: 10000,
                        category: 'Test sategory',
                        stock: 10
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })

        describe('invalid token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .post('/products')
                    .set('token', invalidToken)
                    .send({
                        name: 'Test product',
                        price: 10000,
                        category: 'Test sategory',
                        stock: 10
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })
    })

    describe('GET /product/:id', function () {
        describe('success get single product', function () {
            it('should return an object with status code 200', function (done) {
                chai.request(app)
                    .get(`/products/${product._id}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.have.an('object')
                        done()
                    })
            })
        })

        describe('invalid product id', function () {
            it('should return null', function (done) {
                chai.request(app)
                    .get(`/products/111111111111111111111111`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)                  
                    .get(`/products/${product._id}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })

        describe('invalid token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .get(`/products/${product._id}`)
                    .set('token', invalidToken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })
    })

    describe('PATCH /products/:id', function () {
        describe('success edit a product', function () {
            it('should return an object with status 200', function (done) {
                chai.request(app)
                    .patch(`/products/${product._id}`)
                    .set('token', token)
                    .send({
                        name: 'Test product update',
                        price: 10000,
                        category: 'Test category update',
                        stock: 10
                    })
                    // .attach('image', fs.readFileSync('hactiv8.jpg'), 'hactiv8.jpg')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })

        describe("invalid product id", function () {
            it('Should return an array of errors message with status code 404 ', function (done) {
                chai.request(app)
                    .patch(`/products/111111111111111111111111`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.errors[0]).to.equal('product id is invalid')
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an errors message with status code 403', function (done) {
                chai.request(app)
                    .patch(`/products/${product._id}`)
                    .send({
                        name: 'Test product update',
                        price: 10000,
                        category: 'Test category update',
                        stock: 10
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })

        describe('invalid token access', function () {
            it('Should return an errors message with status code 403', function (done) {
                chai.request(app)
                    .patch(`/products/${product._id}`)
                    .set('token', invalidToken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })
    })

    describe('DELETE /products/:id', function () {
        describe('success delete a product', function () {
            it('should return an object with status 200', function (done) {
                chai.request(app)
                    .delete(`/products/${product._id}`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })

        describe("invalid product id", function () {
            it('Should return an array of errors message with status code 404 ', function (done) {
                chai.request(app)
                    .delete(`/products/111111111111111111111111`)
                    .set('token', token)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(404)
                        expect(res.body.errors[0]).to.equal('product id is invalid')
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an errors message with status code 403', function (done) {
                chai.request(app)
                    .delete(`/products/${product._id}`)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })

        describe('invalid token access', function () {
            it('Should return an errors message with status code 403', function (done) {
                chai.request(app)
                    .delete(`/products/${product._id}`)
                    .set('token', invalidToken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })

        // describe('success get single product', function () {
        //     it('should return an object with status code 200', function (done) {
        //         chai.request(app)
        //             .get(`/products/${product._id}`)
        //             .set('token', token)
        //             .end(function (err, res) {
        //                 expect(err).to.be.null
        //                 expect(res).to.have.status(200)
        //                 expect(res).to.have.an('object')
        //                 done()
        //             })
        //     })
        // })
    })
})