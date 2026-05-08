"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = generateSignature;
exports.verifySignature = verifySignature;
const crypto_1 = require("crypto");
function generateSignature(data) {
    const secret = process.env.HMAC_SECRET || 'default-secret';
    const sorted = Object.keys(data)
        .sort()
        .map((key) => `${key}=${data[key]}`)
        .join('&');
    return (0, crypto_1.createHmac)('sha256', secret).update(sorted).digest('hex');
}
function verifySignature(data, signature) {
    const expected = generateSignature(data);
    return expected === signature;
}
//# sourceMappingURL=signature.util.js.map