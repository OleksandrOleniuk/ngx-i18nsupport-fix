/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AbstractMessageParser } from './abstract-message-parser';
import { ParsedMessagePartType } from './parsed-message-part';
import { TagMapping } from './tag-mapping';
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
var /**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
Xliff2MessageParser = /** @class */ (function (_super) {
    tslib_1.__extends(Xliff2MessageParser, _super);
    function Xliff2MessageParser() {
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
    Xliff2MessageParser.prototype.processStartElement = /**
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
            var isInterpolation = false;
            /** @type {?} */
            var isICU = false;
            /** @type {?} */
            var isEmptyTag = false;
            /** @type {?} */
            var equiv = elementNode.getAttribute('equiv');
            /** @type {?} */
            var disp = elementNode.getAttribute('disp');
            /** @type {?} */
            var indexString = null;
            /** @type {?} */
            var index = 0;
            /** @type {?} */
            var emptyTagName = null;
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
            var embeddedTagName = this.tagNameFromPCElement(elementNode);
            if (embeddedTagName) {
                message.addStartTag(embeddedTagName, this.parseIdCountFromName(elementNode.getAttribute('equivStart')));
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
    Xliff2MessageParser.prototype.processEndElement = /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    function (elementNode, message) {
        /** @type {?} */
        var tagName = elementNode.tagName;
        if (tagName === 'pc') {
            // pc example: <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt"
            // dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">IMPORTANT</pc>
            /** @type {?} */
            var embeddedTagName = this.tagNameFromPCElement(elementNode);
            if (embeddedTagName) {
                message.addEndTag(embeddedTagName);
            }
            return;
        }
    };
    /**
     * @private
     * @param {?} pcNode
     * @return {?}
     */
    Xliff2MessageParser.prototype.tagNameFromPCElement = /**
     * @private
     * @param {?} pcNode
     * @return {?}
     */
    function (pcNode) {
        /** @type {?} */
        var dispStart = pcNode.getAttribute('dispStart');
        if (dispStart.startsWith('<')) {
            dispStart = dispStart.substring(1);
        }
        if (dispStart.endsWith('>')) {
            dispStart = dispStart.substring(0, dispStart.length - 1);
        }
        return dispStart;
    };
    /**
     * reimplemented here, because XLIFF 2.0 uses a deeper xml model.
     * So we cannot simply replace the message parts by xml parts.
     * @param message message
     * @param rootElem rootElem
     */
    /**
     * reimplemented here, because XLIFF 2.0 uses a deeper xml model.
     * So we cannot simply replace the message parts by xml parts.
     * @protected
     * @param {?} message message
     * @param {?} rootElem rootElem
     * @return {?}
     */
    Xliff2MessageParser.prototype.addXmlRepresentationToRoot = /**
     * reimplemented here, because XLIFF 2.0 uses a deeper xml model.
     * So we cannot simply replace the message parts by xml parts.
     * @protected
     * @param {?} message message
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (message, rootElem) {
        var _this = this;
        /** @type {?} */
        var stack = [{ element: rootElem, tagName: 'root' }];
        /** @type {?} */
        var id = 0;
        message.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            switch (part.type) {
                case ParsedMessagePartType.TEXT:
                    stack[stack.length - 1].element.appendChild(_this.createXmlRepresentationOfTextPart((/** @type {?} */ (part)), rootElem));
                    break;
                case ParsedMessagePartType.PLACEHOLDER:
                    stack[stack.length - 1].element.appendChild(_this.createXmlRepresentationOfPlaceholderPart((/** @type {?} */ (part)), rootElem, id++));
                    break;
                case ParsedMessagePartType.ICU_MESSAGE_REF:
                    stack[stack.length - 1].element.appendChild(_this.createXmlRepresentationOfICUMessageRefPart((/** @type {?} */ (part)), rootElem));
                    break;
                case ParsedMessagePartType.START_TAG:
                    /** @type {?} */
                    var newTagElem = _this.createXmlRepresentationOfStartTagPart((/** @type {?} */ (part)), rootElem, id++);
                    stack[stack.length - 1].element.appendChild(newTagElem);
                    stack.push({ element: (/** @type {?} */ (newTagElem)), tagName: ((/** @type {?} */ (part))).tagName() });
                    break;
                case ParsedMessagePartType.END_TAG:
                    /** @type {?} */
                    var closeTagName = ((/** @type {?} */ (part))).tagName();
                    if (stack.length <= 1 || stack[stack.length - 1].tagName !== closeTagName) {
                        // oops, not well formed
                        throw new Error('unexpected close tag ' + closeTagName);
                    }
                    stack.pop();
                    break;
                case ParsedMessagePartType.EMPTY_TAG:
                    /** @type {?} */
                    var emptyTagElem = _this.createXmlRepresentationOfEmptyTagPart((/** @type {?} */ (part)), rootElem, id++);
                    stack[stack.length - 1].element.appendChild(emptyTagElem);
                    break;
            }
        }));
        if (stack.length !== 1) {
            // oops, not well closed tags
            throw new Error('missing close tag ' + stack[stack.length - 1].tagName);
        }
    };
    /**
     * the xml used for start tag in the message.
     * Returns an empty pc-Element.
     * e.g. <pc id="0" equivStart="START_BOLD_TEXT" equivEnd="CLOSE_BOLD_TEXT" type="fmt" dispStart="&lt;b&gt;" dispEnd="&lt;/b&gt;">
     * Text content will be added later.
     * @param part part
     * @param rootElem rootElem
     * @param id id number in xliff2
     */
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
    Xliff2MessageParser.prototype.createXmlRepresentationOfStartTagPart = /**
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
    function (part, rootElem, id) {
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var pcElem = rootElem.ownerDocument.createElement('pc');
        /** @type {?} */
        var tagName = part.tagName();
        /** @type {?} */
        var equivStart = tagMapping.getStartTagPlaceholderName(tagName, part.idCounter());
        /** @type {?} */
        var equivEnd = tagMapping.getCloseTagPlaceholderName(tagName);
        /** @type {?} */
        var dispStart = '<' + tagName + '>';
        /** @type {?} */
        var dispEnd = '</' + tagName + '>';
        pcElem.setAttribute('id', id.toString(10));
        pcElem.setAttribute('equivStart', equivStart);
        pcElem.setAttribute('equivEnd', equivEnd);
        pcElem.setAttribute('type', this.getTypeForTag(tagName));
        pcElem.setAttribute('dispStart', dispStart);
        pcElem.setAttribute('dispEnd', dispEnd);
        return pcElem;
    };
    /**
     * the xml used for end tag in the message.
     * Not used here, because content is child of start tag.
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for end tag in the message.
     * Not used here, because content is child of start tag.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfEndTagPart = /**
     * the xml used for end tag in the message.
     * Not used here, because content is child of start tag.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        // not used
        return null;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an empty ph-Element.
     * e.g. <ph id="3" equiv="TAG_IMG" type="image" disp="&lt;img/>"/>
     * @param part part
     * @param rootElem rootElem
     * @param id id number in xliff2
     */
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
    Xliff2MessageParser.prototype.createXmlRepresentationOfEmptyTagPart = /**
     * the xml used for empty tag in the message.
     * Returns an empty ph-Element.
     * e.g. <ph id="3" equiv="TAG_IMG" type="image" disp="&lt;img/>"/>
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?} id id number in xliff2
     * @return {?}
     */
    function (part, rootElem, id) {
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagName = part.tagName();
        /** @type {?} */
        var equiv = tagMapping.getEmptyTagPlaceholderName(tagName, part.idCounter());
        /** @type {?} */
        var disp = '<' + tagName + '/>';
        phElem.setAttribute('id', id.toString(10));
        phElem.setAttribute('equiv', equiv);
        phElem.setAttribute('type', this.getTypeForTag(tagName));
        phElem.setAttribute('disp', disp);
        return phElem;
    };
    /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    Xliff2MessageParser.prototype.getTypeForTag = /**
     * @private
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
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
    };
    /**
     * the xml used for placeholder in the message.
     * Returns e.g. <ph id="1" equiv="INTERPOLATION_1" disp="{{total()}}"/>
     * @param part part
     * @param rootElem rootElem
     * @param id id number in xliff2
     */
    /**
     * the xml used for placeholder in the message.
     * Returns e.g. <ph id="1" equiv="INTERPOLATION_1" disp="{{total()}}"/>
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?} id id number in xliff2
     * @return {?}
     */
    Xliff2MessageParser.prototype.createXmlRepresentationOfPlaceholderPart = /**
     * the xml used for placeholder in the message.
     * Returns e.g. <ph id="1" equiv="INTERPOLATION_1" disp="{{total()}}"/>
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @param {?} id id number in xliff2
     * @return {?}
     */
    function (part, rootElem, id) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var equivAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            equivAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('id', id.toString(10));
        phElem.setAttribute('equiv', equivAttrib);
        /** @type {?} */
        var disp = part.disp();
        if (disp) {
            phElem.setAttribute('disp', disp);
        }
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
    Xliff2MessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = /**
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
        var equivAttrib = 'ICU';
        if (part.index() > 0) {
            equivAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('id', part.index().toString(10));
        phElem.setAttribute('equiv', equivAttrib);
        /** @type {?} */
        var disp = part.disp();
        if (disp) {
            phElem.setAttribute('disp', disp);
        }
        return phElem;
    };
    return Xliff2MessageParser;
}(AbstractMessageParser));
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
export { Xliff2MessageParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYyLW1lc3NhZ2UtcGFyc2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliLyIsInNvdXJjZXMiOlsiaW1wbC94bGlmZjItbWVzc2FnZS1wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQU1oRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7OztBQU96Qzs7Ozs7SUFBeUMsK0NBQXFCO0lBQTlEOztJQStRQSxDQUFDO0lBN1FHOzs7Ozs7T0FNRzs7Ozs7Ozs7O0lBQ08saURBQW1COzs7Ozs7OztJQUE3QixVQUE4QixXQUFvQixFQUFFLE9BQXNCOztZQUNoRSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU87UUFDbkMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFOzs7Ozs7Ozs7Ozs7O2dCQVlkLGVBQWUsR0FBRyxLQUFLOztnQkFDdkIsS0FBSyxHQUFHLEtBQUs7O2dCQUNiLFVBQVUsR0FBRyxLQUFLOztnQkFDaEIsS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDOztnQkFDekMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDOztnQkFDekMsV0FBVyxHQUFHLElBQUk7O2dCQUNsQixLQUFLLEdBQUcsQ0FBQzs7Z0JBQ1QsWUFBWSxHQUFHLElBQUk7WUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixvQ0FBb0M7Z0JBQ3BDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdDLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENB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Qzs7WUFDckQsV0FBVyxHQUFHLEtBQUs7UUFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLFdBQVcsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQzs7WUFDcEMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDeEIsSUFBSSxJQUFJLEVBQUU7WUFDTixNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTCwwQkFBQztBQUFELENBQUMsQUEvUUQsQ0FBeUMscUJBQXFCLEdBK1E3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWJzdHJhY3RNZXNzYWdlUGFyc2VyfSBmcm9tICcuL2Fic3RyYWN0LW1lc3NhZ2UtcGFyc2VyJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydFN0YXJ0VGFnfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtc3RhcnQtdGFnJztcclxuaW1wb3J0IHtQYXJzZWRNZXNzYWdlUGFydEVuZFRhZ30gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWVuZC10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXJ9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1wbGFjZWhvbGRlcic7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRUZXh0fSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQtdGV4dCc7XHJcbmltcG9ydCB7UGFyc2VkTWVzc2FnZVBhcnRUeXBlfSBmcm9tICcuL3BhcnNlZC1tZXNzYWdlLXBhcnQnO1xyXG5pbXBvcnQge1RhZ01hcHBpbmd9IGZyb20gJy4vdGFnLW1hcHBpbmcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0RW1wdHlUYWd9IGZyb20gJy4vcGFyc2VkLW1lc3NhZ2UtcGFydC1lbXB0eS10YWcnO1xyXG5pbXBvcnQge1BhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZn0gZnJvbSAnLi9wYXJzZWQtbWVzc2FnZS1wYXJ0LWljdS1tZXNzYWdlLXJlZic7XHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHJvb2JtIG9uIDEwLjA1LjIwMTcuXHJcbiAqIEEgbWVzc2FnZSBwYXJzZXIgZm9yIFhMSUZGIDIuMFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFhsaWZmMk1lc3NhZ2VQYXJzZXIgZXh0ZW5kcyBBYnN0cmFjdE1lc3NhZ2VQYXJzZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIHRoaXMgZWxlbWVudCBub2RlLlxyXG4gICAgICogVGhpcyBpcyBjYWxsZWQgYmVmb3JlIHRoZSBjaGlsZHJlbiBhcmUgZG9uZS5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50Tm9kZSBlbGVtZW50Tm9kZVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgbWVzc2FnZSB0byBiZSBhbHRlcmVkXHJcbiAgICAgKiBAcmV0dXJuIHRydWUsIGlmIGNoaWxkcmVuIHNob3VsZCBiZSBwcm9jZXNzZWQgdG9vLCBmYWxzZSBvdGhlcndpc2UgKGNoaWxkcmVuIGlnbm9yZWQgdGhlbilcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NTdGFydEVsZW1lbnQoZWxlbWVudE5vZGU6IEVsZW1lbnQsIG1lc3NhZ2U6IFBhcnNlZE1lc3NhZ2UpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0YWdOYW1lID0gZWxlbWVudE5vZGUudGFnTmFtZTtcclxuICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ3BoJykge1xyXG4gICAgICAgICAgICAvLyBwbGFjZWhvbGRlciBhcmUgbGlrZSA8cGggaWQ9XCIwXCIgZXF1aXY9XCJJTlRFUlBPTEFUSU9OXCIgZGlzcD1cInt7bnVtYmVyKCl9fVwiLz5cclxuICAgICAgICAgICAgLy8gVGhleSBjb250YWluIHRoZSBpZCBhbmQgYWxzbyBhIG5hbWUgKG51bWJlciBpbiB0aGUgZXhhbXBsZSlcclxuICAgICAgICAgICAgLy8gVE9ETyBtYWtlIHNvbWUgdXNlIG9mIHRoZSBuYW1lIChidXQgaXQgaXMgbm90IGF2YWlsYWJsZSBpbiBYTElGRiAxLjIpXHJcbiAgICAgICAgICAgIC8vIElDVSBtZXNzYWdlIGFyZSBoYW5kbGVkIHdpdGggdGhlIHNhbWUgdGFnXHJcbiAgICAgICAgICAgIC8vIEJlZm9yZSA0LjMuMiB0aGV5IGRpZCBub3QgaGF2ZSBhbiBlcXVpdiBhbmQgZGlzcCAoQnVnICMxNzM0NCk6XHJcbiAgICAgICAgICAgIC8vIGUuZy4gPHBoIGlkPVwiMFwiLz5cclxuICAgICAgICAgICAgLy8gQmVnaW5uaW5nIHdpdGggNC4zLjIgdGhleSBkbyBoYXZlIGFuIGVxdWl2IElDVSBhbmQgZGlzcDpcclxuICAgICAgICAgICAgLy8gZS5nLiA8cGggaWQ9XCIwXCIgZXF1aXY9XCJJQ1VcIiBkaXNwPVwie2NvdW50LCBwbHVyYWwsID0wIHsuLi59ID0xIHsuLi59IG90aGVyIHsuLi59fVwiLz5cclxuICAgICAgICAgICAgLy8gYW5kIGVtcHR5IHRhZ3MgaGF2ZSBlcXVpdiBvdGhlciB0aGVuIElOVEVSUE9MQVRJT046XHJcbiAgICAgICAgICAgIC8vIGUuZy4gPHBoIGlkPVwiM1wiIGVxdWl2PVwiVEFHX0lNR1wiIHR5cGU9XCJpbWFnZVwiIGRpc3A9XCImbHQ7aW1nLz5cIi8+XHJcbiAgICAgICAgICAgIC8vIG9yIDxwaCBlcXVpdj1cIkxJTkVfQlJFQUtcIiB0eXBlPVwibGJcIiBkaXNwPVwiJmx0O2JyLz5cIi8+XHJcbiAgICAgICAgICAgIGxldCBpc0ludGVycG9sYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGlzSUNVID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpc0VtcHR5VGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGVxdWl2ID0gZWxlbWVudE5vZGUuZ2V0QXR0cmlidXRlKCdlcXVpdicpO1xyXG4gICAgICAgICAgICBjb25zdCBkaXNwID0gZWxlbWVudE5vZGUuZ2V0QXR0cmlidXRlKCdkaXNwJyk7XHJcbiAgICAgICAgICAgIGxldCBpbmRleFN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGxldCBlbXB0eVRhZ05hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWVxdWl2KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvbGQgSUNVIHN5bnRheCwgZml4ZWQgd2l0aCAjMTczNDRcclxuICAgICAgICAgICAgICAgIGlzSUNVID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGluZGV4U3RyaW5nID0gZWxlbWVudE5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXhTdHJpbmcsIDEwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlcXVpdi5zdGFydHNXaXRoKCdJQ1UnKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbmV3IElDVSBzeW50YXgsIGZpeGVkIHdpdGggIzE3MzQ0XHJcbiAgICAgICAgICAgICAgICBpc0lDVSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXF1aXYgPT09ICdJQ1UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhTdHJpbmcgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4U3RyaW5nID0gZXF1aXYuc3Vic3RyaW5nKCdJQ1VfJy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBOdW1iZXIucGFyc2VJbnQoaW5kZXhTdHJpbmcsIDEwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlcXVpdi5zdGFydHNXaXRoKCdJTlRFUlBPTEFUSU9OJykpIHtcclxuICAgICAgICAgICAgICAgIGlzSW50ZXJwb2xhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXF1aXYgPT09ICdJTlRFUlBPTEFUSU9OJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4U3RyaW5nID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleFN0cmluZyA9IGVxdWl2LnN1YnN0cmluZygnSU5URVJQT0xBVElPTl8nLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IE51bWJlci5wYXJzZUludChpbmRleFN0cmluZywgMTApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ldyBUYWdNYXBwaW5nKCkuaXNFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZShlcXVpdikpIHtcclxuICAgICAgICAgICAgICAgIGlzRW1wdHlUYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZW1wdHlUYWdOYW1lID0gbmV3IFRhZ01hcHBpbmcoKS5nZXRUYWduYW1lRnJvbUVtcHR5VGFnUGxhY2Vob2xkZXJOYW1lKGVxdWl2KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc0ludGVycG9sYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkUGxhY2Vob2xkZXIoaW5kZXgsIGRpc3ApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzSUNVKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZElDVU1lc3NhZ2VSZWYoaW5kZXgsIGRpc3ApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRW1wdHlUYWcpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuYWRkRW1wdHlUYWcoZW1wdHlUYWdOYW1lLCB0aGlzLnBhcnNlSWRDb3VudEZyb21OYW1lKGVxdWl2KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdwYycpIHtcclxuICAgICAgICAgICAgLy8gcGMgZXhhbXBsZTogPHBjIGlkPVwiMFwiIGVxdWl2U3RhcnQ9XCJTVEFSVF9CT0xEX1RFWFRcIiBlcXVpdkVuZD1cIkNMT1NFX0JPTERfVEVYVFwiIHR5cGU9XCJmbXRcIlxyXG4gICAgICAgICAgICAvLyBkaXNwU3RhcnQ9XCImbHQ7YiZndDtcIiBkaXNwRW5kPVwiJmx0Oy9iJmd0O1wiPklNUE9SVEFOVDwvcGM+XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYmVkZGVkVGFnTmFtZSA9IHRoaXMudGFnTmFtZUZyb21QQ0VsZW1lbnQoZWxlbWVudE5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoZW1iZWRkZWRUYWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZFN0YXJ0VGFnKGVtYmVkZGVkVGFnTmFtZSwgdGhpcy5wYXJzZUlkQ291bnRGcm9tTmFtZShlbGVtZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2VxdWl2U3RhcnQnKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGVuZCBvZiB0aGlzIGVsZW1lbnQgbm9kZS5cclxuICAgICAqIFRoaXMgaXMgY2FsbGVkIGFmdGVyIGFsbCBjaGlsZHJlbiBhcmUgcHJvY2Vzc2VkLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnROb2RlIGVsZW1lbnROb2RlXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBtZXNzYWdlIHRvIGJlIGFsdGVyZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2Nlc3NFbmRFbGVtZW50KGVsZW1lbnROb2RlOiBFbGVtZW50LCBtZXNzYWdlOiBQYXJzZWRNZXNzYWdlKSB7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnROb2RlLnRhZ05hbWU7XHJcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdwYycpIHtcclxuICAgICAgICAgICAgLy8gcGMgZXhhbXBsZTogPHBjIGlkPVwiMFwiIGVxdWl2U3RhcnQ9XCJTVEFSVF9CT0xEX1RFWFRcIiBlcXVpdkVuZD1cIkNMT1NFX0JPTERfVEVYVFwiIHR5cGU9XCJmbXRcIlxyXG4gICAgICAgICAgICAvLyBkaXNwU3RhcnQ9XCImbHQ7YiZndDtcIiBkaXNwRW5kPVwiJmx0Oy9iJmd0O1wiPklNUE9SVEFOVDwvcGM+XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYmVkZGVkVGFnTmFtZSA9IHRoaXMudGFnTmFtZUZyb21QQ0VsZW1lbnQoZWxlbWVudE5vZGUpO1xyXG4gICAgICAgICAgICBpZiAoZW1iZWRkZWRUYWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmFkZEVuZFRhZyhlbWJlZGRlZFRhZ05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0YWdOYW1lRnJvbVBDRWxlbWVudChwY05vZGU6IEVsZW1lbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBkaXNwU3RhcnQgPSBwY05vZGUuZ2V0QXR0cmlidXRlKCdkaXNwU3RhcnQnKTtcclxuICAgICAgICBpZiAoZGlzcFN0YXJ0LnN0YXJ0c1dpdGgoJzwnKSkge1xyXG4gICAgICAgICAgICBkaXNwU3RhcnQgPSBkaXNwU3RhcnQuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlzcFN0YXJ0LmVuZHNXaXRoKCc+JykpIHtcclxuICAgICAgICAgICAgZGlzcFN0YXJ0ID0gZGlzcFN0YXJ0LnN1YnN0cmluZygwLCBkaXNwU3RhcnQubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaXNwU3RhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZWltcGxlbWVudGVkIGhlcmUsIGJlY2F1c2UgWExJRkYgMi4wIHVzZXMgYSBkZWVwZXIgeG1sIG1vZGVsLlxyXG4gICAgICogU28gd2UgY2Fubm90IHNpbXBseSByZXBsYWNlIHRoZSBtZXNzYWdlIHBhcnRzIGJ5IHhtbCBwYXJ0cy5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkWG1sUmVwcmVzZW50YXRpb25Ub1Jvb3QobWVzc2FnZTogUGFyc2VkTWVzc2FnZSwgcm9vdEVsZW06IEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBzdGFjayA9IFt7ZWxlbWVudDogcm9vdEVsZW0sIHRhZ05hbWU6ICdyb290J31dO1xyXG4gICAgICAgIGxldCBpZCA9IDA7XHJcbiAgICAgICAgbWVzc2FnZS5wYXJ0cygpLmZvckVhY2goKHBhcnQpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChwYXJ0LnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlRFWFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uZWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mVGV4dFBhcnQoPFBhcnNlZE1lc3NhZ2VQYXJ0VGV4dD4gcGFydCwgcm9vdEVsZW0pKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLlBMQUNFSE9MREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLmVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZlBsYWNlaG9sZGVyUGFydCg8UGFyc2VkTWVzc2FnZVBhcnRQbGFjZWhvbGRlcj4gcGFydCwgcm9vdEVsZW0sIGlkKyspKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgUGFyc2VkTWVzc2FnZVBhcnRUeXBlLklDVV9NRVNTQUdFX1JFRjpcclxuICAgICAgICAgICAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5lbGVtZW50LmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZJQ1VNZXNzYWdlUmVmUGFydCg8UGFyc2VkTWVzc2FnZVBhcnRJQ1VNZXNzYWdlUmVmPiBwYXJ0LCByb290RWxlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuU1RBUlRfVEFHOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RhZ0VsZW0gPSB0aGlzLmNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZTdGFydFRhZ1BhcnQoPFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWc+IHBhcnQsIHJvb3RFbGVtLCBpZCsrKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5lbGVtZW50LmFwcGVuZENoaWxkKG5ld1RhZ0VsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goe2VsZW1lbnQ6IDxFbGVtZW50PiBuZXdUYWdFbGVtLCB0YWdOYW1lOiAoPFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWc+IHBhcnQpLnRhZ05hbWUoKX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBQYXJzZWRNZXNzYWdlUGFydFR5cGUuRU5EX1RBRzpcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbG9zZVRhZ05hbWUgPSAoPFBhcnNlZE1lc3NhZ2VQYXJ0RW5kVGFnPiBwYXJ0KS50YWdOYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA8PSAxIHx8IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLnRhZ05hbWUgIT09IGNsb3NlVGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvb3BzLCBub3Qgd2VsbCBmb3JtZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIGNsb3NlIHRhZyAnICsgY2xvc2VUYWdOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFBhcnNlZE1lc3NhZ2VQYXJ0VHlwZS5FTVBUWV9UQUc6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1wdHlUYWdFbGVtID0gdGhpcy5jcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mRW1wdHlUYWdQYXJ0KDxQYXJzZWRNZXNzYWdlUGFydEVtcHR5VGFnPiBwYXJ0LCByb290RWxlbSwgaWQrKyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uZWxlbWVudC5hcHBlbmRDaGlsZChlbXB0eVRhZ0VsZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICAvLyBvb3BzLCBub3Qgd2VsbCBjbG9zZWQgdGFnc1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ21pc3NpbmcgY2xvc2UgdGFnICcgKyBzdGFja1tzdGFjay5sZW5ndGggLSAxXS50YWdOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgeG1sIHVzZWQgZm9yIHN0YXJ0IHRhZyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIFJldHVybnMgYW4gZW1wdHkgcGMtRWxlbWVudC5cclxuICAgICAqIGUuZy4gPHBjIGlkPVwiMFwiIGVxdWl2U3RhcnQ9XCJTVEFSVF9CT0xEX1RFWFRcIiBlcXVpdkVuZD1cIkNMT1NFX0JPTERfVEVYVFwiIHR5cGU9XCJmbXRcIiBkaXNwU3RhcnQ9XCImbHQ7YiZndDtcIiBkaXNwRW5kPVwiJmx0Oy9iJmd0O1wiPlxyXG4gICAgICogVGV4dCBjb250ZW50IHdpbGwgYmUgYWRkZWQgbGF0ZXIuXHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqIEBwYXJhbSBpZCBpZCBudW1iZXIgaW4geGxpZmYyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mU3RhcnRUYWdQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0U3RhcnRUYWcsIHJvb3RFbGVtOiBFbGVtZW50LCBpZDogbnVtYmVyKTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgdGFnTWFwcGluZyA9IG5ldyBUYWdNYXBwaW5nKCk7XHJcbiAgICAgICAgY29uc3QgcGNFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYycpO1xyXG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSBwYXJ0LnRhZ05hbWUoKTtcclxuICAgICAgICBjb25zdCBlcXVpdlN0YXJ0ID0gdGFnTWFwcGluZy5nZXRTdGFydFRhZ1BsYWNlaG9sZGVyTmFtZSh0YWdOYW1lLCBwYXJ0LmlkQ291bnRlcigpKTtcclxuICAgICAgICBjb25zdCBlcXVpdkVuZCA9IHRhZ01hcHBpbmcuZ2V0Q2xvc2VUYWdQbGFjZWhvbGRlck5hbWUodGFnTmFtZSk7XHJcbiAgICAgICAgY29uc3QgZGlzcFN0YXJ0ID0gJzwnICsgdGFnTmFtZSArICc+JztcclxuICAgICAgICBjb25zdCBkaXNwRW5kID0gJzwvJyArIHRhZ05hbWUgKyAnPic7XHJcbiAgICAgICAgcGNFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpZC50b1N0cmluZygxMCkpO1xyXG4gICAgICAgIHBjRWxlbS5zZXRBdHRyaWJ1dGUoJ2VxdWl2U3RhcnQnLCBlcXVpdlN0YXJ0KTtcclxuICAgICAgICBwY0VsZW0uc2V0QXR0cmlidXRlKCdlcXVpdkVuZCcsIGVxdWl2RW5kKTtcclxuICAgICAgICBwY0VsZW0uc2V0QXR0cmlidXRlKCd0eXBlJywgdGhpcy5nZXRUeXBlRm9yVGFnKHRhZ05hbWUpKTtcclxuICAgICAgICBwY0VsZW0uc2V0QXR0cmlidXRlKCdkaXNwU3RhcnQnLCBkaXNwU3RhcnQpO1xyXG4gICAgICAgIHBjRWxlbS5zZXRBdHRyaWJ1dGUoJ2Rpc3BFbmQnLCBkaXNwRW5kKTtcclxuICAgICAgICByZXR1cm4gcGNFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBlbmQgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogTm90IHVzZWQgaGVyZSwgYmVjYXVzZSBjb250ZW50IGlzIGNoaWxkIG9mIHN0YXJ0IHRhZy5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZkVuZFRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRFbmRUYWcsIHJvb3RFbGVtOiBFbGVtZW50KTogTm9kZSB7XHJcbiAgICAgICAgLy8gbm90IHVzZWRcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgZW1wdHkgdGFnIGluIHRoZSBtZXNzYWdlLlxyXG4gICAgICogUmV0dXJucyBhbiBlbXB0eSBwaC1FbGVtZW50LlxyXG4gICAgICogZS5nLiA8cGggaWQ9XCIzXCIgZXF1aXY9XCJUQUdfSU1HXCIgdHlwZT1cImltYWdlXCIgZGlzcD1cIiZsdDtpbWcvPlwiLz5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICogQHBhcmFtIGlkIGlkIG51bWJlciBpbiB4bGlmZjJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVhtbFJlcHJlc2VudGF0aW9uT2ZFbXB0eVRhZ1BhcnQocGFydDogUGFyc2VkTWVzc2FnZVBhcnRFbXB0eVRhZywgcm9vdEVsZW06IEVsZW1lbnQsIGlkOiBudW1iZXIpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCB0YWdNYXBwaW5nID0gbmV3IFRhZ01hcHBpbmcoKTtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHBhcnQudGFnTmFtZSgpO1xyXG4gICAgICAgIGNvbnN0IGVxdWl2ID0gdGFnTWFwcGluZy5nZXRFbXB0eVRhZ1BsYWNlaG9sZGVyTmFtZSh0YWdOYW1lLCBwYXJ0LmlkQ291bnRlcigpKTtcclxuICAgICAgICBjb25zdCBkaXNwID0gJzwnICsgdGFnTmFtZSArICcvPic7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnaWQnLCBpZC50b1N0cmluZygxMCkpO1xyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2VxdWl2JywgZXF1aXYpO1xyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB0aGlzLmdldFR5cGVGb3JUYWcodGFnTmFtZSkpO1xyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2Rpc3AnLCBkaXNwKTtcclxuICAgICAgICByZXR1cm4gcGhFbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VHlwZUZvclRhZyh0YWc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0YWcudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBjYXNlICdicic6XHJcbiAgICAgICAgICAgIGNhc2UgJ2InOlxyXG4gICAgICAgICAgICBjYXNlICdpJzpcclxuICAgICAgICAgICAgY2FzZSAndSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ZtdCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ltZyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlJztcclxuICAgICAgICAgICAgY2FzZSAnYSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2xpbmsnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdvdGhlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGhlIHhtbCB1c2VkIGZvciBwbGFjZWhvbGRlciBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIFJldHVybnMgZS5nLiA8cGggaWQ9XCIxXCIgZXF1aXY9XCJJTlRFUlBPTEFUSU9OXzFcIiBkaXNwPVwie3t0b3RhbCgpfX1cIi8+XHJcbiAgICAgKiBAcGFyYW0gcGFydCBwYXJ0XHJcbiAgICAgKiBAcGFyYW0gcm9vdEVsZW0gcm9vdEVsZW1cclxuICAgICAqIEBwYXJhbSBpZCBpZCBudW1iZXIgaW4geGxpZmYyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjcmVhdGVYbWxSZXByZXNlbnRhdGlvbk9mUGxhY2Vob2xkZXJQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0UGxhY2Vob2xkZXIsIHJvb3RFbGVtOiBFbGVtZW50LCBpZDogbnVtYmVyKTogTm9kZSB7XHJcbiAgICAgICAgY29uc3QgcGhFbGVtID0gcm9vdEVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwaCcpO1xyXG4gICAgICAgIGxldCBlcXVpdkF0dHJpYiA9ICdJTlRFUlBPTEFUSU9OJztcclxuICAgICAgICBpZiAocGFydC5pbmRleCgpID4gMCkge1xyXG4gICAgICAgICAgICBlcXVpdkF0dHJpYiA9ICdJTlRFUlBPTEFUSU9OXycgKyBwYXJ0LmluZGV4KCkudG9TdHJpbmcoMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIGlkLnRvU3RyaW5nKDEwKSk7XHJcbiAgICAgICAgcGhFbGVtLnNldEF0dHJpYnV0ZSgnZXF1aXYnLCBlcXVpdkF0dHJpYik7XHJcbiAgICAgICAgY29uc3QgZGlzcCA9IHBhcnQuZGlzcCgpO1xyXG4gICAgICAgIGlmIChkaXNwKSB7XHJcbiAgICAgICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2Rpc3AnLCBkaXNwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBoRWxlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRoZSB4bWwgdXNlZCBmb3IgaWN1IG1lc3NhZ2UgcmVmcyBpbiB0aGUgbWVzc2FnZS5cclxuICAgICAqIEBwYXJhbSBwYXJ0IHBhcnRcclxuICAgICAqIEBwYXJhbSByb290RWxlbSByb290RWxlbVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlWG1sUmVwcmVzZW50YXRpb25PZklDVU1lc3NhZ2VSZWZQYXJ0KHBhcnQ6IFBhcnNlZE1lc3NhZ2VQYXJ0SUNVTWVzc2FnZVJlZiwgcm9vdEVsZW06IEVsZW1lbnQpOiBOb2RlIHtcclxuICAgICAgICBjb25zdCBwaEVsZW0gPSByb290RWxlbS5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BoJyk7XHJcbiAgICAgICAgbGV0IGVxdWl2QXR0cmliID0gJ0lDVSc7XHJcbiAgICAgICAgaWYgKHBhcnQuaW5kZXgoKSA+IDApIHtcclxuICAgICAgICAgICAgZXF1aXZBdHRyaWIgPSAnSUNVXycgKyBwYXJ0LmluZGV4KCkudG9TdHJpbmcoMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCdpZCcsIHBhcnQuaW5kZXgoKS50b1N0cmluZygxMCkpO1xyXG4gICAgICAgIHBoRWxlbS5zZXRBdHRyaWJ1dGUoJ2VxdWl2JywgZXF1aXZBdHRyaWIpO1xyXG4gICAgICAgIGNvbnN0IGRpc3AgPSBwYXJ0LmRpc3AoKTtcclxuICAgICAgICBpZiAoZGlzcCkge1xyXG4gICAgICAgICAgICBwaEVsZW0uc2V0QXR0cmlidXRlKCdkaXNwJywgZGlzcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaEVsZW07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==