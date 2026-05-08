"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAnonymousId = generateAnonymousId;
exports.generateInvitationCode = generateInvitationCode;
const crypto_1 = require("crypto");
function generateAnonymousId() {
    const prefix = 'P';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = (0, crypto_1.randomBytes)(3).toString('hex').toUpperCase();
    return `${prefix}${timestamp}${random}`;
}
function generateInvitationCode() {
    return (0, crypto_1.randomBytes)(4).toString('hex').toUpperCase();
}
//# sourceMappingURL=anonymize.util.js.map