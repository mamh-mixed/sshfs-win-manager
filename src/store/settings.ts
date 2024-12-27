import { nativeTheme } from 'electron'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { getDefaultSSHFSBinPath } from '../lib/os'

export interface Settings {
  sshfsBin: string
  startupWithOS: boolean
  processStatusCheckInterval: number
  theme: typeof nativeTheme.themeSource
}

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const settings = ref<Settings>({
      sshfsBin: getDefaultSSHFSBinPath(),
      startupWithOS: false,
      processStatusCheckInterval: 5,
      theme: 'system'
    })

    watch(
      () => settings.value.theme,
      (theme) => {
        document.documentElement.classList.remove(
          'app-theme-light',
          'app-theme-dark',
          'app-theme-system'
        )
        document.documentElement.classList.add(`app-theme-${theme}`)

        void window.electronAPI.updateNativeTheme(theme)
      },
      { immediate: true }
    )

    return {
      settings
    }
  },
  {
    useStorage: true
  }
)
