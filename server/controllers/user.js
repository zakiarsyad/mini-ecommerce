
const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
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

                res.status(201).json({ token, role })
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
}

module.exports = UserController