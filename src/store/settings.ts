import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import { getDefaultSshfsBinPath } from '../lib/helpers'
import { Settings } from '../shared/settings'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const settings = ref<Settings>({
      sshfsBin: getDefaultSshfsBinPath(),
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
    usePersistentStorage: true
  }
)
