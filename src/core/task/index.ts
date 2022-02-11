import {addSyncTask, runTasks} from "./taskManager";
import {createTargetDir} from "./tasks/createTargetDir";
import {writePackageJSON} from "./tasks/writePackageJSON";
import {copyStatic} from "./tasks/copyStatic";
import {initGit} from "./tasks/initGit";

addSyncTask(createTargetDir)
addSyncTask(writePackageJSON)
addSyncTask(copyStatic)
addSyncTask(initGit)

export {
  runTasks
}
