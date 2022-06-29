/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FORMAT_XMB, FILETYPE_XMB, FORMAT_XTB } from '../api/constants';
import { format } from 'util';
import { XmbTransUnit } from './xmb-trans-unit';
import { AbstractTranslationMessagesFile } from './abstract-translation-messages-file';
/**
 * Doctype of xtb translation file corresponding with thos xmb file.
 * @type {?}
 */
export var XTB_DOCTYPE = "<!DOCTYPE translationbundle [\n  <!ELEMENT translationbundle (translation)*>\n  <!ATTLIST translationbundle lang CDATA #REQUIRED>\n  <!ELEMENT translation (#PCDATA|ph)*>\n  <!ATTLIST translation id CDATA #REQUIRED>\n  <!ELEMENT ph EMPTY>\n  <!ATTLIST ph name CDATA #REQUIRED>\n]>";
var XmbFile = /** @class */ (function (_super) {
    tslib_1.__extends(XmbFile, _super);
    /**
     * Create an xmb-File from source.
     * @param _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param xmlString file content
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return XmbFile
     */
    function XmbFile(_translationMessageFileFactory, xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._translationMessageFileFactory = _translationMessageFileFactory;
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
    XmbFile.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('messagebundle').length !== 1) {
            throw new Error(format('File "%s" seems to be no xmb file (should contain a messagebundle element)', path));
        }
        return this;
    };
    /**
     * @protected
     * @return {?}
     */
    XmbFile.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('msg');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var msg = transUnitsInFile.item(i);
            /** @type {?} */
            var id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new XmbTransUnit(msg, id, this));
        }
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
    XmbFile.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XMB;
    };
    /**
     * File type.
     * Here 'XMB'
     */
    /**
     * File type.
     * Here 'XMB'
     * @return {?}
     */
    XmbFile.prototype.fileType = /**
     * File type.
     * Here 'XMB'
     * @return {?}
     */
    function () {
        return FILETYPE_XMB;
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
    XmbFile.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['message'];
    };
    /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @return Language or null
     */
    /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @private
     * @return {?} Language or null
     */
    XmbFile.prototype.guessLanguageFromFilename = /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @private
     * @return {?} Language or null
     */
    function () {
        if (this._filename) {
            /** @type {?} */
            var parts = this._filename.split('.');
            if (parts.length > 2 && parts[parts.length - 1].toLowerCase() === 'xmb') {
                return parts[parts.length - 2];
            }
        }
        return null;
    };
    /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return source language.
     */
    /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} source language.
     */
    XmbFile.prototype.sourceLanguage = /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} source language.
     */
    function () {
        return this.guessLanguageFromFilename();
    };
    /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param language language
     */
    /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    XmbFile.prototype.setSourceLanguage = /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        // do nothing, xmb has no notation for this.
    };
    /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return target language.
     */
    /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} target language.
     */
    XmbFile.prototype.targetLanguage = /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} target language.
     */
    function () {
        return this.guessLanguageFromFilename();
    };
    /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param language language
     */
    /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    XmbFile.prototype.setTargetLanguage = /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        // do nothing, xmb has no notation for this.
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
    XmbFile.prototype.importNewTransUnit = /**
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
        throw Error('xmb file cannot be used to store translations, use xtb file');
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
    XmbFile.prototype.createTranslationFileForLang = /**
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
        var translationbundleXMLSource = '<?xml version="1.0" encoding="UTF-8"?>\n' + XTB_DOCTYPE + '\n<translationbundle>\n</translationbundle>\n';
        /** @type {?} */
        var translationFile = this._translationMessageFileFactory.createFileFromFileContent(FORMAT_XTB, translationbundleXMLSource, filename, this.encoding(), { xmlContent: this.editedContent(), path: this.filename(), encoding: this.encoding() });
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.setNewTransUnitTargetPraefix(this.getNewTransUnitTargetPraefix());
        translationFile.setNewTransUnitTargetSuffix(this.getNewTransUnitTargetSuffix());
        this.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            translationFile.importNewTransUnit(tu, isDefaultLang, copyContent);
        }));
        return translationFile;
    };
    return XmbFile;
}(AbstractTranslationMessagesFile));
export { XmbFile };
if (false) {
    /**
     * @type {?}
     * @private
     */
    XmbFile.prototype._translationMessageFileFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3htYi1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDdEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM1QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0FBVXJGLE1BQU0sS0FBTyxXQUFXLEdBQUcseVJBT3hCO0FBRUg7SUFBNkIsbUNBQStCO0lBRXhEOzs7Ozs7OztPQVFHO0lBQ0gsaUJBQ1ksOEJBQStELEVBQ3ZFLFNBQWlCLEVBQUUsSUFBWSxFQUFFLFFBQWdCO1FBRnJELFlBSUksaUJBQU8sU0FJVjtRQVBXLG9DQUE4QixHQUE5Qiw4QkFBOEIsQ0FBaUM7UUFJdkUsS0FBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsS0FBSSxDQUFDLGdDQUFnQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs7SUFDMUQsQ0FBQzs7Ozs7Ozs7SUFFTyx1Q0FBcUI7Ozs7Ozs7SUFBN0IsVUFBOEIsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFDM0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFB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QW9COztZQUV0RywwQkFBMEIsR0FDNUIsMENBQTBDLEdBQUcsV0FBVyxHQUFHLCtDQUErQzs7WUFDeEcsZUFBZSxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyx5QkFBeUIsQ0FDakYsVUFBVSxFQUNWLDBCQUEwQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ3JELEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUMsQ0FBQztRQUN6RixlQUFlLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxnQkFBZ0I7Ozs7UUFBQyxVQUFDLEVBQUU7WUFDckIsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkUsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLGVBQWUsQ0FBQztJQUMzQixDQUFDO0lBRUwsY0FBQztBQUFELENBQUMsQUFyTEQsQ0FBNkIsK0JBQStCLEdBcUwzRDs7Ozs7OztJQXpLTyxpREFBdUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZUZhY3Rvcnl9IGZyb20gJy4uL2FwaS9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUtZmFjdG9yeSc7XHJcbmltcG9ydCB7SVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuLi9hcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtJVHJhbnNVbml0fSBmcm9tICcuLi9hcGkvaS10cmFucy11bml0JztcclxuaW1wb3J0IHtGT1JNQVRfWE1CLCBGSUxFVFlQRV9YTUIsIEZPUk1BVF9YVEJ9IGZyb20gJy4uL2FwaS9jb25zdGFudHMnO1xyXG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7WG1iVHJhbnNVbml0fSBmcm9tICcuL3htYi10cmFucy11bml0JztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDEwLjAzLjIwMTcuXHJcbiAqIHhtYi1GaWxlIGFjY2Vzcy5cclxuICovXHJcblxyXG4vKipcclxuICogRG9jdHlwZSBvZiB4dGIgdHJhbnNsYXRpb24gZmlsZSBjb3JyZXNwb25kaW5nIHdpdGggdGhvcyB4bWIgZmlsZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBYVEJfRE9DVFlQRSA9IGA8IURPQ1RZUEUgdHJhbnNsYXRpb25idW5kbGUgW1xyXG4gIDwhRUxFTUVOVCB0cmFuc2xhdGlvbmJ1bmRsZSAodHJhbnNsYXRpb24pKj5cclxuICA8IUFUVExJU1QgdHJhbnNsYXRpb25idW5kbGUgbGFuZyBDREFUQSAjUkVRVUlSRUQ+XHJcbiAgPCFFTEVNRU5UIHRyYW5zbGF0aW9uICgjUENEQVRBfHBoKSo+XHJcbiAgPCFBVFRMSVNUIHRyYW5zbGF0aW9uIGlkIENEQVRBICNSRVFVSVJFRD5cclxuICA8IUVMRU1FTlQgcGggRU1QVFk+XHJcbiAgPCFBVFRMSVNUIHBoIG5hbWUgQ0RBVEEgI1JFUVVJUkVEPlxyXG5dPmA7XHJcblxyXG5leHBvcnQgY2xhc3MgWG1iRmlsZSBleHRlbmRzIEFic3RyYWN0VHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUgaW1wbGVtZW50cyBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIHhtYi1GaWxlIGZyb20gc291cmNlLlxyXG4gICAgICogQHBhcmFtIF90cmFuc2xhdGlvbk1lc3NhZ2VGaWxlRmFjdG9yeSBmYWN0b3J5IHRvIGNyZWF0ZSBhIHRyYW5zbGF0aW9uIGZpbGUgKHh0YikgZm9yIHRoZSB4bWIgZmlsZVxyXG4gICAgICogQHBhcmFtIHhtbFN0cmluZyBmaWxlIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggdG8gZmlsZVxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIG9wdGlvbmFsIGVuY29kaW5nIG9mIHRoZSB4bWwuXHJcbiAgICAgKiBUaGlzIGlzIHJlYWQgZnJvbSB0aGUgZmlsZSwgYnV0IGlmIHlvdSBrbm93IGl0IGJlZm9yZSwgeW91IGNhbiBhdm9pZCByZWFkaW5nIHRoZSBmaWxlIHR3aWNlLlxyXG4gICAgICogQHJldHVybiBYbWJGaWxlXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX3RyYW5zbGF0aW9uTWVzc2FnZUZpbGVGYWN0b3J5OiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5LFxyXG4gICAgICAgIHhtbFN0cmluZzogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl93YXJuaW5ncyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX251bWJlck9mVHJhbnNVbml0c1dpdGhNaXNzaW5nSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZUZyb21Db250ZW50KHhtbFN0cmluZywgcGF0aCwgZW5jb2RpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUZyb21Db250ZW50KHhtbFN0cmluZzogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcpOiBYbWJGaWxlIHtcclxuICAgICAgICB0aGlzLnBhcnNlQ29udGVudCh4bWxTdHJpbmcsIHBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICBpZiAodGhpcy5fcGFyc2VkRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ21lc3NhZ2VidW5kbGUnKS5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnRmlsZSBcIiVzXCIgc2VlbXMgdG8gYmUgbm8geG1iIGZpbGUgKHNob3VsZCBjb250YWluIGEgbWVzc2FnZWJ1bmRsZSBlbGVtZW50KScsIHBhdGgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRpYWxpemVUcmFuc1VuaXRzKCkge1xyXG4gICAgICAgIHRoaXMudHJhbnNVbml0cyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zVW5pdHNJbkZpbGUgPSB0aGlzLl9wYXJzZWREb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbXNnJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFuc1VuaXRzSW5GaWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHRyYW5zVW5pdHNJbkZpbGUuaXRlbShpKTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBtc2cuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5ncy5wdXNoKGZvcm1hdCgnb29wcywgbXNnIHdpdGhvdXQgXCJpZFwiIGZvdW5kIGluIG1hc3RlciwgcGxlYXNlIGNoZWNrIGZpbGUgJXMnLCB0aGlzLl9maWxlbmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNVbml0cy5wdXNoKG5ldyBYbWJUcmFuc1VuaXQobXNnLCBpZCwgdGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgZm9ybWF0IGFzIGl0IGlzIHVzZWQgaW4gY29uZmlnIGZpbGVzLlxyXG4gICAgICogQ3VycmVudGx5ICd4bGYnLCAneG1iJywgJ3htYjInXHJcbiAgICAgKiBSZXR1cm5zIG9uZSBvZiB0aGUgY29uc3RhbnRzIEZPUk1BVF8uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaTE4bkZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBGT1JNQVRfWE1CO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsZSB0eXBlLlxyXG4gICAgICogSGVyZSAnWE1CJ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmlsZVR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gRklMRVRZUEVfWE1CO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJuIHRhZyBuYW1lcyBvZiBhbGwgZWxlbWVudHMgdGhhdCBoYXZlIG1peGVkIGNvbnRlbnQuXHJcbiAgICAgKiBUaGVzZSBlbGVtZW50cyB3aWxsIG5vdCBiZSBiZWF1dGlmaWVkLlxyXG4gICAgICogVHlwaWNhbCBjYW5kaWRhdGVzIGFyZSBzb3VyY2UgYW5kIHRhcmdldC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRzV2l0aE1peGVkQ29udGVudCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFsnbWVzc2FnZSddO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR3Vlc3MgbGFuZ3VhZ2UgZnJvbSBmaWxlbmFtZS5cclxuICAgICAqIElmIGZpbGVuYW1lIGlzIGZvby54eS54bWIsIHRoYW4gbGFuZ3VhZ2UgaXMgYXNzdW1lZCB0byBiZSB4eS5cclxuICAgICAqIEByZXR1cm4gTGFuZ3VhZ2Ugb3IgbnVsbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGd1ZXNzTGFuZ3VhZ2VGcm9tRmlsZW5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fZmlsZW5hbWUpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFydHM6IHN0cmluZ1tdID0gdGhpcy5fZmlsZW5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDIgJiYgcGFydHNbcGFydHMubGVuZ3RoIC0gMV0udG9Mb3dlckNhc2UoKSA9PT0gJ3htYicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0c1twYXJ0cy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKiBVbnN1cHBvcnRlZCBpbiB4bWIuXHJcbiAgICAgKiBUcnkgdG8gZ3Vlc3MgaXQgZnJvbSBmaWxlbmFtZSBpZiBhbnkuLlxyXG4gICAgICogQHJldHVybiBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3VyY2VMYW5ndWFnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmd1ZXNzTGFuZ3VhZ2VGcm9tRmlsZW5hbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVkaXQgdGhlIHNvdXJjZSBsYW5ndWFnZS5cclxuICAgICAqIFVuc3VwcG9ydGVkIGluIHhtYi5cclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZSBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U291cmNlTGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmcsIHhtYiBoYXMgbm8gbm90YXRpb24gZm9yIHRoaXMuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICogVW5zdXBwb3J0ZWQgaW4geG1iLlxyXG4gICAgICogVHJ5IHRvIGd1ZXNzIGl0IGZyb20gZmlsZW5hbWUgaWYgYW55Li5cclxuICAgICAqIEByZXR1cm4gdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ndWVzc0xhbmd1YWdlRnJvbUZpbGVuYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSB0YXJnZXQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBVbnN1cHBvcnRlZCBpbiB4bWIuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFRhcmdldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nLCB4bWIgaGFzIG5vIG5vdGF0aW9uIGZvciB0aGlzLlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgbmV3IHRyYW5zLXVuaXQgdG8gdGhpcyBmaWxlLlxyXG4gICAgICogVGhlIHRyYW5zIHVuaXQgc3RlbXMgZnJvbSBhbm90aGVyIGZpbGUuXHJcbiAgICAgKiBJdCBjb3BpZXMgdGhlIHNvdXJjZSBjb250ZW50IG9mIHRoZSB0dSB0byB0aGUgdGFyZ2V0IGNvbnRlbnQgdG9vLFxyXG4gICAgICogZGVwZW5kaW5nIG9uIHRoZSB2YWx1ZXMgb2YgaXNEZWZhdWx0TGFuZyBhbmQgY29weUNvbnRlbnQuXHJcbiAgICAgKiBTbyB0aGUgc291cmNlIGNhbiBiZSB1c2VkIGFzIGEgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAodXNlZCBieSB4bGlmZm1lcmdlKVxyXG4gICAgICogQHBhcmFtIGZvcmVpZ25UcmFuc1VuaXQgdGhlIHRyYW5zIHVuaXQgdG8gYmUgaW1wb3J0ZWQuXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICogQHBhcmFtIGltcG9ydEFmdGVyRWxlbWVudCBvcHRpb25hbCAoc2luY2UgMS4xMCkgb3RoZXIgdHJhbnN1bml0IChwYXJ0IG9mIHRoaXMgZmlsZSksIHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgYW5jZXN0b3IuXHJcbiAgICAgKiBOZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IGlzIHRoZW4gaW5zZXJ0ZWQgZGlyZWN0bHkgYWZ0ZXIgdGhpcyBlbGVtZW50LlxyXG4gICAgICogSWYgbm90IHNldCBvciBub3QgcGFydCBvZiB0aGlzIGZpbGUsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIGVuZC5cclxuICAgICAqIElmIGV4cGxpY2l0eSBzZXQgdG8gbnVsbCwgbmV3IHVuaXQgd2lsbCBiZSBpbXBvcnRlZCBhdCB0aGUgc3RhcnQuXHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXdseSBpbXBvcnRlZCB0cmFucyB1bml0IChzaW5jZSB2ZXJzaW9uIDEuNy4wKVxyXG4gICAgICogQHRocm93cyBhbiBlcnJvciBpZiB0cmFucy11bml0IHdpdGggc2FtZSBpZCBhbHJlYWR5IGlzIGluIHRoZSBmaWxlLlxyXG4gICAgICovXHJcbiAgICBpbXBvcnROZXdUcmFuc1VuaXQoZm9yZWlnblRyYW5zVW5pdDogSVRyYW5zVW5pdCwgaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4sIGltcG9ydEFmdGVyRWxlbWVudD86IElUcmFuc1VuaXQpXHJcbiAgICAgICAgOiBJVHJhbnNVbml0IHtcclxuICAgICAgICB0aHJvdyBFcnJvcigneG1iIGZpbGUgY2Fubm90IGJlIHVzZWQgdG8gc3RvcmUgdHJhbnNsYXRpb25zLCB1c2UgeHRiIGZpbGUnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyB0cmFuc2xhdGlvbiBmaWxlIGZvciB0aGlzIGZpbGUgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2UuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBqdXN0IGEgY29weSBvZiB0aGUgb3JpZ2luYWwgb25lLlxyXG4gICAgICogQnV0IGZvciBYTUIgdGhlIHRyYW5zbGF0aW9uIGZpbGUgaGFzIGZvcm1hdCAnWFRCJy5cclxuICAgICAqIEBwYXJhbSBsYW5nIExhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBleHBlY3RlZCBmaWxlbmFtZSB0byBzdG9yZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyhsYW5nOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbmJ1bmRsZVhNTFNvdXJjZSA9XHJcbiAgICAgICAgICAgICc8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJVVEYtOFwiPz5cXG4nICsgWFRCX0RPQ1RZUEUgKyAnXFxuPHRyYW5zbGF0aW9uYnVuZGxlPlxcbjwvdHJhbnNsYXRpb25idW5kbGU+XFxuJztcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSB0aGlzLl90cmFuc2xhdGlvbk1lc3NhZ2VGaWxlRmFjdG9yeS5jcmVhdGVGaWxlRnJvbUZpbGVDb250ZW50KFxyXG4gICAgICAgICAgICBGT1JNQVRfWFRCLFxyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbmJ1bmRsZVhNTFNvdXJjZSwgZmlsZW5hbWUsIHRoaXMuZW5jb2RpbmcoKSxcclxuICAgICAgICAgICAge3htbENvbnRlbnQ6IHRoaXMuZWRpdGVkQ29udGVudCgpLCBwYXRoOiB0aGlzLmZpbGVuYW1lKCksIGVuY29kaW5nOiB0aGlzLmVuY29kaW5nKCl9KTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCh0aGlzLnRhcmdldFByYWVmaXgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uRmlsZS5zZXROZXdUcmFuc1VuaXRUYXJnZXRTdWZmaXgodGhpcy50YXJnZXRTdWZmaXgpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uRmlsZS5zZXRUYXJnZXRMYW5ndWFnZShsYW5nKTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCh0aGlzLmdldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgoKSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25GaWxlLnNldE5ld1RyYW5zVW5pdFRhcmdldFN1ZmZpeCh0aGlzLmdldE5ld1RyYW5zVW5pdFRhcmdldFN1ZmZpeCgpKTtcclxuICAgICAgICB0aGlzLmZvckVhY2hUcmFuc1VuaXQoKHR1KSA9PiB7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uRmlsZS5pbXBvcnROZXdUcmFuc1VuaXQodHUsIGlzRGVmYXVsdExhbmcsIGNvcHlDb250ZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb25GaWxlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=