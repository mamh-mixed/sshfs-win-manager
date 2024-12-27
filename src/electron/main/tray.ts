import { app, Menu, nativeImage, Tray } from 'electron'
import { join } from 'node:path'

let tray: Tray

export interface TrayActions {
  createWindow: () => void
}

export function initTray(actions: TrayActions) {
  const trayIcon = nativeImage.createFromPath(join(__dirname, '../images/TrayTemplate@2x.png'))
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: actions.createWindow
    },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ])

  tray = new Tray(trayIcon, '30a53ceb-4e9d-437d-b5fe-22b1f21f24c1')
  tray.setToolTip('SSHFS-Win Manager')
  tray.setContextMenu(trayContextMenu)
}
