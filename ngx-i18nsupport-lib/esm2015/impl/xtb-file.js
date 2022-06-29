/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class XtbFile extends AbstractTranslationMessagesFile {
    // an xmb-file
    /**
     * Create an xmb-File from source.
     * @param {?} _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param {?} xmlString file content
     * @param {?} path Path to file
     * @param {?} encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     */
    constructor(_translationMessageFileFactory, xmlString, path, encoding, optionalMaster) {
        super();
        this._translationMessageFileFactory = _translationMessageFileFactory;
        this._warnings = [];
        this._numberOfTransUnitsWithMissingId = 0;
        this.initializeFromContent(xmlString, path, encoding, optionalMaster);
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @param {?=} optionalMaster
     * @return {?}
     */
    initializeFromContent(xmlString, path, encoding, optionalMaster) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('translationbundle').length !== 1) {
            throw new Error(format('File "%s" seems to be no xtb file (should contain a translationbundle element)', path));
        }
        if (optionalMaster) {
            try {
                this._masterFile = this._translationMessageFileFactory.createFileFromFileContent(FORMAT_XMB, optionalMaster.xmlContent, optionalMaster.path, optionalMaster.encoding);
                // check, wether this can be the master ...
                /** @type {?} */
                const numberInMaster = this._masterFile.numberOfTransUnits();
                /** @type {?} */
                const myNumber = this.numberOfTransUnits();
                if (numberInMaster !== myNumber) {
                    this._warnings.push(format('%s trans units found in master, but this file has %s. Check if it is the correct master', numberInMaster, myNumber));
                }
            }
            catch (error) {
                throw new Error(format('File "%s" seems to be no xmb file. An xtb file needs xmb as master file.', optionalMaster.path));
            }
        }
        return this;
    }
    /**
     * @protected
     * @return {?}
     */
    initializeTransUnits() {
        this.transUnits = [];
        /** @type {?} */
        const transUnitsInFile = this._parsedDocument.getElementsByTagName('translation');
        for (let i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            const msg = transUnitsInFile.item(i);
            /** @type {?} */
            const id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            /** @type {?} */
            let masterUnit = null;
            if (this._masterFile) {
                masterUnit = this._masterFile.transUnitWithId(id);
            }
            this.transUnits.push(new XtbTransUnit(msg, id, this, (/** @type {?} */ (masterUnit))));
        }
    }
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    i18nFormat() {
        return FORMAT_XTB;
    }
    /**
     * File type.
     * Here 'XTB'
     * @return {?}
     */
    fileType() {
        return FILETYPE_XTB;
    }
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    elementsWithMixedContent() {
        return ['translation'];
    }
    /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return {?} source language.
     */
    sourceLanguage() {
        if (this._masterFile) {
            return this._masterFile.sourceLanguage();
        }
        else {
            return null;
        }
    }
    /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param {?} language language
     * @return {?}
     */
    setSourceLanguage(language) {
        // do nothing, xtb has no notation for this.
    }
    /**
     * Get target language.
     * @return {?} target language.
     */
    targetLanguage() {
        /** @type {?} */
        const translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (translationbundleElem) {
            return translationbundleElem.getAttribute('lang');
        }
        else {
            return null;
        }
    }
    /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    setTargetLanguage(language) {
        /** @type {?} */
        const translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (translationbundleElem) {
            translationbundleElem.setAttribute('lang', language);
        }
    }
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
    importNewTransUnit(foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        if (this.transUnitWithId(foreignTransUnit.id)) {
            throw new Error(format('tu with id %s already exists in file, cannot import it', foreignTransUnit.id));
        }
        /** @type {?} */
        const newMasterTu = ((/** @type {?} */ (foreignTransUnit))).cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        /** @type {?} */
        const translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (!translationbundleElem) {
            throw new Error(format('File "%s" seems to be no xtb file (should contain a translationbundle element)', this._filename));
        }
        /** @type {?} */
        const translationElement = translationbundleElem.ownerDocument.createElement('translation');
        translationElement.setAttribute('id', foreignTransUnit.id);
        /** @type {?} */
        let newContent = (copyContent || isDefaultLang) ? foreignTransUnit.sourceContent() : '';
        if (!((/** @type {?} */ (foreignTransUnit))).isICUMessage(newContent)) {
            newContent = this.getNewTransUnitTargetPraefix() + newContent + this.getNewTransUnitTargetSuffix();
        }
        DOMUtilities.replaceContentWithXMLContent(translationElement, newContent);
        /** @type {?} */
        const newTu = new XtbTransUnit(translationElement, foreignTransUnit.id, this, newMasterTu);
        /** @type {?} */
        let inserted = false;
        /** @type {?} */
        let isAfterElementPartOfFile = false;
        if (!!importAfterElement) {
            /** @type {?} */
            const insertionPoint = this.transUnitWithId(importAfterElement.id);
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
            const firstTranslationElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translation');
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
            const refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'translation', importAfterElement.id);
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
    }
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
    createTranslationFileForLang(lang, filename, isDefaultLang, copyContent) {
        throw new Error(format('File "%s", xtb files are not translatable, they are already translations', filename));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRiLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3h0Yi1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7OztBQVE5QyxNQUFNLE9BQU8sT0FBUSxTQUFRLCtCQUErQjs7Ozs7Ozs7Ozs7O0lBaUJ4RCxZQUFvQiw4QkFBK0QsRUFDdkUsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0IsRUFDakQsY0FBdUU7UUFDL0UsS0FBSyxFQUFFLENBQUM7UUFIUSxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWlDO1FBSS9FLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7Ozs7Ozs7OztJQUVPLHFCQUFxQixDQUFDLFNBQWlCLEVBQUUsSUFBWSxFQUFFLFFBQWdCLEVBQ2pELGNBQXVFO1FBQ2pHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEtB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QUUsdUJBQXVCLENBQUMsQ0FBQztnQkFDekUsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNuQjtpQkFBTTtnQkFDSCxxREFBcUQ7Z0JBQ3JELHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztnQkFDeEQsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNuQjtTQUNKO2FBQU07O2tCQUNHLGNBQWMsR0FBRyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxDQUFDO1lBQ3hILElBQUksY0FBYyxFQUFFO2dCQUNoQixZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDL0QsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNuQjtTQUNKO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JNLDRCQUE0QixDQUFDLElBQVksRUFBRSxRQUFnQixFQUFFLGFBQXNCLEVBQUUsV0FBb0I7UUFFNUcsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsMEVBQTBFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsSCxDQUFDO0NBQ0o7Ozs7OztJQTVPRyw4QkFBOEM7Ozs7O0lBYWxDLGlEQUF1RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlRmFjdG9yeX0gZnJvbSAnLi4vYXBpL2ktdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS1mYWN0b3J5JztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4uL2FwaS9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge0lUcmFuc1VuaXR9IGZyb20gJy4uL2FwaS9pLXRyYW5zLXVuaXQnO1xyXG5pbXBvcnQge0ZPUk1BVF9YVEIsIEZJTEVUWVBFX1hUQiwgRk9STUFUX1hNQn0gZnJvbSAnLi4vYXBpL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtET01VdGlsaXRpZXN9IGZyb20gJy4vZG9tLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7QWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi9hYnN0cmFjdC10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtYdGJUcmFuc1VuaXR9IGZyb20gJy4veHRiLXRyYW5zLXVuaXQnO1xyXG5pbXBvcnQge0Fic3RyYWN0VHJhbnNVbml0fSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zLXVuaXQnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMjMuMDUuMjAxNy5cclxuICogeHRiLUZpbGUgYWNjZXNzLlxyXG4gKiB4dGIgaXMgdGhlIHRyYW5zbGF0ZWQgY291bnRlcnBhcnQgdG8geG1iLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBYdGJGaWxlIGV4dGVuZHMgQWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSBpbXBsZW1lbnRzIElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcblxyXG4gICAgLy8gYXR0YWNoZWQgbWFzdGVyIGZpbGUsIGlmIGFueVxyXG4gICAgLy8gdXNlZCBhcyBzb3VyY2UgdG8gZGV0ZXJtaW5lIHN0YXRlIC4uLlxyXG4gICAgcHJpdmF0ZSBfbWFzdGVyRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlOyAvLyBhbiB4bWItZmlsZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuIHhtYi1GaWxlIGZyb20gc291cmNlLlxyXG4gICAgICogQHBhcmFtIF90cmFuc2xhdGlvbk1lc3NhZ2VGaWxlRmFjdG9yeSBmYWN0b3J5IHRvIGNyZWF0ZSBhIHRyYW5zbGF0aW9uIGZpbGUgKHh0YikgZm9yIHRoZSB4bWIgZmlsZVxyXG4gICAgICogQHBhcmFtIHhtbFN0cmluZyBmaWxlIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBwYXRoIFBhdGggdG8gZmlsZVxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIG9wdGlvbmFsIGVuY29kaW5nIG9mIHRoZSB4bWwuXHJcbiAgICAgKiBUaGlzIGlzIHJlYWQgZnJvbSB0aGUgZmlsZSwgYnV0IGlmIHlvdSBrbm93IGl0IGJlZm9yZSwgeW91IGNhbiBhdm9pZCByZWFkaW5nIHRoZSBmaWxlIHR3aWNlLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsTWFzdGVyIGluIGNhc2Ugb2YgeG1iIHRoZSBtYXN0ZXIgZmlsZSwgdGhhdCBjb250YWlucyB0aGUgb3JpZ2luYWwgdGV4dHMuXHJcbiAgICAgKiAodGhpcyBpcyB1c2VkIHRvIHN1cHBvcnQgc3RhdGUgaW5mb3MsIHRoYXQgYXJlIGJhc2VkIG9uIGNvbXBhcmluZyBvcmlnaW5hbCB3aXRoIHRyYW5zbGF0ZWQgdmVyc2lvbilcclxuICAgICAqIEByZXR1cm4gWG1iRmlsZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF90cmFuc2xhdGlvbk1lc3NhZ2VGaWxlRmFjdG9yeTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlRmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHhtbFN0cmluZzogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbE1hc3Rlcj86IHsgeG1sQ29udGVudDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcgfSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlRyYW5zVW5pdHNXaXRoTWlzc2luZ0lkID0gMDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVGcm9tQ29udGVudCh4bWxTdHJpbmcsIHBhdGgsIGVuY29kaW5nLCBvcHRpb25hbE1hc3Rlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRnJvbUNvbnRlbnQoeG1sU3RyaW5nOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyPzogeyB4bWxDb250ZW50OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyB9KTogWHRiRmlsZSB7XHJcbiAgICAgICAgdGhpcy5wYXJzZUNvbnRlbnQoeG1sU3RyaW5nLCBwYXRoLCBlbmNvZGluZyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnNlZERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0cmFuc2xhdGlvbmJ1bmRsZScpLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdGaWxlIFwiJXNcIiBzZWVtcyB0byBiZSBubyB4dGIgZmlsZSAoc2hvdWxkIGNvbnRhaW4gYSB0cmFuc2xhdGlvbmJ1bmRsZSBlbGVtZW50KScsIHBhdGgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbmFsTWFzdGVyKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXN0ZXJGaWxlID0gdGhpcy5fdHJhbnNsYXRpb25NZXNzYWdlRmlsZUZhY3RvcnkuY3JlYXRlRmlsZUZyb21GaWxlQ29udGVudChcclxuICAgICAgICAgICAgICAgICAgICBGT1JNQVRfWE1CLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyLnhtbENvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWxNYXN0ZXIucGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25hbE1hc3Rlci5lbmNvZGluZyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjaywgd2V0aGVyIHRoaXMgY2FuIGJlIHRoZSBtYXN0ZXIgLi4uXHJcbiAgICAgICAgICAgICAgICBjb25zdCBudW1iZXJJbk1hc3RlciA9IHRoaXMuX21hc3RlckZpbGUubnVtYmVyT2ZUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBteU51bWJlciA9IHRoaXMubnVtYmVyT2ZUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVySW5NYXN0ZXIgIT09IG15TnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ3MucHVzaChmb3JtYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICclcyB0cmFucyB1bml0cyBmb3VuZCBpbiBtYXN0ZXIsIGJ1dCB0aGlzIGZpbGUgaGFzICVzLiBDaGVjayBpZiBpdCBpcyB0aGUgY29ycmVjdCBtYXN0ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudW1iZXJJbk1hc3RlciwgbXlOdW1iZXIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ZpbGUgXCIlc1wiIHNlZW1zIHRvIGJlIG5vIHhtYiBmaWxlLiBBbiB4dGIgZmlsZSBuZWVkcyB4bWIgYXMgbWFzdGVyIGZpbGUuJywgb3B0aW9uYWxNYXN0ZXIucGF0aCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplVHJhbnNVbml0cygpIHtcclxuICAgICAgICB0aGlzLnRyYW5zVW5pdHMgPSBbXTtcclxuICAgICAgICBjb25zdCB0cmFuc1VuaXRzSW5GaWxlID0gdGhpcy5fcGFyc2VkRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyYW5zbGF0aW9uJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFuc1VuaXRzSW5GaWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHRyYW5zVW5pdHNJbkZpbGUuaXRlbShpKTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSBtc2cuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93YXJuaW5ncy5wdXNoKGZvcm1hdCgnb29wcywgbXNnIHdpdGhvdXQgXCJpZFwiIGZvdW5kIGluIG1hc3RlciwgcGxlYXNlIGNoZWNrIGZpbGUgJXMnLCB0aGlzLl9maWxlbmFtZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBtYXN0ZXJVbml0OiBJVHJhbnNVbml0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX21hc3RlckZpbGUpIHtcclxuICAgICAgICAgICAgICAgIG1hc3RlclVuaXQgPSB0aGlzLl9tYXN0ZXJGaWxlLnRyYW5zVW5pdFdpdGhJZChpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50cmFuc1VuaXRzLnB1c2gobmV3IFh0YlRyYW5zVW5pdChtc2csIGlkLCB0aGlzLCA8QWJzdHJhY3RUcmFuc1VuaXQ+IG1hc3RlclVuaXQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxlIGZvcm1hdCBhcyBpdCBpcyB1c2VkIGluIGNvbmZpZyBmaWxlcy5cclxuICAgICAqIEN1cnJlbnRseSAneGxmJywgJ3hsZjInLCAneG1iJywgJ3h0YidcclxuICAgICAqIFJldHVybnMgb25lIG9mIHRoZSBjb25zdGFudHMgRk9STUFUXy4uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpMThuRm9ybWF0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEZPUk1BVF9YVEI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxlIHR5cGUuXHJcbiAgICAgKiBIZXJlICdYVEInXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaWxlVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBGSUxFVFlQRV9YVEI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZXR1cm4gdGFnIG5hbWVzIG9mIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgbWl4ZWQgY29udGVudC5cclxuICAgICAqIFRoZXNlIGVsZW1lbnRzIHdpbGwgbm90IGJlIGJlYXV0aWZpZWQuXHJcbiAgICAgKiBUeXBpY2FsIGNhbmRpZGF0ZXMgYXJlIHNvdXJjZSBhbmQgdGFyZ2V0LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZWxlbWVudHNXaXRoTWl4ZWRDb250ZW50KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gWyd0cmFuc2xhdGlvbiddO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHNvdXJjZSBsYW5ndWFnZS5cclxuICAgICAqIFVuc3VwcG9ydGVkIGluIHhtYi94dGIuXHJcbiAgICAgKiBUcnkgdG8gZ3Vlc3MgaXQgZnJvbSBtYXN0ZXIgZmlsZW5hbWUgaWYgYW55Li5cclxuICAgICAqIEByZXR1cm4gc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlTGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fbWFzdGVyRmlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFzdGVyRmlsZS5zb3VyY2VMYW5ndWFnZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVkaXQgdGhlIHNvdXJjZSBsYW5ndWFnZS5cclxuICAgICAqIFVuc3VwcG9ydGVkIGluIHhtYi94dGIuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZUxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nLCB4dGIgaGFzIG5vIG5vdGF0aW9uIGZvciB0aGlzLlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqIEByZXR1cm4gdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0gPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX3BhcnNlZERvY3VtZW50LCAndHJhbnNsYXRpb25idW5kbGUnKTtcclxuICAgICAgICBpZiAodHJhbnNsYXRpb25idW5kbGVFbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0uZ2V0QXR0cmlidXRlKCdsYW5nJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCB0aGUgdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlIGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUYXJnZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25idW5kbGVFbGVtID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ3RyYW5zbGF0aW9uYnVuZGxlJyk7XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0aW9uYnVuZGxlRWxlbSkge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0uc2V0QXR0cmlidXRlKCdsYW5nJywgbGFuZ3VhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5ldyB0cmFucy11bml0IHRvIHRoaXMgZmlsZS5cclxuICAgICAqIFRoZSB0cmFucyB1bml0IHN0ZW1zIGZyb20gYW5vdGhlciBmaWxlLlxyXG4gICAgICogSXQgY29waWVzIHRoZSBzb3VyY2UgY29udGVudCBvZiB0aGUgdHUgdG8gdGhlIHRhcmdldCBjb250ZW50IHRvbyxcclxuICAgICAqIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIGlzRGVmYXVsdExhbmcgYW5kIGNvcHlDb250ZW50LlxyXG4gICAgICogU28gdGhlIHNvdXJjZSBjYW4gYmUgdXNlZCBhcyBhIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogKHVzZWQgYnkgeGxpZmZtZXJnZSlcclxuICAgICAqIEBwYXJhbSBmb3JlaWduVHJhbnNVbml0IHRoZSB0cmFucyB1bml0IHRvIGJlIGltcG9ydGVkLlxyXG4gICAgICogQHBhcmFtIGlzRGVmYXVsdExhbmcgRmxhZywgd2V0aGVyIGZpbGUgY29udGFpbnMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBUaGVuIHNvdXJjZSBhbmQgdGFyZ2V0IGFyZSBqdXN0IGVxdWFsLlxyXG4gICAgICogVGhlIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQuXHJcbiAgICAgKiBTdGF0ZSB3aWxsIGJlIGZpbmFsLlxyXG4gICAgICogQHBhcmFtIGNvcHlDb250ZW50IEZsYWcsIHdldGhlciB0byBjb3B5IGNvbnRlbnQgb3IgbGVhdmUgaXQgZW1wdHkuXHJcbiAgICAgKiBXYmVuIHRydWUsIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBXaGVuIGZhbHNlLCBjb250ZW50IHdpbGwgYmUgbGVmdCBlbXB0eSAoaWYgaXQgaXMgbm90IHRoZSBkZWZhdWx0IGxhbmd1YWdlKS5cclxuICAgICAqIEBwYXJhbSBpbXBvcnRBZnRlckVsZW1lbnQgb3B0aW9uYWwgKHNpbmNlIDEuMTApIG90aGVyIHRyYW5zdW5pdCAocGFydCBvZiB0aGlzIGZpbGUpLCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIGFuY2VzdG9yLlxyXG4gICAgICogTmV3bHkgaW1wb3J0ZWQgdHJhbnMgdW5pdCBpcyB0aGVuIGluc2VydGVkIGRpcmVjdGx5IGFmdGVyIHRoaXMgZWxlbWVudC5cclxuICAgICAqIElmIG5vdCBzZXQgb3Igbm90IHBhcnQgb2YgdGhpcyBmaWxlLCBuZXcgdW5pdCB3aWxsIGJlIGltcG9ydGVkIGF0IHRoZSBlbmQuXHJcbiAgICAgKiBJZiBleHBsaWNpdHkgc2V0IHRvIG51bGwsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIHN0YXJ0LlxyXG4gICAgICogQHJldHVybiB0aGUgbmV3bHkgaW1wb3J0ZWQgdHJhbnMgdW5pdCAoc2luY2UgdmVyc2lvbiAxLjcuMClcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgdHJhbnMtdW5pdCB3aXRoIHNhbWUgaWQgYWxyZWFkeSBpcyBpbiB0aGUgZmlsZS5cclxuICAgICAqL1xyXG4gICAgaW1wb3J0TmV3VHJhbnNVbml0KGZvcmVpZ25UcmFuc1VuaXQ6IElUcmFuc1VuaXQsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuLCBpbXBvcnRBZnRlckVsZW1lbnQ/OiBJVHJhbnNVbml0KVxyXG4gICAgICAgIDogSVRyYW5zVW5pdCB7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNVbml0V2l0aElkKGZvcmVpZ25UcmFuc1VuaXQuaWQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ3R1IHdpdGggaWQgJXMgYWxyZWFkeSBleGlzdHMgaW4gZmlsZSwgY2Fubm90IGltcG9ydCBpdCcsIGZvcmVpZ25UcmFuc1VuaXQuaWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbmV3TWFzdGVyVHUgPSAoPEFic3RyYWN0VHJhbnNVbml0PiBmb3JlaWduVHJhbnNVbml0KS5jbG9uZVdpdGhTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nLCBjb3B5Q29udGVudCwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25idW5kbGVFbGVtID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ3RyYW5zbGF0aW9uYnVuZGxlJyk7XHJcbiAgICAgICAgaWYgKCF0cmFuc2xhdGlvbmJ1bmRsZUVsZW0pIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnRmlsZSBcIiVzXCIgc2VlbXMgdG8gYmUgbm8geHRiIGZpbGUgKHNob3VsZCBjb250YWluIGEgdHJhbnNsYXRpb25idW5kbGUgZWxlbWVudCknLCB0aGlzLl9maWxlbmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0cmFuc2xhdGlvbkVsZW1lbnQgPSB0cmFuc2xhdGlvbmJ1bmRsZUVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cmFuc2xhdGlvbicpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZm9yZWlnblRyYW5zVW5pdC5pZCk7XHJcbiAgICAgICAgbGV0IG5ld0NvbnRlbnQgPSAoY29weUNvbnRlbnQgfHwgaXNEZWZhdWx0TGFuZykgPyBmb3JlaWduVHJhbnNVbml0LnNvdXJjZUNvbnRlbnQoKSA6ICcnO1xyXG4gICAgICAgIGlmICghKDxBYnN0cmFjdFRyYW5zVW5pdD4gZm9yZWlnblRyYW5zVW5pdCkuaXNJQ1VNZXNzYWdlKG5ld0NvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgIG5ld0NvbnRlbnQgPSB0aGlzLmdldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgoKSArIG5ld0NvbnRlbnQgKyB0aGlzLmdldE5ld1RyYW5zVW5pdFRhcmdldFN1ZmZpeCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudCh0cmFuc2xhdGlvbkVsZW1lbnQsIG5ld0NvbnRlbnQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1R1ID0gbmV3IFh0YlRyYW5zVW5pdCh0cmFuc2xhdGlvbkVsZW1lbnQsIGZvcmVpZ25UcmFuc1VuaXQuaWQsIHRoaXMsIG5ld01hc3RlclR1KTtcclxuICAgICAgICBsZXQgaW5zZXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgaXNBZnRlckVsZW1lbnRQYXJ0T2ZGaWxlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCEhaW1wb3J0QWZ0ZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc2VydGlvblBvaW50ID0gdGhpcy50cmFuc1VuaXRXaXRoSWQoaW1wb3J0QWZ0ZXJFbGVtZW50LmlkKTtcclxuICAgICAgICAgICAgaWYgKCEhaW5zZXJ0aW9uUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIGlzQWZ0ZXJFbGVtZW50UGFydE9mRmlsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGltcG9ydEFmdGVyRWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IChpbXBvcnRBZnRlckVsZW1lbnQgJiYgIWlzQWZ0ZXJFbGVtZW50UGFydE9mRmlsZSkpIHtcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25idW5kbGVFbGVtLmFwcGVuZENoaWxkKG5ld1R1LmFzWG1sRWxlbWVudCgpKTtcclxuICAgICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0QWZ0ZXJFbGVtZW50ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0VHJhbnNsYXRpb25FbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9wYXJzZWREb2N1bWVudCwgJ3RyYW5zbGF0aW9uJyk7XHJcbiAgICAgICAgICAgIGlmIChmaXJzdFRyYW5zbGF0aW9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgRE9NVXRpbGl0aWVzLmluc2VydEJlZm9yZShuZXdUdS5hc1htbEVsZW1lbnQoKSwgZmlyc3RUcmFuc2xhdGlvbkVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaW5zZXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gbm8gdHJhbnMtdW5pdCwgZW1wdHkgZmlsZSwgc28gYWRkIHRvIGJ1bmRsZSBhdCBlbmRcclxuICAgICAgICAgICAgICAgIHRyYW5zbGF0aW9uYnVuZGxlRWxlbS5hcHBlbmRDaGlsZChuZXdUdS5hc1htbEVsZW1lbnQoKSk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCByZWZVbml0RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRFbGVtZW50QnlUYWdOYW1lQW5kSWQodGhpcy5fcGFyc2VkRG9jdW1lbnQsICd0cmFuc2xhdGlvbicsIGltcG9ydEFmdGVyRWxlbWVudC5pZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWZVbml0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgRE9NVXRpbGl0aWVzLmluc2VydEFmdGVyKG5ld1R1LmFzWG1sRWxlbWVudCgpLCByZWZVbml0RWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpbnNlcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluc2VydGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF6eUluaXRpYWxpemVUcmFuc1VuaXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNVbml0cy5wdXNoKG5ld1R1KTtcclxuICAgICAgICAgICAgdGhpcy5jb3VudE51bWJlcnMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1R1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyB0cmFuc2xhdGlvbiBmaWxlIGZvciB0aGlzIGZpbGUgZm9yIGEgZ2l2ZW4gbGFuZ3VhZ2UuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBqdXN0IGEgY29weSBvZiB0aGUgb3JpZ2luYWwgb25lLlxyXG4gICAgICogQnV0IGZvciBYTUIgdGhlIHRyYW5zbGF0aW9uIGZpbGUgaGFzIGZvcm1hdCAnWFRCJy5cclxuICAgICAqIEBwYXJhbSBsYW5nIExhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBleHBlY3RlZCBmaWxlbmFtZSB0byBzdG9yZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gaXNEZWZhdWx0TGFuZyBGbGFnLCB3ZXRoZXIgZmlsZSBjb250YWlucyB0aGUgZGVmYXVsdCBsYW5ndWFnZS5cclxuICAgICAqIFRoZW4gc291cmNlIGFuZCB0YXJnZXQgYXJlIGp1c3QgZXF1YWwuXHJcbiAgICAgKiBUaGUgY29udGVudCB3aWxsIGJlIGNvcGllZC5cclxuICAgICAqIFN0YXRlIHdpbGwgYmUgZmluYWwuXHJcbiAgICAgKiBAcGFyYW0gY29weUNvbnRlbnQgRmxhZywgd2V0aGVyIHRvIGNvcHkgY29udGVudCBvciBsZWF2ZSBpdCBlbXB0eS5cclxuICAgICAqIFdiZW4gdHJ1ZSwgY29udGVudCB3aWxsIGJlIGNvcGllZCBmcm9tIHNvdXJjZS5cclxuICAgICAqIFdoZW4gZmFsc2UsIGNvbnRlbnQgd2lsbCBiZSBsZWZ0IGVtcHR5IChpZiBpdCBpcyBub3QgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyhsYW5nOiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdGaWxlIFwiJXNcIiwgeHRiIGZpbGVzIGFyZSBub3QgdHJhbnNsYXRhYmxlLCB0aGV5IGFyZSBhbHJlYWR5IHRyYW5zbGF0aW9ucycsIGZpbGVuYW1lKSk7XHJcbiAgICB9XHJcbn1cclxuIl19