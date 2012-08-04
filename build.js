var fs = require('fs')
  , path = require('path')

function read (dir) {
  var result = {}
  fs.readdirSync(dir).forEach(function (entry) {
    var entryPath = path.join(dir, entry)
    if (fs.statSync(entryPath).isDirectory())
      return result[entry] = read(entryPath)
    else
      return result[entry] = fs.readFileSync(entryPath, 'utf8')
  })
  return result
}

var files = JSON.stringify(read('./public/views/'), null, 2)
fs.writeFileSync('./public/views.js', 'module.exports = ' + files, 'utf8')
