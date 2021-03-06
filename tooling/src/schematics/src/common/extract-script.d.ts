import { OptionsAfterSetup } from './options-after-setup';
export declare class ExtractScript {
    private _name;
    private _content;
    private static fullExtractScript;
    /**
     * Create the script.
     */
    static createExtractScript(options: OptionsAfterSetup): ExtractScript;
    constructor(_name: string, _content: string);
    readonly name: string;
    readonly content: string;
    usesXliffmergeCommandline(): boolean;
    usesXliffmergeBuilder(): boolean;
    xliffmergeProfile(): string | null;
    projectName(): string | null;
    /**
     * Parse languages from command line.
     * Commandline contains something like xliffmerge [options] lang1 lang2 ...
     * Returns [lang1, lang2, ..]
     * */
    languages(): string[];
}
