/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 16.05.2017.
 * Mapping from normalized tag names to placeholder names.
 */
/*
copied from https://github.com/angular/angular/blob/master/packages/compiler/src/i18n/serializers/placeholder.ts
 */
/** @type {?} */
const TAG_TO_PLACEHOLDER_NAMES = {
    'A': 'LINK',
    'B': 'BOLD_TEXT',
    'BR': 'LINE_BREAK',
    'EM': 'EMPHASISED_TEXT',
    'H1': 'HEADING_LEVEL1',
    'H2': 'HEADING_LEVEL2',
    'H3': 'HEADING_LEVEL3',
    'H4': 'HEADING_LEVEL4',
    'H5': 'HEADING_LEVEL5',
    'H6': 'HEADING_LEVEL6',
    'HR': 'HORIZONTAL_RULE',
    'I': 'ITALIC_TEXT',
    'LI': 'LIST_ITEM',
    'LINK': 'MEDIA_LINK',
    'OL': 'ORDERED_LIST',
    'P': 'PARAGRAPH',
    'Q': 'QUOTATION',
    'S': 'STRIKETHROUGH_TEXT',
    'SMALL': 'SMALL_TEXT',
    'SUB': 'SUBSTRIPT',
    'SUP': 'SUPERSCRIPT',
    'TBODY': 'TABLE_BODY',
    'TD': 'TABLE_CELL',
    'TFOOT': 'TABLE_FOOTER',
    'TH': 'TABLE_HEADER_CELL',
    'THEAD': 'TABLE_HEADER',
    'TR': 'TABLE_ROW',
    'TT': 'MONOSPACED_TEXT',
    'U': 'UNDERLINED_TEXT',
    'UL': 'UNORDERED_LIST',
};
/**
 * HTML Tags (in uppercase) that are empty, they have no content, but do not need a close tag, e.g. <br>, <img>, <hr>.
 * @type {?}
 */
