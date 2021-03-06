"use strict";
/**
 * Some additional helper string functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts a string that contains comma separated values to a string containing json array syntax.
 * Example: commaseparatedToArrayString('en,de') return '["en", "de"]'.
 * @param commaSeparatedList the list string
 * @return the formatted string
 */
function commaseparatedToArrayString(commaSeparatedList) {
    if (!commaSeparatedList) {
        return '[]';
    }
    const values = commaSeparatedList.split(',');
    let result = '[';
    for (let i = 0; i < values.length; i++) {
        if (i > 0) {
            result = result + ', ';
        }
        result = result + '"' + values[i] + '"';
    }
    result = result + ']';
    return result;
}
exports.commaseparatedToArrayString = commaseparatedToArrayString;
/**
 * Converts a string[] that contains some values to a string containing json array syntax.
 * Example: toArrayString(['en', 'de']) return '["en", "de"]'.
 * @param values the strings to be formatted
 * @return the formatted string
 */
function toArrayString(values) {
    if (!values) {
        return '[]';
    }
    let result = '[';
    for (let i = 0; i < values.length; i++) {
        if (i > 0) {
            result = result + ', ';
        }
        result = result + '"' + values[i] + '"';
    }
    result = result + ']';
    return result;
}
exports.toArrayString = toArrayString;
//# sourceMappingURL=special-strings.js.map