(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ngx-i18nsupport/tooling', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global['ngx-i18nsupport'] = global['ngx-i18nsupport'] || {}, global['ngx-i18nsupport'].tooling = {}), global.ng.core));
}(this, function (exports, core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ToolingModule = /** @class */ (function () {
        function ToolingModule() {
        }
        ToolingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [],
                        exports: []
                    },] }
        ];
        return ToolingModule;
    }());

    exports.ToolingModule = ToolingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-i18nsupport-tooling.umd.js.map
