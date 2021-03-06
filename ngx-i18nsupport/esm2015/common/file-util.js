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
export class FileUtil {
    /**
     * Check for existence.
     * @param {?} filename filename
     * @return {?} wether file exists
     */
    static exists(filename) {
        return fs.existsSync(filename);
    }
    /**
     * Read a file.
     * @param {?} filename filename
     * @param {?} encoding encoding
     * @return {?} content of file
     */
    static read(filename, encoding) {
        return fs.readFileSync(filename, encoding);
    }
    /**
     * Write a file with given content.
     * @param {?} filename filename
     * @param {?} newContent newContent
     * @param {?} encoding encoding
     * @return {?}
     */
    static replaceContent(filename, newContent, encoding) {
        fs.writeFileSync(filename, newContent, { encoding: encoding });
    }
    /**
     * @param {?} srcFile
     * @param {?} destFile
     * @return {?}
     */
    static copy(srcFile, destFile) {
        /** @type {?} */
        const BUF_LENGTH = 64 * 1024;
        /** @type {?} */
        const buff = Buffer.alloc(BUF_LENGTH);
        /** @type {?} */
        const fdr = fs.openSync(srcFile, 'r');
        /** @type {?} */
        const fdw = fs.openSync(destFile, 'w');
        /** @type {?} */
        let bytesRead = 1;
        /** @type {?} */
        let pos = 0;
        while (bytesRead > 0) {
            bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
            fs.writeSync(fdw, buff, 0, bytesRead);
            pos += bytesRead;
        }
        fs.closeSync(fdr);
        fs.closeSync(fdw);
    }
    /**
     * Delete the folder and all of its content (rm -rf).
     * @param {?} path path
     * @return {?}
     */
    static deleteFolderRecursive(path) {
        /** @type {?} */
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                /** @type {?} */
                const curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileUtil.deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            }));
            fs.rmdirSync(path);
        }
    }
    /**
     * Delete folders content recursively, but do not delete folder.
     * Folder is left empty at the end.
     * @param {?} path path
     * @return {?}
     */
    static deleteFolderContentRecursive(path) {
        /** @type {?} */
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach((/**
             * @param {?} file
             * @return {?}
             */
            function (file) {
                /** @type {?} */
                const curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    FileUtil.deleteFolderRecursive(curPath);
                }
                else { // delete file
                    fs.unlinkSync(curPath);
                }
            }));
        }
    }
    /**
     * Delete a file.
     * @param {?} path path
     * @return {?}
     */
    static deleteFile(path) {
        fs.unlinkSync(path);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11dGlsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQvIiwic291cmNlcyI6WyJjb21tb24vZmlsZS11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQzs7Ozs7O0FBUXpCLE1BQU0sT0FBTyxRQUFROzs7Ozs7SUFPVixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQWdCO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7O0lBUU0sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFnQixFQUFFLFFBQWdCO1FBQ2pELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7Ozs7SUFRTSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQWdCLEVBQUUsVUFBa0IsRUFBRSxRQUFnQjtRQUMvRSxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7SUFFTSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQWUsRUFBRSxRQUFnQjs7Y0FDMUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxJQUFJOztjQUN0QixJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7O2NBQy9CLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7O2NBQy9CLEdBQUcsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7O1lBQ2xDLFNBQVMsR0FBRyxDQUFDOztZQUNiLEdBQUcsR0FBRyxDQUFDO1FBQ1gsT0FBTyxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLFNBQVMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2RCxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLEdBQUcsSUFBSSxTQUFTLENBQUM7U0FDcEI7UUFDRCxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7Ozs7O0lBTU0sTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQVk7O1lBQ3hDLEtBQUssR0FBRyxFQUFFO1FBQ2QsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFHO1lBQ3RCLEtBQUssR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBUyxJQUFJOztzQkFDakIsT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSTtnQkFDakMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsVUFBVTtvQkFDakQsUUFBUSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMzQztxQkFBTSxFQUFFLGNBQWM7b0JBQ25CLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzFCO1lBQ0wsQ0FBQyxFQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7Ozs7OztJQU9NLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxJQUFZOztZQUMvQyxLQUFLLEdBQUcsRUFBRTtRQUNkLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRztZQUN0QixLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixLQUFLLENBQUMsT0FBTzs7OztZQUFDLFVBQVMsSUFBSTs7c0JBQ2pCLE9BQU8sR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUk7Z0JBQ2pDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLFVBQVU7b0JBQ2pELFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0M7cUJBQU0sRUFBRSxjQUFjO29CQUNuQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQjtZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7Ozs7SUFNTSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDakMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMTcuMDIuMjAxNy5cclxuICogU29tZSAoYSBmZXcpIHNpbXBsZSB1dGlscyBmb3IgZmlsZSBvcGVyYXRpb25zLlxyXG4gKiBKdXN0IGZvciBjb252ZW5pZW5jZS5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZVV0aWwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgZm9yIGV4aXN0ZW5jZS5cclxuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBmaWxlbmFtZVxyXG4gICAgICogQHJldHVybiB3ZXRoZXIgZmlsZSBleGlzdHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGlzdHMoZmlsZW5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBmcy5leGlzdHNTeW5jKGZpbGVuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgYSBmaWxlLlxyXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIGZpbGVuYW1lXHJcbiAgICAgKiBAcGFyYW0gZW5jb2RpbmcgZW5jb2RpbmdcclxuICAgICAqIEByZXR1cm4gY29udGVudCBvZiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZChmaWxlbmFtZTogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgZW5jb2RpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JpdGUgYSBmaWxlIHdpdGggZ2l2ZW4gY29udGVudC5cclxuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBmaWxlbmFtZVxyXG4gICAgICogQHBhcmFtIG5ld0NvbnRlbnQgbmV3Q29udGVudFxyXG4gICAgICogQHBhcmFtIGVuY29kaW5nIGVuY29kaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVwbGFjZUNvbnRlbnQoZmlsZW5hbWU6IHN0cmluZywgbmV3Q29udGVudDogc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhmaWxlbmFtZSwgbmV3Q29udGVudCwge2VuY29kaW5nOiBlbmNvZGluZ30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29weShzcmNGaWxlOiBzdHJpbmcsIGRlc3RGaWxlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBCVUZfTEVOR1RIID0gNjQgKiAxMDI0O1xyXG4gICAgICAgIGNvbnN0IGJ1ZmYgPSBCdWZmZXIuYWxsb2MoQlVGX0xFTkdUSCk7XHJcbiAgICAgICAgY29uc3QgZmRyID0gZnMub3BlblN5bmMoc3JjRmlsZSwgJ3InKTtcclxuICAgICAgICBjb25zdCBmZHcgPSBmcy5vcGVuU3luYyhkZXN0RmlsZSwgJ3cnKTtcclxuICAgICAgICBsZXQgYnl0ZXNSZWFkID0gMTtcclxuICAgICAgICBsZXQgcG9zID0gMDtcclxuICAgICAgICB3aGlsZSAoYnl0ZXNSZWFkID4gMCkge1xyXG4gICAgICAgICAgICBieXRlc1JlYWQgPSBmcy5yZWFkU3luYyhmZHIsIGJ1ZmYsIDAsIEJVRl9MRU5HVEgsIHBvcyk7XHJcbiAgICAgICAgICAgIGZzLndyaXRlU3luYyhmZHcsIGJ1ZmYsIDAsIGJ5dGVzUmVhZCk7XHJcbiAgICAgICAgICAgIHBvcyArPSBieXRlc1JlYWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLmNsb3NlU3luYyhmZHIpO1xyXG4gICAgICAgIGZzLmNsb3NlU3luYyhmZHcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIHRoZSBmb2xkZXIgYW5kIGFsbCBvZiBpdHMgY29udGVudCAocm0gLXJmKS5cclxuICAgICAqIEBwYXJhbSBwYXRoIHBhdGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVGb2xkZXJSZWN1cnNpdmUocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGZpbGVzID0gW107XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkgKSB7XHJcbiAgICAgICAgICAgIGZpbGVzID0gZnMucmVhZGRpclN5bmMocGF0aCk7XHJcbiAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZnVuY3Rpb24oZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VyUGF0aCA9IHBhdGggKyAnLycgKyBmaWxlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZzLmxzdGF0U3luYyhjdXJQYXRoKS5pc0RpcmVjdG9yeSgpKSB7IC8vIHJlY3Vyc2VcclxuICAgICAgICAgICAgICAgICAgICBGaWxlVXRpbC5kZWxldGVGb2xkZXJSZWN1cnNpdmUoY3VyUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBkZWxldGUgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIGZzLnVubGlua1N5bmMoY3VyUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBmcy5ybWRpclN5bmMocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVsZXRlIGZvbGRlcnMgY29udGVudCByZWN1cnNpdmVseSwgYnV0IGRvIG5vdCBkZWxldGUgZm9sZGVyLlxyXG4gICAgICogRm9sZGVyIGlzIGxlZnQgZW1wdHkgYXQgdGhlIGVuZC5cclxuICAgICAqIEBwYXJhbSBwYXRoIHBhdGhcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWxldGVGb2xkZXJDb250ZW50UmVjdXJzaXZlKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBmaWxlcyA9IFtdO1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpICkge1xyXG4gICAgICAgICAgICBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKHBhdGgpO1xyXG4gICAgICAgICAgICBmaWxlcy5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1clBhdGggPSBwYXRoICsgJy8nICsgZmlsZTtcclxuICAgICAgICAgICAgICAgIGlmIChmcy5sc3RhdFN5bmMoY3VyUGF0aCkuaXNEaXJlY3RvcnkoKSkgeyAvLyByZWN1cnNlXHJcbiAgICAgICAgICAgICAgICAgICAgRmlsZVV0aWwuZGVsZXRlRm9sZGVyUmVjdXJzaXZlKGN1clBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gZGVsZXRlIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICBmcy51bmxpbmtTeW5jKGN1clBhdGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWxldGUgYSBmaWxlLlxyXG4gICAgICogQHBhcmFtIHBhdGggcGF0aFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZUZpbGUocGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgZnMudW5saW5rU3luYyhwYXRoKTtcclxuICAgIH1cclxufVxyXG4iXX0=