/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { format } from 'util';
import * as request from 'request';
import { Observable } from 'rxjs';
import { of, forkJoin, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Types form google translate api.
 * @record
 */
function GetSupportedLanguagesRequest() { }
if (false) {
    /** @type {?} */
    GetSupportedLanguagesRequest.prototype.target;
}
/**
 * @record
 */
function LanguagesResource() { }
if (false) {
    /** @type {?} */
    LanguagesResource.prototype.language;
    /** @type {?} */
    LanguagesResource.prototype.name;
}
/**
 * @record
 */
function LanguagesListResponse() { }
if (false) {
    /** @type {?} */
    LanguagesListResponse.prototype.languages;
}
/**
 * @record
 */
function TranslateTextRequest() { }
if (false) {
    /** @type {?} */
    TranslateTextRequest.prototype.q;
    /** @type {?} */
    TranslateTextRequest.prototype.target;
    /** @type {?} */
    TranslateTextRequest.prototype.source;
    /** @type {?|undefined} */
    TranslateTextRequest.prototype.format;
    /** @type {?|undefined} */
    TranslateTextRequest.prototype.model;
}
/**
 * @record
 */
function TranslationsResource() { }
if (false) {
    /** @type {?|undefined} */
    TranslationsResource.prototype.detectedSourceLanguage;
    /** @type {?|undefined} */
    TranslationsResource.prototype.model;
    /** @type {?} */
    TranslationsResource.prototype.translatedText;
}
/**
 * @record
 */
function TranslationsListResponse() { }
if (false) {
    /** @type {?} */
    TranslationsListResponse.prototype.translations;
}
/**
 * @record
 */
function InternalRequestResponse() { }
if (false) {
    /** @type {?} */
    InternalRequestResponse.prototype.response;
    /** @type {?} */
    InternalRequestResponse.prototype.body;
}
/** @type {?} */
const MAX_SEGMENTS = 128;
export class AutoTranslateService {
    /**
     * Strip region code and convert to lower
     * @param {?} lang lang
     * @return {?} lang without region code and in lower case.
     */
    static stripRegioncode(lang) {
        /** @type {?} */
        const langLower = lang.toLowerCase();
        for (let i = 0; i < langLower.length; i++) {
            /** @type {?} */
            const c = langLower.charAt(i);
            if (c < 'a' || c > 'z') {
                return langLower.substring(0, i);
            }
        }
        return langLower;
    }
    /**
     * @param {?} apiKey
     */
    constructor(apiKey) {
        this._request = request;
        this._apiKey = apiKey;
        this._rootUrl = 'https://translation.googleapis.com/';
    }
    /**
     * Change API key (just for tests).
     * @param {?} apikey apikey
     * @return {?}
     */
    setApiKey(apikey) {
        this._apiKey = apikey;
    }
    /**
     * Translate an array of messages at once.
     * @param {?} messages the messages to be translated
     * @param {?} from source language code
     * @param {?} to target language code
     * @return {?} Observable with translated messages or error
     */
    translateMultipleStrings(messages, from, to) {
        // empty array needs no translation and always works ... (#78)
        if (messages.length === 0) {
            return of([]);
        }
        if (!this._apiKey) {
            return throwError('cannot autotranslate: no api key');
        }
        if (!from || !to) {
            return throwError('cannot autotranslate: source and target language must be set');
        }
        from = AutoTranslateService.stripRegioncode(from);
        to = AutoTranslateService.stripRegioncode(to);
        /** @type {?} */
        const allRequests = this.splitMessagesToGoogleLimit(messages).map((/**
         * @param {?} partialMessages
         * @return {?}
         */
        (partialMessages) => {
            return this.limitedTranslateMultipleStrings(partialMessages, from, to);
        }));
        return forkJoin(allRequests).pipe(map((/**
         * @param {?} allTranslations
         * @return {?}
         */
        (allTranslations) => {
            /** @type {?} */
            let all = [];
            for (let i = 0; i < allTranslations.length; i++) {
                all = all.concat(allTranslations[i]);
            }
            return all;
        })));
    }
    /**
     * @private
     * @param {?} messages
     * @return {?}
     */
    splitMessagesToGoogleLimit(messages) {
        if (messages.length <= MAX_SEGMENTS) {
            return [messages];
        }
        /** @type {?} */
        const result = [];
        /** @type {?} */
        let currentPackage = [];
        /** @type {?} */
        let packageSize = 0;
        for (let i = 0; i < messages.length; i++) {
            currentPackage.push(messages[i]);
            packageSize++;
            if (packageSize >= MAX_SEGMENTS) {
                result.push(currentPackage);
                currentPackage = [];
                packageSize = 0;
            }
        }
        if (currentPackage.length > 0) {
            result.push(currentPackage);
        }
        return result;
    }
    /**
     * Return translation request, but messages must be limited to google limits.
     * Not more that 128 single messages.
     * @private
     * @param {?} messages messages
     * @param {?} from from
     * @param {?} to to
     * @return {?} the translated strings
     */
    limitedTranslateMultipleStrings(messages, from, to) {
        /** @type {?} */
        const realUrl = this._rootUrl + 'language/translate/v2' + '?key=' + this._apiKey;
        /** @type {?} */
        const translateRequest = {
            q: messages,
            target: to,
            source: from,
        };
        /** @type {?} */
        const options = {
            url: realUrl,
            body: translateRequest,
            json: true,
        };
        return this.post(realUrl, options).pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            const body = data.body;
            if (!body) {
                throw new Error('no result received');
            }
            if (body.error) {
                if (body.error.code === 400) {
                    if (body.error.message === 'Invalid Value') {
                        throw new Error(format('Translation from "%s" to "%s" not supported', from, to));
                    }
                    throw new Error(format('Invalid request: %s', body.error.message));
                }
                else {
                    throw new Error(format('Error %s: %s', body.error.code, body.error.message));
                }
            }
            /** @type {?} */
            const result = body.data;
            return result.translations.map((/**
             * @param {?} translation
             * @return {?}
             */
            (translation) => {
                return translation.translatedText;
            }));
        })));
    }
    /**
     * Function to do a POST HTTP request
     *
     * @param {?} uri uri
     * @param {?=} options options
     *
     * @return {?} response
     */
    post(uri, options) {
        return (/** @type {?} */ (this._call.apply(this, [].concat('post', (/** @type {?} */ (uri)), (/** @type {?} */ (Object.assign({}, options || {})))))));
    }
    /**
     * Function to do a HTTP request for given method
     *
     * @private
     * @param {?} method method
     * @param {?} uri uri
     * @param {?=} options options
     *
     * @return {?} response
     *
     */
    _call(method, uri, options) {
        return (/** @type {?} */ (Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            // build params array
            /** @type {?} */
            const params = [].concat((/** @type {?} */ (uri)), (/** @type {?} */ (Object.assign({}, options || {}))), (/**
             * @template RequestCallback
             * @param {?} error
             * @param {?} response
             * @param {?} body
             * @return {?}
             */
            (error, response, body) => {
                if (error) {
                    return observer.error(error);
                }
                observer.next((/** @type {?} */ (Object.assign({}, {
                    response: (/** @type {?} */ (response)),
                    body: (/** @type {?} */ (body))
                }))));
                observer.complete();
            }));
            // _call request method
            try {
                this._request[(/** @type {?} */ (method))].apply((/** @type {?} */ (this._request)), params);
            }
            catch (error) {
                observer.error(error);
            }
        }))));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AutoTranslateService.prototype._request;
    /** @type {?} */
    AutoTranslateService.prototype._rootUrl;
    /** @type {?} */
    AutoTranslateService.prototype._apiKey;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by10cmFuc2xhdGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsiYXV0b3RyYW5zbGF0ZS9hdXRvLXRyYW5zbGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFXbkMsMkNBRUM7OztJQURHLDhDQUFlOzs7OztBQUduQixnQ0FHQzs7O0lBRkcscUNBQWlCOztJQUNqQixpQ0FBYTs7Ozs7QUFHakIsb0NBRUM7OztJQURHLDBDQUErQjs7Ozs7QUFHbkMsbUNBTUM7OztJQUxHLGlDQUFZOztJQUNaLHNDQUFlOztJQUNmLHNDQUFlOztJQUNmLHNDQUFnQjs7SUFDaEIscUNBQWU7Ozs7O0FBR25CLG1DQUlDOzs7SUFIRyxzREFBZ0M7O0lBQ2hDLHFDQUFlOztJQUNmLDhDQUF1Qjs7Ozs7QUFHM0IsdUNBRUM7OztJQURHLGdEQUFxQzs7Ozs7QUFHekMsc0NBR0M7OztJQUZHLDJDQUFrQzs7SUFDbEMsdUNBQVU7OztNQUdSLFlBQVksR0FBRyxHQUFHO0FBRXhCLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQVd0QixNQUFNLENBQUMsZUFBZSxDQUFDLElBQVk7O2NBQ2hDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENB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LFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hDO2dCQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQTBCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO29CQUN0RCxRQUFRLEVBQUUsbUJBQTBCLFFBQVEsRUFBQTtvQkFDNUMsSUFBSSxFQUFFLG1CQUFNLElBQUksRUFBQTtpQkFDbkIsQ0FBQyxFQUFBLENBQUMsQ0FBQztnQkFDSixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxFQUFDO1lBRU4sdUJBQXVCO1lBQ3ZCLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBUyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FDaEMsbUJBRXlCLElBQUksQ0FBQyxRQUFRLEVBQUEsRUFDdEMsTUFBTSxDQUFDLENBQUM7YUFDZjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLEVBQUMsRUFBQSxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7SUF4TEcsd0NBQW1HOztJQUNuRyx3Q0FBaUI7O0lBQ2pCLHVDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtvZiwgZm9ya0pvaW4sIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMDMuMDcuMjAxNy5cclxuICogTG93IExldmVsIFNlcnZpY2UgdG8gY2FsbCBHb29nbGUgVHJhbnNsYXRlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBUeXBlcyBmb3JtIGdvb2dsZSB0cmFuc2xhdGUgYXBpLlxyXG4gKi9cclxuXHJcbmludGVyZmFjZSBHZXRTdXBwb3J0ZWRMYW5ndWFnZXNSZXF1ZXN0IHtcclxuICAgIHRhcmdldDogc3RyaW5nOyAvLyBUaGUgbGFuZ3VhZ2UgdG8gdXNlIHRvIHJldHVybiBsb2NhbGl6ZWQsIGh1bWFuIHJlYWRhYmxlIG5hbWVzIG9mIHN1cHBvcnRlZFxcbmxhbmd1YWdlcy5cclxufVxyXG5cclxuaW50ZXJmYWNlIExhbmd1YWdlc1Jlc291cmNlIHtcclxuICAgIGxhbmd1YWdlOiBzdHJpbmc7IC8vIGNvZGUgb2YgdGhlIGxhbmd1YWdlXHJcbiAgICBuYW1lOiBzdHJpbmc7IC8vIGh1bWFuIHJlYWRhYmxlIG5hbWUgKGluIHRhcmdldCBsYW5ndWFnZSlcclxufVxyXG5cclxuaW50ZXJmYWNlIExhbmd1YWdlc0xpc3RSZXNwb25zZSB7XHJcbiAgICBsYW5ndWFnZXM6IExhbmd1YWdlc1Jlc291cmNlW107XHJcbn1cclxuXHJcbmludGVyZmFjZSBUcmFuc2xhdGVUZXh0UmVxdWVzdCB7XHJcbiAgICBxOiBzdHJpbmdbXTsgIC8vIFRoZSBpbnB1dCB0ZXh0cyB0byB0cmFuc2xhdGVcclxuICAgIHRhcmdldDogc3RyaW5nOyAvLyBUaGUgbGFuZ3VhZ2UgdG8gdXNlIGZvciB0cmFuc2xhdGlvbiBvZiB0aGUgaW5wdXQgdGV4dFxyXG4gICAgc291cmNlOiBzdHJpbmc7IC8vIFRoZSBsYW5ndWFnZSBvZiB0aGUgc291cmNlIHRleHRcclxuICAgIGZvcm1hdD86IHN0cmluZzsgLy8gXCJodG1sXCIgKGRlZmF1bHQpIG9yIFwidGV4dFwiXHJcbiAgICBtb2RlbD86IHN0cmluZzsgLy8gc2VlIHB1YmxpYyBkb2N1bWVudGF0aW9uXHJcbn1cclxuXHJcbmludGVyZmFjZSBUcmFuc2xhdGlvbnNSZXNvdXJjZSB7XHJcbiAgICBkZXRlY3RlZFNvdXJjZUxhbmd1YWdlPzogc3RyaW5nO1xyXG4gICAgbW9kZWw/OiBzdHJpbmc7XHJcbiAgICB0cmFuc2xhdGVkVGV4dDogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgVHJhbnNsYXRpb25zTGlzdFJlc3BvbnNlIHtcclxuICAgIHRyYW5zbGF0aW9uczogVHJhbnNsYXRpb25zUmVzb3VyY2VbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIEludGVybmFsUmVxdWVzdFJlc3BvbnNlIHtcclxuICAgIHJlc3BvbnNlOiByZXF1ZXN0LlJlcXVlc3RSZXNwb25zZTtcclxuICAgIGJvZHk6IGFueTtcclxufVxyXG5cclxuY29uc3QgTUFYX1NFR01FTlRTID0gMTI4O1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1dG9UcmFuc2xhdGVTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9yZXF1ZXN0OiByZXF1ZXN0LlJlcXVlc3RBUEk8cmVxdWVzdC5SZXF1ZXN0LCByZXF1ZXN0LkNvcmVPcHRpb25zLCByZXF1ZXN0LlJlcXVpcmVkVXJpVXJsPjtcclxuICAgIF9yb290VXJsOiBzdHJpbmc7XHJcbiAgICBfYXBpS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHJpcCByZWdpb24gY29kZSBhbmQgY29udmVydCB0byBsb3dlclxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ1xyXG4gICAgICogQHJldHVybiBsYW5nIHdpdGhvdXQgcmVnaW9uIGNvZGUgYW5kIGluIGxvd2VyIGNhc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaXBSZWdpb25jb2RlKGxhbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbGFuZ0xvd2VyID0gbGFuZy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFuZ0xvd2VyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSBsYW5nTG93ZXIuY2hhckF0KGkpO1xyXG4gICAgICAgICAgICBpZiAoYyA8ICdhJyB8fCBjID4gJ3onKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ0xvd2VyLnN1YnN0cmluZygwLCBpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFuZ0xvd2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGFwaUtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XHJcbiAgICAgICAgdGhpcy5fYXBpS2V5ID0gYXBpS2V5O1xyXG4gICAgICAgIHRoaXMuX3Jvb3RVcmwgPSAnaHR0cHM6Ly90cmFuc2xhdGlvbi5nb29nbGVhcGlzLmNvbS8nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIEFQSSBrZXkgKGp1c3QgZm9yIHRlc3RzKS5cclxuICAgICAqIEBwYXJhbSBhcGlrZXkgYXBpa2V5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRBcGlLZXkoYXBpa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9hcGlLZXkgPSBhcGlrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2xhdGUgYW4gYXJyYXkgb2YgbWVzc2FnZXMgYXQgb25jZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlcyB0aGUgbWVzc2FnZXMgdG8gYmUgdHJhbnNsYXRlZFxyXG4gICAgICogQHBhcmFtIGZyb20gc291cmNlIGxhbmd1YWdlIGNvZGVcclxuICAgICAqIEBwYXJhbSB0byB0YXJnZXQgbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHJldHVybiBPYnNlcnZhYmxlIHdpdGggdHJhbnNsYXRlZCBtZXNzYWdlcyBvciBlcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHJhbnNsYXRlTXVsdGlwbGVTdHJpbmdzKG1lc3NhZ2VzOiBzdHJpbmdbXSwgZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIC8vIGVtcHR5IGFycmF5IG5lZWRzIG5vIHRyYW5zbGF0aW9uIGFuZCBhbHdheXMgd29ya3MgLi4uICgjNzgpXHJcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoW10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2FwaUtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcignY2Fubm90IGF1dG90cmFuc2xhdGU6IG5vIGFwaSBrZXknKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmcm9tIHx8ICF0bykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcignY2Fubm90IGF1dG90cmFuc2xhdGU6IHNvdXJjZSBhbmQgdGFyZ2V0IGxhbmd1YWdlIG11c3QgYmUgc2V0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZyb20gPSBBdXRvVHJhbnNsYXRlU2VydmljZS5zdHJpcFJlZ2lvbmNvZGUoZnJvbSk7XHJcbiAgICAgICAgdG8gPSBBdXRvVHJhbnNsYXRlU2VydmljZS5zdHJpcFJlZ2lvbmNvZGUodG8pO1xyXG4gICAgICAgIGNvbnN0IGFsbFJlcXVlc3RzOiBPYnNlcnZhYmxlPHN0cmluZ1tdPltdID0gdGhpcy5zcGxpdE1lc3NhZ2VzVG9Hb29nbGVMaW1pdChtZXNzYWdlcykubWFwKChwYXJ0aWFsTWVzc2FnZXM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbWl0ZWRUcmFuc2xhdGVNdWx0aXBsZVN0cmluZ3MocGFydGlhbE1lc3NhZ2VzLCBmcm9tLCB0byk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKGFsbFJlcXVlc3RzKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoKGFsbFRyYW5zbGF0aW9uczogc3RyaW5nW11bXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFsbCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxUcmFuc2xhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGwgPSBhbGwuY29uY2F0KGFsbFRyYW5zbGF0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNwbGl0TWVzc2FnZXNUb0dvb2dsZUxpbWl0KG1lc3NhZ2VzOiBzdHJpbmdbXSk6IHN0cmluZ1tdW10ge1xyXG4gICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPD0gTUFYX1NFR01FTlRTKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbbWVzc2FnZXNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgICAgICBsZXQgY3VycmVudFBhY2thZ2UgPSBbXTtcclxuICAgICAgICBsZXQgcGFja2FnZVNpemUgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzc2FnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3VycmVudFBhY2thZ2UucHVzaChtZXNzYWdlc1tpXSk7XHJcbiAgICAgICAgICAgIHBhY2thZ2VTaXplKys7XHJcbiAgICAgICAgICAgIGlmIChwYWNrYWdlU2l6ZSA+PSBNQVhfU0VHTUVOVFMpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGN1cnJlbnRQYWNrYWdlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQYWNrYWdlID0gW107XHJcbiAgICAgICAgICAgICAgICBwYWNrYWdlU2l6ZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYWNrYWdlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY3VycmVudFBhY2thZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRyYW5zbGF0aW9uIHJlcXVlc3QsIGJ1dCBtZXNzYWdlcyBtdXN0IGJlIGxpbWl0ZWQgdG8gZ29vZ2xlIGxpbWl0cy5cclxuICAgICAqIE5vdCBtb3JlIHRoYXQgMTI4IHNpbmdsZSBtZXNzYWdlcy5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlcyBtZXNzYWdlc1xyXG4gICAgICogQHBhcmFtIGZyb20gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvIHRvXHJcbiAgICAgKiBAcmV0dXJuIHRoZSB0cmFuc2xhdGVkIHN0cmluZ3NcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsaW1pdGVkVHJhbnNsYXRlTXVsdGlwbGVTdHJpbmdzKG1lc3NhZ2VzOiBzdHJpbmdbXSwgZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmdbXT4ge1xyXG4gICAgICAgIGNvbnN0IHJlYWxVcmwgPSB0aGlzLl9yb290VXJsICsgJ2xhbmd1YWdlL3RyYW5zbGF0ZS92MicgKyAnP2tleT0nICsgdGhpcy5fYXBpS2V5O1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZVJlcXVlc3Q6IFRyYW5zbGF0ZVRleHRSZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBxOiBtZXNzYWdlcyxcclxuICAgICAgICAgICAgdGFyZ2V0OiB0byxcclxuICAgICAgICAgICAgc291cmNlOiBmcm9tLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdXJsOiByZWFsVXJsLFxyXG4gICAgICAgICAgICBib2R5OiB0cmFuc2xhdGVSZXF1ZXN0LFxyXG4gICAgICAgICAgICBqc29uOiB0cnVlLFxyXG4vLyAgICAgICAgICAgIHByb3h5OiAnaHR0cDovLzEyNy4wLjAuMTo4ODg4JyBUbyBzZXQgYSBwcm94eSB1c2UgZW52IHZhciBIVFRQU19QUk9YWVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdChyZWFsVXJsLCBvcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICBtYXAoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYm9keTogYW55ID0gZGF0YS5ib2R5O1xyXG4gICAgICAgICAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gcmVzdWx0IHJlY2VpdmVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJvZHkuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2R5LmVycm9yLmNvZGUgPT09IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmVycm9yLm1lc3NhZ2UgPT09ICdJbnZhbGlkIFZhbHVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdUcmFuc2xhdGlvbiBmcm9tIFwiJXNcIiB0byBcIiVzXCIgbm90IHN1cHBvcnRlZCcsIGZyb20sIHRvKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ0ludmFsaWQgcmVxdWVzdDogJXMnLCBib2R5LmVycm9yLm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnRXJyb3IgJXM6ICVzJywgYm9keS5lcnJvci5jb2RlLCBib2R5LmVycm9yLm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBib2R5LmRhdGE7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudHJhbnNsYXRpb25zLm1hcCgodHJhbnNsYXRpb246IFRyYW5zbGF0aW9uc1Jlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRpb24udHJhbnNsYXRlZFRleHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZ1bmN0aW9uIHRvIGRvIGEgUE9TVCBIVFRQIHJlcXVlc3RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gdXJpIHVyaVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gcmVzcG9uc2VcclxuICAgICAqL1xyXG4gICAgcG9zdCh1cmk6IHN0cmluZywgb3B0aW9ucz86IHJlcXVlc3QuQ29yZU9wdGlvbnMpOiBPYnNlcnZhYmxlPEludGVybmFsUmVxdWVzdFJlc3BvbnNlPiB7XHJcbiAgICAgICAgcmV0dXJuIDxPYnNlcnZhYmxlPEludGVybmFsUmVxdWVzdFJlc3BvbnNlPj4gdGhpcy5fY2FsbC5hcHBseSh0aGlzLCBbXS5jb25jYXQoJ3Bvc3QnLCA8c3RyaW5nPiB1cmksXHJcbiAgICAgICAgICAgIDxyZXF1ZXN0LkNvcmVPcHRpb25zPiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gZG8gYSBIVFRQIHJlcXVlc3QgZm9yIGdpdmVuIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXRob2QgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gdXJpIHVyaVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9uc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gcmVzcG9uc2VcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NhbGwobWV0aG9kOiBzdHJpbmcsIHVyaTogc3RyaW5nLCBvcHRpb25zPzogcmVxdWVzdC5Db3JlT3B0aW9ucyk6IE9ic2VydmFibGU8SW50ZXJuYWxSZXF1ZXN0UmVzcG9uc2U+IHtcclxuICAgICAgICByZXR1cm4gPE9ic2VydmFibGU8SW50ZXJuYWxSZXF1ZXN0UmVzcG9uc2U+PiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gYnVpbGQgcGFyYW1zIGFycmF5XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdLmNvbmNhdCg8c3RyaW5nPiB1cmksIDxyZXF1ZXN0LkNvcmVPcHRpb25zPiBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9KSxcclxuICAgICAgICAgICAgICAgIDxSZXF1ZXN0Q2FsbGJhY2s+KGVycm9yOiBhbnksIHJlc3BvbnNlOiByZXF1ZXN0LlJlcXVlc3RSZXNwb25zZSwgYm9keTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYnNlcnZlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KDxJbnRlcm5hbFJlcXVlc3RSZXNwb25zZT4gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogPHJlcXVlc3QuUmVxdWVzdFJlc3BvbnNlPiByZXNwb25zZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogPGFueT4gYm9keVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBfY2FsbCByZXF1ZXN0IG1ldGhvZFxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVxdWVzdFs8c3RyaW5nPiBtZXRob2RdLmFwcGx5KFxyXG4gICAgICAgICAgICAgICAgICAgIDxyZXF1ZXN0LlJlcXVlc3RBUEk8cmVxdWVzdC5SZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuQ29yZU9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5SZXF1aXJlZFVyaVVybD4+IHRoaXMuX3JlcXVlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==