axis = require 'axis'
rupture = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
dynamicContent  = require 'dynamic-content'
moment = require 'moment'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore']
  server:
    clean_urls: true
  stylus:
    use: [axis(), rupture(), autoprefixer()]
  extensions: [
    dynamicContent()
  ]
  locals:
    sort: (ary, opts) ->
      opts ||= {}
      opts.by = opts.by || 'order'

      if opts.order == 'asc'
        fn = (a, b) -> if (a[opts.by] > b[opts.by]) then -1 else 1
      else
        fn = (a, b) -> if (a[opts.by] < b[opts.by]) then -1 else 1
      if opts.by == 'date'
        fn = (a,b) -> if (new Date(a[opts.by]) > new Date(b[opts.by])) then -1 else 1
      if opts.fn then fn = opts.fn
      ary.sort(fn)

    formatDate: (d) -> moment(d).format('YYYY-MM-DD')
