//import { Compiler, Compilation } from 'webpack'
const { opendir } = require('fs/promises')
const { Dirent } = require('fs')
const { join, basename } = require('path')
const AdmZip = require('adm-zip')


const pluginName = 'ZipAndCopy'

/**
 * @param dirName { string }
 * @param filter { (dirent: Dirent) => boolean }
 * @returns {Promise<string[]>}
 */
async function getDirFilePaths(dirName, filter) {
  try {
    const dir = await opendir(dirName)
    filter ??= dirent => dirent.isDirectory()
    const result = []

    for await (const dirent of dir) {
      if (filter(dirent)) {
        dirent.isDirectory()
        result.push(join(dirName, dirent.name))
      }
    }

    return result
  } catch (e) {
    console.error(`can not read ${dirName} skip`)
    return []
  }
}

/**
 *
 * @param path { string }
 * @return { Promise<AdmZip> }
 */
async function createZip(path) {
  const dir = await opendir(path)
  const zip = new AdmZip
  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      zip.addLocalFolder(join(path, dirent.name))
    } else if (dirent.isFile()) {
      zip.addLocalFile(join(path, dirent.name))
    }
  }
  return zip
}

class ZipWebpackPlugin {
  dirs = []

  /**
   * @param dirs {string[]}
   */
  constructor(dirs) {
    this.dirs = dirs
  }

  /**
   * @param compiler {Compiler}
   */
  apply(compiler) {
    const { dirs } = this
    const webpack = compiler.webpack
    const { Compilation } = webpack
    const { RawSource } = webpack.sources

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        async (_, cb) => {
          const temps = []
          for (let i = 0; i < dirs.length; i++) {
            (await getDirFilePaths(dirs[i]))
              .forEach(v => temps.push(v))
          }

          for (let i = 0; i < temps.length; i++) {
            const temp = temps[i]
            const zip = await createZip(temp)
            compilation.emitAsset(
              join('templates', basename(temp) + '.zip'),
              new RawSource(zip.toBuffer())
            )
          }
          cb()
        }
      )
    })
  }
}

module.exports = { ZipWebpackPlugin }
