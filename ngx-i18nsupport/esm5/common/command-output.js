/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Created by martin on 17.02.2017.
 * Very simple class to control the output of a command.
 * Output can be errors, warnings, infos and debug-Outputs.
 * The output can be controlled via 2 flags, quiet and verbose.
 * If quit is enabled only error messages are shown.
 * If verbose is enabled, everything is shown.
 * If both are not enabled (the default) errors, warnings and infos are shown.
 * If not are enabled (strange), we assumed the default.
 */
import chalk from 'chalk';
import { format } from 'util';
/** @enum {number} */
var LogLevel = {
    'ERROR': 0,
    'WARN': 1,
    'INFO': 2,
    'DEBUG': 3,
};
LogLevel[LogLevel['ERROR']] = 'ERROR';
LogLevel[LogLevel['WARN']] = 'WARN';
LogLevel[LogLevel['INFO']] = 'INFO';
LogLevel[LogLevel['DEBUG']] = 'DEBUG';
var CommandOutput = /** @class */ (function () {
    function CommandOutput(stdout) {
        this._quiet = false;
        this._verbose = false;
        if (stdout) {
            this.outputStream = stdout;
        }
        else {
            this.outputStream = process.stdout;
        }
    }
    /**
     * @return {?}
     */
    CommandOutput.prototype.setVerbose = /**
     * @return {?}
     */
    function () {
        this._verbose = true;
    };
    /**
     * @return {?}
     */
    CommandOutput.prototype.setQuiet = /**
     * @return {?}
     */
    function () {
        this._quiet = true;
    };
    /**
     * Test, wether verbose is enabled.
     * @return wether verbose is enabled.
     */
    /**
     * Test, wether verbose is enabled.
     * @return {?} wether verbose is enabled.
     */
    CommandOutput.prototype.verbose = /**
     * Test, wether verbose is enabled.
     * @return {?} wether verbose is enabled.
     */
    function () {
        return this._verbose;
    };
    /**
     * Test, wether quiet is enabled.
     * @return wether quiet is enabled.
     */
    /**
     * Test, wether quiet is enabled.
     * @return {?} wether quiet is enabled.
     */
    CommandOutput.prototype.quiet = /**
     * Test, wether quiet is enabled.
     * @return {?} wether quiet is enabled.
     */
    function () {
        return this._quiet;
    };
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    CommandOutput.prototype.error = /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    function (msg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(LogLevel.ERROR, msg, params);
    };
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    CommandOutput.prototype.warn = /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    function (msg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(LogLevel.WARN, msg, params);
    };
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    CommandOutput.prototype.info = /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    function (msg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(LogLevel.INFO, msg, params);
    };
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    CommandOutput.prototype.debug = /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    function (msg) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.log(LogLevel.DEBUG, msg, params);
    };
    /**
     * @private
     * @param {?} level
     * @param {?} msg
     * @param {?} params
     * @return {?}
     */
    CommandOutput.prototype.log = /**
     * @private
     * @param {?} level
     * @param {?} msg
     * @param {?} params
     * @return {?}
     */
    function (level, msg, params) {
        if (!this.isOutputEnabled(level)) {
            return;
        }
        /** @type {?} */
        var coloredMessage;
        switch (level) {
            case LogLevel.ERROR:
                coloredMessage = chalk.red('ERROR: ' + msg);
                break;
            case LogLevel.WARN:
                coloredMessage = chalk.magenta('WARNING: ' + msg);
                break;
            default:
                coloredMessage = chalk.gray('* ' + msg);
                break;
        }
        /** @type {?} */
        var outMsg = format.apply(void 0, tslib_1.__spread([coloredMessage], params));
        this.outputStream.write(outMsg + '\n');
    };
    /**
     * @private
     * @param {?} level
     * @return {?}
     */
    CommandOutput.prototype.isOutputEnabled = /**
     * @private
     * @param {?} level
     * @return {?}
     */
    function (level) {
        /** @type {?} */
        var quietEnabled;
        /** @type {?} */
        var verboseEnabled;
        if (this._quiet && this._verbose) {
            quietEnabled = false;
            verboseEnabled = false;
        }
        else {
            quietEnabled = this._quiet;
            verboseEnabled = this._verbose;
        }
        switch (level) {
            case LogLevel.ERROR:
                return true; // always output errors
            case LogLevel.WARN:
                return (!quietEnabled);
            case LogLevel.INFO:
                return (verboseEnabled && !quietEnabled);
            case LogLevel.DEBUG:
                return verboseEnabled;
            default:
                return true;
        }
    };
    return CommandOutput;
}());
export { CommandOutput };
if (false) {
    /**
     * verbose enables output of everything.
     * @type {?}
     */
    CommandOutput.prototype._verbose;
    /**
     * quiet disables output of everything but errors.
     * @type {?}
     */
    CommandOutput.prototype._quiet;
    /**
     * @type {?}
     * @private
     */
    CommandOutput.prototype.outputStream;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1vdXRwdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbImNvbW1vbi9jb21tYW5kLW91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7O0lBR3hCLFVBQU87SUFDUCxTQUFNO0lBQ04sU0FBTTtJQUNOLFVBQU87O2tCQUhQLE9BQU8sS0FBUCxPQUFPO2tCQUNQLE1BQU0sS0FBTixNQUFNO2tCQUNOLE1BQU0sS0FBTixNQUFNO2tCQUNOLE9BQU8sS0FBUCxPQUFPO0FBR1g7SUFjSSx1QkFBWSxNQUF1QjtRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1NBQzlCO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7O0lBRU0sa0NBQVU7OztJQUFqQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFTSxnQ0FBUTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNJLCtCQUFPOzs7O0lBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSSw2QkFBSzs7OztJQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVNLDZCQUFLOzs7OztJ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QUNMLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUExR0QsSUEwR0M7Ozs7Ozs7SUFyR0csaUNBQXlCOzs7OztJQUt6QiwrQkFBdUI7Ozs7O0lBRXZCLHFDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAxNy4wMi4yMDE3LlxyXG4gKiBWZXJ5IHNpbXBsZSBjbGFzcyB0byBjb250cm9sIHRoZSBvdXRwdXQgb2YgYSBjb21tYW5kLlxyXG4gKiBPdXRwdXQgY2FuIGJlIGVycm9ycywgd2FybmluZ3MsIGluZm9zIGFuZCBkZWJ1Zy1PdXRwdXRzLlxyXG4gKiBUaGUgb3V0cHV0IGNhbiBiZSBjb250cm9sbGVkIHZpYSAyIGZsYWdzLCBxdWlldCBhbmQgdmVyYm9zZS5cclxuICogSWYgcXVpdCBpcyBlbmFibGVkIG9ubHkgZXJyb3IgbWVzc2FnZXMgYXJlIHNob3duLlxyXG4gKiBJZiB2ZXJib3NlIGlzIGVuYWJsZWQsIGV2ZXJ5dGhpbmcgaXMgc2hvd24uXHJcbiAqIElmIGJvdGggYXJlIG5vdCBlbmFibGVkICh0aGUgZGVmYXVsdCkgZXJyb3JzLCB3YXJuaW5ncyBhbmQgaW5mb3MgYXJlIHNob3duLlxyXG4gKiBJZiBub3QgYXJlIGVuYWJsZWQgKHN0cmFuZ2UpLCB3ZSBhc3N1bWVkIHRoZSBkZWZhdWx0LlxyXG4gKi9cclxuXHJcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XHJcbmltcG9ydCBXcml0YWJsZVN0cmVhbSA9IE5vZGVKUy5Xcml0YWJsZVN0cmVhbTtcclxuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ3V0aWwnO1xyXG5cclxuZW51bSBMb2dMZXZlbCB7XHJcbiAgICAnRVJST1InLFxyXG4gICAgJ1dBUk4nLFxyXG4gICAgJ0lORk8nLFxyXG4gICAgJ0RFQlVHJ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbWFuZE91dHB1dCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2ZXJib3NlIGVuYWJsZXMgb3V0cHV0IG9mIGV2ZXJ5dGhpbmcuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfdmVyYm9zZTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHF1aWV0IGRpc2FibGVzIG91dHB1dCBvZiBldmVyeXRoaW5nIGJ1dCBlcnJvcnMuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBfcXVpZXQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBvdXRwdXRTdHJlYW06IFdyaXRhYmxlU3RyZWFtO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0ZG91dD86IFdyaXRhYmxlU3RyZWFtKSB7XHJcbiAgICAgICAgdGhpcy5fcXVpZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl92ZXJib3NlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHN0ZG91dCkge1xyXG4gICAgICAgICAgICB0aGlzLm91dHB1dFN0cmVhbSA9IHN0ZG91dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm91dHB1dFN0cmVhbSA9IHByb2Nlc3Muc3Rkb3V0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VmVyYm9zZSgpIHtcclxuICAgICAgICB0aGlzLl92ZXJib3NlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UXVpZXQoKSB7XHJcbiAgICAgICAgdGhpcy5fcXVpZXQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHZlcmJvc2UgaXMgZW5hYmxlZC5cclxuICAgICAqIEByZXR1cm4gd2V0aGVyIHZlcmJvc2UgaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHZlcmJvc2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcmJvc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgcXVpZXQgaXMgZW5hYmxlZC5cclxuICAgICAqIEByZXR1cm4gd2V0aGVyIHF1aWV0IGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBxdWlldCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcXVpZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVycm9yKG1zZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMubG9nKExvZ0xldmVsLkVSUk9SLCBtc2csIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdhcm4obXNnLCAuLi5wYXJhbXM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5sb2coTG9nTGV2ZWwuV0FSTiwgbXNnLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbmZvKG1zZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMubG9nKExvZ0xldmVsLklORk8sIG1zZywgcGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVidWcobXNnLCAuLi5wYXJhbXM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5sb2coTG9nTGV2ZWwuREVCVUcsIG1zZywgcGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvZyhsZXZlbDogTG9nTGV2ZWwsIG1zZywgcGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc091dHB1dEVuYWJsZWQobGV2ZWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbG9yZWRNZXNzYWdlO1xyXG4gICAgICAgIHN3aXRjaCAobGV2ZWwpIHtcclxuICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5FUlJPUjpcclxuICAgICAgICAgICAgICAgIGNvbG9yZWRNZXNzYWdlID0gY2hhbGsucmVkKCdFUlJPUjogJyArIG1zZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5XQVJOOlxyXG4gICAgICAgICAgICAgICAgY29sb3JlZE1lc3NhZ2UgPSBjaGFsay5tYWdlbnRhKCdXQVJOSU5HOiAnICsgbXNnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29sb3JlZE1lc3NhZ2UgPSBjaGFsay5ncmF5KCcqICcgKyBtc2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG91dE1zZyA9IGZvcm1hdChjb2xvcmVkTWVzc2FnZSwgLi4ucGFyYW1zKTtcclxuICAgICAgICB0aGlzLm91dHB1dFN0cmVhbS53cml0ZShvdXRNc2cgKyAnXFxuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc091dHB1dEVuYWJsZWQobGV2ZWw6IExvZ0xldmVsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHF1aWV0RW5hYmxlZCwgdmVyYm9zZUVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgaWYgKHRoaXMuX3F1aWV0ICYmIHRoaXMuX3ZlcmJvc2UpIHtcclxuICAgICAgICAgICAgcXVpZXRFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHZlcmJvc2VFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVpZXRFbmFibGVkID0gdGhpcy5fcXVpZXQ7XHJcbiAgICAgICAgICAgIHZlcmJvc2VFbmFibGVkID0gdGhpcy5fdmVyYm9zZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChsZXZlbCkge1xyXG4gICAgICAgICAgICBjYXNlIExvZ0xldmVsLkVSUk9SOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAgIC8vIGFsd2F5cyBvdXRwdXQgZXJyb3JzXHJcbiAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuV0FSTjpcclxuICAgICAgICAgICAgICAgIHJldHVybiAoIXF1aWV0RW5hYmxlZCk7XHJcbiAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuSU5GTzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAodmVyYm9zZUVuYWJsZWQgJiYgIXF1aWV0RW5hYmxlZCk7XHJcbiAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuREVCVUc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmVyYm9zZUVuYWJsZWQ7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19