/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FORMAT_XTB, FILETYPE_XTB, FORMAT_XMB } from '../api/constants';
import { format } from 'util';
import { DOMUtilities } from './dom-utilities';
import { AbstractTranslationMessagesFile } from './abstract-translation-messages-file';
import { XtbTransUnit } from './xtb-trans-unit';
/**
 * Created by martin on 23.05.2017.
 * xtb-File access.
 * xtb is the translated counterpart to xmb.
 */
var /**
 * Created by martin on 23.05.2017.
 * xtb-File access.
 * xtb is the translated counterpart to xmb.
 */
XtbFile = /** @class */ (function (_super) {
    tslib_1.__extends(XtbFile, _super);
    /**
     * Create an xmb-File from source.
     * @param _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param xmlString file content
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * @return XmbFile
     */
    function XtbFile(_translationMessageFileFactory, xmlString, path, encoding, optionalMaster) {
        var _this = _super.call(this) || this;
        _this._translationMessageFileFactory = _translationMessageFileFactory;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding, optionalMaster);
        return _this;
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @param {?=} optionalMaster
     * @return {?}
     */
    XtbFile.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @param {?=} optionalMaster
     * @return {?}
     */
    function (xmlString, path, encoding, optionalMaster) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('translationbundle').length !== 1) {
            throw new Error(format('File "%s" seems to be no xtb file (should contain a translationbundle element)', path));
        }
        if (optionalMaster) {
            try {
                this._masterFile = this._translationMessageFileFactory.createFileFromFileContent(FORMAT_XMB, optionalMaster.xmlContent, optionalMaster.path, optionalMaster.encoding);
                // check, wether this can be the master ...
                /** @type {?} */
                var numberInMaster = this._masterFile.numberOfTransUnits();
                /** @type {?} */
                var myNumber = this.numberOfTransUnits();
                if (numberInMaster !== myNumber) {
                    this._warnings.push(format('%s trans units found in master, but this file has %s. Check if it is the correct master', numberInMaster, myNumber));
                }
            }
            catch (error) {
                throw new Error(format('File "%s" seems to be no xmb file. An xtb file needs xmb as master file.', optionalMaster.path));
            }
        }
        return this;
    };
    /**
     * @protected
     * @return {?}
     */
    XtbFile.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('translation');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var msg = transUnitsInFile.item(i);
            /** @type {?} */
            var id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            /** @type {?} */
            var masterUnit = null;
            if (this._masterFile) {
                masterUnit = this._masterFile.transUnitWithId(id);
            }
            this.transUnits.push(new XtbTransUnit(msg, id, this, (/** @type {?} */ (masterUnit))));
        }
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     */
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    XtbFile.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XTB;
    };
    /**
     * File type.
     * Here 'XTB'
     */
    /**
     * File type.
     * Here 'XTB'
     * @return {?}
     */
    XtbFile.prototype.fileType = /**
     * File type.
     * Here 'XTB'
     * @return {?}
     */
    function () {
        return FILETYPE_XTB;
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
    XtbFile.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['translation'];
    };
    /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return source language.
     */
    /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return {?} source language.
     */
    XtbFile.prototype.sourceLanguage = /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return {?} source language.
     */
    function () {
        if (this._masterFile) {
            return this._masterFile.sourceLanguage();
        }
        else {
            return null;
        }
    };
    /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param language language
     */
    /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param {?} language language
     * @return {?}
     */
    XtbFile.prototype.setSourceLanguage = /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        // do nothing, xtb has no notation for this.
    };
    /**
     * Get target language.
     * @return target language.
     */
    /**
     * Get target language.
     * @return {?} target language.
     */
    XtbFile.prototype.targetLanguage = /**
     * Get target language.
     * @return {?} target language.
     */
    function () {
        /** @type {?} */
        var translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (translationbundleElem) {
            return translationbundleElem.getAttribute('lang');
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
    XtbFile.prototype.setTargetLanguage = /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (translationbundleElem) {
            translationbundleElem.setAttribute('lang', language);
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
    XtbFile.prototype.importNewTransUnit = /**
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
        var newMasterTu = ((/** @type {?} */ (foreignTransUnit))).cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        /** @type {?} */
        var translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (!translationbundleElem) {
            throw new Error(format('File "%s" seems to be no xtb file (should contain a translationbundle element)', this._filename));
        }
        /** @type {?} */
        var translationElement = translationbundleElem.ownerDocument.createElement('translation');
        translationElement.setAttribute('id', foreignTransUnit.id);
        /** @type {?} */
        var newContent = (copyContent || isDefaultLang) ? foreignTransUnit.sourceContent() : '';
        if (!((/** @type {?} */ (foreignTransUnit))).isICUMessage(newContent)) {
            newContent = this.getNewTransUnitTargetPraefix() + newContent + this.getNewTransUnitTargetSuffix();
        }
        DOMUtilities.replaceContentWithXMLContent(translationElement, newContent);
        /** @type {?} */
        var newTu = new XtbTransUnit(translationElement, foreignTransUnit.id, this, newMasterTu);
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
            translationbundleElem.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            /** @type {?} */
            var firstTranslationElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translation');
            if (firstTranslationElement) {
                DOMUtilities.insertBefore(newTu.asXmlElement(), firstTranslationElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to bundle at end
                translationbundleElem.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            /** @type {?} */
            var refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'translation', importAfterElement.id);
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
    XtbFile.prototype.createTranslationFileForLang = /**
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
        throw new Error(format('File "%s", xtb files are not translatable, they are already translations', filename));
    };
    return XtbFile;
}(AbstractTranslationMessagesFile));
/**
 * Created by martin on 23.05.2017.
 * xtb-File access.
 * xtb is the translated counterpart to xmb.
 */
export { XtbFile };
if (false) {
    /**
     * @type {?}
     * @private
     */
    XtbFile.prototype._masterFile;
    /**
     * @type {?}
     * @private
     */
    XtbFile.prototype._translationMessageFileFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRiLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3h0Yi1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM1QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDckYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUFROUM7Ozs7OztJQUE2QixtQ0FBK0I7SUFNeEQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGlCQUFvQiw4QkFBK0QsRUFDdkUsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0IsRUFDakQsY0FBdUU7UUFGbkYsWUFHSSxpQkFBTyxTQUlWO1FBUG1CLG9DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBaUM7UUFJL0UsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLGdDQUFnQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7O0lBQzFFLENBQUM7Ozs7Ozs7OztJQUVPLHVDQUFxQjs7Ozs7Ozs7SUFBN0IsVUFBOEIsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0IsRUFDakQsY0FBdUU7UUFDakcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIs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Ozs7O0lBQW5DLFVBQW9DLElBQVksRUFBRSxRQUFnQixFQUFFLGFBQXNCLEVBQUUsV0FBb0I7UUFFNUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsMEVBQTBFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUFoUEQsQ0FBNkIsK0JBQStCLEdBZ1AzRDs7Ozs7Ozs7Ozs7O0lBNU9HLDhCQUE4Qzs7Ozs7SUFhbEMsaURBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5fSBmcm9tICcuLi9hcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlLWZhY3RvcnknO1xyXG5pbXBvcnQge0lUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi4vYXBpL2ktdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZSc7XHJcbmltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnLi4vYXBpL2ktdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7Rk9STUFUX1hUQiwgRklMRVRZUEVfWFRCLCBGT1JNQVRfWE1CfSBmcm9tICcuLi9hcGkvY29uc3RhbnRzJztcclxuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge0RPTVV0aWxpdGllc30gZnJvbSAnLi9kb20tdXRpbGl0aWVzJztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge1h0YlRyYW5zVW5pdH0gZnJvbSAnLi94dGItdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7QWJzdHJhY3RUcmFuc1VuaXR9IGZyb20gJy4vYWJzdHJhY3QtdHJhbnMtdW5pdCc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAyMy4wNS4yMDE3LlxyXG4gKiB4dGItRmlsZSBhY2Nlc3MuXHJcbiAqIHh0YiBpcyB0aGUgdHJhbnNsYXRlZCBjb3VudGVycGFydCB0byB4bWIuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFh0YkZpbGUgZXh0ZW5kcyBBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIGltcGxlbWVudHMgSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuXHJcbiAgICAvLyBhdHRhY2hlZCBtYXN0ZXIgZmlsZSwgaWYgYW55XHJcbiAgICAvLyB1c2VkIGFzIHNvdXJjZSB0byBkZXRlcm1pbmUgc3RhdGUgLi4uXHJcbiAgICBwcml2YXRlIF9tYXN0ZXJGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGU7IC8vIGFuIHhtYi1maWxlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4geG1iLUZpbGUgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBAcGFyYW0gX3RyYW5zbGF0aW9uTWVzc2FnZUZpbGVGYWN0b3J5IGZhY3RvcnkgdG8gY3JlYXRlIGEgdHJhbnNsYXRpb24gZmlsZSAoeHRiKSBmb3IgdGhlIHhtYiBmaWxlXHJcbiAgICAgKiBAcGFyYW0geG1sU3RyaW5nIGZpbGUgY29udGVudFxyXG4gICAgICogQHBhcmFtIHBhdGggUGF0aCB0byBmaWxlXHJcbiAgICAgKiBAcGFyYW0gZW5jb2Rpbmcgb3B0aW9uYWwgZW5jb2Rpbmcgb2YgdGhlIHhtbC5cclxuICAgICAqIFRoaXMgaXMgcmVhZCBmcm9tIHRoZSBmaWxlLCBidXQgaWYgeW91IGtub3cgaXQgYmVmb3JlLCB5b3UgY2FuIGF2b2lkIHJlYWRpbmcgdGhlIGZpbGUgdHdpY2UuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxNYXN0ZXIgaW4gY2FzZSBvZiB4bWIgdGhlIG1hc3RlciBmaWxlLCB0aGF0IGNvbnRhaW5zIHRoZSBvcmlnaW5hbCB0ZXh0cy5cclxuICAgICAqICh0aGlzIGlzIHVzZWQgdG8gc3VwcG9ydCBzdGF0ZSBpbmZvcywgdGhhdCBhcmUgYmFzZWQgb24gY29tcGFyaW5nIG9yaWdpbmFsIHdpdGggdHJhbnNsYXRlZCB2ZXJzaW9uKVxyXG4gICAgICogQHJldHVybiBYbWJGaWxlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3RyYW5zbGF0aW9uTWVzc2FnZUZpbGVGYWN0b3J5OiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgeG1sU3RyaW5nOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyPzogeyB4bWxDb250ZW50OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyB9KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mVHJhbnNVbml0c1dpdGhNaXNzaW5nSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUZyb21Db250ZW50KHhtbFN0cmluZywgcGF0aCwgZW5jb2RpbmcsIG9wdGlvbmFsTWFzdGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVGcm9tQ29udGVudCh4bWxTdHJpbmc6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxNYXN0ZXI/OiB7IHhtbENvbnRlbnQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nIH0pOiBYdGJGaWxlIHtcclxuICAgICAgICB0aGlzLnBhcnNlQ29udGVudCh4bWxTdHJpbmcsIHBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICBpZiAodGhpcy5fcGFyc2VkRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyYW5zbGF0aW9uYnVuZGxlJykubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ZpbGUgXCIlc1wiIHNlZW1zIHRvIGJlIG5vIHh0YiBmaWxlIChzaG91bGQgY29udGFpbiBhIHRyYW5zbGF0aW9uYnVuZGxlIGVsZW1lbnQpJywgcGF0aCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uYWxNYXN0ZXIpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21hc3RlckZpbGUgPSB0aGlzLl90cmFuc2xhdGlvbk1lc3NhZ2VGaWxlRmFjdG9yeS5jcmVhdGVGaWxlRnJvbUZpbGVDb250ZW50KFxyXG4gICAgICAgICAgICAgICAgICAgIEZPUk1BVF9YTUIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxNYXN0ZXIueG1sQ29udGVudCxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbE1hc3Rlci5wYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyLmVuY29kaW5nKTtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrLCB3ZXRoZXIgdGhpcyBjYW4gYmUgdGhlIG1hc3RlciAuLi5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlckluTWFzdGVyID0gdGhpcy5fbWFzdGVyRmlsZS5udW1iZXJPZlRyYW5zVW5pdHMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG15TnVtYmVyID0gdGhpcy5udW1iZXJPZlRyYW5zVW5pdHMoKTtcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJJbk1hc3RlciAhPT0gbXlOdW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5ncy5wdXNoKGZvcm1hdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyVzIHRyYW5zIHVuaXRzIGZvdW5kIGluIG1hc3RlciwgYnV0IHRoaXMgZmlsZSBoYXMgJXMuIENoZWNrIGlmIGl0IGlzIHRoZSBjb3JyZWN0IG1hc3RlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlckluTWFzdGVyLCBteU51bWJlcikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnRmlsZSBcIiVzXCIgc2VlbXMgdG8gYmUgbm8geG1iIGZpbGUuIEFuIHh0YiBmaWxlIG5lZWRzIHhtYiBhcyBtYXN0ZXIgZmlsZS4nLCBvcHRpb25hbE1hc3Rlci5wYXRoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVUcmFuc1VuaXRzKCkge1xyXG4gICAgICAgIHRoaXMudHJhbnNVbml0cyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zVW5pdHNJbkZpbGUgPSB0aGlzLl9wYXJzZWREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndHJhbnNsYXRpb24nKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zVW5pdHNJbkZpbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gdHJhbnNVbml0c0luRmlsZS5pdGVtKGkpO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IG1zZy5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dhcm5pbmdzLnB1c2goZm9ybWF0KCdvb3BzLCBtc2cgd2l0aG91dCBcImlkXCIgZm91bmQgaW4gbWFzdGVyLCBwbGVhc2UgY2hlY2sgZmlsZSAlcycsIHRoaXMuX2ZpbGVuYW1lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1hc3RlclVuaXQ6IElUcmFuc1VuaXQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFzdGVyRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgbWFzdGVyVW5pdCA9IHRoaXMuX21hc3RlckZpbGUudHJhbnNVbml0V2l0aElkKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zVW5pdHMucHVzaChuZXcgWHRiVHJhbnNVbml0KG1zZywgaWQsIHRoaXMsIDxBYnN0cmFjdFRyYW5zVW5pdD4gbWFzdGVyVW5pdCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgZm9ybWF0IGFzIGl0IGlzIHVzZWQgaW4gY29uZmlnIGZpbGVzLlxyXG4gICAgICogQ3VycmVudGx5ICd4bGYnLCAneGxmMicsICd4bWInLCAneHRiJ1xyXG4gICAgICogUmV0dXJucyBvbmUgb2YgdGhlIGNvbnN0YW50cyBGT1JNQVRfLi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGkxOG5Gb3JtYXQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gRk9STUFUX1hUQjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgdHlwZS5cclxuICAgICAqIEhlcmUgJ1hUQidcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbGVUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEZJTEVUWVBFX1hUQjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0YWcgbmFtZXMgb2YgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSBtaXhlZCBjb250ZW50LlxyXG4gICAgICogVGhlc2UgZWxlbWVudHMgd2lsbCBub3QgYmUgYmVhdXRpZmllZC5cclxuICAgICAqIFR5cGljYWwgY2FuZGlkYXRlcyBhcmUgc291cmNlIGFuZCB0YXJnZXQuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBlbGVtZW50c1dpdGhNaXhlZENvbnRlbnQoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbJ3RyYW5zbGF0aW9uJ107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICogVW5zdXBwb3J0ZWQgaW4geG1iL3h0Yi5cclxuICAgICAqIFRyeSB0byBndWVzcyBpdCBmcm9tIG1hc3RlciBmaWxlbmFtZSBpZiBhbnkuLlxyXG4gICAgICogQHJldHVybiBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3VyY2VMYW5ndWFnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9tYXN0ZXJGaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXN0ZXJGaWxlLnNvdXJjZUxhbmd1YWdlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCB0aGUgc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICogVW5zdXBwb3J0ZWQgaW4geG1iL3h0Yi5cclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U291cmNlTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmcsIHh0YiBoYXMgbm8gbm90YXRpb24gZm9yIHRoaXMuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICogQHJldHVybiB0YXJnZXQgbGFuZ3VhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0YXJnZXRMYW5ndWFnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uYnVuZGxlRWxlbSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fcGFyc2VkRG9jdW1lbnQsICd0cmFuc2xhdGlvbmJ1bmRsZScpO1xyXG4gICAgICAgIGlmICh0cmFuc2xhdGlvbmJ1bmRsZUVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uYnVuZGxlRWxlbS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSB0YXJnZXQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRhcmdldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0gPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndHJhbnNsYXRpb25idW5kbGUnKTtcclxuICAgICAgICBpZiAodHJhbnNsYXRpb25idW5kbGVFbGVtKSB7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uYnVuZGxlRWxlbS5zZXRBdHRyaWJ1dGUoJ2xhbmcnLCBsYW5ndWFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbmV3IHRyYW5zLXVuaXQgdG8gdGhpcyBmaWxlLlxyXG4gICAgICogVGhlIHRyYW5zIHVuaXQgc3RlbXMgZnJvbSBhbm90aGVyIGZpbGUuXHJcbiAgICAgKiBJdCBjb3BpZXMgdGhlIHNvdXJjZSBjb250ZW50IG9mIHRoZSB0dSB0byB0aGUgdGFyZ2V0IGNvbnRlbnQgdG9vLFxyXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgaXNEZWZhdWx0TGFuZyBhbmQgY29weUNvbnRlbnQuXHJcbiAgICAgKiBTbyB0aGUgc291cmNlIGNhbiBiZSB1c2VkIGFzIGEgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAodXNlZCBieSB4bGlmZm1lcmdlKVxyXG4gICAgICogQHBhcmFtIGZvcmVpZ25UcmFuc1VuaXQgdGhlIHRyYW5zIHVuaXQgdG8gYmUgaW1wb3J0ZWQuXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICogQHBhcmFtIGltcG9ydEFmdGVyRWxlbWVudCBvcHRpb25hbCAoc2luY2UgMS4xMCkgb3RoZXIgdHJhbnN1bml0IChwYXJ0IG9mIHRoaXMgZmlsZSksIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgYW5jZXN0b3IuXHJcbiAgICAgKiBOZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IGlzIHRoZW4gaW5zZXJ0ZWQgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBlbGVtZW50LlxyXG4gICAgICogSWYgbm90IHNldCBvciBub3QgcGFydCBvZiB0aGlzIGZpbGUsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGVuZC5cclxuICAgICAqIElmIGV4cGxpY2l0eSBzZXQgdG8gbnVsbCwgbmV3IHVuaXQgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgc3RhcnQuXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IChzaW5jZSB2ZXJzaW9uIDEuNy4wKVxyXG4gICAgICogQHRocm93cyBhbiBlcnJvciBpZiB0cmFucy11bml0IHdpdGggc2FtZSBpZCBhbHJlYWR5IGlzIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBpbXBvcnROZXdUcmFuc1VuaXQoZm9yZWlnblRyYW5zVW5pdDogSVRyYW5zVW5pdCwgaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4sIGltcG9ydEFmdGVyRWxlbWVudD86IElUcmFuc1VuaXQpXHJcbiAgICAgICAgOiBJVHJhbnNVbml0IHtcclxuICAgICAgICBpZiAodGhpcy50cmFuc1VuaXRXaXRoSWQoZm9yZWlnblRyYW5zVW5pdC5pZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgndHUgd2l0aCBpZCAlcyBhbHJlYWR5IGV4aXN0cyBpbiBmaWxlLCBjYW5ub3QgaW1wb3J0IGl0JywgZm9yZWlnblRyYW5zVW5pdC5pZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBuZXdNYXN0ZXJUdSA9ICg8QWJzdHJhY3RUcmFuc1VuaXQ+IGZvcmVpZ25UcmFuc1VuaXQpLmNsb25lV2l0aFNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmcsIGNvcHlDb250ZW50LCB0aGlzKTtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0gPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndHJhbnNsYXRpb25idW5kbGUnKTtcclxuICAgICAgICBpZiAoIXRyYW5zbGF0aW9uYnVuZGxlRWxlbSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdGaWxlIFwiJXNcIiBzZWVtcyB0byBiZSBubyB4dGIgZmlsZSAoc2hvdWxkIGNvbnRhaW4gYSB0cmFuc2xhdGlvbmJ1bmRsZSBlbGVtZW50KScsIHRoaXMuX2ZpbGVuYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uRWxlbWVudCA9IHRyYW5zbGF0aW9uYnVuZGxlRWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyYW5zbGF0aW9uJyk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBmb3JlaWduVHJhbnNVbml0LmlkKTtcclxuICAgICAgICBsZXQgbmV3Q29udGVudCA9IChjb3B5Q29udGVudCB8fCBpc0RlZmF1bHRMYW5nKSA/IGZvcmVpZ25UcmFuc1VuaXQuc291cmNlQ29udGVudCgpIDogJyc7XHJcbiAgICAgICAgaWYgKCEoPEFic3RyYWN0VHJhbnNVbml0PiBmb3JlaWduVHJhbnNVbml0KS5pc0lDVU1lc3NhZ2UobmV3Q29udGVudCkpIHtcclxuICAgICAgICAgICAgbmV3Q29udGVudCA9IHRoaXMuZ2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCgpICsgbmV3Q29udGVudCArIHRoaXMuZ2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KHRyYW5zbGF0aW9uRWxlbWVudCwgbmV3Q29udGVudCk7XHJcbiAgICAgICAgY29uc3QgbmV3VHUgPSBuZXcgWHRiVHJhbnNVbml0KHRyYW5zbGF0aW9uRWxlbWVudCwgZm9yZWlnblRyYW5zVW5pdC5pZCwgdGhpcywgbmV3TWFzdGVyVHUpO1xyXG4gICAgICAgIGxldCBpbnNlcnRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc0FmdGVyRWxlbWVudFBhcnRPZkZpbGUgPSBmYWxzZTtcclxuICAgICAgICBpZiAoISFpbXBvcnRBZnRlckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5zZXJ0aW9uUG9pbnQgPSB0aGlzLnRyYW5zVW5pdFdpdGhJZChpbXBvcnRBZnRlckVsZW1lbnQuaWQpO1xyXG4gICAgICAgICAgICBpZiAoISFpbnNlcnRpb25Qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgaXNBZnRlckVsZW1lbnRQYXJ0T2ZGaWxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW1wb3J0QWZ0ZXJFbGVtZW50ID09PSB1bmRlZmluZWQgfHwgKGltcG9ydEFmdGVyRWxlbWVudCAmJiAhaXNBZnRlckVsZW1lbnRQYXJ0T2ZGaWxlKSkge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0uYXBwZW5kQ2hpbGQobmV3VHUuYXNYbWxFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbXBvcnRBZnRlckVsZW1lbnQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RUcmFuc2xhdGlvbkVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndHJhbnNsYXRpb24nKTtcclxuICAgICAgICAgICAgaWYgKGZpcnN0VHJhbnNsYXRpb25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBET01VdGlsaXRpZXMuaW5zZXJ0QmVmb3JlKG5ld1R1LmFzWG1sRWxlbWVudCgpLCBmaXJzdFRyYW5zbGF0aW9uRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBubyB0cmFucy11bml0LCBlbXB0eSBmaWxlLCBzbyBhZGQgdG8gYnVuZGxlIGF0IGVuZFxyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRpb25idW5kbGVFbGVtLmFwcGVuZENoaWxkKG5ld1R1LmFzWG1sRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgICAgIGluc2VydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZlVuaXRFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEVsZW1lbnRCeVRhZ05hbWVBbmRJZCh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ3RyYW5zbGF0aW9uJywgaW1wb3J0QWZ0ZXJFbGVtZW50LmlkKTtcclxuICAgICAgICAgICAgaWYgKHJlZlVuaXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBET01VdGlsaXRpZXMuaW5zZXJ0QWZ0ZXIobmV3VHUuYXNYbWxFbGVtZW50KCksIHJlZlVuaXRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGluc2VydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5zZXJ0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXp5SW5pdGlhbGl6ZVRyYW5zVW5pdHMoKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc1VuaXRzLnB1c2gobmV3VHUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50TnVtYmVycygpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VHU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IHRyYW5zbGF0aW9uIGZpbGUgZm9yIHRoaXMgZmlsZSBmb3IgYSBnaXZlbiBsYW5ndWFnZS5cclxuICAgICAqIE5vcm1hbGx5LCB0aGlzIGlzIGp1c3QgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBvbmUuXHJcbiAgICAgKiBCdXQgZm9yIFhNQiB0aGUgdHJhbnNsYXRpb24gZmlsZSBoYXMgZm9ybWF0ICdYVEInLlxyXG4gICAgICogQHBhcmFtIGxhbmcgTGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIGV4cGVjdGVkIGZpbGVuYW1lIHRvIHN0b3JlIGZpbGVcclxuICAgICAqIEBwYXJhbSBpc0RlZmF1bHRMYW5nIEZsYWcsIHdldGhlciBmaWxlIGNvbnRhaW5zIHRoZSBkZWZhdWx0IGxhbmd1YWdlLlxyXG4gICAgICogVGhlbiBzb3VyY2UgYW5kIHRhcmdldCBhcmUganVzdCBlcXVhbC5cclxuICAgICAqIFRoZSBjb250ZW50IHdpbGwgYmUgY29waWVkLlxyXG4gICAgICogU3RhdGUgd2lsbCBiZSBmaW5hbC5cclxuICAgICAqIEBwYXJhbSBjb3B5Q29udGVudCBGbGFnLCB3ZXRoZXIgdG8gY29weSBjb250ZW50IG9yIGxlYXZlIGl0IGVtcHR5LlxyXG4gICAgICogV2JlbiB0cnVlLCBjb250ZW50IHdpbGwgYmUgY29waWVkIGZyb20gc291cmNlLlxyXG4gICAgICogV2hlbiBmYWxzZSwgY29udGVudCB3aWxsIGJlIGxlZnQgZW1wdHkgKGlmIGl0IGlzIG5vdCB0aGUgZGVmYXVsdCBsYW5ndWFnZSkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVUcmFuc2xhdGlvbkZpbGVGb3JMYW5nKGxhbmc6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZywgaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4pXHJcbiAgICAgICAgOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ZpbGUgXCIlc1wiLCB4dGIgZmlsZXMgYXJlIG5vdCB0cmFuc2xhdGFibGUsIHRoZXkgYXJlIGFscmVhZHkgdHJhbnNsYXRpb25zJywgZmlsZW5hbWUpKTtcclxuICAgIH1cclxufVxyXG4iXX0=