/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AbstractMessageParser } from './abstract-message-parser';
import { TagMapping } from './tag-mapping';
import { ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
var /**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
XliffMessageParser = /** @class */ (function (_super) {
    tslib_1.__extends(XliffMessageParser, _super);
    function XliffMessageParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Handle this element node.
     * This is called before the children are done.
     * @param elementNode elementNode
     * @param message message to be altered
     * @return true, if children should be processed too, false otherwise (children ignored then)
     */
    /**
     * Handle this element node.
     * This is called before the children are done.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?} true, if children should be processed too, false otherwise (children ignored then)
     */
    XliffMessageParser.prototype.processStartElement = /**
     * Handle this element node.
     * This is called before the children are done.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?} true, if children should be processed too, false otherwise (children ignored then)
     */
    function (elementNode, message) {
        /** @type {?} */
        var tagName = elementNode.tagName;
        /** @type {?} */
        var tagMapping = new TagMapping();
        if (tagName === 'x') {
            // placeholder are like <x id="INTERPOLATION"/> or <x id="INTERPOLATION_1">
            /** @type {?} */
            var id = elementNode.getAttribute('id');
            if (!id) {
                return; // should not happen
            }
            if (id.startsWith('INTERPOLATION')) {
                /** @type {?} */
                var index = this.parsePlaceholderIndexFromId(id);
                message.addPlaceholder(index, null);
            }
            else if (id.startsWith('ICU')) {
                /** @type {?} */
                var index = this.parseICUMessageRefIndexFromId(id);
                message.addICUMessageRef(index, null);
            }
            else if (id.startsWith('START_')) {
                /** @type {?} */
                var normalizedTagName = tagMapping.getTagnameFromStartTagPlaceholderName(id);
                if (normalizedTagName) {
                    /** @type {?} */
                    var idcount = this.parseIdCountFromName(id);
                    message.addStartTag(normalizedTagName, idcount);
                }
            }
            else if (id.startsWith('CLOSE_')) {
                /** @type {?} */
                var normalizedTagName = tagMapping.getTagnameFromCloseTagPlaceholderName(id);
                if (normalizedTagName) {
                    message.addEndTag(normalizedTagName);
                }
            }
            else if (tagMapping.isEmptyTagPlaceholderName(id)) {
                /** @type {?} */
                var normalizedTagName = tagMapping.getTagnameFromEmptyTagPlaceholderName(id);
                if (normalizedTagName) {
                    /** @type {?} */
                    var idcount = this.parseIdCountFromName(id);
                    message.addEmptyTag(normalizedTagName, idcount);
                }
            }
        }
        return true;
    };
    /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @param elementNode elementNode
     * @param message message to be altered
     */
    /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    XliffMessageParser.prototype.processEndElement = /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    function (elementNode, message) {
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param id id
     * @return index
     */
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} index
     */
    XliffMessageParser.prototype.parsePlaceholderIndexFromId = /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} index
     */
    function (id) {
        /** @type {?} */
        var indexString = '';
        if (id === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = id.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param id id
     * @return id as number
     */
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} id as number
     */
    XliffMessageParser.prototype.parseICUMessageRefIndexFromId = /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} id as number
     */
    function (id) {
        /** @type {?} */
        var indexString = '';
        if (id === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = id.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.addXmlRepresentationToRoot = /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    function (message, rootElem) {
        var _this = this;
        message.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            /** @type {?} */
            var child;
            switch (part.type) {
                case ParsedMessagePartType.TEXT:
                    child = _this.createXmlRepresentationOfTextPart((/** @type {?} */ (part)), rootElem);
                    break;
                case ParsedMessagePartType.START_TAG:
                    child = _this.createXmlRepresentationOfStartTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.END_TAG:
                    child = _this.createXmlRepresentationOfEndTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.EMPTY_TAG:
                    child = _this.createXmlRepresentationOfEmptyTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.PLACEHOLDER:
                    child = _this.createXmlRepresentationOfPlaceholderPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.ICU_MESSAGE_REF:
                    child = _this.createXmlRepresentationOfICUMessageRefPart(((/** @type {?} */ (part))), rootElem);
                    break;
            }
            if (child) {
                rootElem.appendChild(child);
            }
        }));
    };
    /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfStartTagPart = /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var idAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        /** @type {?} */
        var ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        /** @type {?} */
        var equivTextAttr = '<' + part.tagName() + '>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    };
    /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfEndTagPart = /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var idAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        /** @type {?} */
        var ctypeAttrib = 'x-' + part.tagName();
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        return xElem;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var idAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        /** @type {?} */
        var ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        /** @type {?} */
        var equivTextAttr = '<' + part.tagName() + '/>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    };
    /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var idAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            idAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        /** @type {?} */
        var equivTextAttr = part.disp();
        xElem.setAttribute('id', idAttrib);
        if (equivTextAttr) {
            xElem.setAttribute('equiv-text', equivTextAttr);
        }
        return xElem;
    };
    /**
     * the xml used for icu message refs in the message.
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for icu message refs in the message.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = /**
     * the xml used for icu message refs in the message.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var idAttrib = 'ICU';
        if (part.index() > 0) {
            idAttrib = 'ICU_' + part.index().toString(10);
        }
        xElem.setAttribute('id', idAttrib);
        return xElem;
    };
    return XliffMessageParser;
}(AbstractMessageParser));
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
export { XliffMessageParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVzc2FnZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3hsaWZmLW1lc3NhZ2UtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFLaEUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUl6QyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFNNUQ7Ozs7O0lBQXdDLDhDQUFxQjtJQUE3RDs7SUE2TUEsQ0FBQztJQTNNRzs7Ozs7O09BTUc7Ozs7Ozs7OztJQUNPLGdEQUFtQjs7Ozs7Ozs7SUFBN0IsVUFBOEIsV0FBb0IsRUFBRSxPQUFzQjs7WUFDaEUsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPOztZQUM3QixVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFDbkMsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFOzs7Z0JBRVgsRUFBRSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLG9CQUFvQjthQUMvQjtZQUNELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTs7b0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QztpQkFBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7O29CQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtB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LElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNsQixRQUFRLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuQyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUwseUJBQUM7QUFBRCxDQUFDLEFBN01ELENBQXdDLHFCQUFxQixHQTZNNUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Fic3RyYWN0TWVzc2FnZVBhcnNlcn0gZnJvbSAnLi9hYnN0cmFjdC1tZXNzYWdlLXBhcnNlcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZSc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXN0YXJ0LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbmRUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbmQtdGFnJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtcGxhY2Vob2xkZXInO1xyXG5pbXBvcnQge1RhZ01hcHBpbmd9IGZyb20gJy4vdGFnLW1hcHBpbmcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbXB0eS10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWljdS1tZXNzYWdlLXJlZic7XHJcbmltcG9ydCB7aXNOdWxsT3JVbmRlZmluZWR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFRleHR9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC10ZXh0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTAuMDUuMjAxNy5cclxuICogQSBtZXNzYWdlIHBhcnNlciBmb3IgWExJRkYgMS4yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgWGxpZmZNZXNzYWdlUGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlUGFyc2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSB0aGlzIGVsZW1lbnQgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGJlZm9yZSB0aGUgY2hpbGRyZW4gYXJlIGRvbmUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5vZGUgZWxlbWVudE5vZGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgYWx0ZXJlZFxyXG4gICAgICogQHJldHVybiB0cnVlLCBpZiBjaGlsZHJlbiBzaG91bGQgYmUgcHJvY2Vzc2VkIHRvbywgZmFsc2Ugb3RoZXJ3aXNlIChjaGlsZHJlbiBpZ25vcmVkIHRoZW4pXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzU3RhcnRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnROb2RlLnRhZ05hbWU7XHJcbiAgICAgICAgY29uc3QgdGFnTWFwcGluZyA9IG5ldyBUYWdNYXBwaW5nKCk7XHJcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICd4Jykge1xyXG4gICAgICAgICAgICAvLyBwbGFjZWhvbGRlciBhcmUgbGlrZSA8eCBpZD1cIklOVEVSUE9MQVRJT05cIi8+IG9yIDx4IGlkPVwiSU5URVJQT0xBVElPTl8xXCI+XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gZWxlbWVudE5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHNob3VsZCBub3QgaGFwcGVuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkLnN0YXJ0c1dpdGgoJ0lOVEVSUE9MQVRJT04nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcnNlUGxhY2Vob2xkZXJJbmRleEZyb21JZChpZCk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZFBsYWNlaG9sZGVyKGluZGV4LCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZC5zdGFydHNXaXRoKCdJQ1UnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcnNlSUNVTWVzc2FnZVJlZkluZGV4RnJvbUlkKGlkKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkSUNVTWVzc2FnZVJlZihpbmRleCwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQuc3RhcnRzV2l0aCgnU1RBUlRfJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUYWdOYW1lID0gdGFnTWFwcGluZy5nZXRUYWduYW1lRnJvbVN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKGlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkVGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkY291bnQgPSB0aGlzLnBhcnNlSWRDb3VudEZyb21OYW1lKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZFN0YXJ0VGFnKG5vcm1hbGl6ZWRUYWdOYW1lLCBpZGNvdW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZC5zdGFydHNXaXRoKCdDTE9TRV8nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRhZ05hbWUgPSB0YWdNYXBwaW5nLmdldFRhZ25hbWVGcm9tQ2xvc2VUYWdQbGFjZWhvbGRlck5hbWUoaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUYWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRFbmRUYWcobm9ybWFsaXplZFRhZ05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhZ01hcHBpbmcuaXNFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShpZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUYWdOYW1lID0gdGFnTWFwcGluZy5nZXRUYWduYW1lRnJvbUVtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKGlkKTtcclxuICAgICAgICAgICAgICAgIGlmIChub3JtYWxpemVkVGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkY291bnQgPSB0aGlzLnBhcnNlSWRDb3VudEZyb21OYW1lKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZEVtcHR5VGFnKG5vcm1hbGl6ZWRUYWdOYW1lLCBpZGNvdW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBlbmQgb2YgdGhpcyBlbGVtZW50IG5vZGUuXHJcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCBhZnRlciBhbGwgY2hpbGRyZW4gYXJlIHByb2Nlc3NlZC5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50Tm9kZSBlbGVtZW50Tm9kZVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBhbHRlcmVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzRW5kRWxlbWVudChlbGVtZW50Tm9kZTogRWxlbWVudCwgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgaWQgYXR0cmlidXRlIG9mIHggZWxlbWVudCBhcyBwbGFjZWhvbGRlciBpbmRleC5cclxuICAgICAqIGlkIGNhbiBiZSBcIklOVEVSUE9MQVRJT05cIiBvciBcIklOVEVSUE9MQVRJT05fblwiXHJcbiAgICAgKiBAcGFyYW0gaWQgaWRcclxuICAgICAqIEByZXR1cm4gaW5kZXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVBsYWNlaG9sZGVySW5kZXhGcm9tSWQoaWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4U3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChpZCA9PT0gJ0lOVEVSUE9MQVRJT04nKSB7XHJcbiAgICAgICAgICAgIGluZGV4U3RyaW5nID0gJzAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGV4U3RyaW5nID0gaWQuc3Vic3RyaW5nKCdJTlRFUlBPTEFUSU9OXycubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgaWQgYXR0cmlidXRlIG9mIHggZWxlbWVudCBhcyBwbGFjZWhvbGRlciBpbmRleC5cclxuICAgICAqIGlkIGNhbiBiZSBcIklOVEVSUE9MQVRJT05cIiBvciBcIklOVEVSUE9MQVRJT05fblwiXHJcbiAgICAgKiBAcGFyYW0gaWQgaWRcclxuICAgICAqIEByZXR1cm4gaWQgYXMgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VJQ1VNZXNzYWdlUmVmSW5kZXhGcm9tSWQoaWQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4U3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChpZCA9PT0gJ0lDVScpIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSBpZC5zdWJzdHJpbmcoJ0lDVV8nLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoaW5kZXhTdHJpbmcsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkWG1sUmVwcmVzZW50YXRpb25Ub1Jvb3QobWVzc2FnZTogUGFyc2VkTWVzc2FnZSwgcm9vdEVsZW06IEVsZW1lbnQpIHtcclxuICAgICAgICBtZXNzYWdlLnBhcnRzKCkuZm9yRWFjaCgocGFydCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQ6IE5vZGU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocGFydC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5URVhUOlxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mVGV4dFBhcnQoPFBhcnNlZE1lc3NhZ2VQYXJ0VGV4dD4gcGFydCwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuU1RBUlRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mU3RhcnRUYWdQYXJ0KCg8UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZz5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuRU5EX1RBRzpcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVuZFRhZ1BhcnQoKDxQYXJzZWRNZXNzYWdlUGFydEVuZFRhZz5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuRU1QVFlfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW1wdHlUYWdQYXJ0KCg8UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZz5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuUExBQ0VIT0xERVI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQbGFjZWhvbGRlclBhcnQoKDxQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5JQ1VfTUVTU0FHRV9SRUY6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZJQ1VNZXNzYWdlUmVmUGFydCgoPFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZj5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgcm9vdEVsZW0uYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIHN0YXJ0IHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIFJldHVybnMgYW4gZW1wdHkgPHgvPi1FbGVtZW50IHdpdGggYXR0cmlidXRlcyBpZCBhbmQgY3R5cGVcclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlN0YXJ0VGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnLCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCd4Jyk7XHJcbiAgICAgICAgY29uc3QgdGFnTWFwcGluZyA9IG5ldyBUYWdNYXBwaW5nKCk7XHJcbiAgICAgICAgY29uc3QgaWRBdHRyaWIgPSB0YWdNYXBwaW5nLmdldFN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKHBhcnQudGFnTmFtZSgpLCBwYXJ0LmlkQ291bnRlcigpKTtcclxuICAgICAgICBjb25zdCBjdHlwZUF0dHJpYiA9IHRhZ01hcHBpbmcuZ2V0Q3R5cGVGb3JUYWcocGFydC50YWdOYW1lKCkpO1xyXG4gICAgICAgIGNvbnN0IGVxdWl2VGV4dEF0dHIgPSAnPCcgKyBwYXJ0LnRhZ05hbWUoKSArICc+JztcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRBdHRyaWIpO1xyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnY3R5cGUnLCBjdHlwZUF0dHJpYik7XHJcbiAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdlcXVpdi10ZXh0JywgZXF1aXZUZXh0QXR0cik7XHJcbiAgICAgICAgcmV0dXJuIHhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBlbmQgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiBlbXB0eSA8eC8+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGVzIGlkIGFuZCBjdHlwZVxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW5kVGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydEVuZFRhZywgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCB4RWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgneCcpO1xyXG4gICAgICAgIGNvbnN0IHRhZ01hcHBpbmcgPSBuZXcgVGFnTWFwcGluZygpO1xyXG4gICAgICAgIGNvbnN0IGlkQXR0cmliID0gdGFnTWFwcGluZy5nZXRDbG9zZVRhZ1BsYWNlaG9sZGVyTmFtZShwYXJ0LnRhZ05hbWUoKSk7XHJcbiAgICAgICAgY29uc3QgY3R5cGVBdHRyaWIgPSAneC0nICsgcGFydC50YWdOYW1lKCk7XHJcbiAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIGlkQXR0cmliKTtcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2N0eXBlJywgY3R5cGVBdHRyaWIpO1xyXG4gICAgICAgIHJldHVybiB4RWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgZW1wdHkgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiBlbXB0eSA8eC8+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGVzIGlkIGFuZCBjdHlwZVxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW1wdHlUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgeEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcclxuICAgICAgICBjb25zdCB0YWdNYXBwaW5nID0gbmV3IFRhZ01hcHBpbmcoKTtcclxuICAgICAgICBjb25zdCBpZEF0dHJpYiA9IHRhZ01hcHBpbmcuZ2V0RW1wdHlUYWdQbGFjZWhvbGRlck5hbWUocGFydC50YWdOYW1lKCksIHBhcnQuaWRDb3VudGVyKCkpO1xyXG4gICAgICAgIGNvbnN0IGN0eXBlQXR0cmliID0gdGFnTWFwcGluZy5nZXRDdHlwZUZvclRhZyhwYXJ0LnRhZ05hbWUoKSk7XHJcbiAgICAgICAgY29uc3QgZXF1aXZUZXh0QXR0ciA9ICc8JyArIHBhcnQudGFnTmFtZSgpICsgJy8+JztcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRBdHRyaWIpO1xyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnY3R5cGUnLCBjdHlwZUF0dHJpYik7XHJcbiAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdlcXVpdi10ZXh0JywgZXF1aXZUZXh0QXR0cik7XHJcbiAgICAgICAgcmV0dXJuIHhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBwbGFjZWhvbGRlciBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIFJldHVybnMgYW4gZW1wdHkgPHgvPi1FbGVtZW50IHdpdGggYXR0cmlidXRlIGlkPVwiSU5URVJQT0xBVElPTlwiIG9yIGlkPVwiSU5URVJQT0xBVElPTl9uXCJcclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlBsYWNlaG9sZGVyUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyLCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCd4Jyk7XHJcbiAgICAgICAgbGV0IGlkQXR0cmliID0gJ0lOVEVSUE9MQVRJT04nO1xyXG4gICAgICAgIGlmIChwYXJ0LmluZGV4KCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGlkQXR0cmliID0gJ0lOVEVSUE9MQVRJT05fJyArIHBhcnQuaW5kZXgoKS50b1N0cmluZygxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVxdWl2VGV4dEF0dHIgPSBwYXJ0LmRpc3AoKTtcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRBdHRyaWIpO1xyXG4gICAgICAgIGlmIChlcXVpdlRleHRBdHRyKSB7XHJcbiAgICAgICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnZXF1aXYtdGV4dCcsIGVxdWl2VGV4dEF0dHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGljdSBtZXNzYWdlIHJlZnMgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZJQ1VNZXNzYWdlUmVmUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWYsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgeEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcclxuICAgICAgICBsZXQgaWRBdHRyaWIgPSAnSUNVJztcclxuICAgICAgICBpZiAocGFydC5pbmRleCgpID4gMCkge1xyXG4gICAgICAgICAgICBpZEF0dHJpYiA9ICdJQ1VfJyArIHBhcnQuaW5kZXgoKS50b1N0cmluZygxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpZEF0dHJpYik7XHJcbiAgICAgICAgcmV0dXJuIHhFbGVtO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=