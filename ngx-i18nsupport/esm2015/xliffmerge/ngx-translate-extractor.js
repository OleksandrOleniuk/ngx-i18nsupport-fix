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
export class NgxTranslateExtractor {
    /**
     * @param {?} messagesFile
     * @param {?} extractionPatternString
     */
    constructor(messagesFile, extractionPatternString) {
        this.messagesFile = messagesFile;
        this.extractionPattern = new NgxTranslateExtractionPattern(extractionPatternString);
    }
    /**
     * Check, wether extractionPattern has valid syntax.
     * @param {?} extractionPatternString extractionPatternString
     * @return {?} null, if pattern is ok, string describing the error, if it is not ok.
     */
    static checkPattern(extractionPatternString) {
        try {
            if (new NgxTranslateExtractionPattern(extractionPatternString)) {
                return null;
            }
        }
        catch (error) {
            return error.message;
        }
        return null;
    }
    /**
     * @param {?} messagesFile
     * @param {?} extractionPattern
     * @param {?} outputFile
     * @return {?}
     */
    static extract(messagesFile, extractionPattern, outputFile) {
        new NgxTranslateExtractor(messagesFile, extractionPattern).extractTo(outputFile);
    }
    /**
     * Extact messages and write them to a file.
     * @param {?} outputFile outputFile
     * @return {?}
     */
    extractTo(outputFile) {
        /** @type {?} */
        const translations = this.toNgxTranslations(this.extract());
        if (translations && Object.keys(translations).length > 0) {
            FileUtil.replaceContent(outputFile, JSON.stringify(translations, null, 4), 'UTF-8');
        }
        else {
            if (FileUtil.exists(outputFile)) {
                FileUtil.deleteFile(outputFile);
            }
        }
    }
    /**
     *  Extract messages and convert them to ngx translations.
     * @private
     * @return {?} the translation objects.
     */
    extract() {
        /** @type {?} */
        const result = [];
        this.messagesFile.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => {
            /** @type {?} */
            const ngxId = this.ngxTranslateIdFromTU(tu);
            if (ngxId) {
                /** @type {?} */
                const messagetext = tu.targetContentNormalized().asDisplayString(NORMALIZATION_FORMAT_NGXTRANSLATE);
                result.push({ id: ngxId, message: messagetext });
            }
        }));
        return result;
    }
    /**
     * Check, wether this tu should be extracted for ngx-translate usage, and return its id for ngx-translate.
     * There are 2 possibilities:
     * 1. description is set to "ngx-translate" and meaning contains the id.
     * 2. id is explicitly set to a string.
     * @private
     * @param {?} tu tu
     * @return {?} an ngx id or null, if this tu should not be extracted.
     */
    ngxTranslateIdFromTU(tu) {
        if (this.isExplicitlySetId(tu.id)) {
            if (this.extractionPattern.isExplicitIdMatched(tu.id)) {
                return tu.id;
            }
            else {
                return null;
            }
        }
        /** @type {?} */
        const description = tu.description();
        if (description && this.extractionPattern.isDescriptionMatched(description)) {
            return tu.meaning();
        }
    }
    /**
     * Test, wether ID was explicitly set (via i18n="\@myid).
     * Just heuristic, an ID is explicitly, if it does not look like a generated one.
     * @private
     * @param {?} id id
     * @return {?} wether ID was explicitly set (via i18n="\@myid).
     */
    isExplicitlySetId(id) {
        if (isNullOrUndefined(id)) {
            return false;
        }
        // generated IDs are either decimal or sha1 hex
        /** @type {?} */
        const reForGeneratedId = /^[0-9a-f]{11,}$/;
        return !reForGeneratedId.test(id);
    }
    /**
     * Convert list of relevant TUs to ngx translations object.
     * @private
     * @param {?} msgList msgList
     * @return {?}
     */
    toNgxTranslations(msgList) {
        /** @type {?} */
        const translationObject = {};
        msgList.forEach((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => {
            this.putInTranslationObject(translationObject, msg);
        }));
        return translationObject;
    }
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
    putInTranslationObject(translationObject, msg) {
        /** @type {?} */
        let firstPartOfId;
        /** @type {?} */
        let restOfId;
        /** @type {?} */
        const indexOfDot = msg.id.indexOf('.');
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
        let object = translationObject[firstPartOfId];
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
    }
}
NgxTranslateExtractor.DefaultExtractionPattern = '@@|ngx-translate';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyYW5zbGF0ZS1leHRyYWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbInhsaWZmbWVyZ2Uvbmd4LXRyYW5zbGF0ZS1leHRyYWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBdUMsaUNBQWlDLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3SCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sb0NBQW9DLENBQUM7Ozs7OztBQVdqRiw4QkFFQzs7Ozs7O0FBTUQseUJBR0M7OztJQUZHLHdCQUFXOztJQUNYLDZCQUFnQjs7QUFHcEIsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUF5QjlCLFlBQW9CLFlBQXNDLEVBQUUsdUJBQStCO1FBQXZFLGlCQUFZLEdBQVosWUFBWSxDQUEwQjtRQUN0RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSw2QkFBNkIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7Ozs7OztJQWpCTSxNQUFNLENBQUMsWUFBWSxDQUFDLHVCQUErQjtRQUN0RCxJQUFJO1lBQ0YsSUFBSSxJQUFJLDZCQUE2QixDQUFDLHVCQUF1QixDQUFDLEVBQUU7Z0JBQzVELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBc0MsRUFBRSxpQkFBeUIsRUFBRSxVQUFrQjtRQUN2RyxJQUFJLHFCQUFxQixDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFD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OztJQXNCN0MsNkNBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUsIElUcmFuc1VuaXQsIE5PUk1BTElaQVRJT05fRk9STUFUX05HWFRSQU5TTEFURX0gZnJvbSAnQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliJztcclxuaW1wb3J0IHtGaWxlVXRpbH0gZnJvbSAnLi4vY29tbW9uL2ZpbGUtdXRpbCc7XHJcbmltcG9ydCB7aXNOdWxsT3JVbmRlZmluZWR9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuaW1wb3J0IHtOZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybn0gZnJvbSAnLi9uZ3gtdHJhbnNsYXRlLWV4dHJhY3Rpb24tcGF0dGVybic7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHJvb2JtIG9uIDE1LjAzLjIwMTcuXHJcbiAqIEEgdG9vbCBmb3IgZXh0cmFjdGluZyBtZXNzYWdlcyBpbiBuZ3gtdHJhbnNsYXRlIGZvcm1hdC5cclxuICogR2VuZXJhdGVzIGEganNvbi1maWxlIHRvIGJlIHVzZWQgd2l0aCBuZ3gtdHJhbnNsYXRlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUaGUgaW50ZXJmYWNlIHVzZWQgZm9yIHRyYW5zbGF0aW9ucyBpbiBuZ3gtdHJhbnNsYXRlLlxyXG4gKiBBIGhhc2ggdGhhdCBjb250YWlucyBlaXRoZXIgdGhlIHRyYW5zbGF0aW9uIG9yIGFub3RoZXIgaGFzaC5cclxuICovXHJcbmludGVyZmFjZSBOZ3hUcmFuc2xhdGlvbnMge1xyXG4gICAgW2lkOiBzdHJpbmddOiBOZ3hUcmFuc2xhdGlvbnMgfCBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBpbnRlcm5hbCxcclxuICogYSBtZXNzYWdlIHdpdGggaWQgKGEgZG90LXNlcGFyYXRlZCBzdHJpbmcpLlxyXG4gKi9cclxuaW50ZXJmYWNlIE5neE1lc3NhZ2Uge1xyXG4gICAgaWQ6IHN0cmluZzsgLy8gZG90IHNlcGFyYXRlZCBuYW1lLCBlLmcuIFwibXlhcHAuc2VydmljZTEubWVzc2FnZTFcIlxyXG4gICAgbWVzc2FnZTogc3RyaW5nOyAvLyB0aGUgbWVzc2FnZSwgcGxhY2Vob2xkZXIgYXJlIGluIHt7bn19IHN5bnRheCwgZS5nLiBcImEgdGVzdCB3aXRoIHZhbHVlOiB7ezB9fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlRXh0cmFjdG9yIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERlZmF1bHRFeHRyYWN0aW9uUGF0dGVybiA9ICdAQHxuZ3gtdHJhbnNsYXRlJztcclxuICAgIHByaXZhdGUgZXh0cmFjdGlvblBhdHRlcm46IE5neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2ssIHdldGhlciBleHRyYWN0aW9uUGF0dGVybiBoYXMgdmFsaWQgc3ludGF4LlxyXG4gICAgICogQHBhcmFtIGV4dHJhY3Rpb25QYXR0ZXJuU3RyaW5nIGV4dHJhY3Rpb25QYXR0ZXJuU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIG51bGwsIGlmIHBhdHRlcm4gaXMgb2ssIHN0cmluZyBkZXNjcmliaW5nIHRoZSBlcnJvciwgaWYgaXQgaXMgbm90IG9rLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrUGF0dGVybihleHRyYWN0aW9uUGF0dGVyblN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKG5ldyBOZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybihleHRyYWN0aW9uUGF0dGVyblN0cmluZykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IubWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBleHRyYWN0KG1lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLCBleHRyYWN0aW9uUGF0dGVybjogc3RyaW5nLCBvdXRwdXRGaWxlOiBzdHJpbmcpIHtcclxuICAgICAgICBuZXcgTmd4VHJhbnNsYXRlRXh0cmFjdG9yKG1lc3NhZ2VzRmlsZSwgZXh0cmFjdGlvblBhdHRlcm4pLmV4dHJhY3RUbyhvdXRwdXRGaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLCBleHRyYWN0aW9uUGF0dGVyblN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5leHRyYWN0aW9uUGF0dGVybiA9IG5ldyBOZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybihleHRyYWN0aW9uUGF0dGVyblN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRhY3QgbWVzc2FnZXMgYW5kIHdyaXRlIHRoZW0gdG8gYSBmaWxlLlxyXG4gICAgICogQHBhcmFtIG91dHB1dEZpbGUgb3V0cHV0RmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZXh0cmFjdFRvKG91dHB1dEZpbGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uczogTmd4VHJhbnNsYXRpb25zID0gdGhpcy50b05neFRyYW5zbGF0aW9ucyh0aGlzLmV4dHJhY3QoKSk7XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0aW9ucyAmJiBPYmplY3Qua2V5cyh0cmFuc2xhdGlvbnMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgRmlsZVV0aWwucmVwbGFjZUNvbnRlbnQob3V0cHV0RmlsZSwgSlNPTi5zdHJpbmdpZnkodHJhbnNsYXRpb25zLCBudWxsLCA0KSwgJ1VURi04Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKEZpbGVVdGlsLmV4aXN0cyhvdXRwdXRGaWxlKSkge1xyXG4gICAgICAgICAgICAgICAgRmlsZVV0aWwuZGVsZXRlRmlsZShvdXRwdXRGaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICBFeHRyYWN0IG1lc3NhZ2VzIGFuZCBjb252ZXJ0IHRoZW0gdG8gbmd4IHRyYW5zbGF0aW9ucy5cclxuICAgICAqICBAcmV0dXJuIHRoZSB0cmFuc2xhdGlvbiBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGV4dHJhY3QoKTogTmd4TWVzc2FnZVtdIHtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IE5neE1lc3NhZ2VbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXNGaWxlLmZvckVhY2hUcmFuc1VuaXQoKHR1OiBJVHJhbnNVbml0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5neElkID0gdGhpcy5uZ3hUcmFuc2xhdGVJZEZyb21UVSh0dSk7XHJcbiAgICAgICAgICAgIGlmIChuZ3hJZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZXRleHQgPSB0dS50YXJnZXRDb250ZW50Tm9ybWFsaXplZCgpLmFzRGlzcGxheVN0cmluZyhOT1JNQUxJWkFUSU9OX0ZPUk1BVF9OR1hUUkFOU0xBVEUpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe2lkOiBuZ3hJZCwgbWVzc2FnZTogbWVzc2FnZXRleHR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjaywgd2V0aGVyIHRoaXMgdHUgc2hvdWxkIGJlIGV4dHJhY3RlZCBmb3Igbmd4LXRyYW5zbGF0ZSB1c2FnZSwgYW5kIHJldHVybiBpdHMgaWQgZm9yIG5neC10cmFuc2xhdGUuXHJcbiAgICAgKiBUaGVyZSBhcmUgMiBwb3NzaWJpbGl0aWVzOlxyXG4gICAgICogMS4gZGVzY3JpcHRpb24gaXMgc2V0IHRvIFwibmd4LXRyYW5zbGF0ZVwiIGFuZCBtZWFuaW5nIGNvbnRhaW5zIHRoZSBpZC5cclxuICAgICAqIDIuIGlkIGlzIGV4cGxpY2l0bHkgc2V0IHRvIGEgc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIHR1IHR1XHJcbiAgICAgKiBAcmV0dXJuIGFuIG5neCBpZCBvciBudWxsLCBpZiB0aGlzIHR1IHNob3VsZCBub3QgYmUgZXh0cmFjdGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG5neFRyYW5zbGF0ZUlkRnJvbVRVKHR1OiBJVHJhbnNVbml0KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5pc0V4cGxpY2l0bHlTZXRJZCh0dS5pZCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZXh0cmFjdGlvblBhdHRlcm4uaXNFeHBsaWNpdElkTWF0Y2hlZCh0dS5pZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0dS5pZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdHUuZGVzY3JpcHRpb24oKTtcclxuICAgICAgICBpZiAoZGVzY3JpcHRpb24gJiYgdGhpcy5leHRyYWN0aW9uUGF0dGVybi5pc0Rlc2NyaXB0aW9uTWF0Y2hlZChkZXNjcmlwdGlvbikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR1Lm1lYW5pbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgSUQgd2FzIGV4cGxpY2l0bHkgc2V0ICh2aWEgaTE4bj1cIkBteWlkKS5cclxuICAgICAqIEp1c3QgaGV1cmlzdGljLCBhbiBJRCBpcyBleHBsaWNpdGx5LCBpZiBpdCBkb2VzIG5vdCBsb29rIGxpa2UgYSBnZW5lcmF0ZWQgb25lLlxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKiBAcmV0dXJuIHdldGhlciBJRCB3YXMgZXhwbGljaXRseSBzZXQgKHZpYSBpMThuPVwiQG15aWQpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzRXhwbGljaXRseVNldElkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2VuZXJhdGVkIElEcyBhcmUgZWl0aGVyIGRlY2ltYWwgb3Igc2hhMSBoZXhcclxuICAgICAgICBjb25zdCByZUZvckdlbmVyYXRlZElkID0gL15bMC05YS1mXXsxMSx9JC87XHJcbiAgICAgICAgcmV0dXJuICFyZUZvckdlbmVyYXRlZElkLnRlc3QoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBsaXN0IG9mIHJlbGV2YW50IFRVcyB0byBuZ3ggdHJhbnNsYXRpb25zIG9iamVjdC5cclxuICAgICAqIEBwYXJhbSBtc2dMaXN0IG1zZ0xpc3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0b05neFRyYW5zbGF0aW9ucyhtc2dMaXN0OiBOZ3hNZXNzYWdlW10pOiBOZ3hUcmFuc2xhdGlvbnMge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uT2JqZWN0OiBOZ3hUcmFuc2xhdGlvbnMgPSB7fTtcclxuICAgICAgICBtc2dMaXN0LmZvckVhY2goKG1zZzogTmd4TWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnB1dEluVHJhbnNsYXRpb25PYmplY3QodHJhbnNsYXRpb25PYmplY3QsIG1zZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHV0IGEgbmV3IG1lc3NhZ2VzIGludG8gdGhlIHRyYW5zbGF0aW9uIGRhdGEgb2JqZWN0LlxyXG4gICAgICogSWYgeW91IGFkZCwgZS5nLiBcIntpZDogJ215YXBwLmV4YW1wbGUnLCBtZXNzYWdlOiAndGVzdCd9XCIsXHJcbiAgICAgKiB0aGUgdHJhbnNsYXRpb24gb2JqZWN0IHdpbGwgdGhlbiBjb250YWluIGFuIG9iamVjdCBteWFwcCB0aGF0IGhhcyBwcm9wZXJ0eSBleGFtcGxlOlxyXG4gICAgICoge215YXBwOiB7XHJcbiAgICAgKiAgIGV4YW1wbGU6ICd0ZXN0J1xyXG4gICAgICogICB9fVxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uT2JqZWN0IHRyYW5zbGF0aW9uT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gbXNnIG1zZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHB1dEluVHJhbnNsYXRpb25PYmplY3QodHJhbnNsYXRpb25PYmplY3Q6IE5neFRyYW5zbGF0aW9ucywgbXNnOiBOZ3hNZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IGZpcnN0UGFydE9mSWQ6IHN0cmluZztcclxuICAgICAgICBsZXQgcmVzdE9mSWQ6IHN0cmluZztcclxuICAgICAgICBjb25zdCBpbmRleE9mRG90ID0gbXNnLmlkLmluZGV4T2YoJy4nKTtcclxuICAgICAgICBpZiAoaW5kZXhPZkRvdCA9PT0gMCB8fCBpbmRleE9mRG90ID09PSAobXNnLmlkLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYmFkIG54Zy10cmFuc2xhdGUgaWQgXCInICsgbXNnLmlkICsgJ1wiJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleE9mRG90IDwgMCkge1xyXG4gICAgICAgICAgICBmaXJzdFBhcnRPZklkID0gbXNnLmlkO1xyXG4gICAgICAgICAgICByZXN0T2ZJZCA9ICcnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZpcnN0UGFydE9mSWQgPSBtc2cuaWQuc3Vic3RyaW5nKDAsIGluZGV4T2ZEb3QpO1xyXG4gICAgICAgICAgICByZXN0T2ZJZCA9IG1zZy5pZC5zdWJzdHJpbmcoaW5kZXhPZkRvdCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb2JqZWN0ID0gdHJhbnNsYXRpb25PYmplY3RbZmlyc3RQYXJ0T2ZJZF07XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKG9iamVjdCkpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3RPZklkID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25PYmplY3RbZmlyc3RQYXJ0T2ZJZF0gPSBtc2cubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25PYmplY3RbZmlyc3RQYXJ0T2ZJZF0gPSBvYmplY3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHJlc3RPZklkID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkdXBsaWNhdGUgaWQgcHJhZWZpeCBcIicgKyBtc2cuaWQgKyAnXCInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1dEluVHJhbnNsYXRpb25PYmplY3QoPE5neFRyYW5zbGF0aW9ucz4gb2JqZWN0LCB7aWQ6IHJlc3RPZklkLCBtZXNzYWdlOiBtc2cubWVzc2FnZX0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==