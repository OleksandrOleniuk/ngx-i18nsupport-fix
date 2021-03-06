"use strict";
/**
 * Additional package.json spefific tool functions that are not part of normal package.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const constants_1 = require("./constants");
const extract_script_1 = require("./extract-script");
/**
 * Read and edit functionality on package.json
 * It allows multiple changes on package.json file.
 * At the end we call commit() to write angular.json.
 */
class PackageJsonSnapshot {
    /**
     * Create it.
     * Read the file package.json
     * @param _path path where package.json is expected.
     * @param host host tree
     * @param context context (used for logging)
     * @throws SchematicsException when package.json does not exists.
     */
    constructor(_path, host, context) {
        this._path = _path;
        this.host = host;
        this.context = context;
        this.packageJson = this.readPackageJson();
    }
    /**
     * Patht of package json.
     */
    path() {
        return this._path;
    }
    /**
     * Actual content of package json.
     */
    content() {
        return JSON.stringify(this.packageJson, null, 2);
    }
    /**
     * Commit all changes done on workspace.
     * (writes angular.json)
     */
    commit() {
        this.host.overwrite(`${this._path}/package.json`, this.content());
    }
    /**
     * Get a script with given name or null, if not existing.
     * @param scriptName name of script
     * @return content of script
     */
    getScript(scriptName) {
        return this.packageJson.scripts[scriptName];
    }
    /**
     * Get the extract script, if contained in package.json.
     */
    getExtractScriptForProject(project, isDefaultProject) {
        const scriptname = constants_1.extractScriptName(project, isDefaultProject);
        const content = this.getScript(scriptname);
        if (content) {
            return new extract_script_1.ExtractScript(scriptname, content);
        }
        else {
            return null;
        }
    }
    /**
     * Add a script to package.json
     * @param scriptName name of script to be added.
     * @param content content of script
     */
    addOrReplaceScript(scriptName, content) {
        const scriptsSection = 'scripts';
        if (!this.packageJson[scriptsSection]) {
            this.packageJson[scriptsSection] = {};
        }
        const isOverride = !!this.packageJson[scriptsSection][scriptName];
        this.packageJson[scriptsSection][scriptName] = content;
        if (this.context) {
            if (isOverride) {
                this.context.logger.info(`changed script ${scriptName} in ${this._path}/package.json`);
            }
            else {
                this.context.logger.info(`added script ${scriptName} to ${this._path}/package.json`);
            }
        }
    }
    /**
     * Remove a script from package.json
     * @param scriptName name of script to be removed.
     */
    removeScript(scriptName) {
        const scriptsSection = 'scripts';
        if (!this.packageJson[scriptsSection]) {
            return;
        }
        const exists = !!this.packageJson[scriptsSection][scriptName];
        if (exists) {
            delete this.packageJson[scriptsSection][scriptName];
        }
        if (this.context) {
            if (exists) {
                this.context.logger.info(`removed script ${scriptName} from ${this._path}/package.json`);
            }
        }
    }
    addExtractScript(options) {
        const extractScript = extract_script_1.ExtractScript.createExtractScript(options);
        this.addOrReplaceScript(extractScript.name, extractScript.content);
        if (this.context) {
            this.context.logger.info(`added npm script to extract i18n message, run "npm run ${extractScript.name}" for extraction`);
        }
    }
    /*
    change extract script "extract-i18n" to contain newly added languages.
     */
    changeExtractScript(options) {
        // check wether it is changed
        const existingScriptContent = this.getScript(constants_1.extractScriptName(options.project, options.isDefaultProject));
        const extractScript = extract_script_1.ExtractScript.createExtractScript(options);
        if (existingScriptContent !== extractScript.content) {
            this.addOrReplaceScript(extractScript.name, extractScript.content);
            if (this.context) {
                this.context.logger.info(`changed npm script to extract i18n message, run "npm run ${extractScript.name}" for extraction`);
            }
        }
    }
    /**
     * Add a start script.
     * Script will be named 'start-<language>' or 'start-<project>-<language'.
     * @param options options options containing project etc.
     * @param language language to be added.
     */
    addStartScript(options, language) {
        const scriptName = (options.isDefaultProject) ? `start-${language}` : `start-${options.project}-${language}`;
        this.addOrReplaceScript(scriptName, this.startScript(options, language));
        if (this.context) {
            this.context.logger.info(`added npm script to start app for language ${language}, run "npm run ${scriptName}"`);
        }
    }
    /**
     * returns the start script to be added.
     */
    startScript(options, language) {
        if (options.isDefaultProject) {
            return `ng serve --configuration=${language}`;
        }
        else {
            return `ng serve ${options.project} --configuration=${language}`;
        }
    }
    /**
     * Read package.json
     * @host the tree to read from
     * @return content or null, if file does not exist.
     */
    readPackageJson() {
        const packageJsonPath = `${this._path}/package.json`;
        const content = this.host.read(packageJsonPath);
        if (!content) {
            throw new schematics_1.SchematicsException(`${packageJsonPath} does not exist`);
        }
        const contentString = content.toString('UTF-8');
        return JSON.parse(contentString);
    }
}
exports.PackageJsonSnapshot = PackageJsonSnapshot;
//# sourceMappingURL=package-json-snapshot.js.map