"use strict";
/**
 * Functions shared between the schematics.
 **/
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_core_1 = require("../../schematics-core");
const constants_1 = require("./constants");
const tasks_1 = require("@angular-devkit/schematics/tasks");
/**
 * Check syntax of language code.
 * (pattern copied from xliffmerge)
 * Must be compatible with XML Schema type xsd:language.
 * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
 * @param lang the language code
 * @return true, if valid, false otherwise
 */
function isValidLanguageSyntax(lang) {
    const pattern = /^[a-zA-Z]{1,8}([-_][a-zA-Z0-9]{1,8})*$/;
    return pattern.test(lang);
}
exports.isValidLanguageSyntax = isValidLanguageSyntax;
/**
 * returns the build configuration to be set.
 */
function buildConfigurationForLanguage(options, language) {
    return {
        aot: true,
        outputPath: `dist/${options.project}-${language}`,
        i18nFile: `${options.genDir}/messages.${language}.xlf`,
        i18nFormat: options.i18nFormat,
        i18nLocale: language
    };
}
exports.buildConfigurationForLanguage = buildConfigurationForLanguage;
/**
 * returns the serve configuration to be set.
 */
function serveConfigurationForLanguage(options, language) {
    return {
        browserTarget: `${options.project}:build:${language}`
    };
}
exports.serveConfigurationForLanguage = serveConfigurationForLanguage;
/**
 * Add dev dependencies to actual xliffmerge version to package.json
 * @param skipInstall wether install should be skipped
 */
function addXliffmergeDependencyToPackageJson(skipInstall) {
    return (host, context) => {
        const dependencyToXliffmerge = {
            type: schematics_core_1.NodeDependencyType.Dev,
            name: constants_1.xliffmergePackage,
            version: constants_1.xliffmergeVersion,
            overwrite: true
        };
        schematics_core_1.addPackageJsonDependency(host, dependencyToXliffmerge);
        if (!skipInstall) {
            context.addTask(new tasks_1.NodePackageInstallTask());
        }
        return host;
    };
}
exports.addXliffmergeDependencyToPackageJson = addXliffmergeDependencyToPackageJson;
//# sourceMappingURL=common-functions.js.map