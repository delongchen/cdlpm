import { program } from 'commander'
import {TemplateTypes} from "./types/TemplateTypes";
import {AppConfig} from "./types/AppConfig";
import {createConfigHelper, getGitInfo} from "./utils/fs";
import {runTasks} from "./core/task";
import { which } from 'shelljs'
import {getTemplateIndex} from "./utils/pkg";
const { version, description } = require('../package.json')

const indexes = getTemplateIndex()

async function start() {
  program
    .name('cdlpm')
    .usage('create <dirname> [template]')
    .version(version)
    .description(description)

  const tempNames = Object.keys(indexes)
  let tempHelps = 'Templates:\n'
  for (const tempName of tempNames) {
    const tempInfo = indexes[tempName]
    tempHelps += `  ${tempName}, ${tempInfo.name}, ${tempInfo.desc}\n`
  }
  program.addHelpText('before', tempHelps)

  program.command('create')
    .argument('<DirName>', 'name of dir')
    .argument('[template]', 'template', TemplateTypes.BASIC)
    .description('create an empty package by DirName')
    .action(async (targetDir, template) => {
      if (indexes[template] === undefined) {
        console.log(`no such template ${template}`)
        return
      }

      const workDir = process.cwd()

      if (!which('git')) {
        console.log('Sorry, this script requires git')
        return
      }

      const config: AppConfig = {
        targetDir,
        template,
        workDir,
        context: {
          exists: false
        },
        indexes,
        git: getGitInfo(),
        helper: createConfigHelper(targetDir)
      }

      await runTasks(config)
    })

  await program.parseAsync(process.argv)
}

start().catch((reason) => {
  console.log('err start')
  console.log(reason)
})
