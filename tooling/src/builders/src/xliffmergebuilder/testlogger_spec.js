"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
/**
 * TestLogger stores all log entries and has some tests to check logs.
 * (a helper class for testing)
 */
class TestLogger extends core_1.logging.Logger {
    constructor(name, parent) {
        super(name, parent);
        this.debugEnabled = false;
        this.logs = [];
        this.subscribe(ev => {
            if (this.debugEnabled) {
                console.log('LogEvent', ev);
            }
            this.logs.push(ev.message);
        });
    }
    clear() {
        this.logs = [];
    }
    debugEnable(flag) {
        this.debugEnabled = flag;
    }
    includes(message) {
        return this.logs.findIndex(msg => msg.indexOf(message) >= 0) >= 0;
    }
    test(re) {
        return this.logs.findIndex(msg => re.test(msg)) >= 0;
    }
}
exports.TestLogger = TestLogger;
//# sourceMappingURL=testlogger_spec.js.map