"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 An Angular Builder to run xliffmerge.
 Work is based on nice blog article
 https://medium.com/dailyjs/angular-cli-6-under-the-hood-builders-demystified-f0690ebcf01 by Evgeny Barabanov
**/
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const core_1 = require("@angular-devkit/core");
const ngx_i18nsupport_1 = require("@ngx-i18nsupport/ngx-i18nsupport");
const path_1 = require("path");
class XliffmergeBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const programOptions = this.createProgramOptionsFromConfig(builderConfig);
        const options = (programOptions.profilePath) ?
            undefined :
            this.createProfileContentFromConfig(builderConfig);
        const ws = new ngx_i18nsupport_1.WriterToString();
        const commandOutput = new ngx_i18nsupport_1.CommandOutput(ws);
        const xliffmerge = ngx_i18nsupport_1.XliffMerge.createFromOptions(commandOutput, programOptions, options);
        return xliffmerge.runAsync().pipe(operators_1.map((rc) => {
            const success = (rc === 0);
            if (!success) {
                this.context.logger.warn(`xliffmerge rc=${rc}`);
            }
            this.context.logger.info(ws.writtenData());
            return { success: success };
        }), operators_1.catchError((error) => {
            this.context.logger.info(ws.writtenData());
            this.context.logger.error('xliffmerge failed: ' + error);
            return rxjs_1.of({ success: false });
        }));
    }
    createProgramOptionsFromConfig(builderConfig) {
        const profile = builderConfig.profile;
        if (profile) {
            const wsRoot = core_1.normalize(this.context.workspaceRoot);
            const profilePath = `${core_1.getSystemPath(wsRoot)}/${profile}`;
            return { profilePath: profilePath };
        }
        else {
            return {};
        }
    }
    createProfileContentFromConfig(builderConfig) {
        const xliffmergeOptions = builderConfig.xliffmergeOptions;
        if (xliffmergeOptions) {
            const wsRoot = core_1.normalize(this.context.workspaceRoot);
            // replace all pathes in options by absolute paths
            xliffmergeOptions.srcDir = this.adjustPathToWorkspaceRoot(wsRoot, xliffmergeOptions.srcDir);
            xliffmergeOptions.genDir = this.adjustPathToWorkspaceRoot(wsRoot, xliffmergeOptions.genDir);
            xliffmergeOptions.apikeyfile = this.adjustPathToWorkspaceRoot(wsRoot, xliffmergeOptions.apikeyfile);
            return { xliffmergeOptions: xliffmergeOptions };
        }
        else {
            return undefined;
        }
    }
    adjustPathToWorkspaceRoot(wsRoot, pathToAdjust) {
        if (!pathToAdjust || path_1.isAbsolute(pathToAdjust)) {
            return pathToAdjust;
        }
        const adjustedPath = core_1.join(wsRoot, pathToAdjust);
        return (process.platform === 'win32') ? core_1.asWindowsPath(adjustedPath) : adjustedPath;
    }
}
exports.XliffmergeBuilder = XliffmergeBuilder;
exports.default = XliffmergeBuilder;
//# sourceMappingURL=xliffmerge.builder.js.map