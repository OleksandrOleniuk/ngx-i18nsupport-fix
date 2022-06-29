/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * The Common interface of XliffFile and XmbFile.
 * The merge process only uses this interface.
 * Created by martin on 10.03.2017.
 * @record
 */
export function ITranslationMessagesFile() { }
if (false) {
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    ITranslationMessagesFile.prototype.i18nFormat = function () { };
    /**
     * File type as displayable, human readable string.
     * Currently 'XLIFF 1.2', 'XLIFF 2.0' or 'XMB' / 'XTB'
     * Returns one of the constants FILETYPE_..
     * @return {?}
     */
    ITranslationMessagesFile.prototype.fileType = function () { };
    /**
     * warnings found in the file
     * @return {?}
     */
    ITranslationMessagesFile.prototype.warnings = function () { };
    /**
     * Total number of translation units found in the file.
     * @return {?}
     */
    ITranslationMessagesFile.prototype.numberOfTransUnits = function () { };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    ITranslationMessagesFile.prototype.numberOfUntranslatedTransUnits = function () { };
    /**
     * Number of translation units with state 'final'.
     * @return {?}
     */
    ITranslationMessagesFile.prototype.numberOfReviewedTransUnits = function () { };
    /**
     * Number of translation units without id found in the file.
     * @return {?}
     */
    ITranslationMessagesFile.prototype.numberOfTransUnitsWithMissingId = function () { };
    /**
     * Get source language.
     * @return {?} source language.
     */
    ITranslationMessagesFile.prototype.sourceLanguage = function () { };
    /**
     * Get target language.
     * @return {?} target language.
     */
    ITranslationMessagesFile.prototype.targetLanguage = function () { };
    /**
     * Loop over all Translation Units.
     * @param {?} callback callback
     * @return {?}
     */
    ITranslationMessagesFile.prototype.forEachTransUnit = function (callback) { };
    /**
     * Get trans-unit with given id.
     * @param {?} id id
     * @return {?} trans-unit with given id.
     */
    ITranslationMessagesFile.prototype.transUnitWithId = function (id) { };
    /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    ITranslationMessagesFile.prototype.setSourceLanguage = function (language) { };
    /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    ITranslationMessagesFile.prototype.setTargetLanguage = function (language) { };
    /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetPraefix targetPraefix
     * @return {?}
     */
    ITranslationMessagesFile.prototype.setNewTransUnitTargetPraefix = function (targetPraefix) { };
    /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return {?} praefix used when copying source to target.
     */
    ITranslationMessagesFile.prototype.getNewTransUnitTargetPraefix = function () { };
    /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetSuffix targetSuffix
     * @return {?}
     */
    ITranslationMessagesFile.prototype.setNewTransUnitTargetSuffix = function (targetSuffix) { };
    /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return {?} suffix used when copying source to target.
     */
    ITranslationMessagesFile.prototype.getNewTransUnitTargetSuffix = function () { };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    ITranslationMessagesFile.prototype.importNewTransUnit = function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) { };
    /**
     * Remove the trans-unit with the given id.
     * @param {?} id id
     * @return {?}
     */
    ITranslationMessagesFile.prototype.removeTransUnitWithId = function (id) { };
    /**
     * The filename where the data is read from.
     * @return {?}
     */
    ITranslationMessagesFile.prototype.filename = function () { };
    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     * @return {?}
     */
    ITranslationMessagesFile.prototype.encoding = function () { };
    /**
     * The xml content to be saved after changes are made.
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    ITranslationMessagesFile.prototype.editedContent = function (beautifyOutput) { };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    ITranslationMessagesFile.prototype.createTranslationFileForLang = function (lang, filename, isDefaultLang, copyContent) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiYXBpL2ktdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsOENBa0xDOzs7Ozs7OztJQTNLRyxnRUFBcUI7Ozs7Ozs7SUFPckIsOERBQW1COzs7OztJQUtuQiw4REFBcUI7Ozs7O0lBS3JCLHdFQUE2Qjs7Ozs7O0lBTTdCLG9GQUF5Qzs7Ozs7SUFLekMsZ0ZBQXFDOzs7OztJQUtyQyxxRkFBMEM7Ozs7O0lBTTFDLG9FQUF5Qjs7Ozs7SUFNekIsb0VBQXlCOzs7Ozs7SUFNekIsOEVBQThEOzs7Ozs7SUFPOUQsdUVBQXdDOzs7Ozs7SUFVeEMsK0VBQW9DOzs7Ozs7SUFNcEMsK0VBQW9DOzs7Ozs7OztJQVFwQywrRkFBb0Q7Ozs7OztJQU9wRCxrRkFBdUM7Ozs7Ozs7O0lBUXZDLDZGQUFrRDs7Ozs7O0lBT2xELGlGQUFzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3QnRDLHdJQUNpQjs7Ozs7O0lBTWpCLDZFQUFrQzs7Ozs7SUFLbEMsOERBQW1COzs7OztJQUtuQiw4REFBbUI7Ozs7Ozs7OztJQVNuQixpRkFBZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQmhELDRIQUFxSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnLi9pLXRyYW5zLXVuaXQnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDb21tb24gaW50ZXJmYWNlIG9mIFhsaWZmRmlsZSBhbmQgWG1iRmlsZS5cclxuICogVGhlIG1lcmdlIHByb2Nlc3Mgb25seSB1c2VzIHRoaXMgaW50ZXJmYWNlLlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAxMC4wMy4yMDE3LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsZSBmb3JtYXQgYXMgaXQgaXMgdXNlZCBpbiBjb25maWcgZmlsZXMuXHJcbiAgICAgKiBDdXJyZW50bHkgJ3hsZicsICd4bGYyJywgJ3htYicsICd4dGInXHJcbiAgICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgY29uc3RhbnRzIEZPUk1BVF8uLlxyXG4gICAgICovXHJcbiAgICBpMThuRm9ybWF0KCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgdHlwZSBhcyBkaXNwbGF5YWJsZSwgaHVtYW4gcmVhZGFibGUgc3RyaW5nLlxyXG4gICAgICogQ3VycmVudGx5ICdYTElGRiAxLjInLCAnWExJRkYgMi4wJyBvciAnWE1CJyAvICdYVEInXHJcbiAgICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgY29uc3RhbnRzIEZJTEVUWVBFXy4uXHJcbiAgICAgKi9cclxuICAgIGZpbGVUeXBlKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIHdhcm5pbmdzIGZvdW5kIGluIHRoZSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHdhcm5pbmdzKCk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHRyYW5zbGF0aW9uIHVuaXRzIGZvdW5kIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBudW1iZXJPZlRyYW5zVW5pdHMoKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIHRyYW5zbGF0aW9uIHVuaXRzIHdpdGhvdXQgdHJhbnNsYXRpb24gZm91bmQgaW4gdGhlIGZpbGUuXHJcbiAgICAgKiBUaGVzZSB1bml0cyBoYXZlIHN0YXRlICd0cmFuc2xhdGVkJy5cclxuICAgICAqL1xyXG4gICAgbnVtYmVyT2ZVbnRyYW5zbGF0ZWRUcmFuc1VuaXRzKCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiB0cmFuc2xhdGlvbiB1bml0cyB3aXRoIHN0YXRlICdmaW5hbCcuXHJcbiAgICAgKi9cclxuICAgIG51bWJlck9mUmV2aWV3ZWRUcmFuc1VuaXRzKCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiB0cmFuc2xhdGlvbiB1bml0cyB3aXRob3V0IGlkIGZvdW5kIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBudW1iZXJPZlRyYW5zVW5pdHNXaXRoTWlzc2luZ0lkKCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcmV0dXJuIHNvdXJjZSBsYW5ndWFnZS5cclxuICAgICAqL1xyXG4gICAgc291cmNlTGFuZ3VhZ2UoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqIEByZXR1cm4gdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICB0YXJnZXRMYW5ndWFnZSgpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb29wIG92ZXIgYWxsIFRyYW5zbGF0aW9uIFVuaXRzLlxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIGNhbGxiYWNrXHJcbiAgICAgKi9cclxuICAgIGZvckVhY2hUcmFuc1VuaXQoY2FsbGJhY2s6ICgodHJhbnN1bml0OiBJVHJhbnNVbml0KSA9PiB2b2lkKSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdHJhbnMtdW5pdCB3aXRoIGdpdmVuIGlkLlxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKiBAcmV0dXJuIHRyYW5zLXVuaXQgd2l0aCBnaXZlbiBpZC5cclxuICAgICAqL1xyXG4gICAgdHJhbnNVbml0V2l0aElkKGlkOiBzdHJpbmcpOiBJVHJhbnNVbml0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCBmdW5jdGlvbnMgZm9sbG93aW5nIGhlclxyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgc2V0U291cmNlTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSB0YXJnZXQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgc2V0VGFyZ2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHByYWVmaXggdXNlZCB3aGVuIGNvcHlpbmcgc291cmNlIHRvIHRhcmdldC5cclxuICAgICAqIFRoaXMgaXMgdXNlZCBieSBpbXBvcnROZXdUcmFuc1VuaXQgYW5kIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcgbWV0aG9kcy5cclxuICAgICAqIChzaW5jZSAxLjguMClcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQcmFlZml4IHRhcmdldFByYWVmaXhcclxuICAgICAqL1xyXG4gICAgc2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCh0YXJnZXRQcmFlZml4OiBzdHJpbmcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBwcmFlZml4IHVzZWQgd2hlbiBjb3B5aW5nIHNvdXJjZSB0byB0YXJnZXQuXHJcbiAgICAgKiAoc2luY2UgMS44LjApXHJcbiAgICAgKiBAcmV0dXJuIHByYWVmaXggdXNlZCB3aGVuIGNvcHlpbmcgc291cmNlIHRvIHRhcmdldC5cclxuICAgICAqL1xyXG4gICAgZ2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCgpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHN1ZmZpeCB1c2VkIHdoZW4gY29weWluZyBzb3VyY2UgdG8gdGFyZ2V0LlxyXG4gICAgICogVGhpcyBpcyB1c2VkIGJ5IGltcG9ydE5ld1RyYW5zVW5pdCBhbmQgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyBtZXRob2RzLlxyXG4gICAgICogKHNpbmNlIDEuOC4wKVxyXG4gICAgICogQHBhcmFtIHRhcmdldFN1ZmZpeCB0YXJnZXRTdWZmaXhcclxuICAgICAqL1xyXG4gICAgc2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KHRhcmdldFN1ZmZpeDogc3RyaW5nKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgc3VmZml4IHVzZWQgd2hlbiBjb3B5aW5nIHNvdXJjZSB0byB0YXJnZXQuXHJcbiAgICAgKiAoc2luY2UgMS44LjApXHJcbiAgICAgKiBAcmV0dXJuIHN1ZmZpeCB1c2VkIHdoZW4gY29weWluZyBzb3VyY2UgdG8gdGFyZ2V0LlxyXG4gICAgICovXHJcbiAgICBnZXROZXdUcmFuc1VuaXRUYXJnZXRTdWZmaXgoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbmV3IHRyYW5zLXVuaXQgdG8gdGhpcyBmaWxlLlxyXG4gICAgICogVGhlIHRyYW5zIHVuaXQgc3RlbXMgZnJvbSBhbm90aGVyIGZpbGUuXHJcbiAgICAgKiBJdCBjb3BpZXMgdGhlIHNvdXJjZSBjb250ZW50IG9mIHRoZSB0dSB0byB0aGUgdGFyZ2V0IGNvbnRlbnQgdG9vLFxyXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgaXNEZWZhdWx0TGFuZyBhbmQgY29weUNvbnRlbnQuXHJcbiAgICAgKiBTbyB0aGUgc291cmNlIGNhbiBiZSB1c2VkIGFzIGEgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAodXNlZCBieSB4bGlmZm1lcmdlKVxyXG4gICAgICogQHBhcmFtIGZvcmVpZ25UcmFuc1VuaXQgdGhlIHRyYW5zIHVuaXQgdG8gYmUgaW1wb3J0ZWQuXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICogQHBhcmFtIGltcG9ydEFmdGVyRWxlbWVudCBvcHRpb25hbCAoc2luY2UgMS4xMCkgb3RoZXIgdHJhbnN1bml0IChwYXJ0IG9mIHRoaXMgZmlsZSksIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgYW5jZXN0b3IuXHJcbiAgICAgKiBOZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IGlzIHRoZW4gaW5zZXJ0ZWQgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBlbGVtZW50LlxyXG4gICAgICogSWYgbm90IHNldCBvciBub3QgcGFydCBvZiB0aGlzIGZpbGUsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGVuZC5cclxuICAgICAqIElmIGV4cGxpY2l0eSBzZXQgdG8gbnVsbCwgbmV3IHVuaXQgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgc3RhcnQuXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IChzaW5jZSB2ZXJzaW9uIDEuNy4wKVxyXG4gICAgICogQHRocm93cyBhbiBlcnJvciBpZiB0cmFucy11bml0IHdpdGggc2FtZSBpZCBhbHJlYWR5IGlzIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBpbXBvcnROZXdUcmFuc1VuaXQoZm9yZWlnblRyYW5zVW5pdDogSVRyYW5zVW5pdCwgaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4sIGltcG9ydEFmdGVyRWxlbWVudD86IElUcmFuc1VuaXQpXHJcbiAgICAgICAgOiBJVHJhbnNVbml0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSB0cmFucy11bml0IHdpdGggdGhlIGdpdmVuIGlkLlxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVRyYW5zVW5pdFdpdGhJZChpZDogc3RyaW5nKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWxlbmFtZSB3aGVyZSB0aGUgZGF0YSBpcyByZWFkIGZyb20uXHJcbiAgICAgKi9cclxuICAgIGZpbGVuYW1lKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBlbmNvZGluZyBpZiB0aGUgeG1sIGNvbnRlbnQgKFVURi04LCBJU08tODg1OS0xLCAuLi4pXHJcbiAgICAgKi9cclxuICAgIGVuY29kaW5nKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB4bWwgY29udGVudCB0byBiZSBzYXZlZCBhZnRlciBjaGFuZ2VzIGFyZSBtYWRlLlxyXG4gICAgICogQHBhcmFtIGJlYXV0aWZ5T3V0cHV0IEZsYWcgd2hldGhlciB0byB1c2UgcHJldHR5LWRhdGEgdG8gZm9ybWF0IHRoZSBvdXRwdXQuXHJcbiAgICAgKiBYTUxTZXJpYWxpemVyIHByb2R1Y2VzIHNvbWUgY29ycmVjdCBidXQgc3RyYW5nZWx5IGZvcm1hdHRlZCBvdXRwdXQsIHdoaWNoIHByZXR0eS1kYXRhIGNhbiBjb3JyZWN0LlxyXG4gICAgICogU2VlIGlzc3VlICM2NCBmb3IgZGV0YWlscy5cclxuICAgICAqIERlZmF1bHQgaXMgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGVkaXRlZENvbnRlbnQoYmVhdXRpZnlPdXRwdXQ/OiBib29sZWFuKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IHRyYW5zbGF0aW9uIGZpbGUgZm9yIHRoaXMgZmlsZSBmb3IgYSBnaXZlbiBsYW5ndWFnZS5cclxuICAgICAqIE5vcm1hbGx5LCB0aGlzIGlzIGp1c3QgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBvbmUuXHJcbiAgICAgKiBCdXQgZm9yIFhNQiB0aGUgdHJhbnNsYXRpb24gZmlsZSBoYXMgZm9ybWF0ICdYVEInLlxyXG4gICAgICogQHBhcmFtIGxhbmcgTGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIGV4cGVjdGVkIGZpbGVuYW1lIHRvIHN0b3JlIGZpbGVcclxuICAgICAqIEBwYXJhbSBpc0RlZmF1bHRMYW5nIEZsYWcsIHdldGhlciBmaWxlIGNvbnRhaW5zIHRoZSBkZWZhdWx0IGxhbmd1YWdlLlxyXG4gICAgICogVGhlbiBzb3VyY2UgYW5kIHRhcmdldCBhcmUganVzdCBlcXVhbC5cclxuICAgICAqIFRoZSBjb250ZW50IHdpbGwgYmUgY29waWVkLlxyXG4gICAgICogU3RhdGUgd2lsbCBiZSBmaW5hbC5cclxuICAgICAqIEBwYXJhbSBjb3B5Q29udGVudCBGbGFnLCB3ZXRoZXIgdG8gY29weSBjb250ZW50IG9yIGxlYXZlIGl0IGVtcHR5LlxyXG4gICAgICogV2JlbiB0cnVlLCBjb250ZW50IHdpbGwgYmUgY29waWVkIGZyb20gc291cmNlLlxyXG4gICAgICogV2hlbiBmYWxzZSwgY29udGVudCB3aWxsIGJlIGxlZnQgZW1wdHkgKGlmIGl0IGlzIG5vdCB0aGUgZGVmYXVsdCBsYW5ndWFnZSkuXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcobGFuZzogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCBpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbik6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZTtcclxufVxyXG4iXX0=