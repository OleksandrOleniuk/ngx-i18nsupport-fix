/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DEFAULT_INDENT_STRING = '  ';
var XmlSerializer = /** @class */ (function () {
    function XmlSerializer() {
    }
    /**
     * Serialze xml document to string.
     * @param document the document
     * @param options can be used to activate beautifying.
     */
    /**
     * Serialze xml document to string.
     * @param {?} document the document
     * @param {?=} options can be used to activate beautifying.
     * @return {?}
     */
    XmlSerializer.prototype.serializeToString = /**
     * Serialze xml document to string.
     * @param {?} document the document
     * @param {?=} options can be used to activate beautifying.
     * @return {?}
     */
    function (document, options) {
        /** @type {?} */
        var buf = [];
        /** @type {?} */
        var visibleNamespaces = [];
        /** @type {?} */
        var refNode = document.documentElement;
        /** @type {?} */
        var prefix = refNode.prefix;
        /** @type {?} */
        var uri = refNode.namespaceURI;
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
    };
    /**
     * Main format method that does all the work.
     * Outputs a node to the outputbuffer.
     * @param node the node to be formatted.
     * @param options options
     * @param buf outputbuffer, new output will be appended to this array.
     * @param indentLevel Lever of indentation for formatted output.
     * @param partOfMixedContent true, if node is a subelement of an element containind mixed content.
     * @param visibleNamespaces visibleNamespaces
     */
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
    XmlSerializer.prototype.doSerializeToString = /**
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
    function (node, options, buf, indentLevel, partOfMixedContent, visibleNamespaces) {
        /** @type {?} */
        var child;
        switch (node.nodeType) {
            case node.ELEMENT_NODE:
                /** @type {?} */
                var elementNode = (/** @type {?} */ (node));
                /** @type {?} */
                var attrs = elementNode.attributes;
                /** @type {?} */
                var len = attrs.length;
                child = elementNode.firstChild;
                /** @type {?} */
                var nodeName = elementNode.tagName;
                /** @type {?} */
                var elementHasMixedContent = this.isMixedContentElement(nodeName, options);
                if (partOfMixedContent) {
                    buf.push('<', nodeName);
                }
                else {
                    this.outputIndented(options, buf, indentLevel, '<', nodeName);
                }
                for (var i = 0; i < len; i++) {
                    // add namespaces for attributes
                    /** @type {?} */
                    var attr = attrs.item(i);
                    if (attr.prefix === 'xmlns') {
                        visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
                    }
                    else if (attr.nodeName === 'xmlns') {
                        visibleNamespaces.push({ prefix: '', namespace: attr.value });
                    }
                }
                for (var i = 0; i < len; i++) {
                    /** @type {?} */
                    var attr = attrs.item(i);
                    if (this.needNamespaceDefine(attr, visibleNamespaces)) {
                        /** @type {?} */
                        var prefix = attr.prefix || '';
                        /** @type {?} */
                        var uri = attr.namespaceURI;
                        /** @type {?} */
                        var ns = prefix ? ' xmlns:' + prefix : ' xmlns';
                        buf.push(ns, '="', uri, '"');
                        visibleNamespaces.push({ prefix: prefix, namespace: uri });
                    }
                    this.doSerializeToString(attr, options, buf, indentLevel, false, visibleNamespaces);
                }
                // add namespace for current node
                if (this.needNamespaceDefine(elementNode, visibleNamespaces)) {
                    /** @type {?} */
                    var prefix = elementNode.prefix || '';
                    /** @type {?} */
                    var uri = node.namespaceURI;
                    /** @type {?} */
                    var ns = prefix ? ' xmlns:' + prefix : ' xmlns';
                    buf.push(ns, '="', uri, '"');
                    visibleNamespaces.push({ prefix: prefix, namespace: uri });
                }
                if (child) {
                    buf.push('>');
                    // if is cdata child node
                    /** @type {?} */
                    var hasComplexContent = false;
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
                var attrNode = (/** @type {?} */ (node));
                return buf.push(' ', attrNode.name, '="', attrNode.value.replace(/[<&"]/g, this._xmlEncoder), '"');
            case node.TEXT_NODE:
                /** @type {?} */
                var textNode = (/** @type {?} */ (node));
                if (!options.beautify || partOfMixedContent || !this.containsOnlyWhiteSpace(textNode.data)) {
                    return buf.push(textNode.data.replace(/[<&]/g, this._xmlEncoder));
                }
                return;
            case node.CDATA_SECTION_NODE:
                /** @type {?} */
                var cdatasectionNode = (/** @type {?} */ (node));
                return buf.push('<![CDATA[', cdatasectionNode.data, ']]>');
            case node.COMMENT_NODE:
                /** @type {?} */
                var commentNode = (/** @type {?} */ (node));
                return buf.push('<!--', commentNode.data, '-->');
            case node.DOCUMENT_TYPE_NODE:
                /** @type {?} */
                var documenttypeNode = (/** @type {?} */ (node));
                /** @type {?} */
                var pubid = documenttypeNode.publicId;
                /** @type {?} */
                var sysid = documenttypeNode.systemId;
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
                var piNode = (/** @type {?} */ (node));
                return buf.push('<?', piNode.target, ' ', piNode.data, '?>');
            case node.ENTITY_REFERENCE_NODE:
                return buf.push('&', node.nodeName, ';');
            // case ENTITY_NODE:
            // case NOTATION_NODE:
            default:
                buf.push('??', node.nodeName);
        }
    };
    /**
     * @private
     * @param {?} node
     * @param {?} visibleNamespaces
     * @return {?}
     */
    XmlSerializer.prototype.needNamespaceDefine = /**
     * @private
     * @param {?} node
     * @param {?} visibleNamespaces
     * @return {?}
     */
    function (node, visibleNamespaces) {
        /** @type {?} */
        var prefix = node.prefix || '';
        /** @type {?} */
        var uri = node.namespaceURI;
        if (!prefix && !uri) {
            return false;
        }
        if (prefix === 'xml' && uri === 'http://www.w3.org/XML/1998/namespace'
            || uri === 'http://www.w3.org/2000/xmlns/') {
            return false;
        }
        /** @type {?} */
        var i = visibleNamespaces.length;
        while (i--) {
            /** @type {?} */
            var ns = visibleNamespaces[i];
            // get namespace prefix
            if (ns.prefix === prefix) {
                return ns.namespace !== uri;
            }
        }
        return true;
    };
    /**
     * @private
     * @param {?} c
     * @return {?}
     */
    XmlSerializer.prototype._xmlEncoder = /**
     * @private
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return c === '<' && '&lt;' ||
            c === '>' && '&gt;' ||
            c === '&' && '&amp;' ||
            c === '"' && '&quot;' ||
            '&#' + c.charCodeAt(0) + ';';
    };
    /**
     * @private
     * @param {?} options
     * @param {?} buf
     * @param {?} indentLevel
     * @param {...?} outputParts
     * @return {?}
     */
    XmlSerializer.prototype.outputIndented = /**
     * @private
     * @param {?} options
     * @param {?} buf
     * @param {?} indentLevel
     * @param {...?} outputParts
     * @return {?}
     */
    function (options, buf, indentLevel) {
        var outputParts = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            outputParts[_i - 3] = arguments[_i];
        }
        if (options.beautify) {
            buf.push('\n');
            if (indentLevel > 0) {
                buf.push(this.indentationString(options, indentLevel));
            }
        }
        buf.push.apply(buf, tslib_1.__spread(outputParts));
    };
    /**
     * @private
     * @param {?} options
     * @param {?} indentLevel
     * @return {?}
     */
    XmlSerializer.prototype.indentationString = /**
     * @private
     * @param {?} options
     * @param {?} indentLevel
     * @return {?}
     */
    function (options, indentLevel) {
        /** @type {?} */
        var indent = (options.indentString) ? options.indentString : DEFAULT_INDENT_STRING;
        /** @type {?} */
        var result = '';
        for (var i = 0; i < indentLevel; i++) {
            result = result + indent;
        }
        return result;
    };
    /**
     * Test, wether tagName is an element containing mixed content.
     * @param tagName tagName
     * @param options options
     */
    /**
     * Test, wether tagName is an element containing mixed content.
     * @private
     * @param {?} tagName tagName
     * @param {?} options options
     * @return {?}
     */
    XmlSerializer.prototype.isMixedContentElement = /**
     * Test, wether tagName is an element containing mixed content.
     * @private
     * @param {?} tagName tagName
     * @param {?} options options
     * @return {?}
     */
    function (tagName, options) {
        if (options && options.mixedContentElements) {
            return !!options.mixedContentElements.find((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag === tagName; }));
        }
        else {
            return false;
        }
    };
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    XmlSerializer.prototype.containsOnlyWhiteSpace = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        for (var i = 0; i < text.length; i++) {
            /** @type {?} */
            var c = text.charAt(i);
            if (!(c === ' ' || c === '\t' || c === '\r' || c === '\n')) {
                return false;
            }
        }
        return true;
    };
    return XmlSerializer;
}());
export { XmlSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC1saWIvIiwic291cmNlcyI6WyJpbXBsL3htbC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsd0JBR0M7OztJQUZHLDJCQUFlOztJQUNmLDhCQUFrQjs7Ozs7O0FBTXRCLDBDQUlDOzs7SUFIRyx3Q0FBbUI7O0lBQ25CLDRDQUFzQjs7SUFDdEIsb0RBQWdDOzs7SUFHOUIscUJBQXFCLEdBQUcsSUFBSTtBQUVsQztJQUVJO0lBRUEsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCx5Q0FBaUI7Ozs7OztJQUFqQixVQUFrQixRQUFrQixFQUFFLE9BQThCOztZQUMxRCxHQUFHLEdBQUcsRUFBRTs7WUFDVixpQkFBaUIsR0FBZ0IsRUFBRTs7WUFDakMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlOztZQUNwQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU07O1lBQ3JCLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWTtRQUVoQyxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZCLE1BQU0sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDaEIsaUJBQWlCLEdBQUc7b0JBQ2hCLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO29CQUM5Qiw0QkFBNEI7aUJBQy9CLENBQUM7YUFDTDtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMs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LE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDNUI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSyw2Q0FBcUI7Ozs7Ozs7SUFBN0IsVUFBOEIsT0FBZSxFQUFFLE9BQTZCO1FBQ3hFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRTtZQUN6QyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSTs7OztZQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsR0FBRyxLQUFLLE9BQU8sRUFBZixDQUFlLEVBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0gsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDOzs7Ozs7SUFFTyw4Q0FBc0I7Ozs7O0lBQTlCLFVBQStCLElBQVk7UUFDdkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUM1QixDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUN4RCxPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQS9PRCxJQStPQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBBbiBYbWxTZXJpYWxpemVyIHRoYXQgc3VwcG9ydHMgZm9ybWF0dGluZy5cclxuICogT3JpZ2luYWwgY29kZSBpcyBiYXNlZCBvbiBbeG1sZG9tXShodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS94bWxkb20pXHJcbiAqIEl0IGlzIGV4dGVuZGVkIHRvIHN1cHBvcnQgZm9ybWF0dGluZyBpbmNsdWRpbmcgaGFuZGxpbmcgb2YgZWxlbWVudHMgd2l0aCBtaXhlZCBjb250ZW50LlxyXG4gKiBFeGFtcGxlIGZvcm1hdHRlZCBvdXRwdXQ6XHJcbiAqIDxwcmU+XHJcbiAqICAgICA8ZG9jPlxyXG4gKiAgICAgICAgIDxlbGVtZW50PkFuIGVsZW1lbnQgd2l0aFxyXG4gKiAgICAgICAgICAgICA8Yj5taXhlZDwvYj5cclxuICogICAgICAgICAgICAgIGNvbnRlbnRcclxuICogICAgICAgICA8L2VsZW1lbnQ+XHJcbiAqICAgICA8L2RvYz5cclxuICogPC9wcmU+XHJcbiAqIFNhbWUgd2hlbiBcImVsZW1lbnRcIiBpcyBpbmRpY2F0ZWQgYXMgXCJtaXhlZENvbnRlbnRFbGVtZW50XCI6XHJcbiAqIDxwcmU+XHJcbiAqICAgICA8ZG9jPlxyXG4gKiAgICAgICAgIDxlbGVtZW50PkFuIGVsZW1lbnQgd2l0aCA8Yj5taXhlZDwvYj4gY29udGVudDwvZWxlbWVudD5cclxuICogICAgIDwvZG9jPlxyXG4gKiA8L3ByZT5cclxuICovXHJcblxyXG5pbnRlcmZhY2UgTmFtZXNwYWNlIHtcclxuICAgIHByZWZpeDogc3RyaW5nO1xyXG4gICAgbmFtZXNwYWNlOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIHVzZWQgdG8gY29udHJvbCB0aGUgZm9ybWF0dGluZ1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBYbWxTZXJpYWxpemVyT3B0aW9ucyB7XHJcbiAgICBiZWF1dGlmeT86IGJvb2xlYW47IC8vIHNldCB0byBhY3RpdmF0ZSBiZWF1dGlmeVxyXG4gICAgaW5kZW50U3RyaW5nPzogc3RyaW5nOyAvLyBTZXF1ZW5jZSB1c2VzIGZvciBpbmRlbnRhdGlvbiwgbXVzdCBvbmx5IGNvbnRhaW4gd2hpdGUgc3BhY2UgY2hhcnMsIGUuZy4gXCIgIFwiIG9yIFwiICAgIFwiIG9yIFwiXFx0XCJcclxuICAgIG1peGVkQ29udGVudEVsZW1lbnRzPzogc3RyaW5nW107IC8vIE5hbWVzIG9mIGVsZW1lbnRzIGNvbnRhaW5pbmcgbWl4ZWQgY29udGVudCAodGhlc2UgYXJlIG5vdCBiZWF1dGlmaWVkKVxyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX0lOREVOVF9TVFJJTkcgPSAnICAnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhtbFNlcmlhbGl6ZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlcmlhbHplIHhtbCBkb2N1bWVudCB0byBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0gZG9jdW1lbnQgdGhlIGRvY3VtZW50XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBjYW4gYmUgdXNlZCB0byBhY3RpdmF0ZSBiZWF1dGlmeWluZy5cclxuICAgICAqL1xyXG4gICAgc2VyaWFsaXplVG9TdHJpbmcoZG9jdW1lbnQ6IERvY3VtZW50LCBvcHRpb25zPzogWG1sU2VyaWFsaXplck9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGJ1ZiA9IFtdO1xyXG4gICAgICAgIGxldCB2aXNpYmxlTmFtZXNwYWNlczogTmFtZXNwYWNlW10gPSBbXTtcclxuICAgICAgICBjb25zdCByZWZOb2RlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgICAgIGxldCBwcmVmaXggPSByZWZOb2RlLnByZWZpeDtcclxuICAgICAgICBjb25zdCB1cmkgPSByZWZOb2RlLm5hbWVzcGFjZVVSSTtcclxuXHJcbiAgICAgICAgaWYgKHVyaSAmJiBwcmVmaXggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwcmVmaXggPSByZWZOb2RlLmxvb2t1cFByZWZpeCh1cmkpO1xyXG4gICAgICAgICAgICBpZiAocHJlZml4ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZpc2libGVOYW1lc3BhY2VzID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIHtuYW1lc3BhY2U6IHVyaSwgcHJlZml4OiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHtuYW1lc3BhY2U6dXJpLHByZWZpeDonJ31cclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuaW5kZW50U3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb250YWluc09ubHlXaGl0ZVNwYWNlKG9wdGlvbnMuaW5kZW50U3RyaW5nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbmRlbnRTdHJpbmcgbXVzdCBub3QgY29udGFpbiBub24gd2hpdGUgY2hhcmFjdGVycycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZG9TZXJpYWxpemVUb1N0cmluZyhkb2N1bWVudCwgb3B0aW9ucywgYnVmLCAwLCBmYWxzZSwgdmlzaWJsZU5hbWVzcGFjZXMpO1xyXG4gICAgICAgIHJldHVybiBidWYuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYWluIGZvcm1hdCBtZXRob2QgdGhhdCBkb2VzIGFsbCB0aGUgd29yay5cclxuICAgICAqIE91dHB1dHMgYSBub2RlIHRvIHRoZSBvdXRwdXRidWZmZXIuXHJcbiAgICAgKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSB0byBiZSBmb3JtYXR0ZWQuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0gYnVmIG91dHB1dGJ1ZmZlciwgbmV3IG91dHB1dCB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoaXMgYXJyYXkuXHJcbiAgICAgKiBAcGFyYW0gaW5kZW50TGV2ZWwgTGV2ZXIgb2YgaW5kZW50YXRpb24gZm9yIGZvcm1hdHRlZCBvdXRwdXQuXHJcbiAgICAgKiBAcGFyYW0gcGFydE9mTWl4ZWRDb250ZW50IHRydWUsIGlmIG5vZGUgaXMgYSBzdWJlbGVtZW50IG9mIGFuIGVsZW1lbnQgY29udGFpbmluZCBtaXhlZCBjb250ZW50LlxyXG4gICAgICogQHBhcmFtIHZpc2libGVOYW1lc3BhY2VzIHZpc2libGVOYW1lc3BhY2VzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZG9TZXJpYWxpemVUb1N0cmluZyhub2RlOiBOb2RlLCBvcHRpb25zOiBYbWxTZXJpYWxpemVyT3B0aW9ucywgYnVmOiBzdHJpbmdbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnRMZXZlbDogbnVtYmVyLCBwYXJ0T2ZNaXhlZENvbnRlbnQ6IGJvb2xlYW4sIHZpc2libGVOYW1lc3BhY2VzOiBOYW1lc3BhY2VbXSkge1xyXG4gICAgICAgIGxldCBjaGlsZDogTm9kZTtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUubm9kZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBub2RlLkVMRU1FTlRfTk9ERTpcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnROb2RlOiBFbGVtZW50ID0gPEVsZW1lbnQ+IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRycyA9IGVsZW1lbnROb2RlLmF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBhdHRycy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBjaGlsZCA9IGVsZW1lbnROb2RlLmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlTmFtZSA9IGVsZW1lbnROb2RlLnRhZ05hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50SGFzTWl4ZWRDb250ZW50ID0gdGhpcy5pc01peGVkQ29udGVudEVsZW1lbnQobm9kZU5hbWUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnRPZk1peGVkQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8JyAsIG5vZGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRwdXRJbmRlbnRlZChvcHRpb25zLCBidWYsIGluZGVudExldmVsLCAnPCcgLCBub2RlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFkZCBuYW1lc3BhY2VzIGZvciBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGF0dHIucHJlZml4ID09PSAneG1sbnMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGVOYW1lc3BhY2VzLnB1c2goe3ByZWZpeDogYXR0ci5sb2NhbE5hbWUsIG5hbWVzcGFjZTogYXR0ci52YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0ci5ub2RlTmFtZSA9PT0gJ3htbG5zJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlTmFtZXNwYWNlcy5wdXNoKHtwcmVmaXg6ICcnLCBuYW1lc3BhY2U6IGF0dHIudmFsdWV9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJzLml0ZW0oaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmVlZE5hbWVzcGFjZURlZmluZShhdHRyLCB2aXNpYmxlTmFtZXNwYWNlcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gYXR0ci5wcmVmaXggfHwgJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVyaSA9IGF0dHIubmFtZXNwYWNlVVJJO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBucyA9IHByZWZpeCA/ICcgeG1sbnM6JyArIHByZWZpeCA6ICcgeG1sbnMnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChucywgJz1cIicsIHVyaSwgJ1wiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGVOYW1lc3BhY2VzLnB1c2goe3ByZWZpeDogcHJlZml4LCBuYW1lc3BhY2U6IHVyaX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvU2VyaWFsaXplVG9TdHJpbmcoYXR0ciwgb3B0aW9ucywgYnVmLCBpbmRlbnRMZXZlbCwgZmFsc2UsIHZpc2libGVOYW1lc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGFkZCBuYW1lc3BhY2UgZm9yIGN1cnJlbnQgbm9kZVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmVlZE5hbWVzcGFjZURlZmluZShlbGVtZW50Tm9kZSwgdmlzaWJsZU5hbWVzcGFjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gZWxlbWVudE5vZGUucHJlZml4IHx8ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVyaSA9IG5vZGUubmFtZXNwYWNlVVJJO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5zID0gcHJlZml4ID8gJyB4bWxuczonICsgcHJlZml4IDogJyB4bWxucyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2gobnMsICc9XCInLCB1cmksICdcIicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVOYW1lc3BhY2VzLnB1c2goe3ByZWZpeDogcHJlZml4LCBuYW1lc3BhY2U6IHVyaX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc+Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgaXMgY2RhdGEgY2hpbGQgbm9kZVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoYXNDb21wbGV4Q29udGVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IGNoaWxkLkVMRU1FTlRfTk9ERSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzQ29tcGxleENvbnRlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9TZXJpYWxpemVUb1N0cmluZyhjaGlsZCwgb3B0aW9ucywgYnVmLCBpbmRlbnRMZXZlbCArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0T2ZNaXhlZENvbnRlbnQgfHwgZWxlbWVudEhhc01peGVkQ29udGVudCwgdmlzaWJsZU5hbWVzcGFjZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGNoaWxkLm5leHRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnRPZk1peGVkQ29udGVudCAmJiAhZWxlbWVudEhhc01peGVkQ29udGVudCAmJiBoYXNDb21wbGV4Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dEluZGVudGVkKG9wdGlvbnMsIGJ1ZiwgaW5kZW50TGV2ZWwsICc8LycsIG5vZGVOYW1lLCAnPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8LycsIG5vZGVOYW1lLCAnPicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJy8+Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5ET0NVTUVOVF9OT0RFOlxyXG4gICAgICAgICAgICBjYXNlIG5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERTpcclxuICAgICAgICAgICAgICAgIGNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1NlcmlhbGl6ZVRvU3RyaW5nKGNoaWxkLCBvcHRpb25zLCBidWYsIGluZGVudExldmVsLCBmYWxzZSwgdmlzaWJsZU5hbWVzcGFjZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5BVFRSSUJVVEVfTk9ERTpcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJOb2RlID0gPEF0dHI+IG5vZGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmLnB1c2goJyAnLCBhdHRyTm9kZS5uYW1lLCAnPVwiJywgYXR0ck5vZGUudmFsdWUucmVwbGFjZSgvWzwmXCJdL2csIHRoaXMuX3htbEVuY29kZXIpLCAnXCInKTtcclxuICAgICAgICAgICAgY2FzZSBub2RlLlRFWFRfTk9ERTpcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHROb2RlID0gPFRleHQ+IG5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMuYmVhdXRpZnkgfHwgcGFydE9mTWl4ZWRDb250ZW50IHx8ICF0aGlzLmNvbnRhaW5zT25seVdoaXRlU3BhY2UodGV4dE5vZGUuZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVmLnB1c2godGV4dE5vZGUuZGF0YS5yZXBsYWNlKC9bPCZdL2csIHRoaXMuX3htbEVuY29kZXIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSBub2RlLkNEQVRBX1NFQ1RJT05fTk9ERTpcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNkYXRhc2VjdGlvbk5vZGUgPSA8Q0RBVEFTZWN0aW9uPiBub2RlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1Zi5wdXNoKCc8IVtDREFUQVsnLCBjZGF0YXNlY3Rpb25Ob2RlLmRhdGEsICddXT4nKTtcclxuICAgICAgICAgICAgY2FzZSBub2RlLkNPTU1FTlRfTk9ERTpcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnROb2RlID0gPENvbW1lbnQ+IG5vZGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmLnB1c2goJzwhLS0nLCBjb21tZW50Tm9kZS5kYXRhLCAnLS0+Jyk7XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5ET0NVTUVOVF9UWVBFX05PREU6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkb2N1bWVudHR5cGVOb2RlID0gPERvY3VtZW50VHlwZT4gbm9kZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB1YmlkID0gZG9jdW1lbnR0eXBlTm9kZS5wdWJsaWNJZDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN5c2lkID0gZG9jdW1lbnR0eXBlTm9kZS5zeXN0ZW1JZDtcclxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8IURPQ1RZUEUgJywgZG9jdW1lbnR0eXBlTm9kZS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChwdWJpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgUFVCTElDIFwiJywgcHViaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzeXNpZCAmJiBzeXNpZCAhPT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcIiBcIicsIHN5c2lkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1wiPicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzeXNpZCAmJiBzeXNpZCAhPT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJyBTWVNURU0gXCInLCBzeXNpZCwgJ1wiPicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjYXNlIG5vZGUuUFJPQ0VTU0lOR19JTlNUUlVDVElPTl9OT0RFOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGlOb2RlID0gPFByb2Nlc3NpbmdJbnN0cnVjdGlvbj4gbm9kZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWYucHVzaCggJzw/JywgcGlOb2RlLnRhcmdldCwgJyAnLCBwaU5vZGUuZGF0YSwgJz8+Jyk7XHJcbiAgICAgICAgICAgIGNhc2Ugbm9kZS5FTlRJVFlfUkVGRVJFTkNFX05PREU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmLnB1c2goJyYnLCBub2RlLm5vZGVOYW1lLCAnOycpO1xyXG4gICAgICAgICAgICAvLyBjYXNlIEVOVElUWV9OT0RFOlxyXG4gICAgICAgICAgICAvLyBjYXNlIE5PVEFUSU9OX05PREU6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPz8nLCBub2RlLm5vZGVOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBuZWVkTmFtZXNwYWNlRGVmaW5lKG5vZGU6IEVsZW1lbnQgfCBBdHRyLCB2aXNpYmxlTmFtZXNwYWNlczogTmFtZXNwYWNlW10pOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBwcmVmaXggPSBub2RlLnByZWZpeCB8fCAnJztcclxuICAgICAgICBjb25zdCB1cmkgPSBub2RlLm5hbWVzcGFjZVVSSTtcclxuICAgICAgICBpZiAoIXByZWZpeCAmJiAhdXJpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByZWZpeCA9PT0gJ3htbCcgJiYgdXJpID09PSAnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJ1xyXG4gICAgICAgICAgICB8fCB1cmkgPT09ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGkgPSB2aXNpYmxlTmFtZXNwYWNlcy5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICBjb25zdCBucyA9IHZpc2libGVOYW1lc3BhY2VzW2ldO1xyXG4gICAgICAgICAgICAvLyBnZXQgbmFtZXNwYWNlIHByZWZpeFxyXG4gICAgICAgICAgICBpZiAobnMucHJlZml4ID09PSBwcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBucy5uYW1lc3BhY2UgIT09IHVyaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF94bWxFbmNvZGVyKGM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGMgPT09ICc8JyAmJiAnJmx0OycgfHxcclxuICAgICAgICAgICAgYyA9PT0gJz4nICYmICcmZ3Q7JyB8fFxyXG4gICAgICAgICAgICBjID09PSAnJicgJiYgJyZhbXA7JyB8fFxyXG4gICAgICAgICAgICBjID09PSAnXCInICYmICcmcXVvdDsnIHx8XHJcbiAgICAgICAgICAgICcmIycgKyBjLmNoYXJDb2RlQXQoMCkgKyAnOyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvdXRwdXRJbmRlbnRlZChvcHRpb25zOiBYbWxTZXJpYWxpemVyT3B0aW9ucywgYnVmOiBzdHJpbmdbXSwgaW5kZW50TGV2ZWw6IG51bWJlciwgLi4ub3V0cHV0UGFydHM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYmVhdXRpZnkpIHtcclxuICAgICAgICAgICAgYnVmLnB1c2goJ1xcbicpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZW50TGV2ZWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBidWYucHVzaCh0aGlzLmluZGVudGF0aW9uU3RyaW5nKG9wdGlvbnMsIGluZGVudExldmVsKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYnVmLnB1c2goLi4ub3V0cHV0UGFydHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5kZW50YXRpb25TdHJpbmcob3B0aW9uczogWG1sU2VyaWFsaXplck9wdGlvbnMsIGluZGVudExldmVsOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGluZGVudCA9IChvcHRpb25zLmluZGVudFN0cmluZykgPyBvcHRpb25zLmluZGVudFN0cmluZyA6IERFRkFVTFRfSU5ERU5UX1NUUklORztcclxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRlbnRMZXZlbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCArIGluZGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRlc3QsIHdldGhlciB0YWdOYW1lIGlzIGFuIGVsZW1lbnQgY29udGFpbmluZyBtaXhlZCBjb250ZW50LlxyXG4gICAgICogQHBhcmFtIHRhZ05hbWUgdGFnTmFtZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzTWl4ZWRDb250ZW50RWxlbWVudCh0YWdOYW1lOiBzdHJpbmcsIG9wdGlvbnM6IFhtbFNlcmlhbGl6ZXJPcHRpb25zKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5taXhlZENvbnRlbnRFbGVtZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm4gISFvcHRpb25zLm1peGVkQ29udGVudEVsZW1lbnRzLmZpbmQoKHRhZykgPT4gdGFnID09PSB0YWdOYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29udGFpbnNPbmx5V2hpdGVTcGFjZSh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgYyA9IHRleHQuY2hhckF0KGkpO1xyXG4gICAgICAgICAgICBpZiAoIShjID09PSAnICcgfHwgYyA9PT0gJ1xcdCcgfHwgYyA9PT0gJ1xccicgfHwgYyA9PT0gJ1xcbicpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuIl19