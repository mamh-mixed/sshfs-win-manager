import { contextBridge, ipcRenderer, nativeTheme } from 'electron'

export interface ElectronAPI {
  os: NodeJS.Platform
  user: string

  dialog: (options: Electron.OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>
  storeData: (path: string, data: string) => Promise<void>
  loadData: (path: string) => Promise<string>
  storeSafeData: (path: string, data: string) => Promise<void>
  loadSafeData: (path: string) => Promise<string>
  updateNativeTheme: (theme: typeof nativeTheme.themeSource) => Promise<void>
}

contextBridge.exposeInMainWorld('electronAPI', {
  os: process.platform,
  user: process.env.USER ?? process.env.USERNAME ?? '',

  dialog: async (options: Electron.OpenDialogOptions) => {
    return await ipcRenderer.invoke('dialog', options)
  },

  storeData: async (name: string, data: string) => {
    return await ipcRenderer.invoke('storeData', name, data)
  },

  loadData: async (name: string) => {
    return await ipcRenderer.invoke('loadData', name)
  },

  storeSafeData: async (name: string, data: string) => {
    return await ipcRenderer.invoke('storeSafeData', name, data)
  },

  loadSafeData: async (name: string) => {
    return await ipcRenderer.invoke('loadSafeData', name)
  },

  updateNativeTheme: async (theme: typeof nativeTheme.themeSource) => {
    return await ipcRenderer.invoke('updateNativeTheme', theme)
  }
} satisfies ElectronAPI)
