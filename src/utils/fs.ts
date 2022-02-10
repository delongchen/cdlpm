import {AppHelper} from "../types/AppConfig";
import { join } from 'path'

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
