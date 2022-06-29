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
var TAG_TO_PLACEHOLDER_NAMES = {
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
var VOID_TAGS = ['BR', 'HR', 'IMG', 'AREA', 'LINK', 'WBR'];
var TagMapping = /** @class */ (function () {
    function TagMapping() {
    }
    /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    TagMapping.prototype.getStartTagPlaceholderName = /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    function (tag, id) {
        /** @type {?} */
        var upperTag = tag.toUpperCase();
        /** @type {?} */
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        return "START_" + baseName + this.counterString(id);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    TagMapping.prototype.getCloseTagPlaceholderName = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        /** @type {?} */
        var upperTag = tag.toUpperCase();
        /** @type {?} */
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        return "CLOSE_" + baseName;
    };
    /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    TagMapping.prototype.getEmptyTagPlaceholderName = /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    function (tag, id) {
        /** @type {?} */
        var upperTag = tag.toUpperCase();
        /** @type {?} */
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        return baseName + this.counterString(id);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    TagMapping.prototype.getCtypeForTag = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        switch (tag.toLowerCase()) {
            case 'br':
                return 'lb';
            case 'img':
                return 'image';
            default:
                return "x-" + tag;
        }
    };
    /**
     * @param {?} placeholderName
     * @return {?}
     */
    TagMapping.prototype.getTagnameFromStartTagPlaceholderName = /**
     * @param {?} placeholderName
     * @return {?}
     */
    function (placeholderName) {
        if (placeholderName.startsWith('START_TAG_')) {
            return this.stripCounter(placeholderName.substring('START_TAG_'.length)).toLowerCase();
        }
        else if (placeholderName.startsWith('START_')) {
            /** @type {?} */
            var ph_1 = this.stripCounter(placeholderName.substring('START_'.length));
            /** @type {?} */
            var matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph_1; }));
            return matchKey ? matchKey.toLowerCase() : null;
        }
        return null;
    };
    /**
     * @param {?} placeholderName
     * @return {?}
     */
    TagMapping.prototype.getTagnameFromCloseTagPlaceholderName = /**
     * @param {?} placeholderName
     * @return {?}
     */
    function (placeholderName) {
        if (placeholderName.startsWith('CLOSE_TAG_')) {
            return this.stripCounter(placeholderName.substring('CLOSE_TAG_'.length)).toLowerCase();
        }
        else if (placeholderName.startsWith('CLOSE_')) {
            /** @type {?} */
            var ph_2 = this.stripCounter(placeholderName.substring('CLOSE_'.length));
            /** @type {?} */
            var matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph_2; }));
            return matchKey ? matchKey.toLowerCase() : null;
        }
        return null;
    };
    /**
     * Test, wether placeholder name stands for empty html tag.
     * @param placeholderName can be TAG_<name> or just <name>
     */
    /**
     * Test, wether placeholder name stands for empty html tag.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    TagMapping.prototype.isEmptyTagPlaceholderName = /**
     * Test, wether placeholder name stands for empty html tag.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    function (placeholderName) {
        /** @type {?} */
        var ph = this.stripCounter(placeholderName);
        /** @type {?} */
        var matchKey;
        if (ph.startsWith('TAG_')) {
            matchKey = ph.substring(4).toUpperCase();
        }
        else {
            matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph; }));
        }
        if (matchKey) {
            if (VOID_TAGS.indexOf(matchKey) >= 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * tagname of empty tag placeholder.
     * @param placeholderName can be TAG_<name> or just <name>
     */
    /**
     * tagname of empty tag placeholder.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    TagMapping.prototype.getTagnameFromEmptyTagPlaceholderName = /**
     * tagname of empty tag placeholder.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    function (placeholderName) {
        /** @type {?} */
        var ph = this.stripCounter(placeholderName);
        /** @type {?} */
        var matchKey;
        if (ph.startsWith('TAG_')) {
            matchKey = ph.substring(4).toUpperCase();
        }
        else {
            matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph; }));
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
    };
    /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @param placeholderName placeholderName
     * @return placeholderName without counter at end.
     */
    /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @private
     * @param {?} placeholderName placeholderName
     * @return {?} placeholderName without counter at end.
     */
    TagMapping.prototype.stripCounter = /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @private
     * @param {?} placeholderName placeholderName
     * @return {?} placeholderName without counter at end.
     */
    function (placeholderName) {
        if (placeholderName) {
            /** @type {?} */
            var re = /(.*)_[0-9]+$/;
            if (placeholderName.match(re)) {
                return placeholderName.replace(re, '$1');
            }
        }
        return placeholderName;
    };
    /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @param id id
     * @return suffix for counter.
     */
    /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @private
     * @param {?} id id
     * @return {?} suffix for counter.
     */
    TagMapping.prototype.counterString = /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @private
     * @param {?} id id
     * @return {?} suffix for counter.
     */
    function (id) {
        if (id === 0) {
            return '';
        }
        else {
            return '_' + id.toString(10);
        }
    };
    return TagMapping;
}());
export { TagMapping };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLW1hcHBpbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3RhZy1tYXBwaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFNLHdCQUF3QixHQUEwQjtJQUNwRCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLElBQUksRUFBRSxZQUFZO0lBQ2xCLElBQUksRUFBRSxpQkFBaUI7SUFDdkIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixJQUFJLEVBQUUsZ0JBQWdCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7SUFDdEIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixHQUFHLEVBQUUsYUFBYTtJQUNsQixJQUFJLEVBQUUsV0FBVztJQUNqQixNQUFNLEVBQUUsWUFBWTtJQUNwQixJQUFJLEVBQUUsY0FBYztJQUNwQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLEtBQUssRUFBRSxhQUFhO0lBQ3BCLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLElBQUksRUFBRSxZQUFZO0lBQ2xCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLElBQUksRUFBRSxtQkFBbUI7SUFDekIsT0FBTyxFQUFFLGNBQWM7SUFDdkIsSUFBSSxFQUFFLFdBQVc7SUFDakIsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixHQUFHLEVBQUUsaUJBQWlCO0lBQ3RCLElBQUksRUFBRSxnQkFBZ0I7Q0FDekI7Ozs7O0lBS0ssU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFB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SCxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUk7Ozs7WUFBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBcEMsQ0FBb0MsRUFBQyxDQUFDO1NBQ3hHO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNqQztpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNLLGlDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsZUFBdUI7UUFDeEMsSUFBSSxlQUFlLEVBQUU7O2dCQUNYLEVBQUUsR0FBRyxjQUFjO1lBQ3pCLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNLLGtDQUFhOzs7Ozs7O0lBQXJCLFVBQXNCLEVBQVU7UUFDNUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1YsT0FBTyxFQUFFLENBQUM7U0FDYjthQUFNO1lBQ0gsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUEzSEQsSUEySEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAxNi4wNS4yMDE3LlxyXG4gKiBNYXBwaW5nIGZyb20gbm9ybWFsaXplZCB0YWcgbmFtZXMgdG8gcGxhY2Vob2xkZXIgbmFtZXMuXHJcbiAqL1xyXG5cclxuLypcclxuY29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9jb21waWxlci9zcmMvaTE4bi9zZXJpYWxpemVycy9wbGFjZWhvbGRlci50c1xyXG4gKi9cclxuY29uc3QgVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTOiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7XHJcbiAgICAnQSc6ICdMSU5LJyxcclxuICAgICdCJzogJ0JPTERfVEVYVCcsXHJcbiAgICAnQlInOiAnTElORV9CUkVBSycsXHJcbiAgICAnRU0nOiAnRU1QSEFTSVNFRF9URVhUJyxcclxuICAgICdIMSc6ICdIRUFESU5HX0xFVkVMMScsXHJcbiAgICAnSDInOiAnSEVBRElOR19MRVZFTDInLFxyXG4gICAgJ0gzJzogJ0hFQURJTkdfTEVWRUwzJyxcclxuICAgICdINCc6ICdIRUFESU5HX0xFVkVMNCcsXHJcbiAgICAnSDUnOiAnSEVBRElOR19MRVZFTDUnLFxyXG4gICAgJ0g2JzogJ0hFQURJTkdfTEVWRUw2JyxcclxuICAgICdIUic6ICdIT1JJWk9OVEFMX1JVTEUnLFxyXG4gICAgJ0knOiAnSVRBTElDX1RFWFQnLFxyXG4gICAgJ0xJJzogJ0xJU1RfSVRFTScsXHJcbiAgICAnTElOSyc6ICdNRURJQV9MSU5LJyxcclxuICAgICdPTCc6ICdPUkRFUkVEX0xJU1QnLFxyXG4gICAgJ1AnOiAnUEFSQUdSQVBIJyxcclxuICAgICdRJzogJ1FVT1RBVElPTicsXHJcbiAgICAnUyc6ICdTVFJJS0VUSFJPVUdIX1RFWFQnLFxyXG4gICAgJ1NNQUxMJzogJ1NNQUxMX1RFWFQnLFxyXG4gICAgJ1NVQic6ICdTVUJTVFJJUFQnLFxyXG4gICAgJ1NVUCc6ICdTVVBFUlNDUklQVCcsXHJcbiAgICAnVEJPRFknOiAnVEFCTEVfQk9EWScsXHJcbiAgICAnVEQnOiAnVEFCTEVfQ0VMTCcsXHJcbiAgICAnVEZPT1QnOiAnVEFCTEVfRk9PVEVSJyxcclxuICAgICdUSCc6ICdUQUJMRV9IRUFERVJfQ0VMTCcsXHJcbiAgICAnVEhFQUQnOiAnVEFCTEVfSEVBREVSJyxcclxuICAgICdUUic6ICdUQUJMRV9ST1cnLFxyXG4gICAgJ1RUJzogJ01PTk9TUEFDRURfVEVYVCcsXHJcbiAgICAnVSc6ICdVTkRFUkxJTkVEX1RFWFQnLFxyXG4gICAgJ1VMJzogJ1VOT1JERVJFRF9MSVNUJyxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIVE1MIFRhZ3MgKGluIHVwcGVyY2FzZSkgdGhhdCBhcmUgZW1wdHksIHRoZXkgaGF2ZSBubyBjb250ZW50LCBidXQgZG8gbm90IG5lZWQgYSBjbG9zZSB0YWcsIGUuZy4gPGJyPiwgPGltZz4sIDxocj4uXHJcbiAqL1xyXG5jb25zdCBWT0lEX1RBR1MgPSBbJ0JSJywgJ0hSJywgJ0lNRycsICdBUkVBJywgJ0xJTksnLCAnV0JSJ107XHJcblxyXG5leHBvcnQgY2xhc3MgVGFnTWFwcGluZyB7XHJcblxyXG4gICAgcHVibGljIGdldFN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKHRhZzogc3RyaW5nLCBpZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB1cHBlclRhZyA9IHRhZy50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IGJhc2VOYW1lID0gVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW3VwcGVyVGFnXSB8fCBgVEFHXyR7dXBwZXJUYWd9YDtcclxuICAgICAgICByZXR1cm4gYFNUQVJUXyR7YmFzZU5hbWV9YCArIHRoaXMuY291bnRlclN0cmluZyhpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENsb3NlVGFnUGxhY2Vob2xkZXJOYW1lKHRhZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB1cHBlclRhZyA9IHRhZy50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IGJhc2VOYW1lID0gVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW3VwcGVyVGFnXSB8fCBgVEFHXyR7dXBwZXJUYWd9YDtcclxuICAgICAgICByZXR1cm4gYENMT1NFXyR7YmFzZU5hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RW1wdHlUYWdQbGFjZWhvbGRlck5hbWUodGFnOiBzdHJpbmcsIGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHVwcGVyVGFnID0gdGFnLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgYmFzZU5hbWUgPSAgVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW3VwcGVyVGFnXSB8fCBgVEFHXyR7dXBwZXJUYWd9YDtcclxuICAgICAgICByZXR1cm4gYmFzZU5hbWUgKyB0aGlzLmNvdW50ZXJTdHJpbmcoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDdHlwZUZvclRhZyh0YWc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0YWcudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlICdicic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xiJztcclxuICAgICAgICAgICAgY2FzZSAnaW1nJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaW1hZ2UnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGB4LSR7dGFnfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRUYWduYW1lRnJvbVN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKHBsYWNlaG9sZGVyTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAocGxhY2Vob2xkZXJOYW1lLnN0YXJ0c1dpdGgoJ1NUQVJUX1RBR18nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpcENvdW50ZXIocGxhY2Vob2xkZXJOYW1lLnN1YnN0cmluZygnU1RBUlRfVEFHXycubGVuZ3RoKSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlaG9sZGVyTmFtZS5zdGFydHNXaXRoKCdTVEFSVF8nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwaCA9IHRoaXMuc3RyaXBDb3VudGVyKHBsYWNlaG9sZGVyTmFtZS5zdWJzdHJpbmcoJ1NUQVJUXycubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoS2V5ID0gT2JqZWN0LmtleXMoVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTKS5maW5kKChrZXkpID0+IFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1trZXldID09PSBwaCk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaEtleSA/IG1hdGNoS2V5LnRvTG93ZXJDYXNlKCkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VGFnbmFtZUZyb21DbG9zZVRhZ1BsYWNlaG9sZGVyTmFtZShwbGFjZWhvbGRlck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyTmFtZS5zdGFydHNXaXRoKCdDTE9TRV9UQUdfJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaXBDb3VudGVyKHBsYWNlaG9sZGVyTmFtZS5zdWJzdHJpbmcoJ0NMT1NFX1RBR18nLmxlbmd0aCkpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChwbGFjZWhvbGRlck5hbWUuc3RhcnRzV2l0aCgnQ0xPU0VfJykpIHtcclxuICAgICAgICAgICAgY29uc3QgcGggPSB0aGlzLnN0cmlwQ291bnRlcihwbGFjZWhvbGRlck5hbWUuc3Vic3RyaW5nKCdDTE9TRV8nLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaEtleSA9IE9iamVjdC5rZXlzKFRBR19UT19QTEFDRUhPTERFUl9OQU1FUykuZmluZCgoa2V5KSA9PiBUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVNba2V5XSA9PT0gcGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hLZXkgPyBtYXRjaEtleS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgcGxhY2Vob2xkZXIgbmFtZSBzdGFuZHMgZm9yIGVtcHR5IGh0bWwgdGFnLlxyXG4gICAgICogQHBhcmFtIHBsYWNlaG9sZGVyTmFtZSBjYW4gYmUgVEFHXzxuYW1lPiBvciBqdXN0IDxuYW1lPlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShwbGFjZWhvbGRlck5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHBoID0gdGhpcy5zdHJpcENvdW50ZXIocGxhY2Vob2xkZXJOYW1lKTtcclxuICAgICAgICBsZXQgbWF0Y2hLZXk7XHJcbiAgICAgICAgaWYgKHBoLnN0YXJ0c1dpdGgoJ1RBR18nKSkge1xyXG4gICAgICAgICAgICBtYXRjaEtleSA9IHBoLnN1YnN0cmluZyg0KS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdGNoS2V5ID0gT2JqZWN0LmtleXMoVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTKS5maW5kKChrZXkpID0+IFRBR19UT19QTEFDRUhPTERFUl9OQU1FU1trZXldID09PSBwaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXRjaEtleSkge1xyXG4gICAgICAgICAgICBpZiAoVk9JRF9UQUdTLmluZGV4T2YobWF0Y2hLZXkpID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRhZ25hbWUgb2YgZW1wdHkgdGFnIHBsYWNlaG9sZGVyLlxyXG4gICAgICogQHBhcmFtIHBsYWNlaG9sZGVyTmFtZSBjYW4gYmUgVEFHXzxuYW1lPiBvciBqdXN0IDxuYW1lPlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VGFnbmFtZUZyb21FbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShwbGFjZWhvbGRlck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgcGggPSB0aGlzLnN0cmlwQ291bnRlcihwbGFjZWhvbGRlck5hbWUpO1xyXG4gICAgICAgIGxldCBtYXRjaEtleTtcclxuICAgICAgICBpZiAocGguc3RhcnRzV2l0aCgnVEFHXycpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoS2V5ID0gcGguc3Vic3RyaW5nKDQpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWF0Y2hLZXkgPSBPYmplY3Qua2V5cyhUQUdfVE9fUExBQ0VIT0xERVJfTkFNRVMpLmZpbmQoKGtleSkgPT4gVEFHX1RPX1BMQUNFSE9MREVSX05BTUVTW2tleV0gPT09IHBoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hdGNoS2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChWT0lEX1RBR1MuaW5kZXhPZihtYXRjaEtleSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoS2V5LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHBsYWNlaG9sZGVyIGVuZHMgd2l0aCBfWzAtOV0rLCBzdHJpcCB0aGF0IG51bWJlci5cclxuICAgICAqIEBwYXJhbSBwbGFjZWhvbGRlck5hbWUgcGxhY2Vob2xkZXJOYW1lXHJcbiAgICAgKiBAcmV0dXJuIHBsYWNlaG9sZGVyTmFtZSB3aXRob3V0IGNvdW50ZXIgYXQgZW5kLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0cmlwQ291bnRlcihwbGFjZWhvbGRlck5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyTmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCByZSA9IC8oLiopX1swLTldKyQvO1xyXG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJOYW1lLm1hdGNoKHJlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyTmFtZS5yZXBsYWNlKHJlLCAnJDEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXJOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyaW5nIHN1ZmZpeCBmb3IgY291bnRlci5cclxuICAgICAqIElmIGNvdW50ZXIgaXMgMCwgaXQgaXMgZW1wdHksIG90aGVyd2lzZSBfPGlkPi5cclxuICAgICAqIEBwYXJhbSBpZCBpZFxyXG4gICAgICogQHJldHVybiBzdWZmaXggZm9yIGNvdW50ZXIuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY291bnRlclN0cmluZyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlkID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ18nICsgaWQudG9TdHJpbmcoMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=