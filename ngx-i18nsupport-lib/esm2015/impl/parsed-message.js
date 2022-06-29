/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ParsedMessagePartType } from './parsed-message-part';
import { ParsedMessagePartText } from './parsed-message-part-text';
import { ParsedMessagePartPlaceholder } from './parsed-message-part-placeholder';
import { ParsedMessagePartStartTag } from './parsed-message-part-start-tag';
import { ParsedMessagePartEndTag } from './parsed-message-part-end-tag';
import { DOMUtilities } from './dom-utilities';
import { format, isNullOrUndefined } from 'util';
import { ParsedMessagePartICUMessage } from './parsed-message-part-icu-message';
import { ParsedMessagePartICUMessageRef } from './parsed-message-part-icu-message-ref';
import { ParsedMessagePartEmptyTag } from './parsed-message-part-empty-tag';
/**
 * Created by martin on 05.05.2017.
 * A message text read from a translation file.
 * Can contain placeholders, tags, text.
 * This class is a representation independent of the concrete format.
 */
export class ParsedMessage {
    /**
     * @param {?} parser
     * @param {?} sourceMessage
     */
    constructor(parser, sourceMessage) {
        this._parser = parser;
        this.sourceMessage = sourceMessage;
        this._parts = [];
    }
    /**
     * Get the parser (for tests only, not part of API)
     * @return {?} parser
     */
    getParser() {
        return this._parser;
    }
    /**
     * Create a new normalized message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is an ICU message.
     * @param {?} normalizedString the translation in normalized form.
     * If the message is an ICUMessage (getICUMessage returns a value), use translateICUMessage instead.
     * @return {?}
     */
    translate(normalizedString) {
        if (isNullOrUndefined(this.getICUMessage())) {
            return this._parser.parseNormalizedString((/** @type {?} */ (normalizedString)), this);
        }
        else {
            throw new Error(format('cannot translate ICU message with simple string, use translateICUMessage() instead ("%s", "%s")', normalizedString, this.asNativeString()));
        }
    }
    /**
     * Create a new normalized icu message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is not an ICU message.
     * @param {?} icuTranslation the translation, this is the translation of the ICU message,
     * which is not a string, but a collections of the translations of the different categories.
     * The message must be an ICUMessage (getICUMessage returns a value)
     * @return {?}
     */
    translateICUMessage(icuTranslation) {
        /** @type {?} */
        const icuMessage = this.getICUMessage();
        if (isNullOrUndefined(icuMessage)) {
            throw new Error(format('this is not an ICU message, use translate() instead ("%s", "%s")', icuTranslation, this.asNativeString()));
        }
        else {
            /** @type {?} */
            const translatedICUMessage = icuMessage.translate(icuTranslation);
            return this._parser.parseICUMessage(translatedICUMessage.asNativeString(), this);
        }
    }
    /**
     * Create a new normalized message from a native xml string as a translation of this one.
     * @param {?} nativeString xml string in the format of the underlying file format.
     * Throws an error if native string is not acceptable.
     * @return {?}
     */
    translateNativeString(nativeString) {
        return this._parser.createNormalizedMessageFromXMLString(nativeString, this);
    }
    /**
     * normalized message as string.
     * @param {?=} displayFormat optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     * @return {?}
     */
    asDisplayString(displayFormat) {
        return this._parts.map((/**
         * @param {?} part
         * @return {?}
         */
        (part) => part.asDisplayString(displayFormat))).join('');
    }
    /**
     * Returns the message content as format dependent native string.
     * Includes all format specific markup like <ph id="INTERPOLATION" ../> ..
     * @return {?}
     */
    asNativeString() {
        if (isNullOrUndefined(this.getICUMessage())) {
            return DOMUtilities.getXMLContent(this._xmlRepresentation);
        }
        else {
            return this.getICUMessage().asNativeString();
        }
    }
    /**
     * Validate the message.
     * @return {?} null, if ok, error object otherwise.
     */
    validate() {
        /** @type {?} */
        let hasErrors = false;
        /** @type {?} */
        const errors = {};
        /** @type {?} */
        let e;
        e = this.checkPlaceholderAdded();
        if (!isNullOrUndefined(e)) {
            errors.placeholderAdded = e;
            hasErrors = true;
        }
        e = this.checkICUMessageRefRemoved();
        if (!isNullOrUndefined(e)) {
            errors.icuMessageRefRemoved = e;
            hasErrors = true;
        }
        e = this.checkICUMessageRefAdded();
        if (!isNullOrUndefined(e)) {
            errors.icuMessageRefAdded = e;
            hasErrors = true;
        }
        return hasErrors ? errors : null;
    }
    /**
     * Validate the message, check for warnings only.
     * A warning shows, that the message is acceptable, but misses something.
     * E.g. if you remove a placeholder or a special tag from the original message, this generates a warning.
     * @return {?} null, if no warning, warnings as error object otherwise.
     */
    validateWarnings() {
        /** @type {?} */
        let hasWarnings = false;
        /** @type {?} */
        const warnings = {};
        /** @type {?} */
        let w;
        w = this.checkPlaceholderRemoved();
        if (!isNullOrUndefined(w)) {
            warnings.placeholderRemoved = w;
            hasWarnings = true;
        }
        w = this.checkTagRemoved();
        if (!isNullOrUndefined(w)) {
            warnings.tagRemoved = w;
            hasWarnings = true;
        }
        w = this.checkTagAdded();
        if (!isNullOrUndefined(w)) {
            warnings.tagAdded = w;
            hasWarnings = true;
        }
        return hasWarnings ? warnings : null;
    }
    /**
     * Test wether this message is an ICU message.
     * @return {?} true, if it is an ICU message.
     */
    isICUMessage() {
        return this._parts.length === 1 && this._parts[0].type === ParsedMessagePartType.ICU_MESSAGE;
    }
    /**
     * Test wether this message contains an ICU message reference.
     * ICU message references are something like <x ID="ICU"../>.
     * @return {?} true, if there is an ICU message reference in the message.
     */
    containsICUMessageRef() {
        return this._parts.findIndex((/**
         * @param {?} part
         * @return {?}
         */
        part => part.type === ParsedMessagePartType.ICU_MESSAGE_REF)) >= 0;
    }
    /**
     * If this message is an ICU message, returns its structure.
     * Otherwise this method returns null.
     * @return {?} ICUMessage or null.
     */
    getICUMessage() {
        if (this._parts.length === 1 && this._parts[0].type === ParsedMessagePartType.ICU_MESSAGE) {
            /** @type {?} */
            const icuPart = (/** @type {?} */ (this._parts[0]));
            return icuPart.getICUMessage();
        }
        else {
            return null;
        }
    }
    /**
     * Check for added placeholder.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    checkPlaceholderAdded() {
        /** @type {?} */
        let e = null;
        /** @type {?} */
        const suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            const sourcePlaceholders = this.sourceMessage.allPlaceholders();
            /** @type {?} */
            const myPlaceholders = this.allPlaceholders();
            myPlaceholders.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!sourcePlaceholders.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            e = 'added placeholder ' + suspiciousIndexes[0] + ', which is not in original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            let allSuspiciousIndexes = '';
            /** @type {?} */
            let first = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!first) {
                    allSuspiciousIndexes = allSuspiciousIndexes + ', ';
                }
                allSuspiciousIndexes = allSuspiciousIndexes + index;
                first = false;
            }));
            e = 'added placeholders ' + allSuspiciousIndexes + ', which are not in original message';
        }
        return e;
    }
    /**
     * Check for removed placeholder.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    checkPlaceholderRemoved() {
        /** @type {?} */
        let w = null;
        /** @type {?} */
        const suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            const sourcePlaceholders = this.sourceMessage.allPlaceholders();
            /** @type {?} */
            const myPlaceholders = this.allPlaceholders();
            sourcePlaceholders.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!myPlaceholders.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            w = 'removed placeholder ' + suspiciousIndexes[0] + ' from original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            let allSuspiciousIndexes = '';
            /** @type {?} */
            let first = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!first) {
                    allSuspiciousIndexes = allSuspiciousIndexes + ', ';
                }
                allSuspiciousIndexes = allSuspiciousIndexes + index;
                first = false;
            }));
            w = 'removed placeholders ' + allSuspiciousIndexes + ' from original message';
        }
        return w;
    }
    /**
     * Check for added ICU Message Refs.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    checkICUMessageRefAdded() {
        /** @type {?} */
        let e = null;
        /** @type {?} */
        const suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            const sourceICURefs = this.sourceMessage.allICUMessageRefs();
            /** @type {?} */
            const myICURefs = this.allICUMessageRefs();
            myICURefs.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!sourceICURefs.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            e = 'added ICU message reference ' + suspiciousIndexes[0] + ', which is not in original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            let allSuspiciousIndexes = '';
            /** @type {?} */
            let first = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!first) {
                    allSuspiciousIndexes = allSuspiciousIndexes + ', ';
                }
                allSuspiciousIndexes = allSuspiciousIndexes + index;
                first = false;
            }));
            e = 'added ICU message references ' + allSuspiciousIndexes + ', which are not in original message';
        }
        return e;
    }
    /**
     * Check for removed ICU Message Refs.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    checkICUMessageRefRemoved() {
        /** @type {?} */
        let e = null;
        /** @type {?} */
        const suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            const sourceICURefs = this.sourceMessage.allICUMessageRefs();
            /** @type {?} */
            const myICURefs = this.allICUMessageRefs();
            sourceICURefs.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!myICURefs.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            e = 'removed ICU message reference ' + suspiciousIndexes[0] + ' from original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            let allSuspiciousIndexes = '';
            /** @type {?} */
            let first = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            (index) => {
                if (!first) {
                    allSuspiciousIndexes = allSuspiciousIndexes + ', ';
                }
                allSuspiciousIndexes = allSuspiciousIndexes + index;
                first = false;
            }));
            e = 'removed ICU message references ' + allSuspiciousIndexes + ' from original message';
        }
        return e;
    }
    /**
     * Get all indexes of placeholders used in the message.
     * @private
     * @return {?}
     */
    allPlaceholders() {
        /** @type {?} */
        const result = new Set();
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            if (part.type === ParsedMessagePartType.PLACEHOLDER) {
                /** @type {?} */
                const index = ((/** @type {?} */ (part))).index();
                result.add(index);
            }
        }));
        return result;
    }
    /**
     * Return the disp-Attribute of placeholder
     * @param {?} index index of placeholder
     * @return {?} disp or null
     */
    getPlaceholderDisp(index) {
        /** @type {?} */
        let placeHolder = null;
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            if (part.type === ParsedMessagePartType.PLACEHOLDER) {
                /** @type {?} */
                const phPart = (/** @type {?} */ (part));
                if (phPart.index() === index) {
                    placeHolder = phPart;
                }
            }
        }));
        return placeHolder ? placeHolder.disp() : null;
    }
    /**
     * Get all indexes of ICU message refs used in the message.
     * @private
     * @return {?}
     */
    allICUMessageRefs() {
        /** @type {?} */
        const result = new Set();
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            if (part.type === ParsedMessagePartType.ICU_MESSAGE_REF) {
                /** @type {?} */
                const index = ((/** @type {?} */ (part))).index();
                result.add(index);
            }
        }));
        return result;
    }
    /**
     * Return the disp-Attribute of icu message ref
     * @param {?} index of ref
     * @return {?} disp or null
     */
    getICUMessageRefDisp(index) {
        /** @type {?} */
        let icuMessageRefPart = null;
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            if (part.type === ParsedMessagePartType.ICU_MESSAGE_REF) {
                /** @type {?} */
                const refPart = (/** @type {?} */ (part));
                if (refPart.index() === index) {
                    icuMessageRefPart = refPart;
                }
            }
        }));
        return icuMessageRefPart ? icuMessageRefPart.disp() : null;
    }
    /**
     * Check for added tags.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    checkTagAdded() {
        /** @type {?} */
        let e = null;
        /** @type {?} */
        const suspiciousTags = [];
        if (this.sourceMessage) {
            /** @type {?} */
            const sourceTags = this.sourceMessage.allTags();
            /** @type {?} */
            const myTags = this.allTags();
            myTags.forEach((/**
             * @param {?} tagName
             * @return {?}
             */
            (tagName) => {
                if (!sourceTags.has(tagName)) {
                    suspiciousTags.push(tagName);
                }
            }));
        }
        if (suspiciousTags.length === 1) {
            e = 'added tag <' + suspiciousTags[0] + '>, which is not in original message';
        }
        else if (suspiciousTags.length > 1) {
            /** @type {?} */
            let allSuspiciousTags = '';
            /** @type {?} */
            let first = true;
            suspiciousTags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => {
                if (!first) {
                    allSuspiciousTags = allSuspiciousTags + ', ';
                }
                allSuspiciousTags = allSuspiciousTags + '<' + tag + '>';
                first = false;
            }));
            e = 'added tags ' + allSuspiciousTags + ', which are not in original message';
        }
        return e;
    }
    /**
     * Check for removed tags.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    checkTagRemoved() {
        /** @type {?} */
        let w = null;
        /** @type {?} */
        const suspiciousTags = [];
        if (this.sourceMessage) {
            /** @type {?} */
            const sourceTags = this.sourceMessage.allTags();
            /** @type {?} */
            const myTags = this.allTags();
            sourceTags.forEach((/**
             * @param {?} tagName
             * @return {?}
             */
            (tagName) => {
                if (!myTags.has(tagName)) {
                    suspiciousTags.push(tagName);
                }
            }));
        }
        if (suspiciousTags.length === 1) {
            w = 'removed tag <' + suspiciousTags[0] + '> from original message';
        }
        else if (suspiciousTags.length > 1) {
            /** @type {?} */
            let allSuspiciousTags = '';
            /** @type {?} */
            let first = true;
            suspiciousTags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => {
                if (!first) {
                    allSuspiciousTags = allSuspiciousTags + ', ';
                }
                allSuspiciousTags = allSuspiciousTags + '<' + tag + '>';
                first = false;
            }));
            w = 'removed tags ' + allSuspiciousTags + ' from original message';
        }
        return w;
    }
    /**
     * Get all tag names used in the message.
     * @private
     * @return {?}
     */
    allTags() {
        /** @type {?} */
        const result = new Set();
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            if (part.type === ParsedMessagePartType.START_TAG || part.type === ParsedMessagePartType.EMPTY_TAG) {
                /** @type {?} */
                const tagName = ((/** @type {?} */ (part))).tagName();
                result.add(tagName);
            }
        }));
        return result;
    }
    /**
     * @return {?}
     */
    parts() {
        return this._parts;
    }
    /**
     * @param {?} xmlRepresentation
     * @return {?}
     */
    setXmlRepresentation(xmlRepresentation) {
        this._xmlRepresentation = xmlRepresentation;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    addText(text) {
        this._parts.push(new ParsedMessagePartText(text));
    }
    /**
     * @param {?} index
     * @param {?} disp
     * @return {?}
     */
    addPlaceholder(index, disp) {
        this._parts.push(new ParsedMessagePartPlaceholder(index, disp));
    }
    /**
     * @param {?} tagname
     * @param {?} idcounter
     * @return {?}
     */
    addStartTag(tagname, idcounter) {
        this._parts.push(new ParsedMessagePartStartTag(tagname, idcounter));
    }
    /**
     * @param {?} tagname
     * @return {?}
     */
    addEndTag(tagname) {
        // check if well formed
        /** @type {?} */
        const openTag = this.calculateOpenTagName();
        if (!openTag || openTag !== tagname) {
            // oops, not well formed
            throw new Error(format('unexpected close tag %s (currently open is %s, native xml is "%s")', tagname, openTag, this.asNativeString()));
        }
        this._parts.push(new ParsedMessagePartEndTag(tagname));
    }
    /**
     * @param {?} tagname
     * @param {?} idcounter
     * @return {?}
     */
    addEmptyTag(tagname, idcounter) {
        this._parts.push(new ParsedMessagePartEmptyTag(tagname, idcounter));
    }
    /**
     * @param {?} index
     * @param {?} disp
     * @return {?}
     */
    addICUMessageRef(index, disp) {
        this._parts.push(new ParsedMessagePartICUMessageRef(index, disp));
    }
    /**
     * @param {?} text
     * @return {?}
     */
    addICUMessage(text) {
        this._parts.push(new ParsedMessagePartICUMessage(text, this._parser));
    }
    /**
     * Determine, wether there is an open tag, that is not closed.
     * Returns the latest one or null, if there is no open tag.
     * @private
     * @return {?}
     */
    calculateOpenTagName() {
        /** @type {?} */
        const openTags = [];
        this._parts.forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            switch (part.type) {
                case ParsedMessagePartType.START_TAG:
                    openTags.push(((/** @type {?} */ (part))).tagName());
                    break;
                case ParsedMessagePartType.END_TAG:
                    /** @type {?} */
                    const tagName = ((/** @type {?} */ (part))).tagName();
                    if (openTags.length === 0 || openTags[openTags.length - 1] !== tagName) {
                        // oops, not well formed
                        /** @type {?} */
                        const openTag = (openTags.length === 0) ? 'nothing' : openTags[openTags.length - 1];
                        throw new Error(format('unexpected close tag %s (currently open is %s, native xml is "%s")', tagName, openTag, this.asNativeString()));
                    }
                    openTags.pop();
            }
        }));
        return openTags.length === 0 ? null : openTags[openTags.length - 1];
    }
}
if (false) {
    /**
     * Parser that created this message (determines the native format).
     * @type {?}
     * @private
     */
    ParsedMessage.prototype._parser;
    /**
     * The message where this one stems from as translation.
     * Optional, set only for messages created by calling translate.
     * @type {?}
     * @private
     */
    ParsedMessage.prototype.sourceMessage;
    /**
     * The parts of the message.
     * @type {?}
     * @private
     */
    ParsedMessage.prototype._parts;
    /**
     * messages xml representation.
     * @type {?}
     * @private
     */
    ParsedMessage.prototype._xmlRepresentation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3BhcnNlZC1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDakUsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDL0UsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDMUUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFL0MsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDOUUsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFckYsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7QUFPMUUsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBdUJ0QixZQUFZLE1BQXNCLEVBQUUsYUFBNEI7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFNRCxTQUFTO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7OztJQVNELFNBQVMsQ0FBQyxnQkFBd0I7UUFDOUIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsbUJBQVMsZ0JBQWdCLEVBQUEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsaUdBQWlHLEVBQ3BILGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDOzs7Ozs7Ozs7O0lBVUQsbUJBQW1CLENBQUMsY0FBc0M7O2NBQ2hELFVBQVUsR0FBZ0IsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNwRCxJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLGtFQUFrRSxFQUNyRixjQUFjLEVBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNoRDthQUFNOztrQkFDRyxvQkFBb0IsR0FBZ0IsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDOUUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwRjtJQUNMLENBQUM7Ozs7Ozs7SUFPRCxxQkFBcUIsQ0FBQyxZQUFvQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsb0NBQW9DLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7Ozs7Ozs7SUFPTSxlQUFlLENBQUMsYUFBc0I7UUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7Ozs7SUFNRCxjQUFjO1FBQ1YsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRTtZQUN6QyxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQzs7Ozs7SUFNTSxRQUFROztZQUNQLFNBQVMsR0FBRyxLQUFLOztjQUNmLE1BQU0sR0FBcUIsRUFBRTs7WUFDL0IsQ0FBQztRQUNMLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdkIsTUFBTSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztZQUM1QixTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO1FBQ0QsQ0FBQyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixNQUFNLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxDQUFDLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7WUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUNELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDOzs7Ozs7O0lBUUQsZ0JBQWdCOztZQUNSLFdBQVcsR0FBRyxLQUFLOztjQUNqQixRQUFRLEdBQXFCLEVBQUU7O1lBQ2pDLENBQUM7UUFDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7WUFDaEMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFDRCxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUN0QixXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBTUQsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHFCQUFxQixDQUFDLFdBQVcsQ0FBQztJQUNqRyxDQUFDOzs7Ozs7SUFPRCxxQkFBcUI7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25HLENBQUM7Ozs7OztJQU9NLGFBQWE7UUFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsV0FBVyxFQUFFOztrQkFDakYsT0FBTyxHQUFHLG1CQUE4QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFBO1lBQzVELE9BQU8sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ2xDO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQzs7Ozs7O0lBT08scUJBQXFCOztZQUNyQixDQUFDLEdBQUcsSUFBSTs7Y0FDTixpQkFBaUIsR0FBRyxFQUFFO1FBQzVCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTs7a0JBQ2Qsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUU7O2tCQUN6RCxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM3QyxjQUFjLENBQUMsT0FBTzs7OztZQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2hDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxvQ0FBb0MsQ0FBQztTQUMxRjthQUFNLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ2pDLG9CQUFvQixHQUFHLEVBQUU7O2dCQUN6QixLQUFLLEdBQUcsSUFBSTtZQUNoQixpQkFBaUIsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQ3REO2dCQUNELG9CQUFvQixHQUFHLG9CQUFvQixHQUFHLEtBQUssQ0FBQztnQkFDcEQsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztZQUNILENBQUMsR0FBRyxxQkFBcUIsR0FBRyxvQkFBb0IsR0FBRyxxQ0FBcUMsQ0FBQztTQUM1RjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBTU8sdUJBQXVCOztZQUN2QixDQUFDLEdBQUcsSUFBSTs7Y0FDTixpQkFBaUIsR0FBRyxFQUFFO1FBQzVCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTs7a0JBQ2Qsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUU7O2tCQUN6RCxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM3QyxrQkFBa0IsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzVCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLENBQUMsR0FBRyxzQkFBc0IsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyx3QkFBd0IsQ0FBQztTQUNoRjthQUFNLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ2pDLG9CQUFvQixHQUFHLEVBQUU7O2dCQUN6QixLQUFLLEdBQUcsSUFBSTtZQUNoQixpQkFBaUIsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQ3REO2dCQUNELG9CQUFvQixHQUFHLG9CQUFvQixHQUFHLEtBQUssQ0FBQztnQkFDcEQsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztZQUNILENBQUMsR0FBRyx1QkFBdUIsR0FBRyxvQkFBb0IsR0FBRyx3QkFBd0IsQ0FBQztTQUNqRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBTU8sdUJBQXVCOztZQUN2QixDQUFDLEdBQUcsSUFBSTs7Y0FDTixpQkFBaUIsR0FBRyxFQUFFO1FBQzVCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTs7a0JBQ2QsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUU7O2tCQUN0RCxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFDLFNBQVMsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzNCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLENBQUMsR0FBRyw4QkFBOEIsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxvQ0FBb0MsQ0FBQztTQUNwRzthQUFNLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ2pDLG9CQUFvQixHQUFHLEVBQUU7O2dCQUN6QixLQUFLLEdBQUcsSUFBSTtZQUNoQixpQkFBaUIsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQ3REO2dCQUNELG9CQUFvQixHQUFHLG9CQUFvQixHQUFHLEtBQUssQ0FBQztnQkFDcEQsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztZQUNILENBQUMsR0FBRywrQkFBK0IsR0FBRyxvQkFBb0IsR0FBRyxxQ0FBcUMsQ0FBQztTQUN0RztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBTU8seUJBQXlCOztZQUN6QixDQUFDLEdBQUcsSUFBSTs7Y0FDTixpQkFBaUIsR0FBRyxFQUFFO1FBQzVCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTs7a0JBQ2QsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUU7O2tCQUN0RCxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFDLGFBQWEsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZCLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLENBQUMsR0FBRyxnQ0FBZ0MsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsR0FBRyx3QkFBd0IsQ0FBQztTQUMxRjthQUFNLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ2pDLG9CQUFvQixHQUFHLEVBQUU7O2dCQUN6QixLQUFLLEdBQUcsSUFBSTtZQUNoQixpQkFBaUIsQ0FBQyxPQUFPOzs7O1lBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixvQkFBb0IsR0FBRyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7aUJBQ3REO2dCQUNELG9CQUFvQixHQUFHLG9CQUFvQixHQUFHLEtBQUssQ0FBQztnQkFDcEQsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztZQUNILENBQUMsR0FBRyxpQ0FBaUMsR0FBRyxvQkFBb0IsR0FBRyx3QkFBd0IsQ0FBQztTQUMzRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7O0lBS08sZUFBZTs7Y0FDYixNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQVU7UUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUU7O3NCQUMzQyxLQUFLLEdBQUcsQ0FBQyxtQkFBK0IsSUFBSSxFQUFBLENBQUMsQ0FBQyxLQUFLLEVBQUU7Z0JBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckI7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7OztJQU9NLGtCQUFrQixDQUFDLEtBQWE7O1lBQy9CLFdBQVcsR0FBaUMsSUFBSTtRQUNwRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLHFCQUFxQixDQUFDLFdBQVcsRUFBRTs7c0JBQzNDLE1BQU0sR0FBaUMsbUJBQStCLElBQUksRUFBQTtnQkFDaEYsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssS0FBSyxFQUFFO29CQUMxQixXQUFXLEdBQUcsTUFBTSxDQUFDO2lCQUN4QjthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBS08saUJBQWlCOztjQUNmLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBVTtRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLHFCQUFxQixDQUFDLGVBQWUsRUFBRTs7c0JBQy9DLEtBQUssR0FBRyxDQUFDLG1CQUFpQyxJQUFJLEVBQUEsQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDN0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBT00sb0JBQW9CLENBQUMsS0FBYTs7WUFDakMsaUJBQWlCLEdBQW1DLElBQUk7UUFDNUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxxQkFBcUIsQ0FBQyxlQUFlLEVBQUU7O3NCQUMvQyxPQUFPLEdBQW1DLG1CQUFpQyxJQUFJLEVBQUE7Z0JBQ3JGLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDM0IsaUJBQWlCLEdBQUcsT0FBTyxDQUFDO2lCQUMvQjthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQU1PLGFBQWE7O1lBQ2IsQ0FBQyxHQUFHLElBQUk7O2NBQ04sY0FBYyxHQUFHLEVBQUU7UUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFOztrQkFDZCxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7O2tCQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM3QixNQUFNLENBQUMsT0FBTzs7OztZQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMxQixjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ047UUFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLENBQUMsR0FBRyxhQUFhLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLHFDQUFxQyxDQUFDO1NBQ2pGO2FBQU0sSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQzlCLGlCQUFpQixHQUFHLEVBQUU7O2dCQUN0QixLQUFLLEdBQUcsSUFBSTtZQUNoQixjQUFjLENBQUMsT0FBTzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsaUJBQWlCLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2lCQUNoRDtnQkFDRCxpQkFBaUIsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDeEQsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztZQUNILENBQUMsR0FBRyxhQUFhLEdBQUcsaUJBQWlCLEdBQUcscUNBQXFDLENBQUM7U0FDakY7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Ozs7OztJQU1PLGVBQWU7O1lBQ2YsQ0FBQyxHQUFHLElBQUk7O2NBQ04sY0FBYyxHQUFHLEVBQUU7UUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFOztrQkFDZCxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUU7O2tCQUN6QyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM3QixVQUFVLENBQUMsT0FBTzs7OztZQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN0QixjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNoQztZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ047UUFDRCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLENBQUMsR0FBRyxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLHlCQUF5QixDQUFDO1NBQ3ZFO2FBQU0sSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQzlCLGlCQUFpQixHQUFHLEVBQUU7O2dCQUN0QixLQUFLLEdBQUcsSUFBSTtZQUNoQixjQUFjLENBQUMsT0FBTzs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsaUJBQWlCLEdBQUcsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2lCQUNoRDtnQkFDRCxpQkFBaUIsR0FBRyxpQkFBaUIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDeEQsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixDQUFDLEVBQUMsQ0FBQztZQUNILENBQUMsR0FBRyxlQUFlLEdBQUcsaUJBQWlCLEdBQUcsd0JBQXdCLENBQUM7U0FDdEU7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Ozs7OztJQUtPLE9BQU87O2NBQ0wsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFVO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUsscUJBQXFCLENBQUMsU0FBUyxFQUFFOztzQkFDMUYsT0FBTyxHQUFHLENBQUMsbUJBQTRCLElBQUksRUFBQSxDQUFDLENBQUMsT0FBTyxFQUFFO2dCQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7O0lBRU0sS0FBSztRQUNSLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLGlCQUEwQjtRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksNEJBQTRCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxTQUFpQjtRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQWU7OztjQUVmLE9BQU8sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7UUFDM0MsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQ2pDLHdCQUF3QjtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxvRUFBb0UsRUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUVELFdBQVcsQ0FBQyxPQUFlLEVBQUUsU0FBaUI7UUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDOzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsSUFBSTtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDhCQUE4QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLElBQVk7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Ozs7OztJQU1PLG9CQUFvQjs7Y0FDbEIsUUFBUSxHQUFHLEVBQUU7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2YsS0FBSyxxQkFBcUIsQ0FBQyxTQUFTO29CQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQTRCLElBQUksRUFBQSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDNUQsTUFBTTtnQkFDVixLQUFLLHFCQUFxQixDQUFDLE9BQU87OzBCQUN4QixPQUFPLEdBQUcsQ0FBQyxtQkFBMEIsSUFBSSxFQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUU7b0JBQzFELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssT0FBTyxFQUFFOzs7OEJBRTlELE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dCQUNuRixNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxvRUFBb0UsRUFDdkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNqRDtvQkFDRCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNKOzs7Ozs7O0lBOWdCRyxnQ0FBZ0M7Ozs7Ozs7SUFNaEMsc0NBQXFDOzs7Ozs7SUFLckMsK0JBQW9DOzs7Ozs7SUFLcEMsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydCwgUGFyc2VkTWVzc2FnZVBhcnRUeXBlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0VGV4dH0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXRleHQnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXJ9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXN0YXJ0LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbmRUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbmQtdGFnJztcclxuaW1wb3J0IHtJTm9ybWFsaXplZE1lc3NhZ2UsIFZhbGlkYXRpb25FcnJvcnN9IGZyb20gJy4uL2FwaS9pLW5vcm1hbGl6ZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7RE9NVXRpbGl0aWVzfSBmcm9tICcuL2RvbS11dGlsaXRpZXMnO1xyXG5pbXBvcnQge0lNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2ktbWVzc2FnZS1wYXJzZXInO1xyXG5pbXBvcnQge2Zvcm1hdCwgaXNOdWxsT3JVbmRlZmluZWR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge0lJQ1VNZXNzYWdlLCBJSUNVTWVzc2FnZVRyYW5zbGF0aW9ufSBmcm9tICcuLi9hcGkvaS1pY3UtbWVzc2FnZSc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWljdS1tZXNzYWdlLXJlZic7XHJcbmltcG9ydCB7SUNVTWVzc2FnZX0gZnJvbSAnLi9pY3UtbWVzc2FnZSc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVtcHR5LXRhZyc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNS4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgdGV4dCByZWFkIGZyb20gYSB0cmFuc2xhdGlvbiBmaWxlLlxyXG4gKiBDYW4gY29udGFpbiBwbGFjZWhvbGRlcnMsIHRhZ3MsIHRleHQuXHJcbiAqIFRoaXMgY2xhc3MgaXMgYSByZXByZXNlbnRhdGlvbiBpbmRlcGVuZGVudCBvZiB0aGUgY29uY3JldGUgZm9ybWF0LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2UgaW1wbGVtZW50cyBJTm9ybWFsaXplZE1lc3NhZ2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2VyIHRoYXQgY3JlYXRlZCB0aGlzIG1lc3NhZ2UgKGRldGVybWluZXMgdGhlIG5hdGl2ZSBmb3JtYXQpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wYXJzZXI6IElNZXNzYWdlUGFyc2VyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1lc3NhZ2Ugd2hlcmUgdGhpcyBvbmUgc3RlbXMgZnJvbSBhcyB0cmFuc2xhdGlvbi5cclxuICAgICAqIE9wdGlvbmFsLCBzZXQgb25seSBmb3IgbWVzc2FnZXMgY3JlYXRlZCBieSBjYWxsaW5nIHRyYW5zbGF0ZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzb3VyY2VNZXNzYWdlOiBQYXJzZWRNZXNzYWdlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHBhcnRzIG9mIHRoZSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wYXJ0czogUGFyc2VkTWVzc2FnZVBhcnRbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIG1lc3NhZ2VzIHhtbCByZXByZXNlbnRhdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfeG1sUmVwcmVzZW50YXRpb246IEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGFyc2VyOiBJTWVzc2FnZVBhcnNlciwgc291cmNlTWVzc2FnZTogUGFyc2VkTWVzc2FnZSkge1xyXG4gICAgICAgIHRoaXMuX3BhcnNlciA9IHBhcnNlcjtcclxuICAgICAgICB0aGlzLnNvdXJjZU1lc3NhZ2UgPSBzb3VyY2VNZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuX3BhcnRzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHBhcnNlciAoZm9yIHRlc3RzIG9ubHksIG5vdCBwYXJ0IG9mIEFQSSlcclxuICAgICAqIEByZXR1cm4gcGFyc2VyXHJcbiAgICAgKi9cclxuICAgIGdldFBhcnNlcigpOiBJTWVzc2FnZVBhcnNlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBub3JtYWxpemVkIG1lc3NhZ2UgYXMgYSB0cmFuc2xhdGlvbiBvZiB0aGlzIG9uZS5cclxuICAgICAqIEBwYXJhbSBub3JtYWxpemVkU3RyaW5nIHRoZSB0cmFuc2xhdGlvbiBpbiBub3JtYWxpemVkIGZvcm0uXHJcbiAgICAgKiBJZiB0aGUgbWVzc2FnZSBpcyBhbiBJQ1VNZXNzYWdlIChnZXRJQ1VNZXNzYWdlIHJldHVybnMgYSB2YWx1ZSksIHVzZSB0cmFuc2xhdGVJQ1VNZXNzYWdlIGluc3RlYWQuXHJcbiAgICAgKiBAdGhyb3dzIGFuIGVycm9yIGlmIG5vcm1hbGl6ZWQgc3RyaW5nIGlzIG5vdCB3ZWxsIGZvcm1lZC5cclxuICAgICAqIFRocm93cyBhbiBlcnJvciB0b28sIGlmIHRoaXMgaXMgYW4gSUNVIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0ZShub3JtYWxpemVkU3RyaW5nOiBzdHJpbmcpOiBJTm9ybWFsaXplZE1lc3NhZ2Uge1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0aGlzLmdldElDVU1lc3NhZ2UoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnNlci5wYXJzZU5vcm1hbGl6ZWRTdHJpbmcoPHN0cmluZz4gbm9ybWFsaXplZFN0cmluZywgdGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnY2Fubm90IHRyYW5zbGF0ZSBJQ1UgbWVzc2FnZSB3aXRoIHNpbXBsZSBzdHJpbmcsIHVzZSB0cmFuc2xhdGVJQ1VNZXNzYWdlKCkgaW5zdGVhZCAoXCIlc1wiLCBcIiVzXCIpJyxcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRTdHJpbmcsIHRoaXMuYXNOYXRpdmVTdHJpbmcoKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBub3JtYWxpemVkIGljdSBtZXNzYWdlIGFzIGEgdHJhbnNsYXRpb24gb2YgdGhpcyBvbmUuXHJcbiAgICAgKiBAcGFyYW0gaWN1VHJhbnNsYXRpb24gdGhlIHRyYW5zbGF0aW9uLCB0aGlzIGlzIHRoZSB0cmFuc2xhdGlvbiBvZiB0aGUgSUNVIG1lc3NhZ2UsXHJcbiAgICAgKiB3aGljaCBpcyBub3QgYSBzdHJpbmcsIGJ1dCBhIGNvbGxlY3Rpb25zIG9mIHRoZSB0cmFuc2xhdGlvbnMgb2YgdGhlIGRpZmZlcmVudCBjYXRlZ29yaWVzLlxyXG4gICAgICogVGhlIG1lc3NhZ2UgbXVzdCBiZSBhbiBJQ1VNZXNzYWdlIChnZXRJQ1VNZXNzYWdlIHJldHVybnMgYSB2YWx1ZSlcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IgaWYgbm9ybWFsaXplZCBzdHJpbmcgaXMgbm90IHdlbGwgZm9ybWVkLlxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIHRvbywgaWYgdGhpcyBpcyBub3QgYW4gSUNVIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0ZUlDVU1lc3NhZ2UoaWN1VHJhbnNsYXRpb246IElJQ1VNZXNzYWdlVHJhbnNsYXRpb24pOiBJTm9ybWFsaXplZE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IGljdU1lc3NhZ2U6IElJQ1VNZXNzYWdlID0gdGhpcy5nZXRJQ1VNZXNzYWdlKCk7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGljdU1lc3NhZ2UpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ3RoaXMgaXMgbm90IGFuIElDVSBtZXNzYWdlLCB1c2UgdHJhbnNsYXRlKCkgaW5zdGVhZCAoXCIlc1wiLCBcIiVzXCIpJyxcclxuICAgICAgICAgICAgICAgIGljdVRyYW5zbGF0aW9uLCAgdGhpcy5hc05hdGl2ZVN0cmluZygpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlZElDVU1lc3NhZ2U6IElJQ1VNZXNzYWdlID0gaWN1TWVzc2FnZS50cmFuc2xhdGUoaWN1VHJhbnNsYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VyLnBhcnNlSUNVTWVzc2FnZSh0cmFuc2xhdGVkSUNVTWVzc2FnZS5hc05hdGl2ZVN0cmluZygpLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgbm9ybWFsaXplZCBtZXNzYWdlIGZyb20gYSBuYXRpdmUgeG1sIHN0cmluZyBhcyBhIHRyYW5zbGF0aW9uIG9mIHRoaXMgb25lLlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0cmluZyB4bWwgc3RyaW5nIGluIHRoZSBmb3JtYXQgb2YgdGhlIHVuZGVybHlpbmcgZmlsZSBmb3JtYXQuXHJcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgbmF0aXZlIHN0cmluZyBpcyBub3QgYWNjZXB0YWJsZS5cclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlTmF0aXZlU3RyaW5nKG5hdGl2ZVN0cmluZzogc3RyaW5nKTogSU5vcm1hbGl6ZWRNZXNzYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyc2VyLmNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTFN0cmluZyhuYXRpdmVTdHJpbmcsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm9ybWFsaXplZCBtZXNzYWdlIGFzIHN0cmluZy5cclxuICAgICAqIEBwYXJhbSBkaXNwbGF5Rm9ybWF0IG9wdGlvbmFsIHdheSB0byBkZXRlcm1pbmUgdGhlIGV4YWN0IHN5bnRheC5cclxuICAgICAqIEFsbG93ZWQgZm9ybWF0cyBhcmUgZGVmaW5lZCBhcyBjb25zdGFudHMgTk9STUFMSVpBVElPTl9GT1JNQVQuLi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzRGlzcGxheVN0cmluZyhkaXNwbGF5Rm9ybWF0Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRzLm1hcCgocGFydCkgPT4gcGFydC5hc0Rpc3BsYXlTdHJpbmcoZGlzcGxheUZvcm1hdCkpLmpvaW4oJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgbWVzc2FnZSBjb250ZW50IGFzIGZvcm1hdCBkZXBlbmRlbnQgbmF0aXZlIHN0cmluZy5cclxuICAgICAqIEluY2x1ZGVzIGFsbCBmb3JtYXQgc3BlY2lmaWMgbWFya3VwIGxpa2UgPHBoIGlkPVwiSU5URVJQT0xBVElPTlwiIC4uLz4gLi5cclxuICAgICAqL1xyXG4gICAgYXNOYXRpdmVTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5nZXRJQ1VNZXNzYWdlKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBET01VdGlsaXRpZXMuZ2V0WE1MQ29udGVudCh0aGlzLl94bWxSZXByZXNlbnRhdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SUNVTWVzc2FnZSgpLmFzTmF0aXZlU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcmV0dXJuIG51bGwsIGlmIG9rLCBlcnJvciBvYmplY3Qgb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xyXG4gICAgICAgIGxldCBoYXNFcnJvcnMgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBlcnJvcnM6IFZhbGlkYXRpb25FcnJvcnMgPSB7fTtcclxuICAgICAgICBsZXQgZTtcclxuICAgICAgICBlID0gdGhpcy5jaGVja1BsYWNlaG9sZGVyQWRkZWQoKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGUpKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wbGFjZWhvbGRlckFkZGVkID0gZTtcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZSA9IHRoaXMuY2hlY2tJQ1VNZXNzYWdlUmVmUmVtb3ZlZCgpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoZSkpIHtcclxuICAgICAgICAgICAgZXJyb3JzLmljdU1lc3NhZ2VSZWZSZW1vdmVkID0gZTtcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZSA9IHRoaXMuY2hlY2tJQ1VNZXNzYWdlUmVmQWRkZWQoKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGUpKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5pY3VNZXNzYWdlUmVmQWRkZWQgPSBlO1xyXG4gICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFzRXJyb3JzID8gZXJyb3JzIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIHRoZSBtZXNzYWdlLCBjaGVjayBmb3Igd2FybmluZ3Mgb25seS5cclxuICAgICAqIEEgd2FybmluZyBzaG93cywgdGhhdCB0aGUgbWVzc2FnZSBpcyBhY2NlcHRhYmxlLCBidXQgbWlzc2VzIHNvbWV0aGluZy5cclxuICAgICAqIEUuZy4gaWYgeW91IHJlbW92ZSBhIHBsYWNlaG9sZGVyIG9yIGEgc3BlY2lhbCB0YWcgZnJvbSB0aGUgb3JpZ2luYWwgbWVzc2FnZSwgdGhpcyBnZW5lcmF0ZXMgYSB3YXJuaW5nLlxyXG4gICAgICogQHJldHVybiBudWxsLCBpZiBubyB3YXJuaW5nLCB3YXJuaW5ncyBhcyBlcnJvciBvYmplY3Qgb3RoZXJ3aXNlLlxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZVdhcm5pbmdzKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcclxuICAgICAgICBsZXQgaGFzV2FybmluZ3MgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCB3YXJuaW5nczogVmFsaWRhdGlvbkVycm9ycyA9IHt9O1xyXG4gICAgICAgIGxldCB3O1xyXG4gICAgICAgIHcgPSB0aGlzLmNoZWNrUGxhY2Vob2xkZXJSZW1vdmVkKCk7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh3KSkge1xyXG4gICAgICAgICAgICB3YXJuaW5ncy5wbGFjZWhvbGRlclJlbW92ZWQgPSB3O1xyXG4gICAgICAgICAgICBoYXNXYXJuaW5ncyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHcgPSB0aGlzLmNoZWNrVGFnUmVtb3ZlZCgpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodykpIHtcclxuICAgICAgICAgICAgd2FybmluZ3MudGFnUmVtb3ZlZCA9IHc7XHJcbiAgICAgICAgICAgIGhhc1dhcm5pbmdzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdyA9IHRoaXMuY2hlY2tUYWdBZGRlZCgpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodykpIHtcclxuICAgICAgICAgICAgd2FybmluZ3MudGFnQWRkZWQgPSB3O1xyXG4gICAgICAgICAgICBoYXNXYXJuaW5ncyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoYXNXYXJuaW5ncyA/IHdhcm5pbmdzIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3Qgd2V0aGVyIHRoaXMgbWVzc2FnZSBpcyBhbiBJQ1UgbWVzc2FnZS5cclxuICAgICAqIEByZXR1cm4gdHJ1ZSwgaWYgaXQgaXMgYW4gSUNVIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIGlzSUNVTWVzc2FnZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFydHMubGVuZ3RoID09PSAxICYmIHRoaXMuX3BhcnRzWzBdLnR5cGUgPT09IFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5JQ1VfTUVTU0FHRTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3Qgd2V0aGVyIHRoaXMgbWVzc2FnZSBjb250YWlucyBhbiBJQ1UgbWVzc2FnZSByZWZlcmVuY2UuXHJcbiAgICAgKiBJQ1UgbWVzc2FnZSByZWZlcmVuY2VzIGFyZSBzb21ldGhpbmcgbGlrZSA8eCBJRD1cIklDVVwiLi4vPi5cclxuICAgICAqIEByZXR1cm4gdHJ1ZSwgaWYgdGhlcmUgaXMgYW4gSUNVIG1lc3NhZ2UgcmVmZXJlbmNlIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBjb250YWluc0lDVU1lc3NhZ2VSZWYoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcnRzLmZpbmRJbmRleChwYXJ0ID0+IHBhcnQudHlwZSA9PT0gUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFX1JFRikgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoaXMgbWVzc2FnZSBpcyBhbiBJQ1UgbWVzc2FnZSwgcmV0dXJucyBpdHMgc3RydWN0dXJlLlxyXG4gICAgICogT3RoZXJ3aXNlIHRoaXMgbWV0aG9kIHJldHVybnMgbnVsbC5cclxuICAgICAqIEByZXR1cm4gSUNVTWVzc2FnZSBvciBudWxsLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SUNVTWVzc2FnZSgpOiBJSUNVTWVzc2FnZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRzLmxlbmd0aCA9PT0gMSAmJiB0aGlzLl9wYXJ0c1swXS50eXBlID09PSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuSUNVX01FU1NBR0UpIHtcclxuICAgICAgICAgICAgY29uc3QgaWN1UGFydCA9IDxQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2U+IHRoaXMuX3BhcnRzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gaWN1UGFydC5nZXRJQ1VNZXNzYWdlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciBhZGRlZCBwbGFjZWhvbGRlci5cclxuICAgICAqIEByZXR1cm4gbnVsbCBvciBtZXNzYWdlLCBpZiBmdWxmaWxsZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tQbGFjZWhvbGRlckFkZGVkKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IGUgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IHN1c3BpY2lvdXNJbmRleGVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlTWVzc2FnZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VQbGFjZWhvbGRlcnMgPSB0aGlzLnNvdXJjZU1lc3NhZ2UuYWxsUGxhY2Vob2xkZXJzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG15UGxhY2Vob2xkZXJzID0gdGhpcy5hbGxQbGFjZWhvbGRlcnMoKTtcclxuICAgICAgICAgICAgbXlQbGFjZWhvbGRlcnMuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlUGxhY2Vob2xkZXJzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXNwaWNpb3VzSW5kZXhlcy5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdXNwaWNpb3VzSW5kZXhlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgZSA9ICdhZGRlZCBwbGFjZWhvbGRlciAnICsgc3VzcGljaW91c0luZGV4ZXNbMF0gKyAnLCB3aGljaCBpcyBub3QgaW4gb3JpZ2luYWwgbWVzc2FnZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdXNwaWNpb3VzSW5kZXhlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxTdXNwaWNpb3VzSW5kZXhlcyA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdXNwaWNpb3VzSW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFN1c3BpY2lvdXNJbmRleGVzID0gYWxsU3VzcGljaW91c0luZGV4ZXMgKyAnLCAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWxsU3VzcGljaW91c0luZGV4ZXMgPSBhbGxTdXNwaWNpb3VzSW5kZXhlcyArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGUgPSAnYWRkZWQgcGxhY2Vob2xkZXJzICcgKyBhbGxTdXNwaWNpb3VzSW5kZXhlcyArICcsIHdoaWNoIGFyZSBub3QgaW4gb3JpZ2luYWwgbWVzc2FnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgZm9yIHJlbW92ZWQgcGxhY2Vob2xkZXIuXHJcbiAgICAgKiBAcmV0dXJuIG51bGwgb3IgbWVzc2FnZSwgaWYgZnVsZmlsbGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrUGxhY2Vob2xkZXJSZW1vdmVkKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IHcgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IHN1c3BpY2lvdXNJbmRleGVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlTWVzc2FnZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VQbGFjZWhvbGRlcnMgPSB0aGlzLnNvdXJjZU1lc3NhZ2UuYWxsUGxhY2Vob2xkZXJzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG15UGxhY2Vob2xkZXJzID0gdGhpcy5hbGxQbGFjZWhvbGRlcnMoKTtcclxuICAgICAgICAgICAgc291cmNlUGxhY2Vob2xkZXJzLmZvckVhY2goKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW15UGxhY2Vob2xkZXJzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXNwaWNpb3VzSW5kZXhlcy5wdXNoKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdXNwaWNpb3VzSW5kZXhlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgdyA9ICdyZW1vdmVkIHBsYWNlaG9sZGVyICcgKyBzdXNwaWNpb3VzSW5kZXhlc1swXSArICcgZnJvbSBvcmlnaW5hbCBtZXNzYWdlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHN1c3BpY2lvdXNJbmRleGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgbGV0IGFsbFN1c3BpY2lvdXNJbmRleGVzID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIHN1c3BpY2lvdXNJbmRleGVzLmZvckVhY2goKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsU3VzcGljaW91c0luZGV4ZXMgPSBhbGxTdXNwaWNpb3VzSW5kZXhlcyArICcsICc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGxTdXNwaWNpb3VzSW5kZXhlcyA9IGFsbFN1c3BpY2lvdXNJbmRleGVzICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdyA9ICdyZW1vdmVkIHBsYWNlaG9sZGVycyAnICsgYWxsU3VzcGljaW91c0luZGV4ZXMgKyAnIGZyb20gb3JpZ2luYWwgbWVzc2FnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgZm9yIGFkZGVkIElDVSBNZXNzYWdlIFJlZnMuXHJcbiAgICAgKiBAcmV0dXJuIG51bGwgb3IgbWVzc2FnZSwgaWYgZnVsZmlsbGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrSUNVTWVzc2FnZVJlZkFkZGVkKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IGUgPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IHN1c3BpY2lvdXNJbmRleGVzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlTWVzc2FnZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VJQ1VSZWZzID0gdGhpcy5zb3VyY2VNZXNzYWdlLmFsbElDVU1lc3NhZ2VSZWZzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG15SUNVUmVmcyA9IHRoaXMuYWxsSUNVTWVzc2FnZVJlZnMoKTtcclxuICAgICAgICAgICAgbXlJQ1VSZWZzLmZvckVhY2goKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZUlDVVJlZnMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1c3BpY2lvdXNJbmRleGVzLnB1c2goaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN1c3BpY2lvdXNJbmRleGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBlID0gJ2FkZGVkIElDVSBtZXNzYWdlIHJlZmVyZW5jZSAnICsgc3VzcGljaW91c0luZGV4ZXNbMF0gKyAnLCB3aGljaCBpcyBub3QgaW4gb3JpZ2luYWwgbWVzc2FnZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdXNwaWNpb3VzSW5kZXhlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxTdXNwaWNpb3VzSW5kZXhlcyA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdXNwaWNpb3VzSW5kZXhlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFN1c3BpY2lvdXNJbmRleGVzID0gYWxsU3VzcGljaW91c0luZGV4ZXMgKyAnLCAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWxsU3VzcGljaW91c0luZGV4ZXMgPSBhbGxTdXNwaWNpb3VzSW5kZXhlcyArIGluZGV4O1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGUgPSAnYWRkZWQgSUNVIG1lc3NhZ2UgcmVmZXJlbmNlcyAnICsgYWxsU3VzcGljaW91c0luZGV4ZXMgKyAnLCB3aGljaCBhcmUgbm90IGluIG9yaWdpbmFsIG1lc3NhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciByZW1vdmVkIElDVSBNZXNzYWdlIFJlZnMuXHJcbiAgICAgKiBAcmV0dXJuIG51bGwgb3IgbWVzc2FnZSwgaWYgZnVsZmlsbGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrSUNVTWVzc2FnZVJlZlJlbW92ZWQoKTogYW55IHtcclxuICAgICAgICBsZXQgZSA9IG51bGw7XHJcbiAgICAgICAgY29uc3Qgc3VzcGljaW91c0luZGV4ZXMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5zb3VyY2VNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUlDVVJlZnMgPSB0aGlzLnNvdXJjZU1lc3NhZ2UuYWxsSUNVTWVzc2FnZVJlZnMoKTtcclxuICAgICAgICAgICAgY29uc3QgbXlJQ1VSZWZzID0gdGhpcy5hbGxJQ1VNZXNzYWdlUmVmcygpO1xyXG4gICAgICAgICAgICBzb3VyY2VJQ1VSZWZzLmZvckVhY2goKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW15SUNVUmVmcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VzcGljaW91c0luZGV4ZXMucHVzaChpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3VzcGljaW91c0luZGV4ZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGUgPSAncmVtb3ZlZCBJQ1UgbWVzc2FnZSByZWZlcmVuY2UgJyArIHN1c3BpY2lvdXNJbmRleGVzWzBdICsgJyBmcm9tIG9yaWdpbmFsIG1lc3NhZ2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3VzcGljaW91c0luZGV4ZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBsZXQgYWxsU3VzcGljaW91c0luZGV4ZXMgPSAnJztcclxuICAgICAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3VzcGljaW91c0luZGV4ZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxTdXNwaWNpb3VzSW5kZXhlcyA9IGFsbFN1c3BpY2lvdXNJbmRleGVzICsgJywgJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsbFN1c3BpY2lvdXNJbmRleGVzID0gYWxsU3VzcGljaW91c0luZGV4ZXMgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBlID0gJ3JlbW92ZWQgSUNVIG1lc3NhZ2UgcmVmZXJlbmNlcyAnICsgYWxsU3VzcGljaW91c0luZGV4ZXMgKyAnIGZyb20gb3JpZ2luYWwgbWVzc2FnZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBpbmRleGVzIG9mIHBsYWNlaG9sZGVycyB1c2VkIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFsbFBsYWNlaG9sZGVycygpOiBTZXQ8bnVtYmVyPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldDxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0cygpLmZvckVhY2goKHBhcnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcnQudHlwZSA9PT0gUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlBMQUNFSE9MREVSKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9ICg8UGFyc2VkTWVzc2FnZVBhcnRQbGFjZWhvbGRlcj4gcGFydCkuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgZGlzcC1BdHRyaWJ1dGUgb2YgcGxhY2Vob2xkZXJcclxuICAgICAqIEBwYXJhbSBpbmRleCBpbmRleCBvZiBwbGFjZWhvbGRlclxyXG4gICAgICogQHJldHVybiBkaXNwIG9yIG51bGxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFBsYWNlaG9sZGVyRGlzcChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcGxhY2VIb2xkZXI6IFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGFydHMoKS5mb3JFYWNoKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0LnR5cGUgPT09IFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5QTEFDRUhPTERFUikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGhQYXJ0OiBQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyID0gPFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXI+IHBhcnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocGhQYXJ0LmluZGV4KCkgPT09IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VIb2xkZXIgPSBwaFBhcnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcGxhY2VIb2xkZXIgPyBwbGFjZUhvbGRlci5kaXNwKCkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBpbmRleGVzIG9mIElDVSBtZXNzYWdlIHJlZnMgdXNlZCBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhbGxJQ1VNZXNzYWdlUmVmcygpOiBTZXQ8bnVtYmVyPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldDxudW1iZXI+KCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0cygpLmZvckVhY2goKHBhcnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcnQudHlwZSA9PT0gUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFX1JFRikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSAoPFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZj4gcGFydCkuaW5kZXgoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgZGlzcC1BdHRyaWJ1dGUgb2YgaWN1IG1lc3NhZ2UgcmVmXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggb2YgcmVmXHJcbiAgICAgKiBAcmV0dXJuIGRpc3Agb3IgbnVsbFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SUNVTWVzc2FnZVJlZkRpc3AoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGljdU1lc3NhZ2VSZWZQYXJ0OiBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWYgPSBudWxsO1xyXG4gICAgICAgIHRoaXMucGFydHMoKS5mb3JFYWNoKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0LnR5cGUgPT09IFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5JQ1VfTUVTU0FHRV9SRUYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZlBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZiA9IDxQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWY+IHBhcnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVmUGFydC5pbmRleCgpID09PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGljdU1lc3NhZ2VSZWZQYXJ0ID0gcmVmUGFydDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBpY3VNZXNzYWdlUmVmUGFydCA/IGljdU1lc3NhZ2VSZWZQYXJ0LmRpc3AoKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBmb3IgYWRkZWQgdGFncy5cclxuICAgICAqIEByZXR1cm4gbnVsbCBvciBtZXNzYWdlLCBpZiBmdWxmaWxsZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tUYWdBZGRlZCgpOiBhbnkge1xyXG4gICAgICAgIGxldCBlID0gbnVsbDtcclxuICAgICAgICBjb25zdCBzdXNwaWNpb3VzVGFncyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZU1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlVGFncyA9IHRoaXMuc291cmNlTWVzc2FnZS5hbGxUYWdzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG15VGFncyA9IHRoaXMuYWxsVGFncygpO1xyXG4gICAgICAgICAgICBteVRhZ3MuZm9yRWFjaCgodGFnTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2VUYWdzLmhhcyh0YWdOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1c3BpY2lvdXNUYWdzLnB1c2godGFnTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3VzcGljaW91c1RhZ3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGUgPSAnYWRkZWQgdGFnIDwnICsgc3VzcGljaW91c1RhZ3NbMF0gKyAnPiwgd2hpY2ggaXMgbm90IGluIG9yaWdpbmFsIG1lc3NhZ2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3VzcGljaW91c1RhZ3MubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBsZXQgYWxsU3VzcGljaW91c1RhZ3MgPSAnJztcclxuICAgICAgICAgICAgbGV0IGZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3VzcGljaW91c1RhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWZpcnN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsU3VzcGljaW91c1RhZ3MgPSBhbGxTdXNwaWNpb3VzVGFncyArICcsICc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGxTdXNwaWNpb3VzVGFncyA9IGFsbFN1c3BpY2lvdXNUYWdzICsgJzwnICsgdGFnICsgJz4nO1xyXG4gICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGUgPSAnYWRkZWQgdGFncyAnICsgYWxsU3VzcGljaW91c1RhZ3MgKyAnLCB3aGljaCBhcmUgbm90IGluIG9yaWdpbmFsIG1lc3NhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGZvciByZW1vdmVkIHRhZ3MuXHJcbiAgICAgKiBAcmV0dXJuIG51bGwgb3IgbWVzc2FnZSwgaWYgZnVsZmlsbGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrVGFnUmVtb3ZlZCgpOiBhbnkge1xyXG4gICAgICAgIGxldCB3ID0gbnVsbDtcclxuICAgICAgICBjb25zdCBzdXNwaWNpb3VzVGFncyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNvdXJjZU1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlVGFncyA9IHRoaXMuc291cmNlTWVzc2FnZS5hbGxUYWdzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG15VGFncyA9IHRoaXMuYWxsVGFncygpO1xyXG4gICAgICAgICAgICBzb3VyY2VUYWdzLmZvckVhY2goKHRhZ05hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghbXlUYWdzLmhhcyh0YWdOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1c3BpY2lvdXNUYWdzLnB1c2godGFnTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3VzcGljaW91c1RhZ3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHcgPSAncmVtb3ZlZCB0YWcgPCcgKyBzdXNwaWNpb3VzVGFnc1swXSArICc+IGZyb20gb3JpZ2luYWwgbWVzc2FnZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdXNwaWNpb3VzVGFncy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIGxldCBhbGxTdXNwaWNpb3VzVGFncyA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgZmlyc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBzdXNwaWNpb3VzVGFncy5mb3JFYWNoKCh0YWcpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZmlyc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxTdXNwaWNpb3VzVGFncyA9IGFsbFN1c3BpY2lvdXNUYWdzICsgJywgJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsbFN1c3BpY2lvdXNUYWdzID0gYWxsU3VzcGljaW91c1RhZ3MgKyAnPCcgKyB0YWcgKyAnPic7XHJcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdyA9ICdyZW1vdmVkIHRhZ3MgJyArIGFsbFN1c3BpY2lvdXNUYWdzICsgJyBmcm9tIG9yaWdpbmFsIG1lc3NhZ2UnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgdGFnIG5hbWVzIHVzZWQgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWxsVGFncygpOiBTZXQ8c3RyaW5nPiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0cygpLmZvckVhY2goKHBhcnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhcnQudHlwZSA9PT0gUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlNUQVJUX1RBRyB8fCBwYXJ0LnR5cGUgPT09IFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTVBUWV9UQUcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSAoPFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWc+IHBhcnQpLnRhZ05hbWUoKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQodGFnTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwYXJ0cygpOiBQYXJzZWRNZXNzYWdlUGFydFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFydHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0WG1sUmVwcmVzZW50YXRpb24oeG1sUmVwcmVzZW50YXRpb246IEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl94bWxSZXByZXNlbnRhdGlvbiA9IHhtbFJlcHJlc2VudGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFRleHQodGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fcGFydHMucHVzaChuZXcgUGFyc2VkTWVzc2FnZVBhcnRUZXh0KHRleHQpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRQbGFjZWhvbGRlcihpbmRleDogbnVtYmVyLCBkaXNwOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9wYXJ0cy5wdXNoKG5ldyBQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyKGluZGV4LCBkaXNwKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3RhcnRUYWcodGFnbmFtZTogc3RyaW5nLCBpZGNvdW50ZXI6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3BhcnRzLnB1c2gobmV3IFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWcodGFnbmFtZSwgaWRjb3VudGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRW5kVGFnKHRhZ25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlbGwgZm9ybWVkXHJcbiAgICAgICAgY29uc3Qgb3BlblRhZyA9IHRoaXMuY2FsY3VsYXRlT3BlblRhZ05hbWUoKTtcclxuICAgICAgICBpZiAoIW9wZW5UYWcgfHwgb3BlblRhZyAhPT0gdGFnbmFtZSkge1xyXG4gICAgICAgICAgICAvLyBvb3BzLCBub3Qgd2VsbCBmb3JtZWRcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgndW5leHBlY3RlZCBjbG9zZSB0YWcgJXMgKGN1cnJlbnRseSBvcGVuIGlzICVzLCBuYXRpdmUgeG1sIGlzIFwiJXNcIiknLFxyXG4gICAgICAgICAgICAgICAgdGFnbmFtZSwgb3BlblRhZywgdGhpcy5hc05hdGl2ZVN0cmluZygpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BhcnRzLnB1c2gobmV3IFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnKHRhZ25hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFbXB0eVRhZyh0YWduYW1lOiBzdHJpbmcsIGlkY291bnRlcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcGFydHMucHVzaChuZXcgUGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZyh0YWduYW1lLCBpZGNvdW50ZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJQ1VNZXNzYWdlUmVmKGluZGV4OiBudW1iZXIsIGRpc3ApIHtcclxuICAgICAgICB0aGlzLl9wYXJ0cy5wdXNoKG5ldyBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWYoaW5kZXgsIGRpc3ApKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRJQ1VNZXNzYWdlKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3BhcnRzLnB1c2gobmV3IFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZSh0ZXh0LCB0aGlzLl9wYXJzZXIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGVybWluZSwgd2V0aGVyIHRoZXJlIGlzIGFuIG9wZW4gdGFnLCB0aGF0IGlzIG5vdCBjbG9zZWQuXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXRlc3Qgb25lIG9yIG51bGwsIGlmIHRoZXJlIGlzIG5vIG9wZW4gdGFnLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZU9wZW5UYWdOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb3BlblRhZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLl9wYXJ0cy5mb3JFYWNoKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGFydC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5TVEFSVF9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhZ3MucHVzaCgoPFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWc+IHBhcnQpLnRhZ05hbWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTkRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSAoPFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnPiBwYXJ0KS50YWdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5UYWdzLmxlbmd0aCA9PT0gMCB8fCBvcGVuVGFnc1tvcGVuVGFncy5sZW5ndGggLSAxXSAhPT0gdGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvb3BzLCBub3Qgd2VsbCBmb3JtZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlblRhZyA9IChvcGVuVGFncy5sZW5ndGggPT09IDApID8gJ25vdGhpbmcnIDogb3BlblRhZ3Nbb3BlblRhZ3MubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ3VuZXhwZWN0ZWQgY2xvc2UgdGFnICVzIChjdXJyZW50bHkgb3BlbiBpcyAlcywgbmF0aXZlIHhtbCBpcyBcIiVzXCIpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZ05hbWUsIG9wZW5UYWcsIHRoaXMuYXNOYXRpdmVTdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvcGVuVGFncy5wb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBvcGVuVGFncy5sZW5ndGggPT09IDAgPyBudWxsIDogb3BlblRhZ3Nbb3BlblRhZ3MubGVuZ3RoIC0gMV07XHJcbiAgICB9XHJcbn1cclxuIl19