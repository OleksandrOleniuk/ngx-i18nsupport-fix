"use strict";
/**
 * Some common functions used by testcases.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@schematics/angular/application/schema");
const workspace_snapshot_1 = require("./workspace-snapshot");
exports.workspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '6.0.0',
};
exports.appOptions = {
    name: 'bar',
    experimentalIvy: false,
    inlineStyle: false,
    inlineTemplate: false,
    minimal: true,
    routing: false,
    style: schema_1.Style.Css,
    skipTests: true,
    skipPackageJson: true,
};
exports.libOptions = {
    name: 'bar',
    entryFile: 'public_api',
    prefix: 'lib',
    skipPackageJson: true,
    skipInstall: true,
    skipTsConfig: true
};
function readAsJson(tree, path) {
    const content = tree.read(path);
    if (!content) {
        throw new Error('file ' + path + ' not found in tree');
    }
    const contentString = content.toString('UTF-8');
    return JSON.parse(contentString);
}
exports.readAsJson = readAsJson;
function readPackageJson(tree, projectName) {
    const path = (!projectName) ? '' : '/' + projectName;
    expect(tree.files).toContain(`${path}/package.json`);
    return readAsJson(tree, `${path}/package.json`);
}
exports.readPackageJson = readPackageJson;
function readAngularJson(tree) {
    expect(tree.files).toContain('/angular.json');
    return readAsJson(tree, '/angular.json');
}
exports.readAngularJson = readAngularJson;
function readXliffmergeJson(tree, projectName) {
    const path = projectName ? `/projects/${projectName}/xliffmerge.json` : '/xliffmerge.json';
    expect(tree.files).toContain(path);
    return readAsJson(tree, path);
}
exports.readXliffmergeJson = readXliffmergeJson;
/**
 * Read the xliffmerge configuration form the builder options.
 * @param tree Tree
 * @param projectName name of project
 */
function readXliffmergeConfigFromWorkspace(tree, projectName) {
    const ws = new workspace_snapshot_1.WorkspaceSnaphot(tree);
    return ws.getActualXliffmergeConfigFromWorkspace(projectName);
}
exports.readXliffmergeConfigFromWorkspace = readXliffmergeConfigFromWorkspace;
//# sourceMappingURL=common-testing_spec.js.map