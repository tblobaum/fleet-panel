# fleet-panel

# Install

`npm install -g fleet-panel`

# Run

`fleet-panel --port=<port> --hub=<hub-host>:<hub-port> --secret=<password>`

e.g. `fleet-panel --port=3000 --hub=localhost:9000 --secret=beepboop`

Options:
`--port` defaults to `3000`

`--hub` is required

`--secret` the password for the specified fleet hub, defaults to `''`

`--account` (optional) base account (e.g. github) url where git repositories deployed to the hub can be accessed. This will be used to link commits and repos from fleet-panel

Note: `process.cwd()` will be checked for a `fleet-panel.json` file which can be used to specify the configuration.

``` js
{
  "port" : 3000,
  "hub" : "localhost:9000",
  "secret" : "beepboop",
  "account" : "https://github.com/tblobaum/"
}
```

# License

(The MIT License)

Copyright (c) 2012 Thomas Blobaum <tblobaum@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
