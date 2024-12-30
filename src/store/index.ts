import { createPinia } from 'pinia'

import { persistentStorage } from '../plugins/persistent-storage'

const pinia = createPinia()

pinia.use(persistentStorage)

export default pinia
