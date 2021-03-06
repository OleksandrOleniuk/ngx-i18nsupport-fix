/**
 * Some common functions used by testcases.
 */
import { UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { Schema as ApplicationOptions } from '@schematics/angular/application/schema';
import { Schema as LibraryOptions } from '@schematics/angular/library/schema';
import { IPackageJson } from './package-json-snapshot';
import { WorkspaceSchema } from '../../schematics-core/utility/workspace-models';
import { IXliffMergeOptions } from '@ngx-i18nsupport/ngx-i18nsupport';
export declare const workspaceOptions: WorkspaceOptions;
export declare const appOptions: ApplicationOptions;
export declare const libOptions: LibraryOptions;
export declare function readAsJson<T>(tree: UnitTestTree, path: string): T;
export declare function readPackageJson(tree: UnitTestTree, projectName?: string): IPackageJson;
export declare function readAngularJson(tree: UnitTestTree): WorkspaceSchema;
export declare function readXliffmergeJson(tree: UnitTestTree, projectName: string): {
    xliffmergeOptions: IXliffMergeOptions;
};
/**
 * Read the xliffmerge configuration form the builder options.
 * @param tree Tree
 * @param projectName name of project
 */
export declare function readXliffmergeConfigFromWorkspace(tree: UnitTestTree, projectName: string): {
    xliffmergeOptions: IXliffMergeOptions;
} | null;
