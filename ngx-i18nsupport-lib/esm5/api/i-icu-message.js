/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A message category, which is a part of an ICU message.
 * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
 * has 4 category objects with the categories =0, =1, =2, other.
 * @record
 */
export function IICUMessageCategory() { }
if (false) {
    /**
     * Fix part.
     * For plural mesages the category is "=0" or "=1" or "few" or "other"...
     * For select messages it is the matching key.
     * @return {?}
     */
    IICUMessageCategory.prototype.getCategory = function () { };
    /**
     * Translatable part.
     * @return {?}
     */
    IICUMessageCategory.prototype.getMessageNormalized = function () { };
}
/**
 * An ICU message.
 * @record
 */
export function IICUMessage() { }
if (false) {
    /**
     * Is it a plural message?
     * @return {?}
     */
    IICUMessage.prototype.isPluralMessage = function () { };
    /**
     * Is it a select message?
     * @return {?}
     */
    IICUMessage.prototype.isSelectMessage = function () { };
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     * @return {?}
     */
    IICUMessage.prototype.getCategories = function () { };
    /**
     * Returns the icu message content as format dependent native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return {?}
     */
    IICUMessage.prototype.asNativeString = function () { };
    /**
     * Translate message and return a new, translated message
     * @param {?} translation the translation (hashmap of categories and translations).
     * @return {?} new message wit translated content.
     */
    IICUMessage.prototype.translate = function (translation) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS1pY3UtbWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImFwaS9pLWljdS1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFXQSx5Q0FhQzs7Ozs7Ozs7SUFORyw0REFBc0I7Ozs7O0lBS3RCLHFFQUEyQzs7Ozs7O0FBTS9DLGlDQStCQzs7Ozs7O0lBMUJHLHdEQUEyQjs7Ozs7SUFLM0Isd0RBQTJCOzs7Ozs7O0lBTzNCLHNEQUF1Qzs7Ozs7O0lBTXZDLHVEQUF5Qjs7Ozs7O0lBT3pCLDZEQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU5vcm1hbGl6ZWRNZXNzYWdlfSBmcm9tICcuL2ktbm9ybWFsaXplZC1tZXNzYWdlJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDAyLjA2LjIwMTcuXHJcbiAqIEludGVyZmFjZXMgZm9yIGhhbmRsaW5nIG9mIElDVSBNZXNzYWdlcy5cclxuICovXHJcblxyXG4vKipcclxuICogQSBtZXNzYWdlIGNhdGVnb3J5LCB3aGljaCBpcyBhIHBhcnQgb2YgYW4gSUNVIG1lc3NhZ2UuXHJcbiAqIEUuZy4gdGhlIElDVSBtZXNzYWdlIHt3b2x2ZXMsIHBsdXJhbCwgPTAge25vIHdvbHZlc30gPTEge29uZSB3b2xmfSA9MiB7dHdvIHdvbHZlc30gb3RoZXIge2Egd29sZiBwYWNrfX1cclxuICogaGFzIDQgY2F0ZWdvcnkgb2JqZWN0cyB3aXRoIHRoZSBjYXRlZ29yaWVzID0wLCA9MSwgPTIsIG90aGVyLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJSUNVTWVzc2FnZUNhdGVnb3J5IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpeCBwYXJ0LlxyXG4gICAgICogRm9yIHBsdXJhbCBtZXNhZ2VzIHRoZSBjYXRlZ29yeSBpcyBcIj0wXCIgb3IgXCI9MVwiIG9yIFwiZmV3XCIgb3IgXCJvdGhlclwiLi4uXHJcbiAgICAgKiBGb3Igc2VsZWN0IG1lc3NhZ2VzIGl0IGlzIHRoZSBtYXRjaGluZyBrZXkuXHJcbiAgICAgKi9cclxuICAgIGdldENhdGVnb3J5KCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0YWJsZSBwYXJ0LlxyXG4gICAgICovXHJcbiAgICBnZXRNZXNzYWdlTm9ybWFsaXplZCgpOiBJTm9ybWFsaXplZE1lc3NhZ2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbiBJQ1UgbWVzc2FnZS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUlDVU1lc3NhZ2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgaXQgYSBwbHVyYWwgbWVzc2FnZT9cclxuICAgICAqL1xyXG4gICAgaXNQbHVyYWxNZXNzYWdlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJcyBpdCBhIHNlbGVjdCBtZXNzYWdlP1xyXG4gICAgICovXHJcbiAgICBpc1NlbGVjdE1lc3NhZ2UoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCB0aGUgcGFydHMgb2YgdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBFLmcuIHRoZSBJQ1UgbWVzc2FnZSB7d29sdmVzLCBwbHVyYWwsID0wIHtubyB3b2x2ZXN9ID0xIHtvbmUgd29sZn0gPTIge3R3byB3b2x2ZXN9IG90aGVyIHthIHdvbGYgcGFja319XHJcbiAgICAgKiBoYXMgNCBjYXRlZ29yeSBvYmplY3RzIHdpdGggdGhlIGNhdGVnb3JpZXMgPTAsID0xLCA9Miwgb3RoZXIuXHJcbiAgICAgKi9cclxuICAgIGdldENhdGVnb3JpZXMoKTogSUlDVU1lc3NhZ2VDYXRlZ29yeVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgaWN1IG1lc3NhZ2UgY29udGVudCBhcyBmb3JtYXQgZGVwZW5kZW50IG5hdGl2ZSBzdHJpbmcuXHJcbiAgICAgKiBUaGlzIGlzLCBob3cgaXQgaXMgc3RvcmVkLCBzb21ldGhpbmcgbGlrZSAne3gsIHBsdXJhbCwgPTAgey4ufSdcclxuICAgICAqL1xyXG4gICAgYXNOYXRpdmVTdHJpbmcoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIG1lc3NhZ2UgYW5kIHJldHVybiBhIG5ldywgdHJhbnNsYXRlZCBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRpb24gdGhlIHRyYW5zbGF0aW9uIChoYXNobWFwIG9mIGNhdGVnb3JpZXMgYW5kIHRyYW5zbGF0aW9ucykuXHJcbiAgICAgKiBAcmV0dXJuIG5ldyBtZXNzYWdlIHdpdCB0cmFuc2xhdGVkIGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbjogSUlDVU1lc3NhZ2VUcmFuc2xhdGlvbik6IElJQ1VNZXNzYWdlO1xyXG59XHJcblxyXG4vKipcclxuICogQSB0cmFuc2xhdGlvbiBvZiBhbiBJQ1UgbWVzc2FnZS5cclxuICogQ29udGFpbnMgdGhlIHRyYW5zbGF0aW9uIGZvciBldmVyeSBjYXRlZ29yeS5cclxuICogVGhlIHRyYW5zbGF0aW9uIGNhbiBiZSBhIHN0cmluZywgd2hpY2ggaXMgdGhlIG5vcm1hbGl6ZWQgZm9ybSBvZiB0aGUgdHJhbnNsYXRpb24uXHJcbiAqIE9yIGl0IGNhbiBiZSBhIGNvbXBsZXggdHJhbnNsYXRpb24sIHdoaWNoIGlzIGZvciB0aGUgY2FzZSBvZiBJQ1UgbWVzc2FnZXMgZW1iZWRkZWQgaW4gSUNVIG1lc3NhZ2VzLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgSUlDVU1lc3NhZ2VUcmFuc2xhdGlvbiA9IHsgW2NhdGVnb3J5OiBzdHJpbmddOiBzdHJpbmd8SUlDVU1lc3NhZ2VUcmFuc2xhdGlvbn07XHJcbiJdfQ==