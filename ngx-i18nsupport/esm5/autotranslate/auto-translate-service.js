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
var MAX_SEGMENTS = 128;
var AutoTranslateService = /** @class */ (function () {
    function AutoTranslateService(apiKey) {
        this._request = request;
        this._apiKey = apiKey;
        this._rootUrl = 'https://translation.googleapis.com/';
    }
    /**
     * Strip region code and convert to lower
     * @param lang lang
     * @return lang without region code and in lower case.
     */
    /**
     * Strip region code and convert to lower
     * @param {?} lang lang
     * @return {?} lang without region code and in lower case.
     */
    AutoTranslateService.stripRegioncode = /**
     * Strip region code and convert to lower
     * @param {?} lang lang
     * @return {?} lang without region code and in lower case.
     */
    function (lang) {
        /** @type {?} */
        var langLower = lang.toLowerCase();
        for (var i = 0; i < langLower.length; i++) {
            /** @type {?} */
            var c = langLower.charAt(i);
            if (c < 'a' || c > 'z') {
                return langLower.substring(0, i);
            }
        }
        return langLower;
    };
    /**
     * Change API key (just for tests).
     * @param apikey apikey
     */
    /**
     * Change API key (just for tests).
     * @param {?} apikey apikey
     * @return {?}
     */
    AutoTranslateService.prototype.setApiKey = /**
     * Change API key (just for tests).
     * @param {?} apikey apikey
     * @return {?}
     */
    function (apikey) {
        this._apiKey = apikey;
    };
    /**
     * Translate an array of messages at once.
     * @param messages the messages to be translated
     * @param from source language code
     * @param to target language code
     * @return Observable with translated messages or error
     */
    /**
     * Translate an array of messages at once.
     * @param {?} messages the messages to be translated
     * @param {?} from source language code
     * @param {?} to target language code
     * @return {?} Observable with translated messages or error
     */
    AutoTranslateService.prototype.translateMultipleStrings = /**
     * Translate an array of messages at once.
     * @param {?} messages the messages to be translated
     * @param {?} from source language code
     * @param {?} to target language code
     * @return {?} Observable with translated messages or error
     */
    function (messages, from, to) {
        var _this = this;
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
        var allRequests = this.splitMessagesToGoogleLimit(messages).map((/**
         * @param {?} partialMessages
         * @return {?}
         */
        function (partialMessages) {
            return _this.limitedTranslateMultipleStrings(partialMessages, from, to);
        }));
        return forkJoin(allRequests).pipe(map((/**
         * @param {?} allTranslations
         * @return {?}
         */
        function (allTranslations) {
            /** @type {?} */
            var all = [];
            for (var i = 0; i < allTranslations.length; i++) {
                all = all.concat(allTranslations[i]);
            }
            return all;
        })));
    };
    /**
     * @private
     * @param {?} messages
     * @return {?}
     */
    AutoTranslateService.prototype.splitMessagesToGoogleLimit = /**
     * @private
     * @param {?} messages
     * @return {?}
     */
    function (messages) {
        if (messages.length <= MAX_SEGMENTS) {
            return [messages];
        }
        /** @type {?} */
        var result = [];
        /** @type {?} */
        var currentPackage = [];
        /** @type {?} */
        var packageSize = 0;
        for (var i = 0; i < messages.length; i++) {
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
    };
    /**
     * Return translation request, but messages must be limited to google limits.
     * Not more that 128 single messages.
     * @param messages messages
     * @param from from
     * @param to to
     * @return the translated strings
     */
    /**
     * Return translation request, but messages must be limited to google limits.
     * Not more that 128 single messages.
     * @private
     * @param {?} messages messages
     * @param {?} from from
     * @param {?} to to
     * @return {?} the translated strings
     */
    AutoTranslateService.prototype.limitedTranslateMultipleStrings = /**
     * Return translation request, but messages must be limited to google limits.
     * Not more that 128 single messages.
     * @private
     * @param {?} messages messages
     * @param {?} from from
     * @param {?} to to
     * @return {?} the translated strings
     */
    function (messages, from, to) {
        /** @type {?} */
        var realUrl = this._rootUrl + 'language/translate/v2' + '?key=' + this._apiKey;
        /** @type {?} */
        var translateRequest = {
            q: messages,
            target: to,
            source: from,
        };
        /** @type {?} */
        var options = {
            url: realUrl,
            body: translateRequest,
            json: true,
        };
        return this.post(realUrl, options).pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var body = data.body;
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
            var result = body.data;
            return result.translations.map((/**
             * @param {?} translation
             * @return {?}
             */
            function (translation) {
                return translation.translatedText;
            }));
        })));
    };
    /**
     * Function to do a POST HTTP request
     *
     * @param uri uri
     * @param options options
     *
     * @return response
     */
    /**
     * Function to do a POST HTTP request
     *
     * @param {?} uri uri
     * @param {?=} options options
     *
     * @return {?} response
     */
    AutoTranslateService.prototype.post = /**
     * Function to do a POST HTTP request
     *
     * @param {?} uri uri
     * @param {?=} options options
     *
     * @return {?} response
     */
    function (uri, options) {
        return (/** @type {?} */ (this._call.apply(this, [].concat('post', (/** @type {?} */ (uri)), (/** @type {?} */ (Object.assign({}, options || {})))))));
    };
    /**
     * Function to do a HTTP request for given method
     *
     * @param method method
     * @param uri uri
     * @param options options
     *
     * @return response
     *
     */
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
    AutoTranslateService.prototype._call = /**
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
    function (method, uri, options) {
        var _this = this;
        return (/** @type {?} */ (Observable.create((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            // build params array
            /** @type {?} */
            var params = [].concat((/** @type {?} */ (uri)), (/** @type {?} */ (Object.assign({}, options || {}))), (/**
             * @template RequestCallback
             * @param {?} error
             * @param {?} response
             * @param {?} body
             * @return {?}
             */
            function (error, response, body) {
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
                _this._request[(/** @type {?} */ (method))].apply((/** @type {?} */ (_this._request)), params);
            }
            catch (error) {
                observer.error(error);
            }
        }))));
    };
    return AutoTranslateService;
}());
export { AutoTranslateService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by10cmFuc2xhdGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsiYXV0b3RyYW5zbGF0ZS9hdXRvLXRyYW5zbGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFXbkMsMkNBRUM7OztJQURHLDhDQUFlOzs7OztBQUduQixnQ0FHQzs7O0lBRkcscUNBQWlCOztJQUNqQixpQ0FBYTs7Ozs7QUFHakIsb0NBRUM7OztJQURHLDBDQUErQjs7Ozs7QUFHbkMsbUNBTUM7OztJQUxHLGlDQUFZOztJQUNaLHNDQUFlOztJQUNmLHNDQUFlOztJQUNmLHNDQUFnQjs7SUFDaEIscUNBQWU7Ozs7O0FBR25CLG1DQUlDOzs7SUFIRyxzREFBZ0M7O0lBQ2hDLHFDQUFlOztJQUNmLDhDQUF1Qjs7Ozs7QUFHM0IsdUNBRUM7OztJQURHLGdEQUFxQzs7Ozs7QUFHekMsc0NBR0M7OztJQUZHLDJDQUFrQzs7SUFDbEMsdUNBQVU7OztJQUdSLFlBQVksR0FBRyxHQUFHO0FBRXhCO0lBc0JJLDhCQUFZLE1BQWM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxxQ0FBcUMsQ0FBQztJQUMxRCxDQUFDO0lBcEJEOzs7O09BSUc7Ozs7OztJQUNXLG9DQUFlOzs7OztJQUE3QixVQUE4QixJQUFZOztZQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ2pDLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDcEIsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUNKO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQVFEOzs7T0FHRzs7Ozs7O0lBQ0ksd0NBQVM7Ozs7O0lBQWhCLFVBQWlCLE1BQWM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7SUFDSSx1REFBd0I7Ozs7Ozs7SUFBL0IsVUFBZ0MsUUFBa0IsRUFBRSxJQUFZLEVBQUUsRUFBVTtRQUE1RSxpQkF3QkM7UUF2QkcsOERBQThEO1FBQzlELElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU8sVUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDekQ7UUFDRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUMsOERBQThELENBQUMsQ0FBQztTQUNyRjtRQUNELElBQUksR0FBRyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsRUFBRSxHQUFHLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFDeEMsV0FBVyxHQUEyQixJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsZUFBeUI7WUFDaEgsT0FBTyxLQUFJLENBQUMsK0JBQStCLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDLEVBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQzdCLEdBQUc7Ozs7UUFBQyxVQUFDLGVBQTJCOztnQkFDeEIsR0FBRyxHQUFHLEVBQUU7WUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQzs7Ozs7O0lBRU8seURBQTBCOzs7OztJQUFsQyxVQUFtQyxRQUFrQjtRQUNqRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksWUFBWSxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQjs7WUFDSyxNQUFNLEdBQUcsRUFBRTs7WUFDYixjQUFjLEdBQUcsRUFBRTs7WUFDbkIsV0FBVyxHQUFHLENBQUM7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxXQUFXLEVBQUUsQ0FBQztZQUNkLElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTtnQkFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUIsY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUNuQjtTQUNKO1FBQ0QsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7SUFDSyw4REFBK0I7Ozs7Ozs7OztJQUF2QyxVQUF3QyxRQUFrQixFQUFFLElBQVksRUFBRSxFQUFVOztZQUMxRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyx1QkFBdUIsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87O1lBQzFFLGdCQUFnQixHQUF5QjtZQUMzQyxDQUFDLEVBQUUsUUFBUTtZQUNYLE1BQU0sRUFBRSxFQUFFO1lBQ1YsTUFBTSxFQUFFLElBQUk7U0FDZjs7WUFDSyxPQUFPLEdBQUc7WUFDWixHQUFHLEVBQUUsT0FBTztZQUNaLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsSUFBSSxFQUFFLElBQUk7U0FFYjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNuQyxHQUFHOzs7O1FBQUMsVUFBQyxJQUFJOztnQkFDSCxJQUFJLEdBQVEsSUFBSSxDQUFDLElBQUk7WUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDekM7WUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1osSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7b0JBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssZUFBZSxFQUFFO3dCQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyw2Q0FBNkMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDcEY7b0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUN0RTtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjthQUNKOztnQkFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUk7WUFDeEIsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLFdBQWlDO2dCQUM3RCxPQUFPLFdBQVcsQ0FBQyxjQUFjLENBQUM7WUFDdEMsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7OztJQUNILG1DQUFJOzs7Ozs7OztJQUFKLFVBQUssR0FBVyxFQUFFLE9BQTZCO1FBQzNDLE9BQU8sbUJBQXNDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxtQkFBUyxHQUFHLEVBQUEsRUFDOUYsbUJBQXNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBQSxDQUFDLENBQUMsRUFBQSxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7Ozs7Ozs7Ozs7OztJQUNLLG9DQUFLOzs7Ozs7Ozs7OztJQUFiLFVBQWMsTUFBYyxFQUFFLEdBQVcsRUFBRSxPQUE2QjtRQUF4RSxpQkEyQkM7UUExQkcsT0FBTyxtQkFBc0MsVUFBVSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLFFBQVE7OztnQkFFOUQsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUJBQVMsR0FBRyxFQUFBLEVBQUUsbUJBQXNCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBQTs7Ozs7OztZQUN6RixVQUFrQixLQUFVLEVBQUUsUUFBaUMsRUFBRSxJQUFTO2dCQUN0RSxJQUFJLEtBQUssRUFBRTtvQkFDUCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hDO2dCQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQTBCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO29CQUN0RCxRQUFRLEVBQUUsbUJBQTBCLFFBQVEsRUFBQTtvQkFDNUMsSUFBSSxFQUFFLG1CQUFNLElBQUksRUFBQTtpQkFDbkIsQ0FBQyxFQUFBLENBQUMsQ0FBQztnQkFDSixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxFQUFDO1lBRU4sdUJBQXVCO1lBQ3ZCLElBQUk7Z0JBQ0EsS0FBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBUyxNQUFNLEVBQUEsQ0FBQyxDQUFDLEtBQUssQ0FDaEMsbUJBRXlCLEtBQUksQ0FBQyxRQUFRLEVBQUEsRUFDdEMsTUFBTSxDQUFDLENBQUM7YUFDZjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDLEVBQUMsRUFBQSxDQUFDO0lBQ1AsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FBQyxBQTFMRCxJQTBMQzs7Ozs7OztJQXhMRyx3Q0FBbUc7O0lBQ25HLHdDQUFpQjs7SUFDakIsdUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtmb3JtYXR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge29mLCBmb3JrSm9pbiwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAwMy4wNy4yMDE3LlxyXG4gKiBMb3cgTGV2ZWwgU2VydmljZSB0byBjYWxsIEdvb2dsZSBUcmFuc2xhdGUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFR5cGVzIGZvcm0gZ29vZ2xlIHRyYW5zbGF0ZSBhcGkuXHJcbiAqL1xyXG5cclxuaW50ZXJmYWNlIEdldFN1cHBvcnRlZExhbmd1YWdlc1JlcXVlc3Qge1xyXG4gICAgdGFyZ2V0OiBzdHJpbmc7IC8vIFRoZSBsYW5ndWFnZSB0byB1c2UgdG8gcmV0dXJuIGxvY2FsaXplZCwgaHVtYW4gcmVhZGFibGUgbmFtZXMgb2Ygc3VwcG9ydGVkXFxubGFuZ3VhZ2VzLlxyXG59XHJcblxyXG5pbnRlcmZhY2UgTGFuZ3VhZ2VzUmVzb3VyY2Uge1xyXG4gICAgbGFuZ3VhZ2U6IHN0cmluZzsgLy8gY29kZSBvZiB0aGUgbGFuZ3VhZ2VcclxuICAgIG5hbWU6IHN0cmluZzsgLy8gaHVtYW4gcmVhZGFibGUgbmFtZSAoaW4gdGFyZ2V0IGxhbmd1YWdlKVxyXG59XHJcblxyXG5pbnRlcmZhY2UgTGFuZ3VhZ2VzTGlzdFJlc3BvbnNlIHtcclxuICAgIGxhbmd1YWdlczogTGFuZ3VhZ2VzUmVzb3VyY2VbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFRyYW5zbGF0ZVRleHRSZXF1ZXN0IHtcclxuICAgIHE6IHN0cmluZ1tdOyAgLy8gVGhlIGlucHV0IHRleHRzIHRvIHRyYW5zbGF0ZVxyXG4gICAgdGFyZ2V0OiBzdHJpbmc7IC8vIFRoZSBsYW5ndWFnZSB0byB1c2UgZm9yIHRyYW5zbGF0aW9uIG9mIHRoZSBpbnB1dCB0ZXh0XHJcbiAgICBzb3VyY2U6IHN0cmluZzsgLy8gVGhlIGxhbmd1YWdlIG9mIHRoZSBzb3VyY2UgdGV4dFxyXG4gICAgZm9ybWF0Pzogc3RyaW5nOyAvLyBcImh0bWxcIiAoZGVmYXVsdCkgb3IgXCJ0ZXh0XCJcclxuICAgIG1vZGVsPzogc3RyaW5nOyAvLyBzZWUgcHVibGljIGRvY3VtZW50YXRpb25cclxufVxyXG5cclxuaW50ZXJmYWNlIFRyYW5zbGF0aW9uc1Jlc291cmNlIHtcclxuICAgIGRldGVjdGVkU291cmNlTGFuZ3VhZ2U/OiBzdHJpbmc7XHJcbiAgICBtb2RlbD86IHN0cmluZztcclxuICAgIHRyYW5zbGF0ZWRUZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBUcmFuc2xhdGlvbnNMaXN0UmVzcG9uc2Uge1xyXG4gICAgdHJhbnNsYXRpb25zOiBUcmFuc2xhdGlvbnNSZXNvdXJjZVtdO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW50ZXJuYWxSZXF1ZXN0UmVzcG9uc2Uge1xyXG4gICAgcmVzcG9uc2U6IHJlcXVlc3QuUmVxdWVzdFJlc3BvbnNlO1xyXG4gICAgYm9keTogYW55O1xyXG59XHJcblxyXG5jb25zdCBNQVhfU0VHTUVOVFMgPSAxMjg7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0b1RyYW5zbGF0ZVNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3JlcXVlc3Q6IHJlcXVlc3QuUmVxdWVzdEFQSTxyZXF1ZXN0LlJlcXVlc3QsIHJlcXVlc3QuQ29yZU9wdGlvbnMsIHJlcXVlc3QuUmVxdWlyZWRVcmlVcmw+O1xyXG4gICAgX3Jvb3RVcmw6IHN0cmluZztcclxuICAgIF9hcGlLZXk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0cmlwIHJlZ2lvbiBjb2RlIGFuZCBjb252ZXJ0IHRvIGxvd2VyXHJcbiAgICAgKiBAcGFyYW0gbGFuZyBsYW5nXHJcbiAgICAgKiBAcmV0dXJuIGxhbmcgd2l0aG91dCByZWdpb24gY29kZSBhbmQgaW4gbG93ZXIgY2FzZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzdHJpcFJlZ2lvbmNvZGUobGFuZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBsYW5nTG93ZXIgPSBsYW5nLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYW5nTG93ZXIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYyA9IGxhbmdMb3dlci5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChjIDwgJ2EnIHx8IGMgPiAneicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5nTG93ZXIuc3Vic3RyaW5nKDAsIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYW5nTG93ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBpS2V5OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdDtcclxuICAgICAgICB0aGlzLl9hcGlLZXkgPSBhcGlLZXk7XHJcbiAgICAgICAgdGhpcy5fcm9vdFVybCA9ICdodHRwczovL3RyYW5zbGF0aW9uLmdvb2dsZWFwaXMuY29tLyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgQVBJIGtleSAoanVzdCBmb3IgdGVzdHMpLlxyXG4gICAgICogQHBhcmFtIGFwaWtleSBhcGlrZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEFwaUtleShhcGlrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2FwaUtleSA9IGFwaWtleTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSBhbiBhcnJheSBvZiBtZXNzYWdlcyBhdCBvbmNlLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VzIHRoZSBtZXNzYWdlcyB0byBiZSB0cmFuc2xhdGVkXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBzb3VyY2UgbGFuZ3VhZ2UgY29kZVxyXG4gICAgICogQHBhcmFtIHRvIHRhcmdldCBsYW5ndWFnZSBjb2RlXHJcbiAgICAgKiBAcmV0dXJuIE9ic2VydmFibGUgd2l0aCB0cmFuc2xhdGVkIG1lc3NhZ2VzIG9yIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuc2xhdGVNdWx0aXBsZVN0cmluZ3MobWVzc2FnZXM6IHN0cmluZ1tdLCBmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XHJcbiAgICAgICAgLy8gZW1wdHkgYXJyYXkgbmVlZHMgbm8gdHJhbnNsYXRpb24gYW5kIGFsd2F5cyB3b3JrcyAuLi4gKCM3OClcclxuICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fYXBpS2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdjYW5ub3QgYXV0b3RyYW5zbGF0ZTogbm8gYXBpIGtleScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWZyb20gfHwgIXRvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKCdjYW5ub3QgYXV0b3RyYW5zbGF0ZTogc291cmNlIGFuZCB0YXJnZXQgbGFuZ3VhZ2UgbXVzdCBiZSBzZXQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnJvbSA9IEF1dG9UcmFuc2xhdGVTZXJ2aWNlLnN0cmlwUmVnaW9uY29kZShmcm9tKTtcclxuICAgICAgICB0byA9IEF1dG9UcmFuc2xhdGVTZXJ2aWNlLnN0cmlwUmVnaW9uY29kZSh0byk7XHJcbiAgICAgICAgY29uc3QgYWxsUmVxdWVzdHM6IE9ic2VydmFibGU8c3RyaW5nW10+W10gPSB0aGlzLnNwbGl0TWVzc2FnZXNUb0dvb2dsZUxpbWl0KG1lc3NhZ2VzKS5tYXAoKHBhcnRpYWxNZXNzYWdlczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGltaXRlZFRyYW5zbGF0ZU11bHRpcGxlU3RyaW5ncyhwYXJ0aWFsTWVzc2FnZXMsIGZyb20sIHRvKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ya0pvaW4oYWxsUmVxdWVzdHMpLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcCgoYWxsVHJhbnNsYXRpb25zOiBzdHJpbmdbXVtdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYWxsID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFRyYW5zbGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbCA9IGFsbC5jb25jYXQoYWxsVHJhbnNsYXRpb25zW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGw7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3BsaXRNZXNzYWdlc1RvR29vZ2xlTGltaXQobWVzc2FnZXM6IHN0cmluZ1tdKTogc3RyaW5nW11bXSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA8PSBNQVhfU0VHTUVOVFMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFttZXNzYWdlc107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFja2FnZSA9IFtdO1xyXG4gICAgICAgIGxldCBwYWNrYWdlU2l6ZSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNzYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdXJyZW50UGFja2FnZS5wdXNoKG1lc3NhZ2VzW2ldKTtcclxuICAgICAgICAgICAgcGFja2FnZVNpemUrKztcclxuICAgICAgICAgICAgaWYgKHBhY2thZ2VTaXplID49IE1BWF9TRUdNRU5UUykge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY3VycmVudFBhY2thZ2UpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhY2thZ2UgPSBbXTtcclxuICAgICAgICAgICAgICAgIHBhY2thZ2VTaXplID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhY2thZ2UubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChjdXJyZW50UGFja2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdHJhbnNsYXRpb24gcmVxdWVzdCwgYnV0IG1lc3NhZ2VzIG11c3QgYmUgbGltaXRlZCB0byBnb29nbGUgbGltaXRzLlxyXG4gICAgICogTm90IG1vcmUgdGhhdCAxMjggc2luZ2xlIG1lc3NhZ2VzLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VzIG1lc3NhZ2VzXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdG8gdG9cclxuICAgICAqIEByZXR1cm4gdGhlIHRyYW5zbGF0ZWQgc3RyaW5nc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGxpbWl0ZWRUcmFuc2xhdGVNdWx0aXBsZVN0cmluZ3MobWVzc2FnZXM6IHN0cmluZ1tdLCBmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XHJcbiAgICAgICAgY29uc3QgcmVhbFVybCA9IHRoaXMuX3Jvb3RVcmwgKyAnbGFuZ3VhZ2UvdHJhbnNsYXRlL3YyJyArICc/a2V5PScgKyB0aGlzLl9hcGlLZXk7XHJcbiAgICAgICAgY29uc3QgdHJhbnNsYXRlUmVxdWVzdDogVHJhbnNsYXRlVGV4dFJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIHE6IG1lc3NhZ2VzLFxyXG4gICAgICAgICAgICB0YXJnZXQ6IHRvLFxyXG4gICAgICAgICAgICBzb3VyY2U6IGZyb20sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB1cmw6IHJlYWxVcmwsXHJcbiAgICAgICAgICAgIGJvZHk6IHRyYW5zbGF0ZVJlcXVlc3QsXHJcbiAgICAgICAgICAgIGpzb246IHRydWUsXHJcbi8vICAgICAgICAgICAgcHJveHk6ICdodHRwOi8vMTI3LjAuMC4xOjg4ODgnIFRvIHNldCBhIHByb3h5IHVzZSBlbnYgdmFyIEhUVFBTX1BST1hZXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3N0KHJlYWxVcmwsIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcCgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBib2R5OiBhbnkgPSBkYXRhLmJvZHk7XHJcbiAgICAgICAgICAgIGlmICghYm9keSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyByZXN1bHQgcmVjZWl2ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYm9keS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvZHkuZXJyb3IuY29kZSA9PT0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuZXJyb3IubWVzc2FnZSA9PT0gJ0ludmFsaWQgVmFsdWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ1RyYW5zbGF0aW9uIGZyb20gXCIlc1wiIHRvIFwiJXNcIiBub3Qgc3VwcG9ydGVkJywgZnJvbSwgdG8pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnSW52YWxpZCByZXF1ZXN0OiAlcycsIGJvZHkuZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdFcnJvciAlczogJXMnLCBib2R5LmVycm9yLmNvZGUsIGJvZHkuZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJvZHkuZGF0YTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50cmFuc2xhdGlvbnMubWFwKCh0cmFuc2xhdGlvbjogVHJhbnNsYXRpb25zUmVzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2xhdGlvbi50cmFuc2xhdGVkVGV4dDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRnVuY3Rpb24gdG8gZG8gYSBQT1NUIEhUVFAgcmVxdWVzdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1cmkgdXJpXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiByZXNwb25zZVxyXG4gICAgICovXHJcbiAgICBwb3N0KHVyaTogc3RyaW5nLCBvcHRpb25zPzogcmVxdWVzdC5Db3JlT3B0aW9ucyk6IE9ic2VydmFibGU8SW50ZXJuYWxSZXF1ZXN0UmVzcG9uc2U+IHtcclxuICAgICAgICByZXR1cm4gPE9ic2VydmFibGU8SW50ZXJuYWxSZXF1ZXN0UmVzcG9uc2U+PiB0aGlzLl9jYWxsLmFwcGx5KHRoaXMsIFtdLmNvbmNhdCgncG9zdCcsIDxzdHJpbmc+IHVyaSxcclxuICAgICAgICAgICAgPHJlcXVlc3QuQ29yZU9wdGlvbnM+IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMgfHwge30pKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB0byBkbyBhIEhUVFAgcmVxdWVzdCBmb3IgZ2l2ZW4gbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1ldGhvZCBtZXRob2RcclxuICAgICAqIEBwYXJhbSB1cmkgdXJpXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiByZXNwb25zZVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfY2FsbChtZXRob2Q6IHN0cmluZywgdXJpOiBzdHJpbmcsIG9wdGlvbnM/OiByZXF1ZXN0LkNvcmVPcHRpb25zKTogT2JzZXJ2YWJsZTxJbnRlcm5hbFJlcXVlc3RSZXNwb25zZT4ge1xyXG4gICAgICAgIHJldHVybiA8T2JzZXJ2YWJsZTxJbnRlcm5hbFJlcXVlc3RSZXNwb25zZT4+IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyBidWlsZCBwYXJhbXMgYXJyYXlcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gW10uY29uY2F0KDxzdHJpbmc+IHVyaSwgPHJlcXVlc3QuQ29yZU9wdGlvbnM+IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMgfHwge30pLFxyXG4gICAgICAgICAgICAgICAgPFJlcXVlc3RDYWxsYmFjaz4oZXJyb3I6IGFueSwgcmVzcG9uc2U6IHJlcXVlc3QuUmVxdWVzdFJlc3BvbnNlLCBib2R5OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoPEludGVybmFsUmVxdWVzdFJlc3BvbnNlPiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiA8cmVxdWVzdC5SZXF1ZXN0UmVzcG9uc2U+IHJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiA8YW55PiBib2R5XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIF9jYWxsIHJlcXVlc3QgbWV0aG9kXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXF1ZXN0WzxzdHJpbmc+IG1ldGhvZF0uYXBwbHkoXHJcbiAgICAgICAgICAgICAgICAgICAgPHJlcXVlc3QuUmVxdWVzdEFQSTxyZXF1ZXN0LlJlcXVlc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5Db3JlT3B0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LlJlcXVpcmVkVXJpVXJsPj4gdGhpcy5fcmVxdWVzdCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19