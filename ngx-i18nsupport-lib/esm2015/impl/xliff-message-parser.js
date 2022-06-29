/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AbstractMessageParser } from './abstract-message-parser';
import { TagMapping } from './tag-mapping';
import { ParsedMessagePartType } from './parsed-message-part';
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
export class XliffMessageParser extends AbstractMessageParser {
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
        /** @type {?} */
        const tagMapping = new TagMapping();
        if (tagName === 'x') {
            // placeholder are like <x id="INTERPOLATION"/> or <x id="INTERPOLATION_1">
            /** @type {?} */
            const id = elementNode.getAttribute('id');
            if (!id) {
                return; // should not happen
            }
            if (id.startsWith('INTERPOLATION')) {
                /** @type {?} */
                const index = this.parsePlaceholderIndexFromId(id);
                message.addPlaceholder(index, null);
            }
            else if (id.startsWith('ICU')) {
                /** @type {?} */
                const index = this.parseICUMessageRefIndexFromId(id);
                message.addICUMessageRef(index, null);
            }
            else if (id.startsWith('START_')) {
                /** @type {?} */
                const normalizedTagName = tagMapping.getTagnameFromStartTagPlaceholderName(id);
                if (normalizedTagName) {
                    /** @type {?} */
                    const idcount = this.parseIdCountFromName(id);
                    message.addStartTag(normalizedTagName, idcount);
                }
            }
            else if (id.startsWith('CLOSE_')) {
                /** @type {?} */
                const normalizedTagName = tagMapping.getTagnameFromCloseTagPlaceholderName(id);
                if (normalizedTagName) {
                    message.addEndTag(normalizedTagName);
                }
            }
            else if (tagMapping.isEmptyTagPlaceholderName(id)) {
                /** @type {?} */
                const normalizedTagName = tagMapping.getTagnameFromEmptyTagPlaceholderName(id);
                if (normalizedTagName) {
                    /** @type {?} */
                    const idcount = this.parseIdCountFromName(id);
                    message.addEmptyTag(normalizedTagName, idcount);
                }
            }
        }
        return true;
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
     * @param {?} id id
     * @return {?} index
     */
    parsePlaceholderIndexFromId(id) {
        /** @type {?} */
        let indexString = '';
        if (id === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = id.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    }
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} id as number
     */
    parseICUMessageRefIndexFromId(id) {
        /** @type {?} */
        let indexString = '';
        if (id === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = id.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
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
            let child;
            switch (part.type) {
                case ParsedMessagePartType.TEXT:
                    child = this.createXmlRepresentationOfTextPart((/** @type {?} */ (part)), rootElem);
                    break;
                case ParsedMessagePartType.START_TAG:
                    child = this.createXmlRepresentationOfStartTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.END_TAG:
                    child = this.createXmlRepresentationOfEndTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.EMPTY_TAG:
                    child = this.createXmlRepresentationOfEmptyTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.PLACEHOLDER:
                    child = this.createXmlRepresentationOfPlaceholderPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.ICU_MESSAGE_REF:
                    child = this.createXmlRepresentationOfICUMessageRefPart(((/** @type {?} */ (part))), rootElem);
                    break;
            }
            if (child) {
                rootElem.appendChild(child);
            }
        }));
    }
    /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfStartTagPart(part, rootElem) {
        /** @type {?} */
        const xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const idAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        /** @type {?} */
        const ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        /** @type {?} */
        const equivTextAttr = '<' + part.tagName() + '>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    }
    /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfEndTagPart(part, rootElem) {
        /** @type {?} */
        const xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const idAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        /** @type {?} */
        const ctypeAttrib = 'x-' + part.tagName();
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        return xElem;
    }
    /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfEmptyTagPart(part, rootElem) {
        /** @type {?} */
        const xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const idAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        /** @type {?} */
        const ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        /** @type {?} */
        const equivTextAttr = '<' + part.tagName() + '/>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    }
    /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfPlaceholderPart(part, rootElem) {
        /** @type {?} */
        const xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        let idAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            idAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        /** @type {?} */
        const equivTextAttr = part.disp();
        xElem.setAttribute('id', idAttrib);
        if (equivTextAttr) {
            xElem.setAttribute('equiv-text', equivTextAttr);
        }
        return xElem;
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
        const xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        let idAttrib = 'ICU';
        if (part.index() > 0) {
            idAttrib = 'ICU_' + part.index().toString(10);
        }
        xElem.setAttribute('id', idAttrib);
        return xElem;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVzc2FnZS1wYXJzZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3hsaWZmLW1lc3NhZ2UtcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUtoRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXpDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDOzs7OztBQU01RCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEscUJBQXFCOzs7Ozs7Ozs7SUFTL0MsbUJBQW1CLENBQUMsV0FBb0IsRUFBRSxPQUFzQjs7Y0FDaEUsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPOztjQUM3QixVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFDbkMsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFOzs7a0JBRVgsRUFBRSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsT0FBTyxDQUFDLG9CQUFvQjthQUMvQjtZQUNELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTs7c0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDO2dCQUNsRCxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QztpQkFBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7O3NCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN6QztpQkFBTSxJ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c3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtc3RhcnQtdGFnJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydEVuZFRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVuZC10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXJ9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlcic7XHJcbmltcG9ydCB7VGFnTWFwcGluZ30gZnJvbSAnLi90YWctbWFwcGluZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVtcHR5LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UtcmVmJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRUeXBlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0VGV4dH0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXRleHQnO1xyXG4vKipcclxuICogQ3JlYXRlZCBieSByb29ibSBvbiAxMC4wNS4yMDE3LlxyXG4gKiBBIG1lc3NhZ2UgcGFyc2VyIGZvciBYTElGRiAxLjJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBYbGlmZk1lc3NhZ2VQYXJzZXIgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VQYXJzZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIHRoaXMgZWxlbWVudCBub2RlLlxyXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYmVmb3JlIHRoZSBjaGlsZHJlbiBhcmUgZG9uZS5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50Tm9kZSBlbGVtZW50Tm9kZVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBhbHRlcmVkXHJcbiAgICAgKiBAcmV0dXJuIHRydWUsIGlmIGNoaWxkcmVuIHNob3VsZCBiZSBwcm9jZXNzZWQgdG9vLCBmYWxzZSBvdGhlcndpc2UgKGNoaWxkcmVuIGlnbm9yZWQgdGhlbilcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NTdGFydEVsZW1lbnQoZWxlbWVudE5vZGU6IEVsZW1lbnQsIG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0YWdOYW1lID0gZWxlbWVudE5vZGUudGFnTmFtZTtcclxuICAgICAgICBjb25zdCB0YWdNYXBwaW5nID0gbmV3IFRhZ01hcHBpbmcoKTtcclxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ3gnKSB7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGFyZSBsaWtlIDx4IGlkPVwiSU5URVJQT0xBVElPTlwiLz4gb3IgPHggaWQ9XCJJTlRFUlBPTEFUSU9OXzFcIj5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gc2hvdWxkIG5vdCBoYXBwZW5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQuc3RhcnRzV2l0aCgnSU5URVJQT0xBVElPTicpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyc2VQbGFjZWhvbGRlckluZGV4RnJvbUlkKGlkKTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkUGxhY2Vob2xkZXIoaW5kZXgsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkLnN0YXJ0c1dpdGgoJ0lDVScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyc2VJQ1VNZXNzYWdlUmVmSW5kZXhGcm9tSWQoaWQpO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRJQ1VNZXNzYWdlUmVmKGluZGV4LCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZC5zdGFydHNXaXRoKCdTVEFSVF8nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRhZ05hbWUgPSB0YWdNYXBwaW5nLmdldFRhZ25hbWVGcm9tU3RhcnRUYWdQbGFjZWhvbGRlck5hbWUoaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUYWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRjb3VudCA9IHRoaXMucGFyc2VJZENvdW50RnJvbU5hbWUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkU3RhcnRUYWcobm9ybWFsaXplZFRhZ05hbWUsIGlkY291bnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlkLnN0YXJ0c1dpdGgoJ0NMT1NFXycpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkVGFnTmFtZSA9IHRhZ01hcHBpbmcuZ2V0VGFnbmFtZUZyb21DbG9zZVRhZ1BsYWNlaG9sZGVyTmFtZShpZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZFRhZ05hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZEVuZFRhZyhub3JtYWxpemVkVGFnTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGFnTWFwcGluZy5pc0VtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRhZ05hbWUgPSB0YWdNYXBwaW5nLmdldFRhZ25hbWVGcm9tRW1wdHlUYWdQbGFjZWhvbGRlck5hbWUoaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRUYWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWRjb3VudCA9IHRoaXMucGFyc2VJZENvdW50RnJvbU5hbWUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkRW1wdHlUYWcobm9ybWFsaXplZFRhZ05hbWUsIGlkY291bnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGVuZCBvZiB0aGlzIGVsZW1lbnQgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIGFsbCBjaGlsZHJlbiBhcmUgcHJvY2Vzc2VkLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NFbmRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBpZCBhdHRyaWJ1dGUgb2YgeCBlbGVtZW50IGFzIHBsYWNlaG9sZGVyIGluZGV4LlxyXG4gICAgICogaWQgY2FuIGJlIFwiSU5URVJQT0xBVElPTlwiIG9yIFwiSU5URVJQT0xBVElPTl9uXCJcclxuICAgICAqIEBwYXJhbSBpZCBpZFxyXG4gICAgICogQHJldHVybiBpbmRleFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHBhcnNlUGxhY2Vob2xkZXJJbmRleEZyb21JZChpZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaW5kZXhTdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGlkID09PSAnSU5URVJQT0xBVElPTicpIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSBpZC5zdWJzdHJpbmcoJ0lOVEVSUE9MQVRJT05fJy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gTnVtYmVyLnBhcnNlSW50KGluZGV4U3RyaW5nLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBpZCBhdHRyaWJ1dGUgb2YgeCBlbGVtZW50IGFzIHBsYWNlaG9sZGVyIGluZGV4LlxyXG4gICAgICogaWQgY2FuIGJlIFwiSU5URVJQT0xBVElPTlwiIG9yIFwiSU5URVJQT0xBVElPTl9uXCJcclxuICAgICAqIEBwYXJhbSBpZCBpZFxyXG4gICAgICogQHJldHVybiBpZCBhcyBudW1iZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZUlDVU1lc3NhZ2VSZWZJbmRleEZyb21JZChpZDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaW5kZXhTdHJpbmcgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGlkID09PSAnSUNVJykge1xyXG4gICAgICAgICAgICBpbmRleFN0cmluZyA9ICcwJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRleFN0cmluZyA9IGlkLnN1YnN0cmluZygnSUNVXycubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRYbWxSZXByZXNlbnRhdGlvblRvUm9vdChtZXNzYWdlOiBQYXJzZWRNZXNzYWdlLCByb290RWxlbTogRWxlbWVudCkge1xyXG4gICAgICAgIG1lc3NhZ2UucGFydHMoKS5mb3JFYWNoKChwYXJ0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZDogTm9kZTtcclxuICAgICAgICAgICAgc3dpdGNoIChwYXJ0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlRFWFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZUZXh0UGFydCg8UGFyc2VkTWVzc2FnZVBhcnRUZXh0PiBwYXJ0LCByb290RWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5TVEFSVF9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZTdGFydFRhZ1BhcnQoKDxQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTkRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW5kVGFnUGFydCgoPFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTVBUWV9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbXB0eVRhZ1BhcnQoKDxQYXJzZWRNZXNzYWdlUGFydEVtcHR5VGFnPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5QTEFDRUhPTERFUjpcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlBsYWNlaG9sZGVyUGFydCgoPFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXI+cGFydCksIHJvb3RFbGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFX1JFRjpcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KCg8UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmPnBhcnQpLCByb290RWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICByb290RWxlbS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3Igc3RhcnQgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiBlbXB0eSA8eC8+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGVzIGlkIGFuZCBjdHlwZVxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mU3RhcnRUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgeEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcclxuICAgICAgICBjb25zdCB0YWdNYXBwaW5nID0gbmV3IFRhZ01hcHBpbmcoKTtcclxuICAgICAgICBjb25zdCBpZEF0dHJpYiA9IHRhZ01hcHBpbmcuZ2V0U3RhcnRUYWdQbGFjZWhvbGRlck5hbWUocGFydC50YWdOYW1lKCksIHBhcnQuaWRDb3VudGVyKCkpO1xyXG4gICAgICAgIGNvbnN0IGN0eXBlQXR0cmliID0gdGFnTWFwcGluZy5nZXRDdHlwZUZvclRhZyhwYXJ0LnRhZ05hbWUoKSk7XHJcbiAgICAgICAgY29uc3QgZXF1aXZUZXh0QXR0ciA9ICc8JyArIHBhcnQudGFnTmFtZSgpICsgJz4nO1xyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpZEF0dHJpYik7XHJcbiAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdjdHlwZScsIGN0eXBlQXR0cmliKTtcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2VxdWl2LXRleHQnLCBlcXVpdlRleHRBdHRyKTtcclxuICAgICAgICByZXR1cm4geEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGVuZCB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVtcHR5IDx4Lz4tRWxlbWVudCB3aXRoIGF0dHJpYnV0ZXMgaWQgYW5kIGN0eXBlXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbmRUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnLCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCd4Jyk7XHJcbiAgICAgICAgY29uc3QgdGFnTWFwcGluZyA9IG5ldyBUYWdNYXBwaW5nKCk7XHJcbiAgICAgICAgY29uc3QgaWRBdHRyaWIgPSB0YWdNYXBwaW5nLmdldENsb3NlVGFnUGxhY2Vob2xkZXJOYW1lKHBhcnQudGFnTmFtZSgpKTtcclxuICAgICAgICBjb25zdCBjdHlwZUF0dHJpYiA9ICd4LScgKyBwYXJ0LnRhZ05hbWUoKTtcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaWRBdHRyaWIpO1xyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnY3R5cGUnLCBjdHlwZUF0dHJpYik7XHJcbiAgICAgICAgcmV0dXJuIHhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBlbXB0eSB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVtcHR5IDx4Lz4tRWxlbWVudCB3aXRoIGF0dHJpYnV0ZXMgaWQgYW5kIGN0eXBlXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbXB0eVRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZywgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCB4RWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgneCcpO1xyXG4gICAgICAgIGNvbnN0IHRhZ01hcHBpbmcgPSBuZXcgVGFnTWFwcGluZygpO1xyXG4gICAgICAgIGNvbnN0IGlkQXR0cmliID0gdGFnTWFwcGluZy5nZXRFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShwYXJ0LnRhZ05hbWUoKSwgcGFydC5pZENvdW50ZXIoKSk7XHJcbiAgICAgICAgY29uc3QgY3R5cGVBdHRyaWIgPSB0YWdNYXBwaW5nLmdldEN0eXBlRm9yVGFnKHBhcnQudGFnTmFtZSgpKTtcclxuICAgICAgICBjb25zdCBlcXVpdlRleHRBdHRyID0gJzwnICsgcGFydC50YWdOYW1lKCkgKyAnLz4nO1xyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpZEF0dHJpYik7XHJcbiAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdjdHlwZScsIGN0eXBlQXR0cmliKTtcclxuICAgICAgICB4RWxlbS5zZXRBdHRyaWJ1dGUoJ2VxdWl2LXRleHQnLCBlcXVpdlRleHRBdHRyKTtcclxuICAgICAgICByZXR1cm4geEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIHBsYWNlaG9sZGVyIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiBlbXB0eSA8eC8+LUVsZW1lbnQgd2l0aCBhdHRyaWJ1dGUgaWQ9XCJJTlRFUlBPTEFUSU9OXCIgb3IgaWQ9XCJJTlRFUlBPTEFUSU9OX25cIlxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mUGxhY2Vob2xkZXJQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXIsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgeEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3gnKTtcclxuICAgICAgICBsZXQgaWRBdHRyaWIgPSAnSU5URVJQT0xBVElPTic7XHJcbiAgICAgICAgaWYgKHBhcnQuaW5kZXgoKSA+IDApIHtcclxuICAgICAgICAgICAgaWRBdHRyaWIgPSAnSU5URVJQT0xBVElPTl8nICsgcGFydC5pbmRleCgpLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZXF1aXZUZXh0QXR0ciA9IHBhcnQuZGlzcCgpO1xyXG4gICAgICAgIHhFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpZEF0dHJpYik7XHJcbiAgICAgICAgaWYgKGVxdWl2VGV4dEF0dHIpIHtcclxuICAgICAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdlcXVpdi10ZXh0JywgZXF1aXZUZXh0QXR0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4RWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgaWN1IG1lc3NhZ2UgcmVmcyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZiwgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCB4RWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgneCcpO1xyXG4gICAgICAgIGxldCBpZEF0dHJpYiA9ICdJQ1UnO1xyXG4gICAgICAgIGlmIChwYXJ0LmluZGV4KCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGlkQXR0cmliID0gJ0lDVV8nICsgcGFydC5pbmRleCgpLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgeEVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIGlkQXR0cmliKTtcclxuICAgICAgICByZXR1cm4geEVsZW07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==