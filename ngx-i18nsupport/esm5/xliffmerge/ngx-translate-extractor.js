/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NORMALIZATION_FORMAT_NGXTRANSLATE } from '@ngx-i18nsupport/ngx-i18nsupport-lib';
import { FileUtil } from '../common/file-util';
import { isNullOrUndefined } from '../common/util';
import { NgxTranslateExtractionPattern } from './ngx-translate-extraction-pattern';
/**
 * The interface used for translations in ngx-translate.
 * A hash that contains either the translation or another hash.
 * @record
 */
function NgxTranslations() { }
/**
 * internal,
 * a message with id (a dot-separated string).
 * @record
 */
function NgxMessage() { }
if (false) {
    /** @type {?} */
    NgxMessage.prototype.id;
    /** @type {?} */
    NgxMessage.prototype.message;
}
var NgxTranslateExtractor = /** @class */ (function () {
    function NgxTranslateExtractor(messagesFile, extractionPatternString) {
        this.messagesFile = messagesFile;
        this.extractionPattern = new NgxTranslateExtractionPattern(extractionPatternString);
    }
    /**
     * Check, wether extractionPattern has valid syntax.
     * @param extractionPatternString extractionPatternString
     * @return null, if pattern is ok, string describing the error, if it is not ok.
     */
    /**
     * Check, wether extractionPattern has valid syntax.
     * @param {?} extractionPatternString extractionPatternString
     * @return {?} null, if pattern is ok, string describing the error, if it is not ok.
     */
    NgxTranslateExtractor.checkPattern = /**
     * Check, wether extractionPattern has valid syntax.
     * @param {?} extractionPatternString extractionPatternString
     * @return {?} null, if pattern is ok, string describing the error, if it is not ok.
     */
    function (extractionPatternString) {
        try {
            if (new NgxTranslateExtractionPattern(extractionPatternString)) {
                return null;
            }
        }
        catch (error) {
            return error.message;
        }
        return null;
    };
    /**
     * @param {?} messagesFile
     * @param {?} extractionPattern
     * @param {?} outputFile
     * @return {?}
     */
    NgxTranslateExtractor.extract = /**
     * @param {?} messagesFile
     * @param {?} extractionPattern
     * @param {?} outputFile
     * @return {?}
     */
    function (messagesFile, extractionPattern, outputFile) {
        new NgxTranslateExtractor(messagesFile, extractionPattern).extractTo(outputFile);
    };
    /**
     * Extact messages and write them to a file.
     * @param outputFile outputFile
     */
    /**
     * Extact messages and write them to a file.
     * @param {?} outputFile outputFile
     * @return {?}
     */
    NgxTranslateExtractor.prototype.extractTo = /**
     * Extact messages and write them to a file.
     * @param {?} outputFile outputFile
     * @return {?}
     */
    function (outputFile) {
        /** @type {?} */
        var translations = this.toNgxTranslations(this.extract());
        if (translations && Object.keys(translations).length > 0) {
            FileUtil.replaceContent(outputFile, JSON.stringify(translations, null, 4), 'UTF-8');
        }
        else {
            if (FileUtil.exists(outputFile)) {
                FileUtil.deleteFile(outputFile);
            }
        }
    };
    /**
     *  Extract messages and convert them to ngx translations.
     *  @return the translation objects.
     */
    /**
     *  Extract messages and convert them to ngx translations.
     * @private
     * @return {?} the translation objects.
     */
    NgxTranslateExtractor.prototype.extract = /**
     *  Extract messages and convert them to ngx translations.
     * @private
     * @return {?} the translation objects.
     */
    function () {
        var _this = this;
        /** @type {?} */
        var result = [];
        this.messagesFile.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            /** @type {?} */
            var ngxId = _this.ngxTranslateIdFromTU(tu);
            if (ngxId) {
                /** @type {?} */
                var messagetext = tu.targetContentNormalized().asDisplayString(NORMALIZATION_FORMAT_NGXTRANSLATE);
                result.push({ id: ngxId, message: messagetext });
            }
        }));
        return result;
    };
    /**
     * Check, wether this tu should be extracted for ngx-translate usage, and return its id for ngx-translate.
     * There are 2 possibilities:
     * 1. description is set to "ngx-translate" and meaning contains the id.
     * 2. id is explicitly set to a string.
     * @param tu tu
     * @return an ngx id or null, if this tu should not be extracted.
     */
    /**
     * Check, wether this tu should be extracted for ngx-translate usage, and return its id for ngx-translate.
     * There are 2 possibilities:
     * 1. description is set to "ngx-translate" and meaning contains the id.
     * 2. id is explicitly set to a string.
     * @private
     * @param {?} tu tu
     * @return {?} an ngx id or null, if this tu should not be extracted.
     */
    NgxTranslateExtractor.prototype.ngxTranslateIdFromTU = /**
     * Check, wether this tu should be extracted for ngx-translate usage, and return its id for ngx-translate.
     * There are 2 possibilities:
     * 1. description is set to "ngx-translate" and meaning contains the id.
     * 2. id is explicitly set to a string.
     * @private
     * @param {?} tu tu
     * @return {?} an ngx id or null, if this tu should not be extracted.
     */
    function (tu) {
        if (this.isExplicitlySetId(tu.id)) {
            if (this.extractionPattern.isExplicitIdMatched(tu.id)) {
                return tu.id;
            }
            else {
                return null;
            }
        }
        /** @type {?} */
        var description = tu.description();
        if (description && this.extractionPattern.isDescriptionMatched(description)) {
            return tu.meaning();
        }
    };
    /**
     * Test, wether ID was explicitly set (via i18n="@myid).
     * Just heuristic, an ID is explicitly, if it does not look like a generated one.
     * @param id id
     * @return wether ID was explicitly set (via i18n="@myid).
     */
    /**
     * Test, wether ID was explicitly set (via i18n="\@myid).
     * Just heuristic, an ID is explicitly, if it does not look like a generated one.
     * @private
     * @param {?} id id
     * @return {?} wether ID was explicitly set (via i18n="\@myid).
     */
    NgxTranslateExtractor.prototype.isExplicitlySetId = /**
     * Test, wether ID was explicitly set (via i18n="\@myid).
     * Just heuristic, an ID is explicitly, if it does not look like a generated one.
     * @private
     * @param {?} id id
     * @return {?} wether ID was explicitly set (via i18n="\@myid).
     */
    function (id) {
        if (isNullOrUndefined(id)) {
            return false;
        }
        // generated IDs are either decimal or sha1 hex
        /** @type {?} */
        var reForGeneratedId = /^[0-9a-f]{11,}$/;
        return !reForGeneratedId.test(id);
    };
    /**
     * Convert list of relevant TUs to ngx translations object.
     * @param msgList msgList
     */
    /**
     * Convert list of relevant TUs to ngx translations object.
     * @private
     * @param {?} msgList msgList
     * @return {?}
     */
    NgxTranslateExtractor.prototype.toNgxTranslations = /**
     * Convert list of relevant TUs to ngx translations object.
     * @private
     * @param {?} msgList msgList
     * @return {?}
     */
    function (msgList) {
        var _this = this;
        /** @type {?} */
        var translationObject = {};
        msgList.forEach((/**
         * @param {?} msg
         * @return {?}
         */
        function (msg) {
            _this.putInTranslationObject(translationObject, msg);
        }));
        return translationObject;
    };
    /**
     * Put a new messages into the translation data object.
     * If you add, e.g. "{id: 'myapp.example', message: 'test'}",
     * the translation object will then contain an object myapp that has property example:
     * {myapp: {
     *   example: 'test'
     *   }}
     * @param translationObject translationObject
     * @param msg msg
     */
    /**
     * Put a new messages into the translation data object.
     * If you add, e.g. "{id: 'myapp.example', message: 'test'}",
     * the translation object will then contain an object myapp that has property example:
     * {myapp: {
     *   example: 'test'
     *   }}
     * @private
     * @param {?} translationObject translationObject
     * @param {?} msg msg
     * @return {?}
     */
    NgxTranslateExtractor.prototype.putInTranslationObject = /**
     * Put a new messages into the translation data object.
     * If you add, e.g. "{id: 'myapp.example', message: 'test'}",
     * the translation object will then contain an object myapp that has property example:
     * {myapp: {
     *   example: 'test'
     *   }}
     * @private
     * @param {?} translationObject translationObject
     * @param {?} msg msg
     * @return {?}
     */
    function (translationObject, msg) {
        /** @type {?} */
        var firstPartOfId;
        /** @type {?} */
        var restOfId;
        /** @type {?} */
        var indexOfDot = msg.id.indexOf('.');
        if (indexOfDot === 0 || indexOfDot === (msg.id.length - 1)) {
            throw new Error('bad nxg-translate id "' + msg.id + '"');
        }
        if (indexOfDot < 0) {
            firstPartOfId = msg.id;
            restOfId = '';
        }
        else {
            firstPartOfId = msg.id.substring(0, indexOfDot);
            restOfId = msg.id.substring(indexOfDot + 1);
        }
        /** @type {?} */
        var object = translationObject[firstPartOfId];
        if (isNullOrUndefined(object)) {
            if (restOfId === '') {
                translationObject[firstPartOfId] = msg.message;
                return;
            }
            object = {};
            translationObject[firstPartOfId] = object;
        }
        else {
            if (restOfId === '') {
                throw new Error('duplicate id praefix "' + msg.id + '"');
            }
        }
        this.putInTranslationObject((/** @type {?} */ (object)), { id: restOfId, message: msg.message });
    };
    NgxTranslateExtractor.DefaultExtractionPattern = '@@|ngx-translate';
    return NgxTranslateExtractor;
}());
export { NgxTranslateExtractor };
if (false) {
    /** @type {?} */
    NgxTranslateExtractor.DefaultExtractionPattern;
    /**
     * @type {?}
     * @private
     */
    NgxTranslateExtractor.prototype.extractionPattern;
    /**
     * @type {?}
     * @private
     */
    NgxTranslateExtractor.prototype.messagesFile;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyYW5zbGF0ZS1leHRyYWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbInhsaWZmbWVyZ2Uvbmd4LXRyYW5zbGF0ZS1leHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUMsaUNBQWlDLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3SCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQVdqRiw4QkFFQzs7Ozs7O0FBTUQseUJBR0M7OztJQUZHLHdCQUFXOztJQUNYLDZCQUFnQjs7QUFHcEI7SUF5QkksK0JBQW9CLFlBQXNDLEVBQUUsdUJBQStCO1FBQXZFLGlCQUFZLEdBQVosWUFBWSxDQUEwQjtRQUN0RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSw2QkFBNkIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUF0QkQ7Ozs7T0FJRzs7Ozs7O0lBQ1csa0NBQVk7Ozs7O0lBQTFCLFVBQTJCLHVCQUErQjtRQUN0RCxJQUFJO1lBQ0YsSUFBSSxJQUFJLDZCQUE2QixDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQzVELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVhLDZCQUFPOzs7Ozs7SUFBckIsVUFBc0IsWUFBc0MsRUFBRSxpQkFBeUIsRUFBRSxVQUFrQjtRQUN2RyxJQUFJLHFCQUFxQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLFNB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bUJBQWtCLE1BQU0sRUFBQSxFQUFFLEVBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQWpKYSw4Q0FBd0IsR0FBRyxrQkFBa0IsQ0FBQztJQWtKaEUsNEJBQUM7Q0FBQSxBQXBKRCxJQW9KQztTQXBKWSxxQkFBcUI7OztJQUU5QiwrQ0FBNEQ7Ozs7O0lBQzVELGtEQUF5RDs7Ozs7SUFzQjdDLDZDQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLCBJVHJhbnNVbml0LCBOT1JNQUxJWkFUSU9OX0ZPUk1BVF9OR1hUUkFOU0xBVEV9IGZyb20gJ0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYic7XHJcbmltcG9ydCB7RmlsZVV0aWx9IGZyb20gJy4uL2NvbW1vbi9maWxlLXV0aWwnO1xyXG5pbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XHJcbmltcG9ydCB7Tmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm59IGZyb20gJy4vbmd4LXRyYW5zbGF0ZS1leHRyYWN0aW9uLXBhdHRlcm4nO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAxNS4wMy4yMDE3LlxyXG4gKiBBIHRvb2wgZm9yIGV4dHJhY3RpbmcgbWVzc2FnZXMgaW4gbmd4LXRyYW5zbGF0ZSBmb3JtYXQuXHJcbiAqIEdlbmVyYXRlcyBhIGpzb24tZmlsZSB0byBiZSB1c2VkIHdpdGggbmd4LXRyYW5zbGF0ZS5cclxuICovXHJcblxyXG4vKipcclxuICogVGhlIGludGVyZmFjZSB1c2VkIGZvciB0cmFuc2xhdGlvbnMgaW4gbmd4LXRyYW5zbGF0ZS5cclxuICogQSBoYXNoIHRoYXQgY29udGFpbnMgZWl0aGVyIHRoZSB0cmFuc2xhdGlvbiBvciBhbm90aGVyIGhhc2guXHJcbiAqL1xyXG5pbnRlcmZhY2UgTmd4VHJhbnNsYXRpb25zIHtcclxuICAgIFtpZDogc3RyaW5nXTogTmd4VHJhbnNsYXRpb25zIHwgc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogaW50ZXJuYWwsXHJcbiAqIGEgbWVzc2FnZSB3aXRoIGlkIChhIGRvdC1zZXBhcmF0ZWQgc3RyaW5nKS5cclxuICovXHJcbmludGVyZmFjZSBOZ3hNZXNzYWdlIHtcclxuICAgIGlkOiBzdHJpbmc7IC8vIGRvdCBzZXBhcmF0ZWQgbmFtZSwgZS5nLiBcIm15YXBwLnNlcnZpY2UxLm1lc3NhZ2UxXCJcclxuICAgIG1lc3NhZ2U6IHN0cmluZzsgLy8gdGhlIG1lc3NhZ2UsIHBsYWNlaG9sZGVyIGFyZSBpbiB7e259fSBzeW50YXgsIGUuZy4gXCJhIHRlc3Qgd2l0aCB2YWx1ZToge3swfX1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5neFRyYW5zbGF0ZUV4dHJhY3RvciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0RXh0cmFjdGlvblBhdHRlcm4gPSAnQEB8bmd4LXRyYW5zbGF0ZSc7XHJcbiAgICBwcml2YXRlIGV4dHJhY3Rpb25QYXR0ZXJuOiBOZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrLCB3ZXRoZXIgZXh0cmFjdGlvblBhdHRlcm4gaGFzIHZhbGlkIHN5bnRheC5cclxuICAgICAqIEBwYXJhbSBleHRyYWN0aW9uUGF0dGVyblN0cmluZyBleHRyYWN0aW9uUGF0dGVyblN0cmluZ1xyXG4gICAgICogQHJldHVybiBudWxsLCBpZiBwYXR0ZXJuIGlzIG9rLCBzdHJpbmcgZGVzY3JpYmluZyB0aGUgZXJyb3IsIGlmIGl0IGlzIG5vdCBvay5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjaGVja1BhdHRlcm4oZXh0cmFjdGlvblBhdHRlcm5TdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGlmIChuZXcgTmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4oZXh0cmFjdGlvblBhdHRlcm5TdHJpbmcpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZXh0cmFjdChtZXNzYWdlc0ZpbGU6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSwgZXh0cmFjdGlvblBhdHRlcm46IHN0cmluZywgb3V0cHV0RmlsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbmV3IE5neFRyYW5zbGF0ZUV4dHJhY3RvcihtZXNzYWdlc0ZpbGUsIGV4dHJhY3Rpb25QYXR0ZXJuKS5leHRyYWN0VG8ob3V0cHV0RmlsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXNzYWdlc0ZpbGU6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSwgZXh0cmFjdGlvblBhdHRlcm5TdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZXh0cmFjdGlvblBhdHRlcm4gPSBuZXcgTmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4oZXh0cmFjdGlvblBhdHRlcm5TdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRXh0YWN0IG1lc3NhZ2VzIGFuZCB3cml0ZSB0aGVtIHRvIGEgZmlsZS5cclxuICAgICAqIEBwYXJhbSBvdXRwdXRGaWxlIG91dHB1dEZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4dHJhY3RUbyhvdXRwdXRGaWxlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbnM6IE5neFRyYW5zbGF0aW9ucyA9IHRoaXMudG9OZ3hUcmFuc2xhdGlvbnModGhpcy5leHRyYWN0KCkpO1xyXG4gICAgICAgIGlmICh0cmFuc2xhdGlvbnMgJiYgT2JqZWN0LmtleXModHJhbnNsYXRpb25zKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIEZpbGVVdGlsLnJlcGxhY2VDb250ZW50KG91dHB1dEZpbGUsIEpTT04uc3RyaW5naWZ5KHRyYW5zbGF0aW9ucywgbnVsbCwgNCksICdVVEYtOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChGaWxlVXRpbC5leGlzdHMob3V0cHV0RmlsZSkpIHtcclxuICAgICAgICAgICAgICAgIEZpbGVVdGlsLmRlbGV0ZUZpbGUob3V0cHV0RmlsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgRXh0cmFjdCBtZXNzYWdlcyBhbmQgY29udmVydCB0aGVtIHRvIG5neCB0cmFuc2xhdGlvbnMuXHJcbiAgICAgKiAgQHJldHVybiB0aGUgdHJhbnNsYXRpb24gb2JqZWN0cy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBleHRyYWN0KCk6IE5neE1lc3NhZ2VbXSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBOZ3hNZXNzYWdlW10gPSBbXTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzRmlsZS5mb3JFYWNoVHJhbnNVbml0KCh0dTogSVRyYW5zVW5pdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZ3hJZCA9IHRoaXMubmd4VHJhbnNsYXRlSWRGcm9tVFUodHUpO1xyXG4gICAgICAgICAgICBpZiAobmd4SWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2V0ZXh0ID0gdHUudGFyZ2V0Q29udGVudE5vcm1hbGl6ZWQoKS5hc0Rpc3BsYXlTdHJpbmcoTk9STUFMSVpBVElPTl9GT1JNQVRfTkdYVFJBTlNMQVRFKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtpZDogbmd4SWQsIG1lc3NhZ2U6IG1lc3NhZ2V0ZXh0fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2ssIHdldGhlciB0aGlzIHR1IHNob3VsZCBiZSBleHRyYWN0ZWQgZm9yIG5neC10cmFuc2xhdGUgdXNhZ2UsIGFuZCByZXR1cm4gaXRzIGlkIGZvciBuZ3gtdHJhbnNsYXRlLlxyXG4gICAgICogVGhlcmUgYXJlIDIgcG9zc2liaWxpdGllczpcclxuICAgICAqIDEuIGRlc2NyaXB0aW9uIGlzIHNldCB0byBcIm5neC10cmFuc2xhdGVcIiBhbmQgbWVhbmluZyBjb250YWlucyB0aGUgaWQuXHJcbiAgICAgKiAyLiBpZCBpcyBleHBsaWNpdGx5IHNldCB0byBhIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSB0dSB0dVxyXG4gICAgICogQHJldHVybiBhbiBuZ3ggaWQgb3IgbnVsbCwgaWYgdGhpcyB0dSBzaG91bGQgbm90IGJlIGV4dHJhY3RlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBuZ3hUcmFuc2xhdGVJZEZyb21UVSh0dTogSVRyYW5zVW5pdCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFeHBsaWNpdGx5U2V0SWQodHUuaWQpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV4dHJhY3Rpb25QYXR0ZXJuLmlzRXhwbGljaXRJZE1hdGNoZWQodHUuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHUuaWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHR1LmRlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uICYmIHRoaXMuZXh0cmFjdGlvblBhdHRlcm4uaXNEZXNjcmlwdGlvbk1hdGNoZWQoZGVzY3JpcHRpb24pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0dS5tZWFuaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIElEIHdhcyBleHBsaWNpdGx5IHNldCAodmlhIGkxOG49XCJAbXlpZCkuXHJcbiAgICAgKiBKdXN0IGhldXJpc3RpYywgYW4gSUQgaXMgZXhwbGljaXRseSwgaWYgaXQgZG9lcyBub3QgbG9vayBsaWtlIGEgZ2VuZXJhdGVkIG9uZS5cclxuICAgICAqIEBwYXJhbSBpZCBpZFxyXG4gICAgICogQHJldHVybiB3ZXRoZXIgSUQgd2FzIGV4cGxpY2l0bHkgc2V0ICh2aWEgaTE4bj1cIkBteWlkKS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0V4cGxpY2l0bHlTZXRJZChpZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGlkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdlbmVyYXRlZCBJRHMgYXJlIGVpdGhlciBkZWNpbWFsIG9yIHNoYTEgaGV4XHJcbiAgICAgICAgY29uc3QgcmVGb3JHZW5lcmF0ZWRJZCA9IC9eWzAtOWEtZl17MTEsfSQvO1xyXG4gICAgICAgIHJldHVybiAhcmVGb3JHZW5lcmF0ZWRJZC50ZXN0KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgbGlzdCBvZiByZWxldmFudCBUVXMgdG8gbmd4IHRyYW5zbGF0aW9ucyBvYmplY3QuXHJcbiAgICAgKiBAcGFyYW0gbXNnTGlzdCBtc2dMaXN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdG9OZ3hUcmFuc2xhdGlvbnMobXNnTGlzdDogTmd4TWVzc2FnZVtdKTogTmd4VHJhbnNsYXRpb25zIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbk9iamVjdDogTmd4VHJhbnNsYXRpb25zID0ge307XHJcbiAgICAgICAgbXNnTGlzdC5mb3JFYWNoKChtc2c6IE5neE1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wdXRJblRyYW5zbGF0aW9uT2JqZWN0KHRyYW5zbGF0aW9uT2JqZWN0LCBtc2cpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFB1dCBhIG5ldyBtZXNzYWdlcyBpbnRvIHRoZSB0cmFuc2xhdGlvbiBkYXRhIG9iamVjdC5cclxuICAgICAqIElmIHlvdSBhZGQsIGUuZy4gXCJ7aWQ6ICdteWFwcC5leGFtcGxlJywgbWVzc2FnZTogJ3Rlc3QnfVwiLFxyXG4gICAgICogdGhlIHRyYW5zbGF0aW9uIG9iamVjdCB3aWxsIHRoZW4gY29udGFpbiBhbiBvYmplY3QgbXlhcHAgdGhhdCBoYXMgcHJvcGVydHkgZXhhbXBsZTpcclxuICAgICAqIHtteWFwcDoge1xyXG4gICAgICogICBleGFtcGxlOiAndGVzdCdcclxuICAgICAqICAgfX1cclxuICAgICAqIEBwYXJhbSB0cmFuc2xhdGlvbk9iamVjdCB0cmFuc2xhdGlvbk9iamVjdFxyXG4gICAgICogQHBhcmFtIG1zZyBtc2dcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwdXRJblRyYW5zbGF0aW9uT2JqZWN0KHRyYW5zbGF0aW9uT2JqZWN0OiBOZ3hUcmFuc2xhdGlvbnMsIG1zZzogTmd4TWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBmaXJzdFBhcnRPZklkOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHJlc3RPZklkOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgaW5kZXhPZkRvdCA9IG1zZy5pZC5pbmRleE9mKCcuJyk7XHJcbiAgICAgICAgaWYgKGluZGV4T2ZEb3QgPT09IDAgfHwgaW5kZXhPZkRvdCA9PT0gKG1zZy5pZC5sZW5ndGggLSAxKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBueGctdHJhbnNsYXRlIGlkIFwiJyArIG1zZy5pZCArICdcIicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXhPZkRvdCA8IDApIHtcclxuICAgICAgICAgICAgZmlyc3RQYXJ0T2ZJZCA9IG1zZy5pZDtcclxuICAgICAgICAgICAgcmVzdE9mSWQgPSAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaXJzdFBhcnRPZklkID0gbXNnLmlkLnN1YnN0cmluZygwLCBpbmRleE9mRG90KTtcclxuICAgICAgICAgICAgcmVzdE9mSWQgPSBtc2cuaWQuc3Vic3RyaW5nKGluZGV4T2ZEb3QgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9iamVjdCA9IHRyYW5zbGF0aW9uT2JqZWN0W2ZpcnN0UGFydE9mSWRdO1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZChvYmplY3QpKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN0T2ZJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uT2JqZWN0W2ZpcnN0UGFydE9mSWRdID0gbXNnLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uT2JqZWN0W2ZpcnN0UGFydE9mSWRdID0gb2JqZWN0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN0T2ZJZCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZHVwbGljYXRlIGlkIHByYWVmaXggXCInICsgbXNnLmlkICsgJ1wiJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wdXRJblRyYW5zbGF0aW9uT2JqZWN0KDxOZ3hUcmFuc2xhdGlvbnM+IG9iamVjdCwge2lkOiByZXN0T2ZJZCwgbWVzc2FnZTogbXNnLm1lc3NhZ2V9KTtcclxuICAgIH1cclxufVxyXG4iXX0=