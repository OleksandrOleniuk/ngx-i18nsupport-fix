import { NgModule } from '@angular/core';
import { __spread, __extends } from 'tslib';
import { isNullOrUndefined, isString, format } from 'util';
import { XMLSerializer, DOMParser } from 'xmldom';
import * as Tokenizr from 'tokenizr';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxI18nsupportLibModule = /** @class */ (function () {
    function NgxI18nsupportLibModule() {
    }
    NgxI18nsupportLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: []
                },] }
    ];
    return NgxI18nsupportLibModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 08.05.2017.
 * Some constant values used in the API.
 */
/**
 * supported file formats
 * @type {?}
 */
var FORMAT_XLIFF12 = 'xlf';
/** @type {?} */
var FORMAT_XLIFF20 = 'xlf2';
/** @type {?} */
var FORMAT_XMB = 'xmb';
/** @type {?} */
var FORMAT_XTB = 'xtb';
/**
 * File types
 * (returned by fileType() method)
 * @type {?}
 */
var FILETYPE_XLIFF12 = 'XLIFF 1.2';
/** @type {?} */
var FILETYPE_XLIFF20 = 'XLIFF 2.0';
/** @type {?} */
var FILETYPE_XMB = 'XMB';
/** @type {?} */
var FILETYPE_XTB = 'XTB';
/**
 * State NEW.
 * Signals an untranslated unit.
 * @type {?}
 */
var STATE_NEW = 'new';
/**
 * State TRANSLATED.
 * Signals a translated unit, that is not reviewed until now.
 * @type {?}
 */
var STATE_TRANSLATED = 'translated';
/**
 * State FINAL.
 * Signals a translated unit, that is reviewed and ready for use.
 * @type {?}
 */
var STATE_FINAL = 'final';
/**
 * Default format, contains placeholders, html markup.
 * @type {?}
 */
var NORMALIZATION_FORMAT_DEFAULT = 'default';
/**
 * Format for usage in ngxtranslate messages.
 * Placeholder are in the form {{n}}, no html markup.
 * @type {?}
 */
var NORMALIZATION_FORMAT_NGXTRANSLATE = 'ngxtranslate';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        buf.push.apply(buf, __spread(outputParts));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 09.05.2017.
 * Abstract superclass for all implementations of ITranslationMessagesFile.
 * @abstract
 */
var /**
 * Created by roobm on 09.05.2017.
 * Abstract superclass for all implementations of ITranslationMessagesFile.
 * @abstract
 */
AbstractTranslationMessagesFile = /** @class */ (function () {
    function AbstractTranslationMessagesFile() {
        this.transUnits = null;
        this._warnings = [];
    }
    /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @param xmlString xmlString
     * @param path path
     * @param encoding encoding
     * @param optionalMaster optionalMaster
     */
    /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @protected
     * @param {?} xmlString xmlString
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMaster optionalMaster
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.parseContent = /**
     * Parse file content.
     * Sets _parsedDocument, line ending, encoding, etc.
     * @protected
     * @param {?} xmlString xmlString
     * @param {?} path path
     * @param {?} encoding encoding
     * @param {?=} optionalMaster optionalMaster
     * @return {?}
     */
    function (xmlString, path, encoding, optionalMaster) {
        this._filename = path;
        this._encoding = encoding;
        this._parsedDocument = new DOMParser().parseFromString(xmlString, 'text/xml');
        this._fileEndsWithEOL = xmlString.endsWith('\n');
    };
    /**
     * @protected
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.lazyInitializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this.transUnits)) {
            this.initializeTransUnits();
            this.countNumbers();
        }
    };
    /**
     * count units after changes of trans units
     */
    /**
     * count units after changes of trans units
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.countNumbers = /**
     * count units after changes of trans units
     * @return {?}
     */
    function () {
        var _this = this;
        this._numberOfTransUnitsWithMissingId = 0;
        this._numberOfUntranslatedTransUnits = 0;
        this._numberOfReviewedTransUnits = 0;
        this.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            if (isNullOrUndefined(tu.id) || tu.id === '') {
                _this._numberOfTransUnitsWithMissingId++;
            }
            /** @type {?} */
            var state = tu.targetState();
            if (isNullOrUndefined(state) || state === STATE_NEW) {
                _this._numberOfUntranslatedTransUnits++;
            }
            if (state === STATE_TRANSLATED) {
                _this._numberOfReviewedTransUnits++;
            }
        }));
    };
    /**
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.warnings = /**
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._warnings;
    };
    /**
     * Total number of translation units found in the file.
     */
    /**
     * Total number of translation units found in the file.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfTransUnits = /**
     * Total number of translation units found in the file.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this.transUnits.length;
    };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfUntranslatedTransUnits = /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._numberOfUntranslatedTransUnits;
    };
    /**
     * Number of translation units with state 'final'.
     */
    /**
     * Number of translation units with state 'final'.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfReviewedTransUnits = /**
     * Number of translation units with state 'final'.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._numberOfReviewedTransUnits;
    };
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     */
    /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.numberOfTransUnitsWithMissingId = /**
     * Number of translation units without translation found in the file.
     * These units have state 'translated'.
     * @return {?}
     */
    function () {
        this.lazyInitializeTransUnits();
        return this._numberOfTransUnitsWithMissingId;
    };
    /**
     * Loop over all Translation Units.
     * @param callback callback
     */
    /**
     * Loop over all Translation Units.
     * @param {?} callback callback
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.forEachTransUnit = /**
     * Loop over all Translation Units.
     * @param {?} callback callback
     * @return {?}
     */
    function (callback) {
        this.lazyInitializeTransUnits();
        this.transUnits.forEach((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) { return callback(tu); }));
    };
    /**
     * Get trans-unit with given id.
     * @param id id
     * @return trans-unit with given id.
     */
    /**
     * Get trans-unit with given id.
     * @param {?} id id
     * @return {?} trans-unit with given id.
     */
    AbstractTranslationMessagesFile.prototype.transUnitWithId = /**
     * Get trans-unit with given id.
     * @param {?} id id
     * @return {?} trans-unit with given id.
     */
    function (id) {
        this.lazyInitializeTransUnits();
        return this.transUnits.find((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) { return tu.id === id; }));
    };
    /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param targetPraefix targetPraefix
     */
    /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetPraefix targetPraefix
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.setNewTransUnitTargetPraefix = /**
     * Set the praefix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetPraefix targetPraefix
     * @return {?}
     */
    function (targetPraefix) {
        this.targetPraefix = targetPraefix;
    };
    /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return the praefix used when copying source to target.
     */
    /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the praefix used when copying source to target.
     */
    AbstractTranslationMessagesFile.prototype.getNewTransUnitTargetPraefix = /**
     * Get the praefix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the praefix used when copying source to target.
     */
    function () {
        return isNullOrUndefined(this.targetPraefix) ? '' : this.targetPraefix;
    };
    /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param targetSuffix targetSuffix
     */
    /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetSuffix targetSuffix
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.setNewTransUnitTargetSuffix = /**
     * Set the suffix used when copying source to target.
     * This is used by importNewTransUnit and createTranslationFileForLang methods.
     * (since 1.8.0)
     * @param {?} targetSuffix targetSuffix
     * @return {?}
     */
    function (targetSuffix) {
        this.targetSuffix = targetSuffix;
    };
    /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return the suffix used when copying source to target.
     */
    /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the suffix used when copying source to target.
     */
    AbstractTranslationMessagesFile.prototype.getNewTransUnitTargetSuffix = /**
     * Get the suffix used when copying source to target.
     * (since 1.8.0)
     * @return {?} the suffix used when copying source to target.
     */
    function () {
        return isNullOrUndefined(this.targetSuffix) ? '' : this.targetSuffix;
    };
    /**
     * Remove the trans-unit with the given id.
     * @param id id
     */
    /**
     * Remove the trans-unit with the given id.
     * @param {?} id id
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.removeTransUnitWithId = /**
     * Remove the trans-unit with the given id.
     * @param {?} id id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var tuNode = this._parsedDocument.getElementById(id);
        if (tuNode) {
            tuNode.parentNode.removeChild(tuNode);
            this.lazyInitializeTransUnits();
            this.transUnits = this.transUnits.filter((/**
             * @param {?} tu
             * @return {?}
             */
            function (tu) { return tu.id !== id; }));
            this.countNumbers();
        }
    };
    /**
     * The filename where the data is read from.
     */
    /**
     * The filename where the data is read from.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.filename = /**
     * The filename where the data is read from.
     * @return {?}
     */
    function () {
        return this._filename;
    };
    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     */
    /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.encoding = /**
     * The encoding if the xml content (UTF-8, ISO-8859-1, ...)
     * @return {?}
     */
    function () {
        return this._encoding;
    };
    /**
     * The xml content to be saved after changes are made.
     * @param beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     */
    /**
     * The xml content to be saved after changes are made.
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    AbstractTranslationMessagesFile.prototype.editedContent = /**
     * The xml content to be saved after changes are made.
     * @param {?=} beautifyOutput Flag whether to use pretty-data to format the output.
     * XMLSerializer produces some correct but strangely formatted output, which pretty-data can correct.
     * See issue #64 for details.
     * Default is false.
     * @return {?}
     */
    function (beautifyOutput) {
        /** @type {?} */
        var options = {};
        if (beautifyOutput === true) {
            options.beautify = true;
            options.indentString = '  ';
            options.mixedContentElements = this.elementsWithMixedContent();
        }
        /** @type {?} */
        var result = new XmlSerializer().serializeToString(this._parsedDocument, options);
        if (this._fileEndsWithEOL) {
            // add eol if there was eol in original source
            return result + '\n';
        }
        else {
            return result;
        }
    };
    return AbstractTranslationMessagesFile;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 10.05.2017.
 * Abstract superclass for all implementations of ITransUnit.
 * @abstract
 */
var /**
 * Created by roobm on 10.05.2017.
 * Abstract superclass for all implementations of ITransUnit.
 * @abstract
 */
AbstractTransUnit = /** @class */ (function () {
    function AbstractTransUnit(_element, _id, _translationMessagesFile) {
        this._element = _element;
        this._id = _id;
        this._translationMessagesFile = _translationMessagesFile;
    }
    Object.defineProperty(AbstractTransUnit.prototype, "id", {
        get: /**
         * @return {?}
         */
        function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The file the unit belongs to.,
     */
    /**
     * The file the unit belongs to.,
     * @return {?}
     */
    AbstractTransUnit.prototype.translationMessagesFile = /**
     * The file the unit belongs to.,
     * @return {?}
     */
    function () {
        return this._translationMessagesFile;
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetSourceContent = /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    AbstractTransUnit.prototype.sourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this._sourceContentNormalized)) {
            this._sourceContentNormalized = this.createSourceContentNormalized();
        }
        return this._sourceContentNormalized;
    };
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     */
    /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     * @return {?}
     */
    AbstractTransUnit.prototype.targetState = /**
     * State of the translation.
     * (on of new, translated, final)
     * Return values are defined as Constants STATE_...
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nativeState = this.nativeTargetState();
        return this.mapNativeStateToState(nativeState);
    };
    /**
     * Modify the target state.
     * @param newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     */
    /**
     * Modify the target state.
     * @param {?} newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     * @return {?}
     */
    AbstractTransUnit.prototype.setTargetState = /**
     * Modify the target state.
     * @param {?} newState one of the 3 allowed target states new, translated, final.
     * Constants STATE_...
     * Invalid states throw an error.
     * @return {?}
     */
    function (newState) {
        this.setNativeTargetState(this.mapStateToNativeState(newState));
        if (this.translationMessagesFile() instanceof AbstractTranslationMessagesFile) {
            ((/** @type {?} */ (this.translationMessagesFile()))).countNumbers();
        }
    };
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetSourceReferences = /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    AbstractTransUnit.prototype.supportsSetDescriptionAndMeaning = /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Check notes
     * @param newNotes the notes to add.
     * @throws an Error if any note contains description or meaning as from attribute.
     */
    /**
     * Check notes
     * @throws an Error if any note contains description or meaning as from attribute.
     * @protected
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    AbstractTransUnit.prototype.checkNotes = /**
     * Check notes
     * @throws an Error if any note contains description or meaning as from attribute.
     * @protected
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    function (newNotes) {
        // check from values
        /** @type {?} */
        var errorInFromNote = newNotes.find((/**
         * @param {?} note
         * @return {?}
         */
        function (note) { return note.from === 'description' || note.from === 'meaning'; }));
        if (!isNullOrUndefined(errorInFromNote)) {
            throw new Error('description or meaning are not allowed as from atttribute');
        }
    };
    /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return real xml element used for the trans unit.
     */
    /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return {?} real xml element used for the trans unit.
     */
    AbstractTransUnit.prototype.asXmlElement = /**
     * The real xml element used for the trans unit.
     * (internal usage only, a client should never need this)
     * @return {?} real xml element used for the trans unit.
     */
    function () {
        return this._element;
    };
    /**
     * Translate the trans unit.
     * @param translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     */
    /**
     * Translate the trans unit.
     * @param {?} translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     * @return {?}
     */
    AbstractTransUnit.prototype.translate = /**
     * Translate the trans unit.
     * @param {?} translation the translated string or (preferred) a normalized message.
     * The pure string can contain any markup and will not be checked.
     * So it can damage the document.
     * A normalized message prevents this.
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var translationNative;
        if (isString(translation)) {
            translationNative = (/** @type {?} */ (translation));
        }
        else {
            translationNative = ((/** @type {?} */ (translation))).asNativeString();
        }
        this.translateNative(translationNative);
        this.setTargetState(STATE_TRANSLATED);
    };
    /**
     * Test, wether message looks like ICU message.
     * @param message message
     * @return wether message looks like ICU message.
     */
    /**
     * Test, wether message looks like ICU message.
     * @param {?} message message
     * @return {?} wether message looks like ICU message.
     */
    AbstractTransUnit.prototype.isICUMessage = /**
     * Test, wether message looks like ICU message.
     * @param {?} message message
     * @return {?} wether message looks like ICU message.
     */
    function (message) {
        return this.messageParser().isICUMessageStart(message);
    };
    return AbstractTransUnit;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A part of a parsed message.
 * Can be a text, a placeholder, a tag
 */
/** @enum {number} */
var ParsedMessagePartType = {
    TEXT: 0,
    PLACEHOLDER: 1,
    START_TAG: 2,
    END_TAG: 3,
    EMPTY_TAG: 4,
    ICU_MESSAGE: 5,
    ICU_MESSAGE_REF: 6,
};
ParsedMessagePartType[ParsedMessagePartType.TEXT] = 'TEXT';
ParsedMessagePartType[ParsedMessagePartType.PLACEHOLDER] = 'PLACEHOLDER';
ParsedMessagePartType[ParsedMessagePartType.START_TAG] = 'START_TAG';
ParsedMessagePartType[ParsedMessagePartType.END_TAG] = 'END_TAG';
ParsedMessagePartType[ParsedMessagePartType.EMPTY_TAG] = 'EMPTY_TAG';
ParsedMessagePartType[ParsedMessagePartType.ICU_MESSAGE] = 'ICU_MESSAGE';
ParsedMessagePartType[ParsedMessagePartType.ICU_MESSAGE_REF] = 'ICU_MESSAGE_REF';
/**
 * @abstract
 */
var /**
 * @abstract
 */
