import {AppConfig} from "../../types/AppConfig";
import {addImportantTask, runTasks} from "./taskManager";

import {createTargetDir} from "./vip/createTargetDir";

addImportantTask(createTargetDir)

export async function run(config: AppConfig) {
  await runTasks(config)
}
