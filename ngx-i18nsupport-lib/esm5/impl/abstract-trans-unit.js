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
var /**
 * Created by roobm on 10.05.2017.
 * Abstract superclass for all implementations of ITransUnit.
 * @abstract
 */
AbstractTransUnit = /** @class */ (function () {
    function AbstractTransUnit(_element, _id, _translationMessagesFile) {
        this._element = _element;
        this._id = _id;
        this._translationMessagesFile = _translationMessagesFile;
    }
    Object.defineProperty(AbstractTransUnit.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The file the unit belongs to.,
     */
    /**
     * The file the unit belongs to.,
     * @return {?}
     */
    AbstractTransUnit.prototype.translationMessagesFile = /**
     * The file the unit belongs to.,
     * @return {?}
     */
    function () {
        return this._translationMessagesFile;
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetSourceContent = /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    AbstractTransUnit.prototype.sourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this._sourceContentNormalized)) {
            this._sourceContentNormalized = this.createSourceContentNormalized();
        }
        return this._sourceContentNormalized;
    };
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     */
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     * @return {?}
     */
    AbstractTransUnit.prototype.targetState = /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nativeState = this.nativeTargetState();
        return this.mapNativeStateToState(nativeState);
    };
    /**
     * Modify the target state.
     * @param newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     */
    /**
     * Modify the target state.
     * @param {?} newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     * @return {?}
     */
    AbstractTransUnit.prototype.setTargetState = /**
     * Modify the target state.
     * @param {?} newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     * @return {?}
     */
    function (newState) {
        this.setNativeTargetState(this.mapStateToNativeState(newState));
        if (this.translationMessagesFile() instanceof AbstractTranslationMessagesFile) {
            ((/** @type {?} */ (this.translationMessagesFile()))).countNumbers();
        }
    };
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetSourceReferences = /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetDescriptionAndMeaning = /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Check notes
     * @param newNotes the notes to add.
     * @throws an Error if any note contains description or meaning as from attribute.
     */
    /**
     * Check notes
     * @throws an Error if any note contains description or meaning as from attribute.
     * @protected
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    AbstractTransUnit.prototype.checkNotes = /**
     * Check notes
     * @throws an Error if any note contains description or meaning as from attribute.
     * @protected
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    function (newNotes) {
        // check from values
        /** @type {?} */
        var errorInFromNote = newNotes.find((/**
         * @param {?} note
         * @return {?}
         */
        function (note) { return note.from === 'description' || note.from === 'meaning'; }));
        if (!isNullOrUndefined(errorInFromNote)) {
            throw new Error('description or meaning are not allowed as from atttribute');
        }
    };
    /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return real xml element used for the trans unit.
     */
    /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return {?} real xml element used for the trans unit.
     */
    AbstractTransUnit.prototype.asXmlElement = /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return {?} real xml element used for the trans unit.
     */
    function () {
        return this._element;
    };
    /**
     * Translate the trans unit.
     * @param translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     */
    /**
     * Translate the trans unit.
     * @param {?} translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     * @return {?}
     */
    AbstractTransUnit.prototype.translate = /**
     * Translate the trans unit.
     * @param {?} translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var translationNative;
        if (isString(translation)) {
            translationNative = (/** @type {?} */ (translation));
        }
        else {
            translationNative = ((/** @type {?} */ (translation))).asNativeString();
        }
        this.translateNative(translationNative);
        this.setTargetState(STATE_TRANSLATED);
    };
    /**
     * Test, wether message looks like ICU message.
     * @param message message
     * @return wether message looks like ICU message.
     */
    /**
     * Test, wether message looks like ICU message.
     * @param {?} message message
     * @return {?} wether message looks like ICU message.
     */
    AbstractTransUnit.prototype.isICUMessage = /**
     * Test, wether message looks like ICU message.
     * @param {?} message message
     * @return {?} wether message looks like ICU message.
     */
    function (message) {
        return this.messageParser().isICUMessageStart(message);
    };
    return AbstractTransUnit;
}());
/**
 * Created by roobm on 10.05.2017.
 * Abstract superclass for all implementations of ITransUnit.
 * @abstract
 */
