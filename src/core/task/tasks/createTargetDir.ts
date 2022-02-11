import {Task} from "../../../types/TaskTypes";
import { stat, mkdir } from 'fs/promises'

export const createTargetDir: Task = {
  name: 'create target directory',
  async run(config) {
    const {helper, context} = config
    const targetPath = helper.resolveTargetDir('')
    const targetStat = await stat(targetPath)
      .catch(e => {
        if (e.code !== 'ENOENT') {
          throw e
        }
      })

    if (targetStat && targetStat.isDirectory()) {
      context.exists = true
      throw new Error('dir already exists')
    }

    await mkdir(targetPath)
  }
}
