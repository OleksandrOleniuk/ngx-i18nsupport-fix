/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as Tokenizr from 'tokenizr';
// Tokens
/**
 * Created by martin on 04.06.2017.
 * A tokenizer for ICU messages.
 * @type {?}
 */
export var TEXT = 'TEXT';
/** @type {?} */
export var CURLY_BRACE_OPEN = 'CURLY_BRACE_OPEN';
/** @type {?} */
export var CURLY_BRACE_CLOSE = 'CURLY_BRACE_CLOSE';
/** @type {?} */
export var COMMA = 'COMMA';
/** @type {?} */
export var PLURAL = 'PLURAL';
/** @type {?} */
export var SELECT = 'SELECT';
/**
 * @record
 */
export function ICUToken() { }
if (false) {
    /** @type {?} */
    ICUToken.prototype.type;
    /** @type {?} */
    ICUToken.prototype.value;
}
// states: default normal in_message
/** @type {?} */
var STATE_DEFAULT = 'default';
/** @type {?} */
var STATE_NORMAL = 'normal';
/** @type {?} */
var STATE_IN_MESSAGE = 'in_message';
var ICUMessageTokenizer = /** @class */ (function () {
    function ICUMessageTokenizer() {
    }
    /**
     * @private
     * @return {?}
     */
    ICUMessageTokenizer.prototype.getLexer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var lexer = new Tokenizr();
        /** @type {?} */
        var plaintext = '';
        /** @type {?} */
        var openedCurlyBracesInTextCounter = 0;
        lexer.before((/**
         * @param {?} ctx
         * @param {?} match
         * @param {?} rule
         * @return {?}
         */
        function (ctx, match, rule) {
            if (rule.name !== TEXT) {
                if (_this.containsNonWhiteSpace(plaintext)) {
                    ctx.accept(TEXT, plaintext);
                    plaintext = '';
                }
                else {
                    ctx.ignore();
                }
            }
        }));
        lexer.finish((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            if (_this.containsNonWhiteSpace(plaintext)) {
                ctx.accept(TEXT, plaintext);
            }
        }));
        // curly brace
        lexer.rule(STATE_DEFAULT, /{/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_NORMAL);
        }), CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /{/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_IN_MESSAGE);
        }), CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /}/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.pop();
            ctx.accept(CURLY_BRACE_CLOSE, match[0]);
        }), CURLY_BRACE_CLOSE);
        // masked ' { and }
        lexer.rule(STATE_IN_MESSAGE, /'[{}]?'/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            if (match[0] === '\'\'') {
                plaintext += '\'';
            }
            else if (match[0] === '\'{\'') {
                plaintext += '{';
            }
            else if (match[0] === '\'}\'') {
                plaintext += '}';
            }
            ctx.ignore();
        }), TEXT);
        lexer.rule(STATE_IN_MESSAGE, /./, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            /** @type {?} */
            var char = match[0];
            if (char === '{') {
                openedCurlyBracesInTextCounter++;
                plaintext += match[0];
                ctx.ignore();
            }
            else if (char === '}') {
                if (openedCurlyBracesInTextCounter > 0) {
                    openedCurlyBracesInTextCounter--;
                    plaintext += match[0];
                    ctx.ignore();
                }
                else {
                    ctx.pop();
                    ctx.accept(TEXT, plaintext);
                    plaintext = '';
                    ctx.accept(CURLY_BRACE_CLOSE, match[0]);
                }
            }
            else {
                plaintext += match[0];
                ctx.ignore();
            }
        }), TEXT);
        // comma
        lexer.rule(STATE_NORMAL, /,/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(COMMA, match[0]);
        }), COMMA);
        // keywords plural and select
        lexer.rule(STATE_NORMAL, /plural/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(PLURAL, match[0]);
        }), PLURAL);
        lexer.rule(STATE_NORMAL, /select/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(SELECT, match[0]);
        }), SELECT);
        // text
        lexer.rule(/./, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT);
        lexer.rule(/[\s]+/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT);
        return lexer;
    };
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    ICUMessageTokenizer.prototype.containsNonWhiteSpace = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        for (var i = 0; i < text.length; i++) {
            if (!/\s/.test(text.charAt(i))) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    ICUMessageTokenizer.prototype.tokenize = /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    function (normalizedMessage) {
        /** @type {?} */
        var lexer = this.getLexer();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    };
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    ICUMessageTokenizer.prototype.input = /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    function (normalizedMessage) {
        this.lexer = this.getLexer();
        this.lexer.input(normalizedMessage);
    };
    /**
     * @return {?}
     */
    ICUMessageTokenizer.prototype.next = /**
     * @return {?}
     */
    function () {
        return this.lexer.token();
    };
    /**
     * @return {?}
     */
    ICUMessageTokenizer.prototype.peek = /**
     * @return {?}
     */
    function () {
        return this.lexer.peek();
    };
    return ICUMessageTokenizer;
}());
export { ICUMessageTokenizer };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ICUMessageTokenizer.prototype.lexer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWN1LW1lc3NhZ2UtdG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9pY3UtbWVzc2FnZS10b2tlbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sVUFBVSxDQUFDOzs7Ozs7O0FBUXJDLE1BQU0sS0FBTyxJQUFJLEdBQUcsTUFBTTs7QUFDMUIsTUFBTSxLQUFPLGdCQUFnQixHQUFHLGtCQUFrQjs7QUFDbEQsTUFBTSxLQUFPLGlCQUFpQixHQUFHLG1CQUFtQjs7QUFDcEQsTUFBTSxLQUFPLEtBQUssR0FBRyxPQUFPOztBQUM1QixNQUFNLEtBQU8sTUFBTSxHQUFHLFFBQVE7O0FBQzlCLE1BQU0sS0FBTyxNQUFNLEdBQUcsUUFBUTs7OztBQUU5Qiw4QkFHQzs7O0lBRkcsd0JBQWE7O0lBQ2IseUJBQVc7Ozs7SUFJVCxhQUFhLEdBQUcsU0FBUzs7SUFDekIsWUFBWSxHQUFHLFFBQVE7O0lBQ3ZCLGdCQUFnQixHQUFHLFlBQVk7QUFFckM7SUFBQTtJQXNIQSxDQUFDOzs7OztJQW5IVyxzQ0FBUTs7OztJQUFoQjtRQUFBLGlCQXNGQzs7WUFyRlMsS0FBSyxHQUFHLElBQUksUUFBUSxFQUFFOztZQUN4QixTQUFTLEdBQUcsRUFBRTs7WUFDZCw4QkFBOEIsR0FBRyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxNQUFNOzs7Ozs7UUFBQyxVQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSTtZQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNwQixJQUFJLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzVCLFNBQVMsR0FBRyxFQUFFLENBQUM7aUJBQ2xCO3FC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QUMsQUF0SEQsSUFzSEM7Ozs7Ozs7SUFySEcsb0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVG9rZW5penIgZnJvbSAndG9rZW5penInO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDA0LjA2LjIwMTcuXHJcbiAqIEEgdG9rZW5pemVyIGZvciBJQ1UgbWVzc2FnZXMuXHJcbiAqL1xyXG5cclxuLy8gVG9rZW5zXHJcbmV4cG9ydCBjb25zdCBURVhUID0gJ1RFWFQnO1xyXG5leHBvcnQgY29uc3QgQ1VSTFlfQlJBQ0VfT1BFTiA9ICdDVVJMWV9CUkFDRV9PUEVOJztcclxuZXhwb3J0IGNvbnN0IENVUkxZX0JSQUNFX0NMT1NFID0gJ0NVUkxZX0JSQUNFX0NMT1NFJztcclxuZXhwb3J0IGNvbnN0IENPTU1BID0gJ0NPTU1BJztcclxuZXhwb3J0IGNvbnN0IFBMVVJBTCA9ICdQTFVSQUwnO1xyXG5leHBvcnQgY29uc3QgU0VMRUNUID0gJ1NFTEVDVCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDVVRva2VuIHtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlOiBhbnk7XHJcbn1cclxuXHJcbi8vIHN0YXRlczogZGVmYXVsdCBub3JtYWwgaW5fbWVzc2FnZVxyXG5jb25zdCBTVEFURV9ERUZBVUxUID0gJ2RlZmF1bHQnO1xyXG5jb25zdCBTVEFURV9OT1JNQUwgPSAnbm9ybWFsJztcclxuY29uc3QgU1RBVEVfSU5fTUVTU0FHRSA9ICdpbl9tZXNzYWdlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJQ1VNZXNzYWdlVG9rZW5pemVyIHtcclxuICAgIHByaXZhdGUgbGV4ZXI6IFRva2VuaXpyO1xyXG5cclxuICAgIHByaXZhdGUgZ2V0TGV4ZXIoKTogVG9rZW5penIge1xyXG4gICAgICAgIGNvbnN0IGxleGVyID0gbmV3IFRva2VuaXpyKCk7XHJcbiAgICAgICAgbGV0IHBsYWludGV4dCA9ICcnO1xyXG4gICAgICAgIGxldCBvcGVuZWRDdXJseUJyYWNlc0luVGV4dENvdW50ZXIgPSAwO1xyXG4gICAgICAgIGxleGVyLmJlZm9yZSgoY3R4LCBtYXRjaCwgcnVsZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocnVsZS5uYW1lICE9PSBURVhUKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluc05vbldoaXRlU3BhY2UocGxhaW50ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5hY2NlcHQoVEVYVCwgcGxhaW50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBwbGFpbnRleHQgPSAnJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV4ZXIuZmluaXNoKChjdHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbnNOb25XaGl0ZVNwYWNlKHBsYWludGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5hY2NlcHQoVEVYVCwgcGxhaW50ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAvLyBjdXJseSBicmFjZVxyXG4gICAgICAgIGxleGVyLnJ1bGUoU1RBVEVfREVGQVVMVCwgL3svLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KENVUkxZX0JSQUNFX09QRU4sIG1hdGNoWzBdKTtcclxuICAgICAgICAgICAgY3R4LnB1c2goU1RBVEVfTk9STUFMKTtcclxuICAgICAgICB9LCBDVVJMWV9CUkFDRV9PUEVOKTtcclxuICAgICAgICBsZXhlci5ydWxlKFNUQVRFX05PUk1BTCwgL3svLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KENVUkxZX0JSQUNFX09QRU4sIG1hdGNoWzBdKTtcclxuICAgICAgICAgICAgY3R4LnB1c2goU1RBVEVfSU5fTUVTU0FHRSk7XHJcbiAgICAgICAgfSwgQ1VSTFlfQlJBQ0VfT1BFTik7XHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9OT1JNQUwsIC99LywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LnBvcCgpO1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KENVUkxZX0JSQUNFX0NMT1NFLCBtYXRjaFswXSk7XHJcbiAgICAgICAgfSwgQ1VSTFlfQlJBQ0VfQ0xPU0UpO1xyXG4gICAgICAgIC8vIG1hc2tlZCAnIHsgYW5kIH1cclxuICAgICAgICBsZXhlci5ydWxlKFNUQVRFX0lOX01FU1NBR0UsIC8nW3t9XT8nLywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1hdGNoWzBdID09PSAnXFwnXFwnJykge1xyXG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0ICs9ICdcXCcnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnXFwne1xcJycpIHtcclxuICAgICAgICAgICAgICAgIHBsYWludGV4dCArPSAneyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbMF0gPT09ICdcXCd9XFwnJykge1xyXG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0ICs9ICd9JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHguaWdub3JlKCk7XHJcbiAgICAgICAgfSwgVEVYVCk7XHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9JTl9NRVNTQUdFLCAvLi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXIgPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgaWYgKGNoYXIgPT09ICd7Jykge1xyXG4gICAgICAgICAgICAgICAgb3BlbmVkQ3VybHlCcmFjZXNJblRleHRDb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBwbGFpbnRleHQgKz0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgICAgICBjdHguaWdub3JlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhciA9PT0gJ30nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3BlbmVkQ3VybHlCcmFjZXNJblRleHRDb3VudGVyID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5lZEN1cmx5QnJhY2VzSW5UZXh0Q291bnRlci0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYWludGV4dCArPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgICAgICAgICBjdHguaWdub3JlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBjdHguYWNjZXB0KFRFWFQsIHBsYWludGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhaW50ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmFjY2VwdChDVVJMWV9CUkFDRV9DTE9TRSwgbWF0Y2hbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0ICs9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgVEVYVCk7XHJcbiAgICAgICAgLy8gY29tbWFcclxuICAgICAgICBsZXhlci5ydWxlKFNUQVRFX05PUk1BTCwgLywvLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KENPTU1BLCBtYXRjaFswXSk7XHJcbiAgICAgICAgfSwgQ09NTUEpO1xyXG4gICAgICAgIC8vIGtleXdvcmRzIHBsdXJhbCBhbmQgc2VsZWN0XHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9OT1JNQUwsIC9wbHVyYWwvLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KFBMVVJBTCwgbWF0Y2hbMF0pO1xyXG4gICAgICAgIH0sIFBMVVJBTCk7XHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9OT1JNQUwsIC9zZWxlY3QvLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KFNFTEVDVCwgbWF0Y2hbMF0pO1xyXG4gICAgICAgIH0sIFNFTEVDVCk7XHJcbiAgICAgICAgLy8gdGV4dFxyXG4gICAgICAgIGxleGVyLnJ1bGUoLy4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBwbGFpbnRleHQgKz0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgIGN0eC5pZ25vcmUoKTtcclxuICAgICAgICB9LCBURVhUKTtcclxuICAgICAgICBsZXhlci5ydWxlKC9bXFxzXSsvLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBwbGFpbnRleHQgKz0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgIGN0eC5pZ25vcmUoKTtcclxuICAgICAgICB9LCBURVhUKTtcclxuICAgICAgICByZXR1cm4gbGV4ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb250YWluc05vbldoaXRlU3BhY2UodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghL1xccy8udGVzdCh0ZXh0LmNoYXJBdChpKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0b2tlbml6ZShub3JtYWxpemVkTWVzc2FnZTogc3RyaW5nKTogSUNVVG9rZW5bXSB7XHJcbiAgICAgICAgY29uc3QgbGV4ZXI6IFRva2VuaXpyID0gdGhpcy5nZXRMZXhlcigpO1xyXG4gICAgICAgIGxleGVyLmlucHV0KG5vcm1hbGl6ZWRNZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbGV4ZXIudG9rZW5zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQobm9ybWFsaXplZE1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubGV4ZXIgPSB0aGlzLmdldExleGVyKCk7XHJcbiAgICAgICAgdGhpcy5sZXhlci5pbnB1dChub3JtYWxpemVkTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpOiBJQ1VUb2tlbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGV4ZXIudG9rZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwZWVrKCk6IElDVVRva2VuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sZXhlci5wZWVrKCk7XHJcbiAgICB9XHJcbn1cclxuIl19