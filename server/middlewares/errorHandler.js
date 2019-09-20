
module.exports = (err, req, res, next) => {
    let status
    let message

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        status = 401
        message = err.message

        res.status(status).json({ errors: message })
    } else if (err.name === 'ValidationError') {
        const errors = []
        for (let key in err.errors) {
            errors.push(err.errors[key].message)
        }

        res.status(400).json({ errors })
    } else {
        status = err.status || 500
        message = err.message || `Internal server error`

        res.status(status).json( message )
    }
}