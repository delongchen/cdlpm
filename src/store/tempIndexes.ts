import {TemplateIndexes} from "../types/TemplateIndex";
import {readFileSync, writeFileSync} from 'fs'
import {join} from 'path'
const CONST = require('../../const.json')

const indexesPath = join(__dirname, CONST.temp, CONST.index)

function getIndexes() {
  try {
    return <TemplateIndexes>JSON.parse(
      readFileSync(indexesPath, 'utf-8')
    )
  } catch (e) {
    return {}
  }
}

const indexes = getIndexes()

function existsIndex(shortcut: string) {
  return indexes[shortcut] === undefined
}

function writeBack() {
  try {
    writeFileSync(indexesPath, JSON.stringify(indexes))
  } catch (e) {
    console.log('write back error')
    console.log(e)
  }
}

export {
  indexes,
  existsIndex,
  writeBack
}
