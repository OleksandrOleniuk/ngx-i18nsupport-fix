/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOMUtilities } from './dom-utilities';
import { AbstractTransUnit } from './abstract-trans-unit';
import { XmbMessageParser } from './xmb-message-parser';
/**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XMB file.
 */
export class XmbTransUnit extends AbstractTransUnit {
    /**
     * @param {?} _element
     * @param {?} _id
     * @param {?} _translationMessagesFile
     */
    constructor(_element, _id, _translationMessagesFile) {
        super(_element, _id, _translationMessagesFile);
    }
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and linenumber
     */
    static parseSourceAndPos(sourceAndPos) {
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
                linenumber: XmbTransUnit.parseLineNumber(sourceAndPos.substring(index + 1))
            };
        }
    }
    /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    static parseLineNumber(lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    }
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} source content
     */
    sourceContent() {
        /** @type {?} */
        let msgContent = DOMUtilities.getXMLContent(this._element);
        /** @type {?} */
        const reSourceElem = /<source>.*<\/source>/g;
        msgContent = msgContent.replace(reSourceElem, '');
        return msgContent;
    }
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetSourceContent() {
        return false;
    }
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    setSourceContent(newContent) {
        // not supported
    }
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    messageParser() {
        return new XmbMessageParser();
    }
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    createSourceContentNormalized() {
        return this.messageParser().createNormalizedMessageFromXML(this._element, null);
    }
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    targetContent() {
        // in fact, target and source are just the same in xmb
        return this.sourceContent();
    }
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    targetContentNormalized() {
        return new XmbMessageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    }
    /**
     * State of the translation.
     * (not supported in xmb)
     * @return {?}
     */
    nativeTargetState() {
        return null; // not supported in xmb
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
        return state;
    }
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    mapNativeStateToState(nativeState) {
        return nativeState;
    }
    /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    setNativeTargetState(nativeState) {
        // not supported for xmb
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
        /** @type {?} */
        const sourceElements = this._element.getElementsByTagName('source');
        /** @type {?} */
        const sourceRefs = [];
        for (let i = 0; i < sourceElements.length; i++) {
            /** @type {?} */
            const elem = sourceElements.item(i);
            /** @type {?} */
            const sourceAndPos = DOMUtilities.getPCDATA(elem);
            sourceRefs.push(XmbTransUnit.parseSourceAndPos(sourceAndPos));
        }
        return sourceRefs;
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
        let insertPosition = this._element.childNodes.item(0);
        for (let i = sourceRefs.length - 1; i >= 0; i--) {
            /** @type {?} */
            const ref = sourceRefs[i];
            /** @type {?} */
            const source = this._element.ownerDocument.createElement('source');
            source.appendChild(this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            this._element.insertBefore(source, insertPosition);
            insertPosition = source;
        }
    }
    /**
     * @private
     * @return {?}
     */
    removeAllSourceReferences() {
        /** @type {?} */
        const sourceElements = this._element.getElementsByTagName('source');
        /** @type {?} */
        const toBeRemoved = [];
        for (let i = 0; i < sourceElements.length; i++) {
            /** @type {?} */
            const elem = sourceElements.item(i);
            toBeRemoved.push(elem);
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
     * In xmb this is stored in the attribute "desc".
     * @return {?}
     */
    description() {
        return this._element.getAttribute('desc');
    }
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xmb this is stored in the attribute "meaning".
     * @return {?}
     */
    meaning() {
        return this._element.getAttribute('meaning');
    }
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetDescriptionAndMeaning() {
        return false;
    }
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    setDescription(description) {
        // not supported, do nothing
    }
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    setMeaning(meaning) {
        // not supported, do nothing
    }
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    notes() {
        return [];
    }
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetNotes() {
        return false;
    }
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    setNotes(newNotes) {
        // not supported, do nothing
    }
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xmb there is nothing to do, because there is only a target, no source.
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    cloneWithSourceAsTarget(isDefaultLang, copyContent, targetFile) {
        return this;
    }
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    useSourceAsTarget(isDefaultLang, copyContent) {
        // do nothing
    }
    /**
     * Set the translation to a given string (including markup).
     * In fact, xmb cannot be translated.
     * So this throws an error.
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    translateNative(translation) {
        throw new Error('You cannot translate xmb files, use xtb instead.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iLXRyYW5zLXVuaXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3htYi10cmFucy11bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBUXRELE1BQU0sT0FBTyxZQUFhLFNBQVEsaUJBQWlCOzs7Ozs7SUFFL0MsWUFBWSxRQUFpQixFQUFFLEdBQVcsRUFBRSx3QkFBa0Q7UUFDMUYsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7Ozs7O0lBT08sTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQW9COztjQUMzQyxLQUFLLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDM0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsT0FBTztnQkFDSCxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsVUFBVSxFQUFFLENBQUM7YUFDaEIsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPO2dCQUNILFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7Z0JBQzVDLFVBQVUsRUFBRSxZQUFZLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzlFLENBQUM7U0FDTDtJQUNMLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQXdCO1FBQ25ELE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztJ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LENBQUMsUUFBaUI7UUFDN0IsNEJBQTRCO0lBQ2hDLENBQUM7Ozs7Ozs7Ozs7OztJQVNNLHVCQUF1QixDQUFDLGFBQXNCLEVBQUUsV0FBb0IsRUFBRSxVQUFvQztRQUM3RyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7OztJQU1NLGlCQUFpQixDQUFDLGFBQXNCLEVBQUUsV0FBb0I7UUFDakUsYUFBYTtJQUNqQixDQUFDOzs7Ozs7Ozs7SUFRUyxlQUFlLENBQUMsV0FBbUI7UUFDekMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuLi9hcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtJTm9ybWFsaXplZE1lc3NhZ2V9IGZyb20gJy4uL2FwaS9pLW5vcm1hbGl6ZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnLi4vYXBpL2ktdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7SU5vdGV9IGZyb20gJy4uL2FwaS9pLW5vdGUnO1xyXG5pbXBvcnQge0RPTVV0aWxpdGllc30gZnJvbSAnLi9kb20tdXRpbGl0aWVzJztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zVW5pdH0gZnJvbSAnLi9hYnN0cmFjdC10cmFucy11bml0JztcclxuaW1wb3J0IHtYbWJNZXNzYWdlUGFyc2VyfSBmcm9tICcuL3htYi1tZXNzYWdlLXBhcnNlcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDAxLjA1LjIwMTcuXHJcbiAqIEEgVHJhbnNsYXRpb24gVW5pdCBpbiBhbiBYTUIgZmlsZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgWG1iVHJhbnNVbml0IGV4dGVuZHMgQWJzdHJhY3RUcmFuc1VuaXQgaW1wbGVtZW50cyBJVHJhbnNVbml0IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudDogRWxlbWVudCwgX2lkOiBzdHJpbmcsIF90cmFuc2xhdGlvbk1lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKSB7XHJcbiAgICAgICAgc3VwZXIoX2VsZW1lbnQsIF9pZCwgX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlcyBzb21ldGhpbmcgbGlrZSAnYzpcXHh4eDo3JyBhbmQgcmV0dXJucyBzb3VyY2UgYW5kIGxpbmVudW1iZXIuXHJcbiAgICAgKiBAcGFyYW0gc291cmNlQW5kUG9zIHNvbWV0aGluZyBsaWtlICdjOlxceHh4OjcnLCBsYXN0IGNvbG9uIGlzIHRoZSBzZXBhcmF0b3JcclxuICAgICAqIEByZXR1cm4gc291cmNlIGFuZCBsaW5lbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlU291cmNlQW5kUG9zKHNvdXJjZUFuZFBvczogc3RyaW5nKTogeyBzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXIgfSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBzb3VyY2VBbmRQb3MubGFzdEluZGV4T2YoJzonKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VmaWxlOiBzb3VyY2VBbmRQb3MsXHJcbiAgICAgICAgICAgICAgICBsaW5lbnVtYmVyOiAwXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZWZpbGU6IHNvdXJjZUFuZFBvcy5zdWJzdHJpbmcoMCwgaW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgbGluZW51bWJlcjogWG1iVHJhbnNVbml0LnBhcnNlTGluZU51bWJlcihzb3VyY2VBbmRQb3Muc3Vic3RyaW5nKGluZGV4ICsgMSkpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHBhcnNlTGluZU51bWJlcihsaW5lTnVtYmVyU3RyaW5nOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQobGluZU51bWJlclN0cmluZywgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGNvbnRlbnQgdG8gdHJhbnNsYXRlLlxyXG4gICAgICogU291cmNlIHBhcnRzIGFyZSBleGNsdWRlZCBoZXJlLlxyXG4gICAgICogQHJldHVybiBzb3VyY2UgY29udGVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlQ29udGVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBtc2dDb250ZW50ID0gRE9NVXRpbGl0aWVzLmdldFhNTENvbnRlbnQodGhpcy5fZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgcmVTb3VyY2VFbGVtOiBSZWdFeHAgPSAvPHNvdXJjZT4uKjxcXC9zb3VyY2U+L2c7XHJcbiAgICAgICAgbXNnQ29udGVudCA9IG1zZ0NvbnRlbnQucmVwbGFjZShyZVNvdXJjZUVsZW0sICcnKTtcclxuICAgICAgICByZXR1cm4gbXNnQ29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIHNvdXJjZSBjb250ZW50IGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0U291cmNlQ29udGVudCBpbiB0cmFucy11bml0IHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBzdXBwb3J0c1NldFNvdXJjZUNvbnRlbnQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IG5ldyBzb3VyY2UgY29udGVudCBpbiB0aGUgdHJhbnN1bml0LlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMgZG9uZSBieSBuZy1leHRyYWN0LlxyXG4gICAgICogTWV0aG9kIG9ubHkgZXhpc3RzIHRvIGFsbG93IHhsaWZmbWVyZ2UgdG8gbWVyZ2UgbWlzc2luZyBjaGFuZ2VkIHNvdXJjZSBjb250ZW50LlxyXG4gICAgICogQHBhcmFtIG5ld0NvbnRlbnQgdGhlIG5ldyBjb250ZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U291cmNlQ29udGVudChuZXdDb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBwYXJzZXIgdXNlZCBmb3Igbm9ybWFsaXplZCBtZXNzYWdlcy5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VQYXJzZXIoKTogQWJzdHJhY3RNZXNzYWdlUGFyc2VyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFhtYk1lc3NhZ2VQYXJzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCB0ZXh0IHZhbHVlLCB0aGF0IGlzIHRvIGJlIHRyYW5zbGF0ZWQsIGFzIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZVNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VQYXJzZXIoKS5jcmVhdGVOb3JtYWxpemVkTWVzc2FnZUZyb21YTUwodGhpcy5fZWxlbWVudCwgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgdHJhbnNsYXRlZCB2YWx1ZSAoY29udGFpbmluZyBhbGwgbWFya3VwLCBkZXBlbmRzIG9uIHRoZSBjb25jcmV0ZSBmb3JtYXQgdXNlZCkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0YXJnZXRDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gaW4gZmFjdCwgdGFyZ2V0IGFuZCBzb3VyY2UgYXJlIGp1c3QgdGhlIHNhbWUgaW4geG1iXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlQ29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHRyYW5zbGF0ZWQgdmFsdWUsIGJ1dCBhbGwgcGxhY2Vob2xkZXJzIGFyZSByZXBsYWNlZCB3aXRoIHt7bn19IChzdGFydGluZyBhdCAwKVxyXG4gICAgICogYW5kIGFsbCBlbWJlZGRlZCBodG1sIGlzIHJlcGxhY2VkIGJ5IGRpcmVjdCBodG1sIG1hcmt1cC5cclxuICAgICAqL1xyXG4gICAgdGFyZ2V0Q29udGVudE5vcm1hbGl6ZWQoKTogSU5vcm1hbGl6ZWRNZXNzYWdlIHtcclxuICAgICAgICByZXR1cm4gbmV3IFhtYk1lc3NhZ2VQYXJzZXIoKS5jcmVhdGVOb3JtYWxpemVkTWVzc2FnZUZyb21YTUwodGhpcy5fZWxlbWVudCwgdGhpcy5zb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXRlIG9mIHRoZSB0cmFuc2xhdGlvbi5cclxuICAgICAqIChub3Qgc3VwcG9ydGVkIGluIHhtYilcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hdGl2ZVRhcmdldFN0YXRlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7IC8vIG5vdCBzdXBwb3J0ZWQgaW4geG1iXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXAgYW4gYWJzdHJhY3Qgc3RhdGUgKG5ldywgdHJhbnNsYXRlZCwgZmluYWwpIHRvIGEgY29uY3JldGUgc3RhdGUgdXNlZCBpbiB0aGUgeG1sLlxyXG4gICAgICogUmV0dXJucyB0aGUgc3RhdGUgdG8gYmUgdXNlZCBpbiB0aGUgeG1sLlxyXG4gICAgICogQHBhcmFtIHN0YXRlIG9uZSBvZiBDb25zdGFudHMuU1RBVEUuLi5cclxuICAgICAqIEByZXR1cm5zIGEgbmF0aXZlIHN0YXRlIChkZXBlbmRzIG9uIGNvbmNyZXRlIGZvcm1hdClcclxuICAgICAqIEB0aHJvd3MgZXJyb3IsIGlmIHN0YXRlIGlzIGludmFsaWQuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBtYXBTdGF0ZVRvTmF0aXZlU3RhdGUoc3RhdGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIGEgbmF0aXZlIHN0YXRlIChmb3VuZCBpbiB0aGUgZG9jdW1lbnQpIHRvIGFuIGFic3RyYWN0IHN0YXRlIChuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKS5cclxuICAgICAqIFJldHVybnMgdGhlIGFic3RyYWN0IHN0YXRlLlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0YXRlIG5hdGl2ZVN0YXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBtYXBOYXRpdmVTdGF0ZVRvU3RhdGUobmF0aXZlU3RhdGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZVN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHN0YXRlIGluIHhtbC5cclxuICAgICAqIChub3Qgc3VwcG9ydGVkIGluIHhtYilcclxuICAgICAqIEBwYXJhbSBuYXRpdmVTdGF0ZSBuYXRpdmVTdGF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgc2V0TmF0aXZlVGFyZ2V0U3RhdGUobmF0aXZlU3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgZm9yIHhtYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIHRoZSBzb3VyY2UgZWxlbWVudHMgaW4gdGhlIHRyYW5zIHVuaXQuXHJcbiAgICAgKiBUaGUgc291cmNlIGVsZW1lbnQgaXMgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxyXG4gICAgICogSXQgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIHRlbXBsYXRlIGZpbGUgYW5kIGEgbGluZSBudW1iZXIgd2l0aCB0aGUgcG9zaXRpb24gaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGlzIGp1c3QgYSBoZWxwIGZvciB0cmFuc2xhdG9ycyB0byBmaW5kIHRoZSBjb250ZXh0IGZvciB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgKiBUaGlzIGlzIHNldCB3aGVuIHVzaW5nIEFuZ3VsYXIgNC4wIG9yIGdyZWF0ZXIuXHJcbiAgICAgKiBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIGFuIGVtcHR5IGFycmF5LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlUmVmZXJlbmNlcygpOiB7IHNvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlcjogbnVtYmVyIH1bXSB7XHJcbiAgICAgICAgY29uc3Qgc291cmNlRWxlbWVudHMgPSB0aGlzLl9lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzb3VyY2UnKTtcclxuICAgICAgICBjb25zdCBzb3VyY2VSZWZzOiB7IHNvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlcjogbnVtYmVyIH1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZWxlbSA9IHNvdXJjZUVsZW1lbnRzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUFuZFBvczogc3RyaW5nID0gRE9NVXRpbGl0aWVzLmdldFBDREFUQShlbGVtKTtcclxuICAgICAgICAgICAgc291cmNlUmVmcy5wdXNoKFhtYlRyYW5zVW5pdC5wYXJzZVNvdXJjZUFuZFBvcyhzb3VyY2VBbmRQb3MpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZVJlZnM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc291cmNlIHJlZiBlbGVtZW50cyBpbiB0aGUgdHJhbnN1bml0LlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMgZG9uZSBieSBuZy1leHRyYWN0LlxyXG4gICAgICogTWV0aG9kIG9ubHkgZXhpc3RzIHRvIGFsbG93IHhsaWZmbWVyZ2UgdG8gbWVyZ2UgbWlzc2luZyBzb3VyY2UgcmVmcy5cclxuICAgICAqIEBwYXJhbSBzb3VyY2VSZWZzIHRoZSBzb3VyY2VyZWZzIHRvIHNldC4gT2xkIG9uZXMgYXJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTb3VyY2VSZWZlcmVuY2VzKHNvdXJjZVJlZnM6IHtzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlcn1bXSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsU291cmNlUmVmZXJlbmNlcygpO1xyXG4gICAgICAgIGxldCBpbnNlcnRQb3NpdGlvbiA9IHRoaXMuX2VsZW1lbnQuY2hpbGROb2Rlcy5pdGVtKDApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBzb3VyY2VSZWZzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IHNvdXJjZVJlZnNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcclxuICAgICAgICAgICAgc291cmNlLmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShyZWYuc291cmNlZmlsZSArICc6JyArIHJlZi5saW5lbnVtYmVyLnRvU3RyaW5nKDEwKSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50Lmluc2VydEJlZm9yZShzb3VyY2UsIGluc2VydFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaW5zZXJ0UG9zaXRpb24gPSBzb3VyY2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQWxsU291cmNlUmVmZXJlbmNlcygpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2VFbGVtZW50cyA9IHRoaXMuX2VsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xyXG4gICAgICAgIGNvbnN0IHRvQmVSZW1vdmVkID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2VFbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtID0gc291cmNlRWxlbWVudHMuaXRlbShpKTtcclxuICAgICAgICAgICAgdG9CZVJlbW92ZWQucHVzaChlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9CZVJlbW92ZWQuZm9yRWFjaCgoZWxlbSkgPT4ge2VsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVzY3JpcHRpb24gc2V0IGluIHRoZSB0ZW1wbGF0ZSBhcyB2YWx1ZSBvZiB0aGUgaTE4bi1hdHRyaWJ1dGUuXHJcbiAgICAgKiBlLmcuIGkxOG49XCJteWRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKiBJbiB4bWIgdGhpcyBpcyBzdG9yZWQgaW4gdGhlIGF0dHJpYnV0ZSBcImRlc2NcIi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkZXNjJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVhbmluZyAoaW50ZW50KSBzZXQgaW4gdGhlIHRlbXBsYXRlIGFzIHZhbHVlIG9mIHRoZSBpMThuLWF0dHJpYnV0ZS5cclxuICAgICAqIFRoaXMgaXMgdGhlIHBhcnQgaW4gZnJvbnQgb2YgdGhlIHwgc3ltYm9sLlxyXG4gICAgICogZS5nLiBpMThuPVwibWVhbmluZ3xteWRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKiBJbiB4bWIgdGhpcyBpcyBzdG9yZWQgaW4gdGhlIGF0dHJpYnV0ZSBcIm1lYW5pbmdcIi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG1lYW5pbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ21lYW5pbmcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIGRlc2NyaXB0aW9uIGFuZCBtZWFuaW5nIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0RGVzY3JpcHRpb24gYW5kIHNldE1lYW5pbmcgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdXBwb3J0c1NldERlc2NyaXB0aW9uQW5kTWVhbmluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgZGVzY3JpcHRpb24gcHJvcGVydHkgb2YgdHJhbnMtdW5pdC5cclxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiBkZXNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZykge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQsIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBtZWFuaW5nIHByb3BlcnR5IG9mIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBAcGFyYW0gbWVhbmluZyBtZWFuaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRNZWFuaW5nKG1lYW5pbmc6IHN0cmluZykge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQsIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgbm90ZXMgb2YgdGhlIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBUaGVyZSBhcmUgTk8gbm90ZXMgaW4geG1iL3h0YlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbm90ZXMoKTogSU5vdGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2Ygbm90ZXMgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXROb3RlcyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0Tm90ZXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG5vdGVzIHRvIHRyYW5zIHVuaXQuXHJcbiAgICAgKiBAcGFyYW0gbmV3Tm90ZXMgdGhlIG5vdGVzIHRvIGFkZC5cclxuICAgICAqIE5PVCBTdXBwb3J0ZWQgaW4geG1iL3h0YlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Tm90ZXMobmV3Tm90ZXM6IElOb3RlW10pIHtcclxuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkLCBkbyBub3RoaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHNvdXJjZSB0byB0YXJnZXQgdG8gdXNlIGl0IGFzIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogUmV0dXJucyBhIGNoYW5nZWQgY29weSBvZiB0aGlzIHRyYW5zIHVuaXQuXHJcbiAgICAgKiByZWNlaXZlciBpcyBub3QgY2hhbmdlZC5cclxuICAgICAqIChpbnRlcm5hbCB1c2FnZSBvbmx5LCBhIGNsaWVudCBzaG91bGQgY2FsbCBpbXBvcnROZXdUcmFuc1VuaXQgb24gSVRyYW5zbGF0aW9uTWVzc2FnZUZpbGUpXHJcbiAgICAgKiBJbiB4bWIgdGhlcmUgaXMgbm90aGluZyB0byBkbywgYmVjYXVzZSB0aGVyZSBpcyBvbmx5IGEgdGFyZ2V0LCBubyBzb3VyY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZVdpdGhTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbiwgdGFyZ2V0RmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTogQWJzdHJhY3RUcmFuc1VuaXQge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29weSBzb3VyY2UgdG8gdGFyZ2V0IHRvIHVzZSBpdCBhcyBkdW1teSB0cmFuc2xhdGlvbi5cclxuICAgICAqIChpbnRlcm5hbCB1c2FnZSBvbmx5LCBhIGNsaWVudCBzaG91bGQgY2FsbCBjcmVhdGVUcmFuc2xhdGlvbkZpbGVGb3JMYW5nIG9uIElUcmFuc2xhdGlvbk1lc3NhZ2VGaWxlKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXNlU291cmNlQXNUYXJnZXQoaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRyYW5zbGF0aW9uIHRvIGEgZ2l2ZW4gc3RyaW5nIChpbmNsdWRpbmcgbWFya3VwKS5cclxuICAgICAqIEluIGZhY3QsIHhtYiBjYW5ub3QgYmUgdHJhbnNsYXRlZC5cclxuICAgICAqIFNvIHRoaXMgdGhyb3dzIGFuIGVycm9yLlxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uIHRyYW5zbGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVOYXRpdmUodHJhbnNsYXRpb246IHN0cmluZykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbm5vdCB0cmFuc2xhdGUgeG1iIGZpbGVzLCB1c2UgeHRiIGluc3RlYWQuJyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==