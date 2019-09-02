var hexcase = 0,
    b64pad = "",
    chrsz = 8;

function hex_md5(d) {
    return binl2hex(core_md5(str2binl(d), d.length * chrsz))
}

function b64_md5(d) {
    return binl2b64(core_md5(str2binl(d), d.length * chrsz))
}

function str_md5(d) {
    return binl2str(core_md5(str2binl(d), d.length * chrsz))
}

function hex_hmac_md5(d, r) {
    return binl2hex(core_hmac_md5(d, r))
}

function b64_hmac_md5(d, r) {
    return binl2b64(core_hmac_md5(d, r))
}

function str_hmac_md5(d, r) {
    return binl2str(core_hmac_md5(d, r))
}

function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}

function core_md5(d, r) {
    d[r >> 5] |= 128 << r % 32, d[14 + (r + 64 >>> 9 << 4)] = r;
    for (var _ = 1732584193, m = -271733879, n = -1732584194, h = 271733878, f = 0; f < d.length; f += 16) {
        var t = _,
            i = m,
            c = n,
            e = h;
        m = md5_ii(m = md5_ii(m = md5_ii(m = md5_ii(m = md5_hh(m = md5_hh(m = md5_hh(m = md5_hh(m = md5_gg(m = md5_gg(m =
                            md5_gg(m = md5_gg(m = md5_ff(m = md5_ff(m = md5_ff(m = md5_ff(m, n =
                                                md5_ff(n, h = md5_ff(h, _ = md5_ff(_, m, n,
                                                            h, d[f + 0], 7, -680876936), m,
                                                        n, d[f + 1], 12, -389564586), _, m,
                                                    d[f + 2], 17, 606105819), h, _, d[f + 3],
                                                22, -1044525330), n = md5_ff(n, h = md5_ff(
                                                    h, _ = md5_ff(_, m, n, h, d[f + 4], 7,
                                                        -176418897), m, n, d[f + 5], 12,
                                                    1200080426), _, m, d[f + 6], 17, -
                                                1473231341), h, _, d[f + 7], 22, -45705983), n =
                                            md5_ff(n, h = md5_ff(h, _ = md5_ff(_, m, n, h, d[f +
                                                    8], 7, 1770035416), m, n, d[f + 9], 12,
                                                -1958414417), _, m, d[f + 10], 17, -42063), h,
                                            _, d[f + 11], 22, -1990404162), n = md5_ff(n, h =
                                            md5_ff(h, _ = md5_ff(_, m, n, h, d[f + 12], 7,
                                                1804603682), m, n, d[f + 13], 12, -40341101), _,
                                            m, d[f + 14], 17, -1502002290), h, _, d[f + 15], 22,
                                        1236535329), n = md5_gg(n, h = md5_gg(h, _ = md5_gg(_,
                                        m, n, h, d[f + 1], 5, -165796510), m, n, d[f +
                                        6], 9, -1069501632), _, m, d[f + 11], 14, 643717713), h,
                                    _, d[f + 0], 20, -373897302), n = md5_gg(n, h = md5_gg(h, _ =
                                    md5_gg(_, m, n, h, d[f + 5], 5, -701558691), m, n, d[f +
                                        10], 9, 38016083), _, m, d[f + 15], 14, -660478335), h,
                                _, d[f + 4], 20, -405537848), n = md5_gg(n, h = md5_gg(h, _ =
                                md5_gg(_, m, n, h, d[f + 9], 5, 568446438), m, n, d[f + 14],
                                9, -1019803690), _, m, d[f + 3], 14, -187363961), h, _, d[f + 8],
                            20, 1163531501), n = md5_gg(n, h = md5_gg(h, _ = md5_gg(_, m, n, h,
                                d[f + 13], 5, -1444681467), m, n, d[f + 2], 9, -51403784), _, m,
                            d[f + 7], 14, 1735328473), h, _, d[f + 12], 20, -1926607734), n =
                        md5_hh(n, h = md5_hh(h, _ = md5_hh(_, m, n, h, d[f + 5], 4, -378558), m, n,
                            d[f + 8], 11, -2022574463), _, m, d[f + 11], 16, 1839030562), h, _, d[f +
                            14], 23, -35309556), n = md5_hh(n, h = md5_hh(h, _ = md5_hh(_, m, n, h,
                        d[f + 1], 4, -1530992060), m, n, d[f + 4], 11, 1272893353), _, m, d[f +
                        7], 16, -155497632), h, _, d[f + 10], 23, -1094730640), n = md5_hh(n, h =
                        md5_hh(h, _ = md5_hh(_, m, n, h, d[f + 13], 4, 681279174), m, n, d[f + 0], 11,
                            -358537222), _, m, d[f + 3], 16, -722521979), h, _, d[f + 6], 23, 76029189), n =
                    md5_hh(n, h = md5_hh(h, _ = md5_hh(_, m, n, h, d[f + 9], 4, -640364487), m, n, d[f + 12],
                        11, -421815835), _, m, d[f + 15], 16, 530742520), h, _, d[f + 2], 23, -995338651),
                n = md5_ii(n, h = md5_ii(h, _ = md5_ii(_, m, n, h, d[f + 0], 6, -198630844), m, n, d[f + 7],
                    10, 1126891415), _, m, d[f + 14], 15, -1416354905), h, _, d[f + 5], 21, -57434055), n =
            md5_ii(n, h = md5_ii(h, _ = md5_ii(_, m, n, h, d[f + 12], 6, 1700485571), m, n, d[f + 3], 10, -
                1894986606), _, m, d[f + 10], 15, -1051523), h, _, d[f + 1], 21, -2054922799), n = md5_ii(n,
            h = md5_ii(h, _ = md5_ii(_, m, n, h, d[f + 8], 6, 1873313359), m, n, d[f + 15], 10, -30611744),
            _, m, d[f + 6], 15, -1560198380), h, _, d[f + 13], 21, 1309151649), n = md5_ii(n, h = md5_ii(h, _ =
                md5_ii(_, m, n, h, d[f + 4], 6, -145523070), m, n, d[f + 11], 10, -1120210379), _, m, d[f + 2],
            15, 718787259), h, _, d[f + 9], 21, -343485551), _ = safe_add(_, t), m = safe_add(m, i), n = safe_add(n,
            c), h = safe_add(h, e)
    }
    return Array(_, m, n, h)
}

