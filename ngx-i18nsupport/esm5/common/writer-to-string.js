/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Writable } from 'stream';
import { isString } from './util';
/**
 * Created by martin on 20.02.2017.
 * A helper class for testing.
 * Can be used as a WritableStream and writes everything (synchronously) into a string,
 * that can easily be read by the tests.
 */
var /**
 * Created by martin on 20.02.2017.
 * A helper class for testing.
 * Can be used as a WritableStream and writes everything (synchronously) into a string,
 * that can easily be read by the tests.
 */
WriterToString = /** @class */ (function (_super) {
    tslib_1.__extends(WriterToString, _super);
    function WriterToString() {
        var _this = _super.call(this) || this;
        _this.resultString = '';
        return _this;
    }
    /**
     * @param {?} chunk
     * @param {?} encoding
     * @param {?} callback
     * @return {?}
     */
    WriterToString.prototype._write = /**
     * @param {?} chunk
     * @param {?} encoding
     * @param {?} callback
     * @return {?}
     */
    function (chunk, encoding, callback) {
        /** @type {?} */
        var chunkString;
        if (isString(chunk)) {
            chunkString = chunk;
        }
        else if (chunk instanceof Buffer) {
            chunkString = chunk.toString();
        }
        else {
            chunkString = Buffer.alloc(chunk).toString(encoding);
        }
        this.resultString = this.resultString + chunkString;
        callback();
    };
    /**
     * Returns a string of everything, that was written to the stream so far.
     * @return written data
     */
    /**
     * Returns a string of everything, that was written to the stream so far.
     * @return {?} written data
     */
    WriterToString.prototype.writtenData = /**
     * Returns a string of everything, that was written to the stream so far.
     * @return {?} written data
     */
    function () {
        return this.resultString;
    };
    return WriterToString;
}(Writable));
/**
 * Created by martin on 20.02.2017.
 * A helper class for testing.
 * Can be used as a WritableStream and writes everything (synchronously) into a string,
 * that can easily be read by the tests.
 */
export { WriterToString };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WriterToString.prototype.resultString;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVyLXRvLXN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsiY29tbW9uL3dyaXRlci10by1zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7Ozs7QUFRaEM7Ozs7Ozs7SUFBb0MsMENBQVE7SUFJeEM7UUFBQSxZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQzs7SUFDM0IsQ0FBQzs7Ozs7OztJQUVNLCtCQUFNOzs7Ozs7SUFBYixVQUFjLEtBQVUsRUFBRSxRQUFnQixFQUFFLFFBQWtCOztZQUN0RCxXQUFXO1FBQ2YsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN2QjthQUFNLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtZQUNoQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2xDO2FBQU07WUFDSCxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ3BELFFBQVEsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSSxvQ0FBVzs7OztJQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDLEFBN0JELENBQW9DLFFBQVEsR0E2QjNDOzs7Ozs7Ozs7Ozs7O0lBM0JHLHNDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7V3JpdGFibGV9IGZyb20gJ3N0cmVhbSc7XHJcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJy4vdXRpbCc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAyMC4wMi4yMDE3LlxyXG4gKiBBIGhlbHBlciBjbGFzcyBmb3IgdGVzdGluZy5cclxuICogQ2FuIGJlIHVzZWQgYXMgYSBXcml0YWJsZVN0cmVhbSBhbmQgd3JpdGVzIGV2ZXJ5dGhpbmcgKHN5bmNocm9ub3VzbHkpIGludG8gYSBzdHJpbmcsXHJcbiAqIHRoYXQgY2FuIGVhc2lseSBiZSByZWFkIGJ5IHRoZSB0ZXN0cy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgV3JpdGVyVG9TdHJpbmcgZXh0ZW5kcyBXcml0YWJsZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZXN1bHRTdHJpbmc6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0U3RyaW5nID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF93cml0ZShjaHVuazogYW55LCBlbmNvZGluZzogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2h1bmtTdHJpbmc7XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGNodW5rKSkge1xyXG4gICAgICAgICAgICBjaHVua1N0cmluZyA9IGNodW5rO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2h1bmsgaW5zdGFuY2VvZiBCdWZmZXIpIHtcclxuICAgICAgICAgICAgY2h1bmtTdHJpbmcgPSBjaHVuay50b1N0cmluZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNodW5rU3RyaW5nID0gQnVmZmVyLmFsbG9jKGNodW5rKS50b1N0cmluZyhlbmNvZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0U3RyaW5nID0gdGhpcy5yZXN1bHRTdHJpbmcgKyBjaHVua1N0cmluZztcclxuICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBvZiBldmVyeXRoaW5nLCB0aGF0IHdhcyB3cml0dGVuIHRvIHRoZSBzdHJlYW0gc28gZmFyLlxyXG4gICAgICogQHJldHVybiB3cml0dGVuIGRhdGFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdyaXR0ZW5EYXRhKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0U3RyaW5nO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==