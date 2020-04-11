const {app, ipcMain, Menu, shell, BrowserWindow, globalShortcut, dialog } = require('electron')

const fs = require('fs')
const { open_file, save_file } = require("./editor-options")

const template = [
    {
        label: "Archivo",
        submenu: [
            {
                label: "Guardar",
                accelerator: 'CommandOrControl+Shift+S',
                click(){
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel','file-save')
                }
            },
            {
                label: "Abrir",
                accelerator: 'CommandOrControl+Shift+O',
                click(){
                    const win = BrowserWindow.getFocusedWindow()
                    open_file(win)
                }
            }
        ]
    },

    {
        role:'help',
        submenu: [
            {
                label:"Sobre nosotros",
                click(){
                    shell.openExternal("https://www.electronjs.org/");
                }
            }
        ]
    },
    {
        label: 'Estilo',
        submenu: [
            {
                label: 'Negritas',
                click() {
                    //console.log("Negritas");
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel','style-bold')
                }
            },
            {
                label: 'Italica',
                click() {
                    //console.log("Negritas");
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel','style-italic')
                }
            },
            {
                type:'separator'
            },
            {
                label: 'H1',
                click() {
                    //console.log("Negritas");
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel','style-h1')
                }
            },
            {
                label: 'H2',
                click() {
                    //console.log("Negritas");
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel','style-h2')
                }
            }
        ]
    }
]

template.push(
    {
        label: 'Debugging',
        submenu:[
            {
                role: 'toggledevtools'
            },
            {
                role: 'reload',
                accelerator:'Alt+C'
            },
            {
                type:'separator'
            },
            {
                role: 'quit'
            }
        ]
    }
)

ipcMain.on('editor-file',(event,arg) => {
    console.log("Mensaje recibido del canal 'editor-chanel': " + arg)
})

ipcMain.on('file-open',(event,arg) => {
    const win = BrowserWindow.getFocusedWindow()
    open_file(win)     
})


ipcMain.on('file-save',(event,arg) => {
    console.log("Mensaje recibido del canal 'editor-chanel': " + arg)
    const win = BrowserWindow.getFocusedWindow()
    save_file(win,arg)
})

app.on('ready',() => {
    console.log("App lista...")

    globalShortcut.register('CommandOrControl+Shift+S', () => {
        console.log("Register shortcut Alt+Ctr+S...")
        const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('editor-channel','file-save')
    })

    //Abrir un archivo.
    globalShortcut.register('CommandOrControl+Shift+O', () => {
        console.log("Register shortcut Alt+Ctr+O...")
        const win = BrowserWindow.getFocusedWindow()
        open_file(win)        
    })
});

const menu = Menu.buildFromTemplate(template)

module.exports = menu