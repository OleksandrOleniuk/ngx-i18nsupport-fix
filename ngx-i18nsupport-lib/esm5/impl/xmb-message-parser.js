/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AbstractMessageParser } from './abstract-message-parser';
import { DOMUtilities } from './dom-utilities';
import { TagMapping } from './tag-mapping';
import { ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
var /**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
XmbMessageParser = /** @class */ (function (_super) {
    tslib_1.__extends(XmbMessageParser, _super);
    function XmbMessageParser() {
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
    XmbMessageParser.prototype.processStartElement = /**
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
        if (tagName === 'ph') {
            // There are 4 different usages of ph element:
            // 1. placeholders are like <ph name="INTERPOLATION"><ex>INTERPOLATION</ex></ph>
            // or <ph name="INTERPOLATION_1"><ex>INTERPOLATION_1</ex></ph>
            // 2. start tags:
            // <ph name="START_LINK"><ex>&lt;a&gt;</ex></ph>
            // 3. empty tags:
            // <ph name="TAG_IMG"><ex>&lt;img&gt;</ex></ph>
            // 4. ICU:
            // <ph name="ICU"><ex>ICU</ex></ph>
            /** @type {?} */
            var name_1 = elementNode.getAttribute('name');
            if (!name_1) {
                return true; // should not happen
            }
            if (name_1.startsWith('INTERPOLATION')) {
                /** @type {?} */
                var index = this.parsePlaceholderIndexFromName(name_1);
                message.addPlaceholder(index, null);
                return false; // ignore children
            }
            else if (name_1.startsWith('START_')) {
                /** @type {?} */
                var tag = this.parseTagnameFromPhElement(elementNode);
                /** @type {?} */
                var idcounter = this.parseIdCountFromName(name_1);
                if (tag) {
                    message.addStartTag(tag, idcounter);
                }
                return false; // ignore children
            }
            else if (name_1.startsWith('CLOSE_')) {
                /** @type {?} */
                var tag = this.parseTagnameFromPhElement(elementNode);
                if (tag) {
                    message.addEndTag(tag);
                }
                return false; // ignore children
            }
            else if (new TagMapping().isEmptyTagPlaceholderName(name_1)) {
                /** @type {?} */
                var emptyTagName = new TagMapping().getTagnameFromEmptyTagPlaceholderName(name_1);
                /** @type {?} */
                var idcounter = this.parseIdCountFromName(name_1);
                message.addEmptyTag(emptyTagName, idcounter);
                return false; // ignore children
            }
            else if (name_1.startsWith('ICU')) {
                /** @type {?} */
                var index = this.parseICUMessageIndexFromName(name_1);
                message.addICUMessageRef(index, null);
                return false; // ignore children
            }
        }
        else if (tagName === 'source') {
            // ignore source
            return false;
        }
        return true;
    };
    /**
     * Return the ICU message content of the node, if it is an ICU Message.
     * @param node node
     * @return message or null, if it is no ICU Message.
     */
    /**
     * Return the ICU message content of the node, if it is an ICU Message.
     * @protected
     * @param {?} node node
     * @return {?} message or null, if it is no ICU Message.
     */
    XmbMessageParser.prototype.getICUMessageText = /**
     * Return the ICU message content of the node, if it is an ICU Message.
     * @protected
     * @param {?} node node
     * @return {?} message or null, if it is no ICU Message.
     */
    function (node) {
        /** @type {?} */
        var children = node.childNodes;
        if (children.length === 0) {
            return null;
        }
        /** @type {?} */
        var firstChild = null;
        // find first child that is no source element.
        /** @type {?} */
        var i;
        for (i = 0; i < children.length; i++) {
            /** @type {?} */
            var child = children.item(i);
            if (child.nodeType !== child.ELEMENT_NODE || ((/** @type {?} */ (child))).tagName !== 'source') {
                firstChild = child;
                break;
            }
        }
        if (firstChild && firstChild.nodeType === firstChild.TEXT_NODE) {
            if (this.isICUMessageStart(firstChild.textContent)) {
                /** @type {?} */
                var messageText = DOMUtilities.getXMLContent((/** @type {?} */ (node)));
                if (i > 0) {
                    // drop <source> elements
                    /** @type {?} */
                    var reSource = new RegExp('<source[^>]*>.*</source>', 'g');
                    return messageText.replace(reSource, '');
                }
                else {
                    return messageText;
                }
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
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
    XmbMessageParser.prototype.processEndElement = /**
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
     * @param name name
     * @return id as number
     */
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    XmbMessageParser.prototype.parsePlaceholderIndexFromName = /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    function (name) {
        /** @type {?} */
        var indexString = '';
        if (name === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = name.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @param name name
     * @return id as number
     */
    /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    XmbMessageParser.prototype.parseICUMessageIndexFromName = /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    function (name) {
        /** @type {?} */
        var indexString = '';
        if (name === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = name.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @param phElement phElement
     */
    /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @private
     * @param {?} phElement phElement
     * @return {?}
     */
    XmbMessageParser.prototype.parseTagnameFromPhElement = /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @private
     * @param {?} phElement phElement
     * @return {?}
     */
    function (phElement) {
        /** @type {?} */
        var exElement = DOMUtilities.getFirstElementByTagName(phElement, 'ex');
        if (exElement) {
            /** @type {?} */
            var value = DOMUtilities.getPCDATA(exElement);
            if (!value || !value.startsWith('<') || !value.endsWith('>')) {
                // oops
                return null;
            }
            if (value.charAt(1) === '/') {
                return value.substring(2, value.length - 1);
            }
            else {
                return value.substring(1, value.length - 1);
            }
        }
        else {
            return null;
        }
    };
    /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.addXmlRepresentationToRoot = /**
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
            var child = _this.createXmlRepresentationOfPart(part, rootElem);
            if (child) {
                rootElem.appendChild(child);
            }
        }));
    };
    /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfPart = /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    function (part, rootElem) {
        switch (part.type) {
            case ParsedMessagePartType.TEXT:
                return this.createXmlRepresentationOfTextPart((/** @type {?} */ (part)), rootElem);
            case ParsedMessagePartType.START_TAG:
                return this.createXmlRepresentationOfStartTagPart(((/** @type {?} */ (part))), rootElem);
            case ParsedMessagePartType.END_TAG:
                return this.createXmlRepresentationOfEndTagPart(((/** @type {?} */ (part))), rootElem);
            case ParsedMessagePartType.EMPTY_TAG:
                return this.createXmlRepresentationOfEmptyTagPart(((/** @type {?} */ (part))), rootElem);
            case ParsedMessagePartType.PLACEHOLDER:
                return this.createXmlRepresentationOfPlaceholderPart(((/** @type {?} */ (part))), rootElem);
            case ParsedMessagePartType.ICU_MESSAGE_REF:
                return this.createXmlRepresentationOfICUMessageRefPart(((/** @type {?} */ (part))), rootElem);
        }
    };
    /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfStartTagPart = /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var nameAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfEndTagPart = /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var nameAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('</' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var nameAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var nameAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            nameAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
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
    XmbMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = /**
     * the xml used for icu message refs in the message.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var nameAttrib = 'ICU';
        if (part.index() > 0) {
            nameAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
    };
    return XmbMessageParser;
}(AbstractMessageParser));
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
export { XmbMessageParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iLW1lc3NhZ2UtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC94bWItbWVzc2FnZS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd6QyxPQUFPLEVBQW9CLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTS9FOzs7OztJQUFzQyw0Q0FBcUI7SUFBM0Q7O0lBcVJBLENBQUM7SUFuUkc7Ozs7OztPQU1HOzs7Ozs7Ozs7SUFDTyw4Q0FBbUI7Ozs7Ozs7O0lBQTdCLFVBQThCLFdBQW9CLEVBQUUsT0FBc0I7O1lBQ2hFLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTztRQUNuQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7Ozs7Ozs7Ozs7O2dCQVVaLE1BQUksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBSSxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFDLENBQUMsb0JBQW9CO2FBQ3BDO1lBQ0QsSUFBSSxNQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFOztvQkFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxNQUFJLENBQUM7Z0JBQ3RELE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLEtBQUssQ0FBQyxDQUFDLGtCQUFrQjthQUNuQztpQkFBTSxJQUFJLE1BQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7O29CQUM1QixHQUFHLEdBQUcsSUFB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SUFBb0MsRUFBRSxRQUFpQjs7WUFDbEcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7WUFDckQsVUFBVSxHQUFHLEtBQUs7UUFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLFVBQVUsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNuRDtRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztZQUNsQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFyUkQsQ0FBc0MscUJBQXFCLEdBcVIxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWJzdHJhY3RNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlJztcclxuaW1wb3J0IHtET01VdGlsaXRpZXN9IGZyb20gJy4vZG9tLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXN0YXJ0LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbmRUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbmQtdGFnJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtcGxhY2Vob2xkZXInO1xyXG5pbXBvcnQge1RhZ01hcHBpbmd9IGZyb20gJy4vdGFnLW1hcHBpbmcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbXB0eS10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWljdS1tZXNzYWdlLXJlZic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnQsIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZX0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0JztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFRleHR9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC10ZXh0JztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTAuMDUuMjAxNy5cclxuICogQSBtZXNzYWdlIHBhcnNlciBmb3IgWE1CXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgWG1iTWVzc2FnZVBhcnNlciBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVBhcnNlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgdGhpcyBlbGVtZW50IG5vZGUuXHJcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCBiZWZvcmUgdGhlIGNoaWxkcmVuIGFyZSBkb25lLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqIEByZXR1cm4gdHJ1ZSwgaWYgY2hpbGRyZW4gc2hvdWxkIGJlIHByb2Nlc3NlZCB0b28sIGZhbHNlIG90aGVyd2lzZSAoY2hpbGRyZW4gaWdub3JlZCB0aGVuKVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc1N0YXJ0RWxlbWVudChlbGVtZW50Tm9kZTogRWxlbWVudCwgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50Tm9kZS50YWdOYW1lO1xyXG4gICAgICAgIGlmICh0YWdOYW1lID09PSAncGgnKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZXJlIGFyZSA0IGRpZmZlcmVudCB1c2FnZXMgb2YgcGggZWxlbWVudDpcclxuICAgICAgICAgICAgLy8gMS4gcGxhY2Vob2xkZXJzIGFyZSBsaWtlIDxwaCBuYW1lPVwiSU5URVJQT0xBVElPTlwiPjxleD5JTlRFUlBPTEFUSU9OPC9leD48L3BoPlxyXG4gICAgICAgICAgICAvLyBvciA8cGggbmFtZT1cIklOVEVSUE9MQVRJT05fMVwiPjxleD5JTlRFUlBPTEFUSU9OXzE8L2V4PjwvcGg+XHJcbiAgICAgICAgICAgIC8vIDIuIHN0YXJ0IHRhZ3M6XHJcbiAgICAgICAgICAgIC8vIDxwaCBuYW1lPVwiU1RBUlRfTElOS1wiPjxleD4mbHQ7YSZndDs8L2V4PjwvcGg+XHJcbiAgICAgICAgICAgIC8vIDMuIGVtcHR5IHRhZ3M6XHJcbiAgICAgICAgICAgIC8vIDxwaCBuYW1lPVwiVEFHX0lNR1wiPjxleD4mbHQ7aW1nJmd0OzwvZXg+PC9waD5cclxuICAgICAgICAgICAgLy8gNC4gSUNVOlxyXG4gICAgICAgICAgICAvLyA8cGggbmFtZT1cIklDVVwiPjxleD5JQ1U8L2V4PjwvcGg+XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gc2hvdWxkIG5vdCBoYXBwZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmFtZS5zdGFydHNXaXRoKCdJTlRFUlBPTEFUSU9OJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJzZVBsYWNlaG9sZGVySW5kZXhGcm9tTmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkUGxhY2Vob2xkZXIoaW5kZXgsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgY2hpbGRyZW5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ1NUQVJUXycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLnBhcnNlVGFnbmFtZUZyb21QaEVsZW1lbnQoZWxlbWVudE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWRjb3VudGVyID0gdGhpcy5wYXJzZUlkQ291bnRGcm9tTmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZFN0YXJ0VGFnKHRhZywgaWRjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gaWdub3JlIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdDTE9TRV8nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnID0gdGhpcy5wYXJzZVRhZ25hbWVGcm9tUGhFbGVtZW50KGVsZW1lbnROb2RlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0YWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZEVuZFRhZyh0YWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgY2hpbGRyZW5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXcgVGFnTWFwcGluZygpLmlzRW1wdHlUYWdQbGFjZWhvbGRlck5hbWUobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtcHR5VGFnTmFtZSA9IG5ldyBUYWdNYXBwaW5nKCkuZ2V0VGFnbmFtZUZyb21FbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkY291bnRlciA9IHRoaXMucGFyc2VJZENvdW50RnJvbU5hbWUobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZEVtcHR5VGFnKGVtcHR5VGFnTmFtZSwgaWRjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gaWdub3JlIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZS5zdGFydHNXaXRoKCdJQ1UnKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcnNlSUNVTWVzc2FnZUluZGV4RnJvbU5hbWUobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZElDVU1lc3NhZ2VSZWYoaW5kZXgsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgY2hpbGRyZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gJ3NvdXJjZScpIHtcclxuICAgICAgICAgICAgLy8gaWdub3JlIHNvdXJjZVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBJQ1UgbWVzc2FnZSBjb250ZW50IG9mIHRoZSBub2RlLCBpZiBpdCBpcyBhbiBJQ1UgTWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBub2RlIG5vZGVcclxuICAgICAqIEByZXR1cm4gbWVzc2FnZSBvciBudWxsLCBpZiBpdCBpcyBubyBJQ1UgTWVzc2FnZS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldElDVU1lc3NhZ2VUZXh0KG5vZGU6IE5vZGUpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzO1xyXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBmaXJzdENoaWxkID0gbnVsbDtcclxuICAgICAgICAvLyBmaW5kIGZpcnN0IGNoaWxkIHRoYXQgaXMgbm8gc291cmNlIGVsZW1lbnQuXHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW4uaXRlbShpKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlICE9PSBjaGlsZC5FTEVNRU5UX05PREUgfHwgKDxFbGVtZW50PiBjaGlsZCkudGFnTmFtZSAhPT0gJ3NvdXJjZScpIHtcclxuICAgICAgICAgICAgICAgIGZpcnN0Q2hpbGQgPSBjaGlsZDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdENoaWxkICYmIGZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IGZpcnN0Q2hpbGQuVEVYVF9OT0RFKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSUNVTWVzc2FnZVN0YXJ0KGZpcnN0Q2hpbGQudGV4dENvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlVGV4dCA9IERPTVV0aWxpdGllcy5nZXRYTUxDb250ZW50KDxFbGVtZW50PiBub2RlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRyb3AgPHNvdXJjZT4gZWxlbWVudHNcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZVNvdXJjZTogUmVnRXhwID0gbmV3IFJlZ0V4cCgnPHNvdXJjZVtePl0qPi4qPC9zb3VyY2U+JywgJ2cnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZVRleHQucmVwbGFjZShyZVNvdXJjZSwgJycpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZVRleHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBlbmQgb2YgdGhpcyBlbGVtZW50IG5vZGUuXHJcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCBhZnRlciBhbGwgY2hpbGRyZW4gYXJlIHByb2Nlc3NlZC5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50Tm9kZSBlbGVtZW50Tm9kZVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBhbHRlcmVkXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzRW5kRWxlbWVudChlbGVtZW50Tm9kZTogRWxlbWVudCwgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgaWQgYXR0cmlidXRlIG9mIHggZWxlbWVudCBhcyBwbGFjZWhvbGRlciBpbmRleC5cclxuICAgICAqIGlkIGNhbiBiZSBcIklOVEVSUE9MQVRJT05cIiBvciBcIklOVEVSUE9MQVRJT05fblwiXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIGlkIGFzIG51bWJlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlUGxhY2Vob2xkZXJJbmRleEZyb21OYW1lKG5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4U3RyaW5nID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChuYW1lID09PSAnSU5URVJQT0xBVElPTicpIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSBuYW1lLnN1YnN0cmluZygnSU5URVJQT0xBVElPTl8nLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoaW5kZXhTdHJpbmcsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIGlkIGF0dHJpYnV0ZSBvZiB4IGVsZW1lbnQgYXMgSUNVIG1lc3NhZ2UgcmVmIGluZGV4LlxyXG4gICAgICogaWQgY2FuIGJlIFwiSUNVXCIgb3IgXCJJQ1VfblwiXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBuYW1lXHJcbiAgICAgKiBAcmV0dXJuIGlkIGFzIG51bWJlclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlSUNVTWVzc2FnZUluZGV4RnJvbU5hbWUobmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaW5kZXhTdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgPT09ICdJQ1UnKSB7XHJcbiAgICAgICAgICAgIGluZGV4U3RyaW5nID0gJzAnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGV4U3RyaW5nID0gbmFtZS5zdWJzdHJpbmcoJ0lDVV8nLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQoaW5kZXhTdHJpbmcsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIHRoZSB0YWcgbmFtZSBmcm9tIGEgcGggZWxlbWVudC5cclxuICAgICAqIEl0IGNvbnRhaW5lZCBpbiB0aGUgPGV4PiBzdWJlbGVtZW50cyB2YWx1ZSBhbmQgZW5jbG9zZWQgaW4gPD4uXHJcbiAgICAgKiBFeGFtcGxlOiA8cGggbmFtZT1cIlNUQVJUX0JPTERfVEVYVFwiPjxleD4mbHQ7YiZndDs8L2V4PjwvcGg+XHJcbiAgICAgKiBAcGFyYW0gcGhFbGVtZW50IHBoRWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlVGFnbmFtZUZyb21QaEVsZW1lbnQocGhFbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBleEVsZW1lbnQgPSBET01VdGlsaXRpZXMuZ2V0Rmlyc3RFbGVtZW50QnlUYWdOYW1lKHBoRWxlbWVudCwgJ2V4Jyk7XHJcbiAgICAgICAgaWYgKGV4RWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IERPTVV0aWxpdGllcy5nZXRQQ0RBVEEoZXhFbGVtZW50KTtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUuc3RhcnRzV2l0aCgnPCcpIHx8ICF2YWx1ZS5lbmRzV2l0aCgnPicpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvb3BzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmFsdWUuY2hhckF0KDEpID09PSAnLycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zdWJzdHJpbmcoMiwgdmFsdWUubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuc3Vic3RyaW5nKDEsIHZhbHVlLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRYbWxSZXByZXNlbnRhdGlvblRvUm9vdChtZXNzYWdlOiBQYXJzZWRNZXNzYWdlLCByb290RWxlbTogRWxlbWVudCkge1xyXG4gICAgICAgIG1lc3NhZ2UucGFydHMoKS5mb3JFYWNoKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mUGFydChwYXJ0LCByb290RWxlbSk7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgcm9vdEVsZW0uYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0LCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIHN3aXRjaCAocGFydC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlRFWFQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mVGV4dFBhcnQoPFBhcnNlZE1lc3NhZ2VQYXJ0VGV4dD4gcGFydCwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5TVEFSVF9UQUc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mU3RhcnRUYWdQYXJ0KCg8UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZz5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTkRfVEFHOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVuZFRhZ1BhcnQoKDxQYXJzZWRNZXNzYWdlUGFydEVuZFRhZz5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTVBUWV9UQUc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW1wdHlUYWdQYXJ0KCg8UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZz5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5QTEFDRUhPTERFUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQbGFjZWhvbGRlclBhcnQoKDxQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFX1JFRjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZJQ1VNZXNzYWdlUmVmUGFydCgoPFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZj5wYXJ0KSwgcm9vdEVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3Igc3RhcnQgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiA8cGg+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGUgbmFtZSBhbmQgc3ViZWxlbWVudCBleFxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mU3RhcnRUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcGhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwaCcpO1xyXG4gICAgICAgIGNvbnN0IHRhZ01hcHBpbmcgPSBuZXcgVGFnTWFwcGluZygpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVBdHRyaWIgPSB0YWdNYXBwaW5nLmdldFN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKHBhcnQudGFnTmFtZSgpLCBwYXJ0LmlkQ291bnRlcigpKTtcclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCduYW1lJywgbmFtZUF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZXhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdleCcpO1xyXG4gICAgICAgIGV4RWxlbS5hcHBlbmRDaGlsZChyb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCc8JyArIHBhcnQudGFnTmFtZSgpICsgJz4nKSk7XHJcbiAgICAgICAgcGhFbGVtLmFwcGVuZENoaWxkKGV4RWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgZW5kIHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIFJldHVybnMgYW4gPHBoPi1FbGVtZW50IHdpdGggYXR0cmlidXRlIG5hbWUgYW5kIHN1YmVsZW1lbnQgZXhcclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVuZFRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRFbmRUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcGhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwaCcpO1xyXG4gICAgICAgIGNvbnN0IHRhZ01hcHBpbmcgPSBuZXcgVGFnTWFwcGluZygpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVBdHRyaWIgPSB0YWdNYXBwaW5nLmdldENsb3NlVGFnUGxhY2Vob2xkZXJOYW1lKHBhcnQudGFnTmFtZSgpKTtcclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCduYW1lJywgbmFtZUF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZXhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdleCcpO1xyXG4gICAgICAgIGV4RWxlbS5hcHBlbmRDaGlsZChyb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCc8LycgKyBwYXJ0LnRhZ05hbWUoKSArICc+JykpO1xyXG4gICAgICAgIHBoRWxlbS5hcHBlbmRDaGlsZChleEVsZW0pO1xyXG4gICAgICAgIHJldHVybiBwaEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGVtcHR5IHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIFJldHVybnMgYW4gPHBoPi1FbGVtZW50IHdpdGggYXR0cmlidXRlIG5hbWUgYW5kIHN1YmVsZW1lbnQgZXhcclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVtcHR5VGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydEVtcHR5VGFnLCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHBoRWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGgnKTtcclxuICAgICAgICBjb25zdCB0YWdNYXBwaW5nID0gbmV3IFRhZ01hcHBpbmcoKTtcclxuICAgICAgICBjb25zdCBuYW1lQXR0cmliID0gdGFnTWFwcGluZy5nZXRFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShwYXJ0LnRhZ05hbWUoKSwgcGFydC5pZENvdW50ZXIoKSk7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWVBdHRyaWIpO1xyXG4gICAgICAgIGNvbnN0IGV4RWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZXgnKTtcclxuICAgICAgICBleEVsZW0uYXBwZW5kQ2hpbGQocm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnPCcgKyBwYXJ0LnRhZ05hbWUoKSArICc+JykpO1xyXG4gICAgICAgIHBoRWxlbS5hcHBlbmRDaGlsZChleEVsZW0pO1xyXG4gICAgICAgIHJldHVybiBwaEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIHBsYWNlaG9sZGVyIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiA8cGg+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGUgbmFtZSBhbmQgc3ViZWxlbWVudCBleFxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mUGxhY2Vob2xkZXJQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXIsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcGhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwaCcpO1xyXG4gICAgICAgIGxldCBuYW1lQXR0cmliID0gJ0lOVEVSUE9MQVRJT04nO1xyXG4gICAgICAgIGlmIChwYXJ0LmluZGV4KCkgPiAwKSB7XHJcbiAgICAgICAgICAgIG5hbWVBdHRyaWIgPSAnSU5URVJQT0xBVElPTl8nICsgcGFydC5pbmRleCgpLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWVBdHRyaWIpO1xyXG4gICAgICAgIGNvbnN0IGV4RWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZXgnKTtcclxuICAgICAgICBleEVsZW0uYXBwZW5kQ2hpbGQocm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuYW1lQXR0cmliKSk7XHJcbiAgICAgICAgcGhFbGVtLmFwcGVuZENoaWxkKGV4RWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgaWN1IG1lc3NhZ2UgcmVmcyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZiwgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgbGV0IG5hbWVBdHRyaWIgPSAnSUNVJztcclxuICAgICAgICBpZiAocGFydC5pbmRleCgpID4gMCkge1xyXG4gICAgICAgICAgICBuYW1lQXR0cmliID0gJ0lDVV8nICsgcGFydC5pbmRleCgpLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnbmFtZScsIG5hbWVBdHRyaWIpO1xyXG4gICAgICAgIGNvbnN0IGV4RWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZXgnKTtcclxuICAgICAgICBleEVsZW0uYXBwZW5kQ2hpbGQocm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuYW1lQXR0cmliKSk7XHJcbiAgICAgICAgcGhFbGVtLmFwcGVuZENoaWxkKGV4RWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxufVxyXG4iXX0=