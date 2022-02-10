import {AppConfig} from "./AppConfig";


type TaskRunner = (config: AppConfig) => Promise<void>

export interface Task {
  name: string
  run: TaskRunner
}
