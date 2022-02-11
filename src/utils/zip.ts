import AdmZip from "adm-zip";

export function unzip(file: string, output: string) {
  const zip = new AdmZip(file)
  zip.extractAllTo(output, true)
}
