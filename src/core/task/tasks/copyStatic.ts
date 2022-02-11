import {Task} from "../../../types/TaskTypes";
import {unzip} from "../../../utils/zip";
import path from "path";
import {TemplateTypes} from "../../../types/TemplateTypes";

const CONST = require('../../../../const.json')

function checkAndUnzip(
  tempName: string,
  output: string,
) {

  try {
    unzip(
      path.join(__dirname, CONST.temp, `${tempName}.zip`),
      output
    )
  } catch (e: any) {
    throw e
  }
}

export const copyStatic: Task = {
  name: 'unzip template',
  async run(config) {
    const {helper, template} = config
    const { BASIC } = TemplateTypes
    const output = helper.resolveTargetDir('')

    if (template) {
      checkAndUnzip(BASIC, output);

      if (template !== BASIC) {
        checkAndUnzip(template, output)
      }
    }
  }
}
