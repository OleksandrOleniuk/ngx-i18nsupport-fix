/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AbstractMessageParser } from './abstract-message-parser';
import { ParsedMessagePartType } from './parsed-message-part';
import { TagMapping } from './tag-mapping';
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
export class Xliff2MessageParser extends AbstractMessageParser {
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
            // placeholder are like <ph id="0" equiv="INTERPOLATION" disp="{{number()}}"/>
            // They contain the id and also a name (number in the example)
            // TODO make some use of the name (but it is not available in XLIFF 1.2)
            // ICU message are handled with the same tag
            // Before 4.3.2 they did not have an equiv and disp (Bug #17344):
            // e.g. <ph id="0"/>
            // Beginning with 4.3.2 they do have an equiv ICU and disp:
            // e.g. <ph id="0" equiv="ICU" disp="{count, plural, =0 {...} =1 {...} other {...}}"/>
            // and empty tags have equiv other then INTERPOLATION:
            // e.g. <ph id="3" equiv="TAG_IMG" type="image" disp="&lt;img/>"/>
            // or <ph equiv="LINE_BREAK" type="lb" disp="&lt;br/>"/>
            /** @type {?} */
            let isInterpolation = false;
            /** @type {?} */
            let isICU = false;
            /** @type {?} */
            let isEmptyTag = false;
            /** @type {?} */
            const equiv = elementNode.getAttribute('equiv');
            /** @type {?} */
            const disp = elementNode.getAttribute('disp');
            /** @type {?} */
            let indexString = null;
            /** @type {?} */
            let index = 0;
            /** @type {?} */
            let emptyTagName = null;
            if (!equiv) {
                // old ICU syntax, fixed with #17344
                isICU = true;
                indexString = elementNode.getAttribute('id');
                index = Number.parseInt(indexString, 10);
            }
            else if (equiv.startsWith('ICU')) {
                // new ICU syntax, fixed with #17344
                isICU = true;
                if (equiv === 'ICU') {
                    indexString = '0';
                }
                else {
                    indexString = equiv.substring('ICU_'.length);
                }
                index = Number.parseInt(indexString, 10);
            }
            else if (equiv.startsWith('INTERPOLATION')) {
                isInterpolation = true;
                if (equiv === 'INTERPOLATION') {
                    indexString = '0';
                }
                else {
                    indexString = equiv.substring('INTERPOLATION_'.length);
                }
                index = Number.parseInt(indexString, 10);
            }
            else if (new TagMapping().isEmptyTagPlaceholderName(equiv)) {
                isEmptyTag = true;
                emptyTagName = new TagMapping().getTagnameFromEmptyTagPlaceholderName(equiv);
            }
            else {
                return true;
            }
            if (isInterpolation) {
                message.addPlaceholder(index, disp);
            }
            else if (isICU) {
                message.addICUMessageRef(index, disp);
            }
            else if (isEmptyTag) {
                message.addEmptyTag(emptyTagName, this.parseIdCountFromName(equiv));
            }
        }
        else if (tagName === 'pc') {
            // pc example: <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt"
            // dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">IMPORTANT</pc>
            /** @type {?} */
            const embeddedTagName = this.tagNameFromPCElement(elementNode);
            if (embeddedTagName) {
                message.addStartTag(embeddedTagName, this.parseIdCountFromName(elementNode.getAttribute('equivStart')));
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
        /** @type {?} */
        const tagName = elementNode.tagName;
        if (tagName === 'pc') {
            // pc example: <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt"
            // dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">IMPORTANT</pc>
            /** @type {?} */
            const embeddedTagName = this.tagNameFromPCElement(elementNode);
            if (embeddedTagName) {
                message.addEndTag(embeddedTagName);
            }
            return;
        }
    }
    /**
     * @private
     * @param {?} pcNode
     * @return {?}
     */
    tagNameFromPCElement(pcNode) {
        /** @type {?} */
        let dispStart = pcNode.getAttribute('dispStart');
        if (dispStart.startsWith('<')) {
            dispStart = dispStart.substring(1);
        }
        if (dispStart.endsWith('>')) {
            dispStart = dispStart.substring(0, dispStart.length - 1);
        }
        return dispStart;
    }
    /**
     * reimplemented here, because XLIFF 2.0 uses a deeper xml model.
     * So we cannot simply replace the message parts by xml parts.
     * @protected
     * @param {?} message message
     * @param {?} rootElem rootElem
     * @return {?}
     */
    addXmlRepresentationToRoot(message, rootElem) {
        /** @type {?} */
        const stack = [{ element: rootElem, tagName: 'root' }];
        /** @type {?} */
        let id = 0;
        message.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        (part) => {
            switch (part.type) {
                case ParsedMessagePartType.TEXT:
                    stack[stack.length - 1].element.appendChild(this.createXmlRepresentationOfTextPart((/** @type {?} */ (part)), rootElem));
                    break;
                case ParsedMessagePartType.PLACEHOLDER:
                    stack[stack.length - 1].element.appendChild(this.createXmlRepresentationOfPlaceholderPart((/** @type {?} */ (part)), rootElem, id++));
                    break;
                case ParsedMessagePartType.ICU_MESSAGE_REF:
                    stack[stack.length - 1].element.appendChild(this.createXmlRepresentationOfICUMessageRefPart((/** @type {?} */ (part)), rootElem));
                    break;
                case ParsedMessagePartType.START_TAG:
                    /** @type {?} */
                    const newTagElem = this.createXmlRepresentationOfStartTagPart((/** @type {?} */ (part)), rootElem, id++);
                    stack[stack.length - 1].element.appendChild(newTagElem);
                    stack.push({ element: (/** @type {?} */ (newTagElem)), tagName: ((/** @type {?} */ (part))).tagName() });
                    break;
                case ParsedMessagePartType.END_TAG:
                    /** @type {?} */
                    const closeTagName = ((/** @type {?} */ (part))).tagName();
                    if (stack.length <= 1 || stack[stack.length - 1].tagName !== closeTagName) {
                        // oops, not well formed
                        throw new Error('unexpected close tag ' + closeTagName);
                    }
                    stack.pop();
                    break;
                case ParsedMessagePartType.EMPTY_TAG:
                    /** @type {?} */
                    const emptyTagElem = this.createXmlRepresentationOfEmptyTagPart((/** @type {?} */ (part)), rootElem, id++);
                    stack[stack.length - 1].element.appendChild(emptyTagElem);
                    break;
            }
        }));
        if (stack.length !== 1) {
            // oops, not well closed tags
            throw new Error('missing close tag ' + stack[stack.length - 1].tagName);
        }
    }
    /**
     * the xml used for start tag in the message.
     * Returns an empty pc-Element.
     * e.g. <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">
     * Text content will be added later.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?} id id number in xliff2
     * @return {?}
     */
    createXmlRepresentationOfStartTagPart(part, rootElem, id) {
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const pcElem = rootElem.ownerDocument.createElement('pc');
        /** @type {?} */
        const tagName = part.tagName();
        /** @type {?} */
        const equivStart = tagMapping.getStartTagPlaceholderName(tagName, part.idCounter());
        /** @type {?} */
        const equivEnd = tagMapping.getCloseTagPlaceholderName(tagName);
        /** @type {?} */
        const dispStart = '<' + tagName + '>';
        /** @type {?} */
        const dispEnd = '</' + tagName + '>';
        pcElem.setAttribute('id', id.toString(10));
        pcElem.setAttribute('equivStart', equivStart);
        pcElem.setAttribute('equivEnd', equivEnd);
        pcElem.setAttribute('type', this.getTypeForTag(tagName));
        pcElem.setAttribute('dispStart', dispStart);
        pcElem.setAttribute('dispEnd', dispEnd);
        return pcElem;
    }
    /**
     * the xml used for end tag in the message.
     * Not used here, because content is child of start tag.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    createXmlRepresentationOfEndTagPart(part, rootElem) {
        // not used
        return null;
    }
    /**
     * the xml used for empty tag in the message.
     * Returns an empty ph-Element.
     * e.g. <ph id="3" equiv="TAG_IMG" type="image" disp="&lt;img/>"/>
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?} id id number in xliff2
     * @return {?}
     */
    createXmlRepresentationOfEmptyTagPart(part, rootElem, id) {
        /** @type {?} */
        const tagMapping = new TagMapping();
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        const tagName = part.tagName();
        /** @type {?} */
        const equiv = tagMapping.getEmptyTagPlaceholderName(tagName, part.idCounter());
        /** @type {?} */
        const disp = '<' + tagName + '/>';
        phElem.setAttribute('id', id.toString(10));
        phElem.setAttribute('equiv', equiv);
        phElem.setAttribute('type', this.getTypeForTag(tagName));
        phElem.setAttribute('disp', disp);
        return phElem;
    }
    /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    getTypeForTag(tag) {
        switch (tag.toLowerCase()) {
            case 'br':
            case 'b':
            case 'i':
            case 'u':
                return 'fmt';
            case 'img':
                return 'image';
            case 'a':
                return 'link';
            default:
                return 'other';
        }
    }
    /**
     * the xml used for placeholder in the message.
     * Returns e.g. <ph id="1" equiv="INTERPOLATION_1" disp="{{total()}}"/>
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?} id id number in xliff2
     * @return {?}
     */
    createXmlRepresentationOfPlaceholderPart(part, rootElem, id) {
        /** @type {?} */
        const phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        let equivAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            equivAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('id', id.toString(10));
        phElem.setAttribute('equiv', equivAttrib);
        /** @type {?} */
        const disp = part.disp();
        if (disp) {
            phElem.setAttribute('disp', disp);
        }
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
        let equivAttrib = 'ICU';
        if (part.index() > 0) {
            equivAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('id', part.index().toString(10));
        phElem.setAttribute('equiv', equivAttrib);
        /** @type {?} */
        const disp = part.disp();
        if (disp) {
            phElem.setAttribute('disp', disp);
        }
        return phElem;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyLW1lc3NhZ2UtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC94bGlmZjItbWVzc2FnZS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBTWhFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBT3pDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxxQkFBcUI7Ozs7Ozs7OztJQVNoRCxtQkFBbUIsQ0FBQyxXQUFvQixFQUFFLE9BQXNCOztjQUNoRSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU87UUFDbkMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7O2dCQVlkLGVBQWUsR0FBRyxLQUFLOztnQkFDdkIsS0FBSyxHQUFHLEtBQUs7O2dCQUNiLFVBQVUsR0FBRyxLQUFLOztrQkFDaEIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDOztrQkFDekMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDOztnQkFDekMsV0FBVyxHQUFHLElBQUk7O2dCQUNsQixLQUFLLEdBQUcsQ0FBQzs7Z0JBQ1QsWUFBWSxHQUFHLElBQUk7WUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixvQ0FBb0M7Z0JBQ3BDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM1QztpQkFBTSxJQUFJLEtBQUssQ0FBQyxV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T0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDOztjQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtRQUN4QixJQUFJLElBQUksRUFBRTtZQUNOLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBYnN0cmFjdE1lc3NhZ2VQYXJzZXJ9IGZyb20gJy4vYWJzdHJhY3QtbWVzc2FnZS1wYXJzZXInO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2V9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1zdGFydC10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtZW5kLXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRQbGFjZWhvbGRlcn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LXBsYWNlaG9sZGVyJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFRleHR9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC10ZXh0JztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFR5cGV9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydCc7XHJcbmltcG9ydCB7VGFnTWFwcGluZ30gZnJvbSAnLi90YWctbWFwcGluZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVtcHR5LXRhZyc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtaWN1LW1lc3NhZ2UtcmVmJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgcm9vYm0gb24gMTAuMDUuMjAxNy5cclxuICogQSBtZXNzYWdlIHBhcnNlciBmb3IgWExJRkYgMi4wXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgWGxpZmYyTWVzc2FnZVBhcnNlciBleHRlbmRzIEFic3RyYWN0TWVzc2FnZVBhcnNlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgdGhpcyBlbGVtZW50IG5vZGUuXHJcbiAgICAgKiBUaGlzIGlzIGNhbGxlZCBiZWZvcmUgdGhlIGNoaWxkcmVuIGFyZSBkb25lLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqIEByZXR1cm4gdHJ1ZSwgaWYgY2hpbGRyZW4gc2hvdWxkIGJlIHByb2Nlc3NlZCB0b28sIGZhbHNlIG90aGVyd2lzZSAoY2hpbGRyZW4gaWdub3JlZCB0aGVuKVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc1N0YXJ0RWxlbWVudChlbGVtZW50Tm9kZTogRWxlbWVudCwgbWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBlbGVtZW50Tm9kZS50YWdOYW1lO1xyXG4gICAgICAgIGlmICh0YWdOYW1lID09PSAncGgnKSB7XHJcbiAgICAgICAgICAgIC8vIHBsYWNlaG9sZGVyIGFyZSBsaWtlIDxwaCBpZD1cIjBcIiBlcXVpdj1cIklOVEVSUE9MQVRJT05cIiBkaXNwPVwie3tudW1iZXIoKX19XCIvPlxyXG4gICAgICAgICAgICAvLyBUaGV5IGNvbnRhaW4gdGhlIGlkIGFuZCBhbHNvIGEgbmFtZSAobnVtYmVyIGluIHRoZSBleGFtcGxlKVxyXG4gICAgICAgICAgICAvLyBUT0RPIG1ha2Ugc29tZSB1c2Ugb2YgdGhlIG5hbWUgKGJ1dCBpdCBpcyBub3QgYXZhaWxhYmxlIGluIFhMSUZGIDEuMilcclxuICAgICAgICAgICAgLy8gSUNVIG1lc3NhZ2UgYXJlIGhhbmRsZWQgd2l0aCB0aGUgc2FtZSB0YWdcclxuICAgICAgICAgICAgLy8gQmVmb3JlIDQuMy4yIHRoZXkgZGlkIG5vdCBoYXZlIGFuIGVxdWl2IGFuZCBkaXNwIChCdWcgIzE3MzQ0KTpcclxuICAgICAgICAgICAgLy8gZS5nLiA8cGggaWQ9XCIwXCIvPlxyXG4gICAgICAgICAgICAvLyBCZWdpbm5pbmcgd2l0aCA0LjMuMiB0aGV5IGRvIGhhdmUgYW4gZXF1aXYgSUNVIGFuZCBkaXNwOlxyXG4gICAgICAgICAgICAvLyBlLmcuIDxwaCBpZD1cIjBcIiBlcXVpdj1cIklDVVwiIGRpc3A9XCJ7Y291bnQsIHBsdXJhbCwgPTAgey4uLn0gPTEgey4uLn0gb3RoZXIgey4uLn19XCIvPlxyXG4gICAgICAgICAgICAvLyBhbmQgZW1wdHkgdGFncyBoYXZlIGVxdWl2IG90aGVyIHRoZW4gSU5URVJQT0xBVElPTjpcclxuICAgICAgICAgICAgLy8gZS5nLiA8cGggaWQ9XCIzXCIgZXF1aXY9XCJUQUdfSU1HXCIgdHlwZT1cImltYWdlXCIgZGlzcD1cIiZsdDtpbWcvPlwiLz5cclxuICAgICAgICAgICAgLy8gb3IgPHBoIGVxdWl2PVwiTElORV9CUkVBS1wiIHR5cGU9XCJsYlwiIGRpc3A9XCImbHQ7YnIvPlwiLz5cclxuICAgICAgICAgICAgbGV0IGlzSW50ZXJwb2xhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgaXNJQ1UgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGlzRW1wdHlUYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgZXF1aXYgPSBlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2VxdWl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3AgPSBlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2Rpc3AnKTtcclxuICAgICAgICAgICAgbGV0IGluZGV4U3RyaW5nID0gbnVsbDtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgbGV0IGVtcHR5VGFnTmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghZXF1aXYpIHtcclxuICAgICAgICAgICAgICAgIC8vIG9sZCBJQ1Ugc3ludGF4LCBmaXhlZCB3aXRoICMxNzM0NFxyXG4gICAgICAgICAgICAgICAgaXNJQ1UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSBlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVxdWl2LnN0YXJ0c1dpdGgoJ0lDVScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuZXcgSUNVIHN5bnRheCwgZml4ZWQgd2l0aCAjMTczNDRcclxuICAgICAgICAgICAgICAgIGlzSUNVID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcXVpdiA9PT0gJ0lDVScpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleFN0cmluZyA9ICcwJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSBlcXVpdi5zdWJzdHJpbmcoJ0lDVV8nLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVxdWl2LnN0YXJ0c1dpdGgoJ0lOVEVSUE9MQVRJT04nKSkge1xyXG4gICAgICAgICAgICAgICAgaXNJbnRlcnBvbGF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChlcXVpdiA9PT0gJ0lOVEVSUE9MQVRJT04nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4U3RyaW5nID0gZXF1aXYuc3Vic3RyaW5nKCdJTlRFUlBPTEFUSU9OXycubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGluZGV4ID0gTnVtYmVyLnBhcnNlSW50KGluZGV4U3RyaW5nLCAxMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3IFRhZ01hcHBpbmcoKS5pc0VtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKGVxdWl2KSkge1xyXG4gICAgICAgICAgICAgICAgaXNFbXB0eVRhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlbXB0eVRhZ05hbWUgPSBuZXcgVGFnTWFwcGluZygpLmdldFRhZ25hbWVGcm9tRW1wdHlUYWdQbGFjZWhvbGRlck5hbWUoZXF1aXYpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzSW50ZXJwb2xhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRQbGFjZWhvbGRlcihpbmRleCwgZGlzcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNJQ1UpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkSUNVTWVzc2FnZVJlZihpbmRleCwgZGlzcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNFbXB0eVRhZykge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5hZGRFbXB0eVRhZyhlbXB0eVRhZ05hbWUsIHRoaXMucGFyc2VJZENvdW50RnJvbU5hbWUoZXF1aXYpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gJ3BjJykge1xyXG4gICAgICAgICAgICAvLyBwYyBleGFtcGxlOiA8cGMgaWQ9XCIwXCIgZXF1aXZTdGFydD1cIlNUQVJUX0JPTERfVEVYVFwiIGVxdWl2RW5kPVwiQ0xPU0VfQk9MRF9URVhUXCIgdHlwZT1cImZtdFwiXHJcbiAgICAgICAgICAgIC8vIGRpc3BTdGFydD1cIiZsdDtiJmd0O1wiIGRpc3BFbmQ9XCImbHQ7L2ImZ3Q7XCI+SU1QT1JUQU5UPC9wYz5cclxuICAgICAgICAgICAgY29uc3QgZW1iZWRkZWRUYWdOYW1lID0gdGhpcy50YWdOYW1lRnJvbVBDRWxlbWVudChlbGVtZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChlbWJlZGRlZFRhZ05hbWUpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkU3RhcnRUYWcoZW1iZWRkZWRUYWdOYW1lLCB0aGlzLnBhcnNlSWRDb3VudEZyb21OYW1lKGVsZW1lbnROb2RlLmdldEF0dHJpYnV0ZSgnZXF1aXZTdGFydCcpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgZW5kIG9mIHRoaXMgZWxlbWVudCBub2RlLlxyXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYWZ0ZXIgYWxsIGNoaWxkcmVuIGFyZSBwcm9jZXNzZWQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5vZGUgZWxlbWVudE5vZGVcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2UgdG8gYmUgYWx0ZXJlZFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcHJvY2Vzc0VuZEVsZW1lbnQoZWxlbWVudE5vZGU6IEVsZW1lbnQsIG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UpIHtcclxuICAgICAgICBjb25zdCB0YWdOYW1lID0gZWxlbWVudE5vZGUudGFnTmFtZTtcclxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ3BjJykge1xyXG4gICAgICAgICAgICAvLyBwYyBleGFtcGxlOiA8cGMgaWQ9XCIwXCIgZXF1aXZTdGFydD1cIlNUQVJUX0JPTERfVEVYVFwiIGVxdWl2RW5kPVwiQ0xPU0VfQk9MRF9URVhUXCIgdHlwZT1cImZtdFwiXHJcbiAgICAgICAgICAgIC8vIGRpc3BTdGFydD1cIiZsdDtiJmd0O1wiIGRpc3BFbmQ9XCImbHQ7L2ImZ3Q7XCI+SU1QT1JUQU5UPC9wYz5cclxuICAgICAgICAgICAgY29uc3QgZW1iZWRkZWRUYWdOYW1lID0gdGhpcy50YWdOYW1lRnJvbVBDRWxlbWVudChlbGVtZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIGlmIChlbWJlZGRlZFRhZ05hbWUpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkRW5kVGFnKGVtYmVkZGVkVGFnTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRhZ05hbWVGcm9tUENFbGVtZW50KHBjTm9kZTogRWxlbWVudCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRpc3BTdGFydCA9IHBjTm9kZS5nZXRBdHRyaWJ1dGUoJ2Rpc3BTdGFydCcpO1xyXG4gICAgICAgIGlmIChkaXNwU3RhcnQuc3RhcnRzV2l0aCgnPCcpKSB7XHJcbiAgICAgICAgICAgIGRpc3BTdGFydCA9IGRpc3BTdGFydC5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwU3RhcnQuZW5kc1dpdGgoJz4nKSkge1xyXG4gICAgICAgICAgICBkaXNwU3RhcnQgPSBkaXNwU3RhcnQuc3Vic3RyaW5nKDAsIGRpc3BTdGFydC5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3BTdGFydDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlaW1wbGVtZW50ZWQgaGVyZSwgYmVjYXVzZSBYTElGRiAyLjAgdXNlcyBhIGRlZXBlciB4bWwgbW9kZWwuXHJcbiAgICAgKiBTbyB3ZSBjYW5ub3Qgc2ltcGx5IHJlcGxhY2UgdGhlIG1lc3NhZ2UgcGFydHMgYnkgeG1sIHBhcnRzLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhZGRYbWxSZXByZXNlbnRhdGlvblRvUm9vdChtZXNzYWdlOiBQYXJzZWRNZXNzYWdlLCByb290RWxlbTogRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IHN0YWNrID0gW3tlbGVtZW50OiByb290RWxlbSwgdGFnTmFtZTogJ3Jvb3QnfV07XHJcbiAgICAgICAgbGV0IGlkID0gMDtcclxuICAgICAgICBtZXNzYWdlLnBhcnRzKCkuZm9yRWFjaCgocGFydCkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHBhcnQudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuVEVYVDpcclxuICAgICAgICAgICAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5lbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZUZXh0UGFydCg8UGFyc2VkTWVzc2FnZVBhcnRUZXh0PiBwYXJ0LCByb290RWxlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuUExBQ0VIT0xERVI6XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mUGxhY2Vob2xkZXJQYXJ0KDxQYXJzZWRNZXNzYWdlUGFydFBsYWNlaG9sZGVyPiBwYXJ0LCByb290RWxlbSwgaWQrKykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuSUNVX01FU1NBR0VfUkVGOlxyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLmVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KDxQYXJzZWRNZXNzYWdlUGFydElDVU1lc3NhZ2VSZWY+IHBhcnQsIHJvb3RFbGVtKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5TVEFSVF9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFnRWxlbSA9IHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlN0YXJ0VGFnUGFydCg8UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZz4gcGFydCwgcm9vdEVsZW0sIGlkKyspO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLmVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFnRWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaCh7ZWxlbWVudDogPEVsZW1lbnQ+IG5ld1RhZ0VsZW0sIHRhZ05hbWU6ICg8UGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZz4gcGFydCkudGFnTmFtZSgpfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTkRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsb3NlVGFnTmFtZSA9ICg8UGFyc2VkTWVzc2FnZVBhcnRFbmRUYWc+IHBhcnQpLnRhZ05hbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoIDw9IDEgfHwgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0udGFnTmFtZSAhPT0gY2xvc2VUYWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9vcHMsIG5vdCB3ZWxsIGZvcm1lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuZXhwZWN0ZWQgY2xvc2UgdGFnICcgKyBjbG9zZVRhZ05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLkVNUFRZX1RBRzpcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbXB0eVRhZ0VsZW0gPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbXB0eVRhZ1BhcnQoPFBhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWc+IHBhcnQsIHJvb3RFbGVtLCBpZCsrKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5lbGVtZW50LmFwcGVuZENoaWxkKGVtcHR5VGFnRWxlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgICAgIC8vIG9vcHMsIG5vdCB3ZWxsIGNsb3NlZCB0YWdzXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBjbG9zZSB0YWcgJyArIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLnRhZ05hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3Igc3RhcnQgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiBlbXB0eSBwYy1FbGVtZW50LlxyXG4gICAgICogZS5nLiA8cGMgaWQ9XCIwXCIgZXF1aXZTdGFydD1cIlNUQVJUX0JPTERfVEVYVFwiIGVxdWl2RW5kPVwiQ0xPU0VfQk9MRF9URVhUXCIgdHlwZT1cImZtdFwiIGRpc3BTdGFydD1cIiZsdDtiJmd0O1wiIGRpc3BFbmQ9XCImbHQ7L2ImZ3Q7XCI+XHJcbiAgICAgKiBUZXh0IGNvbnRlbnQgd2lsbCBiZSBhZGRlZCBsYXRlci5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICogQHBhcmFtIGlkIGlkIG51bWJlciBpbiB4bGlmZjJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZTdGFydFRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRTdGFydFRhZywgcm9vdEVsZW06IEVsZW1lbnQsIGlkOiBudW1iZXIpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCB0YWdNYXBwaW5nID0gbmV3IFRhZ01hcHBpbmcoKTtcclxuICAgICAgICBjb25zdCBwY0VsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BjJyk7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHBhcnQudGFnTmFtZSgpO1xyXG4gICAgICAgIGNvbnN0IGVxdWl2U3RhcnQgPSB0YWdNYXBwaW5nLmdldFN0YXJ0VGFnUGxhY2Vob2xkZXJOYW1lKHRhZ05hbWUsIHBhcnQuaWRDb3VudGVyKCkpO1xyXG4gICAgICAgIGNvbnN0IGVxdWl2RW5kID0gdGFnTWFwcGluZy5nZXRDbG9zZVRhZ1BsYWNlaG9sZGVyTmFtZSh0YWdOYW1lKTtcclxuICAgICAgICBjb25zdCBkaXNwU3RhcnQgPSAnPCcgKyB0YWdOYW1lICsgJz4nO1xyXG4gICAgICAgIGNvbnN0IGRpc3BFbmQgPSAnPC8nICsgdGFnTmFtZSArICc+JztcclxuICAgICAgICBwY0VsZW0uc2V0QXR0cmlidXRlKCdpZCcsIGlkLnRvU3RyaW5nKDEwKSk7XHJcbiAgICAgICAgcGNFbGVtLnNldEF0dHJpYnV0ZSgnZXF1aXZTdGFydCcsIGVxdWl2U3RhcnQpO1xyXG4gICAgICAgIHBjRWxlbS5zZXRBdHRyaWJ1dGUoJ2VxdWl2RW5kJywgZXF1aXZFbmQpO1xyXG4gICAgICAgIHBjRWxlbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0aGlzLmdldFR5cGVGb3JUYWcodGFnTmFtZSkpO1xyXG4gICAgICAgIHBjRWxlbS5zZXRBdHRyaWJ1dGUoJ2Rpc3BTdGFydCcsIGRpc3BTdGFydCk7XHJcbiAgICAgICAgcGNFbGVtLnNldEF0dHJpYnV0ZSgnZGlzcEVuZCcsIGRpc3BFbmQpO1xyXG4gICAgICAgIHJldHVybiBwY0VsZW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIGVuZCB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBOb3QgdXNlZCBoZXJlLCBiZWNhdXNlIGNvbnRlbnQgaXMgY2hpbGQgb2Ygc3RhcnQgdGFnLlxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW5kVGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydEVuZFRhZywgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICAvLyBub3QgdXNlZFxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBlbXB0eSB0YWcgaW4gdGhlIG1lc3NhZ2UuXHJcbiAgICAgKiBSZXR1cm5zIGFuIGVtcHR5IHBoLUVsZW1lbnQuXHJcbiAgICAgKiBlLmcuIDxwaCBpZD1cIjNcIiBlcXVpdj1cIlRBR19JTUdcIiB0eXBlPVwiaW1hZ2VcIiBkaXNwPVwiJmx0O2ltZy8+XCIvPlxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKiBAcGFyYW0gaWQgaWQgbnVtYmVyIGluIHhsaWZmMlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVtcHR5VGFnUGFydChwYXJ0OiBQYXJzZWRNZXNzYWdlUGFydEVtcHR5VGFnLCByb290RWxlbTogRWxlbWVudCwgaWQ6IG51bWJlcik6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHRhZ01hcHBpbmcgPSBuZXcgVGFnTWFwcGluZygpO1xyXG4gICAgICAgIGNvbnN0IHBoRWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGgnKTtcclxuICAgICAgICBjb25zdCB0YWdOYW1lID0gcGFydC50YWdOYW1lKCk7XHJcbiAgICAgICAgY29uc3QgZXF1aXYgPSB0YWdNYXBwaW5nLmdldEVtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKHRhZ05hbWUsIHBhcnQuaWRDb3VudGVyKCkpO1xyXG4gICAgICAgIGNvbnN0IGRpc3AgPSAnPCcgKyB0YWdOYW1lICsgJy8+JztcclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIGlkLnRvU3RyaW5nKDEwKSk7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnZXF1aXYnLCBlcXVpdik7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsIHRoaXMuZ2V0VHlwZUZvclRhZyh0YWdOYW1lKSk7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnZGlzcCcsIGRpc3ApO1xyXG4gICAgICAgIHJldHVybiBwaEVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRUeXBlRm9yVGFnKHRhZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRhZy50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JyJzpcclxuICAgICAgICAgICAgY2FzZSAnYic6XHJcbiAgICAgICAgICAgIGNhc2UgJ2knOlxyXG4gICAgICAgICAgICBjYXNlICd1JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZm10JztcclxuICAgICAgICAgICAgY2FzZSAnaW1nJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaW1hZ2UnO1xyXG4gICAgICAgICAgICBjYXNlICdhJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnbGluayc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ290aGVyJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIHBsYWNlaG9sZGVyIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBlLmcuIDxwaCBpZD1cIjFcIiBlcXVpdj1cIklOVEVSUE9MQVRJT05fMVwiIGRpc3A9XCJ7e3RvdGFsKCl9fVwiLz5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICogQHBhcmFtIGlkIGlkIG51bWJlciBpbiB4bGlmZjJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZQbGFjZWhvbGRlclBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRQbGFjZWhvbGRlciwgcm9vdEVsZW06IEVsZW1lbnQsIGlkOiBudW1iZXIpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgbGV0IGVxdWl2QXR0cmliID0gJ0lOVEVSUE9MQVRJT04nO1xyXG4gICAgICAgIGlmIChwYXJ0LmluZGV4KCkgPiAwKSB7XHJcbiAgICAgICAgICAgIGVxdWl2QXR0cmliID0gJ0lOVEVSUE9MQVRJT05fJyArIHBhcnQuaW5kZXgoKS50b1N0cmluZygxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQudG9TdHJpbmcoMTApKTtcclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCdlcXVpdicsIGVxdWl2QXR0cmliKTtcclxuICAgICAgICBjb25zdCBkaXNwID0gcGFydC5kaXNwKCk7XHJcbiAgICAgICAgaWYgKGRpc3ApIHtcclxuICAgICAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnZGlzcCcsIGRpc3ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBpY3UgbWVzc2FnZSByZWZzIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogQHBhcmFtIHBhcnQgcGFydFxyXG4gICAgICogQHBhcmFtIHJvb3RFbGVtIHJvb3RFbGVtXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mSUNVTWVzc2FnZVJlZlBhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmLCByb290RWxlbTogRWxlbWVudCk6IE5vZGUge1xyXG4gICAgICAgIGNvbnN0IHBoRWxlbSA9IHJvb3RFbGVtLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGgnKTtcclxuICAgICAgICBsZXQgZXF1aXZBdHRyaWIgPSAnSUNVJztcclxuICAgICAgICBpZiAocGFydC5pbmRleCgpID4gMCkge1xyXG4gICAgICAgICAgICBlcXVpdkF0dHJpYiA9ICdJQ1VfJyArIHBhcnQuaW5kZXgoKS50b1N0cmluZygxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgcGFydC5pbmRleCgpLnRvU3RyaW5nKDEwKSk7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnZXF1aXYnLCBlcXVpdkF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZGlzcCA9IHBhcnQuZGlzcCgpO1xyXG4gICAgICAgIGlmIChkaXNwKSB7XHJcbiAgICAgICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2Rpc3AnLCBkaXNwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19