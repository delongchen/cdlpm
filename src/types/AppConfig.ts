import {TemplateIndexes} from "./TemplateIndex";

export interface AppHelper {
  resolveWorkDir: (path: string) => string
  resolveTargetDir: (path: string) => string
}

export interface GitUserInfo {
  name: string
  email: string
}

interface AppContext {
  exists: boolean
}

export interface AppConfig {
  targetDir: string
  template: string
  workDir: string
  indexes: TemplateIndexes
  git: GitUserInfo
  context: AppContext
  helper: AppHelper
}
