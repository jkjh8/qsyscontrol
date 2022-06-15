import { app } from 'electron'
import path from 'node:path'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
global.setupVal = {}

const setupFilePath = path.join(app.getPath('appData'), 'setup', 'setup.json')

function getSetup() {
  if (existsSync(setupFilePath)) {
    try {
      const r = readFileSync(setupFilePath, 'utf8')
      if (r) {
        setupVal = { ...JSON.parse(r) }
      }
    } catch (err) {
      console.error(err)
    }
  }
}

function setSetup(args) {
  if (args !== setupVal) {
    setupVal = args
  }
  writeFileSync(setupFilePath, JSON.stringify(setupVal))
}

export { getSetup, setSetup }
