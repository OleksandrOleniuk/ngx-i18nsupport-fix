/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Writable } from 'stream';
import { isString } from './util';
/**
 * Created by martin on 20.02.2017.
 * A helper class for testing.
 * Can be used as a WritableStream and writes everything (synchronously) into a string,
 * that can easily be read by the tests.
 */
export class WriterToString extends Writable {
    constructor() {
        super();
        this.resultString = '';
    }
    /**
     * @param {?} chunk
     * @param {?} encoding
     * @param {?} callback
     * @return {?}
     */
    _write(chunk, encoding, callback) {
        /** @type {?} */
        let chunkString;
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
    }
    /**
     * Returns a string of everything, that was written to the stream so far.
     * @return {?} written data
     */
    writtenData() {
        return this.resultString;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    WriterToString.prototype.resultString;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVyLXRvLXN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsiY29tbW9uL3dyaXRlci10by1zdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7OztBQVFoQyxNQUFNLE9BQU8sY0FBZSxTQUFRLFFBQVE7SUFJeEM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFFTSxNQUFNLENBQUMsS0FBVSxFQUFFLFFBQWdCLEVBQUUsUUFBa0I7O1lBQ3RELFdBQVc7UUFDZixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1lBQ2hDLFdBQVcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEM7YUFBTTtZQUNILFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDcEQsUUFBUSxFQUFFLENBQUM7SUFDZixDQUFDOzs7OztJQU1NLFdBQVc7UUFDZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztDQUNKOzs7Ozs7SUEzQkcsc0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtXcml0YWJsZX0gZnJvbSAnc3RyZWFtJztcclxuaW1wb3J0IHtpc1N0cmluZ30gZnJvbSAnLi91dGlsJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDIwLjAyLjIwMTcuXHJcbiAqIEEgaGVscGVyIGNsYXNzIGZvciB0ZXN0aW5nLlxyXG4gKiBDYW4gYmUgdXNlZCBhcyBhIFdyaXRhYmxlU3RyZWFtIGFuZCB3cml0ZXMgZXZlcnl0aGluZyAoc3luY2hyb25vdXNseSkgaW50byBhIHN0cmluZyxcclxuICogdGhhdCBjYW4gZWFzaWx5IGJlIHJlYWQgYnkgdGhlIHRlc3RzLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBXcml0ZXJUb1N0cmluZyBleHRlbmRzIFdyaXRhYmxlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlc3VsdFN0cmluZzogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRTdHJpbmcgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX3dyaXRlKGNodW5rOiBhbnksIGVuY29kaW5nOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBjaHVua1N0cmluZztcclxuICAgICAgICBpZiAoaXNTdHJpbmcoY2h1bmspKSB7XHJcbiAgICAgICAgICAgIGNodW5rU3RyaW5nID0gY2h1bms7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaHVuayBpbnN0YW5jZW9mIEJ1ZmZlcikge1xyXG4gICAgICAgICAgICBjaHVua1N0cmluZyA9IGNodW5rLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2h1bmtTdHJpbmcgPSBCdWZmZXIuYWxsb2MoY2h1bmspLnRvU3RyaW5nKGVuY29kaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXN1bHRTdHJpbmcgPSB0aGlzLnJlc3VsdFN0cmluZyArIGNodW5rU3RyaW5nO1xyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgc3RyaW5nIG9mIGV2ZXJ5dGhpbmcsIHRoYXQgd2FzIHdyaXR0ZW4gdG8gdGhlIHN0cmVhbSBzbyBmYXIuXHJcbiAgICAgKiBAcmV0dXJuIHdyaXR0ZW4gZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd3JpdHRlbkRhdGEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRTdHJpbmc7XHJcbiAgICB9XHJcbn1cclxuIl19