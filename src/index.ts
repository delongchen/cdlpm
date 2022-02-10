import { program } from 'commander'
import {TemplateTypes} from "./types/TemplateTypes";
import {AppConfig} from "./types/AppConfig";
import {createConfigHelper} from "./utils/fs";
import {runTasks} from "./core/task";
const pkg = require('../package.json')

program.version(pkg.version)
  .description(pkg.description)

program.command('create')
  .argument('<DirName>', 'name of dir')
  .argument('[template]', 'template')
  .description('create an empty package by DirName')
  .action((targetDir, template) => {
    template = template ?? TemplateTypes.TS_NODE

    const workDir = process.cwd()
    const config: AppConfig = {
      targetDir,
      template,
      workDir,
      helper: createConfigHelper(targetDir)
    }

    runTasks(config).then(() => {
      console.log('end')
    })
  })

program.parse(process.argv)
