/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const LogLevel = {
    'ERROR': 0,
    'WARN': 1,
    'INFO': 2,
    'DEBUG': 3,
};
LogLevel[LogLevel['ERROR']] = 'ERROR';
LogLevel[LogLevel['WARN']] = 'WARN';
LogLevel[LogLevel['INFO']] = 'INFO';
LogLevel[LogLevel['DEBUG']] = 'DEBUG';
export class CommandOutput {
    /**
     * @param {?=} stdout
     */
    constructor(stdout) {
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
    setVerbose() {
        this._verbose = true;
    }
    /**
     * @return {?}
     */
    setQuiet() {
        this._quiet = true;
    }
    /**
     * Test, wether verbose is enabled.
     * @return {?} wether verbose is enabled.
     */
    verbose() {
        return this._verbose;
    }
    /**
     * Test, wether quiet is enabled.
     * @return {?} wether quiet is enabled.
     */
    quiet() {
        return this._quiet;
    }
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    error(msg, ...params) {
        this.log(LogLevel.ERROR, msg, params);
    }
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    warn(msg, ...params) {
        this.log(LogLevel.WARN, msg, params);
    }
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    info(msg, ...params) {
        this.log(LogLevel.INFO, msg, params);
    }
    /**
     * @param {?} msg
     * @param {...?} params
     * @return {?}
     */
    debug(msg, ...params) {
        this.log(LogLevel.DEBUG, msg, params);
    }
    /**
     * @private
     * @param {?} level
     * @param {?} msg
     * @param {?} params
     * @return {?}
     */
    log(level, msg, params) {
        if (!this.isOutputEnabled(level)) {
            return;
        }
        /** @type {?} */
        let coloredMessage;
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
        const outMsg = format(coloredMessage, ...params);
        this.outputStream.write(outMsg + '\n');
    }
    /**
     * @private
     * @param {?} level
     * @return {?}
     */
    isOutputEnabled(level) {
        /** @type {?} */
        let quietEnabled;
        /** @type {?} */
        let verboseEnabled;
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1vdXRwdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbImNvbW1vbi9jb21tYW5kLW91dHB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVdBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUxQixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7SUFHeEIsVUFBTztJQUNQLFNBQU07SUFDTixTQUFNO0lBQ04sVUFBTzs7a0JBSFAsT0FBTyxLQUFQLE9BQU87a0JBQ1AsTUFBTSxLQUFOLE1BQU07a0JBQ04sTUFBTSxLQUFOLE1BQU07a0JBQ04sT0FBTyxLQUFQLE9BQU87QUFHWCxNQUFNLE9BQU8sYUFBYTs7OztJQWN0QixZQUFZLE1BQXVCO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7U0FDOUI7YUFBTTtZQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN0QztJQUNMLENBQUM7Ozs7SUFFTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7OztJQUVNLFFBQVE7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDOzs7OztJQU1NLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFNTSxLQUFLO1FBQ1IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVNLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFhO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7O0lBRU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQWE7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFFTSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBYTtRQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUVNLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFhO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7SUFFTyxHQUFHLENBQUMsS0FBZSxFQUFFLEdBQUcsRUFBRSxNQUFhO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLE9BQU87U0FDVjs7WUFDRyxjQUFjO1FBQ2xCLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxRQUFRLENBQUMsS0FBSztnQkFDZixjQUFjLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQyxJQUFJO2dCQUNkLGNBQWMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWO2dCQUNJLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtTQUNiOztjQUNLLE1BQU0sR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsS0FBZTs7WUFDL0IsWUFBWTs7WUFBRSxjQUF1QjtRQUN6QyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM5QixZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDMUI7YUFBTTtZQUNILFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2xDO1FBQ0QsUUFBUSxLQUFLLEVBQUU7WUFDWCxLQUFLLFFBQVEsQ0FBQyxLQUFLO2dCQUNmLE9BQU8sSUFBSSxDQUFDLENBQUksdUJBQXVCO1lBQzNDLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0IsS0FBSyxRQUFRLENBQUMsSUFBSTtnQkFDZCxPQUFPLENBQUMsY0FBYyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDN0MsS0FBSyxRQUFRLENBQUMsS0FBSztnQkFDZixPQUFPLGNBQWMsQ0FBQztZQUMxQjtnQkFDSSxPQUFPLElBQUksQ0FBQztTQUNuQjtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBckdHLGlDQUF5Qjs7Ozs7SUFLekIsK0JBQXVCOzs7OztJQUV2QixxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMTcuMDIuMjAxNy5cclxuICogVmVyeSBzaW1wbGUgY2xhc3MgdG8gY29udHJvbCB0aGUgb3V0cHV0IG9mIGEgY29tbWFuZC5cclxuICogT3V0cHV0IGNhbiBiZSBlcnJvcnMsIHdhcm5pbmdzLCBpbmZvcyBhbmQgZGVidWctT3V0cHV0cy5cclxuICogVGhlIG91dHB1dCBjYW4gYmUgY29udHJvbGxlZCB2aWEgMiBmbGFncywgcXVpZXQgYW5kIHZlcmJvc2UuXHJcbiAqIElmIHF1aXQgaXMgZW5hYmxlZCBvbmx5IGVycm9yIG1lc3NhZ2VzIGFyZSBzaG93bi5cclxuICogSWYgdmVyYm9zZSBpcyBlbmFibGVkLCBldmVyeXRoaW5nIGlzIHNob3duLlxyXG4gKiBJZiBib3RoIGFyZSBub3QgZW5hYmxlZCAodGhlIGRlZmF1bHQpIGVycm9ycywgd2FybmluZ3MgYW5kIGluZm9zIGFyZSBzaG93bi5cclxuICogSWYgbm90IGFyZSBlbmFibGVkIChzdHJhbmdlKSwgd2UgYXNzdW1lZCB0aGUgZGVmYXVsdC5cclxuICovXHJcblxyXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnO1xyXG5pbXBvcnQgV3JpdGFibGVTdHJlYW0gPSBOb2RlSlMuV3JpdGFibGVTdHJlYW07XHJcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuXHJcbmVudW0gTG9nTGV2ZWwge1xyXG4gICAgJ0VSUk9SJyxcclxuICAgICdXQVJOJyxcclxuICAgICdJTkZPJyxcclxuICAgICdERUJVRydcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRPdXRwdXQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmVyYm9zZSBlbmFibGVzIG91dHB1dCBvZiBldmVyeXRoaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3ZlcmJvc2U6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBxdWlldCBkaXNhYmxlcyBvdXRwdXQgb2YgZXZlcnl0aGluZyBidXQgZXJyb3JzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3F1aWV0OiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgb3V0cHV0U3RyZWFtOiBXcml0YWJsZVN0cmVhbTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzdGRvdXQ/OiBXcml0YWJsZVN0cmVhbSkge1xyXG4gICAgICAgIHRoaXMuX3F1aWV0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fdmVyYm9zZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChzdGRvdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRwdXRTdHJlYW0gPSBzdGRvdXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vdXRwdXRTdHJlYW0gPSBwcm9jZXNzLnN0ZG91dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFZlcmJvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5fdmVyYm9zZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFF1aWV0KCkge1xyXG4gICAgICAgIHRoaXMuX3F1aWV0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciB2ZXJib3NlIGlzIGVuYWJsZWQuXHJcbiAgICAgKiBAcmV0dXJuIHdldGhlciB2ZXJib3NlIGlzIGVuYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2ZXJib3NlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJib3NlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHF1aWV0IGlzIGVuYWJsZWQuXHJcbiAgICAgKiBAcmV0dXJuIHdldGhlciBxdWlldCBpcyBlbmFibGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcXVpZXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1aWV0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcihtc2csIC4uLnBhcmFtczogYW55W10pIHtcclxuICAgICAgICB0aGlzLmxvZyhMb2dMZXZlbC5FUlJPUiwgbXNnLCBwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3YXJuKG1zZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMubG9nKExvZ0xldmVsLldBUk4sIG1zZywgcGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5mbyhtc2csIC4uLnBhcmFtczogYW55W10pIHtcclxuICAgICAgICB0aGlzLmxvZyhMb2dMZXZlbC5JTkZPLCBtc2csIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlYnVnKG1zZywgLi4ucGFyYW1zOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMubG9nKExvZ0xldmVsLkRFQlVHLCBtc2csIHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2cobGV2ZWw6IExvZ0xldmVsLCBtc2csIHBhcmFtczogYW55W10pIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPdXRwdXRFbmFibGVkKGxldmVsKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2xvcmVkTWVzc2FnZTtcclxuICAgICAgICBzd2l0Y2ggKGxldmVsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuRVJST1I6XHJcbiAgICAgICAgICAgICAgICBjb2xvcmVkTWVzc2FnZSA9IGNoYWxrLnJlZCgnRVJST1I6ICcgKyBtc2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTG9nTGV2ZWwuV0FSTjpcclxuICAgICAgICAgICAgICAgIGNvbG9yZWRNZXNzYWdlID0gY2hhbGsubWFnZW50YSgnV0FSTklORzogJyArIG1zZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbG9yZWRNZXNzYWdlID0gY2hhbGsuZ3JheSgnKiAnICsgbXNnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvdXRNc2cgPSBmb3JtYXQoY29sb3JlZE1lc3NhZ2UsIC4uLnBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5vdXRwdXRTdHJlYW0ud3JpdGUob3V0TXNnICsgJ1xcbicpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNPdXRwdXRFbmFibGVkKGxldmVsOiBMb2dMZXZlbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBxdWlldEVuYWJsZWQsIHZlcmJvc2VFbmFibGVkOiBib29sZWFuO1xyXG4gICAgICAgIGlmICh0aGlzLl9xdWlldCAmJiB0aGlzLl92ZXJib3NlKSB7XHJcbiAgICAgICAgICAgIHF1aWV0RW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2ZXJib3NlRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHF1aWV0RW5hYmxlZCA9IHRoaXMuX3F1aWV0O1xyXG4gICAgICAgICAgICB2ZXJib3NlRW5hYmxlZCA9IHRoaXMuX3ZlcmJvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAobGV2ZWwpIHtcclxuICAgICAgICAgICAgY2FzZSBMb2dMZXZlbC5FUlJPUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAvLyBhbHdheXMgb3V0cHV0IGVycm9yc1xyXG4gICAgICAgICAgICBjYXNlIExvZ0xldmVsLldBUk46XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCFxdWlldEVuYWJsZWQpO1xyXG4gICAgICAgICAgICBjYXNlIExvZ0xldmVsLklORk86XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHZlcmJvc2VFbmFibGVkICYmICFxdWlldEVuYWJsZWQpO1xyXG4gICAgICAgICAgICBjYXNlIExvZ0xldmVsLkRFQlVHOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZlcmJvc2VFbmFibGVkO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==