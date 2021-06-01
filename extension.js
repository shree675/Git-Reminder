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
		var branches=(await git.branch(['-r'])).all;
	}
	catch(err){
		console.log(err);
	}
	
	setTimeout(async function(){
		if((await git.status()).modified.length!==0){
			vscode.window.showInformationMessage('You have work that is not yet committed. Commit your changes frequently and be safe from losing your work','Commit').then(async e=>{
				console.log('commit');
			})
		}
	},3000);

	vscode.window.showInformationMessage('Keep your work up to date. Do not forget to pull before you start!','Git Pull').then(async e=>{
		if(e===undefined){
			return;
		}
		var foundMain=false;
		for(var i=0;i<branches.length;i++){
			if(branches[i].substring(7,100)==='main'){
				foundMain=true;
				break;
			}
		}
		if(!foundMain){
			vscode.window.showInformationMessage('Git Pull Failed: Could not find main in remote repository','OK');
			return;
		}
		await git.pull('origin','main');
		vscode.window.showInformationMessage('Pulled changes successffully');		
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
		// vscode.window.showInformationMessage('Hello World from Git Reminder!');
		perform(context);
		
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
