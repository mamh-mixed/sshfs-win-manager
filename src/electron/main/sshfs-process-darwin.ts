import { SshfsProcess } from './sshfs-process'

export class SshfsProcessDarwin extends SshfsProcess {
  async exists(): Promise<boolean> {
    return false
  }

  async kill(): Promise<void> {}
}
