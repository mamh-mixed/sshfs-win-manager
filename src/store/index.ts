import { createPinia } from 'pinia'

import { persistentStorage } from '../lib/persistent-storage'

const pinia = createPinia()

pinia.use(persistentStorage)

export default pinia
