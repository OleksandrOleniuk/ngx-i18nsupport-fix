/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isNullOrUndefined } from '../common/util';
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as entityDecoderLib from 'he';
import { STATE_NEW } from '@ngx-i18nsupport/ngx-i18nsupport-lib';
import { AutoTranslateService } from './auto-translate-service';
import { AutoTranslateResult } from './auto-translate-result';
import { AutoTranslateSummaryReport } from './auto-translate-summary-report';
/**
 * Created by martin on 07.07.2017.
 * Service to autotranslate Transunits via Google Translate.
 */
var /**
 * Created by martin on 07.07.2017.
 * Service to autotranslate Transunits via Google Translate.
 */
XliffMergeAutoTranslateService = /** @class */ (function () {
    function XliffMergeAutoTranslateService(apikey) {
        this.autoTranslateService = new AutoTranslateService(apikey);
    }
    /**
     * Auto translate file via Google Translate.
     * Will translate all new units in file.
     * @param from from
     * @param to to
     * @param languageSpecificMessagesFile languageSpecificMessagesFile
     * @return a promise with the execution result as a summary report.
     */
    /**
     * Auto translate file via Google Translate.
     * Will translate all new units in file.
     * @param {?} from from
     * @param {?} to to
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} a promise with the execution result as a summary report.
     */
    XliffMergeAutoTranslateService.prototype.autoTranslate = /**
     * Auto translate file via Google Translate.
     * Will translate all new units in file.
     * @param {?} from from
     * @param {?} to to
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} a promise with the execution result as a summary report.
     */
    function (from, to, languageSpecificMessagesFile) {
        return forkJoin(tslib_1.__spread([
            this.doAutoTranslateNonICUMessages(from, to, languageSpecificMessagesFile)
        ], this.doAutoTranslateICUMessages(from, to, languageSpecificMessagesFile)))
            .pipe(map((/**
         * @param {?} summaries
         * @return {?}
         */
        function (summaries) {
            /** @type {?} */
            var summary = summaries[0];
            for (var i = 1; i < summaries.length; i++) {
                summary.merge(summaries[i]);
            }
            return summary;
        })));
    };
    /**
     * Collect all units that are untranslated.
     * @param languageSpecificMessagesFile languageSpecificMessagesFile
     * @return all untranslated units
     */
    /**
     * Collect all units that are untranslated.
     * @private
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} all untranslated units
     */
    XliffMergeAutoTranslateService.prototype.allUntranslatedTUs = /**
     * Collect all units that are untranslated.
     * @private
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} all untranslated units
     */
    function (languageSpecificMessagesFile) {
        // collect all units, that should be auto translated
        /** @type {?} */
        var allUntranslated = [];
        languageSpecificMessagesFile.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            if (tu.targetState() === STATE_NEW) {
                allUntranslated.push(tu);
            }
        }));
        return allUntranslated;
    };
    /**
     * @private
     * @param {?} from
     * @param {?} to
     * @param {?} languageSpecificMessagesFile
     * @return {?}
     */
    XliffMergeAutoTranslateService.prototype.doAutoTranslateNonICUMessages = /**
     * @private
     * @param {?} from
     * @param {?} to
     * @param {?} languageSpecificMessagesFile
     * @return {?}
     */
    function (from, to, languageSpecificMessagesFile) {
        var _this = this;
        /** @type {?} */
        var allUntranslated = this.allUntranslatedTUs(languageSpecificMessagesFile);
        /** @type {?} */
        var allTranslatable = allUntranslated.filter((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) { return isNullOrUndefined(tu.sourceContentNormalized().getICUMessage()); }));
        /** @type {?} */
        var allMessages = allTranslatable.map((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            return tu.sourceContentNormalized().asDisplayString();
        }));
        return this.autoTranslateService.translateMultipleStrings(allMessages, from, to)
            .pipe(
        // #94 google translate might return &#.. entity refs, that must be decoded
        map((/**
         * @param {?} translations
         * @return {?}
         */
        function (translations) { return translations.map((/**
         * @param {?} encodedTranslation
         * @return {?}
         */
        function (encodedTranslation) { return entityDecoderLib.decode(encodedTranslation); })); })), map((/**
         * @param {?} translations
         * @return {?}
         */
        function (translations) {
            /** @type {?} */
            var summary = new AutoTranslateSummaryReport(from, to);
            summary.setIgnored(allUntranslated.length - allTranslatable.length);
            for (var i = 0; i < translations.length; i++) {
                /** @type {?} */
                var tu = allTranslatable[i];
                /** @type {?} */
                var translationText = translations[i];
                /** @type {?} */
                var result = _this.autoTranslateNonICUUnit(tu, translationText);
                summary.addSingleResult(tu, result);
            }
            return summary;
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            /** @type {?} */
            var failSummary = new AutoTranslateSummaryReport(from, to);
            failSummary.setError(err.message, allMessages.length);
            return of(failSummary);
        })));
    };
    /**
     * @private
     * @param {?} from
     * @param {?} to
     * @param {?} languageSpecificMessagesFile
     * @return {?}
     */
    XliffMergeAutoTranslateService.prototype.doAutoTranslateICUMessages = /**
     * @private
     * @param {?} from
     * @param {?} to
     * @param {?} languageSpecificMessagesFile
     * @return {?}
     */
    function (from, to, languageSpecificMessagesFile) {
        var _this = this;
        /** @type {?} */
        var allUntranslated = this.allUntranslatedTUs(languageSpecificMessagesFile);
        /** @type {?} */
        var allTranslatableICU = allUntranslated.filter((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) { return !isNullOrUndefined(tu.sourceContentNormalized().getICUMessage()); }));
        return allTranslatableICU.map((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            return _this.doAutoTranslateICUMessage(from, to, tu);
        }));
    };
    /**
     * Translate single ICU Messages.
     * @param from from
     * @param to to
     * @param tu transunit to translate (must contain ICU Message)
     * @return summary report
     */
    /**
     * Translate single ICU Messages.
     * @private
     * @param {?} from from
     * @param {?} to to
     * @param {?} tu transunit to translate (must contain ICU Message)
     * @return {?} summary report
     */
    XliffMergeAutoTranslateService.prototype.doAutoTranslateICUMessage = /**
     * Translate single ICU Messages.
     * @private
     * @param {?} from from
     * @param {?} to to
     * @param {?} tu transunit to translate (must contain ICU Message)
     * @return {?} summary report
     */
    function (from, to, tu) {
        var _this = this;
        /** @type {?} */
        var icuMessage = tu.sourceContentNormalized().getICUMessage();
        /** @type {?} */
        var categories = icuMessage.getCategories();
        // check for nested ICUs, we do not support that
        if (categories.find((/**
         * @param {?} category
         * @return {?}
         */
        function (category) { return !isNullOrUndefined(category.getMessageNormalized().getICUMessage()); }))) {
            /** @type {?} */
            var summary = new AutoTranslateSummaryReport(from, to);
            summary.setIgnored(1);
            return of(summary);
        }
        /** @type {?} */
        var allMessages = categories.map((/**
         * @param {?} category
         * @return {?}
         */
        function (category) { return category.getMessageNormalized().asDisplayString(); }));
        return this.autoTranslateService.translateMultipleStrings(allMessages, from, to)
            .pipe(
        // #94 google translate might return &#.. entity refs, that must be decoded
        map((/**
         * @param {?} translations
         * @return {?}
         */
        function (translations) { return translations.map((/**
         * @param {?} encodedTranslation
         * @return {?}
         */
        function (encodedTranslation) { return entityDecoderLib.decode(encodedTranslation); })); })), map((/**
         * @param {?} translations
         * @return {?}
         */
        function (translations) {
            /** @type {?} */
            var summary = new AutoTranslateSummaryReport(from, to);
            /** @type {?} */
            var icuTranslation = {};
            for (var i = 0; i < translations.length; i++) {
                icuTranslation[categories[i].getCategory()] = translations[i];
            }
            /** @type {?} */
            var result = _this.autoTranslateICUUnit(tu, icuTranslation);
            summary.addSingleResult(tu, result);
            return summary;
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            /** @type {?} */
            var failSummary = new AutoTranslateSummaryReport(from, to);
            failSummary.setError(err.message, allMessages.length);
            return of(failSummary);
        })));
    };
    /**
     * @private
     * @param {?} tu
     * @param {?} translatedMessage
     * @return {?}
     */
    XliffMergeAutoTranslateService.prototype.autoTranslateNonICUUnit = /**
     * @private
     * @param {?} tu
     * @param {?} translatedMessage
     * @return {?}
     */
    function (tu, translatedMessage) {
        return this.autoTranslateUnit(tu, tu.sourceContentNormalized().translate(translatedMessage));
    };
    /**
     * @private
     * @param {?} tu
     * @param {?} translation
     * @return {?}
     */
    XliffMergeAutoTranslateService.prototype.autoTranslateICUUnit = /**
     * @private
     * @param {?} tu
     * @param {?} translation
     * @return {?}
     */
    function (tu, translation) {
        return this.autoTranslateUnit(tu, tu.sourceContentNormalized().translateICUMessage(translation));
    };
    /**
     * @private
     * @param {?} tu
     * @param {?} translatedMessage
     * @return {?}
     */
    XliffMergeAutoTranslateService.prototype.autoTranslateUnit = /**
     * @private
     * @param {?} tu
     * @param {?} translatedMessage
     * @return {?}
     */
    function (tu, translatedMessage) {
        /** @type {?} */
        var errors = translatedMessage.validate();
        /** @type {?} */
        var warnings = translatedMessage.validateWarnings();
        if (!isNullOrUndefined(errors)) {
            return new AutoTranslateResult(false, 'errors detected, not translated');
        }
        else if (!isNullOrUndefined(warnings)) {
            return new AutoTranslateResult(false, 'warnings detected, not translated');
        }
        else {
            tu.translate(translatedMessage);
            return new AutoTranslateResult(true, null); // success
        }
    };
    return XliffMergeAutoTranslateService;
}());
/**
 * Created by martin on 07.07.2017.
 * Service to autotranslate Transunits via Google Translate.
 */
