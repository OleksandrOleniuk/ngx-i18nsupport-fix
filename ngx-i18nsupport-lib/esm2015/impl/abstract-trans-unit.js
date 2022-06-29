/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { STATE_TRANSLATED } from './internalapi';
import { AbstractTranslationMessagesFile } from './abstract-translation-messages-file';
import { isNullOrUndefined, isString } from 'util';
/**
 * Created by roobm on 10.05.2017.
 * Abstract superclass for all implementations of ITransUnit.
 * @abstract
 */
export class AbstractTransUnit {
    /**
     * @protected
     * @param {?} _element
     * @param {?} _id
     * @param {?} _translationMessagesFile
     */
    constructor(_element, _id, _translationMessagesFile) {
        this._element = _element;
        this._id = _id;
        this._translationMessagesFile = _translationMessagesFile;
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * The file the unit belongs to.,
     * @return {?}
     */
    translationMessagesFile() {
        return this._translationMessagesFile;
    }
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetSourceContent() {
        return true;
    }
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    sourceContentNormalized() {
        if (isNullOrUndefined(this._sourceContentNormalized)) {
            this._sourceContentNormalized = this.createSourceContentNormalized();
        }
        return this._sourceContentNormalized;
    }
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     * @return {?}
     */
    targetState() {
        /** @type {?} */
        const nativeState = this.nativeTargetState();
        return this.mapNativeStateToState(nativeState);
    }
    /**
     * Modify the target state.
     * @param {?} newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     * @return {?}
     */
    setTargetState(newState) {
        this.setNativeTargetState(this.mapStateToNativeState(newState));
        if (this.translationMessagesFile() instanceof AbstractTranslationMessagesFile) {
            ((/** @type {?} */ (this.translationMessagesFile()))).countNumbers();
        }
    }
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetSourceReferences() {
        return true;
    }
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    supportsSetDescriptionAndMeaning() {
        return true;
    }
    /**
     * Check notes
     * @throws an Error if any note contains description or meaning as from attribute.
     * @protected
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    checkNotes(newNotes) {
        // check from values
        /** @type {?} */
        const errorInFromNote = newNotes.find((/**
         * @param {?} note
         * @return {?}
         */
        (note) => note.from === 'description' || note.from === 'meaning'));
        if (!isNullOrUndefined(errorInFromNote)) {
            throw new Error('description or meaning are not allowed as from atttribute');
        }
    }
    /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return {?} real xml element used for the trans unit.
     */
    asXmlElement() {
        return this._element;
    }
    /**
     * Translate the trans unit.
     * @param {?} translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     * @return {?}
     */
    translate(translation) {
        /** @type {?} */
        let translationNative;
        if (isString(translation)) {
            translationNative = (/** @type {?} */ (translation));
        }
        else {
            translationNative = ((/** @type {?} */ (translation))).asNativeString();
        }
        this.translateNative(translationNative);
        this.setTargetState(STATE_TRANSLATED);
    }
    /**
     * Test, wether message looks like ICU message.
     * @param {?} message message
     * @return {?} wether message looks like ICU message.
     */
    isICUMessage(message) {
        return this.messageParser().isICUMessageStart(message);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AbstractTransUnit.prototype._sourceContentNormalized;
    /**
     * @type {?}
     * @protected
     */
    AbstractTransUnit.prototype._element;
    /**
     * @type {?}
     * @protected
     */
    AbstractTransUnit.prototype._id;
    /**
     * @type {?}
     * @protected
     */
    AbstractTransUnit.prototype._translationMessagesFile;
    /**
     * The original text value, that is to be translated.
     * Contains all markup, depends on the concrete format used.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.sourceContent = function () { };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @abstract
     * @param {?} newContent the new content.
     * @return {?}
     */
    AbstractTransUnit.prototype.setSourceContent = function (newContent) { };
    /**
     * The original text value, that is to be translated, as normalized message.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.createSourceContentNormalized = function () { };
    /**
     * The translated value.
     * Contains all markup, depends on the concrete format used.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.targetContent = function () { };
    /**
     * The translated value as normalized message.
     * All placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.targetContentNormalized = function () { };
    /**
     * State of the translation as stored in the xml.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.nativeTargetState = function () { };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @abstract
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    AbstractTransUnit.prototype.mapStateToNativeState = function (state) { };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @abstract
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    AbstractTransUnit.prototype.mapNativeStateToState = function (nativeState) { };
    /**
     * set state in xml.
     * @abstract
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    AbstractTransUnit.prototype.setNativeTargetState = function (nativeState) { };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.sourceReferences = function () { };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @abstract
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    AbstractTransUnit.prototype.setSourceReferences = function (sourceRefs) { };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.description = function () { };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.meaning = function () { };
    /**
     * Change description property of trans-unit.
     * @abstract
     * @param {?} description description
     * @return {?}
     */
    AbstractTransUnit.prototype.setDescription = function (description) { };
    /**
     * Change meaning property of trans-unit.
     * @abstract
     * @param {?} meaning meaning
     * @return {?}
     */
    AbstractTransUnit.prototype.setMeaning = function (meaning) { };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.notes = function () { };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @abstract
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetNotes = function () { };
    /**
     * Add notes to trans unit.
     * @throws an Error if any note contains descpription or meaning as from attribute.
     * @abstract
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    AbstractTransUnit.prototype.setNotes = function (newNotes) { };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @abstract
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    AbstractTransUnit.prototype.cloneWithSourceAsTarget = function (isDefaultLang, copyContent, targetFile) { };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @abstract
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    AbstractTransUnit.prototype.useSourceAsTarget = function (isDefaultLang, copyContent) { };
    /**
     * Return a parser used for normalized messages.
     * @abstract
     * @protected
     * @return {?}
     */
    AbstractTransUnit.prototype.messageParser = function () { };
    /**
     * Set the translation to a given string (including markup).
     * @abstract
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    AbstractTransUnit.prototype.translateNative = function (translation) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdHJhbnMtdW5pdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvYWJzdHJhY3QtdHJhbnMtdW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGdCQUFnQixFQUFrRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRixPQUFPLEVBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7Ozs7QUFRakQsTUFBTSxPQUFnQixpQkFBaUI7Ozs7Ozs7SUFJbkMsWUFBZ0MsUUFBaUIsRUFDakIsR0FBVyxFQUNYLHdCQUFrRDtRQUZsRCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFDWCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO0lBQ2xGLENBQUM7Ozs7SUFFRCxJQUFXLEVBQUU7UUFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFLRCx1QkFBdUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDekMsQ0FBQzs7Ozs7OztJQWFELHdCQUF3QjtRQUNwQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQWFNLHVCQUF1QjtRQUMxQixJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztTQUN4RTtRQUNELE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDO0lBQ3pDLENBQUM7Ozs7Ozs7SUE4Qk0sV0FBVzs7Y0FDUixXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1FBQzVDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7Ozs7O0lBOEJELGNBQWMsQ0FBQyxRQUFnQjtRQUMzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsWUFBWSwrQkFBK0IsRUFBRTtZQUMzRSxDQUFDLG1CQUFrQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBQSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckY7SUFDTCxDQUFDOzs7Ozs7O0lBaUJNLDJCQUEyQjtRQUM5QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBNEJNLGdDQUFnQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7OztJQXdDUyxVQUFVLENBQUMsUUFBaUI7OztjQUU1QixlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUk7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxhQUFhLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUM7UUFDdkcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkRBQTJELENBQUMsQ0FBQztTQUNoRjtJQUNMLENBQUM7Ozs7OztJQU9NLFlBQVk7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Ozs7Ozs7O0lBdUJNLFNBQVMsQ0FBQyxXQUF3Qzs7WUFDakQsaUJBQXlCO1FBQzdCLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZCLGlCQUFpQixHQUFHLG1CQUFTLFdBQVcsRUFBQSxDQUFDO1NBQzVDO2FBQU07WUFDSCxpQkFBaUIsR0FBRyxDQUFDLG1CQUFxQixXQUFXLEVBQUEsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNFO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7SUFZTSxZQUFZLENBQUMsT0FBZTtRQUMvQixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBT0o7Ozs7OztJQWxSRyxxREFBZ0Q7Ozs7O0lBRTFCLHFDQUEyQjs7Ozs7SUFDM0IsZ0NBQXFCOzs7OztJQUNyQixxREFBNEQ7Ozs7Ozs7SUFrQmxGLDREQUFpQzs7Ozs7Ozs7O0lBaUJqQyx5RUFBOEM7Ozs7OztJQWU5Qyw0RUFBd0Q7Ozs7Ozs7SUFNeEQsNERBQWlDOzs7Ozs7OztJQU9qQyxzRUFBdUQ7Ozs7OztJQUt2RCxnRUFBcUM7Ozs7Ozs7Ozs7SUFtQnJDLHlFQUFnRTs7Ozs7Ozs7O0lBT2hFLCtFQUFzRTs7Ozs7Ozs7SUFNdEUsOEVBQTZEOzs7Ozs7Ozs7OztJQXVCN0QsK0RBQXdFOzs7Ozs7Ozs7SUFpQnhFLDRFQUFxRjs7Ozs7OztJQU1yRiwwREFBK0I7Ozs7Ozs7O0lBTy9CLHNEQUEyQjs7Ozs7OztJQWUzQix3RUFBNkM7Ozs7Ozs7SUFNN0MsZ0VBQXFDOzs7Ozs7OztJQU9yQyxvREFBMEI7Ozs7Ozs7O0lBTzFCLCtEQUFxQzs7Ozs7Ozs7SUFPckMsK0RBQXFDOzs7Ozs7Ozs7Ozs7SUE4QnJDLDRHQUF3STs7Ozs7Ozs7O0lBTXhJLDBGQUF5RTs7Ozs7OztJQXVCekUsNERBQTBEOzs7Ozs7OztJQWUxRCx5RUFBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NUQVRFX1RSQU5TTEFURUQsIElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSwgSU5vcm1hbGl6ZWRNZXNzYWdlLCBJVHJhbnNVbml0LCBJTm90ZX0gZnJvbSAnLi9pbnRlcm5hbGFwaSc7XHJcbmltcG9ydCB7QWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZX0gZnJvbSAnLi9hYnN0cmFjdC10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZCwgaXNTdHJpbmd9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2V9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UnO1xyXG5pbXBvcnQge0Fic3RyYWN0TWVzc2FnZVBhcnNlcn0gZnJvbSAnLi9hYnN0cmFjdC1tZXNzYWdlLXBhcnNlcic7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHJvb2JtIG9uIDEwLjA1LjIwMTcuXHJcbiAqIEFic3RyYWN0IHN1cGVyY2xhc3MgZm9yIGFsbCBpbXBsZW1lbnRhdGlvbnMgb2YgSVRyYW5zVW5pdC5cclxuICovXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RUcmFuc1VuaXQgaW1wbGVtZW50cyBJVHJhbnNVbml0IHtcclxuXHJcbiAgICBwcml2YXRlIF9zb3VyY2VDb250ZW50Tm9ybWFsaXplZDogUGFyc2VkTWVzc2FnZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IocHJvdGVjdGVkIF9lbGVtZW50OiBFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZpbGUgdGhlIHVuaXQgYmVsb25ncyB0by4sXHJcbiAgICAgKi9cclxuICAgIHRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKCk6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9yaWdpbmFsIHRleHQgdmFsdWUsIHRoYXQgaXMgdG8gYmUgdHJhbnNsYXRlZC5cclxuICAgICAqIENvbnRhaW5zIGFsbCBtYXJrdXAsIGRlcGVuZHMgb24gdGhlIGNvbmNyZXRlIGZvcm1hdCB1c2VkLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzb3VyY2VDb250ZW50KCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIHNvdXJjZSBjb250ZW50IGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0U291cmNlQ29udGVudCBpbiB0cmFucy11bml0IHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBzdXBwb3J0c1NldFNvdXJjZUNvbnRlbnQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgbmV3IHNvdXJjZSBjb250ZW50IGluIHRoZSB0cmFuc3VuaXQuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBkb25lIGJ5IG5nLWV4dHJhY3QuXHJcbiAgICAgKiBNZXRob2Qgb25seSBleGlzdHMgdG8gYWxsb3cgeGxpZmZtZXJnZSB0byBtZXJnZSBtaXNzaW5nIGNoYW5nZWQgc291cmNlIGNvbnRlbnQuXHJcbiAgICAgKiBAcGFyYW0gbmV3Q29udGVudCB0aGUgbmV3IGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNldFNvdXJjZUNvbnRlbnQobmV3Q29udGVudDogc3RyaW5nKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCB0ZXh0IHZhbHVlLCB0aGF0IGlzIHRvIGJlIHRyYW5zbGF0ZWQsIGFzIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9zb3VyY2VDb250ZW50Tm9ybWFsaXplZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fc291cmNlQ29udGVudE5vcm1hbGl6ZWQgPSB0aGlzLmNyZWF0ZVNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2VDb250ZW50Tm9ybWFsaXplZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBvcmlnaW5hbCB0ZXh0IHZhbHVlLCB0aGF0IGlzIHRvIGJlIHRyYW5zbGF0ZWQsIGFzIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgY3JlYXRlU291cmNlQ29udGVudE5vcm1hbGl6ZWQoKTogUGFyc2VkTWVzc2FnZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB0cmFuc2xhdGVkIHZhbHVlLlxyXG4gICAgICogQ29udGFpbnMgYWxsIG1hcmt1cCwgZGVwZW5kcyBvbiB0aGUgY29uY3JldGUgZm9ybWF0IHVzZWQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHRhcmdldENvbnRlbnQoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRyYW5zbGF0ZWQgdmFsdWUgYXMgbm9ybWFsaXplZCBtZXNzYWdlLlxyXG4gICAgICogQWxsIHBsYWNlaG9sZGVycyBhcmUgcmVwbGFjZWQgd2l0aCB7e259fSAoc3RhcnRpbmcgYXQgMClcclxuICAgICAqIGFuZCBhbGwgZW1iZWRkZWQgaHRtbCBpcyByZXBsYWNlZCBieSBkaXJlY3QgaHRtbCBtYXJrdXAuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHRhcmdldENvbnRlbnROb3JtYWxpemVkKCk6IElOb3JtYWxpemVkTWVzc2FnZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXRlIG9mIHRoZSB0cmFuc2xhdGlvbiBhcyBzdG9yZWQgaW4gdGhlIHhtbC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgbmF0aXZlVGFyZ2V0U3RhdGUoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgb2YgdGhlIHRyYW5zbGF0aW9uLlxyXG4gICAgICogKG9uIG9mIG5ldywgdHJhbnNsYXRlZCwgZmluYWwpXHJcbiAgICAgKiBSZXR1cm4gdmFsdWVzIGFyZSBkZWZpbmVkIGFzIENvbnN0YW50cyBTVEFURV8uLi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldFN0YXRlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbmF0aXZlU3RhdGUgPSB0aGlzLm5hdGl2ZVRhcmdldFN0YXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwTmF0aXZlU3RhdGVUb1N0YXRlKG5hdGl2ZVN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcCBhbiBhYnN0cmFjdCBzdGF0ZSAobmV3LCB0cmFuc2xhdGVkLCBmaW5hbCkgdG8gYSBjb25jcmV0ZSBzdGF0ZSB1c2VkIGluIHRoZSB4bWwuXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSB0byBiZSB1c2VkIGluIHRoZSB4bWwuXHJcbiAgICAgKiBAcGFyYW0gc3RhdGUgb25lIG9mIENvbnN0YW50cy5TVEFURS4uLlxyXG4gICAgICogQHJldHVybnMgYSBuYXRpdmUgc3RhdGUgKGRlcGVuZHMgb24gY29uY3JldGUgZm9ybWF0KVxyXG4gICAgICogQHRocm93cyBlcnJvciwgaWYgc3RhdGUgaXMgaW52YWxpZC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG1hcFN0YXRlVG9OYXRpdmVTdGF0ZShzdGF0ZTogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIGEgbmF0aXZlIHN0YXRlIChmb3VuZCBpbiB0aGUgZG9jdW1lbnQpIHRvIGFuIGFic3RyYWN0IHN0YXRlIChuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKS5cclxuICAgICAqIFJldHVybnMgdGhlIGFic3RyYWN0IHN0YXRlLlxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0YXRlIG5hdGl2ZVN0YXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBtYXBOYXRpdmVTdGF0ZVRvU3RhdGUobmF0aXZlU3RhdGU6IHN0cmluZyk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIHNldCBzdGF0ZSBpbiB4bWwuXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlU3RhdGUgbmF0aXZlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNldE5hdGl2ZVRhcmdldFN0YXRlKG5hdGl2ZVN0YXRlOiBzdHJpbmcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW9kaWZ5IHRoZSB0YXJnZXQgc3RhdGUuXHJcbiAgICAgKiBAcGFyYW0gbmV3U3RhdGUgb25lIG9mIHRoZSAzIGFsbG93ZWQgdGFyZ2V0IHN0YXRlcyBuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsLlxyXG4gICAgICogQ29uc3RhbnRzIFNUQVRFXy4uLlxyXG4gICAgICogSW52YWxpZCBzdGF0ZXMgdGhyb3cgYW4gZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIHNldFRhcmdldFN0YXRlKG5ld1N0YXRlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldE5hdGl2ZVRhcmdldFN0YXRlKHRoaXMubWFwU3RhdGVUb05hdGl2ZVN0YXRlKG5ld1N0YXRlKSk7XHJcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUoKSBpbnN0YW5jZW9mIEFic3RyYWN0VHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpIHtcclxuICAgICAgICAgICAgKDxBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlPiB0aGlzLnRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKCkpLmNvdW50TnVtYmVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCB0aGUgc291cmNlIGVsZW1lbnRzIGluIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICogVGhlIHNvdXJjZSBlbGVtZW50IGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGNvbnRhaW5zIHRoZSBuYW1lIG9mIHRoZSB0ZW1wbGF0ZSBmaWxlIGFuZCBhIGxpbmUgbnVtYmVyIHdpdGggdGhlIHBvc2l0aW9uIGluc2lkZSB0aGUgdGVtcGxhdGUuXHJcbiAgICAgKiBJdCBpcyBqdXN0IGEgaGVscCBmb3IgdHJhbnNsYXRvcnMgdG8gZmluZCB0aGUgY29udGV4dCBmb3IgdGhlIHRyYW5zbGF0aW9uLlxyXG4gICAgICogVGhpcyBpcyBzZXQgd2hlbiB1c2luZyBBbmd1bGFyIDQuMCBvciBncmVhdGVyLlxyXG4gICAgICogT3RoZXJ3aXNlIGl0IGp1c3QgcmV0dXJucyBhbiBlbXB0eSBhcnJheS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc291cmNlUmVmZXJlbmNlcygpOiB7c291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyOiBudW1iZXJ9W107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBzb3VyY2UgcmVmcyBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldFNvdXJjZVJlZmVyZW5jZXMgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdXBwb3J0c1NldFNvdXJjZVJlZmVyZW5jZXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc291cmNlIHJlZiBlbGVtZW50cyBpbiB0aGUgdHJhbnN1bml0LlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMgZG9uZSBieSBuZy1leHRyYWN0LlxyXG4gICAgICogTWV0aG9kIG9ubHkgZXhpc3RzIHRvIGFsbG93IHhsaWZmbWVyZ2UgdG8gbWVyZ2UgbWlzc2luZyBzb3VyY2UgcmVmcy5cclxuICAgICAqIEBwYXJhbSBzb3VyY2VSZWZzIHRoZSBzb3VyY2VyZWZzIHRvIHNldC4gT2xkIG9uZXMgYXJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNldFNvdXJjZVJlZmVyZW5jZXMoc291cmNlUmVmczoge3NvdXJjZWZpbGU6IHN0cmluZywgbGluZW51bWJlcjogbnVtYmVyfVtdKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkZXNjcmlwdGlvbiBzZXQgaW4gdGhlIHRlbXBsYXRlIGFzIHZhbHVlIG9mIHRoZSBpMThuLWF0dHJpYnV0ZS5cclxuICAgICAqIGUuZy4gaTE4bj1cIm15ZGVzY3JpcHRpb25cIi5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZGVzY3JpcHRpb24oKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1lYW5pbmcgKGludGVudCkgc2V0IGluIHRoZSB0ZW1wbGF0ZSBhcyB2YWx1ZSBvZiB0aGUgaTE4bi1hdHRyaWJ1dGUuXHJcbiAgICAgKiBUaGlzIGlzIHRoZSBwYXJ0IGluIGZyb250IG9mIHRoZSB8IHN5bWJvbC5cclxuICAgICAqIGUuZy4gaTE4bj1cIm1lYW5pbmd8bXlkZXNjcmlwdGlvblwiLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBtZWFuaW5nKCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIGRlc2NyaXB0aW9uIGFuZCBtZWFuaW5nIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0RGVzY3JpcHRpb24gYW5kIHNldE1lYW5pbmcgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdXBwb3J0c1NldERlc2NyaXB0aW9uQW5kTWVhbmluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBkZXNjcmlwdGlvbiBwcm9wZXJ0eSBvZiB0cmFucy11bml0LlxyXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uIGRlc2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNldERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIG1lYW5pbmcgcHJvcGVydHkgb2YgdHJhbnMtdW5pdC5cclxuICAgICAqIEBwYXJhbSBtZWFuaW5nIG1lYW5pbmdcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0TWVhbmluZyhtZWFuaW5nOiBzdHJpbmcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGFsbCBub3RlcyBvZiB0aGUgdHJhbnMtdW5pdC5cclxuICAgICAqIE5vdGVzIGFyZSByZW1hcmtzIG1hZGUgYnkgYSB0cmFuc2xhdG9yLlxyXG4gICAgICogKGRlc2NyaXB0aW9uIGFuZCBtZWFuaW5nIGFyZSBub3QgaW5jbHVkZWQgaGVyZSEpXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IG5vdGVzKCk6IElOb3RlW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBub3RlcyBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldE5vdGVzIHdpbGwgZG8gbm90aGluZy5cclxuICAgICAqIHh0YiBkb2VzIG5vdCBzdXBwb3J0IHRoaXMsIGFsbCBvdGhlciBmb3JtYXRzIGRvLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzdXBwb3J0c1NldE5vdGVzKCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgbm90ZXMgdG8gdHJhbnMgdW5pdC5cclxuICAgICAqIEBwYXJhbSBuZXdOb3RlcyB0aGUgbm90ZXMgdG8gYWRkLlxyXG4gICAgICogQHRocm93cyBhbiBFcnJvciBpZiBhbnkgbm90ZSBjb250YWlucyBkZXNjcHJpcHRpb24gb3IgbWVhbmluZyBhcyBmcm9tIGF0dHJpYnV0ZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0Tm90ZXMobmV3Tm90ZXM6IElOb3RlW10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgbm90ZXNcclxuICAgICAqIEBwYXJhbSBuZXdOb3RlcyB0aGUgbm90ZXMgdG8gYWRkLlxyXG4gICAgICogQHRocm93cyBhbiBFcnJvciBpZiBhbnkgbm90ZSBjb250YWlucyBkZXNjcmlwdGlvbiBvciBtZWFuaW5nIGFzIGZyb20gYXR0cmlidXRlLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2hlY2tOb3RlcyhuZXdOb3RlczogSU5vdGVbXSkge1xyXG4gICAgICAgIC8vIGNoZWNrIGZyb20gdmFsdWVzXHJcbiAgICAgICAgY29uc3QgZXJyb3JJbkZyb21Ob3RlID0gbmV3Tm90ZXMuZmluZCgobm90ZSkgPT4gbm90ZS5mcm9tID09PSAnZGVzY3JpcHRpb24nIHx8IG5vdGUuZnJvbSA9PT0gJ21lYW5pbmcnKTtcclxuICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGVycm9ySW5Gcm9tTm90ZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkZXNjcmlwdGlvbiBvciBtZWFuaW5nIGFyZSBub3QgYWxsb3dlZCBhcyBmcm9tIGF0dHRyaWJ1dGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmVhbCB4bWwgZWxlbWVudCB1c2VkIGZvciB0aGUgdHJhbnMgdW5pdC5cclxuICAgICAqIChpbnRlcm5hbCB1c2FnZSBvbmx5LCBhIGNsaWVudCBzaG91bGQgbmV2ZXIgbmVlZCB0aGlzKVxyXG4gICAgICogQHJldHVybiByZWFsIHhtbCBlbGVtZW50IHVzZWQgZm9yIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXNYbWxFbGVtZW50KCk6IEVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29weSBzb3VyY2UgdG8gdGFyZ2V0IHRvIHVzZSBpdCBhcyBkdW1teSB0cmFuc2xhdGlvbi5cclxuICAgICAqIFJldHVybnMgYSBjaGFuZ2VkIGNvcHkgb2YgdGhpcyB0cmFucyB1bml0LlxyXG4gICAgICogcmVjZWl2ZXIgaXMgbm90IGNoYW5nZWQuXHJcbiAgICAgKiAoaW50ZXJuYWwgdXNhZ2Ugb25seSwgYSBjbGllbnQgc2hvdWxkIGNhbGwgaW1wb3J0TmV3VHJhbnNVbml0IG9uIElUcmFuc2xhdGlvbk1lc3NhZ2VGaWxlKVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBjbG9uZVdpdGhTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbiwgdGFyZ2V0RmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTogQWJzdHJhY3RUcmFuc1VuaXQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHNvdXJjZSB0byB0YXJnZXQgdG8gdXNlIGl0IGFzIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogKGludGVybmFsIHVzYWdlIG9ubHksIGEgY2xpZW50IHNob3VsZCBjYWxsIGNyZWF0ZVRyYW5zbGF0aW9uRmlsZUZvckxhbmcgb24gSVRyYW5zbGF0aW9uTWVzc2FnZUZpbGUpXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHVzZVNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSB0aGUgdHJhbnMgdW5pdC5cclxuICAgICAqIEBwYXJhbSB0cmFuc2xhdGlvbiB0aGUgdHJhbnNsYXRlZCBzdHJpbmcgb3IgKHByZWZlcnJlZCkgYSBub3JtYWxpemVkIG1lc3NhZ2UuXHJcbiAgICAgKiBUaGUgcHVyZSBzdHJpbmcgY2FuIGNvbnRhaW4gYW55IG1hcmt1cCBhbmQgd2lsbCBub3QgYmUgY2hlY2tlZC5cclxuICAgICAqIFNvIGl0IGNhbiBkYW1hZ2UgdGhlIGRvY3VtZW50LlxyXG4gICAgICogQSBub3JtYWxpemVkIG1lc3NhZ2UgcHJldmVudHMgdGhpcy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zbGF0ZSh0cmFuc2xhdGlvbjogc3RyaW5nIHwgSU5vcm1hbGl6ZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgbGV0IHRyYW5zbGF0aW9uTmF0aXZlOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKHRyYW5zbGF0aW9uKSkge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbk5hdGl2ZSA9IDxzdHJpbmc+IHRyYW5zbGF0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uTmF0aXZlID0gKDxJTm9ybWFsaXplZE1lc3NhZ2U+IHRyYW5zbGF0aW9uKS5hc05hdGl2ZVN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyYW5zbGF0ZU5hdGl2ZSh0cmFuc2xhdGlvbk5hdGl2ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRUYXJnZXRTdGF0ZShTVEFURV9UUkFOU0xBVEVEKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhIHBhcnNlciB1c2VkIGZvciBub3JtYWxpemVkIG1lc3NhZ2VzLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbWVzc2FnZVBhcnNlcigpOiBBYnN0cmFjdE1lc3NhZ2VQYXJzZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgbWVzc2FnZSBsb29rcyBsaWtlIElDVSBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZVxyXG4gICAgICogQHJldHVybiB3ZXRoZXIgbWVzc2FnZSBsb29rcyBsaWtlIElDVSBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNJQ1VNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VQYXJzZXIoKS5pc0lDVU1lc3NhZ2VTdGFydChtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdHJhbnNsYXRpb24gdG8gYSBnaXZlbiBzdHJpbmcgKGluY2x1ZGluZyBtYXJrdXApLlxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uIHRyYW5zbGF0aW9uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCB0cmFuc2xhdGVOYXRpdmUodHJhbnNsYXRpb246IHN0cmluZyk7XHJcbn1cclxuIl19