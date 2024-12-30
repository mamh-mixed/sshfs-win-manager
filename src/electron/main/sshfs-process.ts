import { ChildProcessWithoutNullStreams } from 'node:child_process'

import { Connection } from '../../shared/connection'
import { Settings } from '../../shared/settings'

export class SshfsProcess {
  public pid: number | null = null
  public process: ChildProcessWithoutNullStreams | null = null

  constructor(public connection: Connection, public settings: Settings) {}

  async run(): Promise<this> {
    return this
  }

  async exists(): Promise<boolean> {
    return false
  }

  async kill(): Promise<void> {}
}
