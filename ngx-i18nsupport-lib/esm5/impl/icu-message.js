/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { format, isNullOrUndefined, isString } from 'util';
var MessageCategory = /** @class */ (function () {
    function MessageCategory(_category, _message) {
        this._category = _category;
        this._message = _message;
    }
    /**
     * @return {?}
     */
    MessageCategory.prototype.getCategory = /**
     * @return {?}
     */
    function () {
        return this._category;
    };
    /**
     * @return {?}
     */
    MessageCategory.prototype.getMessageNormalized = /**
     * @return {?}
     */
    function () {
        return this._message;
    };
    return MessageCategory;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    MessageCategory.prototype._category;
    /**
     * @type {?}
     * @private
     */
    MessageCategory.prototype._message;
}
/**
 * Implementation of an ICU Message.
 * Created by martin on 05.06.2017.
 */
var /**
 * Implementation of an ICU Message.
 * Created by martin on 05.06.2017.
 */
ICUMessage = /** @class */ (function () {
    function ICUMessage(_parser, isPluralMessage) {
        this._parser = _parser;
        this._isPluralMessage = isPluralMessage;
        this._categories = [];
    }
    /**
     * @param {?} category
     * @param {?} message
     * @return {?}
     */
    ICUMessage.prototype.addCategory = /**
     * @param {?} category
     * @param {?} message
     * @return {?}
     */
    function (category, message) {
        this._categories.push(new MessageCategory(category, message));
    };
    /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return ICU message as native string.
     */
    /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return {?} ICU message as native string.
     */
    ICUMessage.prototype.asNativeString = /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return {?} ICU message as native string.
     */
    function () {
        /** @type {?} */
        var varname = (this.isPluralMessage()) ? 'VAR_PLURAL' : 'VAR_SELECT';
        /** @type {?} */
        var type = (this.isPluralMessage()) ? 'plural' : 'select';
        /** @type {?} */
        var choiceString = '';
        this._categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        function (category) {
            choiceString = choiceString + format(' %s {%s}', category.getCategory(), category.getMessageNormalized().asNativeString());
        }));
        return format('{%s, %s,%s}', varname, type, choiceString);
    };
    /**
     * Is it a plural message?
     */
    /**
     * Is it a plural message?
     * @return {?}
     */
    ICUMessage.prototype.isPluralMessage = /**
     * Is it a plural message?
     * @return {?}
     */
    function () {
        return this._isPluralMessage;
    };
    /**
     * Is it a select message?
     */
    /**
     * Is it a select message?
     * @return {?}
     */
    ICUMessage.prototype.isSelectMessage = /**
     * Is it a select message?
     * @return {?}
     */
    function () {
        return !this._isPluralMessage;
    };
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     */
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     * @return {?}
     */
    ICUMessage.prototype.getCategories = /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     * @return {?}
     */
    function () {
        return this._categories;
    };
    /**
     * Translate message and return a new, translated message
     * @param translation the translation (hashmap of categories and translations).
     * @return new message wit translated content.
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     */
    /**
     * Translate message and return a new, translated message
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     * @param {?} translation the translation (hashmap of categories and translations).
     * @return {?} new message wit translated content.
     */
    ICUMessage.prototype.translate = /**
     * Translate message and return a new, translated message
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     * @param {?} translation the translation (hashmap of categories and translations).
     * @return {?} new message wit translated content.
     */
    function (translation) {
        var _this = this;
        /** @type {?} */
        var message = new ICUMessage(this._parser, this.isPluralMessage());
        /** @type {?} */
        var translatedCategories = new Set();
        this._categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        function (category) {
            /** @type {?} */
            var translatedMessage;
            /** @type {?} */
            var translationForCategory = translation[category.getCategory()];
            if (isNullOrUndefined(translationForCategory)) {
                translatedMessage = category.getMessageNormalized();
            }
            else if (isString(translationForCategory)) {
                translatedCategories.add(category.getCategory());
                translatedMessage = _this._parser.parseNormalizedString((/** @type {?} */ (translationForCategory)), null);
            }
            else {
                // TODO embedded ICU Message
                translatedMessage = null;
            }
            message.addCategory(category.getCategory(), translatedMessage);
        }));
        // new categories, which are not part of the original message
        Object.keys(translation).forEach((/**
         * @param {?} categoryName
         * @return {?}
         */
        function (categoryName) {
            if (!translatedCategories.has(categoryName)) {
                if (_this.isSelectMessage()) {
                    throw new Error(format('adding a new category not allowed for select messages ("%s" is not part of message)', categoryName));
                }
                else {
                    _this.checkValidPluralCategory(categoryName);
                    // TODO embedded ICU Message
                    /** @type {?} */
                    var translatedMessage = _this._parser.parseNormalizedString((/** @type {?} */ (translation[categoryName])), null);
                    message.addCategory(categoryName, translatedMessage);
                }
            }
        }));
        return message;
    };
    /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @param categoryName category
     * @throws an error, if it is not a valid category name
     */
    /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @throws an error, if it is not a valid category name
     * @private
     * @param {?} categoryName category
     * @return {?}
     */
    ICUMessage.prototype.checkValidPluralCategory = /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @throws an error, if it is not a valid category name
     * @private
     * @param {?} categoryName category
     * @return {?}
     */
    function (categoryName) {
        /** @type {?} */
        var allowedKeywords = ['zero', 'one', 'two', 'few', 'many', 'other'];
        if (categoryName.match(/=\d+/)) {
            return;
        }
        if (allowedKeywords.find((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return key === categoryName; }))) {
            return;
        }
        throw new Error(format('invalid plural category "%s", allowed are =<n> and %s', categoryName, allowedKeywords));
    };
    return ICUMessage;
}());
/**
 * Implementation of an ICU Message.
 * Created by martin on 05.06.2017.
 */
