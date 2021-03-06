/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 21.03.2017.
 */
import { TranslationMessagesFileFactory } from '@ngx-i18nsupport/ngx-i18nsupport-lib';
import { FileUtil } from '../common/file-util';
import { XmlReader } from './xml-reader';
/**
 * Helper class to read translation files depending on format.
 */
var /**
 * Helper class to read translation files depending on format.
 */
TranslationMessagesFileReader = /** @class */ (function () {
    function TranslationMessagesFileReader() {
    }
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param i18nFormat format
     * @param path path
     * @param encoding encoding
     * @param optionalMasterFilePath optionalMasterFilePath
     * @return XliffFile
     */
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat format
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMasterFilePath optionalMasterFilePath
     * @return {?} XliffFile
     */
    TranslationMessagesFileReader.fromFile = /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat format
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMasterFilePath optionalMasterFilePath
     * @return {?} XliffFile
     */
    function (i18nFormat, path, encoding, optionalMasterFilePath) {
        /** @type {?} */
        var xmlContent = XmlReader.readXmlFileContent(path, encoding);
        /** @type {?} */
        var optionalMaster = TranslationMessagesFileReader.masterFileContent(optionalMasterFilePath, encoding);
        return TranslationMessagesFileFactory.fromFileContent(i18nFormat, xmlContent.content, path, xmlContent.encoding, optionalMaster);
    };
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param path path
     * @param encoding encoding
     * @param optionalMasterFilePath optionalMasterFilePath
     * @return XliffFile
     */
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMasterFilePath optionalMasterFilePath
     * @return {?} XliffFile
     */
    TranslationMessagesFileReader.fromUnknownFormatFile = /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMasterFilePath optionalMasterFilePath
     * @return {?} XliffFile
     */
    function (path, encoding, optionalMasterFilePath) {
        /** @type {?} */
        var xmlContent = XmlReader.readXmlFileContent(path, encoding);
        /** @type {?} */
        var optionalMaster = TranslationMessagesFileReader.masterFileContent(optionalMasterFilePath, encoding);
        return TranslationMessagesFileFactory.fromUnknownFormatFileContent(xmlContent.content, path, xmlContent.encoding, optionalMaster);
    };
    /**
     * Read master xmb file
     * @param optionalMasterFilePath optionalMasterFilePath
     * @param encoding encoding
     * @return content and encoding of file
     */
    /**
     * Read master xmb file
     * @private
     * @param {?} optionalMasterFilePath optionalMasterFilePath
     * @param {?} encoding encoding
     * @return {?} content and encoding of file
     */
    TranslationMessagesFileReader.masterFileContent = /**
     * Read master xmb file
     * @private
     * @param {?} optionalMasterFilePath optionalMasterFilePath
     * @param {?} encoding encoding
     * @return {?} content and encoding of file
     */
    function (optionalMasterFilePath, encoding) {
        if (optionalMasterFilePath) {
            /** @type {?} */
            var masterXmlContent = XmlReader.readXmlFileContent(optionalMasterFilePath, encoding);
            return {
                xmlContent: masterXmlContent.content,
                path: optionalMasterFilePath,
                encoding: masterXmlContent.encoding
            };
        }
        else {
            return null;
        }
    };
    /**
     * Save edited file.
     * @param messagesFile messagesFile
     * @param beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     */
    /**
     * Save edited file.
     * @param {?} messagesFile messagesFile
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    TranslationMessagesFileReader.save = /**
     * Save edited file.
     * @param {?} messagesFile messagesFile
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    function (messagesFile, beautifyOutput) {
        FileUtil.replaceContent(messagesFile.filename(), messagesFile.editedContent(beautifyOutput), messagesFile.encoding());
    };
    return TranslationMessagesFileReader;
}());
/**
 * Helper class to read translation files depending on format.
 */
export { TranslationMessagesFileReader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS1yZWFkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbInhsaWZmbWVyZ2UvdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS1yZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE9BQU8sRUFBQyw4QkFBOEIsRUFBMkIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7OztBQUt2Qzs7OztJQUFBO0lBaUVBLENBQUM7SUEvREc7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ1csc0NBQVE7Ozs7Ozs7O0lBQXRCLFVBQXVCLFVBQWtCLEVBQ2xCLElBQVksRUFDWixRQUFnQixFQUNoQixzQkFBK0I7O1lBQzVDLFVBQVUsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQzs7WUFDekQsY0FBYyxHQUFHLDZCQUE2QixDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixFQUFFLFFBQVEsQ0FBQztRQUN4RyxPQUFPLDhCQUE4QixDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNXLG1EQUFxQjs7Ozs7OztJQUFuQyxVQUFvQyxJQUFZLEVBQ1osUUFBZ0IsRUFDaEIsc0JBQStCOztZQUN6RCxVQUFVLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7O1lBQ3pELGNBQWMsR0FBRyw2QkFBNkIsQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUM7UUFDeEcsT0FBTyw4QkFBOEIsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDWSwrQ0FBaUI7Ozs7Ozs7SUFBaEMsVUFBaUMsc0JBQThCLEVBQUUsUUFBZ0I7UUFFN0UsSUFBSSxzQkFBc0IsRUFBRTs7Z0JBQ2xCLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLENBQUM7WUFDdkYsT0FBTztnQkFDSCxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztnQkFDcEMsSUFBSSxFQUFFLHNCQUFzQjtnQkFDNUIsUUFBUSxFQUFFLGdCQUFnQixDQUFDLFFBQVE7YUFDdEMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7SUFDVyxrQ0FBSTs7Ozs7Ozs7O0lBQWxCLFVBQW1CLFlBQXNDLEVBQUUsY0FBd0I7UUFDL0UsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMxSCxDQUFDO0lBQ0wsb0NBQUM7QUFBRCxDQUFDLEFBakVELElBaUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMjEuMDMuMjAxNy5cclxuICovXHJcbmltcG9ydCB7VHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5LCBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJ0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYic7XHJcbmltcG9ydCB7RmlsZVV0aWx9IGZyb20gJy4uL2NvbW1vbi9maWxlLXV0aWwnO1xyXG5pbXBvcnQge1htbFJlYWRlcn0gZnJvbSAnLi94bWwtcmVhZGVyJztcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgdG8gcmVhZCB0cmFuc2xhdGlvbiBmaWxlcyBkZXBlbmRpbmcgb24gZm9ybWF0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlUmVhZGVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgZmlsZSBmdW5jdGlvbiwgcmVzdWx0IGRlcGVuZHMgb24gZm9ybWF0LCBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGUuXHJcbiAgICAgKiBAcGFyYW0gaTE4bkZvcm1hdCBmb3JtYXRcclxuICAgICAqIEBwYXJhbSBwYXRoIHBhdGhcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyBlbmNvZGluZ1xyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsTWFzdGVyRmlsZVBhdGggb3B0aW9uYWxNYXN0ZXJGaWxlUGF0aFxyXG4gICAgICogQHJldHVybiBYbGlmZkZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tRmlsZShpMThuRm9ybWF0OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxNYXN0ZXJGaWxlUGF0aD86IHN0cmluZyk6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcbiAgICAgICAgY29uc3QgeG1sQ29udGVudCA9IFhtbFJlYWRlci5yZWFkWG1sRmlsZUNvbnRlbnQocGF0aCwgZW5jb2RpbmcpO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbmFsTWFzdGVyID0gVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVSZWFkZXIubWFzdGVyRmlsZUNvbnRlbnQob3B0aW9uYWxNYXN0ZXJGaWxlUGF0aCwgZW5jb2RpbmcpO1xyXG4gICAgICAgIHJldHVybiBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZUZhY3RvcnkuZnJvbUZpbGVDb250ZW50KGkxOG5Gb3JtYXQsIHhtbENvbnRlbnQuY29udGVudCwgcGF0aCwgeG1sQ29udGVudC5lbmNvZGluZywgb3B0aW9uYWxNYXN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBmaWxlIGZ1bmN0aW9uLCByZXN1bHQgZGVwZW5kcyBvbiBmb3JtYXQsIGVpdGhlciBYbGlmZkZpbGUgb3IgWG1iRmlsZS5cclxuICAgICAqIEBwYXJhbSBwYXRoIHBhdGhcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyBlbmNvZGluZ1xyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsTWFzdGVyRmlsZVBhdGggb3B0aW9uYWxNYXN0ZXJGaWxlUGF0aFxyXG4gICAgICogQHJldHVybiBYbGlmZkZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tVW5rbm93bkZvcm1hdEZpbGUocGF0aDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyRmlsZVBhdGg/OiBzdHJpbmcpOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUge1xyXG4gICAgICAgIGNvbnN0IHhtbENvbnRlbnQgPSBYbWxSZWFkZXIucmVhZFhtbEZpbGVDb250ZW50KHBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICBjb25zdCBvcHRpb25hbE1hc3RlciA9IFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlUmVhZGVyLm1hc3RlckZpbGVDb250ZW50KG9wdGlvbmFsTWFzdGVyRmlsZVBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICByZXR1cm4gVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5LmZyb21Vbmtub3duRm9ybWF0RmlsZUNvbnRlbnQoeG1sQ29udGVudC5jb250ZW50LCBwYXRoLCB4bWxDb250ZW50LmVuY29kaW5nLCBvcHRpb25hbE1hc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIG1hc3RlciB4bWIgZmlsZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsTWFzdGVyRmlsZVBhdGggb3B0aW9uYWxNYXN0ZXJGaWxlUGF0aFxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIGVuY29kaW5nXHJcbiAgICAgKiBAcmV0dXJuIGNvbnRlbnQgYW5kIGVuY29kaW5nIG9mIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWFzdGVyRmlsZUNvbnRlbnQob3B0aW9uYWxNYXN0ZXJGaWxlUGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nKVxyXG4gICAgICAgIDoge3htbENvbnRlbnQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nfSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbmFsTWFzdGVyRmlsZVBhdGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbWFzdGVyWG1sQ29udGVudCA9IFhtbFJlYWRlci5yZWFkWG1sRmlsZUNvbnRlbnQob3B0aW9uYWxNYXN0ZXJGaWxlUGF0aCwgZW5jb2RpbmcpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgeG1sQ29udGVudDogbWFzdGVyWG1sQ29udGVudC5jb250ZW50LFxyXG4gICAgICAgICAgICAgICAgcGF0aDogb3B0aW9uYWxNYXN0ZXJGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIGVuY29kaW5nOiBtYXN0ZXJYbWxDb250ZW50LmVuY29kaW5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZSBlZGl0ZWQgZmlsZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlc0ZpbGUgbWVzc2FnZXNGaWxlXHJcbiAgICAgKiBAcGFyYW0gYmVhdXRpZnlPdXRwdXQgRmxhZyB3aGV0aGVyIHRvIHVzZSBwcmV0dHktZGF0YSB0byBmb3JtYXQgdGhlIG91dHB1dC5cclxuICAgICAqIFhNTFNlcmlhbGl6ZXIgcHJvZHVjZXMgc29tZSBjb3JyZWN0IGJ1dCBzdHJhbmdlbHkgZm9ybWF0dGVkIG91dHB1dCwgd2hpY2ggcHJldHR5LWRhdGEgY2FuIGNvcnJlY3QuXHJcbiAgICAgKiBTZWUgaXNzdWUgIzY0IGZvciBkZXRhaWxzLlxyXG4gICAgICogRGVmYXVsdCBpcyBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzYXZlKG1lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLCBiZWF1dGlmeU91dHB1dD86IGJvb2xlYW4pIHtcclxuICAgICAgICBGaWxlVXRpbC5yZXBsYWNlQ29udGVudChtZXNzYWdlc0ZpbGUuZmlsZW5hbWUoKSwgbWVzc2FnZXNGaWxlLmVkaXRlZENvbnRlbnQoYmVhdXRpZnlPdXRwdXQpLCBtZXNzYWdlc0ZpbGUuZW5jb2RpbmcoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==