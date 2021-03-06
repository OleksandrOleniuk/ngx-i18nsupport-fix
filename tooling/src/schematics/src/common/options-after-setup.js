"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("../../schematics-core/utility/config");
const schematics_core_1 = require("../../schematics-core");
function setupCommonOptions(optionsFromCommandline, host, context) {
    const options = Object.assign({}, optionsFromCommandline);
    let workspace;
    try {
        workspace = config_1.getWorkspace(host);
    }
    catch (e) {
        const msg = 'Could not find a workspace (must contain angular.json or .angular.json)';
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    if (!workspace.projects) {
        const msg = 'Returned workspace contains no projects, workspace (content of angular.json) was: ' + JSON.stringify(workspace);
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    const defaultProjectName = Object.keys(workspace.projects)[0];
    options.isDefaultProject = !optionsFromCommandline.project || optionsFromCommandline.project === defaultProjectName;
    if (!options.project) {
        options.project = defaultProjectName;
    }
    const project = workspace.projects[options.project];
    if (!project) {
        const msg = 'Workspace contains no project named "' + options.project + '".';
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    if (project.projectType !== 'application') {
        const msg = 'Project must be of type "application", but it is of type "' + project.projectType + '".';
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    if (options.path === undefined) {
        options.path = `/${project.root}`;
    }
    const parsedPath = schematics_core_1.parseName(options.path, 'anyfile');
    options.path = parsedPath.path;
    options.srcDir = 'src';
    options.genDir = 'src';
    if (options.localePath) {
        options.srcDir = options.srcDir + '/' + options.localePath;
        options.genDir = options.genDir + '/' + options.localePath;
    }
    options.configuredLanguages = [];
    options.useComandlineForLanguages = false;
    return options;
}
exports.setupCommonOptions = setupCommonOptions;
//# sourceMappingURL=options-after-setup.js.map