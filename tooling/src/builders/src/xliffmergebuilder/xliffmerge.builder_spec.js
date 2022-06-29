import * as tslib_1 from "tslib";
import { join, normalize, virtualFs } from '@angular-devkit/core';
import { createArchitect, host } from './testing_utils';
import { TestLogger } from './testlogger_spec';
describe('xliffmerge.builder', () => {
    let architect;
    const xliffmergeTargetSpec = { project: 'hello-world-app', target: 'xliffmerge' };
    function runXliffmergeBuilderOnTestWorkspace(configuration, logger) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const run = yield architect.scheduleTarget(xliffmergeTargetSpec, configuration, { logger: logger });
            const output = yield run.result;
            yield run.stop();
            return output;
        });
    }
    beforeEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        /**
         * We are using a test workspace from the test folder.
         * In this workspace the xliffmerge builder is already configured.
         */
        yield host.initialize().toPromise();
        const architectInfo = yield createArchitect(host.root());
        architect = architectInfo.architect;
    }));
    afterEach(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
        host.restore().toPromise();
    }));
    it('should show error when called with illegal profile', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = new TestLogger('logger');
        const profileName = 'nonexistentfile';
        const builderOutput = yield runXliffmergeBuilderOnTestWorkspace({ profile: profileName }, logger);
        expect(builderOutput.success).toBe(false);
        const msg = 'could not read profile';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(logger.includes(profileName)).toBe(true, `filename "${profileName}" not found in log`);
    }));
    it('should show error when called with illegal configuration', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = new TestLogger('logger');
        const xlfFileName = 'nonexistentxlffile';
        const builderOutput = yield runXliffmergeBuilderOnTestWorkspace({ xliffmergeOptions: { i18nFile: xlfFileName } }, logger);
        expect(builderOutput.success).toBe(false);
        const msg = 'is not readable';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(logger.includes(xlfFileName)).toBe(true, `filename "${xlfFileName}" not found in log`);
    }));
    it('should use profile when called with both profile and configuration', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = new TestLogger('logger');
        const profileName = 'nonexistentfile';
        const xlfFileName = 'nonexistentxlffile';
        const builderOutput = yield runXliffmergeBuilderOnTestWorkspace({
            profile: profileName, xliffmergeOptions: { i18nFile: xlfFileName }
        }, logger);
        expect(builderOutput.success).toBe(false);
        const msg = 'could not read profile';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(logger.includes(profileName)).toBe(true, `filename "${profileName}" not found in log`);
    }));
    it('should run successfully with given xliffmergeOptions', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = new TestLogger('logger');
        const configuration = {
            xliffmergeOptions: {
                'srcDir': 'src/i18n',
                'genDir': 'src/i18nout',
                languages: ['en', 'de'],
                verbose: true
            }
        };
        const generatedFileEN = join(normalize('src'), 'i18nout', 'messages.en.xlf');
        const generatedFileDE = join(normalize('src'), 'i18nout', 'messages.de.xlf');
        const builderOutput = yield runXliffmergeBuilderOnTestWorkspace(configuration, logger);
        expect(builderOutput.success).toBe(true);
        const msg = 'WARNING: please translate file';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        host.scopedSync().read(generatedFileEN);
        host.scopedSync().read(generatedFileDE);
        expect(yield host.scopedSync().exists(generatedFileEN)).toBe(true, `file ${generatedFileEN} not generated`);
        expect(yield host.scopedSync().exists(generatedFileDE)).toBe(true, `file ${generatedFileDE} not generated`);
    }));
    it('should run successfully with options from profile', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const logger = new TestLogger('logger');
        const profileContent = {
            xliffmergeOptions: {
                'srcDir': 'src/i18n',
                'genDir': 'src/i18nout',
                languages: ['en', 'de']
            }
        };
        host.scopedSync().write(join(normalize('.'), 'xliffmergeconfig.json'), virtualFs.stringToFileBuffer(JSON.stringify(profileContent)));
        const configuration = {
            profile: 'xliffmergeconfig.json'
        };
        const generatedFileEN = join(normalize('src'), 'i18nout', 'messages.en.xlf');
        const generatedFileDE = join(normalize('src'), 'i18nout', 'messages.de.xlf');
        const builderOutput = yield runXliffmergeBuilderOnTestWorkspace(configuration, logger);
        expect(builderOutput.success).toBe(true);
        const msg = 'WARNING: please translate file';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(host.scopedSync().exists(generatedFileEN)).toBe(true, `file ${generatedFileEN} not generated`);
        expect(host.scopedSync().exists(generatedFileDE)).toBe(true, `file ${generatedFileDE} not generated`);
    }));
});
//# sourceMappingURL=xliffmerge.builder_spec.js.map