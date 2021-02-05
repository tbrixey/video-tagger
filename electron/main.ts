import { app, BrowserWindow, dialog, protocol, ipcMain } from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let win: BrowserWindow | null = null;
const safeProtocolName = 'safe-file-protocol'

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { 
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule:true
    } 
  })

  if (isDev) {
    win.loadURL('http://localhost:3000/index.html');
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on('closed', () => win = null);

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  if (isDev) {
    win.webContents.openDevTools();
  }

  
  protocol.registerFileProtocol(safeProtocolName, (request, callback) => {
    const url = request.url.replace(`${safeProtocolName}://`, '')
    try {
      return callback(decodeURIComponent(url))
    }
    catch (error) {
      console.error(error)
    }
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('open-file-dialog', function (event) {
  const window = BrowserWindow.getFocusedWindow();
  if ( window ) {
    dialog.showOpenDialog(window, { properties: ['openDirectory'] })
    .then(result => {
      // Send the path back to the renderer
      event.sender.send('open-file-dialog-reply', { path: result.filePaths[0] })
    })
    .catch(error => {
       console.log('Could not get file path')
    })
  }
})