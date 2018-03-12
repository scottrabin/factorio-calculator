import {
    app,
    BrowserWindow,
} from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../resource/index.html"),
        protocol: "file:",
        slashes: true,
    }));
    mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    app.quit();
});
