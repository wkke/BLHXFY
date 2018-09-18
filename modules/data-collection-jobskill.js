const path = require('path')
const { writeCsv, readCsv, sortByStr } = require('../utils/')
const { USER_DATA_PATH } = require('../store/')

const saveList = async (list) => {
  const FILE_PATH = path.resolve(USER_DATA_PATH, 'local/', `collection.csv`)
  const data = await readCsv(FILE_PATH)
  const eId = data.map(item => item.id)
  list.forEach(item => {
    if (!eId.includes(item.id)) {
      data.push(item)
    }
  })
  await writeCsv(FILE_PATH, data)
}

const collection = async (result, uid, pathname) => {
  const body = result.response.body.toString()

  if (pathname.includes('/party/job/')) {
    const list = []
    const data = JSON.parse(body)
    if (data.job && data.job.action_ability) {
      for (let key in data.job.action_ability) {

        let item = data.job.action_ability[key]
        if (!item) continue
        list.push({
          id: item.action_id,
          name: item.name,
          detail: item.comment
        })
      }
      await saveList(list)
    }
    if (data.job && data.job.support_ability) {
      for (let key in data.job.support_ability) {

        let item = data.job.support_ability[key]
        if (!item) continue
        list.push({
          id: item.action_id,
          name: item.name,
          detail: item.comment
        })
      }
      await saveList(list)
    }

  } else if (pathname.includes('/zenith/ability_list/')) {
    const list = []
    const data = JSON.parse(body)
    if (data.ability_list) {
      for (let key in data.ability_list) {

        let item = data.ability_list[key]
        if (!item) continue
        list.push({
          id: item.action_id,
          name: item.name,
          detail: item.comment
        })
      }
      await saveList(list)
    }
  } else if (pathname.includes('/party_ability_subaction')) {
    const list = []
    const data = JSON.parse(body)
    if (data.list) {
      for (let key in data.list) {

        let item = data.list[key]
        if (!item) continue
        list.push({
          id: item.action_id,
          name: item.name,
          detail: item.comment
        })
      }
      await saveList(list)
    }
  }


}

module.exports = collection
