import {addSyncTask, createAsyncTask, runTasks} from "./taskManager";
import {createTargetDir} from "./tasks/createTargetDir";
import {writePackageJSON} from "./tasks/writePackageJSON";
import {copyStatic} from "./tasks/copyStatic";

addSyncTask(createTargetDir)
addSyncTask(writePackageJSON)
addSyncTask(copyStatic)

export {
  runTasks
}
