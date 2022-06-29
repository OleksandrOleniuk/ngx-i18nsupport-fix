/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOMParser, XMLSerializer } from 'xmldom';
/**
 * Created by martin on 01.05.2017.
 * Some Tool functions for XML Handling.
 */
export class DOMUtilities {
    /**
     * return the first subelement with the given tag.
     * @param {?} element element
     * @param {?} tagName tagName
     * @return {?} subelement or null, if not existing.
     */
    static getFirstElementByTagName(element, tagName) {
        /** @type {?} */
        const matchingElements = element.getElementsByTagName(tagName);
        if (matchingElements && matchingElements.length > 0) {
            return matchingElements.item(0);
        }
        else {
            return null;
        }
    }
    /**
     * return an element with the given tag and id attribute.
     * @param {?} element element
     * @param {?} tagName tagName
     * @param {?} id id
     * @return {?} subelement or null, if not existing.
     */
    static getElementByTagNameAndId(element, tagName, id) {
        /** @type {?} */
        const matchingElements = element.getElementsByTagName(tagName);
        if (matchingElements && matchingElements.length > 0) {
            for (let i = 0; i < matchingElements.length; i++) {
                /** @type {?} */
                const node = matchingElements.item(i);
                if (node.getAttribute('id') === id) {
                    return node;
                }
            }
        }
        return null;
    }
    /**
     * Get next sibling, that is an element.
     * @param {?} element element
     * @return {?}
     */
    static getElementFollowingSibling(element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        let e = element.nextSibling;
        while (e) {
            if (e.nodeType === e.ELEMENT_NODE) {
                return (/** @type {?} */ (e));
            }
            e = e.nextSibling;
        }
        return null;
    }
    /**
     * Get previous sibling, that is an element.
     * @param {?} element element
     * @return {?}
     */
    static getElementPrecedingSibling(element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        let e = element.previousSibling;
        while (e) {
            if (e.nodeType === e.ELEMENT_NODE) {
                return (/** @type {?} */ (e));
            }
            e = e.previousSibling;
        }
        return null;
    }
    /**
     * return content of element as string, including all markup.
     * @param {?} element element
     * @return {?} content of element as string, including all markup.
     */
    static getXMLContent(element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        let result = new XMLSerializer().serializeToString(element);
        /** @type {?} */
        const tagName = element.nodeName;
        /** @type {?} */
        const reStartMsg = new RegExp('<' + tagName + '[^>]*>', 'g');
        result = result.replace(reStartMsg, '');
        /** @type {?} */
        const reEndMsg = new RegExp('</' + tagName + '>', 'g');
        result = result.replace(reEndMsg, '');
        return result;
    }
    /**
     * return PCDATA content of element.
     * @param {?} element element
     * @return {?} PCDATA content of element.
     */
    static getPCDATA(element) {
        if (!element) {
            return null;
        }
        /** @type {?} */
        let result = '';
        /** @type {?} */
        const childNodes = element.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            /** @type {?} */
            const child = childNodes.item(i);
            if (child.nodeType === child.TEXT_NODE || child.nodeType === child.CDATA_SECTION_NODE) {
                result = result + child.nodeValue;
            }
        }
        return result.length === 0 ? null : result;
    }
    /**
     * replace PCDATA content with a new one.
     * @param {?} element element
     * @param {?} pcdata pcdata
     * @return {?}
     */
    static replaceContentWithXMLContent(element, pcdata) {
        // remove all children
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        // parseICUMessage pcdata
        /** @type {?} */
        const pcdataFragment = new DOMParser().parseFromString('<fragment>' + pcdata + '</fragment>', 'application/xml');
        /** @type {?} */
        const newChildren = pcdataFragment.getElementsByTagName('fragment').item(0).childNodes;
        for (let j = 0; j < newChildren.length; j++) {
            /** @type {?} */
            const newChild = newChildren.item(j);
            element.appendChild(element.ownerDocument.importNode(newChild, true));
        }
    }
    /**
     * find the previous sibling that is an element.
     * @param {?} element element
     * @return {?} the previous sibling that is an element or null.
     */
    static getPreviousElementSibling(element) {
        /** @type {?} */
        let node = element.previousSibling;
        while (node !== null) {
            if (node.nodeType === node.ELEMENT_NODE) {
                return (/** @type {?} */ (node));
            }
            node = node.previousSibling;
        }
        return null;
    }
    /**
     * Create an Element Node that is the next sibling of a given node.
     * @param {?} elementNameToCreate elementNameToCreate
     * @param {?} previousSibling previousSibling
     * @return {?} new element
     */
    static createFollowingSibling(elementNameToCreate, previousSibling) {
        /** @type {?} */
        const newElement = previousSibling.ownerDocument.createElement(elementNameToCreate);
        return (/** @type {?} */ (DOMUtilities.insertAfter(newElement, previousSibling)));
    }
    /**
     * Insert newElement directly after previousSibling.
     * @param {?} newElement newElement
     * @param {?} previousSibling previousSibling
     * @return {?}
     */
    static insertAfter(newElement, previousSibling) {
        if (previousSibling.nextSibling !== null) {
            previousSibling.parentNode.insertBefore(newElement, previousSibling.nextSibling);
        }
        else {
            previousSibling.parentNode.appendChild(newElement);
        }
        return newElement;
    }
    /**
     * Insert newElement directly before nextSibling.
     * @param {?} newElement newElement
     * @param {?} nextSibling nextSibling
     * @return {?}
     */
    static insertBefore(newElement, nextSibling) {
        nextSibling.parentNode.insertBefore(newElement, nextSibling);
        return newElement;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXV0aWxpdGllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LWxpYi8iLCJzb3VyY2VzIjpbImltcGwvZG9tLXV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxhQUFhLEVBQUMsTUFBTSxRQUFRLENBQUM7Ozs7O0FBTWhELE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBUWQsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQTJCLEVBQUUsT0FBZTs7Y0FDekUsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUM5RCxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakQsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7Ozs7OztJQVNNLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxPQUEyQixFQUFFLE9BQWUsRUFBRSxFQUFVOztjQUNyRixnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBQzlELElBQUksZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztzQkFDeEMsSUFBSSxHQUFZLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2hDLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lB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ZSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwRjthQUFNO1lBQ0gsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOzs7Ozs7O0lBT00sTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFnQixFQUFFLFdBQWlCO1FBQzFELFdBQVcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3RCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RPTVBhcnNlciwgWE1MU2VyaWFsaXplcn0gZnJvbSAneG1sZG9tJztcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbWFydGluIG9uIDAxLjA1LjIwMTcuXHJcbiAqIFNvbWUgVG9vbCBmdW5jdGlvbnMgZm9yIFhNTCBIYW5kbGluZy5cclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgRE9NVXRpbGl0aWVzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiB0aGUgZmlyc3Qgc3ViZWxlbWVudCB3aXRoIHRoZSBnaXZlbiB0YWcuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gdGFnTmFtZSB0YWdOYW1lXHJcbiAgICAgKiBAcmV0dXJuIHN1YmVsZW1lbnQgb3IgbnVsbCwgaWYgbm90IGV4aXN0aW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEZpcnN0RWxlbWVudEJ5VGFnTmFtZShlbGVtZW50OiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZ05hbWU6IHN0cmluZyk6IEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgICAgIGlmIChtYXRjaGluZ0VsZW1lbnRzICYmIG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hpbmdFbGVtZW50cy5pdGVtKDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiBhbiBlbGVtZW50IHdpdGggdGhlIGdpdmVuIHRhZyBhbmQgaWQgYXR0cmlidXRlLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHRhZ05hbWUgdGFnTmFtZVxyXG4gICAgICogQHBhcmFtIGlkIGlkXHJcbiAgICAgKiBAcmV0dXJuIHN1YmVsZW1lbnQgb3IgbnVsbCwgaWYgbm90IGV4aXN0aW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEVsZW1lbnRCeVRhZ05hbWVBbmRJZChlbGVtZW50OiBFbGVtZW50IHwgRG9jdW1lbnQsIHRhZ05hbWU6IHN0cmluZywgaWQ6IHN0cmluZyk6IEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZ05hbWUpO1xyXG4gICAgICAgIGlmIChtYXRjaGluZ0VsZW1lbnRzICYmIG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoaW5nRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IEVsZW1lbnQgPSBtYXRjaGluZ0VsZW1lbnRzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgbmV4dCBzaWJsaW5nLCB0aGF0IGlzIGFuIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudEZvbGxvd2luZ1NpYmxpbmcoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGUgPSBlbGVtZW50Lm5leHRTaWJsaW5nO1xyXG4gICAgICAgIHdoaWxlIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLm5vZGVUeXBlID09PSBlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxFbGVtZW50PiBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUgPSBlLm5leHRTaWJsaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBwcmV2aW91cyBzaWJsaW5nLCB0aGF0IGlzIGFuIGVsZW1lbnQuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RWxlbWVudFByZWNlZGluZ1NpYmxpbmcoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnQge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGUgPSBlbGVtZW50LnByZXZpb3VzU2libGluZztcclxuICAgICAgICB3aGlsZSAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5ub2RlVHlwZSA9PT0gZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA8RWxlbWVudD4gZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlID0gZS5wcmV2aW91c1NpYmxpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcmV0dXJuIGNvbnRlbnQgb2YgZWxlbWVudCBhcyBzdHJpbmcsIGluY2x1ZGluZyBhbGwgbWFya3VwLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiBjb250ZW50IG9mIGVsZW1lbnQgYXMgc3RyaW5nLCBpbmNsdWRpbmcgYWxsIG1hcmt1cC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRYTUxDb250ZW50KGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoZWxlbWVudCk7XHJcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XHJcbiAgICAgICAgY29uc3QgcmVTdGFydE1zZzogUmVnRXhwID0gbmV3IFJlZ0V4cCgnPCcgKyB0YWdOYW1lICsgJ1tePl0qPicsICdnJyk7XHJcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocmVTdGFydE1zZywgJycpO1xyXG4gICAgICAgIGNvbnN0IHJlRW5kTXNnOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCc8LycgKyB0YWdOYW1lICsgJz4nLCAnZycpO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHJlRW5kTXNnLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJldHVybiBQQ0RBVEEgY29udGVudCBvZiBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiBQQ0RBVEEgY29udGVudCBvZiBlbGVtZW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFBDREFUQShlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gZWxlbWVudC5jaGlsZE5vZGVzO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IGNoaWxkTm9kZXMuaXRlbShpKTtcclxuICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBjaGlsZC5URVhUX05PREUgfHwgY2hpbGQubm9kZVR5cGUgPT09IGNoaWxkLkNEQVRBX1NFQ1RJT05fTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICsgY2hpbGQubm9kZVZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSAwID8gbnVsbCA6IHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHJlcGxhY2UgUENEQVRBIGNvbnRlbnQgd2l0aCBhIG5ldyBvbmUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudCBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gcGNkYXRhIHBjZGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlcGxhY2VDb250ZW50V2l0aFhNTENvbnRlbnQoZWxlbWVudDogRWxlbWVudCwgcGNkYXRhOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyByZW1vdmUgYWxsIGNoaWxkcmVuXHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHBhcnNlSUNVTWVzc2FnZSBwY2RhdGFcclxuICAgICAgICBjb25zdCBwY2RhdGFGcmFnbWVudDogRG9jdW1lbnQgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKCc8ZnJhZ21lbnQ+JyArIHBjZGF0YSArICc8L2ZyYWdtZW50PicsICdhcHBsaWNhdGlvbi94bWwnKTtcclxuICAgICAgICBjb25zdCBuZXdDaGlsZHJlbiA9IHBjZGF0YUZyYWdtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmcmFnbWVudCcpLml0ZW0oMCkuY2hpbGROb2RlcztcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG5ld0NoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0NoaWxkID0gbmV3Q2hpbGRyZW4uaXRlbShqKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShuZXdDaGlsZCwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbmQgdGhlIHByZXZpb3VzIHNpYmxpbmcgdGhhdCBpcyBhbiBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnQgZWxlbWVudFxyXG4gICAgICogQHJldHVybiB0aGUgcHJldmlvdXMgc2libGluZyB0aGF0IGlzIGFuIGVsZW1lbnQgb3IgbnVsbC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQcmV2aW91c0VsZW1lbnRTaWJsaW5nKGVsZW1lbnQ6IE5vZGUpOiBFbGVtZW50IHtcclxuICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucHJldmlvdXNTaWJsaW5nO1xyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxFbGVtZW50PiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gRWxlbWVudCBOb2RlIHRoYXQgaXMgdGhlIG5leHQgc2libGluZyBvZiBhIGdpdmVuIG5vZGUuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudE5hbWVUb0NyZWF0ZSBlbGVtZW50TmFtZVRvQ3JlYXRlXHJcbiAgICAgKiBAcGFyYW0gcHJldmlvdXNTaWJsaW5nIHByZXZpb3VzU2libGluZ1xyXG4gICAgICogQHJldHVybiBuZXcgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZvbGxvd2luZ1NpYmxpbmcoZWxlbWVudE5hbWVUb0NyZWF0ZTogc3RyaW5nLCBwcmV2aW91c1NpYmxpbmc6IE5vZGUpOiBFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gcHJldmlvdXNTaWJsaW5nLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZVRvQ3JlYXRlKTtcclxuICAgICAgICByZXR1cm4gPEVsZW1lbnQ+IERPTVV0aWxpdGllcy5pbnNlcnRBZnRlcihuZXdFbGVtZW50LCBwcmV2aW91c1NpYmxpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5zZXJ0IG5ld0VsZW1lbnQgZGlyZWN0bHkgYWZ0ZXIgcHJldmlvdXNTaWJsaW5nLlxyXG4gICAgICogQHBhcmFtIG5ld0VsZW1lbnQgbmV3RWxlbWVudFxyXG4gICAgICogQHBhcmFtIHByZXZpb3VzU2libGluZyBwcmV2aW91c1NpYmxpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpbnNlcnRBZnRlcihuZXdFbGVtZW50OiBOb2RlLCBwcmV2aW91c1NpYmxpbmc6IE5vZGUpOiBOb2RlIHtcclxuICAgICAgICBpZiAocHJldmlvdXNTaWJsaW5nLm5leHRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdFbGVtZW50LCBwcmV2aW91c1NpYmxpbmcubmV4dFNpYmxpbmcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzU2libGluZy5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld0VsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc2VydCBuZXdFbGVtZW50IGRpcmVjdGx5IGJlZm9yZSBuZXh0U2libGluZy5cclxuICAgICAqIEBwYXJhbSBuZXdFbGVtZW50IG5ld0VsZW1lbnRcclxuICAgICAqIEBwYXJhbSBuZXh0U2libGluZyBuZXh0U2libGluZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGluc2VydEJlZm9yZShuZXdFbGVtZW50OiBOb2RlLCBuZXh0U2libGluZzogTm9kZSk6IE5vZGUge1xyXG4gICAgICAgIG5leHRTaWJsaW5nLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld0VsZW1lbnQsIG5leHRTaWJsaW5nKTtcclxuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcclxuICAgIH1cclxufVxyXG4iXX0=