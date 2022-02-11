import {Task} from "../../../types/TaskTypes";
import {unzip} from "../../../utils/zip";
import path from "path";
const CONST = require('../../../../const.json')


export const copyStatic: Task = {
  name: 'copy static',
  async run(config) {
    const { helper } = config
    await unzip(
      path.join(__dirname, CONST.temp, 'basic.zip'),
      helper.resolveTargetDir('')
    )
  }
}
