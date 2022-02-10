import {addSyncTask, runTasks} from "./taskManager";
import {createTargetDir} from "./tasks/createTargetDir";

addSyncTask(createTargetDir)

export {
  runTasks
}
