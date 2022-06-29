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
var /**
 * Created by roobm on 10.05.2017.
 * A message parser can parse the xml content of a translatable message.
 * It generates a ParsedMessage from it.
 * @abstract
 */
AbstractMessageParser = /** @class */ (function () {
    function AbstractMessageParser() {
    }
    /**
     * Parse XML to ParsedMessage.
     * @param xmlElement the xml representation
     * @param sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     */
    /**
     * Parse XML to ParsedMessage.
     * @param {?} xmlElement the xml representation
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    AbstractMessageParser.prototype.createNormalizedMessageFromXML = /**
     * Parse XML to ParsedMessage.
     * @param {?} xmlElement the xml representation
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    function (xmlElement, sourceMessage) {
        /** @type {?} */
        var message = new ParsedMessage(this, sourceMessage);
        if (xmlElement) {
            message.setXmlRepresentation(xmlElement);
            this.addPartsOfNodeToMessage(xmlElement, message, false);
        }
        return message;
    };
    /**
     * Parse XML string to ParsedMessage.
     * @param xmlString the xml representation without root element, e.g. this is <ph x></ph> an example.
     * @param sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     */
    /**
     * Parse XML string to ParsedMessage.
     * @param {?} xmlString the xml representation without root element, e.g. this is <ph x></ph> an example.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    AbstractMessageParser.prototype.createNormalizedMessageFromXMLString = /**
     * Parse XML string to ParsedMessage.
     * @param {?} xmlString the xml representation without root element, e.g. this is <ph x></ph> an example.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * Throws an error if normalized xml is not well formed.
     * @return {?}
     */
    function (xmlString, sourceMessage) {
        /** @type {?} */
        var doc = new DOMParser().parseFromString('<dummy>' + xmlString + '</dummy>', 'text/xml');
        /** @type {?} */
        var xmlElement = (/** @type {?} */ (doc.childNodes.item(0)));
        return this.createNormalizedMessageFromXML(xmlElement, sourceMessage);
    };
    /**
     * recursively run through a node and add all identified parts to the message.
     * @param node node
     * @param message message to be generated.
     * @param includeSelf if true, add node by itself, otherwise only children.
     */
    /**
     * recursively run through a node and add all identified parts to the message.
     * @private
     * @param {?} node node
     * @param {?} message message to be generated.
     * @param {?} includeSelf if true, add node by itself, otherwise only children.
     * @return {?}
     */
    AbstractMessageParser.prototype.addPartsOfNodeToMessage = /**
     * recursively run through a node and add all identified parts to the message.
     * @private
     * @param {?} node node
     * @param {?} message message to be generated.
     * @param {?} includeSelf if true, add node by itself, otherwise only children.
     * @return {?}
     */
    function (node, message, includeSelf) {
        /** @type {?} */
        var processChildren = true;
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
            var icuMessageText = this.getICUMessageText(node);
            /** @type {?} */
            var isICU = !isNullOrUndefined(icuMessageText);
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
                var children = node.childNodes;
                for (var i = 0; i < children.length; i++) {
                    this.addPartsOfNodeToMessage(children.item(i), message, true);
                }
            }
        }
        if (node.nodeType === node.ELEMENT_NODE) {
            this.processEndElement((/** @type {?} */ (node)), message);
        }
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
    AbstractMessageParser.prototype.getICUMessageText = /**
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
        var firstChild = children.item(0);
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
    };
    /**
     * Test, wether text is beginning of ICU Message.
     * @param text text
     */
    /**
     * Test, wether text is beginning of ICU Message.
     * @param {?} text text
     * @return {?}
     */
    AbstractMessageParser.prototype.isICUMessageStart = /**
     * Test, wether text is beginning of ICU Message.
     * @param {?} text text
     * @return {?}
     */
    function (text) {
        return ParsedMessagePartICUMessage.looksLikeICUMessage(text);
        //        return text.startsWith('{VAR_PLURAL') || text.startsWith('{VAR_SELECT');
    };
    /**
     * Parse normalized string to ParsedMessage.
     * @param normalizedString normalized string
     * @param sourceMessage optional original message that will be translated by normalized new one
     * @return a new parsed message.
     * Throws an error if normalized string is not well formed.
     */
    /**
     * Parse normalized string to ParsedMessage.
     * @param {?} normalizedString normalized string
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if normalized string is not well formed.
     */
    AbstractMessageParser.prototype.parseNormalizedString = /**
     * Parse normalized string to ParsedMessage.
     * @param {?} normalizedString normalized string
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if normalized string is not well formed.
     */
    function (normalizedString, sourceMessage) {
        /** @type {?} */
        var message = new ParsedMessage(this, sourceMessage);
        /** @type {?} */
        var openTags = [];
        /** @type {?} */
        var tokens;
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
        function (token) {
            /** @type {?} */
            var disp = null;
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
    };
    /**
     * Parse a string, that is an ICU message, to ParsedMessage.
     * @param icuMessageString the message, like '{x, plural, =0 {nothing} =1 {one} other {many}}'.
     * @param sourceMessage optional original message that will be translated by normalized new one
     * @return a new parsed message.
     * Throws an error if icuMessageString has not the correct syntax.
     */
    /**
     * Parse a string, that is an ICU message, to ParsedMessage.
     * @param {?} icuMessageString the message, like '{x, plural, =0 {nothing} =1 {one} other {many}}'.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if icuMessageString has not the correct syntax.
     */
    AbstractMessageParser.prototype.parseICUMessage = /**
     * Parse a string, that is an ICU message, to ParsedMessage.
     * @param {?} icuMessageString the message, like '{x, plural, =0 {nothing} =1 {one} other {many}}'.
     * @param {?} sourceMessage optional original message that will be translated by normalized new one
     * @return {?} a new parsed message.
     * Throws an error if icuMessageString has not the correct syntax.
     */
    function (icuMessageString, sourceMessage) {
        /** @type {?} */
        var message = new ParsedMessage(this, sourceMessage);
        message.addICUMessage(icuMessageString);
        return message;
    };
    /**
     * Helper function: Parse ID from a name.
     * name optionally ends with _<number>. This is the idcount.
     * E.g. name="TAG_IMG" returns 0
     * name = "TAG_IMG_1" returns 1
     * @param name name
     * @return id count
     */
    /**
     * Helper function: Parse ID from a name.
     * name optionally ends with _<number>. This is the idcount.
     * E.g. name="TAG_IMG" returns 0
     * name = "TAG_IMG_1" returns 1
     * @protected
     * @param {?} name name
     * @return {?} id count
     */
    AbstractMessageParser.prototype.parseIdCountFromName = /**
     * Helper function: Parse ID from a name.
     * name optionally ends with _<number>. This is the idcount.
     * E.g. name="TAG_IMG" returns 0
     * name = "TAG_IMG_1" returns 1
     * @protected
     * @param {?} name name
     * @return {?} id count
     */
    function (name) {
        /** @type {?} */
        var regex = /.*_([0-9]*)/;
        /** @type {?} */
        var match = regex.exec(name);
        if (isNullOrUndefined(match) || match[1] === '') {
            return 0;
        }
        else {
            /** @type {?} */
            var num = match[1];
            return parseInt(num, 10);
        }
    };
    /**
     * Create the native xml for a message.
     * Parts are already set here.
     * @param message message
     */
    /**
     * Create the native xml for a message.
     * Parts are already set here.
     * @protected
     * @param {?} message message
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentation = /**
     * Create the native xml for a message.
     * Parts are already set here.
     * @protected
     * @param {?} message message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var root = new DOMParser().parseFromString('<dummy/>', 'text/xml');
        /** @type {?} */
        var rootElem = root.getElementsByTagName('dummy').item(0);
        this.addXmlRepresentationToRoot(message, rootElem);
        return rootElem;
    };
    /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    AbstractMessageParser.prototype.createXmlRepresentationOfTextPart = /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    function (part, rootElem) {
        return rootElem.ownerDocument.createTextNode(part.asDisplayString());
    };
    return AbstractMessageParser;
}());
/**
 * Created by roobm on 10.05.2017.
 * A message parser can parse the xml content of a translatable message.
 * It generates a ParsedMessage from it.
 * @abstract
 */
