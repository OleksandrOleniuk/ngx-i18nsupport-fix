"use strict";
/**
 * Schematic to add one or more additional languages to a project using @ngx-i18nsupport.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const common_1 = require("../common");
const common_2 = require("../common");
const xliffmerge_config_json_snapshot_1 = require("../common/xliffmerge-config-json-snapshot");
/*
Add language configuration of newly added languages.
This adds the new language
- to the builder configuration
- or to the config file mentioned in the builder configuration
depending on what is used.
 */
function addLanguagesToBuilderConfiguration(workspaceToChange, options, languagesToAdd) {
    const xliffmergeConf = workspaceToChange.getActualXliffmergeConfigFromWorkspace(options.project);
    if (!xliffmergeConf) {
        return (_host, context) => {
            const msg = 'did not find any configuration information in xliffmerge builder configuration';
            context.logger.fatal(msg);
            throw new schematics_1.SchematicsException(msg);
        };
    }
    const foundConfiguration = {
        xliffmergeOptions: xliffmergeConf.xliffmergeOptions
    };
    const newLanguagesArray = [];
    const languages = foundConfiguration.xliffmergeOptions.languages;
    if (languages) {
        newLanguagesArray.push(...languages);
    }
    newLanguagesArray.push(...languagesToAdd);
    foundConfiguration.xliffmergeOptions.languages = newLanguagesArray;
    workspaceToChange.addArchitectBuilderToProject(options.project, common_1.xliffmergeBuilderName, common_1.xliffmergeBuilderSpec, foundConfiguration);
}
/**
 * Sets all options given by commandline or defaults.
 * It also checks values for correctness.
 * @param optionsFromCommandline command line options.
 * @param host the tree to lookup some workspace settings.
 * @param context use for error logging.
 * @return an object where all relevant values are set.
 */
function setupOptions(optionsFromCommandline, host, context) {
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
        // read xliffmerge.json
        try {
            const snapshot = new xliffmerge_config_json_snapshot_1.XliffmergeConfigJsonSnapshot(`${options.path}/xliffmerge.json`, host, context);
            xliffmergeOptions = snapshot.getXliffmergeConfigJson();
        }
        catch (e) {
            xliffmergeOptions = null;
        }
        if (!xliffmergeOptions) {
            const msg = 'No builder configuration and also no config file "xliffmerge.json" could be found. ' +
                'Please install @ngx-i18nsupport via "ng add @ngx-i18nsupport/tooling" to create it';
            context.logger.fatal(msg);
            throw new schematics_1.SchematicsException(msg);
        }
        options.useXliffmergeBuilder = false;
    }
    if (!xliffmergeOptions.xliffmergeOptions) {
        xliffmergeOptions.xliffmergeOptions = {};
    }
    if (xliffmergeOptions.xliffmergeOptions.i18nFormat) {
        options.i18nFormat = xliffmergeOptions.xliffmergeOptions.i18nFormat;
    }
    else {
        options.i18nFormat = common_2.defaultI18nFormat;
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
        options.i18nLocale = common_2.defaultI18nLocale;
    }
    if (optionsFromCommandline.language && optionsFromCommandline.languages) {
        const msg = 'Only language as parameter or --languages can be used, not both.';
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    if (optionsFromCommandline.language) {
        options.parsedLanguages = [optionsFromCommandline.language];
    }
    else {
        if (!optionsFromCommandline.languages) {
            options.parsedLanguages = [];
        }
        else {
            options.parsedLanguages = optionsFromCommandline.languages.split(',');
        }
    }
    if (options.parsedLanguages.length === 0) {
        const msg = 'At least 1 language must be specified.';
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    if (options.parsedLanguages.indexOf(options.i18nLocale) >= 0) {
        const msg = `Language "${options.i18nLocale}" is already configured (as default language).`;
        context.logger.fatal(msg);
        throw new schematics_1.SchematicsException(msg);
    }
    options.configuredLanguages = xliffmergeOptions.xliffmergeOptions.languages ? xliffmergeOptions.xliffmergeOptions.languages : [];
    // check languages
    for (const lang of options.parsedLanguages) {
        if (options.configuredLanguages.indexOf(lang) >= 0) {
            const msg = `Language "${lang}" is already configured.`;
            context.logger.fatal(msg);
            throw new schematics_1.SchematicsException(msg);
        }
    }
    for (const lang of options.parsedLanguages) {
        if (!common_2.isValidLanguageSyntax(lang)) {
            const msg = `"${lang}" is not a valid language code.`;
            context.logger.fatal(msg);
            throw new schematics_1.SchematicsException(msg);
        }
    }
    return options;
}
/**
 * The schematic factory addLanguage.
 * @param optionsFromCommandline contains the languages to be added.
 */
function addLanguage(optionsFromCommandline) {
    return (host, context) => {
        const options = setupOptions(optionsFromCommandline, host, context);
        const xliffmergeConfigChanges = (options.useXliffmergeBuilder) ? schematics_1.noop() : (tree, context2) => {
            const xliffmergeConfigSnapshot = new xliffmerge_config_json_snapshot_1.XliffmergeConfigJsonSnapshot(`${options.path}/xliffmerge.json`, tree, context2);
            xliffmergeConfigSnapshot.addLanguagesToXliffmergeConfiguration(languagesToAdd);
            xliffmergeConfigSnapshot.commit();
        };
        const languagesToAdd = options.parsedLanguages
            .filter(lang => lang !== options.i18nLocale);
        const angularJsonChanges = (tree, context2) => {
            const ws = new common_1.WorkspaceSnaphot(tree, context2);
            languagesToAdd
                .forEach(lang => ws.addLanguageConfigurationToProject(options, lang));
            if (options.useXliffmergeBuilder) {
                addLanguagesToBuilderConfiguration(ws, options, languagesToAdd);
            }
            ws.commit();
        };
        const packageJsonChanges = (tree, context2) => {
            const packageJson = new common_1.PackageJsonSnapshot('/', tree, context2);
            packageJson.changeExtractScript(options);
            languagesToAdd
                .forEach(lang => packageJson.addStartScript(options, lang));
            packageJson.commit();
        };
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                angularJsonChanges,
                packageJsonChanges,
                xliffmergeConfigChanges
            ]))
        ])(host, context);
    };
}
exports.addLanguage = addLanguage;
//# sourceMappingURL=index.js.map