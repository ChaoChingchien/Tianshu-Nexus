"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERMISSIONS_KEY = exports.Permissions = exports.ROLES_KEY = exports.Roles = exports.CurrentUser = void 0;
var current_user_decorator_1 = require("./current-user.decorator");
Object.defineProperty(exports, "CurrentUser", { enumerable: true, get: function () { return current_user_decorator_1.CurrentUser; } });
var roles_decorator_1 = require("./roles.decorator");
Object.defineProperty(exports, "Roles", { enumerable: true, get: function () { return roles_decorator_1.Roles; } });
Object.defineProperty(exports, "ROLES_KEY", { enumerable: true, get: function () { return roles_decorator_1.ROLES_KEY; } });
var permissions_decorator_1 = require("./permissions.decorator");
Object.defineProperty(exports, "Permissions", { enumerable: true, get: function () { return permissions_decorator_1.Permissions; } });
Object.defineProperty(exports, "PERMISSIONS_KEY", { enumerable: true, get: function () { return permissions_decorator_1.PERMISSIONS_KEY; } });
//# sourceMappingURL=index.js.map