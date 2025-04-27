"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const respository_1 = require("../respository");
const errorHandler = (error, request, response, next) => {
    const isCustomError = error instanceof respository_1.PersistenceError;
    const httpStatusCode = isCustomError ? error.getErrorCode() : 500;
    response.status(httpStatusCode).send({
        error: error.message,
    });
};
exports.errorHandler = errorHandler;
