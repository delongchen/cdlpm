import {Task} from "../../types/TaskTypes";
import {AppConfig} from "../../types/AppConfig";
import {rm} from "fs/promises";

const syncTasks: Task[] = []

export function addSyncTask(task: Task) {
  syncTasks.push(task)
}

async function runAsyncTask(task: Task, config: AppConfig) {
  try {
    await task.run(config)
  } catch (e: any) {
    throw {name: task.name, e}
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

async function cleanUp(path: string) {
  return rm(path, { force: true, recursive: true })
}

export async function runTasks(config: AppConfig) {
  console.log(`creating package ${config.template}`)
  for (let i = 0; i < syncTasks.length; i++) {
    const task = syncTasks[i]
    try {
      const start = Date.now()
      await task.run(config)
      const end = Date.now()
      console.log(`run [${i + 1}/${syncTasks.length}]: ${task.name} [${end - start} ms]`)
    } catch (e: any) {
      console.log(`task '${task.name}' throws error`)
      console.error(e)

      if (!config.context.exists) {
        console.log('start cleanup')
        await cleanUp(config.helper.resolveTargetDir(''))
      }

      break
    }
  }

  console.log('run tasks finished')
}
