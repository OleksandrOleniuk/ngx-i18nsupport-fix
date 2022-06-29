/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An XmlSerializer that supports formatting.
 * Original code is based on [xmldom](https://www.npmjs.com/package/xmldom)
 * It is extended to support formatting including handling of elements with mixed content.
 * Example formatted output:
 * <pre>
 *     <doc>
 *         <element>An element with
 *             <b>mixed</b>
 *              content
 *         </element>
 *     </doc>
 * </pre>
 * Same when "element" is indicated as "mixedContentElement":
 * <pre>
 *     <doc>
 *         <element>An element with <b>mixed</b> content</element>
 *     </doc>
 * </pre>
 */
/**
 * @record
 */
function Namespace() { }
if (false) {
    /** @type {?} */
    Namespace.prototype.prefix;
    /** @type {?} */
    Namespace.prototype.namespace;
}
/**
 * Options used to control the formatting
 * @record
 */
export function XmlSerializerOptions() { }
if (false) {
    /** @type {?|undefined} */
    XmlSerializerOptions.prototype.beautify;
    /** @type {?|undefined} */
    XmlSerializerOptions.prototype.indentString;
    /** @type {?|undefined} */
    XmlSerializerOptions.prototype.mixedContentElements;
}
/** @type {?} */
const DEFAULT_INDENT_STRING = '  ';
export class XmlSerializer {
    constructor() {
    }
    /**
     * Serialze xml document to string.
     * @param {?} document the document
     * @param {?=} options can be used to activate beautifying.
     * @return {?}
     */
    serializeToString(document, options) {
        /** @type {?} */
        const buf = [];
        /** @type {?} */
        let visibleNamespaces = [];
        /** @type {?} */
        const refNode = document.documentElement;
        /** @type {?} */
        let prefix = refNode.prefix;
        /** @type {?} */
        const uri = refNode.namespaceURI;
        if (uri && prefix == null) {
            prefix = refNode.lookupPrefix(uri);
            if (prefix == null) {
                visibleNamespaces = [
                    { namespace: uri, prefix: null }
                    // {namespace:uri,prefix:''}
                ];
            }
        }
        if (!options) {
            options = {};
        }
        if (options.indentString) {
            if (!this.containsOnlyWhiteSpace(options.indentString)) {
                throw new Error('indentString must not contain non white characters');
            }
        }
        this.doSerializeToString(document, options, buf, 0, false, visibleNamespaces);
        return buf.join('');
    }
    /**
     * Main format method that does all the work.
     * Outputs a node to the outputbuffer.
     * @private
     * @param {?} node the node to be formatted.
     * @param {?} options options
     * @param {?} buf outputbuffer, new output will be appended to this array.
     * @param {?} indentLevel Lever of indentation for formatted output.
     * @param {?} partOfMixedContent true, if node is a subelement of an element containind mixed content.
     * @param {?} visibleNamespaces visibleNamespaces
     * @return {?}
     */
    doSerializeToString(node, options, buf, indentLevel, partOfMixedContent, visibleNamespaces) {
        /** @type {?} */
        let child;
        switch (node.nodeType) {
            case node.ELEMENT_NODE:
                /** @type {?} */
                const elementNode = (/** @type {?} */ (node));
                /** @type {?} */
                const attrs = elementNode.attributes;
                /** @type {?} */
                const len = attrs.length;
                child = elementNode.firstChild;
                /** @type {?} */
                const nodeName = elementNode.tagName;
                /** @type {?} */
                const elementHasMixedContent = this.isMixedContentElement(nodeName, options);
                if (partOfMixedContent) {
                    buf.push('<', nodeName);
                }
                else {
                    this.outputIndented(options, buf, indentLevel, '<', nodeName);
                }
                for (let i = 0; i < len; i++) {
                    // add namespaces for attributes
                    /** @type {?} */
                    const attr = attrs.item(i);
                    if (attr.prefix === 'xmlns') {
                        visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
                    }
                    else if (attr.nodeName === 'xmlns') {
                        visibleNamespaces.push({ prefix: '', namespace: attr.value });
                    }
                }
                for (let i = 0; i < len; i++) {
                    /** @type {?} */
                    const attr = attrs.item(i);
                    if (this.needNamespaceDefine(attr, visibleNamespaces)) {
                        /** @type {?} */
                        const prefix = attr.prefix || '';
                        /** @type {?} */
                        const uri = attr.namespaceURI;
                        /** @type {?} */
                        const ns = prefix ? ' xmlns:' + prefix : ' xmlns';
                        buf.push(ns, '="', uri, '"');
                        visibleNamespaces.push({ prefix: prefix, namespace: uri });
                    }
                    this.doSerializeToString(attr, options, buf, indentLevel, false, visibleNamespaces);
                }
                // add namespace for current node
                if (this.needNamespaceDefine(elementNode, visibleNamespaces)) {
                    /** @type {?} */
                    const prefix = elementNode.prefix || '';
                    /** @type {?} */
                    const uri = node.namespaceURI;
                    /** @type {?} */
                    const ns = prefix ? ' xmlns:' + prefix : ' xmlns';
                    buf.push(ns, '="', uri, '"');
                    visibleNamespaces.push({ prefix: prefix, namespace: uri });
                }
                if (child) {
                    buf.push('>');
                    // if is cdata child node
                    /** @type {?} */
                    let hasComplexContent = false;
                    while (child) {
                        if (child.nodeType === child.ELEMENT_NODE) {
                            hasComplexContent = true;
                        }
                        this.doSerializeToString(child, options, buf, indentLevel + 1, partOfMixedContent || elementHasMixedContent, visibleNamespaces);
                        child = child.nextSibling;
                    }
                    if (!partOfMixedContent && !elementHasMixedContent && hasComplexContent) {
                        this.outputIndented(options, buf, indentLevel, '</', nodeName, '>');
                    }
                    else {
                        buf.push('</', nodeName, '>');
                    }
                }
                else {
                    buf.push('/>');
                }
                return;
            case node.DOCUMENT_NODE:
            case node.DOCUMENT_FRAGMENT_NODE:
                child = node.firstChild;
                while (child) {
                    this.doSerializeToString(child, options, buf, indentLevel, false, visibleNamespaces);
                    child = child.nextSibling;
                }
                return;
            case node.ATTRIBUTE_NODE:
                /** @type {?} */
                const attrNode = (/** @type {?} */ (node));
                return buf.push(' ', attrNode.name, '="', attrNode.value.replace(/[<&"]/g, this._xmlEncoder), '"');
            case node.TEXT_NODE:
                /** @type {?} */
                const textNode = (/** @type {?} */ (node));
                if (!options.beautify || partOfMixedContent || !this.containsOnlyWhiteSpace(textNode.data)) {
                    return buf.push(textNode.data.replace(/[<&]/g, this._xmlEncoder));
                }
                return;
            case node.CDATA_SECTION_NODE:
                /** @type {?} */
                const cdatasectionNode = (/** @type {?} */ (node));
                return buf.push('<![CDATA[', cdatasectionNode.data, ']]>');
            case node.COMMENT_NODE:
                /** @type {?} */
                const commentNode = (/** @type {?} */ (node));
                return buf.push('<!--', commentNode.data, '-->');
            case node.DOCUMENT_TYPE_NODE:
                /** @type {?} */
                const documenttypeNode = (/** @type {?} */ (node));
                /** @type {?} */
                const pubid = documenttypeNode.publicId;
                /** @type {?} */
                const sysid = documenttypeNode.systemId;
                buf.push('<!DOCTYPE ', documenttypeNode.name);
                if (pubid) {
                    buf.push(' PUBLIC "', pubid);
                    if (sysid && sysid !== '.') {
                        buf.push('" "', sysid);
                    }
                    buf.push('">');
                }
                else if (sysid && sysid !== '.') {
                    buf.push(' SYSTEM "', sysid, '">');
                }
                else {
                    buf.push('>');
                }
                return;
            case node.PROCESSING_INSTRUCTION_NODE:
                /** @type {?} */
                const piNode = (/** @type {?} */ (node));
                return buf.push('<?', piNode.target, ' ', piNode.data, '?>');
            case node.ENTITY_REFERENCE_NODE:
                return buf.push('&', node.nodeName, ';');
            // case ENTITY_NODE:
            // case NOTATION_NODE:
            default:
                buf.push('??', node.nodeName);
        }
    }
    /**
     * @private
     * @param {?} node
     * @param {?} visibleNamespaces
     * @return {?}
     */
    needNamespaceDefine(node, visibleNamespaces) {
        /** @type {?} */
        const prefix = node.prefix || '';
        /** @type {?} */
        const uri = node.namespaceURI;
        if (!prefix && !uri) {
            return false;
        }
        if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace'
            || uri === 'http://www.w3.org/2000/xmlns/') {
            return false;
        }
        /** @type {?} */
        let i = visibleNamespaces.length;
        while (i--) {
            /** @type {?} */
            const ns = visibleNamespaces[i];
            // get namespace prefix
            if (ns.prefix === prefix) {
                return ns.namespace !== uri;
            }
        }
        return true;
    }
    /**
     * @private
     * @param {?} c
     * @return {?}
     */
    _xmlEncoder(c) {
        return c === '<' && '&lt;' ||
            c === '>' && '&gt;' ||
            c === '&' && '&amp;' ||
            c === '"' && '&quot;' ||
            '&#' + c.charCodeAt(0) + ';';
    }
    /**
     * @private
     * @param {?} options
     * @param {?} buf
     * @param {?} indentLevel
     * @param {...?} outputParts
     * @return {?}
     */
    outputIndented(options, buf, indentLevel, ...outputParts) {
        if (options.beautify) {
            buf.push('\n');
            if (indentLevel > 0) {
                buf.push(this.indentationString(options, indentLevel));
            }
        }
        buf.push(...outputParts);
    }
    /**
     * @private
     * @param {?} options
     * @param {?} indentLevel
     * @return {?}
     */
    indentationString(options, indentLevel) {
        /** @type {?} */
        const indent = (options.indentString) ? options.indentString : DEFAULT_INDENT_STRING;
        /** @type {?} */
        let result = '';
        for (let i = 0; i < indentLevel; i++) {
            result = result + indent;
        }
        return result;
    }
    /**
     * Test, wether tagName is an element containing mixed content.
     * @private
     * @param {?} tagName tagName
     * @param {?} options options
     * @return {?}
     */
    isMixedContentElement(tagName, options) {
        if (options && options.mixedContentElements) {
            return !!options.mixedContentElements.find((/**
             * @param {?} tag
             * @return {?}
             */
            (tag) => tag === tagName));
        }
        else {
            return false;
        }
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    containsOnlyWhiteSpace(text) {
        for (let i = 0; i < text.length; i++) {
            /** @type {?} */
            const c = text.charAt(i);
            if (!(c === ' ' || c === '\t' || c === '\r' || c === '\n')) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3htbC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSx3QkFHQzs7O0lBRkcsMkJBQWU7O0lBQ2YsOEJBQWtCOzs7Ozs7QUFNdEIsMENBSUM7OztJQUhHLHdDQUFtQjs7SUFDbkIsNENBQXNCOztJQUN0QixvREFBZ0M7OztNQUc5QixxQkFBcUIsR0FBRyxJQUFJO0FBRWxDLE1BQU0sT0FBTyxhQUFhO0lBRXRCO0lBRUEsQ0FBQzs7Ozs7OztJQU9ELGlCQUFpQixDQUFDLFFBQWtCLEVBQUUsT0FBOEI7O2NBQzFELEdBQUcsR0FBRyxFQUFFOztZQUNWLGlCQUFpQixHQUFnQixFQUFFOztjQUNqQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWU7O1lBQ3BDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTTs7Y0FDckIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxZQUFZO1FBRWhDLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdkIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNoQixpQkFBaUIsR0FBRztvQkFDaEIsRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUM7b0JBQzlCLDRCQUE0QjtpQkFDL0IsQ0FBQzthQUNMO1NBQ0o7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLEVBQUUsQ0FBQztTQUNoQjtRQUNELElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMs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QyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSTs7OztZQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFDLENBQUM7U0FDeEU7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sc0JBQXNCLENBQUMsSUFBWTtRQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQzVCLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ3hELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQW4gWG1sU2VyaWFsaXplciB0aGF0IHN1cHBvcnRzIGZvcm1hdHRpbmcuXHJcbiAqIE9yaWdpbmFsIGNvZGUgaXMgYmFzZWQgb24gW3htbGRvbV0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UveG1sZG9tKVxyXG4gKiBJdCBpcyBleHRlbmRlZCB0byBzdXBwb3J0IGZvcm1hdHRpbmcgaW5jbHVkaW5nIGhhbmRsaW5nIG9mIGVsZW1lbnRzIHdpdGggbWl4ZWQgY29udGVudC5cclxuICogRXhhbXBsZSBmb3JtYXR0ZWQgb3V0cHV0OlxyXG4gKiA8cHJlPlxyXG4gKiAgICAgPGRvYz5cclxuICogICAgICAgICA8ZWxlbWVudD5BbiBlbGVtZW50IHdpdGhcclxuICogICAgICAgICAgICAgPGI+bWl4ZWQ8L2I+XHJcbiAqICAgICAgICAgICAgICBjb250ZW50XHJcbiAqICAgICAgICAgPC9lbGVtZW50PlxyXG4gKiAgICAgPC9kb2M+XHJcbiAqIDwvcHJlPlxyXG4gKiBTYW1lIHdoZW4gXCJlbGVtZW50XCIgaXMgaW5kaWNhdGVkIGFzIFwibWl4ZWRDb250ZW50RWxlbWVudFwiOlxyXG4gKiA8cHJlPlxyXG4gKiAgICAgPGRvYz5cclxuICogICAgICAgICA8ZWxlbWVudD5BbiBlbGVtZW50IHdpdGggPGI+bWl4ZWQ8L2I+IGNvbnRlbnQ8L2VsZW1lbnQ+XHJcbiAqICAgICA8L2RvYz5cclxuICogPC9wcmU+XHJcbiAqL1xyXG5cclxuaW50ZXJmYWNlIE5hbWVzcGFjZSB7XHJcbiAgICBwcmVmaXg6IHN0cmluZztcclxuICAgIG5hbWVzcGFjZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogT3B0aW9ucyB1c2VkIHRvIGNvbnRyb2wgdGhlIGZvcm1hdHRpbmdcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgWG1sU2VyaWFsaXplck9wdGlvbnMge1xyXG4gICAgYmVhdXRpZnk/OiBib29sZWFuOyAvLyBzZXQgdG8gYWN0aXZhdGUgYmVhdXRpZnlcclxuICAgIGluZGVudFN0cmluZz86IHN0cmluZzsgLy8gU2VxdWVuY2UgdXNlcyBmb3IgaW5kZW50YXRpb24sIG11c3Qgb25seSBjb250YWluIHdoaXRlIHNwYWNlIGNoYXJzLCBlLmcuIFwiICBcIiBvciBcIiAgICBcIiBvciBcIlxcdFwiXHJcbiAgICBtaXhlZENvbnRlbnRFbGVtZW50cz86IHN0cmluZ1tdOyAvLyBOYW1lcyBvZiBlbGVtZW50cyBjb250YWluaW5nIG1peGVkIGNvbnRlbnQgKHRoZXNlIGFyZSBub3QgYmVhdXRpZmllZClcclxufVxyXG5cclxuY29uc3QgREVGQVVMVF9JTkRFTlRfU1RSSU5HID0gJyAgJztcclxuXHJcbmV4cG9ydCBjbGFzcyBYbWxTZXJpYWxpemVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXJpYWx6ZSB4bWwgZG9jdW1lbnQgdG8gc3RyaW5nLlxyXG4gICAgICogQHBhcmFtIGRvY3VtZW50IHRoZSBkb2N1bWVudFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgY2FuIGJlIHVzZWQgdG8gYWN0aXZhdGUgYmVhdXRpZnlpbmcuXHJcbiAgICAgKi9cclxuICAgIHNlcmlhbGl6ZVRvU3RyaW5nKGRvY3VtZW50OiBEb2N1bWVudCwgb3B0aW9ucz86IFhtbFNlcmlhbGl6ZXJPcHRpb25zKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBidWYgPSBbXTtcclxuICAgICAgICBsZXQgdmlzaWJsZU5hbWVzcGFjZXM6IE5hbWVzcGFjZVtdID0gW107XHJcbiAgICAgICAgY29uc3QgcmVmTm9kZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgICAgICBsZXQgcHJlZml4ID0gcmVmTm9kZS5wcmVmaXg7XHJcbiAgICAgICAgY29uc3QgdXJpID0gcmVmTm9kZS5uYW1lc3BhY2VVUkk7XHJcblxyXG4gICAgICAgIGlmICh1cmkgJiYgcHJlZml4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcHJlZml4ID0gcmVmTm9kZS5sb29rdXBQcmVmaXgodXJpKTtcclxuICAgICAgICAgICAgaWYgKHByZWZpeCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlTmFtZXNwYWNlcyA9IFtcclxuICAgICAgICAgICAgICAgICAgICB7bmFtZXNwYWNlOiB1cmksIHByZWZpeDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB7bmFtZXNwYWNlOnVyaSxwcmVmaXg6Jyd9XHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb25zLmluZGVudFN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29udGFpbnNPbmx5V2hpdGVTcGFjZShvcHRpb25zLmluZGVudFN0cmluZykpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW5kZW50U3RyaW5nIG11c3Qgbm90IGNvbnRhaW4gbm9uIHdoaXRlIGNoYXJhY3RlcnMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRvU2VyaWFsaXplVG9TdHJpbmcoZG9jdW1lbnQsIG9wdGlvbnMsIGJ1ZiwgMCwgZmFsc2UsIHZpc2libGVOYW1lc3BhY2VzKTtcclxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFpbiBmb3JtYXQgbWV0aG9kIHRoYXQgZG9lcyBhbGwgdGhlIHdvcmsuXHJcbiAgICAgKiBPdXRwdXRzIGEgbm9kZSB0byB0aGUgb3V0cHV0YnVmZmVyLlxyXG4gICAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgdG8gYmUgZm9ybWF0dGVkLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIGJ1ZiBvdXRwdXRidWZmZXIsIG5ldyBvdXRwdXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGlzIGFycmF5LlxyXG4gICAgICogQHBhcmFtIGluZGVudExldmVsIExldmVyIG9mIGluZGVudGF0aW9uIGZvciBmb3JtYXR0ZWQgb3V0cHV0LlxyXG4gICAgICogQHBhcmFtIHBhcnRPZk1peGVkQ29udGVudCB0cnVlLCBpZiBub2RlIGlzIGEgc3ViZWxlbWVudCBvZiBhbiBlbGVtZW50IGNvbnRhaW5pbmQgbWl4ZWQgY29udGVudC5cclxuICAgICAqIEBwYXJhbSB2aXNpYmxlTmFtZXNwYWNlcyB2aXNpYmxlTmFtZXNwYWNlc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRvU2VyaWFsaXplVG9TdHJpbmcobm9kZTogTm9kZSwgb3B0aW9uczogWG1sU2VyaWFsaXplck9wdGlvbnMsIGJ1Zjogc3RyaW5nW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50TGV2ZWw6IG51bWJlciwgcGFydE9mTWl4ZWRDb250ZW50OiBib29sZWFuLCB2aXNpYmxlTmFtZXNwYWNlczogTmFtZXNwYWNlW10pIHtcclxuICAgICAgICBsZXQgY2hpbGQ6IE5vZGU7XHJcbiAgICAgICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5FTEVNRU5UX05PREU6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50Tm9kZTogRWxlbWVudCA9IDxFbGVtZW50PiBub2RlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cnMgPSBlbGVtZW50Tm9kZS5hdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gYXR0cnMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBlbGVtZW50Tm9kZS5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZU5hbWUgPSBlbGVtZW50Tm9kZS50YWdOYW1lO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudEhhc01peGVkQ29udGVudCA9IHRoaXMuaXNNaXhlZENvbnRlbnRFbGVtZW50KG5vZGVOYW1lLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJ0T2ZNaXhlZENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPCcgLCBub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0SW5kZW50ZWQob3B0aW9ucywgYnVmLCBpbmRlbnRMZXZlbCwgJzwnICwgbm9kZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgbmFtZXNwYWNlcyBmb3IgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHIgPSBhdHRycy5pdGVtKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyLnByZWZpeCA9PT0gJ3htbG5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlTmFtZXNwYWNlcy5wdXNoKHtwcmVmaXg6IGF0dHIubG9jYWxOYW1lLCBuYW1lc3BhY2U6IGF0dHIudmFsdWV9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGF0dHIubm9kZU5hbWUgPT09ICd4bWxucycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZU5hbWVzcGFjZXMucHVzaCh7cHJlZml4OiAnJywgbmFtZXNwYWNlOiBhdHRyLnZhbHVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHIgPSBhdHRycy5pdGVtKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lZWROYW1lc3BhY2VEZWZpbmUoYXR0ciwgdmlzaWJsZU5hbWVzcGFjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IGF0dHIucHJlZml4IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbnMgPSBwcmVmaXggPyAnIHhtbG5zOicgKyBwcmVmaXggOiAnIHhtbG5zJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2gobnMsICc9XCInLCB1cmksICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlTmFtZXNwYWNlcy5wdXNoKHtwcmVmaXg6IHByZWZpeCwgbmFtZXNwYWNlOiB1cml9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1NlcmlhbGl6ZVRvU3RyaW5nKGF0dHIsIG9wdGlvbnMsIGJ1ZiwgaW5kZW50TGV2ZWwsIGZhbHNlLCB2aXNpYmxlTmFtZXNwYWNlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgbmFtZXNwYWNlIGZvciBjdXJyZW50IG5vZGVcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5lZWROYW1lc3BhY2VEZWZpbmUoZWxlbWVudE5vZGUsIHZpc2libGVOYW1lc3BhY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZWZpeCA9IGVsZW1lbnROb2RlLnByZWZpeCB8fCAnJztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmkgPSBub2RlLm5hbWVzcGFjZVVSSTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBucyA9IHByZWZpeCA/ICcgeG1sbnM6JyArIHByZWZpeCA6ICcgeG1sbnMnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKG5zLCAnPVwiJywgdXJpLCAnXCInKTtcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlTmFtZXNwYWNlcy5wdXNoKHtwcmVmaXg6IHByZWZpeCwgbmFtZXNwYWNlOiB1cml9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGlzIGNkYXRhIGNoaWxkIG5vZGVcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGFzQ29tcGxleENvbnRlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSBjaGlsZC5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbXBsZXhDb250ZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2VyaWFsaXplVG9TdHJpbmcoY2hpbGQsIG9wdGlvbnMsIGJ1ZiwgaW5kZW50TGV2ZWwgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydE9mTWl4ZWRDb250ZW50IHx8IGVsZW1lbnRIYXNNaXhlZENvbnRlbnQsIHZpc2libGVOYW1lc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBjaGlsZC5uZXh0U2libGluZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJ0T2ZNaXhlZENvbnRlbnQgJiYgIWVsZW1lbnRIYXNNaXhlZENvbnRlbnQgJiYgaGFzQ29tcGxleENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRJbmRlbnRlZChvcHRpb25zLCBidWYsIGluZGVudExldmVsLCAnPC8nLCBub2RlTmFtZSwgJz4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC8nLCBub2RlTmFtZSwgJz4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcvPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGUuRE9DVU1FTlRfTk9ERTpcclxuICAgICAgICAgICAgY2FzZSBub2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREU6XHJcbiAgICAgICAgICAgICAgICBjaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9TZXJpYWxpemVUb1N0cmluZyhjaGlsZCwgb3B0aW9ucywgYnVmLCBpbmRlbnRMZXZlbCwgZmFsc2UsIHZpc2libGVOYW1lc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGUuQVRUUklCVVRFX05PREU6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyTm9kZSA9IDxBdHRyPiBub2RlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1Zi5wdXNoKCcgJywgYXR0ck5vZGUubmFtZSwgJz1cIicsIGF0dHJOb2RlLnZhbHVlLnJlcGxhY2UoL1s8JlwiXS9nLCB0aGlzLl94bWxFbmNvZGVyKSwgJ1wiJyk7XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5URVhUX05PREU6XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0Tm9kZSA9IDxUZXh0PiBub2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLmJlYXV0aWZ5IHx8IHBhcnRPZk1peGVkQ29udGVudCB8fCAhdGhpcy5jb250YWluc09ubHlXaGl0ZVNwYWNlKHRleHROb2RlLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1Zi5wdXNoKHRleHROb2RlLmRhdGEucmVwbGFjZSgvWzwmXS9nLCB0aGlzLl94bWxFbmNvZGVyKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5DREFUQV9TRUNUSU9OX05PREU6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZGF0YXNlY3Rpb25Ob2RlID0gPENEQVRBU2VjdGlvbj4gbm9kZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWYucHVzaCgnPCFbQ0RBVEFbJywgY2RhdGFzZWN0aW9uTm9kZS5kYXRhLCAnXV0+Jyk7XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5DT01NRU5UX05PREU6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50Tm9kZSA9IDxDb21tZW50PiBub2RlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1Zi5wdXNoKCc8IS0tJywgY29tbWVudE5vZGUuZGF0YSwgJy0tPicpO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGUuRE9DVU1FTlRfVFlQRV9OT0RFOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZG9jdW1lbnR0eXBlTm9kZSA9IDxEb2N1bWVudFR5cGU+IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwdWJpZCA9IGRvY3VtZW50dHlwZU5vZGUucHVibGljSWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzeXNpZCA9IGRvY3VtZW50dHlwZU5vZGUuc3lzdGVtSWQ7XHJcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPCFET0NUWVBFICcsIGRvY3VtZW50dHlwZU5vZGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHViaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIFBVQkxJQyBcIicsIHB1YmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3lzaWQgJiYgc3lzaWQgIT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXCIgXCInLCBzeXNpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcIj4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3lzaWQgJiYgc3lzaWQgIT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgU1lTVEVNIFwiJywgc3lzaWQsICdcIj4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJz4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBub2RlLlBST0NFU1NJTkdfSU5TVFJVQ1RJT05fTk9ERTpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpTm9kZSA9IDxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24+IG5vZGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmLnB1c2goICc8PycsIHBpTm9kZS50YXJnZXQsICcgJywgcGlOb2RlLmRhdGEsICc/PicpO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGUuRU5USVRZX1JFRkVSRU5DRV9OT0RFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1Zi5wdXNoKCcmJywgbm9kZS5ub2RlTmFtZSwgJzsnKTtcclxuICAgICAgICAgICAgLy8gY2FzZSBFTlRJVFlfTk9ERTpcclxuICAgICAgICAgICAgLy8gY2FzZSBOT1RBVElPTl9OT0RFOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJz8/Jywgbm9kZS5ub2RlTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmVlZE5hbWVzcGFjZURlZmluZShub2RlOiBFbGVtZW50IHwgQXR0ciwgdmlzaWJsZU5hbWVzcGFjZXM6IE5hbWVzcGFjZVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgcHJlZml4ID0gbm9kZS5wcmVmaXggfHwgJyc7XHJcbiAgICAgICAgY29uc3QgdXJpID0gbm9kZS5uYW1lc3BhY2VVUkk7XHJcbiAgICAgICAgaWYgKCFwcmVmaXggJiYgIXVyaSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcmVmaXggPT09ICd4bWwnICYmIHVyaSA9PT0gJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSdcclxuICAgICAgICAgICAgfHwgdXJpID09PSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpID0gdmlzaWJsZU5hbWVzcGFjZXMubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgY29uc3QgbnMgPSB2aXNpYmxlTmFtZXNwYWNlc1tpXTtcclxuICAgICAgICAgICAgLy8gZ2V0IG5hbWVzcGFjZSBwcmVmaXhcclxuICAgICAgICAgICAgaWYgKG5zLnByZWZpeCA9PT0gcHJlZml4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnMubmFtZXNwYWNlICE9PSB1cmk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfeG1sRW5jb2RlcihjOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBjID09PSAnPCcgJiYgJyZsdDsnIHx8XHJcbiAgICAgICAgICAgIGMgPT09ICc+JyAmJiAnJmd0OycgfHxcclxuICAgICAgICAgICAgYyA9PT0gJyYnICYmICcmYW1wOycgfHxcclxuICAgICAgICAgICAgYyA9PT0gJ1wiJyAmJiAnJnF1b3Q7JyB8fFxyXG4gICAgICAgICAgICAnJiMnICsgYy5jaGFyQ29kZUF0KDApICsgJzsnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3V0cHV0SW5kZW50ZWQob3B0aW9uczogWG1sU2VyaWFsaXplck9wdGlvbnMsIGJ1Zjogc3RyaW5nW10sIGluZGVudExldmVsOiBudW1iZXIsIC4uLm91dHB1dFBhcnRzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmIChvcHRpb25zLmJlYXV0aWZ5KSB7XHJcbiAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4nKTtcclxuICAgICAgICAgICAgaWYgKGluZGVudExldmVsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYnVmLnB1c2godGhpcy5pbmRlbnRhdGlvblN0cmluZyhvcHRpb25zLCBpbmRlbnRMZXZlbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1Zi5wdXNoKC4uLm91dHB1dFBhcnRzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluZGVudGF0aW9uU3RyaW5nKG9wdGlvbnM6IFhtbFNlcmlhbGl6ZXJPcHRpb25zLCBpbmRlbnRMZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBpbmRlbnQgPSAob3B0aW9ucy5pbmRlbnRTdHJpbmcpID8gb3B0aW9ucy5pbmRlbnRTdHJpbmcgOiBERUZBVUxUX0lOREVOVF9TVFJJTkc7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZW50TGV2ZWw7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgKyBpbmRlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUZXN0LCB3ZXRoZXIgdGFnTmFtZSBpcyBhbiBlbGVtZW50IGNvbnRhaW5pbmcgbWl4ZWQgY29udGVudC5cclxuICAgICAqIEBwYXJhbSB0YWdOYW1lIHRhZ05hbWVcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc01peGVkQ29udGVudEVsZW1lbnQodGFnTmFtZTogc3RyaW5nLCBvcHRpb25zOiBYbWxTZXJpYWxpemVyT3B0aW9ucyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubWl4ZWRDb250ZW50RWxlbWVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhb3B0aW9ucy5taXhlZENvbnRlbnRFbGVtZW50cy5maW5kKCh0YWcpID0+IHRhZyA9PT0gdGFnTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnRhaW5zT25seVdoaXRlU3BhY2UodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0ZXh0LmNoYXJBdChpKTtcclxuICAgICAgICAgICAgaWYgKCEoYyA9PT0gJyAnIHx8IGMgPT09ICdcXHQnIHx8IGMgPT09ICdcXHInIHx8IGMgPT09ICdcXG4nKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==