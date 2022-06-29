/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isNullOrUndefined } from 'util';
import { DOMUtilities } from './dom-utilities';
import { AbstractTransUnit } from './abstract-trans-unit';
import { XmbMessageParser } from './xmb-message-parser';
/**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
var /**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
XtbTransUnit = /** @class */ (function (_super) {
    tslib_1.__extends(XtbTransUnit, _super);
    function XtbTransUnit(_element, _id, _translationMessagesFile, _sourceTransUnitFromMaster) {
        var _this = _super.call(this, _element, _id, _translationMessagesFile) || this;
        _this._sourceTransUnitFromMaster = _sourceTransUnitFromMaster;
        return _this;
    }
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return content to translate.
     */
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} content to translate.
     */
    XtbTransUnit.prototype.sourceContent = /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} content to translate.
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceContent();
        }
        else {
            return null;
        }
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
    XtbTransUnit.prototype.supportsSetSourceContent = /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
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
    XtbTransUnit.prototype.setSourceContent = /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    function (newContent) {
        // xtb has no source content, they are part of the master
    };
    /**
     * Return a parser used for normalized messages.
     */
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    XtbTransUnit.prototype.messageParser = /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    function () {
        return new XmbMessageParser(); // no typo!, Same as for Xmb
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    XtbTransUnit.prototype.createSourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.createSourceContentNormalized();
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
    XtbTransUnit.prototype.targetContent = /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    function () {
        return DOMUtilities.getXMLContent(this._element);
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
    XtbTransUnit.prototype.targetContentNormalized = /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    function () {
        return this.messageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    };
    /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     */
    /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     * @return {?}
     */
    XtbTransUnit.prototype.nativeTargetState = /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            /** @type {?} */
            var sourceContent = this._sourceTransUnitFromMaster.sourceContent();
            if (!sourceContent || sourceContent === this.targetContent() || !this.targetContent()) {
                return 'new';
            }
            else {
                return 'final';
            }
        }
        return null; // not supported in xmb
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
    XtbTransUnit.prototype.mapStateToNativeState = /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    function (state) {
        return state;
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
    XtbTransUnit.prototype.mapNativeStateToState = /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        return nativeState;
    };
    /**
     * set state in xml.
     * (not supported in xmb)
     * @param nativeState nativeState
     */
    /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XtbTransUnit.prototype.setNativeTargetState = /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        // TODO some logic to store it anywhere
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
    XtbTransUnit.prototype.sourceReferences = /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceReferences();
        }
        else {
            return [];
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
    XtbTransUnit.prototype.supportsSetSourceReferences = /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
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
    XtbTransUnit.prototype.setSourceReferences = /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    function (sourceRefs) {
        // xtb has no source refs, they are part of the master
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     */
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    XtbTransUnit.prototype.description = /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.description();
        }
        else {
            return null;
        }
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     */
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    XtbTransUnit.prototype.meaning = /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.meaning();
        }
        else {
            return null;
        }
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
    XtbTransUnit.prototype.supportsSetDescriptionAndMeaning = /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
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
    XtbTransUnit.prototype.setDescription = /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    function (description) {
        // not supported, do nothing
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
    XtbTransUnit.prototype.setMeaning = /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    function (meaning) {
        // not supported, do nothing
    };
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     */
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    XtbTransUnit.prototype.notes = /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    function () {
        return [];
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
    XtbTransUnit.prototype.supportsSetNotes = /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * NOT Supported in xmb/xtb
     */
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    XtbTransUnit.prototype.setNotes = /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    function (newNotes) {
        // not supported, do nothing
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xtb there is nothing to do, because there is only a target, no source.
     */
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
    XtbTransUnit.prototype.cloneWithSourceAsTarget = /**
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
    function (isDefaultLang, copyContent, targetFile) {
        return this;
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
    XtbTransUnit.prototype.useSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    function (isDefaultLang, copyContent) {
        // do nothing
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
    XtbTransUnit.prototype.translateNative = /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var target = this._element;
        if (isNullOrUndefined(translation)) {
            translation = '';
        }
        DOMUtilities.replaceContentWithXMLContent(target, translation);
    };
    return XtbTransUnit;
}(AbstractTransUnit));
/**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
export { XtbTransUnit };
if (false) {
    /**
     * @type {?}
     * @private
     */
    XtbTransUnit.prototype._sourceTransUnitFromMaster;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRiLXRyYW5zLXVuaXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3h0Yi10cmFucy11bml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sTUFBTSxDQUFDO0FBS3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFRdEQ7Ozs7O0lBQWtDLHdDQUFpQjtJQUkvQyxzQkFBWSxRQUFpQixFQUFFLEdBQVcsRUFBRSx3QkFBa0QsRUFDbEYsMEJBQTZDO1FBRHpELFlBRUksa0JBQU0sUUFBUSxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxTQUVqRDtRQURHLEtBQUksQ0FBQywwQkFBMEIsR0FBRywwQkFBMEIsQ0FBQzs7SUFDakUsQ0FBQztJQUVEOzs7O09BSUc7Ozs7OztJQUNJLG9DQUFhOzs7OztJQUFwQjtRQUNJLElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzFEO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwrQ0FBd0I7Ozs7OztJQUF4QjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSSx1Q0FBZ0I7Ozs7Ozs7SUFBdkIsVUFBd0IsVUFBa0I7UUFDdEMseURBQXlEO0lBQzdELENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ08sb0NBQWE7Ozs7O0lBQXZCO1FBQ0ksT0FBTyxJQUFJLGdCQUFn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Yzs7Ozs7SUFBckIsVUFBc0IsV0FBbUI7UUFDckMsNEJBQTRCO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNJLGlDQUFVOzs7OztJQUFqQixVQUFrQixPQUFlO1FBQzdCLDRCQUE0QjtJQUNoQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSSw0QkFBSzs7Ozs7SUFBWjtRQUNJLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSSx1Q0FBZ0I7Ozs7OztJQUF2QjtRQUNJLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0ksK0JBQVE7Ozs7OztJQUFmLFVBQWdCLFFBQWlCO1FBQzdCLDRCQUE0QjtJQUNoQyxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7Ozs7SUFDSSw4Q0FBdUI7Ozs7Ozs7Ozs7O0lBQTlCLFVBQStCLGFBQXNCLEVBQUUsV0FBb0IsRUFBRSxVQUFvQztRQUM3RyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNJLHdDQUFpQjs7Ozs7OztJQUF4QixVQUF5QixhQUFzQixFQUFFLFdBQW9CO1FBQ2pFLGFBQWE7SUFDakIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNPLHNDQUFlOzs7Ozs7SUFBekIsVUFBMEIsV0FBbUI7O1lBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUTtRQUM1QixJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2hDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDcEI7UUFDRCxZQUFZLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTCxtQkFBQztBQUFELENBQUMsQUF6UUQsQ0FBa0MsaUJBQWlCLEdBeVFsRDs7Ozs7Ozs7Ozs7SUF2UUcsa0RBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7SVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlfSBmcm9tICcuLi9hcGkvaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtJTm9ybWFsaXplZE1lc3NhZ2V9IGZyb20gJy4uL2FwaS9pLW5vcm1hbGl6ZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnLi4vYXBpL2ktdHJhbnMtdW5pdCc7XHJcbmltcG9ydCB7SU5vdGV9IGZyb20gJy4uL2FwaS9pLW5vdGUnO1xyXG5pbXBvcnQge0RPTVV0aWxpdGllc30gZnJvbSAnLi9kb20tdXRpbGl0aWVzJztcclxuaW1wb3J0IHtBYnN0cmFjdFRyYW5zVW5pdH0gZnJvbSAnLi9hYnN0cmFjdC10cmFucy11bml0JztcclxuaW1wb3J0IHtYbWJNZXNzYWdlUGFyc2VyfSBmcm9tICcuL3htYi1tZXNzYWdlLXBhcnNlcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDIzLjA1LjIwMTcuXHJcbiAqIEEgVHJhbnNsYXRpb24gVW5pdCBpbiBhbiBYVEIgZmlsZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgWHRiVHJhbnNVbml0IGV4dGVuZHMgQWJzdHJhY3RUcmFuc1VuaXQgaW1wbGVtZW50cyBJVHJhbnNVbml0IHtcclxuXHJcbiAgICBwcml2YXRlIF9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyOiBBYnN0cmFjdFRyYW5zVW5pdDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihfZWxlbWVudDogRWxlbWVudCwgX2lkOiBzdHJpbmcsIF90cmFuc2xhdGlvbk1lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLFxyXG4gICAgICAgICAgICAgICAgX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXI6IEFic3RyYWN0VHJhbnNVbml0KSB7XHJcbiAgICAgICAgc3VwZXIoX2VsZW1lbnQsIF9pZCwgX3RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTtcclxuICAgICAgICB0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyID0gX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgY29udGVudCB0byB0cmFuc2xhdGUuXHJcbiAgICAgKiBTb3VyY2UgcGFydHMgYXJlIGV4Y2x1ZGVkIGhlcmUuXHJcbiAgICAgKiBAcmV0dXJuIGNvbnRlbnQgdG8gdHJhbnNsYXRlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc291cmNlQ29udGVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyLnNvdXJjZUNvbnRlbnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgc2V0dGluZyBvZiBzb3VyY2UgY29udGVudCBpcyBzdXBwb3J0ZWQuXHJcbiAgICAgKiBJZiBub3QsIHNldFNvdXJjZUNvbnRlbnQgaW4gdHJhbnMtdW5pdCB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgc3VwcG9ydHNTZXRTb3VyY2VDb250ZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBuZXcgc291cmNlIGNvbnRlbnQgaW4gdGhlIHRyYW5zdW5pdC5cclxuICAgICAqIE5vcm1hbGx5LCB0aGlzIGlzIGRvbmUgYnkgbmctZXh0cmFjdC5cclxuICAgICAqIE1ldGhvZCBvbmx5IGV4aXN0cyB0byBhbGxvdyB4bGlmZm1lcmdlIHRvIG1lcmdlIG1pc3NpbmcgY2hhbmdlZCBzb3VyY2UgY29udGVudC5cclxuICAgICAqIEBwYXJhbSBuZXdDb250ZW50IHRoZSBuZXcgY29udGVudC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldFNvdXJjZUNvbnRlbnQobmV3Q29udGVudDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8geHRiIGhhcyBubyBzb3VyY2UgY29udGVudCwgdGhleSBhcmUgcGFydCBvZiB0aGUgbWFzdGVyXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBwYXJzZXIgdXNlZCBmb3Igbm9ybWFsaXplZCBtZXNzYWdlcy5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG1lc3NhZ2VQYXJzZXIoKTogQWJzdHJhY3RNZXNzYWdlUGFyc2VyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFhtYk1lc3NhZ2VQYXJzZXIoKTsgLy8gbm8gdHlwbyEsIFNhbWUgYXMgZm9yIFhtYlxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG9yaWdpbmFsIHRleHQgdmFsdWUsIHRoYXQgaXMgdG8gYmUgdHJhbnNsYXRlZCwgYXMgbm9ybWFsaXplZCBtZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXRlU291cmNlQ29udGVudE5vcm1hbGl6ZWQoKTogUGFyc2VkTWVzc2FnZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIuY3JlYXRlU291cmNlQ29udGVudE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgdHJhbnNsYXRlZCB2YWx1ZSAoY29udGFpbmluZyBhbGwgbWFya3VwLCBkZXBlbmRzIG9uIHRoZSBjb25jcmV0ZSBmb3JtYXQgdXNlZCkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0YXJnZXRDb250ZW50KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIERPTVV0aWxpdGllcy5nZXRYTUxDb250ZW50KHRoaXMuX2VsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHRyYW5zbGF0ZWQgdmFsdWUsIGJ1dCBhbGwgcGxhY2Vob2xkZXJzIGFyZSByZXBsYWNlZCB3aXRoIHt7bn19IChzdGFydGluZyBhdCAwKVxyXG4gICAgICogYW5kIGFsbCBlbWJlZGRlZCBodG1sIGlzIHJlcGxhY2VkIGJ5IGRpcmVjdCBodG1sIG1hcmt1cC5cclxuICAgICAqL1xyXG4gICAgdGFyZ2V0Q29udGVudE5vcm1hbGl6ZWQoKTogSU5vcm1hbGl6ZWRNZXNzYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlUGFyc2VyKCkuY3JlYXRlTm9ybWFsaXplZE1lc3NhZ2VGcm9tWE1MKHRoaXMuX2VsZW1lbnQsIHRoaXMuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSBvZiB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgKiAobm90IHN1cHBvcnRlZCBpbiB4bWIpXHJcbiAgICAgKiBJZiB3ZSBoYXZlIGEgbWFzdGVyLCB3ZSBhc3N1bWVkIGl0IGlzIHRyYW5zbGF0ZWQgaWYgdGhlIGNvbnRlbnQgaXMgbm90IHRoZSBzYW1lIGFzIHRoZSBtYXN0ZXJzIG9uZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hdGl2ZVRhcmdldFN0YXRlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlQ29udGVudCA9IHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIuc291cmNlQ29udGVudCgpO1xyXG4gICAgICAgICAgICBpZiAoIXNvdXJjZUNvbnRlbnQgfHwgc291cmNlQ29udGVudCA9PT0gdGhpcy50YXJnZXRDb250ZW50KCkgfHwgIXRoaXMudGFyZ2V0Q29udGVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ25ldyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpbmFsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDsgLy8gbm90IHN1cHBvcnRlZCBpbiB4bWJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcCBhbiBhYnN0cmFjdCBzdGF0ZSAobmV3LCB0cmFuc2xhdGVkLCBmaW5hbCkgdG8gYSBjb25jcmV0ZSBzdGF0ZSB1c2VkIGluIHRoZSB4bWwuXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSB0byBiZSB1c2VkIGluIHRoZSB4bWwuXHJcbiAgICAgKiBAcGFyYW0gc3RhdGUgb25lIG9mIENvbnN0YW50cy5TVEFURS4uLlxyXG4gICAgICogQHJldHVybnMgYSBuYXRpdmUgc3RhdGUgKGRlcGVuZHMgb24gY29uY3JldGUgZm9ybWF0KVxyXG4gICAgICogQHRocm93cyBlcnJvciwgaWYgc3RhdGUgaXMgaW52YWxpZC5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG1hcFN0YXRlVG9OYXRpdmVTdGF0ZShzdGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXAgYSBuYXRpdmUgc3RhdGUgKGZvdW5kIGluIHRoZSBkb2N1bWVudCkgdG8gYW4gYWJzdHJhY3Qgc3RhdGUgKG5ldywgdHJhbnNsYXRlZCwgZmluYWwpLlxyXG4gICAgICogUmV0dXJucyB0aGUgYWJzdHJhY3Qgc3RhdGUuXHJcbiAgICAgKiBAcGFyYW0gbmF0aXZlU3RhdGUgbmF0aXZlU3RhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG1hcE5hdGl2ZVN0YXRlVG9TdGF0ZShuYXRpdmVTdGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbmF0aXZlU3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZXQgc3RhdGUgaW4geG1sLlxyXG4gICAgICogKG5vdCBzdXBwb3J0ZWQgaW4geG1iKVxyXG4gICAgICogQHBhcmFtIG5hdGl2ZVN0YXRlIG5hdGl2ZVN0YXRlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBzZXROYXRpdmVUYXJnZXRTdGF0ZShuYXRpdmVTdGF0ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gVE9ETyBzb21lIGxvZ2ljIHRvIHN0b3JlIGl0IGFueXdoZXJlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGwgdGhlIHNvdXJjZSBlbGVtZW50cyBpbiB0aGUgdHJhbnMgdW5pdC5cclxuICAgICAqIFRoZSBzb3VyY2UgZWxlbWVudCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXHJcbiAgICAgKiBJdCBjb250YWlucyB0aGUgbmFtZSBvZiB0aGUgdGVtcGxhdGUgZmlsZSBhbmQgYSBsaW5lIG51bWJlciB3aXRoIHRoZSBwb3NpdGlvbiBpbnNpZGUgdGhlIHRlbXBsYXRlLlxyXG4gICAgICogSXQgaXMganVzdCBhIGhlbHAgZm9yIHRyYW5zbGF0b3JzIHRvIGZpbmQgdGhlIGNvbnRleHQgZm9yIHRoZSB0cmFuc2xhdGlvbi5cclxuICAgICAqIFRoaXMgaXMgc2V0IHdoZW4gdXNpbmcgQW5ndWxhciA0LjAgb3IgZ3JlYXRlci5cclxuICAgICAqIE90aGVyd2lzZSBpdCBqdXN0IHJldHVybnMgYW4gZW1wdHkgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzb3VyY2VSZWZlcmVuY2VzKCk6IHsgc291cmNlZmlsZTogc3RyaW5nLCBsaW5lbnVtYmVyOiBudW1iZXIgfVtdIHtcclxuICAgICAgICBpZiAodGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlVHJhbnNVbml0RnJvbU1hc3Rlci5zb3VyY2VSZWZlcmVuY2VzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIHNvdXJjZSByZWZzIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0U291cmNlUmVmZXJlbmNlcyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0U291cmNlUmVmZXJlbmNlcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgc291cmNlIHJlZiBlbGVtZW50cyBpbiB0aGUgdHJhbnN1bml0LlxyXG4gICAgICogTm9ybWFsbHksIHRoaXMgaXMgZG9uZSBieSBuZy1leHRyYWN0LlxyXG4gICAgICogTWV0aG9kIG9ubHkgZXhpc3RzIHRvIGFsbG93IHhsaWZmbWVyZ2UgdG8gbWVyZ2UgbWlzc2luZyBzb3VyY2UgcmVmcy5cclxuICAgICAqIEBwYXJhbSBzb3VyY2VSZWZzIHRoZSBzb3VyY2VyZWZzIHRvIHNldC4gT2xkIG9uZXMgYXJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRTb3VyY2VSZWZlcmVuY2VzKHNvdXJjZVJlZnM6IHtzb3VyY2VmaWxlOiBzdHJpbmcsIGxpbmVudW1iZXI6IG51bWJlcn1bXSkge1xyXG4gICAgICAgIC8vIHh0YiBoYXMgbm8gc291cmNlIHJlZnMsIHRoZXkgYXJlIHBhcnQgb2YgdGhlIG1hc3RlclxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlc2NyaXB0aW9uIHNldCBpbiB0aGUgdGVtcGxhdGUgYXMgdmFsdWUgb2YgdGhlIGkxOG4tYXR0cmlidXRlLlxyXG4gICAgICogZS5nLiBpMThuPVwibXlkZXNjcmlwdGlvblwiLlxyXG4gICAgICogSW4geHRiIG9ubHkgdGhlIG1hc3RlciBzdG9yZXMgaXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2VUcmFuc1VuaXRGcm9tTWFzdGVyLmRlc2NyaXB0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1lYW5pbmcgKGludGVudCkgc2V0IGluIHRoZSB0ZW1wbGF0ZSBhcyB2YWx1ZSBvZiB0aGUgaTE4bi1hdHRyaWJ1dGUuXHJcbiAgICAgKiBUaGlzIGlzIHRoZSBwYXJ0IGluIGZyb250IG9mIHRoZSB8IHN5bWJvbC5cclxuICAgICAqIGUuZy4gaTE4bj1cIm1lYW5pbmd8bXlkZXNjcmlwdGlvblwiLlxyXG4gICAgICogSW4geHRiIG9ubHkgdGhlIG1hc3RlciBzdG9yZXMgaXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZWFuaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZVRyYW5zVW5pdEZyb21NYXN0ZXIubWVhbmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciBzZXR0aW5nIG9mIGRlc2NyaXB0aW9uIGFuZCBtZWFuaW5nIGlzIHN1cHBvcnRlZC5cclxuICAgICAqIElmIG5vdCwgc2V0RGVzY3JpcHRpb24gYW5kIHNldE1lYW5pbmcgd2lsbCBkbyBub3RoaW5nLlxyXG4gICAgICogeHRiIGRvZXMgbm90IHN1cHBvcnQgdGhpcywgYWxsIG90aGVyIGZvcm1hdHMgZG8uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdXBwb3J0c1NldERlc2NyaXB0aW9uQW5kTWVhbmluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgZGVzY3JpcHRpb24gcHJvcGVydHkgb2YgdHJhbnMtdW5pdC5cclxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiBkZXNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZykge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQsIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSBtZWFuaW5nIHByb3BlcnR5IG9mIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBAcGFyYW0gbWVhbmluZyBtZWFuaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRNZWFuaW5nKG1lYW5pbmc6IHN0cmluZykge1xyXG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQsIGRvIG5vdGhpbmdcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbGwgbm90ZXMgb2YgdGhlIHRyYW5zLXVuaXQuXHJcbiAgICAgKiBUaGVyZSBhcmUgTk8gbm90ZXMgaW4geG1iL3h0YlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbm90ZXMoKTogSU5vdGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHNldHRpbmcgb2Ygbm90ZXMgaXMgc3VwcG9ydGVkLlxyXG4gICAgICogSWYgbm90LCBzZXROb3RlcyB3aWxsIGRvIG5vdGhpbmcuXHJcbiAgICAgKiB4dGIgZG9lcyBub3Qgc3VwcG9ydCB0aGlzLCBhbGwgb3RoZXIgZm9ybWF0cyBkby5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN1cHBvcnRzU2V0Tm90ZXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIG5vdGVzIHRvIHRyYW5zIHVuaXQuXHJcbiAgICAgKiBAcGFyYW0gbmV3Tm90ZXMgdGhlIG5vdGVzIHRvIGFkZC5cclxuICAgICAqIE5PVCBTdXBwb3J0ZWQgaW4geG1iL3h0YlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Tm90ZXMobmV3Tm90ZXM6IElOb3RlW10pIHtcclxuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkLCBkbyBub3RoaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb3B5IHNvdXJjZSB0byB0YXJnZXQgdG8gdXNlIGl0IGFzIGR1bW15IHRyYW5zbGF0aW9uLlxyXG4gICAgICogUmV0dXJucyBhIGNoYW5nZWQgY29weSBvZiB0aGlzIHRyYW5zIHVuaXQuXHJcbiAgICAgKiByZWNlaXZlciBpcyBub3QgY2hhbmdlZC5cclxuICAgICAqIChpbnRlcm5hbCB1c2FnZSBvbmx5LCBhIGNsaWVudCBzaG91bGQgY2FsbCBpbXBvcnROZXdUcmFuc1VuaXQgb24gSVRyYW5zbGF0aW9uTWVzc2FnZUZpbGUpXHJcbiAgICAgKiBJbiB4dGIgdGhlcmUgaXMgbm90aGluZyB0byBkbywgYmVjYXVzZSB0aGVyZSBpcyBvbmx5IGEgdGFyZ2V0LCBubyBzb3VyY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9uZVdpdGhTb3VyY2VBc1RhcmdldChpc0RlZmF1bHRMYW5nOiBib29sZWFuLCBjb3B5Q29udGVudDogYm9vbGVhbiwgdGFyZ2V0RmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTogQWJzdHJhY3RUcmFuc1VuaXQge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29weSBzb3VyY2UgdG8gdGFyZ2V0IHRvIHVzZSBpdCBhcyBkdW1teSB0cmFuc2xhdGlvbi5cclxuICAgICAqIChpbnRlcm5hbCB1c2FnZSBvbmx5LCBhIGNsaWVudCBzaG91bGQgY2FsbCBjcmVhdGVUcmFuc2xhdGlvbkZpbGVGb3JMYW5nIG9uIElUcmFuc2xhdGlvbk1lc3NhZ2VGaWxlKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXNlU291cmNlQXNUYXJnZXQoaXNEZWZhdWx0TGFuZzogYm9vbGVhbiwgY29weUNvbnRlbnQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAvLyBkbyBub3RoaW5nXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHRyYW5zbGF0aW9uIHRvIGEgZ2l2ZW4gc3RyaW5nIChpbmNsdWRpbmcgbWFya3VwKS5cclxuICAgICAqIEBwYXJhbSB0cmFuc2xhdGlvbiB0cmFuc2xhdGlvblxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRlTmF0aXZlKHRyYW5zbGF0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLl9lbGVtZW50O1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0cmFuc2xhdGlvbikpIHtcclxuICAgICAgICAgICAgdHJhbnNsYXRpb24gPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgRE9NVXRpbGl0aWVzLnJlcGxhY2VDb250ZW50V2l0aFhNTENvbnRlbnQodGFyZ2V0LCB0cmFuc2xhdGlvbik7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==