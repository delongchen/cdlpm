interface RepositoryInfo {
  type: 'git'
  url: string
}

interface BugsInfo {
  url: string
}

export interface PkgJSON {
  name?: string
  author?: string
  homepage?: string
  repository?: RepositoryInfo
  bugs?: BugsInfo
}
