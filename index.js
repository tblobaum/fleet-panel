
var http = require('http')
  , shoe = require('shoe')
  , ecstatic = require('ecstatic')(__dirname + '/public')
  , dnode = require('dnode')
  , server = http.createServer(ecstatic)

server.listen(process.argv[2] || 3000)

var sock = shoe(function (stream) {
  dnode.connect(1024, '50.116.19.154', function (remote, conn) {
    var d = dnode(remote)
    d.pipe(stream).pipe(d)
  })
})

sock.install(server, '/dnode')
