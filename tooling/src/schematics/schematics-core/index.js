"use strict";
/**
 * Collection of utility functions used in schematics.
 * (mainly copied from @ngrx schematics)
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("./utility/strings");
const special_strings_1 = require("./utility/special-strings");
var parse_name_1 = require("./utility/parse-name");
exports.parseName = parse_name_1.parseName;
var project_1 = require("./utility/project");
exports.getProject = project_1.getProject;
var config_1 = require("./utility/config");
exports.getWorkspace = config_1.getWorkspace;
exports.getWorkspacePath = config_1.getWorkspacePath;
var dependencies_1 = require("./utility/dependencies");
exports.addPackageJsonDependency = dependencies_1.addPackageJsonDependency;
exports.getPackageJsonDependency = dependencies_1.getPackageJsonDependency;
exports.NodeDependencyType = dependencies_1.NodeDependencyType;
exports.stringUtils = {
    dasherize: strings_1.dasherize,
    decamelize: strings_1.decamelize,
    camelize: strings_1.camelize,
    classify: strings_1.classify,
    underscore: strings_1.underscore,
    capitalize: strings_1.capitalize,
    commaseparatedToArrayString: special_strings_1.commaseparatedToArrayString,
    toArrayString: special_strings_1.toArrayString
};
//# sourceMappingURL=index.js.map