var figc = require('figc')
  , config = figc(process.cwd() + '/fleet-panel.json')
  , http = require('http')
  , shoe = require('shoe')
  , ecstatic = require('ecstatic')(__dirname + '/public')
  , dnode = require('dnode')
  , server = http.createServer(ecstatic)

server.listen(config.port || 3000)

// if you are running fleet-panel from the 
// same origin as a fleet-hub then this is not needed
var sock = shoe(function (stream) {
  dnode.connect({
      port : config.hub.split(':')[1]
    , host : config.hub.split(':')[0]
  }, function (remote, conn) {
    var d = dnode(remote)
    d.pipe(stream).pipe(d)
  })
})

sock.install(server, '/dnode')
