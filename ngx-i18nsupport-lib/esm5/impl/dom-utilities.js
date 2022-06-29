/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOMParser, XMLSerializer } from 'xmldom';
/**
 * Created by martin on 01.05.2017.
 * Some Tool functions for XML Handling.
 */
var /**
 * Created by martin on 01.05.2017.
 * Some Tool functions for XML Handling.
 */
DOMUtilities = /** @class */ (function () {
    function DOMUtilities() {
    }
    /**
     * return the first subelement with the given tag.
     * @param element element
     * @param tagName tagName
     * @return subelement or null, if not existing.
     */
    /**
     * return the first subelement with the given tag.
     * @param {?} element element
     * @param {?} tagName tagName
     * @return {?} subelement or null, if not existing.
     */
    DOMUtilities.getFirstElementByTagName = /**
     * return the first subelement with the given tag.
     * @param {?} element element
     * @param {?} tagName tagName
     * @return {?} subelement or null, if not existing.
     */
    function (element, tagName) {
        /** @type {?} */
        var matchingElements = element.getElementsByTagName(tagName);
        if (matchingElements && matchingElements.length > 0) {
            return matchingElements.item(0);
        }
        else {
            return null;
        }
    };
    /**
     * return an element with the given tag and id attribute.
     * @param element element
     * @param tagName tagName
     * @param id id
     * @return subelement or null, if not existing.
     */
    /**
     * return an element with the given tag and id attribute.
     * @param {?} element element
     * @param {?} tagName tagName
     * @param {?} id id
     * @return {?} subelement or null, if not existing.
     */
    DOMUtilities.getElementByTagNameAndId = /**
     * return an element with the given tag and id attribute.
     * @param {?} element element
     * @param {?} tagName tagName
     * @param {?} id id
     * @return {?} subelement or null, if not existing.
     */
    function (element, tagName, id) {
        /** @type {?} */
        var matchingElements = element.getElementsByTagName(tagName);
        if (matchingElements && matchingElements.length > 0) {
            for (var i = 0; i < matchingElements.length; i++) {
                /** @type {?} */
                var node = matchingElements.item(i);
                if (node.getAttribute('id') === id) {
                    return node;
                }
            }
        }
        return null;
    };
    /**
     * Get next sibling, that is an element.
     * @param element element
     */
    /**
     * Get next sibling, that is an element.
     * @param {?} element element
     * @return {?}
     */
    DOMUtilities.getElementFollowingSibling = /**
     * Get next sibling, that is an element.
     * @param {?} element element
     * @return {?}
     */
    function (element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        var e = element.nextSibling;
        while (e) {
            if (e.nodeType === e.ELEMENT_NODE) {
                return (/** @type {?} */ (e));
            }
            e = e.nextSibling;
        }
        return null;
    };
    /**
     * Get previous sibling, that is an element.
     * @param element element
     */
    /**
     * Get previous sibling, that is an element.
     * @param {?} element element
     * @return {?}
     */
    DOMUtilities.getElementPrecedingSibling = /**
     * Get previous sibling, that is an element.
     * @param {?} element element
     * @return {?}
     */
    function (element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        var e = element.previousSibling;
        while (e) {
            if (e.nodeType === e.ELEMENT_NODE) {
                return (/** @type {?} */ (e));
            }
            e = e.previousSibling;
        }
        return null;
    };
    /**
     * return content of element as string, including all markup.
     * @param element element
     * @return content of element as string, including all markup.
     */
    /**
     * return content of element as string, including all markup.
     * @param {?} element element
     * @return {?} content of element as string, including all markup.
     */
    DOMUtilities.getXMLContent = /**
     * return content of element as string, including all markup.
     * @param {?} element element
     * @return {?} content of element as string, including all markup.
     */
    function (element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        var result = new XMLSerializer().serializeToString(element);
        /** @type {?} */
        var tagName = element.nodeName;
        /** @type {?} */
        var reStartMsg = new RegExp('<' + tagName + '[^>]*>', 'g');
        result = result.replace(reStartMsg, '');
        /** @type {?} */
        var reEndMsg = new RegExp('</' + tagName + '>', 'g');
        result = result.replace(reEndMsg, '');
        return result;
    };
    /**
     * return PCDATA content of element.
     * @param element element
     * @return PCDATA content of element.
     */
    /**
     * return PCDATA content of element.
     * @param {?} element element
     * @return {?} PCDATA content of element.
     */
    DOMUtilities.getPCDATA = /**
     * return PCDATA content of element.
     * @param {?} element element
     * @return {?} PCDATA content of element.
     */
    function (element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        var result = '';
        /** @type {?} */
        var childNodes = element.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            /** @type {?} */
            var child = childNodes.item(i);
            if (child.nodeType === child.TEXT_NODE || child.nodeType === child.CDATA_SECTION_NODE) {
                result = result + child.nodeValue;
            }
        }
        return result.length === 0 ? null : result;
    };
    /**
     * replace PCDATA content with a new one.
     * @param element element
     * @param pcdata pcdata
     */
    /**
     * replace PCDATA content with a new one.
     * @param {?} element element
     * @param {?} pcdata pcdata
     * @return {?}
     */
    DOMUtilities.replaceContentWithXMLContent = /**
     * replace PCDATA content with a new one.
     * @param {?} element element
     * @param {?} pcdata pcdata
     * @return {?}
     */
    function (element, pcdata) {
        // remove all children
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        // parseICUMessage pcdata
        /** @type {?} */
        var pcdataFragment = new DOMParser().parseFromString('<fragment>' + pcdata + '</fragment>', 'application/xml');
        /** @type {?} */
        var newChildren = pcdataFragment.getElementsByTagName('fragment').item(0).childNodes;
        for (var j = 0; j < newChildren.length; j++) {
            /** @type {?} */
            var newChild = newChildren.item(j);
            element.appendChild(element.ownerDocument.importNode(newChild, true));
        }
    };
    /**
     * find the previous sibling that is an element.
     * @param element element
     * @return the previous sibling that is an element or null.
     */
    /**
     * find the previous sibling that is an element.
     * @param {?} element element
     * @return {?} the previous sibling that is an element or null.
     */
    DOMUtilities.getPreviousElementSibling = /**
     * find the previous sibling that is an element.
     * @param {?} element element
     * @return {?} the previous sibling that is an element or null.
     */
    function (element) {
        /** @type {?} */
        var node = element.previousSibling;
        while (node !== null) {
            if (node.nodeType === node.ELEMENT_NODE) {
                return (/** @type {?} */ (node));
            }
            node = node.previousSibling;
        }
        return null;
    };
    /**
     * Create an Element Node that is the next sibling of a given node.
     * @param elementNameToCreate elementNameToCreate
     * @param previousSibling previousSibling
     * @return new element
     */
    /**
     * Create an Element Node that is the next sibling of a given node.
     * @param {?} elementNameToCreate elementNameToCreate
     * @param {?} previousSibling previousSibling
     * @return {?} new element
     */
    DOMUtilities.createFollowingSibling = /**
     * Create an Element Node that is the next sibling of a given node.
     * @param {?} elementNameToCreate elementNameToCreate
     * @param {?} previousSibling previousSibling
     * @return {?} new element
     */
    function (elementNameToCreate, previousSibling) {
        /** @type {?} */
        var newElement = previousSibling.ownerDocument.createElement(elementNameToCreate);
        return (/** @type {?} */ (DOMUtilities.insertAfter(newElement, previousSibling)));
    };
    /**
     * Insert newElement directly after previousSibling.
     * @param newElement newElement
     * @param previousSibling previousSibling
     */
    /**
     * Insert newElement directly after previousSibling.
     * @param {?} newElement newElement
     * @param {?} previousSibling previousSibling
     * @return {?}
     */
    DOMUtilities.insertAfter = /**
     * Insert newElement directly after previousSibling.
     * @param {?} newElement newElement
     * @param {?} previousSibling previousSibling
     * @return {?}
     */
    function (newElement, previousSibling) {
        if (previousSibling.nextSibling !== null) {
            previousSibling.parentNode.insertBefore(newElement, previousSibling.nextSibling);
        }
        else {
            previousSibling.parentNode.appendChild(newElement);
        }
        return newElement;
    };
    /**
     * Insert newElement directly before nextSibling.
     * @param newElement newElement
     * @param nextSibling nextSibling
     */
    /**
     * Insert newElement directly before nextSibling.
     * @param {?} newElement newElement
     * @param {?} nextSibling nextSibling
     * @return {?}
     */
    DOMUtilities.insertBefore = /**
     * Insert newElement directly before nextSibling.
     * @param {?} newElement newElement
     * @param {?} nextSibling nextSibling
     * @return {?}
     */
    function (newElement, nextSibling) {
        nextSibling.parentNode.insertBefore(newElement, nextSibling);
        return newElement;
    };
    return DOMUtilities;
}());
/**
 * Created by martin on 01.05.2017.
 * Some Tool functions for XML Handling.
 */
