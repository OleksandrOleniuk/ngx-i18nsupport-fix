/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as fs from 'fs';
/**
 * Created by martin on 17.02.2017.
 * Some (a few) simple utils for file operations.
 * Just for convenience.
 */
var /**
 * Created by martin on 17.02.2017.
 * Some (a few) simple utils for file operations.
 * Just for convenience.
 */
FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    /**
     * Check for existence.
     * @param filename filename
     * @return wether file exists
     */
    /**
     * Check for existence.
     * @param {?} filename filename
     * @return {?} wether file exists
     */
    FileUtil.exists = /**
     * Check for existence.
     * @param {?} filename filename
     * @return {?} wether file exists
     */
    function (filename) {
        return fs.existsSync(filename);
    };
    /**
     * Read a file.
     * @param filename filename
     * @param encoding encoding
     * @return content of file
     */
    /**
     * Read a file.
     * @param {?} filename filename
     * @param {?} encoding encoding
     * @return {?} content of file
     */
    FileUtil.read = /**
     * Read a file.
     * @param {?} filename filename
     * @param {?} encoding encoding
     * @return {?} content of file
     */
    function (filename, encoding) {
        return fs.readFileSync(filename, encoding);
    };
    /**
     * Write a file with given content.
     * @param filename filename
     * @param newContent newContent
     * @param encoding encoding
     */
    /**
     * Write a file with given content.
     * @param {?} filename filename
     * @param {?} newContent newContent
     * @param {?} encoding encoding
     * @return {?}
     */
    FileUtil.replaceContent = /**
     * Write a file with given content.
     * @param {?} filename filename
     * @param {?} newContent newContent
     * @param {?} encoding encoding
     * @return {?}
     */
    function (filename, newContent, encoding) {
        fs.writeFileSync(filename, newContent, { encoding: encoding });
    };
    /**
     * @param {?} srcFile
     * @param {?} destFile
     * @return {?}
     */
    FileUtil.copy = /**
     * @param {?} srcFile
     * @param {?} destFile
     * @return {?}
     */
    function (srcFile, destFile) {
        /** @type {?} */
        var BUF_LENGTH = 64 * 1024;
        /** @type {?} */
        var buff = Buffer.alloc(BUF_LENGTH);
        /** @type {?} */
        var fdr = fs.openSync(srcFile, 'r');
        /** @type {?} */
        var fdw = fs.openSync(destFile, 'w');
        /** @type {?} */
        var bytesRead = 1;
        /** @type {?} */
        var pos = 0;
        while (bytesRead > 0) {
            bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
            fs.writeSync(fdw, buff, 0, bytesRead);
            pos += bytesRead;
        }
        fs.closeSync(fdr);
        fs.closeSync(fdw);
    };
    /**
     * Delete the folder and all of its content (rm -rf).
     * @param path path
     */
    /**
     * Delete the folder and all of its content (rm -rf).
     * @param {?} path path
     * @return {?}
     */
    FileUtil.deleteFolderRecursive = /**
     * Delete the folder and all of its content (rm -rf).
     * @param {?} path path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                /** @type {?} */
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileUtil.deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            }));
            fs.rmdirSync(path);
        }
    };
    /**
     * Delete folders content recursively, but do not delete folder.
     * Folder is left empty at the end.
     * @param path path
     */
    /**
     * Delete folders content recursively, but do not delete folder.
     * Folder is left empty at the end.
     * @param {?} path path
     * @return {?}
     */
    FileUtil.deleteFolderContentRecursive = /**
     * Delete folders content recursively, but do not delete folder.
     * Folder is left empty at the end.
     * @param {?} path path
     * @return {?}
     */
    function (path) {
        /** @type {?} */
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                /** @type {?} */
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileUtil.deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            }));
        }
    };
    /**
     * Delete a file.
     * @param path path
     */
    /**
     * Delete a file.
     * @param {?} path path
     * @return {?}
     */
    FileUtil.deleteFile = /**
     * Delete a file.
     * @param {?} path path
     * @return {?}
     */
    function (path) {
        fs.unlinkSync(path);
    };
    return FileUtil;
}());
/**
 * Created by martin on 17.02.2017.
 * Some (a few) simple utils for file operations.
 * Just for convenience.
 */
