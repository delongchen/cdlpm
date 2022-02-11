import { program } from 'commander'
import {TemplateTypes} from "./types/TemplateTypes";
import {AppConfig} from "./types/AppConfig";
import {createConfigHelper, getGitInfo} from "./utils/fs";
import {runTasks} from "./core/task";
import { which } from 'shelljs'
const { version, description } = require('../package.json')

program.version(version)
  .description(description)

program.command('create')
  .argument('<DirName>', 'name of dir')
  .argument('[template]', 'template')
  .description('create an empty package by DirName')
  .action((targetDir, template) => {
    template = template ?? TemplateTypes.TS_NODE

    const workDir = process.cwd()

    if (!which('git')) {
      console.log('Sorry, this script requires git')
      return
    }

    const config: AppConfig = {
      targetDir,
      template,
      workDir,
      git: getGitInfo(),
      helper: createConfigHelper(targetDir)
    }

    runTasks(config).then(() => {
      console.log('end')
    })
  })

program.parse(process.argv)