export { AbstractMessageParser };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbWVzc2FnZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUNILFNBQVMsRUFDVCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFFN0YsTUFBTSw0QkFBNEIsQ0FBQztBQUVwQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBS2pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRzdDLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7O0FBTTlFOzs7Ozs7O0lBQUE7SUF3UUEsQ0FBQztJQXRRRzs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSSw4REFBOEI7Ozs7Ozs7SUFBckMsVUFBc0MsVUFBbUIsRUFBRSxhQUE0Qjs7WUFDN0UsT0FBTyxHQUFrQixJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDO1FBQ3JFLElBQUksVUFBVSxFQUFFO1lBQ1osT0FBTyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILG9FQUFvQzs7Ozs7OztJQUFwQyxVQUFxQyxTQUFpQixFQUFF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O0lBQWpDLFVBQWtDLE9BQXNCOztZQUM5QyxJQUFJLEdBQWEsSUFBSSxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzs7WUFDeEUsUUFBUSxHQUFZLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUlTLGlFQUFpQzs7Ozs7O0lBQTNDLFVBQTRDLElBQTJCLEVBQUUsUUFBaUI7UUFDdEYsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBdUNMLDRCQUFDO0FBQUQsQ0FBQyxBQXhRRCxJQXdRQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNUpHLDBGQUE4Rjs7Ozs7Ozs7OztJQVE5Rix3RkFBbUY7Ozs7Ozs7O0lBeUduRiw4RkFBeUY7Ozs7Ozs7Ozs7SUFZekYsMEdBQWdJOzs7Ozs7Ozs7SUFPaEksb0dBQStHOzs7Ozs7Ozs7O0lBUS9HLDBHQUFnSTs7Ozs7Ozs7OztJQVFoSSw2R0FBc0k7Ozs7Ozs7OztJQU90SSwyR0FBNkgiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BhcnNlZE1lc3NhZ2V9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UnO1xyXG5pbXBvcnQge1xyXG4gICAgRU1QVFlfVEFHLFxyXG4gICAgRU5EX1RBRywgSUNVX01FU1NBR0UsIElDVV9NRVNTQUdFX1JFRiwgUGFyc2VkTWVzYWdlVG9rZW5pemVyLCBQTEFDRUhPTERFUiwgU1RBUlRfVEFHLCBURVhULFxyXG4gICAgVG9rZW5cclxufSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXRva2VuaXplcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRUZXh0fSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtdGV4dCc7XHJcbmltcG9ydCB7RE9NUGFyc2VyfSBmcm9tICd4bWxkb20nO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1zdGFydC10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXJ9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbmRUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbmQtdGFnJztcclxuaW1wb3J0IHtJTWVzc2FnZVBhcnNlcn0gZnJvbSAnLi9pLW1lc3NhZ2UtcGFyc2VyJztcclxuaW1wb3J0IHtmb3JtYXQsIGlzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtET01VdGlsaXRpZXN9IGZyb20gJy4vZG9tLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVtcHR5LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UtcmVmJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2V9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1pY3UtbWVzc2FnZSc7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHJvb2JtIG9uIDEwLjA1LjIwMTcuXHJcbiAqIEEgbWVzc2FnZSBwYXJzZXIgY2FuIHBhcnNlIHRoZSB4bWwgY29udGVudCBvZiBhIHRyYW5zbGF0YWJsZSBtZXNzYWdlLlxyXG4gKiBJdCBnZW5lcmF0ZXMgYSBQYXJzZWRNZXNzYWdlIGZyb20gaXQuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RNZXNzYWdlUGFyc2VyIGltcGxlbWVudHMgSU1lc3NhZ2VQYXJzZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgWE1MIHRvIFBhcnNlZE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0geG1sRWxlbWVudCB0aGUgeG1sIHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0gc291cmNlTWVzc2FnZSBvcHRpb25hbCBvcmlnaW5hbCBtZXNzYWdlIHRoYXQgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IG5vcm1hbGl6ZWQgbmV3IG9uZVxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIG5vcm1hbGl6ZWQgeG1sIGlzIG5vdCB3ZWxsIGZvcm1lZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTCh4bWxFbGVtZW50OiBFbGVtZW50LCBzb3VyY2VNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogUGFyc2VkTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSA9IG5ldyBQYXJzZWRNZXNzYWdlKHRoaXMsIHNvdXJjZU1lc3NhZ2UpO1xyXG4gICAgICAgIGlmICh4bWxFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2Uuc2V0WG1sUmVwcmVzZW50YXRpb24oeG1sRWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGFydHNPZk5vZGVUb01lc3NhZ2UoeG1sRWxlbWVudCwgbWVzc2FnZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIFhNTCBzdHJpbmcgdG8gUGFyc2VkTWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSB4bWxTdHJpbmcgdGhlIHhtbCByZXByZXNlbnRhdGlvbiB3aXRob3V0IHJvb3QgZWxlbWVudCwgZS5nLiB0aGlzIGlzIDxwaCB4PjwvcGg+IGFuIGV4YW1wbGUuXHJcbiAgICAgKiBAcGFyYW0gc291cmNlTWVzc2FnZSBvcHRpb25hbCBvcmlnaW5hbCBtZXNzYWdlIHRoYXQgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IG5vcm1hbGl6ZWQgbmV3IG9uZVxyXG4gICAgICogVGhyb3dzIGFuIGVycm9yIGlmIG5vcm1hbGl6ZWQgeG1sIGlzIG5vdCB3ZWxsIGZvcm1lZC5cclxuICAgICAqL1xyXG4gICAgY3JlYXRlTm9ybWFsaXplZE1lc3NhZ2VGcm9tWE1MU3RyaW5nKHhtbFN0cmluZzogc3RyaW5nLCBzb3VyY2VNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogUGFyc2VkTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgZG9jOiBEb2N1bWVudCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoJzxkdW1teT4nICsgeG1sU3RyaW5nICsgJzwvZHVtbXk+JywgJ3RleHQveG1sJyk7XHJcbiAgICAgICAgY29uc3QgeG1sRWxlbWVudDogRWxlbWVudCA9IDxFbGVtZW50PiBkb2MuY2hpbGROb2Rlcy5pdGVtKDApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU5vcm1hbGl6ZWRNZXNzYWdlRnJvbVhNTCh4bWxFbGVtZW50LCBzb3VyY2VNZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlY3Vyc2l2ZWx5IHJ1biB0aHJvdWdoIGEgbm9kZSBhbmQgYWRkIGFsbCBpZGVudGlmaWVkIHBhcnRzIHRvIHRoZSBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIG5vZGUgbm9kZVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBnZW5lcmF0ZWQuXHJcbiAgICAgKiBAcGFyYW0gaW5jbHVkZVNlbGYgaWYgdHJ1ZSwgYWRkIG5vZGUgYnkgaXRzZWxmLCBvdGhlcndpc2Ugb25seSBjaGlsZHJlbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRQYXJ0c09mTm9kZVRvTWVzc2FnZShub2RlOiBOb2RlLCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlLCBpbmNsdWRlU2VsZjogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBwcm9jZXNzQ2hpbGRyZW4gPSB0cnVlO1xyXG4gICAgICAgIGlmIChpbmNsdWRlU2VsZikge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5URVhUX05PREUpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkVGV4dChub2RlLnRleHRDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NDaGlsZHJlbiA9IHRoaXMucHJvY2Vzc1N0YXJ0RWxlbWVudCg8RWxlbWVudD4gbm9kZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb2Nlc3NDaGlsZHJlbikge1xyXG4gICAgICAgICAgICBjb25zdCBpY3VNZXNzYWdlVGV4dCA9IHRoaXMuZ2V0SUNVTWVzc2FnZVRleHQobm9kZSk7XHJcbiAgICAgICAgICAgIGxldCBpc0lDVSA9ICFpc051bGxPclVuZGVmaW5lZChpY3VNZXNzYWdlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChpc0lDVSkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZElDVU1lc3NhZ2UoaWN1TWVzc2FnZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyBub3QgcGFyc2FibGUsIGhhbmRsZSBpdCBhcyBub24gSUNVXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vbiBJQ1UgbWVzc2FnZTogJywgaWN1TWVzc2FnZVRleHQsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICBpc0lDVSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNJQ1UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGFydHNPZk5vZGVUb01lc3NhZ2UoY2hpbGRyZW4uaXRlbShpKSwgbWVzc2FnZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0VuZEVsZW1lbnQoPEVsZW1lbnQ+IG5vZGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgSUNVIG1lc3NhZ2UgY29udGVudCBvZiB0aGUgbm9kZSwgaWYgaXQgaXMgYW4gSUNVIE1lc3NhZ2UuXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBub2RlXHJcbiAgICAgKiBAcmV0dXJuIG1lc3NhZ2Ugb3IgbnVsbCwgaWYgaXQgaXMgbm8gSUNVIE1lc3NhZ2UuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRJQ1VNZXNzYWdlVGV4dChub2RlOiBOb2RlKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGROb2RlcztcclxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gY2hpbGRyZW4uaXRlbSgwKTtcclxuICAgICAgICBpZiAoZmlyc3RDaGlsZC5ub2RlVHlwZSA9PT0gZmlyc3RDaGlsZC5URVhUX05PREUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJQ1VNZXNzYWdlU3RhcnQoZmlyc3RDaGlsZC50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBET01VdGlsaXRpZXMuZ2V0WE1MQ29udGVudCg8RWxlbWVudD4gbm9kZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciB0ZXh0IGlzIGJlZ2lubmluZyBvZiBJQ1UgTWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSB0ZXh0IHRleHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzSUNVTWVzc2FnZVN0YXJ0KHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2UubG9va3NMaWtlSUNVTWVzc2FnZSh0ZXh0KTtcclxuLy8gICAgICAgIHJldHVybiB0ZXh0LnN0YXJ0c1dpdGgoJ3tWQVJfUExVUkFMJykgfHwgdGV4dC5zdGFydHNXaXRoKCd7VkFSX1NFTEVDVCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIHRoaXMgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGJlZm9yZSB0aGUgY2hpbGRyZW4gYXJlIGRvbmUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5vZGUgZWxlbWVudE5vZGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgYWx0ZXJlZFxyXG4gICAgICogQHJldHVybiB0cnVlLCBpZiBjaGlsZHJlbiBzaG91bGQgYmUgcHJvY2Vzc2VkIHRvbywgZmFsc2Ugb3RoZXJ3aXNlIChjaGlsZHJlbiBpZ25vcmVkIHRoZW4pXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBwcm9jZXNzU3RhcnRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBlbmQgb2YgdGhpcyBub2RlLlxyXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYWZ0ZXIgYWxsIGNoaWxkcmVuIGFyZSBwcm9jZXNzZWQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5vZGUgZWxlbWVudE5vZGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgYWx0ZXJlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcHJvY2Vzc0VuZEVsZW1lbnQoZWxlbWVudE5vZGU6IEVsZW1lbnQsIG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2Ugbm9ybWFsaXplZCBzdHJpbmcgdG8gUGFyc2VkTWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBub3JtYWxpemVkU3RyaW5nIG5vcm1hbGl6ZWQgc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gc291cmNlTWVzc2FnZSBvcHRpb25hbCBvcmlnaW5hbCBtZXNzYWdlIHRoYXQgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IG5vcm1hbGl6ZWQgbmV3IG9uZVxyXG4gICAgICogQHJldHVybiBhIG5ldyBwYXJzZWQgbWVzc2FnZS5cclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBub3JtYWxpemVkIHN0cmluZyBpcyBub3Qgd2VsbCBmb3JtZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXJzZU5vcm1hbGl6ZWRTdHJpbmcobm9ybWFsaXplZFN0cmluZzogc3RyaW5nLCBzb3VyY2VNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogUGFyc2VkTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSA9IG5ldyBQYXJzZWRNZXNzYWdlKHRoaXMsIHNvdXJjZU1lc3NhZ2UpO1xyXG4gICAgICAgIGNvbnN0IG9wZW5UYWdzID0gW107XHJcbiAgICAgICAgbGV0IHRva2VuczogVG9rZW5bXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0b2tlbnMgPSBuZXcgUGFyc2VkTWVzYWdlVG9rZW5pemVyKCkudG9rZW5pemUobm9ybWFsaXplZFN0cmluZyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgndW5leHBlY3RlZCBlcnJvciB3aGlsZSBwYXJzaW5nIG1lc3NhZ2U6IFwiJXNcIiAocGFyc2VkIFwiJVwiKScsIGVycm9yLm1lc3NhZ2UsIG5vcm1hbGl6ZWRTdHJpbmcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuOiBUb2tlbikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZGlzcDogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0b2tlbi50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRFWFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRUZXh0KHRva2VuLnZhbHVlLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTVEFSVF9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRTdGFydFRhZyh0b2tlbi52YWx1ZS5uYW1lLCB0b2tlbi52YWx1ZS5pZGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5UYWdzLnB1c2godG9rZW4udmFsdWUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVORF9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRFbmRUYWcodG9rZW4udmFsdWUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wZW5UYWdzLmxlbmd0aCA9PT0gMCB8fCBvcGVuVGFnc1tvcGVuVGFncy5sZW5ndGggLSAxXSAhPT0gdG9rZW4udmFsdWUubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvb3BzLCBub3Qgd2VsbCBmb3JtZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgndW5leHBlY3RlZCBjbG9zZSB0YWcgXCIlc1wiIChwYXJzZWQgXCIlc1wiKScsIHRva2VuLnZhbHVlLm5hbWUsIG5vcm1hbGl6ZWRTdHJpbmcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblRhZ3MucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVNUFRZX1RBRzpcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZEVtcHR5VGFnKHRva2VuLnZhbHVlLm5hbWUsIHRva2VuLnZhbHVlLmlkY291bnRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBMQUNFSE9MREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3AgPSAoc291cmNlTWVzc2FnZSkgPyBzb3VyY2VNZXNzYWdlLmdldFBsYWNlaG9sZGVyRGlzcCh0b2tlbi52YWx1ZS5pZGNvdW50ZXIpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZFBsYWNlaG9sZGVyKHRva2VuLnZhbHVlLmlkY291bnRlciwgZGlzcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIElDVV9NRVNTQUdFX1JFRjpcclxuICAgICAgICAgICAgICAgICAgICBkaXNwID0gKHNvdXJjZU1lc3NhZ2UpID8gc291cmNlTWVzc2FnZS5nZXRJQ1VNZXNzYWdlUmVmRGlzcCh0b2tlbi52YWx1ZS5pZGNvdW50ZXIpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZElDVU1lc3NhZ2VSZWYodG9rZW4udmFsdWUuaWRjb3VudGVyLCBkaXNwKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgSUNVX01FU1NBR0U6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnPElDVU1lc3NhZ2UvPiBub3QgYWxsb3dlZCBoZXJlLCB1c2UgcGFyc2VJQ1VNZXNzYWdlIGluc3RlYWQgKHBhcnNlZCBcIiVcIiknLCBub3JtYWxpemVkU3RyaW5nKSk7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9wZW5UYWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gb29wcywgbm90IHdlbGwgY2xvc2VkIHRhZ3NcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGZvcm1hdCgnbWlzc2luZyBjbG9zZSB0YWcgXCIlc1wiIChwYXJzZWQgXCIlc1wiKScsIG9wZW5UYWdzW29wZW5UYWdzLmxlbmd0aCAtIDFdLCBub3JtYWxpemVkU3RyaW5nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2Uuc2V0WG1sUmVwcmVzZW50YXRpb24odGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbihtZXNzYWdlKSk7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBhIHN0cmluZywgdGhhdCBpcyBhbiBJQ1UgbWVzc2FnZSwgdG8gUGFyc2VkTWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBpY3VNZXNzYWdlU3RyaW5nIHRoZSBtZXNzYWdlLCBsaWtlICd7eCwgcGx1cmFsLCA9MCB7bm90aGluZ30gPTEge29uZX0gb3RoZXIge21hbnl9fScuXHJcbiAgICAgKiBAcGFyYW0gc291cmNlTWVzc2FnZSBvcHRpb25hbCBvcmlnaW5hbCBtZXNzYWdlIHRoYXQgd2lsbCBiZSB0cmFuc2xhdGVkIGJ5IG5vcm1hbGl6ZWQgbmV3IG9uZVxyXG4gICAgICogQHJldHVybiBhIG5ldyBwYXJzZWQgbWVzc2FnZS5cclxuICAgICAqIFRocm93cyBhbiBlcnJvciBpZiBpY3VNZXNzYWdlU3RyaW5nIGhhcyBub3QgdGhlIGNvcnJlY3Qgc3ludGF4LlxyXG4gICAgICovXHJcbiAgICBwYXJzZUlDVU1lc3NhZ2UoaWN1TWVzc2FnZVN0cmluZzogc3RyaW5nLCBzb3VyY2VNZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogUGFyc2VkTWVzc2FnZSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSA9IG5ldyBQYXJzZWRNZXNzYWdlKHRoaXMsIHNvdXJjZU1lc3NhZ2UpO1xyXG4gICAgICAgIG1lc3NhZ2UuYWRkSUNVTWVzc2FnZShpY3VNZXNzYWdlU3RyaW5nKTtcclxuICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhlbHBlciBmdW5jdGlvbjogUGFyc2UgSUQgZnJvbSBhIG5hbWUuXHJcbiAgICAgKiBuYW1lIG9wdGlvbmFsbHkgZW5kcyB3aXRoIF88bnVtYmVyPi4gVGhpcyBpcyB0aGUgaWRjb3VudC5cclxuICAgICAqIEUuZy4gbmFtZT1cIlRBR19JTUdcIiByZXR1cm5zIDBcclxuICAgICAqIG5hbWUgPSBcIlRBR19JTUdfMVwiIHJldHVybnMgMVxyXG4gICAgICogQHBhcmFtIG5hbWUgbmFtZVxyXG4gICAgICogQHJldHVybiBpZCBjb3VudFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcGFyc2VJZENvdW50RnJvbU5hbWUobmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBjb25zdCByZWdleCA9IC8uKl8oWzAtOV0qKS87XHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKG5hbWUpO1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZChtYXRjaCkgfHwgbWF0Y2hbMV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG51bSA9IG1hdGNoWzFdO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQobnVtLCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRoZSBuYXRpdmUgeG1sIGZvciBhIG1lc3NhZ2UuXHJcbiAgICAgKiBQYXJ0cyBhcmUgYWxyZWFkeSBzZXQgaGVyZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uKG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UpOiBFbGVtZW50IHtcclxuICAgICAgICBjb25zdCByb290OiBEb2N1bWVudCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoJzxkdW1teS8+JywgJ3RleHQveG1sJyk7XHJcbiAgICAgICAgY29uc3Qgcm9vdEVsZW06IEVsZW1lbnQgPSByb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkdW1teScpLml0ZW0oMCk7XHJcbiAgICAgICAgdGhpcy5hZGRYbWxSZXByZXNlbnRhdGlvblRvUm9vdChtZXNzYWdlLCByb290RWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIHJvb3RFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBhZGRYbWxSZXByZXNlbnRhdGlvblRvUm9vdChtZXNzYWdlOiBQYXJzZWRNZXNzYWdlLCByb290RWxlbTogRWxlbWVudCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZUZXh0UGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydFRleHQsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocGFydC5hc0Rpc3BsYXlTdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIHN0YXJ0IHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICogQHBhcmFtIGlkIGlkIG51bWJlciBpbiB4bGlmZjJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZTdGFydFRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZywgcm9vdEVsZW06IEVsZW1lbnQsIGlkPzogbnVtYmVyKTogTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgZW5kIHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVuZFRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRFbmRUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgZW1wdHkgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKiBAcGFyYW0gaWQgaWQgbnVtYmVyIGluIHhsaWZmMlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVtcHR5VGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydEVtcHR5VGFnLCByb290RWxlbTogRWxlbWVudCwgaWQ/OiBudW1iZXIpOiBOb2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBwbGFjZWhvbGRlciBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICogQHBhcmFtIGlkIGlkIG51bWJlciBpbiB4bGlmZjJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQbGFjZWhvbGRlclBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRQbGFjZWhvbGRlciwgcm9vdEVsZW06IEVsZW1lbnQsIGlkPzogbnVtYmVyKTogTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgaWN1IG1lc3NhZ2UgcmVmcyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZiwgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlO1xyXG59XHJcbiJdfQ==