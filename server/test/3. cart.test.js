
require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app')
const mongoose = require('mongoose')
const fs = require('fs')

const expect = chai.expect

chai.use(chaiHttp);

let usertoken, admintoken, product, cart
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDdmNjVlNTE4ZmE0NTBkNjIwY2FmYjciLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQipjs1N'

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
                usertoken = res.body.token
                done()
            })
    })

    it('should return a token when calling the POST method as admin', function (done) {
        chai.request(app)
            .post('/users/login')
            .send({
                email: 'admin@mail.com',
                password: '123'
            })
            .end(function (err, res) {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.own.property('token')
                admintoken = res.body.token
                done()
            })
    })
})

describe('Create a product', function () {
    it('Should return an object with status code 201', function (done) {
        chai.request(app)
            .post('/products')
            .set('token', admintoken)
            .send({
                name: 'Test product',
                price: 10000,
                category: 'Test category',
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

describe('Cart', function () {
    // before(function (done) {
    //     mongoose.connect(`mongodb://localhost:27017/ecommerce-test`, { useNewUrlParser: true, useUnifiedTopology: true }, function () {
    //         mongoose.connection.dropCollection('carts')
    //         done()
    //     })
    // })

    describe('POST /carts', function () {
        describe('success create a new cart', function () {
            it('should return an object with status code 201', function (done) {
                chai.request(app)
                    .post('/carts')
                    .set('token', usertoken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        cart = res.body
                        done()
                    })
            })
        })

        describe("success get user's cart if already exist", function () {
            it('should return an object with status code 200', function (done) {
                chai.request(app)
                    .post('/carts')
                    .set('token', usertoken)
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
                    .post('/carts')
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
                    .post('/carts')
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

    describe('GET /carts', function () {
        describe("success get user's cart", function () {
            it('should return an object', function (done) {
                chai.request(app)
                    .get('/carts')
                    .set('token', admintoken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .get('/carts')
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
                    .get('/carts')
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

    describe('GET /carts/user', function () {
        describe("success get user's cart", function () {
            it('should return an object', function (done) {
                chai.request(app)
                    .get('/carts/user')
                    .set('token', usertoken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .get('/carts/user')
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
                    .get('/carts/user')
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

    describe('PATCH /carts/:id', function () {
        describe("success edit status cart", function () {
            it('should return an object', function (done) {
                chai.request(app)
                    .patch(`/carts/${cart._id}`)
                    .set('token', usertoken)
                    .send({
                        status: 'paid'
                    })
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })

        describe('there is no token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .patch(`/carts/${cart._id}`)
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
                    .patch(`/carts/${cart._id}`)
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

    // describe('POST /carts/product/:id', function () {
    //     describe('success add a product to cart', function () {
    //         it('should return an object with status code 200', function (done) {
    //             console.log(product);
    //             console.log(cart);
    //             chai.request(app)
    //                 .post(`/carts/product/${product._id}`)
    //                 .set('token', usertoken)
    //                 .send({
    //                     qty: 1
    //                 })
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(200)
    //                     expect(res).to.be.an('object')
    //                     done()
    //                 })
    //         })
    //     })

    //     describe('fail add a product to cart if product id does not exist', function () {
    //         it('Should return an array of errors message with status code 403', function (done) {
    //             chai.request(app)
    //                 .post(`/carts/product/111111111111111111111111`)
    //                 .set('token', usertoken)
    //                 .send({
    //                     qty: 1
    //                 })
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(404)
    //                     expect(res.body.errors[0]).to.equal('Product id is invalid!')
    //                     done()
    //                 })
    //         })
    //     })

    //     describe('there is no token access', function () {
    //         it('Should return an array of errors message with status code 403', function (done) {
    //             chai.request(app)
    //                 .post(`/carts/product/${product._id}`)
    //                 .send({
    //                     qty: 1
    //                 })
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(403)
    //                     expect(res.body.errors[0]).to.equal('Please login first')
    //                     done()
    //                 })
    //         })
    //     })

    //     describe('invalid token access', function () {
    //         it('Should return an array of errors message with status code 403', function (done) {
    //             chai.request(app)
    //                 .post(`/carts/product/${product._id}`)
    //                 .set('token', invalidToken)
    //                 .send({
    //                     qty: 1
    //                 })
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(403)
    //                     expect(res.body.errors[0]).to.equal('Please login first')
    //                     done()
    //                 })
    //         })
    //     })
    // })

    // describe('DELETE /carts/product/:id', function () {
    //     describe('there is no token access', function () {
    //         it('Should return an array of errors message with status code 403', function (done) {
    //             chai.request(app)
    //                 .delete(`/carts/product/${product._id}`)
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(403)
    //                     expect(res.body.errors[0]).to.equal('Please login first')
    //                     done()
    //                 })
    //         })
    //     })

    //     describe('invalid token access', function () {
    //         it('Should return an array of errors message with status code 403', function (done) {
    //             chai.request(app)
    //                 .delete(`/carts/product/${product._id}`)
    //                 .set('token', invalidToken)
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(403)
    //                     expect(res.body.errors[0]).to.equal('Please login first')
    //                     done()
    //                 })
    //         })
    //     })

    //     describe('fail delete a product to cart if product id does not exist', function () {
    //         it('Should return an array of errors message with status code 403', function (done) {
    //             chai.request(app)
    //                 .delete(`/carts/product/${product._id}`)
    //                 .set('token', usertoken)
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(404)
    //                     expect(res.body.errors[0]).to.equal('Product id is invalid!')
    //                     done()
    //                 })
    //         })
    //     })

    //     describe('success delete a product from cart', function () {
    //         it('should return an object with status code 200', function (done) {
    //             chai.request(app)
    //                 .delete(`/carts/product/${product._id}`)
    //                 .set('token', usertoken)
    //                 .end(function (err, res) {
    //                     expect(err).to.be.null
    //                     expect(res).to.have.status(200)
    //                     expect(res).to.be.an('object')
    //                     done()
    //                 })
    //         })
    //     })
    // })

    describe('DELETE /carts/:id', function () {
        describe('there is no token access', function () {
            it('Should return an array of errors message with status code 403', function (done) {
                chai.request(app)
                    .delete(`/carts/${cart._id}`)
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
                    .delete(`/carts/${cart._id}`)
                    .set('token', invalidToken)
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(403)
                        expect(res.body.errors[0]).to.equal('Please login first')
                        done()
                    })
            })
        })

        describe("success delete a cart", function () {
            it('should return an object', function (done) {
                chai.request(app)
                    .delete(`/carts/${cart._id}`)
                    .set('token', usertoken)
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