function md5_cmn(d, r, _, m, n, h) {
    return safe_add(bit_rol(safe_add(safe_add(r, d), safe_add(m, h)), n), _)
}

function md5_ff(d, r, _, m, n, h, f) {
    return md5_cmn(r & _ | ~r & m, d, r, n, h, f)
}

function md5_gg(d, r, _, m, n, h, f) {
    return md5_cmn(r & m | _ & ~m, d, r, n, h, f)
}

function md5_hh(d, r, _, m, n, h, f) {
    return md5_cmn(r ^ _ ^ m, d, r, n, h, f)
}

function md5_ii(d, r, _, m, n, h, f) {
    return md5_cmn(_ ^ (r | ~m), d, r, n, h, f)
}

function core_hmac_md5(d, r) {
    var _ = str2binl(d);
    16 < _.length && (_ = core_md5(_, d.length * chrsz));
    for (var m = Array(16), n = Array(16), h = 0; h < 16; h++) m[h] = 909522486 ^ _[h], n[h] = 1549556828 ^ _[h];
    var f = core_md5(m.concat(str2binl(r)), 512 + r.length * chrsz);
    return core_md5(n.concat(f), 640)
}

function safe_add(d, r) {
    var _ = (65535 & d) + (65535 & r);
    return (d >> 16) + (r >> 16) + (_ >> 16) << 16 | 65535 & _
}

function bit_rol(d, r) {
    return d << r | d >>> 32 - r
}

function str2binl(d) {
    for (var r = Array(), _ = (1 << chrsz) - 1, m = 0; m < d.length * chrsz; m += chrsz) r[m >> 5] |= (d.charCodeAt(m /
        chrsz) & _) << m % 32;
    return r
}

function binl2str(d) {
    for (var r = "", _ = (1 << chrsz) - 1, m = 0; m < 32 * d.length; m += chrsz) r += String.fromCharCode(d[m >> 5] >>>
        m % 32 & _);
    return r
}

function binl2hex(d) {
    for (var r = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", _ = "", m = 0; m < 4 * d.length; m++) _ += r.charAt(
        d[m >> 2] >> m % 4 * 8 + 4 & 15) + r.charAt(d[m >> 2] >> m % 4 * 8 & 15);
    return _
}

function binl2b64(d) {
    for (var r = "", _ = 0; _ < 4 * d.length; _ += 3)
        for (var m = (d[_ >> 2] >> _ % 4 * 8 & 255) << 16 | (d[_ + 1 >> 2] >> (_ + 1) % 4 * 8 & 255) << 8 | d[_ + 2 >>
                2] >> (_ + 2) % 4 * 8 & 255, n = 0; n < 4; n++) 8 * _ + 6 * n > 32 * d.length ? r += b64pad : r +=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(m >> 6 * (3 - n) & 63);
    return r
}

function formatUnit(r, e) {
    var t = 2;
    if (e && (t = e), r && null != r) {
        var n = (r = String(r)).split("."),
            i = n[0],
            a = n[1] ? n[1].substring(0, t) : void 0,
            o = a || "";
        if (a)
            for (var s = 0; s < t - o.length; s++) a += "0";
        var c = "";
        for (s = 0; s < t; s++) c += "0";
        return i + "." + (a || c)
    }
    for (c = "", s = 0; s < t; s++) c += "0";
    return "0." + c
}


var prams = {"goodsId":"SG002170","tradeId":"000257","plateId":"000140","fs":2,"num":"21","price":"5610.00","sign":"11ef1fb588a95d6717786612b491f772"}
// var prams = {"goodsId":"SG002170","tradeId":"000257","plateId":"000140","fs":2,"num":"20","price":"5605.00","sign":"56dbef05bf30f2cef248786dd54889af"}
var tradeId = prams.tradeId
var plateId = prams.plateId
var goodsId = prams.goodsId
var optUserid = 'YJ8921G'
var hydm = 'YJ8921G'

var formInfo={}
formInfo.num = prams.num
formInfo.price = prams.price

var e = +formInfo.num;
e = formatUnit(e);
log("e",e)
var r = +formInfo.price;
r = formatUnit(r);
log("r",r)

         log("" + tradeId + r + optUserid + plateId + hydm + goodsId + e)
log( hex_md5("" + tradeId + r + optUserid + plateId + hydm + goodsId + e) )
