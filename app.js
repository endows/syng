var fs = require('fs')
var request = require('request')

// var file = fs.createWriteStream('/Applications/Syng.app/Contents/Resources/app.asar');
update = function(url){
  // request(url).pipe(file)
  request(url,function(e,res,body){
    if(res.statusCode == 200){
      fs.writeFile('/Applications/Syng.app/Contents/Resources/app.asar.new',body,function(e){
        fs.renameSync('/Applications/Syng.app/Contents/Resources/app.asar.new','/Applications/Syng.app/Contents/Resources/app.asar')
      })
    }
  })
}
