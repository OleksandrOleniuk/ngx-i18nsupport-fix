/**
 * Functions shared between the schematics.
 **/
import { OptionsAfterSetup } from './options-after-setup';
/**
 * Check syntax of language code.
 * (pattern copied from xliffmerge)
 * Must be compatible with XML Schema type xsd:language.
 * Pattern: [a-zA-Z]{1,8}((-|_)[a-zA-Z0-9]{1,8})*
 * @param lang the language code
 * @return true, if valid, false otherwise
 */
export declare function isValidLanguageSyntax(lang: string): boolean;
/**
 * returns the build configuration to be set.
 */
export declare function buildConfigurationForLanguage(options: OptionsAfterSetup, language: string): any;
/**
 * returns the serve configuration to be set.
 */
export declare function serveConfigurationForLanguage(options: OptionsAfterSetup, language: string): any;
/**
 * Add dev dependencies to actual xliffmerge version to package.json
 * @param skipInstall wether install should be skipped
 */
export declare function addXliffmergeDependencyToPackageJson(skipInstall: boolean | undefined): (host: import("@angular-devkit/schematics/src/tree/interface").Tree, context: import("@angular-devkit/schematics").TypedSchematicContext<{}, {}>) => import("@angular-devkit/schematics/src/tree/interface").Tree;
