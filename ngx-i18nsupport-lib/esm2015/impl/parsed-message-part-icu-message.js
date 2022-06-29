/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
import { COMMA, CURLY_BRACE_CLOSE, CURLY_BRACE_OPEN, ICUMessageTokenizer, PLURAL, SELECT, TEXT } from './icu-message-tokenizer';
import { ICUMessage } from './icu-message';
import { format } from 'util';
/**
 * Created by martin on 02.06.2017.
 * A message part consisting of an icu message.
 * There can only be one icu message in a parsed message.
 * Syntax of ICU message is '{' <keyname> ',' 'select'|'plural' ',' (<category> '{' text '}')+ '}'
 */
export class ParsedMessagePartICUMessage extends ParsedMessagePart {
    /**
     * @param {?} icuMessageText
     * @param {?} _parser
     */
    constructor(icuMessageText, _parser) {
        super(ParsedMessagePartType.ICU_MESSAGE);
        this._parser = _parser;
        if (icuMessageText) {
            this.parseICUMessage(icuMessageText);
        }
    }
    /**
     * Test wether text might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param {?} icuMessageText icuMessageText
     * @return {?} wether text might be an ICU message.
     */
    static looksLikeICUMessage(icuMessageText) {
        /** @type {?} */
        const part = new ParsedMessagePartICUMessage(null, null);
        return part.looksLikeICUMessage(icuMessageText);
    }
    /**
     * @param {?=} displayFormat
     * @return {?}
     */
    asDisplayString(displayFormat) {
        return '<ICU-Message/>';
    }
    /**
     * return the parsed message.
     * @return {?} parsed message
     */
    getICUMessage() {
        return this._message;
    }
    /**
     * Parse the message.
     * @throws an error if the syntax is not ok in any way.
     * @private
     * @param {?} text message text to parse
     * @return {?}
     */
    parseICUMessage(text) {
        // console.log('message ', text);
        // const tokens = new ICUMessageTokenizer().tokenize(text);
        // tokens.forEach((tok) => {
        //     console.log('Token', tok.type, tok.value);
        // });
        this._messageText = text;
        this._tokenizer = new ICUMessageTokenizer();
        this._tokenizer.input(text);
        this.expectNext(CURLY_BRACE_OPEN);
        this.expectNext(TEXT); // varname, not used currently, ng always used VAR_PLURAL or VAR_SELECT
        this.expectNext(COMMA);
        /** @type {?} */
        let token = this._tokenizer.next();
        if (token.type === PLURAL) {
            this._message = new ICUMessage(this._parser, true);
        }
        else if (token.type === SELECT) {
            this._message = new ICUMessage(this._parser, false);
        }
        this.expectNext(COMMA);
        token = this._tokenizer.peek();
        while (token.type !== CURLY_BRACE_CLOSE) {
            /** @type {?} */
            const category = this.expectNext(TEXT).value.trim();
            this.expectNext(CURLY_BRACE_OPEN);
            /** @type {?} */
            const message = this.expectNext(TEXT).value;
            this._message.addCategory(category, this.parseNativeSubMessage(message));
            this.expectNext(CURLY_BRACE_CLOSE);
            token = this._tokenizer.peek();
        }
        this.expectNext(CURLY_BRACE_CLOSE);
        this.expectNext('EOF');
    }
    /**
     * Parse the message to check, wether it might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @private
     * @param {?} text message text to parse
     * @return {?}
     */
    looksLikeICUMessage(text) {
        // console.log('message ', text);
        // const tokens = new ICUMessageTokenizer().tokenize(text);
        // tokens.forEach((tok) => {
        //     console.log('Token', tok.type, tok.value);
        // });
        this._tokenizer = new ICUMessageTokenizer();
        this._tokenizer.input(text);
        try {
            this.expectNext(CURLY_BRACE_OPEN);
            this.expectNext(TEXT); // varname, not used currently, ng always used VAR_PLURAL or VAR_SELECT
            this.expectNext(COMMA);
            /** @type {?} */
            const token = this._tokenizer.next();
            if (token.type !== PLURAL && token.type !== SELECT) {
                return false;
            }
            this.expectNext(COMMA);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Read next token and expect, that it is of the given type.
     * @throws error, if next token has wrong type.
     * @private
     * @param {?} tokentype expected type.
     * @return {?} Token
     */
    expectNext(tokentype) {
        /** @type {?} */
        const token = this._tokenizer.next();
        if (token.type !== tokentype) {
            throw new Error(format('Error parsing ICU Message: expected %s, found %s (%s) (message %s)', tokentype, token.type, token.value, this._messageText));
        }
        return token;
    }
    /**
     * Parse XML text to normalized message.
     * @private
     * @param {?} message message in format dependent xml syntax.
     * @return {?} normalized message
     */
    parseNativeSubMessage(message) {
        return this._parser.createNormalizedMessageFromXMLString(message, null);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartICUMessage.prototype._message;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartICUMessage.prototype._messageText;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartICUMessage.prototype._tokenizer;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartICUMessage.prototype._parser;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1pY3UtbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvcGFyc2VkLW1lc3NhZ2UtcGFydC1pY3UtbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFL0UsT0FBTyxFQUNILEtBQUssRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBWSxNQUFNLEVBQUUsTUFBTSxFQUN6RixJQUFJLEVBQ1AsTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7QUFVNUIsTUFBTSxPQUFPLDJCQUE0QixTQUFRLGlCQUFpQjs7Ozs7SUFNOUQsWUFBWSxjQUFzQixFQUFVLE9BQXVCO1FBQy9ELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQURELFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBRS9ELElBQUksY0FBYyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDOzs7Ozs7O0lBUUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGNBQXNCOztjQUN2QyxJQUFJLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRU0sZUFBZSxDQUFDLGFBQXNCO1FBQ3pDLE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFNTSxhQUFhO1FBQ2hCLE9BQU8s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Q3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFRTyxVQUFVLENBQUMsU0FBaUI7O2NBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTtRQUNwQyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzFCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLG9FQUFvRSxFQUN2RixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQU9PLHFCQUFxQixDQUFDLE9BQWU7UUFDekMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLG9DQUFvQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0NBQ0o7Ozs7OztJQTFIRywrQ0FBNkI7Ozs7O0lBQzdCLG1EQUE2Qjs7Ozs7SUFDN0IsaURBQXdDOzs7OztJQUVKLDhDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuaW1wb3J0IHtJSUNVTWVzc2FnZSwgSU5vcm1hbGl6ZWRNZXNzYWdlfSBmcm9tICcuLi9hcGkvaW5kZXgnO1xyXG5pbXBvcnQge1xyXG4gICAgQ09NTUEsIENVUkxZX0JSQUNFX0NMT1NFLCBDVVJMWV9CUkFDRV9PUEVOLCBJQ1VNZXNzYWdlVG9rZW5pemVyLCBJQ1VUb2tlbiwgUExVUkFMLCBTRUxFQ1QsXHJcbiAgICBURVhUXHJcbn0gZnJvbSAnLi9pY3UtbWVzc2FnZS10b2tlbml6ZXInO1xyXG5pbXBvcnQge0lDVU1lc3NhZ2V9IGZyb20gJy4vaWN1LW1lc3NhZ2UnO1xyXG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7SU1lc3NhZ2VQYXJzZXJ9IGZyb20gJy4vaS1tZXNzYWdlLXBhcnNlcic7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDIuMDYuMjAxNy5cclxuICogQSBtZXNzYWdlIHBhcnQgY29uc2lzdGluZyBvZiBhbiBpY3UgbWVzc2FnZS5cclxuICogVGhlcmUgY2FuIG9ubHkgYmUgb25lIGljdSBtZXNzYWdlIGluIGEgcGFyc2VkIG1lc3NhZ2UuXHJcbiAqIFN5bnRheCBvZiBJQ1UgbWVzc2FnZSBpcyAneycgPGtleW5hbWU+ICcsJyAnc2VsZWN0J3wncGx1cmFsJyAnLCcgKDxjYXRlZ29yeT4gJ3snIHRleHQgJ30nKSsgJ30nXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZSBleHRlbmRzIFBhcnNlZE1lc3NhZ2VQYXJ0IHtcclxuXHJcbiAgICBwcml2YXRlIF9tZXNzYWdlOiBJQ1VNZXNzYWdlO1xyXG4gICAgcHJpdmF0ZSBfbWVzc2FnZVRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3Rva2VuaXplcjogSUNVTWVzc2FnZVRva2VuaXplcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpY3VNZXNzYWdlVGV4dDogc3RyaW5nLCBwcml2YXRlIF9wYXJzZXI6IElNZXNzYWdlUGFyc2VyKSB7XHJcbiAgICAgICAgc3VwZXIoUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFKTtcclxuICAgICAgICBpZiAoaWN1TWVzc2FnZVRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZUlDVU1lc3NhZ2UoaWN1TWVzc2FnZVRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3Qgd2V0aGVyIHRleHQgbWlnaHQgYmUgYW4gSUNVIG1lc3NhZ2UuXHJcbiAgICAgKiBTaG91bGQgYXQgbGVhc3Qgc3RhcnQgd2l0aCBzb21ldGhpbmcgbGlrZSAnezxuYW1lPiwgc2VsZWN0LCAuLicgb3IgJ3s8bmFtZT4sIHBsdXJhbCwgLi4uJ1xyXG4gICAgICogQHBhcmFtIGljdU1lc3NhZ2VUZXh0IGljdU1lc3NhZ2VUZXh0XHJcbiAgICAgKiBAcmV0dXJuIHdldGhlciB0ZXh0IG1pZ2h0IGJlIGFuIElDVSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9va3NMaWtlSUNVTWVzc2FnZShpY3VNZXNzYWdlVGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgcGFydCA9IG5ldyBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2UobnVsbCwgbnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnQubG9va3NMaWtlSUNVTWVzc2FnZShpY3VNZXNzYWdlVGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzRGlzcGxheVN0cmluZyhkaXNwbGF5Rm9ybWF0Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICc8SUNVLU1lc3NhZ2UvPic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGhlIHBhcnNlZCBtZXNzYWdlLlxyXG4gICAgICogQHJldHVybiBwYXJzZWQgbWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SUNVTWVzc2FnZSgpOiBJSUNVTWVzc2FnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSB0ZXh0IG1lc3NhZ2UgdGV4dCB0byBwYXJzZVxyXG4gICAgICogQHRocm93cyBhbiBlcnJvciBpZiB0aGUgc3ludGF4IGlzIG5vdCBvayBpbiBhbnkgd2F5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlSUNVTWVzc2FnZSh0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbWVzc2FnZSAnLCB0ZXh0KTtcclxuICAgICAgICAvLyBjb25zdCB0b2tlbnMgPSBuZXcgSUNVTWVzc2FnZVRva2VuaXplcigpLnRva2VuaXplKHRleHQpO1xyXG4gICAgICAgIC8vIHRva2Vucy5mb3JFYWNoKCh0b2spID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ1Rva2VuJywgdG9rLnR5cGUsIHRvay52YWx1ZSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZVRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMuX3Rva2VuaXplciA9IG5ldyBJQ1VNZXNzYWdlVG9rZW5pemVyKCk7XHJcbiAgICAgICAgdGhpcy5fdG9rZW5pemVyLmlucHV0KHRleHQpO1xyXG4gICAgICAgIHRoaXMuZXhwZWN0TmV4dChDVVJMWV9CUkFDRV9PUEVOKTtcclxuICAgICAgICB0aGlzLmV4cGVjdE5leHQoVEVYVCk7IC8vIHZhcm5hbWUsIG5vdCB1c2VkIGN1cnJlbnRseSwgbmcgYWx3YXlzIHVzZWQgVkFSX1BMVVJBTCBvciBWQVJfU0VMRUNUXHJcbiAgICAgICAgdGhpcy5leHBlY3ROZXh0KENPTU1BKTtcclxuICAgICAgICBsZXQgdG9rZW46IElDVVRva2VuID0gdGhpcy5fdG9rZW5pemVyLm5leHQoKTtcclxuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gUExVUkFMKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2UgPSBuZXcgSUNVTWVzc2FnZSh0aGlzLl9wYXJzZXIsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gU0VMRUNUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2UgPSBuZXcgSUNVTWVzc2FnZSh0aGlzLl9wYXJzZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5leHBlY3ROZXh0KENPTU1BKTtcclxuICAgICAgICB0b2tlbiA9IHRoaXMuX3Rva2VuaXplci5wZWVrKCk7XHJcbiAgICAgICAgd2hpbGUgKHRva2VuLnR5cGUgIT09IENVUkxZX0JSQUNFX0NMT1NFKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdGhpcy5leHBlY3ROZXh0KFRFWFQpLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICAgICAgdGhpcy5leHBlY3ROZXh0KENVUkxZX0JSQUNFX09QRU4pO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5leHBlY3ROZXh0KFRFWFQpLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlLmFkZENhdGVnb3J5KGNhdGVnb3J5LCB0aGlzLnBhcnNlTmF0aXZlU3ViTWVzc2FnZShtZXNzYWdlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0TmV4dChDVVJMWV9CUkFDRV9DTE9TRSk7XHJcbiAgICAgICAgICAgIHRva2VuID0gdGhpcy5fdG9rZW5pemVyLnBlZWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5leHBlY3ROZXh0KENVUkxZX0JSQUNFX0NMT1NFKTtcclxuICAgICAgICB0aGlzLmV4cGVjdE5leHQoJ0VPRicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgdGhlIG1lc3NhZ2UgdG8gY2hlY2ssIHdldGhlciBpdCBtaWdodCBiZSBhbiBJQ1UgbWVzc2FnZS5cclxuICAgICAqIFNob3VsZCBhdCBsZWFzdCBzdGFydCB3aXRoIHNvbWV0aGluZyBsaWtlICd7PG5hbWU+LCBzZWxlY3QsIC4uJyBvciAnezxuYW1lPiwgcGx1cmFsLCAuLi4nXHJcbiAgICAgKiBAcGFyYW0gdGV4dCBtZXNzYWdlIHRleHQgdG8gcGFyc2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb29rc0xpa2VJQ1VNZXNzYWdlKHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdtZXNzYWdlICcsIHRleHQpO1xyXG4gICAgICAgIC8vIGNvbnN0IHRva2VucyA9IG5ldyBJQ1VNZXNzYWdlVG9rZW5pemVyKCkudG9rZW5pemUodGV4dCk7XHJcbiAgICAgICAgLy8gdG9rZW5zLmZvckVhY2goKHRvaykgPT4ge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnVG9rZW4nLCB0b2sudHlwZSwgdG9rLnZhbHVlKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICB0aGlzLl90b2tlbml6ZXIgPSBuZXcgSUNVTWVzc2FnZVRva2VuaXplcigpO1xyXG4gICAgICAgIHRoaXMuX3Rva2VuaXplci5pbnB1dCh0ZXh0KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLmV4cGVjdE5leHQoQ1VSTFlfQlJBQ0VfT1BFTik7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwZWN0TmV4dChURVhUKTsgLy8gdmFybmFtZSwgbm90IHVzZWQgY3VycmVudGx5LCBuZyBhbHdheXMgdXNlZCBWQVJfUExVUkFMIG9yIFZBUl9TRUxFQ1RcclxuICAgICAgICAgICAgdGhpcy5leHBlY3ROZXh0KENPTU1BKTtcclxuICAgICAgICAgICAgY29uc3QgdG9rZW46IElDVVRva2VuID0gdGhpcy5fdG9rZW5pemVyLm5leHQoKTtcclxuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IFBMVVJBTCAmJiB0b2tlbi50eXBlICE9PSBTRUxFQ1QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmV4cGVjdE5leHQoQ09NTUEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBuZXh0IHRva2VuIGFuZCBleHBlY3QsIHRoYXQgaXQgaXMgb2YgdGhlIGdpdmVuIHR5cGUuXHJcbiAgICAgKiBAcGFyYW0gdG9rZW50eXBlIGV4cGVjdGVkIHR5cGUuXHJcbiAgICAgKiBAcmV0dXJuIFRva2VuXHJcbiAgICAgKiBAdGhyb3dzIGVycm9yLCBpZiBuZXh0IHRva2VuIGhhcyB3cm9uZyB0eXBlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4cGVjdE5leHQodG9rZW50eXBlOiBzdHJpbmcpOiBJQ1VUb2tlbiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLl90b2tlbml6ZXIubmV4dCgpO1xyXG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSB0b2tlbnR5cGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnRXJyb3IgcGFyc2luZyBJQ1UgTWVzc2FnZTogZXhwZWN0ZWQgJXMsIGZvdW5kICVzICglcykgKG1lc3NhZ2UgJXMpJyxcclxuICAgICAgICAgICAgICAgIHRva2VudHlwZSwgdG9rZW4udHlwZSwgdG9rZW4udmFsdWUsIHRoaXMuX21lc3NhZ2VUZXh0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIFhNTCB0ZXh0IHRvIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgaW4gZm9ybWF0IGRlcGVuZGVudCB4bWwgc3ludGF4LlxyXG4gICAgICogQHJldHVybiBub3JtYWxpemVkIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZU5hdGl2ZVN1Yk1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogSU5vcm1hbGl6ZWRNZXNzYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VyLmNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTFN0cmluZyhtZXNzYWdlLCBudWxsKTtcclxuICAgIH1cclxufVxyXG4iXX0=