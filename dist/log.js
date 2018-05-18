"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const reqContext = __importStar(require("./requestContext"));
function getContext() {
    // note: this is a shallow copy
    return Object.assign({}, reqContext.get());
}
function isDebugEnabled() {
    // disable debug logging by default, but allow override via env variables
    // or if enabled via forwarded request context
    return process.env.DEBUG_LOG === "true" ||
        reqContext.get()["Debug-Log-Enabled"] === "true";
}
function log(level, msg, params) {
    if (level === "DEBUG" && !isDebugEnabled()) {
        return;
    }
    const logMsg = getContext();
    logMsg.level = level;
    logMsg.message = msg;
    logMsg.params = params;
    console.log(JSON.stringify(logMsg));
}
exports.debug = (msg, params) => log("DEBUG", msg, params);
exports.info = (msg, params) => log("INFO", msg, params);
exports.warn = (msg, params) => log("WARN", msg, params);
exports.error = (msg, params) => log("ERROR", msg, params);
