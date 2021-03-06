"use strict";
/**
 * Common constants.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * xliffmerge package that will be added to package.json
 */
exports.xliffmergePackage = '@ngx-i18nsupport/ngx-i18nsupport';
/**
 * Current version of @ngx-i18nsupport/xliffmerge
 * This value will be written into package.json of the project that uses ng add.
 * TODO must be changed for every new release.
 */
exports.xliffmergeVersion = '^1.1.6';
/**
 * The default language (i18nLocale) when you do not specify anything.
 */
exports.defaultI18nLocale = 'en';
/**
 * The default i18n format used when you do not specify anything.
 */
exports.defaultI18nFormat = 'xlf';
/**
 * Name of extract script.
 * The script for default project is named this way.
 * The script for other projects is named `${extractScriptNameSuffix}-${project}`
 */
const extractScriptNameSuffix = 'extract-i18n';
/**
 * Name of extract script for a project
 * @param project name of project
 * @param isDefaultProject flag, wethe it is the default project.
 */
function extractScriptName(project, isDefaultProject) {
    if (!project || isDefaultProject) {
        return extractScriptNameSuffix;
    }
    else {
        return `${extractScriptNameSuffix}-${project}`;
    }
}
exports.extractScriptName = extractScriptName;
/**
 * Name of xliffmerge builder.
 */
exports.xliffmergeBuilderName = 'xliffmerge';
/**
 * Spec of xliffmerge builder.
 */
exports.xliffmergeBuilderSpec = '@ngx-i18nsupport/tooling:' + exports.xliffmergeBuilderName;
//# sourceMappingURL=constants.js.map