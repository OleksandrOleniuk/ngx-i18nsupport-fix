/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { format } from 'util';
import { FORMAT_XLIFF20, FILETYPE_XLIFF20 } from '../api/constants';
import { DOMUtilities } from './dom-utilities';
import { Xliff2TransUnit } from './xliff2-trans-unit';
import { AbstractTranslationMessagesFile } from './abstract-translation-messages-file';
/**
 * Created by martin on 04.05.2017.
 * An XLIFF 2.0 file read from a source file.
 * Format definition is: http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * Defines some relevant get and set method for reading and modifying such a file.
 */
var /**
 * Created by martin on 04.05.2017.
 * An XLIFF 2.0 file read from a source file.
 * Format definition is: http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * Defines some relevant get and set method for reading and modifying such a file.
 */
Xliff2File = /** @class */ (function (_super) {
    tslib_1.__extends(Xliff2File, _super);
    /**
     * Create an XLIFF 2.0-File from source.
     * @param xmlString source read from file.
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return xliff file
     */
    function Xliff2File(xmlString, path, encoding) {
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
    Xliff2File.prototype.initializeFromContent = /**
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
            var expectedVersion = '2.0';
            if (version !== expectedVersion) {
                throw new Error(format('File "%s" seems to be no xliff 2 file, version should be %s, found %s', path, expectedVersion, version));
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
    Xliff2File.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XLIFF20;
    };
    /**
     * File type.
     * Here 'XLIFF 2.0'
     */
    /**
     * File type.
     * Here 'XLIFF 2.0'
     * @return {?}
     */
    Xliff2File.prototype.fileType = /**
     * File type.
     * Here 'XLIFF 2.0'
     * @return {?}
     */
    function () {
        return FILETYPE_XLIFF20;
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
    Xliff2File.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['skeleton', 'note', 'data', 'source', 'target', 'pc', 'mrk'];
    };
    /**
     * @protected
     * @return {?}
     */
    Xliff2File.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('unit');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var transunit = transUnitsInFile.item(i);
            /** @type {?} */
            var id = transunit.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, trans-unit without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new Xliff2TransUnit(transunit, id, this));
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
    Xliff2File.prototype.sourceLanguage = /**
     * Get source language.
     * @return {?} source language.
     */
    function () {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            return xliffElem.getAttribute('srcLang');
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
    Xliff2File.prototype.setSourceLanguage = /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            xliffElem.setAttribute('srcLang', language);
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
    Xliff2File.prototype.targetLanguage = /**
     * Get target language.
     * @return {?} target language.
     */
    function () {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            return xliffElem.getAttribute('trgLang');
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
    Xliff2File.prototype.setTargetLanguage = /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            xliffElem.setAttribute('trgLang', language);
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
    Xliff2File.prototype.importNewTransUnit = /**
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
        var fileElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (!fileElement) {
            throw new Error(format('File "%s" seems to be no xliff 2.0 file (should contain a file element)', this._filename));
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
            fileElement.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            /** @type {?} */
            var firstUnitElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'unit');
            if (firstUnitElement) {
                DOMUtilities.insertBefore(newTu.asXmlElement(), firstUnitElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to first file element
                fileElement.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            /** @type {?} */
            var refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'unit', importAfterElement.id);
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
    Xliff2File.prototype.createTranslationFileForLang = /**
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
        var translationFile = new Xliff2File(this.editedContent(), filename, this.encoding());
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
    return Xliff2File;
}(AbstractTranslationMessagesFile));
/**
 * Created by martin on 04.05.2017.
 * An XLIFF 2.0 file read from a source file.
 * Format definition is: http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * Defines some relevant get and set method for reading and modifying such a file.
 */
export { Xliff2File };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3hsaWZmMi1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUc1QixPQUFPLEVBQUMsY0FBYyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7Ozs7QUFVckY7Ozs7Ozs7O0lBQWdDLHNDQUErQjtJQUUzRDs7Ozs7OztPQU9HO0lBQ0gsb0JBQVksU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFBN0QsWUFDSSxpQkFBTyxTQUlWO1FBSEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLGdDQUFnQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFDMUQsQ0FBQzs7Ozs7Ozs7SUFFTywwQ0FBcUI7Ozs7Ozs7SUFBN0IsVUFBOEIsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUN2QyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7UUFDcEUsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FB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QUFDO1NBQ2hCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDSSxpREFBNEI7Ozs7Ozs7Ozs7Ozs7OztJQUFuQyxVQUFvQyxJQUFZLEVBQUUsUUFBZ0IsRUFBRSxhQUFzQixFQUFFLFdBQW9COztZQUV0RyxlQUFlLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkYsZUFBZSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRSxlQUFlLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxlQUFlLENBQUMsZ0JBQWdCOzs7O1FBQUMsVUFBQyxTQUFxQjtZQUNuRCxDQUFDLG1CQUFvQixTQUFTLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsRixDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUF2TkQsQ0FBZ0MsK0JBQStCLEdBdU45RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4uL2FwaS9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge0lUcmFuc1VuaXR9IGZyb20gJy4uL2FwaS9pLXRyYW5zLXVuaXQnO1xyXG5pbXBvcnQge0ZPUk1BVF9YTElGRjIwLCBGSUxFVFlQRV9YTElGRjIwfSBmcm9tICcuLi9hcGkvY29uc3RhbnRzJztcclxuaW1wb3J0IHtET01VdGlsaXRpZXN9IGZyb20gJy4vZG9tLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7WGxpZmYyVHJhbnNVbml0fSBmcm9tICcuL3hsaWZmMi10cmFucy11bml0JztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge0Fic3RyYWN0VHJhbnNVbml0fSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zLXVuaXQnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDQuMDUuMjAxNy5cclxuICogQW4gWExJRkYgMi4wIGZpbGUgcmVhZCBmcm9tIGEgc291cmNlIGZpbGUuXHJcbiAqIEZvcm1hdCBkZWZpbml0aW9uIGlzOiBodHRwOi8vZG9jcy5vYXNpcy1vcGVuLm9yZy94bGlmZi94bGlmZi1jb3JlL3YyLjAvb3MveGxpZmYtY29yZS12Mi4wLW9zLmh0bWxcclxuICpcclxuICogRGVmaW5lcyBzb21lIHJlbGV2YW50IGdldCBhbmQgc2V0IG1ldGhvZCBmb3IgcmVhZGluZyBhbmQgbW9kaWZ5aW5nIHN1Y2ggYSBmaWxlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBYbGlmZjJGaWxlIGV4dGVuZHMgQWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSBpbXBsZW1lbnRzIElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gWExJRkYgMi4wLUZpbGUgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBAcGFyYW0geG1sU3RyaW5nIHNvdXJjZSByZWFkIGZyb20gZmlsZS5cclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggdG8gZmlsZVxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIG9wdGlvbmFsIGVuY29kaW5nIG9mIHRoZSB4bWwuXHJcbiAgICAgKiBUaGlzIGlzIHJlYWQgZnJvbSB0aGUgZmlsZSwgYnV0IGlmIHlvdSBrbm93IGl0IGJlZm9yZSwgeW91IGNhbiBhdm9pZCByZWFkaW5nIHRoZSBmaWxlIHR3aWNlLlxyXG4gICAgICogQHJldHVybiB4bGlmZiBmaWxlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHhtbFN0cmluZzogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3dhcm5pbmdzID0gW107XHJcbiAgICAgICAgdGhpcy5fbnVtYmVyT2ZUcmFuc1VuaXRzV2l0aE1pc3NpbmdJZCA9IDA7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRnJvbUNvbnRlbnQoeG1sU3RyaW5nLCBwYXRoLCBlbmNvZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRnJvbUNvbnRlbnQoeG1sU3RyaW5nOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyk6IFhsaWZmMkZpbGUge1xyXG4gICAgICAgIHRoaXMucGFyc2VDb250ZW50KHhtbFN0cmluZywgcGF0aCwgZW5jb2RpbmcpO1xyXG4gICAgICAgIGNvbnN0IHhsaWZmTGlzdCA9IHRoaXMuX3BhcnNlZERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd4bGlmZicpO1xyXG4gICAgICAgIGlmICh4bGlmZkxpc3QubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ZpbGUgXCIlc1wiIHNlZW1zIHRvIGJlIG5vIHhsaWZmIGZpbGUgKHNob3VsZCBjb250YWluIGFuIHhsaWZmIGVsZW1lbnQpJywgcGF0aCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZlcnNpb24gPSB4bGlmZkxpc3QuaXRlbSgwKS5nZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nKTtcclxuICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRWZXJzaW9uID0gJzIuMCc7XHJcbiAgICAgICAgICAgIGlmICh2ZXJzaW9uICE9PSBleHBlY3RlZFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ZpbGUgXCIlc1wiIHNlZW1zIHRvIGJlIG5vIHhsaWZmIDIgZmlsZSwgdmVyc2lvbiBzaG91bGQgYmUgJXMsIGZvdW5kICVzJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLCBleHBlY3RlZFZlcnNpb24sIHZlcnNpb24pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgZm9ybWF0IGFzIGl0IGlzIHVzZWQgaW4gY29uZmlnIGZpbGVzLlxyXG4gICAgICogQ3VycmVudGx5ICd4bGYnLCAneG1iJywgJ3htYjInXHJcbiAgICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgY29uc3RhbnRzIEZPUk1BVF8uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaTE4bkZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBGT1JNQVRfWExJRkYyMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgdHlwZS5cclxuICAgICAqIEhlcmUgJ1hMSUZGIDIuMCdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbGVUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEZJTEVUWVBFX1hMSUZGMjA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGFnIG5hbWVzIG9mIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgbWl4ZWQgY29udGVudC5cclxuICAgICAqIFRoZXNlIGVsZW1lbnRzIHdpbGwgbm90IGJlIGJlYXV0aWZpZWQuXHJcbiAgICAgKiBUeXBpY2FsIGNhbmRpZGF0ZXMgYXJlIHNvdXJjZSBhbmQgdGFyZ2V0LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZWxlbWVudHNXaXRoTWl4ZWRDb250ZW50KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gWydza2VsZXRvbicsICdub3RlJywgJ2RhdGEnLCAnc291cmNlJywgJ3RhcmdldCcsICdwYycsICdtcmsnXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZVRyYW5zVW5pdHMoKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc1VuaXRzID0gW107XHJcbiAgICAgICAgY29uc3QgdHJhbnNVbml0c0luRmlsZSA9IHRoaXMuX3BhcnNlZERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bml0Jyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFuc1VuaXRzSW5GaWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zdW5pdCA9IHRyYW5zVW5pdHNJbkZpbGUuaXRlbShpKTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSB0cmFuc3VuaXQuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5ncy5wdXNoKGZvcm1hdCgnb29wcywgdHJhbnMtdW5pdCB3aXRob3V0IFwiaWRcIiBmb3VuZCBpbiBtYXN0ZXIsIHBsZWFzZSBjaGVjayBmaWxlICVzJywgdGhpcy5fZmlsZW5hbWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zVW5pdHMucHVzaChuZXcgWGxpZmYyVHJhbnNVbml0KHRyYW5zdW5pdCwgaWQsIHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICogQHJldHVybiBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3VyY2VMYW5ndWFnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHhsaWZmRWxlbSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fcGFyc2VkRG9jdW1lbnQsICd4bGlmZicpO1xyXG4gICAgICAgIGlmICh4bGlmZkVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHhsaWZmRWxlbS5nZXRBdHRyaWJ1dGUoJ3NyY0xhbmcnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZUxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB4bGlmZkVsZW0gPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAneGxpZmYnKTtcclxuICAgICAgICBpZiAoeGxpZmZFbGVtKSB7XHJcbiAgICAgICAgICAgIHhsaWZmRWxlbS5zZXRBdHRyaWJ1dGUoJ3NyY0xhbmcnLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqIEByZXR1cm4gdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB4bGlmZkVsZW0gPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAneGxpZmYnKTtcclxuICAgICAgICBpZiAoeGxpZmZFbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB4bGlmZkVsZW0uZ2V0QXR0cmlidXRlKCd0cmdMYW5nJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCB0aGUgdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlIGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUYXJnZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgeGxpZmZFbGVtID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ3hsaWZmJyk7XHJcbiAgICAgICAgaWYgKHhsaWZmRWxlbSkge1xyXG4gICAgICAgICAgICB4bGlmZkVsZW0uc2V0QXR0cmlidXRlKCd0cmdMYW5nJywgbGFuZ3VhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5ldyB0cmFucy11bml0IHRvIHRoaXMgZmlsZS5cclxuICAgICAqIFRoZSB0cmFucyB1bml0IHN0ZW1zIGZyb20gYW5vdGhlciBmaWxlLlxyXG4gICAgICogSXQgY29waWVzIHRoZSBzb3VyY2UgY29udGVudCBvZiB0aGUgdHUgdG8gdGhlIHRhcmdldCBjb250ZW50IHRvbyxcclxuICAgICAqIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIGlzRGVmYXVsdExhbmcgYW5kIGNvcHlDb250ZW50LlxyXG4gICAgICogU28gdGhlIHNvdXJjZSBjYW4gYmUgdXNlZCBhcyBhIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogKHVzZWQgYnkgeGxpZmZtZXJnZSlcclxuICAgICAqIEBwYXJhbSBmb3JlaWduVHJhbnNVbml0IHRoZSB0cmFucyB1bml0IHRvIGJlIGltcG9ydGVkLlxyXG4gICAgICogQHBhcmFtIGlzRGVmYXVsdExhbmcgRmxhZywgd2V0aGVyIGZpbGUgY29udGFpbnMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBUaGVuIHNvdXJjZSBhbmQgdGFyZ2V0IGFyZSBqdXN0IGVxdWFsLlxyXG4gICAgICogVGhlIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQuXHJcbiAgICAgKiBTdGF0ZSB3aWxsIGJlIGZpbmFsLlxyXG4gICAgICogQHBhcmFtIGNvcHlDb250ZW50IEZsYWcsIHdldGhlciB0byBjb3B5IGNvbnRlbnQgb3IgbGVhdmUgaXQgZW1wdHkuXHJcbiAgICAgKiBXYmVuIHRydWUsIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBXaGVuIGZhbHNlLCBjb250ZW50IHdpbGwgYmUgbGVmdCBlbXB0eSAoaWYgaXQgaXMgbm90IHRoZSBkZWZhdWx0IGxhbmd1YWdlKS5cclxuICAgICAqIEBwYXJhbSBpbXBvcnRBZnRlckVsZW1lbnQgb3B0aW9uYWwgKHNpbmNlIDEuMTApIG90aGVyIHRyYW5zdW5pdCAocGFydCBvZiB0aGlzIGZpbGUpLCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIGFuY2VzdG9yLlxyXG4gICAgICogTmV3bHkgaW1wb3J0ZWQgdHJhbnMgdW5pdCBpcyB0aGVuIGluc2VydGVkIGRpcmVjdGx5IGFmdGVyIHRoaXMgZWxlbWVudC5cclxuICAgICAqIElmIG5vdCBzZXQgb3Igbm90IHBhcnQgb2YgdGhpcyBmaWxlLCBuZXcgdW5pdCB3aWxsIGJlIGltcG9ydGVkIGF0IHRoZSBlbmQuXHJcbiAgICAgKiBJZiBleHBsaWNpdHkgc2V0IHRvIG51bGwsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIHN0YXJ0LlxyXG4gICAgICogQHJldHVybiB0aGUgbmV3bHkgaW1wb3J0ZWQgdHJhbnMgdW5pdCAoc2luY2UgdmVyc2lvbiAxLjcuMClcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgdHJhbnMtdW5pdCB3aXRoIHNhbWUgaWQgYWxyZWFkeSBpcyBpbiB0aGUgZmlsZS5cclxuICAgICAqL1xyXG4gICAgaW1wb3J0TmV3VHJhbnNVbml0KGZvcmVpZ25UcmFuc1VuaXQ6IElUcmFuc1VuaXQsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuLCBpbXBvcnRBZnRlckVsZW1lbnQ/OiBJVHJhbnNVbml0KVxyXG4gICAgICAgIDogSVRyYW5zVW5pdCB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNVbml0V2l0aElkKGZvcmVpZ25UcmFuc1VuaXQuaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ3R1IHdpdGggaWQgJXMgYWxyZWFkeSBleGlzdHMgaW4gZmlsZSwgY2Fubm90IGltcG9ydCBpdCcsIGZvcmVpZ25UcmFuc1VuaXQuaWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3VHUgPSAoPEFic3RyYWN0VHJhbnNVbml0PiBmb3JlaWduVHJhbnNVbml0KS5jbG9uZVdpdGhTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nLCBjb3B5Q29udGVudCwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgZmlsZUVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAnZmlsZScpO1xyXG4gICAgICAgIGlmICghZmlsZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnRmlsZSBcIiVzXCIgc2VlbXMgdG8gYmUgbm8geGxpZmYgMi4wIGZpbGUgKHNob3VsZCBjb250YWluIGEgZmlsZSBlbGVtZW50KScsIHRoaXMuX2ZpbGVuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbnNlcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc0FmdGVyRWxlbWVudFBhcnRPZkZpbGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoISFpbXBvcnRBZnRlckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5zZXJ0aW9uUG9pbnQgPSB0aGlzLnRyYW5zVW5pdFdpdGhJZChpbXBvcnRBZnRlckVsZW1lbnQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoISFpbnNlcnRpb25Qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgaXNBZnRlckVsZW1lbnRQYXJ0T2ZGaWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW1wb3J0QWZ0ZXJFbGVtZW50ID09PSB1bmRlZmluZWQgfHwgKGltcG9ydEFmdGVyRWxlbWVudCAmJiAhaXNBZnRlckVsZW1lbnRQYXJ0T2ZGaWxlKSkge1xyXG4gICAgICAgICAgICBmaWxlRWxlbWVudC5hcHBlbmRDaGlsZChuZXdUdS5hc1htbEVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgIGluc2VydGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydEFmdGVyRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBmaXJzdFVuaXRFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ3VuaXQnKTtcclxuICAgICAgICAgICAgaWYgKGZpcnN0VW5pdEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIERPTVV0aWxpdGllcy5pbnNlcnRCZWZvcmUobmV3VHUuYXNYbWxFbGVtZW50KCksIGZpcnN0VW5pdEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbm8gdHJhbnMtdW5pdCwgZW1wdHkgZmlsZSwgc28gYWRkIHRvIGZpcnN0IGZpbGUgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgZmlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VHUuYXNYbWxFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgcmVmVW5pdEVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0RWxlbWVudEJ5VGFnTmFtZUFuZElkKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndW5pdCcsIGltcG9ydEFmdGVyRWxlbWVudC5pZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWZVbml0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgRE9NVXRpbGl0aWVzLmluc2VydEFmdGVyKG5ld1R1LmFzWG1sRWxlbWVudCgpLCByZWZVbml0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluc2VydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNVbml0cy5wdXNoKG5ld1R1KTtcclxuICAgICAgICAgICAgdGhpcy5jb3VudE51bWJlcnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1R1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyB0cmFuc2xhdGlvbiBmaWxlIGZvciB0aGlzIGZpbGUgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2UuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBqdXN0IGEgY29weSBvZiB0aGUgb3JpZ2luYWwgb25lLlxyXG4gICAgICogQnV0IGZvciBYTUIgdGhlIHRyYW5zbGF0aW9uIGZpbGUgaGFzIGZvcm1hdCAnWFRCJy5cclxuICAgICAqIEBwYXJhbSBsYW5nIExhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBleHBlY3RlZCBmaWxlbmFtZSB0byBzdG9yZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyhsYW5nOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSBuZXcgWGxpZmYyRmlsZSh0aGlzLmVkaXRlZENvbnRlbnQoKSwgZmlsZW5hbWUsIHRoaXMuZW5jb2RpbmcoKSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25GaWxlLnNldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgodGhpcy50YXJnZXRQcmFlZml4KTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KHRoaXMudGFyZ2V0U3VmZml4KTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0VGFyZ2V0TGFuZ3VhZ2UobGFuZyk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25GaWxlLmZvckVhY2hUcmFuc1VuaXQoKHRyYW5zVW5pdDogSVRyYW5zVW5pdCkgPT4ge1xyXG4gICAgICAgICAgICAoPEFic3RyYWN0VHJhbnNVbml0PiB0cmFuc1VuaXQpLnVzZVNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmcsIGNvcHlDb250ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb25GaWxlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==