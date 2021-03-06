"use strict";
/**
 * Schematic to automatically add support for using @ngx-i18nsupport.
 * Will be called when you call 'ng add @ngx-i18nsupport/tooling'.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const schematics_core_1 = require("../../schematics-core");
const common_1 = require("../common");
/**
 * Sets all options given by commandline or defaults.
 * It also checks values for correctness.
 * @param optionsFromCommandline command line options.
 * @param context use for error logging.
 * @param host the tree to lookup some workspace settings.
 * @return an object where all relevant values are set.
 */
function setupOptions(optionsFromCommandline, host, context) {
    const options = common_1.setupCommonOptions(optionsFromCommandline, host, context);
    if (options.useXliffmergeBuilder) {
        options.profileUsedByBuilder = undefined;
    }
    options.useComandlineForLanguages = optionsFromCommandline.useCommandlineForLanguages ?
        optionsFromCommandline.useCommandlineForLanguages
        : false;
    const languagesFromCommandline = (optionsFromCommandline.languages) ? optionsFromCommandline.languages.split(',') : [];
    if (!optionsFromCommandline.i18nLocale) {
        if (languagesFromCommandline.length > 0) {
            options.i18nLocale = languagesFromCommandline[0];
        }
        else {
            options.i18nLocale = common_1.defaultI18nLocale;
        }
    }
    options.parsedLanguages = [options.i18nLocale];
    if (optionsFromCommandline.languages) {
        options.parsedLanguages.push(...languagesFromCommandline);
    }
    // remove duplicates
    options.parsedLanguages = options.parsedLanguages.filter((v, i, a) => a.indexOf(v) === i);
    for (const lang of options.parsedLanguages) {
        if (!common_1.isValidLanguageSyntax(lang)) {
            const msg = `"${lang}" is not a valid language code.`;
            context.logger.fatal(msg);
            throw new schematics_1.SchematicsException(msg);
        }
    }
    return options;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
// noinspection JSUnusedGlobalSymbols
function ngAdd(optionsFromCommandline) {
    return (host, context) => {
        const options = setupOptions(optionsFromCommandline, host, context);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template(Object.assign({}, schematics_core_1.stringUtils, options, { 'i18nLocale': options.i18nLocale, 'i18nFormat': options.i18nFormat })),
            schematics_1.move(options.path ? options.path : ''),
        ]);
        const angularJsonChanges = (tree, context2) => {
            const ws = new common_1.WorkspaceSnaphot(tree, context2);
            options.parsedLanguages
                .filter(lang => lang !== options.i18nLocale)
                .forEach(lang => ws.addLanguageConfigurationToProject(options, lang));
            if (options.useXliffmergeBuilder) {
                ws.addBuilderConfigurationToProject(options);
            }
            ws.commit();
        };
        const packageJsonChanges = (tree, context2) => {
            const packageJson = new common_1.PackageJsonSnapshot('/', tree, context2);
            packageJson.addExtractScript(options);
            options.parsedLanguages
                .filter(lang => lang !== options.i18nLocale)
                .forEach(lang => packageJson.addStartScript(options, lang));
            packageJson.commit();
        };
        return schematics_1.chain([
            schematics_1.branchAndMerge(schematics_1.chain([
                packageJsonChanges,
                angularJsonChanges,
                (options.useXliffmergeBuilder) ? schematics_1.noop() : schematics_1.mergeWith(templateSource)
            ])),
            common_1.addXliffmergeDependencyToPackageJson(options.skipInstall),
        ])(host, context);
    };
}
exports.ngAdd = ngAdd;
//# sourceMappingURL=index.js.map