export { AbstractTransUnit };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtdHJhbnMtdW5pdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvYWJzdHJhY3QtdHJhbnMtdW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLGdCQUFnQixFQUFrRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRixPQUFPLEVBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7Ozs7QUFRakQ7Ozs7OztJQUlJLDJCQUFnQyxRQUFpQixFQUNqQixHQUFXLEVBQ1gsd0JBQWtEO1FBRmxELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFDbEYsQ0FBQztJQUVELHNCQUFXLGlDQUFFOzs7O1FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRzs7Ozs7SUFDSCxtREFBdUI7Ozs7SUFBdkI7UUFDSSxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN6QyxDQUFDO0lBUUQ7Ozs7T0FJRzs7Ozs7OztJQUNILG9EQUF3Qjs7Ozs7O0lBQXhCO1FBQ0ksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVVEOztPQUVHOzs7OztJQUNJLG1EQUF1Qjs7OztJQUE5QjtRQUNJLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1NBQ3hFO1FBQ0QsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUM7SUFDekMsQ0FBQztJQXlCRDs7OztPQUlHOzs7Ozs7O0lB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Ozs7OztJQU9yQywrREFBcUM7Ozs7Ozs7Ozs7OztJQThCckMsNEdBQXdJOzs7Ozs7Ozs7SUFNeEksMEZBQXlFOzs7Ozs7O0lBdUJ6RSw0REFBMEQ7Ozs7Ozs7O0lBZTFELHlFQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U1RBVEVfVFJBTlNMQVRFRCwgSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLCBJTm9ybWFsaXplZE1lc3NhZ2UsIElUcmFuc1VuaXQsIElOb3RlfSBmcm9tICcuL2ludGVybmFsYXBpJztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuL2Fic3RyYWN0LXRyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUnO1xyXG5pbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkLCBpc1N0cmluZ30gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTAuMDUuMjAxNy5cclxuICogQWJzdHJhY3Qgc3VwZXJjbGFzcyBmb3IgYWxsIGltcGxlbWVudGF0aW9ucyBvZiBJVHJhbnNVbml0LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFRyYW5zVW5pdCBpbXBsZW1lbnRzIElUcmFuc1VuaXQge1xyXG5cclxuICAgIHByaXZhdGUgX3NvdXJjZUNvbnRlbnROb3JtYWxpemVkOiBQYXJzZWRNZXNzYWdlO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2VsZW1lbnQ6IEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3RlY3RlZCBfdHJhbnNsYXRpb25NZXNzYWdlc0ZpbGU6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZmlsZSB0aGUgdW5pdCBiZWxvbmdzIHRvLixcclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUoKTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRpb25NZXNzYWdlc0ZpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgb3JpZ2luYWwgdGV4dCB2YWx1ZSwgdGhhdCBpcyB0byBiZSB0cmFuc2xhdGVkLlxyXG4gICAgICogQ29udGFpbnMgYWxsIG1hcmt1cCwgZGVwZW5kcyBvbiB0aGUgY29uY3JldGUgZm9ybWF0IHVzZWQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNvdXJjZUNvbnRlbnQoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2Ygc291cmNlIGNvbnRlbnQgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXRTb3VyY2VDb250ZW50IGluIHRyYW5zLXVuaXQgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHN1cHBvcnRzU2V0U291cmNlQ29udGVudCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgc291cmNlIGNvbnRlbnQgaW4gdGhlIHRyYW5zdW5pdC5cclxuICAgICAqIE5vcm1hbGx5LCB0aGlzIGlzIGRvbmUgYnkgbmctZXh0cmFjdC5cclxuICAgICAqIE1ldGhvZCBvbmx5IGV4aXN0cyB0byBhbGxvdyB4bGlmZm1lcmdlIHRvIG1lcmdlIG1pc3NpbmcgY2hhbmdlZCBzb3VyY2UgY29udGVudC5cclxuICAgICAqIEBwYXJhbSBuZXdDb250ZW50IHRoZSBuZXcgY29udGVudC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0U291cmNlQ29udGVudChuZXdDb250ZW50OiBzdHJpbmcpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9yaWdpbmFsIHRleHQgdmFsdWUsIHRoYXQgaXMgdG8gYmUgdHJhbnNsYXRlZCwgYXMgbm9ybWFsaXplZCBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKTogUGFyc2VkTWVzc2FnZSB7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX3NvdXJjZUNvbnRlbnROb3JtYWxpemVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VyY2VDb250ZW50Tm9ybWFsaXplZCA9IHRoaXMuY3JlYXRlU291cmNlQ29udGVudE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZUNvbnRlbnROb3JtYWxpemVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9yaWdpbmFsIHRleHQgdmFsdWUsIHRoYXQgaXMgdG8gYmUgdHJhbnNsYXRlZCwgYXMgbm9ybWFsaXplZCBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBjcmVhdGVTb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpOiBQYXJzZWRNZXNzYWdlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHRyYW5zbGF0ZWQgdmFsdWUuXHJcbiAgICAgKiBDb250YWlucyBhbGwgbWFya3VwLCBkZXBlbmRzIG9uIHRoZSBjb25jcmV0ZSBmb3JtYXQgdXNlZC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgdGFyZ2V0Q29udGVudCgpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdHJhbnNsYXRlZCB2YWx1ZSBhcyBub3JtYWxpemVkIG1lc3NhZ2UuXHJcbiAgICAgKiBBbGwgcGxhY2Vob2xkZXJzIGFyZSByZXBsYWNlZCB3aXRoIHt7bn19IChzdGFydGluZyBhdCAwKVxyXG4gICAgICogYW5kIGFsbCBlbWJlZGRlZCBodG1sIGlzIHJlcGxhY2VkIGJ5IGRpcmVjdCBodG1sIG1hcmt1cC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgdGFyZ2V0Q29udGVudE5vcm1hbGl6ZWQoKTogSU5vcm1hbGl6ZWRNZXNzYWdlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhdGUgb2YgdGhlIHRyYW5zbGF0aW9uIGFzIHN0b3JlZCBpbiB0aGUgeG1sLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBuYXRpdmVUYXJnZXRTdGF0ZSgpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSBvZiB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAob24gb2YgbmV3LCB0cmFuc2xhdGVkLCBmaW5hbClcclxuICAgICAqIFJldHVybiB2YWx1ZXMgYXJlIGRlZmluZWQgYXMgQ29uc3RhbnRzIFNUQVRFXy4uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0U3RhdGUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBuYXRpdmVTdGF0ZSA9IHRoaXMubmF0aXZlVGFyZ2V0U3RhdGUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBOYXRpdmVTdGF0ZVRvU3RhdGUobmF0aXZlU3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIGFuIGFic3RyYWN0IHN0YXRlIChuZXcsIHRyYW5zbGF0ZWQsIGZpbmFsKSB0byBhIGNvbmNyZXRlIHN0YXRlIHVzZWQgaW4gdGhlIHhtbC5cclxuICAgICAqIFJldHVybnMgdGhlIHN0YXRlIHRvIGJlIHVzZWQgaW4gdGhlIHhtbC5cclxuICAgICAqIEBwYXJhbSBzdGF0ZSBvbmUgb2YgQ29uc3RhbnRzLlNUQVRFLi4uXHJcbiAgICAgKiBAcmV0dXJucyBhIG5hdGl2ZSBzdGF0ZSAoZGVwZW5kcyBvbiBjb25jcmV0ZSBmb3JtYXQpXHJcbiAgICAgKiBAdGhyb3dzIGVycm9yLCBpZiBzdGF0ZSBpcyBpbnZhbGlkLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgbWFwU3RhdGVUb05hdGl2ZVN0YXRlKHN0YXRlOiBzdHJpbmcpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXAgYSBuYXRpdmUgc3RhdGUgKGZvdW5kIGluIHRoZSBkb2N1bWVudCkgdG8gYW4gYWJzdHJhY3Qgc3RhdGUgKG5ldywgdHJhbnNsYXRlZCwgZmluYWwpLlxyXG4gICAgICogUmV0dXJucyB0aGUgYWJzdHJhY3Qgc3RhdGUuXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlU3RhdGUgbmF0aXZlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IG1hcE5hdGl2ZVN0YXRlVG9TdGF0ZShuYXRpdmVTdGF0ZTogc3RyaW5nKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0IHN0YXRlIGluIHhtbC5cclxuICAgICAqIEBwYXJhbSBuYXRpdmVTdGF0ZSBuYXRpdmVTdGF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2V0TmF0aXZlVGFyZ2V0U3RhdGUobmF0aXZlU3RhdGU6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb2RpZnkgdGhlIHRhcmdldCBzdGF0ZS5cclxuICAgICAqIEBwYXJhbSBuZXdTdGF0ZSBvbmUgb2YgdGhlIDMgYWxsb3dlZCB0YXJnZXQgc3RhdGVzIG5ldywgdHJhbnNsYXRlZCwgZmluYWwuXHJcbiAgICAgKiBDb25zdGFudHMgU1RBVEVfLi4uXHJcbiAgICAgKiBJbnZhbGlkIHN0YXRlcyB0aHJvdyBhbiBlcnJvci5cclxuICAgICAqL1xyXG4gICAgc2V0VGFyZ2V0U3RhdGUobmV3U3RhdGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVGFyZ2V0U3RhdGUodGhpcy5tYXBTdGF0ZVRvTmF0aXZlU3RhdGUobmV3U3RhdGUpKTtcclxuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSgpIGluc3RhbmNlb2YgQWJzdHJhY3RUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSkge1xyXG4gICAgICAgICAgICAoPEFic3RyYWN0VHJhbnNsYXRpb25NZXNzYWdlc0ZpbGU+IHRoaXMudHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUoKSkuY291bnROdW1iZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIHRoZSBzb3VyY2UgZWxlbWVudHMgaW4gdGhlIHRyYW5zIHVuaXQuXHJcbiAgICAgKiBUaGUgc291cmNlIGVsZW1lbnQgaXMgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxyXG4gICAgICogSXQgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIHRlbXBsYXRlIGZpbGUgYW5kIGEgbGluZSBudW1iZXIgd2l0aCB0aGUgcG9zaXRpb24gaW5zaWRlIHRoZSB0ZW1wbGF0ZS5cclxuICAgICAqIEl0IGlzIGp1c3QgYSBoZWxwIGZvciB0cmFuc2xhdG9ycyB0byBmaW5kIHRoZSBjb250ZXh0IGZvciB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgKiBUaGlzIGlzIHNldCB3aGVuIHVzaW5nIEFuZ3VsYXIgNC4wIG9yIGdyZWF0ZXIuXHJcbiAgICAgKiBPdGhlcndpc2UgaXQganVzdCByZXR1cm5zIGFuIGVtcHR5IGFycmF5LlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzb3VyY2VSZWZlcmVuY2VzKCk6IHtzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlcn1bXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIHNvdXJjZSByZWZzIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0U291cmNlUmVmZXJlbmNlcyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0U291cmNlUmVmZXJlbmNlcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzb3VyY2UgcmVmIGVsZW1lbnRzIGluIHRoZSB0cmFuc3VuaXQuXHJcbiAgICAgKiBOb3JtYWxseSwgdGhpcyBpcyBkb25lIGJ5IG5nLWV4dHJhY3QuXHJcbiAgICAgKiBNZXRob2Qgb25seSBleGlzdHMgdG8gYWxsb3cgeGxpZmZtZXJnZSB0byBtZXJnZSBtaXNzaW5nIHNvdXJjZSByZWZzLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZVJlZnMgdGhlIHNvdXJjZXJlZnMgdG8gc2V0LiBPbGQgb25lcyBhcmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0U291cmNlUmVmZXJlbmNlcyhzb3VyY2VSZWZzOiB7c291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyOiBudW1iZXJ9W10pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIHNldCBpbiB0aGUgdGVtcGxhdGUgYXMgdmFsdWUgb2YgdGhlIGkxOG4tYXR0cmlidXRlLlxyXG4gICAgICogZS5nLiBpMThuPVwibXlkZXNjcmlwdGlvblwiLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBkZXNjcmlwdGlvbigpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVhbmluZyAoaW50ZW50KSBzZXQgaW4gdGhlIHRlbXBsYXRlIGFzIHZhbHVlIG9mIHRoZSBpMThuLWF0dHJpYnV0ZS5cclxuICAgICAqIFRoaXMgaXMgdGhlIHBhcnQgaW4gZnJvbnQgb2YgdGhlIHwgc3ltYm9sLlxyXG4gICAgICogZS5nLiBpMThuPVwibWVhbmluZ3xteWRlc2NyaXB0aW9uXCIuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IG1lYW5pbmcoKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2YgZGVzY3JpcHRpb24gYW5kIG1lYW5pbmcgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXREZXNjcmlwdGlvbiBhbmQgc2V0TWVhbmluZyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0RGVzY3JpcHRpb25BbmRNZWFuaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIGRlc2NyaXB0aW9uIHByb3BlcnR5IG9mIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb24gZGVzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgbWVhbmluZyBwcm9wZXJ0eSBvZiB0cmFucy11bml0LlxyXG4gICAgICogQHBhcmFtIG1lYW5pbmcgbWVhbmluZ1xyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRNZWFuaW5nKG1lYW5pbmc6IHN0cmluZyk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYWxsIG5vdGVzIG9mIHRoZSB0cmFucy11bml0LlxyXG4gICAgICogTm90ZXMgYXJlIHJlbWFya3MgbWFkZSBieSBhIHRyYW5zbGF0b3IuXHJcbiAgICAgKiAoZGVzY3JpcHRpb24gYW5kIG1lYW5pbmcgYXJlIG5vdCBpbmNsdWRlZCBoZXJlISlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgbm90ZXMoKTogSU5vdGVbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIG5vdGVzIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0Tm90ZXMgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHN1cHBvcnRzU2V0Tm90ZXMoKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBub3RlcyB0byB0cmFucyB1bml0LlxyXG4gICAgICogQHBhcmFtIG5ld05vdGVzIHRoZSBub3RlcyB0byBhZGQuXHJcbiAgICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGFueSBub3RlIGNvbnRhaW5zIGRlc2NwcmlwdGlvbiBvciBtZWFuaW5nIGFzIGZyb20gYXR0cmlidXRlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXROb3RlcyhuZXdOb3RlczogSU5vdGVbXSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBub3Rlc1xyXG4gICAgICogQHBhcmFtIG5ld05vdGVzIHRoZSBub3RlcyB0byBhZGQuXHJcbiAgICAgKiBAdGhyb3dzIGFuIEVycm9yIGlmIGFueSBub3RlIGNvbnRhaW5zIGRlc2NyaXB0aW9uIG9yIG1lYW5pbmcgYXMgZnJvbSBhdHRyaWJ1dGUuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjaGVja05vdGVzKG5ld05vdGVzOiBJTm90ZVtdKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgZnJvbSB2YWx1ZXNcclxuICAgICAgICBjb25zdCBlcnJvckluRnJvbU5vdGUgPSBuZXdOb3Rlcy5maW5kKChub3RlKSA9PiBub3RlLmZyb20gPT09ICdkZXNjcmlwdGlvbicgfHwgbm90ZS5mcm9tID09PSAnbWVhbmluZycpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoZXJyb3JJbkZyb21Ob3RlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Rlc2NyaXB0aW9uIG9yIG1lYW5pbmcgYXJlIG5vdCBhbGxvd2VkIGFzIGZyb20gYXR0dHJpYnV0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZWFsIHhtbCBlbGVtZW50IHVzZWQgZm9yIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICogKGludGVybmFsIHVzYWdlIG9ubHksIGEgY2xpZW50IHNob3VsZCBuZXZlciBuZWVkIHRoaXMpXHJcbiAgICAgKiBAcmV0dXJuIHJlYWwgeG1sIGVsZW1lbnQgdXNlZCBmb3IgdGhlIHRyYW5zIHVuaXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc1htbEVsZW1lbnQoKTogRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHNvdXJjZSB0byB0YXJnZXQgdG8gdXNlIGl0IGFzIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogUmV0dXJucyBhIGNoYW5nZWQgY29weSBvZiB0aGlzIHRyYW5zIHVuaXQuXHJcbiAgICAgKiByZWNlaXZlciBpcyBub3QgY2hhbmdlZC5cclxuICAgICAqIChpbnRlcm5hbCB1c2FnZSBvbmx5LCBhIGNsaWVudCBzaG91bGQgY2FsbCBpbXBvcnROZXdUcmFuc1VuaXQgb24gSVRyYW5zbGF0aW9uTWVzc2FnZUZpbGUpXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGNsb25lV2l0aFNvdXJjZUFzVGFyZ2V0KGlzRGVmYXVsdExhbmc6IGJvb2xlYW4sIGNvcHlDb250ZW50OiBib29sZWFuLCB0YXJnZXRGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpOiBBYnN0cmFjdFRyYW5zVW5pdDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvcHkgc291cmNlIHRvIHRhcmdldCB0byB1c2UgaXQgYXMgZHVtbXkgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAoaW50ZXJuYWwgdXNhZ2Ugb25seSwgYSBjbGllbnQgc2hvdWxkIGNhbGwgY3JlYXRlVHJhbnNsYXRpb25GaWxlRm9yTGFuZyBvbiBJVHJhbnNsYXRpb25NZXNzYWdlRmlsZSlcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgdXNlU291cmNlQXNUYXJnZXQoaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIHRoZSB0cmFucyB1bml0LlxyXG4gICAgICogQHBhcmFtIHRyYW5zbGF0aW9uIHRoZSB0cmFuc2xhdGVkIHN0cmluZyBvciAocHJlZmVycmVkKSBhIG5vcm1hbGl6ZWQgbWVzc2FnZS5cclxuICAgICAqIFRoZSBwdXJlIHN0cmluZyBjYW4gY29udGFpbiBhbnkgbWFya3VwIGFuZCB3aWxsIG5vdCBiZSBjaGVja2VkLlxyXG4gICAgICogU28gaXQgY2FuIGRhbWFnZSB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKiBBIG5vcm1hbGl6ZWQgbWVzc2FnZSBwcmV2ZW50cyB0aGlzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHJhbnNsYXRlKHRyYW5zbGF0aW9uOiBzdHJpbmcgfCBJTm9ybWFsaXplZE1lc3NhZ2UpIHtcclxuICAgICAgICBsZXQgdHJhbnNsYXRpb25OYXRpdmU6IHN0cmluZztcclxuICAgICAgICBpZiAoaXNTdHJpbmcodHJhbnNsYXRpb24pKSB7XHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uTmF0aXZlID0gPHN0cmluZz4gdHJhbnNsYXRpb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJhbnNsYXRpb25OYXRpdmUgPSAoPElOb3JtYWxpemVkTWVzc2FnZT4gdHJhbnNsYXRpb24pLmFzTmF0aXZlU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJhbnNsYXRlTmF0aXZlKHRyYW5zbGF0aW9uTmF0aXZlKTtcclxuICAgICAgICB0aGlzLnNldFRhcmdldFN0YXRlKFNUQVRFX1RSQU5TTEFURUQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGEgcGFyc2VyIHVzZWQgZm9yIG5vcm1hbGl6ZWQgbWVzc2FnZXMuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBtZXNzYWdlUGFyc2VyKCk6IEFic3RyYWN0TWVzc2FnZVBhcnNlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBtZXNzYWdlIGxvb2tzIGxpa2UgSUNVIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlXHJcbiAgICAgKiBAcmV0dXJuIHdldGhlciBtZXNzYWdlIGxvb2tzIGxpa2UgSUNVIG1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0lDVU1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZVBhcnNlcigpLmlzSUNVTWVzc2FnZVN0YXJ0KG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB0cmFuc2xhdGlvbiB0byBhIGdpdmVuIHN0cmluZyAoaW5jbHVkaW5nIG1hcmt1cCkuXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRpb24gdHJhbnNsYXRpb25cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHRyYW5zbGF0ZU5hdGl2ZSh0cmFuc2xhdGlvbjogc3RyaW5nKTtcclxufVxyXG4iXX0=