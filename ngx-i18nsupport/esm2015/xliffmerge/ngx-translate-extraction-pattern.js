/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Helper class to parse ngx translate extraction pattern
 * and to decide wether a given message matches the pattern.
 */
export class NgxTranslateExtractionPattern {
    /**
     * Construct the pattern from given description string
     * @throws an error, if there is a syntax error
     * @param {?} extractionPatternString extractionPatternString
     */
    constructor(extractionPatternString) {
        this.extractionPatternString = extractionPatternString;
        /** @type {?} */
        const parts = extractionPatternString.split('|');
        this._matchExplicitId = false;
        this._descriptionPatterns = [];
        for (let i = 0; i < parts.length; i++) {
            /** @type {?} */
            const part = parts[i];
            if (part === '@@') {
                if (this._matchExplicitId) {
                    throw new Error('extraction pattern must not contain @@ twice');
                }
                this._matchExplicitId = true;
            }
            else {
                /** @type {?} */
                const errorString = this.checkValidDescriptionPattern(part);
                if (errorString) {
                    throw new Error(errorString);
                }
                this._descriptionPatterns.push(part);
            }
        }
    }
    /**
     * Check, wether an explicitly set id matches the pattern.
     * @param {?} id id
     * @return {?} wether an explicitly set id matches the pattern.
     */
    isExplicitIdMatched(id) {
        return id && this._matchExplicitId;
    }
    /**
     * Check, wether a given description matches the pattern.
     * @param {?} description description
     * @return {?} wether a given description matches the pattern.
     */
    isDescriptionMatched(description) {
        return this._descriptionPatterns.indexOf(description) >= 0;
    }
    /**
     * @private
     * @param {?} descriptionPattern
     * @return {?}
     */
    checkValidDescriptionPattern(descriptionPattern) {
        if (!descriptionPattern) {
            return 'empty value not allowed';
        }
        if (/^[a-zA-Z_][a-zA-Z_-]*$/.test(descriptionPattern)) {
            return null; // it is ok
        }
        else {
            return 'description pattern must be an identifier containing only letters, digits, _ or -';
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxTranslateExtractionPattern.prototype._matchExplicitId;
    /**
     * @type {?}
     * @private
     */
    NgxTranslateExtractionPattern.prototype._descriptionPatterns;
    /**
     * @type {?}
     * @private
     */
    NgxTranslateExtractionPattern.prototype.extractionPatternString;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRyYW5zbGF0ZS1leHRyYWN0aW9uLXBhdHRlcm4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbInhsaWZmbWVyZ2Uvbmd4LXRyYW5zbGF0ZS1leHRyYWN0aW9uLXBhdHRlcm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQSxNQUFNLE9BQU8sNkJBQTZCOzs7Ozs7SUFVdEMsWUFBb0IsdUJBQStCO1FBQS9CLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBUTs7Y0FDekMsS0FBSyxHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDN0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7aUJBQ25FO2dCQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7YUFDaEM7aUJBQU07O3NCQUNHLFdBQVcsR0FBRyxJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDO2dCQUMzRCxJQUFJLFdBQVcsRUFBRTtvQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFPTSxtQkFBbUIsQ0FBQyxFQUFVO1FBQ2pDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFPTSxvQkFBb0IsQ0FBQyxXQUFtQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQUVPLDRCQUE0QixDQUFDLGtCQUEwQjtRQUMzRCxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDckIsT0FBTyx5QkFBeUIsQ0FBQztTQUNwQztRQUNELElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDbkQsT0FBTyxJQUFJLENBQUMsQ0FBQyxXQUFXO1NBQzNCO2FBQU07WUFDSCxPQUFPLG1GQUFtRixDQUFDO1NBQzlGO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7SUF6REcseURBQWtDOzs7OztJQUNsQyw2REFBdUM7Ozs7O0lBTzNCLGdFQUF1QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgdG8gcGFyc2Ugbmd4IHRyYW5zbGF0ZSBleHRyYWN0aW9uIHBhdHRlcm5cclxuICogYW5kIHRvIGRlY2lkZSB3ZXRoZXIgYSBnaXZlbiBtZXNzYWdlIG1hdGNoZXMgdGhlIHBhdHRlcm4uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4ge1xyXG5cclxuICAgIHByaXZhdGUgX21hdGNoRXhwbGljaXRJZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uUGF0dGVybnM6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0IHRoZSBwYXR0ZXJuIGZyb20gZ2l2ZW4gZGVzY3JpcHRpb24gc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gZXh0cmFjdGlvblBhdHRlcm5TdHJpbmcgZXh0cmFjdGlvblBhdHRlcm5TdHJpbmdcclxuICAgICAqIEB0aHJvd3MgYW4gZXJyb3IsIGlmIHRoZXJlIGlzIGEgc3ludGF4IGVycm9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0cmFjdGlvblBhdHRlcm5TdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gZXh0cmFjdGlvblBhdHRlcm5TdHJpbmcuc3BsaXQoJ3wnKTtcclxuICAgICAgICB0aGlzLl9tYXRjaEV4cGxpY2l0SWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9kZXNjcmlwdGlvblBhdHRlcm5zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgIGlmIChwYXJ0ID09PSAnQEAnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWF0Y2hFeHBsaWNpdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHRyYWN0aW9uIHBhdHRlcm4gbXVzdCBub3QgY29udGFpbiBAQCB0d2ljZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0Y2hFeHBsaWNpdElkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yU3RyaW5nID0gdGhpcy5jaGVja1ZhbGlkRGVzY3JpcHRpb25QYXR0ZXJuKHBhcnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yU3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Rlc2NyaXB0aW9uUGF0dGVybnMucHVzaChwYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrLCB3ZXRoZXIgYW4gZXhwbGljaXRseSBzZXQgaWQgbWF0Y2hlcyB0aGUgcGF0dGVybi5cclxuICAgICAqIEBwYXJhbSBpZCBpZFxyXG4gICAgICogQHJldHVybiB3ZXRoZXIgYW4gZXhwbGljaXRseSBzZXQgaWQgbWF0Y2hlcyB0aGUgcGF0dGVybi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRXhwbGljaXRJZE1hdGNoZWQoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpZCAmJiB0aGlzLl9tYXRjaEV4cGxpY2l0SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjaywgd2V0aGVyIGEgZ2l2ZW4gZGVzY3JpcHRpb24gbWF0Y2hlcyB0aGUgcGF0dGVybi5cclxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvbiBkZXNjcmlwdGlvblxyXG4gICAgICogQHJldHVybiB3ZXRoZXIgYSBnaXZlbiBkZXNjcmlwdGlvbiBtYXRjaGVzIHRoZSBwYXR0ZXJuLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNEZXNjcmlwdGlvbk1hdGNoZWQoZGVzY3JpcHRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvblBhdHRlcm5zLmluZGV4T2YoZGVzY3JpcHRpb24pID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1ZhbGlkRGVzY3JpcHRpb25QYXR0ZXJuKGRlc2NyaXB0aW9uUGF0dGVybjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWRlc2NyaXB0aW9uUGF0dGVybikge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2VtcHR5IHZhbHVlIG5vdCBhbGxvd2VkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKC9eW2EtekEtWl9dW2EtekEtWl8tXSokLy50ZXN0KGRlc2NyaXB0aW9uUGF0dGVybikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7IC8vIGl0IGlzIG9rXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdkZXNjcmlwdGlvbiBwYXR0ZXJuIG11c3QgYmUgYW4gaWRlbnRpZmllciBjb250YWluaW5nIG9ubHkgbGV0dGVycywgZGlnaXRzLCBfIG9yIC0nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=