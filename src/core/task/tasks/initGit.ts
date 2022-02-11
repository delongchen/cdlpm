import {Task} from "../../../types/TaskTypes";
import { cd, exec } from 'shelljs'

export const initGit: Task = {
  name: 'init git',
  async run(config) {
    const { targetDir, git } = config

    const gitCmd: string[] = [
      'git init',
      'git add .',
      'git commit -m "auto init"',
      `git remote add origin-ssh git@github.com:${git.name}/${targetDir}.git`,
      `git remote add origin https://github.com/${git.name}/${targetDir}.git`
    ]

    cd(targetDir)

    for (let i = 0; i < gitCmd.length; i++) {
      const result = exec(gitCmd[i], {silent: true})
      if (result.code !== 0) {
        throw new Error(`run git cmd err:\n${gitCmd[i]}`)
      }
    }
  }
}
