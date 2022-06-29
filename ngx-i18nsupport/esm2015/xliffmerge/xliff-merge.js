/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommandOutput } from '../common/command-output';
import { XliffMergeParameters } from './xliff-merge-parameters';
import { XliffMergeError } from './xliff-merge-error';
import { FileUtil } from '../common/file-util';
import { VERSION } from './version';
import { format } from 'util';
import { isNullOrUndefined } from '../common/util';
import { FORMAT_XMB, FORMAT_XTB, NORMALIZATION_FORMAT_DEFAULT, STATE_FINAL, STATE_TRANSLATED } from '@ngx-i18nsupport/ngx-i18nsupport-lib';
import { NgxTranslateExtractor } from './ngx-translate-extractor';
import { TranslationMessagesFileReader } from './translation-messages-file-reader';
import { of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { XliffMergeAutoTranslateService } from '../autotranslate/xliff-merge-auto-translate-service';
import { AutoTranslateSummaryReport } from '../autotranslate/auto-translate-summary-report';
/**
 * Created by martin on 17.02.2017.
 * XliffMerge - read xliff or xmb file and put untranslated parts in language specific xliff or xmb files.
 *
 */
export class XliffMerge {
    /**
     * @param {?} argv
     * @return {?}
     */
    static main(argv) {
        /** @type {?} */
        const options = XliffMerge.parseArgs(argv);
        if (options) {
            new XliffMerge(new CommandOutput(process.stdout), options).run((/**
             * @param {?} result
             * @return {?}
             */
            (result) => {
                process.exit(result);
            }));
        }
    }
    /**
     * @param {?} argv
     * @return {?}
     */
    static parseArgs(argv) {
        /** @type {?} */
        const options = {
            languages: []
        };
        for (let i = 1; i < argv.length; i++) {
            /** @type {?} */
            const arg = argv[i];
            if (arg === '--version' || arg === '-version') {
                console.log('xliffmerge ' + VERSION);
            }
            else if (arg === '--verbose' || arg === '-v') {
                options.verbose = true;
            }
            else if (arg === '--profile' || arg === '-p') {
                i++;
                if (i >= argv.length) {
                    console.log('missing config file');
                    XliffMerge.showUsage();
                    return null;
                }
                else {
                    options.profilePath = argv[i];
                }
            }
            else if (arg === '--quiet' || arg === '-q') {
                options.quiet = true;
            }
            else if (arg === '--help' || arg === '-help' || arg === '-h') {
                XliffMerge.showUsage();
            }
            else if (arg.length > 0 && arg.charAt(0) === '-') {
                console.log('unknown option');
                return null;
            }
            else {
                options.languages.push(arg);
            }
        }
        return options;
    }
    /**
     * @return {?}
     */
    static showUsage() {
        console.log('usage: xliffmerge <option>* <language>*');
        console.log('Options');
        console.log('\t-p|--profile a json configuration file containing all relevant parameters.');
        console.log('\t\tfor details please consult the home page https://github.com/martinroob/ngx-i18nsupport');
        console.log('\t-v|--verbose show some output for debugging purposes');
        console.log('\t-q|--quiet only show errors, nothing else');
        console.log('\t-version|--version show version string');
        console.log('');
        console.log('\t<language> has to be a valid language short string, e,g. "en", "de", "de-ch"');
    }
    /**
     * For Tests, create instance with given profile
     * @param {?} commandOutput commandOutput
     * @param {?} options options
     * @param {?=} profileContent profileContent
     * @return {?}
     */
    static createFromOptions(commandOutput, options, profileContent) {
        /** @type {?} */
        const instance = new XliffMerge(commandOutput, options);
        instance.parameters = XliffMergeParameters.createFromOptions(options, profileContent);
        return instance;
    }
    /**
     * @param {?} commandOutput
     * @param {?} options
     */
    constructor(commandOutput, options) {
        this.commandOutput = commandOutput;
        this.options = options;
        this.parameters = null;
    }
    /**
     * Run the command.
     * This runs async.
     * @param {?=} callbackFunction when command is executed, called with the return code (0 for ok), if given.
     * @param {?=} errorFunction callbackFunction for error handling
     * @return {?}
     */
    run(callbackFunction, errorFunction) {
        this.runAsync()
            .subscribe((/**
         * @param {?} retcode
         * @return {?}
         */
        (retcode) => {
            if (!isNullOrUndefined(callbackFunction)) {
                callbackFunction(retcode);
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            if (!isNullOrUndefined(errorFunction)) {
                errorFunction(error);
            }
        }));
    }
    /**
     * Execute merge-Process.
     * @return {?} Async operation, on completion returns retcode 0=ok, other = error.
     */
    runAsync() {
        if (this.options && this.options.quiet) {
            this.commandOutput.setQuiet();
        }
        if (this.options && this.options.verbose) {
            this.commandOutput.setVerbose();
        }
        if (!this.parameters) {
            this.parameters = XliffMergeParameters.createFromOptions(this.options);
        }
        this.commandOutput.info('xliffmerge version %s', VERSION);
        if (this.parameters.verbose()) {
            this.parameters.showAllParameters(this.commandOutput);
        }
        if (this.parameters.errorsFound.length > 0) {
            for (const err of this.parameters.errorsFound) {
                this.commandOutput.error(err.message);
            }
            return of(-1);
        }
        if (this.parameters.warningsFound.length > 0) {
            for (const warn of this.parameters.warningsFound) {
                this.commandOutput.warn(warn);
            }
        }
        this.readMaster();
        if (this.parameters.autotranslate()) {
            this.autoTranslateService = new XliffMergeAutoTranslateService(this.parameters.apikey());
        }
        /** @type {?} */
        const executionForAllLanguages = [];
        this.parameters.languages().forEach((/**
         * @param {?} lang
         * @return {?}
         */
        (lang) => {
            executionForAllLanguages.push(this.processLanguage(lang));
        }));
        return forkJoin(executionForAllLanguages).pipe(map((/**
         * @param {?} retcodes
         * @return {?}
         */
        (retcodes) => this.totalRetcode(retcodes))));
    }
    /**
     * Give an array of retcodes for the different languages, return the total retcode.
     * If all are 0, it is 0, otherwise the first non zero.
     * @private
     * @param {?} retcodes retcodes
     * @return {?} number
     */
    totalRetcode(retcodes) {
        for (let i = 0; i < retcodes.length; i++) {
            if (retcodes[i] !== 0) {
                return retcodes[i];
            }
        }
        return 0;
    }
    /**
     * Return the name of the generated file for given lang.
     * @param {?} lang language
     * @return {?} name of generated file
     */
    generatedI18nFile(lang) {
        return this.parameters.generatedI18nFile(lang);
    }
    /**
     * Return the name of the generated ngx-translation file for given lang.
     * @param {?} lang language
     * @return {?} name of translate file
     */
    generatedNgxTranslateFile(lang) {
        return this.parameters.generatedNgxTranslateFile(lang);
    }
    /**
     * Warnings found during the run.
     * @return {?} warnings
     */
    warnings() {
        return this.parameters.warningsFound;
    }
    /**
     * @private
     * @return {?}
     */
    readMaster() {
        try {
            this.master = TranslationMessagesFileReader.fromFile(this.parameters.i18nFormat(), this.parameters.i18nFile(), this.parameters.encoding());
            this.master.warnings().forEach((/**
             * @param {?} warning
             * @return {?}
             */
            (warning) => {
                this.commandOutput.warn(warning);
            }));
            /** @type {?} */
            const count = this.master.numberOfTransUnits();
            /** @type {?} */
            const missingIdCount = this.master.numberOfTransUnitsWithMissingId();
            this.commandOutput.info('master contains %s trans-units', count);
            if (missingIdCount > 0) {
                this.commandOutput.warn('master contains %s trans-units, but there are %s without id', count, missingIdCount);
            }
            /** @type {?} */
            const sourceLang = this.master.sourceLanguage();
            if (sourceLang && sourceLang !== this.parameters.defaultLanguage()) {
                this.commandOutput.warn('master says to have source-language="%s", should be "%s" (your defaultLanguage)', sourceLang, this.parameters.defaultLanguage());
                this.master.setSourceLanguage(this.parameters.defaultLanguage());
                TranslationMessagesFileReader.save(this.master, this.parameters.beautifyOutput());
                this.commandOutput.warn('changed master source-language="%s" to "%s"', sourceLang, this.parameters.defaultLanguage());
            }
        }
        catch (err) {
            if (err instanceof XliffMergeError) {
                this.commandOutput.error(err.message);
                return of(-1);
            }
            else {
                // unhandled
                /** @type {?} */
                const currentFilename = this.parameters.i18nFile();
                /** @type {?} */
                const filenameString = (currentFilename) ? format('file "%s", ', currentFilename) : '';
                this.commandOutput.error(filenameString + 'oops ' + err);
                throw err;
            }
        }
    }
    /**
     * Process the given language.
     * Async operation.
     * @private
     * @param {?} lang language
     * @return {?} on completion 0 for ok, other for error
     */
    processLanguage(lang) {
        this.commandOutput.debug('processing language %s', lang);
        /** @type {?} */
        const languageXliffFile = this.parameters.generatedI18nFile(lang);
        /** @type {?} */
        const currentFilename = languageXliffFile;
        /** @type {?} */
        let result;
        if (!FileUtil.exists(languageXliffFile)) {
            result = this.createUntranslatedXliff(lang, languageXliffFile);
        }
        else {
            result = this.mergeMasterTo(lang, languageXliffFile);
        }
        return result
            .pipe(map((/**
         * @return {?}
         */
        () => {
            if (this.parameters.supportNgxTranslate()) {
                /** @type {?} */
                const languageSpecificMessagesFile = TranslationMessagesFileReader.fromFile(this.translationFormat(this.parameters.i18nFormat()), languageXliffFile, this.parameters.encoding(), this.master.filename());
                NgxTranslateExtractor.extract(languageSpecificMessagesFile, this.parameters.ngxTranslateExtractionPattern(), this.parameters.generatedNgxTranslateFile(lang));
            }
            return 0;
        })), catchError((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            if (err instanceof XliffMergeError) {
                this.commandOutput.error(err.message);
                return of(-1);
            }
            else {
                // unhandled
                /** @type {?} */
                const filenameString = (currentFilename) ? format('file "%s", ', currentFilename) : '';
                this.commandOutput.error(filenameString + 'oops ' + err);
                throw err;
            }
        })));
    }
    /**
     * create a new file for the language, which contains no translations, but all keys.
     * in principle, this is just a copy of the master with target-language set.
     * @private
     * @param {?} lang language
     * @param {?} languageXliffFilePath name of file
     * @return {?}
     */
    createUntranslatedXliff(lang, languageXliffFilePath) {
        // copy master ...
        // and set target-language
        // and copy source to target if necessary
        /** @type {?} */
        const isDefaultLang = (lang === this.parameters.defaultLanguage());
        this.master.setNewTransUnitTargetPraefix(this.parameters.targetPraefix());
        this.master.setNewTransUnitTargetSuffix(this.parameters.targetSuffix());
        /** @type {?} */
        const languageSpecificMessagesFile = this.master.createTranslationFileForLang(lang, languageXliffFilePath, isDefaultLang, this.parameters.useSourceAsTarget());
        return this.autoTranslate(this.master.sourceLanguage(), lang, languageSpecificMessagesFile).pipe(map((/**
         * @return {?}
         */
        ( /* summary */) => {
            // write it to file
            TranslationMessagesFileReader.save(languageSpecificMessagesFile, this.parameters.beautifyOutput());
            this.commandOutput.info('created new file "%s" for target-language="%s"', languageXliffFilePath, lang);
            if (!isDefaultLang) {
                this.commandOutput.warn('please translate file "%s" to target-language="%s"', languageXliffFilePath, lang);
            }
            return null;
        })));
    }
    /**
     * Map the input format to the format of the translation.
     * Normally they are the same but for xmb the translation format is xtb.
     * @private
     * @param {?} i18nFormat format
     * @return {?}
     */
    translationFormat(i18nFormat) {
        if (i18nFormat === FORMAT_XMB) {
            return FORMAT_XTB;
        }
        else {
            return i18nFormat;
        }
    }
    /**
     * Merge all
     * @private
     * @param {?} lang language
     * @param {?} languageXliffFilePath filename
     * @return {?}
     */
    mergeMasterTo(lang, languageXliffFilePath) {
        // read lang specific file
        /** @type {?} */
        const languageSpecificMessagesFile = TranslationMessagesFileReader.fromFile(this.translationFormat(this.parameters.i18nFormat()), languageXliffFilePath, this.parameters.encoding());
        /** @type {?} */
        const isDefaultLang = (lang === this.parameters.defaultLanguage());
        /** @type {?} */
        let newCount = 0;
        /** @type {?} */
        let correctSourceContentCount = 0;
        /** @type {?} */
        let correctSourceRefCount = 0;
        /** @type {?} */
        let correctDescriptionOrMeaningCount = 0;
        /** @type {?} */
        let idChangedCount = 0;
        languageSpecificMessagesFile.setNewTransUnitTargetPraefix(this.parameters.targetPraefix());
        languageSpecificMessagesFile.setNewTransUnitTargetSuffix(this.parameters.targetSuffix());
        /** @type {?} */
        let lastProcessedUnit = null;
        this.master.forEachTransUnit((/**
         * @param {?} masterTransUnit
         * @return {?}
         */
        (masterTransUnit) => {
            /** @type {?} */
            const transUnit = languageSpecificMessagesFile.transUnitWithId(masterTransUnit.id);
            if (!transUnit) {
                // oops, no translation, must be a new key, so add it
                /** @type {?} */
                let newUnit;
                if (this.parameters.allowIdChange()
                    && (newUnit = this.processChangedIdUnit(masterTransUnit, languageSpecificMessagesFile, lastProcessedUnit))) {
                    lastProcessedUnit = newUnit;
                    idChangedCount++;
                }
                else {
                    lastProcessedUnit = languageSpecificMessagesFile.importNewTransUnit(masterTransUnit, isDefaultLang, this.parameters.useSourceAsTarget(), (this.parameters.preserveOrder()) ? lastProcessedUnit : undefined);
                    newCount++;
                }
            }
            else {
                // check for changed source content and change it if needed
                // (can only happen if ID is explicitely set, otherwise ID would change if source content is changed.
                if (transUnit.supportsSetSourceContent() && !this.areSourcesNearlyEqual(masterTransUnit, transUnit)) {
                    transUnit.setSourceContent(masterTransUnit.sourceContent());
                    if (isDefaultLang) {
                        // #81 changed source must be copied to target for default lang
                        transUnit.translate(masterTransUnit.sourceContent());
                        transUnit.setTargetState(STATE_FINAL);
                    }
                    else {
                        if (transUnit.targetState() === STATE_FINAL) {
                            // source is changed, so translation has to be checked again
                            transUnit.setTargetState(STATE_TRANSLATED);
                        }
                    }
                    correctSourceContentCount++;
                }
                // check for missing or changed source ref and add it if needed
                if (transUnit.supportsSetSourceReferences()
                    && !this.areSourceReferencesEqual(masterTransUnit.sourceReferences(), transUnit.sourceReferences())) {
                    transUnit.setSourceReferences(masterTransUnit.sourceReferences());
                    correctSourceRefCount++;
                }
                // check for changed description or meaning
                if (transUnit.supportsSetDescriptionAndMeaning()) {
                    /** @type {?} */
                    let changed = false;
                    if (transUnit.description() !== masterTransUnit.description()) {
                        transUnit.setDescription(masterTransUnit.description());
                        changed = true;
                    }
                    if (transUnit.meaning() !== masterTransUnit.meaning()) {
                        transUnit.setMeaning(masterTransUnit.meaning());
                        changed = true;
                    }
                    if (changed) {
                        correctDescriptionOrMeaningCount++;
                    }
                }
                lastProcessedUnit = transUnit;
            }
        }));
        if (newCount > 0) {
            this.commandOutput.warn('merged %s trans-units from master to "%s"', newCount, lang);
        }
        if (correctSourceContentCount > 0) {
            this.commandOutput.warn('transferred %s changed source content from master to "%s"', correctSourceContentCount, lang);
        }
        if (correctSourceRefCount > 0) {
            this.commandOutput.warn('transferred %s source references from master to "%s"', correctSourceRefCount, lang);
        }
        if (idChangedCount > 0) {
            this.commandOutput.warn('found %s changed id\'s in "%s"', idChangedCount, lang);
        }
        if (correctDescriptionOrMeaningCount > 0) {
            this.commandOutput.warn('transferred %s changed descriptions/meanings from master to "%s"', correctDescriptionOrMeaningCount, lang);
        }
        // remove all elements that are no longer used
        /** @type {?} */
        let removeCount = 0;
        languageSpecificMessagesFile.forEachTransUnit((/**
         * @param {?} transUnit
         * @return {?}
         */
        (transUnit) => {
            /** @type {?} */
            const existsInMaster = !isNullOrUndefined(this.master.transUnitWithId(transUnit.id));
            if (!existsInMaster) {
                if (this.parameters.removeUnusedIds()) {
                    languageSpecificMessagesFile.removeTransUnitWithId(transUnit.id);
                }
                removeCount++;
            }
        }));
        if (removeCount > 0) {
            if (this.parameters.removeUnusedIds()) {
                this.commandOutput.warn('removed %s unused trans-units in "%s"', removeCount, lang);
            }
            else {
                this.commandOutput.warn('keeping %s unused trans-units in "%s", because removeUnused is disabled', removeCount, lang);
            }
        }
        if (newCount === 0 && removeCount === 0 && correctSourceContentCount === 0
            && correctSourceRefCount === 0 && correctDescriptionOrMeaningCount === 0) {
            this.commandOutput.info('file for "%s" was up to date', lang);
            return of(null);
        }
        else {
            return this.autoTranslate(this.master.sourceLanguage(), lang, languageSpecificMessagesFile)
                .pipe(map((/**
             * @return {?}
             */
            () => {
                // write it to file
                TranslationMessagesFileReader.save(languageSpecificMessagesFile, this.parameters.beautifyOutput());
                this.commandOutput.info('updated file "%s" for target-language="%s"', languageXliffFilePath, lang);
                if (newCount > 0 && !isDefaultLang) {
                    this.commandOutput.warn('please translate file "%s" to target-language="%s"', languageXliffFilePath, lang);
                }
                return null;
            })));
        }
    }
    /**
     * Handle the case of changed id due to small white space changes.
     * @private
     * @param {?} masterTransUnit unit in master file
     * @param {?} languageSpecificMessagesFile translation file
     * @param {?} lastProcessedUnit Unit before the one processed here. New unit will be inserted after this one.
     * @return {?} processed unit, if done, null if no changed unit found
     */
    processChangedIdUnit(masterTransUnit, languageSpecificMessagesFile, lastProcessedUnit) {
        /** @type {?} */
        let changedTransUnit = null;
        languageSpecificMessagesFile.forEachTransUnit((/**
         * @param {?} languageTransUnit
         * @return {?}
         */
        (languageTransUnit) => {
            if (this.areSourcesNearlyEqual(languageTransUnit, masterTransUnit)) {
                changedTransUnit = languageTransUnit;
            }
        }));
        if (!changedTransUnit) {
            return null;
        }
        /** @type {?} */
        const mergedTransUnit = languageSpecificMessagesFile.importNewTransUnit(masterTransUnit, false, false, (this.parameters.preserveOrder()) ? lastProcessedUnit : undefined);
        /** @type {?} */
        const translatedContent = changedTransUnit.targetContent();
        if (translatedContent) { // issue #68 set translated only, if it is really translated
            mergedTransUnit.translate(translatedContent);
            mergedTransUnit.setTargetState(STATE_TRANSLATED);
        }
        return mergedTransUnit;
    }
    /**
     * test wether the sources of 2 trans units are equal ignoring white spaces.
     * @private
     * @param {?} tu1 tu1
     * @param {?} tu2 tu2
     * @return {?}
     */
    areSourcesNearlyEqual(tu1, tu2) {
        if ((tu1 && !tu2) || (tu2 && !tu1)) {
            return false;
        }
        /** @type {?} */
        const tu1Normalized = tu1.sourceContentNormalized();
        /** @type {?} */
        const tu2Normalized = tu2.sourceContentNormalized();
        if (tu1Normalized.isICUMessage()) {
            if (tu2Normalized.isICUMessage()) {
                /** @type {?} */
                const icu1Normalized = tu1Normalized.getICUMessage().asNativeString().trim();
                /** @type {?} */
                const icu2Normalized = tu2Normalized.getICUMessage().asNativeString().trim();
                return icu1Normalized === icu2Normalized;
            }
            else {
                return false;
            }
        }
        if (tu1Normalized.containsICUMessageRef()) {
            /** @type {?} */
            const icuref1Normalized = tu1Normalized.asNativeString().trim();
            /** @type {?} */
            const icuref2Normalized = tu2Normalized.asNativeString().trim();
            return icuref1Normalized === icuref2Normalized;
        }
        /** @type {?} */
        const s1Normalized = tu1Normalized.asDisplayString(NORMALIZATION_FORMAT_DEFAULT).trim();
        /** @type {?} */
        const s2Normalized = tu2Normalized.asDisplayString(NORMALIZATION_FORMAT_DEFAULT).trim();
        return s1Normalized === s2Normalized;
    }
    /**
     * @private
     * @param {?} ref1
     * @param {?} ref2
     * @return {?}
     */
    areSourceReferencesEqual(ref1, ref2) {
        if ((isNullOrUndefined(ref1) && !isNullOrUndefined(ref2)) || (isNullOrUndefined(ref2) && !isNullOrUndefined(ref1))) {
            return false;
        }
        if (isNullOrUndefined(ref1) && isNullOrUndefined(ref2)) {
            return true;
        }
        // bot refs are set now, convert to set to compare them
        /** @type {?} */
        const set1 = new Set();
        ref1.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        (ref) => { set1.add(ref.sourcefile + ':' + ref.linenumber); }));
        /** @type {?} */
        const set2 = new Set();
        ref2.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        (ref) => { set2.add(ref.sourcefile + ':' + ref.linenumber); }));
        if (set1.size !== set2.size) {
            return false;
        }
        /** @type {?} */
        let match = true;
        set2.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        (ref) => {
            if (!set1.has(ref)) {
                match = false;
            }
        }));
        return match;
    }
    /**
     * Auto translate file via Google Translate.
     * Will translate all new units in file.
     * @private
     * @param {?} from from
     * @param {?} to to
     * @param {?} languageSpecificMessagesFile languageSpecificMessagesFile
     * @return {?} a promise with the execution result as a summary report.
     */
    autoTranslate(from, to, languageSpecificMessagesFile) {
        /** @type {?} */
        let serviceCall;
        /** @type {?} */
        const autotranslateEnabled = this.parameters.autotranslateLanguage(to);
        if (autotranslateEnabled) {
            serviceCall = this.autoTranslateService.autoTranslate(from, to, languageSpecificMessagesFile);
        }
        else {
            serviceCall = of(new AutoTranslateSummaryReport(from, to));
        }
        return serviceCall.pipe(map((/**
         * @param {?} summary
         * @return {?}
         */
        (summary) => {
            if (autotranslateEnabled) {
                if (summary.error() || summary.failed() > 0) {
                    this.commandOutput.error(summary.content());
                }
                else {
                    this.commandOutput.warn(summary.content());
                }
            }
            return summary;
        })));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    XliffMerge.prototype.commandOutput;
    /**
     * @type {?}
     * @private
     */
    XliffMerge.prototype.options;
    /**
     * @type {?}
     * @private
     */
    XliffMerge.prototype.parameters;
    /**
     * The read master xlf file.
     * @type {?}
     * @private
     */
    XliffMerge.prototype.master;
    /**
     * @type {?}
     * @private
     */
    XliffMerge.prototype.autoTranslateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxpZmYtbWVyZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LWkxOG5zdXBwb3J0L25neC1pMThuc3VwcG9ydC8iLCJzb3VyY2VzIjpbInhsaWZmbWVyZ2UveGxpZmYtbWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM1QixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsVUFBVSxFQUFFLFVBQVUsRUFDdEIsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFFN0csT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLDZCQUE2QixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUNuRyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7O0FBUTFGLE1BQU0sT0FBTyxVQUFVOzs7OztJQWVuQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQWM7O2NBQ2hCLE9B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TyxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTTtvQkFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtZQUNELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDUixDQUFDO0NBRUo7Ozs7OztJQXRqQkcsbUNBQThDOzs7OztJQUU5Qyw2QkFBeUM7Ozs7O0lBRXpDLGdDQUF5Qzs7Ozs7O0lBS3pDLDRCQUF5Qzs7Ozs7SUFFekMsMENBQTZEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tYW5kT3V0cHV0fSBmcm9tICcuLi9jb21tb24vY29tbWFuZC1vdXRwdXQnO1xyXG5pbXBvcnQge1hsaWZmTWVyZ2VQYXJhbWV0ZXJzfSBmcm9tICcuL3hsaWZmLW1lcmdlLXBhcmFtZXRlcnMnO1xyXG5pbXBvcnQge1hsaWZmTWVyZ2VFcnJvcn0gZnJvbSAnLi94bGlmZi1tZXJnZS1lcnJvcic7XHJcbmltcG9ydCB7RmlsZVV0aWx9IGZyb20gJy4uL2NvbW1vbi9maWxlLXV0aWwnO1xyXG5pbXBvcnQge1ZFUlNJT059IGZyb20gJy4vdmVyc2lvbic7XHJcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICd1dGlsJztcclxuaW1wb3J0IHtpc051bGxPclVuZGVmaW5lZH0gZnJvbSAnLi4vY29tbW9uL3V0aWwnO1xyXG5pbXBvcnQge0lUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZSwgSVRyYW5zVW5pdCxcclxuICAgIEZPUk1BVF9YTUIsIEZPUk1BVF9YVEIsXHJcbiAgICBOT1JNQUxJWkFUSU9OX0ZPUk1BVF9ERUZBVUxULCBTVEFURV9GSU5BTCwgU1RBVEVfVFJBTlNMQVRFRH0gZnJvbSAnQG5neC1pMThuc3VwcG9ydC9uZ3gtaTE4bnN1cHBvcnQtbGliJztcclxuaW1wb3J0IHtQcm9ncmFtT3B0aW9ucywgSUNvbmZpZ0ZpbGV9IGZyb20gJy4vaS14bGlmZi1tZXJnZS1vcHRpb25zJztcclxuaW1wb3J0IHtOZ3hUcmFuc2xhdGVFeHRyYWN0b3J9IGZyb20gJy4vbmd4LXRyYW5zbGF0ZS1leHRyYWN0b3InO1xyXG5pbXBvcnQge1RyYW5zbGF0aW9uTWVzc2FnZXNGaWxlUmVhZGVyfSBmcm9tICcuL3RyYW5zbGF0aW9uLW1lc3NhZ2VzLWZpbGUtcmVhZGVyJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZiwgZm9ya0pvaW59IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge21hcCwgY2F0Y2hFcnJvcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1hsaWZmTWVyZ2VBdXRvVHJhbnNsYXRlU2VydmljZX0gZnJvbSAnLi4vYXV0b3RyYW5zbGF0ZS94bGlmZi1tZXJnZS1hdXRvLXRyYW5zbGF0ZS1zZXJ2aWNlJztcclxuaW1wb3J0IHtBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydH0gZnJvbSAnLi4vYXV0b3RyYW5zbGF0ZS9hdXRvLXRyYW5zbGF0ZS1zdW1tYXJ5LXJlcG9ydCc7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBtYXJ0aW4gb24gMTcuMDIuMjAxNy5cclxuICogWGxpZmZNZXJnZSAtIHJlYWQgeGxpZmYgb3IgeG1iIGZpbGUgYW5kIHB1dCB1bnRyYW5zbGF0ZWQgcGFydHMgaW4gbGFuZ3VhZ2Ugc3BlY2lmaWMgeGxpZmYgb3IgeG1iIGZpbGVzLlxyXG4gKlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBYbGlmZk1lcmdlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbW1hbmRPdXRwdXQ6IENvbW1hbmRPdXRwdXQ7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zOiBQcm9ncmFtT3B0aW9ucztcclxuXHJcbiAgICBwcml2YXRlIHBhcmFtZXRlcnM6IFhsaWZmTWVyZ2VQYXJhbWV0ZXJzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJlYWQgbWFzdGVyIHhsZiBmaWxlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1hc3RlcjogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlOyAvLyBYbGlmZkZpbGUgb3IgWGxpZmYyRmlsZSBvciBYbWJGaWxlXHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvVHJhbnNsYXRlU2VydmljZTogWGxpZmZNZXJnZUF1dG9UcmFuc2xhdGVTZXJ2aWNlO1xyXG5cclxuICAgIHN0YXRpYyBtYWluKGFyZ3Y6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFhsaWZmTWVyZ2UucGFyc2VBcmdzKGFyZ3YpO1xyXG4gICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG5ldyBYbGlmZk1lcmdlKG5ldyBDb21tYW5kT3V0cHV0KHByb2Nlc3Muc3Rkb3V0KSwgb3B0aW9ucykucnVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBhcnNlQXJncyhhcmd2OiBzdHJpbmdbXSk6IFByb2dyYW1PcHRpb25zIHtcclxuICAgICAgICBjb25zdCBvcHRpb25zOiBQcm9ncmFtT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2VzOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZyA9IGFyZ3ZbaV07XHJcbiAgICAgICAgICAgIGlmIChhcmcgPT09ICctLXZlcnNpb24nIHx8IGFyZyA9PT0gJy12ZXJzaW9uJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3hsaWZmbWVyZ2UgJyArIFZFUlNJT04pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gJy0tdmVyYm9zZScgfHwgYXJnID09PSAnLXYnKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnZlcmJvc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZyA9PT0gJy0tcHJvZmlsZScgfHwgYXJnID09PSAnLXAnKSB7XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSBhcmd2Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaXNzaW5nIGNvbmZpZyBmaWxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgWGxpZmZNZXJnZS5zaG93VXNhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcm9maWxlUGF0aCA9IGFyZ3ZbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnID09PSAnLS1xdWlldCcgfHwgYXJnID09PSAnLXEnKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnF1aWV0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmcgPT09ICctLWhlbHAnIHx8IGFyZyA9PT0gJy1oZWxwJyB8fCBhcmcgPT09ICctaCcpIHtcclxuICAgICAgICAgICAgICAgIFhsaWZmTWVyZ2Uuc2hvd1VzYWdlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnLmxlbmd0aCA+IDAgJiYgYXJnLmNoYXJBdCgwKSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndW5rbm93biBvcHRpb24nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sYW5ndWFnZXMucHVzaChhcmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBzaG93VXNhZ2UoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3VzYWdlOiB4bGlmZm1lcmdlIDxvcHRpb24+KiA8bGFuZ3VhZ2U+KicpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdPcHRpb25zJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1xcdC1wfC0tcHJvZmlsZSBhIGpzb24gY29uZmlndXJhdGlvbiBmaWxlIGNvbnRhaW5pbmcgYWxsIHJlbGV2YW50IHBhcmFtZXRlcnMuJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1xcdFxcdGZvciBkZXRhaWxzIHBsZWFzZSBjb25zdWx0IHRoZSBob21lIHBhZ2UgaHR0cHM6Ly9naXRodWIuY29tL21hcnRpbnJvb2Ivbmd4LWkxOG5zdXBwb3J0Jyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1xcdC12fC0tdmVyYm9zZSBzaG93IHNvbWUgb3V0cHV0IGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnXFx0LXF8LS1xdWlldCBvbmx5IHNob3cgZXJyb3JzLCBub3RoaW5nIGVsc2UnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnXFx0LXZlcnNpb258LS12ZXJzaW9uIHNob3cgdmVyc2lvbiBzdHJpbmcnKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1xcdDxsYW5ndWFnZT4gaGFzIHRvIGJlIGEgdmFsaWQgbGFuZ3VhZ2Ugc2hvcnQgc3RyaW5nLCBlLGcuIFwiZW5cIiwgXCJkZVwiLCBcImRlLWNoXCInKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvciBUZXN0cywgY3JlYXRlIGluc3RhbmNlIHdpdGggZ2l2ZW4gcHJvZmlsZVxyXG4gICAgICogQHBhcmFtIGNvbW1hbmRPdXRwdXQgY29tbWFuZE91dHB1dFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9uc1xyXG4gICAgICogQHBhcmFtIHByb2ZpbGVDb250ZW50IHByb2ZpbGVDb250ZW50XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRnJvbU9wdGlvbnMoY29tbWFuZE91dHB1dDogQ29tbWFuZE91dHB1dCwgb3B0aW9uczogUHJvZ3JhbU9wdGlvbnMsIHByb2ZpbGVDb250ZW50PzogSUNvbmZpZ0ZpbGUpIHtcclxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBYbGlmZk1lcmdlKGNvbW1hbmRPdXRwdXQsIG9wdGlvbnMpO1xyXG4gICAgICAgIGluc3RhbmNlLnBhcmFtZXRlcnMgPSBYbGlmZk1lcmdlUGFyYW1ldGVycy5jcmVhdGVGcm9tT3B0aW9ucyhvcHRpb25zLCBwcm9maWxlQ29udGVudCk7XHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbW1hbmRPdXRwdXQ6IENvbW1hbmRPdXRwdXQsIG9wdGlvbnM6IFByb2dyYW1PcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0ID0gY29tbWFuZE91dHB1dDtcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSdW4gdGhlIGNvbW1hbmQuXHJcbiAgICAgKiBUaGlzIHJ1bnMgYXN5bmMuXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tGdW5jdGlvbiB3aGVuIGNvbW1hbmQgaXMgZXhlY3V0ZWQsIGNhbGxlZCB3aXRoIHRoZSByZXR1cm4gY29kZSAoMCBmb3Igb2spLCBpZiBnaXZlbi5cclxuICAgICAqIEBwYXJhbSBlcnJvckZ1bmN0aW9uIGNhbGxiYWNrRnVuY3Rpb24gZm9yIGVycm9yIGhhbmRsaW5nXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBydW4oY2FsbGJhY2tGdW5jdGlvbj86ICgocmV0Y29kZTogbnVtYmVyKSA9PiBhbnkpLCBlcnJvckZ1bmN0aW9uPzogKChlcnJvcjogYW55KSA9PiBhbnkpKSB7XHJcbiAgICAgICAgdGhpcy5ydW5Bc3luYygpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJldGNvZGU6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChjYWxsYmFja0Z1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuY3Rpb24ocmV0Y29kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmaW5lZChlcnJvckZ1bmN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yRnVuY3Rpb24oZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4ZWN1dGUgbWVyZ2UtUHJvY2Vzcy5cclxuICAgICAqIEByZXR1cm4gQXN5bmMgb3BlcmF0aW9uLCBvbiBjb21wbGV0aW9uIHJldHVybnMgcmV0Y29kZSAwPW9rLCBvdGhlciA9IGVycm9yLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcnVuQXN5bmMoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5xdWlldCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQuc2V0UXVpZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudmVyYm9zZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQuc2V0VmVyYm9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMucGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSBYbGlmZk1lcmdlUGFyYW1ldGVycy5jcmVhdGVGcm9tT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQuaW5mbygneGxpZmZtZXJnZSB2ZXJzaW9uICVzJywgVkVSU0lPTik7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy52ZXJib3NlKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGxQYXJhbWV0ZXJzKHRoaXMuY29tbWFuZE91dHB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuZXJyb3JzRm91bmQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGVyciBvZiB0aGlzLnBhcmFtZXRlcnMuZXJyb3JzRm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5lcnJvcihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG9mKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy53YXJuaW5nc0ZvdW5kLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB3YXJuIG9mIHRoaXMucGFyYW1ldGVycy53YXJuaW5nc0ZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQud2Fybih3YXJuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlYWRNYXN0ZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmF1dG90cmFuc2xhdGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9UcmFuc2xhdGVTZXJ2aWNlID0gbmV3IFhsaWZmTWVyZ2VBdXRvVHJhbnNsYXRlU2VydmljZSh0aGlzLnBhcmFtZXRlcnMuYXBpa2V5KCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBleGVjdXRpb25Gb3JBbGxMYW5ndWFnZXM6IE9ic2VydmFibGU8bnVtYmVyPltdID0gW107XHJcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmxhbmd1YWdlcygpLmZvckVhY2goKGxhbmc6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBleGVjdXRpb25Gb3JBbGxMYW5ndWFnZXMucHVzaCh0aGlzLnByb2Nlc3NMYW5ndWFnZShsYW5nKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcmtKb2luKGV4ZWN1dGlvbkZvckFsbExhbmd1YWdlcykucGlwZShcclxuICAgICAgICAgICAgbWFwKChyZXRjb2RlczogbnVtYmVyW10pID0+IHRoaXMudG90YWxSZXRjb2RlKHJldGNvZGVzKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2l2ZSBhbiBhcnJheSBvZiByZXRjb2RlcyBmb3IgdGhlIGRpZmZlcmVudCBsYW5ndWFnZXMsIHJldHVybiB0aGUgdG90YWwgcmV0Y29kZS5cclxuICAgICAqIElmIGFsbCBhcmUgMCwgaXQgaXMgMCwgb3RoZXJ3aXNlIHRoZSBmaXJzdCBub24gemVyby5cclxuICAgICAqIEBwYXJhbSByZXRjb2RlcyByZXRjb2Rlc1xyXG4gICAgICogQHJldHVybiBudW1iZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB0b3RhbFJldGNvZGUocmV0Y29kZXM6IG51bWJlcltdKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJldGNvZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXRjb2Rlc1tpXSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldGNvZGVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHRoZSBuYW1lIG9mIHRoZSBnZW5lcmF0ZWQgZmlsZSBmb3IgZ2l2ZW4gbGFuZy5cclxuICAgICAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlXHJcbiAgICAgKiBAcmV0dXJuIG5hbWUgb2YgZ2VuZXJhdGVkIGZpbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdlbmVyYXRlZEkxOG5GaWxlKGxhbmc6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1ldGVycy5nZW5lcmF0ZWRJMThuRmlsZShsYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgZ2VuZXJhdGVkIG5neC10cmFuc2xhdGlvbiBmaWxlIGZvciBnaXZlbiBsYW5nLlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2VcclxuICAgICAqIEByZXR1cm4gbmFtZSBvZiB0cmFuc2xhdGUgZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2VuZXJhdGVkTmd4VHJhbnNsYXRlRmlsZShsYW5nOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtZXRlcnMuZ2VuZXJhdGVkTmd4VHJhbnNsYXRlRmlsZShsYW5nKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdhcm5pbmdzIGZvdW5kIGR1cmluZyB0aGUgcnVuLlxyXG4gICAgICogQHJldHVybiB3YXJuaW5nc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd2FybmluZ3MoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtZXRlcnMud2FybmluZ3NGb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRNYXN0ZXIoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5tYXN0ZXIgPSBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZVJlYWRlci5mcm9tRmlsZShcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5pMThuRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuaTE4bkZpbGUoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5lbmNvZGluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5tYXN0ZXIud2FybmluZ3MoKS5mb3JFYWNoKCh3YXJuaW5nOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKHdhcm5pbmcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgY291bnQgPSB0aGlzLm1hc3Rlci5udW1iZXJPZlRyYW5zVW5pdHMoKTtcclxuICAgICAgICAgICAgY29uc3QgbWlzc2luZ0lkQ291bnQgPSB0aGlzLm1hc3Rlci5udW1iZXJPZlRyYW5zVW5pdHNXaXRoTWlzc2luZ0lkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5pbmZvKCdtYXN0ZXIgY29udGFpbnMgJXMgdHJhbnMtdW5pdHMnLCBjb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChtaXNzaW5nSWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKCdtYXN0ZXIgY29udGFpbnMgJXMgdHJhbnMtdW5pdHMsIGJ1dCB0aGVyZSBhcmUgJXMgd2l0aG91dCBpZCcsIGNvdW50LCBtaXNzaW5nSWRDb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc291cmNlTGFuZzogc3RyaW5nID0gdGhpcy5tYXN0ZXIuc291cmNlTGFuZ3VhZ2UoKTtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZUxhbmcgJiYgc291cmNlTGFuZyAhPT0gdGhpcy5wYXJhbWV0ZXJzLmRlZmF1bHRMYW5ndWFnZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQud2FybihcclxuICAgICAgICAgICAgICAgICAgICAnbWFzdGVyIHNheXMgdG8gaGF2ZSBzb3VyY2UtbGFuZ3VhZ2U9XCIlc1wiLCBzaG91bGQgYmUgXCIlc1wiICh5b3VyIGRlZmF1bHRMYW5ndWFnZSknLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUxhbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmRlZmF1bHRMYW5ndWFnZSgpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFzdGVyLnNldFNvdXJjZUxhbmd1YWdlKHRoaXMucGFyYW1ldGVycy5kZWZhdWx0TGFuZ3VhZ2UoKSk7XHJcbiAgICAgICAgICAgICAgICBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZVJlYWRlci5zYXZlKHRoaXMubWFzdGVyLCB0aGlzLnBhcmFtZXRlcnMuYmVhdXRpZnlPdXRwdXQoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQud2FybignY2hhbmdlZCBtYXN0ZXIgc291cmNlLWxhbmd1YWdlPVwiJXNcIiB0byBcIiVzXCInLCBzb3VyY2VMYW5nLCB0aGlzLnBhcmFtZXRlcnMuZGVmYXVsdExhbmd1YWdlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBYbGlmZk1lcmdlRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5lcnJvcihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoLTEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gdW5oYW5kbGVkXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50RmlsZW5hbWUgPSB0aGlzLnBhcmFtZXRlcnMuaTE4bkZpbGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lU3RyaW5nID0gKGN1cnJlbnRGaWxlbmFtZSkgPyBmb3JtYXQoJ2ZpbGUgXCIlc1wiLCAnLCBjdXJyZW50RmlsZW5hbWUpIDogJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQuZXJyb3IoZmlsZW5hbWVTdHJpbmcgKyAnb29wcyAnICsgZXJyKTtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3MgdGhlIGdpdmVuIGxhbmd1YWdlLlxyXG4gICAgICogQXN5bmMgb3BlcmF0aW9uLlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2VcclxuICAgICAqIEByZXR1cm4gb24gY29tcGxldGlvbiAwIGZvciBvaywgb3RoZXIgZm9yIGVycm9yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcHJvY2Vzc0xhbmd1YWdlKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0LmRlYnVnKCdwcm9jZXNzaW5nIGxhbmd1YWdlICVzJywgbGFuZyk7XHJcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VYbGlmZkZpbGUgPSB0aGlzLnBhcmFtZXRlcnMuZ2VuZXJhdGVkSTE4bkZpbGUobGFuZyk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEZpbGVuYW1lID0gbGFuZ3VhZ2VYbGlmZkZpbGU7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogT2JzZXJ2YWJsZTx2b2lkPjtcclxuICAgICAgICBpZiAoIUZpbGVVdGlsLmV4aXN0cyhsYW5ndWFnZVhsaWZmRmlsZSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5jcmVhdGVVbnRyYW5zbGF0ZWRYbGlmZihsYW5nLCBsYW5ndWFnZVhsaWZmRmlsZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5tZXJnZU1hc3RlclRvKGxhbmcsIGxhbmd1YWdlWGxpZmZGaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgICAgICAucGlwZShtYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5zdXBwb3J0Tmd4VHJhbnNsYXRlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUcmFuc2xhdGlvbk1lc3NhZ2VzRmlsZVJlYWRlci5mcm9tRmlsZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25Gb3JtYXQodGhpcy5wYXJhbWV0ZXJzLmkxOG5Gb3JtYXQoKSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZVhsaWZmRmlsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5lbmNvZGluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXN0ZXIuZmlsZW5hbWUoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTmd4VHJhbnNsYXRlRXh0cmFjdG9yLmV4dHJhY3QoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5uZ3hUcmFuc2xhdGVFeHRyYWN0aW9uUGF0dGVybigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuZ2VuZXJhdGVkTmd4VHJhbnNsYXRlRmlsZShsYW5nKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyciBpbnN0YW5jZW9mIFhsaWZmTWVyZ2VFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5lcnJvcihlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKC0xKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5oYW5kbGVkXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZW5hbWVTdHJpbmcgPSAoY3VycmVudEZpbGVuYW1lKSA/IGZvcm1hdCgnZmlsZSBcIiVzXCIsICcsIGN1cnJlbnRGaWxlbmFtZSkgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQuZXJyb3IoZmlsZW5hbWVTdHJpbmcgKyAnb29wcyAnICsgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhIG5ldyBmaWxlIGZvciB0aGUgbGFuZ3VhZ2UsIHdoaWNoIGNvbnRhaW5zIG5vIHRyYW5zbGF0aW9ucywgYnV0IGFsbCBrZXlzLlxyXG4gICAgICogaW4gcHJpbmNpcGxlLCB0aGlzIGlzIGp1c3QgYSBjb3B5IG9mIHRoZSBtYXN0ZXIgd2l0aCB0YXJnZXQtbGFuZ3VhZ2Ugc2V0LlxyXG4gICAgICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2VcclxuICAgICAqIEBwYXJhbSBsYW5ndWFnZVhsaWZmRmlsZVBhdGggbmFtZSBvZiBmaWxlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVW50cmFuc2xhdGVkWGxpZmYobGFuZzogc3RyaW5nLCBsYW5ndWFnZVhsaWZmRmlsZVBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgICAgIC8vIGNvcHkgbWFzdGVyIC4uLlxyXG4gICAgICAgIC8vIGFuZCBzZXQgdGFyZ2V0LWxhbmd1YWdlXHJcbiAgICAgICAgLy8gYW5kIGNvcHkgc291cmNlIHRvIHRhcmdldCBpZiBuZWNlc3NhcnlcclxuICAgICAgICBjb25zdCBpc0RlZmF1bHRMYW5nOiBib29sZWFuID0gKGxhbmcgPT09IHRoaXMucGFyYW1ldGVycy5kZWZhdWx0TGFuZ3VhZ2UoKSk7XHJcbiAgICAgICAgdGhpcy5tYXN0ZXIuc2V0TmV3VHJhbnNVbml0VGFyZ2V0UHJhZWZpeCh0aGlzLnBhcmFtZXRlcnMudGFyZ2V0UHJhZWZpeCgpKTtcclxuICAgICAgICB0aGlzLm1hc3Rlci5zZXROZXdUcmFuc1VuaXRUYXJnZXRTdWZmaXgodGhpcy5wYXJhbWV0ZXJzLnRhcmdldFN1ZmZpeCgpKTtcclxuICAgICAgICBjb25zdCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUgPVxyXG4gICAgICAgICAgICB0aGlzLm1hc3Rlci5jcmVhdGVUcmFuc2xhdGlvbkZpbGVGb3JMYW5nKGxhbmcsIGxhbmd1YWdlWGxpZmZGaWxlUGF0aCwgaXNEZWZhdWx0TGFuZywgdGhpcy5wYXJhbWV0ZXJzLnVzZVNvdXJjZUFzVGFyZ2V0KCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF1dG9UcmFuc2xhdGUodGhpcy5tYXN0ZXIuc291cmNlTGFuZ3VhZ2UoKSwgbGFuZywgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZSkucGlwZShcclxuICAgICAgICAgICAgbWFwKCgvKiBzdW1tYXJ5ICovKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHdyaXRlIGl0IHRvIGZpbGVcclxuICAgICAgICAgICAgVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVSZWFkZXIuc2F2ZShsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlLCB0aGlzLnBhcmFtZXRlcnMuYmVhdXRpZnlPdXRwdXQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5pbmZvKCdjcmVhdGVkIG5ldyBmaWxlIFwiJXNcIiBmb3IgdGFyZ2V0LWxhbmd1YWdlPVwiJXNcIicsIGxhbmd1YWdlWGxpZmZGaWxlUGF0aCwgbGFuZyk7XHJcbiAgICAgICAgICAgIGlmICghaXNEZWZhdWx0TGFuZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0Lndhcm4oJ3BsZWFzZSB0cmFuc2xhdGUgZmlsZSBcIiVzXCIgdG8gdGFyZ2V0LWxhbmd1YWdlPVwiJXNcIicsIGxhbmd1YWdlWGxpZmZGaWxlUGF0aCwgbGFuZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFwIHRoZSBpbnB1dCBmb3JtYXQgdG8gdGhlIGZvcm1hdCBvZiB0aGUgdHJhbnNsYXRpb24uXHJcbiAgICAgKiBOb3JtYWxseSB0aGV5IGFyZSB0aGUgc2FtZSBidXQgZm9yIHhtYiB0aGUgdHJhbnNsYXRpb24gZm9ybWF0IGlzIHh0Yi5cclxuICAgICAqIEBwYXJhbSBpMThuRm9ybWF0IGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0aW9uRm9ybWF0KGkxOG5Gb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGkxOG5Gb3JtYXQgPT09IEZPUk1BVF9YTUIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEZPUk1BVF9YVEI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGkxOG5Gb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWVyZ2UgYWxsXHJcbiAgICAgKiBAcGFyYW0gbGFuZyBsYW5ndWFnZVxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlWGxpZmZGaWxlUGF0aCBmaWxlbmFtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1lcmdlTWFzdGVyVG8obGFuZzogc3RyaW5nLCBsYW5ndWFnZVhsaWZmRmlsZVBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgICAgIC8vIHJlYWQgbGFuZyBzcGVjaWZpYyBmaWxlXHJcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlID1cclxuICAgICAgICAgICAgVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGVSZWFkZXIuZnJvbUZpbGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uRm9ybWF0KHRoaXMucGFyYW1ldGVycy5pMThuRm9ybWF0KCkpLFxyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VYbGlmZkZpbGVQYXRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmVuY29kaW5nKCkpO1xyXG4gICAgICAgIGNvbnN0IGlzRGVmYXVsdExhbmc6IGJvb2xlYW4gPSAobGFuZyA9PT0gdGhpcy5wYXJhbWV0ZXJzLmRlZmF1bHRMYW5ndWFnZSgpKTtcclxuICAgICAgICBsZXQgbmV3Q291bnQgPSAwO1xyXG4gICAgICAgIGxldCBjb3JyZWN0U291cmNlQ29udGVudENvdW50ID0gMDtcclxuICAgICAgICBsZXQgY29ycmVjdFNvdXJjZVJlZkNvdW50ID0gMDtcclxuICAgICAgICBsZXQgY29ycmVjdERlc2NyaXB0aW9uT3JNZWFuaW5nQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCBpZENoYW5nZWRDb3VudCA9IDA7XHJcbiAgICAgICAgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZS5zZXROZXdUcmFuc1VuaXRUYXJnZXRQcmFlZml4KHRoaXMucGFyYW1ldGVycy50YXJnZXRQcmFlZml4KCkpO1xyXG4gICAgICAgIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUuc2V0TmV3VHJhbnNVbml0VGFyZ2V0U3VmZml4KHRoaXMucGFyYW1ldGVycy50YXJnZXRTdWZmaXgoKSk7XHJcbiAgICAgICAgbGV0IGxhc3RQcm9jZXNzZWRVbml0OiBJVHJhbnNVbml0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1hc3Rlci5mb3JFYWNoVHJhbnNVbml0KChtYXN0ZXJUcmFuc1VuaXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNVbml0OiBJVHJhbnNVbml0ID0gbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZS50cmFuc1VuaXRXaXRoSWQobWFzdGVyVHJhbnNVbml0LmlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdHJhbnNVbml0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvb3BzLCBubyB0cmFuc2xhdGlvbiwgbXVzdCBiZSBhIG5ldyBrZXksIHNvIGFkZCBpdFxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1VuaXQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmFsbG93SWRDaGFuZ2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIChuZXdVbml0ID0gdGhpcy5wcm9jZXNzQ2hhbmdlZElkVW5pdChtYXN0ZXJUcmFuc1VuaXQsIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUsIGxhc3RQcm9jZXNzZWRVbml0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UHJvY2Vzc2VkVW5pdCA9IG5ld1VuaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWRDaGFuZ2VkQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZFVuaXQgPSBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlLmltcG9ydE5ld1RyYW5zVW5pdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzdGVyVHJhbnNVbml0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0RlZmF1bHRMYW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXNlU291cmNlQXNUYXJnZXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMucGFyYW1ldGVycy5wcmVzZXJ2ZU9yZGVyKCkpID8gbGFzdFByb2Nlc3NlZFVuaXQgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBmb3IgY2hhbmdlZCBzb3VyY2UgY29udGVudCBhbmQgY2hhbmdlIGl0IGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgLy8gKGNhbiBvbmx5IGhhcHBlbiBpZiBJRCBpcyBleHBsaWNpdGVseSBzZXQsIG90aGVyd2lzZSBJRCB3b3VsZCBjaGFuZ2UgaWYgc291cmNlIGNvbnRlbnQgaXMgY2hhbmdlZC5cclxuICAgICAgICAgICAgICAgIGlmICh0cmFuc1VuaXQuc3VwcG9ydHNTZXRTb3VyY2VDb250ZW50KCkgJiYgIXRoaXMuYXJlU291cmNlc05lYXJseUVxdWFsKG1hc3RlclRyYW5zVW5pdCwgdHJhbnNVbml0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zVW5pdC5zZXRTb3VyY2VDb250ZW50KG1hc3RlclRyYW5zVW5pdC5zb3VyY2VDb250ZW50KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0RlZmF1bHRMYW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICM4MSBjaGFuZ2VkIHNvdXJjZSBtdXN0IGJlIGNvcGllZCB0byB0YXJnZXQgZm9yIGRlZmF1bHQgbGFuZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc1VuaXQudHJhbnNsYXRlKG1hc3RlclRyYW5zVW5pdC5zb3VyY2VDb250ZW50KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc1VuaXQuc2V0VGFyZ2V0U3RhdGUoU1RBVEVfRklOQUwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc1VuaXQudGFyZ2V0U3RhdGUoKSA9PT0gU1RBVEVfRklOQUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdXJjZSBpcyBjaGFuZ2VkLCBzbyB0cmFuc2xhdGlvbiBoYXMgdG8gYmUgY2hlY2tlZCBhZ2FpblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNVbml0LnNldFRhcmdldFN0YXRlKFNUQVRFX1RSQU5TTEFURUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3RTb3VyY2VDb250ZW50Q291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBtaXNzaW5nIG9yIGNoYW5nZWQgc291cmNlIHJlZiBhbmQgYWRkIGl0IGlmIG5lZWRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zVW5pdC5zdXBwb3J0c1NldFNvdXJjZVJlZmVyZW5jZXMoKVxyXG4gICAgICAgICAgICAgICAgICAgICYmICF0aGlzLmFyZVNvdXJjZVJlZmVyZW5jZXNFcXVhbChtYXN0ZXJUcmFuc1VuaXQuc291cmNlUmVmZXJlbmNlcygpLCB0cmFuc1VuaXQuc291cmNlUmVmZXJlbmNlcygpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zVW5pdC5zZXRTb3VyY2VSZWZlcmVuY2VzKG1hc3RlclRyYW5zVW5pdC5zb3VyY2VSZWZlcmVuY2VzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3RTb3VyY2VSZWZDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgZm9yIGNoYW5nZWQgZGVzY3JpcHRpb24gb3IgbWVhbmluZ1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zVW5pdC5zdXBwb3J0c1NldERlc2NyaXB0aW9uQW5kTWVhbmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNVbml0LmRlc2NyaXB0aW9uKCkgIT09IG1hc3RlclRyYW5zVW5pdC5kZXNjcmlwdGlvbigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zVW5pdC5zZXREZXNjcmlwdGlvbihtYXN0ZXJUcmFuc1VuaXQuZGVzY3JpcHRpb24oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNVbml0Lm1lYW5pbmcoKSAhPT0gbWFzdGVyVHJhbnNVbml0Lm1lYW5pbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc1VuaXQuc2V0TWVhbmluZyhtYXN0ZXJUcmFuc1VuaXQubWVhbmluZygpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3REZXNjcmlwdGlvbk9yTWVhbmluZ0NvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFzdFByb2Nlc3NlZFVuaXQgPSB0cmFuc1VuaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobmV3Q291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKCdtZXJnZWQgJXMgdHJhbnMtdW5pdHMgZnJvbSBtYXN0ZXIgdG8gXCIlc1wiJywgbmV3Q291bnQsIGxhbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29ycmVjdFNvdXJjZUNvbnRlbnRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0Lndhcm4oJ3RyYW5zZmVycmVkICVzIGNoYW5nZWQgc291cmNlIGNvbnRlbnQgZnJvbSBtYXN0ZXIgdG8gXCIlc1wiJywgY29ycmVjdFNvdXJjZUNvbnRlbnRDb3VudCwgbGFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3JyZWN0U291cmNlUmVmQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKCd0cmFuc2ZlcnJlZCAlcyBzb3VyY2UgcmVmZXJlbmNlcyBmcm9tIG1hc3RlciB0byBcIiVzXCInLCBjb3JyZWN0U291cmNlUmVmQ291bnQsIGxhbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaWRDaGFuZ2VkQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKCdmb3VuZCAlcyBjaGFuZ2VkIGlkXFwncyBpbiBcIiVzXCInLCBpZENoYW5nZWRDb3VudCwgbGFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3JyZWN0RGVzY3JpcHRpb25Pck1lYW5pbmdDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0Lndhcm4oXHJcbiAgICAgICAgICAgICAgICAndHJhbnNmZXJyZWQgJXMgY2hhbmdlZCBkZXNjcmlwdGlvbnMvbWVhbmluZ3MgZnJvbSBtYXN0ZXIgdG8gXCIlc1wiJywgY29ycmVjdERlc2NyaXB0aW9uT3JNZWFuaW5nQ291bnQsIGxhbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBlbGVtZW50cyB0aGF0IGFyZSBubyBsb25nZXIgdXNlZFxyXG4gICAgICAgIGxldCByZW1vdmVDb3VudCA9IDA7XHJcbiAgICAgICAgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZS5mb3JFYWNoVHJhbnNVbml0KCh0cmFuc1VuaXQ6IElUcmFuc1VuaXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZXhpc3RzSW5NYXN0ZXIgPSAhaXNOdWxsT3JVbmRlZmluZWQodGhpcy5tYXN0ZXIudHJhbnNVbml0V2l0aElkKHRyYW5zVW5pdC5pZCkpO1xyXG4gICAgICAgICAgICBpZiAoIWV4aXN0c0luTWFzdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLnJlbW92ZVVudXNlZElkcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZS5yZW1vdmVUcmFuc1VuaXRXaXRoSWQodHJhbnNVbml0LmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlbW92ZUNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocmVtb3ZlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMucmVtb3ZlVW51c2VkSWRzKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKCdyZW1vdmVkICVzIHVudXNlZCB0cmFucy11bml0cyBpbiBcIiVzXCInLCByZW1vdmVDb3VudCwgbGFuZyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRPdXRwdXQud2Fybigna2VlcGluZyAlcyB1bnVzZWQgdHJhbnMtdW5pdHMgaW4gXCIlc1wiLCBiZWNhdXNlIHJlbW92ZVVudXNlZCBpcyBkaXNhYmxlZCcsIHJlbW92ZUNvdW50LCBsYW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5ld0NvdW50ID09PSAwICYmIHJlbW92ZUNvdW50ID09PSAwICYmIGNvcnJlY3RTb3VyY2VDb250ZW50Q291bnQgPT09IDBcclxuICAgICAgICAgICAgJiYgY29ycmVjdFNvdXJjZVJlZkNvdW50ID09PSAwICYmIGNvcnJlY3REZXNjcmlwdGlvbk9yTWVhbmluZ0NvdW50ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5pbmZvKCdmaWxlIGZvciBcIiVzXCIgd2FzIHVwIHRvIGRhdGUnLCBsYW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9UcmFuc2xhdGUodGhpcy5tYXN0ZXIuc291cmNlTGFuZ3VhZ2UoKSwgbGFuZywgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZSlcclxuICAgICAgICAgICAgICAgIC5waXBlKG1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd3JpdGUgaXQgdG8gZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgIFRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlUmVhZGVyLnNhdmUobGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZSwgdGhpcy5wYXJhbWV0ZXJzLmJlYXV0aWZ5T3V0cHV0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC5pbmZvKCd1cGRhdGVkIGZpbGUgXCIlc1wiIGZvciB0YXJnZXQtbGFuZ3VhZ2U9XCIlc1wiJywgbGFuZ3VhZ2VYbGlmZkZpbGVQYXRoLCBsYW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Q291bnQgPiAwICYmICFpc0RlZmF1bHRMYW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZE91dHB1dC53YXJuKCdwbGVhc2UgdHJhbnNsYXRlIGZpbGUgXCIlc1wiIHRvIHRhcmdldC1sYW5ndWFnZT1cIiVzXCInLCBsYW5ndWFnZVhsaWZmRmlsZVBhdGgsIGxhbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgdGhlIGNhc2Ugb2YgY2hhbmdlZCBpZCBkdWUgdG8gc21hbGwgd2hpdGUgc3BhY2UgY2hhbmdlcy5cclxuICAgICAqIEBwYXJhbSBtYXN0ZXJUcmFuc1VuaXQgdW5pdCBpbiBtYXN0ZXIgZmlsZVxyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUgdHJhbnNsYXRpb24gZmlsZVxyXG4gICAgICogQHBhcmFtIGxhc3RQcm9jZXNzZWRVbml0IFVuaXQgYmVmb3JlIHRoZSBvbmUgcHJvY2Vzc2VkIGhlcmUuIE5ldyB1bml0IHdpbGwgYmUgaW5zZXJ0ZWQgYWZ0ZXIgdGhpcyBvbmUuXHJcbiAgICAgKiBAcmV0dXJuIHByb2Nlc3NlZCB1bml0LCBpZiBkb25lLCBudWxsIGlmIG5vIGNoYW5nZWQgdW5pdCBmb3VuZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHByb2Nlc3NDaGFuZ2VkSWRVbml0KFxyXG4gICAgICAgIG1hc3RlclRyYW5zVW5pdDogSVRyYW5zVW5pdCxcclxuICAgICAgICBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlOiBJVHJhbnNsYXRpb25NZXNzYWdlc0ZpbGUsXHJcbiAgICAgICAgbGFzdFByb2Nlc3NlZFVuaXQ6IElUcmFuc1VuaXQpOiBJVHJhbnNVbml0IHtcclxuXHJcbiAgICAgICAgbGV0IGNoYW5nZWRUcmFuc1VuaXQ6IElUcmFuc1VuaXQgPSBudWxsO1xyXG4gICAgICAgIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUuZm9yRWFjaFRyYW5zVW5pdCgobGFuZ3VhZ2VUcmFuc1VuaXQpID0+IHtcclxuICAgICAgICAgICAgIGlmICh0aGlzLmFyZVNvdXJjZXNOZWFybHlFcXVhbChsYW5ndWFnZVRyYW5zVW5pdCwgbWFzdGVyVHJhbnNVbml0KSkge1xyXG4gICAgICAgICAgICAgICAgIGNoYW5nZWRUcmFuc1VuaXQgPSBsYW5ndWFnZVRyYW5zVW5pdDtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIWNoYW5nZWRUcmFuc1VuaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1lcmdlZFRyYW5zVW5pdCA9IGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUuaW1wb3J0TmV3VHJhbnNVbml0KFxyXG4gICAgICAgICAgICBtYXN0ZXJUcmFuc1VuaXQsXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgKHRoaXMucGFyYW1ldGVycy5wcmVzZXJ2ZU9yZGVyKCkpID8gbGFzdFByb2Nlc3NlZFVuaXQgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgIGNvbnN0IHRyYW5zbGF0ZWRDb250ZW50ID0gY2hhbmdlZFRyYW5zVW5pdC50YXJnZXRDb250ZW50KCk7XHJcbiAgICAgICAgaWYgKHRyYW5zbGF0ZWRDb250ZW50KSB7IC8vIGlzc3VlICM2OCBzZXQgdHJhbnNsYXRlZCBvbmx5LCBpZiBpdCBpcyByZWFsbHkgdHJhbnNsYXRlZFxyXG4gICAgICAgICAgICBtZXJnZWRUcmFuc1VuaXQudHJhbnNsYXRlKHRyYW5zbGF0ZWRDb250ZW50KTtcclxuICAgICAgICAgICAgbWVyZ2VkVHJhbnNVbml0LnNldFRhcmdldFN0YXRlKFNUQVRFX1RSQU5TTEFURUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVyZ2VkVHJhbnNVbml0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGVzdCB3ZXRoZXIgdGhlIHNvdXJjZXMgb2YgMiB0cmFucyB1bml0cyBhcmUgZXF1YWwgaWdub3Jpbmcgd2hpdGUgc3BhY2VzLlxyXG4gICAgICogQHBhcmFtIHR1MSB0dTFcclxuICAgICAqIEBwYXJhbSB0dTIgdHUyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXJlU291cmNlc05lYXJseUVxdWFsKHR1MTogSVRyYW5zVW5pdCwgdHUyOiBJVHJhbnNVbml0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCh0dTEgJiYgIXR1MikgfHwgKHR1MiAmJiAhdHUxKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHR1MU5vcm1hbGl6ZWQgPSB0dTEuc291cmNlQ29udGVudE5vcm1hbGl6ZWQoKTtcclxuICAgICAgICBjb25zdCB0dTJOb3JtYWxpemVkID0gdHUyLnNvdXJjZUNvbnRlbnROb3JtYWxpemVkKCk7XHJcbiAgICAgICAgaWYgKHR1MU5vcm1hbGl6ZWQuaXNJQ1VNZXNzYWdlKCkpIHtcclxuICAgICAgICAgICAgaWYgKHR1Mk5vcm1hbGl6ZWQuaXNJQ1VNZXNzYWdlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGljdTFOb3JtYWxpemVkID0gdHUxTm9ybWFsaXplZC5nZXRJQ1VNZXNzYWdlKCkuYXNOYXRpdmVTdHJpbmcoKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpY3UyTm9ybWFsaXplZCA9IHR1Mk5vcm1hbGl6ZWQuZ2V0SUNVTWVzc2FnZSgpLmFzTmF0aXZlU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGljdTFOb3JtYWxpemVkID09PSBpY3UyTm9ybWFsaXplZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHUxTm9ybWFsaXplZC5jb250YWluc0lDVU1lc3NhZ2VSZWYoKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpY3VyZWYxTm9ybWFsaXplZCA9IHR1MU5vcm1hbGl6ZWQuYXNOYXRpdmVTdHJpbmcoKS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGljdXJlZjJOb3JtYWxpemVkID0gdHUyTm9ybWFsaXplZC5hc05hdGl2ZVN0cmluZygpLnRyaW0oKTtcclxuICAgICAgICAgICAgcmV0dXJuIGljdXJlZjFOb3JtYWxpemVkID09PSBpY3VyZWYyTm9ybWFsaXplZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgczFOb3JtYWxpemVkID0gdHUxTm9ybWFsaXplZC5hc0Rpc3BsYXlTdHJpbmcoTk9STUFMSVpBVElPTl9GT1JNQVRfREVGQVVMVCkudHJpbSgpO1xyXG4gICAgICAgIGNvbnN0IHMyTm9ybWFsaXplZCA9IHR1Mk5vcm1hbGl6ZWQuYXNEaXNwbGF5U3RyaW5nKE5PUk1BTElaQVRJT05fRk9STUFUX0RFRkFVTFQpLnRyaW0oKTtcclxuICAgICAgICByZXR1cm4gczFOb3JtYWxpemVkID09PSBzMk5vcm1hbGl6ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcmVTb3VyY2VSZWZlcmVuY2VzRXF1YWwoXHJcbiAgICAgICAgcmVmMToge3NvdXJjZWZpbGU6IHN0cmluZzsgbGluZW51bWJlcjogbnVtYmVyOyB9W10sXHJcbiAgICAgICAgcmVmMjoge3NvdXJjZWZpbGU6IHN0cmluZzsgbGluZW51bWJlcjogbnVtYmVyOyB9W10pOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgaWYgKChpc051bGxPclVuZGVmaW5lZChyZWYxKSAmJiAhaXNOdWxsT3JVbmRlZmluZWQocmVmMikpIHx8IChpc051bGxPclVuZGVmaW5lZChyZWYyKSAmJiAhaXNOdWxsT3JVbmRlZmluZWQocmVmMSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHJlZjEpICYmIGlzTnVsbE9yVW5kZWZpbmVkKHJlZjIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBib3QgcmVmcyBhcmUgc2V0IG5vdywgY29udmVydCB0byBzZXQgdG8gY29tcGFyZSB0aGVtXHJcbiAgICAgICAgY29uc3Qgc2V0MTogU2V0PHN0cmluZz4gPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgICByZWYxLmZvckVhY2goKHJlZikgPT4ge3NldDEuYWRkKHJlZi5zb3VyY2VmaWxlICsgJzonICsgcmVmLmxpbmVudW1iZXIpOyB9KTtcclxuICAgICAgICBjb25zdCBzZXQyOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIHJlZjIuZm9yRWFjaCgocmVmKSA9PiB7c2V0Mi5hZGQocmVmLnNvdXJjZWZpbGUgKyAnOicgKyByZWYubGluZW51bWJlcik7IH0pO1xyXG4gICAgICAgIGlmIChzZXQxLnNpemUgIT09IHNldDIuc2l6ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgc2V0Mi5mb3JFYWNoKChyZWYpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFzZXQxLmhhcyhyZWYpKSB7XHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXV0byB0cmFuc2xhdGUgZmlsZSB2aWEgR29vZ2xlIFRyYW5zbGF0ZS5cclxuICAgICAqIFdpbGwgdHJhbnNsYXRlIGFsbCBuZXcgdW5pdHMgaW4gZmlsZS5cclxuICAgICAqIEBwYXJhbSBmcm9tIGZyb21cclxuICAgICAqIEBwYXJhbSB0byB0b1xyXG4gICAgICogQHBhcmFtIGxhbmd1YWdlU3BlY2lmaWNNZXNzYWdlc0ZpbGUgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZVxyXG4gICAgICogQHJldHVybiBhIHByb21pc2Ugd2l0aCB0aGUgZXhlY3V0aW9uIHJlc3VsdCBhcyBhIHN1bW1hcnkgcmVwb3J0LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF1dG9UcmFuc2xhdGUoXHJcbiAgICAgICAgZnJvbTogc3RyaW5nLFxyXG4gICAgICAgIHRvOiBzdHJpbmcsXHJcbiAgICAgICAgbGFuZ3VhZ2VTcGVjaWZpY01lc3NhZ2VzRmlsZTogSVRyYW5zbGF0aW9uTWVzc2FnZXNGaWxlKTogT2JzZXJ2YWJsZTxBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydD4ge1xyXG5cclxuICAgICAgICBsZXQgc2VydmljZUNhbGw6IE9ic2VydmFibGU8QXV0b1RyYW5zbGF0ZVN1bW1hcnlSZXBvcnQ+O1xyXG4gICAgICAgIGNvbnN0IGF1dG90cmFuc2xhdGVFbmFibGVkOiBib29sZWFuID0gdGhpcy5wYXJhbWV0ZXJzLmF1dG90cmFuc2xhdGVMYW5ndWFnZSh0byk7XHJcbiAgICAgICAgaWYgKGF1dG90cmFuc2xhdGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2VDYWxsID0gdGhpcy5hdXRvVHJhbnNsYXRlU2VydmljZS5hdXRvVHJhbnNsYXRlKGZyb20sIHRvLCBsYW5ndWFnZVNwZWNpZmljTWVzc2FnZXNGaWxlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXJ2aWNlQ2FsbCA9IG9mKG5ldyBBdXRvVHJhbnNsYXRlU3VtbWFyeVJlcG9ydChmcm9tLCB0bykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VydmljZUNhbGwucGlwZShtYXAoKHN1bW1hcnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKGF1dG90cmFuc2xhdGVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3VtbWFyeS5lcnJvcigpIHx8IHN1bW1hcnkuZmFpbGVkKCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0LmVycm9yKHN1bW1hcnkuY29udGVudCgpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kT3V0cHV0Lndhcm4oc3VtbWFyeS5jb250ZW50KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdW1tYXJ5O1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19