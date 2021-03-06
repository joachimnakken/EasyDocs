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

  let insertDocumentation = vscode.commands.registerCommand(
    "easydocs.insertDocs",
    async function () {
      let variableAmount = 0;
      // ------------

      let descriptionResult = await vscode.window.showInputBox({
        value: "",
        placeHolder: "Short description",
      });
      console.log({ variableAmount });

      let paramResult = await vscode.window.showInputBox({
        value: "",
        placeHolder: "Type in param - empty string for none ",
      });

      // ------------

      let returnsResult = await vscode.window.showQuickPick(
        ["Object", "Array", "Boolean", "Number", "String"],
        { placeHolder: "What does it return?" }
      );

      let exampleResult = await vscode.window.showInputBox({
        value: "",
        placeHolder: "Example: ",
      });
      //   let quickPicker = await vscode.window.showQuickPick(["1", "2", "3"], {});

      // ------------

      // ------------
      let startLine = vscode.window.activeTextEditor.selection.start.line;
      var selection = vscode.window.activeTextEditor.selection;
      console.log({ startLine, selection });
      let position = new vscode.Position(1, 1);
      let insertion = `/**\n * Description: ${descriptionResult}\n * @param {${paramResult}}\n * @returns ${returnsResult}\n * @example ${exampleResult}\n */ \n \n `;
      return vscode.window.activeTextEditor.edit((editBuilder) => {
        editBuilder.insert(position, insertion);
      });

      // ------------
    }
  );

  context.subscriptions.push(insertDocumentation);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
