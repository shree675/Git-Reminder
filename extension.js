// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');
const Git = require('simple-git').default;

/**
 * @param {vscode.ExtensionContext} context
 */

async function perform(context){	

	const options = {
		baseDir: __dirname,
		binary: 'git',
		maxConcurrentProcesses: 6,
	};

	const git = Git(options);

	try{
		var allRemotes=await git.getRemotes(true);
		console.log(allRemotes);
		if(allRemotes.length===0){
			return;
		}
		var push=allRemotes[0]["refs"]["fetch"];
		console.log((await git.branch(['-r'])));
	}
	catch(err){
		console.log(err);
	}

	vscode.window.showInformationMessage('Keep your work up to date. Do not forget to pull before you start!','Git Pull').then(e=>{
		console.log(e);
	});
}

function activate(context) {
	console.log('Congratulations, your extension "git-reminder" is now active!');

	perform(context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('git-reminder.man', function () {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage('Hello World from Git Reminder!');
		
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
