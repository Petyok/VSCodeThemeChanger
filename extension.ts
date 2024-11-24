import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const changeThemeCommand = 'timeBasedTheme.changeTheme';

  let lightThemeId: string = "Solarized Light";
  let darkThemeId: string = "Abyss";  

  const changeTheme = () => {
    const now = new Date();
    const hours = now.getHours();
    let theme: string;

    if (hours >= 6 && hours < 18) {
      theme = lightThemeId;
    } else {
      theme = darkThemeId;
    }

    const currentTheme = vscode.workspace.getConfiguration().get<string>('workbench.colorTheme');
    if (currentTheme !== theme) {
        vscode.workspace.getConfiguration().update('workbench.colorTheme', theme, vscode.ConfigurationTarget.Global)
            .then(() => {
                console.log(`Theme changed to ${theme}`);
                vscode.window.showInformationMessage(`Theme changed to ${theme}`);
            }, (error) => {
                console.error(`Failed to change theme to ${theme}: ${error}`);
                vscode.window.showErrorMessage(`Failed to change theme: ${error}`);
            });
    } else {
        console.log(`Theme is already set to ${theme}`);
    }
  };

  const disposable = vscode.commands.registerCommand(changeThemeCommand, changeTheme);
  context.subscriptions.push(disposable);

  setTimeout(changeTheme, 3000); 

  let intervalId: NodeJS.Timeout;
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