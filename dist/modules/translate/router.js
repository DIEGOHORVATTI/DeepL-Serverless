"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _middlewares = require("../../middlewares");
const _controller = require("./controller");
const router = (0, _express.Router)();
router.post('/', (0, _middlewares.endpoint)(_controller.authenticateUserController));
const _default = router;

//# sourceMappingURL=router.js.map