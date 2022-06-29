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
export const TEXT = 'TEXT';
/** @type {?} */
export const CURLY_BRACE_OPEN = 'CURLY_BRACE_OPEN';
/** @type {?} */
export const CURLY_BRACE_CLOSE = 'CURLY_BRACE_CLOSE';
/** @type {?} */
export const COMMA = 'COMMA';
/** @type {?} */
export const PLURAL = 'PLURAL';
/** @type {?} */
export const SELECT = 'SELECT';
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
const STATE_DEFAULT = 'default';
/** @type {?} */
const STATE_NORMAL = 'normal';
/** @type {?} */
const STATE_IN_MESSAGE = 'in_message';
export class ICUMessageTokenizer {
    /**
     * @private
     * @return {?}
     */
    getLexer() {
        /** @type {?} */
        const lexer = new Tokenizr();
        /** @type {?} */
        let plaintext = '';
        /** @type {?} */
        let openedCurlyBracesInTextCounter = 0;
        lexer.before((/**
         * @param {?} ctx
         * @param {?} match
         * @param {?} rule
         * @return {?}
         */
        (ctx, match, rule) => {
            if (rule.name !== TEXT) {
                if (this.containsNonWhiteSpace(plaintext)) {
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
        (ctx) => {
            if (this.containsNonWhiteSpace(plaintext)) {
                ctx.accept(TEXT, plaintext);
            }
        }));
        // curly brace
        lexer.rule(STATE_DEFAULT, /{/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_NORMAL);
        }), CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /{/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_IN_MESSAGE);
        }), CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /}/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.pop();
            ctx.accept(CURLY_BRACE_CLOSE, match[0]);
        }), CURLY_BRACE_CLOSE);
        // masked ' { and }
        lexer.rule(STATE_IN_MESSAGE, /'[{}]?'/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
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
        (ctx, match) => {
            /** @type {?} */
            const char = match[0];
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
        (ctx, match) => {
            ctx.accept(COMMA, match[0]);
        }), COMMA);
        // keywords plural and select
        lexer.rule(STATE_NORMAL, /plural/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(PLURAL, match[0]);
        }), PLURAL);
        lexer.rule(STATE_NORMAL, /select/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(SELECT, match[0]);
        }), SELECT);
        // text
        lexer.rule(/./, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT);
        lexer.rule(/[\s]+/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT);
        return lexer;
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    containsNonWhiteSpace(text) {
        for (let i = 0; i < text.length; i++) {
            if (!/\s/.test(text.charAt(i))) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    tokenize(normalizedMessage) {
        /** @type {?} */
        const lexer = this.getLexer();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    }
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    input(normalizedMessage) {
        this.lexer = this.getLexer();
        this.lexer.input(normalizedMessage);
    }
    /**
     * @return {?}
     */
    next() {
        return this.lexer.token();
    }
    /**
     * @return {?}
     */
    peek() {
        return this.lexer.peek();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ICUMessageTokenizer.prototype.lexer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWN1LW1lc3NhZ2UtdG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9pY3UtbWVzc2FnZS10b2tlbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sVUFBVSxDQUFDOzs7Ozs7O0FBUXJDLE1BQU0sT0FBTyxJQUFJLEdBQUcsTUFBTTs7QUFDMUIsTUFBTSxPQUFPLGdCQUFnQixHQUFHLGtCQUFrQjs7QUFDbEQsTUFBTSxPQUFPLGlCQUFpQixHQUFHLG1CQUFtQjs7QUFDcEQsTUFBTSxPQUFPLEtBQUssR0FBRyxPQUFPOztBQUM1QixNQUFNLE9BQU8sTUFBTSxHQUFHLFFBQVE7O0FBQzlCLE1BQU0sT0FBTyxNQUFNLEdBQUcsUUFBUTs7OztBQUU5Qiw4QkFHQzs7O0lBRkcsd0JBQWE7O0lBQ2IseUJBQVc7Ozs7TUFJVCxhQUFhLEdBQUcsU0FBUzs7TUFDekIsWUFBWSxHQUFHLFFBQVE7O01BQ3ZCLGdCQUFnQixHQUFHLFlBQVk7QUFFckMsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFHcEIsUUFBUTs7Y0FDTixLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7O1lBQ3hCLFNBQVMsR0FBRyxFQUFFOztZQUNkLDhCQUE4QixHQUFHLENBQUM7UUFDdEMsS0FBSyxDQUFDLE1BQU07Ozs7OztRQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNwQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzVCLFNBQVMsR0FBRyxFQUFFLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNILEdB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S0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7Q0FDSjs7Ozs7O0lBckhHLG9DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRva2VuaXpyIGZyb20gJ3Rva2VuaXpyJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNC4wNi4yMDE3LlxyXG4gKiBBIHRva2VuaXplciBmb3IgSUNVIG1lc3NhZ2VzLlxyXG4gKi9cclxuXHJcbi8vIFRva2Vuc1xyXG5leHBvcnQgY29uc3QgVEVYVCA9ICdURVhUJztcclxuZXhwb3J0IGNvbnN0IENVUkxZX0JSQUNFX09QRU4gPSAnQ1VSTFlfQlJBQ0VfT1BFTic7XHJcbmV4cG9ydCBjb25zdCBDVVJMWV9CUkFDRV9DTE9TRSA9ICdDVVJMWV9CUkFDRV9DTE9TRSc7XHJcbmV4cG9ydCBjb25zdCBDT01NQSA9ICdDT01NQSc7XHJcbmV4cG9ydCBjb25zdCBQTFVSQUwgPSAnUExVUkFMJztcclxuZXhwb3J0IGNvbnN0IFNFTEVDVCA9ICdTRUxFQ1QnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ1VUb2tlbiB7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG59XHJcblxyXG4vLyBzdGF0ZXM6IGRlZmF1bHQgbm9ybWFsIGluX21lc3NhZ2VcclxuY29uc3QgU1RBVEVfREVGQVVMVCA9ICdkZWZhdWx0JztcclxuY29uc3QgU1RBVEVfTk9STUFMID0gJ25vcm1hbCc7XHJcbmNvbnN0IFNUQVRFX0lOX01FU1NBR0UgPSAnaW5fbWVzc2FnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSUNVTWVzc2FnZVRva2VuaXplciB7XHJcbiAgICBwcml2YXRlIGxleGVyOiBUb2tlbml6cjtcclxuXHJcbiAgICBwcml2YXRlIGdldExleGVyKCk6IFRva2VuaXpyIHtcclxuICAgICAgICBjb25zdCBsZXhlciA9IG5ldyBUb2tlbml6cigpO1xyXG4gICAgICAgIGxldCBwbGFpbnRleHQgPSAnJztcclxuICAgICAgICBsZXQgb3BlbmVkQ3VybHlCcmFjZXNJblRleHRDb3VudGVyID0gMDtcclxuICAgICAgICBsZXhlci5iZWZvcmUoKGN0eCwgbWF0Y2gsIHJ1bGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJ1bGUubmFtZSAhPT0gVEVYVCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbnNOb25XaGl0ZVNwYWNlKHBsYWludGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHguYWNjZXB0KFRFWFQsIHBsYWludGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhaW50ZXh0ID0gJyc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5pZ25vcmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxleGVyLmZpbmlzaCgoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhaW5zTm9uV2hpdGVTcGFjZShwbGFpbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYWNjZXB0KFRFWFQsIHBsYWludGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY3VybHkgYnJhY2VcclxuICAgICAgICBsZXhlci5ydWxlKFNUQVRFX0RFRkFVTFQsIC97LywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChDVVJMWV9CUkFDRV9PUEVOLCBtYXRjaFswXSk7XHJcbiAgICAgICAgICAgIGN0eC5wdXNoKFNUQVRFX05PUk1BTCk7XHJcbiAgICAgICAgfSwgQ1VSTFlfQlJBQ0VfT1BFTik7XHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9OT1JNQUwsIC97LywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChDVVJMWV9CUkFDRV9PUEVOLCBtYXRjaFswXSk7XHJcbiAgICAgICAgICAgIGN0eC5wdXNoKFNUQVRFX0lOX01FU1NBR0UpO1xyXG4gICAgICAgIH0sIENVUkxZX0JSQUNFX09QRU4pO1xyXG4gICAgICAgIGxleGVyLnJ1bGUoU1RBVEVfTk9STUFMLCAvfS8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGN0eC5wb3AoKTtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChDVVJMWV9CUkFDRV9DTE9TRSwgbWF0Y2hbMF0pO1xyXG4gICAgICAgIH0sIENVUkxZX0JSQUNFX0NMT1NFKTtcclxuICAgICAgICAvLyBtYXNrZWQgJyB7IGFuZCB9XHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9JTl9NRVNTQUdFLCAvJ1t7fV0/Jy8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaFswXSA9PT0gJ1xcJ1xcJycpIHtcclxuICAgICAgICAgICAgICAgIHBsYWludGV4dCArPSAnXFwnJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFswXSA9PT0gJ1xcJ3tcXCcnKSB7XHJcbiAgICAgICAgICAgICAgICBwbGFpbnRleHQgKz0gJ3snO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzBdID09PSAnXFwnfVxcJycpIHtcclxuICAgICAgICAgICAgICAgIHBsYWludGV4dCArPSAnfSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgIH0sIFRFWFQpO1xyXG4gICAgICAgIGxleGVyLnJ1bGUoU1RBVEVfSU5fTUVTU0FHRSwgLy4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyID0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgIGlmIChjaGFyID09PSAneycpIHtcclxuICAgICAgICAgICAgICAgIG9wZW5lZEN1cmx5QnJhY2VzSW5UZXh0Q291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgcGxhaW50ZXh0ICs9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXIgPT09ICd9Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW5lZEN1cmx5QnJhY2VzSW5UZXh0Q291bnRlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuZWRDdXJseUJyYWNlc0luVGV4dENvdW50ZXItLTtcclxuICAgICAgICAgICAgICAgICAgICBwbGFpbnRleHQgKz0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjdHgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmFjY2VwdChURVhULCBwbGFpbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYWludGV4dCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5hY2NlcHQoQ1VSTFlfQlJBQ0VfQ0xPU0UsIG1hdGNoWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYWludGV4dCArPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgICAgIGN0eC5pZ25vcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIFRFWFQpO1xyXG4gICAgICAgIC8vIGNvbW1hXHJcbiAgICAgICAgbGV4ZXIucnVsZShTVEFURV9OT1JNQUwsIC8sLywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChDT01NQSwgbWF0Y2hbMF0pO1xyXG4gICAgICAgIH0sIENPTU1BKTtcclxuICAgICAgICAvLyBrZXl3b3JkcyBwbHVyYWwgYW5kIHNlbGVjdFxyXG4gICAgICAgIGxleGVyLnJ1bGUoU1RBVEVfTk9STUFMLCAvcGx1cmFsLywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChQTFVSQUwsIG1hdGNoWzBdKTtcclxuICAgICAgICB9LCBQTFVSQUwpO1xyXG4gICAgICAgIGxleGVyLnJ1bGUoU1RBVEVfTk9STUFMLCAvc2VsZWN0LywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChTRUxFQ1QsIG1hdGNoWzBdKTtcclxuICAgICAgICB9LCBTRUxFQ1QpO1xyXG4gICAgICAgIC8vIHRleHRcclxuICAgICAgICBsZXhlci5ydWxlKC8uLywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgcGxhaW50ZXh0ICs9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICBjdHguaWdub3JlKCk7XHJcbiAgICAgICAgfSwgVEVYVCk7XHJcbiAgICAgICAgbGV4ZXIucnVsZSgvW1xcc10rLywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgcGxhaW50ZXh0ICs9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICBjdHguaWdub3JlKCk7XHJcbiAgICAgICAgfSwgVEVYVCk7XHJcbiAgICAgICAgcmV0dXJuIGxleGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29udGFpbnNOb25XaGl0ZVNwYWNlKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIS9cXHMvLnRlc3QodGV4dC5jaGFyQXQoaSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdG9rZW5pemUobm9ybWFsaXplZE1lc3NhZ2U6IHN0cmluZyk6IElDVVRva2VuW10ge1xyXG4gICAgICAgIGNvbnN0IGxleGVyOiBUb2tlbml6ciA9IHRoaXMuZ2V0TGV4ZXIoKTtcclxuICAgICAgICBsZXhlci5pbnB1dChub3JtYWxpemVkTWVzc2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIGxleGVyLnRva2VucygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0KG5vcm1hbGl6ZWRNZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmxleGVyID0gdGhpcy5nZXRMZXhlcigpO1xyXG4gICAgICAgIHRoaXMubGV4ZXIuaW5wdXQobm9ybWFsaXplZE1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKTogSUNVVG9rZW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxleGVyLnRva2VuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGVlaygpOiBJQ1VUb2tlbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGV4ZXIucGVlaygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==