ParsedMessagePart = /** @class */ (function () {
    function ParsedMessagePart(type) {
        this.type = type;
    }
    return ParsedMessagePart;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of just simple text.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of just simple text.
 */
ParsedMessagePartText = /** @class */ (function (_super) {
    __extends(ParsedMessagePartText, _super);
    function ParsedMessagePartText(text) {
        var _this = _super.call(this, ParsedMessagePartType.TEXT) || this;
        _this.text = text;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartText.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        return this.text;
    };
    return ParsedMessagePartText;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a placeholder.
 * Placeholders are numbered from 0 to n.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of a placeholder.
 * Placeholders are numbered from 0 to n.
 */
ParsedMessagePartPlaceholder = /** @class */ (function (_super) {
    __extends(ParsedMessagePartPlaceholder, _super);
    function ParsedMessagePartPlaceholder(index, disp) {
        var _this = _super.call(this, ParsedMessagePartType.PLACEHOLDER) || this;
        _this._index = index;
        _this._disp = disp;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartPlaceholder.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        if (format === NORMALIZATION_FORMAT_NGXTRANSLATE) {
            return '{{' + this._index + '}}';
        }
        return '{{' + this._index + '}}';
    };
    /**
     * @return {?}
     */
    ParsedMessagePartPlaceholder.prototype.index = /**
     * @return {?}
     */
    function () {
        return this._index;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartPlaceholder.prototype.disp = /**
     * @return {?}
     */
    function () {
        return this._disp;
    };
    return ParsedMessagePartPlaceholder;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
ParsedMessagePartStartTag = /** @class */ (function (_super) {
    __extends(ParsedMessagePartStartTag, _super);
    function ParsedMessagePartStartTag(tagname, idcounter) {
        var _this = _super.call(this, ParsedMessagePartType.START_TAG) || this;
        _this._tagname = tagname;
        _this._idcounter = idcounter;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartStartTag.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        if (this._idcounter === 0) {
            return '<' + this._tagname + '>';
        }
        else {
            return '<' + this._tagname + ' id="' + this._idcounter.toString() + '">';
        }
    };
    /**
     * @return {?}
     */
    ParsedMessagePartStartTag.prototype.tagName = /**
     * @return {?}
     */
    function () {
        return this._tagname;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartStartTag.prototype.idCounter = /**
     * @return {?}
     */
    function () {
        return this._idcounter;
    };
    return ParsedMessagePartStartTag;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message part consisting of a closing tag like </b> or </strange>.
 */
ParsedMessagePartEndTag = /** @class */ (function (_super) {
    __extends(ParsedMessagePartEndTag, _super);
    function ParsedMessagePartEndTag(tagname) {
        var _this = _super.call(this, ParsedMessagePartType.END_TAG) || this;
        _this._tagname = tagname;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartEndTag.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        return '</' + this._tagname + '>';
    };
    /**
     * @return {?}
     */
    ParsedMessagePartEndTag.prototype.tagName = /**
     * @return {?}
     */
    function () {
        return this._tagname;
    };
    return ParsedMessagePartEndTag;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Tokens
/**
 * Created by martin on 04.06.2017.
 * A tokenizer for ICU messages.
 * @type {?}
 */
var TEXT = 'TEXT';
/** @type {?} */
var CURLY_BRACE_OPEN = 'CURLY_BRACE_OPEN';
/** @type {?} */
var CURLY_BRACE_CLOSE = 'CURLY_BRACE_CLOSE';
/** @type {?} */
var COMMA = 'COMMA';
/** @type {?} */
var PLURAL = 'PLURAL';
/** @type {?} */
var SELECT = 'SELECT';
// states: default normal in_message
/** @type {?} */
var STATE_DEFAULT = 'default';
/** @type {?} */
var STATE_NORMAL = 'normal';
/** @type {?} */
var STATE_IN_MESSAGE = 'in_message';
var ICUMessageTokenizer = /** @class */ (function () {
    function ICUMessageTokenizer() {
    }
    /**
     * @private
     * @return {?}
     */
    ICUMessageTokenizer.prototype.getLexer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var lexer = new Tokenizr();
        /** @type {?} */
        var plaintext = '';
        /** @type {?} */
        var openedCurlyBracesInTextCounter = 0;
        lexer.before((/**
         * @param {?} ctx
         * @param {?} match
         * @param {?} rule
         * @return {?}
         */
        function (ctx, match, rule) {
            if (rule.name !== TEXT) {
                if (_this.containsNonWhiteSpace(plaintext)) {
                    ctx.accept(TEXT, plaintext);
                    plaintext = '';
                }
                else {
                    ctx.ignore();
                }
            }
        }));
        lexer.finish((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            if (_this.containsNonWhiteSpace(plaintext)) {
                ctx.accept(TEXT, plaintext);
            }
        }));
        // curly brace
        lexer.rule(STATE_DEFAULT, /{/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_NORMAL);
        }), CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /{/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(CURLY_BRACE_OPEN, match[0]);
            ctx.push(STATE_IN_MESSAGE);
        }), CURLY_BRACE_OPEN);
        lexer.rule(STATE_NORMAL, /}/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.pop();
            ctx.accept(CURLY_BRACE_CLOSE, match[0]);
        }), CURLY_BRACE_CLOSE);
        // masked ' { and }
        lexer.rule(STATE_IN_MESSAGE, /'[{}]?'/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            if (match[0] === '\'\'') {
                plaintext += '\'';
            }
            else if (match[0] === '\'{\'') {
                plaintext += '{';
            }
            else if (match[0] === '\'}\'') {
                plaintext += '}';
            }
            ctx.ignore();
        }), TEXT);
        lexer.rule(STATE_IN_MESSAGE, /./, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            /** @type {?} */
            var char = match[0];
            if (char === '{') {
                openedCurlyBracesInTextCounter++;
                plaintext += match[0];
                ctx.ignore();
            }
            else if (char === '}') {
                if (openedCurlyBracesInTextCounter > 0) {
                    openedCurlyBracesInTextCounter--;
                    plaintext += match[0];
                    ctx.ignore();
                }
                else {
                    ctx.pop();
                    ctx.accept(TEXT, plaintext);
                    plaintext = '';
                    ctx.accept(CURLY_BRACE_CLOSE, match[0]);
                }
            }
            else {
                plaintext += match[0];
                ctx.ignore();
            }
        }), TEXT);
        // comma
        lexer.rule(STATE_NORMAL, /,/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(COMMA, match[0]);
        }), COMMA);
        // keywords plural and select
        lexer.rule(STATE_NORMAL, /plural/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(PLURAL, match[0]);
        }), PLURAL);
        lexer.rule(STATE_NORMAL, /select/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(SELECT, match[0]);
        }), SELECT);
        // text
        lexer.rule(/./, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT);
        lexer.rule(/[\s]+/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT);
        return lexer;
    };
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    ICUMessageTokenizer.prototype.containsNonWhiteSpace = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        for (var i = 0; i < text.length; i++) {
            if (!/\s/.test(text.charAt(i))) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    ICUMessageTokenizer.prototype.tokenize = /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    function (normalizedMessage) {
        /** @type {?} */
        var lexer = this.getLexer();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    };
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    ICUMessageTokenizer.prototype.input = /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    function (normalizedMessage) {
        this.lexer = this.getLexer();
        this.lexer.input(normalizedMessage);
    };
    /**
     * @return {?}
     */
    ICUMessageTokenizer.prototype.next = /**
     * @return {?}
     */
    function () {
        return this.lexer.token();
    };
    /**
     * @return {?}
     */
    ICUMessageTokenizer.prototype.peek = /**
     * @return {?}
     */
    function () {
        return this.lexer.peek();
    };
    return ICUMessageTokenizer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MessageCategory = /** @class */ (function () {
    function MessageCategory(_category, _message) {
        this._category = _category;
        this._message = _message;
    }
    /**
     * @return {?}
     */
    MessageCategory.prototype.getCategory = /**
     * @return {?}
     */
    function () {
        return this._category;
    };
    /**
     * @return {?}
     */
    MessageCategory.prototype.getMessageNormalized = /**
     * @return {?}
     */
    function () {
        return this._message;
    };
    return MessageCategory;
}());
/**
 * Implementation of an ICU Message.
 * Created by martin on 05.06.2017.
 */
var /**
 * Implementation of an ICU Message.
 * Created by martin on 05.06.2017.
 */
ICUMessage = /** @class */ (function () {
    function ICUMessage(_parser, isPluralMessage) {
        this._parser = _parser;
        this._isPluralMessage = isPluralMessage;
        this._categories = [];
    }
    /**
     * @param {?} category
     * @param {?} message
     * @return {?}
     */
    ICUMessage.prototype.addCategory = /**
     * @param {?} category
     * @param {?} message
     * @return {?}
     */
    function (category, message) {
        this._categories.push(new MessageCategory(category, message));
    };
    /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return ICU message as native string.
     */
    /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return {?} ICU message as native string.
     */
    ICUMessage.prototype.asNativeString = /**
     * ICU message as native string.
     * This is, how it is stored, something like '{x, plural, =0 {..}'
     * @return {?} ICU message as native string.
     */
    function () {
        /** @type {?} */
        var varname = (this.isPluralMessage()) ? 'VAR_PLURAL' : 'VAR_SELECT';
        /** @type {?} */
        var type = (this.isPluralMessage()) ? 'plural' : 'select';
        /** @type {?} */
        var choiceString = '';
        this._categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        function (category) {
            choiceString = choiceString + format(' %s {%s}', category.getCategory(), category.getMessageNormalized().asNativeString());
        }));
        return format('{%s, %s,%s}', varname, type, choiceString);
    };
    /**
     * Is it a plural message?
     */
    /**
     * Is it a plural message?
     * @return {?}
     */
    ICUMessage.prototype.isPluralMessage = /**
     * Is it a plural message?
     * @return {?}
     */
    function () {
        return this._isPluralMessage;
    };
    /**
     * Is it a select message?
     */
    /**
     * Is it a select message?
     * @return {?}
     */
    ICUMessage.prototype.isSelectMessage = /**
     * Is it a select message?
     * @return {?}
     */
    function () {
        return !this._isPluralMessage;
    };
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     */
    /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     * @return {?}
     */
    ICUMessage.prototype.getCategories = /**
     * All the parts of the message.
     * E.g. the ICU message {wolves, plural, =0 {no wolves} =1 {one wolf} =2 {two wolves} other {a wolf pack}}
     * has 4 category objects with the categories =0, =1, =2, other.
     * @return {?}
     */
    function () {
        return this._categories;
    };
    /**
     * Translate message and return a new, translated message
     * @param translation the translation (hashmap of categories and translations).
     * @return new message wit translated content.
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     */
    /**
     * Translate message and return a new, translated message
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     * @param {?} translation the translation (hashmap of categories and translations).
     * @return {?} new message wit translated content.
     */
    ICUMessage.prototype.translate = /**
     * Translate message and return a new, translated message
     * @throws an error if translation does not match the message.
     * This is the case, if there are categories not contained in the original message.
     * @param {?} translation the translation (hashmap of categories and translations).
     * @return {?} new message wit translated content.
     */
    function (translation) {
        var _this = this;
        /** @type {?} */
        var message = new ICUMessage(this._parser, this.isPluralMessage());
        /** @type {?} */
        var translatedCategories = new Set();
        this._categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        function (category) {
            /** @type {?} */
            var translatedMessage;
            /** @type {?} */
            var translationForCategory = translation[category.getCategory()];
            if (isNullOrUndefined(translationForCategory)) {
                translatedMessage = category.getMessageNormalized();
            }
            else if (isString(translationForCategory)) {
                translatedCategories.add(category.getCategory());
                translatedMessage = _this._parser.parseNormalizedString((/** @type {?} */ (translationForCategory)), null);
            }
            else {
                // TODO embedded ICU Message
                translatedMessage = null;
            }
            message.addCategory(category.getCategory(), translatedMessage);
        }));
        // new categories, which are not part of the original message
        Object.keys(translation).forEach((/**
         * @param {?} categoryName
         * @return {?}
         */
        function (categoryName) {
            if (!translatedCategories.has(categoryName)) {
                if (_this.isSelectMessage()) {
                    throw new Error(format('adding a new category not allowed for select messages ("%s" is not part of message)', categoryName));
                }
                else {
                    _this.checkValidPluralCategory(categoryName);
                    // TODO embedded ICU Message
                    /** @type {?} */
                    var translatedMessage = _this._parser.parseNormalizedString((/** @type {?} */ (translation[categoryName])), null);
                    message.addCategory(categoryName, translatedMessage);
                }
            }
        }));
        return message;
    };
    /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @param categoryName category
     * @throws an error, if it is not a valid category name
     */
    /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @throws an error, if it is not a valid category name
     * @private
     * @param {?} categoryName category
     * @return {?}
     */
    ICUMessage.prototype.checkValidPluralCategory = /**
     * Check, wether category is valid plural category.
     * Allowed are =n, 'zero', 'one', 'two', 'few', 'many' and 'other'
     * @throws an error, if it is not a valid category name
     * @private
     * @param {?} categoryName category
     * @return {?}
     */
    function (categoryName) {
        /** @type {?} */
        var allowedKeywords = ['zero', 'one', 'two', 'few', 'many', 'other'];
        if (categoryName.match(/=\d+/)) {
            return;
        }
        if (allowedKeywords.find((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return key === categoryName; }))) {
            return;
        }
        throw new Error(format('invalid plural category "%s", allowed are =<n> and %s', categoryName, allowedKeywords));
    };
    return ICUMessage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 02.06.2017.
 * A message part consisting of an icu message.
 * There can only be one icu message in a parsed message.
 * Syntax of ICU message is '{' <keyname> ',' 'select'|'plural' ',' (<category> '{' text '}')+ '}'
 */
var /**
 * Created by martin on 02.06.2017.
 * A message part consisting of an icu message.
 * There can only be one icu message in a parsed message.
 * Syntax of ICU message is '{' <keyname> ',' 'select'|'plural' ',' (<category> '{' text '}')+ '}'
 */
