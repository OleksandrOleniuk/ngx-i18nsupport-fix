"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsed_message_part_1 = require("./parsed-message-part");
/**
 * Created by martin on 05.05.2017.
 * A message part consisting of an opening tag like <b> or <strange>.
 */
class ParsedMessagePartStartTag extends parsed_message_part_1.ParsedMessagePart {
    constructor(tagname, idcounter) {
        super(parsed_message_part_1.ParsedMessagePartType.START_TAG);
        this._tagname = tagname;
        this._idcounter = idcounter;
    }
    asDisplayString(format) {
        if (this._idcounter === 0) {
            return '<' + this._tagname + '>';
        }
        else {
            return '<' + this._tagname + ' id="' + this._idcounter.toString() + '">';
        }
    }
    tagName() {
        return this._tagname;
    }
    idCounter() {
        return this._idcounter;
    }
}
exports.ParsedMessagePartStartTag = ParsedMessagePartStartTag;
//# sourceMappingURL=parsed-message-part-start-tag.js.map