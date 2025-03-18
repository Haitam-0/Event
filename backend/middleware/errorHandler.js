const { constants } = require("../constantHandler");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; 
    
    // Ensure the correct status code is set before sending the response
    res.status(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "VALIDATION FAILED",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.json({
                title: "NOT FOUND",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.FORBIDDEN: // ✅ Fixed the typo
            res.json({
                title: "FORBIDDEN",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.json({
                title: "SERVER ERROR",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            next(); // Let other middleware handle it if there's no error
            break;
    }
};

module.exports = errorHandler;