ParsedMessagePartICUMessage = /** @class */ (function (_super) {
    __extends(ParsedMessagePartICUMessage, _super);
    function ParsedMessagePartICUMessage(icuMessageText, _parser) {
        var _this = _super.call(this, ParsedMessagePartType.ICU_MESSAGE) || this;
        _this._parser = _parser;
        if (icuMessageText) {
            _this.parseICUMessage(icuMessageText);
        }
        return _this;
    }
    /**
     * Test wether text might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param icuMessageText icuMessageText
     * @return wether text might be an ICU message.
     */
    /**
     * Test wether text might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param {?} icuMessageText icuMessageText
     * @return {?} wether text might be an ICU message.
     */
    ParsedMessagePartICUMessage.looksLikeICUMessage = /**
     * Test wether text might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param {?} icuMessageText icuMessageText
     * @return {?} wether text might be an ICU message.
     */
    function (icuMessageText) {
        /** @type {?} */
        var part = new ParsedMessagePartICUMessage(null, null);
        return part.looksLikeICUMessage(icuMessageText);
    };
    /**
     * @param {?=} displayFormat
     * @return {?}
     */
    ParsedMessagePartICUMessage.prototype.asDisplayString = /**
     * @param {?=} displayFormat
     * @return {?}
     */
    function (displayFormat) {
        return '<ICU-Message/>';
    };
    /**
     * return the parsed message.
     * @return parsed message
     */
    /**
     * return the parsed message.
     * @return {?} parsed message
     */
    ParsedMessagePartICUMessage.prototype.getICUMessage = /**
     * return the parsed message.
     * @return {?} parsed message
     */
    function () {
        return this._message;
    };
    /**
     * Parse the message.
     * @param text message text to parse
     * @throws an error if the syntax is not ok in any way.
     */
    /**
     * Parse the message.
     * @throws an error if the syntax is not ok in any way.
     * @private
     * @param {?} text message text to parse
     * @return {?}
     */
    ParsedMessagePartICUMessage.prototype.parseICUMessage = /**
     * Parse the message.
     * @throws an error if the syntax is not ok in any way.
     * @private
     * @param {?} text message text to parse
     * @return {?}
     */
    function (text) {
        // console.log('message ', text);
        // const tokens = new ICUMessageTokenizer().tokenize(text);
        // tokens.forEach((tok) => {
        //     console.log('Token', tok.type, tok.value);
        // });
        this._messageText = text;
        this._tokenizer = new ICUMessageTokenizer();
        this._tokenizer.input(text);
        this.expectNext(CURLY_BRACE_OPEN);
        this.expectNext(TEXT); // varname, not used currently, ng always used VAR_PLURAL or VAR_SELECT
        this.expectNext(COMMA);
        /** @type {?} */
        var token = this._tokenizer.next();
        if (token.type === PLURAL) {
            this._message = new ICUMessage(this._parser, true);
        }
        else if (token.type === SELECT) {
            this._message = new ICUMessage(this._parser, false);
        }
        this.expectNext(COMMA);
        token = this._tokenizer.peek();
        while (token.type !== CURLY_BRACE_CLOSE) {
            /** @type {?} */
            var category = this.expectNext(TEXT).value.trim();
            this.expectNext(CURLY_BRACE_OPEN);
            /** @type {?} */
            var message = this.expectNext(TEXT).value;
            this._message.addCategory(category, this.parseNativeSubMessage(message));
            this.expectNext(CURLY_BRACE_CLOSE);
            token = this._tokenizer.peek();
        }
        this.expectNext(CURLY_BRACE_CLOSE);
        this.expectNext('EOF');
    };
    /**
     * Parse the message to check, wether it might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @param text message text to parse
     */
    /**
     * Parse the message to check, wether it might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @private
     * @param {?} text message text to parse
     * @return {?}
     */
    ParsedMessagePartICUMessage.prototype.looksLikeICUMessage = /**
     * Parse the message to check, wether it might be an ICU message.
     * Should at least start with something like '{<name>, select, ..' or '{<name>, plural, ...'
     * @private
     * @param {?} text message text to parse
     * @return {?}
     */
    function (text) {
        // console.log('message ', text);
        // const tokens = new ICUMessageTokenizer().tokenize(text);
        // tokens.forEach((tok) => {
        //     console.log('Token', tok.type, tok.value);
        // });
        this._tokenizer = new ICUMessageTokenizer();
        this._tokenizer.input(text);
        try {
            this.expectNext(CURLY_BRACE_OPEN);
            this.expectNext(TEXT); // varname, not used currently, ng always used VAR_PLURAL or VAR_SELECT
            this.expectNext(COMMA);
            /** @type {?} */
            var token = this._tokenizer.next();
            if (token.type !== PLURAL && token.type !== SELECT) {
                return false;
            }
            this.expectNext(COMMA);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    /**
     * Read next token and expect, that it is of the given type.
     * @param tokentype expected type.
     * @return Token
     * @throws error, if next token has wrong type.
     */
    /**
     * Read next token and expect, that it is of the given type.
     * @throws error, if next token has wrong type.
     * @private
     * @param {?} tokentype expected type.
     * @return {?} Token
     */
    ParsedMessagePartICUMessage.prototype.expectNext = /**
     * Read next token and expect, that it is of the given type.
     * @throws error, if next token has wrong type.
     * @private
     * @param {?} tokentype expected type.
     * @return {?} Token
     */
    function (tokentype) {
        /** @type {?} */
        var token = this._tokenizer.next();
        if (token.type !== tokentype) {
            throw new Error(format('Error parsing ICU Message: expected %s, found %s (%s) (message %s)', tokentype, token.type, token.value, this._messageText));
        }
        return token;
    };
    /**
     * Parse XML text to normalized message.
     * @param message message in format dependent xml syntax.
     * @return normalized message
     */
    /**
     * Parse XML text to normalized message.
     * @private
     * @param {?} message message in format dependent xml syntax.
     * @return {?} normalized message
     */
    ParsedMessagePartICUMessage.prototype.parseNativeSubMessage = /**
     * Parse XML text to normalized message.
     * @private
     * @param {?} message message in format dependent xml syntax.
     * @return {?} normalized message
     */
    function (message) {
        return this._parser.createNormalizedMessageFromXMLString(message, null);
    };
    return ParsedMessagePartICUMessage;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
var /**
 * Created by martin on 05.05.2017.
 * A reference to an ICU message
 * icu references are numbered from 0 to n.
 */
ParsedMessagePartICUMessageRef = /** @class */ (function (_super) {
    __extends(ParsedMessagePartICUMessageRef, _super);
    function ParsedMessagePartICUMessageRef(index, disp) {
        var _this = _super.call(this, ParsedMessagePartType.ICU_MESSAGE_REF) || this;
        _this._index = index;
        _this._disp = disp;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartICUMessageRef.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        return '<ICU-Message-Ref_' + this._index + '/>';
    };
    /**
     * @return {?}
     */
    ParsedMessagePartICUMessageRef.prototype.index = /**
     * @return {?}
     */
    function () {
        return this._index;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartICUMessageRef.prototype.disp = /**
     * @return {?}
     */
    function () {
        return this._disp;
    };
    return ParsedMessagePartICUMessageRef;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 14.06.2017.
 * A message part consisting of an empty tag like <br/>.
 */
var /**
 * Created by martin on 14.06.2017.
 * A message part consisting of an empty tag like <br/>.
 */
ParsedMessagePartEmptyTag = /** @class */ (function (_super) {
    __extends(ParsedMessagePartEmptyTag, _super);
    function ParsedMessagePartEmptyTag(tagname, idcounter) {
        var _this = _super.call(this, ParsedMessagePartType.EMPTY_TAG) || this;
        _this._tagname = tagname;
        _this._idcounter = idcounter;
        return _this;
    }
    /**
     * @param {?=} format
     * @return {?}
     */
    ParsedMessagePartEmptyTag.prototype.asDisplayString = /**
     * @param {?=} format
     * @return {?}
     */
    function (format) {
        if (this._idcounter === 0) {
            return '<' + this._tagname + '>';
        }
        else {
            return '<' + this._tagname + ' id="' + this._idcounter.toString() + '">';
        }
    };
    /**
     * @return {?}
     */
    ParsedMessagePartEmptyTag.prototype.tagName = /**
     * @return {?}
     */
    function () {
        return this._tagname;
    };
    /**
     * @return {?}
     */
    ParsedMessagePartEmptyTag.prototype.idCounter = /**
     * @return {?}
     */
    function () {
        return this._idcounter;
    };
    return ParsedMessagePartEmptyTag;
}(ParsedMessagePart));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 05.05.2017.
 * A message text read from a translation file.
 * Can contain placeholders, tags, text.
 * This class is a representation independent of the concrete format.
 */
var /**
 * Created by martin on 05.05.2017.
 * A message text read from a translation file.
 * Can contain placeholders, tags, text.
 * This class is a representation independent of the concrete format.
 */
ParsedMessage = /** @class */ (function () {
    function ParsedMessage(parser, sourceMessage) {
        this._parser = parser;
        this.sourceMessage = sourceMessage;
        this._parts = [];
    }
    /**
     * Get the parser (for tests only, not part of API)
     * @return parser
     */
    /**
     * Get the parser (for tests only, not part of API)
     * @return {?} parser
     */
    ParsedMessage.prototype.getParser = /**
     * Get the parser (for tests only, not part of API)
     * @return {?} parser
     */
    function () {
        return this._parser;
    };
    /**
     * Create a new normalized message as a translation of this one.
     * @param normalizedString the translation in normalized form.
     * If the message is an ICUMessage (getICUMessage returns a value), use translateICUMessage instead.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is an ICU message.
     */
    /**
     * Create a new normalized message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is an ICU message.
     * @param {?} normalizedString the translation in normalized form.
     * If the message is an ICUMessage (getICUMessage returns a value), use translateICUMessage instead.
     * @return {?}
     */
    ParsedMessage.prototype.translate = /**
     * Create a new normalized message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is an ICU message.
     * @param {?} normalizedString the translation in normalized form.
     * If the message is an ICUMessage (getICUMessage returns a value), use translateICUMessage instead.
     * @return {?}
     */
    function (normalizedString) {
        if (isNullOrUndefined(this.getICUMessage())) {
            return this._parser.parseNormalizedString((/** @type {?} */ (normalizedString)), this);
        }
        else {
            throw new Error(format('cannot translate ICU message with simple string, use translateICUMessage() instead ("%s", "%s")', normalizedString, this.asNativeString()));
        }
    };
    /**
     * Create a new normalized icu message as a translation of this one.
     * @param icuTranslation the translation, this is the translation of the ICU message,
     * which is not a string, but a collections of the translations of the different categories.
     * The message must be an ICUMessage (getICUMessage returns a value)
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is not an ICU message.
     */
    /**
     * Create a new normalized icu message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is not an ICU message.
     * @param {?} icuTranslation the translation, this is the translation of the ICU message,
     * which is not a string, but a collections of the translations of the different categories.
     * The message must be an ICUMessage (getICUMessage returns a value)
     * @return {?}
     */
    ParsedMessage.prototype.translateICUMessage = /**
     * Create a new normalized icu message as a translation of this one.
     * @throws an error if normalized string is not well formed.
     * Throws an error too, if this is not an ICU message.
     * @param {?} icuTranslation the translation, this is the translation of the ICU message,
     * which is not a string, but a collections of the translations of the different categories.
     * The message must be an ICUMessage (getICUMessage returns a value)
     * @return {?}
     */
    function (icuTranslation) {
        /** @type {?} */
        var icuMessage = this.getICUMessage();
        if (isNullOrUndefined(icuMessage)) {
            throw new Error(format('this is not an ICU message, use translate() instead ("%s", "%s")', icuTranslation, this.asNativeString()));
        }
        else {
            /** @type {?} */
            var translatedICUMessage = icuMessage.translate(icuTranslation);
            return this._parser.parseICUMessage(translatedICUMessage.asNativeString(), this);
        }
    };
    /**
     * Create a new normalized message from a native xml string as a translation of this one.
     * @param nativeString xml string in the format of the underlying file format.
     * Throws an error if native string is not acceptable.
     */
    /**
     * Create a new normalized message from a native xml string as a translation of this one.
     * @param {?} nativeString xml string in the format of the underlying file format.
     * Throws an error if native string is not acceptable.
     * @return {?}
     */
    ParsedMessage.prototype.translateNativeString = /**
     * Create a new normalized message from a native xml string as a translation of this one.
     * @param {?} nativeString xml string in the format of the underlying file format.
     * Throws an error if native string is not acceptable.
     * @return {?}
     */
    function (nativeString) {
        return this._parser.createNormalizedMessageFromXMLString(nativeString, this);
    };
    /**
     * normalized message as string.
     * @param displayFormat optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     */
    /**
     * normalized message as string.
     * @param {?=} displayFormat optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     * @return {?}
     */
    ParsedMessage.prototype.asDisplayString = /**
     * normalized message as string.
     * @param {?=} displayFormat optional way to determine the exact syntax.
     * Allowed formats are defined as constants NORMALIZATION_FORMAT...
     * @return {?}
     */
    function (displayFormat) {
        return this._parts.map((/**
         * @param {?} part
         * @return {?}
         */
        function (part) { return part.asDisplayString(displayFormat); })).join('');
    };
    /**
     * Returns the message content as format dependent native string.
     * Includes all format specific markup like <ph id="INTERPOLATION" ../> ..
     */
    /**
     * Returns the message content as format dependent native string.
     * Includes all format specific markup like <ph id="INTERPOLATION" ../> ..
     * @return {?}
     */
    ParsedMessage.prototype.asNativeString = /**
     * Returns the message content as format dependent native string.
     * Includes all format specific markup like <ph id="INTERPOLATION" ../> ..
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this.getICUMessage())) {
            return DOMUtilities.getXMLContent(this._xmlRepresentation);
        }
        else {
            return this.getICUMessage().asNativeString();
        }
    };
    /**
     * Validate the message.
     * @return null, if ok, error object otherwise.
     */
    /**
     * Validate the message.
     * @return {?} null, if ok, error object otherwise.
     */
    ParsedMessage.prototype.validate = /**
     * Validate the message.
     * @return {?} null, if ok, error object otherwise.
     */
    function () {
        /** @type {?} */
        var hasErrors = false;
        /** @type {?} */
        var errors = {};
        /** @type {?} */
        var e;
        e = this.checkPlaceholderAdded();
        if (!isNullOrUndefined(e)) {
            errors.placeholderAdded = e;
            hasErrors = true;
        }
        e = this.checkICUMessageRefRemoved();
        if (!isNullOrUndefined(e)) {
            errors.icuMessageRefRemoved = e;
            hasErrors = true;
        }
        e = this.checkICUMessageRefAdded();
        if (!isNullOrUndefined(e)) {
            errors.icuMessageRefAdded = e;
            hasErrors = true;
        }
        return hasErrors ? errors : null;
    };
    /**
     * Validate the message, check for warnings only.
     * A warning shows, that the message is acceptable, but misses something.
     * E.g. if you remove a placeholder or a special tag from the original message, this generates a warning.
     * @return null, if no warning, warnings as error object otherwise.
     */
    /**
     * Validate the message, check for warnings only.
     * A warning shows, that the message is acceptable, but misses something.
     * E.g. if you remove a placeholder or a special tag from the original message, this generates a warning.
     * @return {?} null, if no warning, warnings as error object otherwise.
     */
    ParsedMessage.prototype.validateWarnings = /**
     * Validate the message, check for warnings only.
     * A warning shows, that the message is acceptable, but misses something.
     * E.g. if you remove a placeholder or a special tag from the original message, this generates a warning.
     * @return {?} null, if no warning, warnings as error object otherwise.
     */
    function () {
        /** @type {?} */
        var hasWarnings = false;
        /** @type {?} */
        var warnings = {};
        /** @type {?} */
        var w;
        w = this.checkPlaceholderRemoved();
        if (!isNullOrUndefined(w)) {
            warnings.placeholderRemoved = w;
            hasWarnings = true;
        }
        w = this.checkTagRemoved();
        if (!isNullOrUndefined(w)) {
            warnings.tagRemoved = w;
            hasWarnings = true;
        }
        w = this.checkTagAdded();
        if (!isNullOrUndefined(w)) {
            warnings.tagAdded = w;
            hasWarnings = true;
        }
        return hasWarnings ? warnings : null;
    };
    /**
     * Test wether this message is an ICU message.
     * @return true, if it is an ICU message.
     */
    /**
     * Test wether this message is an ICU message.
     * @return {?} true, if it is an ICU message.
     */
    ParsedMessage.prototype.isICUMessage = /**
     * Test wether this message is an ICU message.
     * @return {?} true, if it is an ICU message.
     */
    function () {
        return this._parts.length === 1 && this._parts[0].type === ParsedMessagePartType.ICU_MESSAGE;
    };
    /**
     * Test wether this message contains an ICU message reference.
     * ICU message references are something like <x ID="ICU"../>.
     * @return true, if there is an ICU message reference in the message.
     */
    /**
     * Test wether this message contains an ICU message reference.
     * ICU message references are something like <x ID="ICU"../>.
     * @return {?} true, if there is an ICU message reference in the message.
     */
    ParsedMessage.prototype.containsICUMessageRef = /**
     * Test wether this message contains an ICU message reference.
     * ICU message references are something like <x ID="ICU"../>.
     * @return {?} true, if there is an ICU message reference in the message.
     */
    function () {
        return this._parts.findIndex((/**
         * @param {?} part
         * @return {?}
         */
        function (part) { return part.type === ParsedMessagePartType.ICU_MESSAGE_REF; })) >= 0;
    };
    /**
     * If this message is an ICU message, returns its structure.
     * Otherwise this method returns null.
     * @return ICUMessage or null.
     */
    /**
     * If this message is an ICU message, returns its structure.
     * Otherwise this method returns null.
     * @return {?} ICUMessage or null.
     */
    ParsedMessage.prototype.getICUMessage = /**
     * If this message is an ICU message, returns its structure.
     * Otherwise this method returns null.
     * @return {?} ICUMessage or null.
     */
    function () {
        if (this._parts.length === 1 && this._parts[0].type === ParsedMessagePartType.ICU_MESSAGE) {
            /** @type {?} */
            var icuPart = (/** @type {?} */ (this._parts[0]));
            return icuPart.getICUMessage();
        }
        else {
            return null;
        }
    };
    /**
     * Check for added placeholder.
     * @return null or message, if fulfilled.
     */
    /**
     * Check for added placeholder.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkPlaceholderAdded = /**
     * Check for added placeholder.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    function () {
        /** @type {?} */
        var e = null;
        /** @type {?} */
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            var sourcePlaceholders_1 = this.sourceMessage.allPlaceholders();
            /** @type {?} */
            var myPlaceholders = this.allPlaceholders();
            myPlaceholders.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!sourcePlaceholders_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            e = 'added placeholder ' + suspiciousIndexes[0] + ', which is not in original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            var allSuspiciousIndexes_1 = '';
            /** @type {?} */
            var first_1 = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!first_1) {
                    allSuspiciousIndexes_1 = allSuspiciousIndexes_1 + ', ';
                }
                allSuspiciousIndexes_1 = allSuspiciousIndexes_1 + index;
                first_1 = false;
            }));
            e = 'added placeholders ' + allSuspiciousIndexes_1 + ', which are not in original message';
        }
        return e;
    };
    /**
     * Check for removed placeholder.
     * @return null or message, if fulfilled.
     */
    /**
     * Check for removed placeholder.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkPlaceholderRemoved = /**
     * Check for removed placeholder.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    function () {
        /** @type {?} */
        var w = null;
        /** @type {?} */
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            var sourcePlaceholders = this.sourceMessage.allPlaceholders();
            /** @type {?} */
            var myPlaceholders_1 = this.allPlaceholders();
            sourcePlaceholders.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!myPlaceholders_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            w = 'removed placeholder ' + suspiciousIndexes[0] + ' from original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            var allSuspiciousIndexes_2 = '';
            /** @type {?} */
            var first_2 = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!first_2) {
                    allSuspiciousIndexes_2 = allSuspiciousIndexes_2 + ', ';
                }
                allSuspiciousIndexes_2 = allSuspiciousIndexes_2 + index;
                first_2 = false;
            }));
            w = 'removed placeholders ' + allSuspiciousIndexes_2 + ' from original message';
        }
        return w;
    };
    /**
     * Check for added ICU Message Refs.
     * @return null or message, if fulfilled.
     */
    /**
     * Check for added ICU Message Refs.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkICUMessageRefAdded = /**
     * Check for added ICU Message Refs.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    function () {
        /** @type {?} */
        var e = null;
        /** @type {?} */
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            var sourceICURefs_1 = this.sourceMessage.allICUMessageRefs();
            /** @type {?} */
            var myICURefs = this.allICUMessageRefs();
            myICURefs.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!sourceICURefs_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            e = 'added ICU message reference ' + suspiciousIndexes[0] + ', which is not in original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            var allSuspiciousIndexes_3 = '';
            /** @type {?} */
            var first_3 = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!first_3) {
                    allSuspiciousIndexes_3 = allSuspiciousIndexes_3 + ', ';
                }
                allSuspiciousIndexes_3 = allSuspiciousIndexes_3 + index;
                first_3 = false;
            }));
            e = 'added ICU message references ' + allSuspiciousIndexes_3 + ', which are not in original message';
        }
        return e;
    };
    /**
     * Check for removed ICU Message Refs.
     * @return null or message, if fulfilled.
     */
    /**
     * Check for removed ICU Message Refs.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkICUMessageRefRemoved = /**
     * Check for removed ICU Message Refs.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    function () {
        /** @type {?} */
        var e = null;
        /** @type {?} */
        var suspiciousIndexes = [];
        if (this.sourceMessage) {
            /** @type {?} */
            var sourceICURefs = this.sourceMessage.allICUMessageRefs();
            /** @type {?} */
            var myICURefs_1 = this.allICUMessageRefs();
            sourceICURefs.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!myICURefs_1.has(index)) {
                    suspiciousIndexes.push(index);
                }
            }));
        }
        if (suspiciousIndexes.length === 1) {
            e = 'removed ICU message reference ' + suspiciousIndexes[0] + ' from original message';
        }
        else if (suspiciousIndexes.length > 1) {
            /** @type {?} */
            var allSuspiciousIndexes_4 = '';
            /** @type {?} */
            var first_4 = true;
            suspiciousIndexes.forEach((/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                if (!first_4) {
                    allSuspiciousIndexes_4 = allSuspiciousIndexes_4 + ', ';
                }
                allSuspiciousIndexes_4 = allSuspiciousIndexes_4 + index;
                first_4 = false;
            }));
            e = 'removed ICU message references ' + allSuspiciousIndexes_4 + ' from original message';
        }
        return e;
    };
    /**
     * Get all indexes of placeholders used in the message.
     */
    /**
     * Get all indexes of placeholders used in the message.
     * @private
     * @return {?}
     */
    ParsedMessage.prototype.allPlaceholders = /**
     * Get all indexes of placeholders used in the message.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = new Set();
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            if (part.type === ParsedMessagePartType.PLACEHOLDER) {
                /** @type {?} */
                var index = ((/** @type {?} */ (part))).index();
                result.add(index);
            }
        }));
        return result;
    };
    /**
     * Return the disp-Attribute of placeholder
     * @param index index of placeholder
     * @return disp or null
     */
    /**
     * Return the disp-Attribute of placeholder
     * @param {?} index index of placeholder
     * @return {?} disp or null
     */
    ParsedMessage.prototype.getPlaceholderDisp = /**
     * Return the disp-Attribute of placeholder
     * @param {?} index index of placeholder
     * @return {?} disp or null
     */
    function (index) {
        /** @type {?} */
        var placeHolder = null;
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            if (part.type === ParsedMessagePartType.PLACEHOLDER) {
                /** @type {?} */
                var phPart = (/** @type {?} */ (part));
                if (phPart.index() === index) {
                    placeHolder = phPart;
                }
            }
        }));
        return placeHolder ? placeHolder.disp() : null;
    };
    /**
     * Get all indexes of ICU message refs used in the message.
     */
    /**
     * Get all indexes of ICU message refs used in the message.
     * @private
     * @return {?}
     */
    ParsedMessage.prototype.allICUMessageRefs = /**
     * Get all indexes of ICU message refs used in the message.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = new Set();
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            if (part.type === ParsedMessagePartType.ICU_MESSAGE_REF) {
                /** @type {?} */
                var index = ((/** @type {?} */ (part))).index();
                result.add(index);
            }
        }));
        return result;
    };
    /**
     * Return the disp-Attribute of icu message ref
     * @param index of ref
     * @return disp or null
     */
    /**
     * Return the disp-Attribute of icu message ref
     * @param {?} index of ref
     * @return {?} disp or null
     */
    ParsedMessage.prototype.getICUMessageRefDisp = /**
     * Return the disp-Attribute of icu message ref
     * @param {?} index of ref
     * @return {?} disp or null
     */
    function (index) {
        /** @type {?} */
        var icuMessageRefPart = null;
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            if (part.type === ParsedMessagePartType.ICU_MESSAGE_REF) {
                /** @type {?} */
                var refPart = (/** @type {?} */ (part));
                if (refPart.index() === index) {
                    icuMessageRefPart = refPart;
                }
            }
        }));
        return icuMessageRefPart ? icuMessageRefPart.disp() : null;
    };
    /**
     * Check for added tags.
     * @return null or message, if fulfilled.
     */
    /**
     * Check for added tags.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkTagAdded = /**
     * Check for added tags.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    function () {
        /** @type {?} */
        var e = null;
        /** @type {?} */
        var suspiciousTags = [];
        if (this.sourceMessage) {
            /** @type {?} */
            var sourceTags_1 = this.sourceMessage.allTags();
            /** @type {?} */
            var myTags = this.allTags();
            myTags.forEach((/**
             * @param {?} tagName
             * @return {?}
             */
            function (tagName) {
                if (!sourceTags_1.has(tagName)) {
                    suspiciousTags.push(tagName);
                }
            }));
        }
        if (suspiciousTags.length === 1) {
            e = 'added tag <' + suspiciousTags[0] + '>, which is not in original message';
        }
        else if (suspiciousTags.length > 1) {
            /** @type {?} */
            var allSuspiciousTags_1 = '';
            /** @type {?} */
            var first_5 = true;
            suspiciousTags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) {
                if (!first_5) {
                    allSuspiciousTags_1 = allSuspiciousTags_1 + ', ';
                }
                allSuspiciousTags_1 = allSuspiciousTags_1 + '<' + tag + '>';
                first_5 = false;
            }));
            e = 'added tags ' + allSuspiciousTags_1 + ', which are not in original message';
        }
        return e;
    };
    /**
     * Check for removed tags.
     * @return null or message, if fulfilled.
     */
    /**
     * Check for removed tags.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    ParsedMessage.prototype.checkTagRemoved = /**
     * Check for removed tags.
     * @private
     * @return {?} null or message, if fulfilled.
     */
    function () {
        /** @type {?} */
        var w = null;
        /** @type {?} */
        var suspiciousTags = [];
        if (this.sourceMessage) {
            /** @type {?} */
            var sourceTags = this.sourceMessage.allTags();
            /** @type {?} */
            var myTags_1 = this.allTags();
            sourceTags.forEach((/**
             * @param {?} tagName
             * @return {?}
             */
            function (tagName) {
                if (!myTags_1.has(tagName)) {
                    suspiciousTags.push(tagName);
                }
            }));
        }
        if (suspiciousTags.length === 1) {
            w = 'removed tag <' + suspiciousTags[0] + '> from original message';
        }
        else if (suspiciousTags.length > 1) {
            /** @type {?} */
            var allSuspiciousTags_2 = '';
            /** @type {?} */
            var first_6 = true;
            suspiciousTags.forEach((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) {
                if (!first_6) {
                    allSuspiciousTags_2 = allSuspiciousTags_2 + ', ';
                }
                allSuspiciousTags_2 = allSuspiciousTags_2 + '<' + tag + '>';
                first_6 = false;
            }));
            w = 'removed tags ' + allSuspiciousTags_2 + ' from original message';
        }
        return w;
    };
    /**
     * Get all tag names used in the message.
     */
    /**
     * Get all tag names used in the message.
     * @private
     * @return {?}
     */
    ParsedMessage.prototype.allTags = /**
     * Get all tag names used in the message.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = new Set();
        this.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            if (part.type === ParsedMessagePartType.START_TAG || part.type === ParsedMessagePartType.EMPTY_TAG) {
                /** @type {?} */
                var tagName = ((/** @type {?} */ (part))).tagName();
                result.add(tagName);
            }
        }));
        return result;
    };
    /**
     * @return {?}
     */
    ParsedMessage.prototype.parts = /**
     * @return {?}
     */
    function () {
        return this._parts;
    };
    /**
     * @param {?} xmlRepresentation
     * @return {?}
     */
    ParsedMessage.prototype.setXmlRepresentation = /**
     * @param {?} xmlRepresentation
     * @return {?}
     */
    function (xmlRepresentation) {
        this._xmlRepresentation = xmlRepresentation;
    };
    /**
     * @param {?} text
     * @return {?}
     */
    ParsedMessage.prototype.addText = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this._parts.push(new ParsedMessagePartText(text));
    };
    /**
     * @param {?} index
     * @param {?} disp
     * @return {?}
     */
    ParsedMessage.prototype.addPlaceholder = /**
     * @param {?} index
     * @param {?} disp
     * @return {?}
     */
    function (index, disp) {
        this._parts.push(new ParsedMessagePartPlaceholder(index, disp));
    };
    /**
     * @param {?} tagname
     * @param {?} idcounter
     * @return {?}
     */
    ParsedMessage.prototype.addStartTag = /**
     * @param {?} tagname
     * @param {?} idcounter
     * @return {?}
     */
    function (tagname, idcounter) {
        this._parts.push(new ParsedMessagePartStartTag(tagname, idcounter));
    };
    /**
     * @param {?} tagname
     * @return {?}
     */
    ParsedMessage.prototype.addEndTag = /**
     * @param {?} tagname
     * @return {?}
     */
    function (tagname) {
        // check if well formed
        /** @type {?} */
        var openTag = this.calculateOpenTagName();
        if (!openTag || openTag !== tagname) {
            // oops, not well formed
            throw new Error(format('unexpected close tag %s (currently open is %s, native xml is "%s")', tagname, openTag, this.asNativeString()));
        }
        this._parts.push(new ParsedMessagePartEndTag(tagname));
    };
    /**
     * @param {?} tagname
     * @param {?} idcounter
     * @return {?}
     */
    ParsedMessage.prototype.addEmptyTag = /**
     * @param {?} tagname
     * @param {?} idcounter
     * @return {?}
     */
    function (tagname, idcounter) {
        this._parts.push(new ParsedMessagePartEmptyTag(tagname, idcounter));
    };
    /**
     * @param {?} index
     * @param {?} disp
     * @return {?}
     */
    ParsedMessage.prototype.addICUMessageRef = /**
     * @param {?} index
     * @param {?} disp
     * @return {?}
     */
    function (index, disp) {
        this._parts.push(new ParsedMessagePartICUMessageRef(index, disp));
    };
    /**
     * @param {?} text
     * @return {?}
     */
    ParsedMessage.prototype.addICUMessage = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        this._parts.push(new ParsedMessagePartICUMessage(text, this._parser));
    };
    /**
     * Determine, wether there is an open tag, that is not closed.
     * Returns the latest one or null, if there is no open tag.
     */
    /**
     * Determine, wether there is an open tag, that is not closed.
     * Returns the latest one or null, if there is no open tag.
     * @private
     * @return {?}
     */
    ParsedMessage.prototype.calculateOpenTagName = /**
     * Determine, wether there is an open tag, that is not closed.
     * Returns the latest one or null, if there is no open tag.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var openTags = [];
        this._parts.forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            switch (part.type) {
                case ParsedMessagePartType.START_TAG:
                    openTags.push(((/** @type {?} */ (part))).tagName());
                    break;
                case ParsedMessagePartType.END_TAG:
                    /** @type {?} */
                    var tagName = ((/** @type {?} */ (part))).tagName();
                    if (openTags.length === 0 || openTags[openTags.length - 1] !== tagName) {
                        // oops, not well formed
                        /** @type {?} */
                        var openTag = (openTags.length === 0) ? 'nothing' : openTags[openTags.length - 1];
                        throw new Error(format('unexpected close tag %s (currently open is %s, native xml is "%s")', tagName, openTag, _this.asNativeString()));
                    }
                    openTags.pop();
            }
        }));
        return openTags.length === 0 ? null : openTags[openTags.length - 1];
    };
    return ParsedMessage;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Tokens
