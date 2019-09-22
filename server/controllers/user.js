
const User = require('../models/user')
const { generateToken, verifyToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcryptjs')

class UserController {
    static register(req, res, next) {
        let { email, password } = req.body

        User.create({ email, password })
            .then(user => {
                const token = generateToken({
                    userId: user._id,
                    email
                })

                res.status(201).json({ token })
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(user => {
                if (user && compareHash(password, user.password)) {
                    const token = generateToken({
                        userId: user._id,
                        role: user.role,
                        email
                    })

                    res.status(200).json({ token, role: user.role })
                } else next({
                    status: 403,
                    message: `Invalid username / password!`
                })
            })
            .catch(next)
    }

    static checkToken(req, res, next) {
        const { token } = req.headers
            
        try {
            req.decode = verifyToken(token)
            if (req.decode.role === 'admin') res.status(200).json({ isLogin: true, isAdmin: true })
            else res.status(200).json({ isLogin: true, isAdmin: false })
        } catch (err) { next({ status: 403, message: `Access token is invalid!` }) }
    }
}

module.exports = UserController