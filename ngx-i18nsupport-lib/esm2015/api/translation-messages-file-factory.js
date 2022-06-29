/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { XliffFile } from '../impl/xliff-file';
import { XmbFile } from '../impl/xmb-file';
import { format } from 'util';
import { Xliff2File } from '../impl/xliff2-file';
import { FORMAT_XLIFF12, FORMAT_XLIFF20, FORMAT_XMB, FORMAT_XTB } from './constants';
import { XtbFile } from '../impl/xtb-file';
/**
 * Helper class to read translation files depending on format.
 * This is part of the public api
 */
export class TranslationMessagesFileFactory {
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    static fromFileContent(i18nFormat, xmlContent, path, encoding, optionalMaster) {
        return new TranslationMessagesFileFactory().createFileFromFileContent(i18nFormat, xmlContent, path, encoding, optionalMaster);
    }
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    static fromUnknownFormatFileContent(xmlContent, path, encoding, optionalMaster) {
        return new TranslationMessagesFileFactory().createFileFromUnknownFormatFileContent(xmlContent, path, encoding, optionalMaster);
    }
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    createFileFromFileContent(i18nFormat, xmlContent, path, encoding, optionalMaster) {
        if (i18nFormat === FORMAT_XLIFF12) {
            return new XliffFile(xmlContent, path, encoding);
        }
        if (i18nFormat === FORMAT_XLIFF20) {
            return new Xliff2File(xmlContent, path, encoding);
        }
        if (i18nFormat === FORMAT_XMB) {
            return new XmbFile(this, xmlContent, path, encoding);
        }
        if (i18nFormat === FORMAT_XTB) {
            return new XtbFile(this, xmlContent, path, encoding, optionalMaster);
        }
        throw new Error(format('oops, unsupported format "%s"', i18nFormat));
    }
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    createFileFromUnknownFormatFileContent(xmlContent, path, encoding, optionalMaster) {
        /** @type {?} */
        let formatCandidates = [FORMAT_XLIFF12, FORMAT_XLIFF20, FORMAT_XMB, FORMAT_XTB];
        if (path && path.endsWith('xmb')) {
            formatCandidates = [FORMAT_XMB, FORMAT_XTB, FORMAT_XLIFF12, FORMAT_XLIFF20];
        }
        if (path && path.endsWith('xtb')) {
            formatCandidates = [FORMAT_XTB, FORMAT_XMB, FORMAT_XLIFF12, FORMAT_XLIFF20];
        }
        // try all candidate formats to get the right one
        for (let i = 0; i < formatCandidates.length; i++) {
            /** @type {?} */
            const formatCandidate = formatCandidates[i];
            try {
                /** @type {?} */
                const translationFile = TranslationMessagesFileFactory.fromFileContent(formatCandidate, xmlContent, path, encoding, optionalMaster);
                if (translationFile) {
                    return translationFile;
                }
            }
            catch (e) {
                // seams to be the wrong format
            }
        }
        throw new Error(format('could not identify file format, it is neiter XLIFF (1.2 or 2.0) nor XMB/XTB'));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS1mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiYXBpL3RyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUtZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ25GLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFPekMsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7Ozs7Ozs7OztJQWNoQyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQWtCLEVBQ2xCLFVBQWtCLEVBQ2xCLElBQVksRUFDWixRQUFnQixFQUNoQixjQUFxRTtRQUMvRixPQUFPLElBQUksOEJBQThCLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbEksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFlTSxNQUFNLENBQUMsNEJBQTRCLENBQUMsVUFBa0IsRUFDL0IsSUFBWSxFQUNaLFFBQWdCLEVBQ2hCLGNBQXFFO1FBQy9GLE9BQU8sSUFBSSw4QkFBOEIsRUFBRSxDQUFDLHNDQUFzQyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ25JLENBQUM7Ozs7Ozs7Ozs7Ozs7SUFjRCx5QkFBeUIsQ0FBQyxVQUFrQixFQUNsQixVQUFrQixFQUNsQixJQUFZLEVBQ1osUUFBZ0IsRUFDaEIsY0FBdUU7UUFDN0YsSUFBSSxVQUFVLEtBQUssY0FBYyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksVUFBVSxLQUFLLGNBQWMsRUFBRTtZQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFJLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUN4RTtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLCtCQUErQixFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFekUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUFlRCxzQ0FBc0MsQ0FBQyxVQUFrQixFQUNsQixJQUFZLEVBQ1osUUFBZ0IsRUFDaEIsY0FBdUU7O1lBRXRHLGdCQUFnQixHQUFHLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1FBQy9FLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUIsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUMvRTtRQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUIsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUMvRTtRQUNELGlEQUFpRDtRQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDeEMsZUFBZSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJOztzQkFDTSxlQUFlLEdBQUcsOEJBQThCLENBQUMsZUFBZSxDQUNsRSxlQUFlLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDO2dCQUNoRSxJQUFJLGVBQWUsRUFBRTtvQkFDakIsT0FBTyxlQUFlLENBQUM7aUJBQzFCO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUiwrQkFBK0I7YUFDbEM7U0FDSjtRQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLDZFQUE2RSxDQUFDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAyMS4wMy4yMDE3LlxyXG4gKi9cclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGV9IGZyb20gJy4vaS10cmFuc2xhdGlvbi1tZXNzYWdlcy1maWxlJztcclxuaW1wb3J0IHtYbGlmZkZpbGV9IGZyb20gJy4uL2ltcGwveGxpZmYtZmlsZSc7XHJcbmltcG9ydCB7WG1iRmlsZX0gZnJvbSAnLi4vaW1wbC94bWItZmlsZSc7XHJcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtYbGlmZjJGaWxlfSBmcm9tICcuLi9pbXBsL3hsaWZmMi1maWxlJztcclxuaW1wb3J0IHtGT1JNQVRfWExJRkYxMiwgRk9STUFUX1hMSUZGMjAsIEZPUk1BVF9YTUIsIEZPUk1BVF9YVEJ9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtYdGJGaWxlfSBmcm9tICcuLi9pbXBsL3h0Yi1maWxlJztcclxuaW1wb3J0IHtJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5fSBmcm9tICcuL2ktdHJhbnNsYXRpb24tbWVzc2FnZXMtZmlsZS1mYWN0b3J5JztcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgY2xhc3MgdG8gcmVhZCB0cmFuc2xhdGlvbiBmaWxlcyBkZXBlbmRpbmcgb24gZm9ybWF0LlxyXG4gKiBUaGlzIGlzIHBhcnQgb2YgdGhlIHB1YmxpYyBhcGlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZUZhY3RvcnkgaW1wbGVtZW50cyBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgZmlsZSBmdW5jdGlvbiwgcmVzdWx0IGRlcGVuZHMgb24gZm9ybWF0LCBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGUuXHJcbiAgICAgKiBAcGFyYW0gaTE4bkZvcm1hdCBjdXJyZW50bHkgJ3hsZicgb3IgJ3hsZjInIG9yICd4bWInIG9yICd4dGInIGFyZSBzdXBwb3J0ZWRcclxuICAgICAqIEBwYXJhbSB4bWxDb250ZW50IHRoZSBmaWxlIGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSBwYXRoIHRoZSBwYXRoIG9mIHRoZSBmaWxlIChvbmx5IHVzZWQgdG8gcmVtZW1iZXIgaXQpXHJcbiAgICAgKiBAcGFyYW0gZW5jb2RpbmcgdXRmLTgsIC4uLiB1c2VkIHRvIHBhcnNlIFhNTC5cclxuICAgICAqIFRoaXMgaXMgcmVhZCBmcm9tIHRoZSBmaWxlLCBidXQgaWYgeW91IGtub3cgaXQgYmVmb3JlLCB5b3UgY2FuIGF2b2lkIHJlYWRpbmcgdGhlIGZpbGUgdHdpY2UuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxNYXN0ZXIgaW4gY2FzZSBvZiB4bWIgdGhlIG1hc3RlciBmaWxlLCB0aGF0IGNvbnRhaW5zIHRoZSBvcmlnaW5hbCB0ZXh0cy5cclxuICAgICAqICh0aGlzIGlzIHVzZWQgdG8gc3VwcG9ydCBzdGF0ZSBpbmZvcywgdGhhdCBhcmUgYmFzZWQgb24gY29tcGFyaW5nIG9yaWdpbmFsIHdpdGggdHJhbnNsYXRlZCB2ZXJzaW9uKVxyXG4gICAgICogSWdub3JlZCBmb3Igb3RoZXIgZm9ybWF0cy5cclxuICAgICAqIEByZXR1cm4gZWl0aGVyIFhsaWZmRmlsZSBvciBYbWJGaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUZpbGVDb250ZW50KGkxOG5Gb3JtYXQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbENvbnRlbnQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuY29kaW5nOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbE1hc3Rlcj86IHt4bWxDb250ZW50OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZ30pOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVGYWN0b3J5KCkuY3JlYXRlRmlsZUZyb21GaWxlQ29udGVudChpMThuRm9ybWF0LCB4bWxDb250ZW50LCBwYXRoLCBlbmNvZGluZywgb3B0aW9uYWxNYXN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBmaWxlIGZ1bmN0aW9uIGZvciBhbnkgZmlsZSB3aXRoIHVua25vd24gZm9ybWF0LlxyXG4gICAgICogVGhpcyBmdW5jdGlvbnMgdHJpZXMgdG8gZ3Vlc3MgdGhlIGZvcm1hdCBiYXNlZCBvbiB0aGUgZmlsZW5hbWUgYW5kIHRoZSBjb250ZW50IG9mIHRoZSBmaWxlLlxyXG4gICAgICogUmVzdWx0IGRlcGVuZHMgb24gZGV0ZWN0ZWQgZm9ybWF0LCBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGUuXHJcbiAgICAgKiBAcGFyYW0geG1sQ29udGVudCB0aGUgZmlsZSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0gcGF0aCB0aGUgcGF0aCBvZiB0aGUgZmlsZSAob25seSB1c2VkIHRvIHJlbWVtYmVyIGl0KVxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIHV0Zi04LCAuLi4gdXNlZCB0byBwYXJzZSBYTUwuXHJcbiAgICAgKiBUaGlzIGlzIHJlYWQgZnJvbSB0aGUgZmlsZSwgYnV0IGlmIHlvdSBrbm93IGl0IGJlZm9yZSwgeW91IGNhbiBhdm9pZCByZWFkaW5nIHRoZSBmaWxlIHR3aWNlLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsTWFzdGVyIGluIGNhc2Ugb2YgeG1iIHRoZSBtYXN0ZXIgZmlsZSwgdGhhdCBjb250YWlucyB0aGUgb3JpZ2luYWwgdGV4dHMuXHJcbiAgICAgKiAodGhpcyBpcyB1c2VkIHRvIHN1cHBvcnQgc3RhdGUgaW5mb3MsIHRoYXQgYXJlIGJhc2VkIG9uIGNvbXBhcmluZyBvcmlnaW5hbCB3aXRoIHRyYW5zbGF0ZWQgdmVyc2lvbilcclxuICAgICAqIElnbm9yZWQgZm9yIG90aGVyIGZvcm1hdHMuXHJcbiAgICAgKiBAcmV0dXJuIGVpdGhlciBYbGlmZkZpbGUgb3IgWG1iRmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21Vbmtub3duRm9ybWF0RmlsZUNvbnRlbnQoeG1sQ29udGVudDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyPzoge3htbENvbnRlbnQ6IHN0cmluZywgcGF0aDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nfSk6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZUZhY3RvcnkoKS5jcmVhdGVGaWxlRnJvbVVua25vd25Gb3JtYXRGaWxlQ29udGVudCh4bWxDb250ZW50LCBwYXRoLCBlbmNvZGluZywgb3B0aW9uYWxNYXN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBmaWxlIGZ1bmN0aW9uLCByZXN1bHQgZGVwZW5kcyBvbiBmb3JtYXQsIGVpdGhlciBYbGlmZkZpbGUgb3IgWG1iRmlsZS5cclxuICAgICAqIEBwYXJhbSBpMThuRm9ybWF0IGN1cnJlbnRseSAneGxmJyBvciAneGxmMicgb3IgJ3htYicgb3IgJ3h0YicgYXJlIHN1cHBvcnRlZFxyXG4gICAgICogQHBhcmFtIHhtbENvbnRlbnQgdGhlIGZpbGUgY29udGVudFxyXG4gICAgICogQHBhcmFtIHBhdGggdGhlIHBhdGggb2YgdGhlIGZpbGUgKG9ubHkgdXNlZCB0byByZW1lbWJlciBpdClcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyB1dGYtOCwgLi4uIHVzZWQgdG8gcGFyc2UgWE1MLlxyXG4gICAgICogVGhpcyBpcyByZWFkIGZyb20gdGhlIGZpbGUsIGJ1dCBpZiB5b3Uga25vdyBpdCBiZWZvcmUsIHlvdSBjYW4gYXZvaWQgcmVhZGluZyB0aGUgZmlsZSB0d2ljZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25hbE1hc3RlciBpbiBjYXNlIG9mIHhtYiB0aGUgbWFzdGVyIGZpbGUsIHRoYXQgY29udGFpbnMgdGhlIG9yaWdpbmFsIHRleHRzLlxyXG4gICAgICogKHRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IHN0YXRlIGluZm9zLCB0aGF0IGFyZSBiYXNlZCBvbiBjb21wYXJpbmcgb3JpZ2luYWwgd2l0aCB0cmFuc2xhdGVkIHZlcnNpb24pXHJcbiAgICAgKiBJZ25vcmVkIGZvciBvdGhlciBmb3JtYXRzLlxyXG4gICAgICogQHJldHVybiBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlRmlsZUZyb21GaWxlQ29udGVudChpMThuRm9ybWF0OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhtbENvbnRlbnQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmNvZGluZzogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25hbE1hc3Rlcj86IHsgeG1sQ29udGVudDogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcgfSk6IElUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSB7XHJcbiAgICAgICAgaWYgKGkxOG5Gb3JtYXQgPT09IEZPUk1BVF9YTElGRjEyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgWGxpZmZGaWxlKHhtbENvbnRlbnQsIHBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkxOG5Gb3JtYXQgPT09IEZPUk1BVF9YTElGRjIwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgWGxpZmYyRmlsZSh4bWxDb250ZW50LCBwYXRoLCBlbmNvZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpMThuRm9ybWF0ID09PSBGT1JNQVRfWE1CKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgWG1iRmlsZSh0aGlzLCB4bWxDb250ZW50LCBwYXRoLCBlbmNvZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpMThuRm9ybWF0ID09PSBGT1JNQVRfWFRCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgWHRiRmlsZSh0aGlzLCB4bWxDb250ZW50LCBwYXRoLCBlbmNvZGluZywgb3B0aW9uYWxNYXN0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdvb3BzLCB1bnN1cHBvcnRlZCBmb3JtYXQgXCIlc1wiJywgaTE4bkZvcm1hdCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgZmlsZSBmdW5jdGlvbiBmb3IgYW55IGZpbGUgd2l0aCB1bmtub3duIGZvcm1hdC5cclxuICAgICAqIFRoaXMgZnVuY3Rpb25zIHRyaWVzIHRvIGd1ZXNzIHRoZSBmb3JtYXQgYmFzZWQgb24gdGhlIGZpbGVuYW1lIGFuZCB0aGUgY29udGVudCBvZiB0aGUgZmlsZS5cclxuICAgICAqIFJlc3VsdCBkZXBlbmRzIG9uIGRldGVjdGVkIGZvcm1hdCwgZWl0aGVyIFhsaWZmRmlsZSBvciBYbWJGaWxlLlxyXG4gICAgICogQHBhcmFtIHhtbENvbnRlbnQgdGhlIGZpbGUgY29udGVudFxyXG4gICAgICogQHBhcmFtIHBhdGggdGhlIHBhdGggb2YgdGhlIGZpbGUgKG9ubHkgdXNlZCB0byByZW1lbWJlciBpdClcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyB1dGYtOCwgLi4uIHVzZWQgdG8gcGFyc2UgWE1MLlxyXG4gICAgICogVGhpcyBpcyByZWFkIGZyb20gdGhlIGZpbGUsIGJ1dCBpZiB5b3Uga25vdyBpdCBiZWZvcmUsIHlvdSBjYW4gYXZvaWQgcmVhZGluZyB0aGUgZmlsZSB0d2ljZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25hbE1hc3RlciBpbiBjYXNlIG9mIHhtYiB0aGUgbWFzdGVyIGZpbGUsIHRoYXQgY29udGFpbnMgdGhlIG9yaWdpbmFsIHRleHRzLlxyXG4gICAgICogKHRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IHN0YXRlIGluZm9zLCB0aGF0IGFyZSBiYXNlZCBvbiBjb21wYXJpbmcgb3JpZ2luYWwgd2l0aCB0cmFuc2xhdGVkIHZlcnNpb24pXHJcbiAgICAgKiBJZ25vcmVkIGZvciBvdGhlciBmb3JtYXRzLlxyXG4gICAgICogQHJldHVybiBlaXRoZXIgWGxpZmZGaWxlIG9yIFhtYkZpbGVcclxuICAgICAqL1xyXG4gICAgY3JlYXRlRmlsZUZyb21Vbmtub3duRm9ybWF0RmlsZUNvbnRlbnQoeG1sQ29udGVudDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2Rpbmc6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbmFsTWFzdGVyPzogeyB4bWxDb250ZW50OiBzdHJpbmcsIHBhdGg6IHN0cmluZywgZW5jb2Rpbmc6IHN0cmluZyB9KVxyXG4gICAgICAgIDogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlIHtcclxuICAgICAgICBsZXQgZm9ybWF0Q2FuZGlkYXRlcyA9IFtGT1JNQVRfWExJRkYxMiwgRk9STUFUX1hMSUZGMjAsIEZPUk1BVF9YTUIsIEZPUk1BVF9YVEJdO1xyXG4gICAgICAgIGlmIChwYXRoICYmIHBhdGguZW5kc1dpdGgoJ3htYicpKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdENhbmRpZGF0ZXMgPSBbRk9STUFUX1hNQiwgRk9STUFUX1hUQiwgRk9STUFUX1hMSUZGMTIsIEZPUk1BVF9YTElGRjIwXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC5lbmRzV2l0aCgneHRiJykpIHtcclxuICAgICAgICAgICAgZm9ybWF0Q2FuZGlkYXRlcyA9IFtGT1JNQVRfWFRCLCBGT1JNQVRfWE1CLCBGT1JNQVRfWExJRkYxMiwgRk9STUFUX1hMSUZGMjBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0cnkgYWxsIGNhbmRpZGF0ZSBmb3JtYXRzIHRvIGdldCB0aGUgcmlnaHQgb25lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtYXRDYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdENhbmRpZGF0ZSA9IGZvcm1hdENhbmRpZGF0ZXNbaV07XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFuc2xhdGlvbkZpbGUgPSBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZUZhY3RvcnkuZnJvbUZpbGVDb250ZW50KFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdENhbmRpZGF0ZSwgeG1sQ29udGVudCwgcGF0aCwgZW5jb2RpbmcsIG9wdGlvbmFsTWFzdGVyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGlvbkZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRpb25GaWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZWFtcyB0byBiZSB0aGUgd3JvbmcgZm9ybWF0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnY291bGQgbm90IGlkZW50aWZ5IGZpbGUgZm9ybWF0LCBpdCBpcyBuZWl0ZXIgWExJRkYgKDEuMiBvciAyLjApIG5vciBYTUIvWFRCJykpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19