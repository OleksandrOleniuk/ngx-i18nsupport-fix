/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { format } from 'util';
import { FORMAT_XLIFF12, FILETYPE_XLIFF12 } from '../api/constants';
import { DOMUtilities } from './dom-utilities';
import { XliffTransUnit } from './xliff-trans-unit';
import { AbstractTranslationMessagesFile } from './abstract-translation-messages-file';
/**
 * Created by martin on 23.02.2017.
 * Ab xliff file read from a source file.
 * Defines some relevant get and set method for reading and modifying such a file.
 */
var /**
 * Created by martin on 23.02.2017.
 * Ab xliff file read from a source file.
 * Defines some relevant get and set method for reading and modifying such a file.
 */
XliffFile = /** @class */ (function (_super) {
    tslib_1.__extends(XliffFile, _super);
    /**
     * Create an xlf-File from source.
     * @param xmlString source read from file.
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return XliffFile
     */
    function XliffFile(xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding);
        return _this;
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    XliffFile.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        /** @type {?} */
        var xliffList = this._parsedDocument.getElementsByTagName('xliff');
        if (xliffList.length !== 1) {
            throw new Error(format('File "%s" seems to be no xliff file (should contain an xliff element)', path));
        }
        else {
            /** @type {?} */
            var version = xliffList.item(0).getAttribute('version');
            /** @type {?} */
            var expectedVersion = '1.2';
            if (version !== expectedVersion) {
                throw new Error(format('File "%s" seems to be no xliff 1.2 file, version should be %s, found %s', path, expectedVersion, version));
            }
        }
        return this;
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     */
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    XliffFile.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XLIFF12;
    };
    /**
     * File type.
     * Here 'XLIFF 1.2'
     */
    /**
     * File type.
     * Here 'XLIFF 1.2'
     * @return {?}
     */
    XliffFile.prototype.fileType = /**
     * File type.
     * Here 'XLIFF 1.2'
     * @return {?}
     */
    function () {
        return FILETYPE_XLIFF12;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    XliffFile.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['source', 'target', 'tool', 'seg-source', 'g', 'ph', 'bpt', 'ept', 'it', 'sub', 'mrk'];
    };
    /**
     * @protected
     * @return {?}
     */
    XliffFile.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('trans-unit');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var transunit = transUnitsInFile.item(i);
            /** @type {?} */
            var id = transunit.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, trans-unit without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new XliffTransUnit(transunit, id, this));
        }
    };
    /**
     * Get source language.
     * @return source language.
     */
    /**
     * Get source language.
     * @return {?} source language.
     */
    XliffFile.prototype.sourceLanguage = /**
     * Get source language.
     * @return {?} source language.
     */
    function () {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            return fileElem.getAttribute('source-language');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the source language.
     * @param language language
     */
    /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    XliffFile.prototype.setSourceLanguage = /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            fileElem.setAttribute('source-language', language);
        }
    };
    /**
     * Get target language.
     * @return target language.
     */
    /**
     * Get target language.
     * @return {?} target language.
     */
    XliffFile.prototype.targetLanguage = /**
     * Get target language.
     * @return {?} target language.
     */
    function () {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            return fileElem.getAttribute('target-language');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the target language.
     * @param language language
     */
    /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    XliffFile.prototype.setTargetLanguage = /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            fileElem.setAttribute('target-language', language);
        }
    };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return the newly imported trans unit (since version 1.7.0)
     * @throws an error if trans-unit with same id already is in the file.
     */
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
    XliffFile.prototype.importNewTransUnit = /**
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
    function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        if (this.transUnitWithId(foreignTransUnit.id)) {
            throw new Error(format('tu with id %s already exists in file, cannot import it', foreignTransUnit.id));
        }
        /** @type {?} */
        var newTu = ((/** @type {?} */ (foreignTransUnit))).cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        /** @type {?} */
        var bodyElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'body');
        if (!bodyElement) {
            throw new Error(format('File "%s" seems to be no xliff 1.2 file (should contain a body element)', this._filename));
        }
        /** @type {?} */
        var inserted = false;
        /** @type {?} */
        var isAfterElementPartOfFile = false;
        if (!!importAfterElement) {
            /** @type {?} */
            var insertionPoint = this.transUnitWithId(importAfterElement.id);
            if (!!insertionPoint) {
                isAfterElementPartOfFile = true;
            }
        }
        if (importAfterElement === undefined || (importAfterElement && !isAfterElementPartOfFile)) {
            bodyElement.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            /** @type {?} */
            var firstUnitElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'trans-unit');
            if (firstUnitElement) {
                DOMUtilities.insertBefore(newTu.asXmlElement(), firstUnitElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to body
                bodyElement.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            /** @type {?} */
            var refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'trans-unit', importAfterElement.id);
            if (refUnitElement) {
                DOMUtilities.insertAfter(newTu.asXmlElement(), refUnitElement);
                inserted = true;
            }
        }
        if (inserted) {
            this.lazyInitializeTransUnits();
            this.transUnits.push(newTu);
            this.countNumbers();
            return newTu;
        }
        else {
            return null;
        }
    };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
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
    XliffFile.prototype.createTranslationFileForLang = /**
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
    function (lang, filename, isDefaultLang, copyContent) {
        /** @type {?} */
        var translationFile = new XliffFile(this.editedContent(), filename, this.encoding());
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.forEachTransUnit((/**
         * @param {?} transUnit
         * @return {?}
         */
        function (transUnit) {
            ((/** @type {?} */ (transUnit))).useSourceAsTarget(isDefaultLang, copyContent);
        }));
        return translationFile;
    };
    return XliffFile;
}(AbstractTranslationMessagesFile));
/**
 * Created by martin on 23.02.2017.
 * Ab xliff file read from a source file.
 * Defines some relevant get and set method for reading and modifying such a file.
 */
