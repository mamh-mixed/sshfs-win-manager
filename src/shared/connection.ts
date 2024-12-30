export interface ConnectionOption {
  id: string
  key: string
  value: string
}

export interface Connection {
  id: string
  name: string
  host: string
  port: string
  username: string
  authMethod: 'password' | 'request-password' | 'key' | 'key-file' | 'agent'
  password: string
  key: string
  keyFile: string
  keyPassphrase: string
  remotePath: string
  automaticMountPoint: boolean
  mountPoint: string
  connectOnStartup: boolean
  options: ConnectionOption[]
  status: 'connected' | 'connecting' | 'disconnected'
}
