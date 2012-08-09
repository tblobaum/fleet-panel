var figc = require('figc')
  , config = figc(process.cwd() + '/fleet-panel.json')
  , http = require('http')
  , shoe = require('shoe')
  , ecstatic = require('ecstatic')(__dirname + '/public')
  , dnode = require('dnode')
  , server = http.createServer(ecstatic)

server.listen(config.port || 3000)

shoe(function (stream) {
  dnode.connect({
      port : config.hub.split(':')[1]
    , host : config.hub.split(':')[0]
  }, function (remote, conn) {
    var d
    remote.auth(config.secret || '', function (err, result) {
      if (err) throw err
      else {
        result.account = config.account
        d = dnode(result)
        d.pipe(stream).pipe(d)
      }
    })
  })
}).install(server, '/dnode')