export { DOMUtilities };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXV0aWxpdGllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvZG9tLXV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBTWhEOzs7OztJQUFBO0lBb0xBLENBQUM7SUFsTEc7Ozs7O09BS0c7Ozs7Ozs7SUFDVyxxQ0FBd0I7Ozs7OztJQUF0QyxVQUF1QyxPQUEyQixFQUFFLE9BQWU7O1lBQ3pFLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7UUFDOUQsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7SUFDVyxxQ0FBd0I7Ozs7Ozs7SUFBdEMsVUFBdUMsT0FBMkIsRUFBRSxPQUFlLEVBQUUsRUFBVTs7WUFDckYsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUM5RCxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7b0JBQ3hDLElBQUksR0FBWSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNoQyxPQUFPLElBQUksQ0FB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QyxVQUFVLEVBQUUsZUFBZSxDQUFDLEVBQUEsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNXLHdCQUFXOzs7Ozs7SUFBekIsVUFBMEIsVUFBZ0IsRUFBRSxlQUFxQjtRQUM3RCxJQUFJLGVBQWUsQ0FBQyxXQUFXLEtBQUssSUFBSSxFQUFFO1lBQ3RDLGVBQWUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEY7YUFBTTtZQUNILGVBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDVyx5QkFBWTs7Ozs7O0lBQTFCLFVBQTJCLFVBQWdCLEVBQUUsV0FBaUI7UUFDMUQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzdELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFwTEQsSUFvTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPTVBhcnNlciwgWE1MU2VyaWFsaXplcn0gZnJvbSAneG1sZG9tJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDAxLjA1LjIwMTcuXHJcbiAqIFNvbWUgVG9vbCBmdW5jdGlvbnMgZm9yIFhNTCBIYW5kbGluZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRE9NVXRpbGl0aWVzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgZmlyc3Qgc3ViZWxlbWVudCB3aXRoIHRoZSBnaXZlbiB0YWcuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gdGFnTmFtZSB0YWdOYW1lXHJcbiAgICAgKiBAcmV0dXJuIHN1YmVsZW1lbnQgb3IgbnVsbCwgaWYgbm90IGV4aXN0aW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShlbGVtZW50OiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZ05hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgICAgIGlmIChtYXRjaGluZ0VsZW1lbnRzICYmIG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbGVtZW50cy5pdGVtKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHRhZyBhbmQgaWQgYXR0cmlidXRlLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHRhZ05hbWUgdGFnTmFtZVxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKiBAcmV0dXJuIHN1YmVsZW1lbnQgb3IgbnVsbCwgaWYgbm90IGV4aXN0aW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVsZW1lbnRCeVRhZ05hbWVBbmRJZChlbGVtZW50OiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZ05hbWU6IHN0cmluZywgaWQ6IHN0cmluZyk6IEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgICAgIGlmIChtYXRjaGluZ0VsZW1lbnRzICYmIG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IEVsZW1lbnQgPSBtYXRjaGluZ0VsZW1lbnRzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbmV4dCBzaWJsaW5nLCB0aGF0IGlzIGFuIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEZvbGxvd2luZ1NpYmxpbmcoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGUgPSBlbGVtZW50Lm5leHRTaWJsaW5nO1xyXG4gICAgICAgIHdoaWxlIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVUeXBlID09PSBlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxFbGVtZW50PiBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUgPSBlLm5leHRTaWJsaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBwcmV2aW91cyBzaWJsaW5nLCB0aGF0IGlzIGFuIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudFByZWNlZGluZ1NpYmxpbmcoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGUgPSBlbGVtZW50LnByZXZpb3VzU2libGluZztcclxuICAgICAgICB3aGlsZSAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5ub2RlVHlwZSA9PT0gZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8RWxlbWVudD4gZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlID0gZS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJuIGNvbnRlbnQgb2YgZWxlbWVudCBhcyBzdHJpbmcsIGluY2x1ZGluZyBhbGwgbWFya3VwLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiBjb250ZW50IG9mIGVsZW1lbnQgYXMgc3RyaW5nLCBpbmNsdWRpbmcgYWxsIG1hcmt1cC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRYTUxDb250ZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XHJcbiAgICAgICAgY29uc3QgcmVTdGFydE1zZzogUmVnRXhwID0gbmV3IFJlZ0V4cCgnPCcgKyB0YWdOYW1lICsgJ1tePl0qPicsICdnJyk7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocmVTdGFydE1zZywgJycpO1xyXG4gICAgICAgIGNvbnN0IHJlRW5kTXNnOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCc8LycgKyB0YWdOYW1lICsgJz4nLCAnZycpO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHJlRW5kTXNnLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiBQQ0RBVEEgY29udGVudCBvZiBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiBQQ0RBVEEgY29udGVudCBvZiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBDREFUQShlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkTm9kZXMuaXRlbShpKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBjaGlsZC5URVhUX05PREUgfHwgY2hpbGQubm9kZVR5cGUgPT09IGNoaWxkLkNEQVRBX1NFQ1RJT05fTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgY2hpbGQubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSAwID8gbnVsbCA6IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlcGxhY2UgUENEQVRBIGNvbnRlbnQgd2l0aCBhIG5ldyBvbmUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gcGNkYXRhIHBjZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcGxhY2VDb250ZW50V2l0aFhNTENvbnRlbnQoZWxlbWVudDogRWxlbWVudCwgcGNkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyByZW1vdmUgYWxsIGNoaWxkcmVuXHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHBhcnNlSUNVTWVzc2FnZSBwY2RhdGFcclxuICAgICAgICBjb25zdCBwY2RhdGFGcmFnbWVudDogRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKCc8ZnJhZ21lbnQ+JyArIHBjZGF0YSArICc8L2ZyYWdtZW50PicsICdhcHBsaWNhdGlvbi94bWwnKTtcclxuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IHBjZGF0YUZyYWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmcmFnbWVudCcpLml0ZW0oMCkuY2hpbGROb2RlcztcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Q2hpbGRyZW4uaXRlbShqKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShuZXdDaGlsZCwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbmQgdGhlIHByZXZpb3VzIHNpYmxpbmcgdGhhdCBpcyBhbiBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiB0aGUgcHJldmlvdXMgc2libGluZyB0aGF0IGlzIGFuIGVsZW1lbnQgb3IgbnVsbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmV2aW91c0VsZW1lbnRTaWJsaW5nKGVsZW1lbnQ6IE5vZGUpOiBFbGVtZW50IHtcclxuICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxFbGVtZW50PiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gRWxlbWVudCBOb2RlIHRoYXQgaXMgdGhlIG5leHQgc2libGluZyBvZiBhIGdpdmVuIG5vZGUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5hbWVUb0NyZWF0ZSBlbGVtZW50TmFtZVRvQ3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcHJldmlvdXNTaWJsaW5nIHByZXZpb3VzU2libGluZ1xyXG4gICAgICogQHJldHVybiBuZXcgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZvbGxvd2luZ1NpYmxpbmcoZWxlbWVudE5hbWVUb0NyZWF0ZTogc3RyaW5nLCBwcmV2aW91c1NpYmxpbmc6IE5vZGUpOiBFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gcHJldmlvdXNTaWJsaW5nLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZVRvQ3JlYXRlKTtcclxuICAgICAgICByZXR1cm4gPEVsZW1lbnQ+IERPTVV0aWxpdGllcy5pbnNlcnRBZnRlcihuZXdFbGVtZW50LCBwcmV2aW91c1NpYmxpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0IG5ld0VsZW1lbnQgZGlyZWN0bHkgYWZ0ZXIgcHJldmlvdXNTaWJsaW5nLlxyXG4gICAgICogQHBhcmFtIG5ld0VsZW1lbnQgbmV3RWxlbWVudFxyXG4gICAgICogQHBhcmFtIHByZXZpb3VzU2libGluZyBwcmV2aW91c1NpYmxpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnNlcnRBZnRlcihuZXdFbGVtZW50OiBOb2RlLCBwcmV2aW91c1NpYmxpbmc6IE5vZGUpOiBOb2RlIHtcclxuICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nLm5leHRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdFbGVtZW50LCBwcmV2aW91c1NpYmxpbmcubmV4dFNpYmxpbmcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZy5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc2VydCBuZXdFbGVtZW50IGRpcmVjdGx5IGJlZm9yZSBuZXh0U2libGluZy5cclxuICAgICAqIEBwYXJhbSBuZXdFbGVtZW50IG5ld0VsZW1lbnRcclxuICAgICAqIEBwYXJhbSBuZXh0U2libGluZyBuZXh0U2libGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc2VydEJlZm9yZShuZXdFbGVtZW50OiBOb2RlLCBuZXh0U2libGluZzogTm9kZSk6IE5vZGUge1xyXG4gICAgICAgIG5leHRTaWJsaW5nLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsZW1lbnQsIG5leHRTaWJsaW5nKTtcclxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcclxuICAgIH1cclxufVxyXG4iXX0=