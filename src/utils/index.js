const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ncp = require('copy-paste')
const yaml = require('js-yaml')

/**
 * 将文本复制到剪切板
 * @param {string} copy string
 */
exports.copyText = function (text) {
  return new Promise((resolve, reject) => {
    ncp.copy(text, err => {
      if (err) reject(err)
      resolve()
    })
  })
}

exports.write = text => process.stdout.write(`${text}\n`)

exports.Text = {
  error: text => this.write(chalk.red(text)),
  success: text => this.write(chalk.green(text)),
  info: text => this.write(chalk.cyan(text)),
  warning: text => this.write(chalk.yellow(text))
}

exports.exit = function () {
  process.exit()
}

exports.getConf = function () {
  let externalConf
  console.log(path.resolve(process.env.HOME, '.nori.yml'))
  try {
    externalConf = yaml.safeLoad(
      fs.readFileSync(
        path.resolve(process.env.HOME, '.nori.yml'),
        'utf8'
      )
    )
  } catch (e) {
    console.log(e)
    externalConf = null
  }
  return externalConf
}
