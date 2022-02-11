import {Task} from "../../../types/TaskTypes";
import {unzip} from "../../../utils/zip";
import path from "path";
import {TemplateTypes} from "../../../types/TemplateTypes";
import {TemplateIndexes} from "../../../types/TemplateIndex";
const CONST = require('../../../../const.json')

function checkAndUnzip(
  tempName: string,
  output: string,
  indexes: TemplateIndexes) {

  if (indexes[tempName] !== undefined) {
    try {
      unzip(
        path.join(__dirname, CONST.temp, `${tempName}.zip`),
        output
      )
    } catch (e: any) {
      throw e
    }
  } else {
    throw new Error(`no template named ${tempName}`)
  }
}

export const copyStatic: Task = {
  name: 'unzip template',
  async run(config) {
    const { helper, template, indexes } = config
    const output = helper.resolveTargetDir('')

    if (template) {
      checkAndUnzip(
        TemplateTypes.BASIC,
        output,
        indexes
      );

      if (template !== TemplateTypes.BASIC) {
        checkAndUnzip(
          template,
          output,
          indexes
        )
      }
    }
  }
}
