/**
 * Additional package.json spefific tool functions that are not part of normal package.ts
 */
import { Tree } from '@angular-devkit/schematics';
import { OptionsAfterSetup } from './options-after-setup';
import { ExtractScript } from './extract-script';
/**
 * rudimentary interface of package.json (only what is used here).
 */
export interface IPackageJson {
    devDependencies: {
        [packagename: string]: string;
    };
    scripts: {
        [scriptname: string]: string;
    };
}
/**
 * Read and edit functionality on package.json
 * It allows multiple changes on package.json file.
 * At the end we call commit() to write angular.json.
 */
export declare class PackageJsonSnapshot {
    private _path;
    private host;
    private context?;
    private readonly packageJson;
    /**
     * Create it.
     * Read the file package.json
     * @param _path path where package.json is expected.
     * @param host host tree
     * @param context context (used for logging)
     * @throws SchematicsException when package.json does not exists.
     */
    constructor(_path: string, host: Tree, context?: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}> | undefined);
    /**
     * Patht of package json.
     */
    path(): string;
    /**
     * Actual content of package json.
     */
    content(): string;
    /**
     * Commit all changes done on workspace.
     * (writes angular.json)
     */
    commit(): void;
    /**
     * Get a script with given name or null, if not existing.
     * @param scriptName name of script
     * @return content of script
     */
    getScript(scriptName: string): string | null;
    /**
     * Get the extract script, if contained in package.json.
     */
    getExtractScriptForProject(project: string | null, isDefaultProject: boolean): ExtractScript | null;
    /**
     * Add a script to package.json
     * @param scriptName name of script to be added.
     * @param content content of script
     */
    addOrReplaceScript(scriptName: string, content: string): void;
    /**
     * Remove a script from package.json
     * @param scriptName name of script to be removed.
     */
    removeScript(scriptName: string): void;
    addExtractScript(options: OptionsAfterSetup): void;
    changeExtractScript(options: OptionsAfterSetup): void;
    /**
     * Add a start script.
     * Script will be named 'start-<language>' or 'start-<project>-<language'.
     * @param options options options containing project etc.
     * @param language language to be added.
     */
    addStartScript(options: OptionsAfterSetup, language: string): void;
    /**
     * returns the start script to be added.
     */
    private startScript;
    /**
     * Read package.json
     * @host the tree to read from
     * @return content or null, if file does not exist.
     */
    private readPackageJson;
}
