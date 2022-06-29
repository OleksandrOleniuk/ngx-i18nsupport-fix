/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ITranslationMessagesFileFactory() { }
if (false) {
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    ITranslationMessagesFileFactory.prototype.createFileFromFileContent = function (i18nFormat, xmlContent, path, encoding, optionalMaster) { };
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    ITranslationMessagesFileFactory.prototype.createFileFromUnknownFormatFileContent = function (xmlContent, path, encoding, optionalMaster) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJhcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLHFEQXFDQzs7Ozs7Ozs7Ozs7Ozs7SUF4QkcsNElBSTZIOzs7Ozs7Ozs7Ozs7OztJQWU3SCw2SUFJK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBmaWxlIGZ1bmN0aW9uLCByZXN1bHQgZGVwZW5kcyBvbiBmb3JtYXQsIGVpdGhlciBYbGlmZkZpbGUgb3IgWG1iRmlsZS5cclxuICAgICAqIEBwYXJhbSBpMThuRm9ybWF0IGN1cnJlbnRseSAneGxmJyBvciAneGxmMicgb3IgJ3htYicgb3IgJ3h0YicgYXJlIHN1cHBvcnRlZFxyXG4gICAgICogQHBhcmFtIHhtbENvbnRlbnQgdGhlIGZpbGUgY29udGVudFxyXG4gICAgICogQHBhcmFtIHBhdGggdGhlIHBhdGggb2YgdGhlIGZpbGUgKG9ubHkgdXNlZCB0byByZW1lbWJlciBpdClcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyB1dGYtOCwgLi4uIHVzZWQgdG8gcGFyc2UgWE1MLlxyXG4gICAgICogVGhpcyBpcyByZWFkIGZyb20gdGhlIGZpbGUsIGJ1dCBpZiB5b3Uga25vdyBpdCBiZWZvcmUsIHlvdSBjYW4gYXZvaWQgcmVhZGluZyB0aGUgZmlsZSB0d2ljZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25hbE1hc3RlciBpbiBjYXNlIG9mIHhtYiB0aGUgbWFzdGVyIGZpbGUsIHRoYXQgY29udGFpbnMgdGhlIG9yaWdpbmFsIHRleHRzLlxyXG4gICAgICogKHRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IHN0YXRlIGluZm9zLCB0aGF0IGFyZSBiYXNlZCBvbiBjb21wYXJpbmcgb3JpZ2luYWwgd2l0aCB0cmFuc2xhdGVkIHZlcnNpb24pXHJcbiAgICAgKiBJZ25vcmVkIGZvciBvdGhlciBmb3JtYXRzLlxyXG4gICAgICogQHJldHVybiBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlRmlsZUZyb21GaWxlQ29udGVudChpMThuRm9ybWF0OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbENvbnRlbnQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGluZzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbE1hc3Rlcj86IHsgeG1sQ29udGVudDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcgfSk6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgZmlsZSBmdW5jdGlvbiBmb3IgYW55IGZpbGUgd2l0aCB1bmtub3duIGZvcm1hdC5cclxuICAgICAqIFRoaXMgZnVuY3Rpb25zIHRyaWVzIHRvIGd1ZXNzIHRoZSBmb3JtYXQgYmFzZWQgb24gdGhlIGZpbGVuYW1lIGFuZCB0aGUgY29udGVudCBvZiB0aGUgZmlsZS5cclxuICAgICAqIFJlc3VsdCBkZXBlbmRzIG9uIGRldGVjdGVkIGZvcm1hdCwgZWl0aGVyIFhsaWZmRmlsZSBvciBYbWJGaWxlLlxyXG4gICAgICogQHBhcmFtIHhtbENvbnRlbnQgdGhlIGZpbGUgY29udGVudFxyXG4gICAgICogQHBhcmFtIHBhdGggdGhlIHBhdGggb2YgdGhlIGZpbGUgKG9ubHkgdXNlZCB0byByZW1lbWJlciBpdClcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyB1dGYtOCwgLi4uIHVzZWQgdG8gcGFyc2UgWE1MLlxyXG4gICAgICogVGhpcyBpcyByZWFkIGZyb20gdGhlIGZpbGUsIGJ1dCBpZiB5b3Uga25vdyBpdCBiZWZvcmUsIHlvdSBjYW4gYXZvaWQgcmVhZGluZyB0aGUgZmlsZSB0d2ljZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25hbE1hc3RlciBpbiBjYXNlIG9mIHhtYiB0aGUgbWFzdGVyIGZpbGUsIHRoYXQgY29udGFpbnMgdGhlIG9yaWdpbmFsIHRleHRzLlxyXG4gICAgICogKHRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IHN0YXRlIGluZm9zLCB0aGF0IGFyZSBiYXNlZCBvbiBjb21wYXJpbmcgb3JpZ2luYWwgd2l0aCB0cmFuc2xhdGVkIHZlcnNpb24pXHJcbiAgICAgKiBJZ25vcmVkIGZvciBvdGhlciBmb3JtYXRzLlxyXG4gICAgICogQHJldHVybiBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlRmlsZUZyb21Vbmtub3duRm9ybWF0RmlsZUNvbnRlbnQoeG1sQ29udGVudDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyPzogeyB4bWxDb250ZW50OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyB9KVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlO1xyXG59Il19