import { logging } from '@angular-devkit/core';
/**
 * TestLogger stores all log entries and has some tests to check logs.
 * (a helper class for testing)
 */
export class TestLogger extends logging.Logger {
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
//# sourceMappingURL=testlogger_spec.js.map