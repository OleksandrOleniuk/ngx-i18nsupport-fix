/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class XliffMergeAutoTranslateService {
    /**
     * @param {?} apikey
     */
    constructor(apikey) {
        this.autoTranslateService = new AutoTranslateService(apikey);
    }
    /**
     * Auto translate file via Google Translate.
     * Will translate all new units in file.
     * @param {?} from from
     * @param {?} to to
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} a promise with the execution result as a summary report.
     */
    autoTranslate(from, to, languageSpecificMessagesFile) {
        return forkJoin([
            this.doAutoTranslateNonICUMessages(from, to, languageSpecificMessagesFile),
            ...this.doAutoTranslateICUMessages(from, to, languageSpecificMessagesFile)
        ])
            .pipe(map((/**
         * @param {?} summaries
         * @return {?}
         */
        (summaries) => {
            /** @type {?} */
            const summary = summaries[0];
            for (let i = 1; i < summaries.length; i++) {
                summary.merge(summaries[i]);
            }
            return summary;
        })));
    }
    /**
     * Collect all units that are untranslated.
     * @private
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} all untranslated units
     */
    allUntranslatedTUs(languageSpecificMessagesFile) {
        // collect all units, that should be auto translated
        /** @type {?} */
        const allUntranslated = [];
        languageSpecificMessagesFile.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => {
            if (tu.targetState() === STATE_NEW) {
                allUntranslated.push(tu);
            }
        }));
        return allUntranslated;
    }
    /**
     * @private
     * @param {?} from
     * @param {?} to
     * @param {?} languageSpecificMessagesFile
     * @return {?}
     */
    doAutoTranslateNonICUMessages(from, to, languageSpecificMessagesFile) {
        /** @type {?} */
        const allUntranslated = this.allUntranslatedTUs(languageSpecificMessagesFile);
        /** @type {?} */
        const allTranslatable = allUntranslated.filter((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => isNullOrUndefined(tu.sourceContentNormalized().getICUMessage())));
        /** @type {?} */
        const allMessages = allTranslatable.map((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => {
            return tu.sourceContentNormalized().asDisplayString();
        }));
        return this.autoTranslateService.translateMultipleStrings(allMessages, from, to)
            .pipe(
        // #94 google translate might return &#.. entity refs, that must be decoded
        map((/**
         * @param {?} translations
         * @return {?}
         */
        (translations) => translations.map((/**
         * @param {?} encodedTranslation
         * @return {?}
         */
        encodedTranslation => entityDecoderLib.decode(encodedTranslation))))), map((/**
         * @param {?} translations
         * @return {?}
         */
        (translations) => {
            /** @type {?} */
            const summary = new AutoTranslateSummaryReport(from, to);
            summary.setIgnored(allUntranslated.length - allTranslatable.length);
            for (let i = 0; i < translations.length; i++) {
                /** @type {?} */
                const tu = allTranslatable[i];
                /** @type {?} */
                const translationText = translations[i];
                /** @type {?} */
                const result = this.autoTranslateNonICUUnit(tu, translationText);
                summary.addSingleResult(tu, result);
            }
            return summary;
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            /** @type {?} */
            const failSummary = new AutoTranslateSummaryReport(from, to);
            failSummary.setError(err.message, allMessages.length);
            return of(failSummary);
        })));
    }
    /**
     * @private
     * @param {?} from
     * @param {?} to
     * @param {?} languageSpecificMessagesFile
     * @return {?}
     */
    doAutoTranslateICUMessages(from, to, languageSpecificMessagesFile) {
        /** @type {?} */
        const allUntranslated = this.allUntranslatedTUs(languageSpecificMessagesFile);
        /** @type {?} */
        const allTranslatableICU = allUntranslated.filter((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => !isNullOrUndefined(tu.sourceContentNormalized().getICUMessage())));
        return allTranslatableICU.map((/**
         * @param {?} tu
         * @return {?}
         */
        (tu) => {
            return this.doAutoTranslateICUMessage(from, to, tu);
        }));
    }
    /**
     * Translate single ICU Messages.
     * @private
     * @param {?} from from
     * @param {?} to to
     * @param {?} tu transunit to translate (must contain ICU Message)
     * @return {?} summary report
     */
    doAutoTranslateICUMessage(from, to, tu) {
        /** @type {?} */
        const icuMessage = tu.sourceContentNormalized().getICUMessage();
        /** @type {?} */
        const categories = icuMessage.getCategories();
        // check for nested ICUs, we do not support that
        if (categories.find((/**
         * @param {?} category
         * @return {?}
         */
        (category) => !isNullOrUndefined(category.getMessageNormalized().getICUMessage())))) {
            /** @type {?} */
            const summary = new AutoTranslateSummaryReport(from, to);
            summary.setIgnored(1);
            return of(summary);
        }
        /** @type {?} */
        const allMessages = categories.map((/**
         * @param {?} category
         * @return {?}
         */
        (category) => category.getMessageNormalized().asDisplayString()));
        return this.autoTranslateService.translateMultipleStrings(allMessages, from, to)
            .pipe(
        // #94 google translate might return &#.. entity refs, that must be decoded
        map((/**
         * @param {?} translations
         * @return {?}
         */
        (translations) => translations.map((/**
         * @param {?} encodedTranslation
         * @return {?}
         */
        encodedTranslation => entityDecoderLib.decode(encodedTranslation))))), map((/**
         * @param {?} translations
         * @return {?}
         */
        (translations) => {
            /** @type {?} */
            const summary = new AutoTranslateSummaryReport(from, to);
            /** @type {?} */
            const icuTranslation = {};
            for (let i = 0; i < translations.length; i++) {
                icuTranslation[categories[i].getCategory()] = translations[i];
            }
            /** @type {?} */
            const result = this.autoTranslateICUUnit(tu, icuTranslation);
            summary.addSingleResult(tu, result);
            return summary;
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            /** @type {?} */
            const failSummary = new AutoTranslateSummaryReport(from, to);
            failSummary.setError(err.message, allMessages.length);
            return of(failSummary);
        })));
    }
    /**
     * @private
     * @param {?} tu
     * @param {?} translatedMessage
     * @return {?}
     */
    autoTranslateNonICUUnit(tu, translatedMessage) {
        return this.autoTranslateUnit(tu, tu.sourceContentNormalized().translate(translatedMessage));
    }
    /**
     * @private
     * @param {?} tu
     * @param {?} translation
     * @return {?}
     */
    autoTranslateICUUnit(tu, translation) {
        return this.autoTranslateUnit(tu, tu.sourceContentNormalized().translateICUMessage(translation));
    }
    /**
     * @private
     * @param {?} tu
     * @param {?} translatedMessage
     * @return {?}
     */
    autoTranslateUnit(tu, translatedMessage) {
        /** @type {?} */
        const errors = translatedMessage.validate();
        /** @type {?} */
        const warnings = translatedMessage.validateWarnings();
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
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    XliffMergeAutoTranslateService.prototype.autoTranslateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVyZ2UtYXV0by10cmFuc2xhdGUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsiYXV0b3RyYW5zbGF0ZS94bGlmZi1tZXJnZS1hdXRvLXRyYW5zbGF0ZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQWEsUUFBUSxFQUFFLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsR0FBRyxFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sS0FBSyxnQkFBZ0IsTUFBTSxJQUFJLENBQUM7QUFDdkMsT0FBTyxFQUVILFNBQVMsRUFDWixNQUFNLHNDQUFzQyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDOzs7OztBQU0zRSxNQUFNLE9BQU8sOEJBQThCOzs7O0lBSXZDLFlBQVksTUFBYztRQUN0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7Ozs7SUFVTSxhQUFhLENBQUMsSUFBWSxFQUFFLEVBQVUsRUFBRSw0QkFBc0Q7UUFFakcsT0FBTyxRQUFRLENBQUM7WUFDWixJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQztZQUMxRSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixDQUFDO1NBQUMsQ0FBQzthQUMzRSxJ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QUMsV0FBVyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNaLENBQUM7Ozs7Ozs7SUFFTyx1QkFBdUIsQ0FBQyxFQUFjLEVBQUUsaUJBQXlCO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxFQUFjLEVBQUUsV0FBbUM7UUFDNUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDckcsQ0FBQzs7Ozs7OztJQUVPLGlCQUFpQixDQUFDLEVBQWMsRUFBRSxpQkFBcUM7O2NBQ3JFLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7O2NBQ3JDLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNyRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLG1CQUFtQixDQUFDLEtBQUssRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1NBQzVFO2FBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0gsRUFBRSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVO1NBQ3pEO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7SUE1SUcsOERBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIGZvcmtKb2luLCBvZn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7bWFwLCBjYXRjaEVycm9yfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCAqIGFzIGVudGl0eURlY29kZXJMaWIgZnJvbSAnaGUnO1xyXG5pbXBvcnQge1xyXG4gICAgSUlDVU1lc3NhZ2UsIElJQ1VNZXNzYWdlVHJhbnNsYXRpb24sIElOb3JtYWxpemVkTWVzc2FnZSwgSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlLCBJVHJhbnNVbml0LFxyXG4gICAgU1RBVEVfTkVXXHJcbn0gZnJvbSAnQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliJztcclxuaW1wb3J0IHtBdXRvVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnLi9hdXRvLXRyYW5zbGF0ZS1zZXJ2aWNlJztcclxuaW1wb3J0IHtBdXRvVHJhbnNsYXRlUmVzdWx0fSBmcm9tICcuL2F1dG8tdHJhbnNsYXRlLXJlc3VsdCc7XHJcbmltcG9ydCB7QXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnR9IGZyb20gJy4vYXV0by10cmFuc2xhdGUtc3VtbWFyeS1yZXBvcnQnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMDcuMDcuMjAxNy5cclxuICogU2VydmljZSB0byBhdXRvdHJhbnNsYXRlIFRyYW5zdW5pdHMgdmlhIEdvb2dsZSBUcmFuc2xhdGUuXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFhsaWZmTWVyZ2VBdXRvVHJhbnNsYXRlU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvVHJhbnNsYXRlU2VydmljZTogQXV0b1RyYW5zbGF0ZVNlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBpa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmF1dG9UcmFuc2xhdGVTZXJ2aWNlID0gbmV3IEF1dG9UcmFuc2xhdGVTZXJ2aWNlKGFwaWtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBdXRvIHRyYW5zbGF0ZSBmaWxlIHZpYSBHb29nbGUgVHJhbnNsYXRlLlxyXG4gICAgICogV2lsbCB0cmFuc2xhdGUgYWxsIG5ldyB1bml0cyBpbiBmaWxlLlxyXG4gICAgICogQHBhcmFtIGZyb20gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvIHRvXHJcbiAgICAgKiBAcGFyYW0gbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZSBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlXHJcbiAgICAgKiBAcmV0dXJuIGEgcHJvbWlzZSB3aXRoIHRoZSBleGVjdXRpb24gcmVzdWx0IGFzIGEgc3VtbWFyeSByZXBvcnQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdXRvVHJhbnNsYXRlKGZyb206IHN0cmluZywgdG86IHN0cmluZywgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKVxyXG4gICAgICAgIDogT2JzZXJ2YWJsZTxBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydD4ge1xyXG4gICAgICAgIHJldHVybiBmb3JrSm9pbihbXHJcbiAgICAgICAgICAgIHRoaXMuZG9BdXRvVHJhbnNsYXRlTm9uSUNVTWVzc2FnZXMoZnJvbSwgdG8sIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUpLFxyXG4gICAgICAgICAgICAuLi50aGlzLmRvQXV0b1RyYW5zbGF0ZUlDVU1lc3NhZ2VzKGZyb20sIHRvLCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlKV0pXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKChzdW1tYXJpZXM6IEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW1tYXJ5ID0gc3VtbWFyaWVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3VtbWFyaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkubWVyZ2Uoc3VtbWFyaWVzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1bW1hcnk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29sbGVjdCBhbGwgdW5pdHMgdGhhdCBhcmUgdW50cmFuc2xhdGVkLlxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZVxyXG4gICAgICogQHJldHVybiBhbGwgdW50cmFuc2xhdGVkIHVuaXRzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWxsVW50cmFuc2xhdGVkVFVzKGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGU6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSk6IElUcmFuc1VuaXRbXSB7XHJcbiAgICAgICAgLy8gY29sbGVjdCBhbGwgdW5pdHMsIHRoYXQgc2hvdWxkIGJlIGF1dG8gdHJhbnNsYXRlZFxyXG4gICAgICAgIGNvbnN0IGFsbFVudHJhbnNsYXRlZDogSVRyYW5zVW5pdFtdID0gW107XHJcbiAgICAgICAgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZS5mb3JFYWNoVHJhbnNVbml0KCh0dSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHUudGFyZ2V0U3RhdGUoKSA9PT0gU1RBVEVfTkVXKSB7XHJcbiAgICAgICAgICAgICAgICBhbGxVbnRyYW5zbGF0ZWQucHVzaCh0dSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYWxsVW50cmFuc2xhdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG9BdXRvVHJhbnNsYXRlTm9uSUNVTWVzc2FnZXMoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUpXHJcbiAgICAgICAgOiBPYnNlcnZhYmxlPEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0PiB7XHJcbiAgICAgICAgY29uc3QgYWxsVW50cmFuc2xhdGVkOiBJVHJhbnNVbml0W10gPSB0aGlzLmFsbFVudHJhbnNsYXRlZFRVcyhsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlKTtcclxuICAgICAgICBjb25zdCBhbGxUcmFuc2xhdGFibGUgPSBhbGxVbnRyYW5zbGF0ZWQuZmlsdGVyKCh0dSkgPT4gaXNOdWxsT3JVbmRlZmluZWQodHUuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKS5nZXRJQ1VNZXNzYWdlKCkpKTtcclxuICAgICAgICBjb25zdCBhbGxNZXNzYWdlczogc3RyaW5nW10gPSBhbGxUcmFuc2xhdGFibGUubWFwKCh0dSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdHUuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKS5hc0Rpc3BsYXlTdHJpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvVHJhbnNsYXRlU2VydmljZS50cmFuc2xhdGVNdWx0aXBsZVN0cmluZ3MoYWxsTWVzc2FnZXMsIGZyb20sIHRvKVxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIC8vICM5NCBnb29nbGUgdHJhbnNsYXRlIG1pZ2h0IHJldHVybiAmIy4uIGVudGl0eSByZWZzLCB0aGF0IG11c3QgYmUgZGVjb2RlZFxyXG4gICAgICAgICAgICAgICAgbWFwKCh0cmFuc2xhdGlvbnM6IHN0cmluZ1tdKSA9PiB0cmFuc2xhdGlvbnMubWFwKGVuY29kZWRUcmFuc2xhdGlvbiA9PiBlbnRpdHlEZWNvZGVyTGliLmRlY29kZShlbmNvZGVkVHJhbnNsYXRpb24pKSksXHJcbiAgICAgICAgICAgICAgICBtYXAoKHRyYW5zbGF0aW9uczogc3RyaW5nW10pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN1bW1hcnkgPSBuZXcgQXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQoZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICAgICAgc3VtbWFyeS5zZXRJZ25vcmVkKGFsbFVudHJhbnNsYXRlZC5sZW5ndGggLSBhbGxUcmFuc2xhdGFibGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHJhbnNsYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHUgPSBhbGxUcmFuc2xhdGFibGVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRpb25UZXh0ID0gdHJhbnNsYXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuYXV0b1RyYW5zbGF0ZU5vbklDVVVuaXQodHUsIHRyYW5zbGF0aW9uVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS5hZGRTaW5nbGVSZXN1bHQodHUsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VtbWFyeTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFpbFN1bW1hcnkgPSBuZXcgQXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQoZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWxTdW1tYXJ5LnNldEVycm9yKGVyci5tZXNzYWdlLCBhbGxNZXNzYWdlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihmYWlsU3VtbWFyeSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvQXV0b1RyYW5zbGF0ZUlDVU1lc3NhZ2VzKGZyb206IHN0cmluZywgdG86IHN0cmluZywgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKVxyXG4gICAgICAgIDogT2JzZXJ2YWJsZTxBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydD5bXSB7XHJcbiAgICAgICAgY29uc3QgYWxsVW50cmFuc2xhdGVkOiBJVHJhbnNVbml0W10gPSB0aGlzLmFsbFVudHJhbnNsYXRlZFRVcyhsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlKTtcclxuICAgICAgICBjb25zdCBhbGxUcmFuc2xhdGFibGVJQ1UgPSBhbGxVbnRyYW5zbGF0ZWQuZmlsdGVyKCh0dSkgPT4gIWlzTnVsbE9yVW5kZWZpbmVkKHR1LnNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCkuZ2V0SUNVTWVzc2FnZSgpKSk7XHJcbiAgICAgICAgcmV0dXJuIGFsbFRyYW5zbGF0YWJsZUlDVS5tYXAoKHR1KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRvQXV0b1RyYW5zbGF0ZUlDVU1lc3NhZ2UoZnJvbSwgdG8sIHR1KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zbGF0ZSBzaW5nbGUgSUNVIE1lc3NhZ2VzLlxyXG4gICAgICogQHBhcmFtIGZyb20gZnJvbVxyXG4gICAgICogQHBhcmFtIHRvIHRvXHJcbiAgICAgKiBAcGFyYW0gdHUgdHJhbnN1bml0IHRvIHRyYW5zbGF0ZSAobXVzdCBjb250YWluIElDVSBNZXNzYWdlKVxyXG4gICAgICogQHJldHVybiBzdW1tYXJ5IHJlcG9ydFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRvQXV0b1RyYW5zbGF0ZUlDVU1lc3NhZ2UoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCB0dTogSVRyYW5zVW5pdCk6IE9ic2VydmFibGU8QXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQ+IHtcclxuICAgICAgICBjb25zdCBpY3VNZXNzYWdlOiBJSUNVTWVzc2FnZSA9IHR1LnNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCkuZ2V0SUNVTWVzc2FnZSgpO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBpY3VNZXNzYWdlLmdldENhdGVnb3JpZXMoKTtcclxuICAgICAgICAvLyBjaGVjayBmb3IgbmVzdGVkIElDVXMsIHdlIGRvIG5vdCBzdXBwb3J0IHRoYXRcclxuICAgICAgICBpZiAoY2F0ZWdvcmllcy5maW5kKChjYXRlZ29yeSkgPT4gIWlzTnVsbE9yVW5kZWZpbmVkKGNhdGVnb3J5LmdldE1lc3NhZ2VOb3JtYWxpemVkKCkuZ2V0SUNVTWVzc2FnZSgpKSkpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IG5ldyBBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydChmcm9tLCB0byk7XHJcbiAgICAgICAgICAgIHN1bW1hcnkuc2V0SWdub3JlZCgxKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKHN1bW1hcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhbGxNZXNzYWdlczogc3RyaW5nW10gPSBjYXRlZ29yaWVzLm1hcCgoY2F0ZWdvcnkpID0+IGNhdGVnb3J5LmdldE1lc3NhZ2VOb3JtYWxpemVkKCkuYXNEaXNwbGF5U3RyaW5nKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9UcmFuc2xhdGVTZXJ2aWNlLnRyYW5zbGF0ZU11bHRpcGxlU3RyaW5ncyhhbGxNZXNzYWdlcywgZnJvbSwgdG8pXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgLy8gIzk0IGdvb2dsZSB0cmFuc2xhdGUgbWlnaHQgcmV0dXJuICYjLi4gZW50aXR5IHJlZnMsIHRoYXQgbXVzdCBiZSBkZWNvZGVkXHJcbiAgICAgICAgICAgICAgICBtYXAoKHRyYW5zbGF0aW9uczogc3RyaW5nW10pID0+IHRyYW5zbGF0aW9ucy5tYXAoZW5jb2RlZFRyYW5zbGF0aW9uID0+IGVudGl0eURlY29kZXJMaWIuZGVjb2RlKGVuY29kZWRUcmFuc2xhdGlvbikpKSxcclxuICAgICAgICAgICAgICAgIG1hcCgodHJhbnNsYXRpb25zOiBzdHJpbmdbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bW1hcnkgPSBuZXcgQXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQoZnJvbSwgdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGljdVRyYW5zbGF0aW9uOiBJSUNVTWVzc2FnZVRyYW5zbGF0aW9uID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmFuc2xhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWN1VHJhbnNsYXRpb25bY2F0ZWdvcmllc1tpXS5nZXRDYXRlZ29yeSgpXSA9IHRyYW5zbGF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5hdXRvVHJhbnNsYXRlSUNVVW5pdCh0dSwgaWN1VHJhbnNsYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkuYWRkU2luZ2xlUmVzdWx0KHR1LCByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdW1tYXJ5O1xyXG4gICAgICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhaWxTdW1tYXJ5ID0gbmV3IEF1dG9UcmFuc2xhdGVTdW1tYXJ5UmVwb3J0KGZyb20sIHRvKTtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsU3VtbWFyeS5zZXRFcnJvcihlcnIubWVzc2FnZSwgYWxsTWVzc2FnZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YoZmFpbFN1bW1hcnkpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvVHJhbnNsYXRlTm9uSUNVVW5pdCh0dTogSVRyYW5zVW5pdCwgdHJhbnNsYXRlZE1lc3NhZ2U6IHN0cmluZyk6IEF1dG9UcmFuc2xhdGVSZXN1bHQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9UcmFuc2xhdGVVbml0KHR1LCB0dS5zb3VyY2VDb250ZW50Tm9ybWFsaXplZCgpLnRyYW5zbGF0ZSh0cmFuc2xhdGVkTWVzc2FnZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXV0b1RyYW5zbGF0ZUlDVVVuaXQodHU6IElUcmFuc1VuaXQsIHRyYW5zbGF0aW9uOiBJSUNVTWVzc2FnZVRyYW5zbGF0aW9uKTogQXV0b1RyYW5zbGF0ZVJlc3VsdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b1RyYW5zbGF0ZVVuaXQodHUsIHR1LnNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCkudHJhbnNsYXRlSUNVTWVzc2FnZSh0cmFuc2xhdGlvbikpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXV0b1RyYW5zbGF0ZVVuaXQodHU6IElUcmFuc1VuaXQsIHRyYW5zbGF0ZWRNZXNzYWdlOiBJTm9ybWFsaXplZE1lc3NhZ2UpOiBBdXRvVHJhbnNsYXRlUmVzdWx0IHtcclxuICAgICAgICBjb25zdCBlcnJvcnMgPSB0cmFuc2xhdGVkTWVzc2FnZS52YWxpZGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IHdhcm5pbmdzID0gdHJhbnNsYXRlZE1lc3NhZ2UudmFsaWRhdGVXYXJuaW5ncygpO1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoZXJyb3JzKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEF1dG9UcmFuc2xhdGVSZXN1bHQoZmFsc2UsICdlcnJvcnMgZGV0ZWN0ZWQsIG5vdCB0cmFuc2xhdGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghaXNOdWxsT3JVbmRlZmluZWQod2FybmluZ3MpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXV0b1RyYW5zbGF0ZVJlc3VsdChmYWxzZSwgJ3dhcm5pbmdzIGRldGVjdGVkLCBub3QgdHJhbnNsYXRlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHR1LnRyYW5zbGF0ZSh0cmFuc2xhdGVkTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXV0b1RyYW5zbGF0ZVJlc3VsdCh0cnVlLCBudWxsKTsgLy8gc3VjY2Vzc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=