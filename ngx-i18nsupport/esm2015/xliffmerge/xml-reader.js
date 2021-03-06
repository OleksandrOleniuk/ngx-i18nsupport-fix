/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FileUtil } from '../common/file-util';
/**
 * Created by martin on 10.03.2017.
 * Helper class to read XMl with a correct encoding.
 */
export class XmlReader {
    /**
     * Read an xml-File.
     * @param {?} path Path to file
     * @param {?=} encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return {?} file content and encoding found in the file.
     */
    static readXmlFileContent(path, encoding) {
        if (!encoding) {
            encoding = XmlReader.DEFAULT_ENCODING;
        }
        /** @type {?} */
        let content = FileUtil.read(path, encoding);
        /** @type {?} */
        const foundEncoding = XmlReader.encodingFromXml(content);
        if (foundEncoding !== encoding) {
            // read again with the correct encoding
            content = FileUtil.read(path, foundEncoding);
        }
        return {
            content: content,
            encoding: foundEncoding
        };
    }
    /**
     * Read the encoding from the xml.
     * xml File starts with .. encoding=".."
     * @private
     * @param {?} xmlString xmlString
     * @return {?} encoding
     */
    static encodingFromXml(xmlString) {
        /** @type {?} */
        const index = xmlString.indexOf('encoding="');
        if (index < 0) {
            return this.DEFAULT_ENCODING; // default in xml if not explicitly set
        }
        /** @type {?} */
        const endIndex = xmlString.indexOf('"', index + 10);
        return xmlString.substring(index + 10, endIndex);
    }
}
XmlReader.DEFAULT_ENCODING = 'UTF-8';
if (false) {
    /** @type {?} */
    XmlReader.DEFAULT_ENCODING;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sLXJlYWRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsieGxpZmZtZXJnZS94bWwtcmVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBTTdDLE1BQU0sT0FBTyxTQUFTOzs7Ozs7OztJQVVYLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsUUFBaUI7UUFDNUQsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFFBQVEsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7U0FDekM7O1lBQ0csT0FBTyxHQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQzs7Y0FDN0MsYUFBYSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1FBQ3hELElBQUksYUFBYSxLQUFLLFFBQVEsRUFBRTtZQUM1Qix1Q0FBdUM7WUFDdkMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsT0FBTztZQUNILE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxhQUFhO1NBQzFCLENBQUM7SUFDTixDQUFDOzs7Ozs7OztJQVFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBaUI7O2NBQ3RDLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUM3QyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLHVDQUF1QztTQUN4RTs7Y0FDSyxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNuRCxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRCxDQUFDOztBQXRDTSwwQkFBZ0IsR0FBRyxPQUFPLENBQUM7OztJQUFsQywyQkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbGVVdGlsfSBmcm9tICcuLi9jb21tb24vZmlsZS11dGlsJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDEwLjAzLjIwMTcuXHJcbiAqIEhlbHBlciBjbGFzcyB0byByZWFkIFhNbCB3aXRoIGEgY29ycmVjdCBlbmNvZGluZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgWG1sUmVhZGVyIHtcclxuICAgIHN0YXRpYyBERUZBVUxUX0VOQ09ESU5HID0gJ1VURi04JztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYW4geG1sLUZpbGUuXHJcbiAgICAgKiBAcGFyYW0gcGF0aCBQYXRoIHRvIGZpbGVcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyBvcHRpb25hbCBlbmNvZGluZyBvZiB0aGUgeG1sLlxyXG4gICAgICogVGhpcyBpcyByZWFkIGZyb20gdGhlIGZpbGUsIGJ1dCBpZiB5b3Uga25vdyBpdCBiZWZvcmUsIHlvdSBjYW4gYXZvaWQgcmVhZGluZyB0aGUgZmlsZSB0d2ljZS5cclxuICAgICAqIEByZXR1cm4gZmlsZSBjb250ZW50IGFuZCBlbmNvZGluZyBmb3VuZCBpbiB0aGUgZmlsZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkWG1sRmlsZUNvbnRlbnQocGF0aDogc3RyaW5nLCBlbmNvZGluZz86IHN0cmluZyk6IHtjb250ZW50OiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmd9IHtcclxuICAgICAgICBpZiAoIWVuY29kaW5nKSB7XHJcbiAgICAgICAgICAgIGVuY29kaW5nID0gWG1sUmVhZGVyLkRFRkFVTFRfRU5DT0RJTkc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmcgPSBGaWxlVXRpbC5yZWFkKHBhdGgsIGVuY29kaW5nKTtcclxuICAgICAgICBjb25zdCBmb3VuZEVuY29kaW5nID0gWG1sUmVhZGVyLmVuY29kaW5nRnJvbVhtbChjb250ZW50KTtcclxuICAgICAgICBpZiAoZm91bmRFbmNvZGluZyAhPT0gZW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgLy8gcmVhZCBhZ2FpbiB3aXRoIHRoZSBjb3JyZWN0IGVuY29kaW5nXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBGaWxlVXRpbC5yZWFkKHBhdGgsIGZvdW5kRW5jb2RpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICBlbmNvZGluZzogZm91bmRFbmNvZGluZ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFkIHRoZSBlbmNvZGluZyBmcm9tIHRoZSB4bWwuXHJcbiAgICAgKiB4bWwgRmlsZSBzdGFydHMgd2l0aCAuLiBlbmNvZGluZz1cIi4uXCJcclxuICAgICAqIEBwYXJhbSB4bWxTdHJpbmcgeG1sU3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuIGVuY29kaW5nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGVuY29kaW5nRnJvbVhtbCh4bWxTdHJpbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB4bWxTdHJpbmcuaW5kZXhPZignZW5jb2Rpbmc9XCInKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkRFRkFVTFRfRU5DT0RJTkc7IC8vIGRlZmF1bHQgaW4geG1sIGlmIG5vdCBleHBsaWNpdGx5IHNldFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBlbmRJbmRleCA9IHhtbFN0cmluZy5pbmRleE9mKCdcIicsIGluZGV4ICsgMTApOyAvLyAxMCA9IGxlbmd0aCBvZiAnZW5jb2Rpbmc9XCInXHJcbiAgICAgICAgcmV0dXJuIHhtbFN0cmluZy5zdWJzdHJpbmcoaW5kZXggKyAxMCwgZW5kSW5kZXgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19