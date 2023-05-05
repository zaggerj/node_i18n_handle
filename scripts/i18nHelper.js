const mkdirp = require('mkdirp')
const json5 = require('json5')

const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const argvLen = process.argv.length

console.log(`cwd:${cwd},\nargvLen:${argvLen}`)

const restArgs = process.argv.slice(2)

/**
 * Check language arguments and return mode of operation.
 *
 * @param {string[]} args - An array of language arguments.
 * @returns {{mode: string}} - An object with the mode of operation.
 */
const checkLang = (args) => {
  const allLangList = ['zh-cn', 'zh-tw', 'en']
  const primaryLang = allLangList[0]
  const restLangList = allLangList.slice(1)
  const langCombinations = restLangList.map((item) => `${primaryLang}to${item}`)
  // console.log(`\nallLangList:${allLangList},\nlangCombinations:${langCombinations}`)

  const argsNum = args.length
  let mode = 'diff'
  let combination = ''
  let langList = []
  if (argsNum < 1 || argsNum > 2) {
    console.error('Error: Invalid number of arguments:', restArgs)
    return process.exit(1)
  }
  if (argsNum === 1) {
    const res = args.every((lang) => langCombinations.includes(lang))
    if (!res) {
      console.error('Error: Invalid combination of languages:', langCombinations)
      return process.exit(1)
    }
    mode = 'fill'
    combination = restArgs[0]
    langList = combination.split('to')
  } else if (argsNum === 2) {
    const res = args.every((lang) => allLangList.includes(lang))
    if (!res) {
      console.error('Error: Invalid languages', allLangList)
      return process.exit(1)
    }
    mode = 'diff'
    langList = args
    combination = args.join('to')
  }
  return {
    mode,
    combination,
    langList,
  }
}

const { mode, combination, langList } = checkLang(restArgs)
const ngFileList = ['lang.json', 'code.json']
const sourceDir = path.resolve('./source/')
const destDir = path.resolve('./dest/')

const repoArr = ['ngconsole_resources', 'view-front', 'oe-uaa']

// 复制文件到当前目录的source目录中
const prepareCopyFiles = () => {
  if (!fs.existsSync(sourceDir)) {
    mkdirp.sync(sourceDir)
  }

  const copyCtxQueue = []
  const taskCtxQueue = []
  const getFileContextQueue = (repoName) => {
    // ngconsole_resource:
    // dir => 'zh-cn', 'en'
    // prefixName => 'lang', 'code'
    //  extName: '.json',

    // view-front/oe-uaa:
    // dir => 'src/i18n'
    // prefixName => 'zh-cn', 'en'
    //  extName: '.js',
    if (repoName === 'ngconsole_resources') {
      const dirArr = langList
      const prefixNameArr = ['lang', 'code']

      prefixNameArr.forEach((prefixName) => {
        const task = []
        taskCtxQueue.push(task)
        dirArr.forEach((dir) => {
          const file = {
            repoName: 'ngconsole_resources',
            dir,
            prefixName,
            extName: '.json',
          }
          copyCtxQueue.push(file)
          task.push(file)
        })
        const destFile = {
          repoName: 'ngconsole_resources',
          dir: langList[1],
          prefixName,
          extName: '.json',
        }
        task.push(destFile)
      })
    } else if (['view-front', 'oe-uaa'].includes(repoName)) {
      const prefixNameArr = langList
      const task = []
      prefixNameArr.forEach((prefixName) => {
        const file = {
          repoName,
          dir: 'src/i18n',
          prefixName,
          extName: '.js',
        }
        copyCtxQueue.push(file)
        task.push(file)
      })
      const destFile = {
        repoName,
        dir: 'dest',
        prefixName: langList[1],
        extName: '.js',
      }
      task.push(destFile)
      taskCtxQueue.push(task)
    }
  }

  repoArr.forEach((repo) => {
    getFileContextQueue(repo)
  })

  return { copyCtxQueue, taskCtxQueue }
}

const readJsonFileToJson = (file) => {
  let json = {}
  if (fs.existsSync(file)) {
    const fileStr = fs.readFileSync(file, 'utf-8')
    json = json5.parse(fileStr)
  }
  return json
}

const compareTwoJsonToDiffJson = ({ diff, source, target }) => {
  const sourceJson = readJsonFileToJson(source)
  const targetJson = readJsonFileToJson(target)

  const diffJson = {}
  const sourceEntries = Object.entries(sourceJson)
  const targetEntries = Object.entries(targetJson)

  const targetMap = {}
  for (const [key, value] of targetEntries) {
    targetMap[key] = value
  }

  for (const [key, value] of sourceEntries) {
    if (!targetMap[key]) {
      diffJson[key] = value
    }
  }

  console.log(
    'diff:',
    diff,
    'target:len',
    targetEntries.length,
    'source:len',
    sourceEntries.length,
    'miss:len',
    sourceEntries.length - targetEntries.length,
    'diff:len',
    Object.keys(diffJson).length,
    '\ndiffJson:',
    Object.keys(diffJson).length < 10 && diffJson,
  )

  if (sourceEntries.length - targetEntries.length !== Object.keys(diffJson).length) {
    const reverseDiffJson = {}
    const sourceMap = {}
    for (const [key, value] of sourceEntries) {
      sourceMap[key] = value
    }

    for (const [key, value] of targetEntries) {
      if (!sourceMap[key]) {
        reverseDiffJson[key] = value
      }
    }

    console.log(
      'reverseDiff:len',
      Object.keys(reverseDiffJson).length,
      '\nreverseDiffJson:',
      Object.keys(reverseDiffJson).length < 10 && reverseDiffJson,
    )
  }

  fs.writeFileSync(diff, JSON.stringify(diffJson, null, '\t'))
}

