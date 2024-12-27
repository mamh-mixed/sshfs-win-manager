import { dialog, ipcMain, nativeTheme, safeStorage } from 'electron'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export function initIpcHandlers(): void {
  ipcMain.handle('dialog', async (event, options) => {
    return await dialog.showOpenDialog(options)
  })

  ipcMain.handle('storeData', async (event, name, data) => {
    const filePath = join(__dirname, `${name}.json`)

    await writeFile(filePath, data, 'utf-8')
  })

  ipcMain.handle('loadData', async (event, name) => {
    const filePath = join(__dirname, `${name}.json`)

    if (!existsSync(filePath)) return ''

    return await readFile(filePath, 'utf-8')
  })

  ipcMain.handle('storeSafeData', (event, name, data) => {
    const filePath = join(__dirname, `${name}.dat`)

    void writeFile(filePath, safeStorage.encryptString(data).toString('binary'), 'binary')
  })

  ipcMain.handle('loadSafeData', async (event, name) => {
    const filePath = join(__dirname, `${name}.dat`)

    if (!existsSync(filePath)) return ''

    const buffer = Buffer.from(await readFile(filePath, 'binary'), 'binary')

    return safeStorage.decryptString(buffer)
  })

  ipcMain.handle('updateNativeTheme', (event, theme: typeof nativeTheme.themeSource) => {
    nativeTheme.themeSource = theme
  })
}
