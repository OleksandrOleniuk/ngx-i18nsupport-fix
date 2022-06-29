/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A part of a parsed message.
 * Can be a text, a placeholder, a tag
 */
/** @enum {number} */
var ParsedMessagePartType = {
    TEXT: 0,
    PLACEHOLDER: 1,
    START_TAG: 2,
    END_TAG: 3,
    EMPTY_TAG: 4,
    ICU_MESSAGE: 5,
    ICU_MESSAGE_REF: 6,
};
export { ParsedMessagePartType };
ParsedMessagePartType[ParsedMessagePartType.TEXT] = 'TEXT';
ParsedMessagePartType[ParsedMessagePartType.PLACEHOLDER] = 'PLACEHOLDER';
ParsedMessagePartType[ParsedMessagePartType.START_TAG] = 'START_TAG';
ParsedMessagePartType[ParsedMessagePartType.END_TAG] = 'END_TAG';
ParsedMessagePartType[ParsedMessagePartType.EMPTY_TAG] = 'EMPTY_TAG';
ParsedMessagePartType[ParsedMessagePartType.ICU_MESSAGE] = 'ICU_MESSAGE';
ParsedMessagePartType[ParsedMessagePartType.ICU_MESSAGE_REF] = 'ICU_MESSAGE_REF';
/**
 * @abstract
 */
var /**
 * @abstract
 */
ParsedMessagePart = /** @class */ (function () {
    function ParsedMessagePart(type) {
        this.type = type;
    }
    return ParsedMessagePart;
}());
/**
 * @abstract
 */
export { ParsedMessagePart };
if (false) {
    /** @type {?} */
    ParsedMessagePart.prototype.type;
    /**
     * String representation of the part.
     * @abstract
     * @param {?=} format optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     * @return {?}
     */
    ParsedMessagePart.prototype.asDisplayString = function (format) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvcGFyc2VkLW1lc3NhZ2UtcGFydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQU9JLE9BQUk7SUFDSixjQUFXO0lBQ1gsWUFBUztJQUNULFVBQU87SUFDUCxZQUFTO0lBQ1QsY0FBVztJQUNYLGtCQUFlOzs7Ozs7Ozs7Ozs7O0FBR25COzs7O0lBRUksMkJBQW1CLElBQTJCO1FBQTNCLFNBQUksR0FBSixJQUFJLENBQXVCO0lBRTlDLENBQUM7SUFTTCx3QkFBQztBQUFELENBQUMsQUFiRCxJQWFDOzs7Ozs7O0lBWGUsaUNBQWtDOzs7Ozs7OztJQVM5QyxvRUFBeUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDUuMDUuMjAxNy5cclxuICogQSBwYXJ0IG9mIGEgcGFyc2VkIG1lc3NhZ2UuXHJcbiAqIENhbiBiZSBhIHRleHQsIGEgcGxhY2Vob2xkZXIsIGEgdGFnXHJcbiAqL1xyXG5cclxuZXhwb3J0IGVudW0gUGFyc2VkTWVzc2FnZVBhcnRUeXBlIHtcclxuICAgIFRFWFQsXHJcbiAgICBQTEFDRUhPTERFUixcclxuICAgIFNUQVJUX1RBRyxcclxuICAgIEVORF9UQUcsXHJcbiAgICBFTVBUWV9UQUcsXHJcbiAgICBJQ1VfTUVTU0FHRSxcclxuICAgIElDVV9NRVNTQUdFX1JFRlxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFyc2VkTWVzc2FnZVBhcnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBQYXJzZWRNZXNzYWdlUGFydFR5cGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHBhcnQuXHJcbiAgICAgKiBAcGFyYW0gZm9ybWF0IG9wdGlvbmFsIHdheSB0byBkZXRlcm1pbmUgdGhlIGV4YWN0IHN5bnRheC5cclxuICAgICAqIEFsbG93ZWQgZm9ybWF0cyBhcmUgZGVmaW5lZCBhcyBjb25zdGFudHMgTk9STUFMSVpBVElPTl9GT1JNQVQuLi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IGFzRGlzcGxheVN0cmluZyhmb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG59XHJcbiJdfQ==