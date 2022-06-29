/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as Tokenizr from 'tokenizr';
import { isNullOrUndefined } from 'util';
// Tokens
/**
 * Created by martin on 14.05.2017.
 * A tokenizer for normalized messages.
 * @type {?}
 */
export var TEXT = 'TEXT';
/** @type {?} */
export var START_TAG = 'START_TAG';
/** @type {?} */
export var END_TAG = 'END_TAG';
/** @type {?} */
export var EMPTY_TAG = 'EMPTY_TAG';
/** @type {?} */
export var PLACEHOLDER = 'PLACEHOLDER';
/** @type {?} */
export var ICU_MESSAGE_REF = 'ICU_MESSAGE_REF';
/** @type {?} */
export var ICU_MESSAGE = 'ICU_MESSAGE';
/**
 * @record
 */
export function Token() { }
if (false) {
    /** @type {?} */
    Token.prototype.type;
    /** @type {?} */
    Token.prototype.value;
}
var ParsedMesageTokenizer = /** @class */ (function () {
    function ParsedMesageTokenizer() {
    }
    /**
     * @private
     * @return {?}
     */
    ParsedMesageTokenizer.prototype.getLexer = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lexer = new Tokenizr();
        /** @type {?} */
        var plaintext = '';
        lexer.before((/**
         * @param {?} ctx
         * @param {?} match
         * @param {?} rule
         * @return {?}
         */
        function (ctx, match, rule) {
            if (rule.name !== TEXT && plaintext !== '') {
                ctx.accept(TEXT, { text: plaintext });
                plaintext = '';
            }
        }));
        lexer.finish((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            if (plaintext !== '') {
                ctx.accept(TEXT, { text: plaintext });
            }
        }));
        // empty tag, there are only a few allowed (see tag-mappings): ['BR', 'HR', 'IMG', 'AREA', 'LINK', 'WBR']
        // format is <name id="nr">, nr ist optional, z.B. <img> oder <img id="2">
        lexer.rule(/<(br|hr|img|area|link|wbr)( id="([0-9])*")?\>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            /** @type {?} */
            var idcount = isNullOrUndefined(match[3]) ? 0 : parseInt(match[3], 10);
            ctx.accept(EMPTY_TAG, { name: match[1], idcounter: idcount });
        }), EMPTY_TAG);
        // start tag, Format <name id="nr">, nr ist optional, z.B. <mytag> oder <mytag id="2">
        lexer.rule(/<([a-zA-Z][a-zA-Z-0-9]*)( id="([0-9]*)")?>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            /** @type {?} */
            var idcount = isNullOrUndefined(match[3]) ? 0 : parseInt(match[3], 10);
            ctx.accept(START_TAG, { name: match[1], idcounter: idcount });
        }), START_TAG);
        // end tag
        lexer.rule(/<\/([a-zA-Z][a-zA-Z-0-9]*)>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(END_TAG, { name: match[1] });
        }), END_TAG);
        // placeholder
        lexer.rule(/{{([0-9]+)}}/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(PLACEHOLDER, { idcounter: parseInt(match[1], 10) });
        }), PLACEHOLDER);
        // icu message ref
        lexer.rule(/<ICU-Message-Ref_([0-9]+)\/>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(ICU_MESSAGE_REF, { idcounter: parseInt(match[1], 10) });
        }), ICU_MESSAGE_REF);
        // icu message
        lexer.rule(/<ICU-Message\/>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(ICU_MESSAGE, { message: match[0] });
        }), ICU_MESSAGE);
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
        lexer.rule(/[\t\r\n]+/, (/**
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
     * @param {?} normalizedMessage
     * @return {?}
     */
    ParsedMesageTokenizer.prototype.tokenize = /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    function (normalizedMessage) {
        /** @type {?} */
        var lexer = this.getLexer();
        lexer.reset();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    };
    return ParsedMesageTokenizer;
}());
export { ParsedMesageTokenizer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtdG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9wYXJzZWQtbWVzc2FnZS10b2tlbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQVF2QyxNQUFNLEtBQU8sSUFBSSxHQUFHLE1BQU07O0FBQzFCLE1BQU0sS0FBTyxTQUFTLEdBQUcsV0FBVzs7QUFDcEMsTUFBTSxLQUFPLE9BQU8sR0FBRyxTQUFTOztBQUNoQyxNQUFNLEtBQU8sU0FBUyxHQUFHLFdBQVc7O0FBQ3BDLE1BQU0sS0FBTyxXQUFXLEdBQUcsYUFBYTs7QUFDeEMsTUFBTSxLQUFPLGVBQWUsR0FBRyxpQkFBaUI7O0FBQ2hELE1BQU0sS0FBTyxXQUFXLEdBQUcsYUFBYTs7OztBQUV4QywyQkFHQzs7O0lBRkcscUJBQWE7O0lBQ2Isc0JBQVc7O0FBR2Y7SUFBQTtJQThEQSxDQUFDOzs7OztJQTVEVyx3Q0FBUTs7OztJQUFoQjs7WUFDVSxLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7O1lBQ3hCLFNBQVMsR0FBRyxFQUFFO1FBQ2xCLEtBQUssQ0FBQyxNQUFNOzs7Ozs7UUFBQyxVQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSTtZQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7Z0JBQ3BDLFNBQVMsR0FBRyxFQUFFLENBQUM7YUFDbEI7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxNQUFNOzs7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QixDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVc7Ozs7O1FBQUUsVUFBQyxHQUFHLEVBQUUsS0FBSztZQUMvQixTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQixDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELHdDQUFROzs7O0lBQVIsVUFBUyxpQkFBeUI7O1lBQ3hCLEtBQUssR0FBYSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ3ZDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLEtBQUssQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQixPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUwsNEJBQUM7QUFBRCxDQUFDLEFBOURELElBOERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVG9rZW5penIgZnJvbSAndG9rZW5penInO1xyXG5pbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICd1dGlsJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAxNC4wNS4yMDE3LlxyXG4gKiBBIHRva2VuaXplciBmb3Igbm9ybWFsaXplZCBtZXNzYWdlcy5cclxuICovXHJcblxyXG4vLyBUb2tlbnNcclxuZXhwb3J0IGNvbnN0IFRFWFQgPSAnVEVYVCc7XHJcbmV4cG9ydCBjb25zdCBTVEFSVF9UQUcgPSAnU1RBUlRfVEFHJztcclxuZXhwb3J0IGNvbnN0IEVORF9UQUcgPSAnRU5EX1RBRyc7XHJcbmV4cG9ydCBjb25zdCBFTVBUWV9UQUcgPSAnRU1QVFlfVEFHJztcclxuZXhwb3J0IGNvbnN0IFBMQUNFSE9MREVSID0gJ1BMQUNFSE9MREVSJztcclxuZXhwb3J0IGNvbnN0IElDVV9NRVNTQUdFX1JFRiA9ICdJQ1VfTUVTU0FHRV9SRUYnO1xyXG5leHBvcnQgY29uc3QgSUNVX01FU1NBR0UgPSAnSUNVX01FU1NBR0UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBUb2tlbiB7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyc2VkTWVzYWdlVG9rZW5pemVyIHtcclxuXHJcbiAgICBwcml2YXRlIGdldExleGVyKCk6IFRva2VuaXpyIHtcclxuICAgICAgICBjb25zdCBsZXhlciA9IG5ldyBUb2tlbml6cigpO1xyXG4gICAgICAgIGxldCBwbGFpbnRleHQgPSAnJztcclxuICAgICAgICBsZXhlci5iZWZvcmUoKGN0eCwgbWF0Y2gsIHJ1bGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJ1bGUubmFtZSAhPT0gVEVYVCAmJiBwbGFpbnRleHQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYWNjZXB0KFRFWFQsIHt0ZXh0OiBwbGFpbnRleHR9KTtcclxuICAgICAgICAgICAgICAgIHBsYWludGV4dCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV4ZXIuZmluaXNoKChjdHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBsYWludGV4dCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGN0eC5hY2NlcHQoVEVYVCwge3RleHQ6IHBsYWludGV4dH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGVtcHR5IHRhZywgdGhlcmUgYXJlIG9ubHkgYSBmZXcgYWxsb3dlZCAoc2VlIHRhZy1tYXBwaW5ncyk6IFsnQlInLCAnSFInLCAnSU1HJywgJ0FSRUEnLCAnTElOSycsICdXQlInXVxyXG4gICAgICAgIC8vIGZvcm1hdCBpcyA8bmFtZSBpZD1cIm5yXCI+LCBuciBpc3Qgb3B0aW9uYWwsIHouQi4gPGltZz4gb2RlciA8aW1nIGlkPVwiMlwiPlxyXG4gICAgICAgIGxleGVyLnJ1bGUoLzwoYnJ8aHJ8aW1nfGFyZWF8bGlua3x3YnIpKCBpZD1cIihbMC05XSkqXCIpP1xcPi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkY291bnQgPSBpc051bGxPclVuZGVmaW5lZChtYXRjaFszXSkgPyAwIDogcGFyc2VJbnQobWF0Y2hbM10sIDEwKTtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChFTVBUWV9UQUcsIHtuYW1lOiBtYXRjaFsxXSwgaWRjb3VudGVyOiBpZGNvdW50fSk7XHJcbiAgICAgICAgfSwgRU1QVFlfVEFHKTtcclxuICAgICAgICAvLyBzdGFydCB0YWcsIEZvcm1hdCA8bmFtZSBpZD1cIm5yXCI+LCBuciBpc3Qgb3B0aW9uYWwsIHouQi4gPG15dGFnPiBvZGVyIDxteXRhZyBpZD1cIjJcIj5cclxuICAgICAgICBsZXhlci5ydWxlKC88KFthLXpBLVpdW2EtekEtWi0wLTldKikoIGlkPVwiKFswLTldKilcIik/Pi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkY291bnQgPSBpc051bGxPclVuZGVmaW5lZChtYXRjaFszXSkgPyAwIDogcGFyc2VJbnQobWF0Y2hbM10sIDEwKTtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChTVEFSVF9UQUcsIHtuYW1lOiBtYXRjaFsxXSwgaWRjb3VudGVyOiBpZGNvdW50fSk7XHJcbiAgICAgICAgfSwgU1RBUlRfVEFHKTtcclxuICAgICAgICAvLyBlbmQgdGFnXHJcbiAgICAgICAgbGV4ZXIucnVsZSgvPFxcLyhbYS16QS1aXVthLXpBLVotMC05XSopPi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGN0eC5hY2NlcHQoRU5EX1RBRywge25hbWU6IG1hdGNoWzFdfSk7XHJcbiAgICAgICAgfSwgRU5EX1RBRyk7XHJcbiAgICAgICAgLy8gcGxhY2Vob2xkZXJcclxuICAgICAgICBsZXhlci5ydWxlKC97eyhbMC05XSspfX0vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KFBMQUNFSE9MREVSLCB7aWRjb3VudGVyOiBwYXJzZUludChtYXRjaFsxXSwgMTApfSk7XHJcbiAgICAgICAgfSwgUExBQ0VIT0xERVIpO1xyXG4gICAgICAgIC8vIGljdSBtZXNzYWdlIHJlZlxyXG4gICAgICAgIGxleGVyLnJ1bGUoLzxJQ1UtTWVzc2FnZS1SZWZfKFswLTldKylcXC8+LywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChJQ1VfTUVTU0FHRV9SRUYsIHtpZGNvdW50ZXI6IHBhcnNlSW50KG1hdGNoWzFdLCAxMCl9KTtcclxuICAgICAgICB9LCBJQ1VfTUVTU0FHRV9SRUYpO1xyXG4gICAgICAgIC8vIGljdSBtZXNzYWdlXHJcbiAgICAgICAgbGV4ZXIucnVsZSgvPElDVS1NZXNzYWdlXFwvPi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGN0eC5hY2NlcHQoSUNVX01FU1NBR0UsIHttZXNzYWdlOiBtYXRjaFswXX0pO1xyXG4gICAgICAgIH0sIElDVV9NRVNTQUdFKTtcclxuICAgICAgICAvLyB0ZXh0XHJcbiAgICAgICAgbGV4ZXIucnVsZSgvLi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYWludGV4dCArPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgIH0sIFRFWFQpO1xyXG4gICAgICAgIGxleGVyLnJ1bGUoL1tcXHRcXHJcXG5dKy8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsYWludGV4dCArPSBtYXRjaFswXTtcclxuICAgICAgICAgICAgY3R4Lmlnbm9yZSgpO1xyXG4gICAgICAgIH0sIFRFWFQpO1xyXG4gICAgICAgIHJldHVybiBsZXhlcjtcclxuICAgIH1cclxuXHJcbiAgICB0b2tlbml6ZShub3JtYWxpemVkTWVzc2FnZTogc3RyaW5nKTogVG9rZW5bXSB7XHJcbiAgICAgICAgY29uc3QgbGV4ZXI6IFRva2VuaXpyID0gdGhpcy5nZXRMZXhlcigpO1xyXG4gICAgICAgIGxleGVyLnJlc2V0KCk7XHJcbiAgICAgICAgbGV4ZXIuaW5wdXQobm9ybWFsaXplZE1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBsZXhlci50b2tlbnMoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19