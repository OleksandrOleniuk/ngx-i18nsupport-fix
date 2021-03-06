/**
 * Additional angular.json specific tool functions that are not part of normal project.ts
 */
import { Tree } from '@angular-devkit/schematics';
import { ProjectType, WorkspaceProject } from '../../schematics-core/utility/workspace-models';
import { OptionsAfterSetup } from './options-after-setup';
import { IXliffMergeOptions } from '@ngx-i18nsupport/ngx-i18nsupport';
/**
 * Read and edit functionality on angular.json
 * It allows multiple changes on angular.json file.
 * At the end we call commit() to write angular.json.
 */
export declare class WorkspaceSnaphot {
    private host;
    private context?;
    private readonly workspace;
    /**
     * Create it.
     * Read the file angular.json
     * @param host host tree
     * @param context context (used for logging)
     * @throws SchematicsException when angular.json does not exists.
     */
    constructor(host: Tree, context?: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}> | undefined);
    /**
     * Commit all changes done on workspace.
     * (writes angular.json)
     */
    commit(): void;
    /**
     * Get project from angular.json.
     * @param projectName Name of project
     * @throws an exception if angular.json or project does not exist.
     */
    getProjectByName(projectName: string): WorkspaceProject<ProjectType>;
    /**
     * Return all projects.
     */
    getAllProjects(): {
        name: string;
        project: WorkspaceProject<ProjectType>;
    }[];
    /**
     * Return name of default project.
     */
    getDefaultProjectName(): string | undefined;
    /**
     * Add a build configuration to angular.json.
     * Configuration is stored under architect.build.configurations
     * @param projectName Name of project
     * @param configurationName Name of configuration to add
     * @param configuration configuration object
     */
    addArchitectBuildConfigurationToProject(projectName: string, configurationName: string, configuration: any): void;
    /**
     * Add a serve configuration to angular.json.
     * Configuration is stored under architect.serve.configurations
     * @param projectName Name of project
     * @param configurationName Name of configuration to add
     * @param configuration configuration object
     */
    addArchitectServeConfigurationToProject(projectName: string, configurationName: string, configuration: any): void;
    /**
     * Add a builder to angular.json.
     * Builder is stored under architect
     * @param projectName Name of project
     * @param builderName Name of builder to add
     * @param builder builder in syntax <class|package>:name
     * @param options options
     * @param configuration optional configuration object
     */
    addArchitectBuilderToProject(projectName: string, builderName: string, builder: string, options: any, configuration?: any): void;
    /**
     * Add the build and serve configuration for a given language to angular.json.
     * @param options options containing project etc.
     * @param language the language to be added.
     */
    addLanguageConfigurationToProject(options: OptionsAfterSetup, language: string): void;
    /**
     * Add the builder configuration for xliffmerge builder to angular.json.
     * @param options options containing project etc.
     */
    addBuilderConfigurationToProject(options: OptionsAfterSetup): void;
    /**
     * Read the xliffmerge configuration form the builder options.
     * @param projectName name of project
     */
    getActualXliffmergeConfigFromWorkspace(projectName: string): {
        xliffmergeOptions: IXliffMergeOptions;
        profile?: string;
    } | null;
    /**
     * (private) Add an object to angular.json.
     * Object is stored under path given as parameter.
     * @param objectType Type of object, will be shown in log (either a build or serve configuration or a builder)
     * @param projectName Name of project
     * @param path path in project, like ['architect', 'build', 'configurations']
     * @param objectName Name of object to add
     * @param objectToAdd object to be added (either a configuration or a builder)
     */
    private addObjectToProjectPath;
    /**
     * (private) get a special object from project by navigating a path
     * Throws an exception if path does not exist.
     * @param projectName Name of project.
     * @param project the project read from angular.json
     * @param path path like ['architect', 'build', 'configurations']
     * @return the object at the path position
     * @throws SchematicsException if path does not exist.
     */
    private getObjectFromProjectUsingPath;
    private readAngularJson;
}
