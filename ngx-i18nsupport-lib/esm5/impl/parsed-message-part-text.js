/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of just simple text.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of just simple text.
 */
ParsedMessagePartText = /** @class */ (function (_super) {
    tslib_1.__extends(ParsedMessagePartText, _super);
    function ParsedMessagePartText(text) {
        var _this = _super.call(this, ParsedMessagePartType.TEXT) || this;
        _this.text = text;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartText.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        return this.text;
    };
    return ParsedMessagePartText;
}(ParsedMessagePart));
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of just simple text.
 */
export { ParsedMessagePartText };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartText.prototype.text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC10ZXh0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC9wYXJzZWQtbWVzc2FnZS1wYXJ0LXRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFNL0U7Ozs7O0lBQTJDLGlEQUFpQjtJQUl4RCwrQkFBWSxJQUFZO1FBQXhCLFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBRXBDO1FBREcsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0lBQ3JCLENBQUM7Ozs7O0lBRU0sK0NBQWU7Ozs7SUFBdEIsVUFBdUIsTUFBZTtRQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQVpELENBQTJDLGlCQUFpQixHQVkzRDs7Ozs7Ozs7Ozs7SUFWRyxxQ0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0LCBQYXJzZWRNZXNzYWdlUGFydFR5cGV9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydCc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNS4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgcGFydCBjb25zaXN0aW5nIG9mIGp1c3Qgc2ltcGxlIHRleHQuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2VQYXJ0VGV4dCBleHRlbmRzIFBhcnNlZE1lc3NhZ2VQYXJ0IHtcclxuXHJcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihQYXJzZWRNZXNzYWdlUGFydFR5cGUuVEVYVCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXNEaXNwbGF5U3RyaW5nKGZvcm1hdD86IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XHJcbiAgICB9XHJcbn1cclxuIl19