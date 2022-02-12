import { program } from 'commander'
import {TemplateTypes} from "./types/TemplateTypes";
import {AppConfig} from "./types/AppConfig";
import {createConfigHelper, getGitInfo} from "./utils/fs";
import {runTasks} from "./core/task";
import { which } from 'shelljs'
import {getTemplateIndex} from "./utils/pkg";
const { version, description } = require('../package.json')

async function start() {
  const indexes = await getTemplateIndex()

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
    .option('-t --template <template>', 'template', TemplateTypes.BASIC)
    .option('-i --install', 'install package')
    .description('create an empty package by DirName')
    .action(async (targetDir, opts) => {
      const template = opts.template
      if (indexes[template] === undefined) {
        console.log(`no such template ${template}`)
        return
      }

      if (!which('git')) {
        console.log('Sorry, this script requires git')
        return
      }

      const git = getGitInfo()
      if (!(git.name && git.email)) {
        console.log('git config error, please check it')
        return
      }

      const config: AppConfig = {
        install: opts.install,
        targetDir,
        template,
        workDir: process.cwd(),
        context: {
          exists: false
        },
        indexes,
        git,
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
