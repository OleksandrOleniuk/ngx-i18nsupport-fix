/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by martin on 17.02.2017.
 * Collection of all parameters used by the tool.
 * The parameters are read form the profile or defaults are used.
 */
import * as fs from 'fs';
import { XliffMergeError } from './xliff-merge-error';
import { format } from 'util';
import { isArray, isNullOrUndefined } from '../common/util';
import { FileUtil } from '../common/file-util';
import { NgxTranslateExtractor } from './ngx-translate-extractor';
import { dirname, isAbsolute, join } from 'path';
/** @type {?} */
const PROFILE_CANDIDATES = ['package.json', '.angular-cli.json'];
export class XliffMergeParameters {
    /**
     * Create Parameters.
     * @param {?} options command options
     * @param {?=} profileContent given profile (if not, it is read from the profile path from options).
     * @return {?}
     */
    static createFromOptions(options, profileContent) {
        /** @type {?} */
        const parameters = new XliffMergeParameters();
        parameters.configure(options, profileContent);
        return parameters;
    }
    /**
     * @private
     */
    constructor() {
        this.errorsFound = [];
        this.warningsFound = [];
    }
    /**
     * Read potential profile.
     * To be a candidate, file must exist and contain property "xliffmergeOptions".
     * @private
     * @param {?} profilePath path of profile
     * @return {?} parsed content of file or null, if file does not exist or is not a profile candidate.
     */
    static readProfileCandidate(profilePath) {
        /** @type {?} */
        let content;
        try {
            content = fs.readFileSync(profilePath, 'UTF-8');
        }
        catch (err) {
            return null;
        }
        /** @type {?} */
        const parsedContent = JSON.parse(content);
        if (parsedContent && parsedContent.xliffmergeOptions) {
            return parsedContent;
        }
        else {
            return null;
        }
    }
    /**
     * Initialize me from the profile content.
     * (public only for test usage).
     * @private
     * @param {?} options options given at runtime via command line
     * @param {?=} profileContent if null, read it from profile.
     * @return {?}
     */
    configure(options, profileContent) {
        this.errorsFound = [];
        this.warningsFound = [];
        if (!profileContent) {
            profileContent = this.readProfile(options);
        }
        /** @type {?} */
        const validProfile = (!!profileContent);
        if (options.quiet) {
            this._quiet = options.quiet;
        }
        if (options.verbose) {
            this._verbose = options.verbose;
        }
        if (validProfile) {
            this.initializeFromConfig(profileContent);
            // if languages are given as parameters, they ovveride everything said in profile
            if (!!options.languages && options.languages.length > 0) {
                this._languages = options.languages;
                if (!this._defaultLanguage) {
                    this._defaultLanguage = this._languages[0];
                }
            }
            this.checkParameters();
        }
    }
    /**
     * Read profile.
     * @private
     * @param {?} options program options
     * @return {?} the read profile (empty, if none, null if errors)
     */
    readProfile(options) {
        /** @type {?} */
        const profilePath = options.profilePath;
        if (!profilePath) {
            for (const configfilename of PROFILE_CANDIDATES) {
                /** @type {?} */
                const profile = XliffMergeParameters.readProfileCandidate(configfilename);
                if (profile) {
                    this.usedProfilePath = configfilename;
                    return profile;
                }
            }
            return {};
        }
        /** @type {?} */
        let content;
        try {
            content = fs.readFileSync(profilePath, 'UTF-8');
        }
        catch (err) {
            this.errorsFound.push(new XliffMergeError('could not read profile "' + profilePath + '"'));
            return null;
        }
        this.usedProfilePath = profilePath;
        /** @type {?} */
        const profileContent = JSON.parse(content);
        // replace all pathes in options by absolute paths
        /** @type {?} */
        const xliffmergeOptions = profileContent.xliffmergeOptions;
        xliffmergeOptions.srcDir = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.srcDir);
        xliffmergeOptions.genDir = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.genDir);
        xliffmergeOptions.apikeyfile = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.apikeyfile);
        return profileContent;
    }
    /**
     * @private
     * @param {?} profilePath
     * @param {?} pathToAdjust
     * @return {?}
     */
    adjustPathToProfilePath(profilePath, pathToAdjust) {
        if (!pathToAdjust || isAbsolute(pathToAdjust)) {
            return pathToAdjust;
        }
        return join(dirname(profilePath), pathToAdjust).replace(/\\/g, '/');
    }
    /**
     * @private
     * @param {?} profileContent
     * @return {?}
     */
    initializeFromConfig(profileContent) {
        if (!profileContent) {
            return;
        }
        /** @type {?} */
        const profile = profileContent.xliffmergeOptions;
        if (profile) {
            if (!isNullOrUndefined(profile.quiet)) {
                this._quiet = profile.quiet;
            }
            if (!isNullOrUndefined(profile.verbose)) {
                this._verbose = profile.verbose;
            }
            if (!isNullOrUndefined(profile.allowIdChange)) {
                this._allowIdChange = profile.allowIdChange;
            }
            if (profile.defaultLanguage) {
                this._defaultLanguage = profile.defaultLanguage;
            }
            if (profile.languages) {
                this._languages = profile.languages;
            }
            if (profile.srcDir) {
                this._srcDir = profile.srcDir;
            }
            if (profile.angularCompilerOptions) {
                if (profile.angularCompilerOptions.genDir) {
                    this._genDir = profile.angularCompilerOptions.genDir;
                }
            }
            if (profile.genDir) {
                // this must be after angularCompilerOptions to be preferred
                this._genDir = profile.genDir;
            }
            if (profile.i18nBaseFile) {
                this._i18nBaseFile = profile.i18nBaseFile;
            }
            if (profile.i18nFile) {
                this._i18nFile = profile.i18nFile;
            }
            if (profile.i18nFormat) {
                this._i18nFormat = profile.i18nFormat;
            }
            if (profile.encoding) {
                this._encoding = profile.encoding;
            }
            if (!isNullOrUndefined(profile.removeUnusedIds)) {
                this._removeUnusedIds = profile.removeUnusedIds;
            }
            if (!isNullOrUndefined(profile.supportNgxTranslate)) {
                this._supportNgxTranslate = profile.supportNgxTranslate;
            }
            if (!isNullOrUndefined(profile.ngxTranslateExtractionPattern)) {
                this._ngxTranslateExtractionPattern = profile.ngxTranslateExtractionPattern;
            }
            if (!isNullOrUndefined(profile.useSourceAsTarget)) {
                this._useSourceAsTarget = profile.useSourceAsTarget;
            }
            if (!isNullOrUndefined(profile.targetPraefix)) {
                this._targetPraefix = profile.targetPraefix;
            }
            if (!isNullOrUndefined(profile.targetSuffix)) {
                this._targetSuffix = profile.targetSuffix;
            }
            if (!isNullOrUndefined(profile.autotranslate)) {
                this._autotranslate = profile.autotranslate;
            }
            if (!isNullOrUndefined(profile.beautifyOutput)) {
                this._beautifyOutput = profile.beautifyOutput;
            }
            if (!isNullOrUndefined(profile.preserveOrder)) {
                this._preserveOrder = profile.preserveOrder;
            }
            if (!isNullOrUndefined(profile.apikey)) {
                this._apikey = profile.apikey;
            }
            if (!isNullOrUndefined(profile.apikeyfile)) {
                this._apikeyfile = profile.apikeyfile;
            }
        }
        else {
            this.warningsFound.push('did not find "xliffmergeOptions" in profile, using defaults');
        }
    }
    /**
     * Check all Parameters, wether they are complete and consistent.
     * if something is wrong with the parameters, it is collected in errorsFound.
     * @private
     * @return {?}
     */
    checkParameters() {
        this.checkLanguageSyntax(this.defaultLanguage());
        if (this.languages().length === 0) {
            this.errorsFound.push(new XliffMergeError('no languages specified'));
        }
        this.languages().forEach((/**
         * @param {?} lang
         * @return {?}
         */
        (lang) => {
            this.checkLanguageSyntax(lang);
        }));
        /** @type {?} */
        let stats;
        /** @type {?} */
        let err;
        // srcDir should exists
        try {
            stats = fs.statSync(this.srcDir());
        }
        catch (e) {
            err = e;
        }
        if (!!err || !stats.isDirectory()) {
            this.errorsFound.push(new XliffMergeError('srcDir "' + this.srcDir() + '" is not a directory'));
        }
        // genDir should exists
        try {
            stats = fs.statSync(this.genDir());
        }
        catch (e) {
            err = e;
        }
        if (!!err || !stats.isDirectory()) {
            this.errorsFound.push(new XliffMergeError('genDir "' + this.genDir() + '" is not a directory'));
        }
        // master file MUST exist
        try {
            fs.accessSync(this.i18nFile(), fs.constants.R_OK);
        }
        catch (err) {
            this.errorsFound.push(new XliffMergeError('i18nFile "' + this.i18nFile() + '" is not readable'));
        }
        // i18nFormat must be xlf xlf2 or xmb
        if (!(this.i18nFormat() === 'xlf' || this.i18nFormat() === 'xlf2' || this.i18nFormat() === 'xmb')) {
            this.errorsFound.push(new XliffMergeError('i18nFormat "' + this.i18nFormat() + '" invalid, must be "xlf" or "xlf2" or "xmb"'));
        }
        // autotranslate requires api key
        if (this.autotranslate() && !this.apikey()) {
            this.errorsFound.push(new XliffMergeError('autotranslate requires an API key, please set one'));
        }
        // autotranslated languages must be in list of all languages
        this.autotranslatedLanguages().forEach((/**
         * @param {?} lang
         * @return {?}
         */
        (lang) => {
            if (this.languages().indexOf(lang) < 0) {
                this.errorsFound.push(new XliffMergeError('autotranslate language "' + lang + '" is not in list of languages'));
            }
            if (lang === this.defaultLanguage()) {
                this.errorsFound.push(new XliffMergeError('autotranslate language "' + lang + '" cannot be translated, because it is the source language'));
            }
        }));
        // ngx translate pattern check
        if (this.supportNgxTranslate()) {
            /** @type {?} */
            const checkResult = NgxTranslateExtractor.checkPattern(this.ngxTranslateExtractionPattern());
            if (!isNullOrUndefined(checkResult)) {
                this.errorsFound.push(new XliffMergeError('ngxTranslateExtractionPattern "' + this.ngxTranslateExtractionPattern() + '": ' + checkResult));
            }
        }
        // targetPraefix and targetSuffix check
        if (!this.useSourceAsTarget()) {
            if (this.targetPraefix().length > 0) {
                this.warningsFound.push('configured targetPraefix "' + this.targetPraefix() + '" will not be used because "useSourceAsTarget" is disabled"');
            }
            if (this.targetSuffix().length > 0) {
                this.warningsFound.push('configured targetSuffix "' + this.targetSuffix() + '" will not be used because "useSourceAsTarget" is disabled"');
            }
        }
    }
    /**
     * Check syntax of language.
     * Must be compatible with XML Schema type xsd:language.
     * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
     * @private
     * @param {?} lang language to check
     * @return {?}
     */
    checkLanguageSyntax(lang) {
        /** @type {?} */
        const pattern = /^[a-zA-Z]{1,8}([-_][a-zA-Z0-9]{1,8})*$/;
        if (!pattern.test(lang)) {
            this.errorsFound.push(new XliffMergeError('language "' + lang + '" is not valid'));
        }
    }
    /**
     * @return {?}
     */
    allowIdChange() {
        return (isNullOrUndefined(this._allowIdChange)) ? false : this._allowIdChange;
    }
    /**
     * @return {?}
     */
    verbose() {
        return (isNullOrUndefined(this._verbose)) ? false : this._verbose;
    }
    /**
     * @return {?}
     */
    quiet() {
        return (isNullOrUndefined(this._quiet)) ? false : this._quiet;
    }
    /**
     * Debug output all parameters to commandOutput.
     * @param {?} commandOutput
     * @return {?}
     */
    showAllParameters(commandOutput) {
        commandOutput.debug('xliffmerge Used Parameters:');
        commandOutput.debug('usedProfilePath:\t"%s"', this.usedProfilePath);
        commandOutput.debug('defaultLanguage:\t"%s"', this.defaultLanguage());
        commandOutput.debug('srcDir:\t"%s"', this.srcDir());
        commandOutput.debug('genDir:\t"%s"', this.genDir());
        commandOutput.debug('i18nBaseFile:\t"%s"', this.i18nBaseFile());
        commandOutput.debug('i18nFile:\t"%s"', this.i18nFile());
        commandOutput.debug('languages:\t%s', this.languages());
        for (const language of this.languages()) {
            commandOutput.debug('outputFile[%s]:\t%s', language, this.generatedI18nFile(language));
        }
        commandOutput.debug('removeUnusedIds:\t%s', this.removeUnusedIds());
        commandOutput.debug('supportNgxTranslate:\t%s', this.supportNgxTranslate());
        if (this.supportNgxTranslate()) {
            commandOutput.debug('ngxTranslateExtractionPattern:\t%s', this.ngxTranslateExtractionPattern());
        }
        commandOutput.debug('useSourceAsTarget:\t%s', this.useSourceAsTarget());
        if (this.useSourceAsTarget()) {
            commandOutput.debug('targetPraefix:\t"%s"', this.targetPraefix());
            commandOutput.debug('targetSuffix:\t"%s"', this.targetSuffix());
        }
        commandOutput.debug('allowIdChange:\t%s', this.allowIdChange());
        commandOutput.debug('beautifyOutput:\t%s', this.beautifyOutput());
        commandOutput.debug('preserveOrder:\t%s', this.preserveOrder());
        commandOutput.debug('autotranslate:\t%s', this.autotranslate());
        if (this.autotranslate()) {
            commandOutput.debug('autotranslated languages:\t%s', this.autotranslatedLanguages());
            commandOutput.debug('apikey:\t%s', this.apikey() ? '****' : 'NOT SET');
            commandOutput.debug('apikeyfile:\t%s', this.apikeyfile());
        }
    }
    /**
     * Default-Language, default en.
     * @return {?} default language
     */
    defaultLanguage() {
        return this._defaultLanguage ? this._defaultLanguage : 'en';
    }
    /**
     * Liste der zu bearbeitenden Sprachen.
     * @return {?} languages
     */
    languages() {
        return this._languages ? this._languages : [];
    }
    /**
     * src directory, where the master xlif is located.
     * @return {?} srcDir
     */
    srcDir() {
        return this._srcDir ? this._srcDir : '.';
    }
    /**
     * The base file name of the xlif file for input and output.
     * Default is messages
     * @return {?} base file
     */
    i18nBaseFile() {
        return this._i18nBaseFile ? this._i18nBaseFile : 'messages';
    }
    /**
     * The master xlif file (the one generated by ng-xi18n).
     * Default is <srcDir>/<i18nBaseFile>.xlf.
     * @return {?} master file
     */
    i18nFile() {
        return join(this.srcDir(), (this._i18nFile ? this._i18nFile : this.i18nBaseFile() + '.' + this.suffixForGeneratedI18nFile())).replace(/\\/g, '/');
    }
    /**
     * Format of the master xlif file.
     * Default is "xlf", possible are "xlf" or "xlf2" or "xmb".
     * @return {?} format
     */
    i18nFormat() {
        return (this._i18nFormat ? this._i18nFormat : 'xlf');
    }
    /**
     * potentially to be generated I18n-File with the translations for one language.
     * @param {?} lang language shortcut
     * @return {?} Path of file
     */
    generatedI18nFile(lang) {
        return join(this.genDir(), this.i18nBaseFile() + '.' + lang + '.' + this.suffixForGeneratedI18nFile()).replace(/\\/g, '/');
    }
    /**
     * @private
     * @return {?}
     */
    suffixForGeneratedI18nFile() {
        switch (this.i18nFormat()) {
            case 'xlf':
                return 'xlf';
            case 'xlf2':
                return 'xlf';
            case 'xmb':
                return 'xtb';
        }
    }
    /**
     * potentially to be generated translate-File for ngx-translate with the translations for one language.
     * @param {?} lang language shortcut
     * @return {?} Path of file
     */
    generatedNgxTranslateFile(lang) {
        return join(this.genDir(), this.i18nBaseFile() + '.' + lang + '.' + 'json').replace(/\\/g, '/');
    }
    /**
     * The encoding used to write new XLIFF-files.
     * @return {?} encoding
     */
    encoding() {
        return this._encoding ? this._encoding : 'UTF-8';
    }
    /**
     * Output-Directory, where the output is written to.
     * Default is <srcDir>.
     * @return {?}
     */
    genDir() {
        return this._genDir ? this._genDir : this.srcDir();
    }
    /**
     * @return {?}
     */
    removeUnusedIds() {
        return (isNullOrUndefined(this._removeUnusedIds)) ? true : this._removeUnusedIds;
    }
    /**
     * @return {?}
     */
    supportNgxTranslate() {
        return (isNullOrUndefined(this._supportNgxTranslate)) ? false : this._supportNgxTranslate;
    }
    /**
     * @return {?}
     */
    ngxTranslateExtractionPattern() {
        return (isNullOrUndefined(this._ngxTranslateExtractionPattern)) ?
            NgxTranslateExtractor.DefaultExtractionPattern : this._ngxTranslateExtractionPattern;
    }
    /**
     * Whether source must be used as target for new trans-units
     * Default is true
     * @return {?}
     */
    useSourceAsTarget() {
        return (isNullOrUndefined(this._useSourceAsTarget)) ? true : this._useSourceAsTarget;
    }
    /**
     * Praefix used for target when copying new trans-units
     * Default is ""
     * @return {?}
     */
    targetPraefix() {
        return (isNullOrUndefined(this._targetPraefix)) ? '' : this._targetPraefix;
    }
    /**
     * Suffix used for target when copying new trans-units
     * Default is ""
     * @return {?}
     */
    targetSuffix() {
        return (isNullOrUndefined(this._targetSuffix)) ? '' : this._targetSuffix;
    }
    /**
     * If set, run xml result through beautifier (pretty-data).
     * @return {?}
     */
    beautifyOutput() {
        return (isNullOrUndefined(this._beautifyOutput)) ? false : this._beautifyOutput;
    }
    /**
     * If set, order of new trans units will be as in master.
     * Otherwise they are added at the end.
     * @return {?}
     */
    preserveOrder() {
        return (isNullOrUndefined(this._preserveOrder)) ? true : this._preserveOrder;
    }
    /**
     * Whether to use autotranslate for new trans-units
     * Default is false
     * @return {?}
     */
    autotranslate() {
        if (isNullOrUndefined(this._autotranslate)) {
            return false;
        }
        if (isArray(this._autotranslate)) {
            return ((/** @type {?} */ (this._autotranslate))).length > 0;
        }
        return (/** @type {?} */ (this._autotranslate));
    }
    /**
     * Whether to use autotranslate for a given language.
     * @param {?} lang language code.
     * @return {?}
     */
    autotranslateLanguage(lang) {
        return this.autotranslatedLanguages().indexOf(lang) >= 0;
    }
    /**
     * Return a list of languages to be autotranslated.
     * @return {?}
     */
    autotranslatedLanguages() {
        if (isNullOrUndefined(this._autotranslate) || this._autotranslate === false) {
            return [];
        }
        if (isArray(this._autotranslate)) {
            return ((/** @type {?} */ (this._autotranslate)));
        }
        return this.languages().slice(1); // first is source language
    }
    /**
     * API key to be used for Google Translate
     * @return {?} api key
     */
    apikey() {
        if (!isNullOrUndefined(this._apikey)) {
            return this._apikey;
        }
        else {
            /** @type {?} */
            const apikeyPath = this.apikeyfile();
            if (this.apikeyfile()) {
                if (fs.existsSync(apikeyPath)) {
                    return FileUtil.read(apikeyPath, 'utf-8');
                }
                else {
                    throw new Error(format('api key file not found: API_KEY_FILE=%s', apikeyPath));
                }
            }
            else {
                return null;
            }
        }
    }
    /**
     * file name for API key to be used for Google Translate.
     * Explicitly set or read from env var API_KEY_FILE.
     * @return {?} file of api key
     */
    apikeyfile() {
        if (this._apikeyfile) {
            return this._apikeyfile;
        }
        else if (process.env.API_KEY_FILE) {
            return process.env.API_KEY_FILE;
        }
        else {
            return null;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype.usedProfilePath;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._quiet;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._verbose;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._allowIdChange;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._defaultLanguage;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._srcDir;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._i18nBaseFile;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._i18nFile;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._i18nFormat;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._encoding;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._genDir;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._languages;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._removeUnusedIds;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._supportNgxTranslate;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._ngxTranslateExtractionPattern;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._useSourceAsTarget;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._targetPraefix;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._targetSuffix;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._beautifyOutput;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._preserveOrder;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._autotranslate;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._apikey;
    /**
     * @type {?}
     * @private
     */
    XliffMergeParameters.prototype._apikeyfile;
    /** @type {?} */
    XliffMergeParameters.prototype.errorsFound;
    /** @type {?} */
    XliffMergeParameters.prototype.warningsFound;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVyZ2UtcGFyYW1ldGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsieGxpZmZtZXJnZS94bGlmZi1tZXJnZS1wYXJhbWV0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3pCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUdwRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzVCLE9BQU8sRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDN0MsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFZLE1BQU0sTUFBTSxDQUFDOztNQUVwRCxrQkFBa0IsR0FBRyxDQUFDLGNBQWMsRUFBRSxtQkFBbUIsQ0FBQztBQUVoRSxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBa0N0QixNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBdUIsRUFBRSxjQUE0Qjs7Y0FDM0UsVUFBVSxHQUFHLElBQUksb0JBQW9CLEVBQUU7UUFDN0MsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDOUMsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVEO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7Ozs7SUFRTyxNQUFNLENBQUMsb0JBQW9CLENBQUMsV0FBbUI7O1lBQy9DLE9BQWU7UUFDbkIsSUFBSTtZ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QyxNQUFNLENBQUMseUNBQXlDLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztpQkFDbEY7YUFDSjtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFPTSxVQUFVO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjthQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDakMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNuQzthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7Q0FDSjs7Ozs7O0lBbGtCRywrQ0FBZ0M7Ozs7O0lBQ2hDLHNDQUF3Qjs7Ozs7SUFDeEIsd0NBQTBCOzs7OztJQUMxQiw4Q0FBZ0M7Ozs7O0lBQ2hDLGdEQUFpQzs7Ozs7SUFDakMsdUNBQXdCOzs7OztJQUN4Qiw2Q0FBOEI7Ozs7O0lBQzlCLHlDQUEwQjs7Ozs7SUFDMUIsMkNBQTRCOzs7OztJQUM1Qix5Q0FBMEI7Ozs7O0lBQzFCLHVDQUF3Qjs7Ozs7SUFDeEIsMENBQTZCOzs7OztJQUM3QixnREFBa0M7Ozs7O0lBQ2xDLG9EQUFzQzs7Ozs7SUFDdEMsOERBQStDOzs7OztJQUMvQyxrREFBb0M7Ozs7O0lBQ3BDLDhDQUErQjs7Ozs7SUFDL0IsNkNBQThCOzs7OztJQUM5QiwrQ0FBaUM7Ozs7O0lBQ2pDLDhDQUFnQzs7Ozs7SUFDaEMsOENBQXlDOzs7OztJQUN6Qyx1Q0FBd0I7Ozs7O0lBQ3hCLDJDQUE0Qjs7SUFFNUIsMkNBQXNDOztJQUN0Qyw2Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMTcuMDIuMjAxNy5cclxuICogQ29sbGVjdGlvbiBvZiBhbGwgcGFyYW1ldGVycyB1c2VkIGJ5IHRoZSB0b29sLlxyXG4gKiBUaGUgcGFyYW1ldGVycyBhcmUgcmVhZCBmb3JtIHRoZSBwcm9maWxlIG9yIGRlZmF1bHRzIGFyZSB1c2VkLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHtYbGlmZk1lcmdlRXJyb3J9IGZyb20gJy4veGxpZmYtbWVyZ2UtZXJyb3InO1xyXG5pbXBvcnQge1N0YXRzfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7Q29tbWFuZE91dHB1dH0gZnJvbSAnLi4vY29tbW9uL2NvbW1hbmQtb3V0cHV0JztcclxuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ3V0aWwnO1xyXG5pbXBvcnQge2lzQXJyYXksIGlzTnVsbE9yVW5kZWZpbmVkfSBmcm9tICcuLi9jb21tb24vdXRpbCc7XHJcbmltcG9ydCB7UHJvZ3JhbU9wdGlvbnMsIElDb25maWdGaWxlfSBmcm9tICcuL2kteGxpZmYtbWVyZ2Utb3B0aW9ucyc7XHJcbmltcG9ydCB7RmlsZVV0aWx9IGZyb20gJy4uL2NvbW1vbi9maWxlLXV0aWwnO1xyXG5pbXBvcnQge05neFRyYW5zbGF0ZUV4dHJhY3Rvcn0gZnJvbSAnLi9uZ3gtdHJhbnNsYXRlLWV4dHJhY3Rvcic7XHJcbmltcG9ydCB7ZGlybmFtZSwgaXNBYnNvbHV0ZSwgam9pbiwgbm9ybWFsaXplfSBmcm9tICdwYXRoJztcclxuXHJcbmNvbnN0IFBST0ZJTEVfQ0FORElEQVRFUyA9IFsncGFja2FnZS5qc29uJywgJy5hbmd1bGFyLWNsaS5qc29uJ107XHJcblxyXG5leHBvcnQgY2xhc3MgWGxpZmZNZXJnZVBhcmFtZXRlcnMge1xyXG5cclxuICAgIHByaXZhdGUgdXNlZFByb2ZpbGVQYXRoOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9xdWlldDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ZlcmJvc2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9hbGxvd0lkQ2hhbmdlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdExhbmd1YWdlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9zcmNEaXI6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2kxOG5CYXNlRmlsZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaTE4bkZpbGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2kxOG5Gb3JtYXQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2VuY29kaW5nOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9nZW5EaXI6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2xhbmd1YWdlczogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9yZW1vdmVVbnVzZWRJZHM6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9zdXBwb3J0Tmd4VHJhbnNsYXRlOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfbmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm46IHN0cmluZztcclxuICAgIHByaXZhdGUgX3VzZVNvdXJjZUFzVGFyZ2V0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0UHJhZWZpeDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0U3VmZml4OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9iZWF1dGlmeU91dHB1dDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3ByZXNlcnZlT3JkZXI6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9hdXRvdHJhbnNsYXRlOiBib29sZWFufHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfYXBpa2V5OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9hcGlrZXlmaWxlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGVycm9yc0ZvdW5kOiBYbGlmZk1lcmdlRXJyb3JbXTtcclxuICAgIHB1YmxpYyB3YXJuaW5nc0ZvdW5kOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBQYXJhbWV0ZXJzLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgY29tbWFuZCBvcHRpb25zXHJcbiAgICAgKiBAcGFyYW0gcHJvZmlsZUNvbnRlbnQgZ2l2ZW4gcHJvZmlsZSAoaWYgbm90LCBpdCBpcyByZWFkIGZyb20gdGhlIHByb2ZpbGUgcGF0aCBmcm9tIG9wdGlvbnMpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUZyb21PcHRpb25zKG9wdGlvbnM6IFByb2dyYW1PcHRpb25zLCBwcm9maWxlQ29udGVudD86IElDb25maWdGaWxlKSB7XHJcbiAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IG5ldyBYbGlmZk1lcmdlUGFyYW1ldGVycygpO1xyXG4gICAgICAgIHBhcmFtZXRlcnMuY29uZmlndXJlKG9wdGlvbnMsIHByb2ZpbGVDb250ZW50KTtcclxuICAgICAgICByZXR1cm4gcGFyYW1ldGVycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JzRm91bmQgPSBbXTtcclxuICAgICAgICB0aGlzLndhcm5pbmdzRm91bmQgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgcG90ZW50aWFsIHByb2ZpbGUuXHJcbiAgICAgKiBUbyBiZSBhIGNhbmRpZGF0ZSwgZmlsZSBtdXN0IGV4aXN0IGFuZCBjb250YWluIHByb3BlcnR5IFwieGxpZmZtZXJnZU9wdGlvbnNcIi5cclxuICAgICAqIEBwYXJhbSBwcm9maWxlUGF0aCBwYXRoIG9mIHByb2ZpbGVcclxuICAgICAqIEByZXR1cm4gcGFyc2VkIGNvbnRlbnQgb2YgZmlsZSBvciBudWxsLCBpZiBmaWxlIGRvZXMgbm90IGV4aXN0IG9yIGlzIG5vdCBhIHByb2ZpbGUgY2FuZGlkYXRlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkUHJvZmlsZUNhbmRpZGF0ZShwcm9maWxlUGF0aDogc3RyaW5nKTogSUNvbmZpZ0ZpbGUge1xyXG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwcm9maWxlUGF0aCwgJ1VURi04Jyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJzZWRDb250ZW50OiBJQ29uZmlnRmlsZSA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgaWYgKHBhcnNlZENvbnRlbnQgJiYgcGFyc2VkQ29udGVudC54bGlmZm1lcmdlT3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VkQ29udGVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplIG1lIGZyb20gdGhlIHByb2ZpbGUgY29udGVudC5cclxuICAgICAqIChwdWJsaWMgb25seSBmb3IgdGVzdCB1c2FnZSkuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBvcHRpb25zIGdpdmVuIGF0IHJ1bnRpbWUgdmlhIGNvbW1hbmQgbGluZVxyXG4gICAgICogQHBhcmFtIHByb2ZpbGVDb250ZW50IGlmIG51bGwsIHJlYWQgaXQgZnJvbSBwcm9maWxlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbmZpZ3VyZShvcHRpb25zOiBQcm9ncmFtT3B0aW9ucywgcHJvZmlsZUNvbnRlbnQ/OiBJQ29uZmlnRmlsZSkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JzRm91bmQgPSBbXTtcclxuICAgICAgICB0aGlzLndhcm5pbmdzRm91bmQgPSBbXTtcclxuICAgICAgICBpZiAoIXByb2ZpbGVDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHByb2ZpbGVDb250ZW50ID0gdGhpcy5yZWFkUHJvZmlsZShvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdmFsaWRQcm9maWxlOiBib29sZWFuID0gKCEhcHJvZmlsZUNvbnRlbnQpO1xyXG4gICAgICAgIGlmIChvcHRpb25zLnF1aWV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3F1aWV0ID0gb3B0aW9ucy5xdWlldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLl92ZXJib3NlID0gb3B0aW9ucy52ZXJib3NlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsaWRQcm9maWxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZUZyb21Db25maWcocHJvZmlsZUNvbnRlbnQpO1xyXG4gICAgICAgICAgICAvLyBpZiBsYW5ndWFnZXMgYXJlIGdpdmVuIGFzIHBhcmFtZXRlcnMsIHRoZXkgb3Z2ZXJpZGUgZXZlcnl0aGluZyBzYWlkIGluIHByb2ZpbGVcclxuICAgICAgICAgICAgaWYgKCEhb3B0aW9ucy5sYW5ndWFnZXMgJiYgb3B0aW9ucy5sYW5ndWFnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFuZ3VhZ2VzID0gb3B0aW9ucy5sYW5ndWFnZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2RlZmF1bHRMYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRMYW5ndWFnZSA9IHRoaXMuX2xhbmd1YWdlc1swXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrUGFyYW1ldGVycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgcHJvZmlsZS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIHByb2dyYW0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybiB0aGUgcmVhZCBwcm9maWxlIChlbXB0eSwgaWYgbm9uZSwgbnVsbCBpZiBlcnJvcnMpXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVhZFByb2ZpbGUob3B0aW9uczogUHJvZ3JhbU9wdGlvbnMpOiBJQ29uZmlnRmlsZSB7XHJcbiAgICAgICAgY29uc3QgcHJvZmlsZVBhdGg6IHN0cmluZyA9IG9wdGlvbnMucHJvZmlsZVBhdGg7XHJcbiAgICAgICAgaWYgKCFwcm9maWxlUGF0aCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbmZpZ2ZpbGVuYW1lIG9mIFBST0ZJTEVfQ0FORElEQVRFUykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZSA9IFhsaWZmTWVyZ2VQYXJhbWV0ZXJzLnJlYWRQcm9maWxlQ2FuZGlkYXRlKGNvbmZpZ2ZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9maWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VkUHJvZmlsZVBhdGggPSBjb25maWdmaWxlbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvZmlsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50OiBzdHJpbmc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhwcm9maWxlUGF0aCwgJ1VURi04Jyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzRm91bmQucHVzaChuZXcgWGxpZmZNZXJnZUVycm9yKCdjb3VsZCBub3QgcmVhZCBwcm9maWxlIFwiJyArIHByb2ZpbGVQYXRoICsgJ1wiJykpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51c2VkUHJvZmlsZVBhdGggPSBwcm9maWxlUGF0aDtcclxuICAgICAgICBjb25zdCBwcm9maWxlQ29udGVudDogSUNvbmZpZ0ZpbGUgPSBKU09OLnBhcnNlKGNvbnRlbnQpO1xyXG4gICAgICAgIC8vIHJlcGxhY2UgYWxsIHBhdGhlcyBpbiBvcHRpb25zIGJ5IGFic29sdXRlIHBhdGhzXHJcbiAgICAgICAgY29uc3QgeGxpZmZtZXJnZU9wdGlvbnMgPSBwcm9maWxlQ29udGVudC54bGlmZm1lcmdlT3B0aW9ucztcclxuICAgICAgICB4bGlmZm1lcmdlT3B0aW9ucy5zcmNEaXIgPSB0aGlzLmFkanVzdFBhdGhUb1Byb2ZpbGVQYXRoKHByb2ZpbGVQYXRoLCB4bGlmZm1lcmdlT3B0aW9ucy5zcmNEaXIpO1xyXG4gICAgICAgIHhsaWZmbWVyZ2VPcHRpb25zLmdlbkRpciA9IHRoaXMuYWRqdXN0UGF0aFRvUHJvZmlsZVBhdGgocHJvZmlsZVBhdGgsIHhsaWZmbWVyZ2VPcHRpb25zLmdlbkRpcik7XHJcbiAgICAgICAgeGxpZmZtZXJnZU9wdGlvbnMuYXBpa2V5ZmlsZSA9IHRoaXMuYWRqdXN0UGF0aFRvUHJvZmlsZVBhdGgocHJvZmlsZVBhdGgsIHhsaWZmbWVyZ2VPcHRpb25zLmFwaWtleWZpbGUpO1xyXG4gICAgICAgIHJldHVybiBwcm9maWxlQ29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkanVzdFBhdGhUb1Byb2ZpbGVQYXRoKHByb2ZpbGVQYXRoOiBzdHJpbmcsIHBhdGhUb0FkanVzdDogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIXBhdGhUb0FkanVzdCB8fCBpc0Fic29sdXRlKHBhdGhUb0FkanVzdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhdGhUb0FkanVzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGpvaW4oZGlybmFtZShwcm9maWxlUGF0aCksIHBhdGhUb0FkanVzdCkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZUZyb21Db25maWcocHJvZmlsZUNvbnRlbnQ6IElDb25maWdGaWxlKSB7XHJcbiAgICAgICAgaWYgKCFwcm9maWxlQ29udGVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHByb2ZpbGUgPSBwcm9maWxlQ29udGVudC54bGlmZm1lcmdlT3B0aW9ucztcclxuICAgICAgICBpZiAocHJvZmlsZSkge1xyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUucXVpZXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWlldCA9IHByb2ZpbGUucXVpZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLnZlcmJvc2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92ZXJib3NlID0gcHJvZmlsZS52ZXJib3NlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5hbGxvd0lkQ2hhbmdlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dJZENoYW5nZSA9IHByb2ZpbGUuYWxsb3dJZENoYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvZmlsZS5kZWZhdWx0TGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRMYW5ndWFnZSA9IHByb2ZpbGUuZGVmYXVsdExhbmd1YWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmxhbmd1YWdlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGFuZ3VhZ2VzID0gcHJvZmlsZS5sYW5ndWFnZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb2ZpbGUuc3JjRGlyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcmNEaXIgPSBwcm9maWxlLnNyY0RpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvZmlsZS5hbmd1bGFyQ29tcGlsZXJPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZmlsZS5hbmd1bGFyQ29tcGlsZXJPcHRpb25zLmdlbkRpcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dlbkRpciA9IHByb2ZpbGUuYW5ndWxhckNvbXBpbGVyT3B0aW9ucy5nZW5EaXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb2ZpbGUuZ2VuRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzIG11c3QgYmUgYWZ0ZXIgYW5ndWxhckNvbXBpbGVyT3B0aW9ucyB0byBiZSBwcmVmZXJyZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dlbkRpciA9IHByb2ZpbGUuZ2VuRGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmkxOG5CYXNlRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faTE4bkJhc2VGaWxlID0gcHJvZmlsZS5pMThuQmFzZUZpbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb2ZpbGUuaTE4bkZpbGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2kxOG5GaWxlID0gcHJvZmlsZS5pMThuRmlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvZmlsZS5pMThuRm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pMThuRm9ybWF0ID0gcHJvZmlsZS5pMThuRm9ybWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmVuY29kaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmNvZGluZyA9IHByb2ZpbGUuZW5jb2Rpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLnJlbW92ZVVudXNlZElkcykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZVVudXNlZElkcyA9IHByb2ZpbGUucmVtb3ZlVW51c2VkSWRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5zdXBwb3J0Tmd4VHJhbnNsYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3VwcG9ydE5neFRyYW5zbGF0ZSA9IHByb2ZpbGUuc3VwcG9ydE5neFRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUubmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybiA9IHByb2ZpbGUubmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLnVzZVNvdXJjZUFzVGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXNlU291cmNlQXNUYXJnZXQgPSBwcm9maWxlLnVzZVNvdXJjZUFzVGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS50YXJnZXRQcmFlZml4KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0UHJhZWZpeCA9IHByb2ZpbGUudGFyZ2V0UHJhZWZpeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUudGFyZ2V0U3VmZml4KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0U3VmZml4ID0gcHJvZmlsZS50YXJnZXRTdWZmaXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLmF1dG90cmFuc2xhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvdHJhbnNsYXRlID0gcHJvZmlsZS5hdXRvdHJhbnNsYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5iZWF1dGlmeU91dHB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlYXV0aWZ5T3V0cHV0ID0gcHJvZmlsZS5iZWF1dGlmeU91dHB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUucHJlc2VydmVPcmRlcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ByZXNlcnZlT3JkZXIgPSBwcm9maWxlLnByZXNlcnZlT3JkZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLmFwaWtleSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FwaWtleSA9IHByb2ZpbGUuYXBpa2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5hcGlrZXlmaWxlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBpa2V5ZmlsZSA9IHByb2ZpbGUuYXBpa2V5ZmlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FybmluZ3NGb3VuZC5wdXNoKCdkaWQgbm90IGZpbmQgXCJ4bGlmZm1lcmdlT3B0aW9uc1wiIGluIHByb2ZpbGUsIHVzaW5nIGRlZmF1bHRzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgYWxsIFBhcmFtZXRlcnMsIHdldGhlciB0aGV5IGFyZSBjb21wbGV0ZSBhbmQgY29uc2lzdGVudC5cclxuICAgICAqIGlmIHNvbWV0aGluZyBpcyB3cm9uZyB3aXRoIHRoZSBwYXJhbWV0ZXJzLCBpdCBpcyBjb2xsZWN0ZWQgaW4gZXJyb3JzRm91bmQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tQYXJhbWV0ZXJzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlY2tMYW5ndWFnZVN5bnRheCh0aGlzLmRlZmF1bHRMYW5ndWFnZSgpKTtcclxuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZXMoKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKG5ldyBYbGlmZk1lcmdlRXJyb3IoJ25vIGxhbmd1YWdlcyBzcGVjaWZpZWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzKCkuZm9yRWFjaCgobGFuZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrTGFuZ3VhZ2VTeW50YXgobGFuZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHN0YXRzOiBTdGF0cztcclxuICAgICAgICBsZXQgZXJyOiBhbnk7XHJcbiAgICAgICAgLy8gc3JjRGlyIHNob3VsZCBleGlzdHNcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzdGF0cyA9IGZzLnN0YXRTeW5jKHRoaXMuc3JjRGlyKCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgZXJyID0gZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEhZXJyIHx8ICFzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzRm91bmQucHVzaChuZXcgWGxpZmZNZXJnZUVycm9yKCdzcmNEaXIgXCInICsgdGhpcy5zcmNEaXIoKSArICdcIiBpcyBub3QgYSBkaXJlY3RvcnknKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGdlbkRpciBzaG91bGQgZXhpc3RzXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc3RhdHMgPSBmcy5zdGF0U3luYyh0aGlzLmdlbkRpcigpKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGVyciA9IGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghIWVyciB8fCAhc3RhdHMuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2gobmV3IFhsaWZmTWVyZ2VFcnJvcignZ2VuRGlyIFwiJyArIHRoaXMuZ2VuRGlyKCkgKyAnXCIgaXMgbm90IGEgZGlyZWN0b3J5JykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBtYXN0ZXIgZmlsZSBNVVNUIGV4aXN0XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZnMuYWNjZXNzU3luYyh0aGlzLmkxOG5GaWxlKCksIGZzLmNvbnN0YW50cy5SX09LKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKG5ldyBYbGlmZk1lcmdlRXJyb3IoJ2kxOG5GaWxlIFwiJyArIHRoaXMuaTE4bkZpbGUoKSArICdcIiBpcyBub3QgcmVhZGFibGUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGkxOG5Gb3JtYXQgbXVzdCBiZSB4bGYgeGxmMiBvciB4bWJcclxuICAgICAgICBpZiAoISh0aGlzLmkxOG5Gb3JtYXQoKSA9PT0gJ3hsZicgfHwgdGhpcy5pMThuRm9ybWF0KCkgPT09ICd4bGYyJyB8fCB0aGlzLmkxOG5Gb3JtYXQoKSA9PT0gJ3htYicpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzRm91bmQucHVzaChuZXcgWGxpZmZNZXJnZUVycm9yKCdpMThuRm9ybWF0IFwiJyArIHRoaXMuaTE4bkZvcm1hdCgpICsgJ1wiIGludmFsaWQsIG11c3QgYmUgXCJ4bGZcIiBvciBcInhsZjJcIiBvciBcInhtYlwiJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhdXRvdHJhbnNsYXRlIHJlcXVpcmVzIGFwaSBrZXlcclxuICAgICAgICBpZiAodGhpcy5hdXRvdHJhbnNsYXRlKCkgJiYgIXRoaXMuYXBpa2V5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKG5ldyBYbGlmZk1lcmdlRXJyb3IoJ2F1dG90cmFuc2xhdGUgcmVxdWlyZXMgYW4gQVBJIGtleSwgcGxlYXNlIHNldCBvbmUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGF1dG90cmFuc2xhdGVkIGxhbmd1YWdlcyBtdXN0IGJlIGluIGxpc3Qgb2YgYWxsIGxhbmd1YWdlc1xyXG4gICAgICAgIHRoaXMuYXV0b3RyYW5zbGF0ZWRMYW5ndWFnZXMoKS5mb3JFYWNoKChsYW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhbmd1YWdlcygpLmluZGV4T2YobGFuZykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2gobmV3IFhsaWZmTWVyZ2VFcnJvcignYXV0b3RyYW5zbGF0ZSBsYW5ndWFnZSBcIicgKyBsYW5nICsgJ1wiIGlzIG5vdCBpbiBsaXN0IG9mIGxhbmd1YWdlcycpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobGFuZyA9PT0gdGhpcy5kZWZhdWx0TGFuZ3VhZ2UoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBYbGlmZk1lcmdlRXJyb3IoJ2F1dG90cmFuc2xhdGUgbGFuZ3VhZ2UgXCInICsgbGFuZyArICdcIiBjYW5ub3QgYmUgdHJhbnNsYXRlZCwgYmVjYXVzZSBpdCBpcyB0aGUgc291cmNlIGxhbmd1YWdlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbmd4IHRyYW5zbGF0ZSBwYXR0ZXJuIGNoZWNrXHJcbiAgICAgICAgaWYgKHRoaXMuc3VwcG9ydE5neFRyYW5zbGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrUmVzdWx0ID0gTmd4VHJhbnNsYXRlRXh0cmFjdG9yLmNoZWNrUGF0dGVybih0aGlzLm5neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuKCkpO1xyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGNoZWNrUmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBYbGlmZk1lcmdlRXJyb3IoJ25neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuIFwiJyArIHRoaXMubmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4oKSArICdcIjogJyArIGNoZWNrUmVzdWx0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGFyZ2V0UHJhZWZpeCBhbmQgdGFyZ2V0U3VmZml4IGNoZWNrXHJcbiAgICAgICAgaWYgKCF0aGlzLnVzZVNvdXJjZUFzVGFyZ2V0KCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0UHJhZWZpeCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud2FybmluZ3NGb3VuZC5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICAgICdjb25maWd1cmVkIHRhcmdldFByYWVmaXggXCInICsgdGhpcy50YXJnZXRQcmFlZml4KCkgKyAnXCIgd2lsbCBub3QgYmUgdXNlZCBiZWNhdXNlIFwidXNlU291cmNlQXNUYXJnZXRcIiBpcyBkaXNhYmxlZFwiJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0U3VmZml4KCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YXJuaW5nc0ZvdW5kLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbmZpZ3VyZWQgdGFyZ2V0U3VmZml4IFwiJyArIHRoaXMudGFyZ2V0U3VmZml4KCkgKyAnXCIgd2lsbCBub3QgYmUgdXNlZCBiZWNhdXNlIFwidXNlU291cmNlQXNUYXJnZXRcIiBpcyBkaXNhYmxlZFwiJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgc3ludGF4IG9mIGxhbmd1YWdlLlxyXG4gICAgICogTXVzdCBiZSBjb21wYXRpYmxlIHdpdGggWE1MIFNjaGVtYSB0eXBlIHhzZDpsYW5ndWFnZS5cclxuICAgICAqIFBhdHRlcm46IFthLXpBLVpdezEsOH0oKC18XylbYS16QS1aMC05XXsxLDh9KSpcclxuICAgICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIHRvIGNoZWNrXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tMYW5ndWFnZVN5bnRheChsYW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBwYXR0ZXJuID0gL15bYS16QS1aXXsxLDh9KFstX11bYS16QS1aMC05XXsxLDh9KSokLztcclxuICAgICAgICBpZiAoIXBhdHRlcm4udGVzdChsYW5nKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2gobmV3IFhsaWZmTWVyZ2VFcnJvcignbGFuZ3VhZ2UgXCInICsgbGFuZyArICdcIiBpcyBub3QgdmFsaWQnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbGxvd0lkQ2hhbmdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fYWxsb3dJZENoYW5nZSkpID8gZmFsc2UgOiB0aGlzLl9hbGxvd0lkQ2hhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2ZXJib3NlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fdmVyYm9zZSkpID8gZmFsc2UgOiB0aGlzLl92ZXJib3NlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBxdWlldCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX3F1aWV0KSkgPyBmYWxzZSA6IHRoaXMuX3F1aWV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVidWcgb3V0cHV0IGFsbCBwYXJhbWV0ZXJzIHRvIGNvbW1hbmRPdXRwdXQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93QWxsUGFyYW1ldGVycyhjb21tYW5kT3V0cHV0OiBDb21tYW5kT3V0cHV0KTogdm9pZCB7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygneGxpZmZtZXJnZSBVc2VkIFBhcmFtZXRlcnM6Jyk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygndXNlZFByb2ZpbGVQYXRoOlxcdFwiJXNcIicsIHRoaXMudXNlZFByb2ZpbGVQYXRoKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdkZWZhdWx0TGFuZ3VhZ2U6XFx0XCIlc1wiJywgdGhpcy5kZWZhdWx0TGFuZ3VhZ2UoKSk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1Zygnc3JjRGlyOlxcdFwiJXNcIicsIHRoaXMuc3JjRGlyKCkpO1xyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ2dlbkRpcjpcXHRcIiVzXCInLCB0aGlzLmdlbkRpcigpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdpMThuQmFzZUZpbGU6XFx0XCIlc1wiJywgdGhpcy5pMThuQmFzZUZpbGUoKSk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnaTE4bkZpbGU6XFx0XCIlc1wiJywgdGhpcy5pMThuRmlsZSgpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdsYW5ndWFnZXM6XFx0JXMnLCB0aGlzLmxhbmd1YWdlcygpKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGxhbmd1YWdlIG9mIHRoaXMubGFuZ3VhZ2VzKCkpIHtcclxuICAgICAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1Zygnb3V0cHV0RmlsZVslc106XFx0JXMnLCBsYW5ndWFnZSwgdGhpcy5nZW5lcmF0ZWRJMThuRmlsZShsYW5ndWFnZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdyZW1vdmVVbnVzZWRJZHM6XFx0JXMnLCB0aGlzLnJlbW92ZVVudXNlZElkcygpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdzdXBwb3J0Tmd4VHJhbnNsYXRlOlxcdCVzJywgdGhpcy5zdXBwb3J0Tmd4VHJhbnNsYXRlKCkpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1cHBvcnROZ3hUcmFuc2xhdGUoKSkge1xyXG4gICAgICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCduZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybjpcXHQlcycsIHRoaXMubmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ3VzZVNvdXJjZUFzVGFyZ2V0OlxcdCVzJywgdGhpcy51c2VTb3VyY2VBc1RhcmdldCgpKTtcclxuICAgICAgICBpZiAodGhpcy51c2VTb3VyY2VBc1RhcmdldCgpKSB7XHJcbiAgICAgICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ3RhcmdldFByYWVmaXg6XFx0XCIlc1wiJywgdGhpcy50YXJnZXRQcmFlZml4KCkpO1xyXG4gICAgICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCd0YXJnZXRTdWZmaXg6XFx0XCIlc1wiJywgdGhpcy50YXJnZXRTdWZmaXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ2FsbG93SWRDaGFuZ2U6XFx0JXMnLCB0aGlzLmFsbG93SWRDaGFuZ2UoKSk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnYmVhdXRpZnlPdXRwdXQ6XFx0JXMnLCB0aGlzLmJlYXV0aWZ5T3V0cHV0KCkpO1xyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ3ByZXNlcnZlT3JkZXI6XFx0JXMnLCB0aGlzLnByZXNlcnZlT3JkZXIoKSk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnYXV0b3RyYW5zbGF0ZTpcXHQlcycsIHRoaXMuYXV0b3RyYW5zbGF0ZSgpKTtcclxuICAgICAgICBpZiAodGhpcy5hdXRvdHJhbnNsYXRlKCkpIHtcclxuICAgICAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnYXV0b3RyYW5zbGF0ZWQgbGFuZ3VhZ2VzOlxcdCVzJywgdGhpcy5hdXRvdHJhbnNsYXRlZExhbmd1YWdlcygpKTtcclxuICAgICAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnYXBpa2V5OlxcdCVzJywgdGhpcy5hcGlrZXkoKSA/ICcqKioqJyA6ICdOT1QgU0VUJyk7XHJcbiAgICAgICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ2FwaWtleWZpbGU6XFx0JXMnLCB0aGlzLmFwaWtleWZpbGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdC1MYW5ndWFnZSwgZGVmYXVsdCBlbi5cclxuICAgICAqIEByZXR1cm4gZGVmYXVsdCBsYW5ndWFnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVmYXVsdExhbmd1YWdlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRMYW5ndWFnZSA/IHRoaXMuX2RlZmF1bHRMYW5ndWFnZSA6ICdlbic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMaXN0ZSBkZXIgenUgYmVhcmJlaXRlbmRlbiBTcHJhY2hlbi5cclxuICAgICAqIEByZXR1cm4gbGFuZ3VhZ2VzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsYW5ndWFnZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZXMgPyB0aGlzLl9sYW5ndWFnZXMgOiBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNyYyBkaXJlY3RvcnksIHdoZXJlIHRoZSBtYXN0ZXIgeGxpZiBpcyBsb2NhdGVkLlxyXG4gICAgICogQHJldHVybiBzcmNEaXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNyY0RpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zcmNEaXIgPyB0aGlzLl9zcmNEaXIgOiAnLic7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYmFzZSBmaWxlIG5hbWUgb2YgdGhlIHhsaWYgZmlsZSBmb3IgaW5wdXQgYW5kIG91dHB1dC5cclxuICAgICAqIERlZmF1bHQgaXMgbWVzc2FnZXNcclxuICAgICAqIEByZXR1cm4gYmFzZSBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpMThuQmFzZUZpbGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faTE4bkJhc2VGaWxlID8gdGhpcy5faTE4bkJhc2VGaWxlIDogJ21lc3NhZ2VzJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYXN0ZXIgeGxpZiBmaWxlICh0aGUgb25lIGdlbmVyYXRlZCBieSBuZy14aTE4bikuXHJcbiAgICAgKiBEZWZhdWx0IGlzIDxzcmNEaXI+LzxpMThuQmFzZUZpbGU+LnhsZi5cclxuICAgICAqIEByZXR1cm4gbWFzdGVyIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGkxOG5GaWxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGpvaW4odGhpcy5zcmNEaXIoKSxcclxuICAgICAgICAgICAgKHRoaXMuX2kxOG5GaWxlID8gdGhpcy5faTE4bkZpbGUgOiB0aGlzLmkxOG5CYXNlRmlsZSgpICsgJy4nICsgdGhpcy5zdWZmaXhGb3JHZW5lcmF0ZWRJMThuRmlsZSgpKVxyXG4gICAgICAgICkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybWF0IG9mIHRoZSBtYXN0ZXIgeGxpZiBmaWxlLlxyXG4gICAgICogRGVmYXVsdCBpcyBcInhsZlwiLCBwb3NzaWJsZSBhcmUgXCJ4bGZcIiBvciBcInhsZjJcIiBvciBcInhtYlwiLlxyXG4gICAgICogQHJldHVybiBmb3JtYXRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGkxOG5Gb3JtYXQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX2kxOG5Gb3JtYXQgPyB0aGlzLl9pMThuRm9ybWF0IDogJ3hsZicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcG90ZW50aWFsbHkgdG8gYmUgZ2VuZXJhdGVkIEkxOG4tRmlsZSB3aXRoIHRoZSB0cmFuc2xhdGlvbnMgZm9yIG9uZSBsYW5ndWFnZS5cclxuICAgICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIHNob3J0Y3V0XHJcbiAgICAgKiBAcmV0dXJuIFBhdGggb2YgZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVkSTE4bkZpbGUobGFuZzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gam9pbih0aGlzLmdlbkRpcigpLCB0aGlzLmkxOG5CYXNlRmlsZSgpICsgJy4nICsgbGFuZyArICcuJyArIHRoaXMuc3VmZml4Rm9yR2VuZXJhdGVkSTE4bkZpbGUoKSkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3VmZml4Rm9yR2VuZXJhdGVkSTE4bkZpbGUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuaTE4bkZvcm1hdCgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3hsZic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3hsZic7XHJcbiAgICAgICAgICAgIGNhc2UgJ3hsZjInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd4bGYnO1xyXG4gICAgICAgICAgICBjYXNlICd4bWInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd4dGInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHBvdGVudGlhbGx5IHRvIGJlIGdlbmVyYXRlZCB0cmFuc2xhdGUtRmlsZSBmb3Igbmd4LXRyYW5zbGF0ZSB3aXRoIHRoZSB0cmFuc2xhdGlvbnMgZm9yIG9uZSBsYW5ndWFnZS5cclxuICAgICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIHNob3J0Y3V0XHJcbiAgICAgKiBAcmV0dXJuIFBhdGggb2YgZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVkTmd4VHJhbnNsYXRlRmlsZShsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBqb2luKHRoaXMuZ2VuRGlyKCksIHRoaXMuaTE4bkJhc2VGaWxlKCkgKyAnLicgKyBsYW5nICsgJy4nICsgJ2pzb24nKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZW5jb2RpbmcgdXNlZCB0byB3cml0ZSBuZXcgWExJRkYtZmlsZXMuXHJcbiAgICAgKiBAcmV0dXJuIGVuY29kaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlbmNvZGluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmNvZGluZyA/IHRoaXMuX2VuY29kaW5nIDogJ1VURi04JztcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgICogT3V0cHV0LURpcmVjdG9yeSwgd2hlcmUgdGhlIG91dHB1dCBpcyB3cml0dGVuIHRvLlxyXG4gICAgICAqIERlZmF1bHQgaXMgPHNyY0Rpcj4uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5EaXIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2VuRGlyID8gdGhpcy5fZ2VuRGlyIDogdGhpcy5zcmNEaXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlVW51c2VkSWRzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fcmVtb3ZlVW51c2VkSWRzKSkgPyB0cnVlIDogdGhpcy5fcmVtb3ZlVW51c2VkSWRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdXBwb3J0Tmd4VHJhbnNsYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fc3VwcG9ydE5neFRyYW5zbGF0ZSkpID8gZmFsc2UgOiB0aGlzLl9zdXBwb3J0Tmd4VHJhbnNsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fbmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4pKSA/XHJcbiAgICAgICAgICAgIE5neFRyYW5zbGF0ZUV4dHJhY3Rvci5EZWZhdWx0RXh0cmFjdGlvblBhdHRlcm4gOiB0aGlzLl9uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgc291cmNlIG11c3QgYmUgdXNlZCBhcyB0YXJnZXQgZm9yIG5ldyB0cmFucy11bml0c1xyXG4gICAgICogRGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1c2VTb3VyY2VBc1RhcmdldCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX3VzZVNvdXJjZUFzVGFyZ2V0KSkgPyB0cnVlIDogdGhpcy5fdXNlU291cmNlQXNUYXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmFlZml4IHVzZWQgZm9yIHRhcmdldCB3aGVuIGNvcHlpbmcgbmV3IHRyYW5zLXVuaXRzXHJcbiAgICAgKiBEZWZhdWx0IGlzIFwiXCJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldFByYWVmaXgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX3RhcmdldFByYWVmaXgpKSA/ICcnIDogdGhpcy5fdGFyZ2V0UHJhZWZpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN1ZmZpeCB1c2VkIGZvciB0YXJnZXQgd2hlbiBjb3B5aW5nIG5ldyB0cmFucy11bml0c1xyXG4gICAgICogRGVmYXVsdCBpcyBcIlwiXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0YXJnZXRTdWZmaXgoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX3RhcmdldFN1ZmZpeCkpID8gJycgOiB0aGlzLl90YXJnZXRTdWZmaXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBzZXQsIHJ1biB4bWwgcmVzdWx0IHRocm91Z2ggYmVhdXRpZmllciAocHJldHR5LWRhdGEpLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmVhdXRpZnlPdXRwdXQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9iZWF1dGlmeU91dHB1dCkpID8gZmFsc2UgOiB0aGlzLl9iZWF1dGlmeU91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHNldCwgb3JkZXIgb2YgbmV3IHRyYW5zIHVuaXRzIHdpbGwgYmUgYXMgaW4gbWFzdGVyLlxyXG4gICAgICogT3RoZXJ3aXNlIHRoZXkgYXJlIGFkZGVkIGF0IHRoZSBlbmQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcmVzZXJ2ZU9yZGVyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fcHJlc2VydmVPcmRlcikpID8gdHJ1ZSA6IHRoaXMuX3ByZXNlcnZlT3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBhdXRvdHJhbnNsYXRlIGZvciBuZXcgdHJhbnMtdW5pdHNcclxuICAgICAqIERlZmF1bHQgaXMgZmFsc2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1dG90cmFuc2xhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2F1dG90cmFuc2xhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzQXJyYXkodGhpcy5fYXV0b3RyYW5zbGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICg8c3RyaW5nW10+dGhpcy5fYXV0b3RyYW5zbGF0ZSkubGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxib29sZWFuPiB0aGlzLl9hdXRvdHJhbnNsYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byB1c2UgYXV0b3RyYW5zbGF0ZSBmb3IgYSBnaXZlbiBsYW5ndWFnZS5cclxuICAgICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIGNvZGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhdXRvdHJhbnNsYXRlTGFuZ3VhZ2UobGFuZzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b3RyYW5zbGF0ZWRMYW5ndWFnZXMoKS5pbmRleE9mKGxhbmcpID49IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBsaXN0IG9mIGxhbmd1YWdlcyB0byBiZSBhdXRvdHJhbnNsYXRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1dG90cmFuc2xhdGVkTGFuZ3VhZ2VzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fYXV0b3RyYW5zbGF0ZSkgfHwgdGhpcy5fYXV0b3RyYW5zbGF0ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNBcnJheSh0aGlzLl9hdXRvdHJhbnNsYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKDxzdHJpbmdbXT50aGlzLl9hdXRvdHJhbnNsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VzKCkuc2xpY2UoMSk7IC8vIGZpcnN0IGlzIHNvdXJjZSBsYW5ndWFnZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIGtleSB0byBiZSB1c2VkIGZvciBHb29nbGUgVHJhbnNsYXRlXHJcbiAgICAgKiBAcmV0dXJuIGFwaSBrZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwaWtleSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fYXBpa2V5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBpa2V5O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFwaWtleVBhdGggPSB0aGlzLmFwaWtleWZpbGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBpa2V5ZmlsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhhcGlrZXlQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGaWxlVXRpbC5yZWFkKGFwaWtleVBhdGgsICd1dGYtOCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZm9ybWF0KCdhcGkga2V5IGZpbGUgbm90IGZvdW5kOiBBUElfS0VZX0ZJTEU9JXMnLCBhcGlrZXlQYXRoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGZpbGUgbmFtZSBmb3IgQVBJIGtleSB0byBiZSB1c2VkIGZvciBHb29nbGUgVHJhbnNsYXRlLlxyXG4gICAgICogRXhwbGljaXRseSBzZXQgb3IgcmVhZCBmcm9tIGVudiB2YXIgQVBJX0tFWV9GSUxFLlxyXG4gICAgICogQHJldHVybiBmaWxlIG9mIGFwaSBrZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFwaWtleWZpbGUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fYXBpa2V5ZmlsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBpa2V5ZmlsZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkFQSV9LRVlfRklMRSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuQVBJX0tFWV9GSUxFO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=