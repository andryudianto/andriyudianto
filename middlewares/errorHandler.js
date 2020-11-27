module.exports = function errorHandler(error, req, res, next) {
    console.log(error)
    let statusCode = 500
    let message = "Internal Server Error!"
    switch (error.name) {
        case "JsonWebTokenError":
            statusCode = 401
            message = 'Failed to Authenticate'
            break;
        case 'NotFoundError':
        case 'ForbiddenError':
        case 'UnauthorizedError':
        case 'BadRequestError': 
            statusCode = error.statusCode
            message = error.message
            break;
        default:
            statusCode
            message
            break;
    }
    res.status(statusCode).json({message})
}