// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "easydocs" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "easydocs.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Halla på deg!");
    }
  );
  let newExt = vscode.commands.registerCommand(
    "easydocs.popup",
    async function () {
      let variableAmount = 0;
      // ------------

      let descriptionResult = await vscode.window.showInputBox({
        value: "",
        placeHolder: "Short description",
      });

      let variableAmountResult = await vscode.window.showInputBox({
        value: "",
        placeHolder: "How many params?",
        validateInput: (text) => {},
      });
      // ------------

      // ------------

      //   let quickPicker = await vscode.window.showQuickPick(["1", "2", "3"], {});

      // ------------

      // ------------
      let paramResult = "111paramResult111";
      let returnsResult = "111returnsResult111";

      let startLine = vscode.window.activeTextEditor.selection.start.line;
      var selection = vscode.window.activeTextEditor.selection;
      let position = new vscode.Position(startLine, selection.start.character);
      let insertion = `/**\n * ${descriptionResult}\n * @param ${paramResult}\n * @returns ${returnsResult}\n * @example {exampleResult}\n */`;
      return vscode.window.activeTextEditor.edit((editBuilder) => {
        editBuilder.insert(position, insertion);
      });

      // ------------
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(newExt);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
