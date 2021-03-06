# Git-Reminder
Beta

## About
Git Reminder is a simple and useful VSCode extension that provides periodic reminders, along with their facilities, to save users from losing their work.

## Features

* Git Reminder activates on VSCode startup. If the present directory is recognized as a git-initialized directory, then the extension triggers a pull reminder immediately on startup. But if the present directory is not initialized with git, then the extension will remain dormant.

  <img src="https://github.com/shree675/Git-Reminder/blob/main/screenshots/Screenshot%20(171).png" width="600"></img>

* Upon clicking 'Git Pull', the service will ask the user to choose a remote branch, if there is more than one remote branch. If the pull is successful, a message will be displayed acknowledging the successful pull.<sup>[1](https://github.com/shree675/Git-Reminder#notes)</sup>

  <img src="https://github.com/shree675/Git-Reminder/blob/main/screenshots/Screenshot%20(174).png" width="600"></img>

* Apart from the Git Pull reminder, the extension also reminds the user, once in every hour, to commit changes. This prompt will be triggered only if the user has files that are uncommitted.

  <img src="https://github.com/shree675/Git-Reminder/blob/main/screenshots/Screenshot%20(177).png" width="600"></img>

* Clicking on 'Commit', an input field will be displayed on the top where the user must input the commit message.

  <img src="https://github.com/shree675/Git-Reminder/blob/main/screenshots/Screenshot%20(179).png" width="600"></img>

* Upon clicking the <kbd>Enter</kbd> key, if the commit is successful, a message will be displayed acknowledging the successful commit.<sup>[2](https://github.com/shree675/Git-Reminder#notes)</sup>
* Optionally, the user can push the commit on clicking the 'Git Push' button. In case there is more than one remote branch in the repository, the prompt will ask the user to select a branch to perform the push operation.

  <img src="https://github.com/shree675/Git-Reminder/blob/main/screenshots/Screenshot%20(182).png" width="600"></img>

* If the push is successful, a prompt will be displayed with an affirmative response.<sup>[3](https://github.com/shree675/Git-Reminder#notes)</sup>

  <img src="https://github.com/shree675/Git-Reminder/blob/main/screenshots/Screenshot%20(185).png" width="600"></img>

## Activation
The extension will activate automatically on startup. To force it manually, 
* in the VSCode window, perform <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> key binding to open up the command palette.
* type ```git-rem``` and press <kbd>Enter</kbd> to reactivate the extension.

## Version
Currently in Beta. Users may experience bugs.  
PRs are welcome.

## Screenshots
Screenshots are present in [screenshots](https://github.com/shree675/Git-Reminder/blob/main/screenshots/) folder.

## Notes
1. If the pull is unsuccessful, the error message may occasionally not appear.
2. If the commit is not successful, the error message may fail to appear.
3. If the push is unsuccessful, there might be no negative response/message.

In all the above cases, if there is no affirmative response displayed, then the user must consider it as an unsuccessful git operation.  
Therefore, the user must double check the files manually if the git operations were successful.  
Improvements are required to make this extension stable. Ideas and contributions are encouraged and PRs are welcome.