/**
 * Created by martin on 14.05.2017.
 * A tokenizer for normalized messages.
 * @type {?}
 */
var TEXT$1 = 'TEXT';
/** @type {?} */
var START_TAG = 'START_TAG';
/** @type {?} */
var END_TAG = 'END_TAG';
/** @type {?} */
var EMPTY_TAG = 'EMPTY_TAG';
/** @type {?} */
var PLACEHOLDER = 'PLACEHOLDER';
/** @type {?} */
var ICU_MESSAGE_REF = 'ICU_MESSAGE_REF';
/** @type {?} */
var ICU_MESSAGE = 'ICU_MESSAGE';
var ParsedMesageTokenizer = /** @class */ (function () {
    function ParsedMesageTokenizer() {
    }
    /**
     * @private
     * @return {?}
     */
    ParsedMesageTokenizer.prototype.getLexer = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lexer = new Tokenizr();
        /** @type {?} */
        var plaintext = '';
        lexer.before((/**
         * @param {?} ctx
         * @param {?} match
         * @param {?} rule
         * @return {?}
         */
        function (ctx, match, rule) {
            if (rule.name !== TEXT$1 && plaintext !== '') {
                ctx.accept(TEXT$1, { text: plaintext });
                plaintext = '';
            }
        }));
        lexer.finish((/**
         * @param {?} ctx
         * @return {?}
         */
        function (ctx) {
            if (plaintext !== '') {
                ctx.accept(TEXT$1, { text: plaintext });
            }
        }));
        // empty tag, there are only a few allowed (see tag-mappings): ['BR', 'HR', 'IMG', 'AREA', 'LINK', 'WBR']
        // format is <name id="nr">, nr ist optional, z.B. <img> oder <img id="2">
        lexer.rule(/<(br|hr|img|area|link|wbr)( id="([0-9])*")?\>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            /** @type {?} */
            var idcount = isNullOrUndefined(match[3]) ? 0 : parseInt(match[3], 10);
            ctx.accept(EMPTY_TAG, { name: match[1], idcounter: idcount });
        }), EMPTY_TAG);
        // start tag, Format <name id="nr">, nr ist optional, z.B. <mytag> oder <mytag id="2">
        lexer.rule(/<([a-zA-Z][a-zA-Z-0-9]*)( id="([0-9]*)")?>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            /** @type {?} */
            var idcount = isNullOrUndefined(match[3]) ? 0 : parseInt(match[3], 10);
            ctx.accept(START_TAG, { name: match[1], idcounter: idcount });
        }), START_TAG);
        // end tag
        lexer.rule(/<\/([a-zA-Z][a-zA-Z-0-9]*)>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(END_TAG, { name: match[1] });
        }), END_TAG);
        // placeholder
        lexer.rule(/{{([0-9]+)}}/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(PLACEHOLDER, { idcounter: parseInt(match[1], 10) });
        }), PLACEHOLDER);
        // icu message ref
        lexer.rule(/<ICU-Message-Ref_([0-9]+)\/>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(ICU_MESSAGE_REF, { idcounter: parseInt(match[1], 10) });
        }), ICU_MESSAGE_REF);
        // icu message
        lexer.rule(/<ICU-Message\/>/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            ctx.accept(ICU_MESSAGE, { message: match[0] });
        }), ICU_MESSAGE);
        // text
        lexer.rule(/./, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT$1);
        lexer.rule(/[\t\r\n]+/, (/**
         * @param {?} ctx
         * @param {?} match
         * @return {?}
         */
        function (ctx, match) {
            plaintext += match[0];
            ctx.ignore();
        }), TEXT$1);
        return lexer;
    };
    /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    ParsedMesageTokenizer.prototype.tokenize = /**
     * @param {?} normalizedMessage
     * @return {?}
     */
    function (normalizedMessage) {
        /** @type {?} */
        var lexer = this.getLexer();
        lexer.reset();
        lexer.input(normalizedMessage);
        return lexer.tokens();
    };
    return ParsedMesageTokenizer;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                case TEXT$1:
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 16.05.2017.
 * Mapping from normalized tag names to placeholder names.
 */
/*
copied from https://github.com/angular/angular/blob/master/packages/compiler/src/i18n/serializers/placeholder.ts
 */
/** @type {?} */
var TAG_TO_PLACEHOLDER_NAMES = {
    'A': 'LINK',
    'B': 'BOLD_TEXT',
    'BR': 'LINE_BREAK',
    'EM': 'EMPHASISED_TEXT',
    'H1': 'HEADING_LEVEL1',
    'H2': 'HEADING_LEVEL2',
    'H3': 'HEADING_LEVEL3',
    'H4': 'HEADING_LEVEL4',
    'H5': 'HEADING_LEVEL5',
    'H6': 'HEADING_LEVEL6',
    'HR': 'HORIZONTAL_RULE',
    'I': 'ITALIC_TEXT',
    'LI': 'LIST_ITEM',
    'LINK': 'MEDIA_LINK',
    'OL': 'ORDERED_LIST',
    'P': 'PARAGRAPH',
    'Q': 'QUOTATION',
    'S': 'STRIKETHROUGH_TEXT',
    'SMALL': 'SMALL_TEXT',
    'SUB': 'SUBSTRIPT',
    'SUP': 'SUPERSCRIPT',
    'TBODY': 'TABLE_BODY',
    'TD': 'TABLE_CELL',
    'TFOOT': 'TABLE_FOOTER',
    'TH': 'TABLE_HEADER_CELL',
    'THEAD': 'TABLE_HEADER',
    'TR': 'TABLE_ROW',
    'TT': 'MONOSPACED_TEXT',
    'U': 'UNDERLINED_TEXT',
    'UL': 'UNORDERED_LIST',
};
/**
 * HTML Tags (in uppercase) that are empty, they have no content, but do not need a close tag, e.g. <br>, <img>, <hr>.
 * @type {?}
 */
var VOID_TAGS = ['BR', 'HR', 'IMG', 'AREA', 'LINK', 'WBR'];
var TagMapping = /** @class */ (function () {
    function TagMapping() {
    }
    /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    TagMapping.prototype.getStartTagPlaceholderName = /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    function (tag, id) {
        /** @type {?} */
        var upperTag = tag.toUpperCase();
        /** @type {?} */
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        return "START_" + baseName + this.counterString(id);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    TagMapping.prototype.getCloseTagPlaceholderName = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        /** @type {?} */
        var upperTag = tag.toUpperCase();
        /** @type {?} */
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        return "CLOSE_" + baseName;
    };
    /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    TagMapping.prototype.getEmptyTagPlaceholderName = /**
     * @param {?} tag
     * @param {?} id
     * @return {?}
     */
    function (tag, id) {
        /** @type {?} */
        var upperTag = tag.toUpperCase();
        /** @type {?} */
        var baseName = TAG_TO_PLACEHOLDER_NAMES[upperTag] || "TAG_" + upperTag;
        return baseName + this.counterString(id);
    };
    /**
     * @param {?} tag
     * @return {?}
     */
    TagMapping.prototype.getCtypeForTag = /**
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        switch (tag.toLowerCase()) {
            case 'br':
                return 'lb';
            case 'img':
                return 'image';
            default:
                return "x-" + tag;
        }
    };
    /**
     * @param {?} placeholderName
     * @return {?}
     */
    TagMapping.prototype.getTagnameFromStartTagPlaceholderName = /**
     * @param {?} placeholderName
     * @return {?}
     */
    function (placeholderName) {
        if (placeholderName.startsWith('START_TAG_')) {
            return this.stripCounter(placeholderName.substring('START_TAG_'.length)).toLowerCase();
        }
        else if (placeholderName.startsWith('START_')) {
            /** @type {?} */
            var ph_1 = this.stripCounter(placeholderName.substring('START_'.length));
            /** @type {?} */
            var matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph_1; }));
            return matchKey ? matchKey.toLowerCase() : null;
        }
        return null;
    };
    /**
     * @param {?} placeholderName
     * @return {?}
     */
    TagMapping.prototype.getTagnameFromCloseTagPlaceholderName = /**
     * @param {?} placeholderName
     * @return {?}
     */
    function (placeholderName) {
        if (placeholderName.startsWith('CLOSE_TAG_')) {
            return this.stripCounter(placeholderName.substring('CLOSE_TAG_'.length)).toLowerCase();
        }
        else if (placeholderName.startsWith('CLOSE_')) {
            /** @type {?} */
            var ph_2 = this.stripCounter(placeholderName.substring('CLOSE_'.length));
            /** @type {?} */
            var matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph_2; }));
            return matchKey ? matchKey.toLowerCase() : null;
        }
        return null;
    };
    /**
     * Test, wether placeholder name stands for empty html tag.
     * @param placeholderName can be TAG_<name> or just <name>
     */
    /**
     * Test, wether placeholder name stands for empty html tag.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    TagMapping.prototype.isEmptyTagPlaceholderName = /**
     * Test, wether placeholder name stands for empty html tag.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    function (placeholderName) {
        /** @type {?} */
        var ph = this.stripCounter(placeholderName);
        /** @type {?} */
        var matchKey;
        if (ph.startsWith('TAG_')) {
            matchKey = ph.substring(4).toUpperCase();
        }
        else {
            matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph; }));
        }
        if (matchKey) {
            if (VOID_TAGS.indexOf(matchKey) >= 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * tagname of empty tag placeholder.
     * @param placeholderName can be TAG_<name> or just <name>
     */
    /**
     * tagname of empty tag placeholder.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    TagMapping.prototype.getTagnameFromEmptyTagPlaceholderName = /**
     * tagname of empty tag placeholder.
     * @param {?} placeholderName can be TAG_<name> or just <name>
     * @return {?}
     */
    function (placeholderName) {
        /** @type {?} */
        var ph = this.stripCounter(placeholderName);
        /** @type {?} */
        var matchKey;
        if (ph.startsWith('TAG_')) {
            matchKey = ph.substring(4).toUpperCase();
        }
        else {
            matchKey = Object.keys(TAG_TO_PLACEHOLDER_NAMES).find((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return TAG_TO_PLACEHOLDER_NAMES[key] === ph; }));
        }
        if (matchKey) {
            if (VOID_TAGS.indexOf(matchKey) >= 0) {
                return matchKey.toLowerCase();
            }
            else {
                return null;
            }
        }
        return null;
    };
    /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @param placeholderName placeholderName
     * @return placeholderName without counter at end.
     */
    /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @private
     * @param {?} placeholderName placeholderName
     * @return {?} placeholderName without counter at end.
     */
    TagMapping.prototype.stripCounter = /**
     * If placeholder ends with _[0-9]+, strip that number.
     * @private
     * @param {?} placeholderName placeholderName
     * @return {?} placeholderName without counter at end.
     */
    function (placeholderName) {
        if (placeholderName) {
            /** @type {?} */
            var re = /(.*)_[0-9]+$/;
            if (placeholderName.match(re)) {
                return placeholderName.replace(re, '$1');
            }
        }
        return placeholderName;
    };
    /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @param id id
     * @return suffix for counter.
     */
    /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @private
     * @param {?} id id
     * @return {?} suffix for counter.
     */
    TagMapping.prototype.counterString = /**
     * String suffix for counter.
     * If counter is 0, it is empty, otherwise _<id>.
     * @private
     * @param {?} id id
     * @return {?} suffix for counter.
     */
    function (id) {
        if (id === 0) {
            return '';
        }
        else {
            return '_' + id.toString(10);
        }
    };
    return TagMapping;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
var /**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 1.2
 */
XliffMessageParser = /** @class */ (function (_super) {
    __extends(XliffMessageParser, _super);
    function XliffMessageParser() {
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
    XliffMessageParser.prototype.processStartElement = /**
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
        /** @type {?} */
        var tagMapping = new TagMapping();
        if (tagName === 'x') {
            // placeholder are like <x id="INTERPOLATION"/> or <x id="INTERPOLATION_1">
            /** @type {?} */
            var id = elementNode.getAttribute('id');
            if (!id) {
                return; // should not happen
            }
            if (id.startsWith('INTERPOLATION')) {
                /** @type {?} */
                var index = this.parsePlaceholderIndexFromId(id);
                message.addPlaceholder(index, null);
            }
            else if (id.startsWith('ICU')) {
                /** @type {?} */
                var index = this.parseICUMessageRefIndexFromId(id);
                message.addICUMessageRef(index, null);
            }
            else if (id.startsWith('START_')) {
                /** @type {?} */
                var normalizedTagName = tagMapping.getTagnameFromStartTagPlaceholderName(id);
                if (normalizedTagName) {
                    /** @type {?} */
                    var idcount = this.parseIdCountFromName(id);
                    message.addStartTag(normalizedTagName, idcount);
                }
            }
            else if (id.startsWith('CLOSE_')) {
                /** @type {?} */
                var normalizedTagName = tagMapping.getTagnameFromCloseTagPlaceholderName(id);
                if (normalizedTagName) {
                    message.addEndTag(normalizedTagName);
                }
            }
            else if (tagMapping.isEmptyTagPlaceholderName(id)) {
                /** @type {?} */
                var normalizedTagName = tagMapping.getTagnameFromEmptyTagPlaceholderName(id);
                if (normalizedTagName) {
                    /** @type {?} */
                    var idcount = this.parseIdCountFromName(id);
                    message.addEmptyTag(normalizedTagName, idcount);
                }
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
    XliffMessageParser.prototype.processEndElement = /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    function (elementNode, message) {
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param id id
     * @return index
     */
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} index
     */
    XliffMessageParser.prototype.parsePlaceholderIndexFromId = /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} index
     */
    function (id) {
        /** @type {?} */
        var indexString = '';
        if (id === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = id.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param id id
     * @return id as number
     */
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} id as number
     */
    XliffMessageParser.prototype.parseICUMessageRefIndexFromId = /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} id id
     * @return {?} id as number
     */
    function (id) {
        /** @type {?} */
        var indexString = '';
        if (id === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = id.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.addXmlRepresentationToRoot = /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    function (message, rootElem) {
        var _this = this;
        message.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            /** @type {?} */
            var child;
            switch (part.type) {
                case ParsedMessagePartType.TEXT:
                    child = _this.createXmlRepresentationOfTextPart((/** @type {?} */ (part)), rootElem);
                    break;
                case ParsedMessagePartType.START_TAG:
                    child = _this.createXmlRepresentationOfStartTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.END_TAG:
                    child = _this.createXmlRepresentationOfEndTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.EMPTY_TAG:
                    child = _this.createXmlRepresentationOfEmptyTagPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.PLACEHOLDER:
                    child = _this.createXmlRepresentationOfPlaceholderPart(((/** @type {?} */ (part))), rootElem);
                    break;
                case ParsedMessagePartType.ICU_MESSAGE_REF:
                    child = _this.createXmlRepresentationOfICUMessageRefPart(((/** @type {?} */ (part))), rootElem);
                    break;
            }
            if (child) {
                rootElem.appendChild(child);
            }
        }));
    };
    /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfStartTagPart = /**
     * the xml used for start tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var idAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        /** @type {?} */
        var ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        /** @type {?} */
        var equivTextAttr = '<' + part.tagName() + '>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    };
    /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfEndTagPart = /**
     * the xml used for end tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var idAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        /** @type {?} */
        var ctypeAttrib = 'x-' + part.tagName();
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        return xElem;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = /**
     * the xml used for empty tag in the message.
     * Returns an empty <x/>-Element with attributes id and ctype
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var idAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        /** @type {?} */
        var ctypeAttrib = tagMapping.getCtypeForTag(part.tagName());
        /** @type {?} */
        var equivTextAttr = '<' + part.tagName() + '/>';
        xElem.setAttribute('id', idAttrib);
        xElem.setAttribute('ctype', ctypeAttrib);
        xElem.setAttribute('equiv-text', equivTextAttr);
        return xElem;
    };
    /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XliffMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = /**
     * the xml used for placeholder in the message.
     * Returns an empty <x/>-Element with attribute id="INTERPOLATION" or id="INTERPOLATION_n"
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var idAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            idAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        /** @type {?} */
        var equivTextAttr = part.disp();
        xElem.setAttribute('id', idAttrib);
        if (equivTextAttr) {
            xElem.setAttribute('equiv-text', equivTextAttr);
        }
        return xElem;
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
    XliffMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = /**
     * the xml used for icu message refs in the message.
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var xElem = rootElem.ownerDocument.createElement('x');
        /** @type {?} */
        var idAttrib = 'ICU';
        if (part.index() > 0) {
            idAttrib = 'ICU_' + part.index().toString(10);
        }
        xElem.setAttribute('id', idAttrib);
        return xElem;
    };
    return XliffMessageParser;
}(AbstractMessageParser));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XLIFF 1.2 file.
 */
