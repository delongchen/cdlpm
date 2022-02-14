import {readFileSync} from 'fs'
import {join} from 'path'
import {AppConfig} from "../types/AppConfig";
import { parse } from 'yaml'
import CONST from './CONST'


function readConfig() {
  try {
    const result = parse(
      readFileSync(
        join(__dirname, CONST.config_yaml),
        'utf-8'
      )
    )

    const keys = Object.keys(defConfig)
    keys.forEach(key => {
      if (result[key] === undefined) {
        result[key] = Reflect.get(defConfig, key)
      }
    })
    return <AppConfig>result
  } catch (e) {
    return defConfig
  }
}

const defConfig: AppConfig = {
  port: 11451
}

export const appConfig = readConfig()
export {
  CONST
}
