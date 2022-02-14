import {AppHelper, GitUserInfo} from "../types/AppConfig";
import { join } from 'path'
import { exec } from 'shelljs'
import { readFile } from 'fs/promises'
import { parse as parseYAML } from 'yaml'

export const createConfigHelper = (targetDir: string): AppHelper => {
  const workDir = process.cwd()
  const targetPath = join(workDir, targetDir)

  return {
    resolveTargetDir(path) {
      return join(targetPath, path)
    },
    resolveWorkDir(path) {
      return join(workDir, path)
    }
  }
}

function getExecStr(cmd: string) {
  const result = exec(cmd, { silent: true })
  return result.toString().trim()
}

export function getGitInfo(): GitUserInfo {
  const gitConfig = 'git config user'
  return {
    name: getExecStr(`${gitConfig}.name`),
    email: getExecStr(`${gitConfig}.email`)
  }
}

function createReadDataApi(parser: (data: string) => any) {
  return async <T = any>(path: string) => {
    try {
      const raw = await readFile(path, 'utf-8')
      const result = parser(raw)
      return <T>result
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        return null
      }
      throw e
    }
  }
}

export const readJSON = createReadDataApi(JSON.parse)
export const readYAML = createReadDataApi(parseYAML)

