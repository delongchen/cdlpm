//import { Compiler, Compilation } from 'webpack'
const { opendir, readFile } = require('fs/promises')
const { Dirent } = require('fs')
const { join, basename } = require('path')
const AdmZip = require('adm-zip')
const CONST = require('./const.json')
const yaml = require('yaml')

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
 * @return { Promise<{ zip: AdmZip, index: Object }> }
 */
async function createZip(path) {
  const dir = await opendir(path)
  const zip = new AdmZip
  const result = {}

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      const name = dirent.name
      zip.addLocalFolder(join(path, name), name)
    } else if (dirent.isFile()) {
      const filePath = join(path, dirent.name)
      if (dirent.name === CONST.index_yaml) {
        const raw = await readFile(filePath, 'utf8')
        result.index = yaml.parse(raw)
      } else {
        zip.addLocalFile(filePath)
      }
    }
  }

  result.index ??= {}
  result.zip = zip

  return result
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
          const indexes = {}
          for (let i = 0; i < dirs.length; i++) {
            (await getDirFilePaths(dirs[i]))
              .forEach(v => temps.push(v))
          }

          for (let i = 0; i < temps.length; i++) {
            const temp = temps[i]
            const tempName = basename(temp)
            const { zip, index } = await createZip(temp)
            indexes[tempName] = index
            compilation.emitAsset(
              join(CONST.temp, tempName + '.zip'),
              new RawSource(zip.toBuffer())
            )
          }

          compilation.emitAsset(
            join(CONST.temp, CONST.index),
            new RawSource(JSON.stringify(indexes, null, 2))
          )
          cb()
        }
      )
    })
  }
}

module.exports = { ZipWebpackPlugin }
