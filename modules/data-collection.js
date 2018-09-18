const path = require('path')
const { writeCsv, readCsv, sortByStr } = require('../utils/')
const { USER_DATA_PATH } = require('../store/')

const replaceWrap = (str) => {
  return str.replace(/\n/g, '')
}

const saveList = async (list) => {
  const FILE_PATH = path.resolve(USER_DATA_PATH, 'local/', `collection.csv`)
  const data = await readCsv(FILE_PATH)
  const eId = data.map(item => item.id)
  for (let key in list) {
    if (!eId.includes(key) && key !== 'island_name') {
      data.push({
        id: key, name: list[key].name, detail: list[key].area_comment
      })
    }
  }
  await writeCsv(FILE_PATH, data)
}

const saveTownList = async (town) => {
  const tid = town.location_id
  const tname = town.town_name
  const list = town.spot
  const FILE_PATH = path.resolve(USER_DATA_PATH, 'local/', `collection.csv`)
  const data = await readCsv(FILE_PATH)
  const eId = data.map(item => item.id)
  if (!eId.includes(tid)) {
    data.push({ id: tid, name: tname, detail: '', vyrn: '' })
  }
  for (let key in list) {
    const item = list[key]
    if (!eId.includes(`${tid}-${item.id}`)) {
      data.push({ id: `${tid}-${item.id}`, name: item.location, detail: replaceWrap(item.description), vyrn: replaceWrap(item.bee_comment) })
    }
  }
  await writeCsv(FILE_PATH, data)
}

const collection = async (result, uid, pathname) => {
  const body = result.response.body.toString()

  if (pathname.includes('/island/init/meiyouzhege')) {
    const data = JSON.parse(body)
    if (data.island_info) {
      await saveList(data.island_info)
    }
  } else if (pathname.includes('/user/content/index')) {
    const data = JSON.parse(body)
    if (data.option) {
      await saveTownList(data.option.mydata_assets.mydata.town)
    }
  }
}

module.exports = collection