export { XliffMergeAutoTranslateService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    XliffMergeAutoTranslateService.prototype.autoTranslateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVyZ2UtYXV0by10cmFuc2xhdGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsiYXV0b3RyYW5zbGF0ZS94bGlmZi1tZXJnZS1hdXRvLXRyYW5zbGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFhLFFBQVEsRUFBRSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEtBQUssZ0JBQWdCLE1BQU0sSUFBSSxDQUFDO0FBQ3ZDLE9BQU8sRUFFSCxTQUFTLEVBQ1osTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7QUFNM0U7Ozs7O0lBSUksd0NBQVksTUFBYztRQUN0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ0ksc0RBQWE7Ozs7Ozs7O0lBQXBCLFVBQXFCLElBQVksRUFBRSxFQUFVLEVBQUUsNEJBQXNEO1FBRWpHLE9BQU8sUUFBUTtZQUNYLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixDQUFDO1dBQ3ZFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixDQUFDLEVBQUU7YUFDM0Us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LElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVU7U0FDekQ7SUFDTCxDQUFDO0lBQ0wscUNBQUM7QUFBRCxDQUFDLEFBOUlELElBOElDOzs7Ozs7Ozs7OztJQTVJRyw4REFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2lzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgZm9ya0pvaW4sIG9mfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHttYXAsIGNhdGNoRXJyb3J9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0ICogYXMgZW50aXR5RGVjb2RlckxpYiBmcm9tICdoZSc7XHJcbmltcG9ydCB7XHJcbiAgICBJSUNVTWVzc2FnZSwgSUlDVU1lc3NhZ2VUcmFuc2xhdGlvbiwgSU5vcm1hbGl6ZWRNZXNzYWdlLCBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUsIElUcmFuc1VuaXQsXHJcbiAgICBTVEFURV9ORVdcclxufSBmcm9tICdAbmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWInO1xyXG5pbXBvcnQge0F1dG9UcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICcuL2F1dG8tdHJhbnNsYXRlLXNlcnZpY2UnO1xyXG5pbXBvcnQge0F1dG9UcmFuc2xhdGVSZXN1bHR9IGZyb20gJy4vYXV0by10cmFuc2xhdGUtcmVzdWx0JztcclxuaW1wb3J0IHtBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydH0gZnJvbSAnLi9hdXRvLXRyYW5zbGF0ZS1zdW1tYXJ5LXJlcG9ydCc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAwNy4wNy4yMDE3LlxyXG4gKiBTZXJ2aWNlIHRvIGF1dG90cmFuc2xhdGUgVHJhbnN1bml0cyB2aWEgR29vZ2xlIFRyYW5zbGF0ZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgWGxpZmZNZXJnZUF1dG9UcmFuc2xhdGVTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGF1dG9UcmFuc2xhdGVTZXJ2aWNlOiBBdXRvVHJhbnNsYXRlU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhcGlrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuYXV0b1RyYW5zbGF0ZVNlcnZpY2UgPSBuZXcgQXV0b1RyYW5zbGF0ZVNlcnZpY2UoYXBpa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF1dG8gdHJhbnNsYXRlIGZpbGUgdmlhIEdvb2dsZSBUcmFuc2xhdGUuXHJcbiAgICAgKiBXaWxsIHRyYW5zbGF0ZSBhbGwgbmV3IHVuaXRzIGluIGZpbGUuXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdG8gdG9cclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGVcclxuICAgICAqIEByZXR1cm4gYSBwcm9taXNlIHdpdGggdGhlIGV4ZWN1dGlvbiByZXN1bHQgYXMgYSBzdW1tYXJ5IHJlcG9ydC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1dG9UcmFuc2xhdGUoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpXHJcbiAgICAgICAgOiBPYnNlcnZhYmxlPEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0PiB7XHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKFtcclxuICAgICAgICAgICAgdGhpcy5kb0F1dG9UcmFuc2xhdGVOb25JQ1VNZXNzYWdlcyhmcm9tLCB0bywgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZSksXHJcbiAgICAgICAgICAgIC4uLnRoaXMuZG9BdXRvVHJhbnNsYXRlSUNVTWVzc2FnZXMoZnJvbSwgdG8sIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUpXSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAoKHN1bW1hcmllczogQXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnRbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bW1hcnkgPSBzdW1tYXJpZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdW1tYXJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS5tZXJnZShzdW1tYXJpZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VtbWFyeTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb2xsZWN0IGFsbCB1bml0cyB0aGF0IGFyZSB1bnRyYW5zbGF0ZWQuXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZSBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlXHJcbiAgICAgKiBAcmV0dXJuIGFsbCB1bnRyYW5zbGF0ZWQgdW5pdHNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhbGxVbnRyYW5zbGF0ZWRUVXMobGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTogSVRyYW5zVW5pdFtdIHtcclxuICAgICAgICAvLyBjb2xsZWN0IGFsbCB1bml0cywgdGhhdCBzaG91bGQgYmUgYXV0byB0cmFuc2xhdGVkXHJcbiAgICAgICAgY29uc3QgYWxsVW50cmFuc2xhdGVkOiBJVHJhbnNVbml0W10gPSBbXTtcclxuICAgICAgICBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlLmZvckVhY2hUcmFuc1VuaXQoKHR1KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0dS50YXJnZXRTdGF0ZSgpID09PSBTVEFURV9ORVcpIHtcclxuICAgICAgICAgICAgICAgIGFsbFVudHJhbnNsYXRlZC5wdXNoKHR1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhbGxVbnRyYW5zbGF0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkb0F1dG9UcmFuc2xhdGVOb25JQ1VNZXNzYWdlcyhmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGU6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSlcclxuICAgICAgICA6IE9ic2VydmFibGU8QXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQ+IHtcclxuICAgICAgICBjb25zdCBhbGxVbnRyYW5zbGF0ZWQ6IElUcmFuc1VuaXRbXSA9IHRoaXMuYWxsVW50cmFuc2xhdGVkVFVzKGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUpO1xyXG4gICAgICAgIGNvbnN0IGFsbFRyYW5zbGF0YWJsZSA9IGFsbFVudHJhbnNsYXRlZC5maWx0ZXIoKHR1KSA9PiBpc051bGxPclVuZGVmaW5lZCh0dS5zb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpLmdldElDVU1lc3NhZ2UoKSkpO1xyXG4gICAgICAgIGNvbnN0IGFsbE1lc3NhZ2VzOiBzdHJpbmdbXSA9IGFsbFRyYW5zbGF0YWJsZS5tYXAoKHR1KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0dS5zb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpLmFzRGlzcGxheVN0cmluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9UcmFuc2xhdGVTZXJ2aWNlLnRyYW5zbGF0ZU11bHRpcGxlU3RyaW5ncyhhbGxNZXNzYWdlcywgZnJvbSwgdG8pXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgLy8gIzk0IGdvb2dsZSB0cmFuc2xhdGUgbWlnaHQgcmV0dXJuICYjLi4gZW50aXR5IHJlZnMsIHRoYXQgbXVzdCBiZSBkZWNvZGVkXHJcbiAgICAgICAgICAgICAgICBtYXAoKHRyYW5zbGF0aW9uczogc3RyaW5nW10pID0+IHRyYW5zbGF0aW9ucy5tYXAoZW5jb2RlZFRyYW5zbGF0aW9uID0+IGVudGl0eURlY29kZXJMaWIuZGVjb2RlKGVuY29kZWRUcmFuc2xhdGlvbikpKSxcclxuICAgICAgICAgICAgICAgIG1hcCgodHJhbnNsYXRpb25zOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IG5ldyBBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydChmcm9tLCB0byk7XHJcbiAgICAgICAgICAgICAgICBzdW1tYXJ5LnNldElnbm9yZWQoYWxsVW50cmFuc2xhdGVkLmxlbmd0aCAtIGFsbFRyYW5zbGF0YWJsZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFuc2xhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0dSA9IGFsbFRyYW5zbGF0YWJsZVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGlvblRleHQgPSB0cmFuc2xhdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hdXRvVHJhbnNsYXRlTm9uSUNVVW5pdCh0dSwgdHJhbnNsYXRpb25UZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5LmFkZFNpbmdsZVJlc3VsdCh0dSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzdW1tYXJ5O1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWlsU3VtbWFyeSA9IG5ldyBBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydChmcm9tLCB0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbFN1bW1hcnkuc2V0RXJyb3IoZXJyLm1lc3NhZ2UsIGFsbE1lc3NhZ2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKGZhaWxTdW1tYXJ5KTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9BdXRvVHJhbnNsYXRlSUNVTWVzc2FnZXMoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpXHJcbiAgICAgICAgOiBPYnNlcnZhYmxlPEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0PltdIHtcclxuICAgICAgICBjb25zdCBhbGxVbnRyYW5zbGF0ZWQ6IElUcmFuc1VuaXRbXSA9IHRoaXMuYWxsVW50cmFuc2xhdGVkVFVzKGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUpO1xyXG4gICAgICAgIGNvbnN0IGFsbFRyYW5zbGF0YWJsZUlDVSA9IGFsbFVudHJhbnNsYXRlZC5maWx0ZXIoKHR1KSA9PiAhaXNOdWxsT3JVbmRlZmluZWQodHUuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKS5nZXRJQ1VNZXNzYWdlKCkpKTtcclxuICAgICAgICByZXR1cm4gYWxsVHJhbnNsYXRhYmxlSUNVLm1hcCgodHUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9BdXRvVHJhbnNsYXRlSUNVTWVzc2FnZShmcm9tLCB0bywgdHUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVHJhbnNsYXRlIHNpbmdsZSBJQ1UgTWVzc2FnZXMuXHJcbiAgICAgKiBAcGFyYW0gZnJvbSBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdG8gdG9cclxuICAgICAqIEBwYXJhbSB0dSB0cmFuc3VuaXQgdG8gdHJhbnNsYXRlIChtdXN0IGNvbnRhaW4gSUNVIE1lc3NhZ2UpXHJcbiAgICAgKiBAcmV0dXJuIHN1bW1hcnkgcmVwb3J0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZG9BdXRvVHJhbnNsYXRlSUNVTWVzc2FnZShmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIHR1OiBJVHJhbnNVbml0KTogT2JzZXJ2YWJsZTxBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydD4ge1xyXG4gICAgICAgIGNvbnN0IGljdU1lc3NhZ2U6IElJQ1VNZXNzYWdlID0gdHUuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKS5nZXRJQ1VNZXNzYWdlKCk7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IGljdU1lc3NhZ2UuZ2V0Q2F0ZWdvcmllcygpO1xyXG4gICAgICAgIC8vIGNoZWNrIGZvciBuZXN0ZWQgSUNVcywgd2UgZG8gbm90IHN1cHBvcnQgdGhhdFxyXG4gICAgICAgIGlmIChjYXRlZ29yaWVzLmZpbmQoKGNhdGVnb3J5KSA9PiAhaXNOdWxsT3JVbmRlZmluZWQoY2F0ZWdvcnkuZ2V0TWVzc2FnZU5vcm1hbGl6ZWQoKS5nZXRJQ1VNZXNzYWdlKCkpKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzdW1tYXJ5ID0gbmV3IEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0KGZyb20sIHRvKTtcclxuICAgICAgICAgICAgc3VtbWFyeS5zZXRJZ25vcmVkKDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2Yoc3VtbWFyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFsbE1lc3NhZ2VzOiBzdHJpbmdbXSA9IGNhdGVnb3JpZXMubWFwKChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkuZ2V0TWVzc2FnZU5vcm1hbGl6ZWQoKS5hc0Rpc3BsYXlTdHJpbmcoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b1RyYW5zbGF0ZVNlcnZpY2UudHJhbnNsYXRlTXVsdGlwbGVTdHJpbmdzKGFsbE1lc3NhZ2VzLCBmcm9tLCB0bylcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAvLyAjOTQgZ29vZ2xlIHRyYW5zbGF0ZSBtaWdodCByZXR1cm4gJiMuLiBlbnRpdHkgcmVmcywgdGhhdCBtdXN0IGJlIGRlY29kZWRcclxuICAgICAgICAgICAgICAgIG1hcCgodHJhbnNsYXRpb25zOiBzdHJpbmdbXSkgPT4gdHJhbnNsYXRpb25zLm1hcChlbmNvZGVkVHJhbnNsYXRpb24gPT4gZW50aXR5RGVjb2RlckxpYi5kZWNvZGUoZW5jb2RlZFRyYW5zbGF0aW9uKSkpLFxyXG4gICAgICAgICAgICAgICAgbWFwKCh0cmFuc2xhdGlvbnM6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IG5ldyBBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydChmcm9tLCB0byk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWN1VHJhbnNsYXRpb246IElJQ1VNZXNzYWdlVHJhbnNsYXRpb24gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYW5zbGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY3VUcmFuc2xhdGlvbltjYXRlZ29yaWVzW2ldLmdldENhdGVnb3J5KCldID0gdHJhbnNsYXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmF1dG9UcmFuc2xhdGVJQ1VVbml0KHR1LCBpY3VUcmFuc2xhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS5hZGRTaW5nbGVSZXN1bHQodHUsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1bW1hcnk7XHJcbiAgICAgICAgICAgICAgICB9KSwgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFpbFN1bW1hcnkgPSBuZXcgQXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQoZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWxTdW1tYXJ5LnNldEVycm9yKGVyci5tZXNzYWdlLCBhbGxNZXNzYWdlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWlsU3VtbWFyeSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGF1dG9UcmFuc2xhdGVOb25JQ1VVbml0KHR1OiBJVHJhbnNVbml0LCB0cmFuc2xhdGVkTWVzc2FnZTogc3RyaW5nKTogQXV0b1RyYW5zbGF0ZVJlc3VsdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b1RyYW5zbGF0ZVVuaXQodHUsIHR1LnNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCkudHJhbnNsYXRlKHRyYW5zbGF0ZWRNZXNzYWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvVHJhbnNsYXRlSUNVVW5pdCh0dTogSVRyYW5zVW5pdCwgdHJhbnNsYXRpb246IElJQ1VNZXNzYWdlVHJhbnNsYXRpb24pOiBBdXRvVHJhbnNsYXRlUmVzdWx0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvVHJhbnNsYXRlVW5pdCh0dSwgdHUuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKS50cmFuc2xhdGVJQ1VNZXNzYWdlKHRyYW5zbGF0aW9uKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvVHJhbnNsYXRlVW5pdCh0dTogSVRyYW5zVW5pdCwgdHJhbnNsYXRlZE1lc3NhZ2U6IElOb3JtYWxpemVkTWVzc2FnZSk6IEF1dG9UcmFuc2xhdGVSZXN1bHQge1xyXG4gICAgICAgIGNvbnN0IGVycm9ycyA9IHRyYW5zbGF0ZWRNZXNzYWdlLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgY29uc3Qgd2FybmluZ3MgPSB0cmFuc2xhdGVkTWVzc2FnZS52YWxpZGF0ZVdhcm5pbmdzKCk7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChlcnJvcnMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXV0b1RyYW5zbGF0ZVJlc3VsdChmYWxzZSwgJ2Vycm9ycyBkZXRlY3RlZCwgbm90IHRyYW5zbGF0ZWQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFpc051bGxPclVuZGVmaW5lZCh3YXJuaW5ncykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBdXRvVHJhbnNsYXRlUmVzdWx0KGZhbHNlLCAnd2FybmluZ3MgZGV0ZWN0ZWQsIG5vdCB0cmFuc2xhdGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHUudHJhbnNsYXRlKHRyYW5zbGF0ZWRNZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBdXRvVHJhbnNsYXRlUmVzdWx0KHRydWUsIG51bGwpOyAvLyBzdWNjZXNzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==