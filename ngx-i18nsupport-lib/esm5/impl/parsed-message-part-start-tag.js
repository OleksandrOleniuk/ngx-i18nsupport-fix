/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
ParsedMessagePartStartTag = /** @class */ (function (_super) {
    tslib_1.__extends(ParsedMessagePartStartTag, _super);
    function ParsedMessagePartStartTag(tagname, idcounter) {
        var _this = _super.call(this, ParsedMessagePartType.START_TAG) || this;
        _this._tagname = tagname;
        _this._idcounter = idcounter;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartStartTag.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        if (this._idcounter === 0) {
            return '<' + this._tagname + '>';
        }
        else {
            return '<' + this._tagname + ' id="' + this._idcounter.toString() + '">';
        }
    };
    /**
     * @return {?}
     */
    ParsedMessagePartStartTag.prototype.tagName = /**
     * @return {?}
     */
    function () {
        return this._tagname;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartStartTag.prototype.idCounter = /**
     * @return {?}
     */
    function () {
        return this._idcounter;
    };
    return ParsedMessagePartStartTag;
}(ParsedMessagePart));
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
export { ParsedMessagePartStartTag };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartStartTag.prototype._tagname;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartStartTag.prototype._idcounter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1zdGFydC10YWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3BhcnNlZC1tZXNzYWdlLXBhcnQtc3RhcnQtdGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTS9FOzs7OztJQUErQyxxREFBaUI7SUFLNUQsbUNBQVksT0FBZSxFQUFFLFNBQWlCO1FBQTlDLFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsU0FBUyxDQUFDLFNBR3pDO1FBRkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O0lBQ2hDLENBQUM7Ozs7O0lBRU0sbURBQWU7Ozs7SUFBdEIsVUFBdUIsTUFBZTtRQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1NBQ3BDO2FBQU07WUFDSCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM1RTtJQUNMLENBQUM7Ozs7SUFFTSwyQ0FBTzs7O0lBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQUVNLDZDQUFTOzs7SUFBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUErQyxpQkFBaUIsR0EwQi9EOzs7Ozs7Ozs7OztJQXhCRyw2Q0FBeUI7Ozs7O0lBQ3pCLCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDA1LjA1LjIwMTcuXHJcbiAqIEEgbWVzc2FnZSBwYXJ0IGNvbnNpc3Rpbmcgb2YgYW4gb3BlbmluZyB0YWcgbGlrZSA8Yj4gb3IgPHN0cmFuZ2U+LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnIGV4dGVuZHMgUGFyc2VkTWVzc2FnZVBhcnQge1xyXG5cclxuICAgIHByaXZhdGUgX3RhZ25hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2lkY291bnRlcjogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRhZ25hbWU6IHN0cmluZywgaWRjb3VudGVyOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihQYXJzZWRNZXNzYWdlUGFydFR5cGUuU1RBUlRfVEFHKTtcclxuICAgICAgICB0aGlzLl90YWduYW1lID0gdGFnbmFtZTtcclxuICAgICAgICB0aGlzLl9pZGNvdW50ZXIgPSBpZGNvdW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzRGlzcGxheVN0cmluZyhmb3JtYXQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5faWRjb3VudGVyID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnPCcgKyB0aGlzLl90YWduYW1lICsgJz4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnPCcgKyB0aGlzLl90YWduYW1lICsgJyBpZD1cIicgKyB0aGlzLl9pZGNvdW50ZXIudG9TdHJpbmcoKSArICdcIj4nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGFnTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWduYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpZENvdW50ZXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWRjb3VudGVyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==