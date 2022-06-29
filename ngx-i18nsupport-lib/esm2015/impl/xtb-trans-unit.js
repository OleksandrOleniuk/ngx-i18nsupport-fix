/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isNullOrUndefined } from 'util';
import { DOMUtilities } from './dom-utilities';
import { AbstractTransUnit } from './abstract-trans-unit';
import { XmbMessageParser } from './xmb-message-parser';
/**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
export class XtbTransUnit extends AbstractTransUnit {
    /**
     * @param {?} _element
     * @param {?} _id
     * @param {?} _translationMessagesFile
     * @param {?} _sourceTransUnitFromMaster
     */
    constructor(_element, _id, _translationMessagesFile, _sourceTransUnitFromMaster) {
        super(_element, _id, _translationMessagesFile);
        this._sourceTransUnitFromMaster = _sourceTransUnitFromMaster;
    }
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} content to translate.
     */
    sourceContent() {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceContent();
        }
        else {
            return null;
        }
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
        // xtb has no source content, they are part of the master
    }
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    messageParser() {
        return new XmbMessageParser(); // no typo!, Same as for Xmb
    }
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    createSourceContentNormalized() {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.createSourceContentNormalized();
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
        return DOMUtilities.getXMLContent(this._element);
    }
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    targetContentNormalized() {
        return this.messageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    }
    /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     * @return {?}
     */
    nativeTargetState() {
        if (this._sourceTransUnitFromMaster) {
            /** @type {?} */
            const sourceContent = this._sourceTransUnitFromMaster.sourceContent();
            if (!sourceContent || sourceContent === this.targetContent() || !this.targetContent()) {
                return 'new';
            }
            else {
                return 'final';
            }
        }
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
        // TODO some logic to store it anywhere
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
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceReferences();
        }
        else {
            return [];
        }
    }
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetSourceReferences() {
        return false;
    }
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    setSourceReferences(sourceRefs) {
        // xtb has no source refs, they are part of the master
    }
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    description() {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.description();
        }
        else {
            return null;
        }
    }
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    meaning() {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.meaning();
        }
        else {
            return null;
        }
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
     * In xtb there is nothing to do, because there is only a target, no source.
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
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    translateNative(translation) {
        /** @type {?} */
        const target = this._element;
        if (isNullOrUndefined(translation)) {
            translation = '';
        }
        DOMUtilities.replaceContentWithXMLContent(target, translation);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    XtbTransUnit.prototype._sourceTransUnitFromMaster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRiLXRyYW5zLXVuaXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3h0Yi10cmFucy11bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFLdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDOzs7OztBQVF0RCxNQUFNLE9BQU8sWUFBYSxTQUFRLGlCQUFpQjs7Ozs7OztJQUkvQyxZQUFZLFFBQWlCLEVBQUUsR0FBVyxFQUFFLHdCQUFrRCxFQUNsRiwwQkFBNkM7UUFDckQsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsMEJBQTBCLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBT00sYUFBYTtRQUNoQixJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNqQyxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMxRDthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7Ozs7Ozs7SUFPRCx3QkFBd0I7UUFDcEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7Ozs7SUFRTSxnQkFBZ0IsQ0FBQyxVQUFrQjtRQUN0Qyx5REFBeUQ7SUFDN0QsQ0FBQzs7Ozs7O0lBS1MsYUFBYTtRQUNuQixPQUFPLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLDRCQUE0QjtJQUMvRCxDQUFDOzs7OztJQUtNLDZCQUE2QjtRQUNoQyxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFB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QUNuQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVE7UUFDNUIsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNoQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsWUFBWSxDQUFDLDRCQUE0QixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBRUo7Ozs7OztJQXZRRyxrREFBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4uL2FwaS9pLXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge0lOb3JtYWxpemVkTWVzc2FnZX0gZnJvbSAnLi4vYXBpL2ktbm9ybWFsaXplZC1tZXNzYWdlJztcclxuaW1wb3J0IHtJVHJhbnNVbml0fSBmcm9tICcuLi9hcGkvaS10cmFucy11bml0JztcclxuaW1wb3J0IHtJTm90ZX0gZnJvbSAnLi4vYXBpL2ktbm90ZSc7XHJcbmltcG9ydCB7RE9NVXRpbGl0aWVzfSBmcm9tICcuL2RvbS11dGlsaXRpZXMnO1xyXG5pbXBvcnQge0Fic3RyYWN0VHJhbnNVbml0fSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zLXVuaXQnO1xyXG5pbXBvcnQge1htYk1lc3NhZ2VQYXJzZXJ9IGZyb20gJy4veG1iLW1lc3NhZ2UtcGFyc2VyJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlJztcclxuaW1wb3J0IHtBYnN0cmFjdE1lc3NhZ2VQYXJzZXJ9IGZyb20gJy4vYWJzdHJhY3QtbWVzc2FnZS1wYXJzZXInO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMjMuMDUuMjAxNy5cclxuICogQSBUcmFuc2xhdGlvbiBVbml0IGluIGFuIFhUQiBmaWxlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBYdGJUcmFuc1VuaXQgZXh0ZW5kcyBBYnN0cmFjdFRyYW5zVW5pdCBpbXBsZW1lbnRzIElUcmFuc1VuaXQge1xyXG5cclxuICAgIHByaXZhdGUgX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXI6IEFic3RyYWN0VHJhbnNVbml0O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKF9lbGVtZW50OiBFbGVtZW50LCBfaWQ6IHN0cmluZywgX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUsXHJcbiAgICAgICAgICAgICAgICBfc291cmNlVHJhbnNVbml0RnJvbU1hc3RlcjogQWJzdHJhY3RUcmFuc1VuaXQpIHtcclxuICAgICAgICBzdXBlcihfZWxlbWVudCwgX2lkLCBfdHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpO1xyXG4gICAgICAgIHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIgPSBfc291cmNlVHJhbnNVbml0RnJvbU1hc3RlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBjb250ZW50IHRvIHRyYW5zbGF0ZS5cclxuICAgICAqIFNvdXJjZSBwYXJ0cyBhcmUgZXhjbHVkZWQgaGVyZS5cclxuICAgICAqIEByZXR1cm4gY29udGVudCB0byB0cmFuc2xhdGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3VyY2VDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIuc291cmNlQ29udGVudCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIHNvdXJjZSBjb250ZW50IGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0U291cmNlQ29udGVudCBpbiB0cmFucy11bml0IHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBzdXBwb3J0c1NldFNvdXJjZUNvbnRlbnQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IG5ldyBzb3VyY2UgY29udGVudCBpbiB0aGUgdHJhbnN1bml0LlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMgZG9uZSBieSBuZy1leHRyYWN0LlxyXG4gICAgICogTWV0aG9kIG9ubHkgZXhpc3RzIHRvIGFsbG93IHhsaWZmbWVyZ2UgdG8gbWVyZ2UgbWlzc2luZyBjaGFuZ2VkIHNvdXJjZSBjb250ZW50LlxyXG4gICAgICogQHBhcmFtIG5ld0NvbnRlbnQgdGhlIG5ldyBjb250ZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U291cmNlQ29udGVudChuZXdDb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgICAvLyB4dGIgaGFzIG5vIHNvdXJjZSBjb250ZW50LCB0aGV5IGFyZSBwYXJ0IG9mIHRoZSBtYXN0ZXJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhIHBhcnNlciB1c2VkIGZvciBub3JtYWxpemVkIG1lc3NhZ2VzLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgbWVzc2FnZVBhcnNlcigpOiBBYnN0cmFjdE1lc3NhZ2VQYXJzZXIge1xyXG4gICAgICAgIHJldHVybiBuZXcgWG1iTWVzc2FnZVBhcnNlcigpOyAvLyBubyB0eXBvISwgU2FtZSBhcyBmb3IgWG1iXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3JpZ2luYWwgdGV4dCB2YWx1ZSwgdGhhdCBpcyB0byBiZSB0cmFuc2xhdGVkLCBhcyBub3JtYWxpemVkIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVTb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpOiBQYXJzZWRNZXNzYWdlIHtcclxuICAgICAgICBpZiAodGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlci5jcmVhdGVTb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB0cmFuc2xhdGVkIHZhbHVlIChjb250YWluaW5nIGFsbCBtYXJrdXAsIGRlcGVuZHMgb24gdGhlIGNvbmNyZXRlIGZvcm1hdCB1c2VkKS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldENvbnRlbnQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gRE9NVXRpbGl0aWVzLmdldFhNTENvbnRlbnQodGhpcy5fZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgdHJhbnNsYXRlZCB2YWx1ZSwgYnV0IGFsbCBwbGFjZWhvbGRlcnMgYXJlIHJlcGxhY2VkIHdpdGgge3tufX0gKHN0YXJ0aW5nIGF0IDApXHJcbiAgICAgKiBhbmQgYWxsIGVtYmVkZGVkIGh0bWwgaXMgcmVwbGFjZWQgYnkgZGlyZWN0IGh0bWwgbWFya3VwLlxyXG4gICAgICovXHJcbiAgICB0YXJnZXRDb250ZW50Tm9ybWFsaXplZCgpOiBJTm9ybWFsaXplZE1lc3NhZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VQYXJzZXIoKS5jcmVhdGVOb3JtYWxpemVkTWVzc2FnZUZyb21YTUwodGhpcy5fZWxlbWVudCwgdGhpcy5zb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXRlIG9mIHRoZSB0cmFuc2xhdGlvbi5cclxuICAgICAqIChub3Qgc3VwcG9ydGVkIGluIHhtYilcclxuICAgICAqIElmIHdlIGhhdmUgYSBtYXN0ZXIsIHdlIGFzc3VtZWQgaXQgaXMgdHJhbnNsYXRlZCBpZiB0aGUgY29udGVudCBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIG1hc3RlcnMgb25lLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmF0aXZlVGFyZ2V0U3RhdGUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlcikge1xyXG4gICAgICAgICAgICBjb25zdCBzb3VyY2VDb250ZW50ID0gdGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlci5zb3VyY2VDb250ZW50KCk7XHJcbiAgICAgICAgICAgIGlmICghc291cmNlQ29udGVudCB8fCBzb3VyY2VDb250ZW50ID09PSB0aGlzLnRhcmdldENvbnRlbnQoKSB8fCAhdGhpcy50YXJnZXRDb250ZW50KCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnbmV3JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZmluYWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsOyAvLyBub3Qgc3VwcG9ydGVkIGluIHhtYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIGFuIGFic3RyYWN0IHN0YXRlIChuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKSB0byBhIGNvbmNyZXRlIHN0YXRlIHVzZWQgaW4gdGhlIHhtbC5cclxuICAgICAqIFJldHVybnMgdGhlIHN0YXRlIHRvIGJlIHVzZWQgaW4gdGhlIHhtbC5cclxuICAgICAqIEBwYXJhbSBzdGF0ZSBvbmUgb2YgQ29uc3RhbnRzLlNUQVRFLi4uXHJcbiAgICAgKiBAcmV0dXJucyBhIG5hdGl2ZSBzdGF0ZSAoZGVwZW5kcyBvbiBjb25jcmV0ZSBmb3JtYXQpXHJcbiAgICAgKiBAdGhyb3dzIGVycm9yLCBpZiBzdGF0ZSBpcyBpbnZhbGlkLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwU3RhdGVUb05hdGl2ZVN0YXRlKHN0YXRlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcCBhIG5hdGl2ZSBzdGF0ZSAoZm91bmQgaW4gdGhlIGRvY3VtZW50KSB0byBhbiBhYnN0cmFjdCBzdGF0ZSAobmV3LCB0cmFuc2xhdGVkLCBmaW5hbCkuXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBhYnN0cmFjdCBzdGF0ZS5cclxuICAgICAqIEBwYXJhbSBuYXRpdmVTdGF0ZSBuYXRpdmVTdGF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgbWFwTmF0aXZlU3RhdGVUb1N0YXRlKG5hdGl2ZVN0YXRlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBuYXRpdmVTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCBzdGF0ZSBpbiB4bWwuXHJcbiAgICAgKiAobm90IHN1cHBvcnRlZCBpbiB4bWIpXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlU3RhdGUgbmF0aXZlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHNldE5hdGl2ZVRhcmdldFN0YXRlKG5hdGl2ZVN0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBUT0RPIHNvbWUgbG9naWMgdG8gc3RvcmUgaXQgYW55d2hlcmVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCB0aGUgc291cmNlIGVsZW1lbnRzIGluIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICogVGhlIHNvdXJjZSBlbGVtZW50IGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGNvbnRhaW5zIHRoZSBuYW1lIG9mIHRoZSB0ZW1wbGF0ZSBmaWxlIGFuZCBhIGxpbmUgbnVtYmVyIHdpdGggdGhlIHBvc2l0aW9uIGluc2lkZSB0aGUgdGVtcGxhdGUuXHJcbiAgICAgKiBJdCBpcyBqdXN0IGEgaGVscCBmb3IgdHJhbnNsYXRvcnMgdG8gZmluZCB0aGUgY29udGV4dCBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG4gICAgICogVGhpcyBpcyBzZXQgd2hlbiB1c2luZyBBbmd1bGFyIDQuMCBvciBncmVhdGVyLlxyXG4gICAgICogT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyBhbiBlbXB0eSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNvdXJjZVJlZmVyZW5jZXMoKTogeyBzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlciB9W10ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyLnNvdXJjZVJlZmVyZW5jZXMoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2Ygc291cmNlIHJlZnMgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXRTb3VyY2VSZWZlcmVuY2VzIHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3VwcG9ydHNTZXRTb3VyY2VSZWZlcmVuY2VzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzb3VyY2UgcmVmIGVsZW1lbnRzIGluIHRoZSB0cmFuc3VuaXQuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBkb25lIGJ5IG5nLWV4dHJhY3QuXHJcbiAgICAgKiBNZXRob2Qgb25seSBleGlzdHMgdG8gYWxsb3cgeGxpZmZtZXJnZSB0byBtZXJnZSBtaXNzaW5nIHNvdXJjZSByZWZzLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZVJlZnMgdGhlIHNvdXJjZXJlZnMgdG8gc2V0LiBPbGQgb25lcyBhcmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZVJlZmVyZW5jZXMoc291cmNlUmVmczoge3NvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlcjogbnVtYmVyfVtdKSB7XHJcbiAgICAgICAgLy8geHRiIGhhcyBubyBzb3VyY2UgcmVmcywgdGhleSBhcmUgcGFydCBvZiB0aGUgbWFzdGVyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGVzY3JpcHRpb24gc2V0IGluIHRoZSB0ZW1wbGF0ZSBhcyB2YWx1ZSBvZiB0aGUgaTE4bi1hdHRyaWJ1dGUuXHJcbiAgICAgKiBlLmcuIGkxOG49XCJteWRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKiBJbiB4dGIgb25seSB0aGUgbWFzdGVyIHN0b3JlcyBpdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIuZGVzY3JpcHRpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVhbmluZyAoaW50ZW50KSBzZXQgaW4gdGhlIHRlbXBsYXRlIGFzIHZhbHVlIG9mIHRoZSBpMThuLWF0dHJpYnV0ZS5cclxuICAgICAqIFRoaXMgaXMgdGhlIHBhcnQgaW4gZnJvbnQgb2YgdGhlIHwgc3ltYm9sLlxyXG4gICAgICogZS5nLiBpMThuPVwibWVhbmluZ3xteWRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKiBJbiB4dGIgb25seSB0aGUgbWFzdGVyIHN0b3JlcyBpdC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG1lYW5pbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlci5tZWFuaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2YgZGVzY3JpcHRpb24gYW5kIG1lYW5pbmcgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXREZXNjcmlwdGlvbiBhbmQgc2V0TWVhbmluZyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0RGVzY3JpcHRpb25BbmRNZWFuaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBkZXNjcmlwdGlvbiBwcm9wZXJ0eSBvZiB0cmFucy11bml0LlxyXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIGRlc2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCwgZG8gbm90aGluZ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIG1lYW5pbmcgcHJvcGVydHkgb2YgdHJhbnMtdW5pdC5cclxuICAgICAqIEBwYXJhbSBtZWFuaW5nIG1lYW5pbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldE1lYW5pbmcobWVhbmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCwgZG8gbm90aGluZ1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBub3RlcyBvZiB0aGUgdHJhbnMtdW5pdC5cclxuICAgICAqIFRoZXJlIGFyZSBOTyBub3RlcyBpbiB4bWIveHRiXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBub3RlcygpOiBJTm90ZVtdIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBub3RlcyBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldE5vdGVzIHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3VwcG9ydHNTZXROb3RlcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgbm90ZXMgdG8gdHJhbnMgdW5pdC5cclxuICAgICAqIEBwYXJhbSBuZXdOb3RlcyB0aGUgbm90ZXMgdG8gYWRkLlxyXG4gICAgICogTk9UIFN1cHBvcnRlZCBpbiB4bWIveHRiXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROb3RlcyhuZXdOb3RlczogSU5vdGVbXSkge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQsIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcHkgc291cmNlIHRvIHRhcmdldCB0byB1c2UgaXQgYXMgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiBSZXR1cm5zIGEgY2hhbmdlZCBjb3B5IG9mIHRoaXMgdHJhbnMgdW5pdC5cclxuICAgICAqIHJlY2VpdmVyIGlzIG5vdCBjaGFuZ2VkLlxyXG4gICAgICogKGludGVybmFsIHVzYWdlIG9ubHksIGEgY2xpZW50IHNob3VsZCBjYWxsIGltcG9ydE5ld1RyYW5zVW5pdCBvbiBJVHJhbnNsYXRpb25NZXNzYWdlRmlsZSlcclxuICAgICAqIEluIHh0YiB0aGVyZSBpcyBub3RoaW5nIHRvIGRvLCBiZWNhdXNlIHRoZXJlIGlzIG9ubHkgYSB0YXJnZXQsIG5vIHNvdXJjZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb25lV2l0aFNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuLCB0YXJnZXRGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpOiBBYnN0cmFjdFRyYW5zVW5pdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHNvdXJjZSB0byB0YXJnZXQgdG8gdXNlIGl0IGFzIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogKGludGVybmFsIHVzYWdlIG9ubHksIGEgY2xpZW50IHNob3VsZCBjYWxsIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcgb24gSVRyYW5zbGF0aW9uTWVzc2FnZUZpbGUpXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbikge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdHJhbnNsYXRpb24gdG8gYSBnaXZlbiBzdHJpbmcgKGluY2x1ZGluZyBtYXJrdXApLlxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uIHRyYW5zbGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGVOYXRpdmUodHJhbnNsYXRpb246IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuX2VsZW1lbnQ7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHRyYW5zbGF0aW9uKSkge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbiA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBET01VdGlsaXRpZXMucmVwbGFjZUNvbnRlbnRXaXRoWE1MQ29udGVudCh0YXJnZXQsIHRyYW5zbGF0aW9uKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19