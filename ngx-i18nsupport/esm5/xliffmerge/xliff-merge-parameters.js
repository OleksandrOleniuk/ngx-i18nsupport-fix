/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PROFILE_CANDIDATES = ['package.json', '.angular-cli.json'];
var XliffMergeParameters = /** @class */ (function () {
    function XliffMergeParameters() {
        this.errorsFound = [];
        this.warningsFound = [];
    }
    /**
     * Create Parameters.
     * @param options command options
     * @param profileContent given profile (if not, it is read from the profile path from options).
     */
    /**
     * Create Parameters.
     * @param {?} options command options
     * @param {?=} profileContent given profile (if not, it is read from the profile path from options).
     * @return {?}
     */
    XliffMergeParameters.createFromOptions = /**
     * Create Parameters.
     * @param {?} options command options
     * @param {?=} profileContent given profile (if not, it is read from the profile path from options).
     * @return {?}
     */
    function (options, profileContent) {
        /** @type {?} */
        var parameters = new XliffMergeParameters();
        parameters.configure(options, profileContent);
        return parameters;
    };
    /**
     * Read potential profile.
     * To be a candidate, file must exist and contain property "xliffmergeOptions".
     * @param profilePath path of profile
     * @return parsed content of file or null, if file does not exist or is not a profile candidate.
     */
    /**
     * Read potential profile.
     * To be a candidate, file must exist and contain property "xliffmergeOptions".
     * @private
     * @param {?} profilePath path of profile
     * @return {?} parsed content of file or null, if file does not exist or is not a profile candidate.
     */
    XliffMergeParameters.readProfileCandidate = /**
     * Read potential profile.
     * To be a candidate, file must exist and contain property "xliffmergeOptions".
     * @private
     * @param {?} profilePath path of profile
     * @return {?} parsed content of file or null, if file does not exist or is not a profile candidate.
     */
    function (profilePath) {
        /** @type {?} */
        var content;
        try {
            content = fs.readFileSync(profilePath, 'UTF-8');
        }
        catch (err) {
            return null;
        }
        /** @type {?} */
        var parsedContent = JSON.parse(content);
        if (parsedContent && parsedContent.xliffmergeOptions) {
            return parsedContent;
        }
        else {
            return null;
        }
    };
    /**
     * Initialize me from the profile content.
     * (public only for test usage).
     * @param options options given at runtime via command line
     * @param profileContent if null, read it from profile.
     */
    /**
     * Initialize me from the profile content.
     * (public only for test usage).
     * @private
     * @param {?} options options given at runtime via command line
     * @param {?=} profileContent if null, read it from profile.
     * @return {?}
     */
    XliffMergeParameters.prototype.configure = /**
     * Initialize me from the profile content.
     * (public only for test usage).
     * @private
     * @param {?} options options given at runtime via command line
     * @param {?=} profileContent if null, read it from profile.
     * @return {?}
     */
    function (options, profileContent) {
        this.errorsFound = [];
        this.warningsFound = [];
        if (!profileContent) {
            profileContent = this.readProfile(options);
        }
        /** @type {?} */
        var validProfile = (!!profileContent);
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
    };
    /**
     * Read profile.
     * @param options program options
     * @return the read profile (empty, if none, null if errors)
     */
    /**
     * Read profile.
     * @private
     * @param {?} options program options
     * @return {?} the read profile (empty, if none, null if errors)
     */
    XliffMergeParameters.prototype.readProfile = /**
     * Read profile.
     * @private
     * @param {?} options program options
     * @return {?} the read profile (empty, if none, null if errors)
     */
    function (options) {
        var e_1, _a;
        /** @type {?} */
        var profilePath = options.profilePath;
        if (!profilePath) {
            try {
                for (var PROFILE_CANDIDATES_1 = tslib_1.__values(PROFILE_CANDIDATES), PROFILE_CANDIDATES_1_1 = PROFILE_CANDIDATES_1.next(); !PROFILE_CANDIDATES_1_1.done; PROFILE_CANDIDATES_1_1 = PROFILE_CANDIDATES_1.next()) {
                    var configfilename = PROFILE_CANDIDATES_1_1.value;
                    /** @type {?} */
                    var profile = XliffMergeParameters.readProfileCandidate(configfilename);
                    if (profile) {
                        this.usedProfilePath = configfilename;
                        return profile;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (PROFILE_CANDIDATES_1_1 && !PROFILE_CANDIDATES_1_1.done && (_a = PROFILE_CANDIDATES_1.return)) _a.call(PROFILE_CANDIDATES_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return {};
        }
        /** @type {?} */
        var content;
        try {
            content = fs.readFileSync(profilePath, 'UTF-8');
        }
        catch (err) {
            this.errorsFound.push(new XliffMergeError('could not read profile "' + profilePath + '"'));
            return null;
        }
        this.usedProfilePath = profilePath;
        /** @type {?} */
        var profileContent = JSON.parse(content);
        // replace all pathes in options by absolute paths
        /** @type {?} */
        var xliffmergeOptions = profileContent.xliffmergeOptions;
        xliffmergeOptions.srcDir = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.srcDir);
        xliffmergeOptions.genDir = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.genDir);
        xliffmergeOptions.apikeyfile = this.adjustPathToProfilePath(profilePath, xliffmergeOptions.apikeyfile);
        return profileContent;
    };
    /**
     * @private
     * @param {?} profilePath
     * @param {?} pathToAdjust
     * @return {?}
     */
    XliffMergeParameters.prototype.adjustPathToProfilePath = /**
     * @private
     * @param {?} profilePath
     * @param {?} pathToAdjust
     * @return {?}
     */
    function (profilePath, pathToAdjust) {
        if (!pathToAdjust || isAbsolute(pathToAdjust)) {
            return pathToAdjust;
        }
        return join(dirname(profilePath), pathToAdjust).replace(/\\/g, '/');
    };
    /**
     * @private
     * @param {?} profileContent
     * @return {?}
     */
    XliffMergeParameters.prototype.initializeFromConfig = /**
     * @private
     * @param {?} profileContent
     * @return {?}
     */
    function (profileContent) {
        if (!profileContent) {
            return;
        }
        /** @type {?} */
        var profile = profileContent.xliffmergeOptions;
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
    };
    /**
     * Check all Parameters, wether they are complete and consistent.
     * if something is wrong with the parameters, it is collected in errorsFound.
     */
    /**
     * Check all Parameters, wether they are complete and consistent.
     * if something is wrong with the parameters, it is collected in errorsFound.
     * @private
     * @return {?}
     */
    XliffMergeParameters.prototype.checkParameters = /**
     * Check all Parameters, wether they are complete and consistent.
     * if something is wrong with the parameters, it is collected in errorsFound.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.checkLanguageSyntax(this.defaultLanguage());
        if (this.languages().length === 0) {
            this.errorsFound.push(new XliffMergeError('no languages specified'));
        }
        this.languages().forEach((/**
         * @param {?} lang
         * @return {?}
         */
        function (lang) {
            _this.checkLanguageSyntax(lang);
        }));
        /** @type {?} */
        var stats;
        /** @type {?} */
        var err;
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
        function (lang) {
            if (_this.languages().indexOf(lang) < 0) {
                _this.errorsFound.push(new XliffMergeError('autotranslate language "' + lang + '" is not in list of languages'));
            }
            if (lang === _this.defaultLanguage()) {
                _this.errorsFound.push(new XliffMergeError('autotranslate language "' + lang + '" cannot be translated, because it is the source language'));
            }
        }));
        // ngx translate pattern check
        if (this.supportNgxTranslate()) {
            /** @type {?} */
            var checkResult = NgxTranslateExtractor.checkPattern(this.ngxTranslateExtractionPattern());
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
    };
    /**
     * Check syntax of language.
     * Must be compatible with XML Schema type xsd:language.
     * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
     * @param lang language to check
     */
    /**
     * Check syntax of language.
     * Must be compatible with XML Schema type xsd:language.
     * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
     * @private
     * @param {?} lang language to check
     * @return {?}
     */
    XliffMergeParameters.prototype.checkLanguageSyntax = /**
     * Check syntax of language.
     * Must be compatible with XML Schema type xsd:language.
     * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
     * @private
     * @param {?} lang language to check
     * @return {?}
     */
    function (lang) {
        /** @type {?} */
        var pattern = /^[a-zA-Z]{1,8}([-_][a-zA-Z0-9]{1,8})*$/;
        if (!pattern.test(lang)) {
            this.errorsFound.push(new XliffMergeError('language "' + lang + '" is not valid'));
        }
    };
    /**
     * @return {?}
     */
    XliffMergeParameters.prototype.allowIdChange = /**
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._allowIdChange)) ? false : this._allowIdChange;
    };
    /**
     * @return {?}
     */
    XliffMergeParameters.prototype.verbose = /**
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._verbose)) ? false : this._verbose;
    };
    /**
     * @return {?}
     */
    XliffMergeParameters.prototype.quiet = /**
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._quiet)) ? false : this._quiet;
    };
    /**
     * Debug output all parameters to commandOutput.
     */
    /**
     * Debug output all parameters to commandOutput.
     * @param {?} commandOutput
     * @return {?}
     */
    XliffMergeParameters.prototype.showAllParameters = /**
     * Debug output all parameters to commandOutput.
     * @param {?} commandOutput
     * @return {?}
     */
    function (commandOutput) {
        var e_2, _a;
        commandOutput.debug('xliffmerge Used Parameters:');
        commandOutput.debug('usedProfilePath:\t"%s"', this.usedProfilePath);
        commandOutput.debug('defaultLanguage:\t"%s"', this.defaultLanguage());
        commandOutput.debug('srcDir:\t"%s"', this.srcDir());
        commandOutput.debug('genDir:\t"%s"', this.genDir());
        commandOutput.debug('i18nBaseFile:\t"%s"', this.i18nBaseFile());
        commandOutput.debug('i18nFile:\t"%s"', this.i18nFile());
        commandOutput.debug('languages:\t%s', this.languages());
        try {
            for (var _b = tslib_1.__values(this.languages()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var language = _c.value;
                commandOutput.debug('outputFile[%s]:\t%s', language, this.generatedI18nFile(language));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
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
    };
    /**
     * Default-Language, default en.
     * @return default language
     */
    /**
     * Default-Language, default en.
     * @return {?} default language
     */
    XliffMergeParameters.prototype.defaultLanguage = /**
     * Default-Language, default en.
     * @return {?} default language
     */
    function () {
        return this._defaultLanguage ? this._defaultLanguage : 'en';
    };
    /**
     * Liste der zu bearbeitenden Sprachen.
     * @return languages
     */
    /**
     * Liste der zu bearbeitenden Sprachen.
     * @return {?} languages
     */
    XliffMergeParameters.prototype.languages = /**
     * Liste der zu bearbeitenden Sprachen.
     * @return {?} languages
     */
    function () {
        return this._languages ? this._languages : [];
    };
    /**
     * src directory, where the master xlif is located.
     * @return srcDir
     */
    /**
     * src directory, where the master xlif is located.
     * @return {?} srcDir
     */
    XliffMergeParameters.prototype.srcDir = /**
     * src directory, where the master xlif is located.
     * @return {?} srcDir
     */
    function () {
        return this._srcDir ? this._srcDir : '.';
    };
    /**
     * The base file name of the xlif file for input and output.
     * Default is messages
     * @return base file
     */
    /**
     * The base file name of the xlif file for input and output.
     * Default is messages
     * @return {?} base file
     */
    XliffMergeParameters.prototype.i18nBaseFile = /**
     * The base file name of the xlif file for input and output.
     * Default is messages
     * @return {?} base file
     */
    function () {
        return this._i18nBaseFile ? this._i18nBaseFile : 'messages';
    };
    /**
     * The master xlif file (the one generated by ng-xi18n).
     * Default is <srcDir>/<i18nBaseFile>.xlf.
     * @return master file
     */
    /**
     * The master xlif file (the one generated by ng-xi18n).
     * Default is <srcDir>/<i18nBaseFile>.xlf.
     * @return {?} master file
     */
    XliffMergeParameters.prototype.i18nFile = /**
     * The master xlif file (the one generated by ng-xi18n).
     * Default is <srcDir>/<i18nBaseFile>.xlf.
     * @return {?} master file
     */
    function () {
        return join(this.srcDir(), (this._i18nFile ? this._i18nFile : this.i18nBaseFile() + '.' + this.suffixForGeneratedI18nFile())).replace(/\\/g, '/');
    };
    /**
     * Format of the master xlif file.
     * Default is "xlf", possible are "xlf" or "xlf2" or "xmb".
     * @return format
     */
    /**
     * Format of the master xlif file.
     * Default is "xlf", possible are "xlf" or "xlf2" or "xmb".
     * @return {?} format
     */
    XliffMergeParameters.prototype.i18nFormat = /**
     * Format of the master xlif file.
     * Default is "xlf", possible are "xlf" or "xlf2" or "xmb".
     * @return {?} format
     */
    function () {
        return (this._i18nFormat ? this._i18nFormat : 'xlf');
    };
    /**
     * potentially to be generated I18n-File with the translations for one language.
     * @param lang language shortcut
     * @return Path of file
     */
    /**
     * potentially to be generated I18n-File with the translations for one language.
     * @param {?} lang language shortcut
     * @return {?} Path of file
     */
    XliffMergeParameters.prototype.generatedI18nFile = /**
     * potentially to be generated I18n-File with the translations for one language.
     * @param {?} lang language shortcut
     * @return {?} Path of file
     */
    function (lang) {
        return join(this.genDir(), this.i18nBaseFile() + '.' + lang + '.' + this.suffixForGeneratedI18nFile()).replace(/\\/g, '/');
    };
    /**
     * @private
     * @return {?}
     */
    XliffMergeParameters.prototype.suffixForGeneratedI18nFile = /**
     * @private
     * @return {?}
     */
    function () {
        switch (this.i18nFormat()) {
            case 'xlf':
                return 'xlf';
            case 'xlf2':
                return 'xlf';
            case 'xmb':
                return 'xtb';
        }
    };
    /**
     * potentially to be generated translate-File for ngx-translate with the translations for one language.
     * @param lang language shortcut
     * @return Path of file
     */
    /**
     * potentially to be generated translate-File for ngx-translate with the translations for one language.
     * @param {?} lang language shortcut
     * @return {?} Path of file
     */
    XliffMergeParameters.prototype.generatedNgxTranslateFile = /**
     * potentially to be generated translate-File for ngx-translate with the translations for one language.
     * @param {?} lang language shortcut
     * @return {?} Path of file
     */
    function (lang) {
        return join(this.genDir(), this.i18nBaseFile() + '.' + lang + '.' + 'json').replace(/\\/g, '/');
    };
    /**
     * The encoding used to write new XLIFF-files.
     * @return encoding
     */
    /**
     * The encoding used to write new XLIFF-files.
     * @return {?} encoding
     */
    XliffMergeParameters.prototype.encoding = /**
     * The encoding used to write new XLIFF-files.
     * @return {?} encoding
     */
    function () {
        return this._encoding ? this._encoding : 'UTF-8';
    };
    /**
     * Output-Directory, where the output is written to.
     * Default is <srcDir>.
    */
    /**
     * Output-Directory, where the output is written to.
     * Default is <srcDir>.
     * @return {?}
     */
    XliffMergeParameters.prototype.genDir = /**
     * Output-Directory, where the output is written to.
     * Default is <srcDir>.
     * @return {?}
     */
    function () {
        return this._genDir ? this._genDir : this.srcDir();
    };
    /**
     * @return {?}
     */
    XliffMergeParameters.prototype.removeUnusedIds = /**
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._removeUnusedIds)) ? true : this._removeUnusedIds;
    };
    /**
     * @return {?}
     */
    XliffMergeParameters.prototype.supportNgxTranslate = /**
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._supportNgxTranslate)) ? false : this._supportNgxTranslate;
    };
    /**
     * @return {?}
     */
    XliffMergeParameters.prototype.ngxTranslateExtractionPattern = /**
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._ngxTranslateExtractionPattern)) ?
            NgxTranslateExtractor.DefaultExtractionPattern : this._ngxTranslateExtractionPattern;
    };
    /**
     * Whether source must be used as target for new trans-units
     * Default is true
     */
    /**
     * Whether source must be used as target for new trans-units
     * Default is true
     * @return {?}
     */
    XliffMergeParameters.prototype.useSourceAsTarget = /**
     * Whether source must be used as target for new trans-units
     * Default is true
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._useSourceAsTarget)) ? true : this._useSourceAsTarget;
    };
    /**
     * Praefix used for target when copying new trans-units
     * Default is ""
     */
    /**
     * Praefix used for target when copying new trans-units
     * Default is ""
     * @return {?}
     */
    XliffMergeParameters.prototype.targetPraefix = /**
     * Praefix used for target when copying new trans-units
     * Default is ""
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._targetPraefix)) ? '' : this._targetPraefix;
    };
    /**
     * Suffix used for target when copying new trans-units
     * Default is ""
     */
    /**
     * Suffix used for target when copying new trans-units
     * Default is ""
     * @return {?}
     */
    XliffMergeParameters.prototype.targetSuffix = /**
     * Suffix used for target when copying new trans-units
     * Default is ""
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._targetSuffix)) ? '' : this._targetSuffix;
    };
    /**
     * If set, run xml result through beautifier (pretty-data).
     */
    /**
     * If set, run xml result through beautifier (pretty-data).
     * @return {?}
     */
    XliffMergeParameters.prototype.beautifyOutput = /**
     * If set, run xml result through beautifier (pretty-data).
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._beautifyOutput)) ? false : this._beautifyOutput;
    };
    /**
     * If set, order of new trans units will be as in master.
     * Otherwise they are added at the end.
     */
    /**
     * If set, order of new trans units will be as in master.
     * Otherwise they are added at the end.
     * @return {?}
     */
    XliffMergeParameters.prototype.preserveOrder = /**
     * If set, order of new trans units will be as in master.
     * Otherwise they are added at the end.
     * @return {?}
     */
    function () {
        return (isNullOrUndefined(this._preserveOrder)) ? true : this._preserveOrder;
    };
    /**
     * Whether to use autotranslate for new trans-units
     * Default is false
     */
    /**
     * Whether to use autotranslate for new trans-units
     * Default is false
     * @return {?}
     */
    XliffMergeParameters.prototype.autotranslate = /**
     * Whether to use autotranslate for new trans-units
     * Default is false
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this._autotranslate)) {
            return false;
        }
        if (isArray(this._autotranslate)) {
            return ((/** @type {?} */ (this._autotranslate))).length > 0;
        }
        return (/** @type {?} */ (this._autotranslate));
    };
    /**
     * Whether to use autotranslate for a given language.
     * @param lang language code.
     */
    /**
     * Whether to use autotranslate for a given language.
     * @param {?} lang language code.
     * @return {?}
     */
    XliffMergeParameters.prototype.autotranslateLanguage = /**
     * Whether to use autotranslate for a given language.
     * @param {?} lang language code.
     * @return {?}
     */
    function (lang) {
        return this.autotranslatedLanguages().indexOf(lang) >= 0;
    };
    /**
     * Return a list of languages to be autotranslated.
     */
    /**
     * Return a list of languages to be autotranslated.
     * @return {?}
     */
    XliffMergeParameters.prototype.autotranslatedLanguages = /**
     * Return a list of languages to be autotranslated.
     * @return {?}
     */
    function () {
        if (isNullOrUndefined(this._autotranslate) || this._autotranslate === false) {
            return [];
        }
        if (isArray(this._autotranslate)) {
            return ((/** @type {?} */ (this._autotranslate)));
        }
        return this.languages().slice(1); // first is source language
    };
    /**
     * API key to be used for Google Translate
     * @return api key
     */
    /**
     * API key to be used for Google Translate
     * @return {?} api key
     */
    XliffMergeParameters.prototype.apikey = /**
     * API key to be used for Google Translate
     * @return {?} api key
     */
    function () {
        if (!isNullOrUndefined(this._apikey)) {
            return this._apikey;
        }
        else {
            /** @type {?} */
            var apikeyPath = this.apikeyfile();
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
    };
    /**
     * file name for API key to be used for Google Translate.
     * Explicitly set or read from env var API_KEY_FILE.
     * @return file of api key
     */
    /**
     * file name for API key to be used for Google Translate.
     * Explicitly set or read from env var API_KEY_FILE.
     * @return {?} file of api key
     */
    XliffMergeParameters.prototype.apikeyfile = /**
     * file name for API key to be used for Google Translate.
     * Explicitly set or read from env var API_KEY_FILE.
     * @return {?} file of api key
     */
    function () {
        if (this._apikeyfile) {
            return this._apikeyfile;
        }
        else if (process.env.API_KEY_FILE) {
            return process.env.API_KEY_FILE;
        }
        else {
            return null;
        }
    };
    return XliffMergeParameters;
}());
export { XliffMergeParameters };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVyZ2UtcGFyYW1ldGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtaTE4bnN1cHBvcnQvbmd4LWkxOG5zdXBwb3J0LyIsInNvdXJjZXMiOlsieGxpZmZtZXJnZS94bGlmZi1tZXJnZS1wYXJhbWV0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQSxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFHcEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM1QixPQUFPLEVBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBWSxNQUFNLE1BQU0sQ0FBQzs7SUFFcEQsa0JBQWtCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsbUJBQW1CLENBQUM7QUFFaEU7SUF3Q0k7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBZEQ7Ozs7T0FJRzs7Ozs7OztJQUNXLHNDQUFpQjs7Ozs7O0lBQS9CLFVBQWdDLE9BQXVCLEVBQUUsY0FBNEI7O1lBQzNFLFVBQVUsR0FBRyxJQUFJLG9CQUFvQixFQUFFO1FBQzdDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFPRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDWSx5Q0FBb0I7Ozs7Ozs7SUFBbkMsVUFBb0MsV0FBbUI7O1lBQy9DLE9BQWU7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QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDM0I7YUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFO1lBQ2pDLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQUFDLEFBcGtCRCxJQW9rQkM7Ozs7Ozs7SUFsa0JHLCtDQUFnQzs7Ozs7SUFDaEMsc0NBQXdCOzs7OztJQUN4Qix3Q0FBMEI7Ozs7O0lBQzFCLDhDQUFnQzs7Ozs7SUFDaEMsZ0RBQWlDOzs7OztJQUNqQyx1Q0FBd0I7Ozs7O0lBQ3hCLDZDQUE4Qjs7Ozs7SUFDOUIseUNBQTBCOzs7OztJQUMxQiwyQ0FBNEI7Ozs7O0lBQzVCLHlDQUEwQjs7Ozs7SUFDMUIsdUNBQXdCOzs7OztJQUN4QiwwQ0FBNkI7Ozs7O0lBQzdCLGdEQUFrQzs7Ozs7SUFDbEMsb0RBQXNDOzs7OztJQUN0Qyw4REFBK0M7Ozs7O0lBQy9DLGtEQUFvQzs7Ozs7SUFDcEMsOENBQStCOzs7OztJQUMvQiw2Q0FBOEI7Ozs7O0lBQzlCLCtDQUFpQzs7Ozs7SUFDakMsOENBQWdDOzs7OztJQUNoQyw4Q0FBeUM7Ozs7O0lBQ3pDLHVDQUF3Qjs7Ozs7SUFDeEIsMkNBQTRCOztJQUU1QiwyQ0FBc0M7O0lBQ3RDLDZDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IG1hcnRpbiBvbiAxNy4wMi4yMDE3LlxyXG4gKiBDb2xsZWN0aW9uIG9mIGFsbCBwYXJhbWV0ZXJzIHVzZWQgYnkgdGhlIHRvb2wuXHJcbiAqIFRoZSBwYXJhbWV0ZXJzIGFyZSByZWFkIGZvcm0gdGhlIHByb2ZpbGUgb3IgZGVmYXVsdHMgYXJlIHVzZWQuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQge1hsaWZmTWVyZ2VFcnJvcn0gZnJvbSAnLi94bGlmZi1tZXJnZS1lcnJvcic7XHJcbmltcG9ydCB7U3RhdHN9IGZyb20gJ2ZzJztcclxuaW1wb3J0IHtDb21tYW5kT3V0cHV0fSBmcm9tICcuLi9jb21tb24vY29tbWFuZC1vdXRwdXQnO1xyXG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAndXRpbCc7XHJcbmltcG9ydCB7aXNBcnJheSwgaXNOdWxsT3JVbmRlZmluZWR9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcclxuaW1wb3J0IHtQcm9ncmFtT3B0aW9ucywgSUNvbmZpZ0ZpbGV9IGZyb20gJy4vaS14bGlmZi1tZXJnZS1vcHRpb25zJztcclxuaW1wb3J0IHtGaWxlVXRpbH0gZnJvbSAnLi4vY29tbW9uL2ZpbGUtdXRpbCc7XHJcbmltcG9ydCB7Tmd4VHJhbnNsYXRlRXh0cmFjdG9yfSBmcm9tICcuL25neC10cmFuc2xhdGUtZXh0cmFjdG9yJztcclxuaW1wb3J0IHtkaXJuYW1lLCBpc0Fic29sdXRlLCBqb2luLCBub3JtYWxpemV9IGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgUFJPRklMRV9DQU5ESURBVEVTID0gWydwYWNrYWdlLmpzb24nLCAnLmFuZ3VsYXItY2xpLmpzb24nXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBYbGlmZk1lcmdlUGFyYW1ldGVycyB7XHJcblxyXG4gICAgcHJpdmF0ZSB1c2VkUHJvZmlsZVBhdGg6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3F1aWV0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfdmVyYm9zZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2FsbG93SWRDaGFuZ2U6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0TGFuZ3VhZ2U6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3NyY0Rpcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaTE4bkJhc2VGaWxlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pMThuRmlsZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfaTE4bkZvcm1hdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfZW5jb2Rpbmc6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2dlbkRpcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfbGFuZ3VhZ2VzOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX3JlbW92ZVVudXNlZElkczogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3N1cHBvcnROZ3hUcmFuc2xhdGU6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdXNlU291cmNlQXNUYXJnZXQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF90YXJnZXRQcmFlZml4OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF90YXJnZXRTdWZmaXg6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2JlYXV0aWZ5T3V0cHV0OiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfcHJlc2VydmVPcmRlcjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2F1dG90cmFuc2xhdGU6IGJvb2xlYW58c3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9hcGlrZXk6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2FwaWtleWZpbGU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZXJyb3JzRm91bmQ6IFhsaWZmTWVyZ2VFcnJvcltdO1xyXG4gICAgcHVibGljIHdhcm5pbmdzRm91bmQ6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIFBhcmFtZXRlcnMuXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBjb21tYW5kIG9wdGlvbnNcclxuICAgICAqIEBwYXJhbSBwcm9maWxlQ29udGVudCBnaXZlbiBwcm9maWxlIChpZiBub3QsIGl0IGlzIHJlYWQgZnJvbSB0aGUgcHJvZmlsZSBwYXRoIGZyb20gb3B0aW9ucykuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRnJvbU9wdGlvbnMob3B0aW9uczogUHJvZ3JhbU9wdGlvbnMsIHByb2ZpbGVDb250ZW50PzogSUNvbmZpZ0ZpbGUpIHtcclxuICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gbmV3IFhsaWZmTWVyZ2VQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgcGFyYW1ldGVycy5jb25maWd1cmUob3B0aW9ucywgcHJvZmlsZUNvbnRlbnQpO1xyXG4gICAgICAgIHJldHVybiBwYXJhbWV0ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnNGb3VuZCA9IFtdO1xyXG4gICAgICAgIHRoaXMud2FybmluZ3NGb3VuZCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBwb3RlbnRpYWwgcHJvZmlsZS5cclxuICAgICAqIFRvIGJlIGEgY2FuZGlkYXRlLCBmaWxlIG11c3QgZXhpc3QgYW5kIGNvbnRhaW4gcHJvcGVydHkgXCJ4bGlmZm1lcmdlT3B0aW9uc1wiLlxyXG4gICAgICogQHBhcmFtIHByb2ZpbGVQYXRoIHBhdGggb2YgcHJvZmlsZVxyXG4gICAgICogQHJldHVybiBwYXJzZWQgY29udGVudCBvZiBmaWxlIG9yIG51bGwsIGlmIGZpbGUgZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IGEgcHJvZmlsZSBjYW5kaWRhdGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRQcm9maWxlQ2FuZGlkYXRlKHByb2ZpbGVQYXRoOiBzdHJpbmcpOiBJQ29uZmlnRmlsZSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ6IHN0cmluZztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHByb2ZpbGVQYXRoLCAnVVRGLTgnKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhcnNlZENvbnRlbnQ6IElDb25maWdGaWxlID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgICAgICBpZiAocGFyc2VkQ29udGVudCAmJiBwYXJzZWRDb250ZW50LnhsaWZmbWVyZ2VPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZWRDb250ZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemUgbWUgZnJvbSB0aGUgcHJvZmlsZSBjb250ZW50LlxyXG4gICAgICogKHB1YmxpYyBvbmx5IGZvciB0ZXN0IHVzYWdlKS5cclxuICAgICAqIEBwYXJhbSBvcHRpb25zIG9wdGlvbnMgZ2l2ZW4gYXQgcnVudGltZSB2aWEgY29tbWFuZCBsaW5lXHJcbiAgICAgKiBAcGFyYW0gcHJvZmlsZUNvbnRlbnQgaWYgbnVsbCwgcmVhZCBpdCBmcm9tIHByb2ZpbGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29uZmlndXJlKG9wdGlvbnM6IFByb2dyYW1PcHRpb25zLCBwcm9maWxlQ29udGVudD86IElDb25maWdGaWxlKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvcnNGb3VuZCA9IFtdO1xyXG4gICAgICAgIHRoaXMud2FybmluZ3NGb3VuZCA9IFtdO1xyXG4gICAgICAgIGlmICghcHJvZmlsZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgcHJvZmlsZUNvbnRlbnQgPSB0aGlzLnJlYWRQcm9maWxlKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB2YWxpZFByb2ZpbGU6IGJvb2xlYW4gPSAoISFwcm9maWxlQ29udGVudCk7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucXVpZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcXVpZXQgPSBvcHRpb25zLnF1aWV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZlcmJvc2UgPSBvcHRpb25zLnZlcmJvc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWxpZFByb2ZpbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRnJvbUNvbmZpZyhwcm9maWxlQ29udGVudCk7XHJcbiAgICAgICAgICAgIC8vIGlmIGxhbmd1YWdlcyBhcmUgZ2l2ZW4gYXMgcGFyYW1ldGVycywgdGhleSBvdnZlcmlkZSBldmVyeXRoaW5nIHNhaWQgaW4gcHJvZmlsZVxyXG4gICAgICAgICAgICBpZiAoISFvcHRpb25zLmxhbmd1YWdlcyAmJiBvcHRpb25zLmxhbmd1YWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYW5ndWFnZXMgPSBvcHRpb25zLmxhbmd1YWdlcztcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fZGVmYXVsdExhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdExhbmd1YWdlID0gdGhpcy5fbGFuZ3VhZ2VzWzBdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tQYXJhbWV0ZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVhZCBwcm9maWxlLlxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgcHJvZ3JhbSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIHRoZSByZWFkIHByb2ZpbGUgKGVtcHR5LCBpZiBub25lLCBudWxsIGlmIGVycm9ycylcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWFkUHJvZmlsZShvcHRpb25zOiBQcm9ncmFtT3B0aW9ucyk6IElDb25maWdGaWxlIHtcclxuICAgICAgICBjb25zdCBwcm9maWxlUGF0aDogc3RyaW5nID0gb3B0aW9ucy5wcm9maWxlUGF0aDtcclxuICAgICAgICBpZiAoIXByb2ZpbGVQYXRoKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29uZmlnZmlsZW5hbWUgb2YgUFJPRklMRV9DQU5ESURBVEVTKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlID0gWGxpZmZNZXJnZVBhcmFtZXRlcnMucmVhZFByb2ZpbGVDYW5kaWRhdGUoY29uZmlnZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb2ZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZWRQcm9maWxlUGF0aCA9IGNvbmZpZ2ZpbGVuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9maWxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ6IHN0cmluZztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHByb2ZpbGVQYXRoLCAnVVRGLTgnKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKG5ldyBYbGlmZk1lcmdlRXJyb3IoJ2NvdWxkIG5vdCByZWFkIHByb2ZpbGUgXCInICsgcHJvZmlsZVBhdGggKyAnXCInKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVzZWRQcm9maWxlUGF0aCA9IHByb2ZpbGVQYXRoO1xyXG4gICAgICAgIGNvbnN0IHByb2ZpbGVDb250ZW50OiBJQ29uZmlnRmlsZSA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgLy8gcmVwbGFjZSBhbGwgcGF0aGVzIGluIG9wdGlvbnMgYnkgYWJzb2x1dGUgcGF0aHNcclxuICAgICAgICBjb25zdCB4bGlmZm1lcmdlT3B0aW9ucyA9IHByb2ZpbGVDb250ZW50LnhsaWZmbWVyZ2VPcHRpb25zO1xyXG4gICAgICAgIHhsaWZmbWVyZ2VPcHRpb25zLnNyY0RpciA9IHRoaXMuYWRqdXN0UGF0aFRvUHJvZmlsZVBhdGgocHJvZmlsZVBhdGgsIHhsaWZmbWVyZ2VPcHRpb25zLnNyY0Rpcik7XHJcbiAgICAgICAgeGxpZmZtZXJnZU9wdGlvbnMuZ2VuRGlyID0gdGhpcy5hZGp1c3RQYXRoVG9Qcm9maWxlUGF0aChwcm9maWxlUGF0aCwgeGxpZmZtZXJnZU9wdGlvbnMuZ2VuRGlyKTtcclxuICAgICAgICB4bGlmZm1lcmdlT3B0aW9ucy5hcGlrZXlmaWxlID0gdGhpcy5hZGp1c3RQYXRoVG9Qcm9maWxlUGF0aChwcm9maWxlUGF0aCwgeGxpZmZtZXJnZU9wdGlvbnMuYXBpa2V5ZmlsZSk7XHJcbiAgICAgICAgcmV0dXJuIHByb2ZpbGVDb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRqdXN0UGF0aFRvUHJvZmlsZVBhdGgocHJvZmlsZVBhdGg6IHN0cmluZywgcGF0aFRvQWRqdXN0OiBzdHJpbmcgfCB1bmRlZmluZWQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghcGF0aFRvQWRqdXN0IHx8IGlzQWJzb2x1dGUocGF0aFRvQWRqdXN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF0aFRvQWRqdXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gam9pbihkaXJuYW1lKHByb2ZpbGVQYXRoKSwgcGF0aFRvQWRqdXN0KS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRnJvbUNvbmZpZyhwcm9maWxlQ29udGVudDogSUNvbmZpZ0ZpbGUpIHtcclxuICAgICAgICBpZiAoIXByb2ZpbGVDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVDb250ZW50LnhsaWZmbWVyZ2VPcHRpb25zO1xyXG4gICAgICAgIGlmIChwcm9maWxlKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5xdWlldCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3F1aWV0ID0gcHJvZmlsZS5xdWlldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUudmVyYm9zZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZlcmJvc2UgPSBwcm9maWxlLnZlcmJvc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLmFsbG93SWRDaGFuZ2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd0lkQ2hhbmdlID0gcHJvZmlsZS5hbGxvd0lkQ2hhbmdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmRlZmF1bHRMYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdExhbmd1YWdlID0gcHJvZmlsZS5kZWZhdWx0TGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb2ZpbGUubGFuZ3VhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sYW5ndWFnZXMgPSBwcm9maWxlLmxhbmd1YWdlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvZmlsZS5zcmNEaXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NyY0RpciA9IHByb2ZpbGUuc3JjRGlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmFuZ3VsYXJDb21waWxlck9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9maWxlLmFuZ3VsYXJDb21waWxlck9wdGlvbnMuZ2VuRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2VuRGlyID0gcHJvZmlsZS5hbmd1bGFyQ29tcGlsZXJPcHRpb25zLmdlbkRpcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvZmlsZS5nZW5EaXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgbXVzdCBiZSBhZnRlciBhbmd1bGFyQ29tcGlsZXJPcHRpb25zIHRvIGJlIHByZWZlcnJlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2VuRGlyID0gcHJvZmlsZS5nZW5EaXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb2ZpbGUuaTE4bkJhc2VGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pMThuQmFzZUZpbGUgPSBwcm9maWxlLmkxOG5CYXNlRmlsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvZmlsZS5pMThuRmlsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faTE4bkZpbGUgPSBwcm9maWxlLmkxOG5GaWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9maWxlLmkxOG5Gb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2kxOG5Gb3JtYXQgPSBwcm9maWxlLmkxOG5Gb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb2ZpbGUuZW5jb2RpbmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuY29kaW5nID0gcHJvZmlsZS5lbmNvZGluZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUucmVtb3ZlVW51c2VkSWRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlVW51c2VkSWRzID0gcHJvZmlsZS5yZW1vdmVVbnVzZWRJZHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLnN1cHBvcnROZ3hUcmFuc2xhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdXBwb3J0Tmd4VHJhbnNsYXRlID0gcHJvZmlsZS5zdXBwb3J0Tmd4VHJhbnNsYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuID0gcHJvZmlsZS5uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUudXNlU291cmNlQXNUYXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91c2VTb3VyY2VBc1RhcmdldCA9IHByb2ZpbGUudXNlU291cmNlQXNUYXJnZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLnRhcmdldFByYWVmaXgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRQcmFlZml4ID0gcHJvZmlsZS50YXJnZXRQcmFlZml4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS50YXJnZXRTdWZmaXgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRTdWZmaXggPSBwcm9maWxlLnRhcmdldFN1ZmZpeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUuYXV0b3RyYW5zbGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2F1dG90cmFuc2xhdGUgPSBwcm9maWxlLmF1dG90cmFuc2xhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLmJlYXV0aWZ5T3V0cHV0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVhdXRpZnlPdXRwdXQgPSBwcm9maWxlLmJlYXV0aWZ5T3V0cHV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQocHJvZmlsZS5wcmVzZXJ2ZU9yZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJlc2VydmVPcmRlciA9IHByb2ZpbGUucHJlc2VydmVPcmRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHByb2ZpbGUuYXBpa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBpa2V5ID0gcHJvZmlsZS5hcGlrZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChwcm9maWxlLmFwaWtleWZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcGlrZXlmaWxlID0gcHJvZmlsZS5hcGlrZXlmaWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuaW5nc0ZvdW5kLnB1c2goJ2RpZCBub3QgZmluZCBcInhsaWZmbWVyZ2VPcHRpb25zXCIgaW4gcHJvZmlsZSwgdXNpbmcgZGVmYXVsdHMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBhbGwgUGFyYW1ldGVycywgd2V0aGVyIHRoZXkgYXJlIGNvbXBsZXRlIGFuZCBjb25zaXN0ZW50LlxyXG4gICAgICogaWYgc29tZXRoaW5nIGlzIHdyb25nIHdpdGggdGhlIHBhcmFtZXRlcnMsIGl0IGlzIGNvbGxlY3RlZCBpbiBlcnJvcnNGb3VuZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja1BhcmFtZXRlcnMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGVja0xhbmd1YWdlU3ludGF4KHRoaXMuZGVmYXVsdExhbmd1YWdlKCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmxhbmd1YWdlcygpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2gobmV3IFhsaWZmTWVyZ2VFcnJvcignbm8gbGFuZ3VhZ2VzIHNwZWNpZmllZCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZXMoKS5mb3JFYWNoKChsYW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tMYW5ndWFnZVN5bnRheChsYW5nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc3RhdHM6IFN0YXRzO1xyXG4gICAgICAgIGxldCBlcnI6IGFueTtcclxuICAgICAgICAvLyBzcmNEaXIgc2hvdWxkIGV4aXN0c1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHN0YXRzID0gZnMuc3RhdFN5bmModGhpcy5zcmNEaXIoKSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBlcnIgPSBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISFlcnIgfHwgIXN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKG5ldyBYbGlmZk1lcmdlRXJyb3IoJ3NyY0RpciBcIicgKyB0aGlzLnNyY0RpcigpICsgJ1wiIGlzIG5vdCBhIGRpcmVjdG9yeScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ2VuRGlyIHNob3VsZCBleGlzdHNcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzdGF0cyA9IGZzLnN0YXRTeW5jKHRoaXMuZ2VuRGlyKCkpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgZXJyID0gZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEhZXJyIHx8ICFzdGF0cy5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzRm91bmQucHVzaChuZXcgWGxpZmZNZXJnZUVycm9yKCdnZW5EaXIgXCInICsgdGhpcy5nZW5EaXIoKSArICdcIiBpcyBub3QgYSBkaXJlY3RvcnknKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG1hc3RlciBmaWxlIE1VU1QgZXhpc3RcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmcy5hY2Nlc3NTeW5jKHRoaXMuaTE4bkZpbGUoKSwgZnMuY29uc3RhbnRzLlJfT0spO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2gobmV3IFhsaWZmTWVyZ2VFcnJvcignaTE4bkZpbGUgXCInICsgdGhpcy5pMThuRmlsZSgpICsgJ1wiIGlzIG5vdCByZWFkYWJsZScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaTE4bkZvcm1hdCBtdXN0IGJlIHhsZiB4bGYyIG9yIHhtYlxyXG4gICAgICAgIGlmICghKHRoaXMuaTE4bkZvcm1hdCgpID09PSAneGxmJyB8fCB0aGlzLmkxOG5Gb3JtYXQoKSA9PT0gJ3hsZjInIHx8IHRoaXMuaTE4bkZvcm1hdCgpID09PSAneG1iJykpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnNGb3VuZC5wdXNoKG5ldyBYbGlmZk1lcmdlRXJyb3IoJ2kxOG5Gb3JtYXQgXCInICsgdGhpcy5pMThuRm9ybWF0KCkgKyAnXCIgaW52YWxpZCwgbXVzdCBiZSBcInhsZlwiIG9yIFwieGxmMlwiIG9yIFwieG1iXCInKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGF1dG90cmFuc2xhdGUgcmVxdWlyZXMgYXBpIGtleVxyXG4gICAgICAgIGlmICh0aGlzLmF1dG90cmFuc2xhdGUoKSAmJiAhdGhpcy5hcGlrZXkoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2gobmV3IFhsaWZmTWVyZ2VFcnJvcignYXV0b3RyYW5zbGF0ZSByZXF1aXJlcyBhbiBBUEkga2V5LCBwbGVhc2Ugc2V0IG9uZScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYXV0b3RyYW5zbGF0ZWQgbGFuZ3VhZ2VzIG11c3QgYmUgaW4gbGlzdCBvZiBhbGwgbGFuZ3VhZ2VzXHJcbiAgICAgICAgdGhpcy5hdXRvdHJhbnNsYXRlZExhbmd1YWdlcygpLmZvckVhY2goKGxhbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGFuZ3VhZ2VzKCkuaW5kZXhPZihsYW5nKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JzRm91bmQucHVzaChuZXcgWGxpZmZNZXJnZUVycm9yKCdhdXRvdHJhbnNsYXRlIGxhbmd1YWdlIFwiJyArIGxhbmcgKyAnXCIgaXMgbm90IGluIGxpc3Qgb2YgbGFuZ3VhZ2VzJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChsYW5nID09PSB0aGlzLmRlZmF1bHRMYW5ndWFnZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFhsaWZmTWVyZ2VFcnJvcignYXV0b3RyYW5zbGF0ZSBsYW5ndWFnZSBcIicgKyBsYW5nICsgJ1wiIGNhbm5vdCBiZSB0cmFuc2xhdGVkLCBiZWNhdXNlIGl0IGlzIHRoZSBzb3VyY2UgbGFuZ3VhZ2UnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBuZ3ggdHJhbnNsYXRlIHBhdHRlcm4gY2hlY2tcclxuICAgICAgICBpZiAodGhpcy5zdXBwb3J0Tmd4VHJhbnNsYXRlKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2tSZXN1bHQgPSBOZ3hUcmFuc2xhdGVFeHRyYWN0b3IuY2hlY2tQYXR0ZXJuKHRoaXMubmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4oKSk7XHJcbiAgICAgICAgICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoY2hlY2tSZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yc0ZvdW5kLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFhsaWZmTWVyZ2VFcnJvcignbmd4VHJhbnNsYXRlRXh0cmFjdGlvblBhdHRlcm4gXCInICsgdGhpcy5uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybigpICsgJ1wiOiAnICsgY2hlY2tSZXN1bHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0YXJnZXRQcmFlZml4IGFuZCB0YXJnZXRTdWZmaXggY2hlY2tcclxuICAgICAgICBpZiAoIXRoaXMudXNlU291cmNlQXNUYXJnZXQoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXRQcmFlZml4KCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YXJuaW5nc0ZvdW5kLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgJ2NvbmZpZ3VyZWQgdGFyZ2V0UHJhZWZpeCBcIicgKyB0aGlzLnRhcmdldFByYWVmaXgoKSArICdcIiB3aWxsIG5vdCBiZSB1c2VkIGJlY2F1c2UgXCJ1c2VTb3VyY2VBc1RhcmdldFwiIGlzIGRpc2FibGVkXCInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy50YXJnZXRTdWZmaXgoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhcm5pbmdzRm91bmQucHVzaChcclxuICAgICAgICAgICAgICAgICAgICAnY29uZmlndXJlZCB0YXJnZXRTdWZmaXggXCInICsgdGhpcy50YXJnZXRTdWZmaXgoKSArICdcIiB3aWxsIG5vdCBiZSB1c2VkIGJlY2F1c2UgXCJ1c2VTb3VyY2VBc1RhcmdldFwiIGlzIGRpc2FibGVkXCInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBzeW50YXggb2YgbGFuZ3VhZ2UuXHJcbiAgICAgKiBNdXN0IGJlIGNvbXBhdGlibGUgd2l0aCBYTUwgU2NoZW1hIHR5cGUgeHNkOmxhbmd1YWdlLlxyXG4gICAgICogUGF0dGVybjogW2EtekEtWl17MSw4fSgoLXxfKVthLXpBLVowLTldezEsOH0pKlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgdG8gY2hlY2tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja0xhbmd1YWdlU3ludGF4KGxhbmc6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSAvXlthLXpBLVpdezEsOH0oWy1fXVthLXpBLVowLTldezEsOH0pKiQvO1xyXG4gICAgICAgIGlmICghcGF0dGVybi50ZXN0KGxhbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzRm91bmQucHVzaChuZXcgWGxpZmZNZXJnZUVycm9yKCdsYW5ndWFnZSBcIicgKyBsYW5nICsgJ1wiIGlzIG5vdCB2YWxpZCcpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFsbG93SWRDaGFuZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9hbGxvd0lkQ2hhbmdlKSkgPyBmYWxzZSA6IHRoaXMuX2FsbG93SWRDaGFuZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHZlcmJvc2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl92ZXJib3NlKSkgPyBmYWxzZSA6IHRoaXMuX3ZlcmJvc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHF1aWV0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fcXVpZXQpKSA/IGZhbHNlIDogdGhpcy5fcXVpZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWJ1ZyBvdXRwdXQgYWxsIHBhcmFtZXRlcnMgdG8gY29tbWFuZE91dHB1dC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dBbGxQYXJhbWV0ZXJzKGNvbW1hbmRPdXRwdXQ6IENvbW1hbmRPdXRwdXQpOiB2b2lkIHtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCd4bGlmZm1lcmdlIFVzZWQgUGFyYW1ldGVyczonKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCd1c2VkUHJvZmlsZVBhdGg6XFx0XCIlc1wiJywgdGhpcy51c2VkUHJvZmlsZVBhdGgpO1xyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ2RlZmF1bHRMYW5ndWFnZTpcXHRcIiVzXCInLCB0aGlzLmRlZmF1bHRMYW5ndWFnZSgpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdzcmNEaXI6XFx0XCIlc1wiJywgdGhpcy5zcmNEaXIoKSk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnZ2VuRGlyOlxcdFwiJXNcIicsIHRoaXMuZ2VuRGlyKCkpO1xyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ2kxOG5CYXNlRmlsZTpcXHRcIiVzXCInLCB0aGlzLmkxOG5CYXNlRmlsZSgpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdpMThuRmlsZTpcXHRcIiVzXCInLCB0aGlzLmkxOG5GaWxlKCkpO1xyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ2xhbmd1YWdlczpcXHQlcycsIHRoaXMubGFuZ3VhZ2VzKCkpO1xyXG4gICAgICAgIGZvciAoY29uc3QgbGFuZ3VhZ2Ugb2YgdGhpcy5sYW5ndWFnZXMoKSkge1xyXG4gICAgICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdvdXRwdXRGaWxlWyVzXTpcXHQlcycsIGxhbmd1YWdlLCB0aGlzLmdlbmVyYXRlZEkxOG5GaWxlKGxhbmd1YWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ3JlbW92ZVVudXNlZElkczpcXHQlcycsIHRoaXMucmVtb3ZlVW51c2VkSWRzKCkpO1xyXG4gICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ3N1cHBvcnROZ3hUcmFuc2xhdGU6XFx0JXMnLCB0aGlzLnN1cHBvcnROZ3hUcmFuc2xhdGUoKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VwcG9ydE5neFRyYW5zbGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ25neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuOlxcdCVzJywgdGhpcy5uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygndXNlU291cmNlQXNUYXJnZXQ6XFx0JXMnLCB0aGlzLnVzZVNvdXJjZUFzVGFyZ2V0KCkpO1xyXG4gICAgICAgIGlmICh0aGlzLnVzZVNvdXJjZUFzVGFyZ2V0KCkpIHtcclxuICAgICAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygndGFyZ2V0UHJhZWZpeDpcXHRcIiVzXCInLCB0aGlzLnRhcmdldFByYWVmaXgoKSk7XHJcbiAgICAgICAgICAgIGNvbW1hbmRPdXRwdXQuZGVidWcoJ3RhcmdldFN1ZmZpeDpcXHRcIiVzXCInLCB0aGlzLnRhcmdldFN1ZmZpeCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnYWxsb3dJZENoYW5nZTpcXHQlcycsIHRoaXMuYWxsb3dJZENoYW5nZSgpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdiZWF1dGlmeU91dHB1dDpcXHQlcycsIHRoaXMuYmVhdXRpZnlPdXRwdXQoKSk7XHJcbiAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygncHJlc2VydmVPcmRlcjpcXHQlcycsIHRoaXMucHJlc2VydmVPcmRlcigpKTtcclxuICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdhdXRvdHJhbnNsYXRlOlxcdCVzJywgdGhpcy5hdXRvdHJhbnNsYXRlKCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG90cmFuc2xhdGUoKSkge1xyXG4gICAgICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdhdXRvdHJhbnNsYXRlZCBsYW5ndWFnZXM6XFx0JXMnLCB0aGlzLmF1dG90cmFuc2xhdGVkTGFuZ3VhZ2VzKCkpO1xyXG4gICAgICAgICAgICBjb21tYW5kT3V0cHV0LmRlYnVnKCdhcGlrZXk6XFx0JXMnLCB0aGlzLmFwaWtleSgpID8gJyoqKionIDogJ05PVCBTRVQnKTtcclxuICAgICAgICAgICAgY29tbWFuZE91dHB1dC5kZWJ1ZygnYXBpa2V5ZmlsZTpcXHQlcycsIHRoaXMuYXBpa2V5ZmlsZSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZhdWx0LUxhbmd1YWdlLCBkZWZhdWx0IGVuLlxyXG4gICAgICogQHJldHVybiBkZWZhdWx0IGxhbmd1YWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWZhdWx0TGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdExhbmd1YWdlID8gdGhpcy5fZGVmYXVsdExhbmd1YWdlIDogJ2VuJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExpc3RlIGRlciB6dSBiZWFyYmVpdGVuZGVuIFNwcmFjaGVuLlxyXG4gICAgICogQHJldHVybiBsYW5ndWFnZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxhbmd1YWdlcygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlcyA/IHRoaXMuX2xhbmd1YWdlcyA6IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3JjIGRpcmVjdG9yeSwgd2hlcmUgdGhlIG1hc3RlciB4bGlmIGlzIGxvY2F0ZWQuXHJcbiAgICAgKiBAcmV0dXJuIHNyY0RpclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3JjRGlyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NyY0RpciA/IHRoaXMuX3NyY0RpciA6ICcuJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBiYXNlIGZpbGUgbmFtZSBvZiB0aGUgeGxpZiBmaWxlIGZvciBpbnB1dCBhbmQgb3V0cHV0LlxyXG4gICAgICogRGVmYXVsdCBpcyBtZXNzYWdlc1xyXG4gICAgICogQHJldHVybiBiYXNlIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGkxOG5CYXNlRmlsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pMThuQmFzZUZpbGUgPyB0aGlzLl9pMThuQmFzZUZpbGUgOiAnbWVzc2FnZXMnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1hc3RlciB4bGlmIGZpbGUgKHRoZSBvbmUgZ2VuZXJhdGVkIGJ5IG5nLXhpMThuKS5cclxuICAgICAqIERlZmF1bHQgaXMgPHNyY0Rpcj4vPGkxOG5CYXNlRmlsZT4ueGxmLlxyXG4gICAgICogQHJldHVybiBtYXN0ZXIgZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaTE4bkZpbGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gam9pbih0aGlzLnNyY0RpcigpLFxyXG4gICAgICAgICAgICAodGhpcy5faTE4bkZpbGUgPyB0aGlzLl9pMThuRmlsZSA6IHRoaXMuaTE4bkJhc2VGaWxlKCkgKyAnLicgKyB0aGlzLnN1ZmZpeEZvckdlbmVyYXRlZEkxOG5GaWxlKCkpXHJcbiAgICAgICAgKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYXQgb2YgdGhlIG1hc3RlciB4bGlmIGZpbGUuXHJcbiAgICAgKiBEZWZhdWx0IGlzIFwieGxmXCIsIHBvc3NpYmxlIGFyZSBcInhsZlwiIG9yIFwieGxmMlwiIG9yIFwieG1iXCIuXHJcbiAgICAgKiBAcmV0dXJuIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaTE4bkZvcm1hdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5faTE4bkZvcm1hdCA/IHRoaXMuX2kxOG5Gb3JtYXQgOiAneGxmJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwb3RlbnRpYWxseSB0byBiZSBnZW5lcmF0ZWQgSTE4bi1GaWxlIHdpdGggdGhlIHRyYW5zbGF0aW9ucyBmb3Igb25lIGxhbmd1YWdlLlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2Ugc2hvcnRjdXRcclxuICAgICAqIEByZXR1cm4gUGF0aCBvZiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZWRJMThuRmlsZShsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBqb2luKHRoaXMuZ2VuRGlyKCksIHRoaXMuaTE4bkJhc2VGaWxlKCkgKyAnLicgKyBsYW5nICsgJy4nICsgdGhpcy5zdWZmaXhGb3JHZW5lcmF0ZWRJMThuRmlsZSgpKS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdWZmaXhGb3JHZW5lcmF0ZWRJMThuRmlsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5pMThuRm9ybWF0KCkpIHtcclxuICAgICAgICAgICAgY2FzZSAneGxmJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAneGxmJztcclxuICAgICAgICAgICAgY2FzZSAneGxmMic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3hsZic7XHJcbiAgICAgICAgICAgIGNhc2UgJ3htYic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3h0Yic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcG90ZW50aWFsbHkgdG8gYmUgZ2VuZXJhdGVkIHRyYW5zbGF0ZS1GaWxlIGZvciBuZ3gtdHJhbnNsYXRlIHdpdGggdGhlIHRyYW5zbGF0aW9ucyBmb3Igb25lIGxhbmd1YWdlLlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2Ugc2hvcnRjdXRcclxuICAgICAqIEByZXR1cm4gUGF0aCBvZiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZW5lcmF0ZWROZ3hUcmFuc2xhdGVGaWxlKGxhbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGpvaW4odGhpcy5nZW5EaXIoKSwgdGhpcy5pMThuQmFzZUZpbGUoKSArICcuJyArIGxhbmcgKyAnLicgKyAnanNvbicpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBlbmNvZGluZyB1c2VkIHRvIHdyaXRlIG5ldyBYTElGRi1maWxlcy5cclxuICAgICAqIEByZXR1cm4gZW5jb2RpbmdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuY29kaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuY29kaW5nID8gdGhpcy5fZW5jb2RpbmcgOiAnVVRGLTgnO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAgKiBPdXRwdXQtRGlyZWN0b3J5LCB3aGVyZSB0aGUgb3V0cHV0IGlzIHdyaXR0ZW4gdG8uXHJcbiAgICAgICogRGVmYXVsdCBpcyA8c3JjRGlyPi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbkRpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZW5EaXIgPyB0aGlzLl9nZW5EaXIgOiB0aGlzLnNyY0RpcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVVbnVzZWRJZHMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9yZW1vdmVVbnVzZWRJZHMpKSA/IHRydWUgOiB0aGlzLl9yZW1vdmVVbnVzZWRJZHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN1cHBvcnROZ3hUcmFuc2xhdGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9zdXBwb3J0Tmd4VHJhbnNsYXRlKSkgPyBmYWxzZSA6IHRoaXMuX3N1cHBvcnROZ3hUcmFuc2xhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybikpID9cclxuICAgICAgICAgICAgTmd4VHJhbnNsYXRlRXh0cmFjdG9yLkRlZmF1bHRFeHRyYWN0aW9uUGF0dGVybiA6IHRoaXMuX25neFRyYW5zbGF0ZUV4dHJhY3Rpb25QYXR0ZXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBzb3VyY2UgbXVzdCBiZSB1c2VkIGFzIHRhcmdldCBmb3IgbmV3IHRyYW5zLXVuaXRzXHJcbiAgICAgKiBEZWZhdWx0IGlzIHRydWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHVzZVNvdXJjZUFzVGFyZ2V0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fdXNlU291cmNlQXNUYXJnZXQpKSA/IHRydWUgOiB0aGlzLl91c2VTb3VyY2VBc1RhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByYWVmaXggdXNlZCBmb3IgdGFyZ2V0IHdoZW4gY29weWluZyBuZXcgdHJhbnMtdW5pdHNcclxuICAgICAqIERlZmF1bHQgaXMgXCJcIlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdGFyZ2V0UHJhZWZpeCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fdGFyZ2V0UHJhZWZpeCkpID8gJycgOiB0aGlzLl90YXJnZXRQcmFlZml4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3VmZml4IHVzZWQgZm9yIHRhcmdldCB3aGVuIGNvcHlpbmcgbmV3IHRyYW5zLXVuaXRzXHJcbiAgICAgKiBEZWZhdWx0IGlzIFwiXCJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRhcmdldFN1ZmZpeCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fdGFyZ2V0U3VmZml4KSkgPyAnJyA6IHRoaXMuX3RhcmdldFN1ZmZpeDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHNldCwgcnVuIHhtbCByZXN1bHQgdGhyb3VnaCBiZWF1dGlmaWVyIChwcmV0dHktZGF0YSkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBiZWF1dGlmeU91dHB1dCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGlzTnVsbE9yVW5kZWZpbmVkKHRoaXMuX2JlYXV0aWZ5T3V0cHV0KSkgPyBmYWxzZSA6IHRoaXMuX2JlYXV0aWZ5T3V0cHV0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgc2V0LCBvcmRlciBvZiBuZXcgdHJhbnMgdW5pdHMgd2lsbCBiZSBhcyBpbiBtYXN0ZXIuXHJcbiAgICAgKiBPdGhlcndpc2UgdGhleSBhcmUgYWRkZWQgYXQgdGhlIGVuZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHByZXNlcnZlT3JkZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9wcmVzZXJ2ZU9yZGVyKSkgPyB0cnVlIDogdGhpcy5fcHJlc2VydmVPcmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGF1dG90cmFuc2xhdGUgZm9yIG5ldyB0cmFucy11bml0c1xyXG4gICAgICogRGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXV0b3RyYW5zbGF0ZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaXNOdWxsT3JVbmRlZmluZWQodGhpcy5fYXV0b3RyYW5zbGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNBcnJheSh0aGlzLl9hdXRvdHJhbnNsYXRlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKDxzdHJpbmdbXT50aGlzLl9hdXRvdHJhbnNsYXRlKS5sZW5ndGggPiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGJvb2xlYW4+IHRoaXMuX2F1dG90cmFuc2xhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBhdXRvdHJhbnNsYXRlIGZvciBhIGdpdmVuIGxhbmd1YWdlLlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgY29kZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF1dG90cmFuc2xhdGVMYW5ndWFnZShsYW5nOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hdXRvdHJhbnNsYXRlZExhbmd1YWdlcygpLmluZGV4T2YobGFuZykgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhIGxpc3Qgb2YgbGFuZ3VhZ2VzIHRvIGJlIGF1dG90cmFuc2xhdGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXV0b3RyYW5zbGF0ZWRMYW5ndWFnZXMoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGlmIChpc051bGxPclVuZGVmaW5lZCh0aGlzLl9hdXRvdHJhbnNsYXRlKSB8fCB0aGlzLl9hdXRvdHJhbnNsYXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0FycmF5KHRoaXMuX2F1dG90cmFuc2xhdGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoPHN0cmluZ1tdPnRoaXMuX2F1dG90cmFuc2xhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5sYW5ndWFnZXMoKS5zbGljZSgxKTsgLy8gZmlyc3QgaXMgc291cmNlIGxhbmd1YWdlXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBUEkga2V5IHRvIGJlIHVzZWQgZm9yIEdvb2dsZSBUcmFuc2xhdGVcclxuICAgICAqIEByZXR1cm4gYXBpIGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBpa2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZCh0aGlzLl9hcGlrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcGlrZXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgYXBpa2V5UGF0aCA9IHRoaXMuYXBpa2V5ZmlsZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcGlrZXlmaWxlKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGFwaWtleVBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZpbGVVdGlsLnJlYWQoYXBpa2V5UGF0aCwgJ3V0Zi04Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihmb3JtYXQoJ2FwaSBrZXkgZmlsZSBub3QgZm91bmQ6IEFQSV9LRVlfRklMRT0lcycsIGFwaWtleVBhdGgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmlsZSBuYW1lIGZvciBBUEkga2V5IHRvIGJlIHVzZWQgZm9yIEdvb2dsZSBUcmFuc2xhdGUuXHJcbiAgICAgKiBFeHBsaWNpdGx5IHNldCBvciByZWFkIGZyb20gZW52IHZhciBBUElfS0VZX0ZJTEUuXHJcbiAgICAgKiBAcmV0dXJuIGZpbGUgb2YgYXBpIGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBpa2V5ZmlsZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl9hcGlrZXlmaWxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcGlrZXlmaWxlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuQVBJX0tFWV9GSUxFKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmVudi5BUElfS0VZX0ZJTEU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==