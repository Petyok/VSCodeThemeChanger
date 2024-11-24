"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    const changeThemeCommand = 'timeBasedTheme.changeTheme';
    let lightThemeId = "Solarized Light";
    let darkThemeId = "Abyss";
    const changeTheme = () => {
        const now = new Date();
        const hours = now.getHours();
        let theme;
        if (hours >= 6 && hours < 18) {
            theme = lightThemeId;
        }
        else {
            theme = darkThemeId;
        }
        const currentTheme = vscode.workspace.getConfiguration().get('workbench.colorTheme');
        if (currentTheme !== theme) {
            vscode.workspace.getConfiguration().update('workbench.colorTheme', theme, vscode.ConfigurationTarget.Global)
                .then(() => {
                console.log(`Theme changed to ${theme}`);
                vscode.window.showInformationMessage(`Theme changed to ${theme}`);
            }, (error) => {
                console.error(`Failed to change theme to ${theme}: ${error}`);
                vscode.window.showErrorMessage(`Failed to change theme: ${error}`);
            });
        }
        else {
            console.log(`Theme is already set to ${theme}`);
        }
    };
    const disposable = vscode.commands.registerCommand(changeThemeCommand, changeTheme);
    context.subscriptions.push(disposable);
    setTimeout(changeTheme, 3000);
    let intervalId;
    const changeThemeInterval = () => {
        console.log("changeThemeInterval started");
        changeTheme();
        console.log("changeThemeInterval finished");
    };
    intervalId = setInterval(changeThemeInterval, 60000);
    context.subscriptions.push({
        dispose: () => clearInterval(intervalId)
    });
}
//# sourceMappingURL=extension.js.map