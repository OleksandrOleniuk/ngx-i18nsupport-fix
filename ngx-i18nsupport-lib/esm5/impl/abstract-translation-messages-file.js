/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { STATE_NEW, STATE_TRANSLATED } from '../api/constants';
import { isNullOrUndefined } from 'util';
import { DOMParser } from 'xmldom';
import { XmlSerializer } from './xml-serializer';
/**
 * Created by roobm on 09.05.2017.
 * Abstract superclass for all implementations of ITranslationMessagesFile.
 * @abstract
 */
var /**
 * Created by roobm on 09.05.2017.
 * Abstract superclass for all implementations of ITranslationMessagesFile.
 * @abstract
 */
AbstractTranslationMessagesFile = /** @class */ (function () {
    function AbstractTranslationMessagesFile() {
        this.transUnits = null;
        this._warnings = [];
    }
    /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @param xmlString xmlString
     * @param path path
     * @param encoding encoding
     * @param optionalMaster optionalMaster
     */
    /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @protected
     * @param {?} xmlString xmlString
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMaster optionalMaster
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.parseContent = /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @protected
     * @param {?} xmlString xmlString
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMaster optionalMaster
     * @return {?}
     */
    function (xmlString, path, encoding, optionalMaster) {
        this._filename = path;
        this._encoding = encoding;
        this._parsedDocument = new DOMParser().parseFromString(xmlString, 'text/xml');
        this._fileEndsWithEOL = xmlString.endsWith('\n');
    };
    /**
     * @protected
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.lazyInitializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this.transUnits)) {
            this.initializeTransUnits();
            this.countNumbers();
        }
    };
    /**
     * count units after changes of trans units
     */
    /**
     * count units after changes of trans units
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.countNumbers = /**
     * count units after changes of trans units
     * @return {?}
     */
    function () {
        var _this = this;
        this._numberOfTransUnitsWithMissingId = 0;
        this._numberOfUntranslatedTransUnits = 0;
        this._numberOfReviewedTransUnits = 0;
        this.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            if (isNullOrUndefined(tu.id) || tu.id === '') {
                _this._numberOfTransUnitsWithMissingId++;
            }
            /** @type {?} */
            var state = tu.targetState();
            if (isNullOrUndefined(state) || state === STATE_NEW) {
                _this._numberOfUntranslatedTransUnits++;
            }
            if (state === STATE_TRANSLATED) {
                _this._numberOfReviewedTransUnits++;
            }
        }));
    };
    /**
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.warnings = /**
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._warnings;
    };
    /**
     * Total number of translation units found in the file.
     */
    /**
     * Total number of translation units found in the file.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfTransUnits = /**
     * Total number of translation units found in the file.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this.transUnits.length;
    };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfUntranslatedTransUnits = /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._numberOfUntranslatedTransUnits;
    };
    /**
     * Number of translation units with state 'final'.
     */
    /**
     * Number of translation units with state 'final'.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfReviewedTransUnits = /**
     * Number of translation units with state 'final'.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._numberOfReviewedTransUnits;
    };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfTransUnitsWithMissingId = /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._numberOfTransUnitsWithMissingId;
    };
    /**
     * Loop over all Translation Units.
     * @param callback callback
     */
    /**
     * Loop over all Translation Units.
     * @param {?} callback callback
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.forEachTransUnit = /**
     * Loop over all Translation Units.
     * @param {?} callback callback
     * @return {?}
     */
    function (callback) {
        this.lazyInitializeTransUnits();
        this.transUnits.forEach((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) { return callback(tu); }));
    };
    /**
     * Get trans-unit with given id.
     * @param id id
     * @return trans-unit with given id.
     */
    /**
     * Get trans-unit with given id.
     * @param {?} id id
     * @return {?} trans-unit with given id.
     */
    AbstractTranslationMessagesFile.prototype.transUnitWithId = /**
     * Get trans-unit with given id.
     * @param {?} id id
     * @return {?} trans-unit with given id.
     */
    function (id) {
        this.lazyInitializeTransUnits();
        return this.transUnits.find((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) { return tu.id === id; }));
    };
    /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param targetPraefix targetPraefix
     */
    /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetPraefix targetPraefix
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.setNewTransUnitTargetPraefix = /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetPraefix targetPraefix
     * @return {?}
     */
    function (targetPraefix) {
        this.targetPraefix = targetPraefix;
    };
    /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return the praefix used when copying source to target.
     */
    /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the praefix used when copying source to target.
     */
    AbstractTranslationMessagesFile.prototype.getNewTransUnitTargetPraefix = /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the praefix used when copying source to target.
     */
    function () {
        return isNullOrUndefined(this.targetPraefix) ? '' : this.targetPraefix;
    };
    /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param targetSuffix targetSuffix
     */
    /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetSuffix targetSuffix
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.setNewTransUnitTargetSuffix = /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetSuffix targetSuffix
     * @return {?}
     */
    function (targetSuffix) {
        this.targetSuffix = targetSuffix;
    };
    /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return the suffix used when copying source to target.
     */
    /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the suffix used when copying source to target.
     */
    AbstractTranslationMessagesFile.prototype.getNewTransUnitTargetSuffix = /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the suffix used when copying source to target.
     */
    function () {
        return isNullOrUndefined(this.targetSuffix) ? '' : this.targetSuffix;
    };
    /**
     * Remove the trans-unit with the given id.
     * @param id id
     */
    /**
     * Remove the trans-unit with the given id.
     * @param {?} id id
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.removeTransUnitWithId = /**
     * Remove the trans-unit with the given id.
     * @param {?} id id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var tuNode = this._parsedDocument.getElementById(id);
        if (tuNode) {
            tuNode.parentNode.removeChild(tuNode);
            this.lazyInitializeTransUnits();
            this.transUnits = this.transUnits.filter((/**
             * @param {?} tu
             * @return {?}
             */
            function (tu) { return tu.id !== id; }));
            this.countNumbers();
        }
    };
    /**
     * The filename where the data is read from.
     */
    /**
     * The filename where the data is read from.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.filename = /**
     * The filename where the data is read from.
     * @return {?}
     */
    function () {
        return this._filename;
    };
    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     */
    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.encoding = /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     * @return {?}
     */
    function () {
        return this._encoding;
    };
    /**
     * The xml content to be saved after changes are made.
     * @param beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     */
    /**
     * The xml content to be saved after changes are made.
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.editedContent = /**
     * The xml content to be saved after changes are made.
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    function (beautifyOutput) {
        /** @type {?} */
        var options = {};
        if (beautifyOutput === true) {
            options.beautify = true;
            options.indentString = '  ';
            options.mixedContentElements = this.elementsWithMixedContent();
        }
        /** @type {?} */
        var result = new XmlSerializer().serializeToString(this._parsedDocument, options);
        if (this._fileEndsWithEOL) {
            // add eol if there was eol in original source
            return result + '\n';
        }
        else {
            return result;
        }
    };
    return AbstractTranslationMessagesFile;
}());
/**
 * Created by roobm on 09.05.2017.
 * Abstract superclass for all implementations of ITranslationMessagesFile.
 * @abstract
 */
