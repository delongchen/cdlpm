import {Task} from "../../../types/TaskTypes";
import {writeFile} from 'fs/promises'
import {readJSON} from "../../../utils/fs";
import {PkgJSON} from "../../../types/PkgJSON";

const CONST = require('../../../../const.json')


export const writePackageJSON: Task = {
  name: 'write package.json',
  async run(config) {
    const {git, targetDir, helper: {resolveTargetDir}} = config

    function addInfo(gitUrl: string, pkg: PkgJSON) {
      pkg.name = targetDir
      pkg.author = git.name
      pkg.repository = {
        type: 'git',
        url: `git+${gitUrl}.git`
      }
      pkg.bugs = {
        url: `${gitUrl}/issues`
      }
      pkg.homepage = `${gitUrl}#readme`
      return pkg
    }

    const pkgJSON = await readJSON<PkgJSON>(
      resolveTargetDir(CONST.pkg)
    )
    const gitUrl = `https://github.com/${git.name}/${targetDir}`
    const toWrite = addInfo(gitUrl, pkgJSON ?? {})

    await writeFile(
      resolveTargetDir(CONST.pkg),
      JSON.stringify(toWrite, null, 2)
    )
  }
}
