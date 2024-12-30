export function getDefaultSshfsBinPath() {
  return window.electronAPI.os === 'win32'
    ? 'C:\\Program Files\\SSHFS-Win\\bin\\sshfs.exe'
    : '/usr/local/bin/sshfs'
}
