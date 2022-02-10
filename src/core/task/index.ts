import {addSyncTask, runTasks} from "./taskManager";
import {createTargetDir} from "./tasks/createTargetDir";
import {writePackageJSON} from "./tasks/writePackageJSON";

addSyncTask(createTargetDir)
addSyncTask(writePackageJSON)

export {
  runTasks
}
