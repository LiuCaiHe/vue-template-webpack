'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(chalk`{magenta.bold building for {redBright production} ...}`)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk`{red.bold Build failed with errors.}`)
      process.exit(1)
    }

    console.log(chalk`
    
    {magenta.bold build {redBright production} complete.}

    {yellow.bold {redBright Tip:} built files are meant to be served over an HTTP server.
    Opening index.html over file:// won\'t work.}

    `)
  })
})