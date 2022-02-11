import AdmZip from "adm-zip";

export function unzip(file: string, output: string) {
  const zip = new AdmZip(file)

  return new Promise<void>((resolve, reject) => {
    zip.extractAllToAsync(output, true, error => {
      if (error) reject(error)
      else resolve()
    })
  })
}
