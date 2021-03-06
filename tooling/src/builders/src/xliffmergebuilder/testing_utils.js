"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular-devkit/core");
const testing_1 = require("@angular-devkit/architect/testing");
const node_1 = require("@angular-devkit/architect/node");
const architect_1 = require("@angular-devkit/architect");
/**
 * We are using a test workspace from the test folder.
 * In this workspace the xliffmerge builder is already configured.
 */
const ngxi18nsupportRoot = core_1.normalize(core_1.join(core_1.normalize(__dirname), '../../../..'));
exports.workspaceRoot = core_1.join(ngxi18nsupportRoot, 'src/builders/test/hello-world-app/');
exports.host = new testing_1.TestProjectHost(exports.workspaceRoot);
exports.outputPath = core_1.normalize('dist');
function createArchitect(wsRoot) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const registry = new core_1.schema.CoreSchemaRegistry();
        registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
        const workspaceSysPath = core_1.getSystemPath(wsRoot);
        const workspace = yield core_1.experimental.workspace.Workspace.fromPath(exports.host, exports.host.root(), registry);
        const architectHost = new testing_1.TestingArchitectHost(workspaceSysPath, workspaceSysPath, new node_1.WorkspaceNodeModulesArchitectHost(workspace, workspaceSysPath));
        const architect = new architect_1.Architect(architectHost, registry);
        return {
            workspace,
            architectHost: architectHost,
            architect,
        };
    });
}
exports.createArchitect = createArchitect;
//# sourceMappingURL=testing_utils.js.map