/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { STATE_NEW, STATE_TRANSLATED, STATE_FINAL } from '../api/constants';
import { DOMUtilities } from './dom-utilities';
import { AbstractTransUnit } from './abstract-trans-unit';
import { Xliff2MessageParser } from './xliff2-message-parser';
import { isNullOrUndefined } from 'util';
/**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
var /**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
Xliff2TransUnit = /** @class */ (function (_super) {
    tslib_1.__extends(Xliff2TransUnit, _super);
    function Xliff2TransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    /**
     * @return {?}
     */
    Xliff2TransUnit.prototype.sourceContent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        return DOMUtilities.getXMLContent(sourceElement);
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    Xliff2TransUnit.prototype.setSourceContent = /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    function (newContent) {
        /** @type {?} */
        var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (!source) {
            // should not happen, there always has to be a source, but who knows..
            /** @type {?} */
            var segment = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
            source = segment.parentNode.appendChild(this._element.ownerDocument.createElement('source'));
        }
        DOMUtilities.replaceContentWithXMLContent(source, newContent);
    };
    /**
     * Return a parser used for normalized messages.
     */
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    Xliff2TransUnit.prototype.messageParser = /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    function () {
        return new Xliff2MessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    Xliff2TransUnit.prototype.createSourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (sourceElement) {
            return this.messageParser().createNormalizedMessageFromXML(sourceElement, null);
        }
        else {
            return null;
        }
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    Xliff2TransUnit.prototype.targetContent = /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return DOMUtilities.getXMLContent(targetElement);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    Xliff2TransUnit.prototype.targetContentNormalized = /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return new Xliff2MessageParser().createNormalizedMessageFromXML(targetElement, this.sourceContentNormalized());
    };
    /**
     * State of the translation as stored in the xml.
     */
    /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    Xliff2TransUnit.prototype.nativeTargetState = /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var segmentElement = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            return segmentElement.getAttribute('state');
        }
        else {
            return null;
        }
    };
    /**
     * set state in xml.
     * @param nativeState nativeState
     */
    /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    Xliff2TransUnit.prototype.setNativeTargetState = /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        /** @type {?} */
        var segmentElement = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            segmentElement.setAttribute('state', nativeState);
        }
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    Xliff2TransUnit.prototype.mapStateToNativeState = /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    function (state) {
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
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    Xliff2TransUnit.prototype.mapNativeStateToState = /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
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
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    Xliff2TransUnit.prototype.sourceReferences = /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    function () {
        // Source is found as <file>:<line> in <note category="location">...
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var sourceRefs = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === 'location') {
                /** @type {?} */
                var sourceAndPos = DOMUtilities.getPCDATA(noteElem);
                sourceRefs.push(this.parseSourceAndPos(sourceAndPos));
            }
        }
        return sourceRefs;
    };
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @param sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return source and line number
     */
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and line number
     */
    Xliff2TransUnit.prototype.parseSourceAndPos = /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and line number
     */
    function (sourceAndPos) {
        /** @type {?} */
        var index = sourceAndPos.lastIndexOf(':');
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
    };
    /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    Xliff2TransUnit.prototype.parseLineNumber = /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    function (lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    Xliff2TransUnit.prototype.setSourceReferences = /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    function (sourceRefs) {
        var _this = this;
        this.removeAllSourceReferences();
        /** @type {?} */
        var notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
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
        function (ref) {
            /** @type {?} */
            var note = _this._element.ownerDocument.createElement('note');
            note.setAttribute('category', 'location');
            note.appendChild(_this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            notesElement.appendChild(note);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeAllSourceReferences = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var toBeRemoved = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var elem = noteElements.item(i);
            if (elem.getAttribute('category') === 'location') {
                toBeRemoved.push(elem);
            }
        }
        toBeRemoved.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) { elem.parentNode.removeChild(elem); }));
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     */
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     * @return {?}
     */
    Xliff2TransUnit.prototype.description = /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('description');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    Xliff2TransUnit.prototype.setDescription = /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    function (description) {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('description');
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
    };
    /**
     * Find a note element with attribute category='<attrValue>'
     * @param attrValue value of category attribute
     * @return element or null is absent
     */
    /**
     * Find a note element with attribute category='<attrValue>'
     * @private
     * @param {?} attrValue value of category attribute
     * @return {?} element or null is absent
     */
    Xliff2TransUnit.prototype.findNoteElementWithCategoryAttribute = /**
     * Find a note element with attribute category='<attrValue>'
     * @private
     * @param {?} attrValue value of category attribute
     * @return {?} element or null is absent
     */
    function (attrValue) {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === attrValue) {
                return noteElem;
            }
        }
        return null;
    };
    /**
     * Get all note elements where from attribute is not description or meaning
     * @return elements
     */
    /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    Xliff2TransUnit.prototype.findAllAdditionalNoteElements = /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    function () {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var result = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            /** @type {?} */
            var fromAttribute = noteElem.getAttribute('category');
            if (fromAttribute !== 'description' && fromAttribute !== 'meaning') {
                result.push(noteElem);
            }
        }
        return result;
    };
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @param attrValue category attribute value
     * @param content content of note element
     * @return the new created element
     */
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue category attribute value
     * @param {?} content content of note element
     * @return {?} the new created element
     */
    Xliff2TransUnit.prototype.createNoteElementWithCategoryAttribute = /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue category attribute value
     * @param {?} content content of note element
     * @return {?} the new created element
     */
    function (attrValue, content) {
        /** @type {?} */
        var notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (isNullOrUndefined(notesElement)) {
            // create it
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.appendChild(notesElement);
        }
        /** @type {?} */
        var noteElement = this._element.ownerDocument.createElement('note');
        if (attrValue) {
            noteElement.setAttribute('category', attrValue);
        }
        if (content) {
            DOMUtilities.replaceContentWithXMLContent(noteElement, content);
        }
        notesElement.appendChild(noteElement);
        return noteElement;
    };
    /**
     * @private
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeNotesElementIfEmpty = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (notesElement) {
            /** @type {?} */
            var childNote = DOMUtilities.getFirstElementByTagName(this._element, 'note');
            if (!childNote) {
                // remove notes element
                notesElement.parentNode.removeChild(notesElement);
            }
        }
    };
    /**
     * Remove note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     */
    /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeNoteElementWithCategoryAttribute = /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    function (attrValue) {
        /** @type {?} */
        var noteElement = this.findNoteElementWithCategoryAttribute(attrValue);
        if (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        }
        this.removeNotesElementIfEmpty();
    };
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     */
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeAllAdditionalNoteElements = /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElements = this.findAllAdditionalNoteElements();
        noteElements.forEach((/**
         * @param {?} noteElement
         * @return {?}
         */
        function (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        }));
        this.removeNotesElementIfEmpty();
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     */
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     * @return {?}
     */
    Xliff2TransUnit.prototype.meaning = /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    Xliff2TransUnit.prototype.setMeaning = /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    function (meaning) {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('meaning');
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
    };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     */
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    Xliff2TransUnit.prototype.notes = /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElememts = this.findAllAdditionalNoteElements();
        return noteElememts.map((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            return {
                from: elem.getAttribute('category'),
                text: DOMUtilities.getPCDATA(elem)
            };
        }));
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    Xliff2TransUnit.prototype.supportsSetNotes = /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     */
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    Xliff2TransUnit.prototype.setNotes = /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    function (newNotes) {
        var _this = this;
        if (!isNullOrUndefined(newNotes)) {
            this.checkNotes(newNotes);
        }
        this.removeAllAdditionalNoteElements();
        if (!isNullOrUndefined(newNotes)) {
            newNotes.forEach((/**
             * @param {?} note
             * @return {?}
             */
            function (note) {
                _this.createNoteElementWithCategoryAttribute(note.from, note.text);
            }));
        }
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    Xliff2TransUnit.prototype.translateNative = /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            /** @type {?} */
            var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
        }
        DOMUtilities.replaceContentWithXMLContent(target, (/** @type {?} */ (translation)));
        this.setTargetState(STATE_TRANSLATED);
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     */
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
    Xliff2TransUnit.prototype.cloneWithSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    function (isDefaultLang, copyContent, targetFile) {
        /** @type {?} */
        var element = (/** @type {?} */ (this._element.cloneNode(true)));
        /** @type {?} */
        var clone = new Xliff2TransUnit(element, this._id, targetFile);
        clone.useSourceAsTarget(isDefaultLang, copyContent);
        return clone;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    Xliff2TransUnit.prototype.useSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    function (isDefaultLang, copyContent) {
        /** @type {?} */
        var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        /** @type {?} */
        var target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
        }
        if (isDefaultLang || copyContent) {
            /** @type {?} */
            var sourceString = DOMUtilities.getXMLContent(source);
            /** @type {?} */
            var newTargetString = sourceString;
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
        var segment = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segment) {
            if (isDefaultLang) {
                segment.setAttribute('state', this.mapStateToNativeState(STATE_FINAL));
            }
            else {
                segment.setAttribute('state', this.mapStateToNativeState(STATE_NEW));
            }
        }
    };
    return Xliff2TransUnit;
}(AbstractTransUnit));
/**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
export { Xliff2TransUnit };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyLXRyYW5zLXVuaXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3hsaWZmMi10cmFucy11bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUsxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sTUFBTSxDQUFDOzs7OztBQU12Qzs7Ozs7SUFBcUMsMkNBQWlCO0lBRWxELHlCQUFZLFFBQWlCLEVBQUUsR0FBVyxFQUFFLHdCQUFrRDtlQUMxRixrQkFBTSxRQUFRLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixDQUFDO0lBQ2xELENBQUM7Ozs7SUFFTSx1Q0FBYTs7O0lBQXBCOztZQUNVLGFBQWEsR0FBRyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDcEYsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSSwwQ0FBZ0I7Ozs7Ozs7SUFBdkIsVUFBd0IsVUFBa0I7O1lBQ2xDLE1BQU0sR0FBRyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sRUFBRTs7O2dCQUVILE9BQU8sR0FBRyxZQUFZLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7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QUMvRSxJQUFJLE9BQU8sRUFBRTtZQUNULElBQUksYUFBYSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQzFFO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3hFO1NBQ0o7SUFDTCxDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQUFDLEFBdmRELENBQXFDLGlCQUFpQixHQXVkckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NUQVRFX05FVywgU1RBVEVfVFJBTlNMQVRFRCwgU1RBVEVfRklOQUx9IGZyb20gJy4uL2FwaS9jb25zdGFudHMnO1xyXG5pbXBvcnQge0lUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi4vYXBpL2ktdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZSc7XHJcbmltcG9ydCB7SU5vcm1hbGl6ZWRNZXNzYWdlfSBmcm9tICcuLi9hcGkvaS1ub3JtYWxpemVkLW1lc3NhZ2UnO1xyXG5pbXBvcnQge0lUcmFuc1VuaXR9IGZyb20gJy4uL2FwaS9pLXRyYW5zLXVuaXQnO1xyXG5pbXBvcnQge0lOb3RlfSBmcm9tICcuLi9hcGkvaS1ub3RlJztcclxuaW1wb3J0IHtET01VdGlsaXRpZXN9IGZyb20gJy4vZG9tLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RUcmFuc1VuaXR9IGZyb20gJy4vYWJzdHJhY3QtdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7WGxpZmYyTWVzc2FnZVBhcnNlcn0gZnJvbSAnLi94bGlmZjItbWVzc2FnZS1wYXJzZXInO1xyXG5pbXBvcnQge0Fic3RyYWN0TWVzc2FnZVBhcnNlcn0gZnJvbSAnLi9hYnN0cmFjdC1tZXNzYWdlLXBhcnNlcic7XHJcbmltcG9ydCB7aXNOdWxsT3JVbmRlZmluZWR9IGZyb20gJ3V0aWwnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDQuMDUuMjAxNy5cclxuICogQSBUcmFuc2xhdGlvbiBVbml0IGluIGFuIFhMSUZGIDIuMCBmaWxlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBYbGlmZjJUcmFuc1VuaXQgZXh0ZW5kcyBBYnN0cmFjdFRyYW5zVW5pdCAgaW1wbGVtZW50cyBJVHJhbnNVbml0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudDogRWxlbWVudCwgX2lkOiBzdHJpbmcsIF90cmFuc2xhdGlvbk1lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKSB7XHJcbiAgICAgICAgc3VwZXIoX2VsZW1lbnQsIF9pZCwgX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc291cmNlQ29udGVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdzb3VyY2UnKTtcclxuICAgICAgICByZXR1cm4gRE9NVXRpbGl0aWVzLmdldFhNTENvbnRlbnQoc291cmNlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IHNvdXJjZSBjb250ZW50IGluIHRoZSB0cmFuc3VuaXQuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBkb25lIGJ5IG5nLWV4dHJhY3QuXHJcbiAgICAgKiBNZXRob2Qgb25seSBleGlzdHMgdG8gYWxsb3cgeGxpZmZtZXJnZSB0byBtZXJnZSBtaXNzaW5nIGNoYW5nZWQgc291cmNlIGNvbnRlbnQuXHJcbiAgICAgKiBAcGFyYW0gbmV3Q29udGVudCB0aGUgbmV3IGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTb3VyY2VDb250ZW50KG5ld0NvbnRlbnQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzb3VyY2UgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdzb3VyY2UnKTtcclxuICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAvLyBzaG91bGQgbm90IGhhcHBlbiwgdGhlcmUgYWx3YXlzIGhhcyB0byBiZSBhIHNvdXJjZSwgYnV0IHdobyBrbm93cy4uXHJcbiAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdzZWdtZW50Jyk7XHJcbiAgICAgICAgICAgIHNvdXJjZSA9IHNlZ21lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudChzb3VyY2UsIG5ld0NvbnRlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgcGFyc2VyIHVzZWQgZm9yIG5vcm1hbGl6ZWQgbWVzc2FnZXMuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBtZXNzYWdlUGFyc2VyKCk6IEFic3RyYWN0TWVzc2FnZVBhcnNlciB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBYbGlmZjJNZXNzYWdlUGFyc2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3JpZ2luYWwgdGV4dCB2YWx1ZSwgdGhhdCBpcyB0byBiZSB0cmFuc2xhdGVkLCBhcyBub3JtYWxpemVkIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVTb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpOiBQYXJzZWRNZXNzYWdlIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAnc291cmNlJyk7XHJcbiAgICAgICAgaWYgKHNvdXJjZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZVBhcnNlcigpLmNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTChzb3VyY2VFbGVtZW50LCBudWxsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgdHJhbnNsYXRlZCB2YWx1ZSAoY29udGFpbmluZyBhbGwgbWFya3VwLCBkZXBlbmRzIG9uIHRoZSBjb25jcmV0ZSBmb3JtYXQgdXNlZCkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0YXJnZXRDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3RhcmdldCcpO1xyXG4gICAgICAgIHJldHVybiBET01VdGlsaXRpZXMuZ2V0WE1MQ29udGVudCh0YXJnZXRFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB0cmFuc2xhdGVkIHZhbHVlLCBidXQgYWxsIHBsYWNlaG9sZGVycyBhcmUgcmVwbGFjZWQgd2l0aCB7e259fSAoc3RhcnRpbmcgYXQgMClcclxuICAgICAqIGFuZCBhbGwgZW1iZWRkZWQgaHRtbCBpcyByZXBsYWNlZCBieSBkaXJlY3QgaHRtbCBtYXJrdXAuXHJcbiAgICAgKi9cclxuICAgIHRhcmdldENvbnRlbnROb3JtYWxpemVkKCk6IElOb3JtYWxpemVkTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3RhcmdldCcpO1xyXG4gICAgICAgIHJldHVybiBuZXcgWGxpZmYyTWVzc2FnZVBhcnNlcigpLmNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTCh0YXJnZXRFbGVtZW50LCB0aGlzLnNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgb2YgdGhlIHRyYW5zbGF0aW9uIGFzIHN0b3JlZCBpbiB0aGUgeG1sLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmF0aXZlVGFyZ2V0U3RhdGUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBzZWdtZW50RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NlZ21lbnQnKTtcclxuICAgICAgICBpZiAoc2VnbWVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlZ21lbnRFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3RhdGUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgc3RhdGUgaW4geG1sLlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0YXRlIG5hdGl2ZVN0YXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXROYXRpdmVUYXJnZXRTdGF0ZShuYXRpdmVTdGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgc2VnbWVudEVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdzZWdtZW50Jyk7XHJcbiAgICAgICAgaWYgKHNlZ21lbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHNlZ21lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3RhdGUnLCBuYXRpdmVTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIGFuIGFic3RyYWN0IHN0YXRlIChuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKSB0byBhIGNvbmNyZXRlIHN0YXRlIHVzZWQgaW4gdGhlIHhtbC5cclxuICAgICAqIFJldHVybnMgdGhlIHN0YXRlIHRvIGJlIHVzZWQgaW4gdGhlIHhtbC5cclxuICAgICAqIEBwYXJhbSBzdGF0ZSBvbmUgb2YgQ29uc3RhbnRzLlNUQVRFLi4uXHJcbiAgICAgKiBAcmV0dXJucyBhIG5hdGl2ZSBzdGF0ZSAoZGVwZW5kcyBvbiBjb25jcmV0ZSBmb3JtYXQpXHJcbiAgICAgKiBAdGhyb3dzIGVycm9yLCBpZiBzdGF0ZSBpcyBpbnZhbGlkLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwU3RhdGVUb05hdGl2ZVN0YXRlKHN0YXRlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoIHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU1RBVEVfTkVXOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbml0aWFsJztcclxuICAgICAgICAgICAgY2FzZSBTVEFURV9UUkFOU0xBVEVEOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGVkJztcclxuICAgICAgICAgICAgY2FzZSBTVEFURV9GSU5BTDpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZmluYWwnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtub3duIHN0YXRlICcgKyAgc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcCBhIG5hdGl2ZSBzdGF0ZSAoZm91bmQgaW4gdGhlIGRvY3VtZW50KSB0byBhbiBhYnN0cmFjdCBzdGF0ZSAobmV3LCB0cmFuc2xhdGVkLCBmaW5hbCkuXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhYnN0cmFjdCBzdGF0ZS5cclxuICAgICAqIEBwYXJhbSBuYXRpdmVTdGF0ZSBuYXRpdmVTdGF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwTmF0aXZlU3RhdGVUb1N0YXRlKG5hdGl2ZVN0YXRlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoIG5hdGl2ZVN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYWwnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNUQVRFX05FVztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNsYXRlZCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfVFJBTlNMQVRFRDtcclxuICAgICAgICAgICAgY2FzZSAncmV2aWV3ZWQnOiAvLyBzYW1lIGFzIHRyYW5zbGF0ZWRcclxuICAgICAgICAgICAgICAgIHJldHVybiBTVEFURV9UUkFOU0xBVEVEO1xyXG4gICAgICAgICAgICBjYXNlICdmaW5hbCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfRklOQUw7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU1RBVEVfTkVXO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCB0aGUgc291cmNlIGVsZW1lbnRzIGluIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICogVGhlIHNvdXJjZSBlbGVtZW50IGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGNvbnRhaW5zIHRoZSBuYW1lIG9mIHRoZSB0ZW1wbGF0ZSBmaWxlIGFuZCBhIGxpbmUgbnVtYmVyIHdpdGggdGhlIHBvc2l0aW9uIGluc2lkZSB0aGUgdGVtcGxhdGUuXHJcbiAgICAgKiBJdCBpcyBqdXN0IGEgaGVscCBmb3IgdHJhbnNsYXRvcnMgdG8gZmluZCB0aGUgY29udGV4dCBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG4gICAgICogVGhpcyBpcyBzZXQgd2hlbiB1c2luZyBBbmd1bGFyIDQuMCBvciBncmVhdGVyLlxyXG4gICAgICogT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyBhbiBlbXB0eSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNvdXJjZVJlZmVyZW5jZXMoKToge3NvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlcjogbnVtYmVyfVtdIHtcclxuICAgICAgICAvLyBTb3VyY2UgaXMgZm91bmQgYXMgPGZpbGU+OjxsaW5lPiBpbiA8bm90ZSBjYXRlZ29yeT1cImxvY2F0aW9uXCI+Li4uXHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW1lbnRzID0gdGhpcy5fZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbm90ZScpO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZVJlZnM6IHsgc291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyOiBudW1iZXIgfVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3RlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgbm90ZUVsZW0gPSBub3RlRWxlbWVudHMuaXRlbShpKTtcclxuICAgICAgICAgICAgaWYgKG5vdGVFbGVtLmdldEF0dHJpYnV0ZSgnY2F0ZWdvcnknKSA9PT0gJ2xvY2F0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlQW5kUG9zOiBzdHJpbmcgPSBET01VdGlsaXRpZXMuZ2V0UENEQVRBKG5vdGVFbGVtKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZVJlZnMucHVzaCh0aGlzLnBhcnNlU291cmNlQW5kUG9zKHNvdXJjZUFuZFBvcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzb3VyY2VSZWZzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VzIHNvbWV0aGluZyBsaWtlICdjOlxceHh4OjcnIGFuZCByZXR1cm5zIHNvdXJjZSBhbmQgbGluZW51bWJlci5cclxuICAgICAqIEBwYXJhbSBzb3VyY2VBbmRQb3Mgc29tZXRoaW5nIGxpa2UgJ2M6XFx4eHg6NycsIGxhc3QgY29sb24gaXMgdGhlIHNlcGFyYXRvclxyXG4gICAgICogQHJldHVybiBzb3VyY2UgYW5kIGxpbmUgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VTb3VyY2VBbmRQb3Moc291cmNlQW5kUG9zOiBzdHJpbmcpOiB7IHNvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlciB9IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHNvdXJjZUFuZFBvcy5sYXN0SW5kZXhPZignOicpO1xyXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZWZpbGU6IHNvdXJjZUFuZFBvcyxcclxuICAgICAgICAgICAgICAgIGxpbmVudW1iZXI6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc291cmNlZmlsZTogc291cmNlQW5kUG9zLnN1YnN0cmluZygwLCBpbmRleCksXHJcbiAgICAgICAgICAgICAgICBsaW5lbnVtYmVyOiB0aGlzLnBhcnNlTGluZU51bWJlcihzb3VyY2VBbmRQb3Muc3Vic3RyaW5nKGluZGV4ICsgMSkpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFyc2VMaW5lTnVtYmVyKGxpbmVOdW1iZXJTdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludChsaW5lTnVtYmVyU3RyaW5nLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc291cmNlIHJlZiBlbGVtZW50cyBpbiB0aGUgdHJhbnN1bml0LlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMgZG9uZSBieSBuZy1leHRyYWN0LlxyXG4gICAgICogTWV0aG9kIG9ubHkgZXhpc3RzIHRvIGFsbG93IHhsaWZmbWVyZ2UgdG8gbWVyZ2UgbWlzc2luZyBzb3VyY2UgcmVmcy5cclxuICAgICAqIEBwYXJhbSBzb3VyY2VSZWZzIHRoZSBzb3VyY2VyZWZzIHRvIHNldC4gT2xkIG9uZXMgYXJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTb3VyY2VSZWZlcmVuY2VzKHNvdXJjZVJlZnM6IHtzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlcn1bXSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsU291cmNlUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIGxldCBub3Rlc0VsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdub3RlcycpO1xyXG4gICAgICAgIGlmIChzb3VyY2VSZWZzLmxlbmd0aCA9PT0gMCAmJiAhaXNOdWxsT3JVbmRlZmluZWQobm90ZXNFbGVtZW50KSAmJiBub3Rlc0VsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGVtcHR5IG5vdGVzIGVsZW1lbnRcclxuICAgICAgICAgICAgbm90ZXNFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm90ZXNFbGVtZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQobm90ZXNFbGVtZW50KSkge1xyXG4gICAgICAgICAgICBub3Rlc0VsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbm90ZXMnKTtcclxuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5pbnNlcnRCZWZvcmUobm90ZXNFbGVtZW50LCB0aGlzLl9lbGVtZW50LmNoaWxkTm9kZXMuaXRlbSgwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNvdXJjZVJlZnMuZm9yRWFjaCgocmVmKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGUgPSB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbm90ZScpO1xyXG4gICAgICAgICAgICBub3RlLnNldEF0dHJpYnV0ZSgnY2F0ZWdvcnknLCAnbG9jYXRpb24nKTtcclxuICAgICAgICAgICAgbm90ZS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocmVmLnNvdXJjZWZpbGUgKyAnOicgKyByZWYubGluZW51bWJlci50b1N0cmluZygxMCkpKTtcclxuICAgICAgICAgICAgbm90ZXNFbGVtZW50LmFwcGVuZENoaWxkKG5vdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQWxsU291cmNlUmVmZXJlbmNlcygpIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudHMgPSB0aGlzLl9lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdub3RlJyk7XHJcbiAgICAgICAgY29uc3QgdG9CZVJlbW92ZWQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gbm90ZUVsZW1lbnRzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtLmdldEF0dHJpYnV0ZSgnY2F0ZWdvcnknKSA9PT0gJ2xvY2F0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdG9CZVJlbW92ZWQucHVzaChlbGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0b0JlUmVtb3ZlZC5mb3JFYWNoKChlbGVtKSA9PiB7ZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiBzZXQgaW4gdGhlIHRlbXBsYXRlIGFzIHZhbHVlIG9mIHRoZSBpMThuLWF0dHJpYnV0ZS5cclxuICAgICAqIGUuZy4gaTE4bj1cIm15ZGVzY3JpcHRpb25cIi5cclxuICAgICAqIEluIHhsaWZmIDIuMCB0aGlzIGlzIHN0b3JlZCBhcyBhIG5vdGUgZWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBjYXRlZ29yeT1cImRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG5vdGVFbGVtID0gdGhpcy5maW5kTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ2Rlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgaWYgKG5vdGVFbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBET01VdGlsaXRpZXMuZ2V0UENEQVRBKG5vdGVFbGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgZGVzY3JpcHRpb24gcHJvcGVydHkgb2YgdHJhbnMtdW5pdC5cclxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiBkZXNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG5vdGVFbGVtID0gdGhpcy5maW5kTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ2Rlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgaWYgKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZChub3RlRWxlbSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBpdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOb3RlRWxlbWVudFdpdGhDYXRlZ29yeUF0dHJpYnV0ZSgnZGVzY3JpcHRpb24nLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudChub3RlRWxlbSwgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChub3RlRWxlbSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBub2RlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKCdkZXNjcmlwdGlvbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBhIG5vdGUgZWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBjYXRlZ29yeT0nPGF0dHJWYWx1ZT4nXHJcbiAgICAgKiBAcGFyYW0gYXR0clZhbHVlIHZhbHVlIG9mIGNhdGVnb3J5IGF0dHJpYnV0ZVxyXG4gICAgICogQHJldHVybiBlbGVtZW50IG9yIG51bGwgaXMgYWJzZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZE5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKGF0dHJWYWx1ZTogc3RyaW5nKTogRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW1lbnRzID0gdGhpcy5fZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbm90ZScpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm90ZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGVFbGVtID0gbm90ZUVsZW1lbnRzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIGlmIChub3RlRWxlbS5nZXRBdHRyaWJ1dGUoJ2NhdGVnb3J5JykgPT09IGF0dHJWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGVFbGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBub3RlIGVsZW1lbnRzIHdoZXJlIGZyb20gYXR0cmlidXRlIGlzIG5vdCBkZXNjcmlwdGlvbiBvciBtZWFuaW5nXHJcbiAgICAgKiBAcmV0dXJuIGVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZmluZEFsbEFkZGl0aW9uYWxOb3RlRWxlbWVudHMoKTogRWxlbWVudFtdIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbWVudHMgPSB0aGlzLl9lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdub3RlJyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0OiBFbGVtZW50W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vdGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBub3RlRWxlbSA9IG5vdGVFbGVtZW50cy5pdGVtKGkpO1xyXG4gICAgICAgICAgICBjb25zdCBmcm9tQXR0cmlidXRlID0gbm90ZUVsZW0uZ2V0QXR0cmlidXRlKCdjYXRlZ29yeScpO1xyXG4gICAgICAgICAgICBpZiAoZnJvbUF0dHJpYnV0ZSAhPT0gJ2Rlc2NyaXB0aW9uJyAmJiBmcm9tQXR0cmlidXRlICE9PSAnbWVhbmluZycpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vdGVFbGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IG5vdGUgZWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBmcm9tPSc8YXR0clZhbHVlPidcclxuICAgICAqIEBwYXJhbSBhdHRyVmFsdWUgY2F0ZWdvcnkgYXR0cmlidXRlIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCBjb250ZW50IG9mIG5vdGUgZWxlbWVudFxyXG4gICAgICogQHJldHVybiB0aGUgbmV3IGNyZWF0ZWQgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZU5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKGF0dHJWYWx1ZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBFbGVtZW50IHtcclxuICAgICAgICBsZXQgbm90ZXNFbGVtZW50ID0gRE9NVXRpbGl0aWVzLmdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZSh0aGlzLl9lbGVtZW50LCAnbm90ZXMnKTtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQobm90ZXNFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgaXRcclxuICAgICAgICAgICAgbm90ZXNFbGVtZW50ID0gdGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25vdGVzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQobm90ZXNFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbm90ZScpO1xyXG4gICAgICAgIGlmIChhdHRyVmFsdWUpIHtcclxuICAgICAgICAgICAgbm90ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjYXRlZ29yeScsIGF0dHJWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KG5vdGVFbGVtZW50LCBjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm90ZXNFbGVtZW50LmFwcGVuZENoaWxkKG5vdGVFbGVtZW50KTtcclxuICAgICAgICByZXR1cm4gbm90ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVOb3Rlc0VsZW1lbnRJZkVtcHR5KCkge1xyXG4gICAgICAgIGNvbnN0IG5vdGVzRWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ25vdGVzJyk7XHJcbiAgICAgICAgaWYgKG5vdGVzRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZE5vdGUgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdub3RlJyk7XHJcbiAgICAgICAgICAgIGlmICghY2hpbGROb3RlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgbm90ZXMgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgbm90ZXNFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm90ZXNFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBub3RlIGVsZW1lbnQgd2l0aCBhdHRyaWJ1dGUgZnJvbT0nPGF0dHJWYWx1ZT4nXHJcbiAgICAgKiBAcGFyYW0gYXR0clZhbHVlIGF0dHJWYWx1ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZU5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKGF0dHJWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW1lbnQgPSB0aGlzLmZpbmROb3RlRWxlbWVudFdpdGhDYXRlZ29yeUF0dHJpYnV0ZShhdHRyVmFsdWUpO1xyXG4gICAgICAgIGlmIChub3RlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBub3RlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vdGVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmVOb3Rlc0VsZW1lbnRJZkVtcHR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgYWxsIG5vdGUgZWxlbWVudHMgd2hlcmUgYXR0cmlidXRlIFwiZnJvbVwiIGlzIG5vdCBkZXNjcmlwdGlvbiBvciBtZWFuaW5nLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHJlbW92ZUFsbEFkZGl0aW9uYWxOb3RlRWxlbWVudHMoKSB7XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW1lbnRzID0gdGhpcy5maW5kQWxsQWRkaXRpb25hbE5vdGVFbGVtZW50cygpO1xyXG4gICAgICAgIG5vdGVFbGVtZW50cy5mb3JFYWNoKChub3RlRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBub3RlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vdGVFbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlbW92ZU5vdGVzRWxlbWVudElmRW1wdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtZWFuaW5nIChpbnRlbnQpIHNldCBpbiB0aGUgdGVtcGxhdGUgYXMgdmFsdWUgb2YgdGhlIGkxOG4tYXR0cmlidXRlLlxyXG4gICAgICogVGhpcyBpcyB0aGUgcGFydCBpbiBmcm9udCBvZiB0aGUgfCBzeW1ib2wuXHJcbiAgICAgKiBlLmcuIGkxOG49XCJtZWFuaW5nfG15ZGVzY3JpcHRpb25cIi5cclxuICAgICAqIEluIHhsaWZmIDIuMCB0aGlzIGlzIHN0b3JlZCBhcyBhIG5vdGUgZWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBjYXRlZ29yeT1cIm1lYW5pbmdcIi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG1lYW5pbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbSA9IHRoaXMuZmluZE5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKCdtZWFuaW5nJyk7XHJcbiAgICAgICAgaWYgKG5vdGVFbGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBET01VdGlsaXRpZXMuZ2V0UENEQVRBKG5vdGVFbGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgbWVhbmluZyBwcm9wZXJ0eSBvZiB0cmFucy11bml0LlxyXG4gICAgICogQHBhcmFtIG1lYW5pbmcgbWVhbmluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0TWVhbmluZyhtZWFuaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBub3RlRWxlbSA9IHRoaXMuZmluZE5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKCdtZWFuaW5nJyk7XHJcbiAgICAgICAgaWYgKG1lYW5pbmcpIHtcclxuICAgICAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKG5vdGVFbGVtKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlIGl0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU5vdGVFbGVtZW50V2l0aENhdGVnb3J5QXR0cmlidXRlKCdtZWFuaW5nJywgbWVhbmluZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudChub3RlRWxlbSwgbWVhbmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKG5vdGVFbGVtKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG5vZGVcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTm90ZUVsZW1lbnRXaXRoQ2F0ZWdvcnlBdHRyaWJ1dGUoJ21lYW5pbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgbm90ZXMgb2YgdGhlIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBOb3RlcyBhcmUgcmVtYXJrcyBtYWRlIGJ5IGEgdHJhbnNsYXRvci5cclxuICAgICAqIChkZXNjcmlwdGlvbiBhbmQgbWVhbmluZyBhcmUgbm90IGluY2x1ZGVkIGhlcmUhKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbm90ZXMoKTogSU5vdGVbXSB7XHJcbiAgICAgICAgY29uc3Qgbm90ZUVsZW1lbXRzOiBFbGVtZW50W10gPSB0aGlzLmZpbmRBbGxBZGRpdGlvbmFsTm90ZUVsZW1lbnRzKCk7XHJcbiAgICAgICAgcmV0dXJuIG5vdGVFbGVtZW10cy5tYXAoZWxlbSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBmcm9tOiBlbGVtLmdldEF0dHJpYnV0ZSgnY2F0ZWdvcnknKSxcclxuICAgICAgICAgICAgICAgIHRleHQ6IERPTVV0aWxpdGllcy5nZXRQQ0RBVEEoZWxlbSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIG5vdGVzIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0Tm90ZXMgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdXBwb3J0c1NldE5vdGVzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG5vdGVzIHRvIHRyYW5zIHVuaXQuXHJcbiAgICAgKiBAcGFyYW0gbmV3Tm90ZXMgdGhlIG5vdGVzIHRvIGFkZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldE5vdGVzKG5ld05vdGVzOiBJTm90ZVtdKSB7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChuZXdOb3RlcykpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja05vdGVzKG5ld05vdGVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxBZGRpdGlvbmFsTm90ZUVsZW1lbnRzKCk7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChuZXdOb3RlcykpIHtcclxuICAgICAgICAgICAgbmV3Tm90ZXMuZm9yRWFjaCgobm90ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOb3RlRWxlbWVudFdpdGhDYXRlZ29yeUF0dHJpYnV0ZShub3RlLmZyb20sIG5vdGUudGV4dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdHJhbnNsYXRpb24gdG8gYSBnaXZlbiBzdHJpbmcgKGluY2x1ZGluZyBtYXJrdXApLlxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uIHRyYW5zbGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVOYXRpdmUodHJhbnNsYXRpb246IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICd0YXJnZXQnKTtcclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICdzb3VyY2UnKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gc291cmNlLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudC5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhcmdldCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRE9NVXRpbGl0aWVzLnJlcGxhY2VDb250ZW50V2l0aFhNTENvbnRlbnQodGFyZ2V0LCA8c3RyaW5nPiB0cmFuc2xhdGlvbik7XHJcbiAgICAgICAgdGhpcy5zZXRUYXJnZXRTdGF0ZShTVEFURV9UUkFOU0xBVEVEKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcHkgc291cmNlIHRvIHRhcmdldCB0byB1c2UgaXQgYXMgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiBSZXR1cm5zIGEgY2hhbmdlZCBjb3B5IG9mIHRoaXMgdHJhbnMgdW5pdC5cclxuICAgICAqIHJlY2VpdmVyIGlzIG5vdCBjaGFuZ2VkLlxyXG4gICAgICogKGludGVybmFsIHVzYWdlIG9ubHksIGEgY2xpZW50IHNob3VsZCBjYWxsIGltcG9ydE5ld1RyYW5zVW5pdCBvbiBJVHJhbnNsYXRpb25NZXNzYWdlRmlsZSlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lV2l0aFNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuLCB0YXJnZXRGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpOiBBYnN0cmFjdFRyYW5zVW5pdCB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IDxFbGVtZW50PiB0aGlzLl9lbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICBjb25zdCBjbG9uZSA9IG5ldyBYbGlmZjJUcmFuc1VuaXQoZWxlbWVudCwgdGhpcy5faWQsIHRhcmdldEZpbGUpO1xyXG4gICAgICAgIGNsb25lLnVzZVNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmcsIGNvcHlDb250ZW50KTtcclxuICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHNvdXJjZSB0byB0YXJnZXQgdG8gdXNlIGl0IGFzIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogKGludGVybmFsIHVzYWdlIG9ubHksIGEgY2xpZW50IHNob3VsZCBjYWxsIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcgb24gSVRyYW5zbGF0aW9uTWVzc2FnZUZpbGUpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NvdXJjZScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHRoaXMuX2VsZW1lbnQsICd0YXJnZXQnKTtcclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBzb3VyY2UucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGFyZ2V0JykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNEZWZhdWx0TGFuZyB8fCBjb3B5Q29udGVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VTdHJpbmcgPSBET01VdGlsaXRpZXMuZ2V0WE1MQ29udGVudChzb3VyY2UpO1xyXG4gICAgICAgICAgICBsZXQgbmV3VGFyZ2V0U3RyaW5nID0gc291cmNlU3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJQ1VNZXNzYWdlKHNvdXJjZVN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIG5ld1RhcmdldFN0cmluZyA9IHRoaXMudHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUoKS5nZXROZXdUcmFuc1VuaXRUYXJnZXRQcmFlZml4KClcclxuICAgICAgICAgICAgICAgICAgICArIHNvdXJjZVN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICsgdGhpcy50cmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSgpLmdldE5ld1RyYW5zVW5pdFRhcmdldFN1ZmZpeCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIERPTVV0aWxpdGllcy5yZXBsYWNlQ29udGVudFdpdGhYTUxDb250ZW50KHRhcmdldCwgbmV3VGFyZ2V0U3RyaW5nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudCh0YXJnZXQsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VnbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUodGhpcy5fZWxlbWVudCwgJ3NlZ21lbnQnKTtcclxuICAgICAgICBpZiAoc2VnbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoaXNEZWZhdWx0TGFuZykge1xyXG4gICAgICAgICAgICAgICAgc2VnbWVudC5zZXRBdHRyaWJ1dGUoJ3N0YXRlJywgdGhpcy5tYXBTdGF0ZVRvTmF0aXZlU3RhdGUoU1RBVEVfRklOQUwpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlZ21lbnQuc2V0QXR0cmlidXRlKCdzdGF0ZScsIHRoaXMubWFwU3RhdGVUb05hdGl2ZVN0YXRlKFNUQVRFX05FVykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=