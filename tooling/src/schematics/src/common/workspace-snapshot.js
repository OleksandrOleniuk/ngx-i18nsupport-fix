"use strict";
/**
 * Additional angular.json specific tool functions that are not part of normal project.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const constants_1 = require("./constants");
const common_functions_1 = require("./common-functions");
/**
 * Read and edit functionality on angular.json
 * It allows multiple changes on angular.json file.
 * At the end we call commit() to write angular.json.
 */
class WorkspaceSnaphot {
    /**
     * Create it.
     * Read the file angular.json
     * @param host host tree
     * @param context context (used for logging)
     * @throws SchematicsException when angular.json does not exists.
     */
    constructor(host, context) {
        this.host = host;
        this.context = context;
        this.workspace = this.readAngularJson();
    }
    /**
     * Commit all changes done on workspace.
     * (writes angular.json)
     */
    commit() {
        const newAngularJsonContent = JSON.stringify(this.workspace, null, 2);
        this.host.overwrite('/angular.json', newAngularJsonContent);
    }
    /**
     * Get project from angular.json.
     * @param projectName Name of project
     * @throws an exception if angular.json or project does not exist.
     */
    getProjectByName(projectName) {
        const projects = this.workspace.projects;
        if (!projects) {
            throw new schematics_1.SchematicsException('angular.json does not contain projects');
        }
        const project = projects[projectName];
        if (!project) {
            throw new schematics_1.SchematicsException('angular.json does not contain project ' + projectName);
        }
        return project;
    }
    /**
     * Return all projects.
     */
    getAllProjects() {
        return Object.keys(this.workspace.projects).map(projectName => {
            return {
                name: projectName,
                project: this.workspace.projects[projectName]
            };
        });
    }
    /**
     * Return name of default project.
     */
    getDefaultProjectName() {
        return this.workspace.defaultProject;
    }
    /**
     * Add a build configuration to angular.json.
     * Configuration is stored under architect.build.configurations
     * @param projectName Name of project
     * @param configurationName Name of configuration to add
     * @param configuration configuration object
     */
    addArchitectBuildConfigurationToProject(projectName, configurationName, configuration) {
        return this.addObjectToProjectPath(projectName, 'build configuration', ['architect', 'build', 'configurations'], configurationName, configuration);
    }
    /**
     * Add a serve configuration to angular.json.
     * Configuration is stored under architect.serve.configurations
     * @param projectName Name of project
     * @param configurationName Name of configuration to add
     * @param configuration configuration object
     */
    addArchitectServeConfigurationToProject(projectName, configurationName, configuration) {
        return this.addObjectToProjectPath(projectName, 'serve configuration', ['architect', 'serve', 'configurations'], configurationName, configuration);
    }
    /**
     * Add a builder to angular.json.
     * Builder is stored under architect
     * @param projectName Name of project
     * @param builderName Name of builder to add
     * @param builder builder in syntax <class|package>:name
     * @param options options
     * @param configuration optional configuration object
     */
    addArchitectBuilderToProject(projectName, builderName, builder, options, configuration) {
        const builderSpec = {
            builder: builder,
            options: options
        };
        if (configuration) {
            builderSpec.configuration = configuration;
        }
        return this.addObjectToProjectPath(projectName, 'architect builder', ['architect'], builderName, builderSpec);
    }
    /**
     * Add the build and serve configuration for a given language to angular.json.
     * @param options options containing project etc.
     * @param language the language to be added.
     */
    addLanguageConfigurationToProject(options, language) {
        this.addArchitectBuildConfigurationToProject(options.project, language, common_functions_1.buildConfigurationForLanguage(options, language));
        if (this.context) {
            this.context.logger.info(`added build configuration for language "${language}" to project "${options.project}"`);
        }
        this.addArchitectServeConfigurationToProject(options.project, language, common_functions_1.serveConfigurationForLanguage(options, language));
        if (this.context) {
            this.context.logger.info(`added serve configuration for language "${language}" to project "${options.project}"`);
        }
    }
    /**
     * Add the builder configuration for xliffmerge builder to angular.json.
     * @param options options containing project etc.
     */
    addBuilderConfigurationToProject(options) {
        const baseDir = (options.isDefaultProject) ? '' : `projects/${options.project}/`;
        const builderOptions = {
            xliffmergeOptions: {
                i18nFormat: options.i18nFormat,
                srcDir: `${baseDir}${options.srcDir}`,
                genDir: `${baseDir}${options.genDir}`,
                defaultLanguage: options.parsedLanguages[0],
                languages: options.parsedLanguages
            }
        };
        this.addArchitectBuilderToProject(options.project, constants_1.xliffmergeBuilderName, constants_1.xliffmergeBuilderSpec, builderOptions);
        if (this.context) {
            this.context.logger.info(`added builder xliffmerge to project "${options.project}"`);
        }
    }
    /**
     * Read the xliffmerge configuration form the builder options.
     * @param projectName name of project
     */
    getActualXliffmergeConfigFromWorkspace(projectName) {
        if (!projectName) {
            return null;
        }
        const project = this.getProjectByName(projectName);
        if (!project || !project.architect) {
            return null;
        }
        const xliffmergeBuilder = project.architect['xliffmerge'];
        if (!xliffmergeBuilder || !xliffmergeBuilder.options) {
            return null;
        }
        if (xliffmergeBuilder.options && xliffmergeBuilder.options.xliffmergeOptions) {
            return xliffmergeBuilder.options;
        }
        else if (xliffmergeBuilder.options.profile) {
            // read profile
            const content = this.host.read(xliffmergeBuilder.options.profile);
            if (!content) {
                return null;
            }
            const contentString = content.toString('UTF-8');
            const profileContent = JSON.parse(contentString);
            return {
                xliffmergeOptions: profileContent.xliffmergeOptions,
                profile: xliffmergeBuilder.options.profile
            };
        }
        else {
            return null;
        }
    }
    /**
     * (private) Add an object to angular.json.
     * Object is stored under path given as parameter.
     * @param objectType Type of object, will be shown in log (either a build or serve configuration or a builder)
     * @param projectName Name of project
     * @param path path in project, like ['architect', 'build', 'configurations']
     * @param objectName Name of object to add
     * @param objectToAdd object to be added (either a configuration or a builder)
     */
    addObjectToProjectPath(projectName, objectType, path, objectName, objectToAdd) {
        const projects = this.workspace.projects;
        if (!projects) {
            throw new schematics_1.SchematicsException('angular.json does not contain projects');
        }
        const project = projects[projectName];
        if (!project) {
            throw new schematics_1.SchematicsException('angular.json does not contain project ' + projectName);
        }
        const container = this.getObjectFromProjectUsingPath(projectName, project, path);
        const addedOrChanged = (container[objectName]) ? 'changed' : 'added';
        container[objectName] = objectToAdd;
        if (this.context) {
            this.context.logger.info(`${addedOrChanged} ${objectType} ${objectName} to project ${projectName}`);
        }
    }
    /**
     * (private) get a special object from project by navigating a path
     * Throws an exception if path does not exist.
     * @param projectName Name of project.
     * @param project the project read from angular.json
     * @param path path like ['architect', 'build', 'configurations']
     * @return the object at the path position
     * @throws SchematicsException if path does not exist.
     */
    getObjectFromProjectUsingPath(projectName, project, path) {
        let object = project;
        let currentPath = '';
        for (let i = 0; i < path.length; i++) {
            currentPath = currentPath + '.' + path[i];
            object = object[path[i]];
            if (!object) {
                throw new schematics_1.SchematicsException('angular.json does not contain ' + currentPath + ' in project ' + projectName);
            }
        }
        return object;
    }
    /*
    private helper function to read angular.json
     */
    readAngularJson() {
        const noAngularJsonMsg = 'file angular.json not found';
        if (this.host.exists('/angular.json')) {
            const content = this.host.read('/angular.json');
            if (!content) {
                throw new schematics_1.SchematicsException(noAngularJsonMsg);
            }
            const sourceText = content.toString('utf-8');
            return JSON.parse(sourceText);
        }
        else {
            throw new schematics_1.SchematicsException(noAngularJsonMsg);
        }
    }
}
exports.WorkspaceSnaphot = WorkspaceSnaphot;
//# sourceMappingURL=workspace-snapshot.js.map