const fillDiffJsonToTargetJson = ({ diff, target, fill }, needUnFlatten) => {
  let targetJson = readJsonFileToJson(target)
  const diffJson = readJsonFileToJson(diff)

  Object.assign(targetJson, diffJson)
  if (needUnFlatten) {
    targetJson = unFlatten(targetJson)
  }
  fs.writeFileSync(fill, JSON.stringify(targetJson, null, '\t'))
}

const flatten = (data) => {
  const result = {}
  const isEmpty = (x) => Object.keys(x).length === 0
  const recurse = (cur, prop) => {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      const length = cur.length
      for (let i = 0; i < length; i++) {
        recurse(cur[i], `${prop}[${i}]`)
      }
      if (length === 0) {
        result[prop] = []
      }
    } else {
      if (!isEmpty(cur)) {
        Object.keys(cur).forEach((key) => recurse(cur[key], prop ? `${prop}&${key}` : key))
      } else {
        result[prop] = {}
      }
    }
  }
  recurse(data, '')
  return result
}

const unFlatten = (data) => {
  if (Object(data) !== data || Array.isArray(data)) {
    return data
  }
  const regex = /\&?([^&\[\]]+)$|\[(\d+)\]$/
  const props = Object.keys(data)
  let result, p
  while ((p = props.shift())) {
    const match = regex.exec(p)
    if (match) {
      let target
      if (match.index) {
        const rest = p.slice(0, match.index)
        if (!(rest in data)) {
          data[rest] = match[2] ? [] : {}
          props.push(rest)
        }
        target = data[rest]
      } else {
        if (!result) {
          result = match[2] ? [] : {}
        }
        target = result
      }
      target[match[2] || match[1]] = data[p]
    }
  }
  return result
}

if (mode === 'diff') {
  // 准备好所有文件
  const { copyCtxQueue, taskCtxQueue } = prepareCopyFiles()
  const copyFile = ({ repoName, dir, prefixName, extName }) => {
    const copySrcPath = path.resolve(`../../${repoName}/${dir}`, `${prefixName}${extName}`)
    const copyDestPath = path.resolve(
      sourceDir,
      `${repoName}${repoName === 'ngconsole_resources' ? '-' + dir : ''}-${prefixName}${extName}`,
    )

    fs.copyFileSync(copySrcPath, copyDestPath)

    if (repoName !== 'ngconsole_resources') {
      let files = fs.readdirSync(path.resolve(sourceDir))
      const jsFiles = files.filter((file) => file.endsWith('.js'))
      jsFiles.forEach((filePath) => {
        const json = require(path.resolve(sourceDir, filePath))
        const flattedJson = flatten(json)
        console.log(
          'filePath:',
          filePath,
          'json:len',
          Object.keys(json).length,
          'flattedJson:len',
          Object.keys(flattedJson).length,
        )
        const baseName = path.basename(filePath, '.js')
        fs.writeFileSync(path.resolve(sourceDir, baseName + '.json'), JSON.stringify(flattedJson, null, '\t'))
      })
    }
  }

  const diffFile = (task) => {
    const [sourceObj, targetObj, diffObj] = task
    const getFilePath = ({ repoName, dir, prefixName, extName }, isDest) => {
      return path.resolve(
        isDest ? destDir : sourceDir,
        `${repoName}${repoName === 'ngconsole_resources' ? '-' + dir : ''}-${prefixName}${'.json'}`,
      )
    }
    return {
      diff: getFilePath(diffObj, true),
      source: getFilePath(sourceObj),
      target: getFilePath(targetObj),
    }
  }

  copyCtxQueue.forEach((ctx) => {
    copyFile(ctx)
  })
  taskCtxQueue.forEach((task) => {
    compareTwoJsonToDiffJson(diffFile(task))
  })
} else if (mode === 'fill') {
  // 准备好所有文件
  const { copyCtxQueue, taskCtxQueue } = prepareCopyFiles()
  const fillBackFile = (task) => {
    const [sourceObj, targetObj, diffObj] = task
    const getFilePath = ({ repoName, dir, prefixName, extName }, isDest) => {
      return path.resolve(
        isDest ? destDir : sourceDir,
        `${repoName}${repoName === 'ngconsole_resources' ? '-' + dir : ''}-${prefixName}${'.json'}`,
      )
    }
    return {
      diff: getFilePath(diffObj, true),
      source: getFilePath(sourceObj),
      target: getFilePath(targetObj),
      fill: getFilePath(targetObj) + 'fill.json',
    }
  }
  taskCtxQueue.forEach((task) => {
    fillDiffJsonToTargetJson(fillBackFile(task), task.repoName !== 'ngconsole_resources')
  })
} else {
  console.error(`Invalid mode: ${mode}`)
  return process.exit(1)
}
