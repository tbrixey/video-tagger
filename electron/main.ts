import { app, BrowserWindow, dialog, protocol, ipcMain } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

let win: BrowserWindow | null = null;
const safeProtocolName = "safe-file-protocol";

autoUpdater.logger = log;
log.info("App starting...");

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000/index.html");
  } else {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  }

  win.on("closed", () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(__dirname, {
      electron: path.join(
        __dirname,
        "..",
        "..",
        "node_modules",
        ".bin",
        "electron"
      ),
      forceHardReset: true,
      hardResetMethod: "exit",
    });
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  if (isDev) {
    win.webContents.openDevTools();
  }

  protocol.registerFileProtocol(safeProtocolName, (request, callback) => {
    const url = request.url.replace(`${safeProtocolName}://`, "");
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
    }
  });

  if (!isDev) {
    autoUpdater.checkForUpdatesAndNotify();
  }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on("open-file-dialog", function (event) {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    dialog
      .showOpenDialog(window, { properties: ["openDirectory"] })
      .then((result) => {
        // Send the path back to the renderer
        event.sender.send("open-file-dialog-reply", {
          path: result.filePaths[0],
        });
      })
      .catch((error) => {
        console.log("Could not get file path");
      });
  }
});

//update stuff

const sendStatusToWindow = (text: string) => {
  log.info(text);
  if (win) {
    win.webContents.send("message", text);
  }
};

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Update available.");
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (err) => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
});
autoUpdater.on("download-progress", (progressObj) => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
});
autoUpdater.on("update-downloaded", (info) => {
  sendStatusToWindow("Update downloaded; will install on quit");
  win &&
    dialog
      .showMessageBox(win, {
        buttons: ["Yes", "No"],
        message: "Update downloaded and ready to install. Quit now to install?",
      })
      .then((response) => {
        if (response.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
});

// autoUpdater.on("update-downloaded", (info) => {
//   // Wait 5 seconds, then quit and install
//   // In your application, you don't need to wait 500 ms.
//   // You could call autoUpdater.quitAndInstall(); immediately
//   autoUpdater.quitAndInstall();
// });
