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
  program.version(version)
    .description(description)

  program.command('create')
    .argument('<DirName>', 'name of dir')
    .argument('[template]', 'template')
    .description('create an empty package by DirName')
    .action(async (targetDir, template) => {
      const workDir = process.cwd()
      if (template === undefined) template = TemplateTypes.BASIC

      if (!which('git')) {
        console.log('Sorry, this script requires git')
        return
      }

      const config: AppConfig = {
        targetDir,
        template,
        workDir,
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
