
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

describe('Product', function () {
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
                        productName: 'Test product',
                        price: 10000,
                        category: 'Test sategory',
                        stock: 10,
                        image: 'no image',
                        userId: "5d84d38075035c4d334b663c"
                    })
                    // .attach('image', fs.readFileSync('./hactiv8.jpg'), 'hactiv8.jpg')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        done()
                    })
            })
        })

        describe('fail add a product', function () {
            it('Should return an error with status code 500', function (done) {
                chai.request(app)
                .post('/products')
                .set('token', token)
                .send({
                    productName: '',
                    price: '',
                    category: '',
                    stock: '',
                })
                .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(500)
                        done()
                    })
            })
        })
    })

    describe('GET /product/:id', function () {
        describe('success get single product', function () {
            it('should return an object of product', function (done) {
                chai.request(app)
                    .get(`/product/${productId}`)
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

    describe('PATCH /product/:id', function () {
        describe('success edit a product', function () {
            it('should return an object of product', function (done) {
                chai.request(app)
                    .patch(`/product/${productId}`)
                    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDgwM2YzZTI1ODEyNzIxYzBmYTZkZGYiLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1Njg2ODU4ODd9.3Qbj76Fe57D527a-nqs-Z5UQtxUt8Fzik2sDxqrjd7g')
                    .send({
                        productName: 'Test product update',
                        price: 10000,
                        category: 'Test sategory update',
                        stock: 10,
                    })
                    .attach('image', fs.readFileSync('hactiv8.jpg'), 'hactiv8.jpg')
                    .end(function (err, res) {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        done()
                    })
            })
        })
    })

    describe('PATCH /product/:id', function () {
        describe('success edit a product', function () {
            it('should return an object of product', function (done) {
                chai.request(app)
                    .patch(`/product/${productId}`)
                    .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDgwM2YzZTI1ODEyNzIxYzBmYTZkZGYiLCJlbWFpbCI6Inpha2lAbWFpbC5jb20iLCJpYXQiOjE1Njg2ODU4ODd9.3Qbj76Fe57D527a-nqs-Z5UQtxUt8Fzik2sDxqrjd7g')
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