export { XliffFile };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwveGxpZmYtZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHNUIsT0FBTyxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7Ozs7OztBQVFyRjs7Ozs7O0lBQStCLHFDQUErQjtJQUUxRDs7Ozs7OztPQU9HO0lBQ0gsbUJBQVksU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFBN0QsWUFDSSxpQkFBTyxTQUlWO1FBSEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLGdDQUFnQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFDMUQsQ0FBQzs7Ozs7Ozs7SUFFTyx5Q0FBcUI7Ozs7Ozs7SUFBN0IsVUFBOEIsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUN2QyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7UUFDcEUsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyx1RUFB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SUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDTixPQUFPLElBQUksQ0FBQztTQUNaO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDSSxnREFBNEI7Ozs7Ozs7Ozs7Ozs7OztJQUFuQyxVQUFvQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxhQUFzQixFQUFFLFdBQW9COztZQUV0RyxlQUFlLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEYsZUFBZSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRSxlQUFlLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxlQUFlLENBQUMsZ0JBQWdCOzs7O1FBQUMsVUFBQyxTQUFxQjtZQUNuRCxDQUFDLG1CQUFvQixTQUFTLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsRixDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUF2TkQsQ0FBK0IsK0JBQStCLEdBdU43RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4uL2FwaS9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge0lUcmFuc1VuaXR9IGZyb20gJy4uL2FwaS9pLXRyYW5zLXVuaXQnO1xyXG5pbXBvcnQge0ZPUk1BVF9YTElGRjEyLCBGSUxFVFlQRV9YTElGRjEyfSBmcm9tICcuLi9hcGkvY29uc3RhbnRzJztcclxuaW1wb3J0IHtET01VdGlsaXRpZXN9IGZyb20gJy4vZG9tLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7WGxpZmZUcmFuc1VuaXR9IGZyb20gJy4veGxpZmYtdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7QWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi9hYnN0cmFjdC10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zVW5pdH0gZnJvbSAnLi9hYnN0cmFjdC10cmFucy11bml0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDIzLjAyLjIwMTcuXHJcbiAqIEFiIHhsaWZmIGZpbGUgcmVhZCBmcm9tIGEgc291cmNlIGZpbGUuXHJcbiAqIERlZmluZXMgc29tZSByZWxldmFudCBnZXQgYW5kIHNldCBtZXRob2QgZm9yIHJlYWRpbmcgYW5kIG1vZGlmeWluZyBzdWNoIGEgZmlsZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgWGxpZmZGaWxlIGV4dGVuZHMgQWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSBpbXBsZW1lbnRzIElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4geGxmLUZpbGUgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBAcGFyYW0geG1sU3RyaW5nIHNvdXJjZSByZWFkIGZyb20gZmlsZS5cclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggdG8gZmlsZVxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIG9wdGlvbmFsIGVuY29kaW5nIG9mIHRoZSB4bWwuXHJcbiAgICAgKiBUaGlzIGlzIHJlYWQgZnJvbSB0aGUgZmlsZSwgYnV0IGlmIHlvdSBrbm93IGl0IGJlZm9yZSwgeW91IGNhbiBhdm9pZCByZWFkaW5nIHRoZSBmaWxlIHR3aWNlLlxyXG4gICAgICogQHJldHVybiBYbGlmZkZpbGVcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeG1sU3RyaW5nOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlRyYW5zVW5pdHNXaXRoTWlzc2luZ0lkID0gMDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVGcm9tQ29udGVudCh4bWxTdHJpbmcsIHBhdGgsIGVuY29kaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVGcm9tQ29udGVudCh4bWxTdHJpbmc6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nKTogWGxpZmZGaWxlIHtcclxuICAgICAgICB0aGlzLnBhcnNlQ29udGVudCh4bWxTdHJpbmcsIHBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICBjb25zdCB4bGlmZkxpc3QgPSB0aGlzLl9wYXJzZWREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgneGxpZmYnKTtcclxuICAgICAgICBpZiAoeGxpZmZMaXN0Lmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdGaWxlIFwiJXNcIiBzZWVtcyB0byBiZSBubyB4bGlmZiBmaWxlIChzaG91bGQgY29udGFpbiBhbiB4bGlmZiBlbGVtZW50KScsIHBhdGgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB2ZXJzaW9uID0geGxpZmZMaXN0Lml0ZW0oMCkuZ2V0QXR0cmlidXRlKCd2ZXJzaW9uJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cGVjdGVkVmVyc2lvbiA9ICcxLjInO1xyXG4gICAgICAgICAgICBpZiAodmVyc2lvbiAhPT0gZXhwZWN0ZWRWZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdGaWxlIFwiJXNcIiBzZWVtcyB0byBiZSBubyB4bGlmZiAxLjIgZmlsZSwgdmVyc2lvbiBzaG91bGQgYmUgJXMsIGZvdW5kICVzJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLCBleHBlY3RlZFZlcnNpb24sIHZlcnNpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgZm9ybWF0IGFzIGl0IGlzIHVzZWQgaW4gY29uZmlnIGZpbGVzLlxyXG4gICAgICogQ3VycmVudGx5ICd4bGYnLCAneG1iJywgJ3htYjInXHJcbiAgICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgY29uc3RhbnRzIEZPUk1BVF8uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaTE4bkZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBGT1JNQVRfWExJRkYxMjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgdHlwZS5cclxuICAgICAqIEhlcmUgJ1hMSUZGIDEuMidcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbGVUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEZJTEVUWVBFX1hMSUZGMTI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGFnIG5hbWVzIG9mIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgbWl4ZWQgY29udGVudC5cclxuICAgICAqIFRoZXNlIGVsZW1lbnRzIHdpbGwgbm90IGJlIGJlYXV0aWZpZWQuXHJcbiAgICAgKiBUeXBpY2FsIGNhbmRpZGF0ZXMgYXJlIHNvdXJjZSBhbmQgdGFyZ2V0LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZWxlbWVudHNXaXRoTWl4ZWRDb250ZW50KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gWydzb3VyY2UnLCAndGFyZ2V0JywgJ3Rvb2wnLCAnc2VnLXNvdXJjZScsICdnJywgJ3BoJywgJ2JwdCcsICdlcHQnLCAnaXQnLCAnc3ViJywgJ21yayddO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplVHJhbnNVbml0cygpIHtcclxuICAgICAgICB0aGlzLnRyYW5zVW5pdHMgPSBbXTtcclxuICAgICAgICBjb25zdCB0cmFuc1VuaXRzSW5GaWxlID0gdGhpcy5fcGFyc2VkRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyYW5zLXVuaXQnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zVW5pdHNJbkZpbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnN1bml0ID0gdHJhbnNVbml0c0luRmlsZS5pdGVtKGkpO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHRyYW5zdW5pdC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdzLnB1c2goZm9ybWF0KCdvb3BzLCB0cmFucy11bml0IHdpdGhvdXQgXCJpZFwiIGZvdW5kIGluIG1hc3RlciwgcGxlYXNlIGNoZWNrIGZpbGUgJXMnLCB0aGlzLl9maWxlbmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNVbml0cy5wdXNoKG5ldyBYbGlmZlRyYW5zVW5pdCh0cmFuc3VuaXQsIGlkLCB0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNvdXJjZSBsYW5ndWFnZS5cclxuICAgICAqIEByZXR1cm4gc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlTGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBmaWxlRWxlbSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fcGFyc2VkRG9jdW1lbnQsICdmaWxlJyk7XHJcbiAgICAgICAgaWYgKGZpbGVFbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWxlRWxlbS5nZXRBdHRyaWJ1dGUoJ3NvdXJjZS1sYW5ndWFnZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVkaXQgdGhlIHNvdXJjZSBsYW5ndWFnZS5cclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U291cmNlTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGZpbGVFbGVtID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ2ZpbGUnKTtcclxuICAgICAgICBpZiAoZmlsZUVsZW0pIHtcclxuICAgICAgICAgICAgZmlsZUVsZW0uc2V0QXR0cmlidXRlKCdzb3VyY2UtbGFuZ3VhZ2UnLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqIEByZXR1cm4gdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBmaWxlRWxlbSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fcGFyc2VkRG9jdW1lbnQsICdmaWxlJyk7XHJcbiAgICAgICAgaWYgKGZpbGVFbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaWxlRWxlbS5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1sYW5ndWFnZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVkaXQgdGhlIHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0VGFyZ2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IGZpbGVFbGVtID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ2ZpbGUnKTtcclxuICAgICAgICBpZiAoZmlsZUVsZW0pIHtcclxuICAgICAgICAgICAgZmlsZUVsZW0uc2V0QXR0cmlidXRlKCd0YXJnZXQtbGFuZ3VhZ2UnLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbmV3IHRyYW5zLXVuaXQgdG8gdGhpcyBmaWxlLlxyXG4gICAgICogVGhlIHRyYW5zIHVuaXQgc3RlbXMgZnJvbSBhbm90aGVyIGZpbGUuXHJcbiAgICAgKiBJdCBjb3BpZXMgdGhlIHNvdXJjZSBjb250ZW50IG9mIHRoZSB0dSB0byB0aGUgdGFyZ2V0IGNvbnRlbnQgdG9vLFxyXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgaXNEZWZhdWx0TGFuZyBhbmQgY29weUNvbnRlbnQuXHJcbiAgICAgKiBTbyB0aGUgc291cmNlIGNhbiBiZSB1c2VkIGFzIGEgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAodXNlZCBieSB4bGlmZm1lcmdlKVxyXG4gICAgICogQHBhcmFtIGZvcmVpZ25UcmFuc1VuaXQgdGhlIHRyYW5zIHVuaXQgdG8gYmUgaW1wb3J0ZWQuXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICogQHBhcmFtIGltcG9ydEFmdGVyRWxlbWVudCBvcHRpb25hbCAoc2luY2UgMS4xMCkgb3RoZXIgdHJhbnN1bml0IChwYXJ0IG9mIHRoaXMgZmlsZSksIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgYW5jZXN0b3IuXHJcbiAgICAgKiBOZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IGlzIHRoZW4gaW5zZXJ0ZWQgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBlbGVtZW50LlxyXG4gICAgICogSWYgbm90IHNldCBvciBub3QgcGFydCBvZiB0aGlzIGZpbGUsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGVuZC5cclxuICAgICAqIElmIGV4cGxpY2l0eSBzZXQgdG8gbnVsbCwgbmV3IHVuaXQgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgc3RhcnQuXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IChzaW5jZSB2ZXJzaW9uIDEuNy4wKVxyXG4gICAgICogQHRocm93cyBhbiBlcnJvciBpZiB0cmFucy11bml0IHdpdGggc2FtZSBpZCBhbHJlYWR5IGlzIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBpbXBvcnROZXdUcmFuc1VuaXQoZm9yZWlnblRyYW5zVW5pdDogSVRyYW5zVW5pdCwgaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4sIGltcG9ydEFmdGVyRWxlbWVudD86IElUcmFuc1VuaXQpXHJcbiAgICAgICAgOiBJVHJhbnNVbml0IHtcclxuICAgICAgICBpZiAodGhpcy50cmFuc1VuaXRXaXRoSWQoZm9yZWlnblRyYW5zVW5pdC5pZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgndHUgd2l0aCBpZCAlcyBhbHJlYWR5IGV4aXN0cyBpbiBmaWxlLCBjYW5ub3QgaW1wb3J0IGl0JywgZm9yZWlnblRyYW5zVW5pdC5pZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXdUdSA9ICg8QWJzdHJhY3RUcmFuc1VuaXQ+IGZvcmVpZ25UcmFuc1VuaXQpLmNsb25lV2l0aFNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmcsIGNvcHlDb250ZW50LCB0aGlzKTtcclxuICAgICAgICBjb25zdCBib2R5RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fcGFyc2VkRG9jdW1lbnQsICdib2R5Jyk7XHJcbiAgICAgICAgaWYgKCFib2R5RWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdGaWxlIFwiJXNcIiBzZWVtcyB0byBiZSBubyB4bGlmZiAxLjIgZmlsZSAoc2hvdWxkIGNvbnRhaW4gYSBib2R5IGVsZW1lbnQpJywgdGhpcy5fZmlsZW5hbWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluc2VydGVkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzQWZ0ZXJFbGVtZW50UGFydE9mRmlsZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghIWltcG9ydEFmdGVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbnNlcnRpb25Qb2ludCA9IHRoaXMudHJhbnNVbml0V2l0aElkKGltcG9ydEFmdGVyRWxlbWVudC5pZCk7XHJcbiAgICAgICAgICAgIGlmICghIWluc2VydGlvblBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICBpc0FmdGVyRWxlbWVudFBhcnRPZkZpbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbXBvcnRBZnRlckVsZW1lbnQgPT09IHVuZGVmaW5lZCB8fCAoaW1wb3J0QWZ0ZXJFbGVtZW50ICYmICFpc0FmdGVyRWxlbWVudFBhcnRPZkZpbGUpKSB7XHJcbiAgICAgICAgICAgIGJvZHlFbGVtZW50LmFwcGVuZENoaWxkKG5ld1R1LmFzWG1sRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0QWZ0ZXJFbGVtZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0VW5pdEVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndHJhbnMtdW5pdCcpO1xyXG4gICAgICAgICAgICBpZiAoZmlyc3RVbml0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgRE9NVXRpbGl0aWVzLmluc2VydEJlZm9yZShuZXdUdS5hc1htbEVsZW1lbnQoKSwgZmlyc3RVbml0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBubyB0cmFucy11bml0LCBlbXB0eSBmaWxlLCBzbyBhZGQgdG8gYm9keVxyXG4gICAgICAgICAgICAgICAgYm9keUVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VHUuYXNYbWxFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcmVmVW5pdEVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0RWxlbWVudEJ5VGFnTmFtZUFuZElkKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndHJhbnMtdW5pdCcsIGltcG9ydEFmdGVyRWxlbWVudC5pZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWZVbml0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgRE9NVXRpbGl0aWVzLmluc2VydEFmdGVyKG5ld1R1LmFzWG1sRWxlbWVudCgpLCByZWZVbml0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluc2VydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNVbml0cy5wdXNoKG5ld1R1KTtcclxuICAgICAgICAgICAgdGhpcy5jb3VudE51bWJlcnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1R1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyB0cmFuc2xhdGlvbiBmaWxlIGZvciB0aGlzIGZpbGUgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2UuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBqdXN0IGEgY29weSBvZiB0aGUgb3JpZ2luYWwgb25lLlxyXG4gICAgICogQnV0IGZvciBYTUIgdGhlIHRyYW5zbGF0aW9uIGZpbGUgaGFzIGZvcm1hdCAnWFRCJy5cclxuICAgICAqIEBwYXJhbSBsYW5nIExhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBleHBlY3RlZCBmaWxlbmFtZSB0byBzdG9yZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyhsYW5nOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSBuZXcgWGxpZmZGaWxlKHRoaXMuZWRpdGVkQ29udGVudCgpLCBmaWxlbmFtZSwgdGhpcy5lbmNvZGluZygpKTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCh0aGlzLnRhcmdldFByYWVmaXgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uRmlsZS5zZXROZXdUcmFuc1VuaXRUYXJnZXRTdWZmaXgodGhpcy50YXJnZXRTdWZmaXgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uRmlsZS5zZXRUYXJnZXRMYW5ndWFnZShsYW5nKTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuZm9yRWFjaFRyYW5zVW5pdCgodHJhbnNVbml0OiBJVHJhbnNVbml0KSA9PiB7XHJcbiAgICAgICAgICAgICg8QWJzdHJhY3RUcmFuc1VuaXQ+IHRyYW5zVW5pdCkudXNlU291cmNlQXNUYXJnZXQoaXNEZWZhdWx0TGFuZywgY29weUNvbnRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbkZpbGU7XHJcbiAgICB9XHJcbn1cclxuIl19