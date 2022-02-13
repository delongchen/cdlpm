import AdmZip from "adm-zip";
import {opendir} from "fs/promises";
import { join } from 'path'
const CONST = require('../../const.json')

export function unzip(file: string, output: string) {
  const zip = new AdmZip(file)
  zip.extractAllTo(output, true)
}

export async function createZip(p: string) {
  const zip = new AdmZip
  const dir = await opendir(p)

  for await (const dirent of dir) {
    const direntName = dirent.name
    if (dirent.isDirectory()) {
      zip.addLocalFolder(join(p, direntName), direntName)
    } else if (dirent.isFile() && direntName !== CONST.index_yaml) {
      zip.addLocalFile(join(p, direntName))
    }
  }

  return zip
}
