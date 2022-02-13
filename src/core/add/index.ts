import {readYAML} from "../../utils/fs";
import {TemplateIndex} from "../../types/TemplateIndex";
import { resolve } from 'path'

async function addTemplate(tempPath: string) {
  tempPath = resolve(tempPath)
  const indexYaml = await readYAML<TemplateIndex>(tempPath)

  if (indexYaml === null) {
    return
  }


}
