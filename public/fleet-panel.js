
var EventEmitter = require('events').EventEmitter
  , util = require('util')
  , shoe = require('shoe')
  , dnode = require('dnode')

module.exports = function (opts) {
  return new Panel(opts)
}

function Panel (opts) {
  var self = this
  var stream = shoe('/dnode')
  var d = dnode()
  d.on('remote', function (remote) {
    self.emit('remote', remote)
  })
  d.pipe(stream).pipe(d)
}

util.inherits(Panel, EventEmitter)
