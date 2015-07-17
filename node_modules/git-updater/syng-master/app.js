var http = require('http');
var fs = require('fs-extra')
var targz = require('tar.gz');
var zlib = require('zlib');

onload = function() {
  var webview = document.getElementById("foo");
  webview.addEventListener("dom-ready", function() {
    console.log(webview.getUrl())
  });
}

extract = function(){
  var compress = new targz().extract(__dirname + '/syng.tar.gz', __dirname, function(err){
    fs.copy(__dirname + '/app', __dirname, function (err) {
      if (err) return console.error(err)
      fs.removeSync(__dirname + '/syng.tar.gz')
      fs.removeSync(__dirname + '/app')
    }) // copies directory, even if it has subdirectories or files
  });
}

update = function(){

  var file = fs.createWriteStream(__dirname + '/syng.tar.gz');
  var request = http.get("http://localhost:8080/syng.tar.gz", function(response) {
    var p = response.pipe(file)
    p.on('end',function(){
      extract()
    })
  });
}


update()
