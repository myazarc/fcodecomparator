/* eslint-disable */
import path from "path";
import { contextBridge, ipcRenderer } from "electron";
import { BrowserWindow } from "@electron/remote";

contextBridge.exposeInMainWorld("api", {
  getPreloadUrl: () => {
    return path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD);
  },
  close: () => {
    BrowserWindow.getFocusedWindow().close();
  },
  minimize: () => {
    BrowserWindow.getFocusedWindow().minimize();
  },
  maximize: () => {
    const win = BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },
});
