const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, Notification } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    alwaysOnTop: true,
    frame: true,
    transparent: false,
    backgroundColor: '#333',
    hasShadow: false,
    skipTaskbar: true,
    type: process.platform === 'darwin' ? 'panel' : 'toolbar',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  
  if (process.platform === 'darwin') {
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  }

  mainWindow.on('blur', () => {
    mainWindow.setAlwaysOnTop(true);
  });

  console.log('Loading from:', path.join(__dirname, 'index.html'));
  
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  mainWindow.webContents.openDevTools();

  const iconPath = path.join(__dirname, 'assets', 'icons', 'tray-icon.png');
  console.log('Icon path:', iconPath);
  
  try {
    const icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) {
      const fallbackIcon = nativeImage.createEmpty();
      tray = new Tray(fallbackIcon);
    } else {
      tray = new Tray(icon);
    }
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click: () => mainWindow.show() },
      { label: 'Quit', click: () => app.quit() }
    ]);
    tray.setContextMenu(contextMenu);
  } catch (error) {
    console.error('Error creating tray:', error);
  }
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Fix the timer notification
ipcMain.on('timer-complete', () => {
  if (Notification.isSupported()) {
    new Notification({
      title: 'Pomodoro Timer',
      body: 'Time is up! Take a break.',
      icon: path.join(__dirname, 'assets', 'icons', 'tray-icon.png')
    }).show();
  }
}); 