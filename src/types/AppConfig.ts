import {TemplateIndexes} from "./TemplateIndex";

export interface AppHelper {
  resolveWorkDir: (path: string) => string
  resolveTargetDir: (path: string) => string
}

export interface GitUserInfo {
  name: string
  email: string
}

export interface AppConfig {
  targetDir: string
  template: string
  workDir: string
  indexes: TemplateIndexes
  git: GitUserInfo
  helper: AppHelper
}
