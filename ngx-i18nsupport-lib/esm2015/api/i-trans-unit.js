/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Interface of a translation unit in a translation messages file.
 * @record
 */
export function ITransUnit() { }
if (false) {
    /** @type {?} */
    ITransUnit.prototype.id;
    /**
     * The file the unit belongs to.,
     * @return {?}
     */
    ITransUnit.prototype.translationMessagesFile = function () { };
    /**
     * The original text value, that is to be translated.
     * Contains all markup, depends on the concrete format used.
     * @return {?}
     */
    ITransUnit.prototype.sourceContent = function () { };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    ITransUnit.prototype.supportsSetSourceContent = function () { };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    ITransUnit.prototype.setSourceContent = function (newContent) { };
    /**
     * The original text value, that is to be translated, as normalized message.
     * Throws an error if normalized xml is not well formed.
     * (which should not happen in generated files)
     * @return {?}
     */
    ITransUnit.prototype.sourceContentNormalized = function () { };
    /**
     * The translated value.
     * Contains all markup, depends on the concrete format used.
     * @return {?}
     */
    ITransUnit.prototype.targetContent = function () { };
    /**
     * The translated value as normalized message.
     * All placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * Throws an error if normalized xml is not well formed.
     * (which should not happen in generated files)
     * @return {?}
     */
    ITransUnit.prototype.targetContentNormalized = function () { };
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     * @return {?}
     */
    ITransUnit.prototype.targetState = function () { };
    /**
     * Modify the target state.
     * @param {?} newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     * @return {?}
     */
    ITransUnit.prototype.setTargetState = function (newState) { };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    ITransUnit.prototype.sourceReferences = function () { };
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    ITransUnit.prototype.supportsSetSourceReferences = function () { };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    ITransUnit.prototype.setSourceReferences = function (sourceRefs) { };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * @return {?}
     */
    ITransUnit.prototype.description = function () { };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * @return {?}
     */
    ITransUnit.prototype.meaning = function () { };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    ITransUnit.prototype.supportsSetDescriptionAndMeaning = function () { };
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    ITransUnit.prototype.setDescription = function (description) { };
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    ITransUnit.prototype.setMeaning = function (meaning) { };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    ITransUnit.prototype.notes = function () { };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    ITransUnit.prototype.supportsSetNotes = function () { };
    /**
     * Add notes to trans unit.
     * @throws an Error if any note contains description or meaning as from attribute.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    ITransUnit.prototype.setNotes = function (newNotes) { };
    /**
     * Translate the trans unit.
     * @param {?} translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     * @return {?}
     */
    ITransUnit.prototype.translate = function (translation) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS10cmFucy11bml0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiYXBpL2ktdHJhbnMtdW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVdBLGdDQTBKQzs7O0lBeEpHLHdCQUFvQjs7Ozs7SUFLcEIsK0RBQW9EOzs7Ozs7SUFNcEQscURBQXdCOzs7Ozs7O0lBT3hCLGdFQUFvQzs7Ozs7Ozs7SUFRcEMsa0VBQXFDOzs7Ozs7O0lBT3JDLCtEQUE4Qzs7Ozs7O0lBTTlDLHFEQUF3Qjs7Ozs7Ozs7O0lBU3hCLCtEQUE4Qzs7Ozs7OztJQU85QyxtREFBc0I7Ozs7Ozs7O0lBUXRCLDhEQUFpQzs7Ozs7Ozs7OztJQVVqQyx3REFBK0Q7Ozs7Ozs7SUFPL0QsbUVBQXVDOzs7Ozs7OztJQVF2QyxxRUFBNEU7Ozs7OztJQU01RSxtREFBc0I7Ozs7Ozs7SUFPdEIsK0NBQWtCOzs7Ozs7O0lBT2xCLHdFQUE0Qzs7Ozs7O0lBTTVDLGlFQUFvQzs7Ozs7O0lBTXBDLHlEQUE0Qjs7Ozs7OztJQU81Qiw2Q0FBaUI7Ozs7Ozs7SUFPakIsd0RBQTRCOzs7Ozs7O0lBTzVCLHdEQUE0Qjs7Ozs7Ozs7O0lBUzVCLDREQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SU5vcm1hbGl6ZWRNZXNzYWdlfSBmcm9tICcuL2ktbm9ybWFsaXplZC1tZXNzYWdlJztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4vaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtJTm90ZX0gZnJvbSAnLi9pLW5vdGUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDE5LjAzLjIwMTcuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEludGVyZmFjZSBvZiBhIHRyYW5zbGF0aW9uIHVuaXQgaW4gYSB0cmFuc2xhdGlvbiBtZXNzYWdlcyBmaWxlLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNVbml0IHtcclxuXHJcbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpbGUgdGhlIHVuaXQgYmVsb25ncyB0by4sXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKCk6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCB0ZXh0IHZhbHVlLCB0aGF0IGlzIHRvIGJlIHRyYW5zbGF0ZWQuXHJcbiAgICAgKiBDb250YWlucyBhbGwgbWFya3VwLCBkZXBlbmRzIG9uIHRoZSBjb25jcmV0ZSBmb3JtYXQgdXNlZC5cclxuICAgICAqL1xyXG4gICAgc291cmNlQ29udGVudCgpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBzb3VyY2UgY29udGVudCBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldFNvdXJjZUNvbnRlbnQgaW4gdHJhbnMtdW5pdCB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgc3VwcG9ydHNTZXRTb3VyY2VDb250ZW50KCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IHNvdXJjZSBjb250ZW50IGluIHRoZSB0cmFuc3VuaXQuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBkb25lIGJ5IG5nLWV4dHJhY3QuXHJcbiAgICAgKiBNZXRob2Qgb25seSBleGlzdHMgdG8gYWxsb3cgeGxpZmZtZXJnZSB0byBtZXJnZSBtaXNzaW5nIGNoYW5nZWQgc291cmNlIGNvbnRlbnQuXHJcbiAgICAgKiBAcGFyYW0gbmV3Q29udGVudCB0aGUgbmV3IGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIHNldFNvdXJjZUNvbnRlbnQobmV3Q29udGVudDogc3RyaW5nKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCB0ZXh0IHZhbHVlLCB0aGF0IGlzIHRvIGJlIHRyYW5zbGF0ZWQsIGFzIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHhtbCBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKiAod2hpY2ggc2hvdWxkIG5vdCBoYXBwZW4gaW4gZ2VuZXJhdGVkIGZpbGVzKVxyXG4gICAgICovXHJcbiAgICBzb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpOiBJTm9ybWFsaXplZE1lc3NhZ2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHJhbnNsYXRlZCB2YWx1ZS5cclxuICAgICAqIENvbnRhaW5zIGFsbCBtYXJrdXAsIGRlcGVuZHMgb24gdGhlIGNvbmNyZXRlIGZvcm1hdCB1c2VkLlxyXG4gICAgICovXHJcbiAgICB0YXJnZXRDb250ZW50KCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0cmFuc2xhdGVkIHZhbHVlIGFzIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqIEFsbCBwbGFjZWhvbGRlcnMgYXJlIHJlcGxhY2VkIHdpdGgge3tufX0gKHN0YXJ0aW5nIGF0IDApXHJcbiAgICAgKiBhbmQgYWxsIGVtYmVkZGVkIGh0bWwgaXMgcmVwbGFjZWQgYnkgZGlyZWN0IGh0bWwgbWFya3VwLlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIG5vcm1hbGl6ZWQgeG1sIGlzIG5vdCB3ZWxsIGZvcm1lZC5cclxuICAgICAqICh3aGljaCBzaG91bGQgbm90IGhhcHBlbiBpbiBnZW5lcmF0ZWQgZmlsZXMpXHJcbiAgICAgKi9cclxuICAgIHRhcmdldENvbnRlbnROb3JtYWxpemVkKCk6IElOb3JtYWxpemVkTWVzc2FnZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXRlIG9mIHRoZSB0cmFuc2xhdGlvbi5cclxuICAgICAqIChvbiBvZiBuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKVxyXG4gICAgICogUmV0dXJuIHZhbHVlcyBhcmUgZGVmaW5lZCBhcyBDb25zdGFudHMgU1RBVEVfLi4uXHJcbiAgICAgKi9cclxuICAgIHRhcmdldFN0YXRlKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vZGlmeSB0aGUgdGFyZ2V0IHN0YXRlLlxyXG4gICAgICogQHBhcmFtIG5ld1N0YXRlIG9uZSBvZiB0aGUgMyBhbGxvd2VkIHRhcmdldCBzdGF0ZXMgbmV3LCB0cmFuc2xhdGVkLCBmaW5hbC5cclxuICAgICAqIENvbnN0YW50cyBTVEFURV8uLi5cclxuICAgICAqIEludmFsaWQgc3RhdGVzIHRocm93IGFuIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBzZXRUYXJnZXRTdGF0ZShuZXdTdGF0ZTogc3RyaW5nKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCB0aGUgc291cmNlIGVsZW1lbnRzIGluIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICogVGhlIHNvdXJjZSBlbGVtZW50IGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGNvbnRhaW5zIHRoZSBuYW1lIG9mIHRoZSB0ZW1wbGF0ZSBmaWxlIGFuZCBhIGxpbmUgbnVtYmVyIHdpdGggdGhlIHBvc2l0aW9uIGluc2lkZSB0aGUgdGVtcGxhdGUuXHJcbiAgICAgKiBJdCBpcyBqdXN0IGEgaGVscCBmb3IgdHJhbnNsYXRvcnMgdG8gZmluZCB0aGUgY29udGV4dCBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG4gICAgICogVGhpcyBpcyBzZXQgd2hlbiB1c2luZyBBbmd1bGFyIDQuMCBvciBncmVhdGVyLlxyXG4gICAgICogT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyBhbiBlbXB0eSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgc291cmNlUmVmZXJlbmNlcygpOiB7c291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyOiBudW1iZXJ9W107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBzb3VyY2UgcmVmcyBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldFNvdXJjZVJlZmVyZW5jZXMgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHN1cHBvcnRzU2V0U291cmNlUmVmZXJlbmNlcygpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHNvdXJjZSByZWYgZWxlbWVudHMgaW4gdGhlIHRyYW5zdW5pdC5cclxuICAgICAqIE5vcm1hbGx5LCB0aGlzIGlzIGRvbmUgYnkgbmctZXh0cmFjdC5cclxuICAgICAqIE1ldGhvZCBvbmx5IGV4aXN0cyB0byBhbGxvdyB4bGlmZm1lcmdlIHRvIG1lcmdlIG1pc3Npbmcgc291cmNlIHJlZnMuXHJcbiAgICAgKiBAcGFyYW0gc291cmNlUmVmcyB0aGUgc291cmNlcmVmcyB0byBzZXQuIE9sZCBvbmVzIGFyZSByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBzZXRTb3VyY2VSZWZlcmVuY2VzKHNvdXJjZVJlZnM6IHtzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlcn1bXSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVzY3JpcHRpb24gc2V0IGluIHRoZSB0ZW1wbGF0ZSBhcyB2YWx1ZSBvZiB0aGUgaTE4bi1hdHRyaWJ1dGUuXHJcbiAgICAgKiBlLmcuIGkxOG49XCJteWRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKi9cclxuICAgIGRlc2NyaXB0aW9uKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtZWFuaW5nIChpbnRlbnQpIHNldCBpbiB0aGUgdGVtcGxhdGUgYXMgdmFsdWUgb2YgdGhlIGkxOG4tYXR0cmlidXRlLlxyXG4gICAgICogVGhpcyBpcyB0aGUgcGFydCBpbiBmcm9udCBvZiB0aGUgfCBzeW1ib2wuXHJcbiAgICAgKiBlLmcuIGkxOG49XCJtZWFuaW5nfG15ZGVzY3JpcHRpb25cIi5cclxuICAgICAqL1xyXG4gICAgbWVhbmluZygpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBkZXNjcmlwdGlvbiBhbmQgbWVhbmluZyBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldERlc2NyaXB0aW9uIGFuZCBzZXRNZWFuaW5nIHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBzdXBwb3J0c1NldERlc2NyaXB0aW9uQW5kTWVhbmluZygpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIGRlc2NyaXB0aW9uIHByb3BlcnR5IG9mIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gZGVzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgbWVhbmluZyBwcm9wZXJ0eSBvZiB0cmFucy11bml0LlxyXG4gICAgICogQHBhcmFtIG1lYW5pbmcgbWVhbmluZ1xyXG4gICAgICovXHJcbiAgICBzZXRNZWFuaW5nKG1lYW5pbmc6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIG5vdGVzIG9mIHRoZSB0cmFucy11bml0LlxyXG4gICAgICogTm90ZXMgYXJlIHJlbWFya3MgbWFkZSBieSBhIHRyYW5zbGF0b3IuXHJcbiAgICAgKiAoZGVzY3JpcHRpb24gYW5kIG1lYW5pbmcgYXJlIG5vdCBpbmNsdWRlZCBoZXJlISlcclxuICAgICAqL1xyXG4gICAgbm90ZXMoKTogSU5vdGVbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIG5vdGVzIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0Tm90ZXMgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHN1cHBvcnRzU2V0Tm90ZXMoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBub3RlcyB0byB0cmFucyB1bml0LlxyXG4gICAgICogQHBhcmFtIG5ld05vdGVzIHRoZSBub3RlcyB0byBhZGQuXHJcbiAgICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGFueSBub3RlIGNvbnRhaW5zIGRlc2NyaXB0aW9uIG9yIG1lYW5pbmcgYXMgZnJvbSBhdHRyaWJ1dGUuXHJcbiAgICAgKi9cclxuICAgIHNldE5vdGVzKG5ld05vdGVzOiBJTm90ZVtdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSB0aGUgdHJhbnMgdW5pdC5cclxuICAgICAqIEBwYXJhbSB0cmFuc2xhdGlvbiB0aGUgdHJhbnNsYXRlZCBzdHJpbmcgb3IgKHByZWZlcnJlZCkgYSBub3JtYWxpemVkIG1lc3NhZ2UuXHJcbiAgICAgKiBUaGUgcHVyZSBzdHJpbmcgY2FuIGNvbnRhaW4gYW55IG1hcmt1cCBhbmQgd2lsbCBub3QgYmUgY2hlY2tlZC5cclxuICAgICAqIFNvIGl0IGNhbiBkYW1hZ2UgdGhlIGRvY3VtZW50LlxyXG4gICAgICogQSBub3JtYWxpemVkIG1lc3NhZ2UgcHJldmVudHMgdGhpcy5cclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uOiBzdHJpbmcgfCBJTm9ybWFsaXplZE1lc3NhZ2UpO1xyXG5cclxufVxyXG4iXX0=