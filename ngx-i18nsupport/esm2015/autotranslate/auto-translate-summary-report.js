/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { format } from 'util';
/**
 * A report about a run of Google Translate over all untranslated unit.
 * * Created by martin on 29.06.2017.
 */
export class AutoTranslateSummaryReport {
    /**
     * @param {?} from
     * @param {?} to
     */
    constructor(from, to) {
        this._from = from;
        this._to = to;
        this._total = 0;
        this._ignored = 0;
        this._success = 0;
        this._failed = 0;
    }
    /**
     * Set error if total call failed (e.g. "invalid api key" or "no connection" ...)
     * @param {?} error error
     * @param {?} total total
     * @return {?}
     */
    setError(error, total) {
        this._error = error;
        this._total = total;
        this._failed = total;
    }
    /**
     * @return {?}
     */
    error() {
        return this._error;
    }
    /**
     * @param {?} ignored
     * @return {?}
     */
    setIgnored(ignored) {
        this._total += ignored;
        this._ignored = ignored;
    }
    /**
     * Add a single result to the summary.
     * @param {?} tu tu
     * @param {?} result result
     * @return {?}
     */
    addSingleResult(tu, result) {
        this._total++;
        if (result.success()) {
            this._success++;
        }
        else {
            this._failed++;
        }
    }
    /**
     * Merge another summary into this one.
     * @param {?} anotherSummary anotherSummary
     * @return {?}
     */
    merge(anotherSummary) {
        if (!this._error) {
            this._error = anotherSummary._error;
        }
        this._total += anotherSummary.total();
        this._ignored += anotherSummary.ignored();
        this._success += anotherSummary.success();
        this._failed += anotherSummary.failed();
    }
    /**
     * @return {?}
     */
    total() {
        return this._total;
    }
    /**
     * @return {?}
     */
    ignored() {
        return this._ignored;
    }
    /**
     * @return {?}
     */
    success() {
        return this._success;
    }
    /**
     * @return {?}
     */
    failed() {
        return this._failed;
    }
    /**
     * Human readable version of report
     * @return {?}
     */
    content() {
        /** @type {?} */
        let result;
        if (this._error) {
            result = format('Auto translation from "%s" to "%s" failed: "%s", failed units: %s', this._from, this._to, this._error, this._failed);
        }
        else {
            result = format('Auto translation from "%s" to "%s", total auto translated units: %s, ignored: %s, succesful: %s, failed: %s', this._from, this._to, this._total, this._ignored, this._success, this._failed);
        }
        return result;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._error;
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._from;
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._to;
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._total;
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._ignored;
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._success;
    /**
     * @type {?}
     * @private
     */
    AutoTranslateSummaryReport.prototype._failed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by10cmFuc2xhdGUtc3VtbWFyeS1yZXBvcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbImF1dG90cmFuc2xhdGUvYXV0by10cmFuc2xhdGUtc3VtbWFyeS1yZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7Ozs7O0FBUTVCLE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBVXJDLFlBQVksSUFBWSxFQUFFLEVBQVU7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDOzs7Ozs7O0lBT00sUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFhO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFTSxLQUFLO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRU0sVUFBVSxDQUFDLE9BQWU7UUFDL0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQzs7Ozs7OztJQU9NLGVBQWUsQ0FBQyxFQUFjLEVBQUUsTUFBMkI7UUFDaEUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2QsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7SUFDSCxDQUFDOzs7Ozs7SUFNTSxLQUFLLENBQUMsY0FBMEM7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7OztJQUVNLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7OztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFLTSxPQUFPOztZQUNSLE1BQU07UUFDVixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLEdBQUcsTUFBTSxDQUFDLG1FQUFtRSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2STthQUFNO1lBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyw2R0FBNkcsRUFDekgsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjs7Ozs7O0lBOUZDLDRDQUF1Qjs7Ozs7SUFDdkIsMkNBQXNCOzs7OztJQUN0Qix5Q0FBb0I7Ozs7O0lBQ3BCLDRDQUF1Qjs7Ozs7SUFDdkIsOENBQXlCOzs7OztJQUN6Qiw4Q0FBeUI7Ozs7O0lBQ3pCLDZDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXV0b1RyYW5zbGF0ZVJlc3VsdH0gZnJvbSAnLi9hdXRvLXRyYW5zbGF0ZS1yZXN1bHQnO1xyXG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7SVRyYW5zVW5pdH0gZnJvbSAnQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliJztcclxuXHJcbi8qKlxyXG4gKiBBIHJlcG9ydCBhYm91dCBhIHJ1biBvZiBHb29nbGUgVHJhbnNsYXRlIG92ZXIgYWxsIHVudHJhbnNsYXRlZCB1bml0LlxyXG4gKiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDI5LjA2LjIwMTcuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0IHtcclxuXHJcbiAgcHJpdmF0ZSBfZXJyb3I6IHN0cmluZztcclxuICBwcml2YXRlIF9mcm9tOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfdG86IHN0cmluZztcclxuICBwcml2YXRlIF90b3RhbDogbnVtYmVyO1xyXG4gIHByaXZhdGUgX2lnbm9yZWQ6IG51bWJlcjtcclxuICBwcml2YXRlIF9zdWNjZXNzOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfZmFpbGVkOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZyb206IHN0cmluZywgdG86IHN0cmluZykge1xyXG4gICAgdGhpcy5fZnJvbSA9IGZyb207XHJcbiAgICB0aGlzLl90byA9IHRvO1xyXG4gICAgdGhpcy5fdG90YWwgPSAwO1xyXG4gICAgdGhpcy5faWdub3JlZCA9IDA7XHJcbiAgICB0aGlzLl9zdWNjZXNzID0gMDtcclxuICAgIHRoaXMuX2ZhaWxlZCA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgZXJyb3IgaWYgdG90YWwgY2FsbCBmYWlsZWQgKGUuZy4gXCJpbnZhbGlkIGFwaSBrZXlcIiBvciBcIm5vIGNvbm5lY3Rpb25cIiAuLi4pXHJcbiAgICogQHBhcmFtIGVycm9yIGVycm9yXHJcbiAgICogQHBhcmFtIHRvdGFsIHRvdGFsXHJcbiAgICovXHJcbiAgcHVibGljIHNldEVycm9yKGVycm9yOiBzdHJpbmcsIHRvdGFsOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2Vycm9yID0gZXJyb3I7XHJcbiAgICB0aGlzLl90b3RhbCA9IHRvdGFsO1xyXG4gICAgdGhpcy5fZmFpbGVkID0gdG90YWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZXJyb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9lcnJvcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRJZ25vcmVkKGlnbm9yZWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5fdG90YWwgKz0gaWdub3JlZDtcclxuICAgIHRoaXMuX2lnbm9yZWQgPSBpZ25vcmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGEgc2luZ2xlIHJlc3VsdCB0byB0aGUgc3VtbWFyeS5cclxuICAgKiBAcGFyYW0gdHUgdHVcclxuICAgKiBAcGFyYW0gcmVzdWx0IHJlc3VsdFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhZGRTaW5nbGVSZXN1bHQodHU6IElUcmFuc1VuaXQsIHJlc3VsdDogQXV0b1RyYW5zbGF0ZVJlc3VsdCkge1xyXG4gICAgdGhpcy5fdG90YWwrKztcclxuICAgIGlmIChyZXN1bHQuc3VjY2VzcygpKSB7XHJcbiAgICAgIHRoaXMuX3N1Y2Nlc3MrKztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2ZhaWxlZCsrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWVyZ2UgYW5vdGhlciBzdW1tYXJ5IGludG8gdGhpcyBvbmUuXHJcbiAgICogQHBhcmFtIGFub3RoZXJTdW1tYXJ5IGFub3RoZXJTdW1tYXJ5XHJcbiAgICovXHJcbiAgcHVibGljIG1lcmdlKGFub3RoZXJTdW1tYXJ5OiBBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydCkge1xyXG4gICAgaWYgKCF0aGlzLl9lcnJvcikge1xyXG4gICAgICB0aGlzLl9lcnJvciA9IGFub3RoZXJTdW1tYXJ5Ll9lcnJvcjtcclxuICAgIH1cclxuICAgIHRoaXMuX3RvdGFsICs9IGFub3RoZXJTdW1tYXJ5LnRvdGFsKCk7XHJcbiAgICB0aGlzLl9pZ25vcmVkICs9IGFub3RoZXJTdW1tYXJ5Lmlnbm9yZWQoKTtcclxuICAgIHRoaXMuX3N1Y2Nlc3MgKz0gYW5vdGhlclN1bW1hcnkuc3VjY2VzcygpO1xyXG4gICAgdGhpcy5fZmFpbGVkICs9IGFub3RoZXJTdW1tYXJ5LmZhaWxlZCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvdGFsKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG90YWw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaWdub3JlZCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lnbm9yZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3VjY2VzcygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N1Y2Nlc3M7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmFpbGVkKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmFpbGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSHVtYW4gcmVhZGFibGUgdmVyc2lvbiBvZiByZXBvcnRcclxuICAgKi9cclxuICBwdWJsaWMgY29udGVudCgpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJlc3VsdDtcclxuICAgIGlmICh0aGlzLl9lcnJvcikge1xyXG4gICAgICByZXN1bHQgPSBmb3JtYXQoJ0F1dG8gdHJhbnNsYXRpb24gZnJvbSBcIiVzXCIgdG8gXCIlc1wiIGZhaWxlZDogXCIlc1wiLCBmYWlsZWQgdW5pdHM6ICVzJywgdGhpcy5fZnJvbSwgdGhpcy5fdG8sIHRoaXMuX2Vycm9yLCB0aGlzLl9mYWlsZWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gZm9ybWF0KCdBdXRvIHRyYW5zbGF0aW9uIGZyb20gXCIlc1wiIHRvIFwiJXNcIiwgdG90YWwgYXV0byB0cmFuc2xhdGVkIHVuaXRzOiAlcywgaWdub3JlZDogJXMsIHN1Y2Nlc2Z1bDogJXMsIGZhaWxlZDogJXMnLFxyXG4gICAgICAgICAgdGhpcy5fZnJvbSwgdGhpcy5fdG8sIHRoaXMuX3RvdGFsLCB0aGlzLl9pZ25vcmVkLCB0aGlzLl9zdWNjZXNzLCB0aGlzLl9mYWlsZWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIl19