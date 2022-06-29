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
export const TEXT = 'TEXT';
/** @type {?} */
export const START_TAG = 'START_TAG';
/** @type {?} */
export const END_TAG = 'END_TAG';
/** @type {?} */
export const EMPTY_TAG = 'EMPTY_TAG';
/** @type {?} */
export const PLACEHOLDER = 'PLACEHOLDER';
/** @type {?} */
export const ICU_MESSAGE_REF = 'ICU_MESSAGE_REF';
/** @type {?} */
export const ICU_MESSAGE = 'ICU_MESSAGE';
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
export class ParsedMesageTokenizer {
    /**
     * @private
     * @return {?}
     */
    getLexer() {
        /** @type {?} */
        const lexer = new Tokenizr();
        /** @type {?} */
        let plaintext = '';
        lexer.before((/**
         * @param {?} ctx
         * @param {?} match
         * @param {?} rule
         * @return {?}
         */
        (ctx, match, rule) => {
            if (rule.name !== TEXT && plaintext !== '') {
                ctx.accept(TEXT, { text: plaintext });
                plaintext = '';
            }
        }));
        lexer.finish((/**
         * @param {?} ctx
         * @return {?}
         */
        (ctx) => {
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
        (ctx, match) => {
            /** @type {?} */
            const idcount = isNullOrUndefined(match[3]) ? 0 : parseInt(match[3], 10);
            ctx.accept(EMPTY_TAG, { name: match[1], idcounter: idcount });
        }), EMPTY_TAG);
        // start tag, Format <name id="nr">, nr ist optional, z.B. <mytag> oder <mytag id="2">
        lexer.rule(/<([a-zA-Z][a-zA-Z-0-9]*)( id="([0-9]*)")?>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            /** @type {?} */
            const idcount = isNullOrUndefined(match[3]) ? 0 : parseInt(match[3], 10);
            ctx.accept(START_TAG, { name: match[1], idcounter: idcount });
        }), START_TAG);
        // end tag
        lexer.rule(/<\/([a-zA-Z][a-zA-Z-0-9]*)>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(END_TAG, { name: match[1] });
        }), END_TAG);
        // placeholder
        lexer.rule(/{{([0-9]+)}}/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(PLACEHOLDER, { idcounter: parseInt(match[1], 10) });
        }), PLACEHOLDER);
        // icu message ref
        lexer.rule(/<ICU-Message-Ref_([0-9]+)\/>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(ICU_MESSAGE_REF, { idcounter: parseInt(match[1], 10) });
        }), ICU_MESSAGE_REF);
        // icu message
        lexer.rule(/<ICU-Message\/>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        (ctx, match) => {
            ctx.accept(ICU_MESSAGE, { message: match[0] });
        }), ICU_MESSAGE);
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
        lexer.rule(/[\t\r\n]+/, (/**
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
     * @param {?} normalizedMessage
     * @return {?}
     */
    tokenize(normalizedMessage) {
        /** @type {?} */
        const lexer = this.getLexer();
        lexer.reset();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtdG9rZW5pemVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9wYXJzZWQtbWVzc2FnZS10b2tlbml6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLE1BQU0sQ0FBQzs7Ozs7OztBQVF2QyxNQUFNLE9BQU8sSUFBSSxHQUFHLE1BQU07O0FBQzFCLE1BQU0sT0FBTyxTQUFTLEdBQUcsV0FBVzs7QUFDcEMsTUFBTSxPQUFPLE9BQU8sR0FBRyxTQUFTOztBQUNoQyxNQUFNLE9BQU8sU0FBUyxHQUFHLFdBQVc7O0FBQ3BDLE1BQU0sT0FBTyxXQUFXLEdBQUcsYUFBYTs7QUFDeEMsTUFBTSxPQUFPLGVBQWUsR0FBRyxpQkFBaUI7O0FBQ2hELE1BQU0sT0FBTyxXQUFXLEdBQUcsYUFBYTs7OztBQUV4QywyQkFHQzs7O0lBRkcscUJBQWE7O0lBQ2Isc0JBQVc7O0FBR2YsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFFdEIsUUFBUTs7Y0FDTixLQUFLLEdBQUcsSUFBSSxRQUFRLEVBQUU7O1lBQ3hCLFNBQVMsR0FBRyxFQUFFO1FBQ2xCLEtBQUssQ0FBQyxNQUFNOzs7Ozs7UUFBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssRUFBRSxFQUFFO2dCQUN4QyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO2dCQUNwQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsTUFBTTs7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LEVBQUU7WUFDM0IsU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakIsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1QsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXOzs7OztRQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ25DLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pCLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztRQUNULE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLGlCQUF5Qjs7Y0FDeEIsS0FBSyxHQUFhLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDdkMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsS0FBSyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRva2VuaXpyIGZyb20gJ3Rva2VuaXpyJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMTQuMDUuMjAxNy5cclxuICogQSB0b2tlbml6ZXIgZm9yIG5vcm1hbGl6ZWQgbWVzc2FnZXMuXHJcbiAqL1xyXG5cclxuLy8gVG9rZW5zXHJcbmV4cG9ydCBjb25zdCBURVhUID0gJ1RFWFQnO1xyXG5leHBvcnQgY29uc3QgU1RBUlRfVEFHID0gJ1NUQVJUX1RBRyc7XHJcbmV4cG9ydCBjb25zdCBFTkRfVEFHID0gJ0VORF9UQUcnO1xyXG5leHBvcnQgY29uc3QgRU1QVFlfVEFHID0gJ0VNUFRZX1RBRyc7XHJcbmV4cG9ydCBjb25zdCBQTEFDRUhPTERFUiA9ICdQTEFDRUhPTERFUic7XHJcbmV4cG9ydCBjb25zdCBJQ1VfTUVTU0FHRV9SRUYgPSAnSUNVX01FU1NBR0VfUkVGJztcclxuZXhwb3J0IGNvbnN0IElDVV9NRVNTQUdFID0gJ0lDVV9NRVNTQUdFJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW4ge1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgdmFsdWU6IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc2FnZVRva2VuaXplciB7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRMZXhlcigpOiBUb2tlbml6ciB7XHJcbiAgICAgICAgY29uc3QgbGV4ZXIgPSBuZXcgVG9rZW5penIoKTtcclxuICAgICAgICBsZXQgcGxhaW50ZXh0ID0gJyc7XHJcbiAgICAgICAgbGV4ZXIuYmVmb3JlKChjdHgsIG1hdGNoLCBydWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChydWxlLm5hbWUgIT09IFRFWFQgJiYgcGxhaW50ZXh0ICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgY3R4LmFjY2VwdChURVhULCB7dGV4dDogcGxhaW50ZXh0fSk7XHJcbiAgICAgICAgICAgICAgICBwbGFpbnRleHQgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxleGVyLmZpbmlzaCgoY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwbGFpbnRleHQgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBjdHguYWNjZXB0KFRFWFQsIHt0ZXh0OiBwbGFpbnRleHR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuICAgICAgICAvLyBlbXB0eSB0YWcsIHRoZXJlIGFyZSBvbmx5IGEgZmV3IGFsbG93ZWQgKHNlZSB0YWctbWFwcGluZ3MpOiBbJ0JSJywgJ0hSJywgJ0lNRycsICdBUkVBJywgJ0xJTksnLCAnV0JSJ11cclxuICAgICAgICAvLyBmb3JtYXQgaXMgPG5hbWUgaWQ9XCJuclwiPiwgbnIgaXN0IG9wdGlvbmFsLCB6LkIuIDxpbWc+IG9kZXIgPGltZyBpZD1cIjJcIj5cclxuICAgICAgICBsZXhlci5ydWxlKC88KGJyfGhyfGltZ3xhcmVhfGxpbmt8d2JyKSggaWQ9XCIoWzAtOV0pKlwiKT9cXD4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZGNvdW50ID0gaXNOdWxsT3JVbmRlZmluZWQobWF0Y2hbM10pID8gMCA6IHBhcnNlSW50KG1hdGNoWzNdLCAxMCk7XHJcbiAgICAgICAgICAgIGN0eC5hY2NlcHQoRU1QVFlfVEFHLCB7bmFtZTogbWF0Y2hbMV0sIGlkY291bnRlcjogaWRjb3VudH0pO1xyXG4gICAgICAgIH0sIEVNUFRZX1RBRyk7XHJcbiAgICAgICAgLy8gc3RhcnQgdGFnLCBGb3JtYXQgPG5hbWUgaWQ9XCJuclwiPiwgbnIgaXN0IG9wdGlvbmFsLCB6LkIuIDxteXRhZz4gb2RlciA8bXl0YWcgaWQ9XCIyXCI+XHJcbiAgICAgICAgbGV4ZXIucnVsZSgvPChbYS16QS1aXVthLXpBLVotMC05XSopKCBpZD1cIihbMC05XSopXCIpPz4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZGNvdW50ID0gaXNOdWxsT3JVbmRlZmluZWQobWF0Y2hbM10pID8gMCA6IHBhcnNlSW50KG1hdGNoWzNdLCAxMCk7XHJcbiAgICAgICAgICAgIGN0eC5hY2NlcHQoU1RBUlRfVEFHLCB7bmFtZTogbWF0Y2hbMV0sIGlkY291bnRlcjogaWRjb3VudH0pO1xyXG4gICAgICAgIH0sIFNUQVJUX1RBRyk7XHJcbiAgICAgICAgLy8gZW5kIHRhZ1xyXG4gICAgICAgIGxleGVyLnJ1bGUoLzxcXC8oW2EtekEtWl1bYS16QS1aLTAtOV0qKT4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KEVORF9UQUcsIHtuYW1lOiBtYXRjaFsxXX0pO1xyXG4gICAgICAgIH0sIEVORF9UQUcpO1xyXG4gICAgICAgIC8vIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgbGV4ZXIucnVsZSgve3soWzAtOV0rKX19LywgKGN0eCwgbWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgY3R4LmFjY2VwdChQTEFDRUhPTERFUiwge2lkY291bnRlcjogcGFyc2VJbnQobWF0Y2hbMV0sIDEwKX0pO1xyXG4gICAgICAgIH0sIFBMQUNFSE9MREVSKTtcclxuICAgICAgICAvLyBpY3UgbWVzc2FnZSByZWZcclxuICAgICAgICBsZXhlci5ydWxlKC88SUNVLU1lc3NhZ2UtUmVmXyhbMC05XSspXFwvPi8sIChjdHgsIG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGN0eC5hY2NlcHQoSUNVX01FU1NBR0VfUkVGLCB7aWRjb3VudGVyOiBwYXJzZUludChtYXRjaFsxXSwgMTApfSk7XHJcbiAgICAgICAgfSwgSUNVX01FU1NBR0VfUkVGKTtcclxuICAgICAgICAvLyBpY3UgbWVzc2FnZVxyXG4gICAgICAgIGxleGVyLnJ1bGUoLzxJQ1UtTWVzc2FnZVxcLz4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBjdHguYWNjZXB0KElDVV9NRVNTQUdFLCB7bWVzc2FnZTogbWF0Y2hbMF19KTtcclxuICAgICAgICB9LCBJQ1VfTUVTU0FHRSk7XHJcbiAgICAgICAgLy8gdGV4dFxyXG4gICAgICAgIGxleGVyLnJ1bGUoLy4vLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBwbGFpbnRleHQgKz0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgIGN0eC5pZ25vcmUoKTtcclxuICAgICAgICB9LCBURVhUKTtcclxuICAgICAgICBsZXhlci5ydWxlKC9bXFx0XFxyXFxuXSsvLCAoY3R4LCBtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBwbGFpbnRleHQgKz0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgIGN0eC5pZ25vcmUoKTtcclxuICAgICAgICB9LCBURVhUKTtcclxuICAgICAgICByZXR1cm4gbGV4ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9rZW5pemUobm9ybWFsaXplZE1lc3NhZ2U6IHN0cmluZyk6IFRva2VuW10ge1xyXG4gICAgICAgIGNvbnN0IGxleGVyOiBUb2tlbml6ciA9IHRoaXMuZ2V0TGV4ZXIoKTtcclxuICAgICAgICBsZXhlci5yZXNldCgpO1xyXG4gICAgICAgIGxleGVyLmlucHV0KG5vcm1hbGl6ZWRNZXNzYWdlKTtcclxuICAgICAgICByZXR1cm4gbGV4ZXIudG9rZW5zKCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==