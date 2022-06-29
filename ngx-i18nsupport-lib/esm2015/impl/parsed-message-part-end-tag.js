/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
export class ParsedMessagePartEndTag extends ParsedMessagePart {
    /**
     * @param {?} tagname
     */
    constructor(tagname) {
        super(ParsedMessagePartType.END_TAG);
        this._tagname = tagname;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    asDisplayString(format) {
        return '</' + this._tagname + '>';
    }
    /**
     * @return {?}
     */
    tagName() {
        return this._tagname;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartEndTag.prototype._tagname;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1lbmQtdGFnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVuZC10YWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7OztBQU0vRSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCOzs7O0lBSTFELFlBQVksT0FBZTtRQUN2QixLQUFLLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFTSxlQUFlLENBQUMsTUFBZTtRQUNsQyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRU0sT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0NBRUo7Ozs7OztJQWZHLDJDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDA1LjA1LjIwMTcuXHJcbiAqIEEgbWVzc2FnZSBwYXJ0IGNvbnNpc3Rpbmcgb2YgYSBjbG9zaW5nIHRhZyBsaWtlIDwvYj4gb3IgPC9zdHJhbmdlPi5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUGFyc2VkTWVzc2FnZVBhcnRFbmRUYWcgZXh0ZW5kcyBQYXJzZWRNZXNzYWdlUGFydCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGFnbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhZ25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTkRfVEFHKTtcclxuICAgICAgICB0aGlzLl90YWduYW1lID0gdGFnbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXNEaXNwbGF5U3RyaW5nKGZvcm1hdD86IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAnPC8nICsgdGhpcy5fdGFnbmFtZSArICc+JztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGFnTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWduYW1lO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=