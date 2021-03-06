/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 15.03.2017.
 * Interfaces for command line call and config file content.
 */
/**
 * Options that can be passed as program arguments.
 * @record
 */
export function ProgramOptions() { }
if (false) {
    /** @type {?|undefined} */
    ProgramOptions.prototype.quiet;
    /** @type {?|undefined} */
    ProgramOptions.prototype.verbose;
    /** @type {?|undefined} */
    ProgramOptions.prototype.profilePath;
    /** @type {?|undefined} */
    ProgramOptions.prototype.languages;
}
/**
 * Definition of the possible values used in the config file
 * @record
 */
export function IConfigFile() { }
if (false) {
    /** @type {?|undefined} */
    IConfigFile.prototype.xliffmergeOptions;
}
/**
 * @record
 */
export function IXliffMergeOptions() { }
if (false) {
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.quiet;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.verbose;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.allowIdChange;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.defaultLanguage;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.languages;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.srcDir;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.i18nBaseFile;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.i18nFile;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.i18nFormat;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.encoding;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.genDir;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.angularCompilerOptions;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.removeUnusedIds;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.supportNgxTranslate;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.ngxTranslateExtractionPattern;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.useSourceAsTarget;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.targetPraefix;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.targetSuffix;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.beautifyOutput;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.preserveOrder;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.autotranslate;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.apikey;
    /** @type {?|undefined} */
    IXliffMergeOptions.prototype.apikeyfile;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaS14bGlmZi1tZXJnZS1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQvIiwic291cmNlcyI6WyJ4bGlmZm1lcmdlL2kteGxpZmYtbWVyZ2Utb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxvQ0FLQzs7O0lBSkcsK0JBQWdCOztJQUNoQixpQ0FBa0I7O0lBQ2xCLHFDQUFxQjs7SUFDckIsbUNBQXFCOzs7Ozs7QUFNekIsaUNBR0M7OztJQURHLHdDQUF1Qzs7Ozs7QUFHM0Msd0NBOEJDOzs7SUE3QkcsbUNBQWdCOztJQUNoQixxQ0FBa0I7O0lBQ2xCLDJDQUF3Qjs7SUFDeEIsNkNBQXlCOztJQUN6Qix1Q0FBcUI7O0lBQ3JCLG9DQUFnQjs7SUFDaEIsMENBQXNCOztJQUN0QixzQ0FBa0I7O0lBQ2xCLHdDQUFvQjs7SUFDcEIsc0NBQWtCOztJQUNsQixvQ0FBZ0I7O0lBQ2hCLG9EQUVFOztJQUNGLDZDQUEwQjs7SUFDMUIsaURBQThCOztJQUM5QiwyREFBdUM7O0lBRXZDLCtDQUE0Qjs7SUFDNUIsMkNBQXVCOztJQUN2QiwwQ0FBc0I7O0lBQ3RCLDRDQUF5Qjs7SUFDekIsMkNBQXdCOztJQUN4QiwyQ0FBaUM7O0lBSWpDLG9DQUFnQjs7SUFDaEIsd0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTUuMDMuMjAxNy5cclxuICogSW50ZXJmYWNlcyBmb3IgY29tbWFuZCBsaW5lIGNhbGwgYW5kIGNvbmZpZyBmaWxlIGNvbnRlbnQuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIE9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIGFzIHByb2dyYW0gYXJndW1lbnRzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmFtT3B0aW9ucyB7XHJcbiAgICBxdWlldD86IGJvb2xlYW47XHJcbiAgICB2ZXJib3NlPzogYm9vbGVhbjtcclxuICAgIHByb2ZpbGVQYXRoPzogc3RyaW5nO1xyXG4gICAgbGFuZ3VhZ2VzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEZWZpbml0aW9uIG9mIHRoZSBwb3NzaWJsZSB2YWx1ZXMgdXNlZCBpbiB0aGUgY29uZmlnIGZpbGVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZ0ZpbGUge1xyXG4gICAgLy8gY29udGVudCBpcyB3cmFwcGVkIGluIFwieGxpZmZtZXJnZU9wdGlvbnNcIiB0byBhbGxvdyB0byB1c2UgaXQgZW1iZWRkZWQgaW4gYW5vdGhlciBjb25maWcgZmlsZSAoZS5nLiB0c2NvbmZpZy5qc29uKVxyXG4gICAgeGxpZmZtZXJnZU9wdGlvbnM/OiBJWGxpZmZNZXJnZU9wdGlvbnM7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVhsaWZmTWVyZ2VPcHRpb25zIHtcclxuICAgIHF1aWV0PzogYm9vbGVhbjsgICAvLyBGbGFnIHRvIG9ubHkgb3V0cHV0IGVycm9yIG1lc3NhZ2VzXHJcbiAgICB2ZXJib3NlPzogYm9vbGVhbjsgICAvLyBGbGFnIHRvIGdlbmVyYXRlIGRlYnVnIG91dHB1dCBtZXNzYWdlc1xyXG4gICAgYWxsb3dJZENoYW5nZT86IGJvb2xlYW47IC8vIFRyeSB0byBmaW5kIHRyYW5zbGF0aW9uIGV2ZW4gd2hlbiBpZCBpcyBtaXNzaW5nXHJcbiAgICBkZWZhdWx0TGFuZ3VhZ2U/OiBzdHJpbmc7ICAgIC8vIHRoZSBkZWZhdWx0IGxhbmd1YWdlICh0aGUgbGFuZ3VhZ2UsIHdoaWNoIGlzIHVzZWQgaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlcylcclxuICAgIGxhbmd1YWdlcz86IHN0cmluZ1tdOyAgIC8vIGFsbCBsYW5ndWFnZXMsIGlmIG5vdCBzcGVjaWZpZWQgdmlhIGNvbW1hbmRsaW5lXHJcbiAgICBzcmNEaXI/OiBzdHJpbmc7ICAgIC8vIERpcmVjdG9yeSwgd2hlcmUgdGhlIG1hc3RlciBmaWxlIGlzXHJcbiAgICBpMThuQmFzZUZpbGU/OiBzdHJpbmc7IC8vIEJhc2VuYW1lIGZvciBpMThuIGlucHV0IGFuZCBvdXRwdXQsIGRlZmF1bHQgaXMgJ21lc3NhZ2VzJ1xyXG4gICAgaTE4bkZpbGU/OiBzdHJpbmc7ICAvLyBtYXN0ZXIgZmlsZSwgaWYgbm90IGFic29sdXRlLCBpdCBpcyByZWxhdGl2ZSB0byBzcmNEaXJcclxuICAgIGkxOG5Gb3JtYXQ/OiBzdHJpbmc7IC8vIHhsZiBvciB4bWJcclxuICAgIGVuY29kaW5nPzogc3RyaW5nOyAgLy8gZW5jb2RpbmcgdG8gd3JpdGUgeG1sXHJcbiAgICBnZW5EaXI/OiBzdHJpbmc7ICAgIC8vIGRpcmVjdG9yeSwgd2hlcmUgdGhlIGZpbGVzIGFyZSB3cml0dGVuIHRvXHJcbiAgICBhbmd1bGFyQ29tcGlsZXJPcHRpb25zPzoge1xyXG4gICAgICAgIGdlbkRpcj86IHN0cmluZzsgICAgLy8gc2FtZSBhcyBnZW5EaXIsIGp1c3QgdG8gYmUgY29tcGF0aWJsZSB3aXRoIG5nLXhpMThuXHJcbiAgICB9O1xyXG4gICAgcmVtb3ZlVW51c2VkSWRzPzogYm9vbGVhbjtcclxuICAgIHN1cHBvcnROZ3hUcmFuc2xhdGU/OiBib29sZWFuOyAgLy8gRmxhZywgd2V0aGVyIG91dHB1dCBmb3Igbmd4LXRyYW5zbGF0ZSBzaG91bGQgYmUgZ2VuZXJhdGVkXHJcbiAgICBuZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybj86IHN0cmluZzsgLy8gQ3JpdGVyaWEsIHdoYXQgbWVzc2FnZXMgc2hvdWxkIGJlIHVzZWQgZm9yIG5neC10cmFuc2xhdGUgb3V0cHV0XHJcbiAgICAgIC8vIHNlZSBkZXRhaWxzIG9uIHRoZSBkb2N1bWVudGF0aW9uIHBhZ2UgaHR0cHM6Ly9naXRodWIuY29tL21hcnRpbnJvb2Ivbmd4LWkxOG5zdXBwb3J0L3dpa2kvbmd4LXRyYW5zbGF0ZS11c2FnZVxyXG4gICAgdXNlU291cmNlQXNUYXJnZXQ/OiBib29sZWFuOyAvLyBGbGFnLCB3aGV0aGVyIHNvdXJjZSBtdXN0IGJlIHVzZWQgYXMgdGFyZ2V0IGZvciBuZXcgdHJhbnMtdW5pdHNcclxuICAgIHRhcmdldFByYWVmaXg/OiBzdHJpbmc7IC8vIFByYWVmaXggZm9yIHRhcmdldCBjb3BpZWQgZnJvbSBzb3VyY2VkXHJcbiAgICB0YXJnZXRTdWZmaXg/OiBzdHJpbmc7IC8vIFN1ZmZpeCBmb3IgdGFyZ2V0IGNvcGllZCBmcm9tIHNvdXJjZWRcclxuICAgIGJlYXV0aWZ5T3V0cHV0PzogYm9vbGVhbjsgLy8gYmVhdXRpZnkgb3V0cHV0XHJcbiAgICBwcmVzZXJ2ZU9yZGVyPzogYm9vbGVhbjsgLy8gcHJlc2VydmUgb3JkZXIgb2YgbmV3IHRyYW5zIHVuaXRzXHJcbiAgICBhdXRvdHJhbnNsYXRlPzogYm9vbGVhbnxzdHJpbmdbXTsgLy8gZW5hYmxlIGF1dG8gdHJhbnNsYXRlIHZpYSBHb29nbGUgVHJhbnNsYXRlXHJcbiAgICAgICAgLy8gaWYgaXQgaXMgYW4gYXJyYXksIGxpc3Qgb2YgbGFuZ3VhZ2VzIHRvIGF1dG90cmFuc2xhdGVcclxuICAgICAgICAvLyBpZiBpdCBpcyB0cnVlLCBhdXRvdHJhbnNsYXRlIGFsbCBsYW5ndWFnZXMgKGV4Y2VwdCBzb3VyY2UgbGFuZ3VhZ2Ugb2YgY291cnNlKVxyXG4gICAgICAgIC8vIGlmIGl0IGlzIGZhbHNlIChkZWZhdWx0KSBubyBhdXRvdHJhbnNsYXRlXHJcbiAgICBhcGlrZXk/OiBzdHJpbmc7ICAgIC8vIEFQSSBLZXkgZm9yIEdvb2dsZSBUcmFuc2xhdGUsIHJlcXVpcmVkIGlmIGF1dG90cmFuc2xhdGUgaXMgZW5hYmxlZFxyXG4gICAgYXBpa2V5ZmlsZT86IHN0cmluZzsgICAgLy8gZmlsZSBuYW1lIHdoZXJlIEFQSSBLZXkgZm9yIEdvb2dsZSBUcmFuc2xhdGUgY2FuIGJlIHJlYWQgZnJvbVxyXG59XHJcblxyXG4iXX0=