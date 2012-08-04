
var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , shoe = require('shoe')
  , dnode = require('dnode')

module.exports = function (opts) {
  return new Panel(opts)
}

function Panel (opts) {
  var self = this
  opts = opts || {}

  if (!opts.secret) {
    opts.secret = prompt('Enter the hub password', 'beepboop')
  }

  self.secret = opts.secret || ''
  self.host = opts.host || 'localhost'
  self.port = opts.port || 80
  var stream = shoe('/dnode')
  var d = dnode()
  d.on('remote', function (remote) {
    var auth = self.secret && 'git:' + encodeURIComponent(self.secret)
    remote.auth(self.secret, function (err, result) {
      if (err) self.emit('error', err)
      else {
        self.emit('remote', result)
      }
    })
  })
  d.pipe(stream).pipe(d)
}

util.inherits(Panel, EventEmitter)
