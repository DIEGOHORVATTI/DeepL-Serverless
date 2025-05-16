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
    translatte: function() {
        return translatte;
    },
    translatte1: function() {
        return translatte1;
    }
});
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const translatte1 = async ({ text, from, to })=>{
    const baseURL = 'https://www2.deepl.com';
    const urlMethod = 'LMT_handle_texts';
    const urlFull = `${baseURL}/jsonrpc?client=chrome-extension,1.28.0&method=${encodeURIComponent(urlMethod)}`;
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'DeepLBrowserExtension/1.28.0 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        Authorization: 'None',
        'Cache-Control': 'no-cache',
        Origin: 'chrome-extension://cofdbpoegempjloogbagkncekinflcnj',
        Referer: 'https://www.deepl.com/'
    };
    const postData = {
        jsonrpc: '2.0',
        method: urlMethod,
        id: 1,
        params: {
            splitting: 'newlines',
            lang: {
                source_lang_user_selected: from.toUpperCase(),
                target_lang: to.toUpperCase()
            },
            texts: [
                {
                    text,
                    requestAlternatives: 3
                }
            ],
            timestamp: Date.now()
        }
    };
    try {
        const response = await _axios.default.post(urlFull, postData, {
            headers
        });
        const translation = response.data?.result?.texts?.[0]?.text ?? '';
        return translation;
    } catch (error) {
        if (_axios.default.isAxiosError(error)) {
            console.error('Erro na tradução:', error.response?.data);
        }
        throw new Error('Erro ao traduzir texto.');
    }
};
const translatte = async ({ text, from, to })=>{
    const payload = {
        jsonrpc: '2.0',
        method: 'LMT_handle_jobs',
        params: {
            jobs: [
                {
                    kind: 'default',
                    sentences: [
                        {
                            text: text,
                            id: 1,
                            prefix: ''
                        }
                    ],
                    raw_en_context_before: [],
                    raw_en_context_after: [],
                    preferred_num_beams: 4
                }
            ],
            lang: {
                target_lang: from,
                preference: {
                    weight: {},
                    default: 'default'
                },
                source_lang_computed: to
            },
            priority: -1,
            commonJobParams: {
                quality: 'fast',
                mode: 'translate',
                browserType: 1,
                textType: 'plaintext'
            },
            timestamp: Date.now()
        },
        id: Math.floor(Math.random() * 1e8)
    };
    const response = await fetch('https://www2.deepl.com/jsonrpc?method=LMT_handle_jobs', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
            Referer: `https://www.deepl.com/translator#${from}/${to}/${encodeURIComponent(text)}`
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();
    console.log(data);
    return 'ok';
};

//# sourceMappingURL=translatte.js.map