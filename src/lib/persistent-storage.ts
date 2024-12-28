import { PiniaPluginContext } from 'pinia'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    usePersistentStorage?: boolean
    useSafePersistentStorage?: boolean
  }
}

export const persistentStorage = ({ store, options }: PiniaPluginContext) => {
  if (options.usePersistentStorage === true) {
    window.electronAPI.loadData(store.$id).then((data) => {
      if (data !== '') {
        store.$patch(JSON.parse(data))
      }
    })

    store.$subscribe((mutation, state) => {
      void window.electronAPI.storeData(store.$id, JSON.stringify(state, null, 2))
    })
  }

  if (options.useSafePersistentStorage === true) {
    window.electronAPI.loadSafeData(store.$id).then((data) => {
      if (data !== '') {
        store.$patch(JSON.parse(data))
      }
    })

    store.$subscribe((mutation, state) => {
      void window.electronAPI.storeSafeData(store.$id, JSON.stringify(state))
    })
  }
}