export { AbstractTranslationMessagesFile };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._filename;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._encoding;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._parsedDocument;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._fileEndsWithEOL;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype.transUnits;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._warnings;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._numberOfTransUnitsWithMissingId;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._numberOfUntranslatedTransUnits;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype._numberOfReviewedTransUnits;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype.targetPraefix;
    /**
     * @type {?}
     * @protected
     */
    AbstractTranslationMessagesFile.prototype.targetSuffix;
    /**
     * @abstract
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.i18nFormat = function () { };
    /**
     * @abstract
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.fileType = function () { };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @abstract
     * @protected
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.elementsWithMixedContent = function () { };
    /**
     * Read all trans units from xml content.
     * Puts the found units into transUnits.
     * Puts warnings for missing ids.
     * @abstract
     * @protected
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.initializeTransUnits = function () { };
    /**
     * Get source language.
     * @abstract
     * @return {?} source language.
     */
    AbstractTranslationMessagesFile.prototype.sourceLanguage = function () { };
    /**
     * Get target language.
     * @abstract
     * @return {?} target language.
     */
    AbstractTranslationMessagesFile.prototype.targetLanguage = function () { };
    /**
     * Edit the source language.
     * @abstract
     * @param {?} language language
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.setSourceLanguage = function (language) { };
    /**
     * Edit the target language.
     * @abstract
     * @param {?} language language
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.setTargetLanguage = function (language) { };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @abstract
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
    AbstractTranslationMessagesFile.prototype.importNewTransUnit = function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) { };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @abstract
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
    AbstractTranslationMessagesFile.prototype.createTranslationFileForLang = function (lang, filename, isDefaultLang, copyContent) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvYWJzdHJhY3QtdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSTdELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2pDLE9BQU8sRUFBQyxhQUFhLEVBQXVCLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQU1yRTs7Ozs7O0lBeUJJO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7O0lBQ08sc0RBQVk7Ozs7Ozs7Ozs7SUFBdEIsVUFDSSxTQUFpQixFQUNqQixJQUFZLEVBQUUsUUFBZ0IsRUFDOUIsY0FBdUU7UUFFdkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7SUFvQlMsa0VBQXdCOzs7O0lBQWxDO1FBQ0ksSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFD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LElBQUksY0FBYyxLQUFLLElBQUksRUFBRTtZQUMxQixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN4QixPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUM1QixPQUFPLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakU7O1lBQ0ssTUFBTSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUM7UUFDbkYsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsOENBQThDO1lBQzlDLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQztTQUN4QjthQUFNO1lBQ0gsT0FBTyxNQUFNLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBa0JMLHNDQUFDO0FBQUQsQ0FBQyxBQXZURCxJQXVUQzs7Ozs7Ozs7Ozs7O0lBclRHLG9EQUE0Qjs7Ozs7SUFFNUIsb0RBQTRCOzs7OztJQUU1QiwwREFBb0M7Ozs7O0lBRXBDLDJEQUFvQzs7Ozs7SUFHcEMscURBQW1DOzs7OztJQUVuQyxvREFBOEI7Ozs7O0lBRTlCLDJFQUFtRDs7Ozs7SUFFbkQsMEVBQWtEOzs7OztJQUVsRCxzRUFBOEM7Ozs7O0lBRTlDLHdEQUFnQzs7Ozs7SUFFaEMsdURBQStCOzs7OztJQTBCL0IsdUVBQThCOzs7OztJQUU5QixxRUFBNEI7Ozs7Ozs7OztJQU81QixxRkFBd0Q7Ozs7Ozs7OztJQU94RCxpRkFBMEM7Ozs7OztJQXlFMUMsMkVBQWtDOzs7Ozs7SUFNbEMsMkVBQWtDOzs7Ozs7O0lBNkJsQyxzRkFBNkM7Ozs7Ozs7SUFNN0Msc0ZBQTZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4RDdDLCtJQUNpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtRWpCLG1JQUMrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U1RBVEVfTkVXLCBTVEFURV9UUkFOU0xBVEVEfSBmcm9tICcuLi9hcGkvY29uc3RhbnRzJztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4uL2FwaS9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge0lOb3JtYWxpemVkTWVzc2FnZX0gZnJvbSAnLi4vYXBpL2ktbm9ybWFsaXplZC1tZXNzYWdlJztcclxuaW1wb3J0IHtJVHJhbnNVbml0fSBmcm9tICcuLi9hcGkvaS10cmFucy11bml0JztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7RE9NUGFyc2VyfSBmcm9tICd4bWxkb20nO1xyXG5pbXBvcnQge1htbFNlcmlhbGl6ZXIsIFhtbFNlcmlhbGl6ZXJPcHRpb25zfSBmcm9tICcuL3htbC1zZXJpYWxpemVyJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMDkuMDUuMjAxNy5cclxuICogQWJzdHJhY3Qgc3VwZXJjbGFzcyBmb3IgYWxsIGltcGxlbWVudGF0aW9ucyBvZiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0VHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUgaW1wbGVtZW50cyBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUge1xyXG5cclxuICAgIHByb3RlY3RlZCBfZmlsZW5hbWU6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2VuY29kaW5nOiBzdHJpbmc7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9wYXJzZWREb2N1bWVudDogRG9jdW1lbnQ7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9maWxlRW5kc1dpdGhFT0w6IGJvb2xlYW47XHJcblxyXG4gICAgLy8gdHJhbnMtdW5pdCBlbGVtZW50cyBhbmQgdGhlaXIgaWQgZnJvbSB0aGUgZmlsZVxyXG4gICAgcHJvdGVjdGVkIHRyYW5zVW5pdHM6IElUcmFuc1VuaXRbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX3dhcm5pbmdzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX251bWJlck9mVHJhbnNVbml0c1dpdGhNaXNzaW5nSWQ6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX251bWJlck9mVW50cmFuc2xhdGVkVHJhbnNVbml0czogbnVtYmVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBfbnVtYmVyT2ZSZXZpZXdlZFRyYW5zVW5pdHM6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0UHJhZWZpeDogc3RyaW5nO1xyXG5cclxuICAgIHByb3RlY3RlZCB0YXJnZXRTdWZmaXg6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc1VuaXRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgZmlsZSBjb250ZW50LlxyXG4gICAgICogU2V0cyBfcGFyc2VkRG9jdW1lbnQsIGxpbmUgZW5kaW5nLCBlbmNvZGluZywgZXRjLlxyXG4gICAgICogQHBhcmFtIHhtbFN0cmluZyB4bWxTdHJpbmdcclxuICAgICAqIEBwYXJhbSBwYXRoIHBhdGhcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyBlbmNvZGluZ1xyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsTWFzdGVyIG9wdGlvbmFsTWFzdGVyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwYXJzZUNvbnRlbnQoXHJcbiAgICAgICAgeG1sU3RyaW5nOiBzdHJpbmcsXHJcbiAgICAgICAgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nLFxyXG4gICAgICAgIG9wdGlvbmFsTWFzdGVyPzogeyB4bWxDb250ZW50OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyB9KVxyXG4gICAgICAgIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZmlsZW5hbWUgPSBwYXRoO1xyXG4gICAgICAgIHRoaXMuX2VuY29kaW5nID0gZW5jb2Rpbmc7XHJcbiAgICAgICAgdGhpcy5fcGFyc2VkRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHhtbFN0cmluZywgJ3RleHQveG1sJyk7XHJcbiAgICAgICAgdGhpcy5fZmlsZUVuZHNXaXRoRU9MID0geG1sU3RyaW5nLmVuZHNXaXRoKCdcXG4nKTtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBpMThuRm9ybWF0KCk6IHN0cmluZztcclxuXHJcbiAgICBhYnN0cmFjdCBmaWxlVHlwZSgpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGFnIG5hbWVzIG9mIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgbWl4ZWQgY29udGVudC5cclxuICAgICAqIFRoZXNlIGVsZW1lbnRzIHdpbGwgbm90IGJlIGJlYXV0aWZpZWQuXHJcbiAgICAgKiBUeXBpY2FsIGNhbmRpZGF0ZXMgYXJlIHNvdXJjZSBhbmQgdGFyZ2V0LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgZWxlbWVudHNXaXRoTWl4ZWRDb250ZW50KCk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhbGwgdHJhbnMgdW5pdHMgZnJvbSB4bWwgY29udGVudC5cclxuICAgICAqIFB1dHMgdGhlIGZvdW5kIHVuaXRzIGludG8gdHJhbnNVbml0cy5cclxuICAgICAqIFB1dHMgd2FybmluZ3MgZm9yIG1pc3NpbmcgaWRzLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCkge1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0aGlzLnRyYW5zVW5pdHMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5jb3VudE51bWJlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3VudCB1bml0cyBhZnRlciBjaGFuZ2VzIG9mIHRyYW5zIHVuaXRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb3VudE51bWJlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZUcmFuc1VuaXRzV2l0aE1pc3NpbmdJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZVbnRyYW5zbGF0ZWRUcmFuc1VuaXRzID0gMDtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlJldmlld2VkVHJhbnNVbml0cyA9IDA7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoVHJhbnNVbml0KCh0dTogSVRyYW5zVW5pdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQodHUuaWQpIHx8IHR1LmlkID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbnVtYmVyT2ZUcmFuc1VuaXRzV2l0aE1pc3NpbmdJZCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdHUudGFyZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHN0YXRlKSB8fCBzdGF0ZSA9PT0gU1RBVEVfTkVXKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9udW1iZXJPZlVudHJhbnNsYXRlZFRyYW5zVW5pdHMrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFNUQVRFX1RSQU5TTEFURUQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX251bWJlck9mUmV2aWV3ZWRUcmFuc1VuaXRzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2FybmluZ3MoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dhcm5pbmdzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHRyYW5zbGF0aW9uIHVuaXRzIGZvdW5kIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbnVtYmVyT2ZUcmFuc1VuaXRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5sYXp5SW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc1VuaXRzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiB0cmFuc2xhdGlvbiB1bml0cyB3aXRob3V0IHRyYW5zbGF0aW9uIGZvdW5kIGluIHRoZSBmaWxlLlxyXG4gICAgICogVGhlc2UgdW5pdHMgaGF2ZSBzdGF0ZSAndHJhbnNsYXRlZCcuXHJcbiAgICAgKi9cclxuICAgIG51bWJlck9mVW50cmFuc2xhdGVkVHJhbnNVbml0cygpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mVW50cmFuc2xhdGVkVHJhbnNVbml0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiB0cmFuc2xhdGlvbiB1bml0cyB3aXRoIHN0YXRlICdmaW5hbCcuXHJcbiAgICAgKi9cclxuICAgIG51bWJlck9mUmV2aWV3ZWRUcmFuc1VuaXRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5sYXp5SW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbnVtYmVyT2ZSZXZpZXdlZFRyYW5zVW5pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgdHJhbnNsYXRpb24gdW5pdHMgd2l0aG91dCB0cmFuc2xhdGlvbiBmb3VuZCBpbiB0aGUgZmlsZS5cclxuICAgICAqIFRoZXNlIHVuaXRzIGhhdmUgc3RhdGUgJ3RyYW5zbGF0ZWQnLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbnVtYmVyT2ZUcmFuc1VuaXRzV2l0aE1pc3NpbmdJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bWJlck9mVHJhbnNVbml0c1dpdGhNaXNzaW5nSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICogQHJldHVybiBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNvdXJjZUxhbmd1YWdlKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0YXJnZXQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcmV0dXJuIHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgdGFyZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9vcCBvdmVyIGFsbCBUcmFuc2xhdGlvbiBVbml0cy5cclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBjYWxsYmFja1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9yRWFjaFRyYW5zVW5pdChjYWxsYmFjazogKCh0cmFuc3VuaXQ6IElUcmFuc1VuaXQpID0+IHZvaWQpKSB7XHJcbiAgICAgICAgdGhpcy5sYXp5SW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuICAgICAgICB0aGlzLnRyYW5zVW5pdHMuZm9yRWFjaCgodHUpID0+IGNhbGxiYWNrKHR1KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdHJhbnMtdW5pdCB3aXRoIGdpdmVuIGlkLlxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKiBAcmV0dXJuIHRyYW5zLXVuaXQgd2l0aCBnaXZlbiBpZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zVW5pdFdpdGhJZChpZDogc3RyaW5nKTogSVRyYW5zVW5pdCB7XHJcbiAgICAgICAgdGhpcy5sYXp5SW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc1VuaXRzLmZpbmQoKHR1KSA9PiB0dS5pZCA9PT0gaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCBmdW5jdGlvbnMgZm9sbG93aW5nIGhlclxyXG4gICAgICovXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0U291cmNlTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSB0YXJnZXQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0VGFyZ2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHByYWVmaXggdXNlZCB3aGVuIGNvcHlpbmcgc291cmNlIHRvIHRhcmdldC5cclxuICAgICAqIFRoaXMgaXMgdXNlZCBieSBpbXBvcnROZXdUcmFuc1VuaXQgYW5kIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcgbWV0aG9kcy5cclxuICAgICAqIChzaW5jZSAxLjguMClcclxuICAgICAqIEBwYXJhbSB0YXJnZXRQcmFlZml4IHRhcmdldFByYWVmaXhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgodGFyZ2V0UHJhZWZpeDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRQcmFlZml4ID0gdGFyZ2V0UHJhZWZpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgcHJhZWZpeCB1c2VkIHdoZW4gY29weWluZyBzb3VyY2UgdG8gdGFyZ2V0LlxyXG4gICAgICogKHNpbmNlIDEuOC4wKVxyXG4gICAgICogQHJldHVybiB0aGUgcHJhZWZpeCB1c2VkIHdoZW4gY29weWluZyBzb3VyY2UgdG8gdGFyZ2V0LlxyXG4gICAgICovXHJcbiAgICBnZXROZXdUcmFuc1VuaXRUYXJnZXRQcmFlZml4KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudGFyZ2V0UHJhZWZpeCkgPyAnJyA6IHRoaXMudGFyZ2V0UHJhZWZpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgc3VmZml4IHVzZWQgd2hlbiBjb3B5aW5nIHNvdXJjZSB0byB0YXJnZXQuXHJcbiAgICAgKiBUaGlzIGlzIHVzZWQgYnkgaW1wb3J0TmV3VHJhbnNVbml0IGFuZCBjcmVhdGVUcmFuc2xhdGlvbkZpbGVGb3JMYW5nIG1ldGhvZHMuXHJcbiAgICAgKiAoc2luY2UgMS44LjApXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0U3VmZml4IHRhcmdldFN1ZmZpeFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KHRhcmdldFN1ZmZpeDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRTdWZmaXggPSB0YXJnZXRTdWZmaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHN1ZmZpeCB1c2VkIHdoZW4gY29weWluZyBzb3VyY2UgdG8gdGFyZ2V0LlxyXG4gICAgICogKHNpbmNlIDEuOC4wKVxyXG4gICAgICogQHJldHVybiB0aGUgc3VmZml4IHVzZWQgd2hlbiBjb3B5aW5nIHNvdXJjZSB0byB0YXJnZXQuXHJcbiAgICAgKi9cclxuICAgIGdldE5ld1RyYW5zVW5pdFRhcmdldFN1ZmZpeCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBpc051bGxPclVuZGVmaW5lZCh0aGlzLnRhcmdldFN1ZmZpeCkgPyAnJyA6IHRoaXMudGFyZ2V0U3VmZml4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbmV3IHRyYW5zLXVuaXQgdG8gdGhpcyBmaWxlLlxyXG4gICAgICogVGhlIHRyYW5zIHVuaXQgc3RlbXMgZnJvbSBhbm90aGVyIGZpbGUuXHJcbiAgICAgKiBJdCBjb3BpZXMgdGhlIHNvdXJjZSBjb250ZW50IG9mIHRoZSB0dSB0byB0aGUgdGFyZ2V0IGNvbnRlbnQgdG9vLFxyXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgaXNEZWZhdWx0TGFuZyBhbmQgY29weUNvbnRlbnQuXHJcbiAgICAgKiBTbyB0aGUgc291cmNlIGNhbiBiZSB1c2VkIGFzIGEgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAodXNlZCBieSB4bGlmZm1lcmdlKVxyXG4gICAgICogQHBhcmFtIGZvcmVpZ25UcmFuc1VuaXQgdGhlIHRyYW5zIHVuaXQgdG8gYmUgaW1wb3J0ZWQuXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICogQHBhcmFtIGltcG9ydEFmdGVyRWxlbWVudCBvcHRpb25hbCAoc2luY2UgMS4xMCkgb3RoZXIgdHJhbnN1bml0IChwYXJ0IG9mIHRoaXMgZmlsZSksIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgYW5jZXN0b3IuXHJcbiAgICAgKiBOZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IGlzIHRoZW4gaW5zZXJ0ZWQgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBlbGVtZW50LlxyXG4gICAgICogSWYgbm90IHNldCBvciBub3QgcGFydCBvZiB0aGlzIGZpbGUsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGVuZC5cclxuICAgICAqIElmIGV4cGxpY2l0eSBzZXQgdG8gbnVsbCwgbmV3IHVuaXQgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgc3RhcnQuXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IChzaW5jZSB2ZXJzaW9uIDEuNy4wKVxyXG4gICAgICogQHRocm93cyBhbiBlcnJvciBpZiB0cmFucy11bml0IHdpdGggc2FtZSBpZCBhbHJlYWR5IGlzIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBpbXBvcnROZXdUcmFuc1VuaXQoZm9yZWlnblRyYW5zVW5pdDogSVRyYW5zVW5pdCwgaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4sIGltcG9ydEFmdGVyRWxlbWVudD86IElUcmFuc1VuaXQpXHJcbiAgICAgICAgOiBJVHJhbnNVbml0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSB0cmFucy11bml0IHdpdGggdGhlIGdpdmVuIGlkLlxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZW1vdmVUcmFuc1VuaXRXaXRoSWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHR1Tm9kZTogTm9kZSA9IHRoaXMuX3BhcnNlZERvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgICAgICBpZiAodHVOb2RlKSB7XHJcbiAgICAgICAgICAgIHR1Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHR1Tm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNVbml0cyA9IHRoaXMudHJhbnNVbml0cy5maWx0ZXIoKHR1KSA9PiB0dS5pZCAhPT0gaWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50TnVtYmVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmaWxlbmFtZSB3aGVyZSB0aGUgZGF0YSBpcyByZWFkIGZyb20uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaWxlbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBlbmNvZGluZyBpZiB0aGUgeG1sIGNvbnRlbnQgKFVURi04LCBJU08tODg1OS0xLCAuLi4pXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmNvZGluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmNvZGluZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB4bWwgY29udGVudCB0byBiZSBzYXZlZCBhZnRlciBjaGFuZ2VzIGFyZSBtYWRlLlxyXG4gICAgICogQHBhcmFtIGJlYXV0aWZ5T3V0cHV0IEZsYWcgd2hldGhlciB0byB1c2UgcHJldHR5LWRhdGEgdG8gZm9ybWF0IHRoZSBvdXRwdXQuXHJcbiAgICAgKiBYTUxTZXJpYWxpemVyIHByb2R1Y2VzIHNvbWUgY29ycmVjdCBidXQgc3RyYW5nZWx5IGZvcm1hdHRlZCBvdXRwdXQsIHdoaWNoIHByZXR0eS1kYXRhIGNhbiBjb3JyZWN0LlxyXG4gICAgICogU2VlIGlzc3VlICM2NCBmb3IgZGV0YWlscy5cclxuICAgICAqIERlZmF1bHQgaXMgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0ZWRDb250ZW50KGJlYXV0aWZ5T3V0cHV0PzogYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uczogWG1sU2VyaWFsaXplck9wdGlvbnMgPSB7fTtcclxuICAgICAgICBpZiAoYmVhdXRpZnlPdXRwdXQgPT09IHRydWUpIHtcclxuICAgICAgICAgICBvcHRpb25zLmJlYXV0aWZ5ID0gdHJ1ZTtcclxuICAgICAgICAgICBvcHRpb25zLmluZGVudFN0cmluZyA9ICcgICc7XHJcbiAgICAgICAgICAgb3B0aW9ucy5taXhlZENvbnRlbnRFbGVtZW50cyA9IHRoaXMuZWxlbWVudHNXaXRoTWl4ZWRDb250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBYbWxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcodGhpcy5fcGFyc2VkRG9jdW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9maWxlRW5kc1dpdGhFT0wpIHtcclxuICAgICAgICAgICAgLy8gYWRkIGVvbCBpZiB0aGVyZSB3YXMgZW9sIGluIG9yaWdpbmFsIHNvdXJjZVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgJ1xcbic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgdHJhbnNsYXRpb24gZmlsZSBmb3IgdGhpcyBmaWxlIGZvciBhIGdpdmVuIGxhbmd1YWdlLlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMganVzdCBhIGNvcHkgb2YgdGhlIG9yaWdpbmFsIG9uZS5cclxuICAgICAqIEJ1dCBmb3IgWE1CIHRoZSB0cmFuc2xhdGlvbiBmaWxlIGhhcyBmb3JtYXQgJ1hUQicuXHJcbiAgICAgKiBAcGFyYW0gbGFuZyBMYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgZXhwZWN0ZWQgZmlsZW5hbWUgdG8gc3RvcmUgZmlsZVxyXG4gICAgICogQHBhcmFtIGlzRGVmYXVsdExhbmcgRmxhZywgd2V0aGVyIGZpbGUgY29udGFpbnMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBUaGVuIHNvdXJjZSBhbmQgdGFyZ2V0IGFyZSBqdXN0IGVxdWFsLlxyXG4gICAgICogVGhlIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQuXHJcbiAgICAgKiBTdGF0ZSB3aWxsIGJlIGZpbmFsLlxyXG4gICAgICogQHBhcmFtIGNvcHlDb250ZW50IEZsYWcsIHdldGhlciB0byBjb3B5IGNvbnRlbnQgb3IgbGVhdmUgaXQgZW1wdHkuXHJcbiAgICAgKiBXYmVuIHRydWUsIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBXaGVuIGZhbHNlLCBjb250ZW50IHdpbGwgYmUgbGVmdCBlbXB0eSAoaWYgaXQgaXMgbm90IHRoZSBkZWZhdWx0IGxhbmd1YWdlKS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyhsYW5nOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlO1xyXG59XHJcbiJdfQ==