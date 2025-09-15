"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoggerMiddleware = void 0;
const userLoggerMiddleware = (req, res, next) => {
    console.log(`User Route Accessed: ${req.method} ${req.path} at ${new Date().toISOString()}`);
    next();
};
exports.userLoggerMiddleware = userLoggerMiddleware;
//# sourceMappingURL=userLoggerMiddleware.js.map