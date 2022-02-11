import { readFileSync } from 'fs'
import { join } from 'path'
import {TemplateIndexes} from "../types/TemplateIndex";
const CONST = require('../../const.json')

export function getTemplateIndex() {
  try {
    const indexRaw = readFileSync(
      join(__dirname, CONST.temp, CONST.index),
      'utf-8'
    )

    return <TemplateIndexes>JSON.parse(indexRaw)
  } catch (e: any) {
    return {}
  }
}
