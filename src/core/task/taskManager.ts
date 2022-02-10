import { Task } from "../../types/TaskTypes";
import {AppConfig} from "../../types/AppConfig";
import { createLogger } from 'bunyan'


const logger = createLogger({
  stream: process.stdout,
  name: 'task'
})

const syncTasks: Task[] = []
const asyncTasks: Task[] = []
const importantTasks: Task[] = []

function addSyncTask(task: Task) {
  syncTasks.push(task)
}

function addAsyncTask(task: Task) {
  asyncTasks.push(task)
}

function addImportantTask(task: Task) {
  importantTasks.push(task)
}

async function runOneTask(task: Task, config: AppConfig) {
  try {
    logger.info(`run ${task.name}`)
    await task.run(config)
  } catch (e: any) {
    logger.error(e)
  }
}

function syncTasksToAsync(): Task {
  return {
    name: 'SyncTasks',
    async run(config) {
      for (let i = 0; i < syncTasks.length; i++) {
        await runOneTask(syncTasks[i], config)
      }
    }
  }
}

async function runTasks(config: AppConfig) {
  try {
    for (let i = 0; i < importantTasks.length; i++) {
      const task = importantTasks[i]
      await task.run(config)
    }
  } catch (e: any) {
    logger.error(e)
    return
  }

  asyncTasks.push(syncTasksToAsync())
  const ps = asyncTasks.map(task => runOneTask(task, config))
  let root = Promise.resolve()
  for (let i = 0; i < ps.length; i++) {
    root = root.then(() => ps[i])
  }
  await root
}

export {
  runTasks,
  addAsyncTask,
  addSyncTask,
  addImportantTask
}
