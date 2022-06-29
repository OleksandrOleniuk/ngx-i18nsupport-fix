/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { STATE_NEW, STATE_TRANSLATED, STATE_FINAL } from '../api/constants';
import { DOMUtilities } from './dom-utilities';
import { AbstractTransUnit } from './abstract-trans-unit';
import { Xliff2MessageParser } from './xliff2-message-parser';
import { isNullOrUndefined } from 'util';
/**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
export class Xliff2TransUnit extends AbstractTransUnit {
    /**
     * @param {?} _element
     * @param {?} _id
     * @param {?} _translationMessagesFile
     */
    constructor(_element, _id, _translationMessagesFile) {
        super(_element, _id, _translationMessagesFile);
    }
    /**
     * @return {?}
     */
    sourceContent() {
        /** @type {?} */
        const sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        return DOMUtilities.getXMLContent(sourceElement);
    }
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    setSourceContent(newContent) {
        /** @type {?} */
        let source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (!source) {
            // should not happen, there always has to be a source, but who knows..
            /** @type {?} */
            const segment = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
            source = segment.parentNode.appendChild(this._element.ownerDocument.createElement('source'));
        }
        DOMUtilities.replaceContentWithXMLContent(source, newContent);
    }
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    messageParser() {
        return new Xliff2MessageParser();
    }
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    createSourceContentNormalized() {
        /** @type {?} */
        const sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (sourceElement) {
            return this.messageParser().createNormalizedMessageFromXML(sourceElement, null);
        }
        else {
            return null;
        }
    }
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    targetContent() {
        /** @type {?} */
        const targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return DOMUtilities.getXMLContent(targetElement);
    }
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    targetContentNormalized() {
        /** @type {?} */
        const targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return new Xliff2MessageParser().createNormalizedMessageFromXML(targetElement, this.sourceContentNormalized());
    }
    /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    nativeTargetState() {
        /** @type {?} */
        const segmentElement = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            return segmentElement.getAttribute('state');
        }
        else {
            return null;
        }
    }
    /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    setNativeTargetState(nativeState) {
        /** @type {?} */
        const segmentElement = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            segmentElement.setAttribute('state', nativeState);
        }
    }
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    mapStateToNativeState(state) {
        switch (state) {
            case STATE_NEW:
                return 'initial';
            case STATE_TRANSLATED:
                return 'translated';
            case STATE_FINAL:
                return 'final';
            default:
                throw new Error('unknown state ' + state);
        }
    }
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    mapNativeStateToState(nativeState) {
        switch (nativeState) {
            case 'initial':
                return STATE_NEW;
            case 'translated':
                return STATE_TRANSLATED;
            case 'reviewed': // same as translated
                return STATE_TRANSLATED;
            case 'final':
                return STATE_FINAL;
            default:
                return STATE_NEW;
        }
    }
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    sourceReferences() {
        // Source is found as <file>:<line> in <note category="location">...
        /** @type {?} */
        const noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        const sourceRefs = [];
        for (let i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            const noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === 'location') {
                /** @type {?} */
                const sourceAndPos = DOMUtilities.getPCDATA(noteElem);
                sourceRefs.push(this.parseSourceAndPos(sourceAndPos));
            }
        }
        return sourceRefs;
    }
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and line number
     */
    parseSourceAndPos(sourceAndPos) {
        /** @type {?} */
        const index = sourceAndPos.lastIndexOf(':');
        if (index < 0) {
            return {
                sourcefile: sourceAndPos,
                linenumber: 0
            };
        }
        else {
            return {
                sourcefile: sourceAndPos.substring(0, index),
                linenumber: this.parseLineNumber(sourceAndPos.substring(index + 1))
            };
        }
    }
    /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    parseLineNumber(lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    }
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    setSourceReferences(sourceRefs) {
        this.removeAllSourceReferences();
        /** @type {?} */
        let notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (sourceRefs.length === 0 && !isNullOrUndefined(notesElement) && notesElement.childNodes.length === 0) {
            // remove empty notes element
            notesElement.parentNode.removeChild(notesElement);
            return;
        }
        if (isNullOrUndefined(notesElement)) {
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.insertBefore(notesElement, this._element.childNodes.item(0));
        }
        sourceRefs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        (ref) => {
            /** @type {?} */
            const note = this._element.ownerDocument.createElement('note');
            note.setAttribute('category', 'location');
            note.appendChild(this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            notesElement.appendChild(note);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    removeAllSourceReferences() {
        /** @type {?} */
        const noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        const toBeRemoved = [];
        for (let i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            const elem = noteElements.item(i);
            if (elem.getAttribute('category') === 'location') {
                toBeRemoved.push(elem);
            }
        }
        toBeRemoved.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        (elem) => { elem.parentNode.removeChild(elem); }));
    }
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     * @return {?}
     */
    description() {
        /** @type {?} */
        const noteElem = this.findNoteElementWithCategoryAttribute('description');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    }
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    setDescription(description) {
        /** @type {?} */
        const noteElem = this.findNoteElementWithCategoryAttribute('description');
        if (description) {
            if (isNullOrUndefined(noteElem)) {
                // create it
                this.createNoteElementWithCategoryAttribute('description', description);
            }
            else {
                DOMUtilities.replaceContentWithXMLContent(noteElem, description);
            }
        }
        else {
            if (!isNullOrUndefined(noteElem)) {
                // remove node
                this.removeNoteElementWithCategoryAttribute('description');
            }
        }
    }
    /**
     * Find a note element with attribute category='<attrValue>'
     * @private
     * @param {?} attrValue value of category attribute
     * @return {?} element or null is absent
     */
    findNoteElementWithCategoryAttribute(attrValue) {
        /** @type {?} */
        const noteElements = this._element.getElementsByTagName('note');
        for (let i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            const noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === attrValue) {
                return noteElem;
            }
        }
        return null;
    }
    /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    findAllAdditionalNoteElements() {
        /** @type {?} */
        const noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        const result = [];
        for (let i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            const noteElem = noteElements.item(i);
            /** @type {?} */
            const fromAttribute = noteElem.getAttribute('category');
            if (fromAttribute !== 'description' && fromAttribute !== 'meaning') {
                result.push(noteElem);
            }
        }
        return result;
    }
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue category attribute value
     * @param {?} content content of note element
     * @return {?} the new created element
     */
    createNoteElementWithCategoryAttribute(attrValue, content) {
        /** @type {?} */
        let notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (isNullOrUndefined(notesElement)) {
            // create it
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.appendChild(notesElement);
        }
        /** @type {?} */
        const noteElement = this._element.ownerDocument.createElement('note');
        if (attrValue) {
            noteElement.setAttribute('category', attrValue);
        }
        if (content) {
            DOMUtilities.replaceContentWithXMLContent(noteElement, content);
        }
        notesElement.appendChild(noteElement);
        return noteElement;
    }
    /**
     * @private
     * @return {?}
     */
    removeNotesElementIfEmpty() {
        /** @type {?} */
        const notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (notesElement) {
            /** @type {?} */
            const childNote = DOMUtilities.getFirstElementByTagName(this._element, 'note');
            if (!childNote) {
                // remove notes element
                notesElement.parentNode.removeChild(notesElement);
            }
        }
    }
    /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    removeNoteElementWithCategoryAttribute(attrValue) {
        /** @type {?} */
        const noteElement = this.findNoteElementWithCategoryAttribute(attrValue);
        if (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        }
        this.removeNotesElementIfEmpty();
    }
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    removeAllAdditionalNoteElements() {
        /** @type {?} */
        const noteElements = this.findAllAdditionalNoteElements();
        noteElements.forEach((/**
         * @param {?} noteElement
         * @return {?}
         */
        (noteElement) => {
            noteElement.parentNode.removeChild(noteElement);
        }));
        this.removeNotesElementIfEmpty();
    }
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     * @return {?}
     */
    meaning() {
        /** @type {?} */
        const noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    }
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    setMeaning(meaning) {
        /** @type {?} */
        const noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (meaning) {
            if (isNullOrUndefined(noteElem)) {
                // create it
                this.createNoteElementWithCategoryAttribute('meaning', meaning);
            }
            else {
                DOMUtilities.replaceContentWithXMLContent(noteElem, meaning);
            }
        }
        else {
            if (!isNullOrUndefined(noteElem)) {
                // remove node
                this.removeNoteElementWithCategoryAttribute('meaning');
            }
        }
    }
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    notes() {
        /** @type {?} */
        const noteElememts = this.findAllAdditionalNoteElements();
        return noteElememts.map((/**
         * @param {?} elem
         * @return {?}
         */
        elem => {
            return {
                from: elem.getAttribute('category'),
                text: DOMUtilities.getPCDATA(elem)
            };
        }));
    }
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetNotes() {
        return true;
    }
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    setNotes(newNotes) {
        if (!isNullOrUndefined(newNotes)) {
            this.checkNotes(newNotes);
        }
        this.removeAllAdditionalNoteElements();
        if (!isNullOrUndefined(newNotes)) {
            newNotes.forEach((/**
             * @param {?} note
             * @return {?}
             */
            (note) => {
                this.createNoteElementWithCategoryAttribute(note.from, note.text);
            }));
        }
    }
    /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    translateNative(translation) {
        /** @type {?} */
        let target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            /** @type {?} */
            const source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
        }
        DOMUtilities.replaceContentWithXMLContent(target, (/** @type {?} */ (translation)));
        this.setTargetState(STATE_TRANSLATED);
    }
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    cloneWithSourceAsTarget(isDefaultLang, copyContent, targetFile) {
        /** @type {?} */
        const element = (/** @type {?} */ (this._element.cloneNode(true)));
        /** @type {?} */
        const clone = new Xliff2TransUnit(element, this._id, targetFile);
        clone.useSourceAsTarget(isDefaultLang, copyContent);
        return clone;
    }
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    useSourceAsTarget(isDefaultLang, copyContent) {
        /** @type {?} */
        const source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        /** @type {?} */
        let target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
        }
        if (isDefaultLang || copyContent) {
            /** @type {?} */
            const sourceString = DOMUtilities.getXMLContent(source);
            /** @type {?} */
            let newTargetString = sourceString;
            if (!this.isICUMessage(sourceString)) {
                newTargetString = this.translationMessagesFile().getNewTransUnitTargetPraefix()
                    + sourceString
                    + this.translationMessagesFile().getNewTransUnitTargetSuffix();
            }
            DOMUtilities.replaceContentWithXMLContent(target, newTargetString);
        }
        else {
            DOMUtilities.replaceContentWithXMLContent(target, '');
        }
        /** @type {?} */
        const segment = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segment) {
            if (isDefaultLang) {
                segment.setAttribute('state', this.mapStateToNativeState(STATE_FINAL));
            }
            else {
                segment.setAttribute('state', this.mapStateToNativeState(STATE_NEW));
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyLXRyYW5zLXVuaXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3hsaWZmMi10cmFucy11bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSzFFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7O0FBTXZDLE1BQU0sT0FBTyxlQUFnQixTQUFRLGlCQUFpQjs7Ozs7O0lBRWxELFlBQVksUUFBaUIsRUFBRSxHQUFXLEVBQUUsd0JBQWtEO1FBQzFGLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVNLGFBQWE7O2NBQ1YsYUFBYSxHQUFHLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUNwRixPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7Ozs7SUFRTSxnQkFBZ0IsQ0FBQyxVQUFrQjs7WUFDbEMsTUFBTSxHQUFHLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUMzRSxJQUFJLENBQUMsTUFBTSxFQUFFOzs7a0JBRUgsT0FBTyxHQUFHLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztZQUMvRSxNQUFNLEdB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WUFBWTtzQkFDWixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2FBQ3RFO1lBQ0QsWUFBWSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0gsWUFBWSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN6RDs7Y0FDSyxPQUFPLEdBQUcsWUFBWSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQy9FLElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDMUU7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDeEU7U0FDSjtJQUNMLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U1RBVEVfTkVXLCBTVEFURV9UUkFOU0xBVEVELCBTVEFURV9GSU5BTH0gZnJvbSAnLi4vYXBpL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7SVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuLi9hcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtJTm9ybWFsaXplZE1lc3NhZ2V9IGZyb20gJy4uL2FwaS9pLW5vcm1hbGl6ZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnLi4vYXBpL2ktdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7SU5vdGV9IGZyb20gJy4uL2FwaS9pLW5vdGUnO1xyXG5pbXBvcnQge0RPTVV0aWxpdGllc30gZnJvbSAnLi9kb20tdXRpbGl0aWVzJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlJztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zVW5pdH0gZnJvbSAnLi9hYnN0cmFjdC10cmFucy11bml0JztcclxuaW1wb3J0IHtYbGlmZjJNZXNzYWdlUGFyc2VyfSBmcm9tICcuL3hsaWZmMi1tZXNzYWdlLXBhcnNlcic7XHJcbmltcG9ydCB7QWJzdHJhY3RNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNC4wNS4yMDE3LlxyXG4gKiBBIFRyYW5zbGF0aW9uIFVuaXQgaW4gYW4gWExJRkYgMi4wIGZpbGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFhsaWZmMlRyYW5zVW5pdCBleHRlbmRzIEFic3RyYWN0VHJhbnNVbml0ICBpbXBsZW1lbnRzIElUcmFuc1VuaXQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50LCBfaWQ6IHN0cmluZywgX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpIHtcclxuICAgICAgICBzdXBlcihfZWxlbWVudCwgX2lkLCBfdHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb3VyY2VDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NvdXJjZScpO1xyXG4gICAgICAgIHJldHVybiBET01VdGlsaXRpZXMuZ2V0WE1MQ29udGVudChzb3VyY2VFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgc291cmNlIGNvbnRlbnQgaW4gdGhlIHRyYW5zdW5pdC5cclxuICAgICAqIE5vcm1hbGx5LCB0aGlzIGlzIGRvbmUgYnkgbmctZXh0cmFjdC5cclxuICAgICAqIE1ldGhvZCBvbmx5IGV4aXN0cyB0byBhbGxvdyB4bGlmZm1lcmdlIHRvIG1lcmdlIG1pc3NpbmcgY2hhbmdlZCBzb3VyY2UgY29udGVudC5cclxuICAgICAqIEBwYXJhbSBuZXdDb250ZW50IHRoZSBuZXcgY29udGVudC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZUNvbnRlbnQobmV3Q29udGVudDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NvdXJjZScpO1xyXG4gICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgIC8vIHNob3VsZCBub3QgaGFwcGVuLCB0aGVyZSBhbHdheXMgaGFzIHRvIGJlIGEgc291cmNlLCBidXQgd2hvIGtub3dzLi5cclxuICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NlZ21lbnQnKTtcclxuICAgICAgICAgICAgc291cmNlID0gc2VnbWVudC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KHNvdXJjZSwgbmV3Q29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBwYXJzZXIgdXNlZCBmb3Igbm9ybWFsaXplZCBtZXNzYWdlcy5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VQYXJzZXIoKTogQWJzdHJhY3RNZXNzYWdlUGFyc2VyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFhsaWZmMk1lc3NhZ2VQYXJzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCB0ZXh0IHZhbHVlLCB0aGF0IGlzIHRvIGJlIHRyYW5zbGF0ZWQsIGFzIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdzb3VyY2UnKTtcclxuICAgICAgICBpZiAoc291cmNlRWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlUGFyc2VyKCkuY3JlYXRlTm9ybWFsaXplZE1lc3NhZ2VGcm9tWE1MKHNvdXJjZUVsZW1lbnQsIG51bGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB0cmFuc2xhdGVkIHZhbHVlIChjb250YWluaW5nIGFsbCBtYXJrdXAsIGRlcGVuZHMgb24gdGhlIGNvbmNyZXRlIGZvcm1hdCB1c2VkKS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldENvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAndGFyZ2V0Jyk7XHJcbiAgICAgICAgcmV0dXJuIERPTVV0aWxpdGllcy5nZXRYTUxDb250ZW50KHRhcmdldEVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHRyYW5zbGF0ZWQgdmFsdWUsIGJ1dCBhbGwgcGxhY2Vob2xkZXJzIGFyZSByZXBsYWNlZCB3aXRoIHt7bn19IChzdGFydGluZyBhdCAwKVxyXG4gICAgICogYW5kIGFsbCBlbWJlZGRlZCBodG1sIGlzIHJlcGxhY2VkIGJ5IGRpcmVjdCBodG1sIG1hcmt1cC5cclxuICAgICAqL1xyXG4gICAgdGFyZ2V0Q29udGVudE5vcm1hbGl6ZWQoKTogSU5vcm1hbGl6ZWRNZXNzYWdlIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAndGFyZ2V0Jyk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBYbGlmZjJNZXNzYWdlUGFyc2VyKCkuY3JlYXRlTm9ybWFsaXplZE1lc3NhZ2VGcm9tWE1MKHRhcmdldEVsZW1lbnQsIHRoaXMuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSBvZiB0aGUgdHJhbnNsYXRpb24gYXMgc3RvcmVkIGluIHRoZSB4bWwuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBuYXRpdmVUYXJnZXRTdGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnRFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAnc2VnbWVudCcpO1xyXG4gICAgICAgIGlmIChzZWdtZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzdGF0ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCBzdGF0ZSBpbiB4bWwuXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlU3RhdGUgbmF0aXZlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldE5hdGl2ZVRhcmdldFN0YXRlKG5hdGl2ZVN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzZWdtZW50RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NlZ21lbnQnKTtcclxuICAgICAgICBpZiAoc2VnbWVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgc2VnbWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzdGF0ZScsIG5hdGl2ZVN0YXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXAgYW4gYWJzdHJhY3Qgc3RhdGUgKG5ldywgdHJhbnNsYXRlZCwgZmluYWwpIHRvIGEgY29uY3JldGUgc3RhdGUgdXNlZCBpbiB0aGUgeG1sLlxyXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUgdG8gYmUgdXNlZCBpbiB0aGUgeG1sLlxyXG4gICAgICogQHBhcmFtIHN0YXRlIG9uZSBvZiBDb25zdGFudHMuU1RBVEUuLi5cclxuICAgICAqIEByZXR1cm5zIGEgbmF0aXZlIHN0YXRlIChkZXBlbmRzIG9uIGNvbmNyZXRlIGZvcm1hdClcclxuICAgICAqIEB0aHJvd3MgZXJyb3IsIGlmIHN0YXRlIGlzIGludmFsaWQuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBtYXBTdGF0ZVRvTmF0aXZlU3RhdGUoc3RhdGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICggc3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSBTVEFURV9ORVc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2luaXRpYWwnO1xyXG4gICAgICAgICAgICBjYXNlIFNUQVRFX1RSQU5TTEFURUQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZWQnO1xyXG4gICAgICAgICAgICBjYXNlIFNUQVRFX0ZJTkFMOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdmaW5hbCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gc3RhdGUgJyArICBzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIGEgbmF0aXZlIHN0YXRlIChmb3VuZCBpbiB0aGUgZG9jdW1lbnQpIHRvIGFuIGFic3RyYWN0IHN0YXRlIChuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKS5cclxuICAgICAqIFJldHVybnMgdGhlIGFic3RyYWN0IHN0YXRlLlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0YXRlIG5hdGl2ZVN0YXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBtYXBOYXRpdmVTdGF0ZVRvU3RhdGUobmF0aXZlU3RhdGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICggbmF0aXZlU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhbCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfTkVXO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2xhdGVkJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9UUkFOU0xBVEVEO1xyXG4gICAgICAgICAgICBjYXNlICdyZXZpZXdlZCc6IC8vIHNhbWUgYXMgdHJhbnNsYXRlZFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX1RSQU5TTEFURUQ7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZpbmFsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9GSU5BTDtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9ORVc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIHRoZSBzb3VyY2UgZWxlbWVudHMgaW4gdGhlIHRyYW5zIHVuaXQuXHJcbiAgICAgKiBUaGUgc291cmNlIGVsZW1lbnQgaXMgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxyXG4gICAgICogSXQgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIHRlbXBsYXRlIGZpbGUgYW5kIGEgbGluZSBudW1iZXIgd2l0aCB0aGUgcG9zaXRpb24gaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGlzIGp1c3QgYSBoZWxwIGZvciB0cmFuc2xhdG9ycyB0byBmaW5kIHRoZSBjb250ZXh0IGZvciB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgKiBUaGlzIGlzIHNldCB3aGVuIHVzaW5nIEFuZ3VsYXIgNC4wIG9yIGdyZWF0ZXIuXHJcbiAgICAgKiBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIGFuIGVtcHR5IGFycmF5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlUmVmZXJlbmNlcygpOiB7c291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyOiBudW1iZXJ9W10ge1xyXG4gICAgICAgIC8vIFNvdXJjZSBpcyBmb3VuZCBhcyA8ZmlsZT46PGxpbmU+IGluIDxub3RlIGNhdGVnb3J5PVwibG9jYXRpb25cIj4uLi5cclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudHMgPSB0aGlzLl9lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdub3RlJyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlUmVmczogeyBzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlciB9W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBub3RlRWxlbSA9IG5vdGVFbGVtZW50cy5pdGVtKGkpO1xyXG4gICAgICAgICAgICBpZiAobm90ZUVsZW0uZ2V0QXR0cmlidXRlKCdjYXRlZ29yeScpID09PSAnbG9jYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VBbmRQb3M6IHN0cmluZyA9IERPTVV0aWxpdGllcy5nZXRQQ0RBVEEobm90ZUVsZW0pO1xyXG4gICAgICAgICAgICAgICAgc291cmNlUmVmcy5wdXNoKHRoaXMucGFyc2VTb3VyY2VBbmRQb3Moc291cmNlQW5kUG9zKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZVJlZnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZXMgc29tZXRoaW5nIGxpa2UgJ2M6XFx4eHg6NycgYW5kIHJldHVybnMgc291cmNlIGFuZCBsaW5lbnVtYmVyLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZUFuZFBvcyBzb21ldGhpbmcgbGlrZSAnYzpcXHh4eDo3JywgbGFzdCBjb2xvbiBpcyB0aGUgc2VwYXJhdG9yXHJcbiAgICAgKiBAcmV0dXJuIHNvdXJjZSBhbmQgbGluZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVNvdXJjZUFuZFBvcyhzb3VyY2VBbmRQb3M6IHN0cmluZyk6IHsgc291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyIH0ge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gc291cmNlQW5kUG9zLmxhc3RJbmRleE9mKCc6Jyk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc291cmNlZmlsZTogc291cmNlQW5kUG9zLFxyXG4gICAgICAgICAgICAgICAgbGluZW51bWJlcjogMFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VmaWxlOiBzb3VyY2VBbmRQb3Muc3Vic3RyaW5nKDAsIGluZGV4KSxcclxuICAgICAgICAgICAgICAgIGxpbmVudW1iZXI6IHRoaXMucGFyc2VMaW5lTnVtYmVyKHNvdXJjZUFuZFBvcy5zdWJzdHJpbmcoaW5kZXggKyAxKSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZUxpbmVOdW1iZXIobGluZU51bWJlclN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGxpbmVOdW1iZXJTdHJpbmcsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzb3VyY2UgcmVmIGVsZW1lbnRzIGluIHRoZSB0cmFuc3VuaXQuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBkb25lIGJ5IG5nLWV4dHJhY3QuXHJcbiAgICAgKiBNZXRob2Qgb25seSBleGlzdHMgdG8gYWxsb3cgeGxpZmZtZXJnZSB0byBtZXJnZSBtaXNzaW5nIHNvdXJjZSByZWZzLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZVJlZnMgdGhlIHNvdXJjZXJlZnMgdG8gc2V0LiBPbGQgb25lcyBhcmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZVJlZmVyZW5jZXMoc291cmNlUmVmczoge3NvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlcjogbnVtYmVyfVtdKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxTb3VyY2VSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgbGV0IG5vdGVzRWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ25vdGVzJyk7XHJcbiAgICAgICAgaWYgKHNvdXJjZVJlZnMubGVuZ3RoID09PSAwICYmICFpc051bGxPclVuZGVmaW5lZChub3Rlc0VsZW1lbnQpICYmIG5vdGVzRWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgZW1wdHkgbm90ZXMgZWxlbWVudFxyXG4gICAgICAgICAgICBub3Rlc0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub3Rlc0VsZW1lbnQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZChub3Rlc0VsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIG5vdGVzRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdub3RlcycpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lmluc2VydEJlZm9yZShub3Rlc0VsZW1lbnQsIHRoaXMuX2VsZW1lbnQuY2hpbGROb2Rlcy5pdGVtKDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc291cmNlUmVmcy5mb3JFYWNoKChyZWYpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZSA9IHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdub3RlJyk7XHJcbiAgICAgICAgICAgIG5vdGUuc2V0QXR0cmlidXRlKCdjYXRlZ29yeScsICdsb2NhdGlvbicpO1xyXG4gICAgICAgICAgICBub3RlLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShyZWYuc291cmNlZmlsZSArICc6JyArIHJlZi5saW5lbnVtYmVyLnRvU3RyaW5nKDEwKSkpO1xyXG4gICAgICAgICAgICBub3Rlc0VsZW1lbnQuYXBwZW5kQ2hpbGQobm90ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVBbGxTb3VyY2VSZWZlcmVuY2VzKCkge1xyXG4gICAgICAgIGNvbnN0IG5vdGVFbGVtZW50cyA9IHRoaXMuX2VsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ25vdGUnKTtcclxuICAgICAgICBjb25zdCB0b0JlUmVtb3ZlZCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBub3RlRWxlbWVudHMuaXRlbShpKTtcclxuICAgICAgICAgICAgaWYgKGVsZW0uZ2V0QXR0cmlidXRlKCdjYXRlZ29yeScpID09PSAnbG9jYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICB0b0JlUmVtb3ZlZC5wdXNoKGVsZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvQmVSZW1vdmVkLmZvckVhY2goKGVsZW0pID0+IHtlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIHNldCBpbiB0aGUgdGVtcGxhdGUgYXMgdmFsdWUgb2YgdGhlIGkxOG4tYXR0cmlidXRlLlxyXG4gICAgICogZS5nLiBpMThuPVwibXlkZXNjcmlwdGlvblwiLlxyXG4gICAgICogSW4geGxpZmYgMi4wIHRoaXMgaXMgc3RvcmVkIGFzIGEgbm90ZSBlbGVtZW50IHdpdGggYXR0cmlidXRlIGNhdGVnb3J5PVwiZGVzY3JpcHRpb25cIi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW0gPSB0aGlzLmZpbmROb3RlRWxlbWVudFdpdGhDYXRlZ29yeUF0dHJpYnV0ZSgnZGVzY3JpcHRpb24nKTtcclxuICAgICAgICBpZiAobm90ZUVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIERPTVV0aWxpdGllcy5nZXRQQ0RBVEEobm90ZUVsZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBkZXNjcmlwdGlvbiBwcm9wZXJ0eSBvZiB0cmFucy11bml0LlxyXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIGRlc2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW0gPSB0aGlzLmZpbmROb3RlRWxlbWVudFdpdGhDYXRlZ29yeUF0dHJpYnV0ZSgnZGVzY3JpcHRpb24nKTtcclxuICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKG5vdGVFbGVtKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGl0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKCdkZXNjcmlwdGlvbicsIGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KG5vdGVFbGVtLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKG5vdGVFbGVtKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG5vZGVcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ2Rlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kIGEgbm90ZSBlbGVtZW50IHdpdGggYXR0cmlidXRlIGNhdGVnb3J5PSc8YXR0clZhbHVlPidcclxuICAgICAqIEBwYXJhbSBhdHRyVmFsdWUgdmFsdWUgb2YgY2F0ZWdvcnkgYXR0cmlidXRlXHJcbiAgICAgKiBAcmV0dXJuIGVsZW1lbnQgb3IgbnVsbCBpcyBhYnNlbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoYXR0clZhbHVlOiBzdHJpbmcpOiBFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudHMgPSB0aGlzLl9lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdub3RlJyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3RlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZUVsZW0gPSBub3RlRWxlbWVudHMuaXRlbShpKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVFbGVtLmdldEF0dHJpYnV0ZSgnY2F0ZWdvcnknKSA9PT0gYXR0clZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm90ZUVsZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIG5vdGUgZWxlbWVudHMgd2hlcmUgZnJvbSBhdHRyaWJ1dGUgaXMgbm90IGRlc2NyaXB0aW9uIG9yIG1lYW5pbmdcclxuICAgICAqIEByZXR1cm4gZWxlbWVudHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmaW5kQWxsQWRkaXRpb25hbE5vdGVFbGVtZW50cygpOiBFbGVtZW50W10ge1xyXG4gICAgICAgIGNvbnN0IG5vdGVFbGVtZW50cyA9IHRoaXMuX2VsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ25vdGUnKTtcclxuICAgICAgICBjb25zdCByZXN1bHQ6IEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGVFbGVtID0gbm90ZUVsZW1lbnRzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb21BdHRyaWJ1dGUgPSBub3RlRWxlbS5nZXRBdHRyaWJ1dGUoJ2NhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgIGlmIChmcm9tQXR0cmlidXRlICE9PSAnZGVzY3JpcHRpb24nICYmIGZyb21BdHRyaWJ1dGUgIT09ICdtZWFuaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm90ZUVsZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgbm90ZSBlbGVtZW50IHdpdGggYXR0cmlidXRlIGZyb209JzxhdHRyVmFsdWU+J1xyXG4gICAgICogQHBhcmFtIGF0dHJWYWx1ZSBjYXRlZ29yeSBhdHRyaWJ1dGUgdmFsdWVcclxuICAgICAqIEBwYXJhbSBjb250ZW50IGNvbnRlbnQgb2Ygbm90ZSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJuIHRoZSBuZXcgY3JlYXRlZCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoYXR0clZhbHVlOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IEVsZW1lbnQge1xyXG4gICAgICAgIGxldCBub3Rlc0VsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdub3RlcycpO1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZChub3Rlc0VsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBpdFxyXG4gICAgICAgICAgICBub3Rlc0VsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbm90ZXMnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZChub3Rlc0VsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdub3RlJyk7XHJcbiAgICAgICAgaWYgKGF0dHJWYWx1ZSkge1xyXG4gICAgICAgICAgICBub3RlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NhdGVnb3J5JywgYXR0clZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgRE9NVXRpbGl0aWVzLnJlcGxhY2VDb250ZW50V2l0aFhNTENvbnRlbnQobm90ZUVsZW1lbnQsIGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub3Rlc0VsZW1lbnQuYXBwZW5kQ2hpbGQobm90ZUVsZW1lbnQpO1xyXG4gICAgICAgIHJldHVybiBub3RlRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vdGVzRWxlbWVudElmRW1wdHkoKSB7XHJcbiAgICAgICAgY29uc3Qgbm90ZXNFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAnbm90ZXMnKTtcclxuICAgICAgICBpZiAobm90ZXNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkTm90ZSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ25vdGUnKTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZE5vdGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBub3RlcyBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBub3Rlc0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub3Rlc0VsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIG5vdGUgZWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBmcm9tPSc8YXR0clZhbHVlPidcclxuICAgICAqIEBwYXJhbSBhdHRyVmFsdWUgYXR0clZhbHVlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoYXR0clZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudCA9IHRoaXMuZmluZE5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKGF0dHJWYWx1ZSk7XHJcbiAgICAgICAgaWYgKG5vdGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIG5vdGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm90ZUVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZU5vdGVzRWxlbWVudElmRW1wdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhbGwgbm90ZSBlbGVtZW50cyB3aGVyZSBhdHRyaWJ1dGUgXCJmcm9tXCIgaXMgbm90IGRlc2NyaXB0aW9uIG9yIG1lYW5pbmcuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVtb3ZlQWxsQWRkaXRpb25hbE5vdGVFbGVtZW50cygpIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudHMgPSB0aGlzLmZpbmRBbGxBZGRpdGlvbmFsTm90ZUVsZW1lbnRzKCk7XHJcbiAgICAgICAgbm90ZUVsZW1lbnRzLmZvckVhY2goKG5vdGVFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIG5vdGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm90ZUVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTm90ZXNFbGVtZW50SWZFbXB0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1lYW5pbmcgKGludGVudCkgc2V0IGluIHRoZSB0ZW1wbGF0ZSBhcyB2YWx1ZSBvZiB0aGUgaTE4bi1hdHRyaWJ1dGUuXHJcbiAgICAgKiBUaGlzIGlzIHRoZSBwYXJ0IGluIGZyb250IG9mIHRoZSB8IHN5bWJvbC5cclxuICAgICAqIGUuZy4gaTE4bj1cIm1lYW5pbmd8bXlkZXNjcmlwdGlvblwiLlxyXG4gICAgICogSW4geGxpZmYgMi4wIHRoaXMgaXMgc3RvcmVkIGFzIGEgbm90ZSBlbGVtZW50IHdpdGggYXR0cmlidXRlIGNhdGVnb3J5PVwibWVhbmluZ1wiLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWVhbmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG5vdGVFbGVtID0gdGhpcy5maW5kTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ21lYW5pbmcnKTtcclxuICAgICAgICBpZiAobm90ZUVsZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIERPTVV0aWxpdGllcy5nZXRQQ0RBVEEobm90ZUVsZW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBtZWFuaW5nIHByb3BlcnR5IG9mIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBAcGFyYW0gbWVhbmluZyBtZWFuaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRNZWFuaW5nKG1lYW5pbmc6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG5vdGVFbGVtID0gdGhpcy5maW5kTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ21lYW5pbmcnKTtcclxuICAgICAgICBpZiAobWVhbmluZykge1xyXG4gICAgICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQobm90ZUVsZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgaXRcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ21lYW5pbmcnLCBtZWFuaW5nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KG5vdGVFbGVtLCBtZWFuaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQobm90ZUVsZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbm9kZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVOb3RlRWxlbWVudFdpdGhDYXRlZ29yeUF0dHJpYnV0ZSgnbWVhbmluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBub3RlcyBvZiB0aGUgdHJhbnMtdW5pdC5cclxuICAgICAqIE5vdGVzIGFyZSByZW1hcmtzIG1hZGUgYnkgYSB0cmFuc2xhdG9yLlxyXG4gICAgICogKGRlc2NyaXB0aW9uIGFuZCBtZWFuaW5nIGFyZSBub3QgaW5jbHVkZWQgaGVyZSEpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RlcygpOiBJTm90ZVtdIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbWVtdHM6IEVsZW1lbnRbXSA9IHRoaXMuZmluZEFsbEFkZGl0aW9uYWxOb3RlRWxlbWVudHMoKTtcclxuICAgICAgICByZXR1cm4gbm90ZUVsZW1lbXRzLm1hcChlbGVtID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGZyb206IGVsZW0uZ2V0QXR0cmlidXRlKCdjYXRlZ29yeScpLFxyXG4gICAgICAgICAgICAgICAgdGV4dDogRE9NVXRpbGl0aWVzLmdldFBDREFUQShlbGVtKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2Ygbm90ZXMgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXROb3RlcyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0Tm90ZXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgbm90ZXMgdG8gdHJhbnMgdW5pdC5cclxuICAgICAqIEBwYXJhbSBuZXdOb3RlcyB0aGUgbm90ZXMgdG8gYWRkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Tm90ZXMobmV3Tm90ZXM6IElOb3RlW10pIHtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKG5ld05vdGVzKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTm90ZXMobmV3Tm90ZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbW92ZUFsbEFkZGl0aW9uYWxOb3RlRWxlbWVudHMoKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKG5ld05vdGVzKSkge1xyXG4gICAgICAgICAgICBuZXdOb3Rlcy5mb3JFYWNoKChub3RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKG5vdGUuZnJvbSwgbm90ZS50ZXh0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB0cmFuc2xhdGlvbiB0byBhIGdpdmVuIHN0cmluZyAoaW5jbHVkaW5nIG1hcmt1cCkuXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRpb24gdHJhbnNsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0ZU5hdGl2ZSh0cmFuc2xhdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3RhcmdldCcpO1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NvdXJjZScpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBzb3VyY2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFyZ2V0JykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudCh0YXJnZXQsIDxzdHJpbmc+IHRyYW5zbGF0aW9uKTtcclxuICAgICAgICB0aGlzLnNldFRhcmdldFN0YXRlKFNUQVRFX1RSQU5TTEFURUQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29weSBzb3VyY2UgdG8gdGFyZ2V0IHRvIHVzZSBpdCBhcyBkdW1teSB0cmFuc2xhdGlvbi5cclxuICAgICAqIFJldHVybnMgYSBjaGFuZ2VkIGNvcHkgb2YgdGhpcyB0cmFucyB1bml0LlxyXG4gICAgICogcmVjZWl2ZXIgaXMgbm90IGNoYW5nZWQuXHJcbiAgICAgKiAoaW50ZXJuYWwgdXNhZ2Ugb25seSwgYSBjbGllbnQgc2hvdWxkIGNhbGwgaW1wb3J0TmV3VHJhbnNVbml0IG9uIElUcmFuc2xhdGlvbk1lc3NhZ2VGaWxlKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvbmVXaXRoU291cmNlQXNUYXJnZXQoaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4sIHRhcmdldEZpbGU6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSk6IEFic3RyYWN0VHJhbnNVbml0IHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gPEVsZW1lbnQ+IHRoaXMuX2VsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGNsb25lID0gbmV3IFhsaWZmMlRyYW5zVW5pdChlbGVtZW50LCB0aGlzLl9pZCwgdGFyZ2V0RmlsZSk7XHJcbiAgICAgICAgY2xvbmUudXNlU291cmNlQXNUYXJnZXQoaXNEZWZhdWx0TGFuZywgY29weUNvbnRlbnQpO1xyXG4gICAgICAgIHJldHVybiBjbG9uZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcHkgc291cmNlIHRvIHRhcmdldCB0byB1c2UgaXQgYXMgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAoaW50ZXJuYWwgdXNhZ2Ugb25seSwgYSBjbGllbnQgc2hvdWxkIGNhbGwgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyBvbiBJVHJhbnNsYXRpb25NZXNzYWdlRmlsZSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVzZVNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAnc291cmNlJyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3RhcmdldCcpO1xyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IHNvdXJjZS5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YXJnZXQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0RlZmF1bHRMYW5nIHx8IGNvcHlDb250ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZVN0cmluZyA9IERPTVV0aWxpdGllcy5nZXRYTUxDb250ZW50KHNvdXJjZSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdUYXJnZXRTdHJpbmcgPSBzb3VyY2VTdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0lDVU1lc3NhZ2Uoc291cmNlU3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3VGFyZ2V0U3RyaW5nID0gdGhpcy50cmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSgpLmdldE5ld1RyYW5zVW5pdFRhcmdldFByYWVmaXgoKVxyXG4gICAgICAgICAgICAgICAgICAgICsgc291cmNlU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgKyB0aGlzLnRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKCkuZ2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRE9NVXRpbGl0aWVzLnJlcGxhY2VDb250ZW50V2l0aFhNTENvbnRlbnQodGFyZ2V0LCBuZXdUYXJnZXRTdHJpbmcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KHRhcmdldCwgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZWdtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAnc2VnbWVudCcpO1xyXG4gICAgICAgIGlmIChzZWdtZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChpc0RlZmF1bHRMYW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzZWdtZW50LnNldEF0dHJpYnV0ZSgnc3RhdGUnLCB0aGlzLm1hcFN0YXRlVG9OYXRpdmVTdGF0ZShTVEFURV9GSU5BTCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5zZXRBdHRyaWJ1dGUoJ3N0YXRlJywgdGhpcy5tYXBTdGF0ZVRvTmF0aXZlU3RhdGUoU1RBVEVfTkVXKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==