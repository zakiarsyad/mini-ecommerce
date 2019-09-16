
const bcryptjs = require('bcryptjs')

const hashPassword = (pass) => {
    return bcryptjs.hashSync(pass, 10)
}

const compareHash = (pass, hashedPass) => {
    return bcryptjs.compareSync(pass, hashedPass)
}

module.exports = { hashPassword, compareHash }