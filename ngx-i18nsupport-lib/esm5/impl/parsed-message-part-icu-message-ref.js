/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
var /**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
ParsedMessagePartICUMessageRef = /** @class */ (function (_super) {
    tslib_1.__extends(ParsedMessagePartICUMessageRef, _super);
    function ParsedMessagePartICUMessageRef(index, disp) {
        var _this = _super.call(this, ParsedMessagePartType.ICU_MESSAGE_REF) || this;
        _this._index = index;
        _this._disp = disp;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartICUMessageRef.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        return '<ICU-Message-Ref_' + this._index + '/>';
    };
    /**
     * @return {?}
     */
    ParsedMessagePartICUMessageRef.prototype.index = /**
     * @return {?}
     */
    function () {
        return this._index;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartICUMessageRef.prototype.disp = /**
     * @return {?}
     */
    function () {
        return this._disp;
    };
    return ParsedMessagePartICUMessageRef;
}(ParsedMessagePart));
/**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
export { ParsedMessagePartICUMessageRef };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartICUMessageRef.prototype._index;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartICUMessageRef.prototype._disp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1pY3UtbWVzc2FnZS1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UtcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7OztBQVEvRTs7Ozs7O0lBQW9ELDBEQUFpQjtJQU9qRSx3Q0FBWSxLQUFhLEVBQUUsSUFBWTtRQUF2QyxZQUNJLGtCQUFNLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxTQUcvQztRQUZHLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztJQUN0QixDQUFDOzs7OztJQUVNLHdEQUFlOzs7O0lBQXRCLFVBQXVCLE1BQWU7UUFDbEMsT0FBTyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNwRCxDQUFDOzs7O0lBRU0sOENBQUs7OztJQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFTSw2Q0FBSTs7O0lBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNMLHFDQUFDO0FBQUQsQ0FBQyxBQXhCRCxDQUFvRCxpQkFBaUIsR0F3QnBFOzs7Ozs7Ozs7Ozs7SUFyQkcsZ0RBQXVCOzs7OztJQUV2QiwrQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0LCBQYXJzZWRNZXNzYWdlUGFydFR5cGV9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydCc7XHJcbmltcG9ydCB7Tk9STUFMSVpBVElPTl9GT1JNQVRfTkdYVFJBTlNMQVRFfSBmcm9tICcuLi9hcGkvY29uc3RhbnRzJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDA1LjA1LjIwMTcuXHJcbiAqIEEgcmVmZXJlbmNlIHRvIGFuIElDVSBtZXNzYWdlXHJcbiAqIGljdSByZWZlcmVuY2VzIGFyZSBudW1iZXJlZCBmcm9tIDAgdG8gbi5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmIGV4dGVuZHMgUGFyc2VkTWVzc2FnZVBhcnQge1xyXG5cclxuICAgIC8vIGluZGV4IDAgLi4gblxyXG4gICAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlcjtcclxuICAgIC8vIG9wdGlvbmFsIGRpc3AtQXR0cmlidXRlIHZhbHVlLCBjb250YWlucyB0aGUgb3JpZ2luYWwgZXhwcmVzc2lvbi5cclxuICAgIHByaXZhdGUgX2Rpc3A/OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5kZXg6IG51bWJlciwgZGlzcDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFX1JFRik7XHJcbiAgICAgICAgdGhpcy5faW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLl9kaXNwID0gZGlzcDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXNEaXNwbGF5U3RyaW5nKGZvcm1hdD86IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiAnPElDVS1NZXNzYWdlLVJlZl8nICsgdGhpcy5faW5kZXggKyAnLz4nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbmRleCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==