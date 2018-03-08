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
}

app.on("ready", createWindow);
