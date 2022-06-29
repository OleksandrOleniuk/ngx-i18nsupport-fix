/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 08.05.2017.
 * Some constant values used in the API.
 */
/**
 * supported file formats
 * @type {?}
 */
export var FORMAT_XLIFF12 = 'xlf';
/** @type {?} */
export var FORMAT_XLIFF20 = 'xlf2';
/** @type {?} */
export var FORMAT_XMB = 'xmb';
/** @type {?} */
export var FORMAT_XTB = 'xtb';
/**
 * File types
 * (returned by fileType() method)
 * @type {?}
 */
export var FILETYPE_XLIFF12 = 'XLIFF 1.2';
/** @type {?} */
export var FILETYPE_XLIFF20 = 'XLIFF 2.0';
/** @type {?} */
export var FILETYPE_XMB = 'XMB';
/** @type {?} */
export var FILETYPE_XTB = 'XTB';
/**
 * State NEW.
 * Signals an untranslated unit.
 * @type {?}
 */
export var STATE_NEW = 'new';
/**
 * State TRANSLATED.
 * Signals a translated unit, that is not reviewed until now.
 * @type {?}
 */
export var STATE_TRANSLATED = 'translated';
/**
 * State FINAL.
 * Signals a translated unit, that is reviewed and ready for use.
 * @type {?}
 */
export var STATE_FINAL = 'final';
/**
 * Default format, contains placeholders, html markup.
 * @type {?}
 */
export var NORMALIZATION_FORMAT_DEFAULT = 'default';
/**
 * Format for usage in ngxtranslate messages.
 * Placeholder are in the form {{n}}, no html markup.
 * @type {?}
 */
export var NORMALIZATION_FORMAT_NGXTRANSLATE = 'ngxtranslate';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiYXBpL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxNQUFNLEtBQU8sY0FBYyxHQUFHLEtBQUs7O0FBQ25DLE1BQU0sS0FBTyxjQUFjLEdBQUcsTUFBTTs7QUFDcEMsTUFBTSxLQUFPLFVBQVUsR0FBRyxLQUFLOztBQUMvQixNQUFNLEtBQU8sVUFBVSxHQUFHLEtBQUs7Ozs7OztBQU0vQixNQUFNLEtBQU8sZ0JBQWdCLEdBQUcsV0FBVzs7QUFDM0MsTUFBTSxLQUFPLGdCQUFnQixHQUFHLFdBQVc7O0FBQzNDLE1BQU0sS0FBTyxZQUFZLEdBQUcsS0FBSzs7QUFDakMsTUFBTSxLQUFPLFlBQVksR0FBRyxLQUFLOzs7Ozs7QUFXakMsTUFBTSxLQUFPLFNBQVMsR0FBRyxLQUFLOzs7Ozs7QUFLOUIsTUFBTSxLQUFPLGdCQUFnQixHQUFHLFlBQVk7Ozs7OztBQUs1QyxNQUFNLEtBQU8sV0FBVyxHQUFHLE9BQU87Ozs7O0FBU2xDLE1BQU0sS0FBTyw0QkFBNEIsR0FBRyxTQUFTOzs7Ozs7QUFNckQsTUFBTSxLQUFPLGlDQUFpQyxHQUFHLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAwOC4wNS4yMDE3LlxyXG4gKiBTb21lIGNvbnN0YW50IHZhbHVlcyB1c2VkIGluIHRoZSBBUEkuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIHN1cHBvcnRlZCBmaWxlIGZvcm1hdHNcclxuICovXHJcbmV4cG9ydCBjb25zdCBGT1JNQVRfWExJRkYxMiA9ICd4bGYnO1xyXG5leHBvcnQgY29uc3QgRk9STUFUX1hMSUZGMjAgPSAneGxmMic7XHJcbmV4cG9ydCBjb25zdCBGT1JNQVRfWE1CID0gJ3htYic7XHJcbmV4cG9ydCBjb25zdCBGT1JNQVRfWFRCID0gJ3h0Yic7XHJcblxyXG4vKipcclxuICogRmlsZSB0eXBlc1xyXG4gKiAocmV0dXJuZWQgYnkgZmlsZVR5cGUoKSBtZXRob2QpXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRklMRVRZUEVfWExJRkYxMiA9ICdYTElGRiAxLjInO1xyXG5leHBvcnQgY29uc3QgRklMRVRZUEVfWExJRkYyMCA9ICdYTElGRiAyLjAnO1xyXG5leHBvcnQgY29uc3QgRklMRVRZUEVfWE1CID0gJ1hNQic7XHJcbmV4cG9ydCBjb25zdCBGSUxFVFlQRV9YVEIgPSAnWFRCJztcclxuXHJcbi8qKlxyXG4gKiBhYnN0cmFjdCBzdGF0ZSB2YWx1ZS5cclxuICogVGhlcmUgYXJlIG9ubHkgMyBzdXBwb3J0ZWQgc3RhdGUgdmFsdWVzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBTdGF0ZSBORVcuXHJcbiAqIFNpZ25hbHMgYW4gdW50cmFuc2xhdGVkIHVuaXQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU1RBVEVfTkVXID0gJ25ldyc7XHJcbi8qKlxyXG4gKiBTdGF0ZSBUUkFOU0xBVEVELlxyXG4gKiBTaWduYWxzIGEgdHJhbnNsYXRlZCB1bml0LCB0aGF0IGlzIG5vdCByZXZpZXdlZCB1bnRpbCBub3cuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU1RBVEVfVFJBTlNMQVRFRCA9ICd0cmFuc2xhdGVkJztcclxuLyoqXHJcbiAqIFN0YXRlIEZJTkFMLlxyXG4gKiBTaWduYWxzIGEgdHJhbnNsYXRlZCB1bml0LCB0aGF0IGlzIHJldmlld2VkIGFuZCByZWFkeSBmb3IgdXNlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFNUQVRFX0ZJTkFMID0gJ2ZpbmFsJztcclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemF0b24gbWVzc2FnZSBmb3JtYXRzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IGZvcm1hdCwgY29udGFpbnMgcGxhY2Vob2xkZXJzLCBodG1sIG1hcmt1cC5cclxuICovXHJcbmV4cG9ydCBjb25zdCBOT1JNQUxJWkFUSU9OX0ZPUk1BVF9ERUZBVUxUID0gJ2RlZmF1bHQnO1xyXG5cclxuLyoqXHJcbiAqIEZvcm1hdCBmb3IgdXNhZ2UgaW4gbmd4dHJhbnNsYXRlIG1lc3NhZ2VzLlxyXG4gKiBQbGFjZWhvbGRlciBhcmUgaW4gdGhlIGZvcm0ge3tufX0sIG5vIGh0bWwgbWFya3VwLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE5PUk1BTElaQVRJT05fRk9STUFUX05HWFRSQU5TTEFURSA9ICduZ3h0cmFuc2xhdGUnO1xyXG4iXX0=