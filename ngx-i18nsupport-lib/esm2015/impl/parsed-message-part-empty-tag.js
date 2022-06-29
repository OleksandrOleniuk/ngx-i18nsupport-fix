/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ParsedMessagePart, ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by martin on 14.06.2017.
 * A message part consisting of an empty tag like <br/>.
 */
export class ParsedMessagePartEmptyTag extends ParsedMessagePart {
    /**
     * @param {?} tagname
     * @param {?} idcounter
     */
    constructor(tagname, idcounter) {
        super(ParsedMessagePartType.EMPTY_TAG);
        this._tagname = tagname;
        this._idcounter = idcounter;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    asDisplayString(format) {
        if (this._idcounter === 0) {
            return '<' + this._tagname + '>';
        }
        else {
            return '<' + this._tagname + ' id="' + this._idcounter.toString() + '">';
        }
    }
    /**
     * @return {?}
     */
    tagName() {
        return this._tagname;
    }
    /**
     * @return {?}
     */
    idCounter() {
        return this._idcounter;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartEmptyTag.prototype._tagname;
    /**
     * @type {?}
     * @private
     */
    ParsedMessagePartEmptyTag.prototype._idcounter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VkLW1lc3NhZ2UtcGFydC1lbXB0eS10YWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3BhcnNlZC1tZXNzYWdlLXBhcnQtZW1wdHktdGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFNL0UsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGlCQUFpQjs7Ozs7SUFLNUQsWUFBWSxPQUFlLEVBQUUsU0FBaUI7UUFDMUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBRU0sZUFBZSxDQUFDLE1BQWU7UUFDbEMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztTQUNwQzthQUFNO1lBQ0gsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDNUU7SUFDTCxDQUFDOzs7O0lBRU0sT0FBTztRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7O0lBRU0sU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0NBQ0o7Ozs7OztJQXhCRyw2Q0FBeUI7Ozs7O0lBQ3pCLCtDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDE0LjA2LjIwMTcuXHJcbiAqIEEgbWVzc2FnZSBwYXJ0IGNvbnNpc3Rpbmcgb2YgYW4gZW1wdHkgdGFnIGxpa2UgPGJyLz4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWcgZXh0ZW5kcyBQYXJzZWRNZXNzYWdlUGFydCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGFnbmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaWRjb3VudGVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFnbmFtZTogc3RyaW5nLCBpZGNvdW50ZXI6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTVBUWV9UQUcpO1xyXG4gICAgICAgIHRoaXMuX3RhZ25hbWUgPSB0YWduYW1lO1xyXG4gICAgICAgIHRoaXMuX2lkY291bnRlciA9IGlkY291bnRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXNEaXNwbGF5U3RyaW5nKGZvcm1hdD86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLl9pZGNvdW50ZXIgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuX3RhZ25hbWUgKyAnPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICc8JyArIHRoaXMuX3RhZ25hbWUgKyAnIGlkPVwiJyArIHRoaXMuX2lkY291bnRlci50b1N0cmluZygpICsgJ1wiPic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0YWdOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZ25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlkQ291bnRlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZGNvdW50ZXI7XHJcbiAgICB9XHJcbn1cclxuIl19