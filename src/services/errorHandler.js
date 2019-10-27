export class ExtendedError extends Error {
    constructor(status, code, message) {
        super();

        this.message = message || "Oops, something went wrong.";
        this.code = code || "INTERNAL_SERVER_ERR"
        this.status = status || 500;
    }
}

export class UnauthorizeError extends ExtendedError {
    constructor(message) {
        super(401, "ERR_UNAUTHORIZED", message || "Token is not provided");
    }
}

export class TokenExpiredError extends ExtendedError {
    constructor(message) {
        super(401, "ERR_AUTH_TOKEN_EXPIRED", message || "Token has expired");
    }
}

export class ValidationError extends ExtendedError {
    constructor(message, details) {
        super(400, "ERR_VALIDATION", message || "Validation Failed");

        if(details) {
            this.details = details;
        }
    }
}

export class ApproveError extends ExtendedError {
    constructor(message) {
        super(400, "ERR_CANNOT_APPROVE", message || "Cannot approve a payment that has already been cancelled");
    }
}

export class CancelError extends ExtendedError {
    constructor(message) {
        super(400, "ERR_CANNOT_CANCEL", message || "Cannot cancel a payment that has already been approved");
    }
}

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ExtendedError) {
        let errObject = { code: err.code, message: err.message };

        if(err.details) {
            errObject.details = err.details;
        }

        res.status(err.status).send(errObject);
        return;
    }

    next(err);
}