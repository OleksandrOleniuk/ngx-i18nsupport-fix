import { Tree } from '@angular-devkit/schematics';
import { IConfigFile } from '@ngx-i18nsupport/ngx-i18nsupport';
/**
 * Read and edit functionality on xliffmerge.json
 * It allows changes on xliffmerge.json file.
 * At the end we call commit() to write angular.json.
 */
export declare class XliffmergeConfigJsonSnapshot {
    private host;
    private context?;
    private readonly xliffmergeConfigJson;
    private readonly configPath;
    /**
     * Create it.
     * Read the file xliffmerge.json
     * @param filename filename to config file (including name)
     * @param host host tree
     * @param context context (used for logging)
     * @throws SchematicsException when package.json does not exists.
     */
    constructor(filename: string, host: Tree, context?: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}> | undefined);
    getXliffmergeConfigJson(): IConfigFile;
    /**
     * Commit all changes done on workspace.
     * (writes angular.json)
     */
    commit(): void;
    addLanguagesToXliffmergeConfiguration(languagesToAdd: string[]): void;
    /**
     * Read xliffmerge.json
     * @return content or exception, if file does not exist.
     */
    private readXliffmergeConfigJson;
}
