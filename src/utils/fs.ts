import {AppHelper, GitUserInfo} from "../types/AppConfig";
import { join } from 'path'
import { exec } from 'shelljs'

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
