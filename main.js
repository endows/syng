var app = require('app');
var BrowserWindow = require('browser-window');
var update = require('git-updater');

require('crash-reporter').start();

var mainWindow = null;

update()

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();



  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
