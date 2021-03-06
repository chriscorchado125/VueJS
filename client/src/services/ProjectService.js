import axios from 'axios'
import getCookie from './../ts/getCookie'

/* eslint no-async-promise-executor: "off" */
class ProjectService {
  static getProject (page, dir, search) {
    let url = 'api/project'

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
        resolve(data.map((project) => ({ project })))
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default ProjectService
