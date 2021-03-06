"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const chalk_1 = require("chalk");
const common_1 = require("../common");
const extract_script_1 = require("../common/extract-script");
const xliffmerge_config_json_snapshot_1 = require("../common/xliffmerge-config-json-snapshot");
function setupOptions(optionsFromCommandline, extractScript, extractScriptPath, host, context) {
    const options = common_1.setupCommonOptions(optionsFromCommandline, host, context);
    let xliffmergeOptions;
    const ws = new common_1.WorkspaceSnaphot(host, context);
    const optionsFromBuilder = ws.getActualXliffmergeConfigFromWorkspace(options.project);
    if (optionsFromBuilder) {
        options.useXliffmergeBuilder = true;
        if (optionsFromBuilder.profile) {
            options.profileUsedByBuilder = optionsFromBuilder.profile;
        }
        xliffmergeOptions = optionsFromBuilder;
    }
    else {
        // read xliffmerge.json used in extract script
        xliffmergeOptions = getProfileContent(extractScript, extractScriptPath, host, context).content;
    }
    if (!xliffmergeOptions) {
        const msg = 'No builder configuration and also no config file "xliffmerge.json" could be found. ' +
            'Please install @ngx-i18nsupport via "ng add @ngx-i18nsupport/tooling" to create it';
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    options.useXliffmergeBuilder = false;
    if (!xliffmergeOptions.xliffmergeOptions) {
        xliffmergeOptions.xliffmergeOptions = {};
    }
    if (xliffmergeOptions.xliffmergeOptions.i18nFormat) {
        options.i18nFormat = xliffmergeOptions.xliffmergeOptions.i18nFormat;
    }
    else {
        options.i18nFormat = common_1.defaultI18nFormat;
    }
    if (xliffmergeOptions.xliffmergeOptions.srcDir) {
        options.srcDir = xliffmergeOptions.xliffmergeOptions.srcDir;
    }
    if (xliffmergeOptions.xliffmergeOptions.genDir) {
        options.genDir = xliffmergeOptions.xliffmergeOptions.genDir;
    }
    if (xliffmergeOptions.xliffmergeOptions.defaultLanguage) {
        options.i18nLocale = xliffmergeOptions.xliffmergeOptions.defaultLanguage;
    }
    else {
        options.i18nLocale = common_1.defaultI18nLocale;
    }
    options.configuredLanguages = xliffmergeOptions.xliffmergeOptions.languages ? xliffmergeOptions.xliffmergeOptions.languages : [];
    return options;
}
function getProfileContent(extractScript, packageJsonPath, host, context) {
    const profile = extractScript.xliffmergeProfile();
    if (profile) {
        const path = packageJsonPath + '/' + profile;
        try {
            const snapshot = new xliffmerge_config_json_snapshot_1.XliffmergeConfigJsonSnapshot(path, host, context);
            return { profile: path, content: snapshot.getXliffmergeConfigJson() };
        }
        catch (e) {
            const msg = `Could not find config file "${path}"`;
            context.logger.warn(msg);
            throw new schematics_1.SchematicsException(msg);
        }
    }
    else {
        return { profile: '', content: null };
    }
}
function updateToV11(options) {
    return (host, context) => {
        context.logger.info('Update @ngx-i18nsupport to version 1.1');
        // find all projects that are using xliffmerge
        const angularJson = new common_1.WorkspaceSnaphot(host, context);
        const defaultProjectName = angularJson.getDefaultProjectName();
        const projects = angularJson.getAllProjects();
        if (projects.length === 0) {
            context.logger.warn('Did not find any projects in angular.json');
            return;
        }
        let packageJson;
        try {
            packageJson = new common_1.PackageJsonSnapshot('/', host, context);
        }
        catch (e) {
            context.logger.error('Did not find package.json');
            return;
        }
        let migrationCount = 0;
        projects.forEach(project => {
            const isDefaultProject = (defaultProjectName === project.name);
            let extractScript = packageJson.getExtractScriptForProject(project.name, isDefaultProject);
            if (!extractScript && !isDefaultProject) {
                const extractScriptForDefaultProject = packageJson.getExtractScriptForProject(null, true);
                if (extractScriptForDefaultProject && extractScriptForDefaultProject.projectName() === project.name) {
                    // this script has old name extract-i18n, but should be extract-i18n-<projectname>
                    packageJson.removeScript(extractScriptForDefaultProject.name);
                    extractScript = new extract_script_1.ExtractScript(common_1.extractScriptName(project.name, isDefaultProject), extractScriptForDefaultProject.content);
                }
            }
            if (extractScript) {
                if (extractScript.usesXliffmergeCommandline()) {
                    options.project = project.name;
                    try {
                        const optionsAfterSetup = setupOptions(options, extractScript, '/', host, context);
                        optionsAfterSetup.isDefaultProject = isDefaultProject;
                        optionsAfterSetup.project = project.name;
                        const { profile, content } = getProfileContent(extractScript, '/', host, context);
                        const languagesFromCommandline = extractScript.languages();
                        if (content && languagesFromCommandline.length > 0) {
                            if (!content.xliffmergeOptions) {
                                content.xliffmergeOptions = {};
                            }
                            content.xliffmergeOptions.languages = languagesFromCommandline;
                        }
                        optionsAfterSetup.useXliffmergeBuilder = true;
                        packageJson.addExtractScript(optionsAfterSetup);
                        packageJson.commit();
                        angularJson.addArchitectBuilderToProject(project.name, common_1.xliffmergeBuilderName, common_1.xliffmergeBuilderSpec, content);
                        host.delete(profile);
                        migrationCount++;
                        // TODO config script etc...
                    }
                    catch (e) {
                        context.logger.warn(`Could not migrate project ${project.name}: ${e.toString()}`);
                    }
                }
                else {
                    context.logger.info(`project ${project.name} does not use xliffmerge command line`);
                }
            }
            else {
                const scriptName = common_1.extractScriptName(project.name, defaultProjectName === project.name);
                context.logger.info(`project ${project.name} does not use i18n (no ${scriptName} script found)`);
            }
        });
        if (migrationCount === 0) {
            context.logger.warn('Did not find any projects using xliffmerge in angular.json');
        }
        else {
            angularJson.commit();
            common_1.addXliffmergeDependencyToPackageJson(false)(host, context);
        }
    };
}
exports.updateToV11 = updateToV11;
/** Post-update schematic to be called when update is finished. */
function postUpdate() {
    return () => {
        console.log();
        console.log(chalk_1.default.green('  ???  @ngx-i18nsupport update complete'));
        console.log();
        console.log(chalk_1.default.yellow('  ???  Please check the output above for any issues that were detected ' +
            'but could not be automatically fixed.'));
    };
}
exports.postUpdate = postUpdate;
//# sourceMappingURL=index.js.map