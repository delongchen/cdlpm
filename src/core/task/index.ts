import {addSyncTask, runTasks} from "./taskManager";
import {createTargetDir} from "./tasks/createTargetDir";
import {writePackageJSON} from "./tasks/writePackageJSON";
import {copyStatic} from "./tasks/copyStatic";
import {initGit} from "./tasks/initGit";
import {installPackage} from "./tasks/installPackage";

addSyncTask(createTargetDir)
addSyncTask(copyStatic)
addSyncTask(writePackageJSON)
addSyncTask(installPackage)
addSyncTask(initGit)

export {
  runTasks
}
