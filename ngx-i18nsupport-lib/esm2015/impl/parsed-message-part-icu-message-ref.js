/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
export class ParsedMessagePartICUMessageRef extends ParsedMessagePart {
    /**
     * @param {?} index
     * @param {?} disp
     */
    constructor(index, disp) {
        super(ParsedMessagePartType.ICU_MESSAGE_REF);
        this._index = index;
        this._disp = disp;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    asDisplayString(format) {
        return '<ICU-Message-Ref_' + this._index + '/>';
    }
    /**
     * @return {?}
     */
    index() {
        return this._index;
    }
    /**
     * @return {?}
     */
    disp() {
        return this._disp;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1pY3UtbWVzc2FnZS1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UtcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7O0FBUS9FLE1BQU0sT0FBTyw4QkFBK0IsU0FBUSxpQkFBaUI7Ozs7O0lBT2pFLFlBQVksS0FBYSxFQUFFLElBQVk7UUFDbkMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU0sZUFBZSxDQUFDLE1BQWU7UUFDbEMsT0FBTyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNwRCxDQUFDOzs7O0lBRU0sS0FBSztRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7O0lBRU0sSUFBSTtRQUNQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0NBQ0o7Ozs7OztJQXJCRyxnREFBdUI7Ozs7O0lBRXZCLCtDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuaW1wb3J0IHtOT1JNQUxJWkFUSU9OX0ZPUk1BVF9OR1hUUkFOU0xBVEV9IGZyb20gJy4uL2FwaS9jb25zdGFudHMnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDUuMDUuMjAxNy5cclxuICogQSByZWZlcmVuY2UgdG8gYW4gSUNVIG1lc3NhZ2VcclxuICogaWN1IHJlZmVyZW5jZXMgYXJlIG51bWJlcmVkIGZyb20gMCB0byBuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWYgZXh0ZW5kcyBQYXJzZWRNZXNzYWdlUGFydCB7XHJcblxyXG4gICAgLy8gaW5kZXggMCAuLiBuXHJcbiAgICBwcml2YXRlIF9pbmRleDogbnVtYmVyO1xyXG4gICAgLy8gb3B0aW9uYWwgZGlzcC1BdHRyaWJ1dGUgdmFsdWUsIGNvbnRhaW5zIHRoZSBvcmlnaW5hbCBleHByZXNzaW9uLlxyXG4gICAgcHJpdmF0ZSBfZGlzcD86IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbmRleDogbnVtYmVyLCBkaXNwOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihQYXJzZWRNZXNzYWdlUGFydFR5cGUuSUNVX01FU1NBR0VfUkVGKTtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuX2Rpc3AgPSBkaXNwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc0Rpc3BsYXlTdHJpbmcoZm9ybWF0Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuICc8SUNVLU1lc3NhZ2UtUmVmXycgKyB0aGlzLl9pbmRleCArICcvPic7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkaXNwKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3A7XHJcbiAgICB9XHJcbn1cclxuIl19