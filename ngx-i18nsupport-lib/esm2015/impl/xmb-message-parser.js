/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AbstractMessageParser } from './abstract-message-parser';
import { DOMUtilities } from './dom-utilities';
import { TagMapping } from './tag-mapping';
import { ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
export class XmbMessageParser extends AbstractMessageParser {
    /**
     * Handle this element node.
     * This is called before the children are done.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?} true, if children should be processed too, false otherwise (children ignored then)
     */
    processStartElement(elementNode, message) {
        /** @type {?} */
        const tagName = elementNode.tagName;
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
            const name = elementNode.getAttribute('name');
            if (!name) {
                return true; // should not happen
            }
            if (name.startsWith('INTERPOLATION')) {
                /** @type {?} */
                const index = this.parsePlaceholderIndexFromName(name);
                message.addPlaceholder(index, null);
                return false; // ignore children
            }
            else if (name.startsWith('START_')) {
                /** @type {?} */
                const tag = this.parseTagnameFromPhElement(elementNode);
                /** @type {?} */
                const idcounter = this.parseIdCountFromName(name);
                if (tag) {
                    message.addStartTag(tag, idcounter);
                }
                return false; // ignore children
            }
            else if (name.startsWith('CLOSE_')) {
                /** @type {?} */
                const tag = this.parseTagnameFromPhElement(elementNode);
                if (tag) {
                    message.addEndTag(tag);
                }
                return false; // ignore children
            }
            else if (new TagMapping().isEmptyTagPlaceholderName(name)) {
                /** @type {?} */
                const emptyTagName = new TagMapping().getTagnameFromEmptyTagPlaceholderName(name);
                /** @type {?} */
                const idcounter = this.parseIdCountFromName(name);
                message.addEmptyTag(emptyTagName, idcounter);
                return false; // ignore children
            }
            else if (name.startsWith('ICU')) {
                /** @type {?} */
                const index = this.parseICUMessageIndexFromName(name);
                message.addICUMessageRef(index, null);
                return false; // ignore children
            }
        }
        else if (tagName === 'source') {
            // ignore source
            return false;
        }
        return true;
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
        let firstChild = null;
        // find first child that is no source element.
        /** @type {?} */
        let i;
        for (i = 0; i < children.length; i++) {
            /** @type {?} */
            const child = children.item(i);
            if (child.nodeType !== child.ELEMENT_NODE || ((/** @type {?} */ (child))).tagName !== 'source') {
                firstChild = child;
                break;
            }
        }
        if (firstChild && firstChild.nodeType === firstChild.TEXT_NODE) {
            if (this.isICUMessageStart(firstChild.textContent)) {
                /** @type {?} */
                const messageText = DOMUtilities.getXMLContent((/** @type {?} */ (node)));
                if (i > 0) {
                    // drop <source> elements
                    /** @type {?} */
                    const reSource = new RegExp('<source[^>]*>.*</source>', 'g');
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
    }
    /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    processEndElement(elementNode, message) {
    }
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    parsePlaceholderIndexFromName(name) {
        /** @type {?} */
        let indexString = '';
        if (name === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = name.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    }
    /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    parseICUMessageIndexFromName(name) {
        /** @type {?} */
        let indexString = '';
        if (name === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = name.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    }
    /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @private
     * @param {?} phElement phElement
     * @return {?}
     */
    parseTagnameFromPhElement(phElement) {
        /** @type {?} */
        const exElement = DOMUtilities.getFirstElementByTagName(phElement, 'ex');
        if (exElement) {
            /** @type {?} */
            const value = DOMUtilities.getPCDATA(exElement);
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
    }
    /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    addXmlRepresentationToRoot(message, rootElem) {
        message.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            /** @type {?} */
            const child = this.createXmlRepresentationOfPart(part, rootElem);
            if (child) {
                rootElem.appendChild(child);
            }
        }));
    }
    /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    createXmlRepresentationOfPart(part, rootElem) {
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
    }
    /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfStartTagPart(part, rootElem) {
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const nameAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        const exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    }
    /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfEndTagPart(part, rootElem) {
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const nameAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        const exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('</' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    }
    /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfEmptyTagPart(part, rootElem) {
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const nameAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        const exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    }
    /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfPlaceholderPart(part, rootElem) {
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        let nameAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            nameAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        const exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
    }
    /**
     * the xml used for icu message refs in the message.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfICUMessageRefPart(part, rootElem) {
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        let nameAttrib = 'ICU';
        if (part.index() > 0) {
            nameAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        const exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iLW1lc3NhZ2UtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC94bWItbWVzc2FnZS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUk3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBb0IscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7QUFNL0UsTUFBTSxPQUFPLGdCQUFpQixTQUFRLHFCQUFxQjs7Ozs7Ozs7O0lBUzdDLG1CQUFtQixDQUFDLFdBQW9CLEVBQUUsT0FBc0I7O2NBQ2hFLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTztRQUNuQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7Ozs7Ozs7Ozs7O2tCQVVaLElBQUksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUM3QyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE9BQU8sSUFBSSxDQUFDLENBQUMsb0JBQW9CO2FBQ3BDO1lBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFOztzQkFDNUIsS0FBSyxHQUFHLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RELE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLEtBQUssQ0FBQyxDQUFDLGtCQUFrQjthQUNuQztpQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7O3NCQUM1QixHQUFHLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQzs7c0JBQ2pELFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2dCQUNqRCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDdkM7Z0JBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxrQkFBa0I7YUFDbkM7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFOztzQkFDNUIsR0FBRyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUM7Z0JBQ3ZELElBQUksR0FBRyxFQUFFO29CQUNMLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFCO2dCQUNELE9BQU8sS0FBSyxDQUFDLENBQUMsa0JBQWtCO2FBQ25DO2lCQUFNLElBQUksSUFBSSxVQUFVLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsRUFBRTs7c0JBQ25ELFlBQVksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDLHFDQUFxQyxDQUFDLElBQUksQ0FBQzs7c0JBQzNFLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDO2dCQUNqRCxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxLQUFLLENBQUMsQ0FBQyxrQkFBa0I7YUFDbkM7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFOztzQkFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sS0FBSyxDQUFDLENBQUMsa0JBQWtCO2FBQ25DO1NBQ0o7YUFBTSxJQUFJLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDN0IsZ0JBQWdCO1lBQ2hCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQU9TLGlCQUFpQixDQUFDLElBQVU7O2NBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVTtRQUNoQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7O1lBQ0csVUFBVSxHQUFHLElBQUk7OztZQUVqQixDQUFDO1FBQ0wsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztrQkFDNUIsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsWUFBWSxJQUFJLENBQUMsbUJBQVUsS0FBSyxFQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNqRixVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEtBQUssVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUM1RCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7O3NCQUMxQyxXQUFXLEdBQUcsWUFBWSxDQUFDLGFBQWEsQ0FBQyxtQkFBVSxJQUFJLEVBQUEsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOzs7MEJBRUQsUUFBUSxHQUFXLElBQUksTUFBTSxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQztvQkFDcEUsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsT0FBTyxXQUFXLENBQUM7aUJBQ3RCO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQzs7Ozs7Ozs7O0lBUVMsaUJBQWlCLENBQUMsV0FBb0IsRUFBRSxPQUFzQjtJQUN4RSxDQUFDOzs7Ozs7OztJQVFPLDZCQUE2QixDQUFDLElBQVk7O1lBQzFDLFdBQVcsR0FBRyxFQUFFO1FBRXBCLElBQUksSUFBSSxLQUFLLGVBQWUsRUFBRTtZQUMxQixXQUFXLEdBQUcsR0FBRyxDQUFDO1NBQ3JCO2FBQU07WUFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6RDtRQUNELE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7Ozs7SUFRTyw0QkFBNEIsQ0FBQyxJQUFZOztZQUN6QyxXQUFXLEdBQUcsRUFBRTtRQUVwQixJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDaEIsV0FBVyxHQUFHLEdBQUcsQ0FBQztTQUNyQjthQUFNO1lBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7Ozs7SUFRTyx5QkFBeUIsQ0FBQyxTQUFrQjs7Y0FDMUMsU0FBUyxHQUFHLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1FBQ3hFLElBQUksU0FBUyxFQUFFOztrQkFDTCxLQUFLLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7WUFDL0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxRCxPQUFPO2dCQUNQLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO2dCQUN6QixPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQy9DO1NBQ0o7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7Ozs7O0lBRVMsMEJBQTBCLENBQUMsT0FBc0IsRUFBRSxRQUFpQjtRQUMxRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O2tCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7WUFDaEUsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMvQjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUVTLDZCQUE2QixDQUFDLElBQXVCLEVBQUUsUUFBaUI7UUFDOUUsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2YsS0FBSyxxQkFBcUIsQ0FBQyxJQUFJO2dCQUMzQixPQUFPLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxtQkFBd0IsSUFBSSxFQUFBLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUYsS0FBSyxxQkFBcUIsQ0FBQyxTQUFTO2dCQUNoQyxPQUFPLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDLG1CQUEyQixJQUFJLEVBQUEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ25HLEtBQUsscUJBQXFCLENBQUMsT0FBTztnQkFDOUIsT0FBTyxJQUFJLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxtQkFBeUIsSUFBSSxFQUFBLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvRixLQUFLLHFCQUFxQixDQUFDLFNBQVM7Z0JBQ2hDLE9BQU8sSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsbUJBQTJCLElBQUksRUFBQSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkcsS0FBSyxxQkFBcUIsQ0FBQyxXQUFXO2dCQUNsQyxPQUFPLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLG1CQUE4QixJQUFJLEVBQUEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pHLEtBQUsscUJBQXFCLENBQUMsZUFBZTtnQkFDdEMsT0FBTyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQyxtQkFBZ0MsSUFBSSxFQUFBLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNoSDtJQUNMLENBQUM7Ozs7Ozs7OztJQVFTLHFDQUFxQyxDQUFDLElBQStCLEVBQUUsUUFBaUI7O2NBQ3hGLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7O2NBQ25ELFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRTs7Y0FDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFGLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztjQUNsQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7O0lBUVMsbUNBQW1DLENBQUMsSUFBNkIsRUFBRSxRQUFpQjs7Y0FDcEYsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Y0FDbkQsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFOztjQUM3QixVQUFVLEdBQUcsVUFBVSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4RSxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzs7Y0FDbEMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUN6RCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7Ozs7OztJQVFTLHFDQUFxQyxDQUFDLElBQStCLEVBQUUsUUFBaUI7O2NBQ3hGLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7O2NBQ25ELFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRTs7Y0FDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFGLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDOztjQUNsQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7O0lBUVMsd0NBQXdDLENBQUMsSUFBa0MsRUFBRSxRQUFpQjs7Y0FDOUYsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7WUFDckQsVUFBVSxHQUFHLGVBQWU7UUFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7O2NBQ2xDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7SUFPUywwQ0FBMEMsQ0FBQyxJQUFvQyxFQUFFLFFBQWlCOztjQUNsRyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOztZQUNyRCxVQUFVLEdBQUcsS0FBSztRQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDbEIsVUFBVSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7O2NBQ2xDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBYnN0cmFjdE1lc3NhZ2VQYXJzZXJ9IGZyb20gJy4vYWJzdHJhY3QtbWVzc2FnZS1wYXJzZXInO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2V9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UnO1xyXG5pbXBvcnQge0RPTVV0aWxpdGllc30gZnJvbSAnLi9kb20tdXRpbGl0aWVzJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtc3RhcnQtdGFnJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydEVuZFRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVuZC10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXJ9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlcic7XHJcbmltcG9ydCB7VGFnTWFwcGluZ30gZnJvbSAnLi90YWctbWFwcGluZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVtcHR5LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UtcmVmJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydCwgUGFyc2VkTWVzc2FnZVBhcnRUeXBlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0VGV4dH0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXRleHQnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAxMC4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgcGFyc2VyIGZvciBYTUJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBYbWJNZXNzYWdlUGFyc2VyIGV4dGVuZHMgQWJzdHJhY3RNZXNzYWdlUGFyc2VyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSB0aGlzIGVsZW1lbnQgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGJlZm9yZSB0aGUgY2hpbGRyZW4gYXJlIGRvbmUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5vZGUgZWxlbWVudE5vZGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgYWx0ZXJlZFxyXG4gICAgICogQHJldHVybiB0cnVlLCBpZiBjaGlsZHJlbiBzaG91bGQgYmUgcHJvY2Vzc2VkIHRvbywgZmFsc2Ugb3RoZXJ3aXNlIChjaGlsZHJlbiBpZ25vcmVkIHRoZW4pXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9jZXNzU3RhcnRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnROb2RlLnRhZ05hbWU7XHJcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdwaCcpIHtcclxuICAgICAgICAgICAgLy8gVGhlcmUgYXJlIDQgZGlmZmVyZW50IHVzYWdlcyBvZiBwaCBlbGVtZW50OlxyXG4gICAgICAgICAgICAvLyAxLiBwbGFjZWhvbGRlcnMgYXJlIGxpa2UgPHBoIG5hbWU9XCJJTlRFUlBPTEFUSU9OXCI+PGV4PklOVEVSUE9MQVRJT048L2V4PjwvcGg+XHJcbiAgICAgICAgICAgIC8vIG9yIDxwaCBuYW1lPVwiSU5URVJQT0xBVElPTl8xXCI+PGV4PklOVEVSUE9MQVRJT05fMTwvZXg+PC9waD5cclxuICAgICAgICAgICAgLy8gMi4gc3RhcnQgdGFnczpcclxuICAgICAgICAgICAgLy8gPHBoIG5hbWU9XCJTVEFSVF9MSU5LXCI+PGV4PiZsdDthJmd0OzwvZXg+PC9waD5cclxuICAgICAgICAgICAgLy8gMy4gZW1wdHkgdGFnczpcclxuICAgICAgICAgICAgLy8gPHBoIG5hbWU9XCJUQUdfSU1HXCI+PGV4PiZsdDtpbWcmZ3Q7PC9leD48L3BoPlxyXG4gICAgICAgICAgICAvLyA0LiBJQ1U6XHJcbiAgICAgICAgICAgIC8vIDxwaCBuYW1lPVwiSUNVXCI+PGV4PklDVTwvZXg+PC9waD5cclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsZW1lbnROb2RlLmdldEF0dHJpYnV0ZSgnbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBzaG91bGQgbm90IGhhcHBlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ0lOVEVSUE9MQVRJT04nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcnNlUGxhY2Vob2xkZXJJbmRleEZyb21OYW1lKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRQbGFjZWhvbGRlcihpbmRleCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBjaGlsZHJlblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUuc3RhcnRzV2l0aCgnU1RBUlRfJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMucGFyc2VUYWduYW1lRnJvbVBoRWxlbWVudChlbGVtZW50Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZGNvdW50ZXIgPSB0aGlzLnBhcnNlSWRDb3VudEZyb21OYW1lKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkU3RhcnRUYWcodGFnLCBpZGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgY2hpbGRyZW5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ0NMT1NFXycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLnBhcnNlVGFnbmFtZUZyb21QaEVsZW1lbnQoZWxlbWVudE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkRW5kVGFnKHRhZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBjaGlsZHJlblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ldyBUYWdNYXBwaW5nKCkuaXNFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShuYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHlUYWdOYW1lID0gbmV3IFRhZ01hcHBpbmcoKS5nZXRUYWduYW1lRnJvbUVtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWRjb3VudGVyID0gdGhpcy5wYXJzZUlkQ291bnRGcm9tTmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkRW1wdHlUYWcoZW1wdHlUYWdOYW1lLCBpZGNvdW50ZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBpZ25vcmUgY2hpbGRyZW5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuYW1lLnN0YXJ0c1dpdGgoJ0lDVScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyc2VJQ1VNZXNzYWdlSW5kZXhGcm9tTmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkSUNVTWVzc2FnZVJlZihpbmRleCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGlnbm9yZSBjaGlsZHJlblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnc291cmNlJykge1xyXG4gICAgICAgICAgICAvLyBpZ25vcmUgc291cmNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gdGhlIElDVSBtZXNzYWdlIGNvbnRlbnQgb2YgdGhlIG5vZGUsIGlmIGl0IGlzIGFuIElDVSBNZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIG5vZGUgbm9kZVxyXG4gICAgICogQHJldHVybiBtZXNzYWdlIG9yIG51bGwsIGlmIGl0IGlzIG5vIElDVSBNZXNzYWdlLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0SUNVTWVzc2FnZVRleHQobm9kZTogTm9kZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZpcnN0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIC8vIGZpbmQgZmlyc3QgY2hpbGQgdGhhdCBpcyBubyBzb3VyY2UgZWxlbWVudC5cclxuICAgICAgICBsZXQgaTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgIT09IGNoaWxkLkVMRU1FTlRfTk9ERSB8fCAoPEVsZW1lbnQ+IGNoaWxkKS50YWdOYW1lICE9PSAnc291cmNlJykge1xyXG4gICAgICAgICAgICAgICAgZmlyc3RDaGlsZCA9IGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQgJiYgZmlyc3RDaGlsZC5ub2RlVHlwZSA9PT0gZmlyc3RDaGlsZC5URVhUX05PREUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJQ1VNZXNzYWdlU3RhcnQoZmlyc3RDaGlsZC50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VUZXh0ID0gRE9NVXRpbGl0aWVzLmdldFhNTENvbnRlbnQoPEVsZW1lbnQ+IG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJvcCA8c291cmNlPiBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlU291cmNlOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCc8c291cmNlW14+XSo+Lio8L3NvdXJjZT4nLCAnZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlVGV4dC5yZXBsYWNlKHJlU291cmNlLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlVGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGVuZCBvZiB0aGlzIGVsZW1lbnQgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIGFsbCBjaGlsZHJlbiBhcmUgcHJvY2Vzc2VkLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NFbmRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBpZCBhdHRyaWJ1dGUgb2YgeCBlbGVtZW50IGFzIHBsYWNlaG9sZGVyIGluZGV4LlxyXG4gICAgICogaWQgY2FuIGJlIFwiSU5URVJQT0xBVElPTlwiIG9yIFwiSU5URVJQT0xBVElPTl9uXCJcclxuICAgICAqIEBwYXJhbSBuYW1lIG5hbWVcclxuICAgICAqIEByZXR1cm4gaWQgYXMgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VQbGFjZWhvbGRlckluZGV4RnJvbU5hbWUobmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaW5kZXhTdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKG5hbWUgPT09ICdJTlRFUlBPTEFUSU9OJykge1xyXG4gICAgICAgICAgICBpbmRleFN0cmluZyA9ICcwJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRleFN0cmluZyA9IG5hbWUuc3Vic3RyaW5nKCdJTlRFUlBPTEFUSU9OXycubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgaWQgYXR0cmlidXRlIG9mIHggZWxlbWVudCBhcyBJQ1UgbWVzc2FnZSByZWYgaW5kZXguXHJcbiAgICAgKiBpZCBjYW4gYmUgXCJJQ1VcIiBvciBcIklDVV9uXCJcclxuICAgICAqIEBwYXJhbSBuYW1lIG5hbWVcclxuICAgICAqIEByZXR1cm4gaWQgYXMgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VJQ1VNZXNzYWdlSW5kZXhGcm9tTmFtZShuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBpbmRleFN0cmluZyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAobmFtZSA9PT0gJ0lDVScpIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSBuYW1lLnN1YnN0cmluZygnSUNVXycubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgdGhlIHRhZyBuYW1lIGZyb20gYSBwaCBlbGVtZW50LlxyXG4gICAgICogSXQgY29udGFpbmVkIGluIHRoZSA8ZXg+IHN1YmVsZW1lbnRzIHZhbHVlIGFuZCBlbmNsb3NlZCBpbiA8Pi5cclxuICAgICAqIEV4YW1wbGU6IDxwaCBuYW1lPVwiU1RBUlRfQk9MRF9URVhUXCI+PGV4PiZsdDtiJmd0OzwvZXg+PC9waD5cclxuICAgICAqIEBwYXJhbSBwaEVsZW1lbnQgcGhFbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFyc2VUYWduYW1lRnJvbVBoRWxlbWVudChwaEVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGV4RWxlbWVudCA9IERPTVV0aWxpdGllcy5nZXRGaXJzdEVsZW1lbnRCeVRhZ05hbWUocGhFbGVtZW50LCAnZXgnKTtcclxuICAgICAgICBpZiAoZXhFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gRE9NVXRpbGl0aWVzLmdldFBDREFUQShleEVsZW1lbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8ICF2YWx1ZS5zdGFydHNXaXRoKCc8JykgfHwgIXZhbHVlLmVuZHNXaXRoKCc+JykpIHtcclxuICAgICAgICAgICAgICAgIC8vIG9vcHNcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jaGFyQXQoMSkgPT09ICcvJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnN1YnN0cmluZygyLCB2YWx1ZS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zdWJzdHJpbmcoMSwgdmFsdWUubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZFhtbFJlcHJlc2VudGF0aW9uVG9Sb290KG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UsIHJvb3RFbGVtOiBFbGVtZW50KSB7XHJcbiAgICAgICAgbWVzc2FnZS5wYXJ0cygpLmZvckVhY2goKHBhcnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQYXJ0KHBhcnQsIHJvb3RFbGVtKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICByb290RWxlbS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnQsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgc3dpdGNoIChwYXJ0LnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuVEVYVDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZUZXh0UGFydCg8UGFyc2VkTWVzc2FnZVBhcnRUZXh0PiBwYXJ0LCByb290RWxlbSk7XHJcbiAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlNUQVJUX1RBRzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZTdGFydFRhZ1BhcnQoKDxQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLkVORF9UQUc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW5kVGFnUGFydCgoPFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLkVNUFRZX1RBRzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbXB0eVRhZ1BhcnQoKDxQYXJzZWRNZXNzYWdlUGFydEVtcHR5VGFnPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlBMQUNFSE9MREVSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlBsYWNlaG9sZGVyUGFydCgoPFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXI+cGFydCksIHJvb3RFbGVtKTtcclxuICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuSUNVX01FU1NBR0VfUkVGOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KCg8UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBzdGFydCB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBSZXR1cm5zIGFuIDxwaD4tRWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBuYW1lIGFuZCBzdWJlbGVtZW50IGV4XHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZTdGFydFRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZywgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgY29uc3QgdGFnTWFwcGluZyA9IG5ldyBUYWdNYXBwaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbmFtZUF0dHJpYiA9IHRhZ01hcHBpbmcuZ2V0U3RhcnRUYWdQbGFjZWhvbGRlck5hbWUocGFydC50YWdOYW1lKCksIHBhcnQuaWRDb3VudGVyKCkpO1xyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBuYW1lQXR0cmliKTtcclxuICAgICAgICBjb25zdCBleEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2V4Jyk7XHJcbiAgICAgICAgZXhFbGVtLmFwcGVuZENoaWxkKHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJzwnICsgcGFydC50YWdOYW1lKCkgKyAnPicpKTtcclxuICAgICAgICBwaEVsZW0uYXBwZW5kQ2hpbGQoZXhFbGVtKTtcclxuICAgICAgICByZXR1cm4gcGhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBlbmQgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiA8cGg+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGUgbmFtZSBhbmQgc3ViZWxlbWVudCBleFxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW5kVGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydEVuZFRhZywgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgY29uc3QgdGFnTWFwcGluZyA9IG5ldyBUYWdNYXBwaW5nKCk7XHJcbiAgICAgICAgY29uc3QgbmFtZUF0dHJpYiA9IHRhZ01hcHBpbmcuZ2V0Q2xvc2VUYWdQbGFjZWhvbGRlck5hbWUocGFydC50YWdOYW1lKCkpO1xyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBuYW1lQXR0cmliKTtcclxuICAgICAgICBjb25zdCBleEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2V4Jyk7XHJcbiAgICAgICAgZXhFbGVtLmFwcGVuZENoaWxkKHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJzwvJyArIHBhcnQudGFnTmFtZSgpICsgJz4nKSk7XHJcbiAgICAgICAgcGhFbGVtLmFwcGVuZENoaWxkKGV4RWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgZW1wdHkgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiA8cGg+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGUgbmFtZSBhbmQgc3ViZWxlbWVudCBleFxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW1wdHlUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcGhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwaCcpO1xyXG4gICAgICAgIGNvbnN0IHRhZ01hcHBpbmcgPSBuZXcgVGFnTWFwcGluZygpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVBdHRyaWIgPSB0YWdNYXBwaW5nLmdldEVtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKHBhcnQudGFnTmFtZSgpLCBwYXJ0LmlkQ291bnRlcigpKTtcclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCduYW1lJywgbmFtZUF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZXhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdleCcpO1xyXG4gICAgICAgIGV4RWxlbS5hcHBlbmRDaGlsZChyb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCc8JyArIHBhcnQudGFnTmFtZSgpICsgJz4nKSk7XHJcbiAgICAgICAgcGhFbGVtLmFwcGVuZENoaWxkKGV4RWxlbSk7XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgcGxhY2Vob2xkZXIgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBSZXR1cm5zIGFuIDxwaD4tRWxlbWVudCB3aXRoIGF0dHJpYnV0ZSBuYW1lIGFuZCBzdWJlbGVtZW50IGV4XHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQbGFjZWhvbGRlclBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRQbGFjZWhvbGRlciwgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgbGV0IG5hbWVBdHRyaWIgPSAnSU5URVJQT0xBVElPTic7XHJcbiAgICAgICAgaWYgKHBhcnQuaW5kZXgoKSA+IDApIHtcclxuICAgICAgICAgICAgbmFtZUF0dHJpYiA9ICdJTlRFUlBPTEFUSU9OXycgKyBwYXJ0LmluZGV4KCkudG9TdHJpbmcoMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCduYW1lJywgbmFtZUF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZXhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdleCcpO1xyXG4gICAgICAgIGV4RWxlbS5hcHBlbmRDaGlsZChyb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5hbWVBdHRyaWIpKTtcclxuICAgICAgICBwaEVsZW0uYXBwZW5kQ2hpbGQoZXhFbGVtKTtcclxuICAgICAgICByZXR1cm4gcGhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBpY3UgbWVzc2FnZSByZWZzIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mSUNVTWVzc2FnZVJlZlBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmLCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHBoRWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGgnKTtcclxuICAgICAgICBsZXQgbmFtZUF0dHJpYiA9ICdJQ1UnO1xyXG4gICAgICAgIGlmIChwYXJ0LmluZGV4KCkgPiAwKSB7XHJcbiAgICAgICAgICAgIG5hbWVBdHRyaWIgPSAnSUNVXycgKyBwYXJ0LmluZGV4KCkudG9TdHJpbmcoMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCduYW1lJywgbmFtZUF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZXhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdleCcpO1xyXG4gICAgICAgIGV4RWxlbS5hcHBlbmRDaGlsZChyb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5hbWVBdHRyaWIpKTtcclxuICAgICAgICBwaEVsZW0uYXBwZW5kQ2hpbGQoZXhFbGVtKTtcclxuICAgICAgICByZXR1cm4gcGhFbGVtO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==