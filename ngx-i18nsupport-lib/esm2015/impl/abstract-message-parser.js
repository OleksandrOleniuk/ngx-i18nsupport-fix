/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ParsedMessage } from './parsed-message';
import { EMPTY_TAG, END_TAG, ICU_MESSAGE, ICU_MESSAGE_REF, ParsedMesageTokenizer, PLACEHOLDER, START_TAG, TEXT } from './parsed-message-tokenizer';
import { DOMParser } from 'xmldom';
import { format, isNullOrUndefined } from 'util';
import { DOMUtilities } from './dom-utilities';
import { ParsedMessagePartICUMessage } from './parsed-message-part-icu-message';
/**
 * Created by roobm on 10.05.2017.
 * A message parser can parse the xml content of a translatable message.
 * It generates a ParsedMessage from it.
 * @abstract
 */
export class AbstractMessageParser {
    /**
     * Parse XML to ParsedMessage.
     * @param {?} xmlElement the xml representation
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    createNormalizedMessageFromXML(xmlElement, sourceMessage) {
        /** @type {?} */
        const message = new ParsedMessage(this, sourceMessage);
        if (xmlElement) {
            message.setXmlRepresentation(xmlElement);
            this.addPartsOfNodeToMessage(xmlElement, message, false);
        }
        return message;
    }
    /**
     * Parse XML string to ParsedMessage.
     * @param {?} xmlString the xml representation without root element, e.g. this is <ph x></ph> an example.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    createNormalizedMessageFromXMLString(xmlString, sourceMessage) {
        /** @type {?} */
        const doc = new DOMParser().parseFromString('<dummy>' + xmlString + '</dummy>', 'text/xml');
        /** @type {?} */
        const xmlElement = (/** @type {?} */ (doc.childNodes.item(0)));
        return this.createNormalizedMessageFromXML(xmlElement, sourceMessage);
    }
    /**
     * recursively run through a node and add all identified parts to the message.
     * @private
     * @param {?} node node
     * @param {?} message message to be generated.
     * @param {?} includeSelf if true, add node by itself, otherwise only children.
     * @return {?}
     */
    addPartsOfNodeToMessage(node, message, includeSelf) {
        /** @type {?} */
        let processChildren = true;
        if (includeSelf) {
            if (node.nodeType === node.TEXT_NODE) {
                message.addText(node.textContent);
                return;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                processChildren = this.processStartElement((/** @type {?} */ (node)), message);
            }
        }
        if (processChildren) {
            /** @type {?} */
            const icuMessageText = this.getICUMessageText(node);
            /** @type {?} */
            let isICU = !isNullOrUndefined(icuMessageText);
            if (isICU) {
                try {
                    message.addICUMessage(icuMessageText);
                }
                catch (error) {
                    // if it is not parsable, handle it as non ICU
                    console.log('non ICU message: ', icuMessageText, error);
                    isICU = false;
                }
            }
            if (!isICU) {
                /** @type {?} */
                const children = node.childNodes;
                for (let i = 0; i < children.length; i++) {
                    this.addPartsOfNodeToMessage(children.item(i), message, true);
                }
            }
        }
        if (node.nodeType === node.ELEMENT_NODE) {
            this.processEndElement((/** @type {?} */ (node)), message);
        }
    }
    /**
     * Return the ICU message content of the node, if it is an ICU Message.
     * @protected
     * @param {?} node node
     * @return {?} message or null, if it is no ICU Message.
     */
    getICUMessageText(node) {
        /** @type {?} */
        const children = node.childNodes;
        if (children.length === 0) {
            return null;
        }
        /** @type {?} */
        const firstChild = children.item(0);
        if (firstChild.nodeType === firstChild.TEXT_NODE) {
            if (this.isICUMessageStart(firstChild.textContent)) {
                return DOMUtilities.getXMLContent((/** @type {?} */ (node)));
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    /**
     * Test, wether text is beginning of ICU Message.
     * @param {?} text text
     * @return {?}
     */
    isICUMessageStart(text) {
        return ParsedMessagePartICUMessage.looksLikeICUMessage(text);
        //        return text.startsWith('{VAR_PLURAL') || text.startsWith('{VAR_SELECT');
    }
    /**
     * Parse normalized string to ParsedMessage.
     * @param {?} normalizedString normalized string
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if normalized string is not well formed.
     */
    parseNormalizedString(normalizedString, sourceMessage) {
        /** @type {?} */
        const message = new ParsedMessage(this, sourceMessage);
        /** @type {?} */
        const openTags = [];
        /** @type {?} */
        let tokens;
        try {
            tokens = new ParsedMesageTokenizer().tokenize(normalizedString);
        }
        catch (error) {
            throw new Error(format('unexpected error while parsing message: "%s" (parsed "%")', error.message, normalizedString));
        }
        tokens.forEach((/**
         * @param {?} token
         * @return {?}
         */
        (token) => {
            /** @type {?} */
            let disp = null;
            switch (token.type) {
                case TEXT:
                    message.addText(token.value.text);
                    break;
                case START_TAG:
                    message.addStartTag(token.value.name, token.value.idcounter);
                    openTags.push(token.value.name);
                    break;
                case END_TAG:
                    message.addEndTag(token.value.name);
                    if (openTags.length === 0 || openTags[openTags.length - 1] !== token.value.name) {
                        // oops, not well formed
                        throw new Error(format('unexpected close tag "%s" (parsed "%s")', token.value.name, normalizedString));
                    }
                    openTags.pop();
                    break;
                case EMPTY_TAG:
                    message.addEmptyTag(token.value.name, token.value.idcounter);
                    break;
                case PLACEHOLDER:
                    disp = (sourceMessage) ? sourceMessage.getPlaceholderDisp(token.value.idcounter) : null;
                    message.addPlaceholder(token.value.idcounter, disp);
                    break;
                case ICU_MESSAGE_REF:
                    disp = (sourceMessage) ? sourceMessage.getICUMessageRefDisp(token.value.idcounter) : null;
                    message.addICUMessageRef(token.value.idcounter, disp);
                    break;
                case ICU_MESSAGE:
                    throw new Error(format('<ICUMessage/> not allowed here, use parseICUMessage instead (parsed "%")', normalizedString));
                default:
                    break;
            }
        }));
        if (openTags.length > 0) {
            // oops, not well closed tags
            throw new Error(format('missing close tag "%s" (parsed "%s")', openTags[openTags.length - 1], normalizedString));
        }
        message.setXmlRepresentation(this.createXmlRepresentation(message));
        return message;
    }
    /**
     * Parse a string, that is an ICU message, to ParsedMessage.
     * @param {?} icuMessageString the message, like '{x, plural, =0 {nothing} =1 {one} other {many}}'.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if icuMessageString has not the correct syntax.
     */
    parseICUMessage(icuMessageString, sourceMessage) {
        /** @type {?} */
        const message = new ParsedMessage(this, sourceMessage);
        message.addICUMessage(icuMessageString);
        return message;
    }
    /**
     * Helper function: Parse ID from a name.
     * name optionally ends with _<number>. This is the idcount.
     * E.g. name="TAG_IMG" returns 0
     * name = "TAG_IMG_1" returns 1
     * @protected
     * @param {?} name name
     * @return {?} id count
     */
    parseIdCountFromName(name) {
        /** @type {?} */
        const regex = /.*_([0-9]*)/;
        /** @type {?} */
        const match = regex.exec(name);
        if (isNullOrUndefined(match) || match[1] === '') {
            return 0;
        }
        else {
            /** @type {?} */
            const num = match[1];
            return parseInt(num, 10);
        }
    }
    /**
     * Create the native xml for a message.
     * Parts are already set here.
     * @protected
     * @param {?} message message
     * @return {?}
     */
    createXmlRepresentation(message) {
        /** @type {?} */
        const root = new DOMParser().parseFromString('<dummy/>', 'text/xml');
        /** @type {?} */
        const rootElem = root.getElementsByTagName('dummy').item(0);
        this.addXmlRepresentationToRoot(message, rootElem);
        return rootElem;
    }
    /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    createXmlRepresentationOfTextPart(part, rootElem) {
        return rootElem.ownerDocument.createTextNode(part.asDisplayString());
    }
}
if (false) {
    /**
     * Handle this node.
     * This is called before the children are done.
     * @abstract
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?} true, if children should be processed too, false otherwise (children ignored then)
     */
    AbstractMessageParser.prototype.processStartElement = function (elementNode, message) { };
    /**
     * Handle end of this node.
     * This is called after all children are processed.
     * @abstract
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    AbstractMessageParser.prototype.processEndElement = function (elementNode, message) { };
    /**
     * @abstract
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    AbstractMessageParser.prototype.addXmlRepresentationToRoot = function (message, rootElem) { };
    /**
     * the xml used for start tag in the message.
     * @abstract
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?=} id id number in xliff2
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentationOfStartTagPart = function (part, rootElem, id) { };
    /**
     * the xml used for end tag in the message.
     * @abstract
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentationOfEndTagPart = function (part, rootElem) { };
    /**
     * the xml used for empty tag in the message.
     * @abstract
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?=} id id number in xliff2
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = function (part, rootElem, id) { };
    /**
     * the xml used for placeholder in the message.
     * @abstract
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?=} id id number in xliff2
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = function (part, rootElem, id) { };
    /**
     * the xml used for icu message refs in the message.
     * @abstract
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = function (part, rootElem) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbWVzc2FnZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUNILFNBQVMsRUFDVCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFFN0YsTUFBTSw0QkFBNEIsQ0FBQztBQUVwQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBS2pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRzdDLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7O0FBTTlFLE1BQU0sT0FBZ0IscUJBQXFCOzs7Ozs7OztJQVFoQyw4QkFBOEIsQ0FBQyxVQUFtQixFQUFFLGFBQTRCOztjQUM3RSxPQUFPLEdBQWtCLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUM7UUFDckUsSUFBSSxVQUFVLEVBQUU7WUFDWixPQUFPLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDOzs7Ozs7OztJQVFELG9DQUFvQyxDQUFDLFNBQWlCLEVBQUUsYUFBNEI7O2NBQzFFLEdBQUcsR0FBYSxJQUFJLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFT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cEIsQ0FBQzs7Ozs7OztJQUlTLGlDQUFpQyxDQUFDLElBQTJCLEVBQUUsUUFBaUI7UUFDdEYsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0NBdUNKOzs7Ozs7Ozs7OztJQTVKRywwRkFBOEY7Ozs7Ozs7Ozs7SUFROUYsd0ZBQW1GOzs7Ozs7OztJQXlHbkYsOEZBQXlGOzs7Ozs7Ozs7O0lBWXpGLDBHQUFnSTs7Ozs7Ozs7O0lBT2hJLG9HQUErRzs7Ozs7Ozs7OztJQVEvRywwR0FBZ0k7Ozs7Ozs7Ozs7SUFRaEksNkdBQXNJOzs7Ozs7Ozs7SUFPdEksMkdBQTZIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXJzZWRNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlJztcclxuaW1wb3J0IHtcclxuICAgIEVNUFRZX1RBRyxcclxuICAgIEVORF9UQUcsIElDVV9NRVNTQUdFLCBJQ1VfTUVTU0FHRV9SRUYsIFBhcnNlZE1lc2FnZVRva2VuaXplciwgUExBQ0VIT0xERVIsIFNUQVJUX1RBRywgVEVYVCxcclxuICAgIFRva2VuXHJcbn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS10b2tlbml6ZXInO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0VGV4dH0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXRleHQnO1xyXG5pbXBvcnQge0RPTVBhcnNlcn0gZnJvbSAneG1sZG9tJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtc3RhcnQtdGFnJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtcGxhY2Vob2xkZXInO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtZW5kLXRhZyc7XHJcbmltcG9ydCB7SU1lc3NhZ2VQYXJzZXJ9IGZyb20gJy4vaS1tZXNzYWdlLXBhcnNlcic7XHJcbmltcG9ydCB7Zm9ybWF0LCBpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7RE9NVXRpbGl0aWVzfSBmcm9tICcuL2RvbS11dGlsaXRpZXMnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbXB0eS10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWljdS1tZXNzYWdlLXJlZic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAxMC4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgcGFyc2VyIGNhbiBwYXJzZSB0aGUgeG1sIGNvbnRlbnQgb2YgYSB0cmFuc2xhdGFibGUgbWVzc2FnZS5cclxuICogSXQgZ2VuZXJhdGVzIGEgUGFyc2VkTWVzc2FnZSBmcm9tIGl0LlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0TWVzc2FnZVBhcnNlciBpbXBsZW1lbnRzIElNZXNzYWdlUGFyc2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIFhNTCB0byBQYXJzZWRNZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHhtbEVsZW1lbnQgdGhlIHhtbCByZXByZXNlbnRhdGlvblxyXG4gICAgICogQHBhcmFtIHNvdXJjZU1lc3NhZ2Ugb3B0aW9uYWwgb3JpZ2luYWwgbWVzc2FnZSB0aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCBieSBub3JtYWxpemVkIG5ldyBvbmVcclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHhtbCBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhdGVOb3JtYWxpemVkTWVzc2FnZUZyb21YTUwoeG1sRWxlbWVudDogRWxlbWVudCwgc291cmNlTWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UgPSBuZXcgUGFyc2VkTWVzc2FnZSh0aGlzLCBzb3VyY2VNZXNzYWdlKTtcclxuICAgICAgICBpZiAoeG1sRWxlbWVudCkge1xyXG4gICAgICAgICAgICBtZXNzYWdlLnNldFhtbFJlcHJlc2VudGF0aW9uKHhtbEVsZW1lbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFBhcnRzT2ZOb2RlVG9NZXNzYWdlKHhtbEVsZW1lbnQsIG1lc3NhZ2UsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBYTUwgc3RyaW5nIHRvIFBhcnNlZE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0geG1sU3RyaW5nIHRoZSB4bWwgcmVwcmVzZW50YXRpb24gd2l0aG91dCByb290IGVsZW1lbnQsIGUuZy4gdGhpcyBpcyA8cGggeD48L3BoPiBhbiBleGFtcGxlLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZU1lc3NhZ2Ugb3B0aW9uYWwgb3JpZ2luYWwgbWVzc2FnZSB0aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCBieSBub3JtYWxpemVkIG5ldyBvbmVcclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHhtbCBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTFN0cmluZyh4bWxTdHJpbmc6IHN0cmluZywgc291cmNlTWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IGRvYzogRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKCc8ZHVtbXk+JyArIHhtbFN0cmluZyArICc8L2R1bW15PicsICd0ZXh0L3htbCcpO1xyXG4gICAgICAgIGNvbnN0IHhtbEVsZW1lbnQ6IEVsZW1lbnQgPSA8RWxlbWVudD4gZG9jLmNoaWxkTm9kZXMuaXRlbSgwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVOb3JtYWxpemVkTWVzc2FnZUZyb21YTUwoeG1sRWxlbWVudCwgc291cmNlTWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWN1cnNpdmVseSBydW4gdGhyb3VnaCBhIG5vZGUgYW5kIGFkZCBhbGwgaWRlbnRpZmllZCBwYXJ0cyB0byB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBub2RlIG5vZGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgZ2VuZXJhdGVkLlxyXG4gICAgICogQHBhcmFtIGluY2x1ZGVTZWxmIGlmIHRydWUsIGFkZCBub2RlIGJ5IGl0c2VsZiwgb3RoZXJ3aXNlIG9ubHkgY2hpbGRyZW4uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkUGFydHNPZk5vZGVUb01lc3NhZ2Uobm9kZTogTm9kZSwgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSwgaW5jbHVkZVNlbGY6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgcHJvY2Vzc0NoaWxkcmVuID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaW5jbHVkZVNlbGYpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZFRleHQobm9kZS50ZXh0Q29udGVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzQ2hpbGRyZW4gPSB0aGlzLnByb2Nlc3NTdGFydEVsZW1lbnQoPEVsZW1lbnQ+IG5vZGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9jZXNzQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgY29uc3QgaWN1TWVzc2FnZVRleHQgPSB0aGlzLmdldElDVU1lc3NhZ2VUZXh0KG5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgaXNJQ1UgPSAhaXNOdWxsT3JVbmRlZmluZWQoaWN1TWVzc2FnZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAoaXNJQ1UpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRJQ1VNZXNzYWdlKGljdU1lc3NhZ2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgaXMgbm90IHBhcnNhYmxlLCBoYW5kbGUgaXQgYXMgbm9uIElDVVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub24gSUNVIG1lc3NhZ2U6ICcsIGljdU1lc3NhZ2VUZXh0LCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNJQ1UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzSUNVKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBhcnRzT2ZOb2RlVG9NZXNzYWdlKGNoaWxkcmVuLml0ZW0oaSksIG1lc3NhZ2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NFbmRFbGVtZW50KDxFbGVtZW50PiBub2RlLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIElDVSBtZXNzYWdlIGNvbnRlbnQgb2YgdGhlIG5vZGUsIGlmIGl0IGlzIGFuIElDVSBNZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIG5vZGUgbm9kZVxyXG4gICAgICogQHJldHVybiBtZXNzYWdlIG9yIG51bGwsIGlmIGl0IGlzIG5vIElDVSBNZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SUNVTWVzc2FnZVRleHQobm9kZTogTm9kZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IGNoaWxkcmVuLml0ZW0oMCk7XHJcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IGZpcnN0Q2hpbGQuVEVYVF9OT0RFKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzSUNVTWVzc2FnZVN0YXJ0KGZpcnN0Q2hpbGQudGV4dENvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRE9NVXRpbGl0aWVzLmdldFhNTENvbnRlbnQoPEVsZW1lbnQ+IG5vZGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgdGV4dCBpcyBiZWdpbm5pbmcgb2YgSUNVIE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gdGV4dCB0ZXh0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc0lDVU1lc3NhZ2VTdGFydCh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gUGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlLmxvb2tzTGlrZUlDVU1lc3NhZ2UodGV4dCk7XHJcbi8vICAgICAgICByZXR1cm4gdGV4dC5zdGFydHNXaXRoKCd7VkFSX1BMVVJBTCcpIHx8IHRleHQuc3RhcnRzV2l0aCgne1ZBUl9TRUxFQ1QnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSB0aGlzIG5vZGUuXHJcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCBiZWZvcmUgdGhlIGNoaWxkcmVuIGFyZSBkb25lLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqIEByZXR1cm4gdHJ1ZSwgaWYgY2hpbGRyZW4gc2hvdWxkIGJlIHByb2Nlc3NlZCB0b28sIGZhbHNlIG90aGVyd2lzZSAoY2hpbGRyZW4gaWdub3JlZCB0aGVuKVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcHJvY2Vzc1N0YXJ0RWxlbWVudChlbGVtZW50Tm9kZTogRWxlbWVudCwgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgZW5kIG9mIHRoaXMgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIGFsbCBjaGlsZHJlbiBhcmUgcHJvY2Vzc2VkLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHByb2Nlc3NFbmRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIG5vcm1hbGl6ZWQgc3RyaW5nIHRvIFBhcnNlZE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbm9ybWFsaXplZFN0cmluZyBub3JtYWxpemVkIHN0cmluZ1xyXG4gICAgICogQHBhcmFtIHNvdXJjZU1lc3NhZ2Ugb3B0aW9uYWwgb3JpZ2luYWwgbWVzc2FnZSB0aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCBieSBub3JtYWxpemVkIG5ldyBvbmVcclxuICAgICAqIEByZXR1cm4gYSBuZXcgcGFyc2VkIG1lc3NhZ2UuXHJcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgbm9ybWFsaXplZCBzdHJpbmcgaXMgbm90IHdlbGwgZm9ybWVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGFyc2VOb3JtYWxpemVkU3RyaW5nKG5vcm1hbGl6ZWRTdHJpbmc6IHN0cmluZywgc291cmNlTWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UgPSBuZXcgUGFyc2VkTWVzc2FnZSh0aGlzLCBzb3VyY2VNZXNzYWdlKTtcclxuICAgICAgICBjb25zdCBvcGVuVGFncyA9IFtdO1xyXG4gICAgICAgIGxldCB0b2tlbnM6IFRva2VuW107XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdG9rZW5zID0gbmV3IFBhcnNlZE1lc2FnZVRva2VuaXplcigpLnRva2VuaXplKG5vcm1hbGl6ZWRTdHJpbmcpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ3VuZXhwZWN0ZWQgZXJyb3Igd2hpbGUgcGFyc2luZyBtZXNzYWdlOiBcIiVzXCIgKHBhcnNlZCBcIiVcIiknLCBlcnJvci5tZXNzYWdlLCBub3JtYWxpemVkU3RyaW5nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogVG9rZW4pID0+IHtcclxuICAgICAgICAgICAgbGV0IGRpc3A6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBURVhUOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkVGV4dCh0b2tlbi52YWx1ZS50ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgU1RBUlRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkU3RhcnRUYWcodG9rZW4udmFsdWUubmFtZSwgdG9rZW4udmFsdWUuaWRjb3VudGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuVGFncy5wdXNoKHRva2VuLnZhbHVlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFTkRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkRW5kVGFnKHRva2VuLnZhbHVlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGVuVGFncy5sZW5ndGggPT09IDAgfHwgb3BlblRhZ3Nbb3BlblRhZ3MubGVuZ3RoIC0gMV0gIT09IHRva2VuLnZhbHVlLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb29wcywgbm90IHdlbGwgZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ3VuZXhwZWN0ZWQgY2xvc2UgdGFnIFwiJXNcIiAocGFyc2VkIFwiJXNcIiknLCB0b2tlbi52YWx1ZS5uYW1lLCBub3JtYWxpemVkU3RyaW5nKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5UYWdzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFTVBUWV9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRFbXB0eVRhZyh0b2tlbi52YWx1ZS5uYW1lLCB0b2tlbi52YWx1ZS5pZGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQTEFDRUhPTERFUjpcclxuICAgICAgICAgICAgICAgICAgICBkaXNwID0gKHNvdXJjZU1lc3NhZ2UpID8gc291cmNlTWVzc2FnZS5nZXRQbGFjZWhvbGRlckRpc3AodG9rZW4udmFsdWUuaWRjb3VudGVyKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRQbGFjZWhvbGRlcih0b2tlbi52YWx1ZS5pZGNvdW50ZXIsIGRpc3ApO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJQ1VfTUVTU0FHRV9SRUY6XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcCA9IChzb3VyY2VNZXNzYWdlKSA/IHNvdXJjZU1lc3NhZ2UuZ2V0SUNVTWVzc2FnZVJlZkRpc3AodG9rZW4udmFsdWUuaWRjb3VudGVyKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRJQ1VNZXNzYWdlUmVmKHRva2VuLnZhbHVlLmlkY291bnRlciwgZGlzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIElDVV9NRVNTQUdFOlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJzxJQ1VNZXNzYWdlLz4gbm90IGFsbG93ZWQgaGVyZSwgdXNlIHBhcnNlSUNVTWVzc2FnZSBpbnN0ZWFkIChwYXJzZWQgXCIlXCIpJywgbm9ybWFsaXplZFN0cmluZykpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChvcGVuVGFncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIG9vcHMsIG5vdCB3ZWxsIGNsb3NlZCB0YWdzXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ21pc3NpbmcgY2xvc2UgdGFnIFwiJXNcIiAocGFyc2VkIFwiJXNcIiknLCBvcGVuVGFnc1tvcGVuVGFncy5sZW5ndGggLSAxXSwgbm9ybWFsaXplZFN0cmluZykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNzYWdlLnNldFhtbFJlcHJlc2VudGF0aW9uKHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb24obWVzc2FnZSkpO1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgYSBzdHJpbmcsIHRoYXQgaXMgYW4gSUNVIG1lc3NhZ2UsIHRvIFBhcnNlZE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gaWN1TWVzc2FnZVN0cmluZyB0aGUgbWVzc2FnZSwgbGlrZSAne3gsIHBsdXJhbCwgPTAge25vdGhpbmd9ID0xIHtvbmV9IG90aGVyIHttYW55fX0nLlxyXG4gICAgICogQHBhcmFtIHNvdXJjZU1lc3NhZ2Ugb3B0aW9uYWwgb3JpZ2luYWwgbWVzc2FnZSB0aGF0IHdpbGwgYmUgdHJhbnNsYXRlZCBieSBub3JtYWxpemVkIG5ldyBvbmVcclxuICAgICAqIEByZXR1cm4gYSBuZXcgcGFyc2VkIG1lc3NhZ2UuXHJcbiAgICAgKiBUaHJvd3MgYW4gZXJyb3IgaWYgaWN1TWVzc2FnZVN0cmluZyBoYXMgbm90IHRoZSBjb3JyZWN0IHN5bnRheC5cclxuICAgICAqL1xyXG4gICAgcGFyc2VJQ1VNZXNzYWdlKGljdU1lc3NhZ2VTdHJpbmc6IHN0cmluZywgc291cmNlTWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IFBhcnNlZE1lc3NhZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UgPSBuZXcgUGFyc2VkTWVzc2FnZSh0aGlzLCBzb3VyY2VNZXNzYWdlKTtcclxuICAgICAgICBtZXNzYWdlLmFkZElDVU1lc3NhZ2UoaWN1TWVzc2FnZVN0cmluZyk7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIZWxwZXIgZnVuY3Rpb246IFBhcnNlIElEIGZyb20gYSBuYW1lLlxyXG4gICAgICogbmFtZSBvcHRpb25hbGx5IGVuZHMgd2l0aCBfPG51bWJlcj4uIFRoaXMgaXMgdGhlIGlkY291bnQuXHJcbiAgICAgKiBFLmcuIG5hbWU9XCJUQUdfSU1HXCIgcmV0dXJucyAwXHJcbiAgICAgKiBuYW1lID0gXCJUQUdfSU1HXzFcIiByZXR1cm5zIDFcclxuICAgICAqIEBwYXJhbSBuYW1lIG5hbWVcclxuICAgICAqIEByZXR1cm4gaWQgY291bnRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHBhcnNlSWRDb3VudEZyb21OYW1lKG5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgcmVnZXggPSAvLipfKFswLTldKikvO1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhuYW1lKTtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQobWF0Y2gpIHx8IG1hdGNoWzFdID09PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBudW0gPSBtYXRjaFsxXTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0aGUgbmF0aXZlIHhtbCBmb3IgYSBtZXNzYWdlLlxyXG4gICAgICogUGFydHMgYXJlIGFscmVhZHkgc2V0IGhlcmUuXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbihtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3Qgcm9vdDogRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKCc8ZHVtbXkvPicsICd0ZXh0L3htbCcpO1xyXG4gICAgICAgIGNvbnN0IHJvb3RFbGVtOiBFbGVtZW50ID0gcm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZHVtbXknKS5pdGVtKDApO1xyXG4gICAgICAgIHRoaXMuYWRkWG1sUmVwcmVzZW50YXRpb25Ub1Jvb3QobWVzc2FnZSwgcm9vdEVsZW0pO1xyXG4gICAgICAgIHJldHVybiByb290RWxlbTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgYWRkWG1sUmVwcmVzZW50YXRpb25Ub1Jvb3QobWVzc2FnZTogUGFyc2VkTWVzc2FnZSwgcm9vdEVsZW06IEVsZW1lbnQpO1xyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mVGV4dFBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRUZXh0LCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIHJldHVybiByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcnQuYXNEaXNwbGF5U3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBzdGFydCB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqIEBwYXJhbSBpZCBpZCBudW1iZXIgaW4geGxpZmYyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mU3RhcnRUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWcsIHJvb3RFbGVtOiBFbGVtZW50LCBpZD86IG51bWJlcik6IE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGVuZCB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbmRUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnLCByb290RWxlbTogRWxlbWVudCk6IE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGVtcHR5IHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICogQHBhcmFtIGlkIGlkIG51bWJlciBpbiB4bGlmZjJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbXB0eVRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZywgcm9vdEVsZW06IEVsZW1lbnQsIGlkPzogbnVtYmVyKTogTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgcGxhY2Vob2xkZXIgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqIEBwYXJhbSBpZCBpZCBudW1iZXIgaW4geGxpZmYyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mUGxhY2Vob2xkZXJQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXIsIHJvb3RFbGVtOiBFbGVtZW50LCBpZD86IG51bWJlcik6IE5vZGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGljdSBtZXNzYWdlIHJlZnMgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZJQ1VNZXNzYWdlUmVmUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWYsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZTtcclxufVxyXG4iXX0=