export interface AppHelper {
  resolveWorkDir: (path: string) => string
  resolveTargetDir: (path: string) => string
}

export interface AppConfig {
  targetDir: string
  template: string
  workDir: string
  helper: AppHelper
}
