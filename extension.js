const vscode = require("vscode");
const Git = require("simple-git").default;

const options = {
    baseDir: __dirname,
    binary: "git",
    maxConcurrentProcesses: 6,
};
const git = Git(options);

var branches;

/**
 * @param {vscode.ExtensionContext} context
 */

async function perform(context) {
    try {
        var allRemotes = await git.getRemotes(true);
        if (allRemotes.length !== 0) {
            await git.fetch();
            branches = (await git.branch(["-r"])).all;
        }
    } catch (err) {
        console.log(err);
    }

    setTimeout(async () => {
        if ((await git.status()).modified.length !== 0) {
            vscode.window
                .showInformationMessage(
                    "You have work that is not yet committed. Commit your changes frequently and be safe from losing your work",
                    "Commit"
                )
                .then(async (e) => {
                    try {
                        if (e !== undefined) {
                            vscode.window.showInputBox({ prompt: "Type in your commit message" }).then(async (message) => {
                                if (message === undefined) {
                                    vscode.window.showInformationMessage("Commit canceled");
                                } else {
                                    await git.add(".");
                                    await git
                                        .commit(message)
                                        .then(() => {
                                            vscode.window.showInformationMessage("Files staged and committed successfully");
                                        })
                                        .catch((err) => {
                                            var errstr = "Error: " + err;
                                            vscode.window.showInformationMessage(errstr);
                                        });
                                }
                            });
                        }
                    } catch (err) {
                        vscode.window.showInformationMessage(err);
                    }
                });
        }
    }, 500000);

    setTimeout(async function () {
        if ((await git.status()).modified.length !== 0) {
            vscode.window
                .showInformationMessage(
                    "You have work that is not yet committed. Commit your changes frequently and be safe from losing your work",
                    "Commit"
                )
                .then(async (e) => {
                    if (e !== undefined) {
                        vscode.window.showInputBox({ prompt: "Type in your commit message" }).then(async (message) => {
                            if (message === undefined) {
                                vscode.window.showInformationMessage("Commit canceled");
                            } else {
                                try {
                                    await git.add(".");
                                    await git
                                        .commit(message)
                                        .then(() => {
                                            vscode.window.showInformationMessage("Files staged and committed successfully");
                                        })
                                        .catch((err) => {
                                            var errstr = "Error: " + err;
                                            vscode.window.showInformationMessage(errstr);
                                        });
                                } catch (err) {
                                    vscode.window.showInformationMessage(err);
                                }

                                vscode.window
                                    .showInformationMessage("Would you like to push your commits?", "Git Push")
                                    .then(async (option) => {
                                        if (option !== undefined) {
                                            var chosenBranch;
                                            if (branches.length > 1) {
                                                for (var i = 0; i < branches.length; i++) {
                                                    branches[i] = branches[i].substring(7, 100);
                                                }
                                                await vscode.window
                                                    .showInformationMessage(
                                                        "Multiple remote branches detected. Select a branch you want to push to",
                                                        ...branches
                                                    )
                                                    .then(async (option) => {
                                                        chosenBranch = option;
                                                    });
                                            } else {
                                                chosenBranch = "main";
                                            }

                                            if (chosenBranch !== undefined) {
                                                try {
                                                    await git
                                                        .push("origin", "HEAD:" + chosenBranch)
                                                        .then(async () => {
                                                            var showMessage = "Pushed commits to " + chosenBranch + " successfully";
                                                            await vscode.window.showInformationMessage(showMessage);
                                                        })
                                                        .catch(async (err) => {
                                                            await vscode.window.showInformationMessage(err);
                                                        });
                                                } catch (err) {
                                                    await vscode.window.showInformationMessage(err);
                                                }
                                            }
                                        }
                                    });
                            }
                        });
                    }
                });
        }
    }, 0);

    vscode.window
        .showInformationMessage("Keep your work up to date. Do not forget to pull before you start!", "Git Pull")
        .then(async (e) => {
            if (e !== undefined) {
                var chosenBranch;
                if (branches.length > 1) {
                    for (var i = 0; i < branches.length; i++) {
                        branches[i] = branches[i].substring(7, 100);
                    }
                    await vscode.window
                        .showInformationMessage(
                            "Multiple remote branches detected. Select a branch you want to pull from",
                            ...branches
                        )
                        .then(async (option) => {
                            chosenBranch = option;
                        });
                } else {
                    chosenBranch = "main";
                }

                if (chosenBranch !== undefined) {
                    try {
                        await git
                            .pull("origin", chosenBranch)
                            .then(async () => {
                                var showMessage = "Pulled changes from " + chosenBranch + " successfully";
                                await vscode.window.showInformationMessage(showMessage);
                            })
                            .catch(async (err) => {
                                await vscode.window.showInformationMessage(err);
                            });
                    } catch (err) {
                        await vscode.window.showInformationMessage(err);
                    }
                }
            }
        });
}

async function temp(context) {
    try {
        console.log(await git.push("origin", "main"));
    } catch (err) {
        console.log(err);
    }
}

function activate(context) {
    console.log('Congratulations, your extension "git-reminder" is now active!');

    perform(context);

    // temp(context);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("git-reminder.man", function () {
        // The code you place here will be executed every time your command is executed
        // vscode.window.showInformationMessage('Hello World from Git Reminder!');
        perform(context);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
