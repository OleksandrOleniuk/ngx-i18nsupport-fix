"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular-devkit/schematics/testing");
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const workspace_models_1 = require("../../schematics-core/utility/workspace-models");
const common_testing_spec_1 = require("../common/common-testing_spec");
const common_1 = require("../common");
describe('Migration to v1.1', () => {
    function angularJsonProjectConfig(options) {
        const config = JSON.parse(JSON.stringify(projectWithoutXliffmerge));
        config.root = options.isDefaultProject ? '' : `/${options.name}`;
        if (options.useXliffmerge) {
            if (options.useXliffmergeBuilder) {
                // TODO
            }
            else {
                // commandline
                if (options.languages) {
                    options.languages.forEach(lang => {
                        // @ts-ignore
                        config.architect.build.configurations[lang] = {
                            aot: true,
                            outputPath: `dist/${options.name}-${lang}`,
                            i18nFile: `src/i18n/messages.${lang}.xlf`,
                            i18nFormat: 'xlf',
                            i18nLocale: lang
                        };
                    });
                }
            }
        }
        return config;
    }
    function angularJson(projects) {
        const angularJsonContent = JSON.parse(JSON.stringify(angularJsonBaseConfig));
        projects.forEach(options => {
            angularJsonContent.projects[options.name] = angularJsonProjectConfig(options);
        });
        return angularJsonContent;
    }
    function packageJson(options) {
        const packageJsonContent = JSON.parse(JSON.stringify(packageJsonWithoutXliffmerge));
        if (options.createExtractScriptCommandline) {
            let languages = '';
            if (options.useCommandlineForLanguages && options.languages) {
                for (let i = 0; i < options.languages.length; i++) {
                    if (i > 0) {
                        languages += ' ';
                    }
                    languages += options.languages[i];
                }
            }
            const i18nFormat = 'xlf';
            const localeDir = 'src/i18n';
            const defaultLanguage = 'en';
            const scriptName = common_1.extractScriptName(options.project, !!options.isDefaultProject);
            // @ts-ignore
            packageJsonContent.scripts[scriptName] =
                `ng xi18n ${options.project} --i18n-format ${i18nFormat} --output-path ${localeDir} --i18n-locale ${defaultLanguage}\
 && xliffmerge --profile ${options.xliffmergeConfigFilePath} ${languages}`;
        }
        if (options.createExtractScriptBuilder) {
            // @ts-ignore
            packageJsonContent.scripts['extract-i18n'] = `todo`;
        }
        return packageJsonContent;
    }
    function xliffmergeJson(options) {
        return {
            xliffmergeOptions: options.xliffmergeOptions
        };
    }
    function createHost(projects, packageJsons, configs) {
        const map = {};
        map['/angular.json'] = JSON.stringify(angularJson(projects), null, 2);
        packageJsons.forEach(option => {
            const packageJsonPath = (option.isLocalPackageJson) ? `/${option.project}/package.json` : '/package.json';
            map[packageJsonPath] = JSON.stringify(packageJson(option), null, 2);
        });
        configs.forEach(option => {
            map[`/projects/${option.project}/${option.file}`] = JSON.stringify(xliffmergeJson(option), null, 2);
        });
        return new core_1.virtualFs.test.TestHost(map);
    }
    /*
    * The following cases are handled by the migration schemactics:
    * - Workspace projects containing no xliffmerge will not be touched.
    * - Workspace projects containing xliffmerge pre 1.0 will are migrated to 1.1 builder configuration
    * - Workspace projects containing 1.0 xliffmerge command line extraction are migrated to 1.1 builder configuration
     */
    const testRunner = new testing_1.SchematicTestRunner('migrations', require.resolve('../migration-collection.json'));
    const defaultOptions = {};
    let host;
    let appTree;
    const projectWithoutXliffmerge = {
        root: '',
        sourceRoot: 'src',
        projectType: workspace_models_1.ProjectType.Application,
        prefix: 'app',
        schematics: {},
        architect: {
            build: {
                builder: workspace_models_1.Builders.Browser,
                options: {
                    outputPath: 'dist/sampleapp',
                    index: 'src/index.html',
                    main: 'src/main.ts',
                    polyfills: 'src/polyfills.ts',
                    tsConfig: 'src/tsconfig.app.json',
                    assets: [],
                    styles: [
                        'src/styles.css'
                    ],
                    scripts: []
                },
                configurations: {
                    production: {
                        fileReplacements: [
                            {
                                replace: 'src/environments/environment.ts',
                                with: 'src/environments/environment.prod.ts'
                            }
                        ],
                        optimization: true,
                        outputHashing: 'all',
                        sourceMap: false,
                        extractCss: true,
                        namedChunks: false,
                        aot: true,
                        extractLicenses: true,
                        vendorChunk: false,
                        buildOptimizer: true
                    }
                }
            },
            serve: {
                builder: workspace_models_1.Builders.DevServer,
                options: {
                    browserTarget: 'sampleapp:build'
                },
                configurations: {
                    production: {
                        browserTarget: 'sampleapp:build:production'
                    }
                }
            },
            'extract-i18n': {
                builder: workspace_models_1.Builders.ExtractI18n,
                options: {
                    browserTarget: 'sampleapp:build'
                }
            },
            test: {
                builder: workspace_models_1.Builders.Karma,
                options: {
                    main: 'src/test.ts',
                    polyfills: 'src/polyfills.ts',
                    tsConfig: 'src/tsconfig.spec.json',
                    karmaConfig: 'src/karma.conf.js',
                    styles: [
                        'src/styles.css'
                    ],
                    scripts: [],
                    assets: []
                }
            },
            lint: {
                builder: workspace_models_1.Builders.TsLint,
                options: {
                    tsConfig: [
                        'src/tsconfig.app.json',
                        'src/tsconfig.spec.json'
                    ],
                    exclude: [
                        '**/node_modules/**'
                    ]
                }
            }
        }
    };
    const angularJsonBaseConfig = {
        $schema: './node_modules/@angular/cli/lib/config/schema.json',
        version: 1,
        newProjectRoot: 'projects',
        projects: {},
        defaultProject: 'sampleapp'
    };
    const packageJsonWithoutXliffmerge = {
        name: 'blah',
        scripts: {}
    };
    beforeEach(() => {
        appTree = new testing_1.UnitTestTree(new schematics_1.HostTree());
    });
    describe('Migration from pre 1.0 to 1.1', () => {
    });
    describe('Migration from 1.0 to 1.1', () => {
        beforeEach(() => {
        });
        it('should log error on empty workspace', () => {
            host = createHost([], [], []);
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree(host));
            let loggerOutput = '';
            testRunner.logger.subscribe(entry => {
                loggerOutput = loggerOutput + entry.message;
            });
            appTree = testRunner.runSchematic('update-1', defaultOptions, appTree);
            expect(loggerOutput).toContain('Did not find any projects in angular.json');
        });
        it('should log message on workspace with no projects containing xliffmerge', () => {
            const noXliffmergeProject = {
                name: 'projectwithoutxlifmerge'
            };
            const packageOptions = {
                project: ''
            };
            host = createHost([noXliffmergeProject], [packageOptions], []);
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree(host));
            let loggerOutput = '';
            testRunner.logger.subscribe(entry => {
                loggerOutput = loggerOutput + entry.message;
            });
            appTree = testRunner.runSchematic('update-1', defaultOptions, appTree);
            expect(loggerOutput).toContain('Did not find any projects using xliffmerge in angular.json');
        });
        it('should show error when there is a missing config file', () => {
            const xliffmergeProject = {
                name: 'projectWithXliffmerge'
            };
            const packageOptions = {
                project: xliffmergeProject.name,
                createExtractScriptCommandline: true,
                xliffmergeConfigFilePath: 'test/xliffmerge.config',
                languages: ['en', 'de']
            };
            host = createHost([xliffmergeProject], [packageOptions], []);
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree(host));
            let loggerOutput = '';
            testRunner.logger.subscribe(entry => {
                loggerOutput = loggerOutput + entry.message;
            });
            appTree = testRunner.runSchematic('update-1', defaultOptions, appTree);
            expect(loggerOutput).toContain('Could not find config file "//test/xliffmerge.config"');
        });
        it('should migrate extraction via command line to extraction via builder', () => {
            const xliffmergeProject = {
                name: 'projectWithXliffmerge'
            };
            const xliffmergeConfigOptions = {
                project: xliffmergeProject.name,
                file: 'xliffmerge.json',
                xliffmergeOptions: {
                    i18nFormat: 'xlf2',
                    autotranslate: ['fr']
                }
            };
            const globalPackageOptions = {
                project: xliffmergeProject.name,
                createExtractScriptCommandline: true,
                xliffmergeConfigFilePath: `projects/${xliffmergeProject.name}/${xliffmergeConfigOptions.file}`,
                languages: ['en', 'de'],
                useCommandlineForLanguages: true
            };
            host = createHost([xliffmergeProject], [globalPackageOptions], [xliffmergeConfigOptions]);
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree(host));
            let loggerOutput = '';
            testRunner.logger.subscribe(entry => {
                loggerOutput = loggerOutput + entry.message;
            });
            expect(appTree.exists('/projects/projectWithXliffmerge/xliffmerge.json')).toBeTruthy('config file not found');
            appTree = testRunner.runSchematic('update-1', defaultOptions, appTree);
            // Check angular.json changes
            expect(loggerOutput).toContain('added architect builder xliffmerge to project projectWithXliffmerge');
            const angularJsonAfterMigration = common_testing_spec_1.readAngularJson(appTree);
            expect(angularJsonAfterMigration).toBeTruthy();
            // @ts-ignore
            const builderSpec = angularJsonAfterMigration.projects['projectWithXliffmerge'].architect[common_1.xliffmergeBuilderName];
            expect(builderSpec.builder).toBe('@ngx-i18nsupport/tooling:xliffmerge');
            // configuration should be transferred to builder spec
            expect(builderSpec.options.xliffmergeOptions.i18nFormat).toEqual('xlf2');
            expect(builderSpec.options.xliffmergeOptions.autotranslate).toEqual(['fr']);
            expect(builderSpec.options.xliffmergeOptions.languages).toEqual(['en', 'de']);
            // Check package.json changes
            expect(loggerOutput).toContain('added npm script to extract i18n message');
            const packageJsonAfterMigration = common_testing_spec_1.readPackageJson(appTree, undefined);
            expect(packageJsonAfterMigration).toBeTruthy();
            expect(packageJsonAfterMigration.scripts[common_1.extractScriptName(xliffmergeProject.name, false)])
                .toContain(`ng run ${xliffmergeProject.name}:${common_1.xliffmergeBuilderName}`);
            expect(packageJsonAfterMigration.devDependencies[common_1.xliffmergePackage]).toBe(common_1.xliffmergeVersion);
            // Check config file changes
            // config file should have been deleted
            expect(appTree.exists('/projects/projectWithXliffmerge/xliffmerge.json')).toBeFalsy();
        });
        it('should migrate extraction script without project name to script with project name', () => {
            const xliffmergeProject = {
                name: 'projectWithXliffmerge',
                isDefaultProject: false,
            };
            const xliffmergeConfigOptions = {
                project: xliffmergeProject.name,
                file: 'xliffmerge.json',
                xliffmergeOptions: {
                    i18nFormat: 'xlf2',
                    autotranslate: ['fr']
                }
            };
            const globalPackageOptions = {
                project: xliffmergeProject.name,
                isDefaultProject: true,
                createExtractScriptCommandline: true,
                xliffmergeConfigFilePath: `projects/${xliffmergeProject.name}/${xliffmergeConfigOptions.file}`,
                languages: ['en', 'de'],
                useCommandlineForLanguages: true
            };
            host = createHost([xliffmergeProject], [globalPackageOptions], [xliffmergeConfigOptions]);
            appTree = new testing_1.UnitTestTree(new schematics_1.HostTree(host));
            let loggerOutput = '';
            testRunner.logger.subscribe(entry => {
                loggerOutput = loggerOutput + entry.message;
            });
            expect(appTree.exists('/projects/projectWithXliffmerge/xliffmerge.json')).toBeTruthy('config file not found');
            appTree = testRunner.runSchematic('update-1', defaultOptions, appTree);
            // Check angular.json changes
            expect(loggerOutput).toContain('removed script extract-i18n ');
            const angularJsonAfterMigration = common_testing_spec_1.readAngularJson(appTree);
            expect(angularJsonAfterMigration).toBeTruthy();
            // @ts-ignore
            const builderSpec = angularJsonAfterMigration.projects['projectWithXliffmerge'].architect[common_1.xliffmergeBuilderName];
            expect(builderSpec.builder).toBe('@ngx-i18nsupport/tooling:xliffmerge');
            // configuration should be transferred to builder spec
            expect(builderSpec.options.xliffmergeOptions.i18nFormat).toEqual('xlf2');
            expect(builderSpec.options.xliffmergeOptions.autotranslate).toEqual(['fr']);
            expect(builderSpec.options.xliffmergeOptions.languages).toEqual(['en', 'de']);
            // Check package.json changes
            expect(loggerOutput).toContain('added npm script to extract i18n message');
            const packageJsonAfterMigration = common_testing_spec_1.readPackageJson(appTree, undefined);
            expect(packageJsonAfterMigration).toBeTruthy();
            expect(packageJsonAfterMigration.scripts[common_1.extractScriptName(xliffmergeProject.name, false)])
                .toContain(`ng run ${xliffmergeProject.name}:${common_1.xliffmergeBuilderName}`);
            expect(packageJsonAfterMigration.devDependencies[common_1.xliffmergePackage]).toBe(common_1.xliffmergeVersion);
            // Check config file changes
            // config file should have been deleted
            expect(appTree.exists('/projects/projectWithXliffmerge/xliffmerge.json')).toBeFalsy();
        });
    });
});
//# sourceMappingURL=index_spec.js.map