const VOID_TAGS = ['BR', 'HR', 'IMG', 'AREA', 'LINK', 'WBR'];
export class TagMapping {
    /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    getStartTagPlaceholderName(tag, id) {
        /** @type {?} */
        const upperTag = tag.toUpperCase();
        /** @type {?} */
        const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
        return `START_${baseName}` + this.counterString(id);
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    getCloseTagPlaceholderName(tag) {
        /** @type {?} */
        const upperTag = tag.toUpperCase();
        /** @type {?} */
        const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
        return `CLOSE_${baseName}`;
    }
    /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    getEmptyTagPlaceholderName(tag, id) {
        /** @type {?} */
        const upperTag = tag.toUpperCase();
        /** @type {?} */
        const baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || `TAG_${upperTag}`;
        return baseName + this.counterString(id);
    }
    /**
     * @param {?} tag
     * @return {?}
     */
    getCtypeForTag(tag) {
        switch (tag.toLowerCase()) {
            case 'br':
                return 'lb';
            case 'img':
                return 'image';
            default:
                return `x-${tag}`;
        }
    }
    /**
     * @param {?} placeholderName
     * @return {?}
     */
    getTagnameFromStartTagPlaceholderName(placeholderName) {
        if (placeholderName.startsWith('START_TAG_')) {
            return this.stripCounter(placeholderName.substring('START_TAG_'.length)).toLowerCase();
        }
        else if (placeholderName.startsWith('START_')) {
            /** @type {?} */
            const ph = this.stripCounter(placeholderName.substring('START_'.length));
            /** @type {?} */
            const matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            (key) => TAG_TO_PLACEHOLDER_NAMES[key] === ph));
            return matchKey ? matchKey.toLowerCase() : null;
        }
        return null;
    }
    /**
     * @param {?} placeholderName
     * @return {?}
     */
    getTagnameFromCloseTagPlaceholderName(placeholderName) {
        if (placeholderName.startsWith('CLOSE_TAG_')) {
            return this.stripCounter(placeholderName.substring('CLOSE_TAG_'.length)).toLowerCase();
        }
        else if (placeholderName.startsWith('CLOSE_')) {
            /** @type {?} */
            const ph = this.stripCounter(placeholderName.substring('CLOSE_'.length));
            /** @type {?} */
            const matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            (key) => TAG_TO_PLACEHOLDER_NAMES[key] === ph));
            return matchKey ? matchKey.toLowerCase() : null;
        }
        return null;
    }
    /**
     * Test, wether placeholder name stands for empty html tag.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    isEmptyTagPlaceholderName(placeholderName) {
        /** @type {?} */
        const ph = this.stripCounter(placeholderName);
        /** @type {?} */
        let matchKey;
        if (ph.startsWith('TAG_')) {
            matchKey = ph.substring(4).toUpperCase();
        }
        else {
            matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            (key) => TAG_TO_PLACEHOLDER_NAMES[key] === ph));
        }
        if (matchKey) {
            if (VOID_TAGS.indexOf(matchKey) >= 0) {
                return true;
            }
        }
        return false;
    }
    /**
     * tagname of empty tag placeholder.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    getTagnameFromEmptyTagPlaceholderName(placeholderName) {
        /** @type {?} */
        const ph = this.stripCounter(placeholderName);
        /** @type {?} */
        let matchKey;
        if (ph.startsWith('TAG_')) {
            matchKey = ph.substring(4).toUpperCase();
        }
        else {
            matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            (key) => TAG_TO_PLACEHOLDER_NAMES[key] === ph));
        }
        if (matchKey) {
            if (VOID_TAGS.indexOf(matchKey) >= 0) {
                return matchKey.toLowerCase();
            }
            else {
                return null;
            }
        }
        return null;
    }
    /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @private
     * @param {?} placeholderName placeholderName
     * @return {?} placeholderName without counter at end.
     */
    stripCounter(placeholderName) {
        if (placeholderName) {
            /** @type {?} */
            const re = /(.*)_[0-9]+$/;
            if (placeholderName.match(re)) {
                return placeholderName.replace(re, '$1');
            }
        }
        return placeholderName;
    }
    /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @private
     * @param {?} id id
     * @return {?} suffix for counter.
     */
    counterString(id) {
        if (id === 0) {
            return '';
        }
        else {
            return '_' + id.toString(10);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLW1hcHBpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3RhZy1tYXBwaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztNQVFNLHdCQUF3QixHQUEwQjtJQUNwRCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLElBQUksRUFBRSxZQUFZO0lBQ2xCLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixHQUFHLEVBQUUsYUFBYTtJQUNsQixJQUFJLEVBQUUsV0FBVztJQUNqQixNQUFNLEVBQUUsWUFBWTtJQUNwQixJQUFJLEVBQUUsY0FBYztJQUNwQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLElBQUksRUFBRSxZQUFZO0lBQ2xCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLElBQUksRUFBRSxtQkFBbUI7SUFDekIsT0FBTyxFQUFFLGNBQWM7SUFDdkIsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixHQUFHLEVBQUUsaUJBQWlCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7Q0FDekI7Ozs7O01BS0ssU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFB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RyxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUM7U0FDeEc7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFPTyxZQUFZLENBQUMsZUFBdUI7UUFDeEMsSUFBSSxlQUFlLEVBQUU7O2tCQUNYLEVBQUUsR0FBRyxjQUFjO1lBQ3pCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQzs7Ozs7Ozs7SUFRTyxhQUFhLENBQUMsRUFBVTtRQUM1QixJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDVixPQUFPLEVBQUUsQ0FBQztTQUNiO2FBQU07WUFDSCxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTYuMDUuMjAxNy5cclxuICogTWFwcGluZyBmcm9tIG5vcm1hbGl6ZWQgdGFnIG5hbWVzIHRvIHBsYWNlaG9sZGVyIG5hbWVzLlxyXG4gKi9cclxuXHJcbi8qXHJcbmNvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvY29tcGlsZXIvc3JjL2kxOG4vc2VyaWFsaXplcnMvcGxhY2Vob2xkZXIudHNcclxuICovXHJcbmNvbnN0IFRBR19UT19QTEFDRUhPTERFUl9OQU1FUzoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xyXG4gICAgJ0EnOiAnTElOSycsXHJcbiAgICAnQic6ICdCT0xEX1RFWFQnLFxyXG4gICAgJ0JSJzogJ0xJTkVfQlJFQUsnLFxyXG4gICAgJ0VNJzogJ0VNUEhBU0lTRURfVEVYVCcsXHJcbiAgICAnSDEnOiAnSEVBRElOR19MRVZFTDEnLFxyXG4gICAgJ0gyJzogJ0hFQURJTkdfTEVWRUwyJyxcclxuICAgICdIMyc6ICdIRUFESU5HX0xFVkVMMycsXHJcbiAgICAnSDQnOiAnSEVBRElOR19MRVZFTDQnLFxyXG4gICAgJ0g1JzogJ0hFQURJTkdfTEVWRUw1JyxcclxuICAgICdINic6ICdIRUFESU5HX0xFVkVMNicsXHJcbiAgICAnSFInOiAnSE9SSVpPTlRBTF9SVUxFJyxcclxuICAgICdJJzogJ0lUQUxJQ19URVhUJyxcclxuICAgICdMSSc6ICdMSVNUX0lURU0nLFxyXG4gICAgJ0xJTksnOiAnTUVESUFfTElOSycsXHJcbiAgICAnT0wnOiAnT1JERVJFRF9MSVNUJyxcclxuICAgICdQJzogJ1BBUkFHUkFQSCcsXHJcbiAgICAnUSc6ICdRVU9UQVRJT04nLFxyXG4gICAgJ1MnOiAnU1RSSUtFVEhST1VHSF9URVhUJyxcclxuICAgICdTTUFMTCc6ICdTTUFMTF9URVhUJyxcclxuICAgICdTVUInOiAnU1VCU1RSSVBUJyxcclxuICAgICdTVVAnOiAnU1VQRVJTQ1JJUFQnLFxyXG4gICAgJ1RCT0RZJzogJ1RBQkxFX0JPRFknLFxyXG4gICAgJ1REJzogJ1RBQkxFX0NFTEwnLFxyXG4gICAgJ1RGT09UJzogJ1RBQkxFX0ZPT1RFUicsXHJcbiAgICAnVEgnOiAnVEFCTEVfSEVBREVSX0NFTEwnLFxyXG4gICAgJ1RIRUFEJzogJ1RBQkxFX0hFQURFUicsXHJcbiAgICAnVFInOiAnVEFCTEVfUk9XJyxcclxuICAgICdUVCc6ICdNT05PU1BBQ0VEX1RFWFQnLFxyXG4gICAgJ1UnOiAnVU5ERVJMSU5FRF9URVhUJyxcclxuICAgICdVTCc6ICdVTk9SREVSRURfTElTVCcsXHJcbn07XHJcblxyXG4vKipcclxuICogSFRNTCBUYWdzIChpbiB1cHBlcmNhc2UpIHRoYXQgYXJlIGVtcHR5LCB0aGV5IGhhdmUgbm8gY29udGVudCwgYnV0IGRvIG5vdCBuZWVkIGEgY2xvc2UgdGFnLCBlLmcuIDxicj4sIDxpbWc+LCA8aHI+LlxyXG4gKi9cclxuY29uc3QgVk9JRF9UQUdTID0gWydCUicsICdIUicsICdJTUcnLCAnQVJFQScsICdMSU5LJywgJ1dCUiddO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRhZ01hcHBpbmcge1xyXG5cclxuICAgIHB1YmxpYyBnZXRTdGFydFRhZ1BsYWNlaG9sZGVyTmFtZSh0YWc6IHN0cmluZywgaWQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdXBwZXJUYWcgPSB0YWcudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBjb25zdCBiYXNlTmFtZSA9IFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1t1cHBlclRhZ10gfHwgYFRBR18ke3VwcGVyVGFnfWA7XHJcbiAgICAgICAgcmV0dXJuIGBTVEFSVF8ke2Jhc2VOYW1lfWAgKyB0aGlzLmNvdW50ZXJTdHJpbmcoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDbG9zZVRhZ1BsYWNlaG9sZGVyTmFtZSh0YWc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdXBwZXJUYWcgPSB0YWcudG9VcHBlckNhc2UoKTtcclxuICAgICAgICBjb25zdCBiYXNlTmFtZSA9IFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1t1cHBlclRhZ10gfHwgYFRBR18ke3VwcGVyVGFnfWA7XHJcbiAgICAgICAgcmV0dXJuIGBDTE9TRV8ke2Jhc2VOYW1lfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKHRhZzogc3RyaW5nLCBpZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB1cHBlclRhZyA9IHRhZy50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IGJhc2VOYW1lID0gIFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1t1cHBlclRhZ10gfHwgYFRBR18ke3VwcGVyVGFnfWA7XHJcbiAgICAgICAgcmV0dXJuIGJhc2VOYW1lICsgdGhpcy5jb3VudGVyU3RyaW5nKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3R5cGVGb3JUYWcodGFnOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodGFnLnRvTG93ZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgY2FzZSAnYnInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdsYic7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ltZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlJztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBgeC0ke3RhZ31gO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VGFnbmFtZUZyb21TdGFydFRhZ1BsYWNlaG9sZGVyTmFtZShwbGFjZWhvbGRlck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyTmFtZS5zdGFydHNXaXRoKCdTVEFSVF9UQUdfJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaXBDb3VudGVyKHBsYWNlaG9sZGVyTmFtZS5zdWJzdHJpbmcoJ1NUQVJUX1RBR18nLmxlbmd0aCkpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZWhvbGRlck5hbWUuc3RhcnRzV2l0aCgnU1RBUlRfJykpIHtcclxuICAgICAgICAgICAgY29uc3QgcGggPSB0aGlzLnN0cmlwQ291bnRlcihwbGFjZWhvbGRlck5hbWUuc3Vic3RyaW5nKCdTVEFSVF8nLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaEtleSA9IE9iamVjdC5rZXlzKFRBR19UT19QTEFDRUhPTERFUl9OQU1FUykuZmluZCgoa2V5KSA9PiBUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVNba2V5XSA9PT0gcGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hLZXkgPyBtYXRjaEtleS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFRhZ25hbWVGcm9tQ2xvc2VUYWdQbGFjZWhvbGRlck5hbWUocGxhY2Vob2xkZXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChwbGFjZWhvbGRlck5hbWUuc3RhcnRzV2l0aCgnQ0xPU0VfVEFHXycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmlwQ291bnRlcihwbGFjZWhvbGRlck5hbWUuc3Vic3RyaW5nKCdDTE9TRV9UQUdfJy5sZW5ndGgpKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGxhY2Vob2xkZXJOYW1lLnN0YXJ0c1dpdGgoJ0NMT1NFXycpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBoID0gdGhpcy5zdHJpcENvdW50ZXIocGxhY2Vob2xkZXJOYW1lLnN1YnN0cmluZygnQ0xPU0VfJy5sZW5ndGgpKTtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hLZXkgPSBPYmplY3Qua2V5cyhUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVMpLmZpbmQoKGtleSkgPT4gVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW2tleV0gPT09IHBoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoS2V5ID8gbWF0Y2hLZXkudG9Mb3dlckNhc2UoKSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGVzdCwgd2V0aGVyIHBsYWNlaG9sZGVyIG5hbWUgc3RhbmRzIGZvciBlbXB0eSBodG1sIHRhZy5cclxuICAgICAqIEBwYXJhbSBwbGFjZWhvbGRlck5hbWUgY2FuIGJlIFRBR188bmFtZT4gb3IganVzdCA8bmFtZT5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRW1wdHlUYWdQbGFjZWhvbGRlck5hbWUocGxhY2Vob2xkZXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBwaCA9IHRoaXMuc3RyaXBDb3VudGVyKHBsYWNlaG9sZGVyTmFtZSk7XHJcbiAgICAgICAgbGV0IG1hdGNoS2V5O1xyXG4gICAgICAgIGlmIChwaC5zdGFydHNXaXRoKCdUQUdfJykpIHtcclxuICAgICAgICAgICAgbWF0Y2hLZXkgPSBwaC5zdWJzdHJpbmcoNCkudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXRjaEtleSA9IE9iamVjdC5rZXlzKFRBR19UT19QTEFDRUhPTERFUl9OQU1FUykuZmluZCgoa2V5KSA9PiBUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVNba2V5XSA9PT0gcGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWF0Y2hLZXkpIHtcclxuICAgICAgICAgICAgaWYgKFZPSURfVEFHUy5pbmRleE9mKG1hdGNoS2V5KSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YWduYW1lIG9mIGVtcHR5IHRhZyBwbGFjZWhvbGRlci5cclxuICAgICAqIEBwYXJhbSBwbGFjZWhvbGRlck5hbWUgY2FuIGJlIFRBR188bmFtZT4gb3IganVzdCA8bmFtZT5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFRhZ25hbWVGcm9tRW1wdHlUYWdQbGFjZWhvbGRlck5hbWUocGxhY2Vob2xkZXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHBoID0gdGhpcy5zdHJpcENvdW50ZXIocGxhY2Vob2xkZXJOYW1lKTtcclxuICAgICAgICBsZXQgbWF0Y2hLZXk7XHJcbiAgICAgICAgaWYgKHBoLnN0YXJ0c1dpdGgoJ1RBR18nKSkge1xyXG4gICAgICAgICAgICBtYXRjaEtleSA9IHBoLnN1YnN0cmluZyg0KS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdGNoS2V5ID0gT2JqZWN0LmtleXMoVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTKS5maW5kKChrZXkpID0+IFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1trZXldID09PSBwaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXRjaEtleSkge1xyXG4gICAgICAgICAgICBpZiAoVk9JRF9UQUdTLmluZGV4T2YobWF0Y2hLZXkpID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaEtleS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBwbGFjZWhvbGRlciBlbmRzIHdpdGggX1swLTldKywgc3RyaXAgdGhhdCBudW1iZXIuXHJcbiAgICAgKiBAcGFyYW0gcGxhY2Vob2xkZXJOYW1lIHBsYWNlaG9sZGVyTmFtZVxyXG4gICAgICogQHJldHVybiBwbGFjZWhvbGRlck5hbWUgd2l0aG91dCBjb3VudGVyIGF0IGVuZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdHJpcENvdW50ZXIocGxhY2Vob2xkZXJOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChwbGFjZWhvbGRlck5hbWUpIHtcclxuICAgICAgICAgICAgY29uc3QgcmUgPSAvKC4qKV9bMC05XSskLztcclxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyTmFtZS5tYXRjaChyZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwbGFjZWhvbGRlck5hbWUucmVwbGFjZShyZSwgJyQxJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0cmluZyBzdWZmaXggZm9yIGNvdW50ZXIuXHJcbiAgICAgKiBJZiBjb3VudGVyIGlzIDAsIGl0IGlzIGVtcHR5LCBvdGhlcndpc2UgXzxpZD4uXHJcbiAgICAgKiBAcGFyYW0gaWQgaWRcclxuICAgICAqIEByZXR1cm4gc3VmZml4IGZvciBjb3VudGVyLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvdW50ZXJTdHJpbmcoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpZCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICdfJyArIGlkLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19