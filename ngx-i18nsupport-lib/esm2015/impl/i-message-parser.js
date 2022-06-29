/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 16.05.2017.
 * Interface for message parser.
 * @record
 */
export function IMessageParser() { }
if (false) {
    /**
     * Parse XML to ParsedMessage.
     * @param {?} xmlElement the xml representation
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    IMessageParser.prototype.createNormalizedMessageFromXML = function (xmlElement, sourceMessage) { };
    /**
     * Parse XML string to ParsedMessage.
     * @param {?} xmlString the xml representation without root element, e.g. this is <ph x></ph> an example.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    IMessageParser.prototype.createNormalizedMessageFromXMLString = function (xmlString, sourceMessage) { };
    /**
     * Parse normalized string to ParsedMessage.
     * @param {?} normalizedString normalized string
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if normalized string is not well formed.
     */
    IMessageParser.prototype.parseNormalizedString = function (normalizedString, sourceMessage) { };
    /**
     * Parse a string, that is an ICU message, to ParsedMessage.
     * @param {?} icuMessageString the message, like '{x, plural, =0 {nothing} =1 {one} other {many}}'.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if icuMessageString has not the correct syntax.
     */
    IMessageParser.prototype.parseICUMessage = function (icuMessageString, sourceMessage) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS1tZXNzYWdlLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvaS1tZXNzYWdlLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNQSxvQ0FtQ0M7Ozs7Ozs7OztJQTNCRyxtR0FBMkc7Ozs7Ozs7O0lBUTNHLHdHQUErRzs7Ozs7Ozs7SUFTL0csZ0dBQXVHOzs7Ozs7OztJQVN2RywwRkFBaUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lOb3JtYWxpemVkTWVzc2FnZX0gZnJvbSAnLi4vYXBpL2luZGV4JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTYuMDUuMjAxNy5cclxuICogSW50ZXJmYWNlIGZvciBtZXNzYWdlIHBhcnNlci5cclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNZXNzYWdlUGFyc2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIFhNTCB0byBQYXJzZWRNZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHhtbEVsZW1lbnQgdGhlIHhtbCByZXByZXNlbnRhdGlvblxyXG4gICAgICogQHBhcmFtIHNvdXJjZU1lc3NhZ2Ugb3B0aW9uYWwgb3JpZ2luYWwgbWVzc2FnZSB0aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCBieSBub3JtYWxpemVkIG5ldyBvbmVcclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHhtbCBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTCh4bWxFbGVtZW50OiBFbGVtZW50LCBzb3VyY2VNZXNzYWdlOiBJTm9ybWFsaXplZE1lc3NhZ2UpOiBJTm9ybWFsaXplZE1lc3NhZ2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBYTUwgc3RyaW5nIHRvIFBhcnNlZE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0geG1sU3RyaW5nIHRoZSB4bWwgcmVwcmVzZW50YXRpb24gd2l0aG91dCByb290IGVsZW1lbnQsIGUuZy4gdGhpcyBpcyA8cGggeD48L3BoPiBhbiBleGFtcGxlLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZU1lc3NhZ2Ugb3B0aW9uYWwgb3JpZ2luYWwgbWVzc2FnZSB0aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCBieSBub3JtYWxpemVkIG5ldyBvbmVcclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHhtbCBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTFN0cmluZyh4bWxTdHJpbmc6IHN0cmluZywgc291cmNlTWVzc2FnZTogSU5vcm1hbGl6ZWRNZXNzYWdlKTogSU5vcm1hbGl6ZWRNZXNzYWdlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2Ugbm9ybWFsaXplZCBzdHJpbmcgdG8gUGFyc2VkTWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBub3JtYWxpemVkU3RyaW5nIG5vcm1hbGl6ZWQgc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gc291cmNlTWVzc2FnZSBvcHRpb25hbCBvcmlnaW5hbCBtZXNzYWdlIHRoYXQgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IG5vcm1hbGl6ZWQgbmV3IG9uZVxyXG4gICAgICogQHJldHVybiBhIG5ldyBwYXJzZWQgbWVzc2FnZS5cclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHN0cmluZyBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIHBhcnNlTm9ybWFsaXplZFN0cmluZyhub3JtYWxpemVkU3RyaW5nOiBzdHJpbmcsIHNvdXJjZU1lc3NhZ2U6IElOb3JtYWxpemVkTWVzc2FnZSk6IElOb3JtYWxpemVkTWVzc2FnZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIGEgc3RyaW5nLCB0aGF0IGlzIGFuIElDVSBtZXNzYWdlLCB0byBQYXJzZWRNZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIGljdU1lc3NhZ2VTdHJpbmcgdGhlIG1lc3NhZ2UsIGxpa2UgJ3t4LCBwbHVyYWwsID0wIHtub3RoaW5nfSA9MSB7b25lfSBvdGhlciB7bWFueX19Jy5cclxuICAgICAqIEBwYXJhbSBzb3VyY2VNZXNzYWdlIG9wdGlvbmFsIG9yaWdpbmFsIG1lc3NhZ2UgdGhhdCB3aWxsIGJlIHRyYW5zbGF0ZWQgYnkgbm9ybWFsaXplZCBuZXcgb25lXHJcbiAgICAgKiBAcmV0dXJuIGEgbmV3IHBhcnNlZCBtZXNzYWdlLlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIGljdU1lc3NhZ2VTdHJpbmcgaGFzIG5vdCB0aGUgY29ycmVjdCBzeW50YXguXHJcbiAgICAgKi9cclxuICAgIHBhcnNlSUNVTWVzc2FnZShpY3VNZXNzYWdlU3RyaW5nOiBzdHJpbmcsIHNvdXJjZU1lc3NhZ2U6IElOb3JtYWxpemVkTWVzc2FnZSk6IElOb3JtYWxpemVkTWVzc2FnZTtcclxufVxyXG4iXX0=