var /**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XLIFF 1.2 file.
 */
XliffTransUnit = /** @class */ (function (_super) {
    __extends(XliffTransUnit, _super);
    function XliffTransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    /**
     * @return {?}
     */
    XliffTransUnit.prototype.sourceContent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        return DOMUtilities.getXMLContent(sourceElement);
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    XliffTransUnit.prototype.setSourceContent = /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    function (newContent) {
        /** @type {?} */
        var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (!source) {
            // should not happen, there always has to be a source, but who knows..
            source = this._element.appendChild(this._element.ownerDocument.createElement('source'));
        }
        DOMUtilities.replaceContentWithXMLContent(source, newContent);
    };
    /**
     * Return a parser used for normalized messages.
     */
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    XliffTransUnit.prototype.messageParser = /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    function () {
        return new XliffMessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    XliffTransUnit.prototype.createSourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (sourceElement) {
            return this.messageParser().createNormalizedMessageFromXML(sourceElement, null);
        }
        else {
            return null;
        }
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    XliffTransUnit.prototype.targetContent = /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return DOMUtilities.getXMLContent(targetElement);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    XliffTransUnit.prototype.targetContentNormalized = /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return new XliffMessageParser().createNormalizedMessageFromXML(targetElement, this.sourceContentNormalized());
    };
    /**
     * State of the translation as stored in the xml.
     */
    /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    XliffTransUnit.prototype.nativeTargetState = /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (targetElement) {
            return targetElement.getAttribute('state');
        }
        else {
            return null;
        }
    };
    /**
     * set state in xml.
     * @param nativeState nativeState
     */
    /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XliffTransUnit.prototype.setNativeTargetState = /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (targetElement) {
            targetElement.setAttribute('state', nativeState);
        }
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    XliffTransUnit.prototype.mapStateToNativeState = /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    function (state) {
        switch (state) {
            case STATE_NEW:
                return 'new';
            case STATE_TRANSLATED:
                return 'translated';
            case STATE_FINAL:
                return 'final';
            default:
                throw new Error('unknown state ' + state);
        }
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XliffTransUnit.prototype.mapNativeStateToState = /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        switch (nativeState) {
            case 'new':
                return STATE_NEW;
            case 'needs-translation':
                return STATE_NEW;
            case 'translated':
                return STATE_TRANSLATED;
            case 'needs-adaptation':
                return STATE_TRANSLATED;
            case 'needs-l10n':
                return STATE_TRANSLATED;
            case 'needs-review-adaptation':
                return STATE_TRANSLATED;
            case 'needs-review-l10n':
                return STATE_TRANSLATED;
            case 'needs-review-translation':
                return STATE_TRANSLATED;
            case 'final':
                return STATE_FINAL;
            case 'signed-off':
                return STATE_FINAL;
            default:
                return STATE_NEW;
        }
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    XliffTransUnit.prototype.sourceReferences = /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElements = this._element.getElementsByTagName('context-group');
        /** @type {?} */
        var sourceRefs = [];
        for (var i = 0; i < sourceElements.length; i++) {
            /** @type {?} */
            var elem = sourceElements.item(i);
            if (elem.getAttribute('purpose') === 'location') {
                /** @type {?} */
                var contextElements = elem.getElementsByTagName('context');
                /** @type {?} */
                var sourcefile = null;
                /** @type {?} */
                var linenumber = 0;
                for (var j = 0; j < contextElements.length; j++) {
                    /** @type {?} */
                    var contextElem = contextElements.item(j);
                    if (contextElem.getAttribute('context-type') === 'sourcefile') {
                        sourcefile = DOMUtilities.getPCDATA(contextElem);
                    }
                    if (contextElem.getAttribute('context-type') === 'linenumber') {
                        linenumber = Number.parseInt(DOMUtilities.getPCDATA(contextElem), 10);
                    }
                }
                sourceRefs.push({ sourcefile: sourcefile, linenumber: linenumber });
            }
        }
        return sourceRefs;
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    XliffTransUnit.prototype.setSourceReferences = /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    function (sourceRefs) {
        var _this = this;
        this.removeAllSourceReferences();
        sourceRefs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) {
            /** @type {?} */
            var contextGroup = _this._element.ownerDocument.createElement('context-group');
            contextGroup.setAttribute('purpose', 'location');
            /** @type {?} */
            var contextSource = _this._element.ownerDocument.createElement('context');
            contextSource.setAttribute('context-type', 'sourcefile');
            contextSource.appendChild(_this._element.ownerDocument.createTextNode(ref.sourcefile));
            /** @type {?} */
            var contextLine = _this._element.ownerDocument.createElement('context');
            contextLine.setAttribute('context-type', 'linenumber');
            contextLine.appendChild(_this._element.ownerDocument.createTextNode(ref.linenumber.toString(10)));
            contextGroup.appendChild(contextSource);
            contextGroup.appendChild(contextLine);
            _this._element.appendChild(contextGroup);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    XliffTransUnit.prototype.removeAllSourceReferences = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElements = this._element.getElementsByTagName('context-group');
        /** @type {?} */
        var toBeRemoved = [];
        for (var i = 0; i < sourceElements.length; i++) {
            /** @type {?} */
            var elem = sourceElements.item(i);
            if (elem.getAttribute('purpose') === 'location') {
                toBeRemoved.push(elem);
            }
        }
        toBeRemoved.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) { elem.parentNode.removeChild(elem); }));
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff this is stored as a note element with attribute from="description".
     */
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff this is stored as a note element with attribute from="description".
     * @return {?}
     */
    XliffTransUnit.prototype.description = /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff this is stored as a note element with attribute from="description".
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElem = this.findNoteElementWithFromAttribute('description');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    XliffTransUnit.prototype.setDescription = /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    function (description) {
        /** @type {?} */
        var noteElem = this.findNoteElementWithFromAttribute('description');
        if (description) {
            if (isNullOrUndefined(noteElem)) {
                // create it
                noteElem = this.createNoteElementWithFromAttribute('description', description);
            }
            else {
                DOMUtilities.replaceContentWithXMLContent(noteElem, description);
            }
        }
        else {
            if (!isNullOrUndefined(noteElem)) {
                // remove node
                this.removeNoteElementWithFromAttribute('description');
            }
        }
    };
    /**
     * Find a note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     * @return element or null is absent
     */
    /**
     * Find a note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?} element or null is absent
     */
    XliffTransUnit.prototype.findNoteElementWithFromAttribute = /**
     * Find a note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?} element or null is absent
     */
    function (attrValue) {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('from') === attrValue) {
                return noteElem;
            }
        }
        return null;
    };
    /**
     * Get all note elements where from attribute is not description or meaning
     * @return elements
     */
    /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    XliffTransUnit.prototype.findAllAdditionalNoteElements = /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    function () {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var result = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            /** @type {?} */
            var fromAttribute = noteElem.getAttribute('from');
            if (fromAttribute !== 'description' && fromAttribute !== 'meaning') {
                result.push(noteElem);
            }
        }
        return result;
    };
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @param fromAttrValue value of "from" attribute
     * @param content text value of note element
     * @return the new created element
     */
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} fromAttrValue value of "from" attribute
     * @param {?} content text value of note element
     * @return {?} the new created element
     */
    XliffTransUnit.prototype.createNoteElementWithFromAttribute = /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} fromAttrValue value of "from" attribute
     * @param {?} content text value of note element
     * @return {?} the new created element
     */
    function (fromAttrValue, content) {
        /** @type {?} */
        var noteElement = this._element.ownerDocument.createElement('note');
        if (fromAttrValue) {
            noteElement.setAttribute('from', fromAttrValue);
        }
        noteElement.setAttribute('priority', '1');
        if (content) {
            DOMUtilities.replaceContentWithXMLContent(noteElement, content);
        }
        this._element.appendChild(noteElement);
        return noteElement;
    };
    /**
     * Remove note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     */
    /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    XliffTransUnit.prototype.removeNoteElementWithFromAttribute = /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    function (attrValue) {
        /** @type {?} */
        var noteElement = this.findNoteElementWithFromAttribute(attrValue);
        if (noteElement) {
            this._element.removeChild(noteElement);
        }
    };
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     */
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    XliffTransUnit.prototype.removeAllAdditionalNoteElements = /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var noteElements = this.findAllAdditionalNoteElements();
        noteElements.forEach((/**
         * @param {?} noteElement
         * @return {?}
         */
        function (noteElement) {
            _this._element.removeChild(noteElement);
        }));
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff this is stored as a note element with attribute from="meaning".
     */
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff this is stored as a note element with attribute from="meaning".
     * @return {?}
     */
    XliffTransUnit.prototype.meaning = /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff this is stored as a note element with attribute from="meaning".
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElem = this.findNoteElementWithFromAttribute('meaning');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change meaning property of trans-unit.
     * @param  meaning meaning
     */
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    XliffTransUnit.prototype.setMeaning = /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    function (meaning) {
        /** @type {?} */
        var noteElem = this.findNoteElementWithFromAttribute('meaning');
        if (meaning) {
            if (isNullOrUndefined(noteElem)) {
                // create it
                noteElem = this.createNoteElementWithFromAttribute('meaning', meaning);
            }
            else {
                DOMUtilities.replaceContentWithXMLContent(noteElem, meaning);
            }
        }
        else {
            if (!isNullOrUndefined(noteElem)) {
                // remove node
                this.removeNoteElementWithFromAttribute('meaning');
            }
        }
    };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     */
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    XliffTransUnit.prototype.notes = /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElememts = this.findAllAdditionalNoteElements();
        return noteElememts.map((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            return {
                from: elem.getAttribute('from'),
                text: DOMUtilities.getPCDATA(elem)
            };
        }));
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XliffTransUnit.prototype.supportsSetNotes = /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * @throws an Error if any note contains description or meaning as from attribute.
     */
    /**
     * Add notes to trans unit.
     * @throws an Error if any note contains description or meaning as from attribute.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    XliffTransUnit.prototype.setNotes = /**
     * Add notes to trans unit.
     * @throws an Error if any note contains description or meaning as from attribute.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    function (newNotes) {
        var _this = this;
        if (!isNullOrUndefined(newNotes)) {
            this.checkNotes(newNotes);
        }
        this.removeAllAdditionalNoteElements();
        if (!isNullOrUndefined(newNotes)) {
            newNotes.forEach((/**
             * @param {?} note
             * @return {?}
             */
            function (note) {
                /** @type {?} */
                var noteElem = _this.createNoteElementWithFromAttribute(note.from, note.text);
            }));
        }
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    XliffTransUnit.prototype.translateNative = /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            /** @type {?} */
            var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
            target = DOMUtilities.createFollowingSibling('target', source);
        }
        DOMUtilities.replaceContentWithXMLContent(target, (/** @type {?} */ (translation)));
        this.setTargetState(STATE_TRANSLATED);
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    XliffTransUnit.prototype.cloneWithSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    function (isDefaultLang, copyContent, targetFile) {
        /** @type {?} */
        var element = (/** @type {?} */ (this._element.cloneNode(true)));
        /** @type {?} */
        var clone = new XliffTransUnit(element, this._id, targetFile);
        clone.useSourceAsTarget(isDefaultLang, copyContent);
        return clone;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    XliffTransUnit.prototype.useSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    function (isDefaultLang, copyContent) {
        /** @type {?} */
        var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        /** @type {?} */
        var target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            target = DOMUtilities.createFollowingSibling('target', source);
        }
        if (isDefaultLang || copyContent) {
            /** @type {?} */
            var sourceString = DOMUtilities.getXMLContent(source);
            /** @type {?} */
            var newTargetString = sourceString;
            if (!this.isICUMessage(sourceString)) {
                newTargetString = this.translationMessagesFile().getNewTransUnitTargetPraefix()
                    + sourceString
                    + this.translationMessagesFile().getNewTransUnitTargetSuffix();
            }
            DOMUtilities.replaceContentWithXMLContent(target, newTargetString);
        }
        else {
            DOMUtilities.replaceContentWithXMLContent(target, '');
        }
        if (isDefaultLang) {
            target.setAttribute('state', this.mapStateToNativeState(STATE_FINAL));
        }
        else {
            target.setAttribute('state', this.mapStateToNativeState(STATE_NEW));
        }
    };
    return XliffTransUnit;
}(AbstractTransUnit));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 23.02.2017.
 * Ab xliff file read from a source file.
 * Defines some relevant get and set method for reading and modifying such a file.
 */
var /**
 * Created by martin on 23.02.2017.
 * Ab xliff file read from a source file.
 * Defines some relevant get and set method for reading and modifying such a file.
 */
XliffFile = /** @class */ (function (_super) {
    __extends(XliffFile, _super);
    /**
     * Create an xlf-File from source.
     * @param xmlString source read from file.
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return XliffFile
     */
    function XliffFile(xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding);
        return _this;
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    XliffFile.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        /** @type {?} */
        var xliffList = this._parsedDocument.getElementsByTagName('xliff');
        if (xliffList.length !== 1) {
            throw new Error(format('File "%s" seems to be no xliff file (should contain an xliff element)', path));
        }
        else {
            /** @type {?} */
            var version = xliffList.item(0).getAttribute('version');
            /** @type {?} */
            var expectedVersion = '1.2';
            if (version !== expectedVersion) {
                throw new Error(format('File "%s" seems to be no xliff 1.2 file, version should be %s, found %s', path, expectedVersion, version));
            }
        }
        return this;
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     */
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    XliffFile.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XLIFF12;
    };
    /**
     * File type.
     * Here 'XLIFF 1.2'
     */
    /**
     * File type.
     * Here 'XLIFF 1.2'
     * @return {?}
     */
    XliffFile.prototype.fileType = /**
     * File type.
     * Here 'XLIFF 1.2'
     * @return {?}
     */
    function () {
        return FILETYPE_XLIFF12;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    XliffFile.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['source', 'target', 'tool', 'seg-source', 'g', 'ph', 'bpt', 'ept', 'it', 'sub', 'mrk'];
    };
    /**
     * @protected
     * @return {?}
     */
    XliffFile.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('trans-unit');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var transunit = transUnitsInFile.item(i);
            /** @type {?} */
            var id = transunit.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, trans-unit without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new XliffTransUnit(transunit, id, this));
        }
    };
    /**
     * Get source language.
     * @return source language.
     */
    /**
     * Get source language.
     * @return {?} source language.
     */
    XliffFile.prototype.sourceLanguage = /**
     * Get source language.
     * @return {?} source language.
     */
    function () {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            return fileElem.getAttribute('source-language');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the source language.
     * @param language language
     */
    /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    XliffFile.prototype.setSourceLanguage = /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            fileElem.setAttribute('source-language', language);
        }
    };
    /**
     * Get target language.
     * @return target language.
     */
    /**
     * Get target language.
     * @return {?} target language.
     */
    XliffFile.prototype.targetLanguage = /**
     * Get target language.
     * @return {?} target language.
     */
    function () {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            return fileElem.getAttribute('target-language');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the target language.
     * @param language language
     */
    /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    XliffFile.prototype.setTargetLanguage = /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var fileElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (fileElem) {
            fileElem.setAttribute('target-language', language);
        }
    };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return the newly imported trans unit (since version 1.7.0)
     * @throws an error if trans-unit with same id already is in the file.
     */
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    XliffFile.prototype.importNewTransUnit = /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        if (this.transUnitWithId(foreignTransUnit.id)) {
            throw new Error(format('tu with id %s already exists in file, cannot import it', foreignTransUnit.id));
        }
        /** @type {?} */
        var newTu = ((/** @type {?} */ (foreignTransUnit))).cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        /** @type {?} */
        var bodyElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'body');
        if (!bodyElement) {
            throw new Error(format('File "%s" seems to be no xliff 1.2 file (should contain a body element)', this._filename));
        }
        /** @type {?} */
        var inserted = false;
        /** @type {?} */
        var isAfterElementPartOfFile = false;
        if (!!importAfterElement) {
            /** @type {?} */
            var insertionPoint = this.transUnitWithId(importAfterElement.id);
            if (!!insertionPoint) {
                isAfterElementPartOfFile = true;
            }
        }
        if (importAfterElement === undefined || (importAfterElement && !isAfterElementPartOfFile)) {
            bodyElement.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            /** @type {?} */
            var firstUnitElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'trans-unit');
            if (firstUnitElement) {
                DOMUtilities.insertBefore(newTu.asXmlElement(), firstUnitElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to body
                bodyElement.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            /** @type {?} */
            var refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'trans-unit', importAfterElement.id);
            if (refUnitElement) {
                DOMUtilities.insertAfter(newTu.asXmlElement(), refUnitElement);
                inserted = true;
            }
        }
        if (inserted) {
            this.lazyInitializeTransUnits();
            this.transUnits.push(newTu);
            this.countNumbers();
            return newTu;
        }
        else {
            return null;
        }
    };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    XliffFile.prototype.createTranslationFileForLang = /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    function (lang, filename, isDefaultLang, copyContent) {
        /** @type {?} */
        var translationFile = new XliffFile(this.editedContent(), filename, this.encoding());
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.forEachTransUnit((/**
         * @param {?} transUnit
         * @return {?}
         */
        function (transUnit) {
            ((/** @type {?} */ (transUnit))).useSourceAsTarget(isDefaultLang, copyContent);
        }));
        return translationFile;
    };
    return XliffFile;
}(AbstractTranslationMessagesFile));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
var /**
 * Created by roobm on 10.05.2017.
 * A message parser for XMB
 */
