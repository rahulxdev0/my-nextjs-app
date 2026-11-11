import { contextBridge } from 'electron';

// Expose safe, whitelisted APIs to the Next.js renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    platform: process.platform, // 'darwin' (macOS) or 'win32' (Windows)
    ping: () => 'pong',
});