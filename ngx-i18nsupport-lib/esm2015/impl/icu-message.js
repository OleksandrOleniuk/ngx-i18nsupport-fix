/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { format, isNullOrUndefined, isString } from 'util';
class MessageCategory {
    /**
     * @param {?} _category
     * @param {?} _message
     */
    constructor(_category, _message) {
        this._category = _category;
        this._message = _message;
    }
    /**
     * @return {?}
     */
    getCategory() {
        return this._category;
    }
    /**
     * @return {?}
     */
    getMessageNormalized() {
        return this._message;
    }
}
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
export class ICUMessage {
    /**
     * @param {?} _parser
     * @param {?} isPluralMessage
     */
    constructor(_parser, isPluralMessage) {
        this._parser = _parser;
        this._isPluralMessage = isPluralMessage;
        this._categories = [];
    }
    /**
     * @param {?} category
     * @param {?} message
     * @return {?}
     */
    addCategory(category, message) {
        this._categories.push(new MessageCategory(category, message));
    }
    /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return {?} ICU message as native string.
     */
    asNativeString() {
        /** @type {?} */
        const varname = (this.isPluralMessage()) ? 'VAR_PLURAL' : 'VAR_SELECT';
        /** @type {?} */
        const type = (this.isPluralMessage()) ? 'plural' : 'select';
        /** @type {?} */
        let choiceString = '';
        this._categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        (category) => {
            choiceString = choiceString + format(' %s {%s}', category.getCategory(), category.getMessageNormalized().asNativeString());
        }));
        return format('{%s, %s,%s}', varname, type, choiceString);
    }
    /**
     * Is it a plural message?
     * @return {?}
     */
    isPluralMessage() {
        return this._isPluralMessage;
    }
    /**
     * Is it a select message?
     * @return {?}
     */
    isSelectMessage() {
        return !this._isPluralMessage;
    }
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     * @return {?}
     */
    getCategories() {
        return this._categories;
    }
    /**
     * Translate message and return a new, translated message
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     * @param {?} translation the translation (hashmap of categories and translations).
     * @return {?} new message wit translated content.
     */
    translate(translation) {
        /** @type {?} */
        const message = new ICUMessage(this._parser, this.isPluralMessage());
        /** @type {?} */
        const translatedCategories = new Set();
        this._categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        (category) => {
            /** @type {?} */
            let translatedMessage;
            /** @type {?} */
            const translationForCategory = translation[category.getCategory()];
            if (isNullOrUndefined(translationForCategory)) {
                translatedMessage = category.getMessageNormalized();
            }
            else if (isString(translationForCategory)) {
                translatedCategories.add(category.getCategory());
                translatedMessage = this._parser.parseNormalizedString((/** @type {?} */ (translationForCategory)), null);
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
        (categoryName) => {
            if (!translatedCategories.has(categoryName)) {
                if (this.isSelectMessage()) {
                    throw new Error(format('adding a new category not allowed for select messages ("%s" is not part of message)', categoryName));
                }
                else {
                    this.checkValidPluralCategory(categoryName);
                    // TODO embedded ICU Message
                    /** @type {?} */
                    let translatedMessage = this._parser.parseNormalizedString((/** @type {?} */ (translation[categoryName])), null);
                    message.addCategory(categoryName, translatedMessage);
                }
            }
        }));
        return message;
    }
    /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @throws an error, if it is not a valid category name
     * @private
     * @param {?} categoryName category
     * @return {?}
     */
    checkValidPluralCategory(categoryName) {
        /** @type {?} */
        const allowedKeywords = ['zero', 'one', 'two', 'few', 'many', 'other'];
        if (categoryName.match(/=\d+/)) {
            return;
        }
        if (allowedKeywords.find((/**
         * @param {?} key
         * @return {?}
         */
        (key) => key === categoryName))) {
            return;
        }
        throw new Error(format('invalid plural category "%s", allowed are =<n> and %s', categoryName, allowedKeywords));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWN1LW1lc3NhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL2ljdS1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd6RCxNQUFNLGVBQWU7Ozs7O0lBRWpCLFlBQW9CLFNBQWlCLEVBQVUsUUFBNEI7UUFBdkQsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQW9CO0lBQUcsQ0FBQzs7OztJQUV4RSxXQUFXO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFTSxvQkFBb0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjs7Ozs7O0lBVGUsb0NBQXlCOzs7OztJQUFFLG1DQUFvQzs7Ozs7O0FBZS9FLE1BQU0sT0FBTyxVQUFVOzs7OztJQU1uQixZQUFvQixPQUF1QixFQUFFLGVBQXdCO1FBQWpELFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRUQsV0FBVyxDQUFDLFFBQWdCLEVBQUUsT0FBMkI7UUFDckQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7Ozs7O0lBT00sY0FBYzs7Y0FDWCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZOztjQUNoRSxJQUFJLEdBQUcsQ0FB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RyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO1FBQ3RFLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUM1QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLGVBQWUsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxZQUFZLEVBQUMsRUFBRTtZQUNyRCxPQUFPO1NBQ1Y7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyx1REFBdUQsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNwSCxDQUFDO0NBQ0o7Ozs7OztJQTVHRyxzQ0FBa0M7Ozs7O0lBRWxDLGlDQUEyQzs7Ozs7SUFFL0IsNkJBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJSUNVTWVzc2FnZSwgSUlDVU1lc3NhZ2VDYXRlZ29yeSwgSUlDVU1lc3NhZ2VUcmFuc2xhdGlvbiwgSU5vcm1hbGl6ZWRNZXNzYWdlfSBmcm9tICcuLi9hcGkvaW5kZXgnO1xyXG5pbXBvcnQge2Zvcm1hdCwgaXNOdWxsT3JVbmRlZmluZWQsIGlzU3RyaW5nfSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtJTWVzc2FnZVBhcnNlcn0gZnJvbSAnLi9pLW1lc3NhZ2UtcGFyc2VyJztcclxuXHJcbmNsYXNzIE1lc3NhZ2VDYXRlZ29yeSBpbXBsZW1lbnRzIElJQ1VNZXNzYWdlQ2F0ZWdvcnkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NhdGVnb3J5OiBzdHJpbmcsIHByaXZhdGUgX21lc3NhZ2U6IElOb3JtYWxpemVkTWVzc2FnZSkge31cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcnkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2F0ZWdvcnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1lc3NhZ2VOb3JtYWxpemVkKCk6IElOb3JtYWxpemVkTWVzc2FnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBhbiBJQ1UgTWVzc2FnZS5cclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDUuMDYuMjAxNy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJQ1VNZXNzYWdlIGltcGxlbWVudHMgSUlDVU1lc3NhZ2Uge1xyXG5cclxuICAgIHByaXZhdGUgX2lzUGx1cmFsTWVzc2FnZTogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9jYXRlZ29yaWVzOiBJSUNVTWVzc2FnZUNhdGVnb3J5W107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFyc2VyOiBJTWVzc2FnZVBhcnNlciwgaXNQbHVyYWxNZXNzYWdlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNQbHVyYWxNZXNzYWdlID0gaXNQbHVyYWxNZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuX2NhdGVnb3JpZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRDYXRlZ29yeShjYXRlZ29yeTogc3RyaW5nLCBtZXNzYWdlOiBJTm9ybWFsaXplZE1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLl9jYXRlZ29yaWVzLnB1c2gobmV3IE1lc3NhZ2VDYXRlZ29yeShjYXRlZ29yeSwgbWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSUNVIG1lc3NhZ2UgYXMgbmF0aXZlIHN0cmluZy5cclxuICAgICAqIFRoaXMgaXMsIGhvdyBpdCBpcyBzdG9yZWQsIHNvbWV0aGluZyBsaWtlICd7eCwgcGx1cmFsLCA9MCB7Li59J1xyXG4gICAgICogQHJldHVybiBJQ1UgbWVzc2FnZSBhcyBuYXRpdmUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXNOYXRpdmVTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB2YXJuYW1lID0gKHRoaXMuaXNQbHVyYWxNZXNzYWdlKCkpID8gJ1ZBUl9QTFVSQUwnIDogJ1ZBUl9TRUxFQ1QnO1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSAodGhpcy5pc1BsdXJhbE1lc3NhZ2UoKSkgPyAncGx1cmFsJyA6ICdzZWxlY3QnO1xyXG4gICAgICAgIGxldCBjaG9pY2VTdHJpbmcgPSAnJztcclxuICAgICAgICB0aGlzLl9jYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5OiBJSUNVTWVzc2FnZUNhdGVnb3J5KSA9PiB7XHJcbiAgICAgICAgICAgIGNob2ljZVN0cmluZyA9IGNob2ljZVN0cmluZyArIGZvcm1hdCgnICVzIHslc30nLCBjYXRlZ29yeS5nZXRDYXRlZ29yeSgpLCBjYXRlZ29yeS5nZXRNZXNzYWdlTm9ybWFsaXplZCgpLmFzTmF0aXZlU3RyaW5nKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQoJ3slcywgJXMsJXN9JywgdmFybmFtZSwgdHlwZSwgY2hvaWNlU3RyaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElzIGl0IGEgcGx1cmFsIG1lc3NhZ2U/XHJcbiAgICAgKi9cclxuICAgIGlzUGx1cmFsTWVzc2FnZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNQbHVyYWxNZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXMgaXQgYSBzZWxlY3QgbWVzc2FnZT9cclxuICAgICAqL1xyXG4gICAgaXNTZWxlY3RNZXNzYWdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5faXNQbHVyYWxNZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsIHRoZSBwYXJ0cyBvZiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEUuZy4gdGhlIElDVSBtZXNzYWdlIHt3b2x2ZXMsIHBsdXJhbCwgPTAge25vIHdvbHZlc30gPTEge29uZSB3b2xmfSA9MiB7dHdvIHdvbHZlc30gb3RoZXIge2Egd29sZiBwYWNrfX1cclxuICAgICAqIGhhcyA0IGNhdGVnb3J5IG9iamVjdHMgd2l0aCB0aGUgY2F0ZWdvcmllcyA9MCwgPTEsID0yLCBvdGhlci5cclxuICAgICAqL1xyXG4gICAgZ2V0Q2F0ZWdvcmllcygpOiBJSUNVTWVzc2FnZUNhdGVnb3J5W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYXRlZ29yaWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIG1lc3NhZ2UgYW5kIHJldHVybiBhIG5ldywgdHJhbnNsYXRlZCBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRpb24gdGhlIHRyYW5zbGF0aW9uIChoYXNobWFwIG9mIGNhdGVnb3JpZXMgYW5kIHRyYW5zbGF0aW9ucykuXHJcbiAgICAgKiBAcmV0dXJuIG5ldyBtZXNzYWdlIHdpdCB0cmFuc2xhdGVkIGNvbnRlbnQuXHJcbiAgICAgKiBAdGhyb3dzIGFuIGVycm9yIGlmIHRyYW5zbGF0aW9uIGRvZXMgbm90IG1hdGNoIHRoZSBtZXNzYWdlLlxyXG4gICAgICogVGhpcyBpcyB0aGUgY2FzZSwgaWYgdGhlcmUgYXJlIGNhdGVnb3JpZXMgbm90IGNvbnRhaW5lZCBpbiB0aGUgb3JpZ2luYWwgbWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgdHJhbnNsYXRlKHRyYW5zbGF0aW9uOiBJSUNVTWVzc2FnZVRyYW5zbGF0aW9uKTogSUlDVU1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgSUNVTWVzc2FnZSh0aGlzLl9wYXJzZXIsIHRoaXMuaXNQbHVyYWxNZXNzYWdlKCkpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRDYXRlZ29yaWVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHRoaXMuX2NhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZWRNZXNzYWdlOiBJTm9ybWFsaXplZE1lc3NhZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0aW9uRm9yQ2F0ZWdvcnk6IHN0cmluZ3xJSUNVTWVzc2FnZVRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb25bY2F0ZWdvcnkuZ2V0Q2F0ZWdvcnkoKV07XHJcbiAgICAgICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0cmFuc2xhdGlvbkZvckNhdGVnb3J5KSkge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlZE1lc3NhZ2UgPSBjYXRlZ29yeS5nZXRNZXNzYWdlTm9ybWFsaXplZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRyYW5zbGF0aW9uRm9yQ2F0ZWdvcnkpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkQ2F0ZWdvcmllcy5hZGQoY2F0ZWdvcnkuZ2V0Q2F0ZWdvcnkoKSk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkTWVzc2FnZSA9IHRoaXMuX3BhcnNlci5wYXJzZU5vcm1hbGl6ZWRTdHJpbmcoPHN0cmluZz4gdHJhbnNsYXRpb25Gb3JDYXRlZ29yeSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGVtYmVkZGVkIElDVSBNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVkTWVzc2FnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVzc2FnZS5hZGRDYXRlZ29yeShjYXRlZ29yeS5nZXRDYXRlZ29yeSgpLCB0cmFuc2xhdGVkTWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbmV3IGNhdGVnb3JpZXMsIHdoaWNoIGFyZSBub3QgcGFydCBvZiB0aGUgb3JpZ2luYWwgbWVzc2FnZVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRyYW5zbGF0aW9uKS5mb3JFYWNoKChjYXRlZ29yeU5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0cmFuc2xhdGVkQ2F0ZWdvcmllcy5oYXMoY2F0ZWdvcnlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RNZXNzYWdlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdhZGRpbmcgYSBuZXcgY2F0ZWdvcnkgbm90IGFsbG93ZWQgZm9yIHNlbGVjdCBtZXNzYWdlcyAoXCIlc1wiIGlzIG5vdCBwYXJ0IG9mIG1lc3NhZ2UpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlOYW1lKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tWYWxpZFBsdXJhbENhdGVnb3J5KGNhdGVnb3J5TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBlbWJlZGRlZCBJQ1UgTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVkTWVzc2FnZSA9IHRoaXMuX3BhcnNlci5wYXJzZU5vcm1hbGl6ZWRTdHJpbmcoPHN0cmluZz4gdHJhbnNsYXRpb25bY2F0ZWdvcnlOYW1lXSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRDYXRlZ29yeShjYXRlZ29yeU5hbWUsIHRyYW5zbGF0ZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2ssIHdldGhlciBjYXRlZ29yeSBpcyB2YWxpZCBwbHVyYWwgY2F0ZWdvcnkuXHJcbiAgICAgKiBBbGxvd2VkIGFyZSA9biwgJ3plcm8nLCAnb25lJywgJ3R3bycsICdmZXcnLCAnbWFueScgYW5kICdvdGhlcidcclxuICAgICAqIEBwYXJhbSBjYXRlZ29yeU5hbWUgY2F0ZWdvcnlcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IsIGlmIGl0IGlzIG5vdCBhIHZhbGlkIGNhdGVnb3J5IG5hbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja1ZhbGlkUGx1cmFsQ2F0ZWdvcnkoY2F0ZWdvcnlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBhbGxvd2VkS2V5d29yZHMgPSBbJ3plcm8nLCAnb25lJywgJ3R3bycsICdmZXcnLCAnbWFueScsICdvdGhlciddO1xyXG4gICAgICAgIGlmIChjYXRlZ29yeU5hbWUubWF0Y2goLz1cXGQrLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYWxsb3dlZEtleXdvcmRzLmZpbmQoKGtleSkgPT4ga2V5ID09PSBjYXRlZ29yeU5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnaW52YWxpZCBwbHVyYWwgY2F0ZWdvcnkgXCIlc1wiLCBhbGxvd2VkIGFyZSA9PG4+IGFuZCAlcycsIGNhdGVnb3J5TmFtZSwgYWxsb3dlZEtleXdvcmRzKSk7XHJcbiAgICB9XHJcbn1cclxuIl19