XmbMessageParser = /** @class */ (function (_super) {
    __extends(XmbMessageParser, _super);
    function XmbMessageParser() {
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
    XmbMessageParser.prototype.processStartElement = /**
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
            var name_1 = elementNode.getAttribute('name');
            if (!name_1) {
                return true; // should not happen
            }
            if (name_1.startsWith('INTERPOLATION')) {
                /** @type {?} */
                var index = this.parsePlaceholderIndexFromName(name_1);
                message.addPlaceholder(index, null);
                return false; // ignore children
            }
            else if (name_1.startsWith('START_')) {
                /** @type {?} */
                var tag = this.parseTagnameFromPhElement(elementNode);
                /** @type {?} */
                var idcounter = this.parseIdCountFromName(name_1);
                if (tag) {
                    message.addStartTag(tag, idcounter);
                }
                return false; // ignore children
            }
            else if (name_1.startsWith('CLOSE_')) {
                /** @type {?} */
                var tag = this.parseTagnameFromPhElement(elementNode);
                if (tag) {
                    message.addEndTag(tag);
                }
                return false; // ignore children
            }
            else if (new TagMapping().isEmptyTagPlaceholderName(name_1)) {
                /** @type {?} */
                var emptyTagName = new TagMapping().getTagnameFromEmptyTagPlaceholderName(name_1);
                /** @type {?} */
                var idcounter = this.parseIdCountFromName(name_1);
                message.addEmptyTag(emptyTagName, idcounter);
                return false; // ignore children
            }
            else if (name_1.startsWith('ICU')) {
                /** @type {?} */
                var index = this.parseICUMessageIndexFromName(name_1);
                message.addICUMessageRef(index, null);
                return false; // ignore children
            }
        }
        else if (tagName === 'source') {
            // ignore source
            return false;
        }
        return true;
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
    XmbMessageParser.prototype.getICUMessageText = /**
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
        var firstChild = null;
        // find first child that is no source element.
        /** @type {?} */
        var i;
        for (i = 0; i < children.length; i++) {
            /** @type {?} */
            var child = children.item(i);
            if (child.nodeType !== child.ELEMENT_NODE || ((/** @type {?} */ (child))).tagName !== 'source') {
                firstChild = child;
                break;
            }
        }
        if (firstChild && firstChild.nodeType === firstChild.TEXT_NODE) {
            if (this.isICUMessageStart(firstChild.textContent)) {
                /** @type {?} */
                var messageText = DOMUtilities.getXMLContent((/** @type {?} */ (node)));
                if (i > 0) {
                    // drop <source> elements
                    /** @type {?} */
                    var reSource = new RegExp('<source[^>]*>.*</source>', 'g');
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
    XmbMessageParser.prototype.processEndElement = /**
     * Handle end of this element node.
     * This is called after all children are processed.
     * @protected
     * @param {?} elementNode elementNode
     * @param {?} message message to be altered
     * @return {?}
     */
    function (elementNode, message) {
    };
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @param name name
     * @return id as number
     */
    /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    XmbMessageParser.prototype.parsePlaceholderIndexFromName = /**
     * Parse id attribute of x element as placeholder index.
     * id can be "INTERPOLATION" or "INTERPOLATION_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    function (name) {
        /** @type {?} */
        var indexString = '';
        if (name === 'INTERPOLATION') {
            indexString = '0';
        }
        else {
            indexString = name.substring('INTERPOLATION_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @param name name
     * @return id as number
     */
    /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    XmbMessageParser.prototype.parseICUMessageIndexFromName = /**
     * Parse id attribute of x element as ICU message ref index.
     * id can be "ICU" or "ICU_n"
     * @private
     * @param {?} name name
     * @return {?} id as number
     */
    function (name) {
        /** @type {?} */
        var indexString = '';
        if (name === 'ICU') {
            indexString = '0';
        }
        else {
            indexString = name.substring('ICU_'.length);
        }
        return Number.parseInt(indexString, 10);
    };
    /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @param phElement phElement
     */
    /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @private
     * @param {?} phElement phElement
     * @return {?}
     */
    XmbMessageParser.prototype.parseTagnameFromPhElement = /**
     * Parse the tag name from a ph element.
     * It contained in the <ex> subelements value and enclosed in <>.
     * Example: <ph name="START_BOLD_TEXT"><ex>&lt;b&gt;</ex></ph>
     * @private
     * @param {?} phElement phElement
     * @return {?}
     */
    function (phElement) {
        /** @type {?} */
        var exElement = DOMUtilities.getFirstElementByTagName(phElement, 'ex');
        if (exElement) {
            /** @type {?} */
            var value = DOMUtilities.getPCDATA(exElement);
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
    };
    /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.addXmlRepresentationToRoot = /**
     * @protected
     * @param {?} message
     * @param {?} rootElem
     * @return {?}
     */
    function (message, rootElem) {
        var _this = this;
        message.parts().forEach((/**
         * @param {?} part
         * @return {?}
         */
        function (part) {
            /** @type {?} */
            var child = _this.createXmlRepresentationOfPart(part, rootElem);
            if (child) {
                rootElem.appendChild(child);
            }
        }));
    };
    /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfPart = /**
     * @protected
     * @param {?} part
     * @param {?} rootElem
     * @return {?}
     */
    function (part, rootElem) {
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
    };
    /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfStartTagPart = /**
     * the xml used for start tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var nameAttrib = tagMapping.getStartTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfEndTagPart = /**
     * the xml used for end tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var nameAttrib = tagMapping.getCloseTagPlaceholderName(part.tagName());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('</' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfEmptyTagPart = /**
     * the xml used for empty tag in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var tagMapping = new TagMapping();
        /** @type {?} */
        var nameAttrib = tagMapping.getEmptyTagPlaceholderName(part.tagName(), part.idCounter());
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode('<' + part.tagName() + '>'));
        phElem.appendChild(exElem);
        return phElem;
    };
    /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @param part part
     * @param rootElem rootElem
     */
    /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    XmbMessageParser.prototype.createXmlRepresentationOfPlaceholderPart = /**
     * the xml used for placeholder in the message.
     * Returns an <ph>-Element with attribute name and subelement ex
     * @protected
     * @param {?} part part
     * @param {?} rootElem rootElem
     * @return {?}
     */
    function (part, rootElem) {
        /** @type {?} */
        var phElem = rootElem.ownerDocument.createElement('ph');
        /** @type {?} */
        var nameAttrib = 'INTERPOLATION';
        if (part.index() > 0) {
            nameAttrib = 'INTERPOLATION_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
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
    XmbMessageParser.prototype.createXmlRepresentationOfICUMessageRefPart = /**
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
        var nameAttrib = 'ICU';
        if (part.index() > 0) {
            nameAttrib = 'ICU_' + part.index().toString(10);
        }
        phElem.setAttribute('name', nameAttrib);
        /** @type {?} */
        var exElem = rootElem.ownerDocument.createElement('ex');
        exElem.appendChild(rootElem.ownerDocument.createTextNode(nameAttrib));
        phElem.appendChild(exElem);
        return phElem;
    };
    return XmbMessageParser;
}(AbstractMessageParser));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XMB file.
 */
var /**
 * Created by martin on 01.05.2017.
 * A Translation Unit in an XMB file.
 */
XmbTransUnit = /** @class */ (function (_super) {
    __extends(XmbTransUnit, _super);
    function XmbTransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @param sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return source and linenumber
     */
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and linenumber
     */
    XmbTransUnit.parseSourceAndPos = /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and linenumber
     */
    function (sourceAndPos) {
        /** @type {?} */
        var index = sourceAndPos.lastIndexOf(':');
        if (index < 0) {
            return {
                sourcefile: sourceAndPos,
                linenumber: 0
            };
        }
        else {
            return {
                sourcefile: sourceAndPos.substring(0, index),
                linenumber: XmbTransUnit.parseLineNumber(sourceAndPos.substring(index + 1))
            };
        }
    };
    /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    XmbTransUnit.parseLineNumber = /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    function (lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    };
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return source content
     */
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} source content
     */
    XmbTransUnit.prototype.sourceContent = /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} source content
     */
    function () {
        /** @type {?} */
        var msgContent = DOMUtilities.getXMLContent(this._element);
        /** @type {?} */
        var reSourceElem = /<source>.*<\/source>/g;
        msgContent = msgContent.replace(reSourceElem, '');
        return msgContent;
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XmbTransUnit.prototype.supportsSetSourceContent = /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    XmbTransUnit.prototype.setSourceContent = /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    function (newContent) {
        // not supported
    };
    /**
     * Return a parser used for normalized messages.
     */
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    XmbTransUnit.prototype.messageParser = /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    function () {
        return new XmbMessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    XmbTransUnit.prototype.createSourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        return this.messageParser().createNormalizedMessageFromXML(this._element, null);
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    XmbTransUnit.prototype.targetContent = /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    function () {
        // in fact, target and source are just the same in xmb
        return this.sourceContent();
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    XmbTransUnit.prototype.targetContentNormalized = /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    function () {
        return new XmbMessageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    };
    /**
     * State of the translation.
     * (not supported in xmb)
     */
    /**
     * State of the translation.
     * (not supported in xmb)
     * @return {?}
     */
    XmbTransUnit.prototype.nativeTargetState = /**
     * State of the translation.
     * (not supported in xmb)
     * @return {?}
     */
    function () {
        return null; // not supported in xmb
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    XmbTransUnit.prototype.mapStateToNativeState = /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    function (state) {
        return state;
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XmbTransUnit.prototype.mapNativeStateToState = /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        return nativeState;
    };
    /**
     * set state in xml.
     * (not supported in xmb)
     * @param nativeState nativeState
     */
    /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XmbTransUnit.prototype.setNativeTargetState = /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        // not supported for xmb
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    XmbTransUnit.prototype.sourceReferences = /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElements = this._element.getElementsByTagName('source');
        /** @type {?} */
        var sourceRefs = [];
        for (var i = 0; i < sourceElements.length; i++) {
            /** @type {?} */
            var elem = sourceElements.item(i);
            /** @type {?} */
            var sourceAndPos = DOMUtilities.getPCDATA(elem);
            sourceRefs.push(XmbTransUnit.parseSourceAndPos(sourceAndPos));
        }
        return sourceRefs;
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    XmbTransUnit.prototype.setSourceReferences = /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    function (sourceRefs) {
        this.removeAllSourceReferences();
        /** @type {?} */
        var insertPosition = this._element.childNodes.item(0);
        for (var i = sourceRefs.length - 1; i >= 0; i--) {
            /** @type {?} */
            var ref = sourceRefs[i];
            /** @type {?} */
            var source = this._element.ownerDocument.createElement('source');
            source.appendChild(this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            this._element.insertBefore(source, insertPosition);
            insertPosition = source;
        }
    };
    /**
     * @private
     * @return {?}
     */
    XmbTransUnit.prototype.removeAllSourceReferences = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElements = this._element.getElementsByTagName('source');
        /** @type {?} */
        var toBeRemoved = [];
        for (var i = 0; i < sourceElements.length; i++) {
            /** @type {?} */
            var elem = sourceElements.item(i);
            toBeRemoved.push(elem);
        }
        toBeRemoved.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) { elem.parentNode.removeChild(elem); }));
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xmb this is stored in the attribute "desc".
     */
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xmb this is stored in the attribute "desc".
     * @return {?}
     */
    XmbTransUnit.prototype.description = /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xmb this is stored in the attribute "desc".
     * @return {?}
     */
    function () {
        return this._element.getAttribute('desc');
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xmb this is stored in the attribute "meaning".
     */
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xmb this is stored in the attribute "meaning".
     * @return {?}
     */
    XmbTransUnit.prototype.meaning = /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xmb this is stored in the attribute "meaning".
     * @return {?}
     */
    function () {
        return this._element.getAttribute('meaning');
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XmbTransUnit.prototype.supportsSetDescriptionAndMeaning = /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    XmbTransUnit.prototype.setDescription = /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    function (description) {
        // not supported, do nothing
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    XmbTransUnit.prototype.setMeaning = /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    function (meaning) {
        // not supported, do nothing
    };
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     */
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    XmbTransUnit.prototype.notes = /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    function () {
        return [];
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XmbTransUnit.prototype.supportsSetNotes = /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * NOT Supported in xmb/xtb
     */
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    XmbTransUnit.prototype.setNotes = /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    function (newNotes) {
        // not supported, do nothing
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xmb there is nothing to do, because there is only a target, no source.
     */
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xmb there is nothing to do, because there is only a target, no source.
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    XmbTransUnit.prototype.cloneWithSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xmb there is nothing to do, because there is only a target, no source.
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    function (isDefaultLang, copyContent, targetFile) {
        return this;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    XmbTransUnit.prototype.useSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    function (isDefaultLang, copyContent) {
        // do nothing
    };
    /**
     * Set the translation to a given string (including markup).
     * In fact, xmb cannot be translated.
     * So this throws an error.
     * @param translation translation
     */
    /**
     * Set the translation to a given string (including markup).
     * In fact, xmb cannot be translated.
     * So this throws an error.
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    XmbTransUnit.prototype.translateNative = /**
     * Set the translation to a given string (including markup).
     * In fact, xmb cannot be translated.
     * So this throws an error.
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    function (translation) {
        throw new Error('You cannot translate xmb files, use xtb instead.');
    };
    return XmbTransUnit;
}(AbstractTransUnit));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Doctype of xtb translation file corresponding with thos xmb file.
 * @type {?}
 */
var XTB_DOCTYPE = "<!DOCTYPE translationbundle [\n  <!ELEMENT translationbundle (translation)*>\n  <!ATTLIST translationbundle lang CDATA #REQUIRED>\n  <!ELEMENT translation (#PCDATA|ph)*>\n  <!ATTLIST translation id CDATA #REQUIRED>\n  <!ELEMENT ph EMPTY>\n  <!ATTLIST ph name CDATA #REQUIRED>\n]>";
var XmbFile = /** @class */ (function (_super) {
    __extends(XmbFile, _super);
    /**
     * Create an xmb-File from source.
     * @param _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param xmlString file content
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return XmbFile
     */
    function XmbFile(_translationMessageFileFactory, xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._translationMessageFileFactory = _translationMessageFileFactory;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding);
        return _this;
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    XmbFile.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('messagebundle').length !== 1) {
            throw new Error(format('File "%s" seems to be no xmb file (should contain a messagebundle element)', path));
        }
        return this;
    };
    /**
     * @protected
     * @return {?}
     */
    XmbFile.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('msg');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var msg = transUnitsInFile.item(i);
            /** @type {?} */
            var id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new XmbTransUnit(msg, id, this));
        }
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     */
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    XmbFile.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XMB;
    };
    /**
     * File type.
     * Here 'XMB'
     */
    /**
     * File type.
     * Here 'XMB'
     * @return {?}
     */
    XmbFile.prototype.fileType = /**
     * File type.
     * Here 'XMB'
     * @return {?}
     */
    function () {
        return FILETYPE_XMB;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    XmbFile.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['message'];
    };
    /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @return Language or null
     */
    /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @private
     * @return {?} Language or null
     */
    XmbFile.prototype.guessLanguageFromFilename = /**
     * Guess language from filename.
     * If filename is foo.xy.xmb, than language is assumed to be xy.
     * @private
     * @return {?} Language or null
     */
    function () {
        if (this._filename) {
            /** @type {?} */
            var parts = this._filename.split('.');
            if (parts.length > 2 && parts[parts.length - 1].toLowerCase() === 'xmb') {
                return parts[parts.length - 2];
            }
        }
        return null;
    };
    /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return source language.
     */
    /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} source language.
     */
    XmbFile.prototype.sourceLanguage = /**
     * Get source language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} source language.
     */
    function () {
        return this.guessLanguageFromFilename();
    };
    /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param language language
     */
    /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    XmbFile.prototype.setSourceLanguage = /**
     * Edit the source language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        // do nothing, xmb has no notation for this.
    };
    /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return target language.
     */
    /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} target language.
     */
    XmbFile.prototype.targetLanguage = /**
     * Get target language.
     * Unsupported in xmb.
     * Try to guess it from filename if any..
     * @return {?} target language.
     */
    function () {
        return this.guessLanguageFromFilename();
    };
    /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param language language
     */
    /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    XmbFile.prototype.setTargetLanguage = /**
     * Edit the target language.
     * Unsupported in xmb.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        // do nothing, xmb has no notation for this.
    };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return the newly imported trans unit (since version 1.7.0)
     * @throws an error if trans-unit with same id already is in the file.
     */
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    XmbFile.prototype.importNewTransUnit = /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        throw Error('xmb file cannot be used to store translations, use xtb file');
    };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    XmbFile.prototype.createTranslationFileForLang = /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    function (lang, filename, isDefaultLang, copyContent) {
        /** @type {?} */
        var translationbundleXMLSource = '<?xml version="1.0" encoding="UTF-8"?>\n' + XTB_DOCTYPE + '\n<translationbundle>\n</translationbundle>\n';
        /** @type {?} */
        var translationFile = this._translationMessageFileFactory.createFileFromFileContent(FORMAT_XTB, translationbundleXMLSource, filename, this.encoding(), { xmlContent: this.editedContent(), path: this.filename(), encoding: this.encoding() });
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.setNewTransUnitTargetPraefix(this.getNewTransUnitTargetPraefix());
        translationFile.setNewTransUnitTargetSuffix(this.getNewTransUnitTargetSuffix());
        this.forEachTransUnit((/**
         * @param {?} tu
         * @return {?}
         */
        function (tu) {
            translationFile.importNewTransUnit(tu, isDefaultLang, copyContent);
        }));
        return translationFile;
    };
    return XmbFile;
}(AbstractTranslationMessagesFile));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
var /**
 * Created by roobm on 10.05.2017.
 * A message parser for XLIFF 2.0
 */
Xliff2MessageParser = /** @class */ (function (_super) {
    __extends(Xliff2MessageParser, _super);
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
var /**
 * Created by martin on 04.05.2017.
 * A Translation Unit in an XLIFF 2.0 file.
 */
Xliff2TransUnit = /** @class */ (function (_super) {
    __extends(Xliff2TransUnit, _super);
    function Xliff2TransUnit(_element, _id, _translationMessagesFile) {
        return _super.call(this, _element, _id, _translationMessagesFile) || this;
    }
    /**
     * @return {?}
     */
    Xliff2TransUnit.prototype.sourceContent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        return DOMUtilities.getXMLContent(sourceElement);
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    Xliff2TransUnit.prototype.setSourceContent = /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    function (newContent) {
        /** @type {?} */
        var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (!source) {
            // should not happen, there always has to be a source, but who knows..
            /** @type {?} */
            var segment = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
            source = segment.parentNode.appendChild(this._element.ownerDocument.createElement('source'));
        }
        DOMUtilities.replaceContentWithXMLContent(source, newContent);
    };
    /**
     * Return a parser used for normalized messages.
     */
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    Xliff2TransUnit.prototype.messageParser = /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    function () {
        return new Xliff2MessageParser();
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    Xliff2TransUnit.prototype.createSourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var sourceElement = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        if (sourceElement) {
            return this.messageParser().createNormalizedMessageFromXML(sourceElement, null);
        }
        else {
            return null;
        }
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    Xliff2TransUnit.prototype.targetContent = /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return DOMUtilities.getXMLContent(targetElement);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    Xliff2TransUnit.prototype.targetContentNormalized = /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var targetElement = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        return new Xliff2MessageParser().createNormalizedMessageFromXML(targetElement, this.sourceContentNormalized());
    };
    /**
     * State of the translation as stored in the xml.
     */
    /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    Xliff2TransUnit.prototype.nativeTargetState = /**
     * State of the translation as stored in the xml.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var segmentElement = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            return segmentElement.getAttribute('state');
        }
        else {
            return null;
        }
    };
    /**
     * set state in xml.
     * @param nativeState nativeState
     */
    /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    Xliff2TransUnit.prototype.setNativeTargetState = /**
     * set state in xml.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        /** @type {?} */
        var segmentElement = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segmentElement) {
            segmentElement.setAttribute('state', nativeState);
        }
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    Xliff2TransUnit.prototype.mapStateToNativeState = /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    function (state) {
        switch (state) {
            case STATE_NEW:
                return 'initial';
            case STATE_TRANSLATED:
                return 'translated';
            case STATE_FINAL:
                return 'final';
            default:
                throw new Error('unknown state ' + state);
        }
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    Xliff2TransUnit.prototype.mapNativeStateToState = /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        switch (nativeState) {
            case 'initial':
                return STATE_NEW;
            case 'translated':
                return STATE_TRANSLATED;
            case 'reviewed': // same as translated
                return STATE_TRANSLATED;
            case 'final':
                return STATE_FINAL;
            default:
                return STATE_NEW;
        }
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    Xliff2TransUnit.prototype.sourceReferences = /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    function () {
        // Source is found as <file>:<line> in <note category="location">...
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var sourceRefs = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === 'location') {
                /** @type {?} */
                var sourceAndPos = DOMUtilities.getPCDATA(noteElem);
                sourceRefs.push(this.parseSourceAndPos(sourceAndPos));
            }
        }
        return sourceRefs;
    };
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @param sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return source and line number
     */
    /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and line number
     */
    Xliff2TransUnit.prototype.parseSourceAndPos = /**
     * Parses something like 'c:\xxx:7' and returns source and linenumber.
     * @private
     * @param {?} sourceAndPos something like 'c:\xxx:7', last colon is the separator
     * @return {?} source and line number
     */
    function (sourceAndPos) {
        /** @type {?} */
        var index = sourceAndPos.lastIndexOf(':');
        if (index < 0) {
            return {
                sourcefile: sourceAndPos,
                linenumber: 0
            };
        }
        else {
            return {
                sourcefile: sourceAndPos.substring(0, index),
                linenumber: this.parseLineNumber(sourceAndPos.substring(index + 1))
            };
        }
    };
    /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    Xliff2TransUnit.prototype.parseLineNumber = /**
     * @private
     * @param {?} lineNumberString
     * @return {?}
     */
    function (lineNumberString) {
        return Number.parseInt(lineNumberString, 10);
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    Xliff2TransUnit.prototype.setSourceReferences = /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    function (sourceRefs) {
        var _this = this;
        this.removeAllSourceReferences();
        /** @type {?} */
        var notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (sourceRefs.length === 0 && !isNullOrUndefined(notesElement) && notesElement.childNodes.length === 0) {
            // remove empty notes element
            notesElement.parentNode.removeChild(notesElement);
            return;
        }
        if (isNullOrUndefined(notesElement)) {
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.insertBefore(notesElement, this._element.childNodes.item(0));
        }
        sourceRefs.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) {
            /** @type {?} */
            var note = _this._element.ownerDocument.createElement('note');
            note.setAttribute('category', 'location');
            note.appendChild(_this._element.ownerDocument.createTextNode(ref.sourcefile + ':' + ref.linenumber.toString(10)));
            notesElement.appendChild(note);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeAllSourceReferences = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var toBeRemoved = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var elem = noteElements.item(i);
            if (elem.getAttribute('category') === 'location') {
                toBeRemoved.push(elem);
            }
        }
        toBeRemoved.forEach((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) { elem.parentNode.removeChild(elem); }));
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     */
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     * @return {?}
     */
    Xliff2TransUnit.prototype.description = /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="description".
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('description');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    Xliff2TransUnit.prototype.setDescription = /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    function (description) {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('description');
        if (description) {
            if (isNullOrUndefined(noteElem)) {
                // create it
                this.createNoteElementWithCategoryAttribute('description', description);
            }
            else {
                DOMUtilities.replaceContentWithXMLContent(noteElem, description);
            }
        }
        else {
            if (!isNullOrUndefined(noteElem)) {
                // remove node
                this.removeNoteElementWithCategoryAttribute('description');
            }
        }
    };
    /**
     * Find a note element with attribute category='<attrValue>'
     * @param attrValue value of category attribute
     * @return element or null is absent
     */
    /**
     * Find a note element with attribute category='<attrValue>'
     * @private
     * @param {?} attrValue value of category attribute
     * @return {?} element or null is absent
     */
    Xliff2TransUnit.prototype.findNoteElementWithCategoryAttribute = /**
     * Find a note element with attribute category='<attrValue>'
     * @private
     * @param {?} attrValue value of category attribute
     * @return {?} element or null is absent
     */
    function (attrValue) {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            if (noteElem.getAttribute('category') === attrValue) {
                return noteElem;
            }
        }
        return null;
    };
    /**
     * Get all note elements where from attribute is not description or meaning
     * @return elements
     */
    /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    Xliff2TransUnit.prototype.findAllAdditionalNoteElements = /**
     * Get all note elements where from attribute is not description or meaning
     * @private
     * @return {?} elements
     */
    function () {
        /** @type {?} */
        var noteElements = this._element.getElementsByTagName('note');
        /** @type {?} */
        var result = [];
        for (var i = 0; i < noteElements.length; i++) {
            /** @type {?} */
            var noteElem = noteElements.item(i);
            /** @type {?} */
            var fromAttribute = noteElem.getAttribute('category');
            if (fromAttribute !== 'description' && fromAttribute !== 'meaning') {
                result.push(noteElem);
            }
        }
        return result;
    };
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @param attrValue category attribute value
     * @param content content of note element
     * @return the new created element
     */
    /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue category attribute value
     * @param {?} content content of note element
     * @return {?} the new created element
     */
    Xliff2TransUnit.prototype.createNoteElementWithCategoryAttribute = /**
     * Create a new note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue category attribute value
     * @param {?} content content of note element
     * @return {?} the new created element
     */
    function (attrValue, content) {
        /** @type {?} */
        var notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (isNullOrUndefined(notesElement)) {
            // create it
            notesElement = this._element.ownerDocument.createElement('notes');
            this._element.appendChild(notesElement);
        }
        /** @type {?} */
        var noteElement = this._element.ownerDocument.createElement('note');
        if (attrValue) {
            noteElement.setAttribute('category', attrValue);
        }
        if (content) {
            DOMUtilities.replaceContentWithXMLContent(noteElement, content);
        }
        notesElement.appendChild(noteElement);
        return noteElement;
    };
    /**
     * @private
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeNotesElementIfEmpty = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var notesElement = DOMUtilities.getFirstElementByTagName(this._element, 'notes');
        if (notesElement) {
            /** @type {?} */
            var childNote = DOMUtilities.getFirstElementByTagName(this._element, 'note');
            if (!childNote) {
                // remove notes element
                notesElement.parentNode.removeChild(notesElement);
            }
        }
    };
    /**
     * Remove note element with attribute from='<attrValue>'
     * @param attrValue attrValue
     */
    /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeNoteElementWithCategoryAttribute = /**
     * Remove note element with attribute from='<attrValue>'
     * @private
     * @param {?} attrValue attrValue
     * @return {?}
     */
    function (attrValue) {
        /** @type {?} */
        var noteElement = this.findNoteElementWithCategoryAttribute(attrValue);
        if (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        }
        this.removeNotesElementIfEmpty();
    };
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     */
    /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    Xliff2TransUnit.prototype.removeAllAdditionalNoteElements = /**
     * Remove all note elements where attribute "from" is not description or meaning.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElements = this.findAllAdditionalNoteElements();
        noteElements.forEach((/**
         * @param {?} noteElement
         * @return {?}
         */
        function (noteElement) {
            noteElement.parentNode.removeChild(noteElement);
        }));
        this.removeNotesElementIfEmpty();
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     */
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     * @return {?}
     */
    Xliff2TransUnit.prototype.meaning = /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xliff 2.0 this is stored as a note element with attribute category="meaning".
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (noteElem) {
            return DOMUtilities.getPCDATA(noteElem);
        }
        else {
            return null;
        }
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    Xliff2TransUnit.prototype.setMeaning = /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    function (meaning) {
        /** @type {?} */
        var noteElem = this.findNoteElementWithCategoryAttribute('meaning');
        if (meaning) {
            if (isNullOrUndefined(noteElem)) {
                // create it
                this.createNoteElementWithCategoryAttribute('meaning', meaning);
            }
            else {
                DOMUtilities.replaceContentWithXMLContent(noteElem, meaning);
            }
        }
        else {
            if (!isNullOrUndefined(noteElem)) {
                // remove node
                this.removeNoteElementWithCategoryAttribute('meaning');
            }
        }
    };
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     */
    /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    Xliff2TransUnit.prototype.notes = /**
     * Get all notes of the trans-unit.
     * Notes are remarks made by a translator.
     * (description and meaning are not included here!)
     * @return {?}
     */
    function () {
        /** @type {?} */
        var noteElememts = this.findAllAdditionalNoteElements();
        return noteElememts.map((/**
         * @param {?} elem
         * @return {?}
         */
        function (elem) {
            return {
                from: elem.getAttribute('category'),
                text: DOMUtilities.getPCDATA(elem)
            };
        }));
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    Xliff2TransUnit.prototype.supportsSetNotes = /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return true;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     */
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    Xliff2TransUnit.prototype.setNotes = /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * @return {?}
     */
    function (newNotes) {
        var _this = this;
        if (!isNullOrUndefined(newNotes)) {
            this.checkNotes(newNotes);
        }
        this.removeAllAdditionalNoteElements();
        if (!isNullOrUndefined(newNotes)) {
            newNotes.forEach((/**
             * @param {?} note
             * @return {?}
             */
            function (note) {
                _this.createNoteElementWithCategoryAttribute(note.from, note.text);
            }));
        }
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    Xliff2TransUnit.prototype.translateNative = /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            /** @type {?} */
            var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
        }
        DOMUtilities.replaceContentWithXMLContent(target, (/** @type {?} */ (translation)));
        this.setTargetState(STATE_TRANSLATED);
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    Xliff2TransUnit.prototype.cloneWithSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    function (isDefaultLang, copyContent, targetFile) {
        /** @type {?} */
        var element = (/** @type {?} */ (this._element.cloneNode(true)));
        /** @type {?} */
        var clone = new Xliff2TransUnit(element, this._id, targetFile);
        clone.useSourceAsTarget(isDefaultLang, copyContent);
        return clone;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    Xliff2TransUnit.prototype.useSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    function (isDefaultLang, copyContent) {
        /** @type {?} */
        var source = DOMUtilities.getFirstElementByTagName(this._element, 'source');
        /** @type {?} */
        var target = DOMUtilities.getFirstElementByTagName(this._element, 'target');
        if (!target) {
            target = source.parentNode.appendChild(this._element.ownerDocument.createElement('target'));
        }
        if (isDefaultLang || copyContent) {
            /** @type {?} */
            var sourceString = DOMUtilities.getXMLContent(source);
            /** @type {?} */
            var newTargetString = sourceString;
            if (!this.isICUMessage(sourceString)) {
                newTargetString = this.translationMessagesFile().getNewTransUnitTargetPraefix()
                    + sourceString
                    + this.translationMessagesFile().getNewTransUnitTargetSuffix();
            }
            DOMUtilities.replaceContentWithXMLContent(target, newTargetString);
        }
        else {
            DOMUtilities.replaceContentWithXMLContent(target, '');
        }
        /** @type {?} */
        var segment = DOMUtilities.getFirstElementByTagName(this._element, 'segment');
        if (segment) {
            if (isDefaultLang) {
                segment.setAttribute('state', this.mapStateToNativeState(STATE_FINAL));
            }
            else {
                segment.setAttribute('state', this.mapStateToNativeState(STATE_NEW));
            }
        }
    };
    return Xliff2TransUnit;
}(AbstractTransUnit));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 04.05.2017.
 * An XLIFF 2.0 file read from a source file.
 * Format definition is: http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * Defines some relevant get and set method for reading and modifying such a file.
 */
var /**
 * Created by martin on 04.05.2017.
 * An XLIFF 2.0 file read from a source file.
 * Format definition is: http://docs.oasis-open.org/xliff/xliff-core/v2.0/os/xliff-core-v2.0-os.html
 *
 * Defines some relevant get and set method for reading and modifying such a file.
 */
Xliff2File = /** @class */ (function (_super) {
    __extends(Xliff2File, _super);
    /**
     * Create an XLIFF 2.0-File from source.
     * @param xmlString source read from file.
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @return xliff file
     */
    function Xliff2File(xmlString, path, encoding) {
        var _this = _super.call(this) || this;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding);
        return _this;
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    Xliff2File.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @return {?}
     */
    function (xmlString, path, encoding) {
        this.parseContent(xmlString, path, encoding);
        /** @type {?} */
        var xliffList = this._parsedDocument.getElementsByTagName('xliff');
        if (xliffList.length !== 1) {
            throw new Error(format('File "%s" seems to be no xliff file (should contain an xliff element)', path));
        }
        else {
            /** @type {?} */
            var version = xliffList.item(0).getAttribute('version');
            /** @type {?} */
            var expectedVersion = '2.0';
            if (version !== expectedVersion) {
                throw new Error(format('File "%s" seems to be no xliff 2 file, version should be %s, found %s', path, expectedVersion, version));
            }
        }
        return this;
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     */
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    Xliff2File.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xmb', 'xmb2'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XLIFF20;
    };
    /**
     * File type.
     * Here 'XLIFF 2.0'
     */
    /**
     * File type.
     * Here 'XLIFF 2.0'
     * @return {?}
     */
    Xliff2File.prototype.fileType = /**
     * File type.
     * Here 'XLIFF 2.0'
     * @return {?}
     */
    function () {
        return FILETYPE_XLIFF20;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    Xliff2File.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['skeleton', 'note', 'data', 'source', 'target', 'pc', 'mrk'];
    };
    /**
     * @protected
     * @return {?}
     */
    Xliff2File.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('unit');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var transunit = transUnitsInFile.item(i);
            /** @type {?} */
            var id = transunit.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, trans-unit without "id" found in master, please check file %s', this._filename));
            }
            this.transUnits.push(new Xliff2TransUnit(transunit, id, this));
        }
    };
    /**
     * Get source language.
     * @return source language.
     */
    /**
     * Get source language.
     * @return {?} source language.
     */
    Xliff2File.prototype.sourceLanguage = /**
     * Get source language.
     * @return {?} source language.
     */
    function () {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            return xliffElem.getAttribute('srcLang');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the source language.
     * @param language language
     */
    /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    Xliff2File.prototype.setSourceLanguage = /**
     * Edit the source language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            xliffElem.setAttribute('srcLang', language);
        }
    };
    /**
     * Get target language.
     * @return target language.
     */
    /**
     * Get target language.
     * @return {?} target language.
     */
    Xliff2File.prototype.targetLanguage = /**
     * Get target language.
     * @return {?} target language.
     */
    function () {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            return xliffElem.getAttribute('trgLang');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the target language.
     * @param language language
     */
    /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    Xliff2File.prototype.setTargetLanguage = /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var xliffElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'xliff');
        if (xliffElem) {
            xliffElem.setAttribute('trgLang', language);
        }
    };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return the newly imported trans unit (since version 1.7.0)
     * @throws an error if trans-unit with same id already is in the file.
     */
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    Xliff2File.prototype.importNewTransUnit = /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        if (this.transUnitWithId(foreignTransUnit.id)) {
            throw new Error(format('tu with id %s already exists in file, cannot import it', foreignTransUnit.id));
        }
        /** @type {?} */
        var newTu = ((/** @type {?} */ (foreignTransUnit))).cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        /** @type {?} */
        var fileElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'file');
        if (!fileElement) {
            throw new Error(format('File "%s" seems to be no xliff 2.0 file (should contain a file element)', this._filename));
        }
        /** @type {?} */
        var inserted = false;
        /** @type {?} */
        var isAfterElementPartOfFile = false;
        if (!!importAfterElement) {
            /** @type {?} */
            var insertionPoint = this.transUnitWithId(importAfterElement.id);
            if (!!insertionPoint) {
                isAfterElementPartOfFile = true;
            }
        }
        if (importAfterElement === undefined || (importAfterElement && !isAfterElementPartOfFile)) {
            fileElement.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            /** @type {?} */
            var firstUnitElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'unit');
            if (firstUnitElement) {
                DOMUtilities.insertBefore(newTu.asXmlElement(), firstUnitElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to first file element
                fileElement.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            /** @type {?} */
            var refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'unit', importAfterElement.id);
            if (refUnitElement) {
                DOMUtilities.insertAfter(newTu.asXmlElement(), refUnitElement);
                inserted = true;
            }
        }
        if (inserted) {
            this.lazyInitializeTransUnits();
            this.transUnits.push(newTu);
            this.countNumbers();
            return newTu;
        }
        else {
            return null;
        }
    };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    Xliff2File.prototype.createTranslationFileForLang = /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    function (lang, filename, isDefaultLang, copyContent) {
        /** @type {?} */
        var translationFile = new Xliff2File(this.editedContent(), filename, this.encoding());
        translationFile.setNewTransUnitTargetPraefix(this.targetPraefix);
        translationFile.setNewTransUnitTargetSuffix(this.targetSuffix);
        translationFile.setTargetLanguage(lang);
        translationFile.forEachTransUnit((/**
         * @param {?} transUnit
         * @return {?}
         */
        function (transUnit) {
            ((/** @type {?} */ (transUnit))).useSourceAsTarget(isDefaultLang, copyContent);
        }));
        return translationFile;
    };
    return Xliff2File;
}(AbstractTranslationMessagesFile));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
var /**
 * Created by martin on 23.05.2017.
 * A Translation Unit in an XTB file.
 */
