/**
 An Angular Builder to run xliffmerge.
 Work is based on nice blog article
 https://medium.com/dailyjs/angular-cli-6-under-the-hood-builders-demystified-f0690ebcf01 by Evgeny Barabanov
**/
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { asWindowsPath, getSystemPath, join, normalize } from '@angular-devkit/core';
import { XliffMerge, CommandOutput, WriterToString } from '@ngx-i18nsupport/ngx-i18nsupport';
import { isAbsolute } from 'path';
export class XliffmergeBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const programOptions = this.createProgramOptionsFromConfig(builderConfig);
        const options = (programOptions.profilePath) ?
            undefined :
            this.createProfileContentFromConfig(builderConfig);
        const ws = new WriterToString();
        const commandOutput = new CommandOutput(ws);
        const xliffmerge = XliffMerge.createFromOptions(commandOutput, programOptions, options);
        return xliffmerge.runAsync().pipe(map((rc) => {
            const success = (rc === 0);
            if (!success) {
                this.context.logger.warn(`xliffmerge rc=${rc}`);
            }
            this.context.logger.info(ws.writtenData());
            return { success: success };
        }), catchError((error) => {
            this.context.logger.info(ws.writtenData());
            this.context.logger.error('xliffmerge failed: ' + error);
            return of({ success: false });
        }));
    }
    createProgramOptionsFromConfig(builderConfig) {
        const profile = builderConfig.profile;
        if (profile) {
            const wsRoot = normalize(this.context.workspaceRoot);
            const profilePath = `${getSystemPath(wsRoot)}/${profile}`;
            return { profilePath: profilePath };
        }
        else {
            return {};
        }
    }
    createProfileContentFromConfig(builderConfig) {
        const xliffmergeOptions = builderConfig.xliffmergeOptions;
        if (xliffmergeOptions) {
            const wsRoot = normalize(this.context.workspaceRoot);
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
        if (!pathToAdjust || isAbsolute(pathToAdjust)) {
            return pathToAdjust;
        }
        const adjustedPath = join(wsRoot, pathToAdjust);
        return (process.platform === 'win32') ? asWindowsPath(adjustedPath) : adjustedPath;
    }
}
export default XliffmergeBuilder;
//# sourceMappingURL=xliffmerge.builder.js.map