/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 09.05.2017.
 * A normalized message is an abstraction of a translation containing some markup.
 * Markup can be placeholders or html tags.
 * @record
 */
export function ValidationErrors() { }
if (false) {
    /** @type {?|undefined} */
    ValidationErrors.prototype.placeholderAdded;
    /** @type {?|undefined} */
    ValidationErrors.prototype.placeholderRemoved;
    /** @type {?|undefined} */
    ValidationErrors.prototype.tagAdded;
    /** @type {?|undefined} */
    ValidationErrors.prototype.tagRemoved;
    /* Skipping unhandled member: [key: string]: any;*/
}
/**
 * @record
 */
export function INormalizedMessage() { }
if (false) {
    /**
     * normalized message as string.
     * @param {?=} format optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     * @return {?}
     */
    INormalizedMessage.prototype.asDisplayString = function (format) { };
    /**
     * Validate the message.
     * @return {?} null, if ok, error object otherwise.
     */
    INormalizedMessage.prototype.validate = function () { };
    /**
     * Validate the message, check for warnings only.
     * A warning shows, that the message is acceptable, but misses something.
     * E.g. if you remove a placeholder or a special tag from the original message, this generates a warning.
     * @return {?} null, if no warning, warnings as error object otherwise.
     */
    INormalizedMessage.prototype.validateWarnings = function () { };
    /**
     * Returns the message content as format dependent native string.
     * Includes all format specific markup like <ph id="INTERPOLATION" ../> ..
     * @return {?}
     */
    INormalizedMessage.prototype.asNativeString = function () { };
    /**
     * Test wether this message is an ICU message.
     * @return {?} true, if it is an ICU message.
     */
    INormalizedMessage.prototype.isICUMessage = function () { };
    /**
     * Test wether this message contains an ICU message reference.
     * ICU message references are something like <x ID="ICU"../>.
     * @return {?} true, if there is an ICU message reference in the message.
     */
    INormalizedMessage.prototype.containsICUMessageRef = function () { };
    /**
     * If this message is an ICU message, returns its structure.
     * Otherwise this method returns null.
     * @return {?} ICUMessage or null.
     */
    INormalizedMessage.prototype.getICUMessage = function () { };
    /**
     * Create a new normalized message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is an ICU message.
     * @param {?} normalizedString the translation in normalized form.
     * If the message is an ICUMessage (getICUMessage returns a value), use translateICUMessage instead.
     * @return {?}
     */
    INormalizedMessage.prototype.translate = function (normalizedString) { };
    /**
     * Create a new normalized icu message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is not an ICU message.
     * @param {?} icuTranslation the translation, this is the translation of the ICU message,
     * which is not a string, but a collections of the translations of the different categories.
     * The message must be an ICUMessage (getICUMessage returns a value)
     * @return {?}
     */
    INormalizedMessage.prototype.translateICUMessage = function (icuTranslation) { };
    /**
     * Create a new normalized message from a native xml string as a translation of this one.
     * @param {?} nativeString xml string in the format of the underlying file format.
     * Throws an error if native string is not acceptable.
     * @return {?}
     */
    INormalizedMessage.prototype.translateNativeString = function (nativeString) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS1ub3JtYWxpemVkLW1lc3NhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJhcGkvaS1ub3JtYWxpemVkLW1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLHNDQU1DOzs7SUFKRyw0Q0FBMEI7O0lBQzFCLDhDQUE0Qjs7SUFDNUIsb0NBQWtCOztJQUNsQixzQ0FBb0I7Ozs7OztBQUd4Qix3Q0EyRUM7Ozs7Ozs7O0lBcEVHLHFFQUF5Qzs7Ozs7SUFNekMsd0RBQW9DOzs7Ozs7O0lBUXBDLGdFQUE0Qzs7Ozs7O0lBTTVDLDhEQUF5Qjs7Ozs7SUFNekIsNERBQXdCOzs7Ozs7SUFPeEIscUVBQWlDOzs7Ozs7SUFPakMsNkRBQTZCOzs7Ozs7Ozs7SUFTN0IseUVBQXdEOzs7Ozs7Ozs7O0lBVXhELGlGQUFnRjs7Ozs7OztJQU9oRixpRkFBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lJQ1VNZXNzYWdlLCBJSUNVTWVzc2FnZVRyYW5zbGF0aW9ufSBmcm9tICcuL2ktaWN1LW1lc3NhZ2UnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDA5LjA1LjIwMTcuXHJcbiAqIEEgbm9ybWFsaXplZCBtZXNzYWdlIGlzIGFuIGFic3RyYWN0aW9uIG9mIGEgdHJhbnNsYXRpb24gY29udGFpbmluZyBzb21lIG1hcmt1cC5cclxuICogTWFya3VwIGNhbiBiZSBwbGFjZWhvbGRlcnMgb3IgaHRtbCB0YWdzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGlvbkVycm9ycyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XHJcbiAgICBwbGFjZWhvbGRlckFkZGVkPzogc3RyaW5nO1xyXG4gICAgcGxhY2Vob2xkZXJSZW1vdmVkPzogc3RyaW5nO1xyXG4gICAgdGFnQWRkZWQ/OiBzdHJpbmc7XHJcbiAgICB0YWdSZW1vdmVkPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElOb3JtYWxpemVkTWVzc2FnZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub3JtYWxpemVkIG1lc3NhZ2UgYXMgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIGZvcm1hdCBvcHRpb25hbCB3YXkgdG8gZGV0ZXJtaW5lIHRoZSBleGFjdCBzeW50YXguXHJcbiAgICAgKiBBbGxvd2VkIGZvcm1hdHMgYXJlIGRlZmluZWQgYXMgY29uc3RhbnRzIE5PUk1BTElaQVRJT05fRk9STUFULi4uXHJcbiAgICAgKi9cclxuICAgIGFzRGlzcGxheVN0cmluZyhmb3JtYXQ/OiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgbWVzc2FnZS5cclxuICAgICAqIEByZXR1cm4gbnVsbCwgaWYgb2ssIGVycm9yIG9iamVjdCBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgdGhlIG1lc3NhZ2UsIGNoZWNrIGZvciB3YXJuaW5ncyBvbmx5LlxyXG4gICAgICogQSB3YXJuaW5nIHNob3dzLCB0aGF0IHRoZSBtZXNzYWdlIGlzIGFjY2VwdGFibGUsIGJ1dCBtaXNzZXMgc29tZXRoaW5nLlxyXG4gICAgICogRS5nLiBpZiB5b3UgcmVtb3ZlIGEgcGxhY2Vob2xkZXIgb3IgYSBzcGVjaWFsIHRhZyBmcm9tIHRoZSBvcmlnaW5hbCBtZXNzYWdlLCB0aGlzIGdlbmVyYXRlcyBhIHdhcm5pbmcuXHJcbiAgICAgKiBAcmV0dXJuIG51bGwsIGlmIG5vIHdhcm5pbmcsIHdhcm5pbmdzIGFzIGVycm9yIG9iamVjdCBvdGhlcndpc2UuXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlV2FybmluZ3MoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBtZXNzYWdlIGNvbnRlbnQgYXMgZm9ybWF0IGRlcGVuZGVudCBuYXRpdmUgc3RyaW5nLlxyXG4gICAgICogSW5jbHVkZXMgYWxsIGZvcm1hdCBzcGVjaWZpYyBtYXJrdXAgbGlrZSA8cGggaWQ9XCJJTlRFUlBPTEFUSU9OXCIgLi4vPiAuLlxyXG4gICAgICovXHJcbiAgICBhc05hdGl2ZVN0cmluZygpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0IHdldGhlciB0aGlzIG1lc3NhZ2UgaXMgYW4gSUNVIG1lc3NhZ2UuXHJcbiAgICAgKiBAcmV0dXJuIHRydWUsIGlmIGl0IGlzIGFuIElDVSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBpc0lDVU1lc3NhZ2UoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3Qgd2V0aGVyIHRoaXMgbWVzc2FnZSBjb250YWlucyBhbiBJQ1UgbWVzc2FnZSByZWZlcmVuY2UuXHJcbiAgICAgKiBJQ1UgbWVzc2FnZSByZWZlcmVuY2VzIGFyZSBzb21ldGhpbmcgbGlrZSA8eCBJRD1cIklDVVwiLi4vPi5cclxuICAgICAqIEByZXR1cm4gdHJ1ZSwgaWYgdGhlcmUgaXMgYW4gSUNVIG1lc3NhZ2UgcmVmZXJlbmNlIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBjb250YWluc0lDVU1lc3NhZ2VSZWYoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoaXMgbWVzc2FnZSBpcyBhbiBJQ1UgbWVzc2FnZSwgcmV0dXJucyBpdHMgc3RydWN0dXJlLlxyXG4gICAgICogT3RoZXJ3aXNlIHRoaXMgbWV0aG9kIHJldHVybnMgbnVsbC5cclxuICAgICAqIEByZXR1cm4gSUNVTWVzc2FnZSBvciBudWxsLlxyXG4gICAgICovXHJcbiAgICBnZXRJQ1VNZXNzYWdlKCk6IElJQ1VNZXNzYWdlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IG5vcm1hbGl6ZWQgbWVzc2FnZSBhcyBhIHRyYW5zbGF0aW9uIG9mIHRoaXMgb25lLlxyXG4gICAgICogQHBhcmFtIG5vcm1hbGl6ZWRTdHJpbmcgdGhlIHRyYW5zbGF0aW9uIGluIG5vcm1hbGl6ZWQgZm9ybS5cclxuICAgICAqIElmIHRoZSBtZXNzYWdlIGlzIGFuIElDVU1lc3NhZ2UgKGdldElDVU1lc3NhZ2UgcmV0dXJucyBhIHZhbHVlKSwgdXNlIHRyYW5zbGF0ZUlDVU1lc3NhZ2UgaW5zdGVhZC5cclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgbm9ybWFsaXplZCBzdHJpbmcgaXMgbm90IHdlbGwgZm9ybWVkLlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHRvbywgaWYgdGhpcyBpcyBhbiBJQ1UgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlKG5vcm1hbGl6ZWRTdHJpbmc6IHN0cmluZyk6IElOb3JtYWxpemVkTWVzc2FnZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBub3JtYWxpemVkIGljdSBtZXNzYWdlIGFzIGEgdHJhbnNsYXRpb24gb2YgdGhpcyBvbmUuXHJcbiAgICAgKiBAcGFyYW0gaWN1VHJhbnNsYXRpb24gdGhlIHRyYW5zbGF0aW9uLCB0aGlzIGlzIHRoZSB0cmFuc2xhdGlvbiBvZiB0aGUgSUNVIG1lc3NhZ2UsXHJcbiAgICAgKiB3aGljaCBpcyBub3QgYSBzdHJpbmcsIGJ1dCBhIGNvbGxlY3Rpb25zIG9mIHRoZSB0cmFuc2xhdGlvbnMgb2YgdGhlIGRpZmZlcmVudCBjYXRlZ29yaWVzLlxyXG4gICAgICogVGhlIG1lc3NhZ2UgbXVzdCBiZSBhbiBJQ1VNZXNzYWdlIChnZXRJQ1VNZXNzYWdlIHJldHVybnMgYSB2YWx1ZSlcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgbm9ybWFsaXplZCBzdHJpbmcgaXMgbm90IHdlbGwgZm9ybWVkLlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHRvbywgaWYgdGhpcyBpcyBub3QgYW4gSUNVIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0ZUlDVU1lc3NhZ2UoaWN1VHJhbnNsYXRpb246IElJQ1VNZXNzYWdlVHJhbnNsYXRpb24pOiBJTm9ybWFsaXplZE1lc3NhZ2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgbm9ybWFsaXplZCBtZXNzYWdlIGZyb20gYSBuYXRpdmUgeG1sIHN0cmluZyBhcyBhIHRyYW5zbGF0aW9uIG9mIHRoaXMgb25lLlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0cmluZyB4bWwgc3RyaW5nIGluIHRoZSBmb3JtYXQgb2YgdGhlIHVuZGVybHlpbmcgZmlsZSBmb3JtYXQuXHJcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgbmF0aXZlIHN0cmluZyBpcyBub3QgYWNjZXB0YWJsZS5cclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlTmF0aXZlU3RyaW5nKG5hdGl2ZVN0cmluZzogc3RyaW5nKTogSU5vcm1hbGl6ZWRNZXNzYWdlO1xyXG5cclxufVxyXG4iXX0=