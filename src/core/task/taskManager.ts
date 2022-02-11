import { Task } from "../../types/TaskTypes";
import {AppConfig} from "../../types/AppConfig";
import { createLogger } from 'bunyan'


const logger = createLogger({
  stream: process.stdout,
  name: 'task'
})

const syncTasks: Task[] = []
export function addSyncTask(task: Task) {
  syncTasks.push(task)
}

async function runAsyncTask(task: Task, config: AppConfig) {
  try {
    logger.info(`${task.name} running`)
    await task.run(config)
  } catch (e: any) {
    logger.error(task.name)
    logger.error(e)
    throw { name: task.name, e }
  }
}

export function createAsyncTask(name: string, tasks: Task[], config: AppConfig): Task {
  return {
    name,
    async run() {
      const ps = tasks.map(task => runAsyncTask(task, config))
      const errs: string[] = []
      let root = Promise.resolve()
      for (let i = 0; i < ps.length; i++) {
        root = root.then(() => ps[i])
          .catch(reason => {
            errs.push(reason.name)
          })
      }
      await root
      if (errs.length) {
        throw new Error(`${name} err: [${errs}]`)
      }
    }
  }
}

export async function runTasks(config: AppConfig) {
  try {
    for (let i = 0; i < syncTasks.length; i++) {
      const task = syncTasks[i]
      logger.info(`run ${task.name}`)
      await task.run(config)
    }
  } catch (e: any) {
    logger.error(e)
    return
  }
}
