/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
import { NORMALIZATION_FORMAT_NGXTRANSLATE } from '../api/constants';
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a placeholder.
 * Placeholders are numbered from 0 to n.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of a placeholder.
 * Placeholders are numbered from 0 to n.
 */
ParsedMessagePartPlaceholder = /** @class */ (function (_super) {
    tslib_1.__extends(ParsedMessagePartPlaceholder, _super);
    function ParsedMessagePartPlaceholder(index, disp) {
        var _this = _super.call(this, ParsedMessagePartType.PLACEHOLDER) || this;
        _this._index = index;
        _this._disp = disp;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartPlaceholder.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        if (format === NORMALIZATION_FORMAT_NGXTRANSLATE) {
            return '{{' + this._index + '}}';
        }
        return '{{' + this._index + '}}';
    };
    /**
     * @return {?}
     */
    ParsedMessagePartPlaceholder.prototype.index = /**
     * @return {?}
     */
    function () {
        return this._index;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartPlaceholder.prototype.disp = /**
     * @return {?}
     */
    function () {
        return this._disp;
    };
    return ParsedMessagePartPlaceholder;
}(ParsedMessagePart));
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a placeholder.
 * Placeholders are numbered from 0 to n.
 */
export { ParsedMessagePartPlaceholder };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartPlaceholder.prototype._index;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartPlaceholder.prototype._disp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvcGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9FLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFPbkU7Ozs7OztJQUFrRCx3REFBaUI7SUFPL0Qsc0NBQVksS0FBYSxFQUFFLElBQVk7UUFBdkMsWUFDSSxrQkFBTSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsU0FHM0M7UUFGRyxLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7SUFDdEIsQ0FBQzs7Ozs7SUFFTSxzREFBZTs7OztJQUF0QixVQUF1QixNQUFlO1FBQ2xDLElBQUksTUFBTSxLQUFLLGlDQUFpQyxFQUFFO1lBQzlDLE9BQU8sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDckMsQ0FBQzs7OztJQUNNLDRDQUFLOzs7SUFBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7O0lBRU0sMkNBQUk7OztJQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDTCxtQ0FBQztBQUFELENBQUMsQUExQkQsQ0FBa0QsaUJBQWlCLEdBMEJsRTs7Ozs7Ozs7Ozs7O0lBdkJHLDhDQUF1Qjs7Ozs7SUFFdkIsNkNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydCwgUGFyc2VkTWVzc2FnZVBhcnRUeXBlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQnO1xyXG5pbXBvcnQge05PUk1BTElaQVRJT05fRk9STUFUX05HWFRSQU5TTEFURX0gZnJvbSAnLi4vYXBpL2NvbnN0YW50cyc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNS4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgcGFydCBjb25zaXN0aW5nIG9mIGEgcGxhY2Vob2xkZXIuXHJcbiAqIFBsYWNlaG9sZGVycyBhcmUgbnVtYmVyZWQgZnJvbSAwIHRvIG4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXIgZXh0ZW5kcyBQYXJzZWRNZXNzYWdlUGFydCB7XHJcblxyXG4gICAgLy8gaW5kZXggMCAuLiBuXHJcbiAgICBwcml2YXRlIF9pbmRleDogbnVtYmVyO1xyXG4gICAgLy8gb3B0aW9uYWwgZGlzcC1BdHRyaWJ1dGUgdmFsdWUsIGNvbnRhaW5zIHRoZSBvcmlnaW5hbCBleHByZXNzaW9uLlxyXG4gICAgcHJpdmF0ZSBfZGlzcD86IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbmRleDogbnVtYmVyLCBkaXNwOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihQYXJzZWRNZXNzYWdlUGFydFR5cGUuUExBQ0VIT0xERVIpO1xyXG4gICAgICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5fZGlzcCA9IGRpc3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzRGlzcGxheVN0cmluZyhmb3JtYXQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoZm9ybWF0ID09PSBOT1JNQUxJWkFUSU9OX0ZPUk1BVF9OR1hUUkFOU0xBVEUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd7eycgKyB0aGlzLl9pbmRleCArICd9fSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAne3snICsgdGhpcy5faW5kZXggKyAnfX0nO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3A7XHJcbiAgICB9XHJcbn1cclxuIl19