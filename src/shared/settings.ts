import { nativeTheme } from 'electron'

export interface Settings {
  sshfsBin: string
  startupWithOS: boolean
  processStatusCheckInterval: number
  theme: typeof nativeTheme.themeSource
}
