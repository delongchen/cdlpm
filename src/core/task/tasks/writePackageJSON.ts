import {Task} from "../../../types/TaskTypes";
import { writeFile } from 'fs/promises'

export const writePackageJSON: Task = {
  name: 'write package.json',
  async run(config) {
    const { git, targetDir, helper } = config
    const gitUrl = `https://github.com/${git.name}/${targetDir}`
    const pkg = {
      name: targetDir,
      version: '0.0.1',
      author: git.name,
      description: '',
      main: './lib/index.js',
      scripts: {
        dev: "tna src/index.ts",
        build: "webpack"
      },
      repository: {
        type: 'git',
        url: `git+${gitUrl}.git`
      },
      keywords: [],
      license: 'ISC',
      bugs: {
        url: `${gitUrl}/issues`
      },
      homepage: `${gitUrl}#readme`,
      devDependencies: {
        "@types/node": "^17.0.12",
        "clean-webpack-plugin": "^4.0.0",
        "ts-loader": "^9.2.6",
        "ts-node": "^10.4.0",
        "typescript": "^4.5.5",
        "webpack": "^5.68.0",
        "webpack-cli": "^4.9.2"
      },
      files: [ 'lib/**/*' ],
      dependencies: {}
    }

    try {
      await writeFile(
        helper.resolveTargetDir('package.json'),
        JSON.stringify(pkg, null, 2)
      )
    } catch (e: any) {
      throw e
    }
  }
}
