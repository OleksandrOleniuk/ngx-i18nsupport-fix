import { experimental, Path } from '@angular-devkit/core';
import { TestingArchitectHost, TestProjectHost } from '@angular-devkit/architect/testing';
import { Architect } from '@angular-devkit/architect';
export declare const workspaceRoot: Path;
export declare const host: TestProjectHost;
export declare const outputPath: Path;
export declare function createArchitect(wsRoot: Path): Promise<{
    workspace: experimental.workspace.Workspace;
    architectHost: TestingArchitectHost;
    architect: Architect;
}>;
