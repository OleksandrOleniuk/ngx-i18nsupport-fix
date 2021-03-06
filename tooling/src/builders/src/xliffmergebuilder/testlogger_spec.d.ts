import { logging } from '@angular-devkit/core';
/**
 * TestLogger stores all log entries and has some tests to check logs.
 * (a helper class for testing)
 */
export declare class TestLogger extends logging.Logger {
    logs: string[];
    debugEnabled: boolean;
    constructor(name: string, parent?: logging.Logger | null);
    clear(): void;
    debugEnable(flag: boolean): void;
    includes(message: string): boolean;
    test(re: RegExp): boolean;
}
