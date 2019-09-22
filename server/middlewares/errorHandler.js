
module.exports = (err, req, res, next) => {
    let status
    let message
    let errors = []

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        status = 401
        message = err.message

        errors = [ message ]
    } else if (err.name === 'ValidationError') {
        status = 400

        for (let key in err.errors) {
            errors.push(err.errors[key].message)
        }
    } else {
        status = err.status || 500
        message = err.message || `Internal server error`

        errors = [ message ]
    }
    res.status(status).json({ errors })
}