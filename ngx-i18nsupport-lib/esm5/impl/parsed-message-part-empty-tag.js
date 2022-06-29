/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 14.06.2017.
 * A message part consisting of an empty tag like <br/>.
 */
var /**
 * Created by martin on 14.06.2017.
 * A message part consisting of an empty tag like <br/>.
 */
ParsedMessagePartEmptyTag = /** @class */ (function (_super) {
    tslib_1.__extends(ParsedMessagePartEmptyTag, _super);
    function ParsedMessagePartEmptyTag(tagname, idcounter) {
        var _this = _super.call(this, ParsedMessagePartType.EMPTY_TAG) || this;
        _this._tagname = tagname;
        _this._idcounter = idcounter;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartEmptyTag.prototype.asDisplayString = /**
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
    ParsedMessagePartEmptyTag.prototype.tagName = /**
     * @return {?}
     */
    function () {
        return this._tagname;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartEmptyTag.prototype.idCounter = /**
     * @return {?}
     */
    function () {
        return this._idcounter;
    };
    return ParsedMessagePartEmptyTag;
}(ParsedMessagePart));
/**
 * Created by martin on 14.06.2017.
 * A message part consisting of an empty tag like <br/>.
 */
export { ParsedMessagePartEmptyTag };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartEmptyTag.prototype._tagname;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartEmptyTag.prototype._idcounter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1lbXB0eS10YWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3BhcnNlZC1tZXNzYWdlLXBhcnQtZW1wdHktdGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFFLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTS9FOzs7OztJQUErQyxxREFBaUI7SUFLNUQsbUNBQVksT0FBZSxFQUFFLFNBQWlCO1FBQTlDLFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsU0FBUyxDQUFDLFNBR3pDO1FBRkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O0lBQ2hDLENBQUM7Ozs7O0lBRU0sbURBQWU7Ozs7SUFBdEIsVUFBdUIsTUFBZTtRQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1NBQ3BDO2FBQU07WUFDSCxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM1RTtJQUNMLENBQUM7Ozs7SUFFTSwyQ0FBTzs7O0lBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQUVNLDZDQUFTOzs7SUFBaEI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUErQyxpQkFBaUIsR0EwQi9EOzs7Ozs7Ozs7OztJQXhCRyw2Q0FBeUI7Ozs7O0lBQ3pCLCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDE0LjA2LjIwMTcuXHJcbiAqIEEgbWVzc2FnZSBwYXJ0IGNvbnNpc3Rpbmcgb2YgYW4gZW1wdHkgdGFnIGxpa2UgPGJyLz4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWcgZXh0ZW5kcyBQYXJzZWRNZXNzYWdlUGFydCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGFnbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaWRjb3VudGVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFnbmFtZTogc3RyaW5nLCBpZGNvdW50ZXI6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTVBUWV9UQUcpO1xyXG4gICAgICAgIHRoaXMuX3RhZ25hbWUgPSB0YWduYW1lO1xyXG4gICAgICAgIHRoaXMuX2lkY291bnRlciA9IGlkY291bnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXNEaXNwbGF5U3RyaW5nKGZvcm1hdD86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pZGNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuX3RhZ25hbWUgKyAnPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuX3RhZ25hbWUgKyAnIGlkPVwiJyArIHRoaXMuX2lkY291bnRlci50b1N0cmluZygpICsgJ1wiPic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0YWdOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZ25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlkQ291bnRlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZGNvdW50ZXI7XHJcbiAgICB9XHJcbn1cclxuIl19