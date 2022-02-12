import {Task} from "../../../types/TaskTypes";
import { exec, which } from 'shelljs'


const pms: string[] = [
  'yarn',
  'npm'
]

export const installPackage: Task = {
  name: 'install node packages',
  async run(config) {
    const { install } = config
    let installed = false
    if (!install) {
      return
    }

    for (let i = 0; i < pms.length; i++) {
      const pm = pms[i]

      if (which(pm)) {
        const result = exec(`${pm} install`)
        if (result.code !== 0) {
          throw new Error('install failed')
        }
        installed = true
        break
      }
    }

    if (!installed) {
      console.log('package not find, skip install')
    }
  }
}
