/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FORMAT_XMB, FILETYPE_XMB, FORMAT_XTB } from '../api/constants';
import { format } from 'util';
import { XmbTransUnit } from './xmb-trans-unit';
import { AbstractTranslationMessagesFile } from './abstract-translation-messages-file';
/**
 * Doctype of xtb translation file corresponding with thos xmb file.
 * @type {?}
 */
export const XTB_DOCTYPE = `<!DOCTYPE translationbundle [
  <!ELEMENT translationbundle (translation)*>
  <!ATTLIST translationbundle lang CDATA #REQUIRED>
  <!ELEMENT translation (#PCDATA|ph)*>
  <!ATTLIST translation id CDATA #REQUIRED>
  <!ELEMENT ph EMPTY>
  <!ATTLIST ph name CDATA #REQUIRED>
]>`;
export class XmbFile extends AbstractTranslationMessagesFile {
    /**
     * Create an xmb-File from source.
     * @param {?} _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param {?} xmlString file content
     * @param {?} path Path to file
     * @param {?} encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     */
    constructor(_translationMessageFileFactory, xmlString, path, encoding) {
        super();
        this._translationMessageFileFactory = _translationMessageFileFactory;
        this._warnings = [];
        this._numberOfTransUnitsWithMissingId = 0;
        this.initializeFromContent(xmlString, path, encoding);
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    initializeFromContent(xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('messagebundle').length !== 1) {
            throw new Error(format('File "%s" seems to be no xmb file (should contain a messagebundle element)', path));
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
        const transUnitsInFile = this._parsedDocument.getElementsByTagName('msg');
        for (let i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            const msg = transUnitsInFile.item(i);
            /** @type {?} */
            const id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new XmbTransUnit(msg, id, this));
        }
    }
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    i18nFormat() {
        return FORMAT_XMB;
    }
    /**
     * File type.
     * Here 'XMB'
     * @return {?}
     */
    fileType() {
        return FILETYPE_XMB;
    }
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    elementsWithMixedContent() {
        return ['message'];
    }
    /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @private
     * @return {?} Language or null
     */
    guessLanguageFromFilename() {
        if (this._filename) {
            /** @type {?} */
            const parts = this._filename.split('.');
            if (parts.length > 2 && parts[parts.length - 1].toLowerCase() === 'xmb') {
                return parts[parts.length - 2];
            }
        }
        return null;
    }
    /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} source language.
     */
    sourceLanguage() {
        return this.guessLanguageFromFilename();
    }
    /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    setSourceLanguage(language) {
        // do nothing, xmb has no notation for this.
    }
    /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} target language.
     */
    targetLanguage() {
        return this.guessLanguageFromFilename();
    }
    /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    setTargetLanguage(language) {
        // do nothing, xmb has no notation for this.
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
        throw Error('xmb file cannot be used to store translations, use xtb file');
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
        /** @type {?} */
        const translationbundleXMLSource = '<?xml version="1.0" encoding="UTF-8"?>\n' + XTB_DOCTYPE + '\n<translationbundle>\n</translationbundle>\n';
        /** @type {?} */
        const translationFile = this._translationMessageFileFactory.createFileFromFileContent(FORMAT_XTB, translationbundleXMLSource, filename, this.encoding(), { xmlContent: this.editedContent(), path: this.filename(), encoding: this.encoding() });
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.setNewTransUnitTargetPraefix(this.getNewTransUnitTargetPraefix());
        translationFile.setNewTransUnitTargetSuffix(this.getNewTransUnitTargetSuffix());
        this.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => {
            translationFile.importNewTransUnit(tu, isDefaultLang, copyContent);
        }));
        return translationFile;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    XmbFile.prototype._translationMessageFileFactory;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iLWZpbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3htYi1maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQzs7Ozs7QUFVckYsTUFBTSxPQUFPLFdBQVcsR0FBRzs7Ozs7OztHQU94QjtBQUVILE1BQU0sT0FBTyxPQUFRLFNBQVEsK0JBQStCOzs7Ozs7Ozs7SUFXeEQsWUFDWSw4QkFBK0QsRUFDdkUsU0FBaUIsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7UUFFakQsS0FBSyxFQUFFLENBQUM7UUFIQSxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWlDO1FBSXZFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQ0FBZ0MsR0FBRyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7Ozs7SUFFTyxxQkFBcUIsQ0FBQyxTQUFpQixFQUFFLElBQVksRUFBRSxRQUFnQjtRQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekUsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMs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SSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0QsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLGVBQWUsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxnQkFBZ0I7Ozs7UUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3pCLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztDQUVKOzs7Ozs7SUF6S08saURBQXVFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5fSBmcm9tICcuLi9hcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlLWZhY3RvcnknO1xyXG5pbXBvcnQge0lUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi4vYXBpL2ktdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZSc7XHJcbmltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnLi4vYXBpL2ktdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7Rk9STUFUX1hNQiwgRklMRVRZUEVfWE1CLCBGT1JNQVRfWFRCfSBmcm9tICcuLi9hcGkvY29uc3RhbnRzJztcclxuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge1htYlRyYW5zVW5pdH0gZnJvbSAnLi94bWItdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7QWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi9hYnN0cmFjdC10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAxMC4wMy4yMDE3LlxyXG4gKiB4bWItRmlsZSBhY2Nlc3MuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIERvY3R5cGUgb2YgeHRiIHRyYW5zbGF0aW9uIGZpbGUgY29ycmVzcG9uZGluZyB3aXRoIHRob3MgeG1iIGZpbGUuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgWFRCX0RPQ1RZUEUgPSBgPCFET0NUWVBFIHRyYW5zbGF0aW9uYnVuZGxlIFtcclxuICA8IUVMRU1FTlQgdHJhbnNsYXRpb25idW5kbGUgKHRyYW5zbGF0aW9uKSo+XHJcbiAgPCFBVFRMSVNUIHRyYW5zbGF0aW9uYnVuZGxlIGxhbmcgQ0RBVEEgI1JFUVVJUkVEPlxyXG4gIDwhRUxFTUVOVCB0cmFuc2xhdGlvbiAoI1BDREFUQXxwaCkqPlxyXG4gIDwhQVRUTElTVCB0cmFuc2xhdGlvbiBpZCBDREFUQSAjUkVRVUlSRUQ+XHJcbiAgPCFFTEVNRU5UIHBoIEVNUFRZPlxyXG4gIDwhQVRUTElTVCBwaCBuYW1lIENEQVRBICNSRVFVSVJFRD5cclxuXT5gO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhtYkZpbGUgZXh0ZW5kcyBBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIGltcGxlbWVudHMgSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhbiB4bWItRmlsZSBmcm9tIHNvdXJjZS5cclxuICAgICAqIEBwYXJhbSBfdHJhbnNsYXRpb25NZXNzYWdlRmlsZUZhY3RvcnkgZmFjdG9yeSB0byBjcmVhdGUgYSB0cmFuc2xhdGlvbiBmaWxlICh4dGIpIGZvciB0aGUgeG1iIGZpbGVcclxuICAgICAqIEBwYXJhbSB4bWxTdHJpbmcgZmlsZSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcGF0aCBQYXRoIHRvIGZpbGVcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyBvcHRpb25hbCBlbmNvZGluZyBvZiB0aGUgeG1sLlxyXG4gICAgICogVGhpcyBpcyByZWFkIGZyb20gdGhlIGZpbGUsIGJ1dCBpZiB5b3Uga25vdyBpdCBiZWZvcmUsIHlvdSBjYW4gYXZvaWQgcmVhZGluZyB0aGUgZmlsZSB0d2ljZS5cclxuICAgICAqIEByZXR1cm4gWG1iRmlsZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF90cmFuc2xhdGlvbk1lc3NhZ2VGaWxlRmFjdG9yeTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlRmFjdG9yeSxcclxuICAgICAgICB4bWxTdHJpbmc6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fd2FybmluZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLl9udW1iZXJPZlRyYW5zVW5pdHNXaXRoTWlzc2luZ0lkID0gMDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVGcm9tQ29udGVudCh4bWxTdHJpbmcsIHBhdGgsIGVuY29kaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYWxpemVGcm9tQ29udGVudCh4bWxTdHJpbmc6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nKTogWG1iRmlsZSB7XHJcbiAgICAgICAgdGhpcy5wYXJzZUNvbnRlbnQoeG1sU3RyaW5nLCBwYXRoLCBlbmNvZGluZyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnNlZERvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdtZXNzYWdlYnVuZGxlJykubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ZpbGUgXCIlc1wiIHNlZW1zIHRvIGJlIG5vIHhtYiBmaWxlIChzaG91bGQgY29udGFpbiBhIG1lc3NhZ2VidW5kbGUgZWxlbWVudCknLCBwYXRoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0aWFsaXplVHJhbnNVbml0cygpIHtcclxuICAgICAgICB0aGlzLnRyYW5zVW5pdHMgPSBbXTtcclxuICAgICAgICBjb25zdCB0cmFuc1VuaXRzSW5GaWxlID0gdGhpcy5fcGFyc2VkRG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ21zZycpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhbnNVbml0c0luRmlsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSB0cmFuc1VuaXRzSW5GaWxlLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gbXNnLmdldEF0dHJpYnV0ZSgnaWQnKTtcclxuICAgICAgICAgICAgaWYgKCFpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FybmluZ3MucHVzaChmb3JtYXQoJ29vcHMsIG1zZyB3aXRob3V0IFwiaWRcIiBmb3VuZCBpbiBtYXN0ZXIsIHBsZWFzZSBjaGVjayBmaWxlICVzJywgdGhpcy5fZmlsZW5hbWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRyYW5zVW5pdHMucHVzaChuZXcgWG1iVHJhbnNVbml0KG1zZywgaWQsIHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxlIGZvcm1hdCBhcyBpdCBpcyB1c2VkIGluIGNvbmZpZyBmaWxlcy5cclxuICAgICAqIEN1cnJlbnRseSAneGxmJywgJ3htYicsICd4bWIyJ1xyXG4gICAgICogUmV0dXJucyBvbmUgb2YgdGhlIGNvbnN0YW50cyBGT1JNQVRfLi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGkxOG5Gb3JtYXQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gRk9STUFUX1hNQjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGUgdHlwZS5cclxuICAgICAqIEhlcmUgJ1hNQidcclxuICAgICAqL1xyXG4gICAgcHVibGljIGZpbGVUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEZJTEVUWVBFX1hNQjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0YWcgbmFtZXMgb2YgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSBtaXhlZCBjb250ZW50LlxyXG4gICAgICogVGhlc2UgZWxlbWVudHMgd2lsbCBub3QgYmUgYmVhdXRpZmllZC5cclxuICAgICAqIFR5cGljYWwgY2FuZGlkYXRlcyBhcmUgc291cmNlIGFuZCB0YXJnZXQuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBlbGVtZW50c1dpdGhNaXhlZENvbnRlbnQoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbJ21lc3NhZ2UnXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEd1ZXNzIGxhbmd1YWdlIGZyb20gZmlsZW5hbWUuXHJcbiAgICAgKiBJZiBmaWxlbmFtZSBpcyBmb28ueHkueG1iLCB0aGFuIGxhbmd1YWdlIGlzIGFzc3VtZWQgdG8gYmUgeHkuXHJcbiAgICAgKiBAcmV0dXJuIExhbmd1YWdlIG9yIG51bGxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBndWVzc0xhbmd1YWdlRnJvbUZpbGVuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ZpbGVuYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IHRoaXMuX2ZpbGVuYW1lLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyICYmIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdLnRvTG93ZXJDYXNlKCkgPT09ICd4bWInKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydHNbcGFydHMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICogVW5zdXBwb3J0ZWQgaW4geG1iLlxyXG4gICAgICogVHJ5IHRvIGd1ZXNzIGl0IGZyb20gZmlsZW5hbWUgaWYgYW55Li5cclxuICAgICAqIEByZXR1cm4gc291cmNlIGxhbmd1YWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlTGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ndWVzc0xhbmd1YWdlRnJvbUZpbGVuYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFZGl0IHRoZSBzb3VyY2UgbGFuZ3VhZ2UuXHJcbiAgICAgKiBVbnN1cHBvcnRlZCBpbiB4bWIuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2UgbGFuZ3VhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZUxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nLCB4bWIgaGFzIG5vIG5vdGF0aW9uIGZvciB0aGlzLlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqIFVuc3VwcG9ydGVkIGluIHhtYi5cclxuICAgICAqIFRyeSB0byBndWVzcyBpdCBmcm9tIGZpbGVuYW1lIGlmIGFueS4uXHJcbiAgICAgKiBAcmV0dXJuIHRhcmdldCBsYW5ndWFnZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldExhbmd1YWdlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ3Vlc3NMYW5ndWFnZUZyb21GaWxlbmFtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCB0aGUgdGFyZ2V0IGxhbmd1YWdlLlxyXG4gICAgICogVW5zdXBwb3J0ZWQgaW4geG1iLlxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlIGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUYXJnZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gZG8gbm90aGluZywgeG1iIGhhcyBubyBub3RhdGlvbiBmb3IgdGhpcy5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIG5ldyB0cmFucy11bml0IHRvIHRoaXMgZmlsZS5cclxuICAgICAqIFRoZSB0cmFucyB1bml0IHN0ZW1zIGZyb20gYW5vdGhlciBmaWxlLlxyXG4gICAgICogSXQgY29waWVzIHRoZSBzb3VyY2UgY29udGVudCBvZiB0aGUgdHUgdG8gdGhlIHRhcmdldCBjb250ZW50IHRvbyxcclxuICAgICAqIGRlcGVuZGluZyBvbiB0aGUgdmFsdWVzIG9mIGlzRGVmYXVsdExhbmcgYW5kIGNvcHlDb250ZW50LlxyXG4gICAgICogU28gdGhlIHNvdXJjZSBjYW4gYmUgdXNlZCBhcyBhIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogKHVzZWQgYnkgeGxpZmZtZXJnZSlcclxuICAgICAqIEBwYXJhbSBmb3JlaWduVHJhbnNVbml0IHRoZSB0cmFucyB1bml0IHRvIGJlIGltcG9ydGVkLlxyXG4gICAgICogQHBhcmFtIGlzRGVmYXVsdExhbmcgRmxhZywgd2V0aGVyIGZpbGUgY29udGFpbnMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBUaGVuIHNvdXJjZSBhbmQgdGFyZ2V0IGFyZSBqdXN0IGVxdWFsLlxyXG4gICAgICogVGhlIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQuXHJcbiAgICAgKiBTdGF0ZSB3aWxsIGJlIGZpbmFsLlxyXG4gICAgICogQHBhcmFtIGNvcHlDb250ZW50IEZsYWcsIHdldGhlciB0byBjb3B5IGNvbnRlbnQgb3IgbGVhdmUgaXQgZW1wdHkuXHJcbiAgICAgKiBXYmVuIHRydWUsIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBXaGVuIGZhbHNlLCBjb250ZW50IHdpbGwgYmUgbGVmdCBlbXB0eSAoaWYgaXQgaXMgbm90IHRoZSBkZWZhdWx0IGxhbmd1YWdlKS5cclxuICAgICAqIEBwYXJhbSBpbXBvcnRBZnRlckVsZW1lbnQgb3B0aW9uYWwgKHNpbmNlIDEuMTApIG90aGVyIHRyYW5zdW5pdCAocGFydCBvZiB0aGlzIGZpbGUpLCB0aGF0IHNob3VsZCBiZSB1c2VkIGFzIGFuY2VzdG9yLlxyXG4gICAgICogTmV3bHkgaW1wb3J0ZWQgdHJhbnMgdW5pdCBpcyB0aGVuIGluc2VydGVkIGRpcmVjdGx5IGFmdGVyIHRoaXMgZWxlbWVudC5cclxuICAgICAqIElmIG5vdCBzZXQgb3Igbm90IHBhcnQgb2YgdGhpcyBmaWxlLCBuZXcgdW5pdCB3aWxsIGJlIGltcG9ydGVkIGF0IHRoZSBlbmQuXHJcbiAgICAgKiBJZiBleHBsaWNpdHkgc2V0IHRvIG51bGwsIG5ldyB1bml0IHdpbGwgYmUgaW1wb3J0ZWQgYXQgdGhlIHN0YXJ0LlxyXG4gICAgICogQHJldHVybiB0aGUgbmV3bHkgaW1wb3J0ZWQgdHJhbnMgdW5pdCAoc2luY2UgdmVyc2lvbiAxLjcuMClcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgdHJhbnMtdW5pdCB3aXRoIHNhbWUgaWQgYWxyZWFkeSBpcyBpbiB0aGUgZmlsZS5cclxuICAgICAqL1xyXG4gICAgaW1wb3J0TmV3VHJhbnNVbml0KGZvcmVpZ25UcmFuc1VuaXQ6IElUcmFuc1VuaXQsIGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuLCBpbXBvcnRBZnRlckVsZW1lbnQ/OiBJVHJhbnNVbml0KVxyXG4gICAgICAgIDogSVRyYW5zVW5pdCB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3htYiBmaWxlIGNhbm5vdCBiZSB1c2VkIHRvIHN0b3JlIHRyYW5zbGF0aW9ucywgdXNlIHh0YiBmaWxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgdHJhbnNsYXRpb24gZmlsZSBmb3IgdGhpcyBmaWxlIGZvciBhIGdpdmVuIGxhbmd1YWdlLlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMganVzdCBhIGNvcHkgb2YgdGhlIG9yaWdpbmFsIG9uZS5cclxuICAgICAqIEJ1dCBmb3IgWE1CIHRoZSB0cmFuc2xhdGlvbiBmaWxlIGhhcyBmb3JtYXQgJ1hUQicuXHJcbiAgICAgKiBAcGFyYW0gbGFuZyBMYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgZXhwZWN0ZWQgZmlsZW5hbWUgdG8gc3RvcmUgZmlsZVxyXG4gICAgICogQHBhcmFtIGlzRGVmYXVsdExhbmcgRmxhZywgd2V0aGVyIGZpbGUgY29udGFpbnMgdGhlIGRlZmF1bHQgbGFuZ3VhZ2UuXHJcbiAgICAgKiBUaGVuIHNvdXJjZSBhbmQgdGFyZ2V0IGFyZSBqdXN0IGVxdWFsLlxyXG4gICAgICogVGhlIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQuXHJcbiAgICAgKiBTdGF0ZSB3aWxsIGJlIGZpbmFsLlxyXG4gICAgICogQHBhcmFtIGNvcHlDb250ZW50IEZsYWcsIHdldGhlciB0byBjb3B5IGNvbnRlbnQgb3IgbGVhdmUgaXQgZW1wdHkuXHJcbiAgICAgKiBXYmVuIHRydWUsIGNvbnRlbnQgd2lsbCBiZSBjb3BpZWQgZnJvbSBzb3VyY2UuXHJcbiAgICAgKiBXaGVuIGZhbHNlLCBjb250ZW50IHdpbGwgYmUgbGVmdCBlbXB0eSAoaWYgaXQgaXMgbm90IHRoZSBkZWZhdWx0IGxhbmd1YWdlKS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcobGFuZzogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nLCBpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbilcclxuICAgICAgICA6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25idW5kbGVYTUxTb3VyY2UgPVxyXG4gICAgICAgICAgICAnPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XFxuJyArIFhUQl9ET0NUWVBFICsgJ1xcbjx0cmFuc2xhdGlvbmJ1bmRsZT5cXG48L3RyYW5zbGF0aW9uYnVuZGxlPlxcbic7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRpb25GaWxlID0gdGhpcy5fdHJhbnNsYXRpb25NZXNzYWdlRmlsZUZhY3RvcnkuY3JlYXRlRmlsZUZyb21GaWxlQ29udGVudChcclxuICAgICAgICAgICAgRk9STUFUX1hUQixcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25idW5kbGVYTUxTb3VyY2UsIGZpbGVuYW1lLCB0aGlzLmVuY29kaW5nKCksXHJcbiAgICAgICAgICAgIHt4bWxDb250ZW50OiB0aGlzLmVkaXRlZENvbnRlbnQoKSwgcGF0aDogdGhpcy5maWxlbmFtZSgpLCBlbmNvZGluZzogdGhpcy5lbmNvZGluZygpfSk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25GaWxlLnNldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgodGhpcy50YXJnZXRQcmFlZml4KTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KHRoaXMudGFyZ2V0U3VmZml4KTtcclxuICAgICAgICB0cmFuc2xhdGlvbkZpbGUuc2V0VGFyZ2V0TGFuZ3VhZ2UobGFuZyk7XHJcbiAgICAgICAgdHJhbnNsYXRpb25GaWxlLnNldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgodGhpcy5nZXROZXdUcmFuc1VuaXRUYXJnZXRQcmFlZml4KCkpO1xyXG4gICAgICAgIHRyYW5zbGF0aW9uRmlsZS5zZXROZXdUcmFuc1VuaXRUYXJnZXRTdWZmaXgodGhpcy5nZXROZXdUcmFuc1VuaXRUYXJnZXRTdWZmaXgoKSk7XHJcbiAgICAgICAgdGhpcy5mb3JFYWNoVHJhbnNVbml0KCh0dSkgPT4ge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbkZpbGUuaW1wb3J0TmV3VHJhbnNVbml0KHR1LCBpc0RlZmF1bHRMYW5nLCBjb3B5Q29udGVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uRmlsZTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19