"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class contains all informations about the extract i18n script used in a package.json file.
 * It can create such a script and can analyze an existing script.
 */
const constants_1 = require("./constants");
class ExtractScript {
    constructor(_name, _content) {
        this._name = _name;
        this._content = _content;
    }
    static fullExtractScript(options) {
        const defaultLanguage = options.i18nLocale;
        const i18nFormat = options.i18nFormat;
        const languagesBlankSeparated = options.languages ? options.languages.replace(/,/g, ' ') : '';
        const languagesCommandLineArgument = (options.useComandlineForLanguages) ? ' ' + languagesBlankSeparated : '';
        const baseOutputPath = (options.isDefaultProject) ? '' : 'src/';
        const localeDir = options.localePath ? `${baseOutputPath}${options.localePath}` : baseOutputPath;
        if (options.useXliffmergeBuilder) {
            return `ng xi18n ${options.project} --i18n-format ${i18nFormat} --output-path ${localeDir} --i18n-locale ${defaultLanguage}\
 && ng run ${options.project}:xliffmerge`;
        }
        else {
            // old style before builder
            const configFilePath = 'xliffmerge.json';
            return `ng xi18n ${options.project} --i18n-format ${i18nFormat} --output-path ${localeDir} --i18n-locale ${defaultLanguage}\
 && xliffmerge --profile ${configFilePath}${languagesCommandLineArgument}`;
        }
    }
    /**
     * Create the script.
     */
    static createExtractScript(options) {
        return new ExtractScript(constants_1.extractScriptName(options.project, options.isDefaultProject), ExtractScript.fullExtractScript(options));
    }
    get name() {
        return this._name;
    }
    get content() {
        return this._content;
    }
    usesXliffmergeCommandline() {
        return /&& xliffmerge/.test(this.content);
    }
    usesXliffmergeBuilder() {
        return /&& ng run .*:xliffmerge/.test(this.content);
    }
    xliffmergeProfile() {
        const match = /&& xliffmerge.*(--profile|-p) ([^ ]*)/.exec(this.content);
        if (match) {
            return match[2];
        }
        else {
            return null;
        }
    }
    projectName() {
        // Syntax ng xi18n <project>
        const match = /ng xi18n *([^ ]*)/.exec(this.content);
        if (match) {
            return match[1];
        }
        else {
            return null;
        }
    }
    /**
     * Parse languages from command line.
     * Commandline contains something like xliffmerge [options] lang1 lang2 ...
     * Returns [lang1, lang2, ..]
     * */
    languages() {
        const startIndex = this.content.indexOf('&& xliffmerge');
        if (startIndex < 0) {
            return [];
        }
        const languages = [];
        const params = this.content.substr(startIndex + '&& xliffmerge'.length).split(/\s+/);
        for (let i = 0; i < params.length; i++) {
            const p = params[i];
            if (!p.startsWith('-') && p !== '' && !(i > 0 && (params[i - 1] === '-p' || params[i - 1] === '--profile'))) {
                languages.push(p);
            }
        }
        return languages;
    }
}
exports.ExtractScript = ExtractScript;
//# sourceMappingURL=extract-script.js.map