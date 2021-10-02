import * as fs from 'fs/promises'
import * as path from 'path'

export const scanFolder = async (folderPath: string, depth = 0): Promise<string[]> => {
  if (depth >= 5) {
    throw Error('Depth limit for folder scanning exceeded, this is limited to a depth of 5')
  }

  let result: string[] = []
  const files: string[] = await (fs.readdir(folderPath))

  for (let file of files) {
    file = path.join(folderPath, file)
    const stat = await fs.stat(file)

    // Check if file is .js or .ts file
    if (stat.isFile() && (file.endsWith('.js') || file.endsWith('.ts'))) {
      result.push(file)
    }

    // Check if file is a folder/directory
    if (stat.isDirectory()) {
      result = result.concat(await scanFolder(file, depth + 1))
    }
  }

  return result
}
