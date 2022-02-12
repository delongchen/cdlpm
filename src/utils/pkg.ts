import {join} from 'path'
import {TemplateIndexes} from "../types/TemplateIndex";
import {readJSON} from "./fs";

const CONST = require('../../const.json')

export async function getTemplateIndex() {
  return await readJSON<TemplateIndexes>(
    join(__dirname, CONST.temp, CONST.index)
  ) ?? {}
}