export { FileUtil };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11dGlsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQvIiwic291cmNlcyI6WyJjb21tb24vZmlsZS11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQzs7Ozs7O0FBUXpCOzs7Ozs7SUFBQTtJQThGQSxDQUFDO0lBNUZHOzs7O09BSUc7Ozs7OztJQUNXLGVBQU07Ozs7O0lBQXBCLFVBQXFCLFFBQWdCO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDVyxhQUFJOzs7Ozs7SUFBbEIsVUFBbUIsUUFBZ0IsRUFBRSxRQUFnQjtRQUNqRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDVyx1QkFBYzs7Ozs7OztJQUE1QixVQUE2QixRQUFnQixFQUFFLFVBQWtCLEVBQUUsUUFBZ0I7UUFDL0UsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRWEsYUFBSTs7Ozs7SUFBbEIsVUFBbUIsT0FBZSxFQUFFLFFBQWdCOztZQUMxQyxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUk7O1lBQ3RCLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7WUFDL0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzs7WUFDL0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQzs7WUFDbEMsU0FBUyxHQUFHLENBQUM7O1lBQ2IsR0FBRyxHQUFHLENBQUM7UUFDWCxPQUFPLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDbEIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEMsR0FBRyxJQUFJLFNBQVMsQ0FBQztTQUNwQjtRQUNELEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDVyw4QkFBcUI7Ozs7O0lBQW5DLFVBQW9DLElBQVk7O1lBQ3hDLEtBQUssR0FBRyxFQUFFO1FBQ2QsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQ3RCLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBUyxJQUFJOztvQkFDakIsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSTtnQkFDakMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsVUFBVTtvQkFDakQsUUFBUSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMzQztxQkFBTSxFQUFFLGNBQWM7b0JBQ25CLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzFCO1lBQ0wsQ0FBQyxFQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDVyxxQ0FBNEI7Ozs7OztJQUExQyxVQUEyQyxJQUFZOztZQUMvQyxLQUFLLEdBQUcsRUFBRTtRQUNkLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUN0QixLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixLQUFLLENBQUMsT0FBTzs7OztZQUFDLFVBQVMsSUFBSTs7b0JBQ2pCLE9BQU8sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUk7Z0JBQ2pDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLFVBQVU7b0JBQ2pELFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0M7cUJBQU0sRUFBRSxjQUFjO29CQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQjtZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDVyxtQkFBVTs7Ozs7SUFBeEIsVUFBeUIsSUFBWTtRQUNqQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQTlGRCxJQThGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAxNy4wMi4yMDE3LlxyXG4gKiBTb21lIChhIGZldykgc2ltcGxlIHV0aWxzIGZvciBmaWxlIG9wZXJhdGlvbnMuXHJcbiAqIEp1c3QgZm9yIGNvbnZlbmllbmNlLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXRpbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBmb3IgZXhpc3RlbmNlLlxyXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIGZpbGVuYW1lXHJcbiAgICAgKiBAcmV0dXJuIHdldGhlciBmaWxlIGV4aXN0c1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4aXN0cyhmaWxlbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZzLmV4aXN0c1N5bmMoZmlsZW5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBhIGZpbGUuXHJcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgZmlsZW5hbWVcclxuICAgICAqIEBwYXJhbSBlbmNvZGluZyBlbmNvZGluZ1xyXG4gICAgICogQHJldHVybiBjb250ZW50IG9mIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkKGZpbGVuYW1lOiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCBlbmNvZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcml0ZSBhIGZpbGUgd2l0aCBnaXZlbiBjb250ZW50LlxyXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIGZpbGVuYW1lXHJcbiAgICAgKiBAcGFyYW0gbmV3Q29udGVudCBuZXdDb250ZW50XHJcbiAgICAgKiBAcGFyYW0gZW5jb2RpbmcgZW5jb2RpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZXBsYWNlQ29udGVudChmaWxlbmFtZTogc3RyaW5nLCBuZXdDb250ZW50OiBzdHJpbmcsIGVuY29kaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVuYW1lLCBuZXdDb250ZW50LCB7ZW5jb2Rpbmc6IGVuY29kaW5nfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5KHNyY0ZpbGU6IHN0cmluZywgZGVzdEZpbGU6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IEJVRl9MRU5HVEggPSA2NCAqIDEwMjQ7XHJcbiAgICAgICAgY29uc3QgYnVmZiA9IEJ1ZmZlci5hbGxvYyhCVUZfTEVOR1RIKTtcclxuICAgICAgICBjb25zdCBmZHIgPSBmcy5vcGVuU3luYyhzcmNGaWxlLCAncicpO1xyXG4gICAgICAgIGNvbnN0IGZkdyA9IGZzLm9wZW5TeW5jKGRlc3RGaWxlLCAndycpO1xyXG4gICAgICAgIGxldCBieXRlc1JlYWQgPSAxO1xyXG4gICAgICAgIGxldCBwb3MgPSAwO1xyXG4gICAgICAgIHdoaWxlIChieXRlc1JlYWQgPiAwKSB7XHJcbiAgICAgICAgICAgIGJ5dGVzUmVhZCA9IGZzLnJlYWRTeW5jKGZkciwgYnVmZiwgMCwgQlVGX0xFTkdUSCwgcG9zKTtcclxuICAgICAgICAgICAgZnMud3JpdGVTeW5jKGZkdywgYnVmZiwgMCwgYnl0ZXNSZWFkKTtcclxuICAgICAgICAgICAgcG9zICs9IGJ5dGVzUmVhZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMuY2xvc2VTeW5jKGZkcik7XHJcbiAgICAgICAgZnMuY2xvc2VTeW5jKGZkdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgdGhlIGZvbGRlciBhbmQgYWxsIG9mIGl0cyBjb250ZW50IChybSAtcmYpLlxyXG4gICAgICogQHBhcmFtIHBhdGggcGF0aFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZmlsZXMgPSBbXTtcclxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoKSApIHtcclxuICAgICAgICAgICAgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhwYXRoKTtcclxuICAgICAgICAgICAgZmlsZXMuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJQYXRoID0gcGF0aCArICcvJyArIGZpbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnMubHN0YXRTeW5jKGN1clBhdGgpLmlzRGlyZWN0b3J5KCkpIHsgLy8gcmVjdXJzZVxyXG4gICAgICAgICAgICAgICAgICAgIEZpbGVVdGlsLmRlbGV0ZUZvbGRlclJlY3Vyc2l2ZShjdXJQYXRoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGRlbGV0ZSBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhjdXJQYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZzLnJtZGlyU3luYyhwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgZm9sZGVycyBjb250ZW50IHJlY3Vyc2l2ZWx5LCBidXQgZG8gbm90IGRlbGV0ZSBmb2xkZXIuXHJcbiAgICAgKiBGb2xkZXIgaXMgbGVmdCBlbXB0eSBhdCB0aGUgZW5kLlxyXG4gICAgICogQHBhcmFtIHBhdGggcGF0aFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZUZvbGRlckNvbnRlbnRSZWN1cnNpdmUocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGZpbGVzID0gW107XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkgKSB7XHJcbiAgICAgICAgICAgIGZpbGVzID0gZnMucmVhZGRpclN5bmMocGF0aCk7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VyUGF0aCA9IHBhdGggKyAnLycgKyBmaWxlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZzLmxzdGF0U3luYyhjdXJQYXRoKS5pc0RpcmVjdG9yeSgpKSB7IC8vIHJlY3Vyc2VcclxuICAgICAgICAgICAgICAgICAgICBGaWxlVXRpbC5kZWxldGVGb2xkZXJSZWN1cnNpdmUoY3VyUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBkZWxldGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIGZzLnVubGlua1N5bmMoY3VyUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlbGV0ZSBhIGZpbGUuXHJcbiAgICAgKiBAcGFyYW0gcGF0aCBwYXRoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVsZXRlRmlsZShwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBmcy51bmxpbmtTeW5jKHBhdGgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==