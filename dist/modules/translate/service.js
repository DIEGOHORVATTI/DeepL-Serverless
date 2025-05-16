"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    TranslatteSchema: function() {
        return TranslatteSchema;
    },
    serviceTranslatte: function() {
        return serviceTranslatte;
    }
});
const _languages = require("./shared/languages");
const _translatte = require("./shared/translatte");
const _zod = /*#__PURE__*/ _interop_require_wildcard(require("zod"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const TranslatteSchema = _zod.object({
    text: _zod.string(),
    to: _zod.enum(Object.keys(_languages.langs)),
    from: _zod.enum(Object.keys(_languages.langs)).optional()
});
const MAX_RETRIES = 3;
const serviceTranslatte = async (data)=>{
    const { text, to, from = 'auto' } = TranslatteSchema.parse(data);
    let attempts = 0;
    while(attempts < MAX_RETRIES){
        try {
            const translatedText = await (0, _translatte.translatte)({
                text,
                to,
                from
            });
            return translatedText;
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);
        }
    }
    return text;
};

//# sourceMappingURL=service.js.map