XtbTransUnit = /** @class */ (function (_super) {
    __extends(XtbTransUnit, _super);
    function XtbTransUnit(_element, _id, _translationMessagesFile, _sourceTransUnitFromMaster) {
        var _this = _super.call(this, _element, _id, _translationMessagesFile) || this;
        _this._sourceTransUnitFromMaster = _sourceTransUnitFromMaster;
        return _this;
    }
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return content to translate.
     */
    /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} content to translate.
     */
    XtbTransUnit.prototype.sourceContent = /**
     * Get content to translate.
     * Source parts are excluded here.
     * @return {?} content to translate.
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceContent();
        }
        else {
            return null;
        }
    };
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XtbTransUnit.prototype.supportsSetSourceContent = /**
     * Test, wether setting of source content is supported.
     * If not, setSourceContent in trans-unit will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param newContent the new content.
     */
    /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    XtbTransUnit.prototype.setSourceContent = /**
     * Set new source content in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing changed source content.
     * @param {?} newContent the new content.
     * @return {?}
     */
    function (newContent) {
        // xtb has no source content, they are part of the master
    };
    /**
     * Return a parser used for normalized messages.
     */
    /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    XtbTransUnit.prototype.messageParser = /**
     * Return a parser used for normalized messages.
     * @protected
     * @return {?}
     */
    function () {
        return new XmbMessageParser(); // no typo!, Same as for Xmb
    };
    /**
     * The original text value, that is to be translated, as normalized message.
     */
    /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    XtbTransUnit.prototype.createSourceContentNormalized = /**
     * The original text value, that is to be translated, as normalized message.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.createSourceContentNormalized();
        }
        else {
            return null;
        }
    };
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     */
    /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    XtbTransUnit.prototype.targetContent = /**
     * the translated value (containing all markup, depends on the concrete format used).
     * @return {?}
     */
    function () {
        return DOMUtilities.getXMLContent(this._element);
    };
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     */
    /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    XtbTransUnit.prototype.targetContentNormalized = /**
     * the translated value, but all placeholders are replaced with {{n}} (starting at 0)
     * and all embedded html is replaced by direct html markup.
     * @return {?}
     */
    function () {
        return this.messageParser().createNormalizedMessageFromXML(this._element, this.sourceContentNormalized());
    };
    /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     */
    /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     * @return {?}
     */
    XtbTransUnit.prototype.nativeTargetState = /**
     * State of the translation.
     * (not supported in xmb)
     * If we have a master, we assumed it is translated if the content is not the same as the masters one.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            /** @type {?} */
            var sourceContent = this._sourceTransUnitFromMaster.sourceContent();
            if (!sourceContent || sourceContent === this.targetContent() || !this.targetContent()) {
                return 'new';
            }
            else {
                return 'final';
            }
        }
        return null; // not supported in xmb
    };
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @param state one of Constants.STATE...
     * @returns a native state (depends on concrete format)
     * @throws error, if state is invalid.
     */
    /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    XtbTransUnit.prototype.mapStateToNativeState = /**
     * Map an abstract state (new, translated, final) to a concrete state used in the xml.
     * Returns the state to be used in the xml.
     * @throws error, if state is invalid.
     * @protected
     * @param {?} state one of Constants.STATE...
     * @return {?} a native state (depends on concrete format)
     */
    function (state) {
        return state;
    };
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @param nativeState nativeState
     */
    /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XtbTransUnit.prototype.mapNativeStateToState = /**
     * Map a native state (found in the document) to an abstract state (new, translated, final).
     * Returns the abstract state.
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        return nativeState;
    };
    /**
     * set state in xml.
     * (not supported in xmb)
     * @param nativeState nativeState
     */
    /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    XtbTransUnit.prototype.setNativeTargetState = /**
     * set state in xml.
     * (not supported in xmb)
     * @protected
     * @param {?} nativeState nativeState
     * @return {?}
     */
    function (nativeState) {
        // TODO some logic to store it anywhere
    };
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     */
    /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    XtbTransUnit.prototype.sourceReferences = /**
     * All the source elements in the trans unit.
     * The source element is a reference to the original template.
     * It contains the name of the template file and a line number with the position inside the template.
     * It is just a help for translators to find the context for the translation.
     * This is set when using Angular 4.0 or greater.
     * Otherwise it just returns an empty array.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.sourceReferences();
        }
        else {
            return [];
        }
    };
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XtbTransUnit.prototype.supportsSetSourceReferences = /**
     * Test, wether setting of source refs is supported.
     * If not, setSourceReferences will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param sourceRefs the sourcerefs to set. Old ones are removed.
     */
    /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    XtbTransUnit.prototype.setSourceReferences = /**
     * Set source ref elements in the transunit.
     * Normally, this is done by ng-extract.
     * Method only exists to allow xliffmerge to merge missing source refs.
     * @param {?} sourceRefs the sourcerefs to set. Old ones are removed.
     * @return {?}
     */
    function (sourceRefs) {
        // xtb has no source refs, they are part of the master
    };
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     */
    /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    XtbTransUnit.prototype.description = /**
     * The description set in the template as value of the i18n-attribute.
     * e.g. i18n="mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.description();
        }
        else {
            return null;
        }
    };
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     */
    /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    XtbTransUnit.prototype.meaning = /**
     * The meaning (intent) set in the template as value of the i18n-attribute.
     * This is the part in front of the | symbol.
     * e.g. i18n="meaning|mydescription".
     * In xtb only the master stores it.
     * @return {?}
     */
    function () {
        if (this._sourceTransUnitFromMaster) {
            return this._sourceTransUnitFromMaster.meaning();
        }
        else {
            return null;
        }
    };
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XtbTransUnit.prototype.supportsSetDescriptionAndMeaning = /**
     * Test, wether setting of description and meaning is supported.
     * If not, setDescription and setMeaning will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Change description property of trans-unit.
     * @param description description
     */
    /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    XtbTransUnit.prototype.setDescription = /**
     * Change description property of trans-unit.
     * @param {?} description description
     * @return {?}
     */
    function (description) {
        // not supported, do nothing
    };
    /**
     * Change meaning property of trans-unit.
     * @param meaning meaning
     */
    /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    XtbTransUnit.prototype.setMeaning = /**
     * Change meaning property of trans-unit.
     * @param {?} meaning meaning
     * @return {?}
     */
    function (meaning) {
        // not supported, do nothing
    };
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     */
    /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    XtbTransUnit.prototype.notes = /**
     * Get all notes of the trans-unit.
     * There are NO notes in xmb/xtb
     * @return {?}
     */
    function () {
        return [];
    };
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     */
    /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    XtbTransUnit.prototype.supportsSetNotes = /**
     * Test, wether setting of notes is supported.
     * If not, setNotes will do nothing.
     * xtb does not support this, all other formats do.
     * @return {?}
     */
    function () {
        return false;
    };
    /**
     * Add notes to trans unit.
     * @param newNotes the notes to add.
     * NOT Supported in xmb/xtb
     */
    /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    XtbTransUnit.prototype.setNotes = /**
     * Add notes to trans unit.
     * @param {?} newNotes the notes to add.
     * NOT Supported in xmb/xtb
     * @return {?}
     */
    function (newNotes) {
        // not supported, do nothing
    };
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xtb there is nothing to do, because there is only a target, no source.
     */
    /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xtb there is nothing to do, because there is only a target, no source.
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    XtbTransUnit.prototype.cloneWithSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * Returns a changed copy of this trans unit.
     * receiver is not changed.
     * (internal usage only, a client should call importNewTransUnit on ITranslationMessageFile)
     * In xtb there is nothing to do, because there is only a target, no source.
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @param {?} targetFile
     * @return {?}
     */
    function (isDefaultLang, copyContent, targetFile) {
        return this;
    };
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     */
    /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    XtbTransUnit.prototype.useSourceAsTarget = /**
     * Copy source to target to use it as dummy translation.
     * (internal usage only, a client should call createTranslationFileForLang on ITranslationMessageFile)
     * @param {?} isDefaultLang
     * @param {?} copyContent
     * @return {?}
     */
    function (isDefaultLang, copyContent) {
        // do nothing
    };
    /**
     * Set the translation to a given string (including markup).
     * @param translation translation
     */
    /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    XtbTransUnit.prototype.translateNative = /**
     * Set the translation to a given string (including markup).
     * @protected
     * @param {?} translation translation
     * @return {?}
     */
    function (translation) {
        /** @type {?} */
        var target = this._element;
        if (isNullOrUndefined(translation)) {
            translation = '';
        }
        DOMUtilities.replaceContentWithXMLContent(target, translation);
    };
    return XtbTransUnit;
}(AbstractTransUnit));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 23.05.2017.
 * xtb-File access.
 * xtb is the translated counterpart to xmb.
 */
