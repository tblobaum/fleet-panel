var panel = require('./fleet-panel')()
  , views = require('./views')
  , EventEmitter = require('events').EventEmitter
  , ejs = require('ejs')
  , psTemplate = ejs.compile(views['ps.ejs'])
  , spawnsTemplate = ejs.compile(views['spawns.ejs'])
  , deploysTemplate = ejs.compile(views['deploys.ejs'])
  , processes = {}

window.clearSpawns = function () {
  document.getElementById('monitor-spawn').innerHTML = ''
}

window.clearStdio = function () {
  document.getElementById('monitor-stdio').innerHTML = ''
}

panel.on('remote', function (hub) {
  var ports = document.getElementById('info')
  ports.textContent = 'hub:' + hub.ports.control + ' // git port:' + hub.ports.git 
  panel.hub = hub
  processList()
  monitorHub()
})

function stopProcess (drone, pid) {
  panel.hub.stop({
      drone : drone
    , drones : Object.keys(processes)
    , pid : pid
  }, function () {})
}

function processList () {
  var em = new EventEmitter
  
  em.on('data', function (key, procs) {
    processes[key] = procs
  })

  em.on('end', function () {
    document.getElementById('ps').innerHTML = psTemplate({ 
        ps : processes
      , accountUrl : panel.hub.account
    })
  })
  
  panel.hub.ps(em.emit.bind(em))
}

function monitorHub () {
  var em = new EventEmitter
    , stdio = document.getElementById('monitor-stdio')
    , deployElement = document.getElementById('monitor-deploy')
    , spawn = document.getElementById('monitor-spawn')

  em.on('deploy', function (deploy) {
    deploy.time = new Date()
    deploy.status = deploy.status ||'deploy'
    appendText(deploysTemplate({ 
        deploy : deploy
      , accountUrl : panel.hub.account
    }), deployElement)
  })

  em.on('spawn', function (proc) {
    proc.time = new Date()
    proc.status = proc.status ||'spawned'
    prepend(spawnsTemplate({ 
        proc : proc
      , accountUrl : panel.hub.account
    }), spawn)
    enableProcess(proc)
  })

  em.on('exit', function (code, sig, proc) {
    proc.time = new Date()
    proc.status = proc.status || sig ? sig : 'stopped'
    prepend(spawnsTemplate({ 
        proc : proc
      , accountUrl : panel.hub.account
    }), spawn)
    disableProcess(proc)
  })

  em.on('stdout', function (buf, proc) {
    appendText('[' + proc.drone + '#' + proc.id + '] ' + buf.replace(/\n$/, ''), stdio)
  })

  em.on('stderr', function (buf, proc) {
    appendText('[' + proc.drone + '#' + proc.id + '] '+ buf.replace(/\n$/, ''), stdio)
  })

  panel.hub.subscribe(em.emit.bind(em))
}

function enableProcess (proc) {
  var row = document.getElementById('pid-' + proc.id)
    , status = document.getElementById('pid-' + proc.id + '-status')

  if (row) row.className = ''
  else processList()
  if (status) status.textContent = proc.status
}

function disableProcess (proc) {
  var status = document.getElementById('pid-' + proc.id + '-status')
    , row = document.getElementById('pid-' + proc.id)

  if (row) row.className = 'disabled'
  if (status) status.textContent = proc.status
}

function prepend (str, target) {
  target.innerHTML = str + target.innerHTML
}

function appendText (str, target) {
  str = str + '\r\n'
  if (target.scrollTop + target.clientHeight === target.scrollHeight) {
    target.innerHTML += str
    target.scrollTop += target.clientHeight + 50
    target.scrollHeight += target.scrollHeight + 50
  }
  else {
    target.innerHTML += str
  }
}
