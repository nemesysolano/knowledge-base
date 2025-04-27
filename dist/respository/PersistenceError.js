"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceError = void 0;
class PersistenceError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    getErrorCode() {
        return this.errorCode;
    }
}
exports.PersistenceError = PersistenceError;
