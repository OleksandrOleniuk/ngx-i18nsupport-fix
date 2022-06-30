"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const architect_1 = require("@angular-devkit/architect");
const xliffmerge_builder_1 = tslib_1.__importDefault(require("./xliffmerge.builder"));
exports.default = architect_1.createBuilder((options, context) => {
    const xliffmergeBuilder = new xliffmerge_builder_1.default(context);
    return xliffmergeBuilder.run(options).toPromise();
});
//# sourceMappingURL=index.js.map