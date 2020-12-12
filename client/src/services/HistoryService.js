import axios from 'axios'
import getCookie from './../ts/getCookie'

/* eslint no-async-promise-executor: "off" */
class HistoryService {
  static getHistory (page, dir, search) {
    let url = 'api/history'

    if (page) {
      url += '?page=' + page + '&dir=' + dir
    } else {
      url += '?page=1'
    }

    url += '&first=' + getCookie('firstIDcookie').substring(3, 27)
    url += '&last=' + getCookie('lastIDcookie').substring(3, 27)

    if (search) url += '&q=' + search

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(data.map((history) => ({ history })))
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default HistoryService
