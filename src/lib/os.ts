export function getDefaultSSHFSBinPath() {
  return window.electronAPI.os === 'win32'
    ? 'C:\\Program Files\\SSHFS-Win\\bin\\sshfs.exe'
    : '/usr/bin/sshfs'
}

export function getDefaultPrivateKeyPath() {
  return window.electronAPI.os === 'win32'
    ? `C:\\Users\\${window.electronAPI.user}\\.ssh\\id_rsa`
    : `/home/${window.electronAPI.user}/.ssh/id_rsa`
}