export { ICUMessage };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ICUMessage.prototype._isPluralMessage;
    /**
     * @type {?}
     * @private
     */
    ICUMessage.prototype._categories;
    /**
     * @type {?}
     * @private
     */
    ICUMessage.prototype._parser;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWN1LW1lc3NhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL2ljdS1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd6RDtJQUVJLHlCQUFvQixTQUFpQixFQUFVLFFBQTRCO1FBQXZELGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtJQUFHLENBQUM7Ozs7SUFFeEUscUNBQVc7OztJQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7O0lBRU0sOENBQW9COzs7SUFBM0I7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7Ozs7OztJQVRlLG9DQUF5Qjs7Ozs7SUFBRSxtQ0FBb0M7Ozs7OztBQWUvRTs7Ozs7SUFNSSxvQkFBb0IsT0FBdUIsRUFBRSxlQUF3QjtRQUFqRCxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVELGdDQUFXOzs7OztJQUFYLFVBQVksUUFBZ0IsRUFBRSxPQUEyQjtRQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7O0lBQ0ksbUNBQWM7Ozs7O0lBQXJCOztZQUNVLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FB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QixDQUFDLENBQUM7aUJBQ3hEO2FBQ0o7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0ssNkNBQXdCOzs7Ozs7OztJQUFoQyxVQUFpQyxZQUFvQjs7WUFDM0MsZUFBZSxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7UUFDdEUsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVCLE9BQU87U0FDVjtRQUNELElBQUksZUFBZSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsS0FBSyxZQUFZLEVBQXBCLENBQW9CLEVBQUMsRUFBRTtZQUNyRCxPQUFPO1NBQ1Y7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyx1REFBdUQsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQUFDLEFBOUdELElBOEdDOzs7Ozs7Ozs7OztJQTVHRyxzQ0FBa0M7Ozs7O0lBRWxDLGlDQUEyQzs7Ozs7SUFFL0IsNkJBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJSUNVTWVzc2FnZSwgSUlDVU1lc3NhZ2VDYXRlZ29yeSwgSUlDVU1lc3NhZ2VUcmFuc2xhdGlvbiwgSU5vcm1hbGl6ZWRNZXNzYWdlfSBmcm9tICcuLi9hcGkvaW5kZXgnO1xyXG5pbXBvcnQge2Zvcm1hdCwgaXNOdWxsT3JVbmRlZmluZWQsIGlzU3RyaW5nfSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtJTWVzc2FnZVBhcnNlcn0gZnJvbSAnLi9pLW1lc3NhZ2UtcGFyc2VyJztcclxuXHJcbmNsYXNzIE1lc3NhZ2VDYXRlZ29yeSBpbXBsZW1lbnRzIElJQ1VNZXNzYWdlQ2F0ZWdvcnkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhdGVnb3J5OiBzdHJpbmcsIHByaXZhdGUgX21lc3NhZ2U6IElOb3JtYWxpemVkTWVzc2FnZSkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcnkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2F0ZWdvcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1lc3NhZ2VOb3JtYWxpemVkKCk6IElOb3JtYWxpemVkTWVzc2FnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBhbiBJQ1UgTWVzc2FnZS5cclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDUuMDYuMjAxNy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJQ1VNZXNzYWdlIGltcGxlbWVudHMgSUlDVU1lc3NhZ2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2lzUGx1cmFsTWVzc2FnZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9jYXRlZ29yaWVzOiBJSUNVTWVzc2FnZUNhdGVnb3J5W107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyc2VyOiBJTWVzc2FnZVBhcnNlciwgaXNQbHVyYWxNZXNzYWdlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNQbHVyYWxNZXNzYWdlID0gaXNQbHVyYWxNZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuX2NhdGVnb3JpZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDYXRlZ29yeShjYXRlZ29yeTogc3RyaW5nLCBtZXNzYWdlOiBJTm9ybWFsaXplZE1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLl9jYXRlZ29yaWVzLnB1c2gobmV3IE1lc3NhZ2VDYXRlZ29yeShjYXRlZ29yeSwgbWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSUNVIG1lc3NhZ2UgYXMgbmF0aXZlIHN0cmluZy5cclxuICAgICAqIFRoaXMgaXMsIGhvdyBpdCBpcyBzdG9yZWQsIHNvbWV0aGluZyBsaWtlICd7eCwgcGx1cmFsLCA9MCB7Li59J1xyXG4gICAgICogQHJldHVybiBJQ1UgbWVzc2FnZSBhcyBuYXRpdmUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXNOYXRpdmVTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB2YXJuYW1lID0gKHRoaXMuaXNQbHVyYWxNZXNzYWdlKCkpID8gJ1ZBUl9QTFVSQUwnIDogJ1ZBUl9TRUxFQ1QnO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSAodGhpcy5pc1BsdXJhbE1lc3NhZ2UoKSkgPyAncGx1cmFsJyA6ICdzZWxlY3QnO1xyXG4gICAgICAgIGxldCBjaG9pY2VTdHJpbmcgPSAnJztcclxuICAgICAgICB0aGlzLl9jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5OiBJSUNVTWVzc2FnZUNhdGVnb3J5KSA9PiB7XHJcbiAgICAgICAgICAgIGNob2ljZVN0cmluZyA9IGNob2ljZVN0cmluZyArIGZvcm1hdCgnICVzIHslc30nLCBjYXRlZ29yeS5nZXRDYXRlZ29yeSgpLCBjYXRlZ29yeS5nZXRNZXNzYWdlTm9ybWFsaXplZCgpLmFzTmF0aXZlU3RyaW5nKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQoJ3slcywgJXMsJXN9JywgdmFybmFtZSwgdHlwZSwgY2hvaWNlU3RyaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIGl0IGEgcGx1cmFsIG1lc3NhZ2U/XHJcbiAgICAgKi9cclxuICAgIGlzUGx1cmFsTWVzc2FnZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQbHVyYWxNZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgaXQgYSBzZWxlY3QgbWVzc2FnZT9cclxuICAgICAqL1xyXG4gICAgaXNTZWxlY3RNZXNzYWdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5faXNQbHVyYWxNZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIHRoZSBwYXJ0cyBvZiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEUuZy4gdGhlIElDVSBtZXNzYWdlIHt3b2x2ZXMsIHBsdXJhbCwgPTAge25vIHdvbHZlc30gPTEge29uZSB3b2xmfSA9MiB7dHdvIHdvbHZlc30gb3RoZXIge2Egd29sZiBwYWNrfX1cclxuICAgICAqIGhhcyA0IGNhdGVnb3J5IG9iamVjdHMgd2l0aCB0aGUgY2F0ZWdvcmllcyA9MCwgPTEsID0yLCBvdGhlci5cclxuICAgICAqL1xyXG4gICAgZ2V0Q2F0ZWdvcmllcygpOiBJSUNVTWVzc2FnZUNhdGVnb3J5W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXRlZ29yaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIG1lc3NhZ2UgYW5kIHJldHVybiBhIG5ldywgdHJhbnNsYXRlZCBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRpb24gdGhlIHRyYW5zbGF0aW9uIChoYXNobWFwIG9mIGNhdGVnb3JpZXMgYW5kIHRyYW5zbGF0aW9ucykuXHJcbiAgICAgKiBAcmV0dXJuIG5ldyBtZXNzYWdlIHdpdCB0cmFuc2xhdGVkIGNvbnRlbnQuXHJcbiAgICAgKiBAdGhyb3dzIGFuIGVycm9yIGlmIHRyYW5zbGF0aW9uIGRvZXMgbm90IG1hdGNoIHRoZSBtZXNzYWdlLlxyXG4gICAgICogVGhpcyBpcyB0aGUgY2FzZSwgaWYgdGhlcmUgYXJlIGNhdGVnb3JpZXMgbm90IGNvbnRhaW5lZCBpbiB0aGUgb3JpZ2luYWwgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uOiBJSUNVTWVzc2FnZVRyYW5zbGF0aW9uKTogSUlDVU1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgSUNVTWVzc2FnZSh0aGlzLl9wYXJzZXIsIHRoaXMuaXNQbHVyYWxNZXNzYWdlKCkpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXRlZ29yaWVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWRNZXNzYWdlOiBJTm9ybWFsaXplZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uRm9yQ2F0ZWdvcnk6IHN0cmluZ3xJSUNVTWVzc2FnZVRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb25bY2F0ZWdvcnkuZ2V0Q2F0ZWdvcnkoKV07XHJcbiAgICAgICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0cmFuc2xhdGlvbkZvckNhdGVnb3J5KSkge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZE1lc3NhZ2UgPSBjYXRlZ29yeS5nZXRNZXNzYWdlTm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRyYW5zbGF0aW9uRm9yQ2F0ZWdvcnkpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkQ2F0ZWdvcmllcy5hZGQoY2F0ZWdvcnkuZ2V0Q2F0ZWdvcnkoKSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkTWVzc2FnZSA9IHRoaXMuX3BhcnNlci5wYXJzZU5vcm1hbGl6ZWRTdHJpbmcoPHN0cmluZz4gdHJhbnNsYXRpb25Gb3JDYXRlZ29yeSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGVtYmVkZGVkIElDVSBNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkTWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVzc2FnZS5hZGRDYXRlZ29yeShjYXRlZ29yeS5nZXRDYXRlZ29yeSgpLCB0cmFuc2xhdGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbmV3IGNhdGVnb3JpZXMsIHdoaWNoIGFyZSBub3QgcGFydCBvZiB0aGUgb3JpZ2luYWwgbWVzc2FnZVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRyYW5zbGF0aW9uKS5mb3JFYWNoKChjYXRlZ29yeU5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0cmFuc2xhdGVkQ2F0ZWdvcmllcy5oYXMoY2F0ZWdvcnlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RNZXNzYWdlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdhZGRpbmcgYSBuZXcgY2F0ZWdvcnkgbm90IGFsbG93ZWQgZm9yIHNlbGVjdCBtZXNzYWdlcyAoXCIlc1wiIGlzIG5vdCBwYXJ0IG9mIG1lc3NhZ2UpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tWYWxpZFBsdXJhbENhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBlbWJlZGRlZCBJQ1UgTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkTWVzc2FnZSA9IHRoaXMuX3BhcnNlci5wYXJzZU5vcm1hbGl6ZWRTdHJpbmcoPHN0cmluZz4gdHJhbnNsYXRpb25bY2F0ZWdvcnlOYW1lXSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRDYXRlZ29yeShjYXRlZ29yeU5hbWUsIHRyYW5zbGF0ZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2ssIHdldGhlciBjYXRlZ29yeSBpcyB2YWxpZCBwbHVyYWwgY2F0ZWdvcnkuXHJcbiAgICAgKiBBbGxvd2VkIGFyZSA9biwgJ3plcm8nLCAnb25lJywgJ3R3bycsICdmZXcnLCAnbWFueScgYW5kICdvdGhlcidcclxuICAgICAqIEBwYXJhbSBjYXRlZ29yeU5hbWUgY2F0ZWdvcnlcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IsIGlmIGl0IGlzIG5vdCBhIHZhbGlkIGNhdGVnb3J5IG5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja1ZhbGlkUGx1cmFsQ2F0ZWdvcnkoY2F0ZWdvcnlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhbGxvd2VkS2V5d29yZHMgPSBbJ3plcm8nLCAnb25lJywgJ3R3bycsICdmZXcnLCAnbWFueScsICdvdGhlciddO1xyXG4gICAgICAgIGlmIChjYXRlZ29yeU5hbWUubWF0Y2goLz1cXGQrLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxsb3dlZEtleXdvcmRzLmZpbmQoKGtleSkgPT4ga2V5ID09PSBjYXRlZ29yeU5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnaW52YWxpZCBwbHVyYWwgY2F0ZWdvcnkgXCIlc1wiLCBhbGxvd2VkIGFyZSA9PG4+IGFuZCAlcycsIGNhdGVnb3J5TmFtZSwgYWxsb3dlZEtleXdvcmRzKSk7XHJcbiAgICB9XHJcbn1cclxuIl19