var /**
 * Created by martin on 23.05.2017.
 * xtb-File access.
 * xtb is the translated counterpart to xmb.
 */
XtbFile = /** @class */ (function (_super) {
    __extends(XtbFile, _super);
    /**
     * Create an xmb-File from source.
     * @param _translationMessageFileFactory factory to create a translation file (xtb) for the xmb file
     * @param xmlString file content
     * @param path Path to file
     * @param encoding optional encoding of the xml.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * @return XmbFile
     */
    function XtbFile(_translationMessageFileFactory, xmlString, path, encoding, optionalMaster) {
        var _this = _super.call(this) || this;
        _this._translationMessageFileFactory = _translationMessageFileFactory;
        _this._warnings = [];
        _this._numberOfTransUnitsWithMissingId = 0;
        _this.initializeFromContent(xmlString, path, encoding, optionalMaster);
        return _this;
    }
    /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @param {?=} optionalMaster
     * @return {?}
     */
    XtbFile.prototype.initializeFromContent = /**
     * @private
     * @param {?} xmlString
     * @param {?} path
     * @param {?} encoding
     * @param {?=} optionalMaster
     * @return {?}
     */
    function (xmlString, path, encoding, optionalMaster) {
        this.parseContent(xmlString, path, encoding);
        if (this._parsedDocument.getElementsByTagName('translationbundle').length !== 1) {
            throw new Error(format('File "%s" seems to be no xtb file (should contain a translationbundle element)', path));
        }
        if (optionalMaster) {
            try {
                this._masterFile = this._translationMessageFileFactory.createFileFromFileContent(FORMAT_XMB, optionalMaster.xmlContent, optionalMaster.path, optionalMaster.encoding);
                // check, wether this can be the master ...
                /** @type {?} */
                var numberInMaster = this._masterFile.numberOfTransUnits();
                /** @type {?} */
                var myNumber = this.numberOfTransUnits();
                if (numberInMaster !== myNumber) {
                    this._warnings.push(format('%s trans units found in master, but this file has %s. Check if it is the correct master', numberInMaster, myNumber));
                }
            }
            catch (error) {
                throw new Error(format('File "%s" seems to be no xmb file. An xtb file needs xmb as master file.', optionalMaster.path));
            }
        }
        return this;
    };
    /**
     * @protected
     * @return {?}
     */
    XtbFile.prototype.initializeTransUnits = /**
     * @protected
     * @return {?}
     */
    function () {
        this.transUnits = [];
        /** @type {?} */
        var transUnitsInFile = this._parsedDocument.getElementsByTagName('translation');
        for (var i = 0; i < transUnitsInFile.length; i++) {
            /** @type {?} */
            var msg = transUnitsInFile.item(i);
            /** @type {?} */
            var id = msg.getAttribute('id');
            if (!id) {
                this._warnings.push(format('oops, msg without "id" found in master, please check file %s', this._filename));
            }
            /** @type {?} */
            var masterUnit = null;
            if (this._masterFile) {
                masterUnit = this._masterFile.transUnitWithId(id);
            }
            this.transUnits.push(new XtbTransUnit(msg, id, this, (/** @type {?} */ (masterUnit))));
        }
    };
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     */
    /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    XtbFile.prototype.i18nFormat = /**
     * File format as it is used in config files.
     * Currently 'xlf', 'xlf2', 'xmb', 'xtb'
     * Returns one of the constants FORMAT_..
     * @return {?}
     */
    function () {
        return FORMAT_XTB;
    };
    /**
     * File type.
     * Here 'XTB'
     */
    /**
     * File type.
     * Here 'XTB'
     * @return {?}
     */
    XtbFile.prototype.fileType = /**
     * File type.
     * Here 'XTB'
     * @return {?}
     */
    function () {
        return FILETYPE_XTB;
    };
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     */
    /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    XtbFile.prototype.elementsWithMixedContent = /**
     * return tag names of all elements that have mixed content.
     * These elements will not be beautified.
     * Typical candidates are source and target.
     * @protected
     * @return {?}
     */
    function () {
        return ['translation'];
    };
    /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return source language.
     */
    /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return {?} source language.
     */
    XtbFile.prototype.sourceLanguage = /**
     * Get source language.
     * Unsupported in xmb/xtb.
     * Try to guess it from master filename if any..
     * @return {?} source language.
     */
    function () {
        if (this._masterFile) {
            return this._masterFile.sourceLanguage();
        }
        else {
            return null;
        }
    };
    /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param language language
     */
    /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param {?} language language
     * @return {?}
     */
    XtbFile.prototype.setSourceLanguage = /**
     * Edit the source language.
     * Unsupported in xmb/xtb.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        // do nothing, xtb has no notation for this.
    };
    /**
     * Get target language.
     * @return target language.
     */
    /**
     * Get target language.
     * @return {?} target language.
     */
    XtbFile.prototype.targetLanguage = /**
     * Get target language.
     * @return {?} target language.
     */
    function () {
        /** @type {?} */
        var translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (translationbundleElem) {
            return translationbundleElem.getAttribute('lang');
        }
        else {
            return null;
        }
    };
    /**
     * Edit the target language.
     * @param language language
     */
    /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    XtbFile.prototype.setTargetLanguage = /**
     * Edit the target language.
     * @param {?} language language
     * @return {?}
     */
    function (language) {
        /** @type {?} */
        var translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (translationbundleElem) {
            translationbundleElem.setAttribute('lang', language);
        }
    };
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @param foreignTransUnit the trans unit to be imported.
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return the newly imported trans unit (since version 1.7.0)
     * @throws an error if trans-unit with same id already is in the file.
     */
    /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    XtbFile.prototype.importNewTransUnit = /**
     * Add a new trans-unit to this file.
     * The trans unit stems from another file.
     * It copies the source content of the tu to the target content too,
     * depending on the values of isDefaultLang and copyContent.
     * So the source can be used as a dummy translation.
     * (used by xliffmerge)
     * @throws an error if trans-unit with same id already is in the file.
     * @param {?} foreignTransUnit the trans unit to be imported.
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @param {?=} importAfterElement optional (since 1.10) other transunit (part of this file), that should be used as ancestor.
     * Newly imported trans unit is then inserted directly after this element.
     * If not set or not part of this file, new unit will be imported at the end.
     * If explicity set to null, new unit will be imported at the start.
     * @return {?} the newly imported trans unit (since version 1.7.0)
     */
    function (foreignTransUnit, isDefaultLang, copyContent, importAfterElement) {
        if (this.transUnitWithId(foreignTransUnit.id)) {
            throw new Error(format('tu with id %s already exists in file, cannot import it', foreignTransUnit.id));
        }
        /** @type {?} */
        var newMasterTu = ((/** @type {?} */ (foreignTransUnit))).cloneWithSourceAsTarget(isDefaultLang, copyContent, this);
        /** @type {?} */
        var translationbundleElem = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translationbundle');
        if (!translationbundleElem) {
            throw new Error(format('File "%s" seems to be no xtb file (should contain a translationbundle element)', this._filename));
        }
        /** @type {?} */
        var translationElement = translationbundleElem.ownerDocument.createElement('translation');
        translationElement.setAttribute('id', foreignTransUnit.id);
        /** @type {?} */
        var newContent = (copyContent || isDefaultLang) ? foreignTransUnit.sourceContent() : '';
        if (!((/** @type {?} */ (foreignTransUnit))).isICUMessage(newContent)) {
            newContent = this.getNewTransUnitTargetPraefix() + newContent + this.getNewTransUnitTargetSuffix();
        }
        DOMUtilities.replaceContentWithXMLContent(translationElement, newContent);
        /** @type {?} */
        var newTu = new XtbTransUnit(translationElement, foreignTransUnit.id, this, newMasterTu);
        /** @type {?} */
        var inserted = false;
        /** @type {?} */
        var isAfterElementPartOfFile = false;
        if (!!importAfterElement) {
            /** @type {?} */
            var insertionPoint = this.transUnitWithId(importAfterElement.id);
            if (!!insertionPoint) {
                isAfterElementPartOfFile = true;
            }
        }
        if (importAfterElement === undefined || (importAfterElement && !isAfterElementPartOfFile)) {
            translationbundleElem.appendChild(newTu.asXmlElement());
            inserted = true;
        }
        else if (importAfterElement === null) {
            /** @type {?} */
            var firstTranslationElement = DOMUtilities.getFirstElementByTagName(this._parsedDocument, 'translation');
            if (firstTranslationElement) {
                DOMUtilities.insertBefore(newTu.asXmlElement(), firstTranslationElement);
                inserted = true;
            }
            else {
                // no trans-unit, empty file, so add to bundle at end
                translationbundleElem.appendChild(newTu.asXmlElement());
                inserted = true;
            }
        }
        else {
            /** @type {?} */
            var refUnitElement = DOMUtilities.getElementByTagNameAndId(this._parsedDocument, 'translation', importAfterElement.id);
            if (refUnitElement) {
                DOMUtilities.insertAfter(newTu.asXmlElement(), refUnitElement);
                inserted = true;
            }
        }
        if (inserted) {
            this.lazyInitializeTransUnits();
            this.transUnits.push(newTu);
            this.countNumbers();
            return newTu;
        }
        else {
            return null;
        }
    };
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param lang Language code
     * @param filename expected filename to store file
     * @param isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     */
    /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    XtbFile.prototype.createTranslationFileForLang = /**
     * Create a new translation file for this file for a given language.
     * Normally, this is just a copy of the original one.
     * But for XMB the translation file has format 'XTB'.
     * @param {?} lang Language code
     * @param {?} filename expected filename to store file
     * @param {?} isDefaultLang Flag, wether file contains the default language.
     * Then source and target are just equal.
     * The content will be copied.
     * State will be final.
     * @param {?} copyContent Flag, wether to copy content or leave it empty.
     * Wben true, content will be copied from source.
     * When false, content will be left empty (if it is not the default language).
     * @return {?}
     */
    function (lang, filename, isDefaultLang, copyContent) {
        throw new Error(format('File "%s", xtb files are not translatable, they are already translations', filename));
    };
    return XtbFile;
}(AbstractTranslationMessagesFile));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Helper class to read translation files depending on format.
 * This is part of the public api
 */
var  /**
 * Helper class to read translation files depending on format.
 * This is part of the public api
 */
TranslationMessagesFileFactory = /** @class */ (function () {
    function TranslationMessagesFileFactory() {
    }
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param xmlContent the file content
     * @param path the path of the file (only used to remember it)
     * @param encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return either XliffFile or XmbFile
     */
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    TranslationMessagesFileFactory.fromFileContent = /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    function (i18nFormat, xmlContent, path, encoding, optionalMaster) {
        return new TranslationMessagesFileFactory().createFileFromFileContent(i18nFormat, xmlContent, path, encoding, optionalMaster);
    };
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param xmlContent the file content
     * @param path the path of the file (only used to remember it)
     * @param encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return either XliffFile or XmbFile
     */
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    TranslationMessagesFileFactory.fromUnknownFormatFileContent = /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    function (xmlContent, path, encoding, optionalMaster) {
        return new TranslationMessagesFileFactory().createFileFromUnknownFormatFileContent(xmlContent, path, encoding, optionalMaster);
    };
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param xmlContent the file content
     * @param path the path of the file (only used to remember it)
     * @param encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return either XliffFile or XmbFile
     */
    /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    TranslationMessagesFileFactory.prototype.createFileFromFileContent = /**
     * Read file function, result depends on format, either XliffFile or XmbFile.
     * @param {?} i18nFormat currently 'xlf' or 'xlf2' or 'xmb' or 'xtb' are supported
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    function (i18nFormat, xmlContent, path, encoding, optionalMaster) {
        if (i18nFormat === FORMAT_XLIFF12) {
            return new XliffFile(xmlContent, path, encoding);
        }
        if (i18nFormat === FORMAT_XLIFF20) {
            return new Xliff2File(xmlContent, path, encoding);
        }
        if (i18nFormat === FORMAT_XMB) {
            return new XmbFile(this, xmlContent, path, encoding);
        }
        if (i18nFormat === FORMAT_XTB) {
            return new XtbFile(this, xmlContent, path, encoding, optionalMaster);
        }
        throw new Error(format('oops, unsupported format "%s"', i18nFormat));
    };
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param xmlContent the file content
     * @param path the path of the file (only used to remember it)
     * @param encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return either XliffFile or XmbFile
     */
    /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    TranslationMessagesFileFactory.prototype.createFileFromUnknownFormatFileContent = /**
     * Read file function for any file with unknown format.
     * This functions tries to guess the format based on the filename and the content of the file.
     * Result depends on detected format, either XliffFile or XmbFile.
     * @param {?} xmlContent the file content
     * @param {?} path the path of the file (only used to remember it)
     * @param {?} encoding utf-8, ... used to parse XML.
     * This is read from the file, but if you know it before, you can avoid reading the file twice.
     * @param {?=} optionalMaster in case of xmb the master file, that contains the original texts.
     * (this is used to support state infos, that are based on comparing original with translated version)
     * Ignored for other formats.
     * @return {?} either XliffFile or XmbFile
     */
    function (xmlContent, path, encoding, optionalMaster) {
        /** @type {?} */
        var formatCandidates = [FORMAT_XLIFF12, FORMAT_XLIFF20, FORMAT_XMB, FORMAT_XTB];
        if (path && path.endsWith('xmb')) {
            formatCandidates = [FORMAT_XMB, FORMAT_XTB, FORMAT_XLIFF12, FORMAT_XLIFF20];
        }
        if (path && path.endsWith('xtb')) {
            formatCandidates = [FORMAT_XTB, FORMAT_XMB, FORMAT_XLIFF12, FORMAT_XLIFF20];
        }
        // try all candidate formats to get the right one
        for (var i = 0; i < formatCandidates.length; i++) {
            /** @type {?} */
            var formatCandidate = formatCandidates[i];
            try {
                /** @type {?} */
                var translationFile = TranslationMessagesFileFactory.fromFileContent(formatCandidate, xmlContent, path, encoding, optionalMaster);
                if (translationFile) {
                    return translationFile;
                }
            }
            catch (e) {
                // seams to be the wrong format
            }
        }
        throw new Error(format('could not identify file format, it is neiter XLIFF (1.2 or 2.0) nor XMB/XTB'));
    };
    return TranslationMessagesFileFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { FILETYPE_XLIFF12, FILETYPE_XLIFF20, FILETYPE_XMB, FILETYPE_XTB, FORMAT_XLIFF12, FORMAT_XLIFF20, FORMAT_XMB, FORMAT_XTB, NORMALIZATION_FORMAT_DEFAULT, NORMALIZATION_FORMAT_NGXTRANSLATE, NgxI18nsupportLibModule, STATE_FINAL, STATE_NEW, STATE_TRANSLATED, TranslationMessagesFileFactory };
//# sourceMappingURL=ngx-i18nsupport-ngx-i18nsupport-lib.js.map
