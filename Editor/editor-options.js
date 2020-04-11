const { app, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports.open_file = function(win){
    const option = {
        title: "Abrir archivo",
        filters: [
            {
                name:"archivo",
                extensions:['txt','log']
            }
        ]
    }

    paths = dialog.showOpenDialogSync(win, option)
    if(paths && paths.length > 0){
        const content = fs.readFileSync(paths[0]).toString()
        //const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('file-open',content)

        var filename = path.basename(paths[0]);
        win.webContents.send('title-change', "Mi Editor (2GJ) - "+filename)
    }

}

module.exports.save_file = function(win, data){
    const option = {
        title: "Guardar archivo",
        filters: [
            {
                name:"archivo",
                extensions:['txt']
            }
        ]
    }

    console.log(win)
    const path = dialog.showSaveDialogSync(win,option)
    console.log(path)
    fs.writeFileSync(path,data)
}
