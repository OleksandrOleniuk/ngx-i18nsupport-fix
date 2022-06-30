"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const testing_utils_1 = require("./testing_utils");
const testlogger_spec_1 = require("./testlogger_spec");
describe('xliffmerge.builder', () => {
    let architect;
    const xliffmergeTargetSpec = { project: 'hello-world-app', target: 'xliffmerge' };
    async function runXliffmergeBuilderOnTestWorkspace(configuration, logger) {
        const run = await architect.scheduleTarget(xliffmergeTargetSpec, configuration, { logger: logger });
        const output = await run.result;
        await run.stop();
        return output;
    }
    beforeEach(async () => {
        /**
         * We are using a test workspace from the test folder.
         * In this workspace the xliffmerge builder is already configured.
         */
        await testing_utils_1.host.initialize().toPromise();
        const architectInfo = await testing_utils_1.createArchitect(testing_utils_1.host.root());
        architect = architectInfo.architect;
    });
    afterEach(async () => {
        testing_utils_1.host.restore().toPromise();
    });
    it('should show error when called with illegal profile', async () => {
        const logger = new testlogger_spec_1.TestLogger('logger');
        const profileName = 'nonexistentfile';
        const builderOutput = await runXliffmergeBuilderOnTestWorkspace({ profile: profileName }, logger);
        expect(builderOutput.success).toBe(false);
        const msg = 'could not read profile';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(logger.includes(profileName)).toBe(true, `filename "${profileName}" not found in log`);
    });
    it('should show error when called with illegal configuration', async () => {
        const logger = new testlogger_spec_1.TestLogger('logger');
        const xlfFileName = 'nonexistentxlffile';
        const builderOutput = await runXliffmergeBuilderOnTestWorkspace({ xliffmergeOptions: { i18nFile: xlfFileName } }, logger);
        expect(builderOutput.success).toBe(false);
        const msg = 'is not readable';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(logger.includes(xlfFileName)).toBe(true, `filename "${xlfFileName}" not found in log`);
    });
    it('should use profile when called with both profile and configuration', async () => {
        const logger = new testlogger_spec_1.TestLogger('logger');
        const profileName = 'nonexistentfile';
        const xlfFileName = 'nonexistentxlffile';
        const builderOutput = await runXliffmergeBuilderOnTestWorkspace({
            profile: profileName, xliffmergeOptions: { i18nFile: xlfFileName }
        }, logger);
        expect(builderOutput.success).toBe(false);
        const msg = 'could not read profile';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(logger.includes(profileName)).toBe(true, `filename "${profileName}" not found in log`);
    });
    it('should run successfully with given xliffmergeOptions', async () => {
        const logger = new testlogger_spec_1.TestLogger('logger');
        const configuration = {
            xliffmergeOptions: {
                'srcDir': 'src/i18n',
                'genDir': 'src/i18nout',
                languages: ['en', 'de'],
                verbose: true
            }
        };
        const generatedFileEN = core_1.join(core_1.normalize('src'), 'i18nout', 'messages.en.xlf');
        const generatedFileDE = core_1.join(core_1.normalize('src'), 'i18nout', 'messages.de.xlf');
        const builderOutput = await runXliffmergeBuilderOnTestWorkspace(configuration, logger);
        expect(builderOutput.success).toBe(true);
        const msg = 'WARNING: please translate file';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        testing_utils_1.host.scopedSync().read(generatedFileEN);
        testing_utils_1.host.scopedSync().read(generatedFileDE);
        expect(await testing_utils_1.host.scopedSync().exists(generatedFileEN)).toBe(true, `file ${generatedFileEN} not generated`);
        expect(await testing_utils_1.host.scopedSync().exists(generatedFileDE)).toBe(true, `file ${generatedFileDE} not generated`);
    });
    it('should run successfully with options from profile', async () => {
        const logger = new testlogger_spec_1.TestLogger('logger');
        const profileContent = {
            xliffmergeOptions: {
                'srcDir': 'src/i18n',
                'genDir': 'src/i18nout',
                languages: ['en', 'de']
            }
        };
        testing_utils_1.host.scopedSync().write(core_1.join(core_1.normalize('.'), 'xliffmergeconfig.json'), core_1.virtualFs.stringToFileBuffer(JSON.stringify(profileContent)));
        const configuration = {
            profile: 'xliffmergeconfig.json'
        };
        const generatedFileEN = core_1.join(core_1.normalize('src'), 'i18nout', 'messages.en.xlf');
        const generatedFileDE = core_1.join(core_1.normalize('src'), 'i18nout', 'messages.de.xlf');
        const builderOutput = await runXliffmergeBuilderOnTestWorkspace(configuration, logger);
        expect(builderOutput.success).toBe(true);
        const msg = 'WARNING: please translate file';
        expect(logger.includes(msg)).toBe(true, `msg "${msg}" not found in log`);
        expect(testing_utils_1.host.scopedSync().exists(generatedFileEN)).toBe(true, `file ${generatedFileEN} not generated`);
        expect(testing_utils_1.host.scopedSync().exists(generatedFileDE)).toBe(true, `file ${generatedFileDE} not generated`);
    });
});
//# sourceMappingURL=xliffmerge.builder_spec.js.map