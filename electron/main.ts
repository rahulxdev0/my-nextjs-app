import { app, BrowserWindow } from 'electron';
import path from 'path';

// Check if we are in development mode
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: 'My Next.js Desktop App',
        webPreferences: {
            // Enforce security boundaries
            contextIsolation: true,
            nodeIntegration: false,
            // Path to compiled preload script in dist-electron
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    if (isDev) {
        // Development: Load Next.js dev server URL
        mainWindow.loadURL('http://localhost:3000');
        // Open Chrome DevTools for debugging
        mainWindow.webContents.openDevTools();
    } else {
        // Production: Load the static export file
        mainWindow.loadFile(path.join(__dirname, '../out/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App lifecycle: Wait for Electron to be initialized
app.whenReady().then(() => {
    createWindow();

    // macOS specific: re-create window when dock icon is clicked
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});