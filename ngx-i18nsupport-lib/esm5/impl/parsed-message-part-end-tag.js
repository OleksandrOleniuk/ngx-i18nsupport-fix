/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
ParsedMessagePartEndTag = /** @class */ (function (_super) {
    tslib_1.__extends(ParsedMessagePartEndTag, _super);
    function ParsedMessagePartEndTag(tagname) {
        var _this = _super.call(this, ParsedMessagePartType.END_TAG) || this;
        _this._tagname = tagname;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartEndTag.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        return '</' + this._tagname + '>';
    };
    /**
     * @return {?}
     */
    ParsedMessagePartEndTag.prototype.tagName = /**
     * @return {?}
     */
    function () {
        return this._tagname;
    };
    return ParsedMessagePartEndTag;
}(ParsedMessagePart));
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
export { ParsedMessagePartEndTag };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartEndTag.prototype._tagname;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1lbmQtdGFnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVuZC10YWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFNL0U7Ozs7O0lBQTZDLG1EQUFpQjtJQUkxRCxpQ0FBWSxPQUFlO1FBQTNCLFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsT0FBTyxDQUFDLFNBRXZDO1FBREcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O0lBQzVCLENBQUM7Ozs7O0lBRU0saURBQWU7Ozs7SUFBdEIsVUFBdUIsTUFBZTtRQUNsQyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRU0seUNBQU87OztJQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTCw4QkFBQztBQUFELENBQUMsQUFqQkQsQ0FBNkMsaUJBQWlCLEdBaUI3RDs7Ozs7Ozs7Ozs7SUFmRywyQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0LCBQYXJzZWRNZXNzYWdlUGFydFR5cGV9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydCc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNS4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgcGFydCBjb25zaXN0aW5nIG9mIGEgY2xvc2luZyB0YWcgbGlrZSA8L2I+IG9yIDwvc3RyYW5nZT4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnIGV4dGVuZHMgUGFyc2VkTWVzc2FnZVBhcnQge1xyXG5cclxuICAgIHByaXZhdGUgX3RhZ25hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YWduYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihQYXJzZWRNZXNzYWdlUGFydFR5cGUuRU5EX1RBRyk7XHJcbiAgICAgICAgdGhpcy5fdGFnbmFtZSA9IHRhZ25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzRGlzcGxheVN0cmluZyhmb3JtYXQ/OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gJzwvJyArIHRoaXMuX3RhZ25hbWUgKyAnPic7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRhZ05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFnbmFtZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19