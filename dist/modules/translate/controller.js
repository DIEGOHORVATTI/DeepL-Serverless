"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticateUserController", {
    enumerable: true,
    get: function() {
        return authenticateUserController;
    }
});
const _service = require("./service");
const authenticateUserController = async (req, res)=>{
    const text = await (0, _service.serviceTranslatte)(req.body);
    res.json(text);
};

//# sourceMappingURL=controller.js.map